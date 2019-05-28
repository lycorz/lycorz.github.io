<template>
  <div class="content SFHistory">
    <div class="topTitle">
      <span>历史查询</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input placeholder="请搜索" v-model="tradeName" class="arcRadius" style="width: 130px;">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select v-model="tradeType" clearable placeholder="交易类型">
              <el-option
                v-for="item in TradeEnum.TradeTypeEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.name}}</el-option>
            </el-select>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select v-model="tradeForm" clearable placeholder="业务类型">
              <el-option
                v-for="item in TradeEnum.TradeFormEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div style="display: inline-block;margin: 0 0px;">
            <el-date-picker
              v-model="tfDate"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 16px;">
            <el-select v-model="person" filterable clearable placeholder="经手人">
              <el-option
                v-for="item in TradeEnum.personEnum"
                :key="item.operatorCode"
                :label="item.operatorName"
                :value="item.operatorCode"
              ></el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="getData()">查询</el-button>
          <div class="right">
            <el-dropdown size="mini">
              <el-button type="primary">
                导出
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="derive()">导出明细</el-dropdown-item>
                <el-dropdown-item @click.native="deriveSummary()">导出汇总</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="tradeTitle">
        <div class="summey">
          <el-row>
            <el-col :span="6">
              <span>原价总金额:￥{{sfCollectMessage.realMoney}}</span>
            </el-col>
            <el-col :span="6">
              <span>折扣总金额:￥{{sfCollectMessage.discountMoney}}</span>
            </el-col>
            <el-col :span="6">
              <span>应收总金额:￥{{sfCollectMessage.paidMoney}}</span>
            </el-col>
            <el-col  :span="6">
              <span>开票数量:{{sfCollectMessage.usedInvoiceNum}}&nbsp;&nbsp;&nbsp;退票数量:{{sfCollectMessage.returnInvoiceNum}}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="sfCollectMessage!=null&&sfCollectMessage.tradeTypes!=null" class="item">
          <el-row v-for="(item,i) in Math.ceil(sfCollectMessage.tradeTypes.length / 5)" :key="i">
            <el-col v-for="(j,u) of 4" :key="u" :span="6">
              <span
                v-if="sfCollectMessage.tradeTypes[i*5+u]"
              >{{sfCollectMessage.tradeTypes[i*5+u] | tradeFilter}}:{{sfCollectMessage.tradeTypes[i*5+u] | moneyFilter}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-table ref="singleTable" :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column property="tradeName" label="客户信息" width="200" align="center"></el-table-column>
        <el-table-column
          property="tradeType"
          label="业务类型"
          width="120"
          align="center"
          :formatter="typeformatter"
        ></el-table-column>
        <el-table-column
          property="tradeMoney"
          label="交易金额"
          width="120"
          align="center"
          :sortable="true"
          :sort-method="moneySort"
        ></el-table-column>
        <el-table-column
          property="tradeForm"
          label="交易类型"
          width="120"
          align="center"
          :formatter="formformatter"
        ></el-table-column>
        <el-table-column property="operatorName" label="经手人" width="120" align="center"></el-table-column>
        <el-table-column property="invoiceNum" label="发票号" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="orderDialogVisible(scope.$index,scope.row)">订单明细</el-button>
            <el-button
              type="text"
              @click="chargeDialogVisible(scope.$index,scope.row)"
            >{{changeStr(scope.row)}}详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部信息栏 -->
      <div class="fixBottom">
        <div class="right">
          <el-pagination
            style="display:inline-block;text-align:right;"
            :current-page="pageIndex"
            @current-change="handleCurrentChange"
            @size-change="sizeChange"
            :page-sizes="[10,20,50,100]"
            layout="sizes, prev, pager, next, jumper"
            :page-count="pageNum"
          ></el-pagination>
        </div>
      </div>
    </div>
    <dialogjy ref="dialogjy" :name="name"></dialogjy>
    <dialoggroup ref="dialoggroup" :groupname="groupname"></dialoggroup>
    <dialogcharge ref="dialogcharge" :dialogchargename="dialogchargename"></dialogcharge>
    <dialogrefund ref="dialogrefund" :dialogrefundname="dialogrefundname"></dialogrefund>
  </div>
</template>

<script>
import dialogjy from "./DialogJY.vue";
import dialoggroup from "./DialogGroup.vue";
import dialogcharge from "./DialogCharge.vue";
import dialogrefund from "./DialogRefund.vue";
import moment from "moment";
import $ from "jquery";
export default {
  name: "SFHistory",
  data() {
    return {
      name: "",
      groupname: "",
      dialogchargename: "",
      dialogrefundname: "",

      total: 0,
      loading: false,
      tradeName: "",
      person: "",
      tradeType: "",
      tradeForm: "",
      Operator: "",
      pageSize: 10,
      pageIndex: 1,
      pageNum: 1,
      tfDate: [
        moment()
          .day(-1)
          .format(),
        moment().format()
      ],
      sfCollectMessage: {},
      tableData: [],

      /*  下拉框数据start  */
      TradeEnum: {
        TradeTypeEnum: [], //业务类型
        TradeFormEnum: [], //交易类型
        personEnum: []
        //TODO：经手人
      },
      /*  下拉框数据end  */

      /*时间插件 start*/
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
      /*时间信息 end*/
    };
  },
  created: function() {
    this.getTradeTypeEnum();
    this.getTradeFormEnum();
    this.getPersonEnum();
    this.getData();
  },
  filters: {
    moneyFilter(val) {
      if (!val) {
        return 0;
      }
      return "￥" + val.tradeMoney;
    },
    tradeFilter(val) {
      if (!val) {
        return "";
      }
      switch (val.typeCode) {
        case 1:
          return "现金";
        case 2:
          return "POS";
        case 3:
          return "支票";
        case 4:
          return "汇票";
        case 5:
          return "转账";
        case 6:
          return "支付宝";
        case 7:
          return "微信";
        default:
          return "其他";
      }
    }
  },
  methods: {
    getData: function() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.TransactionQuery, {
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            BeginTime:
              this.tfDate != null
                ? this.tfDate[0]
                : new Date(2018, 10, 10, 10, 10),
            EndTime: this.tfDate != null ? this.tfDate[1] : new Date(),
            TradeName: this.tradeName,
            TradeForm: this.tradeForm,
            TradeType: this.tradeType,
            TimeType: 2
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.tradeMessages;
            that.pageNum = response.data.entity.pageNum;
            that.total = response.data.entity.tradeMessages.length;
            that.sfCollectMessage = response.data.entity.sfCollectMessage;
            console.log(that.sfCollectMessage);
          } else {
            that.$message.error(response.data.message);
          }

          //关闭遮罩
          that.loading = false;
        })
        .catch(function(error) {
          //关闭遮罩
          that.loading = false;
          console.log(error);
        });
    },
    getTradeTypeEnum: function() {
      let that = this;
      this.$axios
        .get(this.$api.ReturnTradeTypeEnum, {})
        .then(function(response) {
          if (response.data.status === 1) {
            that.TradeEnum.TradeTypeEnum = response.data.entity;
          } else {
            that.$message.error(response.data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTradeFormEnum: function() {
      let that = this;
      this.$axios
        .get(this.$api.ReturnTradeFormEnum, {})
        .then(function(response) {
          if (response.data.status === 1) {
            that.TradeEnum.TradeFormEnum = response.data.entity;
          } else {
            that.$message.error(response.data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getPersonEnum() {
      let that = this;
      this.$axios
        .get(this.$api.ReturnOperators)
        .then(function(response) {
          if (response.data.status === 1) {
            that.TradeEnum.personEnum = response.data.entity;
          } else {
            console.error(response.data.message);
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    typeformatter: function(row) {
      let name;
      this.TradeEnum.TradeTypeEnum.forEach(element => {
        if (element.value === row.tradeType) {
          name = element.name;
        }
      });
      return name;
    },
    formformatter: function(row) {
      let name;
      this.TradeEnum.TradeFormEnum.forEach(element => {
        if (element.value === row.tradeForm) {
          name = element.name;
        }
      });
      return name;
    },
    changeStr: function(row) {
      let name;
      this.TradeEnum.TradeFormEnum.forEach(element => {
        if (element.value === row.tradeForm) {
          name = element.name;
          if (name == "缴费") {
            name = name.replace("缴", "收");
          }
        }
      });
      return name;
    },
    /*  排序方法start  */
    transactionSort() {},
    moneySort() {},
    businessSort() {},
    /*  排序方法end  */
    sizeChange(ex) {
      this.pageSize = ex;
      this.getData();
    },
    handleCurrentChange(ex) {
      this.pageIndex = ex;
      this.getData();
    },
    chargeDialogVisible(index, row) {
      let form = row.tradeForm;
      if (form == 1) {
        //收费
        let refund = this.$refs.dialogcharge;
        refund.dialogchargeIsShow = true;
        refund.tradeCode = row.tradeCode;
        refund.customerName = row.tradeName;
        refund.invoiceNum = row.invoiceNum;
      } else if (form == 2) {
        //退费
        let charge = this.$refs.dialogrefund;
        charge.dialogrefundIsShow = true;
        charge.tradeCode = row.tradeCode;
        charge.usedMoney = row.tradeMoney;
        charge.invoiceNum = row.invoiceNum;
      }
    },
    /*  弹出层方法start  */
    orderDialogVisible(index, row) {
      let type = row.tradeType;
      this.name = row.tradeName;
      this.groupname = row.tradeName;
      if (type == 1) {
        //个检
        let dialogjy = this.$refs.dialogjy;
        dialogjy.dialogFormVisible = true;
        dialogjy.tradeCode = row.tradeCode;
        dialogjy.allmoney = row.tradeMoney;
      } else if (type == 2) {
        //团检
        let dialoggroup = this.$refs.dialoggroup;
        dialoggroup.dialogGroupFormVisible = true;
        dialoggroup.tradeCode = row.tradeCode;
        dialoggroup.allmoney = row.tradeMoney;
      } else if (type == 3) {
        //TODO:会员卡
      }
    },
    /*  弹出层方法end  */
    derive: function() {
      this.$message("正在导出明细，请稍后！");
      this.$axios
        .post(this.$api.ExportSFReportDetail, {
          params: {
            BeginTime:
              this.tfDate != null
                ? this.tfDate[0]
                : new Date(2018, 10, 10, 10, 10),
            EndTime: this.tfDate != null ? this.tfDate[1] : new Date(),
            TradeName: this.tradeName,
            TradeForm: this.tradeForm,
            TradeType: this.tradeType,
            TimeType: 2,
            Operator: this.person,
            TradeStatus: 1, //因为是历史，已完成的才是历史，所以默认为1
            IsHide: "" //TODO:是否隐藏已经退过发票的交易，适用于团检退费时，要将已经退过发票的交易隐藏，避免再次选中退费，不隐藏为空，隐藏则传1
          }
        })
        .then(res => {
          if (res.data.status == 1) {
            let url = res.data.message;
            let $form = $('<form method="GET"></form>');
            $form.attr("action", url);
            $form.appendTo($("body"));
            $form.submit();
          }
        })
        .catch(err => {
          this.$message.error(res.data.message);
        });
    },
    deriveSummary() {
      this.$message("正在导出汇总，请稍后！");
      this.$axios
        .post(this.$api.ExportSFReport, {
          params: {
            BeginTime:
              this.tfDate != null
                ? this.tfDate[0]
                : new Date(2018, 10, 10, 10, 10),
            EndTime: this.tfDate != null ? this.tfDate[1] : new Date(),
            OperatorCode: this.person,
            InvoiceNum: this.tableData.sfCollectMessage.usedInvoiceNum,
            TradeTypes: this.sfCollectMessage.tradeTypes,
            RealMoney: this.sfCollectMessage.realMoney
          }
        })
        .then(res => {
          if (res.data.status == 1) {
            let url = res.data.message;
            let $form = $('<form method="GET"></form>');
            $form.attr("action", url);
            $form.appendTo($("body"));
            $form.submit();
          }
        })
        .catch(err => {
          this.$message.error(res.data.message);
        });
    }
  },
  components: { dialogjy, dialoggroup, dialogcharge, dialogrefund }
};
</script>
<style scoped>
.tradeTitle {
  padding: 0 12px;
  padding-top: 16px;
}
.item {
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
}
.item .el-row{
  margin-top: 10px;
}
.summey {
  font-size: 14px;
  font-family: Arial;
  font-weight: bold;
  line-height: 16px;
  color: rgba(48, 49, 51, 1);
  opacity: 1;
}
</style>

