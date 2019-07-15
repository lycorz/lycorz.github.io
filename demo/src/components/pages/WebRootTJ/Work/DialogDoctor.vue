<template>
  <div id="dialogFinancialInfo">
    <!-- Form -->
    <el-dialog
      title="订单详情"
      :visible.sync="dialogFinancialInfoVisible"
      :close-on-click-modal="false"
      width="600px"
      @open="getInit"
    >
      <div slot="title">
        <span v-if="roleType == 1">分检医生工作量明细</span>
        <span v-else-if="roleType == 2">主检医生工作量明细</span>
        <span v-else-if="roleType == 3">总检医生工作量明细</span>
      </div>
      <div
        style="display:flex;flex-direction:row;flex-wrap:wrap;margin-bottom:10px;"
        @keyup.13="search()"
      >
        <el-input
          placeholder="请搜索"
          v-model="inputValue"
          class="arcRadius"
          style="width: 150px;margin-right:10px;"
        >

        </el-input>
        <el-button @click="search()">查询</el-button>
        <el-button @click="exportExcel" type="primary">导出报表</el-button>
      </div>
      <el-table
        :data="datatable"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        v-loading="loading"
      >
        <el-table-column prop="customerName" label="客户姓名"></el-table-column>
        <el-table-column prop="cardNum" label="卡号"></el-table-column>
        <el-table-column prop="deptName" label="科室名" v-if="roleType == 1" sortable></el-table-column>
        <el-table-column prop="itemName" label="项目名" v-if="roleType == 1" sortable></el-table-column>
        <el-table-column prop="checkDate" label="提交时间" v-if="roleType == 1" sortable></el-table-column>
        <el-table-column prop="checkedTime" label="审核时间" v-else sortable></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFinancialInfoVisible = false;">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogFinancialInfo",
  data() {
    return {
      dialogFinancialInfoVisible: false,
      postEntity: {},
      // 角色类型 控制列表展示(根据父页面的下拉菜单决定的)
      roleType: null,
      datatable: [],
      inputValue: "",
      loading: true
    };
  },

  methods: {
    getInit() {
      this.showData();
    },
    showData() {
      let that = this;
      let entity = {};
      entity.doctorType = this.postEntity.doctorType;
      entity.holidayType = this.postEntity.holidayType;
      entity.overTimeType = this.postEntity.overTimeType;
      entity.dataRange = this.postEntity.dataRange;
      entity.doctorCode = this.postEntity.doctorCode;
      this.$axios
        .post(this.$api.ShowDetailInfo, entity)
        .then(function(response) {
          console.log(response.data.entity);
          that.loading = false;
          if (response.data.status == 1) {
            that.datatable = response.data.entity;
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    },
    search() {
      // 搜索条件为空加载全部列表
      if (this.inputValue == null || this.inputValue == "") {
        this.showData();
      } else {
        this.datatable = this.datatable.filter(ele => {
          ele.customerName == null ? (ele.customerName = "") : true;
          ele.cardNum == null ? (ele.cardNum = "") : true;
          ele.deptName == null ? (ele.deptName = "") : true;
          ele.itemName == null ? (ele.itemName = "") : true;
          return (
            ele.customerName.indexOf(this.inputValue) >= 0 ||
            ele.cardNum.indexOf(this.inputValue) >= 0 ||
            ele.deptName.indexOf(this.inputValue) >= 0 ||
            ele.itemName.indexOf(this.inputValue) >= 0
          );
        });
      }
    },
    // 导出列表报表
    exportExcel() {
      let that = this;
      this.$axios
        .post(this.$api.ExportDetailToExcel, this.datatable)
        .then(response => {
          console.log(response, 88990);
          that.$message.success(`导出成功`);
        })
        .catch(error => {
          that.$message.error(`错误：${error}`);
        });
    }
  }
};
</script>
<style>
#dialogFinancialInfo >>> .el-dialog__header {
  padding-top: 0px !important;
  height: 50px;
}
#dialogFinancialInfo >>> .el-dialog__body {
  padding: 0px 20px;
}
.sec2 {
  float: right;
}
.sec2 span:nth-child(2) {
  color: #f56c6c;
}
#dialogFinancialInfo .el-table__body-wrapper {
  height: 400px;
  overflow-y: auto;
}
#dialogFinancialInfo >>> .el-dialog__body {
  padding: 20px 20px;
}
#dialogFinancialInfo .el-table th {
  padding: 0px !important;
  background: rgba(246, 246, 246, 1);
}
</style>
