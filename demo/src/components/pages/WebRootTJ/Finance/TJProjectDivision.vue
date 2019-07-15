<template>
	<div class="content">
		<div class="topTitle">
      <span>项目分成</span>
    </div>
		<div class="peopleData">
      <div class="propleSearch">
        <el-select v-model="params.IsHoliday" placeholder="统计类型" clearable>
          <el-option label="工作日" value="2"></el-option>
          <el-option label="节假日" value="1"></el-option>
        </el-select>
				<el-select v-model="params.IsBack" placeholder="是否回传" clearable>
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
        <div style="display: inline-block;margin: 0 16px;">
          <el-date-picker
            v-model="params.timeRange"
            type="daterange"
						value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"></el-date-picker>
        </div>
        <el-button @click="getData(true)">查询</el-button>
				<div class="right">
					<el-button type="primary" @click="exportExcel">导出报表</el-button>
				</div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%;" v-loading="loading" ref="multipleTable">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="itemName" label="项目名称" width="150"></el-table-column>
      <el-table-column prop="deptName" label="科室名称"  width="150"></el-table-column>
      <el-table-column prop="deptTypeName" label="科室大类"></el-table-column>
      <el-table-column prop="checkNum" label="检查人数"></el-table-column>
      <el-table-column prop="checkMoney" label="检查价格">
				<template slot-scope="scope">
						￥{{scope.row.checkMoney | numFilter}}
					</template>
			</el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openDetail(scope.row.itemCode)">明细</el-button>
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
		<el-dialog title="项目分成明细" :visible.sync="detailModal" :close-on-click-modal="false" width="800px" @close="detail = []">
			<el-table :data="detail" style="width: 100%" height="300">
				<el-table-column prop="customerName" label="客户姓名"></el-table-column>
				<el-table-column prop="cardNum" label="卡号"></el-table-column>
				<el-table-column prop="money" label="金额">
					<template slot-scope="scope">
						￥{{scope.row.money | numFilter}}
					</template>
				</el-table-column>
				<el-table-column prop="checkBeginTime" label="开始时间">
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
import moment from "moment";
import consts from "../../../../utils/const";
import $ from "jquery";
export default {
	name: 'TJProjectDivision',
	data() {
		return {
			timeRange: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
			params: {
				IsHoliday: '',
				IsBack: '',
				BeginTime: '',
				EndTime: '',
				timeRange: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
			},
			searchParams:{
				IsHoliday: '',
				IsBack: '',
				BeginTime: '',
				EndTime: '',
				PageIndex: 1,
				PageSize: 10
			},
			tableData: [{}],
			loading: false,
			total: 0,
			detailModal: false,
			detail: []
		}
	},
	created() {
		this.getData(true);
	},
	methods: {
		getData(key){
			this.loading = true;
			if (key) {
				if (!this.params.timeRange  || this.params.timeRange.length !== 2) {
					this.searchParams.BeginTime = '';
					this.searchParams.EndTime = '';
				} else {
					this.searchParams.BeginTime = this.params.timeRange[0];
					this.searchParams.EndTime = this.params.timeRange[1];
				}
				this.searchParams.IsHoliday = this.params.IsHoliday;
				this.searchParams.IsBack = this.params.IsBack;
				this.searchParams.PageIndex = 1;
			} else {
				this.params.IsHoliday = this.searchParams.IsHoliday;
				this.params.IsBack = this.searchParams.IsBack;
				this.params.timeRange = this.timeRange;
			}
			this.$axios.post(this.$api.TjItemDistributionQuery, this.searchParams).then(res => {
				if (res.data.status === 1) {
					this.tableData = res.data.entity.tjItems;
					this.total = res.data.entity.dataNum;
				} else {
					this.$message.error(res.data.message);
				}
				this.loading = false;
			}).catch(err => {
				this.$message.error(err.data.message);
				this.loading = false;
			})
		},
		openDetail(ItemCode) {
			this.$axios.post(this.$api.TjItemDistributionDetailQuery, {
				ItemCode,
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
		exportExcel(){
			let loading = this.$loading({
				lock: true,
				text: '导出中...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)'
			});
			//未加参数
			this.$axios.post(this.$api.ExportTjItemDistributionReport, this.searchParams).then(res => {
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
