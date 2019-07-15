<template>
  <div class="content">
    <div class="topTitle">
      <span>订单管理</span>
    </div>
    <el-row>
      <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
        <div class="peopleData">
          <div class="propleSearch">
            <el-input
              placeholder="请搜索"
              v-model="params.Filter"
              @keyup.enter.native="getData(true)"
              class="arcRadius"
              style="width: 150px;"
            ></el-input>
            <div class="searchItem" style="display: inline-block;margin: 0 8px; ">
              <el-select
                clearable
                v-model="searchParams.orderType"
                style="width:120px;"
                placeholder="订单状态"
              >
                <el-option
                  v-for="item in OrderTypeItems"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  filter-placement="bottom-end"
                >{{item.name}}</el-option>
              </el-select>
            </div>
            <div style="display: inline-block;margin: 0 16px;">
              <el-date-picker
                v-model="timeRange"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              >></el-date-picker>
            </div>
            <el-button type="primary" @click="getData(true)">查询</el-button>
          </div>
        </div>
        <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" v-loading="loading">
          <el-table-column type="selection" fixed="left" width="55"></el-table-column>
          <el-table-column prop="unitName" align="left" show-overflow-tooltip label="单位名称"></el-table-column>
          <el-table-column prop="createTime" align="left" label="创建时间" width="100">
            <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="beginTime" align="left" label="体检开始时间" width="130">
            <template slot-scope="scope">{{scope.row.beginTime | formatDate}}</template>
          </el-table-column>
          <el-table-column prop="orderNum" align="left" label="备单人数"></el-table-column>
          <el-table-column prop="unitContractMoney" align="left" label="合同金额"></el-table-column>
          <el-table-column prop="checkedNum" align="left" label="已检人数"></el-table-column>
          <el-table-column prop="checkedMoney" align="left" label="已检金额"></el-table-column>
          <el-table-column prop="deptName" align="left" label="已结人数"></el-table-column>
          <el-table-column prop="deptName" align="left" label="已付金额"></el-table-column>
          <el-table-column prop="orderMoney" align="left" label="订单金额"></el-table-column>
          <el-table-column prop="deptName" align="left" label="缴费状态"></el-table-column>
          <el-table-column prop="deptName" align="left" label="最后缴费时间">
            <!-- <template slot-scope="scope">{{scope.row.beginTime | formatDate}}</template> -->
          </el-table-column>
          <el-table-column prop="orderStatus" align="left" label="订单状态"></el-table-column>
          <el-table-column prop="closeTime" align="left" label="订单关闭时间">
            <template slot-scope="scope">{{scope.row.closeTime | formatDate}}</template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="text" @click="showPay(scope.row)">缴费</el-button>
              <el-button type="text" @click="showUnitDetails(scope.row)">详情</el-button>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span @click="showRefund(scope.row)">退费</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="showWithdraw(scope.row)">撤回</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="endOrderBtn(scope.row)">结束订单</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="signPay(scope.row)">标记为已缴费</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span @click="delOrderBtn(scope.row)">删除订单</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部信息栏 -->
        <div class="fixBottom">
          <div class="right">
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page="searchParams.PageIndex"
              :page-sizes="[10,20,50,100]"
              :total="total"
              layout="total,sizes, prev, pager, next, jumper"
            ></el-pagination>
          </div>
        </div>

        <!-- 弹窗块 -->
      </div>
    </el-row>
    <dialogddgrp ref="dialogddgrp"></dialogddgrp>
  </div>
</template>

<script>
import dialogddgrp from "./DialogDDGrp.vue";
import moment from "moment";
export default {
  name: "DDGrpOrder",
  components: { dialogddgrp },
  data() {
    return {
      total: 0, // 总条数
      loading: false,
      timeRange: [
        moment()
          .subtract(0.5, "year")
          .format(),
        moment().format()
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
      params: {
        Filter: "",
        timeRange: [
          moment()
            .subtract(0.5, "year")
            .format(),
          moment().format()
        ]
      },
      searchParams: {
        Filter: "",
        StartDateTime: "",
        EndDateTime: "",
        PageIndex: 1,
        PageSize: 10
      },
      tableData: [] // 单位列表
    };
  },
  created: function() {
    this.getData(true);
  },
  methods: {
    // 获取数据
    getData(key) {
      if (key) {
        if (!this.timeRange || this.timeRange.length !== 2) {
          this.searchParams.StartDateTime = "";
          this.searchParams.EndDateTime = "";
        } else {
          this.searchParams.StartDateTime = moment(this.timeRange[0]).format(
            "YYYY-MM-DD"
          );
          this.searchParams.EndDateTime = moment(this.timeRange[1]).format(
            "YYYY-MM-DD"
          );
        }
        this.searchParams.Filter = this.params.Filter;
        this.params.timeRange = this.timeRange;
        this.searchParams.PageIndex = 1;
      } else {
        this.timeRange = this.params.timeRange;
        this.params.Filter = this.searchParams.Filter;
      }

      this.loading = true;
      this.$axios
        .get(this.$api.GetGroupOrderList, {
          params: this.searchParams
        })
        .then(res => {
          if (res.data.status === 1) {
            this.tableData = res.data.entity.resultData;
            this.total = res.data.entity.totalCount;
          } else {
            this.$message.error(res.data.message);
            this.total = 0;
          }
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err.data.message);
          this.loading = false;
          this.total = 0;
        });
    },
    //撤回tabs点击
    payBackClick(tab, event) {
      console.log(tab, event);
    },
    //详情
    showUnitDetails(row) {
      let dialogddgrp = this.$refs.dialogddgrp;
      dialogddgrp.unitDetailsIsShow = true;
      dialogddgrp.OrderCode = row.orderCode;
    },
    //缴费
    showPay(row) {
      let dialogddgrp = this.$refs.dialogddgrp;
      dialogddgrp.customerOrderIsShow = true;
      dialogddgrp.OrderCode = row.orderCode;
    },
    /*    按钮组    */
    //退费
    showRefund(row) {
      let dialogddgrp = this.$refs.dialogddgrp;
      dialogddgrp.refundIsShow = true;
      dialogddgrp.OrderCode = row.orderCode;
    },
    //撤回
    showWithdraw(row){
      let dialogddgrp = this.$refs.dialogddgrp;
      dialogddgrp.withdrawIsShow = true;
      dialogddgrp.OrderCode = row.orderCode;
    },
    //标记为已缴费    TODO:无接口
    signPay(row) {
      this.$confirm(
        '<span>您确定要将此订单标记为已缴费吗？</span><br /><i style="color:#8F9399;">确定后不可更改请谨慎操作</i>',
        "提醒：",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      )
        .then(() => {
          this.$message.success("标记已缴费成功");
        })
        .catch(err => {});
    },
    // 删除订单   TODO:无接口
    delOrderBtn(row) {
      this.$confirm(
        '<span>您确定要删除该体检订单吗？</span><br /><i style="color:#8F9399;">确定删除后人员及项目将都被删除</i>',
        "提醒：",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      )
        .then(() => {
          this.$message.success("删除订单成功");
        })
        .catch(err => {});
    },
    // 结束订单   TODO:无接口
    endOrderBtn(row) {
      this.$confirm(
        '<span>您确定要结束该体检订单吗？</span><br /><i style="color:#8F9399;">确定结束后人员及项目将都不能再被编辑</i>',
        "提醒：",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      )
        .then(() => {
          this.$message.success("结束订单成功");
        })
        .catch(err => {});
    },
    //翻页fn
    handleCurrentChange(val) {
      this.searchParams.PageIndex = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.searchParams.PageSize = val;
      this.searchParams.PageIndex = 1;
      this.getData();
    }
  }
};
</script>
<style scoped>
.right > * {
  display: inline-block;
}
.el-select {
  display: inline-block;
  width: 107px;
  margin-right: 16px;
}
.el-form--inline .el-form-item {
  margin-right: 20px;
  margin-top: 24px;
}
.currentOrder ul {
  overflow: hidden;
}
.currentOrder li {
  width: 25%;
  float: left;
  line-height: 32px;
}
.discount .el-input {
  width: 150px;
  padding-right: 8px;
}
.el-form-item__label {
  text-align: left;
}
.el-date-editor--daterange.el-input__inner {
  width: 250px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-tabs__nav-scroll {
  padding-left: 0;
}
</style>
