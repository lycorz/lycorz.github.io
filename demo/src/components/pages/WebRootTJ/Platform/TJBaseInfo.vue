<template>
	<div class="content">
		<div class="topTitle">
      <span>基础信息统计</span>
    </div>
		<div style="overflow-y: auto;">
			<div class="peopleData">
				<div class="propleSearch">
					<el-date-picker
						v-model="year"
						type="year"
						value-format="yyyy"
						style="width: 100px;margin-right: 16px;"
						placeholder="选择年">
					</el-date-picker>
					<el-button @click="getData(true)">查询</el-button>
					<div class="right">
						<el-button type="primary">导出报表</el-button>
					</div>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%;" v-loading="loading">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="reportStatus" label="医生名" width="100"></el-table-column>
				<el-table-column prop="reportStatus" label="工作量"  width="100"></el-table-column>
				<el-table-column prop="reportStatus" label="工作天数"></el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="text" size="small">查看详情</el-button>
						<el-button type="text" size="small">导出</el-button>
					</template>
				</el-table-column>
			</el-table>
			 <v-chart :id="'exampleId'" :option="chartOption" style="height: 400px;"></v-chart>
		</div>
	</div>
</template>
<script>
import moment from 'moment';
import VChart from 'common/VChart'
export default {
	name: 'TJBaseInfo',
	components: {VChart},
	data() {
		return {
			year: moment().format('YYYY'),
			tableData: [],
			loading: false,
			chartOption: {}
		}
	},
	created(){
		this.getData(true);
		this.getOptions();
	},
	methods: {
		getData(key) {},
		getOptions() {
			setTimeout(() => {
				this.chartOption = {
				title: {
						text: '折线图堆叠111'
				},
				tooltip: {
						trigger: 'axis'
				},
				legend: {
						data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
				},
				grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
				},
				toolbox: {
						feature: {
								saveAsImage: {}
						}
				},
				xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一','周二','周三','周四','周五','周六','周日']
				},
				yAxis: {
						type: 'value'
				},
				series: [
						{
								name:'邮件营销',
								type:'line',
								stack: '总量',
								data:[120, 132, 101, 134, 90, 230, 210]
						},
						{
								name:'联盟广告',
								type:'line',
								stack: '总量',
								data:[220, 182, 191, 234, 290, 330, 310]
						},
						{
								name:'视频广告',
								type:'line',
								stack: '总量',
								data:[150, 232, 201, 154, 190, 330, 410]
						},
						{
								name:'直接访问',
								type:'line',
								stack: '总量',
								data:[320, 332, 301, 334, 390, 330, 320]
						},
						{
								name:'搜索引擎',
								type:'line',
								stack: '总量',
								data:[820, 932, 901, 934, 1290, 1330, 1320]
						}
				]
			}

			}, 2000)
		}
	}
}
</script>

