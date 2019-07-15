<template>
	<div class="content">
		<div class="topTitle">
      <span>科间分成</span>
    </div>
		<div class="peopleData">
      <div class="propleSearch">
        <el-select v-model="searchParams.IsHoliday" placeholder="统计类型" clearable>
          <el-option label="工作日" value="2"></el-option>
          <el-option label="节假日" value="1"></el-option>
        </el-select>
				<el-select v-model="searchParams.IsBack" placeholder="是否回传" clearable>
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
        <div style="display: inline-block;margin: 0 16px;">
          <el-date-picker
            v-model="timeRange"
            type="daterange"
						value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"></el-date-picker>
        </div>
        <el-button @click="getData(true)">查询</el-button>
				<div class="right">
					<el-button type="primary" @click="exportExcel()">导出报表</el-button>
				</div>
      </div>
    </div>
    <el-table :data="total.depts" style="width: 100%;" v-loading="loading" ref="multipleTable">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="deptType" label="分成类型名称" width="150"></el-table-column>
      <el-table-column prop="checkMoney" label="检查金额"  width="150">
				<template slot-scope="scope">
					￥{{scope.row.checkMoney}}
				</template>
			</el-table-column>
      <el-table-column prop="coefficient" label="分成系数"></el-table-column>
      <el-table-column prop="distributionMoney" label="分成金额">
				<template slot-scope="scope">
					￥{{scope.row.distributionMoney}}
				</template>
			</el-table-column>
      <el-table-column prop="checkNum" label="检查人数"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDetail(scope.row.deptTypeCode)">查看详情</el-button>
          <el-button type="text" size="small" @click="exportExcel(scope.row.deptTypeCode)">导出</el-button>
        </template>
      </el-table-column>
    </el-table>
		<div style="line-height: 40px;height: 40px;">
			<span class="subitem" style="display: inline-block;floar: left;margin: 0px 0;font-size: 14px;color:#606266;text-indent: 20px;">合计： </span>
			<span class="subitem" style="display: inline-block;floar: left;margin: 0px 8px;">检查总金额： ￥<span class="labelColor ftArial" font-weight: bold>{{total.checkMoneys | numFilter}}</span></span>
			<span class="subitem" style="display: inline-block;floar: left;margin: 0px 8px;">分成总金额： ￥<span class="labelColor ftArial" font-weight: bold>{{total.distributionMoneys | numFilter}}</span></span>
			<span class="subitem" style="display: inline-block;floar: left;margin: 0px 8px;">检查总人数： ￥<span class="labelColor ftArial" font-weight: bold>{{total.checkNums || 0}}</span></span>
		</div>
		<v-chart :id="'exampleId'" :option="chartOption" style="height: 400px;"></v-chart>
		<el-dialog title="科间分成明细" :visible.sync="detailModal" :close-on-click-modal="false" width="800px" @close="detail = []">
			<el-table :data="detail" style="width: 100%" height="300">
				<el-table-column prop="customerName" label="客户姓名"></el-table-column>
				<el-table-column prop="cardNum" label="卡号"></el-table-column>
				<el-table-column prop="itemName" label="项目名"></el-table-column>
				<el-table-column prop="money" label="金额">
					<template slot-scope="scope">
						￥{{scope.row.money | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="checkBeginTime" label="开始时间" width="160">
					<template slot-scope="scope">
						{{scope.row.checkBeginTime | formatDate}}
					</template>
				</el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="detailModal = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import VChart from 'common/VChart'
import moment from "moment";
import consts from "../../../../utils/const";
import $ from "jquery";
export default {
	name: 'TJBranchDivision',
	components: {VChart},
	data() {
		return {
			timeRange: [moment().subtract(1, 'month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
			searchParams:{
				IsHoliday: '',
				IsBack: '',
				BeginTime: '',
				EndTime: '',
				PageIndex: 1,
				PageSize: 10
			},
			loading: false,
			total: {},
			detailModal: false,
			detail: [],
			chartOption: {
				title: {
						text: '科间分成比对图'
				},
				color: ['#CBDFF3'],
				tooltip : {
						trigger: 'axis',
						axisPointer : {
								type : 'shadow'
						}
				},
				grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
				},
				xAxis : [
						{
								type : 'category',
								data : [],
								axisTick: {
										alignWithLabel: true
								}
						}
				],
				yAxis : [
					{
						type : 'value'
					}
				],
				series : [
					{
						name:'分成',
						type:'bar',
						data:[]
					}
				]
			}
		}
	},
	created() {
		this.getData(true);
	},
	methods: {
		getData(key){
			this.loading = true;
			if (!this.timeRange || this.timeRange.length !== 2) {
				this.searchParams.BeginTime = '';
				this.searchParams.EndTime = '';
			} else {
				this.searchParams.BeginTime = this.timeRange[0];
				this.searchParams.EndTime = this.timeRange[1];
			}
			this.chartOption.title.text = `${moment(this.searchParams.BeginTime).locale('zh-cn').format('ll')}至${moment(this.searchParams.EndTime).locale('zh-cn').format('LL')}科间分成比对图`
			this.$axios.post(this.$api.TjDeptDistributionQuery, this.searchParams).then(res => {
				if (res.data.status === 1) {
					this.chartOption.xAxis[0].data = [];
					this.chartOption.series[0].data = [];
					this.total = res.data.entity;
					this.total.depts.forEach(x => {
						this.chartOption.xAxis[0].data.push(x.deptType);
						this.chartOption.series[0].data.push(x.distributionMoney);
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
		openDetail(DeptTypeCode) {
			this.$axios.post(this.$api.TjDeptDistributionDetailQuery, {
				DeptTypeCode,
				IsHoliday: this.searchParams.IsHoliday,
				IsBack: this.searchParams.IsBack,
				BeginTime: this.searchParams.BeginTime,
				EndTime: this.searchParams.EndTime,
			}).then(res => {
				if(res.data.status === 1) {
					this.detail = res.data.entity;
					this.detailModal = true;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
		//导出报表
		exportExcel(DeptTypeCode){
			let loading = this.$loading({
				lock: true,
				text: '导出中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			if(DeptTypeCode) {
				this.$axios.post(this.$api.TjDeptDistributionDetailQuery, {
					DeptTypeCode,
					IsHoliday: this.searchParams.IsHoliday,
					IsBack: this.searchParams.IsBack,
					BeginTime: this.searchParams.BeginTime,
					EndTime: this.searchParams.EndTime,
				}).then(res => {
					if(res.data.status === 1) {
						this.$axios.post(this.$api.ExportTjDeptDistributionDetailReport, res.data.entity).then(res1 => {
							if(res1.data.status === 1) {
								this.downExcel(res1.data.entity);
							} else {
								this.$message.error(res1.data.message);
							}
							loading.close();
						}).catch(err1 => {
							this.$message.error(err1.data.message);
							loading.close();
						})
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(err => {
					this.$message.error(err.data.message);
				})

			} else {
				this.$axios.post(this.$api.ExportTjDeptDistributionReport, this.total.depts).then(res => {
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
.el-date-editor{
	width: 230px;
}
</style>
