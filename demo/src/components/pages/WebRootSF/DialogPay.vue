<template>
  <div id="dialogpay">
    <el-dialog
      class="infocus"
      title="缴费确认"
      :visible.sync="dialogpayVisible"
      @open="getinit"
      width="600px"
      :before-close="unLock"
      :close-on-click-modal="false"
      v-loading="Loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      element-loading-text="发票打印中..."
    >
      <div>
        <div class="customerName"></div>
        <span class="vertical">必要信息</span>
      </div>
      <div class="infomation">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item label="金额：" label-width="80">
            <span class="span">￥{{money}} 元</span>
          </el-form-item>
          <el-form-item label="抬头：" label-width="80">
            <el-input v-model="taitou"></el-input>
          </el-form-item>
          <el-form-item label="发票号：" label-width="80">
            <span>{{paycode}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <div class="customerName"></div>
        <span class="vertical">缴费方式</span>
      </div>
      <div class="paytype">
        <el-form ref="form1" label-width="80px" :inline="true">
          <div v-for="(item,index) in MoneyDatas" :key="index" class="typecontainer">
            <el-form-item label>
              <template>
                <el-select
                  v-model="item.values"
                  placeholder="缴费方式"
                  class="inputselect"
                  @change="changePay($event,index)"
                >
                  <el-option
                    v-for="itemv in options"
                    :key="itemv.value"
                    :label="itemv.name"
                    :value="itemv.value"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item>
              <!--  @focus="getPrice($event,index)" -->
              <el-input v-model="item.moneycount" class="inputtxt"></el-input>
            </el-form-item>
            <el-form-item>
              <span>&nbsp;元</span>
              <el-button class="mgleft" v-show="item.ifshow">确认</el-button>
            </el-form-item>
          </div>
          <div class="typecontainer">
            <el-form-item>
              <el-button plain class="btnplain" @click="addNewPay">+</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="InvoicePrint" :disabled="money <= 0" :loading="printerF">打印发票</el-button>
        <el-button type="primary" @click="goPay" :disabled="payF">确定缴费</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { resolve, reject, promised } from "q";
export default {
  name: "dialogpay",
  data() {
    return {
      dialogpayVisible: false,
      money: 0,
      paycode: 0,
      tradeCode: "",
      OperatorCode: "001",
      taitou: "上海颐键",
      tradeType: "",
      formLabelWidth: "120px",
      options: [],
      MoneyDatas: [],
      Loading: false,
      printerF: false,
      payF: false
    };
  },
  mounted: function() {
    var that = this;
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
            that.dialogpayVisible = false;
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
      this.MoneyDatas = [];
      let obj = {};
      obj.values = 1;
      obj.moneycount = this.money;
      obj.ifshow = false;
      this.MoneyDatas.push(obj);
      this.ReturnPaidTypeEnum();
      this.$axios
        .get(this.$api.MINInvoiceQuery)
        .then(function(response) {
          if (response.data.status == 1) {
            that.paycode = response.data.entity;
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
      that.dialogpayVisible = false;
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
    // 添加新缴费方式
    addNewPay() {
      let obj = {};
      obj.values = 1;
      obj.moneycount = 0;
      obj.ifshow = false;
      this.MoneyDatas.push(obj);
      // 自动计算金额
      this.getPrice(this.MoneyDatas.length - 1);
    },
    // 支付方式选支付宝微信，弹出按钮
    changePay(ev, index) {
      if (ev == 6 || ev == 7) {
        this.MoneyDatas[index].ifshow = true;
      } else {
        this.MoneyDatas[index].ifshow = false;
      }
    },
    // 点击加号自动填充剩余金额 getPrice(ev, index)
    getPrice(index) {
      let all = this.money;
      this.MoneyDatas.forEach((element, idex) => {
        if (
          (typeof element.moneycount == "number" ||
            typeof element.moneycount == "string") &&
          idex != index
        ) {
          all -= Number(element.moneycount);
        }
      });
      this.MoneyDatas[index].moneycount = all.toFixed(2);
    },
    // 缴费
    goPay() {
      let moneys = 0;
      this.MoneyDatas.forEach((element, idex) => {
        moneys += parseFloat(element.moneycount);
      });
      if (moneys != this.money) {
        this.$message.error("相加金额不等，请重新计算");
        return;
      }
      this.payF = true;
      //提交
      let that = this;
      let entity = [];
      let arr = [];
      //得到不为0的
      arr = this.MoneyDatas.filter(item => {
        return item.moneycount != 0;
      });
      arr.forEach((item, index) => {
        let obj = {};
        if (item.moneycount != 0) {
          obj.TypeCode = item.values;
          obj.TradeMoney = item.moneycount;
        }
        entity.push(obj);
      });
      this.$axios
        .post(this.$api.TransactionOK, {
          TradeCode: that.tradeCode,
          Type: that.tradeType,
          TradeTypes: entity,
          OperatorCode: that.OperatorCode,
          RefundInvoiceNum: ""
        })
        .then(function(response) {
          if (response.data.status == 1) {
            if (response.data.entity == true) {
              that.$message.success("缴费成功");
              that.$parent.getUser();
              // that.dialogpayVisible = false;
            }
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    },
    // 打印发票，发票入库(5.29做)
    async InvoicePrint() {
      ///////////////套壳前注释掉，套壳后解注
      // // 按钮加载中
      // this.printerF = true;
      // // this.Loading = true;
      // // await函数 返回值是promise then中的response；async 返回值返回时会再套一层，变成promise对象，await后边的值会变成then的参数
      // let dyresult = await this.firstStep().catch(error => {
      //   this.$message.error(`错误：${error}`);
      // });
      // // 成功回调,a接口无内部错误，传参给b函数执行
      // if ((dyresult.data.Status = 1)) {
      //   let apiresult = await this.secondStep(dyresult.data.entity).catch(
      //     error => {
      //       this.$message.error(`错误：${error}`);
      //     }
      //   );
      //   // 前两步完事后调用
      //   if (apiresult) {
          this.thirdStep();
      //   }
      // }
      // // 如果接口内部错误
      // else {
      // }
    },
    // 打印发票
    firstStep() {
      let that = this;
      let a = that.$axios.post(this.$api.InvoicePrintMod, {
        invoiceMoney: that.money,
        invoiceNum: that.paycode,
        accountName: that.taitou,
        OperatorCode: that.OperatorCode
      });
      return a;
    },
    // 调用winapi
    secondStep(basestring) {
      let pro = new Promise((resolve, reject) => {
        // 打印
        api.print(basestring);
        resolve(true);
      });
      return pro;
    },
    // 调用发票打印成功入库接口
    thirdStep() {
      let that = this;
      that.$axios
        .get(this.$api.InvoicePrint, {
          params: {
            TradeCode: that.tradeCode,
            invoiceNum: that.paycode,
            accountName: that.taitou,
            OperatorCode: that.OperatorCode
          }
        })
        .then(function(response) {
          // 按钮恢复
          that.printerF = false;
          that.Loading = false;
          if (response.data.status == 1) {
            if (response.data.entity == true) {
              that.$message.success("发票绑定订单成功");
              that.$parent.getUser();
              that.dialogpayVisible = false;
            }
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    }
  }
};
</script>

<style scoped>
/* gzp */
#dialogpay .customerName {
  background: #409fff;
  width: 5px;
  height: 16px;
  margin-right: 10px;
  display: inline-block;
}
.vertical {
  vertical-align: top;
}
#dialogpay .info {
  color: #606266;
  font-size: 12px;
}
#dialogpay .infomation .el-form-item {
  width: 48%;
}
#dialogpay .infomation .el-form-item:first-child {
  width: 100%;
}
#dialogpay form {
  margin-bottom: 20px;
  padding-left: 10px;
}
#dialogpay .infomation input {
  width: 220px;
}
#dialogpay .paytype .el-form-item {
  margin-right: 0px;
}
#dialogpay .typecontainer .el-form-item:nth-child(2) {
  width: 110px;
}
#dialogpay .paytype .inputselect {
  border-radius: 0px;
  width: 100px;
}
#dialogpay .span {
  color: red;
}
#dialogpay .paytype .inputtxt input {
  width: 220px;
}
#dialogpay .typecontainer {
  width: 50%;
  display: inline-block;
}
#dialogpay .btnplain {
  width: 220px;
}
#dialogpay .yuan {
  line-height: 32px;
}
#dialogpay .mgleft {
  margin-left: 5px;
}
/* gzp end */
</style>


