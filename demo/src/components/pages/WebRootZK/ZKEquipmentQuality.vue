<template>
	<div class="content">
		<div class="topTitle">
      <span>设备质检</span>
    </div>
		<div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="请输入关键字"
          v-model="params.EquipmentName"
          class="arcRadius"
					@keyup.enter.native="getData(true)"
          style="width: 150px;margin-right: 16px">
          
        </el-input>
        <el-button @click="getData(true)">查询</el-button>
				<div class="right">
					<el-button type="primary">导出报表</el-button>
				</div>
      </div>
    </div>
		<el-table :data="tableData" style="width: 100%;" v-loading="loading">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
      <el-table-column prop="purchaseDate" label="购买日期" width="100">
				<template slot-scope="scope">
					{{scope.row.purchaseDate | formatDate('YYYY-MM-DD')}}
				</template>
			</el-table-column>
      <el-table-column prop="statusName" label="当前状态" width="100"></el-table-column>
      <el-table-column prop="lastCheckSummary" label="检查描述" width="100"></el-table-column>
      <el-table-column prop="lastCheckTime" label="检查时间" width="100">
				<template slot-scope="scope">
					{{scope.row.lastCheckTime | formatDate('YYYY-MM-DD')}}
				</template>
			</el-table-column>
      <el-table-column prop="operatorName" label="责任人" width="100"></el-table-column>
      <el-table-column prop="position" label="存放位置" width="100"></el-table-column>
      <el-table-column prop="checkCycle" label="检修周期(天)" width="100"></el-table-column>
      <el-table-column prop="isGuide" label="操作" width="80">
				<template slot-scope="scope">
					<el-button type="text" @click="openDetail(scope.row.zkEquipmentChecks)">查看详情</el-button>
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
		<el-dialog title="设备质检详情" :visible.sync="detailModal" :close-on-click-modal="false" width="800px" @close="detail = []">
			<el-table :data="detail" style="width: 100%" height="300">
				<el-table-column prop="checkDate" label="检查日期">
					<template slot-scope="scope">
						{{scope.row.checkDate | formatDate}}
					</template>
				</el-table-column>
				<el-table-column prop="checkSummary" label="检查描述"></el-table-column>
				<el-table-column prop="checkStatusName" label="设备状态"></el-table-column>
				<el-table-column prop="operatorName" label="检查人"></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="detailModal = false">关闭</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'ZKEquipmentQuality',
	data() {
		return {
			detailModal: false,
			detail: [],
			total: 0,
			loading: false,
			tableData: [],
			params: {
				EquipmentName: ''
			},
			searchParams: {
				EquipmentName: '',
				PageIndex: 1,
				PageSize: 10
			}
		}
	},
	created() {
		this.getData(true);
	},
	methods: {
		getData(key) {
			this.loading = true;
			if(key) {
				this.searchParams.EquipmentName = this.params.EquipmentName;
				this.searchParams.PageIndex = 1;
			} else {
				this.params.EquipmentName = this.searchParams.EquipmentName;
			}
			this.$axios.get(this.$api.GetEquipmentList, {params: this.searchParams}).then(res => {
				if (res.data.status === 1) {
					this.tableData = res.data.entity.resDICEquipments;
					this.total = res.data.entity.recordNum;
				} else {
					this.$message.error(res.data.message);
				}
				this.loading = false;
			}).catch(err => {
				this.$message.error(err.data.message);
				this.loading = false;
			})
		},
		//
		openDetail(data) {
			this.detail = data;
			this.detailModal = true;
		},
		// 处理分页fn
    handleCurrentChange(val) {
			this.searchParams.PageIndex = val;
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
