<template>
  <div class="content">
    <div class="topTitle">
			<span>团检订单</span>
    </div>
    <el-row>
			<div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
				<div class="peopleData">
						<div class="propleSearch">
							<el-input
								placeholder="请输入关键字"
								v-model="params.Filter"
								class="arcRadius"
								@keyup.enter.native="getData(true)"
								style="width: 150px;"
							>

							</el-input>
							<div style="display: inline-block;margin: 0 16px;">
								<el-date-picker
									v-model="timeRange"
									type="daterange"
									align="center"
									unlink-panels
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									:picker-options="pickerOptions">
								></el-date-picker>
								<el-button type="primary" @click="getData(true)">查询</el-button>
							</div>
							<div class="right">
								<el-button type="primary" @click="openUnitModal">新建单位</el-button>
							</div>
						</div>
				</div>
				<el-table :data="tableData" tooltip-effect="dark"  v-loading="loading">
					<!-- <el-table-column type="selection" width="55"></el-table-column> -->
						<el-table-column type="expand">
							<template slot-scope="scope">
								<el-table :data="scope.row.orders" class="inTable">
									<el-table-column prop="createTime" label="创建时间">
										<template slot-scope="scope">
											{{scope.row.createTime | formatDate('YYYY-MM-DD')}}
										</template>
									</el-table-column>
									<el-table-column prop="creator" label="创建人"></el-table-column>
									<el-table-column prop="closeTime" label="是否关闭">
										<template slot-scope="scope">
											{{scope.row.closeTime ? '是' : '否'}}
										</template>
									</el-table-column>
									<el-table-column prop="creator" label="备单人数">
										<template  slot-scope="scope">
											{{scope.row.orders.length || 0}}
										</template>
									</el-table-column>
									<el-table-column label="操作" fixed="right">
										<template slot-scope="scope">
											<el-button type="text" @click="createOrderBtn(scope.row)">导入人员</el-button>
											<el-button type="text" @click="openOrderDetail(scope.row)">订单详情</el-button>
										</template>
									</el-table-column>
								</el-table>
							</template>
						</el-table-column>
						<el-table-column prop="unitName" label="单位名称" :show-overflow-tooltip="true">
						</el-table-column>
						<el-table-column prop="contactor" label="联系人">
						</el-table-column>
						<el-table-column prop="tele" label="联系电话">
						</el-table-column>
						<el-table-column prop="createTime" label="创建时间">
							<template  slot-scope="scope">
								{{scope.row.createTime | formatDate('YYYY-MM-DD')}}
							</template>
						</el-table-column>
						<el-table-column prop="addr" label="地址">
						</el-table-column>
						<el-table-column prop="remark" label="操作" fixed="right" width="160">
							<template slot-scope="scope">
								<el-button type="text" @click="delUnit(scope.row)">删除</el-button>
								<el-button type="text" @click="openUnitModal(scope.row)">编辑</el-button>
								<el-button type="text" @click="createOrderBtn(scope.row)">创建订单</el-button>
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
				<!-- 保存单位 -->
				<el-dialog :title="title" :visible.sync="dialogFormVisible" width="400px" class="unitbox"  :close-on-click-modal="false" @close="unitCancel">
					<el-form :model="form.Unit" :rules="rules" ref="unitbox">
						<el-form-item label="单位名称" :label-width="formLabelWidth" prop="UnitName">
							<el-input v-model="form.Unit.UnitName"></el-input>
						</el-form-item>
						<el-form-item label="联系人" :label-width="formLabelWidth" prop="Contactor" style="width: 50%">
							<el-input v-model="form.Unit.Contactor"></el-input>
						</el-form-item>
						<el-form-item label="联系电话" :label-width="formLabelWidth" prop="Tele" style="width: 50%">
							<el-input v-model="form.Unit.Tele"></el-input>
						</el-form-item>
						<el-form-item label="地址" :label-width="formLabelWidth" prop="Addr">
							<el-input  type="textarea" :rows="2" v-model="form.Unit.Addr"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="submitUnit">确 定</el-button>
					</div>
				</el-dialog>
				<!-- 导入人员 -->
				<el-dialog title="导入人员" :visible.sync="importCustomerModal" class="importCustom" width="1000px" :close-on-click-modal="false" @close="importClear">
					<div class="peopleData">
						<div class="searchParams">
							<el-input
								placeholder="请搜索"
								v-model="importParams.Filter"
								@keyup.enter.native="filterData"
								class="arcRadius"
								style="width: 150px;">
							</el-input>
							<el-select v-model="importParams.Sex" clearable placeholder="性别" style="margin: 0 8px;width: 75px;">
								<el-option label="男"	:value="1"></el-option>
								<el-option label="女"	:value="2"></el-option>
							</el-select>
							<el-select v-model="importParams.MaritalStatus" clearable placeholder="婚姻状况" style="width: 100px;">
								<el-option label="未婚"	:value="1"></el-option>
								<el-option label="已婚"	:value="2"></el-option>
							</el-select>
							<el-select v-if="deptNames.length"  v-model="importParams.DeptName" clearable placeholder="部门" style="margin: 0 8px;width: 100px;">
								<el-option
									v-for="item in deptNames"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
							<el-select v-if="teamNames.length" v-model="importParams.TeamName" clearable placeholder="组别" style="width: 100px;">
								<el-option
									v-for="item in teamNames"
									:key="item.value"
									:label="item.label"
									:value="item.value"></el-option>
							</el-select>
							<div class="importAge">
								<el-input
									v-model="importParams.Age1"
									placeholder="岁"
									class="importIpt">
								</el-input>
								<span style="padding: 0 8px;">至</span>
								<el-input
									v-model="importParams.Age2"
									placeholder="岁"
									class="importIpt"
									>
								</el-input>
							</div>
							<div class="right">
								<el-button @click="filterData" type="primary">查询</el-button>
								<el-button @click="reset">重置</el-button>
							</div>
						</div>
						<div class="searchParams">
							<el-button-group>
								<el-upload
									class="upload-demo"
									:action="url"
									:on-success="uploadSuc"
									:on-error="uploadErr"
									:before-upload="beforeUpload"
									:show-file-list="false"
									accept=".xls,.xlsx">
									<el-button icon="el-icon-upload" style="margin-right: -1px;">导入</el-button>
								</el-upload>
								<el-button icon="el-icon-plus" @click="peopleInfoModal = true;clearPropleInfo();peopleInfo.Customer.IdcardNum = ''">添加</el-button>
								<el-button icon="el-icon-delete" @click="delBtn">删除</el-button>
								<el-button icon="el-icon-edit" @click="openAddPackage">套餐配置</el-button>
								<el-button icon="el-icon-edit" @click="openSetType">定制类型</el-button>
							</el-button-group>
						</div>
					</div>
					<el-table
						ref="table"
						:data="importData"
						height="250"
						style="width: 100%"
						@row-click="clickRow2"
						@selection-change="handleSelectionChange">
						<el-table-column type="selection" fixed="left" width="55"></el-table-column>
						<el-table-column prop="CustomerName" fixed="left" label="姓名"></el-table-column>
						<el-table-column prop="Sex" label="性别">
							<template slot-scope="scope">
								{{scope.row.Sex === 1 ? '男' : '女'}}
							</template>
						</el-table-column>
						<el-table-column prop="Tele" label="联系电话"></el-table-column>
						<el-table-column prop="CardNum" label="卡号"></el-table-column>
						<el-table-column prop="IdcardNum" label="身份证号"></el-table-column>
						<el-table-column prop="MaritalStatus" label="婚姻">
							<template slot-scope="scope">
								{{scope.row.MaritalStatus === 1 ? '未婚' : '已婚' }}
							</template>
						</el-table-column>
						<el-table-column prop="DeptName" label="部门"></el-table-column>
						<el-table-column prop="TeamName" label="组别"></el-table-column>
						<el-table-column prop="DiyFlag" label="定制类型">
							<template slot-scope="scope">
								{{scope.row.DiyFlag === 1 ? '个性化（有限）': scope.row.DiyFlag === 2 ? '个性化（无限）': scope.row.DiyFlag === 0 ? '固定套餐' : ''}}
							</template>
						</el-table-column>
						<el-table-column label="套餐名称">
							<template slot-scope="scope">
								{{scope.row.Packages[0].PackageName}}
							</template>
						</el-table-column>
						<el-table-column prop="Remark" label="备注"></el-table-column>
						<el-table-column prop="OrderMoney" label="金额">
							<template slot-scope="scope">
								{{scope.row.DiyFlag === 0 ? '￥' + (scope.row.OrderMoney.toFixed(2)) : ''}}
							</template>
						</el-table-column>
						<el-table-column prop="FeeType" fixed="right" label="操作">
							<template slot-scope="scope">
								<el-button type="text" @click="editCustomer(scope.row)">编辑人员</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div slot="footer" class="dialog-footer">
						<el-button @click="cancelSubmitBtn">取消</el-button>
						<el-button type="primary" @click="submitImportBtn">确定</el-button>
					</div>
				</el-dialog>
				<!-- 选择套餐 -->
				<el-dialog title="选择套餐" :visible.sync="addPackageModal" :close-on-click-modal="false" width="800px" @open="getPackageList">
					<div class="modal-tree addPackage">
						<div class="modal-top">名称</div>
						<div class="modal-con addPackage">
							<el-tree
								:data="GetPackageList"
								show-checkbox
								node-key="id"
								ref="tree"
								@check="treeClick"
								>
							</el-tree>
						</div>
						<div class="packageDis">
							<span class="item">原价：￥ <span>{{packageDiscount.totalPrice2 | numFilter}}</span></span>
							<div class="right">
								<el-checkbox v-model="isFree">优惠自由</el-checkbox>
								折扣：<div class="item-list iptNum">
										<el-input-number v-model="packageDiscount.discount" @blur="discountHandle('packageDiscount')" @change="discountHandle('packageDiscount')" :min="0" :max="1" :step="0.1"></el-input-number>
									</div>&nbsp;&nbsp;&nbsp;&nbsp;
								实收：<el-input v-model.number="packageDiscount.exePrice2" type="number" style="width: 100px;" @blur="realPriceHandle('packageDiscount')"></el-input>&nbsp;元
							</div>
						</div>
					</div>
					<div slot="footer" class="dialog-footer">
							<el-button @click="cancelPackageBtn" style="margin-right: 8px;">取 消</el-button>
							<el-button type="primary" @click="addPackageBtn">确定</el-button>
					</div>
				</el-dialog>
				<!-- 定制类型 -->
				<el-dialog title="定制类型" :visible.sync="setTypeModal" :close-on-click-modal="false" width="500px" class="setType">
					<el-radio-group v-model="diy" style="width: 133px">
						<el-radio :label="0">固定套餐</el-radio>
						<el-radio :label="1">个性化（有限）</el-radio>
						<el-radio :label="2">个性化（无限）</el-radio>
					</el-radio-group>
						<el-input :span="12"
							type="number"
							v-show="diy === 1"
							min="0"
							style="width: 150px;"
							placeholder="请输入限定价格"
							v-model.number="diyPrice"
							clearable>
						</el-input>
					<div slot="footer" class="dialog-footer">
						<el-button @click="setTypeModal = false;">取消</el-button>
						<el-button type="primary" @click="addDIYBtn" >确定</el-button>
					</div>
				</el-dialog>
				<!-- 人员信息 -->
				<el-dialog title="人员信息" :visible.sync="peopleInfoModal" width="1000px" :close-on-click-modal="false" class="peopleInfoForm" @close="$refs.peopleForm.resetFields()">
					<el-form :model="peopleInfo.Customer" :rules="rulesPeople" ref="peopleForm" :inline="true" label-width="50px" >
						<el-form-item label="身份证号" prop="IdcardNum" :label-width="formLabelWidth">
							<el-input
								v-model="peopleInfo.Customer.IdcardNum"
								maxlength="18"
								style="width: 130px;margin-right: 8px;"
							></el-input>
							<el-button type="primary" plain style @click="getIdentity">刷身份证</el-button>
						</el-form-item>
						<el-form-item label="体检卡号" prop="CardNum" :label-width="formLabelWidth">
							<el-input v-model="peopleInfo.Customer.CardNum" maxlength="20" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="CustomerName" :label-width="formLabelWidth">
							<el-input v-model="peopleInfo.Customer.CustomerName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="Sex" :label-width="formLabelWidth">
							<el-select v-model="peopleInfo.Customer.Sex" style="width: 100%;">
								<el-option label="男" :value="1"></el-option>
								<el-option label="女" :value="2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="民族" prop="Nation" :label-width="formLabelWidth">
							<el-input v-model="peopleInfo.Customer.Nation"></el-input>
						</el-form-item>
						<el-form-item label="出生日期" prop="Birthday" :label-width="formLabelWidth">
							<el-date-picker
								v-model="peopleInfo.Customer.Birthday"
								type="date"
								style="width: 143px;margin-right: 8px;"
							></el-date-picker>
							<el-button-group>
								<el-button style="padding: 7px 6px;width: 50%;">{{age}}</el-button>
								<el-button style="padding: 7px 6px;width: 50%;">岁</el-button>
							</el-button-group>
						</el-form-item>
						<el-form-item label="职业" prop="Occupation" :label-width="formLabelWidth">
							<el-input v-model="peopleInfo.Customer.Occupation"></el-input>
						</el-form-item>
						<el-form-item label="婚姻状况" prop="MaritalStatus" :label-width="formLabelWidth">
							<el-select v-model="peopleInfo.Customer.MaritalStatus">
								<el-option label="未婚" :value="1"></el-option>
								<el-option label="已婚" :value="2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="手机号" prop="Tele" :label-width="formLabelWidth">
							<el-input v-model="peopleInfo.Customer.Tele" autocomplete="off" maxlength="11"></el-input>
						</el-form-item>
						<el-form-item label="部门" prop="DeptName" :label-width="formLabelWidth">
							<el-input v-model="peopleInfo.Customer.DeptName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="班组" prop="TeamName" :label-width="formLabelWidth">
							<el-input v-model="peopleInfo.Customer.TeamName"></el-input>
						</el-form-item>
						<el-form-item label="VIP属性" prop="VipFlag" :label-width="formLabelWidth">
							<el-radio-group v-model="peopleInfo.Customer.VipFlag">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="单位" prop="UnitName" :label-width="formLabelWidth">
							<el-input v-model="peopleInfo.Customer.UnitName"></el-input>
						</el-form-item>
						<el-form-item label="地址" prop="Addr" class="w65" :label-width="formLabelWidth">
							<el-input v-model="peopleInfo.Customer.Addr"></el-input>
						</el-form-item>
						<el-form-item label="备注信息" prop="Remark" class="w100" :label-width="formLabelWidth">
							<el-input type="textarea" v-model="peopleInfo.Customer.Remark"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="peopleInfoModal = false;">取消</el-button>
						<el-button type="primary" @click="addPeopleBtn(peopleInfo.Customer.IdcardNum)" >确定</el-button>
					</div>
				</el-dialog>
				<orderDetails ref="orderDetail"></orderDetails>
			</div>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
import _ from 'lodash'
import consts from "../../../utils/const"
import PinyinMatch from 'pinyin-match'
import orderDetails from './orderDetails.vue'
import {mapState} from 'vuex'
   export default {
		name: 'DDGrpOrder',
		components: {orderDetails},
    data() {
			var validateId = (rule, value, callback) => {
				if(value.length === 18) {
					callback();
					return;
				}
				if (this.isPeopleSave) {
					this.$confirm('身份证位数不合法，是否继续操作？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.clearPropleInfo();
						this.getCustomer();
						this.isPeopleSave = false;
						callback();
					})
				} else {
					callback();
				}
			};
      return{
				isAddPeople: true,//区别是否是添加人员还是修改人员
				isFree: false,//优惠自由权限
				isPeopleSave: true,
				isMoreOrder: false,//是否允许单位同时存在多个订单
				url: consts.SF_REPORT_PATH + this.$api.ImportCustomer, // 上传路径需修改
				timeRange: [
					moment()
						.subtract(1, 'year')
						.format(),
					moment().format()
				],
				pickerOptions: {
					shortcuts: [
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
						},
						{
							text: "最近三年",
							onClick(picker) {
								const end = new Date();
								const start = new Date(moment().subtract(3, 'year'));
								picker.$emit("pick", [start, end]);
							}
						}
					]
				},
				loading: false,//0 列表数据；1选择套餐后的loading
				title: '',
				params: {
					Filter: '',
					timeRange: [moment().subtract(1, 'year').format(),moment().format()]
				},
        searchParams: {
					PageIndex: 1,
					PageSize: 10
				},
				deptNames: [],
				teamNames: [],
        dialogFormVisible: false,
        importCustomerModal: false,
				addPackageModal: false,
				setTypeModal: false,
				peopleInfoModal: false,

				GetPackageList: [],//套餐项目集合
				selectedLeft: [],// 选择套餐选中得集合
				visible: false,
				packageDiscount: {//选择套餐打折数据
					totalPrice: 0,
					totalPrice2: 0,
					discount: 0,
					discount2: 0,
					exePrice: 0,
					exePrice2: 0,
				},
				// 单位提交数据
        form: {
					OperatorCode: "001",
					Unit: {
						UnitCode: "00000000-0000-0000-0000-000000000000",
						UnitName: "",
						Contactor: "",
						Tele: "",
						Addr: "",
						CreateTime: moment().format('YYYY-MM-DD'),
						Remark: "",
						Orders: []
  				}
				},
				rules: {
					UnitName: [
						{ required: true, message: '请输入单位名称', trigger: 'blur' }
					],
					Contactor: [
						{ required: true, message: '请输入联系人', trigger: 'blur' }
					],
					Tele: [
						{ required: true, message: '请输入手机号', trigger: 'blur' }
					],
					Addr: [
						{ required: true, message: '请输入地址信息', trigger: 'blur' }
					],
				},
        formLabelWidth: '70px',
        tableData: [],
				total: 0,
				importParams: {},//筛选条件
				package: {
					PackageCode: '',
					PackageName: ''
				},
				diy: 0,
				diyPrice: '',
				subOrderParams: {
					GroupOrderCode: "",
					UnitCode: '',
					Operator: "001",
					Orders: [
						{//orderCode\orderType
							OrderCode: '00000000-0000-0000-0000-000000000000',
							CustomerCode: '00000000-0000-0000-0000-000000000000',
							CustomerName: '',
							Sex: '',//1 男 2 女
							MaritalStatus: 1,//1 未婚  =2 已婚
							Nation: '',
							Birthday: '',
							IdcardNum: '',
							Photo: '',
							VipFlag: 0,//0非 1 是
							CardNum: '',
							Tele: '',
							Addr: '',
							Occupation: '',
							UnitName: '',
							DeptName: '',
							TeamName: '',
							Packages: [{
								PackageCode: '',
								PackageName: ''
							}],
							OrderVipFlag: 0,//0非 1 是
							OrderType: '',
							ReportType: 0,
							CreateOrderTime: moment().format('YYYY-MM-DD'),
							Status: '',
							IsLock: false,
							Remark: '',
							OrderMoney: 0,
							PaidStatus: 0,
							PaidMoney: 0,//已支付金额，查询的
							UnitPayMoney: 0,//单位付费金额。查询的
							Items: [],
							ReportTakeWay: 0,//报告领取方式
							ReportType: 1,// 报告类型
							SpecialReportType: 0//特殊报告类型
						}
					]
				},
				multipleSelection: [],// 导入数据后所选中的
				importAllData: [],
				importData: [], // 导入后显示的数据
				// 新增人员信息
				age: 0,
				orderVipFlag: 0,
				peopleInfo: {
					OrderCode: '',
					Operator: '001',
					Customer: {
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
				rulesPeople: {
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
							{ mmin: 1, max: 18, validator: validateId, trigger: 'blur' }
					],
					Birthday: [
							{ required: true, message: '请选择时间', trigger: 'change' }
					],
					VipFlag: [
							{  required: true, message: '请选择Vip属性', trigger: 'blur' }
					],
					Tele: [
							{ required: true, message: '请输入联系电话', trigger: 'blur' },
							{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'  }
					]
				},
				load: '',
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
				this.$refs.table.toggleRowSelection(row);
			},
			//获取列表数据
			getData(key){
				this.loading = true;
				if(key) {
					if (!this.timeRange  || this.timeRange.length !== 2) {
						this.searchParams.StartDatetime = '';
						this.searchParams.EndDatetime = '';
					} else {
						this.searchParams.StartDatetime = moment(this.timeRange[0]).format("YYYY-MM-DD");
						this.searchParams.EndDatetime = moment(this.timeRange[1]).format("YYYY-MM-DD");
					}
					this.searchParams.Filter = this.params.Filter;
					this.params.timeRange = this.timeRange;
					this.searchParams.PageIndex = 1;
				} else {
					this.params.Filter = this.searchParams.Filter;
					this.timeRange = this.params.timeRange;
				}

				this.$axios.get(this.$api.GetUnitList, {params: this.searchParams}).then(res => {
					if (res.data.status === 1) {
						this.tableData = res.data.entity.resultData;
						this.total = res.data.entity.totalCount;
					} else {
						this.$message.error(res.data.message);
					}
					this.loading = false;
				}).catch(err => {
					this.$message.error(err.data.message);
					this.loading = false;
				})
			},
			//获取单位团检订单号
			subOrders(UnitCode){
				this.$axios.post(this.$api.CreateGroupOrder, {
					UnitCode,
  				OperatorCode: "001"
				}).then(res => {
					if (res.data.status === 1) {
						this.subOrderParams.GroupOrderCode = res.data.entity;
						this.importData = [];
						this.importCustomerModal = true;
					} else {
						this.$message.error(res.data.message)
					}
				}).catch(err => {
						this.$message.error(err.data.message)
				})

			},
			cancelSubmitBtn(){
				this.subOrderParams.GroupOrderCode = '';
				this.subOrderParams.Orders = [];
				this.importCustomerModal = false;
			},
			// 提交团检订单
			submitImportBtn(){
				if(this.importAllData.length === 0) {
					this.$message.error('请先导入人员后提交');
					return;
				}
				for(let key of this.importAllData) {
					if (key.Items && key.Items.length == 0) {
						this.$message.error('请对所有人员配置套餐');
						return;
					}
				}
				this.subOrderParams.Orders = this.importAllData;
				let loading = this.$loading({
          lock: true,
          text: '提交订单中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
				});
				this.$axios.post(this.$api.SubmitGroupOrder, this.subOrderParams).then(res => {
					if (res.data.status === 1) {
						this.$message.success('订单创建成功！');
						this.importCustomerModal = false;
						this.getData();
					} else {
						this.$message.error(res.data.message);
					}
					loading.close();
				}).catch(err => {
					loading.close();
					this.$message.error(err.data.message);
				})

			},
			//提交订单弹窗消失后清空数据
			importClear(){
				this.importAllData = this.importData = [];
				this.importParams.filter = '';
				this.importParams.Sex = '';
				this.importParams.MaritalStatus = '';
				this.importParams.DeptName = '';
				this.importParams.TeamName = '';
				this.importParams.Age1 = '';
				this.importParams.Age2 = '';
			},
			//提交订单重置清空数据
			reset(){
				this.importParams.filter = '';
				this.importParams.Sex = '';
				this.importParams.MaritalStatus = '';
				this.importParams.DeptName = '';
				this.importParams.TeamName = '';
				this.importParams.Age1 = '';
				this.importParams.Age2 = '';
				this.filterData();
			},
			//创建订单按钮
			createOrderBtn(data){
				this.subOrderParams.UnitCode = data.unitCode;
				if (data.orderCode) {
					this.subOrderParams.GroupOrderCode = data.orderCode;
					this.importData = [];
					this.importCustomerModal = true;
				} else {
					if (data.orders.length > 0) {
						if(this.isMoreOrder) {
							this.message.error('存在历史订单，不能新建订单！');
						} else {
							this.$confirm('存在历史订单，是否新建？', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								this.subOrders(data.unitCode);
							}).catch(() => {
								this.$message.warning('不能新建订单');
							})
						}
					} else {
						this.subOrders(data.unitCode);
					}
				}
			},
			//导入人员搜索
			filterData(){
				if (this.importAllData.length == 0) {
					this.$message.error('请先导入人员！');
					return;
				}
				let filter = this.importParams.Filter;
				let sex = this.importParams.Sex;
				let maritalStatus = this.importParams.MaritalStatus;
				let deptName = '';
				let teamName = '';
				let age1 = this.importParams.Age1;
				let age2 = this.importParams.Age2;
				this.deptNames.forEach(x => {
					if (x.value === this.importParams.DeptName) {
						deptName = x.label;
					}
				})
				this.teamNames.forEach(x => {
					if (x.value === this.importParams.TeamName) {
						teamName = x.label;
					}
				})
				let result = [];
				if (filter) {
					result = this.importAllData.filter(x => {
						return PinyinMatch.match(x.CustomerName, filter);
					})
				} else {// 这样复制可能存在问题
					result = this.importAllData;
				}
				if (sex) {
					result = result.filter(x => {
						return sex === x.Sex;
					})
				}
				if (maritalStatus) {
					result = result.filter(x => {
						return maritalStatus === x.MaritalStatus;
					})
				}
				if (deptName) {
					result = result.filter(x => {
						return deptName === x.DeptName;
					})
				}
				if (teamName) {
					result = result.filter(x => {
						return teamName === x.TeamName;
					})
				}
				if (age1) {
					result = result.filter(x => {
						let age = moment().year() - moment(x.Birthday).year();
						return age > age1;
					})
				}
				if (age2) {
					result = result.filter(x => {
						let age = moment().year() - moment(x.Birthday).year();
						return age < age2;
					})
				}
				this.importData = result;
			},
			//上传回调
			beforeUpload(file){
				if (file) {
					this.load = this.$loading({
						lock: true,
						text: '文件上传中，请稍后...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
				}
			},
			uploadSuc(response, file, fileList){
				if(response.status === 1) {
					let data = response.entity;
					if (data.result === 0) {
						data.customers.forEach(x => {
							let people = {}
							for(let key in x) {
								if (x.hasOwnProperty(key)) {
									let key2 = '';
									if (key.length > 0) {
										key2 = key.substr(0,1).toUpperCase() + key.substr(1);
									}
									people[key2] = x[key];
									people.Packages = [{
										PackageCode: '',
										PackageName: ''
									}];
								}
							}
							this.importData.push(people)
							people = {};
						})
						if(this.importAllData.length === 0) {
							this.deptNames = [];
							this.teamNames = [];
						}
						this.importData = this.importAllData = _.uniqBy(this.importData, 'IdcardNum');
						this.importAllData.forEach((x,index) => {
							if(x.DeptName) {
								this.deptNames.push({
									value: index,
									label: x.DeptName
								});
							}
							if(x.TeamName) {
								this.teamNames.push({
									value: index,
									label: x.TeamName
								});
							}
						})
						this.deptNames = _.uniqBy(this.deptNames, 'label');
						this.teamNames = _.uniqBy(this.teamNames, 'label');
					} else {
						let html = '';
						data.errs.forEach(x => html += `<p>${x}</p>`);
						this.$alert(html, '提示：', {
							dangerouslyUseHTMLString: true
						})
						this.importAllData = this.importData = [];
					}
				} else {
					this.importAllData = this.importData = [];
				}
				this.load.close();
			},
			uploadErr(err, file, fileList){
				this.$message.error(err.message);
				// this.importData = [];
				this.load.close();
			},
			//删除单位
			delUnit(data){
				if (data.orders.length > 0) {
					this.$message.error('当前单位存在订单，不能删除！');
					return;
				}
				this.$axios.post(this.$api.DeleteUnit, {
					UnitCode: data.unitCode,
  				OperatorCode: "001"
				}).then(res => {
					if (res.data.status === 1) {
						this.$message.success('单位删除成功！');
						this.getData();
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(err => {
						this.$message.error(err.data.message);
				})
			},
			// 导入人员 - 删除按钮
			delBtn(){
				if (this.multipleSelection.length === 0) {
					this.$message.error('请先选择后删除！');
					return;
				}
				this.importAllData = this.importAllData.filter(x => {
					return !this.multipleSelection.some(y => y.IdcardNum == x.IdcardNum);
				})
				this.filterData();
			},
			// 获取身份信息
			getIdentity() {
				api.getIdcard(this.setCustomer);
			},
			//查询客户信息
			getCustomer(key){
				if(!this.peopleInfo.Customer.CustomerName && !this.peopleInfo.Customer.Sex) return;
				this.$axios.get(this.$api.GetCustomer, {
					params: {
						IdcardNum: this.peopleInfo.Customer.IdcardNum
					}
				}).then(res => {
					if (res.data.entity && res.data.status === 1){
							let obj = res.data.entity;
							if(obj) {
								this.clearPropleInfo();
								this.setCustomer(obj);
							}
					}
				})
			},
			// 设置人员信息
			setCustomer(obj){
				for(let key in obj) {
					if (obj.hasOwnProperty(key)) {
						let key2 = '';
						if (key.length > 0) {
							key2 = key.substr(0,1).toUpperCase() + key.substr(1);
						}
						if (obj[key] && key2) this.peopleInfo.Customer[key2] = obj[key];
					}
				}
			},
			// 清空人员信息
			clearPropleInfo() {
				// 暂时共14项
				this.peopleInfo.Customer.Sex = '',
				this.peopleInfo.Customer.CardNum = '',
				this.peopleInfo.Customer.CustomerName = '',
				this.peopleInfo.Customer.Nation = '',
				this.peopleInfo.Customer.Birthday = '',
				this.peopleInfo.Customer.Occupation = '',
				this.peopleInfo.Customer.MaritalStatus = 1,
				this.peopleInfo.Customer.DeptName = '',
				this.peopleInfo.Customer.TeamName = '',
				this.peopleInfo.Customer.VipFlag = 0,
				this.peopleInfo.Customer.UnitName = '',
				this.peopleInfo.Customer.Addr = '',
				this.peopleInfo.Customer.Remark = '',
				this.peopleInfo.Customer.Tele = ''
			},
			//编辑人员
			editCustomer(data) {
				this.peopleInfoModal = true;
				this.setCustomer(data);
				this.isAddPeople = false;
			},
			//保存人员信息-确定
			addPeopleBtn(id){
				this.$refs.peopleForm.validate((valid) => {
					if(valid) {
						this.peopleInfoModal = false;
						let index = this.importAllData.findIndex(x => x.IdcardNum === id);
						if (index !== -1 && this.isAddPeople) {
							this.$message.error('该人员已导入，请重新检查人员信息');
							return;
						} else {
							let ind = this.importData.length;
							let obj = {};
							for(let key in this.peopleInfo.Customer) {
								if (this.peopleInfo.Customer.hasOwnProperty(key)) {
									let key2 = '';
									if (key.length > 0) {
										key2 = key.substr(0,1).toUpperCase() + key.substr(1);
									}
									obj[key] = this.peopleInfo.Customer[key];
								}
							}
							this.importAllData.push(obj)
							console.log(this.importAllData)
						}
						this.isAddPeople = true;
					}
				})
			},
			openOrderDetail(data) {
				this.$refs.orderDetail.orderDetailsModal = true;
				this.$refs.orderDetail.orderParams = data;
				this.$refs.orderDetail.subOrderParams.GroupOrderCode = data.orderCode;
			},
			// 创建单位窗口关闭
			unitCancel(){
				this.form.Unit.UnitName = '';
				this.form.Unit.Contactor = '';
				this.form.Unit.Tele = '';
				this.form.Unit.Addr = '';
				this.form.Unit.Orders = [];
				this.form.Unit.UnitCode = "00000000-0000-0000-0000-000000000000";
				this.form.Unit.CreateTime = moment().format('YYYY-MM-DD');
				this.form.Unit.Remark = '';
				this.$refs.unitbox.clearValidate();
			},
			openUnitModal(data){
				if (data) {
					for(let key in data) {
						if (data.hasOwnProperty(key)) {
							let key2 = '';
							if (key.length > 0) {
								key2 = key.substr(0,1).toUpperCase() + key.substr(1);
							}
							if (data[key] && key2) this.form.Unit[key2] = data[key];
						}
					}
					this.title = '编辑单位';
				} else {
					this.title = '新建单位';
				}
				this.dialogFormVisible = true;
			},
			//创建单位-确定
			submitUnit(){
				this.$refs.unitbox.validate((valid) => {
					if (valid) {
						this.$axios.post(this.$api.SaveUnit,this.form).then(res => {
							if (res.data.status === 1) {
								if (this.title === '编辑单位') {
									this.$message.success('修改单位成功');
								} else {
									this.$message.success('添加单位成功');
								}
								this.dialogFormVisible = false;
								this.getData();
							} else {
								this.$message.error(res.data,message);
							}
						}).catch(err => {
								this.$message.error(err.data,message);
						})
					}
				})
			},
			// tree单选的实现 + 实时更新选中项目
			treeClick(a,b){
				if (b.checkedKeys.length > 0) {
					this.$refs.tree.setCheckedKeys([a.id]);
				} else {
					this.$refs.tree.setCheckedKeys([]);
				}
				if(b.checkedNodes.length === 0) {
					this.package.PackageCode = '00000000-0000-0000-0000-000000000000';
					this.package.PackageName = '';
					this.package.packageType = '';
				} else {
					this.selectedLeft = _.cloneDeep(a.children);
					this.package.PackageCode = a.packageCode;
					this.package.PackageName = a.packageName;
				}
				this.diy = 0;
				this.diyPrice = 0;
				this.getDiscount('packageDiscount', this.selectedLeft);
			},
			//套餐配置按钮
			openAddPackage() {
				if (this.multipleSelection.length === 0) {
					this.$message.error('请先选择后选择套餐！');
					return;
				}
				this.addPackageModal = true;
			},
			// 定制类型按钮
			openSetType(){
				if (this.multipleSelection.length === 0) {
					this.$message.error('请先选择后选择定制类型！');
					return;
				}
				this.setTypeModal = true;
			},

			// 添加套餐取消按钮
			cancelPackageBtn() {
				this.selectedLeft = [];
				this.addPackageModal = false;
				this.packageDiscount.discount = 0;
				this.packageDiscount.discount2 = 0;
				this.packageDiscount.exePrice = 0;
				this.$refs.tree.setCheckedKeys([]);
			},
			// 添加套餐确定按钮
			addPackageBtn() {
				this.USERINFO.discount = 0;//预设系统最低折扣
				this.visible = false;

				if (this.$refs.tree.getCheckedNodes().length === 0) {
					this.$message.error('请先选择套餐后点击确定！');
					return;
				}
				let lowestPriceAll = 0;//项目最低价之和
				let exePriceAll = 0;//项目原执行价之和
				let fullPriceAll = 0;//项目原价之和
				this.selectedLeft.forEach(x => {
					lowestPriceAll += x.lowestPrice;
					exePriceAll += x.exePrice;
					fullPriceAll += x.fullPrice;
				})

				this.selectedLeft = this.selectedLeft.filter(x => x.itemCode);
				let lowestDiscount = exePriceAll/fullPriceAll;
				if(this.isFree) {
					if(this.USERINFO.discount > this.packageDiscount.discount2) {
						this.$message.error(`您最低的折扣为${this.USERINFO.discount.toFixed(2)}`);
						return;
					}
				} else {
					lowestDiscount = this.USERINFO.discount < lowestDiscount ? this.USERINFO.discount : lowestDiscount;
					if(lowestDiscount > this.packageDiscount.discount2) {
						this.$message.error(`您最低的折扣为${lowestDiscount.toFixed(2)}`);
						return;
					}
					if (lowestPriceAll > this.packageDiscount.exePrice) {
						this.$message.error(`您最低的折扣金额为${lowestPriceAll.toFixed(2)}元`);
						return;
					}
				}

				let discount = this.packageDiscount.exePrice / fullPriceAll;
				this.distributePrice(this.selectedLeft, this.packageDiscount.exePrice,discount);

				this.multipleSelection.forEach(x => {
					this.importData.forEach((y, index) => {
						if (x.IdcardNum === y.IdcardNum) {
							this.importData[index].Items = this.selectedLeft.map(z => {
								return this.$handleUpperCase(z);
							});

							this.importData[index].Packages[0].PackageCode = this.package.PackageCode;
							this.importData[index].Packages[0].PackageName = this.package.PackageName;
							this.importData[index].OrderMoney = 0;
							if(!this.diy && !this.importData[index].DiyFlag) {
								this.importData[index].DiyFlag = 0;
							}
							this.importData[index].OrderMoney = this.packageDiscount.exePrice;

							if(this.importData[index].DiyFlag === 0) {
								this.importData[index].UnitPayMoney = this.importData[index].OrderMoney;
							} else if (this.importData[index].DiyFlag === 1) {
								this.importData[index].UnitPayMoney = this.diyPrice;
							} else if (this.importData[index].DiyFlag === 2) {
								this.importData[index].UnitPayMoney = 0;
							}
							this.$set(this.importData, index, y);
						}
					});
				});
				this.$refs.tree.setCheckedKeys([]);
				this.addPackageModal = false;
			},
			// 对项目执行价的处理
			distributePrice(data, exePriceAll, discount){//要处理的一维数组，执行价之和，折扣率
				let difPrice = exePriceAll;
				data = data.map((x, index) => {
					x.exePrice = x.fullPrice * discount;
					if(x.exePrice <= x.lowestPrice) {
						difPrice = difPrice - x.lowestPrice;
						x.exePrice = x.lowestPrice;
					}
					return x;
				})
				if (difPrice !== exePriceAll ) {
					data = data.filter(x => {
						return x.exePrice > x.lowestPrice;
					})
					let lastFullPrice = 0;
					data.forEach(x => {
						lastFullPrice += x.fullPrice;
					})
					this.distributePrice(data, difPrice, difPrice / lastFullPrice);
				}
			},
			// 定制类型-确定
			addDIYBtn(){
				if(this.diy === 1 && !this.diyPrice && this.diyPrice !== 0) {
					this.$message.error('请输入个性化套餐的限定金额');
					return;
				} else {
					this.multipleSelection.forEach(x => {
						this.importData.forEach((y, index) => {
							if (x.IdcardNum === y.IdcardNum) {
								this.importData[index].DiyFlag = this.diy;
								this.importData[index].OrderMoney = 0;
								this.selectedLeft.forEach(y => {
									this.importData[index].OrderMoney += y.exePrice;
								})
								if(this.diy === 0) {
									this.importData[index].UnitPayMoney = this.importData[index].OrderMoney;
								} else if (this.diy === 1) {
									this.importData[index].UnitPayMoney = this.diyPrice;
								} else if (this.diy === 2) {
									this.importData[index].UnitPayMoney = 0;
								}
								this.$set(this.importData, index, y);
							}
						})
					})

					this.setTypeModal = false;
				}
			},
			//获取套餐列表-选择套餐
			getPackageList(){
				if (this.GetPackageList.length > 0) return;
				this.$axios.get(this.$api.GetPackageListDD, {params: {PackageType: 0}}).then(res => {
					if (res.status === 200 && res.data.status === 1) {
						this.GetPackageList =  res.data.entity[0].items;
						this.handleTreeChildren(this.GetPackageList, 0);
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(err => {
					this.$message.error(err.data.message);
				})
			},
			// 处理字典tree结构
			handleTreeChildren(data, type){
				if (!data ) return;
				data.map((i,index) => {
					i.id = (i.packageCode || i.itemCode || i.deptCode || ('#' + index))
					i.label = (i.packageName || i.itemName || i.deptName || i.name)
					i.type = type;//1- 套餐（已删除） 2- 科室  3-项目
					if (type === 1) {
						// this.GetPackageFilterNum++;
					} else if(type === 2) {
						this.GetDeptListNum++;
					} else if(type === 3) {
						this.GetItemListNum++;
					}
					if (i.items && i.items.length > 0) {
						i.children = i.items;
						this.handleTreeChildren(i.children, type);
					}
				})
			},
			// 计算添加项目中打折折扣
			getDiscount(key, data){//key - 修改字符   data - 数据源
				this[key].totalPrice = 0;
				this[key].exePrice = 0;
				if(data.length === 0) {
					this[key].exePrice2 = 0;
					this[key].totalPrice2 = 0;
					this[key].discount2 = 0;
					this[key].discount = 0;
					return;
				}
				data = data.filter(x => {
					return x.itemCode;
				});
				data.forEach(x => {
					this[key].exePrice += x.exePrice || 0;
					this[key].totalPrice += x.fullPrice || 0;
				})
				this[key].discount = (parseInt(this[key].exePrice / this[key].totalPrice *100) / 100) || 0;
				this[key].discount2 = (this[key].exePrice / this[key].totalPrice) || 0;
				this.handleTwo(key);
			},
			//关于打折保留2位小数的处理
			handleTwo(key) {
				let num1 = this[key].totalPrice.toFixed(3);
				let num2 = this[key].exePrice.toFixed(3);
				this[key].totalPrice2 = Number(num1.substring(0, (num1 + '').length - 1));
				this[key].exePrice2 = Number(num2.substring(0, (num2 + '').length - 1));
				if(this[key].difPrice || this[key].difPrice == 0) {
					let num3 = this[key].difPrice.toFixed(3);
					this[key].difPrice2 = Number(num3.substring(0, (num3 + '').length - 1));
				}
			},
			//按回车后对折扣的进行处理
			discountHandle(key) {
				if (this[key].discount >= 0 || this[key].discount <= 1) {
					this.isDisCount = true;
				} else {
					this.$message.error('请输入正确的折扣');
					return;
				}
				this[key].exePrice = (this[key].totalPrice * this[key].discount).toFixed(4);
				this[key].exePrice = Number(this[key].exePrice.substring(0, this[key].exePrice.length - 1));
				this[key].difPrice = this[key].totalPrice - this[key].exePrice;
				this[key].discount2 = this[key].discount;
				this.handleTwo(key);
			},
			//按回车后对折扣金额的进行处理
			difPriceHandle(key) {
				if(this[key].difPrice2 < 0 || this[key].difPrice2 > this[key].totalPrice) {
					this.$message.error('请输入正确的折扣金额');
					return;
				}
				this[key].difPrice = this[key].difPrice2;
				this[key].exePrice = this[key].totalPrice - this[key].difPrice;
				this[key].discount = parseInt(this[key].exePrice / this[key].totalPrice * 100) / 100;
				this[key].discount2 = this[key].exePrice / this[key].totalPrice;
				let num = this[key].exePrice.toFixed(3);
				this[key].exePrice2 = Number(num.substring(0, (num + '').length - 1));
			},
			//按回车后对实收金额的进行处理
			realPriceHandle(key) {
				if(this[key].exePrice2 > this[key].totalPrice || this[key].exePrice2 < 0) {
					this.$message.error('请输入正确的折扣金额');
					return;
				}
				this[key].exePrice = this[key].exePrice2;
				this[key].discount = parseInt(this[key].exePrice / this[key].totalPrice * 100) / 100;
				this[key].discount2 =this[key].exePrice / this[key].totalPrice;
				this[key].difPrice = this[key].totalPrice - this[key].exePrice;
				let num = this[key].difPrice.toFixed(3);
				this[key].difPrice2 = Number(num.substring(0, (num + '').length - 1));
			},
			// 按回车后对打折进行处理-废弃
			packageDiscountHandle(){
				if (this.packageDiscount.discount < 0.1 || this.packageDiscount.discount > 1) {
					this.$message.error('请输入正确的折扣');
					this.isDisCount2 = false;
					return
				}
				this.packageDiscount.exePrice = parseInt(this.packageDiscount.totalPrice * this.packageDiscount.discount).toFixed(2);
			},
			packageExePriceHandle(){
				if (this.packageDiscount.exePrice > this.packageDiscount.totalPrice) {
					this.isDisCount2 = false;
					this.$message.error('实收价应不高于总价格！');
					return
				}
				this.packageDiscount.discount = parseInt(this.packageDiscount.exePrice / this.packageDiscount.totalPrice * 100) /100;
				this.packageDiscount.discount2 = this.packageDiscount.exePrice / this.packageDiscount.totalPrice;
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
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
			// 根据身份证号自动填写年龄和性别
			getAgeBrith(id){
				if (!id) return;
				this.peopleInfo.Customer.Sex = id.substr(16, 1) % 2 ? 1: 2;
			}
		},
		computed: {
			...mapState([
				'USERINFO'
			])
		},
		watch: {
			'peopleInfo.Customer.IdcardNum': function(val, oldVal) {
				if (val !== oldVal && val.length === 18) {
					this.getAgeBrith(val)
					this.getCustomer();
				} else {
					this.isPeopleSave = true;
					this.clearPropleInfo();
				}
			},
			'peopleInfo.Customer.Birthday': function(val, oldVal) {
				if (val !== oldVal) {
					this.age = moment().year() - moment(val).year();
				}
			},
			'peopleInfo.Customer.VipFlag': function(val, oldVal) {
				if (val !== oldVal) {
					this.orderVipFlag = val === 1 ? true : false;
				}
			},
			orderVipFlag: function(val, oldVal) {
				if (val !== oldVal) {
					this.peopleInfo.Customer.VipFlag = val ? 1 : 0;
				}
			},
		}
   }
</script>
<style scoped>
.el-date-editor--daterange.el-input__inner {
	width: 250px;
	margin-right: 16px;
}
.unitbox >>> .el-form-item__label {
	text-align: left;
}
.peopleInfoForm >>> .el-form-item__label {
	text-align: left;
}
.content >>> .el-select {
	display: inline-block;
}
.importIpt {
	width: 50px;
	display: inline-block;
}
.content .peopleInfoForm >>> .el-form-item__content, .content .peopleInfoForm >>> .el-form-item__content .el-select {
	width: 220px;
}
.importAge {
	display: inline-block;
	margin: 0 8px;
}
.importAge >>>  .el-input--suffix .el-input__inner {
	padding: 0 5px;
}
.upload-demo{
	  display: block;
    float: left;
    line-height: 26px;
}
.setType >>> .el-radio {
	width: 100%;
	line-height: 35px;
}
.content .right > * {
    display: inline-block;
}
.content .right .el-select {
    width: 120px;
}
.content .right .el-checkbox {
    margin: 0 16px;
}
.content .right .el-select {
    margin-right: 16px;
}
</style>
