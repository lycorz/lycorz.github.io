<template>
  <div class="DDOrderManage content">
    <div class="topTitle">
      <span>订单管理</span>
    </div>
    <el-row>
      <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
        <div class="peopleData">
          <div class="searchParams">
            <el-input
              placeholder="请搜索"
              v-model="params.Filter"
							@keyup.enter.native="getData(true)"
              class="arcRadius"
              style="width: 150px;"
            >

            </el-input>
            <el-select v-model="params.OrderFlag" clearable placeholder="订单状态" style="margin: 0 8px;">
              <el-option
                v-for="item in orderStatus"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
						<el-select v-model="params.Replace" clearable placeholder="替检状态" style="margin: 0 8px;">
              <el-option
                v-for="item in tjType"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-model="params.timeType" placeholder="时间类型">
              <el-option
                v-for="item in timeTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
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
            <el-button type="primary" @click="getData(true)" >查询</el-button>
						<el-popover
							placement="bottom"
							width="220"
							style="margin-left: 16px;"
							trigger="click">
							<div class="popoverBtn">
								<el-button type="text" style="margin-left: 10px;"  @click="printGuide">打印导检单</el-button>
								<el-button type="text" @click="printName">打印姓名条码</el-button>
								<el-button type="text" style="display: inline-block" @click="printCheckModal">打印检验条码</el-button>
								<el-checkbox v-model="isCombine" style="font-size: 12px;margin-right: 0;">合并</el-checkbox>
								<el-tooltip class="item" content="合并是指合并且重新生成条码" placement="right">
									<el-button type="text" icon="el-icon-question" style="display: inline;"></el-button>
								</el-tooltip>
							</div>
							<el-button slot="reference" type="primary">打印</el-button>
						</el-popover>
            <div class="right">
							<el-input v-model="cardNum" placeholder="刷卡" style="width: 100px"></el-input>
						</div>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="orderList"
          tooltip-effect="dark"
          style="width: 100%"
					@row-click="clickRow2"
          @selection-change="handleSelectionChange"
          v-loading="loading">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="customerName" label="客户姓名" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="sex" label="性别">
						<template slot-scope="scope">
							{{scope.row.sex === 1?'男': '女'}}
						</template>
					</el-table-column>
          <el-table-column prop="cardNum" label="体检卡号"></el-table-column>
          <el-table-column prop="unitName" label="单位名称" width="100px"></el-table-column>
          <el-table-column prop="deptName" label="部门名称" width="100px"></el-table-column>
          <el-table-column prop="orderMoney" label="体检金额" width="100px"></el-table-column>
          <el-table-column prop="createOrderTime" label="创建时间" width="100px">
						<template slot-scope="scope">
							{{scope.row.createOrderTime | formatDate('YYYY-MM-DD')}}
						</template>
					</el-table-column>
          <el-table-column prop="status" label="订单状态" width="100px"></el-table-column>
          <el-table-column prop="isGiveup" label="是否弃检" width="100px">
						<template slot-scope="scope">
							{{scope.row.isReped ? '弃检' : '未弃检'}}
						</template>
					</el-table-column>
          <el-table-column prop="isReped" label="替检状态" width="100px">
						<template slot-scope="scope">
							{{scope.row.isReped ? '替检' : '未替检'}}
						</template>
					</el-table-column>
          <el-table-column fixed="right" label="操作" width="135px">
						<template slot-scope="scope">
								<el-button type="text" @click="editBtn(scope.row)">编辑</el-button>
								<el-button type="text" @click="viewInfo(scope.row)">查看</el-button>
								<el-dropdown trigger="click">
									<span class="el-dropdown-link">
										更多<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item>
											<span @click="qjBtn(scope.row, 2)">弃检</span>
										</el-dropdown-item>
										<el-dropdown-item v-if="!scope.row.isReped && scope.row.isUnitOrder">
											<span @click="openTJModal(scope.row)">替检</span>
										</el-dropdown-item>
										<el-dropdown-item v-else disabled>
											<span>替检</span>
										</el-dropdown-item>
										<el-dropdown-item v-if="!scope.row.isUnitOrder">
											<span @click="delBtn(scope.row)">删除订单</span>
										</el-dropdown-item>
										<el-dropdown-item v-else disabled>
											<span>删除订单</span>
										</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
						</template>
					</el-table-column>
        </el-table>
        <!-- 底部信息栏 -->
        <div class="fixBottom">
          <el-button type="text" @click="toggleSelection('orderList', 'multipleTable')">反选</el-button>
          <span class="subitem">
            合计：
            <span class="labelColor ftArial">{{orderList.length}}</span>
          </span>
          <span class="subitem">
            选中：
            <span class="labelColor ftArial">{{multipleSelection.length}}</span>
          </span>
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
				<!-- // 查看 -->
        <el-dialog title="当前客户订单" :visible.sync="orderInfoModal" width="800px" :close-on-click-modal="false">
          <el-table :data="itemsData.items" border style="width: 100%;" height="250">
            <el-table-column prop="itemName" label="项目名称" sortable></el-table-column>
            <el-table-column prop="feeType" label="付费方式" sortable></el-table-column>
            <el-table-column prop="fullPrice" label="项目原价" sortable></el-table-column>
            <el-table-column prop="exePrice" label="项目现价" sortable></el-table-column>
            <el-table-column prop="checkStatus" label="项目状态">
							<template slot-scope="scope">
								{{scope.row.isGiveUp ? '弃检' : scope.row.checkStatus === 1 ? '已检' : scope.row.checkStatus === 2 ? '已获取结果' : '未检'}}
							</template>
						</el-table-column>
          </el-table>
					<div slot="footer" class="dialog-footer">
            <el-button @click="orderInfoModal = false;itemsData = [];">关 闭</el-button>
          </div>
        </el-dialog>
				<!-- 替检 -->
        <el-dialog title="客户信息" :visible.sync="peopleInfoModal" width="1000px" :close-on-click-modal="false" class="peopleInfoForm" @close="clearPropleInfo;peopleInfo.NewCustomer.IdcardNum = '';$refs.peopleForm.resetFields()">
          <el-form :model="peopleInfo.NewCustomer" :rules="rules"  ref="peopleForm" :inline="true" label-width="50px">
            <el-form-item label="身份证号" prop="IdcardNum" :label-width="formLabelWidth">
              <el-input
                v-model="peopleInfo.NewCustomer.IdcardNum"
								maxlength="18"
                style="width: 130px;margin-right: 8px;"
              ></el-input>
              <el-button type="primary" plain style @click="getIdentity">刷身份证</el-button>
            </el-form-item>
            <el-form-item label="体检卡号" prop="CardNum" :label-width="formLabelWidth">
              <el-input v-model="peopleInfo.NewCustomer.CardNum" maxlength="20" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="CustomerName" :label-width="formLabelWidth">
              <el-input v-model="peopleInfo.NewCustomer.CustomerName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="Sex" :label-width="formLabelWidth">
              <el-select v-model="peopleInfo.NewCustomer.Sex" style="width: 100%">
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族" prop="Nation" :label-width="formLabelWidth">
              <el-input v-model="peopleInfo.NewCustomer.Nation"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="Birthday" :label-width="formLabelWidth">
              <el-date-picker
                v-model="peopleInfo.NewCustomer.Birthday"
                type="date"
                style="width: 143px;margin-right: 8px;">
							</el-date-picker>
              <el-button-group>
                <el-button style="padding: 7px 6px;width: 50%;">{{age}}</el-button>
                <el-button style="padding: 7px 6px;width: 50%;">岁</el-button>
              </el-button-group>
            </el-form-item>
            <el-form-item label="职业" prop="Occupation" :label-width="formLabelWidth">
              <el-input v-model="peopleInfo.NewCustomer.Occupation"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="MaritalStatus" :label-width="formLabelWidth">
              <el-select v-model="peopleInfo.NewCustomer.MaritalStatus">
                <el-option label="未婚" :value="1"></el-option>
                <el-option label="已婚" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" prop="Tele" :label-width="formLabelWidth">
              <el-input v-model="peopleInfo.NewCustomer.Tele" autocomplete="off" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="DeptName" :label-width="formLabelWidth">
              <el-input v-model="peopleInfo.NewCustomer.DeptName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班组" prop="TeamName" :label-width="formLabelWidth">
              <el-input v-model="peopleInfo.NewCustomer.TeamName"></el-input>
            </el-form-item>
						<el-form-item label="单位" prop="UnitName" :label-width="formLabelWidth">
              <el-input v-model="peopleInfo.NewCustomer.UnitName"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="Addr" class="w100" :label-width="formLabelWidth">
              <el-input v-model="peopleInfo.NewCustomer.Addr"></el-input>
            </el-form-item>
            <el-form-item label="备注信息" prop="Remark" class="w100" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="peopleInfo.NewCustomer.Remark"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="peopleInfoModal = false">取消</el-button>
            <el-button type="primary" @click="tjPeopleBtn" >确定</el-button>
          </div>
        </el-dialog>
				<!-- 编辑 -->
        <el-dialog title="当前客户订单" :visible.sync="currentOrderModal" width="800px" :close-on-click-modal="false" class="currentOrder" >
					<div class="modal-top">
						<el-button type="primary" class="right" @click="qjBtn(itemsData, 1)">弃检</el-button>
					</div>
          <div class="modal-con">
            <el-table
							ref="qjTable"
							:data="itemsData.items"
							tooltip-effect="dark"
							style="width: 100%"
							height="250"
							@selection-change="qjSelectionChange"
							v-loading="loading"
							@row-click="clickRow($event, 'qjTable')">
							<el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="itemName" label="项目名称"></el-table-column>
              <el-table-column prop="feeType" label="付款方式"></el-table-column>
              <el-table-column prop="checkStatus" label="项目状态" :filters="[{text: '未检', value: '未检'}, {text: '已检', value: '已检'}, {text: '已获取结果', value: '已获取结果'}, {text: '弃检', value: '弃检'}]" :filter-method="filterHandler">
								<template slot-scope="scope">
									{{scope.row.isGiveUp ? '弃检' : scope.row.checkStatus === 1 ? '已检' : scope.row.checkStatus === 2 ? '已获取结果' : '未检'}}
								</template>
							</el-table-column>
            </el-table>
          </div>
					<div slot="footer" class="dialog-footer">
            <el-button @click="currentOrderModal = false;itemsData = []">关 闭</el-button>
          </div>
        </el-dialog>
				<!-- 打印检验条码 -->
				<el-dialog title="打印检验条码" :visible.sync="printModal" width="800px" :close-on-click-modal="false" class="currentOrder" >
					<div class="modal-top">
						<div class="right">
							<el-select v-model="params.timeType" placeholder="打印状态">
								<el-option
									v-for="item in timeTypes"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
							<el-button type="primary">打印</el-button>
						</div>

					</div>
					<div class="modal-con">
            <el-table
							ref="codeTable"
							:data="itemsData.items"
							tooltip-effect="dark"
							style="width: 100%"
							height="250"
							@selection-change="qjSelectionChange"
							v-loading="loading"
							@row-click="clickRow($event, 'qjTable')">
							<el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="itemName" label="条码" sortable></el-table-column>
              <el-table-column prop="feeType" label="项目"></el-table-column>
              <el-table-column prop="feeType" label="打印时间" sortable></el-table-column>
              <el-table-column prop="status" label="打印状态" sortable>
							</el-table-column>
            </el-table>
          </div>
					<div slot="footer" class="dialog-footer">
							<div style="float: left">
								<el-button>合并</el-button>
								<el-tooltip class="item" content="合并是指合并且重新生成条码" placement="right">
									<el-button type="text" icon="el-icon-question" style="display: inline;"></el-button>
								</el-tooltip>
							</div>
            <el-button @click="printModal = false;">关 闭</el-button>
          </div>
				</el-dialog>
      </div>
    </el-row>
  </div>
</template>

<script>

import moment from "moment";
export default {
  name: "DDOrderManage",
  data() {
    return {
			cardNum: '',//新增刷卡数据
			isCombine: false,//是否合并
      value: "",
			options: "",
			visible1: false,
			visible2: false,
			total: 0,//总页数
      loading: false,
      orderInfoModal: false,
      peopleInfoModal: false,
			currentOrderModal: false,
			printModal: false,
      formLabelWidth: "70px",

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
      orderStatus: [],
      timeTypes: [
        {
          value: 0,
          label: "创建时间"
        },
        {
          value: 1,
          label: "到检时间"
        }
			],
			tjType: [
				{
          value: '0',
          name: "否"
				},
				{
          value: '1',
          name: "是"
        }
			],
			timeRange: [moment().add(-1, 'weeks').format(),moment().format()],
			params: {//搜索参数副本
				timeType: 0,
				timeRange: [moment().add(-1, 'weeks').format(),moment().format()],
				OrderFlag: '',
				Replace: '',
				Filter: "",
				StartCreateDatetime: '',
				EndCreateDatetime: '',
				StratCheckBeginDatetime:'',
				EndCheckBeginDatetime: '',
				PageIndex: 1,
        PageSize: 10
			},
			age: 0,
      searchParams: {//搜索参数
				OrderFlag: '',
				Replace: '',
				Filter: "",
				StartCreateDatetime: '',
				EndCreateDatetime: '',
				StratCheckBeginDatetime:'',
				EndCheckBeginDatetime: '',
				PageIndex: 1,
        PageSize: 10
			},
			orderList: [],//查询后展示列表
			itemsData: [],// 编辑客户数据
			multipleSelection: [],//首页选中
			qjSelection: [],// 弃检选中
			// orderVipFlag: false,
			// 替检客户信息
      peopleInfo: {
				OrderCode: '',
				Operator: '001',
				NewCustomer: {
					CustomerCode: "00000000-0000-0000-0000-000000000000",
					CardNum: "",
					CustomerName: "",
					Sex: '',
					Nation: "",
					IdcardNum: "",
					Birthday: "",
					Photo:"",
					MaritalStatus: '',
					VipFlag: 0,
					Occupation: "",
					UnitName: "",
					DeptName: "",
					TeamName: "",
					Tele: "",
					Addr: "",
					Remark: "",
					LastModifyTime: new Date()
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
						{ required: true, message: '请输入性别', trigger: 'blur' }
				],
				IdcardNum: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' },
						{ max: 18, min: 18, message: '与身份证号码位数不符', trigger: 'blur' }
				],
				Birthday: [
						{ required: true, message: '请选择时间', trigger: 'change' }
				],
				// VipFlag: [
				// 		{  required: true, message: '请选择Vip属性', trigger: 'blur' }
				// ],
				Tele: [
						{ required: true, message: '请输入联系电话', trigger: 'blur' },
						{ pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'  }
				]
			},
    };
  },
  created: function() {
		this.getData(true);
		this.getTypes();
  },
  methods: {
		//点击当前行选中
		clickRow2(row, event){
			if(event.label === '操作') {
				return;
			}
			this.$refs.multipleTable.toggleRowSelection(row);
		},
		// 候取枚举类型
		getTypes() {
			this.$getType('OrderStatus').then(res => {
				if (res.status === 200 && res.data.status === 1) {
					this.orderStatus = res.data.entity;
				}
			})
		},
		//查询客户信息
		getCustomer(){
			this.$axios.get(this.$api.GetCustomer, {
				params: {
					IdcardNum: this.peopleInfo.NewCustomer.IdcardNum
				}
			}).then(res => {
				if (res.data.entity && res.data.status === 1) {
					let obj = res.data.entity;
					this.setCustomer(obj);
				} else {
					this.$message.error(res.data.message);
				}
			}).catch(err => {
				this.$message.error(err.data.message);
			})
		},
		//赋值客户信息
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
		//获取查询列表
    getData(key) {
			if (key) {
				if (this.params.timeType === 0) {
					if (!this.timeRange  || this.timeRange.length !== 2) {
						this.searchParams.StartCreateDatetime = '';
						this.searchParams.EndCreateDatetime = '';
					} else {
						this.searchParams.StartCreateDatetime = moment(this.timeRange[0]).format('YYYY-MM-DD');
						this.searchParams.EndCreateDatetime = moment(this.timeRange[1]).format('YYYY-MM-DD');
					}
					this.searchParams.StratCheckBeginDatetime= '';
					this.searchParams.EndCheckBeginDatetime= '';
				} else if (this.params.timeType === 1) {
					if (!this.timeRange  || this.timeRange.length !== 2) {
						this.searchParams.StratCheckBeginDatetime = '';
						this.searchParams.EndCheckBeginDatetime = '';
					} else {
						this.searchParams.StratCheckBeginDatetime = moment(this.timeRange[0]).format('YYYY-MM-DD');
						this.searchParams.EndCheckBeginDatetime = moment(this.timeRange[1]).format('YYYY-MM-DD');
					}
					this.searchParams.StartCreateDatetime= '';
					this.searchParams.EndCreateDatetime= '';
				}
				this.searchParams.Filter = this.params.Filter;
				this.searchParams.OrderFlag = this.params.OrderFlag;
				this.searchParams.Replace = this.params.Replace;
				this.params.timeRange = this.timeRange;
				this.searchParams.PageIndex = 1;
			} else {
				this.params.Filter = this.searchParams.Filter;
				this.params.OrderFlag = this.searchParams.OrderFlag;
				this.params.Replace = this.searchParams.Replace;
				this.timeRange = this.params.timeRange;
			}

      this.loading = true;
      this.$axios
        .get(this.$api.GetOrderList, { params: this.searchParams })
        .then(res => {
          if (res.data.entity && res.data.status === 1) {
            this.orderList = res.data.entity.resultData;
						this.total = res.data.entity.totalCount;
						// this.orderList.forEach((x, index) => {
						// 	x.items.forEach((y,i) => {
						// 		if (y.isGiveUp) {
						// 			this.orderList[index].items[i].status = '弃检';
						// 		} else if(y.checkStatus === 1) {
						// 			this.orderList[index].items[i].status = '已检';
						// 		} else{
						// 			this.orderList[index].items[i].status = '未检';
						// 		}
						// 	})
						// })
          } else {
						this.$message.error(res.data.message);
						 this.total = 0;
						 this.orderList = [];
          }
          this.loading = false;
        })
        .catch(err => {
					this.total = 0;
					this.orderList = [];
          this.$message.error(err.data.message);
          this.loading = false;
        });
    },
		//编辑
		editBtn(data){
			this.currentOrderModal = true;
			this.itemsData = data;
		},
		//查看
		viewInfo(data){
			this.orderInfoModal = true;
			this.itemsData = data;
		},
		//弃检
		qjBtn(data, key){
			if (key === 1) {
				if (this.qjSelection.length === 0) {
					this.$message.error('请先勾选项目后点击弃检');
					return;
				}
				let OrderCode = data.orderCode;
				let ItemCodes = this.qjSelection.map(x => {
					return x.itemCode;
				});

				if (this.qjSelection.every(x => x.isGiveUp)) {
					this.$message.error('项目中包含已弃检项目，请重新选择');
					return;
				}
				if (this.qjSelection.every(x =>  x.checkStatus !== 0)) {
					this.$message.error('项目中包含已检项目，请重新选择');
					return;
				}
				this.$axios.post(this.$api.GiveUpItem, {  //订单项目弃检
					OrderCode,
					OperatorCode: '001',
					ItemCodes
				}).then(res => {
					if (res.data.status === 1) {
						this.$message.success('项目弃检成功！');
						this.currentOrderModal = false;
						this.itemsData = '';
						this.getData();
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(err => {
					this.$message.error(err.data.message);
				})
			} else {
				if (data.items.every(x => x.status !== '未检')) {
					this.$alert('<span>存在已检项目，不可弃检！</span><br /><i style="color:#8F9399;">存在已检项目，不可弃检！</i>', '提醒：', {
						confirmButtonText: '关闭',
						dangerouslyUseHTMLString: true,
						type: 'warning'
					})
					return;
				}
				this.$confirm('是否确认弃检该订单', '提示：', {
					confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
				}).then(() => {
					this.$axios.post(this.$api.GiveUpOrder, {  //订单弃检
						OrderCode: data.orderCode,
						OperatorCode: '001'
					}).then(res => {
						if (res.data.status === 1) {
							this.$message.success('弃检成功！');
							this.itemsData = '';
							this.getData();
						} else {
							this.$message.error(res.data.message);
						}
					}).catch(err => {
						this.$message.error(err.data.message);
					})
				})

			}
		},
		// 替检modal
		openTJModal(data){
			this.peopleInfoModal = true;
			this.peopleInfo.OrderCode = data.orderCode;
		},
		//替检-确定
		tjPeopleBtn(){
			this.$refs.peopleForm.validate((valid) => {
				if(valid) {
					this.$axios.post(this.$api.Replace, this.peopleInfo).then(res => {
						if (res.data.status === 1 && res.data.entity) {
							this.$message.success('替检成功！');
							this.peopleInfo.OrderCode = '';
						} else {
							this.$message.error(res.data.message || '');
						}
						this.peopleInfoModal = false;
					}).catch(err => {
						this.$message.error(err.data.message);
					})
				} else {
					return;
				}
			})
		},
		//删除订单
		delBtn(data){
			if (data.paidStatus) {
				this.$alert('<span>该订单已经缴费，不可删除！</span><br /><i style="color:#8F9399;">订单已缴费不可删除</i>', '提醒：', {
					confirmButtonText: '关闭',
					dangerouslyUseHTMLString: true,
					type: 'warning'
				})
				return;
			}
			this.$confirm('是否确认删除该订单', '提示：', {
					confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
				}).then(() => {
					this.$axios.post(this.$api.DeleteOrder, {  //订单删除
						OrderCode: data.orderCode
					}).then(res => {
						if (res.data.status === 1) {
							this.$message.success('删除成功！');
							this.itemsData = '';
							this.getData();
						} else {
							this.$message.error(res.data.message);
						}
					}).catch(err => {
						this.$message.error(err.data.message);
					})
				})
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
		filterHandler(value, row, column) {
			const property = column['property'];
			return row[property] === value;
		},
		//点击选中
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		qjSelectionChange(val) {
			this.qjSelection = val;
		},
		filterTag(value, row) {
			return row.tag === value;
		},
		// 获取身份信息
    getIdentity() {
      api.getIdcard(this.setCustomer);
		},
		// 清空客户信息
		clearPropleInfo() {
			this.peopleInfo.NewCustomer.Sex = '',
			this.peopleInfo.NewCustomer.CardNum = '',
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
		//打印导检单
		printGuide(){
			this.visible1 = false
			alert('打印导检单')
		},
		//打印姓名条码
		printName(){
			this.visible2 = false
			alert('打印姓名条码')
		},
		//打印检验条码
		printCheckModal(){
			this.printModal = true;
		},
		printCheck(){
			alert('打印检验条码')
		},
		// 根据身份证号自动填写年龄和性别
		getAgeBrith(id){
			if (!id) return;
			this.peopleInfo.NewCustomer.Sex = id.substr(16, 1) % 2 ? 1: 2;
		}
	},
	watch: {
		'peopleInfo.NewCustomer.Birthday': function(val, oldVal) {
			if (val !== oldVal) {
				this.age = moment().year() - moment(val).year();
			}
		},
		'peopleInfo.NewCustomer.IdcardNum': function(val, oldVal){
			if (val !== oldVal && val.length === 18) {
				this.getAgeBrith(val);
				this.getCustomer();
			} else {
				this.clearPropleInfo();
			}
		}
	}
};
</script>
<style scoped>
.DDOrderManage .right > * {
  display: inline-block;
}
.DDOrderManage .right .el-select {
  width: 120px;
}
.DDOrderManage .right .el-checkbox {
  margin-right: 16px;
}
.DDOrderManage .right .el-select {
  margin-right: 16px;
}
.DDOrderManage .el-select {
  display: inline-block;
  width: 120px;
}
.DDOrderManage .peopleInfoForm .w100 >>> .el-form-item__content {
  width: 90%;
}
.DDOrderManage >>> .el-form-item__content,
.DDOrderManage >>> .el-form-item__content .el-select {
  width: 220px;
}
.DDOrderManage .el-form--inline .el-form-item {
  margin-right: 20px;
  margin-top: 24px;
	width: 290px;
}
.peopleInfoForm >>> .el-form-item__label {
	text-align: left;
}
.DDOrderManage .currentOrder ul {
  overflow: hidden;
}
.DDOrderManage .currentOrder li {
  width: 25%;
  float: left;
  line-height: 32px;
}
.DDOrderManage .el-date-editor {
  width: 230px;
}
.el-dropdown-link {
	cursor: pointer;
	color: #409EFF;
	font-size: 12px;
}
.el-icon-arrow-down {
	font-size: 12px;
}
.el-form-item__label {
	text-align: left;
}
.importCustom >>> .el-select{
	width: 250px!important;
	display: inline-block!important;
}
.popoverBtn .el-button{
	display: block;
}
</style>
