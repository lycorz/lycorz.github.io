<template>
  <div class="content">
    <div class="topTitle">
      <span>医生工作量</span>
    </div>
    <div style="overflow-y: auto;" id="doctorWorkLoad">
      <div class="peopleData">
        <div class="propleSearch">
          <el-select v-model="doctorTypeValue" placeholder="医生类型">
            <el-option
              v-for="item in doctorType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="holidayTypeValue" placeholder="统计类型" clearable>
            <el-option
              v-for="item in holidayType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="overTimeTypeValue" placeholder="工时类型" clearable>
            <el-option
              v-for="item in overTimeType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <div style="display: inline-block;margin: 0 16px;">
            <el-date-picker
              v-model="timeRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </div>
          <el-button @click="getList()">查询</el-button>
          <div class="right">
            <el-popover placement="bottom" trigger="click">
              <el-table :data="gridData">
                <el-table-column property="holiday" width="120px" label="日期"></el-table-column>
                <el-table-column property="dayOfWeekNameCn" label="星期"></el-table-column>
                <el-table-column property="holidayTypeName" label="假期类型"></el-table-column>
              </el-table>
              <el-button slot="reference" @click="getHoliday">查看假期</el-button>
            </el-popover>
            <el-button type="primary" style="margin-left:10px;" @click="exportExcel">导出报表</el-button>
          </div>
        </div>
      </div>
      <el-table :data="listData" style="width: 100%;" v-loading="loading">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="doctorName" label="医生名" width="100"></el-table-column>
        <el-table-column prop="deptNames" label="科室名" width="410"></el-table-column>
        <el-table-column prop="itemNames" label="项目名" width="410"></el-table-column>
        <el-table-column prop="workLoads" label="工作量" width="80"></el-table-column>
        <el-table-column prop="workDays" label="工作天数"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="watchDetail(scope.row)">查看详情</el-button>
            <!-- <el-button type="text" size="small">导出</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="exampleId" style="height:314px;width:834px;"></div>
    <dialogfinancial ref="dialogfinancial"></dialogfinancial>
  </div>
</template>
<script>
// 引入echarts 按需加载，没用import是因为要写全路径
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
let barChart = require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

import moment from "moment";
import { promised } from "q";
import dialogfinancial from "./DialogDoctor.vue";
export default {
  name: "TJDoctorsWorkload",
  components: { dialogfinancial },
  data() {
    return {
      //查询条件下拉菜单options
      doctorType: [],
      holidayType: [],
      overTimeType: [],
      // 查询条件选中值
      doctorTypeValue: null,
      holidayTypeValue: null,
      overTimeTypeValue: null,
      // 列表数据
      listData: [],
      // 柱状图x轴
      xAxis: [],
      year: moment().format("YYYY"),
      loading: false,
      chartOption: {},
      // 查看假期数据对象
      gridData: [],
      // 时间段
      timeRange: [],
      pickerOptions: {
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
    };
  },
  async mounted() {
    this.getOptions();
    // 获取医生类型枚举
    let a = this.$axios.get(this.$api.GetDoctorType);
    // 获取统计类型枚举
    let b = this.$axios.get(this.$api.GetHolidayType);
    // 获取工时类型枚举
    let c = this.$axios.get(this.$api.GetOvertimeType);
    // 枚举加载完成后加载列表
    let enumFinished = await Promise.all([a, b, c]).catch(error => {
      this.$message.error(`错误：${error}`);
    });
    let that = this;
    // 如果接口没有内部错误，则给枚举赋值
    enumFinished.forEach((ele, index) => {
      if (index === 0) {
        that.doctorType = ele.data.entity;
        that.doctorTypeValue = ele.data.entity[0].value;
      } else if (index === 1) {
        that.holidayType = ele.data.entity;
        that.holidayTypeValue = ele.data.entity[0].value;
      } else if (index === 2) {
        that.overTimeType = ele.data.entity;
        that.overTimeTypeValue = ele.data.entity[0].value;
      }
    });
    // 设置默认时间
    var now = new Date();
    var startDate = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    )
      .toISOString()
      .slice(0, 10);
    var endDate = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    )
      .toISOString()
      .slice(0, 10);
    this.timeRange = [];
    this.timeRange.push(startDate);
    this.timeRange.push(endDate);
    // 赋值后加载列表
    this.getList();
  },
  watch: {
    listData() {
      let xarr = [];
      let yarr = [];
      this.listData.forEach((ele, index) => {
        let str = ele.doctorName;
        let stry = ele.workLoads;
        xarr.push(str);
        yarr.push(stry);
      });
      this.xAxis = xarr;
      this.yAxis = yarr;
      console.log(this.yAxis);
      this.getOptions();
    }
  },
  methods: {
    // 获取工作量列表
    getList() {
      let that = this;
      // 若假期类型为空，则查看全部；若统计类型为空则查看全部，传99
      let holidayTypeVal = null;
      let overTimeTypeVal = null;
      this.holidayTypeValue == null
        ? (holidayTypeVal = 99)
        : (holidayTypeVal = this.holidayTypeValue);
      this.overTimeTypeValue == null
        ? (overTimeTypeVal = 99)
        : (overTimeTypeVal = this.overTimeTypeValue);
      this.$axios
        .post(this.$api.GetWorkLoadInfos, {
          doctorType: this.doctorTypeValue,
          holidayType: holidayTypeVal,
          overTimeType: overTimeTypeVal,
          dataRange: this.timeRange
        })
        .then(response => {
          this.listData = response.data.entity;
        })
        .catch(error => {
          that.$message.error(`错误：${error}`);
        });
    },
    // 获取医生类型枚举
    getOptions() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("exampleId"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: `${new Date(this.timeRange[0]).getFullYear() +
            "-" +
            (new Date(this.timeRange[0]).getMonth() + 1) +
            "-" +
            new Date(this.timeRange[0]).getDate()}至${new Date(
            this.timeRange[1]
          ).getFullYear() +
            "-" +
            (new Date(this.timeRange[1]).getMonth() + 1) +
            "-" +
            new Date(this.timeRange[1]).getDate()}工作量比对图`
        },
        tooltip: {},
        xAxis: {
          data: this.xAxis
        },
        yAxis: {},
        series: [
          {
            name: "工作量",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#CBDFF3" //柱状图的背景颜色
              }
            },
            // 柱状图宽度
            barWidth: 65,
            data: this.yAxis
          }
        ]
      });
    },
    // 查看详情
    watchDetail(row) {
      this.$refs.dialogfinancial.dialogFinancialInfoVisible = true;
      this.$refs.dialogfinancial.postEntity = row;
      this.$refs.dialogfinancial.roleType = this.doctorTypeValue;
    },
    // 获取假期
    getHoliday() {
      let that = this;
      this.$axios
        .post(this.$api.GetHolidayByDataRange, {
          doctorType: this.doctorTypeValue,
          holidayType: this.holidayTypeValue,
          overTimeType: this.overTimeTypeValue,
          dataRange: this.timeRange
        })
        .then(response => {
          console.log(response, 998);
          this.gridData = response.data.entity;
        })
        .catch(error => {
          that.$message.error(`错误：${error}`);
        });
    },
    // 导出列表报表
    exportExcel() {
      let that = this;
      this.$axios
        .post(this.$api.ExportWorkLoadToExcel, this.listData)
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
<style scoped>
.propleSearch .el-select {
  display: inline-block;
  width: 120px;
  margin-left: 16px;
}
#doctorWorkLoad >>> .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>


