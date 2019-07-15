<template>
	<div class="content">
		<div class="topTitle">
      <span>导检质控</span>
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
        <el-select v-model="params.Sex" placeholder="性别" clearable>
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
				<el-select v-model="params.IsGuide" placeholder="是否参与体检" clearable>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
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
				<div class="right">
					<el-button type="primary">导出报表</el-button>
				</div>
      </div>
    </div>
		<el-table :data="tableData" style="width: 100%;" v-loading="loading">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="customerName" label="客户姓名"></el-table-column>
      <el-table-column prop="sex" label="性别">
				<template slot-scope="scope">
						{{scope.row.sex === 2 ? '女' : '男'}}
				</template>
			</el-table-column>
      <el-table-column prop="cardNum" label="体检卡号"></el-table-column>
      <el-table-column prop="idCardNum" label="身份证号"></el-table-column>
      <el-table-column prop="checkBeginTime" label="体检开始时间">
				<template slot-scope="scope">
					{{scope.row.checkBeginTime | formatDate('YYYY-MM-DD')}}
				</template>
			</el-table-column>
      <el-table-column prop="isGuide" label="是否参与体检">
				<template slot-scope="scope">
					{{scope.row.isGuide ? '是' : '否'}}
				</template>
			</el-table-column>
    </el-table>
		<div class="fixBottom" style="flex: 0 0 81px;border-top: 1px solid #DCDFE5">
			<div style="line-height: 40px;height: 40px;margin-left: -16px;margin-right: -16px;border-bottom: 1px solid #DCDFE5">
				<span class="subitem" style="display: inline-block;floar: left;margin: 0px 0;font-size: 14px;color:#606266;text-indent: 20px;">合计： </span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 0px 8px;">参与导检的人数/占比:<span class="labelColor ftArial" font-weight: bold>{{guideCount}} / {{guideProp}}%</span></span>
				<span class="subitem" style="display: inline-block;floar: left;margin: 0px 8px;">折扣总额度:<span class="labelColor ftArial" font-weight: bold>{{notGuideCount}} / {{notGuideProp}}%</span></span>
			</div>
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
	name: 'ZKGuideQuality',
	data() {
		return {
			loading: false,
			total: 0,//总页面
			guideCount: 0,
			notGuideCount: 0,
			guideProp: 0,
			notGuideProp: 0,
			tableData: [],
			timeRange: [],
			params: {
				timeRange: [],
				SearchValue: '',
				Sex: '',
				IsGuide: '',
				BeginTime: '',
				EndTime: '',
			},
			searchParams: {
				SearchValue: '',
				Sex: '',
				IsGuide: '',
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
				this.searchParams.Sex = this.params.Sex;
				this.searchParams.IsGuide = this.params.IsGuide;
				this.searchParams.PageIndex = 1;
			} else {
				this.params.SearchValue = this.searchParams.SearchValue;
				this.params.Sex = this.searchParams.Sex;
				this.params.IsGuide = this.searchParams.IsGuide;
				this.params.BeginTime = this.searchParams.BeginTime;
				this.params.EndTime = this.searchParams.EndTime;
			}
			this.$axios.get(this.$api.GetGuideClassList, {params: this.searchParams}).then(res => {
				if (res.data.status === 1) {
					this.tableData = res.data.entity.resGuideClases;
					this.guideCount = res.data.entity.guideCount;
					this.notGuideCount = res.data.entity.notGuideCount;
					this.guideProp = res.data.entity.guideProp;
					this.notGuideProp = res.data.entity.notGuideProp;
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

