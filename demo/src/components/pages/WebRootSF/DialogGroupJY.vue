<template>
  <div id="dialoggroupjy">
    <!-- Form -->

    <el-dialog
      title="个检订单"
      :visible.sync="dialogGroupJYVisible"
      :close-on-click-modal="false"
      @open="showData"
      width="900px"
    >
      <div slot="title">
        <i class="el-input__icon el-icon-arrow-left" @click="goBack"></i>
        <span>个检订单</span>
      </div>
      <div class="customerName">
        <section class="sec1">
          <span>客户姓名：</span>
          <span>{{name}}</span>
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
        <el-table-column prop="itemName" label="项目名称" sortable></el-table-column>
        <el-table-column prop="originalPrice" label="原价" sortable>
          <template slot-scope="scope">
            <span>￥{{ scope.row.originalPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="discountMoney" label="折扣" sortable>
          <template slot-scope="scope">
            <span>￥{{ scope.row.discountMoney }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tradeMoney" label="现价" sortable>
          <template slot-scope="scope">
            <span>￥{{ scope.row.tradeMoney }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialoggroupjy",
  props: ["name"],
  data() {
    return {
      dialogGroupJYVisible: false,
      tradeCode: "",
      allmoney: 0,
      tableData: [],
      QueryItems: "",
      OrderType: "",
      orderCode: "",
      options: [],
      loading:true
    };
  },
  methods: {
    showData() {
      let that = this;
      this.$axios
        .get(this.$api.TransactionDetailItemsQueryByUnit, {
          params: {
            tradeCode: this.tradeCode,
            orderCode: this.orderCode
          }
        })
        .then(function(response) {
          that.loading=false;
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
    goBack() {
      this.dialogGroupJYVisible = false;
      setTimeout(() => {
        this.$parent.dialogGroupFormVisible = true;
      }, 300);
    }
  }
};
</script>
<style scoped>
#dialoggroupjy .customerName {
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
#dialoggroupjy >>> .el-table__body-wrapper {
  height: 400px;
  overflow-y: auto;
}
#dialoggroupjy >>> .el-icon-arrow-left {
  cursor: pointer;
}
</style>
