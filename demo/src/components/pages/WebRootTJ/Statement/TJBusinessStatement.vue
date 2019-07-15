<template>
  <div class="content" id="business">
    <div class="topTitle">
      <span>项目分成</span>
    </div>
    <div class="peopleData">
      <div class="propleSearch">
        <el-select v-model="yOrSorM" placeholder="月报">
          <el-option
            v-for="item in yOrSorMOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="block">
          <el-date-picker v-model="chooseMonth" type="month" placeholder="选择月" v-if="yOrSorM == 0"></el-date-picker>
          <el-date-picker v-model="chooseYear" type="year" placeholder="选择年" v-else></el-date-picker>
        </div>
        <el-select v-model="S" placeholder="季度" v-if="yOrSorM == 1">
          <el-option
            v-for="item in SOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="getData()">查询</el-button>
        <div class="right">
          <el-button type="primary">导出报表</el-button>
        </div>
      </div>
    </div>
    <div class="rqlx">人群类型表</div>
    <div class="tableData">
      <el-table :data="tableData" style="width: 100%;" v-loading="loading" ref="multipleTable">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="typeName" label="统计类型" width="150"></el-table-column>
        <el-table-column prop="manNum" label="男性"></el-table-column>
        <el-table-column prop="girlNum" label="女性" width="100"></el-table-column>
        <el-table-column prop="amount" label="总数" width="100"></el-table-column>
      </el-table>
    </div>
    <div class="rqlx">报告类型表</div>
    <div class="tableData">
      <el-table :data="tableDataType" style="width: 100%;" v-loading="loading" ref="multipleTable">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="typeName" label="统计类型" width="150"></el-table-column>
        <el-table-column prop="amount" label="总数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "TJBusinessStatement",
  data() {
    return {
      // 年季月
      yOrSorM: null,
      yOrSorMOptions: [],
      // 季度
      S: 0,
      SOptions: [],
      // 套餐
      Package: null,
      PackageOptions: [],
      // 体检形势
      MeasureType: true,
      // 订单类型
      OrderType: null,
      OrderTypeOptions: [],
      // 来源
      OrderSource: true,
      // 客户类型
      CustomerType: null,
      // 年份
      chooseYear: moment(),
      // 月份
      chooseMonth: moment(),
      // 是否免费
      ifFree: true,

      params: {},
      tableData: [],
      tableDataType: [],
      loading: false,
      searchParams: {},
      total: 0
    };
  },
  async mounted() {
    // 获取枚举
    // 获取年季月枚举
    let GetReportTypeEnum = this.$axios.get(this.$api.GetReportTypeEnum);
    // 季度类型
    let GetQuarterTypeEnum = this.$axios.get(this.$api.GetQuarterTypeEnum);
    Promise.all([GetReportTypeEnum, GetQuarterTypeEnum])
      .then(res => {
        console.log(this.chooseYear, this.chooseMonth, 8890);
        // 年季月枚举
        this.yOrSorMOptions = res[0].data.entity;
        this.yOrSorM = res[0].data.entity[0].value;
        // 季度类型
        this.SOptions = res[1].data.entity;
        this.S = res[1].data.entity[0].value;
        // 初始化列表
        this.getData();
      })
      .catch(error => {
        this.$message.error(`错误：${error}`);
      });
  },
  watch: {
    // chooseMonth(val){
    //   this.hello = 1;
    // }
  },
  methods: {
    // 初始化列表
    getData() {
      console.log(this.chooseYear.format("YYYY") + "-01-01 00:00:00.000", 8456);
      // 拼接参数
      let entity = {};
      // 如果选的是月
      if (this.yOrSorM == 0) {
        entity.begin = moment(this.chooseMonth)
          .startOf("month")
          .format();
        entity.end = moment(this.chooseMonth)
          .endOf("month")
          .format();
      }
      // 如果是季
      else if (this.yOrSorM == 1) {
        entity.begin = moment(this.chooseYear)
          .quarter(this.S + 1)
          .startOf("quarter")
          .format();
        entity.end = moment(this.chooseYear)
          .quarter(this.S + 1)
          .endOf("quarter")
          .format();
      }
      // 如果是年
      else {
        entity.begin = moment(this.chooseYear)
          .startOf("year")
          .format();
        entity.end = moment(this.chooseYear)
          .endOf("year")
          .format();
      }
      this.$axios
        .get(this.$api.TjMonthReportQuery, { params: entity })
        .then(res => {
          if (res.data.status === 1) {
            this.tableData = res.data.entity.orderType;
            this.tableDataType =  res.data.entity.reportType;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          this.$message.error(err.data.message);
        });
    }
  }
};
</script>

<style scoped>
.propleSearch {
  border-bottom: 0px !important;
}

.propleSearch .el-select,
.propleSearch .block {
  display: inline-block;
  width: 120px;
  margin-right: 16px;
}
.propleSearch .block >>> .el-input__inner {
  width: 125px;
}
#business >>> .el-date-editor.el-input,
#business >>> .el-date-editor.el-input__inner {
  width: 127px;
}
#business .tableData {
  padding: 0px 10px;
}
#business >>> .el-table {
  border: 1px solid #ebeef5;
}
#business >>> th {
  background: rgba(246, 246, 246, 1);
}
#business .rqlx {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 60px;
  height: 16px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 16px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
}
.red {
  color: #f56c6c;
}
.green {
  color: #67c23a;
}
</style>
