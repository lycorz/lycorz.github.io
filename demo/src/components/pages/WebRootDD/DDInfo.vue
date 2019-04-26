<template>
  <div class="DDInfo content">
    <div class="topTitle">
        <span>客户管理</span>
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
                <div class="right">
                  <el-button type="primary" @click="peopleInfoModal = true;clearPropleInfo();peopleInfo.Customer.IdcardNum = ''">新建客户</el-button>
                </div>
              </div>
            </div>
            <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" v-loading="loading"
                @selection-change="handleSelectionChange">
                <el-table-column prop="customerName" label="客户姓名">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="50">
									<template slot-scope="scope">
										{{scope.row.sex === 1 ?'男': '女'}}
									</template>
                </el-table-column>
                <el-table-column prop="tele" label="电话" width="130">
                </el-table-column>
                <el-table-column prop="idcardNum" label="身份证号" width="170">
                </el-table-column>
                <el-table-column prop="unitName" label="单位">
                </el-table-column>
								<el-table-column prop="deptName" label="部门">
                </el-table-column>
								<el-table-column prop="teamName" label="组别">
                </el-table-column>
                <el-table-column prop="lastModifyTime" label="最后编辑时间">
									<template slot-scope="scope">
										{{scope.row.lastModifyTime | formatDate('YYYY-MM-DD')}}
									</template>
                </el-table-column>
                <el-table-column prop="state" label="操作">
									<template slot-scope="scope">
										<el-button type="text" @click="editPeople(scope.row.idcardNum)">编辑客户</el-button>
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
						<el-dialog title="客户信息" :visible.sync="peopleInfoModal" width="1000px" :close-on-click-modal="false" class="peopleInfoForm" @close="closeModal">
							<el-form :model="peopleInfo.Customer" :rules="rules"  ref="peopleForm" :inline="true" label-width="50px" >
								<el-form-item label="身份证号" prop="IdcardNum" :label-width="formLabelWidth">
									<el-input
										v-model="peopleInfo.Customer.IdcardNum"
										maxlength="18"
										style="width: 130px;margin-right: 8px;"
									></el-input>
									<el-button type="primary" plain style @click="getIdentity">刷身份证</el-button>
								</el-form-item>
								<el-form-item label="体检卡号" prop="CardNum" :label-width="formLabelWidth">
									<el-input v-model="peopleInfo.Customer.CardNum" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="姓名" prop="CustomerName" :label-width="formLabelWidth">
									<el-input v-model="peopleInfo.Customer.CustomerName" autocomplete="off"></el-input>
								</el-form-item>
								<el-form-item label="性别" prop="Sex" :label-width="formLabelWidth">
									<el-select v-model="peopleInfo.Customer.Sex" style="width: 100%">
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
										<el-button style="padding: 7px 6px;width: 50%;">{{age || 0}}</el-button>
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
									<el-input v-model="peopleInfo.Customer.Tele" autocomplete="off"></el-input>
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
								<el-button type="primary" @click="addPeopleBtn" >确定</el-button>
							</div>
						</el-dialog>
        </div>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'DDOrder',
    data() {
      return {
				value: '',
				total: 0,// 总条数
				loading: false,
				orderVipFlag: 0,
				peopleInfoModal: false,
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
				params: {//搜索参数副本
					Filter: '',
					timeRange: [moment().subtract(0.5, 'year').format(),moment().format()],
				},
				searchParams: {//搜索参数
					Filter: '',
					StartDate: '',
					EndDate: '',
					PageIndex: 1,
					PageSize: 10
				},
				peopleModal: false,
				tableData: [],
				// 新增客户信息
				age: 0,
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
						lastModifyTime: moment().format(),
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
			// 获取数据
			getData(key){
				if(key) {
					this.searchParams.Filter = this.params.Filter;
					if (!this.timeRange  || this.timeRange.length !== 2) {
						this.searchParams.StartDate = '';
						this.searchParams.EndDate = '';
					} else {
						this.searchParams.StartDate = moment(this.timeRange[0]).format("YYYY-MM-DD");
						this.searchParams.EndDate = moment(this.timeRange[1]).format("YYYY-MM-DD");
					}
					this.params.timeRange = this.timeRange;
					this.searchParams.PageIndex = 1;
				} else {
					this.params.Filter = this.searchParams.Filter;
					this.timeRange = this.params.timeRange;
				}
				this.loading = true;
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
					this.loading = false;
				}).catch(err => {
						this.$message.error(err.data.message);
						this.loading = false;
						this.total = 0;
				})
			},
			//新增-确定
			addPeopleBtn(){
				this.$refs.peopleForm.validate((valid) => {
					if(valid) {
						this.$axios.post(this.$api.SaveCustomer, this.peopleInfo).then(res => {
							if (res.data.status === 1) {
								this.$message.success('保存成功！');
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
				this.peopleInfo.Customer.IdcardNum = data;
				this.setCustomer(data)
				// this.peopleInfo = data;
			},
			// 清空客户信息
			clearPropleInfo() {
				this.peopleInfo.Customer.Sex = '',
				this.peopleInfo.Customer.CardNum = '00000000-0000-0000-0000-000000000000',
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
				this.peopleInfo.Customer.lastModifyTime = moment().format(),
				this.peopleInfo.Customer.Tele = ''
			},
			//查询客户信息
			getCustomer(key){
				this.$axios.get(this.$api.GetCustomer, {
					params: {
						IdcardNum: this.peopleInfo.Customer.IdcardNum
					}
				}).then(res => {
					if (res.data.entity && res.data.status === 1){
							let obj = res.data.entity;
							this.setCustomer(obj);
					}
				})
			},
			// 获取身份信息
			getIdentity() {
				api.getIdcard(this.setCustomer);
			},
			closeModal(){
				this.peopleInfo.Customer.IdcardNum = '';
			},
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
			'peopleInfo.Customer.IdcardNum': function(val, oldVal) {
				if (val !== oldVal && val.length === 18) {
					this.getCustomer();
				} else {
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
<style>
.DDInfo .right > * {
    display: inline-block;
}
.DDInfo .right .el-select {
    width: 120px;
}
.DDInfo .right .el-checkbox {
    margin-right: 16px;
}
.DDInfo .right .el-select {
    margin-right: 16px;
}
.DDInfo .el-select{
  display: inline-block;
	width: 120px;
}
.DDInfo .peopleInfoForm .w100 .el-form-item__content{
    width: 90%;
}
.DDInfo  .peopleInfoForm .el-form-item__content , .DDInfo  .peopleInfoForm .el-form-item__content .el-select{
    width: 220px;
}
.DDInfo .el-form--inline .el-form-item {
    margin-right: 20px;
    margin-top: 24px;
}
.DDInfo .currentOrder ul {
    overflow: hidden;
}
.DDInfo .currentOrder li {
    width: 25%;
    float: left;
    line-height: 32px;
}
.DDInfo .discount .el-input {
    width: 150px;
    padding-right: 8px;
}
.DDInfo .el-form-item__label {
	text-align: left;
}
</style>
