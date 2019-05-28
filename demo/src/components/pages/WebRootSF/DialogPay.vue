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
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item>
              <el-input v-model="item.moneycount" class="inputtxt" @focus="getPrice($event,index)"></el-input>
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
        <el-button @click="InvoicePrint" :disable="money <= 0">打印发票</el-button>
        <el-button type="primary" @click="goPay">确定缴费</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { resolve, reject } from "q";
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
      MoneyDatas: []
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
    },
    changePay(ev, index) {
      if (ev == 6 || ev == 7) {
        this.MoneyDatas[index].ifshow = true;
      } else {
        this.MoneyDatas[index].ifshow = false;
      }
    },
    getPrice(ev, index) {
      let all = this.money;
      this.MoneyDatas.forEach((element, idex) => {
        if (
          (typeof element.moneycount == "number" ||
            typeof element.moneycount == "string") &&
          idex != index
        ) {
          all -= parseFloat(element.moneycount);
        }
      });
      this.MoneyDatas[index].moneycount = all;
    },
    goPay() {
      let moneys = 0;
      this.MoneyDatas.forEach((element, idex) => {
        moneys += parseFloat(element.moneycount);
      });
      if (moneys != this.money) {
        this.$message.error("相加金额不等，请重新计算");
        return;
      }
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
    // 打印发票，发票入库
    InvoicePrint() {
      let that = this;
      let pro = new Promise((resolve, reject) => {
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
      });
      return pro;
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
#dialogpay .infomation .el-form-item:first-child{
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


