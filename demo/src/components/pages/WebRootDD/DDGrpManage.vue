<template>
  <div class="content">
    <div class="topTitle">
        <span>订单管理</span>
    </div>
    <el-row>
        <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
            <div class="peopleData">
                <div class="propleSearch">
									<el-input
										placeholder="请搜索"
										v-model="params.Filter"
										@keyup.enter.native="getData(true)"
										class="arcRadius"
										style="width: 150px;"
									>
										<i slot="prefix" class="el-input__icon el-icon-search"></i>
									</el-input>
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
                <el-button type="primary" @click="getData(true)">查询</el-button>

              </div>
            </div>
            <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" v-loading="loading[0]" @row-click="clickRow2"
                @selection-change="handleSelectionChange">
								<el-table-column type="selection" fixed="left" width="55"></el-table-column>
                <el-table-column prop="customerName" label="单位名称">
                </el-table-column>
                <el-table-column prop="sex" label="创建时间" width="50">
									<template slot-scope="scope">
										{{scope.row.sex === 1 ?'男': '女'}}
									</template>
                </el-table-column>
                <el-table-column prop="tele" label="体检开始时间" width="130">
                </el-table-column>
                <el-table-column prop="idcardNum" label="备单人数" width="170">
                </el-table-column>
                <el-table-column prop="unitName" label="合同金额">
                </el-table-column>
								<el-table-column prop="deptName" label="已检人数"></el-table-column>
								<el-table-column prop="deptName" label="已检金额"></el-table-column>
								<el-table-column prop="deptName" label="缴费状态"></el-table-column>
								<el-table-column prop="deptName" label="订单金额"></el-table-column>
								<el-table-column prop="deptName" label="最后缴费时间"></el-table-column>
								<el-table-column prop="deptName" label="订单状态"></el-table-column>
								<el-table-column prop="deptName" label="订单关闭时间"></el-table-column>
								<el-table-column prop="deptName" label="关闭人"></el-table-column>
                <el-table-column  fixed="right" label="操作" width="135px">
									<template slot-scope="scope">
											<el-button type="text" @click="payModal = true">缴费</el-button>
											<el-button type="text" @click="unitOrderModal = true">详情</el-button>
											<el-dropdown trigger="click">
												<span class="el-dropdown-link">
													更多<i class="el-icon-arrow-down el-icon--right"></i>
												</span>
												<el-dropdown-menu slot="dropdown">
													<el-dropdown-item>
														<span @click="payBackModal = true">退费</span>
													</el-dropdown-item>
													<el-dropdown-item>
														<span @click="payBackModal = true">撤回</span>
													</el-dropdown-item>
													<el-dropdown-item>
														<span @click="endOrderBtn(scope.row)">结束订单</span>
													</el-dropdown-item>
													<el-dropdown-item>
														<span @click="delOrderBtn(scope.row)">删除订单</span>
													</el-dropdown-item>
												</el-dropdown-menu>
											</el-dropdown>
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
						<el-dialog title="单位订单详情" :visible.sync="unitOrderModal" width="1000px" :close-on-click-modal="false">
							<div class="peopleData">
								<div class="searchParams" style="overflow: hidden">
									<div style="width:750px;float: left;">
											<el-input
												placeholder="请输入关键字"
												v-model="unitOrder.Filter"
												@keyup.enter.native="getData"
												class="arcRadius"
												style="width: 352px;margin-right: 16px;"
											>
												<i slot="prefix" class="el-input__icon el-icon-search"></i>
											</el-input>
											<span>开始时间段：</span>
											<div style="display: inline-block;margin: 0 16px;">
												<el-date-picker
													v-model="dateRange"
													type="daterange"
													range-separator="至"
													start-placeholder="开始日期"
													end-placeholder="结束日期">
												</el-date-picker>
											</div>
											<el-select v-model="unitOrder.OrderFlag" clearable placeholder="是否开始">
												<el-option
													v-for="item in reportType"
													:key="item.value"
													:label="item.name"
													:value="item.value"
												></el-option>
											</el-select>
											<el-select v-model="unitOrder.OrderFlag" clearable placeholder="是否结束">
												<el-option
													v-for="item in reportType"
													:key="item.value"
													:label="item.name"
													:value="item.value"
												></el-option>
											</el-select>
											<el-select v-model="unitOrder.OrderFlag" clearable placeholder="是否有自费">
												<el-option
													v-for="item in reportType"
													:key="item.value"
													:label="item.name"
													:value="item.value"
												></el-option>
											</el-select>
											<span>结束时间段：</span>
											<div style="display: inline-block;margin: 0 16px;">
												<el-date-picker
													v-model="dateRange"
													type="daterange"
													range-separator="至"
													start-placeholder="开始日期"
													end-placeholder="结束日期">
												</el-date-picker>
											</div>

									</div>
									<div class="right">
										<el-button >查询</el-button>
										<el-button >重置条件</el-button>
									</div>
								</div>
							</div>
							<el-table :data="unitOrderList" tooltip-effect="dark" style="width: 100%;" height="250" v-loading="loading[1]">
                <el-table-column prop="customerName" label="姓名">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="50">
									<template slot-scope="scope">
										{{scope.row.sex === 1 ?'男': '女'}}
									</template>
                </el-table-column>
								<el-table-column prop="deptName" label="自费金额"></el-table-column>
								<el-table-column prop="deptName" label="单位支付金额"></el-table-column>
								<el-table-column prop="deptName" label="是否开始"></el-table-column>
								<el-table-column prop="deptName" label="是否结束"></el-table-column>
								<el-table-column prop="deptName" label="开始时间"></el-table-column>
								<el-table-column prop="deptName" label="结束时间"></el-table-column>
            	</el-table>
							<span class="subitem" style="display: block;margin: 5px 0;">合计： <span class="labelColor ftArial">28</span>人</span>
							<div slot="footer" class="dialog-footer">
								<el-button @click="unitOrderModal = false;">取消</el-button>
								<el-button type="primary" @click="unitOrderModal = false" >确定</el-button>
							</div>
						</el-dialog>
						<el-dialog title="缴费确认" :visible.sync="payModal" width="1000px" :close-on-click-modal="false">
							<div class="peopleData">
								<div class="searchParams" style="overflow: hidden">
									<div style="width:750px;float: left;">
											<el-input
												placeholder="请输入关键字"
												v-model="unitOrder.Filter"
												@keyup.enter.native="getData"
												class="arcRadius"
												style="width: 352px;margin-right: 16px;"
											>
												<i slot="prefix" class="el-input__icon el-icon-search"></i>
											</el-input>
											<span>开始时间段：</span>
											<div style="display: inline-block;margin: 0 16px;">
												<el-date-picker
													v-model="dateRange"
													type="daterange"
													range-separator="至"
													start-placeholder="开始日期"
													end-placeholder="结束日期">
												</el-date-picker>
											</div>
											<el-select v-model="unitOrder.OrderFlag" clearable placeholder="是否开始">
												<el-option
													v-for="item in reportType"
													:key="item.value"
													:label="item.name"
													:value="item.value"
												></el-option>
											</el-select>
											<el-select v-model="unitOrder.OrderFlag" clearable placeholder="是否结束">
												<el-option
													v-for="item in reportType"
													:key="item.value"
													:label="item.name"
													:value="item.value"
												></el-option>
											</el-select>
											<el-select v-model="unitOrder.OrderFlag" clearable placeholder="是否有自费">
												<el-option
													v-for="item in reportType"
													:key="item.value"
													:label="item.name"
													:value="item.value"
												></el-option>
											</el-select>
											<span>结束时间段：</span>
											<div style="display: inline-block;margin: 0 16px;">
												<el-date-picker
													v-model="dateRange"
													type="daterange"
													range-separator="至"
													start-placeholder="开始日期"
													end-placeholder="结束日期">
												</el-date-picker>
											</div>

									</div>
									<div class="right">
										<el-button >查询</el-button>
										<el-button >重置条件</el-button>
									</div>
								</div>
							</div>
							<el-table :data="payList" tooltip-effect="dark" style="width: 100%;" height="250" v-loading="loading[2]"
                @selection-change="handleSelectionChange">
                <el-table-column prop="customerName" label="姓名">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="50">
									<template slot-scope="scope">
										{{scope.row.sex === 1 ?'男': '女'}}
									</template>
                </el-table-column>
								<el-table-column prop="deptName" label="自费金额"></el-table-column>
								<el-table-column prop="deptName" label="单位支付金额"></el-table-column>
								<el-table-column prop="deptName" label="是否开始"></el-table-column>
								<el-table-column prop="deptName" label="是否结束"></el-table-column>
								<el-table-column prop="deptName" label="开始时间"></el-table-column>
								<el-table-column prop="deptName" label="结束时间"></el-table-column>
            	</el-table>
							<span class="subitem">合计： <span class="labelColor ftArial">28</span>人</span>
							<span class="subitem">总金额： ￥<span class="labelColor ftArial">1</span></span>
              <span class="subitem">单位付费： ￥<span class="labelColor ftArial">1</span></span>
              <span class="subitem">个人已付： ￥<span class="labelColor ftArial">1</span></span>
							<div slot="footer" class="dialog-footer">
								<el-button @click="payModal = false;">取消</el-button>
								<el-button type="primary" @click="payModal = false" >发起缴费</el-button>
							</div>
						</el-dialog>
						<el-dialog title="退费确认" :visible.sync="payBackModal" width="600px" :close-on-click-modal="false">
							<el-table :data="payBackList" tooltip-effect="dark" style="width: 100%;" height="250" v-loading="loading[3]"
                @selection-change="handleSelectionChange">
                <el-table-column prop="customerName" label="姓名">
                </el-table-column>
								<el-table-column prop="deptName" label="自费金额"></el-table-column>
								<el-table-column prop="deptName" label="单位支付金额"></el-table-column>
								<el-table-column prop="deptName" label="结束时间"></el-table-column>
            	</el-table>
							<span class="subitem">合计： <span class="labelColor ftArial">28</span>人</span>
							<span class="subitem">总金额： ￥<span class="labelColor ftArial">1</span></span>
              <span class="subitem">单位付费： ￥<span class="labelColor ftArial">1</span></span>
              <span class="subitem">个人已付： ￥<span class="labelColor ftArial">1</span></span>
							<div slot="footer" class="dialog-footer">
								<el-button @click="payBackModal = false;">取消</el-button>
								<el-button type="primary" @click="payBackModal = false" >确认退费</el-button>
							</div>
						</el-dialog>
						<el-dialog title="客户订单" :visible.sync="customerOrderModal" width="600px" :close-on-click-modal="false">
							<el-table :data="customerOrderList" tooltip-effect="dark" style="width: 100%;" height="250" v-loading="loading[4]"
                @selection-change="handleSelectionChange">
                <el-table-column prop="customerName" label="姓名">
                </el-table-column>
								<el-table-column prop="deptName" label="自费金额"></el-table-column>
								<el-table-column prop="deptName" label="单位支付金额"></el-table-column>
								<el-table-column prop="deptName" label="结束时间"></el-table-column>
            	</el-table>
							<span class="subitem">合计： <span class="labelColor ftArial">28</span>人</span>
							<span class="subitem">总金额： ￥<span class="labelColor ftArial">1</span></span>
              <span class="subitem">单位付费： ￥<span class="labelColor ftArial">1</span></span>
              <span class="subitem">个人已付： ￥<span class="labelColor ftArial">1</span></span>
							<div slot="footer" class="dialog-footer">
								<el-button @click="customerOrderModal = false;">取消</el-button>
								<el-button type="primary" @click="customerOrderModal = false" >确认退费</el-button>
							</div>
						</el-dialog>
						<!-- 撤回申请 -->
						<el-dialog :visible.sync="payBackModal" width="600px" :close-on-click-modal="false">
							<el-tabs v-model="activeName" @tab-click="payBackClick">
								<el-tab-pane label="撤回缴费申请" name="first">
									<el-table :data="backPayList1" tooltip-effect="dark" style="width: 100%;" height="250" v-loading="loading[5]"
										@selection-change="handleSelectionChange">
										<el-table-column prop="customerName" label="姓名">
										</el-table-column>
										<el-table-column prop="deptName" label="自费金额"></el-table-column>
										<el-table-column prop="deptName" label="单位支付金额"></el-table-column>
										<el-table-column prop="deptName" label="结束时间"></el-table-column>
									</el-table>
									<span class="subitem">合计： <span class="labelColor ftArial">28</span>人</span>
									<span class="subitem">总金额： ￥<span class="labelColor ftArial">1</span></span>
              		<span class="subitem">单位付费： ￥<span class="labelColor ftArial">1</span></span>
								</el-tab-pane>
								<el-tab-pane label="撤回退费申请" name="second">
									<el-table :data="backPayList2" tooltip-effect="dark" style="width: 100%;" height="250" v-loading="loading[6]"
										@selection-change="handleSelectionChange">
										<el-table-column prop="customerName" label="姓名">
										</el-table-column>
										<el-table-column prop="deptName" label="自费金额"></el-table-column>
										<el-table-column prop="deptName" label="单位支付金额"></el-table-column>
										<el-table-column prop="deptName" label="结束时间"></el-table-column>
									</el-table>
									<span class="subitem">合计： <span class="labelColor ftArial">28</span>人</span>
									<span class="subitem">总金额： ￥<span class="labelColor ftArial">1</span></span>
             		 <span class="subitem">单位付费： ￥<span class="labelColor ftArial">1</span></span>
								</el-tab-pane>
							</el-tabs>
							<div slot="footer" class="dialog-footer">
								<el-button @click="payBackModal = false;">取消</el-button>
								<el-button type="primary" @click="payBackModal = false" >确认撤回</el-button>
							</div>
						</el-dialog>
        </div>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'DDGrpOrder',
    data() {
      return {
				unitOrder: {},
				activeName: 'first',
				value: '',
				dateRange: [],
				total: 0,// 总条数
				loading: [false, false, false, false, false,false ,false], //0 单位列表； 1单位订单详情； 2缴费确认;3退费确认;4客户订单;5撤回缴费申请；6撤回退费申请
				orderVipFlag: 0,
				unitOrderModal: false,
				payModal: false,
				payBackModal: false,
				customerOrderModal: false,
				payBackModal: false,
				formLabelWidth: '70px',
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
				peopleModal: false,
				tableData: [],// 单位列表
				unitOrderList: [], //单位订单详情列表
				payList: [],//缴费确认列表
				payBackList: [],//退费确认
				customerOrderList: [],//客户订单列表
				backPayList1: [], //撤回缴费列表
				backPayList2: [], //撤回退费列表
				// 新增客户信息
				age: 0,
				peopleInfo: {
					OrderCode: '',
					Operator: '001',
					NewCustomer: {
						CustomerCode: "00000000-0000-0000-0000-000000000000",
						CardNum: "00000000-0000-0000-0000-000000000000",
						CustomerName: "",
						Sex: '',
						Nation: "",
						IdcardNum: "",
						Birthday: "",
						Photo:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2161523157,1298941018&fm=26&gp=0.jpg",
						MaritalStatus: 1,
						VipFlag: 0,
						Occupation: "",
						UnitName: "",
						DeptName: "",
						TeamName: "",
						Tele: "",
						Addr: "",
						Remark: ""
					}
				},
				rules: {
					CardNum: [
							{ required: true, message: '请输入正确位数的体检卡号', trigger: 'blur' }
					],
					CustomerName: [
							{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					Sex: [
							{  required: true, message: '请输入性别', trigger: 'blur' }
					],
					IdcardNum: [
							{ required: true, message: '请输入身份证号', trigger: 'blur' },
							{ max: 18, min: 18, message: '与身份证号码位数不符', trigger: 'blur' }
					],
					Birthday: [
							{ required: true, message: '请选择时间', trigger: 'change' }
					],
					VipFlag: [
							{  required: true, message: '请选择Vip属性', trigger: 'blur' }
					],
					Tele: [
							{ required: true, message: '请输入联系电话', trigger: 'blur' }
					]
				},
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
			//撤回tabs点击
			payBackClick(tab, event) {
        console.log(tab, event);
      },
			//新增-确定
			addPeopleBtn(){
				this.$refs.peopleForm.validate((valid) => {
					if(valid) {
						this.$axios.post(this.$api.Replace, this.peopleInfo).then(res => {
							if (res.data.status === 1 && res.data.entity) {
								this.$message.success('添加成功！');
							} else {
								this.$message.error(res.data.message);
							}
							this.peopleInfoModal = false;
							this.getData();
						}).catch(err => {
							this.$message.error(err.data.message)
						})
					} else {
						return;
					}
				})
			},
			//编辑客户
			editPeople(data){
				this.clearPropleInfo();
				this.peopleInfoModal = true;
				this.setCustomer(data)
				// this.peopleInfo = data;
			},
			// 删除订单
			delOrderBtn(){
				this.$confirm('<span>您确定要删除该体检订单吗？</span><br /><i style="color:#8F9399;">确定删除后人员及项目将都被删除</i>', '提醒：', {
					confirmButtonText: '确定',
          cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: 'warning'
				}).then(() => {
          this.$message.success('删除订单成功');

        }).catch(err => {})
			},
			// 结束订单
			endOrderBtn(){
				this.$confirm('<span>您确定要结束该体检订单吗？</span><br /><i style="color:#8F9399;">确定结束后人员及项目将都不能再被编辑</i>', '提醒：', {
					confirmButtonText: '确定',
          cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: 'warning'
				}).then(() => {
          this.$message.success('结束订单成功');

        }).catch(err => {})
			},
			// 清空客户信息
			clearPropleInfo() {
				this.peopleInfo.NewCustomer.Sex = '',
				this.peopleInfo.NewCustomer.CardNum = '00000000-0000-0000-0000-000000000000',
				this.peopleInfo.NewCustomer.CustomerName = '',
				this.peopleInfo.NewCustomer.Nation = '',
				this.peopleInfo.NewCustomer.Birthday = '',
				this.peopleInfo.NewCustomer.Occupation = '',
				this.peopleInfo.NewCustomer.MaritalStatus = 1,
				this.peopleInfo.NewCustomer.DeptName = '',
				this.peopleInfo.NewCustomer.TeamName = '',
				this.peopleInfo.NewCustomer.VipFlag = 0,
				this.peopleInfo.NewCustomer.UnitName = '',
				this.peopleInfo.NewCustomer.Addr = '',
				this.peopleInfo.NewCustomer.Remark = '',
				this.peopleInfo.NewCustomer.Tele = ''
			},
			// 获取身份信息
			getIdentity() {
				api.getIdcard(this.setCustomer);
			},
			setCustomer(obj){
				for(let key in obj) {
					if (obj.hasOwnProperty(key)) {
						let key2 = '';
						if (key.length > 0) {
							key2 = key.substr(0,1).toUpperCase() + key.substr(1);
						}
						if (obj[key] && key2) this.peopleInfo.NewCustomer[key2] = obj[key];
					}
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
		},
		watch: {
			'peopleInfo.NewCustomer.Birthday': function(val, oldVal) {
				if (val !== oldVal) {
					this.age = moment().year() - moment(val).year();
				}
			},
			'peopleInfo.NewCustomer.VipFlag': function(val, oldVal) {
				if (val !== oldVal) {
					this.orderVipFlag = val === 1 ? true : false;
				}
			},
			orderVipFlag: function(val, oldVal) {
				if (val !== oldVal) {
					this.peopleInfo.NewCustomer.VipFlag = val ? 1 : 0;
				}
			},
		}
}
</script>
<style scope>
.right > * {
    display: inline-block;
}
.el-select{
  display: inline-block;
	width: 107px;
	margin-right: 16px;
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
</style>
