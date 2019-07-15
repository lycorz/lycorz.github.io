<template>
  <div class="content">
    <div class="topTitle">
        <span>库存</span>
    </div>
		<div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
				<div class="peopleData">
					<div class="propleSearch">
						<el-input
							placeholder="请输入关键字"
							v-model="params.Filter"
							@keyup.enter.native="getData(true)"
							class="arcRadius"
							style="width: 150px;margin-right: 16px;">

						</el-input>
						<el-select v-model="params.MaritalStatus" placeholder="是否销售">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="2"></el-option>
						</el-select>
						<el-select v-model="params.MaritalStatus" placeholder="是否使用">
							<el-option label="是" :value="1"></el-option>
							<el-option label="否" :value="2"></el-option>
						</el-select>
						<el-select v-model="params.MaritalStatus" placeholder="类型">
							<el-option label="未婚" :value="1"></el-option>
							<el-option label="已婚" :value="2"></el-option>
						</el-select>
						<div style="display: inline-block;margin-right: 16px;">
								<el-date-picker
									v-model="timeRange"
									type="daterange"
									align="right"
									unlink-panels
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									:picker-options="pickerOptions">
								></el-date-picker>
						</div>
						<el-button @click="getData(true)">查询</el-button>
						<div class="right">
							<el-button @click="delCard">删除</el-button>
							<el-button type="primary" @click="cardIntoModal = true">入库</el-button>
						</div>
					</div>
				</div>
				<el-table :data="tableData" tooltip-effect="dark" style="width: 100%" v-loading="loading"
						@selection-change="handleSelectionChange">
						<el-table-column type="selection" fixed="left" width="55"></el-table-column>
						<el-table-column prop="customerName" label="卡号">
						</el-table-column>
						<el-table-column prop="tele" label="面值">
						</el-table-column>
						<el-table-column prop="idcardNum" label="类型">
						</el-table-column>
						<el-table-column prop="unitName" label="入库时间">
						</el-table-column>
						<el-table-column prop="deptName" label="入库操作人"></el-table-column>
						<el-table-column prop="deptName" label="销售记录"></el-table-column>
						<el-table-column prop="deptName" label="使用记录"></el-table-column>
				</el-table>
				<!-- 底部信息栏 -->
				<div class="fixBottom">
					<el-button type="text" @click="allSelection('tableData', 'table')">全选</el-button>
					<span class="subitem">合计： <span class="labelColor ftArial">{{tableData.length || 0}}</span></span>
					<span class="subitem">选中： <span class="labelColor ftArial">{{multipleSelection.length || 0}}</span></span>
					<div class="right">
						<el-pagination
							@current-change="handleCurrentChange"
							@size-change="handleSizeChange"
							:current-page="searchParams.PageIndex"
							:page-sizes="[10,20,50,100]"
							:total="total"
							layout="total,sizes, prev, pager, next, jumper"
						></el-pagination>
					</div>
				</div>
				<!-- 弹窗块 -->
				<el-dialog title="会员卡入库" :visible.sync="cardIntoModal" width="600px" :close-on-click-modal="false">
					起止卡号
					<div class="iptCard">
						<el-input placeholder="开始号码" v-model="input" clearable style=""></el-input>
						至
						<el-input placeholder="结束号码" v-model="input" clearable style=""></el-input>
					</div>
					<span>填写面值</span>
					<span style="margin-left: 220px;">选择类型</span>
					<div class="iptCard">
						<el-input placeholder="请输入内容" v-model="input" clearable style="margin-right: 20px; "></el-input>
						<el-select v-model="value" placeholder="请选择" style="width: 249px;">
							<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
					<div slot="footer" class="dialog-footer">
						<el-button @click="cardIntoModal = false;">取消</el-button>
						<el-button type="primary" @click="cardIntoModal = false" >确定</el-button>
					</div>
				</el-dialog>
		</div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'DDCardStock',
    data() {
      return {
				unitOrder: {},
				activeName: 'first',
				value: '',
				dateRange: [],
				total: 0,// 总条数
				loading: false,
				timeRange: [
					moment()
						.subtract(0.5, 'year')
						.format(),
					moment().format()
				],
				pickerOptions: {
					shortcuts: [
						{
							text: "最近半年",
							onClick(picker) {
								const end = new Date();
								const start = new Date(moment().subtract(0.5, 'year'));
								picker.$emit("pick", [start, end]);
							}
						},
						{
							text: "最近一年",
							onClick(picker) {
								const end = new Date();
								const start = new Date(moment().subtract(1, 'year'));
								picker.$emit("pick", [start, end]);
							}
						},
						{
							text: "最近二年",
							onClick(picker) {
								const end = new Date();
								const start = new Date(moment().subtract(2, 'year'));
								picker.$emit("pick", [start, end]);
							}
						}
					]
				},
				params: {
					Filter:'',
					timeRange: [moment().subtract(0.5, 'year').format(),moment().format()]
				},
				searchParams: {
					Filter: '',
					StartDate: '',
					EndDate: '',
					PageIndex: 1,
					PageSize: 10
				},
				cardIntoModal: false,
				tableData: [],// 展示列表数据
				multipleSelection: [],//选中数据
      }
    },
    created: function () {
			this.getData(true);
    },
    methods: {
			// 获取数据
			getData(key){
				if(key) {
					if (!this.timeRange  || this.timeRange.length !== 2) {
						this.searchParams.StartDate = '';
						this.searchParams.EndDate = '';
					} else {
						this.searchParams.StartDate = moment(this.timeRange[0]).format("YYYY-MM-DD");
						this.searchParams.EndDate = moment(this.timeRange[1]).format("YYYY-MM-DD");
					}
					this.searchParams.Filter = this.params.Filter;
					this.params.timeRange = this.timeRange;
					this.searchParams.PageIndex = 1;
				} else {
					this.timeRange = this.params.timeRange;
					this.params.Filter = this.searchParams.Filter;
				}

				this.loading[0] = true;
				this.$axios.get(this.$api.GetCustomerList,{
					params: this.searchParams
				}).then(res => {
					if (res.data.status === 1) {
						this.tableData = res.data.entity.resultData;
						this.total = res.data.entity.totalCount;
					} else {
						this.$message.error(res.data.message);
						this.total = 0;
					}
					this.loading[0] = false;
				}).catch(err => {
						this.$message.error(err.data.message);
						this.loading[0] = false;
						this.total = 0;
				})
			},
			//删除操作
			delCard() {
				if(this.multipleSelection.length === 0) {
					this.$message.error('请先选择后点击删除');
					return;
				}


			},
			//翻页fn
			handleCurrentChange(val) {
				this.searchParams.PageIndex = val;
				this.getData();
			},
			handleSizeChange(val) {
				this.searchParams.PageSize = val;
				this.searchParams.PageIndex = 1;
				this.getData();
			},
			//点击选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		}
}
</script>
<style scoped>
.el-select{
  display: inline-block;
	width: 107px;
	margin-right: 16px;
}
.iptCard {
	padding: 10px 0;
}
.iptCard .el-input{
	width: 250px;
}
.el-date-editor--daterange.el-input__inner {
	width: 250px;
}
</style>
