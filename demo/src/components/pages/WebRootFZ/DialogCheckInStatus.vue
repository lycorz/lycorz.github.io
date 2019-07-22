<template>
  <div id="checkInStatus">
    <!-- Form -->

    <el-dialog
      title="订单详情"
      :visible.sync="checkInStatusVisible"
      :close-on-click-modal="false"
      width="600px"
      append-to-body
    >
      <div slot="title">
        <span>客户到检</span>
      </div>
      <div>
        <div class="bigDiv bigIcon">
          <i class="el-icon-success bigSuccess" v-if="ifSuccess"></i>
          <i class="el-icon-warning bigWarning" v-else></i>
        </div>
        <div class="bigDiv bigTitle">
          <span v-if="ifSuccess">到检成功</span>
          <span v-else>到检失败</span>
        </div>
        <div class="bigDiv smallTitle" v-if="!ifSuccess">
          <span>该客户存在未缴费项目</span>
        </div>
      </div>
      <div>
        <section class="secition1">
          <span>姓名：</span>
          <span>{{personInfo.userName}}</span>
        </section>
        <section class="secition1">
          <span>性别：</span>
          <span>{{personInfo.sex}}</span>
        </section>
        <section class="secition1">
          <span>年龄：</span>
          <span>{{personInfo.age}}</span>
        </section>
        <section class="secition1">
          <span>电话:</span>
          <span>{{personInfo.telPhone}}</span>
        </section>
      </div>
      <div>
        <section class="secition2">
          <span>部门：</span>
          <span>{{personInfo.departMent}}</span>
        </section>
        <section class="secition2">
          <span>组别：</span>
          <span>{{personInfo.teamName}}</span>
        </section>
        <section class="secition2">
          <span>单位：</span>
          <span>{{personInfo.unit}}</span>
        </section>
        <section class="secition2">
          <span>地址：</span>
          <span>{{personInfo.address}}</span>
        </section>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        v-loading="loading"
        v-if="!ifSuccess"
      >
        <el-table-column type="index" label="序号" sortable></el-table-column>
        <el-table-column prop="itemName" label="未缴费项目" sortable></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkInStatusVisible = false;"  @keyup.13.native="alert(1)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "checkInStatus",
  props: ["name"],
  data() {
    return {
      checkInStatusVisible: false,
      tradeCode: "",
      ifShow: "none",
      // 人员信息
      personInfo: {},
      // 是否成功
      ifSuccess: false,
      tableData: [],
      QueryItems: "",
      OrderType: "",
      options: [],
      loading: false
    };
  },
  methods: {
    showData() {
      let that = this;
      this.$axios
        .get(this.$api.TransactionDetailQueryByPerson, {
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

  }
};
</script>
<style>
#checkInStatus >>> .el-dialog__header {
  padding-top: 0px !important;
  height: 50px;
}
#checkInStatus >>> .el-dialog__body {
  padding: 0px 20px;
}
.secition1 {
  display: inline-block;
  width: 130px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.secition2 {
  display: inline-block;
  width: 258px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sec2 {
  float: right;
}
.sec2 span:nth-child(2) {
  color: #f56c6c;
}
#checkInStatus .el-table__body-wrapper {
  height: 400px;
  overflow-y: auto;
}
#checkInStatus >>> .el-dialog__body {
  padding: 20px 20px;
}
#checkInStatus .el-table th {
  padding: 0px !important;
  background: rgba(246, 246, 246, 1);
}
.bigDiv {
  text-align: center;
}
.bigIcon {
  font-size: 48px;
}
.bigSuccess {
  color: #67c23a;
}
.bigWarning {
  color: rgba(255, 179, 5, 1);
}
.bigTitle {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 21px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
}
.smallTitle {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 30px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
}
</style>
