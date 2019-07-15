<template>
	<div class="content">
		<div class="topTitle">
      <span>收入概况</span>
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
					<el-button @click="getData">查询</el-button>
					<div class="right">
						<el-button type="primary" @click="exportExcel">导出报表</el-button>
					</div>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%;" v-loading="loading">
				<el-table-column prop="month" label="统计月份">
					<template slot-scope="scope">
						{{Number(scope.row.month)}}月份
					</template>
				</el-table-column>
				<el-table-column prop="ysr" label="当月应收">
					<template slot-scope="scope">
						￥{{scope.row.ysr | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="ssr" label="当月体检实收">
					<template slot-scope="scope">
						￥{{scope.row.ssr | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="zsr" label="当月总收入">
					<template slot-scope="scope">
						￥{{scope.row.zsr | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="cost" label="当月成本">
					<template slot-scope="scope">
						￥{{scope.row.cost | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="profit" label="当月利润">
					<template slot-scope="scope">
						￥{{scope.row.profit | numFilter}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="openDetail(scope.row.month)" v-if="scope.row.cost">成本列表</el-button>
						<el-button type="text" size="small" @click="exportExcel(scope.row)">导出当月报表</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="margin: 20px 0;text-indent: 18px;">
				<span class="subitem" style="display: inline-block;floar: left;margin: 5px 0;font-size: 14px;color:#606266">合计： </span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 5px 0;">毛收入： ￥<span class="labelColor ftArial" font-weight: bold>{{total.ysr | numFilter}}</span></span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 5px 0;">体检实收： ￥<span class="labelColor ftArial" font-weight: bold>{{total.ssr | numFilter}}</span></span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 5px 0;">总收入： ￥<span class="labelColor ftArial" font-weight: bold>{{total.zsr | numFilter}}</span></span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 5px 0;">成本： ￥<span class="labelColor ftArial" font-weight: bold>{{total.cost | numFilter}}</span></span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 5px 0;">利润： ￥<span class="labelColor ftArial" font-weight: bold>{{total.profit | numFilter}}</span></span>
			</div>

			 <v-chart :id="'exampleId'" :option="chartOption" style="height: 400px;"></v-chart>
		</div>
		<el-dialog title="成本列表" :visible.sync="incomeDetailModal" :close-on-click-modal="false" width="800px" @close="incomeDetail = []">
			<el-table :data="incomeDetail" style="width: 100%" height="300">
				<el-table-column prop="itemName" label="成本名称"></el-table-column>
				<el-table-column prop="fullPrice" label="成本金额">
					<template slot-scope="scope">
						￥{{scope.row.fullPrice | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="checkStatus" label="填写人"></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="incomeDetailModal = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import moment from 'moment';
import VChart from 'common/VChart';
import consts from "../../../../utils/const";
import $ from "jquery";
export default {
	name: 'TJIncome',
	components: {VChart},
	data() {
		return {
			year: moment().format('YYYY'),
			tableData: [],
			incomeDetailModal: false,
			incomeDetail: [],
			loading: false,
			total: {},
			chartOption: {
				title: {
						text: '收入概况'
				},
				tooltip: {
						trigger: 'axis'
				},
				legend: {
						data:['当月应收','当月体检实收','当月总收入','当月成本', '当月利润']
				},
				grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
				},
				xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
				},
				yAxis: {
						type: 'value'
				},
				series: [
						{
								name:'当月应收',
								type:'line',
								stack: '总量',
								data:[]
						},
						{
								name:'当月体检实收',
								type:'line',
								stack: '总量',
								data:[]
						},
						{
								name:'当月总收入',
								type:'line',
								stack: '总量',
								data:[]
						},
						{
								name:'当月成本',
								type:'line',
								stack: '总量',
								data:[]
						},
						{
								name:'当月利润',
								type:'line',
								stack: '总量',
								data:[]
						}
				]
			},
		}
	},
	created(){
		this.getData();
	},
	methods: {
		//获取数据
		getData() {
			if(!this.year) {
				this.$message.error('请先选择需要查询的年份');
				return;
			}
			this.loading = true;
			this.total.ysr = 0;
			this.total.ssr = 0;
			this.total.zsr = 0;
			this.total.cost = 0;
			this.total.profit = 0;
			this.chartOption.series[0].data = [];
			this.chartOption.series[1].data = [];
			this.chartOption.series[2].data = [];
			this.chartOption.series[3].data = [];
			this.chartOption.series[4].data = [];
			this.chartOption.xAxis.data = [];

			this.$axios.get(this.$api.TjCostQuery,{params: {Year: this.year}}).then(res => {
				if(res.data.status === 1) {
					this.tableData = res.data.entity;
					this.chartOption.title.text = this.year + this.chartOption.title.text;
					this.tableData.forEach((x,index) => {
						this.chartOption.xAxis.data.push(Number(x.month)+'月份');
						this.chartOption.series[0].data.push(x.ysr);
						this.chartOption.series[1].data.push(x.ssr);
						this.chartOption.series[2].data.push(x.zsr);
						this.chartOption.series[3].data.push(x.cost);
						this.chartOption.series[4].data.push(x.profit);
						this.total.ysr += x.ysr;
						this.total.ssr += x.ssr;
						this.total.zsr += x.zsr;
						this.total.cost += x.cost;
						this.total.profit += x.profit;
					})
				} else {
					this.$message.error(res.data.message);
				}
				this.loading = false;
			}).catch(err => {
				this.$message.error(err.data.message);
				this.loading = false;
			})
		},
		//获取详情
		openDetail(Month){
			this.$axios.get(this.$api.TjCostDetailQuery, {params: {
				Year: this.year,
				Month
			}}).then(res => {
				if(res.data.status === 1) {
					this.incomeDetail = res.data.entity;
					this.incomeDetailModal = true;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
					this.$message.error(err.data.message);
				})
		},
		//导出报表
		exportExcel(data){
			let loading = this.$loading({
				lock: true,
				text: '导出中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			if(data.month) {
				this.$axios.post(this.$api.ExportTjFinanceDetailReport, data).then(res => {
					if(res.data.status === 1) {
						this.downExcel(res.data.entity);
					} else {
						this.$message.error(res.data.message);
					}
					loading.close();
				}).catch(err => {
					this.$message.error(err.data.message);
					loading.close();
				})
			} else {
				this.$axios.post(this.$api.ExportTjFinanceReport, this.tableData).then(res => {
					if(res.data.status === 1) {
						this.downExcel(res.data.entity);
					} else {
						this.$message.error(res.data.message);
					}
					loading.close();
				}).catch(err => {
					this.$message.error(err.data.message);
					loading.close();
				})
			}
		},
		downExcel(url) {
			let $form = $('<form method="GET"></form>');
			$form.attr("action", consts.SF_REPORT_PATH + url);
			$form.appendTo($("body"));
			$form.submit();
		}
	},
	watch: {
		year: function(val, oldVal){
			if (val !== oldVal) {
				this.getData();
			}
		}
	}
}
</script>
