<template>
  <div id="dialoggroup">
    <!-- Form -->

    <el-dialog
      title="团检订单"
      :visible.sync="dialogGroupFormVisible"
      :close-on-click-modal="false"
      @open="showData"
      width="900px"
    >
      <div slot="title">
        <i class="el-input__icon el-icon-arrow-left" :style="{display:ifShow}"></i>
        <span>团检订单</span>
      </div>
      <div class="customerName">
        <section class="sec1">
          <span>单位名称：</span>
          <span>{{groupname}}</span>
        </section>
        <section class="sec2">
          <span>交易总金额：</span>
          <span>￥{{allmoney}}元</span>
        </section>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        v-loading="loading"
      >
        <el-table-column prop="customerName" label="客户姓名" width="100" sortable></el-table-column>
        <el-table-column prop="sex" label="性别" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="部门" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardNum" label="体检卡号" width="100" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.cardNum }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unitPayMoney" label="单位支付金额" width="150" sortable>
          <template slot-scope="scope">
            <span>￥ {{ scope.row.unitPayMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="personPayMoney" label="个人支付金额" width="150" sortable>
          <template slot-scope="scope">
            <span>￥ {{ scope.row.personPayMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="checkBeginTime" label="到检时间" width="100" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.checkBeginTime | formatDate("YYYY-MM-DD") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="checkFinishTime" width="150" label="体检结束时间" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.checkFinishTime |  formatDate("YYYY-MM-DD") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="summaryFinishTime" label="报告回传时间" width="150" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.summaryFinishTime |  formatDate("YYYY-MM-DD") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeMoney" label="操作" sortable fixed="right">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getDetail(scope.row, scope.$index)"
              type="text"
              size="small"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <dialoggroupjy ref="dialoggroupjy" :name="customerName"></dialoggroupjy>
  </div>
</template>
<script>
import dialoggroupjy from "./DialogGroupJY.vue";

export default {
  components: { dialoggroupjy },
  name: "dialoggroup",
  props: ["groupname"],
  data() {
    return {
      dialogGroupFormVisible: false,
      tradeCode: "",
      ifShow: "none",
      allmoney: 0,
      tableData: [],
      QueryItems: "",
      OrderType: "",
      options: [],
      customerName: "",
      loading:true
    };
  },
  methods: {
    showData() {
      let that = this;
      this.$axios
        .get(this.$api.TransactionDetailQueryByUnit, {
          params: {
            tradeCode: this.tradeCode
          }
        })
        .then(function(response) {
          that.loading = false;
          if (response.data.status == 1) {
            that.tableData = response.data.entity;
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    },
    getDetail(row, index) {
      this.dialogGroupFormVisible = false;
      setTimeout(() => {
        this.$refs.dialoggroupjy.dialogGroupJYVisible = true;
      }, 200);
      this.$refs.dialoggroupjy.tradeCode = this.tradeCode;
      this.$refs.dialoggroupjy.orderCode = row.orderCode;
      this.$refs.dialoggroupjy.allmoney = row.unitPayMoney;
      this.customerName = row.customerName;
    }
  }
};
</script>
<style scoped>
#dialoggroup .customerName {
  height: 16px;
  background: rgba(246, 246, 246, 1);
  opacity: 1;
  border-radius: 4px;
  font-size: 14px;
  line-height: 16px;
  padding: 16px;
  color: #606266;
}
.sec1 {
  float: left;
}
.sec2 {
  float: right;
}
.sec2 span:nth-child(2) {
  color: #f56c6c;
}
#dialoggroup  >>> .el-table__body-wrapper {
  height: 400px;
  overflow-y: auto;
}
</style>
