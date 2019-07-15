<template>
	<div class="content">
		<div class="topTitle">
      <span>折扣统计</span>
    </div>
		<div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="请搜索"
          v-model="params.Content"
          class="arcRadius"
					@keyup.enter.native="getData(true)"
          style="width: 150px;"
        >

        </el-input>
        <el-select v-model="params.CheckType" placeholder="体检类型" clearable>
          <el-option label="个检" value="1"></el-option>
          <el-option label="团检" value="2"></el-option>
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
				<div class="importAge">
					折扣范围:
					<el-input
						v-model.number="params.BeginDiscount"
						placeholder="0.00"
						step="0.1"
						max="1"
						min="0"
						type="number"
						class="importIpt"
						>
					</el-input>
					<span style="padding: 0 8px;">至</span>
					<el-input
						v-model.number="params.EndDiscount"
						placeholder="1.00"
						step="0.1"
						max="1"
						min="0"
						type="number"
						class="importIpt"
						>
					</el-input>
				</div>
        <el-button @click="getData(true)">查询</el-button>
				<div class="right">
					<el-button type="primary" @click="exportExcel">导出报表</el-button>
				</div>
      </div>
    </div>
    <el-table :data="total.discountMessages" style="width: 100%;" v-loading="loading">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="customerName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"  width="50"></el-table-column>
      <el-table-column prop="cardNum" label="体检卡号"></el-table-column>
      <el-table-column prop="unitName" label="单位名称"></el-table-column>
      <el-table-column prop="checkType" label="体检类型"></el-table-column>
      <el-table-column prop="originalPrice" label="原价">
				<template slot-scope="scope">
					￥{{scope.row.originalPrice | numFilter}}
				</template>
			</el-table-column>
      <el-table-column prop="discountMoney" label="折扣">
				<template slot-scope="scope">
					{{scope.row.discountMoney | numFilter}}
				</template>
			</el-table-column>
      <el-table-column prop="payMoney" label="应收金额">
				<template slot-scope="scope">
					￥{{scope.row.payMoney | numFilter}}
				</template>
			</el-table-column>
      <el-table-column prop="checkBeginTime" label="体检日期"></el-table-column>
    </el-table>
    <div class="fixBottom" style="flex: 0 0 81px;border-top: 1px solid #DCDFE5">
			<div style="line-height: 40px;height: 40px;margin-left: -16px;margin-right: -16px;border-bottom: 1px solid #DCDFE5">
				<span class="subitem" style="display: inline-block;floar: left;margin: 0px 0;font-size: 14px;color:#606266;text-indent: 20px;">合计： </span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 0px 8px;">原价总额度： ￥<span class="labelColor ftArial" font-weight: bold>{{total.fullPrice | numFilter}}</span></span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 0px 8px;">折扣总额度 ￥<span class="labelColor ftArial" font-weight: bold>{{total.discount | numFilter}}</span></span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 0px 8px;">应收总额度： ￥<span class="labelColor ftArial" font-weight: bold>{{total.realPrice | numFilter}}</span></span>
			</div>
      <div class="right">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total,sizes, prev, pager, next"
          :total="total.dataNum"
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
import consts from "../../../../utils/const";
import $ from "jquery";
export default {
	name: 'TJDiscount',
	data() {
		return {
			loading: false,
			timeRange: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
			params: {
				timeRange: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
				Content: '',
				CheckType: '',
				BeginTime: '',
				EndTime: '',
				BeginDiscount: 0.00,
				EndDiscount: 1.00,
			},
			searchParams:{
				Content: '',
				CheckType: '',
				BeginTime: '',
				EndTime: '',
				BeginDiscount: 0.00,
				EndDiscount: 1.00,
				PageIndex: 1,
				PageSize: 10
			},
			total: {},
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
					this.$message.error('请选择时间段后再次点击查询');
					this.loading = false;
					return;
				} else {
					this.searchParams.BeginTime = this.params.timeRange[0];
					this.searchParams.EndTime = this.params.timeRange[1];
				}
				this.searchParams.Content = this.params.Content;
				this.searchParams.CheckType = this.params.CheckType;
				this.searchParams.EndDiscount = this.params.EndDiscount;
				this.searchParams.BeginDiscount = this.params.BeginDiscount;
				this.searchParams.PageIndex = 1;
			} else {
				this.params.Content = this.searchParams.Content;
				this.params.CheckType = this.searchParams.CheckType;
				this.params.EndDiscount = this.searchParams.EndDiscount;
				this.params.BeginDiscount = this.searchParams.BeginDiscount;
				this.params.timeRange = this.timeRange;
			}
			if(this.searchParams.BeginDiscount > this.searchParams.EndDiscount) {
				this.$message.error('请输入正确的折扣范围');
				this.loading = false;
				return;
			}
			this.$axios.post(this.$api.TjDiscountQuery, this.searchParams).then(res => {
				if (res.data.status === 1) {
					this.total = res.data.entity;
				} else {
					this.$message.error(res.data.message);
				}
				this.loading = false;
			}).catch(err => {
				this.$message.error(err.data.message);
				this.loading = false;
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
			this.$axios.post(this.$api.ExportTjDiscountReport, this.searchParams).then(res => {
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
