<template>
  <div id="infocus">
    <el-dialog
      class="infocus"
      title="退费确认"
      :visible.sync="dialogPayBackVisible"
      @open="getinit"
      width="600px"
      :before-close="unLock"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="退费信息" name="first">
          <div class="infomation">
            <el-form ref="form" :inline="true">
              <el-form-item class="firstline" label="退费金额：">
                <span class="span">￥{{Math.abs(money)}}</span>
              </el-form-item>

              <el-form-item label="作废发票：" label-width="80">
                <el-select
                  v-model="value11"
                  multiple
                  collapse-tags
                  style="margin-left: 20px;width:220px"
                  placeholder="请选择"
                  @change="getMoney"
                >
                  <el-option
                    v-for="item in optionItems"
                    :key="item.label"
                    :label="item.label"
                    :value="item.fapiao"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票金额：" label-width="80">
                <span>{{Math.abs(selectedMoney)}} 元</span>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <div class="customerName"></div>
            <span class="vertical">新开发票</span>
          </div>
          <div class="infomation">
            <el-form ref="form" label-width="80px" :inline="true">
              <el-form-item label="新开发票号：" label-width="80">
                <span>{{paycode}}</span>
              </el-form-item>
              <el-form-item label="发票金额：" label-width="80">
                <span>￥{{printMoney}} 元</span>
              </el-form-item>
              <el-form-item label="抬头：" label-width="80">
                <el-input v-model="taitou"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <div class="customerName"></div>
            <span class="vertical">退费方式</span>
          </div>
          <div class="paytype">
            <el-form ref="form1" label-width="80px" :inline="true">
              <div v-for="(item,index) in MoneyDatas" :key="index" class="typecontainer">
                <el-form-item label>
                  <template>
                    <el-select v-model="item.values" placeholder="退费方式" class="inputselect">
                      <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="item.init"
                    :placeholder="item.moneycount"
                    class="inputtxt"
                    @blur="comparePrice(index)"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <span>&nbsp;元</span>
                </el-form-item>
              </div>
              <!-- 用什么方式缴费，只能用该种方式退费，故隐藏自添加 -->
              <!-- <div class="typecontainer">
                <el-form-item>
                  <el-button plain class="btnplain" @click="addNewPay">+</el-button>
                </el-form-item>
              </div>-->
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="支付信息" name="second">
          <el-row>
            <el-col :span="5" class="modal-con lht">订单金额：</el-col>
            <el-col :span="19" class="modal-con">
              <div>
                <ul>
                  <li class="item">
                    <span>金额：</span>
                    <div>￥{{paidMoney}}元</div>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="modal-con lht">支付详情：</el-col>
            <el-col :span="19" class="modal-con">
              <div v-for="(item,index) in MoneyDatas" :key="index">
                <ul>
                  <li class="item">
                    <span>支付方式：</span>
                    <div>{{item.hanzi}}</div>
                  </li>
                  <li class="item">
                    <span>支付金额：￥{{item.moneycount}}元</span>
                    <div></div>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" class="modal-con lht">发票列表：</el-col>
            <el-col :span="19" class="modal-con">
              <el-table
                border
                :data="usedInvoices"
                style="width: 100%"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <el-table-column prop="usedTime" label="开票时间" sortable>
                  <template slot-scope="scope">
                    <span>{{ scope.row.usedTime | formatDate("YYYY-MM-DD")}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="invoiceMoney" label="发票金额" sortable>
                  <template slot-scope="scope">
                    <span>￥{{ scope.row.invoiceMoney }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="accountName" label="抬头" sortable>
                  <template slot-scope="scope">
                    <span>{{ scope.row.accountName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="invoiceNum" label="发票号" sortable>
                  <template slot-scope="scope">
                    <span>{{ scope.row.invoiceNum }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer" v-if="activeName == 'first'">
        <!-- <el-button @click="unLock">取 消</el-button> -->
        <el-button :disabled="printMoney <= 0">打印发票</el-button>
        <el-button type="primary" @click="goPay">确定退费</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogpay",
  data() {
    return {
      activeName: "first",
      dialogPayBackVisible: false,
      money: 0,
      paycode: 0,
      tradeCode: "",
      OperatorCode: "001",
      orderCode: "",
      taitou: "上海颐键",
      value11: [],
      //交易类型
      tradeType: "",
      formLabelWidth: "120px",
      options: [],
      MoneyDatas: [],
      optionItems: [],
      selectedMoney: 0,
      printMoney: 0,
      //pane2
      paidMoney: 0,
      //pane2表格
      usedInvoices: []
    };
  },
  methods: {
    ReturnPaidTypeEnum() {
      let that = this;
      this.$axios
        .get(this.$api.ReturnPaidTypeEnum)
        .then(function(response) {
          if (response.data.status == 1) {
            that.options = response.data.entity;
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    },
    handleClick() {},
    getinit() {
      var that = this;
      //锁定订单
      this.$axios
        .get(this.$api.TradeLock, {
          params: {
            tradeCode: this.tradeCode,
            flag: true
          }
        })
        .then(function(response) {
          if (response.data.status == 1) {
          } else {
            that.$message.error(`错误：${response.data.message}`);
            that.dialogPayBackVisible = false;
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
      this.MoneyDatas = [];
      this.ReturnPaidTypeEnum();
      this.$axios
        .get(this.$api.RefundTradeMessageQuery, {
          params: {
            orderCode: that.orderCode
          }
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.status == 1) {
            //若缴费记录不为空（正常情况肯定非空）
            if (response.data.entity.paidTypes.length != 0) {
              response.data.entity.paidTypes.forEach(item => {
                let obj = {};
                obj.values = item.paidType;
                obj.moneycount = item.tradeMoney;
                obj.init = "";
                obj.hanzi = "";
                //缴费汉字
                that.options.forEach(el => {
                  if (item.paidType == el.value) {
                    obj.hanzi = el.name;
                  }
                });
                that.MoneyDatas.push(obj);
                console.log(that.MoneyDatas);
              });
            }
            //若历史发票不为空
            if (response.data.entity.usedInvoices.length != 0) {
              //pane2表格
              that.usedInvoices = response.data.entity.usedInvoices;
              let arra = [];
              response.data.entity.usedInvoices.forEach((item, index) => {
                if (index == 0) {
                  that.value11.push(item.invoiceNum);
                  that.selectedMoney = item.invoiceMoney;
                  that.printMoney =
                    parseFloat(that.money) + parseFloat(that.selectedMoney);
                }
                let obj1 = {};
                obj1.label =
                  item.invoiceNum + "  ￥" + item.invoiceMoney + "元";
                obj1.money = item.invoiceMoney;
                obj1.fapiao = item.invoiceNum;
                arra.push(obj1);
              });
              that.optionItems = arra;
            }
            that.paycode = response.data.entity.invoiceNum;
            that.paidMoney = response.data.entity.paidMoney;
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    },
    //解锁订单
    unLock() {
      var that = this;
      that.dialogPayBackVisible = false;
      //解锁订单
      this.$axios
        .get(this.$api.TradeLock, {
          params: {
            tradeCode: this.tradeCode,
            flag: false
          }
        })
        .then(function(response) {
          if (response.data.status == 1) {
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    },
    // addNewPay() {
    //   let obj = {};
    //   obj.values = "";
    //   obj.moneycount = 0;
    //   obj.init = "";
    //   obj.hanzi = "";
    //   this.MoneyDatas.push(obj);
    // },
    // getPrice(ev, index) {
    //   let all = this.money;
    //   this.MoneyDatas.forEach((element, idex) => {
    //     if (
    //       (typeof element.moneycount == "number" ||
    //         typeof element.moneycount == "string") &&
    //       idex != index
    //     ) {
    //       all -= parseFloat(element.moneycount);
    //     }
    //   });
    //   this.MoneyDatas[index].moneycount = all;
    // },
    comparePrice(index) {
      if (this.MoneyDatas[index].init.indexOf("-") != "-1") {
        this.$message.error("金额必须为正值，请重新输入");
        this.MoneyDatas[index].init = "";
      }
      if (
        parseFloat(this.MoneyDatas[index].init) >
        parseFloat(this.MoneyDatas[index].moneycount)
      ) {
        this.$message.error("输入金额不能大于付款金额，请重新输入");
        this.MoneyDatas[index].init = "";
      }
    },
    goPay() {
      let moneys = 0;
      let that = this;
      this.MoneyDatas.forEach((element, idex) => {
        //parsefloat无法转换空字符串，加上math.abs
        moneys += parseFloat(Math.abs(element.init));
      });
      // if (that.value11.length == 0) {
      //   this.$message.error("至少选择一张作废发票");
      //   return;
      // }
      if (Math.abs(parseFloat(moneys)) != Math.abs(this.money)) {
        this.$message.error("退费金额与应退金额不一致，请重新核对！");
        return;
      }
      //提交
      let entity = [];
      let arr = [];
      //得到不为0的
      arr = this.MoneyDatas.filter(item => {
        return item.init != 0 && item.init != "";
      });
      arr.forEach((item, index) => {
        let obj = {};
        if (item.moneycount != 0) {
          obj.TypeCode = item.values;
          obj.TradeMoney = parseFloat("-" + Math.abs(item.init));
        }
        entity.push(obj);
      });
      this.$axios
        .post(this.$api.TransactionOK, {
          TradeCode: that.tradeCode,
          Type: that.tradeType,
          TradeTypes: entity,
          OperatorCode: that.OperatorCode,
          RefundInvoiceNum: that.value11
        })
        .then(function(response) {
          if (response.data.status == 1) {
            if (response.data.entity == true) {
              that.$message.success("退费成功");
              that.$parent.getUser();
              // that.dialogPayBackVisible = false;
            }
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    },
    getMoney() {
      let that = this;
      that.selectedMoney = 0;
      this.value11.forEach(element => {
        that.optionItems.forEach(el => {
          if (el.fapiao == element) {
            //开票金额自动变化
            that.selectedMoney += parseFloat(el.money);
          }
        });
      });
      that.printMoney = parseFloat(that.money) + parseFloat(that.selectedMoney);
    }
  }
};
</script>

<style scoped>
#infocus .customerName {
  background: #409fff;
  width: 5px;
  height: 16px;
  margin-right: 10px;
  display: inline-block;
}
.vertical {
  vertical-align: top;
}
#infocus .info {
  color: #606266;
  font-size: 12px;
}
#infocus .infomation .el-form-item {
  width: 46%;
}
#infocus .infomation .firstline {
  width: 100%;
}
#infocus form {
  margin-bottom: 20px;
  padding-left: 10px;
}
#infocus .infomation input {
  width: 220px;
}
#infocus .typecontainer .el-form-item:nth-child(2) {
  width: 110px;
}
#infocus .paytype .el-form-item {
  margin-right: 0px;
}

#infocus .paytype .inputselect {
  border-radius: 0px;
  width: 100px;
}
#infocus .span {
  color: red;
}
#infocus .paytype .inputtxt input {
  width: 150px;
}
#infocus .typecontainer {
  width: 50%;
  display: inline-block;
}
#infocus .btnplain {
  width: 268px;
}
#infocus .yuan {
  line-height: 32px;
}
#infocus .infomation .el-select {
  margin-left: 0px !important;
}
#infocus .lht {
  line-height: 28px;
}
#infocus .el-row .modal-con .item span {
  width: auto;
}
#infocus .el-table__body-wrapper {
  height: 250px;
  overflow-y: auto;
}
</style>


