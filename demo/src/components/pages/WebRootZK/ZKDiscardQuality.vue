<template>
	<div class="content">
		<div class="topTitle">
      <span>弃检质控</span>
    </div>
		<div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="请输入关键字"
          v-model="params.SearchValue"
          class="arcRadius"
					@keyup.enter.native="getData(true)"
          style="width: 150px;">

        </el-input>
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
				<div class="right">
					<el-button type="primary">导出报表</el-button>
				</div>
      </div>
    </div>
		<el-table :data="tableData" style="width: 100%;" v-loading="loading">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="abandonName" label="弃检项目名称"></el-table-column>
      <el-table-column prop="abandonCount" label="弃检数量" width="100"></el-table-column>
      <el-table-column prop="abandonProp" label="占比" width="100">
				<template slot-scope="scope">
					{{scope.row.abandonProp}}%
				</template>
			</el-table-column>
      <el-table-column prop="isGuide" label="操作" width="80">
				<template slot-scope="scope">
					<el-button type="text" @click="openDetail(scope.row.abandonDetails)">查看详情</el-button>
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
		<el-dialog title="弃检质控详情" :visible.sync="detailModal" :close-on-click-modal="false" width="800px" @close="detail = []">
			<el-table :data="detail" style="width: 100%" height="300">
				<el-table-column prop="customerName" label="客户姓名"></el-table-column>
				<el-table-column prop="cardNum" label="卡号"></el-table-column>
				<el-table-column prop="giveUpTime" label="弃检时间">
					<template slot-scope="scope">
						{{scope.row.giveUpTime | formatDate}}
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
export default {
	name: 'ZKDiscardQuality',
	data() {
		return {
			detailModal: false,
			detail: [],
			total: 0,
			loading: false,
			tableData: [],
			timeRange: [],
			params: {
				timeRange: [],
				SearchValue: '',
				BeginTime: '',
				EndTime: '',
			},
			searchParams: {
				SearchValue: '',
				BeginTime: '',
				EndTime: '',
				PageIndex: 1,
				PageSize: 10
			},
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
		}
	},
	created() {
		this.getData(true);
	},
	methods: {
		getData(key) {
			this.loading = true;
			if(key) {
				if (!this.params.timeRange  || this.params.timeRange.length !== 2) {
					this.searchParams.BeginTime = '';
					this.searchParams.EndTime = '';
				} else {
					this.searchParams.BeginTime = this.params.timeRange[0];
					this.searchParams.EndTime = this.params.timeRange[1];
				}
				this.searchParams.SearchValue = this.params.SearchValue;
				this.searchParams.PageIndex = 1;
			} else {
				this.params.SearchValue = this.searchParams.SearchValue;
				this.params.BeginTime = this.searchParams.BeginTime;
				this.params.EndTime = this.searchParams.EndTime;
			}
			this.$axios.get(this.$api.GetAbandonList, {params: this.searchParams}).then(res => {
				if (res.data.status === 1) {
					this.tableData = res.data.entity.resAbandons;
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
