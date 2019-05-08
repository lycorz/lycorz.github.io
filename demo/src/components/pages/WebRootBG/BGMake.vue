<template>
  <div class="content SMSManage">
    <div class="topTitle">
      <span>团检报告生成</span>
    </div>
    <div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="请搜索"
          v-model="params.Condition"
          class="arcRadius"
          style="width: 150px;"
					@keyup.enter.native="getData(true)"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-select v-model="params.ReportStatus" placeholder="报告状态" clearable>
          <el-option
            v-for="item in reportStatus"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        <div style="display: inline-block;margin: 0 16px;">
          <el-date-picker
            v-model="params.timeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
						:picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <el-button @click="getData(true)">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%;" v-loading="loading">
			<el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="unitName" label="单位名称"></el-table-column>
      <el-table-column prop="beginTime" label="替检开始时间">
				<template slot-scope="scope">
          {{scope.row.beginTime | formatDate('YYYY-MM-DD')}}
        </template>
			</el-table-column>
      <el-table-column prop="reportStatus" label="报告状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="makeReport(scope.row)">生成团检报告</el-button>
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
	name: "SMSManage",
	data() {
    return {
      searchParams: {
				Condition: "",
				ReportStatus: '',
        BeginTime: "",
        EndTime: "",
        PageIndex: 1,
        PageSize: 10
			},
			params: {
				Condition: '',
				ReportStatus: '',
				timeRange: [moment().add(-1, 'weeks').format(),moment().format()],
			},
			reportStatus: [
				{value: 0,name: '未生成'},
				{value: 1,name: '已生成'}
			],
      loading: false,
      total: 0,
      timeRange: [moment().add(-1, 'weeks').format(),moment().format()],
      tableData: [],
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
    };
	},
	created() {
		this.getData(true);
	},
  methods: {
    // 反选
    toggleSelection() {
      if (this.tableData) {
        this.tableData.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
		},
    // 获取列表信息
    getData(key) {
			this.loading = true;
			if (key) {
				if (!this.params.timeRange  || this.params.timeRange.length !== 2) {
					this.searchParams.BeginTime = '';
					this.searchParams.EndTime = '';
				} else {
					this.searchParams.BeginTime = moment(this.params.timeRange[0]).format("YYYY-MM-DD");
					this.searchParams.EndTime = moment(this.params.timeRange[1]).format("YYYY-MM-DD");
				}
				this.searchParams.Condition = this.params.Condition;
				this.searchParams.ReportStatus = this.params.ReportStatus;
				this.searchParams.PageIndex = 1;
				this.timeRange = this.params.timeRange;
			} else {
				this.params.Condition = this.searchParams.Condition;
				this.params.ReportStatus = this.searchParams.ReportStatus;
				this.params.timeRange = this.timeRange;
			}
      this.$axios
        .post(this.$api.UnitReportQuery, this.searchParams)
        .then(res => {
          if (res.data.status === 1 && res.data.entity) {
            this.tableData = res.data.entity.unitReportMessages;
            this.total = res.data.entity.dataNum;
          } else {
            this.$message.error(res.data.message);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.data.message);
        });
    },
    //生成团检报告
    makeReport(data) {
			let params = {
				Order: '',
				OperatorCode: '001'
			}
			if (data.orderCode) {
				params.Order = data.orderCode;
			}
			let msg = this.$loading({
				lock: true,
				text: '团检报告生成中，请稍后...',
				spinner: 'el-icon-loading'
			});
			this.$axios.post(this.$api.MarkUnitReport, params).then(res => {
				if(res.data.status === 1) {
					this.getData();
					this.$message.success('团检报告生成成功！');
				} else {
					this.$message.error(res.data.message);
				}
				msg.close();
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
    // 处理分页fn
    handleCurrentChange(val) {
			this.searchParams.pageIndex = val;
			this.getData();
    },
    handleSizeChange(val) {
			this.searchParams1.PageSize = val;
			this.searchParams.PageIndex = 1;
      this.getData();
    }
  }
};
</script>
<style scoped>
.SMSManage .propleSearch .el-select {
  display: inline-block;
  width: 120px;
  margin-left: 16px;
}
.SMSManage .bgModal .el-input--suffix .el-input__inner {
  padding-right: 13px;
}
.SMSManage .modal-con .item span {
  width: 75px;
}
</style>

