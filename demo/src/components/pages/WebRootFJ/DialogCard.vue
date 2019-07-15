<template>
  <div id="dialogcard">
    <!-- Form -->

    <el-dialog
      title="订单详情"
      :visible.sync="dialogcardVisible"
      :close-on-click-modal="false"
      width="1000px"
      append-to-body
    >
      <div slot="title">
        <span>刷卡</span>
      </div>
      <section style="display:flex;">
        <div class="seDiv">
          <section class="inline">
            <img src="./login-bg.jpg" alt="头像" class="tupian">
            <section>前台采集</section>
          </section>
          <section class="inline tupian2">
            <img src="./login-bg.jpg" alt="头像" class="tupian">
            <section>
              <a href>拍照</a>
            </section>
          </section>
        </div>
        <div class="seDiv">
          <div>
            姓名：
            <span></span>
          </div>
          <div>
            部门：
            <span></span>
          </div>
          <div>
            单位：
            <span></span>
          </div>
        </div>
        <div class="seDiv">
          <div>
            性别：
            <span></span>
          </div>
          <div>
            组别：
            <span></span>
          </div>
        </div>
        <div class="seDiv">
          年龄：
          <span></span>
        </div>
        <div class="seDiv">
          到检时间:
          <span></span>
        </div>
      </section>
      <section class="printe">
        <div>
          <div class="printeSel">
            <el-select v-model="value" placeholder="打印状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <el-button type="primary">打印</el-button>
        </div>
      </section>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        v-loading="loading"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="index" label="条码" sortable></el-table-column>
        <el-table-column prop="itemName" label="项目"></el-table-column>
        <el-table-column prop="itemName" label="打印时间" sortable></el-table-column>
        <el-table-column prop="itemName" label="打印状态" sortable></el-table-column>
      </el-table>

      <div style="display:flex;margin-top:10px;">
        <el-button type="primary" plain style="flex:1">合 并</el-button>
        <span class="ft">
          <i class="el-icon-warning-outline icft"></i>合并是指合并且重新生成条码
        </span>
        <el-button style="flex:1" type="primary" plain @click="dialogcardVisible = false;">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogcard",
  props: ["name"],
  data() {
    return {
      dialogcardVisible: false,
      tradeCode: "",
      ifShow: "none",
      allmoney: 0,
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
    }
  }
};
</script>
<style>
#dialogcard >>> .el-dialog__header {
  padding-top: 0px !important;
  height: 50px;
}
#dialogcard >>> .el-dialog__body {
  padding: 0px 20px;
}
.sec2 {
  float: right;
}
.sec2 span:nth-child(2) {
  color: #f56c6c;
}
#dialogcard .el-table__body-wrapper {
  height: 400px;
  overflow-y: auto;
}
#dialogcard >>> .el-dialog__body {
  padding: 20px 20px;
}
#dialogcard .el-table th {
  padding: 0px !important;
  background: rgba(246, 246, 246, 1);
}
.seDiv {
  flex: 1;
}
.seDiv > div {
  margin-bottom: 24px;
}
.tupian {
  width: 68px;
  height: 87px;
  margin-right: 10px;
  text-decoration: none;
}
.tupian2 {
  margin-left: 12px;
}
.inline {
  display: inline-block;
  text-align: center;
}
.printe {
  text-align: right;
}
.printeSel {
  display: inline-block;
  width: 126px;
  margin-right: 10px;
}
.ft {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 16px;
  color: rgba(153, 153, 153, 1);
  flex: 22 1 0%;
  line-height: 25px;
  margin-left: 10px;
}
.icft{
    margin-right:5px;color:#409FFF;font-size:14px;
}
</style>
