<template>
  <div class="content">
    <div class="topTitle">
        <span>销售</span>
    </div>
		<div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
				<div class="peopleData">
						<div class="propleSearch">
							<el-input
								placeholder="请搜索"
								v-model="params.Filter"
								@keyup.enter.native="getData(true)"
								class="arcRadius"
								style="width: 150px;">

							</el-input>
							<el-select v-model="params.MaritalStatus" placeholder="缴费状态">
								<el-option label="未婚" :value="1"></el-option>
								<el-option label="已婚" :value="2"></el-option>
							</el-select>
							<div style="display: inline-block;margin: 0 16px;">
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
						<el-button type="primary" @click="getData(true)" v-no-more-click>查询</el-button>
						<div class="right">
							<el-button type="primary" @click="openDetail" v-no-more-click>创建订单</el-button>
						</div>
					</div>
				</div>
				<el-table :data="tableData" tooltip-effect="dark" style="width: 100%" v-loading="loading" @row-click="clickRow2" @selection-change="handleSelectionChange">
						<el-table-column type="index" label="序号" width="55"></el-table-column>
						<el-table-column prop="customerName" label="订单编号">
						</el-table-column>
						<el-table-column prop="tele" label="客户姓名">
						</el-table-column>
						<el-table-column prop="idcardNum" label="销售时间">
						</el-table-column>
						<el-table-column prop="unitName" label="卡片数量">
						</el-table-column>
						<el-table-column prop="deptName" label="交易金额"></el-table-column>
						<el-table-column prop="deptName" label="缴费状态"></el-table-column>
						<el-table-column  fixed="right" label="操作" width="135px">
							<template slot-scope="scope">
									<el-button type="text" @click="openDetail(scope.row)">查看详情</el-button>
							</template>
						</el-table-column>
				</el-table>
				<!-- 底部信息栏 -->
				<div class="fixBottom">
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
				<el-dialog :title="title" :visible.sync="cardOrderModal" width="1000px" :close-on-click-modal="false">
					<div class="peopleData">
						<div class="searchParams" style="overflow: hidden">
							<span style="color: #F56C6C">*</span>客户姓名
							<el-input v-model="input" style="width:150px;"></el-input>
							<div class="right">
								<el-button @click="addCardModal = true">添加会员卡</el-button>
							</div>
						</div>
					</div>
					<el-table :data="cardList" tooltip-effect="dark" style="width: 100%;" height="250">
						<el-table-column prop="customerName" label="会员卡号"></el-table-column>
						<el-table-column prop="deptName" label="会员卡类型"></el-table-column>
						<el-table-column prop="deptName" label="面值"></el-table-column>
						<el-table-column prop="deptName" label="操作">
							<template slot-scope="scope">
								<el-button type="text">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<span class="subitem" style="display: inline-block;margin: 5px 0;">合计： <span class="labelColor ftArial">28</span></span>
					<span class="subitem" style="display: inline-block;margin: 5px 16px;">面值： ￥<span class="labelColor ftArial">28</span></span>
					<div slot="footer" class="dialog-footer">
						<el-button @click="cardOrderModal = false;">取消</el-button>
						<el-button type="primary" @click="cardOrderModal = false" >确定</el-button>
					</div>
				</el-dialog>
				<el-dialog title="添加会员卡" :visible.sync="addCardModal" width="1000px" :close-on-click-modal="false">
					<div class="addProject">
						<div class="project-left">
							<div class="top">
								<el-select v-model="params.MaritalStatus" placeholder="缴费状态">
									<el-option label="未婚" :value="1"></el-option>
									<el-option label="已婚" :value="2"></el-option>
								</el-select>
								<div class="right">
									<el-button >添加</el-button>
								</div>
							</div>
							<el-table :data="cardListLeft" tooltip-effect="dark" style="width: 100%;" height="250">
								<el-table-column prop="customerName" label="会员卡号"></el-table-column>
								<el-table-column prop="deptName" label="会员卡类型"></el-table-column>
								<el-table-column prop="deptName" label="类型"></el-table-column>
							</el-table>
							<div class="fixBottom">
								<el-button type="text">全选</el-button>
								<span class="subitem">合计： <span class="labelColor ftArial">{{cardListLeft.length}}</span></span>
								<span class="subitem">选中： <span class="labelColor ftArial">{{multipleSelection.length || 0}}</span></span>
							</div>
						</div>
						<div class="project-right">
							<div class="top">
								<p style="line-height: 28px;">已选会员卡</p>
							</div>
							<el-table :data="cardListRight" tooltip-effect="dark" style="width: 100%;" height="250">
								<el-table-column prop="customerName" label="会员卡号"></el-table-column>
								<el-table-column prop="deptName" label="会员卡类型"></el-table-column>
								<el-table-column prop="deptName" label="操作">
									<template>
											<el-button type="text">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="fixBottom">
								<el-button type="text">全选</el-button>
								<span class="subitem">合计： <span class="labelColor ftArial">{{cardListLeft.length}}</span></span>
								<span class="subitem">总金额： <span class="labelColor ftArial">{{0}}</span></span>
							</div>
						</div>
					</div>

					<div slot="footer" class="dialog-footer">
						<el-button @click="addCardModal = false;">取消</el-button>
						<el-button type="primary" @click="addCardModal = false" >确定</el-button>
					</div>
				</el-dialog>
		</div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'DDCardSales',
    data() {
      return {
				unitOrder: {},
				title: '订单详情',
				value: '',
				dateRange: [],
				total: 0,// 总条数
				loading:false,
				cardOrderModal: false,
				addCardModal: false,
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
				tableData: [],// 列表数据
				cardList: [],// 详情框内数据
				cardListLeft: [],// 添加会员卡左侧数据
				multipleSelection: [],//选中数据
				cardListRight: []//添加会员卡右侧数据

      }
    },
    created: function () {
			this.getData(true);
    },
    methods: {
			//点击当前行选中
			clickRow2(row, event){
				if(event.label === '操作') {
					return;
				}
				this.$refs.tableData.toggleRowSelection(row);
			},
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
			//查看/新建订单
			openDetail(data){
				if (data) {
					this.title = '新建订单';
				} else {
					this.title = '订单详情';
				}
				this.cardOrderModal = true;
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
.right > * {
    display: inline-block;
}
.el-select{
  display: inline-block;
	width: 107px;
	margin-left: 16px;
}
.el-form--inline .el-form-item {
    margin-right: 20px;
    margin-top: 24px;
}
.currentOrder ul {
    overflow: hidden;
}
.currentOrder li {
    width: 25%;
    float: left;
    line-height: 32px;
}
.discount .el-input {
    width: 150px;
    padding-right: 8px;
}
.el-form-item__label {
	text-align: left;
}
.el-date-editor--daterange.el-input__inner {
	width: 250px;
}
.el-dropdown-link {
	cursor: pointer;
	color: #409EFF;
	font-size: 12px;
}
.el-icon-arrow-down {
	font-size: 12px;
}
.el-tabs__nav-scroll {
	padding-left: 0;
}
.addProject{
	overflow: hidden;
}
.addProject .project-left{
	width: 49%;
	float: left;
	border: 1px solid #DCDFE6;
}
.addProject .project-right {
	width: 49%;
	float: right;
	border: 1px solid #DCDFE6;
}
.addProject .top {
	padding: 6PX 16PX;
	border-bottom: 1px solid #DCDFE6;
}
</style>
