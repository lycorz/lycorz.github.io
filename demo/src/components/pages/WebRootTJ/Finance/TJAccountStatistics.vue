<template>
	<div class="content">
		<div class="content-left" style="position: relative;">
			<el-button style="position: absolute;top: 10px;right: 20px;z-index: 1;" v-no-more-click @click="exportExcel">导出报表</el-button>
			<el-tabs v-model="activeName" @tab-click="tabsClick">
				<el-tab-pane label="体检中单位" name="0">
					<div class="peopleData">
						<div class="propleSearch">
							<el-input class="arcRadius" v-model="unitName[0]" placeholder="请输入内容" style="width: 200px;margin-right: 16px;" @keyup.enter.native="getData(0)"></el-input>
							<el-button @click="getData(0)" v-no-more-click>查询</el-button>
						</div>
					</div>
					<el-table :data="tableData[0]" style="width: 100%;" v-loading="loading[0]">
						<el-table-column type="index" width="50" label="序号"></el-table-column>
						<el-table-column prop="unitName" label="单位名称"></el-table-column>
						<el-table-column prop="personNum" label="订单人数"></el-table-column>
						<el-table-column prop="contractMoney" label="合同金额">
							<template slot-scope="scope">
								￥{{scope.row.contractMoney | numFilter}}
							</template>
						</el-table-column>
						<el-table-column prop="checkedNum" label="已检人数"></el-table-column>
						<el-table-column prop="checkedMoney" label="已检金额" >
							<template slot-scope="scope">
								￥{{scope.row.checkedMoney | numFilter}}
							</template>
						</el-table-column>
						<el-table-column prop="checkBeginTime" label="开始时间"></el-table-column>
					</el-table>
					<div class="fixBottom">
						<div class="right">
							<el-pagination
								@current-change="handleCurrentChange"
								layout="total,sizes, prev, pager, next"
								:total="total[0]"
								:page-sizes="[10,20,50, 100]"
								@size-change="handleSizeChange"
								:current-page="searchParams.PageIndex"
							></el-pagination>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="欠款单位" name="1">
					<div class="peopleData">
						<div class="propleSearch">
							<el-input class="arcRadius" v-model="unitName[1]" placeholder="请输入内容" style="width: 200px;margin-right: 16px;" @keyup.enter.native="getData(1)"></el-input>
							<el-button @click="getData(1)" v-no-more-click>查询</el-button>
						</div>
					</div>
					<el-table :data="tableData[1]" style="width: 100%;" v-loading="loading[1]">
						<el-table-column type="index" width="50" label="序号"></el-table-column>
						<el-table-column prop="unitName" label="单位名称"></el-table-column>
						<el-table-column prop="checkedNum" label="实际人数"></el-table-column>
						<el-table-column prop="checkedMoney" label="实际金额">
							<template slot-scope="scope">
								￥{{scope.row.contractMoney | numFilter}}
							</template>
						</el-table-column>
						<el-table-column prop="paidMoney" label="已付金额">
							<template slot-scope="scope">
								￥{{scope.row.paidMoney | numFilter}}
							</template>
						</el-table-column>
						<el-table-column prop="arrearsMoney" label="欠款金额" >
							<template slot-scope="scope">
								￥{{scope.row.checkedMoney | numFilter}}
							</template>
						</el-table-column>
						<el-table-column prop="checkBeginTime" label="开始时间"></el-table-column>
						<el-table-column prop="checkEndTime" label="结束时间"></el-table-column>
					</el-table>
					<div class="fixBottom">
						<div class="right">
							<el-pagination
								@current-change="handleCurrentChange"
								layout="total,sizes, prev, pager, next"
								:total="total[1]"
								:page-sizes="[10,20,50, 100]"
								@size-change="handleSizeChange"
								:current-page="searchParams.PageIndex"
							></el-pagination>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane class="arcRadius" label="付款未体检单位" name="2">
					<div class="peopleData">
						<div class="propleSearch">
							<el-input v-model="unitName[2]" placeholder="请输入内容" style="width: 200px;margin-right: 16px;" @keyup.enter.native="getData(2)"></el-input>
							<el-button @click="getData(2)" v-no-more-click>查询</el-button>
						</div>
					</div>
					<el-table :data="tableData[2]" style="width: 100%;" v-loading="loading[2]">
						<el-table-column type="index" width="50" label="序号"></el-table-column>
						<el-table-column prop="unitName" label="单位名称"></el-table-column>
						<el-table-column prop="personNum" label="订单人数"></el-table-column>
						<el-table-column prop="contractMoney" label="合同金额">
							<template slot-scope="scope">
								￥{{scope.row.contractMoney | numFilter}}
							</template>
						</el-table-column>
						<el-table-column prop="paidMoney" label="已付金额">
							<template slot-scope="scope">
								￥{{scope.row.paidMoney | numFilter}}
							</template>
						</el-table-column>
					</el-table>
					<div class="fixBottom">
						<div class="right">
							<el-pagination
								@current-change="handleCurrentChange"
								layout="total,sizes, prev, pager, next"
								:total="total[2]"
								:page-sizes="[10,20,50, 100]"
								@size-change="handleSizeChange"
								:current-page="searchParams.PageIndex"
							></el-pagination>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="content-right">
			<p style="font-size: 14px;color: #606266;font-weight: bold;text-align: right;margin: 16px 0;">统计数据</p>
			<div class="statisticsBox error">
				<span>欠款单位数量</span>
				<p>{{rightData.arrearsUnitAmount || 0}}</p>
			</div>
			<div class="statisticsBox error">
				<span>欠款3个月单位数量</span>
				<p>{{rightData.overThreeMonthArrearsUnitAmount || 0}}</p>
			</div>
			<div class="statisticsBox warning">
				<span>累计欠款金额</span>
				<p>{{rightData.arrearsMoney || 0}}</p>
			</div>
			<div class="statisticsBox success">
				<span>体检中单位数量</span>
				<p>{{rightData.checkingUnitAmount || 0}}</p>
			</div>
			<div class="statisticsBox warning">
				<span>体检中的合同金额</span>
				<p>{{rightData.contractMoney || 0}}</p>
			</div>
			<div class="statisticsBox primary">
				<span>付款未检单位数量</span>
				<p>{{rightData.paidNoCheckUnitAmount || 0}}</p>
			</div>
		</div>
	</div>
</template>
<script>
import consts from "../../../../utils/const";
import $ from "jquery";
export default {
	name: 'TJAccountStatistics',
	data() {
		return {
			activeName: '0',
			content: '',
			loading: [false,false,false],
			tableData: [[],[],[]],
			rightData: {},
			total: [0,0,0],
			unitName: ['','',''],
			searchParams: {
				type: 0,
				unitName: '',
				pageIndex: 1,
				pageSize: 10
			}
		}
	},
	created() {
		this.getData(0);
		this.getReceivables();
	},
	methods: {
		//导出列表
		exportExcel(){
			let loading = this.$loading({
				lock: true,
				text: '导出中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			this.$axios.post(this.$api.ExportTjReceivablesReport).then(res => {
				if(res.data.status === 1) {
					let url = res.data.entity;
					let $form = $('<form method="GET"></form>');
					$form.attr("action", consts.SF_REPORT_PATH + url);
					$form.appendTo($("body"));
					$form.submit();
				} else {
					this.$message.error(res.data.message);
				}
				loading.close();
			}).catch(err => {
				this.$message.error(err.data.message);
				loading.close();
			})
		},
		//获取右侧数据
		getReceivables(){
			this.$axios.post(this.$api.TjReceivablesQuery).then(res => {
				if (res.data.status === 1) {
					this.rightData = res.data.entity;
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
					this.$message.error(err.data.message);
			})
		},
		getData(val){
			this.loading[val] = true;
			this.$set(this.loading, val, this.loading[val]);
			if(val || val === 0) this.searchParams.type = val + 1;
			this.searchParams.unitName = this.unitName[val];
			this.$axios.post(this.$api.TjReceivablesQueryDetail,this.searchParams).then(res => {
				if (res.data.status === 1) {
					this.tableData[val] = res.data.entity.unitOrderMessages;
					this.$set(this.tableData, val-1, this.tableData[val-1]);
					this.total[val] = res.data.entity.pageNum;
				} else {
					this.$message.error(res.data.message);
				}
				this.loading[val] = false;
				this.$set(this.loading, val, this.loading[val]);
			}).catch(err => {
				this.$message.error(err.data.message);
				this.loading[val] = false;
				this.$set(this.loading, val, this.loading[val]);
			})
		},
		tabsClick(tab, event){
			if(this.tableData[Number(tab.name)].length === 0) {
				let key = tab.name - 0;
				this.getData(key);
			}
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
		}
	}
}
</script>
<style scoped>
	.content {
		flex-direction: row;
	}
	.content-left {
		flex: 1;
	}
	.content-right {
		flex: 0 0 180px;
		padding: 0 16px;
		border-left: 1px solid #DCDFE5;
		overflow-y: auto;
	}
	.statisticsBox {
		position: relative;
		margin-top: 12px;
		width: 178px;
		height: 86px;
		user-select: none;
		border: 1px solid #E5E7EB;
	}
	.statisticsBox:after {
		content: '';
		width: 6px;
		height: 16px;
		position: absolute;
		top: 0;
		right: -6px;
	}
	.statisticsBox.error:after {
		background-color: #F56C6C;
	}
	.statisticsBox.success:after {
		background-color: #4EC96F;
	}
	.statisticsBox.warning:after {
		background-color: #F99741;
	}
	.statisticsBox.primary:after {
		background-color: #409FFF;
	}
	.statisticsBox span {
		display: block;
		text-align: center;
		font-size: 14px;
		color: #909399;
		padding: 10px 0;
	}
	.statisticsBox p {
		text-align: center;
		color: #606266;
		font-size: 28px;
		text-align: center;
		font-weight: bold;
		padding-top: 4px;
	}
	.content >>> .el-tabs__item {
		height: 50px;
		line-height: 50px;
	}
	.el-tabs {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.el-tabs >>> .el-tabs__header {
		flex: 0 0 49px;
	}
	.el-tabs >>> .el-tabs__content {
		flex: 1;
	}
	.el-tab-pane {
		display: flex;
		height: 100%;
		flex-direction: column;
	}
	.el-tab-pane .peopleData{
		flex: 0 0 49px;
	}
	.el-tab-pane .fixBottom{
		flex: 0 0 40px;
	}
	.el-tab-pane .el-table{
		flex: 1;
	}
</style>
