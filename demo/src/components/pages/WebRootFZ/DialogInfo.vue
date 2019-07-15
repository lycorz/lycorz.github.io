<template>
  <div id="dialogInfo">
    <!-- Form -->

    <el-dialog
      title="订单详情"
      :visible.sync="dialogInfoVisible"
      :close-on-click-modal="false"
      width="600px"
      @open="getInit"
    >
      <div slot="title">
        <span>个检订单</span>
      </div>
      <div style="display:flex;flex-direction:row;flex-wrap:wrap;">
        <section class="secition1">
          <span>姓名：</span>
          <span>{{customerInfo.customerName}}</span>
        </section>
        <section class="secition1">
          <span>性别：</span>
          <span>{{customerInfo.gender}}</span>
        </section>
        <section class="secition1">
          <span>年龄：</span>
          <span>{{customerInfo.age}}</span>
        </section>
        <section class="secition1">
          <span>组别：</span>
          <span>{{customerInfo.teamName}}</span>
        </section>
        <section class="secition1">
          <span>单位：</span>
          <span>{{customerInfo.unitName}}</span>
        </section>
        <section class="secition1">
          <span>部门</span>
          <span>{{customerInfo.deptName}}</span>
        </section>
      </div>
      <el-table
        :data="datatable"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        v-loading="loading"
      >
        <el-table-column prop="itemName" label="项目名称" sortable></el-table-column>
        <el-table-column prop="statusInfo" label="状态" sortable>
          <!-- <template slot-scope="scope">
            <span>￥{{ scope.row.discountMoney }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="ordetItemDetails" label="详情" sortable>
          <!-- <template slot-scope="scope">
            <span>￥{{ scope.row.tradeMoney }}</span>
          </template> -->
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInfoVisible = false;">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogInfo",
  data() {
    return {
      dialogInfoVisible: false,
      orderCode: "",
      customerInfo:{},
      datatable:[],
      loading: true
    };
  },

  methods: {
    getInit() {
      this.showData();
    },
    showData() {
      let that = this;
      this.$axios
        .post(this.$api.GetDdOrderInfo, {
          orderCode: that.orderCode
        })
        .then(function(response) {
          console.log(response.data.entity)
          that.loading = false;
          if (response.data.status == 1) {
            that.customerInfo = response.data.entity;
            that.datatable = response.data.entity.lstOrderItemInfos;
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    }
  }
};
</script>
<style>
.dialogInfo >>> .el-dialog__header {
  padding-top: 0px !important;
  height: 50px;
}
.dialogInfo >>> .el-dialog__body {
  padding: 0px 20px;
}
.secition1 {
  flex: 1 0 140px;
  height: 30px;
  line-height: 30px;
}
.sec2 {
  float: right;
}
.sec2 span:nth-child(2) {
  color: #f56c6c;
}
#dialogInfo .el-table__body-wrapper {
  height: 400px;
  overflow-y: auto;
}
#dialogInfo >>> .el-dialog__body {
  padding: 20px 20px;
}
#dialogInfo .el-table th {
  padding: 0px !important;
  background: rgba(246, 246, 246, 1);
}
</style>
