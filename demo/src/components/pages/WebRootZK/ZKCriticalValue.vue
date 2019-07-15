<template>
	<div class="content">
		<div class="topTitle">
      <span>危急值管理</span>
    </div>
		<div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="请输入关键字"
          v-model="params.Content"
          class="arcRadius"
					@keyup.enter.native="getData(true)"
          style="width: 150px;">
          
        </el-input>
        <el-select v-model="params.CheckType" placeholder="性别" clearable>
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
				<div class="importAge">
					年龄:
					<el-input
						v-model="params.BeginDiscount"
						placeholder="0"
						class="importIpt"
						>
					</el-input>
					<span style="padding: 0 8px;">至</span>
					<el-input
						v-model="params.EndDiscount"
						placeholder="0"
						class="importIpt"
						>
					</el-input>
				</div>
				<el-select v-model="params.CheckType" placeholder="短信状态" clearable>
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
				<el-select v-model="params.CheckType" placeholder="回访状态" clearable>
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
        <div style="display: inline-block;margin: 0 16px;">
          <el-date-picker
            v-model="params.timeRange"
            type="daterange"
						format
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
						:picker-options="pickerOptions"></el-date-picker>
        </div>
        <el-button @click="getData(true)">查询</el-button>
      </div>
    </div>
		<el-table :data="tableData" style="width: 100%;" v-loading="loading">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="customerName" label="客户姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="idCardNum" label="年龄"></el-table-column>
      <el-table-column prop="cardNum" label="卡号"></el-table-column>
      <el-table-column prop="tele" label="身份证号"></el-table-column>
      <el-table-column prop="unitName" label="短信状态"></el-table-column>
      <el-table-column prop="deptName" label="回访状态"></el-table-column>
      <el-table-column prop="deptName" label="危急值数量"></el-table-column>
      <el-table-column prop="deptName" label="操作">
				<template slot-scope="scope">
					<el-button type="text">详情</el-button>
				</template>
			</el-table-column>
    </el-table>
		<div class="fixBottom">
      <div class="right">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total,sizes, prev, pager, next"
          :total="total"
          :page-sizes="[10,20,50, 100]"
          @size-change="handleSizeChange"
          :current-page="searchParams.PageIndex"
        ></el-pagination>
      </div>
    </div>
	</div>
</template>
<script>
import moment from "moment";
export default {
	name: 'ZKCriticalValue',
	data() {
		return {
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
			},
			loading: false,
			timeRange: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
			params: {},
			searchParams: {},
			tableData: [],
			total: 0,

		}
	},
	created() {
		this.getData(true);
	},
	methods: {
		getData(key) {

		},
		// 处理分页fn
    handleCurrentChange(val) {
			this.searchParams.pageIndex = val;
			this.getData();
    },
    handleSizeChange(val) {
			this.searchParams.PageSize = val;
			this.searchParams.PageIndex = 1;
      this.getData();
		},
	}
}
</script>
<style scoped>
.propleSearch .el-select {
  display: inline-block;
  width: 120px;
  margin-left: 16px;
}
.importAge {
	display: inline-block;
	margin: 0 8px;
}
.importAge .el-input {
	width: 56px;
}
.importAge >>> .el-input__inner {
	padding: 0 5px;
}
.el-date-editor{
	width: 230px;
}
</style>

