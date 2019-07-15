<template>
  <div id="dialogddgrp" class="dialogddgrp">
    <el-dialog
      title="单位订单详情"
      :visible.sync="unitDetailsIsShow"
      width="1000px"
      :close-on-click-modal="false"
    >
      <div style="line-height:47px">
        <div class="searchParams" style="overflow: hidden">
          <div style="width:750px;float: left;">
            <el-input
              placeholder="姓名"
              v-model="unitDetailsSearch.customerName"
              @keyup.enter.native="getUnitDetails"
              class="arcRadius"
              style="width: 300px;margin-right: 6px;"
            ></el-input>
            <el-select
              class="searchItem"
              v-model="unitDetailsSearch.isStart"
              clearable
              placeholder="是否开始"
            >
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              class="searchItem"
              v-model="unitDetailsSearch.isEnd"
              clearable
              placeholder="是否结束"
            >
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              class="searchItem"
              style="width:120px"
              v-model="unitDetailsSearch.isPay"
              clearable
              placeholder="是否有自费"
            >
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              style="width:120px;display:inline-block"
              v-model="unitDetailsSearch.timeType"
              clearable
              placeholder="时间类型"
            >
              <el-option
                v-for="item in timeTypeItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <div style="display: inline-block;margin: 0 6px;">
              <el-date-picker
                v-model="unitDetailsSearch.timeRange"
                type="daterange"
                start-placeholder="开始日期"
                range-separator="至"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
          <div class="right" style="display:inline-block">
            <el-button @click="getUnitDetails">查询</el-button>
            <el-button @click="resetUnitDetailsSearch">重置条件</el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="unitDetailsData"
        tooltip-effect="dark"
        style="width: 100%;"
        height="250"
        v-loading="unitDetailsLoading"
      >
        <el-table-column prop="customerName" align="left" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别" align="left">
          <template slot-scope="scope">{{scope.row.sex === 1 ?'男': '女'}}</template>
        </el-table-column>
        <el-table-column align="left" label="自费金额">
          <template slot-scope="scope">{{ scope.row.paidMoney - scope.row.unitPayMoney }}</template>
        </el-table-column>
        <el-table-column align="left" prop="unitPayMoney" label="单位支付金额">
          <template slot-scope="scope">￥{{ scope.row.unitPayMoney }}</template>
        </el-table-column>
        <el-table-column align="left" prop="isCheckBegin" label="是否开始">
          <template slot-scope="scope">{{ scope.row.isCheckBegin | boolFilter }}</template>
        </el-table-column>
        <el-table-column align="left" prop="isCheckEnd" label="是否结束">
          <template slot-scope="scope">{{ scope.row.isCheckEnd | boolFilter }}</template>
        </el-table-column>
        <el-table-column align="left" prop label="开始时间(暂无)"></el-table-column>
        <el-table-column align="left" prop label="结束时间(暂无)"></el-table-column>
      </el-table>
      <span class="subitem" style="display: block;margin: 5px 0;">
        合计：
        <span class="labelColor ftArial">{{unitDetailsData.length}}</span>人
        自费金额合计：
        <span class="labelColor ftArial">￥{{unitDetailsData.length}}</span>
        单位付费合计：
        <span class="labelColor ftArial">￥{{unitDetailsData.length}}</span>
      </span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unitDetailsClose">取消</el-button>
        <el-button type="primary" @click="exportUnitDetails">导出报表</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="缴费确认"
      :visible.sync="payIsShow"
      @open="getPayData"
      width="1000px"
      :close-on-click-modal="false"
    >
      <div class="peopleData">
        <div class="searchParams" style="overflow: hidden">
          <div style="width:750px;float: left;">
            <el-input
              placeholder="请输入关键字"
              @keyup.enter.native="getPayData"
              class="arcRadius"
              style="width: 352px;margin-right: 16px;"
            ></el-input>
            <el-select clearable placeholder="部门">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select clearable placeholder="组别">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select clearable placeholder="是否开始">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select clearable placeholder="是否结束">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select clearable placeholder="是否弃检">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select clearable placeholder="是否结款">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select clearable placeholder="套餐名字">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select clearable placeholder="时间类型">
              <el-option
                v-for="item in timeTypeItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker
              type="daterange"
              start-placeholder="开始日期"
              range-separator="至"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
          <div class="right">
            <el-button @click="getPayData">查询</el-button>
            <el-button @click="resetPaySearch">重置条件</el-button>
          </div>
        </div>
      </div>
      <div class="searchParams">
        <el-button-group>
          <el-button icon="el-icon-download" @click="exportPayData">导出</el-button>
          <el-button icon="el-icon-s-marketing" @click="showDiscount">打折</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="payData"
        tooltip-effect="dark"
        @selection-change="payHandleSelectionChange"
        style="width: 100%;"
        height="250"
        v-loading="payLoading"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align="left" prop="customerName" label="姓名"></el-table-column>
        <el-table-column align="left" prop="deptName" label="部门"></el-table-column>
        <el-table-column align="left" prop="teamName" label="组别"></el-table-column>
        <el-table-column align="left" prop="unitPayMoney" label="单位支付金额">
          <template slot-scope="scope">￥{{ scope.row.unitPayMoney }}</template>
        </el-table-column>
        <el-table-column prop="packageName" show-overflow-tooltip label="套餐名称"></el-table-column>
        <el-table-column align="left" prop="isCheckBegin" label="是否开始">
          <template slot-scope="scope">{{ scope.row.isCheckBegin | boolFilter }}</template>
        </el-table-column>
        <el-table-column align="left" prop="isCheckEnd" label="是否结束">
          <template slot-scope="scope">{{ scope.row.isCheckEnd | boolFilter }}</template>
        </el-table-column>
        <el-table-column align="left" prop="isGiveup" label="是否弃检">
          <template slot-scope="scope">{{ scope.row.isGiveup | boolFilter }}</template>
        </el-table-column>
        <el-table-column align="left" prop="isCheckEnd" label="是否结款">
          <template slot-scope="scope">{{ scope.row.unitPaidStatus == 2 | boolFilter }}</template>
        </el-table-column>
        <el-table-column align="left" prop="isCheckEnd" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showCustomerOrder(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fixBottom">
        <el-button type="text" @click="payToggleSelection()">反选</el-button>
        <span class="subitem">
          合计：
          <span class="labelColor ftArial">{{payData.length || 0}}</span>
        </span>
        <span class="subitem">
          选中：
          <span class="labelColor ftArial">{{payMultipleTable.length || 0}}</span>
        </span>
        <span class="subitem">
          总金额： ￥
          <span class="labelColor ftArial">{{pay_amount}}</span>
        </span>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="payClose">取消</el-button>
        <el-button type="primary" @click="doPay">发起缴费</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="客户订单"
      :visible.sync="customerOrderIsShow"
      width="600px"
      :close-on-click-modal="false"
    >
      <el-table
        :data="customerOrderData.items"
        tooltip-effect="dark"
        style="width: 100%;"
        height="250"
        v-loading="customerOrderLoading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="customerName" label="项目名称"></el-table-column>
        <el-table-column prop="deptName" label="项目归属">
          <template slot-scope="scope">{{scope.row.isUnitItem?"单位":"个人"}}</template>
        </el-table-column>
        <el-table-column prop="deptName" label="原价">
          <template slot-scope="scope">￥{{scope.fullPrice}}</template>
        </el-table-column>
        <el-table-column prop="deptName" label="执行价">
          <template slot-scope="scope">￥{{scope.exeamount}}</template>
        </el-table-column>
        <el-table-column prop="deptName" label="项目状态">
          <template
            slot-scope="scope"
          >￥{{scope.checkStatus==0?"未检":(scope.row.checkStatus==1?"到检":"已获取结果")}}</template>
        </el-table-column>
      </el-table>
      <span class="subitem">
        客户姓名：
        <span class="labelColor ftArial">{{customerOrderData.customerName}}</span>
      </span>
      <span class="subitem">
        所选套餐：
        <span class="labelColor ftArial">{{customerOrderData.packageName}}}</span>
      </span>
      <span class="subitem">
        自费金额：
        <span
          class="labelColor ftArial"
        >￥{{customerOrderData.paidMoney - customerOrderData.unitPayMoney}}</span>
      </span>
      <span class="subitem">
        自费金额：
        <span class="labelColor ftArial">￥{{customerOrderData.unitPayMoney}}</span>
      </span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="customerOrderIsShow = false;">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="打折"
      :visible.sync="discountIsShow"
      width="400px"
      :close-on-click-modal="false"
    >
      <ul class="modal-con">
        <li class="item">
          <span>合计金额：</span>
          <div class="item-list">
            <el-input v-model="discountData.amount" disabled style="color: #606266;"></el-input>元
          </div>
        </li>
        <li class="item">
          <span>折扣：</span>
          <div class="item-list iptNum" style="width: 150px">
            <el-input-number
              v-model="discountData.discount"
              @blur="discountHandle()"
              @change="discountHandle()"
              :min="0"
              :max="1"
              :step="0.1"
            ></el-input-number>
          </div>
        </li>
        <li class="item">
          <span>折扣金额：</span>
          <div class="item-list">
            <el-input
              type="number"
              v-model.number="discountData.difamount"
              @blur="difPriceHandle()"
            ></el-input>元
          </div>
        </li>
        <li class="item">
          <span>实收：</span>
          <div class="item-list">
            <el-input
              type="number"
              v-model.number="discountData.exefamount"
              @blur="realPriceHandle()"
            ></el-input>元
          </div>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-checkbox v-model="isFree">优惠自由</el-checkbox>
        <el-button @click="discountModal = false">取 消</el-button>
        <el-popover placement="top" width="160" v-model="visibleIsShow">
          <p>实收最低价</p>
          <p>￥{{this.discountData.difamount}}</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visibleIsShow = false">取消</el-button>
            <el-button type="primary" size="mini" @click="doDiscount">确定</el-button>
          </div>
          <el-button type="primary">确 定</el-button>
        </el-popover>
      </div>
    </el-dialog>

    <el-dialog
      title="退费确认"
      :visible.sync="refundIsShow"
      width="600px"
      :close-on-click-modal="false"
      @open="getRefundData"
    >
      <el-table
        :data="refundData"
        tooltip-effect="dark"
        style="width: 100%;"
        height="250"
        v-loading="refundLoading"
        @selection-change="refundHandleSelectionChange"
      >
        <el-table-column prop="tradeCode" label="交易号"></el-table-column>
        <el-table-column prop="tradeMoney" label="金额">
          <template slot-scope="scope">￥{{scope.row.tradeMoney}}</template>
        </el-table-column>
        <el-table-column prop="tradeTime" label="交易时间">
          <template slot-scope="scope">{{scope.row.tradeTime | formatDate }}</template>
        </el-table-column>
      </el-table>
      <div class="fixBottom">
        <el-button type="text" @click="refundToggleSelection()">反选</el-button>
        <span class="subitem">
          合计：
          <span class="labelColor ftArial">{{refundData.length || 0}}</span>
        </span>
        <span class="subitem">
          选中：
          <span class="labelColor ftArial">{{refundMultipleTable.length || 0}}</span>
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundClose">取消</el-button>
        <el-button type="primary" @click="doRefund">确认退费</el-button>
      </div>
    </el-dialog>

    <!-- 撤回申请 -->
    <el-dialog
      :visible.sync="withdrawIsShow"
      width="600px"
      @open="getWithdrawData"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName" @tab-click="withdrawClick">
        <el-tab-pane label="撤回缴费申请" name="first">
          <el-table
            :data="withdrawPayData"
            tooltip-effect="dark"
            style="width: 100%;"
            height="250"
            v-loading="withdrawPayLoading"
            @selection-change="withdrawPayHandleSelectionChange"
          >
            <el-table-column prop="createTime" label="发起时间">
              <template slot-scope="scope">{{scope.row.createTime | formatDate }}</template>
            </el-table-column>
            <el-table-column prop="tradeCode" label="交易号"></el-table-column>
            <el-table-column prop="tradeMoney" label="金额">
              <template slot-scope="scope">￥{{scope.row.tradeMoney}}</template>
            </el-table-column>
            <el-table-column prop="personNum" label="包含人数"></el-table-column>
          </el-table>
          <div class="fixBottom">
            <el-button type="text" @click="withdrawPayToggleSelection()">反选</el-button>
            <span class="subitem">
              合计：
              <span class="labelColor ftArial">{{withdrawPayData.length || 0}}</span>
            </span>
            <span class="subitem">
              选中：
              <span class="labelColor ftArial">{{withdrawPayMultipleTable.length || 0}}</span>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="撤回退费申请" name="second">
          <el-table
            :data="withdrawRefundData"
            tooltip-effect="dark"
            style="width: 100%;"
            height="250"
            v-loading="withdrawRefundLoading"
            @selection-change="withdrawRefundHandleSelectionChange"
          >
            <el-table-column prop="createTime" label="发起时间">
              <template slot-scope="scope">{{scope.row.createTime | formatDate }}</template>
            </el-table-column>
            <el-table-column prop="tradeCode" label="交易号"></el-table-column>
            <el-table-column prop="tradeMoney" label="金额">
              <template slot-scope="scope">￥{{scope.row.tradeMoney}}</template>
            </el-table-column>
            <el-table-column prop="personNum" label="包含人数"></el-table-column>
          </el-table>
          <div class="fixBottom">
            <el-button type="text" @click="withdrawRefundToggleSelection()">反选</el-button>
            <span class="subitem">
              合计：
              <span class="labelColor ftArial">{{withdrawRefundData.length || 0}}</span>
            </span>
            <span class="subitem">
              选中：
              <span class="labelColor ftArial">{{withdrawRefundMultipleTable.length || 0}}</span>
            </span>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="withdrawClose">取消</el-button>
        <el-button type="primary" @click="doWithdraw">确认撤回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "dialogddgrp",
  props: {},
  filters: {
    boolFilter(value, row, column) {
      return value ? "是" : "否";
    }
  },
  data() {
    return {
      orderCode: "",
      //单位订单详情
      unitDetailsIsShow: false,
      unitDetailsLoading: false,
      unitDetailsData: [],
      unitDetailsSearch: {
        customerName: "",
        isStart: null,
        isEnd: null,
        isPay: null,
        timeType: null,
        timeRange: []
      },
      //缴费确认
      payIsShow: false,
      payLoading: false,
      payData: [],
      paySearch: {},
      payMultipleTable: [], //选中项
      pay_amount: 0, //总金额
      //缴费确认-客户订单
      customerOrderData: [],
      customerOrderIsShow: false,
      customerOrderLoading: false,
      //缴费确认-打折
      discountIsShow: false,
      discountData: {
        discount: 0,
        amount: 0,
        orderCodes,
        difamount: 0,
        exeamount: 0
      },
      isFree: false,
      visibleIsShow: false,
      //退费
      refundIsShow: false,
      refundLoading: false,
      refundData: [],
      refundMultipleTable: [],
      //撤回
      withdrawIsShow: false,
      activeName: "first",

      withdrawPayData: [],
      withdrawPayLoading: false,
      withdrawPayMultipleTable: [],

      withdrawRefundData: [],
      withdrawRefundLoading: false,
      withdrawRefundMultipleTable: [],

      //公用
      timeTypeItems: [
        {
          name: "体检开始时间",
          value: true
        },
        {
          name: "体检结束时间",
          value: false
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date(moment().subtract(0.5, "year"));
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date(moment().subtract(1, "year"));
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近二年",
            onClick(picker) {
              const end = new Date();
              const start = new Date(moment().subtract(2, "year"));
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      boolItems: [
        {
          name: "是",
          value: true
        },
        {
          name: "否",
          value: false
        }
      ]
    };
  },
  inject: [],
  methods: {
    /*团检订单详情*/
    getUnitDetails() {
      //TODO:接口
      // let newUnitDetailsData = this.unitDetailsData;
      // this.unitDetailsLoading = true;
      // if (
      //   this.unitDetailsSearch.customerName != null &&
      //   this.unitDetailsSearch.customerName != ""
      // ) {
      //   newUnitDetailsData = newUnitDetailsData.find(
      //     z => z.customerName.indexOf(this.unitDetailsSearch.customerName) != -1
      //   );
      // }
      // if (this.unitDetailsSearch.isStart != null) {
      //   newUnitDetailsData = newUnitDetailsData.find(
      //     z => z.isCheckBegin == this.unitDetailsSearch.isStart
      //   );
      // }
      // if (this.unitDetailsSearch.isEnd != null) {
      //   newUnitDetailsData = newUnitDetailsData.find(
      //     z => z.isCheckEnd == this.unitDetailsSearch.isEnd
      //   );
      // }
      // if (this.unitDetailsSearch.isPay != null) {
      //   newUnitDetailsData = newUnitDetailsData.find(
      //     z => z.paidMoney - z.unitPayMoney > 0 == this.unitDetailsSearch.isPay
      //   );
      // }
      // if (
      //   this.unitDetailsSearch.timeType != null &&
      //   this.unitDetailsSearch.timeRange
      // ) {
      //   let startDate = new Date(this.unitDetailsSearch.timeRange[0]);
      //   let endDate = new Date(this.unitDetailsSearch.timeRange[1]);
      //   if (this.unitDetailsSearch.timeType) {
      //     //TODO:无开始时间字段
      //     //   newUnitDetailsData = newUnitDetailsData.find(
      //     //     z =>
      //     //       z.
      //     //   );
      //   } else {
      //     //TODO:无结束时间字段
      //   }
      // }
      // this.unitDetailsData = newUnitDetailsData;
      // this.unitDetailsLoading = false;
    },
    //导出
    exportUnitDetails() {
      //TODO: 导出
    },
    //清除条件
    resetUnitDetailsSearch() {
      this.unitDetailsSearch = {
        customerName: "",
        isStart: null,
        isEnd: null,
        isPay: null,
        timeType: null,
        timeRange: [null, null]
      };
    },
    unitDetailsClose() {
      this.unitDetailsIsShow = false;
      this.unitDetailsData = new Array();
      this.resetUnitDetailsSearch();
    },
    /*团检缴费*/
    payHandleSelectionChange(ex) {
      this.payMultipleTable = ex;
      this.pay_amount = 0;
      ex.forEach(z => (this.pay_amount += z.orderMoney));
    },
    payToggleSelection() {
      if (this.payData) {
        this.payData.forEach(row => {
          this.$refs.payMultipleTable.toggleRowSelection(row);
          this.pay_amount = 0;
          this.pay_amount += row.orderMoney;
        });
      } else {
        this.$refs.payMultipleTable.clearSelection();
      }
    },
    //TODO: 缴费
    getPayData() {},
    resetPaySearch() {},
    doPay() {},
    exportPayData(){},
    payClose() {},
    //查看-客户订单
    showCustomerOrder(row) {
      this.customerOrderIsShow = true;
      this.customerOrderLoading = true;
      this.customerOrderData = row;
      this.customerOrderLoading = false;
    },
    //打折框弹出
    showDiscount() {
      if (this.payMultipleTable.length <= 0) {
        return this.$message.error("请至少选中一项进行打折");
      }
      this.discountData.amount = this.pay_amount;
      this.discountData.orderCodes = this.payMultipleTable.map(
        z => z.orderCode
      );
      this.discountIsShow = true;
    },
    exportPayData() {},
    //打折-确定
    doDiscount() {
      if (this.isFree) {
        return this.submitDiscount();
      }
      let userDiscount = this.USERINFO.discount.toFixed(2);
      if (this.discountData.discount > userDiscount) {
        this.discountData.difamount = this.discountData.amount * userDiscount;
        this.discountData.discount = userDiscount;
        this.discountData.exeamount =
          this.discountData.amount - this.discountData.discount;
        this.visibleIsShow = false;
        return this.$message.error(
          `您最低的折扣为${this.USERINFO.discount.toFixed(2)}`
        );
      } else {
        this.submitDiscount();
      }
    },
    submitDiscount() {
      this.$axios
        .post(this.$api.BatchDiscount, {
          discount: this.discountData.discount,
          orderCodes: this.discountData.orderCodes
        })
        .then(res => {
          if (res.data.status == 1) {
            this.$message.success("打折成功");
            this.getPayData();
            this.discountIsShow = false;
          } else {
            this.$message.error("打折失败");
            console.error(res.data.message);
          }
        })
        .catch(err => {
          this.$message.error("打折失败");
          console.error(err);
        });
    },
    //按回车后对折扣的进行处理
    discountHandle() {
      if (this.discountData.discount <= 0 || this.discountData.discount > 1) {
        return this.$message.error("请输入正确的折扣");
      }
      this.discountData.exeamount = (
        this.discountData.amount * this.discountData.discount
      ).toFixed(4);
      this.discountData.exeamount = Number(
        this.discountData.exeamount.substring(
          0,
          this.discountData.exeamount.length - 1
        )
      );
      this.discountData.difamount =
        this.discountData.amount - this.discountData.exeamount;
      this.handleTwo(key);
    },
    //按回车后对折扣金额的进行处理
    difPriceHandle() {
      if (
        this.discountData.difamount < 0 ||
        this.discountData.difamount > this.discountData.amount
      ) {
        return this.$message.error("请输入正确的折扣金额");
      }
      this.discountData.exeamount =
        this.discountData.amount - this.discountData.difamount;
      this.discountData.discount =
        parseInt(
          (this.discountData.exeamount / this.discountData.amount) * 100
        ) / 100;
    },
    //按回车后对实收金额的进行处理
    realPriceHandle() {
      if (
        this.discountData.exeamount > this.discountData.amount ||
        this.discountData.exeamount < 0
      ) {
        this.$message.error("请输入正确的折扣金额");
        return;
      }
      this.discountData.exeamount = this.discountData.exeamount;
      this.discountData.discount =
        parseInt(
          (this.discountData.exeamount / this.discountData.amount) * 100
        ) / 100;
      this.discountData.difamount =
        this.discountData.amount - this.discountData.exeamount;
    },
    //关于打折保留2位小数的处理
    handleTwo() {
      let num1 = this.discountData.amount.toFixed(3);
      let num2 = this.discountData.exeamount.toFixed(3);
      this.discountData.amount = Number(
        num1.substring(0, (num1 + "").length - 1)
      );
      this.discountData.exeamount = Number(
        num2.substring(0, (num2 + "").length - 1)
      );
      if (this.discountData.difamount || this.discountData.difamount == 0) {
        let num3 = this.discountData.difamount.toFixed(3);
        this.discountData.difamount = Number(
          num3.substring(0, (num3 + "").length - 1)
        );
      }
    },
    /*  退费  */
    refundHandleSelectionChange(ex) {
      this.refundMultipleTable = ex;
    },
    refundToggleSelection() {
      if (this.refundData) {
        this.refundData.forEach(row => {
          this.$refs.refundMultipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.refundMultipleTable.clearSelection();
      }
    },
    getRefundData() {
      this.refundLoading = true;
      this.$axios
        .get(this.$api.GetGrpPaidOrderList, {
          params: { orderCode: this.orderCode }
        })
        .then(res => {
          if (res.data.status == 1) {
            this.refundData = res.data.entity;
            this.refundLoading = false;
          } else {
            this.refundLoading = false;
            this.$message.error("获取退费信息失败，请重试");
            console.error(res.data.message);
          }
        })
        .catch(err => {
          this.refundLoading = false;
          this.$message.error("获取退费信息失败，请重试");
          console.error(err);
        });
    },
    doRefund() {
      if (this.refundMultipleTable.length >= 0) {
        return this.$message.error("请选择要退费的信息");
      }
      this.refundMultipleTable.forEach(e => {
        this.$axios.post(this.$api.GrpOrderPayback, { tradeCode: e.tradeCode });
      });
      this.$message.success("发送退费申请成功！");
      this.refundClose();
    },
    refundClose() {
      this.refundMultipleTable = this.refundData = new Array();
      this.orderCode = "";
      this.refundIsShow = false;
    },
    /*  撤回  */
    withdrawPayHandleSelectionChange(ex) {
      this.withdrawPayMultipleTable = ex;
    },
    withdrawPayToggleSelection() {
      if (this.withdrawPayData) {
        this.withdrawPayData.forEach(row => {
          this.$refs.withdrawPayMultipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.withdrawPayMultipleTable.clearSelection();
      }
    },
    withdrawRefundHandleSelectionChange(ex) {
      this.withdrawRefundMultipleTable = ex;
    },
    withdrawRefundToggleSelection() {
      if (this.withdrawRefundData) {
        this.withdrawRefundData.forEach(row => {
          this.$refs.withdrawRefundMultipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.withdrawRefundMultipleTable.clearSelection();
      }
    },
    withdrawClick() {},
    getWithdrawData() {
      this.withdrawPayLoading = true;
      this.withdrawRefundLoading = true;

      this.$axios
        .get(this.$api.GetGrpPayOrderList, {
          params: { orderCode: this.orderCode }
        })
        .then(res => {
          this.withdrawPayLoading = false;
          if (res.data.status == 1) {
            this.withdrawPayData = res.data.entity;
          } else {
            this.$message.error(res.data.message);
          }
          this.withdrawPayLoading = false;
        })
        .catch(err => {
          this.withdrawPayLoading = false;
          console.error(err);
        });

      this.$axios
        .get(this.$api.GetGrpOrderPaybackList, {
          params: { orderCode: this.orderCode }
        })
        .then(res => {
          this.withdrawRefundLoading = false;
          if (res.data.status == 1) {
            this.withdrawRefundData = res.data.entity;
          } else {
            this.$message.error(res.data.message);
          }
          this.withdrawRefundLoading = false;
        })
        .catch(err => {
          this.withdrawRefundLoading = false;
          console.error(err);
        });
    },
    doWithdraw() {
      if (
        this.withdrawRefundMultipleTable.length <= 0 ||
        this.withdrawRefundMultipleTable.length <= 0
      ) {
        return this.$message.error("请选中要撤回的数据");
      }
      let successNum = 0;
      let errorNum = 0;
      new Promise((resolve, reject) => {
        if (this.withdrawRefundMultipleTable.length <= 0) {
          this.withdrawRefundMultipleTable.forEach(e => {
            this.$axios
              .post(this.$api.CancelGrpPayOrder, {
                tradeCode: e.tradeCode
              })
              .then(a => {
                successNum++;
              })
              .catch(b => {
                errorNum++;
              });
          });
        }
        if (this.withdrawRefundMultipleTable.length <= 0) {
          this.withdrawRefundMultipleTable.forEach(e => {
            this.$axios
              .post(this.$api.CancelGrpOrderPayback, {
                tradeCode: e.tradeCode
              })
              .then(a => {
                successNum++;
              })
              .catch(b => {
                errorNum++;
              });
          });
        }
      }).then(res => {
        this.$notify({
          title: "完成撤回操作！",
          dangerouslyUseHTMLString: true,
          message: `成功${successNum}条，失败<font color="red">${errorNum}</font>条，共计${successNum + errorNum}条`
          // duration: 0
        });
      });
    },
    withdrawClose() {
      this.withdrawPayMultipleTable = this.withdrawPayData = this.withdrawRefundMultipleTable = this.withdrawRefundData = new Array();
      this.orderCode = "";
      this.withdrawIsShow = false;
    }
  }
};
</script>
<style scoped>
.searchItem {
  display: inline-block;
  margin: 0 6px;
  width: 100px;
}
</style>
