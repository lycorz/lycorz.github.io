<template>
  <div class="content SFFPManage">
    <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
      <el-tabs v-model="activeName" @tab-click="tabsClick">
        <el-tab-pane label="未使用" name="first">
          <div class="peopleData">
            <div class="propleSearch">
              <el-input
                placeholder="请搜索"
                v-model="params1.Content"
								@keyup.enter.native="getData(0, true)"
                class="arcRadius"
                style="width: 150px;"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <div style="display: inline-block;margin: 0 16px;">
                <span>入库时间：</span>
                <el-date-picker
                  v-model="time1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
									:picker-options="pickerOptions"
                ></el-date-picker>
              </div>
              <el-button type="primary" @click="getData(0, true)">查询</el-button>
              <div class="right">
                <el-button type="primary" @click="dialogFormVisible = true">发票入库</el-button>
                <el-button type="primary" @click="invalid">发票作废</el-button>
              </div>
            </div>
          </div>
          <el-table
            :data="tableData1"
            style="width: 100%;"
            v-loading="loading1"
            @selection-change="handleSelectionChange"
            @row-click="clickRow($event, 'table')"
            ref="table"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="invoiceNum" label="发票号"></el-table-column>
            <el-table-column prop="createTime" label="入库时间" sortable>
              <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="operator" label="操作人"></el-table-column>
          </el-table>
          <!-- 底部信息栏 -->
          <div class="fixBottom">
            <div class="right">
              <el-pagination
                @current-change="handleCurrentChange1"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total[0]"
                :page-sizes="[10,20,50,100]"
                @size-change="handleSizeChange1"
                :current-page="searchParams1.PageIndex"
              ></el-pagination>
            </div>
          </div>
          <el-dialog
            title="发票入库"
            :visible.sync="dialogFormVisible"
						:close-on-click-modal="false"
            width="600px"
          >
            <el-form :model="invoiceData" :rules="rules" ref="form" label-width="80px">
              <el-form-item label="开始发票号" prop="beginNum">
                <el-input v-model="invoiceData.beginNum"></el-input>
              </el-form-item>
              <el-form-item label="结束发票号" prop="endNum">
                <el-input v-model="invoiceData.endNum"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false;resetForm('form')">取 消</el-button>
              <el-button type="primary" @click="invoiceInitialization">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="已使用" name="second">
          <div class="peopleData">
            <div class="propleSearch">
              <el-input
                placeholder="请搜索"
                v-model="params2.Content"
								@keyup.enter.native="getData(1, true)"
                class="arcRadius"
                style="width: 150px;"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
              <el-select v-model="params2.InvoiceStatus" placeholder="发票状态">
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="item in options[0]"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="params2.DateType" placeholder="时间类型">
                <el-option
                  v-for="item in options[1]"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div style="display: inline-block;margin: 0 16px;">
                <el-date-picker
                  v-model="time2"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
									:picker-options="pickerOptions"
                ></el-date-picker>
              </div>
              <el-button type="primary" @click="getData(1, true)">查询</el-button>
            </div>
          </div>
          <el-table :data="tableData2" style="width: 100%;" v-loading="loading2">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="invoiceNum" label="发票号" sortable></el-table-column>
            <el-table-column prop="invoiceMoney" label="发票金额" sortable></el-table-column>
            <el-table-column prop="accountName" label="发票抬头"></el-table-column>
            <el-table-column label="发票状态">
              <template slot-scope="scope">{{ scope.row.invoiceState| invoiceState}}</template>
            </el-table-column>
            <el-table-column prop="usedTime" label="时间" sortable>
              <template slot-scope="scope">
                <span v-if="scope.row.invoiceState === 2">{{scope.row.usedTime | formatDate}}</span>
                <span
                  v-if="scope.row.invoiceState === 3 || scope.row.invoiceState === 4"
                >{{scope.row.recoverTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operator" label="经手人">
              <template slot-scope="scope">
                <span v-if="scope.row.invoiceState === 2">{{scope.row.usedName}}</span>
                <span
                  v-if="scope.row.invoiceState === 3 || scope.row.invoiceState === 4"
                >{{scope.row.recoverName}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.invoiceState == 2 "
                  @click.native.prevent="openModal(scope.row)"
                  type="text"
                  size="small"
                >重开发票</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="fixBottom">
            <div class="right">
              <el-pagination
                @current-change="handleCurrentChange2"
                layout="total,sizes, prev, pager, next"
                :total="total[1]"
                :page-sizes="[10,20,50, 100]"
                @size-change="handleSizeChange2"
                :current-page="searchParams2.PageIndex"
              ></el-pagination>
            </div>
          </div>
          <el-dialog
            title="重开发票"
            :visible.sync="chargeDialog"
            width="720px"
            :close-on-click-modal="false"
          >
            <div class="modal-title">客户信息</div>
            <div class="modal-con">
              <ul>
                <li class="item">
                  <span>金额：</span>
                  <div
                    class="item-list"
                    style="color:#F56C6C;font-size:14px;"
                  >￥{{reOpen.invoiceMoney}}元</div>
                </li>
                <li class="item">
                  <span>发票号：</span>
                  <div class="item-list">{{reOpen.newInvoice}}</div>
                </li>
                <li class="item">
                  <span>抬头：</span>
                  <div class="item-list">
                    <el-input v-model="reOpen.accountName"></el-input>
                  </div>
                </li>
              </ul>
            </div>
            <div class="modal-title">缴费历史</div>
            <div class="modal-con">
              <ul v-for="(item, index) in reOpen.tradeHistory" :key="index">
                <li class="item">
                  <span>缴费方式：</span>
                  <div class="item-list">{{item.tradeType | tradetype}}</div>
                </li>
                <li class="item">
                  <span>缴费金额：</span>
                  <div class="item-list">￥{{item.tradeMoney}}元</div>
                </li>
              </ul>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="chargeDialog = false;">取 消</el-button>
              <el-button type="primary" @click="invoiceReopen">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "SFFPManage",
  data() {
    return {
			loading1: false,
			loading2: false,
      tableData1: [],
      tableData2: [],
      time1: [
				moment()
          	.subtract(1,'week')
          .format(),
        moment().format()
			],
      time2: [
				moment()
          .subtract(1,'week')
          .format(),
        moment().format()
			],
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
      options: [],
      total: [],
      dialogFormVisible: false,
      chargeDialog: false,
			activeName: "first",
			params1: {
				time1: [
					moment()
						.subtract(1,'week')
						.format(),
					moment().format()
				],
				Content: ''
			},
			params2: {
				time2: [
					moment()
						.subtract(1,'week')
						.format(),
					moment().format()
				],
				DateType: 2,
				Content: ''
			},
      searchParams1: {
        BeginTime: "",
        EndTime: "",
        Content: "",
        PageIndex: 1,
        PageSize: 10,
				IsUsed: 1,
				DateType: 1
      },
      searchParams2: {
        BeginTime: "",
        EndTime: "",
        Content: "",
        InvoiceStatus: "",
        PageIndex: 1,
				PageSize: 10,
				DateType: 2,
        IsUsed: 2
      },
      invoiceData: {
        endNum: "",
        beginNum: "",
        operatorCode: "001"
      },
      rules: {
        beginNum: [
          { required: true, message: "请输入开始发票号", trigger: "change" },
          // { min: 8, max: 8, message: '发票号必须是8位', trigger: 'blur' },
          {
            pattern: /^[0-9]*$/,
            message: "发票号必须为正整数",
            trigger: "blur"
          }
        ],
        endNum: [
          { required: true, message: "请输入结束发票号", trigger: "change" },
          // { min: 8, max: 8, message: '发票号必须是8位', trigger: 'blur' },
          {
            pattern: /^[0-9]*$/,
            message: "发票号必须为正整数",
            trigger: "blur"
          }
        ]
      },
      selection: [],
      reOpen: {
        accountName: "",
        oldInvoice: "",
        newInvoice: "",
        tradeHistory: []
      }
    };
  },
  created: function() {
    this.getData(0, true);
    this.getOptions();
  },
  methods: {
		tabsClick(tab, event){
			if(tab.name === 'second' && this.tableData2.length === 0) {
				this.getData(1, true);
			}
		},
    // 分页操作
    handleCurrentChange1(val) {
      this.searchParams1.PageIndex = val;
      this.getData(0);
    },
    handleSizeChange1(val) {
      this.searchParams1.PageSize = val;
      this.searchParams1.PageIndex = 1;
      this.getData(0);
    },
    handleCurrentChange2(val) {
      this.searchParams2.PageIndex = val;
      this.getData(1);
    },
    handleSizeChange2(val) {
			this.searchParams2.PageSize = val;
			this.searchParams2.PageIndex = 1;
      this.getData(1);
    },
    // 获取table数据
    getData(flag, key) {
      let params = {};
      if (flag == 0) {
				this.loading1 = true;
				this.tableData1 = [];
				if(key) {
					if (!this.time1  || this.time1.length !== 2) {
						this.searchParams1.BeginTime = '';
						this.searchParams1.EndTime = '';
					} else {
						this.searchParams1.BeginTime = moment(this.time1[0]).format('YYYY-MM-DD');
						this.searchParams1.EndTime = moment(this.time1[1]).format('YYYY-MM-DD');
					}
					this.searchParams1.Content = this.params1.Content;
					this.params1.time1 = this.time1;
					this.searchParams1.PageIndex = 1;
				} else {
					this.time1 = this.params1.time1;
					this.params1.Content = this.searchParams1.Content;
				}
        params = this.searchParams1;
      } else if(flag == 1) {
				this.tableData2 = [];
				this.loading2 = true;
				if(key) {
					if (!this.time2  || this.time2.length !== 2) {
						this.searchParams2.BeginTime = '';
						this.searchParams2.EndTime = '';
					} else {
						this.searchParams2.BeginTime = moment(this.time2[0]).format('YYYY-MM-DD');
						this.searchParams2.EndTime = moment(this.time2[1]).format('YYYY-MM-DD');
					}
					this.searchParams2.Content = this.params2.Content;
					this.searchParams2.DateType = this.params2.DateType;
					this.searchParams2.InvoiceStatus = this.params2.InvoiceStatus;
					this.params2.time2 = this.time2;
					this.searchParams2.PageIndex = 1;
				} else {
					this.time2 = this.params1.time2;
					this.params2.Content = this.searchParams2.Content;
					this.params2.DateType = this.searchParams2.DateType;
					this.params2.InvoiceStatus = this.searchParams2.InvoiceStatus;
				}
        params = this.searchParams2;
      }
      this.$axios
        .get(this.$api.InvoiceQuery, { params })
        .then(res => {
          if (res.data.entity && res.data.status === 1) {
            if (flag == 0) {
							this.loading1 = false;
              this.tableData1 = res.data.entity.invoiceMessages;
            } else {
							this.loading2 = false;
              this.tableData2 = res.data.entity.invoiceMessages;
            }
            this.total[flag] = res.data.entity.dataNum;
          } else {
						this.loading1 = false;
						this.loading2 = false;
						this.$message.error(res.data.message)
					}
        })
        .catch(err => {
          this.$message.error(err.data.message);
					this.loading1 = false;
					this.loading2 = false;
				});

    },
    // 获取筛选类型
    getOptions() {
      this.$axios.get(this.$api.ReturnInvoiceStateEnum).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.options[0] = res.data.entity;
        }
      });
      this.$axios.get(this.$api.ReturnInvoiceDateEnum).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.options[1] = res.data.entity;
        }
      });
    },
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 清空表单信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 发票入库
    invoiceInitialization() {
      if (Number(this.invoiceData.endNum) < Number(this.invoiceData.beginNum)) {
        this.$message({
          type: "error",
          message: "结束发票号应不小于开始发票号"
        });
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios
            .get(this.$api.InvoiceInitialization, {
              params: this.invoiceData
            })
            .then(res => {
              this.dialogFormVisible = false;
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("发票入库成功");
								this.getData(0);
								this.$refs.form.resetFields();
              } else {
								this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              this.$message.error(err.data.message);
            });
        } else {
          return false;
        }
      });

    },
    //发票作废
    invalid() {
      if (this.selection.length === 0) {
        this.$message({
          type: "error",
          message: "请至少选择一项进行作废处理"
        });
        return;
      }

      this.$confirm(
        '<p>确定对当前所选的发票进行作废处理吗？</p><span style="color: #8F9399;">作废后不可恢复，请谨慎操作</span>',
        "作废确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
          dangerouslyUseHTMLString: true,
          closeOnClickModal: false
        }
      )
        .then(() => {
					let params = {
						operatorCode: '001',
						invoiceNums: []
					};
					this.selection.forEach(x => {
						params.invoiceNums.push(x.invoiceNum);
					});
          this.$axios
            .post(this.$api.InvoiceInvalid, params)
            .then(res => {
              if (res.data.status === 1 && res.status === 200) {
                this.$message({
                  type: "success",
                  message: "作废成功!"
                });
                this.getData(0);
              } else {
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消作废"
          });
        });
    },
    // 弹出重开发票框
    openModal(row) {
      this.reOpen.invoiceMoney = row.invoiceMoney;
      this.reOpen.accountName = row.accountName;
      this.reOpen.oldInvoice = row.invoiceNum;
      this.getMiniNum();
      this.getHistory(row.invoiceNum);
      this.chargeDialog = true;
    },
    //获取缴费历史
    getHistory(invoiceNum) {
      this.reOpen.tradeHistory = [];
      this.$axios
        .get(this.$api.TradeTypeQueryByInvoiceNum, {
          params: {
            invoiceNum
          }
        })
        .then(res => {
          if ((res.status === 200) & (res.data.status === 1)) {
            this.reOpen.tradeHistory = res.data.entity;
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: res.data.message
          });
        });
    },
    // 获取最小发票号
    getMiniNum() {
      this.$axios
        .get(this.$api.MINInvoiceQuery)
        .then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.reOpen.newInvoice = res.data.entity;
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: res.data.message
          });
        });
    },
    // 重开发票
    invoiceReopen() {
      if (!this.reOpen.accountName) {
        this.$message({
          type: "error",
          message: "请填写发票抬头"
        });
        return;
      }
      let params = {
        oldInvoice: this.reOpen.oldInvoice,
        newInvoice: this.reOpen.newInvoice,
        accountName: this.reOpen.accountName,
        operatorCode: "001"
      };
      this.$axios
        .get(this.$api.InvoiceReopen, { params })
        .then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.$message({
              type: "success",
              message: "重开发票成功"
            });
            this.getData(2);
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: res.data.message
          });
        });
      this.chargeDialog = false;
    }
  }
};
</script>
<style>
.SFFPManage .el-tab-pane,
.SFFPManage .el-tabs.el-tabs--top {
	display: flex;
	flex: 1;
	height: 100%;
	height: 88vh;
  flex-direction: column;
}
.SFFPManage .el-tabs__header {
  flex: 0 0 40px;
  line-height: 48px;
}
.SFFPManage .el-tabs__content {
  flex: 1 !important;
}
.SFFPManage .peopleData {
  flex: 0 0 49px;
}
.SFFPManage .fixBottom {
  flex: 0 0 40px;
}
.SFFPManage .el-select {
  width: 100px;
  display: inline-block;
  margin-left: 24px;
}
</style>
