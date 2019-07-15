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
        <el-select v-model="MeasureType" placeholder="体检形式" clearable>
          <el-option label="个检" :value="true"></el-option>
          <el-option label="团检" :value="false"></el-option>
        </el-select>
        <el-select v-model="OrderSource" placeholder="订单来源" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="CustomerType" placeholder="客户类型" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-select v-model="Package" placeholder="套餐种类" clearable>
          <el-option
            v-for="item in PackageOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="OrderType" placeholder="订单类型" clearable>
          <el-option
            v-for="item in OrderTypeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="ifFree" placeholder="是否免费" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
        <el-button @click="getData()">查询</el-button>
        <div class="right">
          <el-button type="primary">导出报表</el-button>
        </div>
      </div>
    </div>
    <div class="tableData">
      <el-table :data="tableData" style="width: 100%;" v-loading="loading" ref="multipleTable">
        <el-table-column prop="number" label="序号" width="50"></el-table-column>
        <el-table-column prop="statisticsTypeName" label="统计类型" width="150"></el-table-column>
        <el-table-column prop="statisticsTypeCount" label="统计数量"></el-table-column>
        <el-table-column prop="ratio" label="占比" width="100"></el-table-column>
        <el-table-column prop="yoy" label="同比" width="100">
          <template slot-scope="scope">
            <div :class="scope.row.yoyFlag == 0?'red':'green'">
              <span v-if="scope.row.yoyFlag == 0">↓</span>
              <span v-else>↑</span>
              <span>{{scope.row.yoy}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="chain" label="环比" width="100">
          <template slot-scope="scope">
            <div :class="scope.row.chainFlag == 0?'red':'green'">
              <span v-if="scope.row.chainFlag == 0">↓</span>
              <span v-else>↑</span>
              <span>{{scope.row.chain}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display:flex">
      <div id="myChart"></div>
      <div id="myChart1"></div>
      <div id="myChart2"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
let barChart = require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "TJBusinessStatement",
  data() {
    return {
      // 年季月
      yOrSorM: null,
      yOrSorMOptions: [],
      // 季度
      S: null,
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
      chooseYear: moment().format(),
      // 月份
      chooseMonth: moment().format(),
      // 是否免费
      ifFree: true,

      params: {},
      tableData: [],
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
    // 【获取套餐种类】
    let GetPackageEnum = this.$axios.get(this.$api.GetPackageEnum);
    // 【订单类型】
    let GetOrderType = this.$axios.get(this.$api.GetOrderType);
    Promise.all([
      GetReportTypeEnum,
      GetQuarterTypeEnum,
      GetPackageEnum,
      GetOrderType
    ])
      .then(res => {
        // 年季月枚举
        this.yOrSorMOptions = res[0].data.entity;
        this.yOrSorM = res[0].data.entity[0].value;
        // 季度类型
        this.SOptions = res[1].data.entity;
        this.S = res[1].data.entity[0].value;
        // 季度类型
        this.PackageOptions = res[2].data.entity;
        this.Package = res[2].data.entity[0].value;
        // 季度类型
        this.OrderTypeOptions = res[3].data.entity;
        this.OrderType = res[3].data.entity[0].value;
        // 初始化列表
        this.getData();
      })
      .catch(error => {
        this.$message.error(`错误：${error}`);
      });
  },
  methods: {
    // 初始化列表
    getData() {
      // 拼接参数
      let entity = {};
      entity.reportType = this.yOrSorM;
      // 如果选的是月
      if (this.yOrSorM == 0) {
        entity.reportTypeCondition = this.chooseMonth;
      }
      // 如果是季
      else if (this.yOrSorM == 1) {
        entity.reportTypeCondition = this.chooseYear;
        entity.quarterType = this.S;
      } else {
        entity.reportTypeCondition = this.chooseYear;
      }
      if (this.OrderSource != null) {
        entity.isPerson = this.OrderSource;
      }
      if (this.Package != null) {
        entity.packageClass = this.Package;
      }
      if (this.OrderType != null) {
        entity.orderType = this.OrderType;
      }
      if (this.ifFree != null) {
        entity.isFree = this.ifFree;
      }
      this.$axios
        .post(this.$api.QueryStatisticsReportForFinance, entity)
        .then(res => {
          if (res.data.status === 1) {
            console.log(res.data.entity);
            this.tableData = res.data.entity;
            // 渲染柱状图
            this.drawLine();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          this.$message.error(err.data.message);
        });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      let myChart1 = echarts.init(document.getElementById("myChart1"));
      let myChart2 = echarts.init(document.getElementById("myChart2"));
      // chart横坐标
      let mychartAxis = [];
      let mychartYxis = [];
      mychartAxis.push(this.tableData[0].statisticsDate);
      mychartAxis.push(this.tableData[0].yoyDate);
      mychartAxis.push(this.tableData[0].chainDate);
      mychartYxis.push(this.tableData[0].statisticsTypeCount);
      mychartYxis.push(this.tableData[0].yoyCount);
      mychartYxis.push(this.tableData[0].chainCount);
      // chart1横坐标
      let mychartAxis1 = [];
      let mychartYxis1 = [];
      mychartAxis1.push(this.tableData[1].statisticsDate);
      mychartAxis1.push(this.tableData[1].yoyDate);
      mychartAxis1.push(this.tableData[1].chainDate);
      mychartYxis1.push(this.tableData[1].statisticsTypeCount);
      mychartYxis1.push(this.tableData[1].yoyCount);
      mychartYxis1.push(this.tableData[1].chainCount);
      // chart2横坐标
      let mychartAxis2 = [];
      let mychartYxis2 = [];
      mychartAxis2.push(this.tableData[2].statisticsDate);
      mychartAxis2.push(this.tableData[2].yoyDate);
      mychartAxis2.push(this.tableData[2].chainDate);
      mychartYxis2.push(this.tableData[2].statisticsTypeCount);
      mychartYxis2.push(this.tableData[2].yoyCount);
      mychartYxis2.push(this.tableData[2].chainCount);
      // 绘制图表
      myChart.setOption({
        // title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: mychartAxis
        },
        yAxis: {},
        series: [
          {
            name: "日期",
            type: "bar",
            data: mychartYxis,
            itemStyle: {
              normal: {
                color: "#CBDFF3" //柱状图的背景颜色
              }
            },
            // 柱状图宽度
            barWidth: 65
          }
        ]
      });
      // 绘制图表
      myChart1.setOption({
        // title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: mychartAxis1
        },
        yAxis: {},
        series: [
          {
            name: "日期",
            type: "bar",
            data: mychartYxis1,
            itemStyle: {
              normal: {
                color: "#CBDFF3" //柱状图的背景颜色
              }
            },
            // 柱状图宽度
            barWidth: 65
          }
        ]
      });
      // 绘制图表
      myChart2.setOption({
        // title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: mychartAxis2
        },
        yAxis: {},
        series: [
          {
            name: "日期",
            type: "bar",
            data: mychartYxis2,
            itemStyle: {
              normal: {
                color: "#CBDFF3" //柱状图的背景颜色
              }
            },
            // 柱状图宽度
            barWidth: 65
          }
        ]
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
#business .tableData {
  padding: 0px 10px;
}
#business >>> .el-table {
  border: 1px solid #ebeef5;
}
#business >>> th {
  background: rgba(246, 246, 246, 1);
}
#myChart,
#myChart1,
#myChart2 {
  height: 300px;
  flex: 0 1 400px;
}
.red {
  color: #f56c6c;
}
.green {
  color: #67c23a;
}
</style>
