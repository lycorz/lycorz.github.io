<template>
  <div id="dialogrefund" class="dialogrefund">
    <el-dialog
      title="退费详情"
      :visible.sync="dialogrefundIsShow"
      :close-on-click-modal="false"
      @open="getData"
      width="720px"
    >
      <div class="title">退费信息</div>
      <div class="con">
        <ul>
          <li class="item" style="width:100%">
            <span>退费金额：</span>
            <div class="item-list" style="color:#F56C6C;font-size:14px;">￥{{usedMoney}}元</div>
          </li>
          <div>
            <li class="item" style="margin-top:16px" >
              <span>作废发票：</span>
              <div style="margin-right:5px" v-for="(item,index) of ordreHistoryData.UsedInvoices" :key="index" class="item-list">{{item.invoiceNum}}(￥{{item.invoiceMoney}})</div>
            </li>
          </div>
        </ul>
      </div>
      <div class="title">新开发票</div>
      <div class="con">
        <ul>
          <li class="item">
            <span>新发票号：</span>
            <div class="item-list">{{invoiceNum}}</div>
          </li>
          <li class="item">
            <span>发票金额：</span>
            <div class="item-list">￥{{ordreHistoryData.tradeMoney}}元</div>
          </li>
          <li class="item" style="margin-top:16px">
            <span>发票抬头：</span>
            <div class="item-list">{{ordreHistoryData.accountName}}</div>
          </li>
        </ul>
      </div>
      <div class="title">退费明细</div>
      <div class="con">
        <ul>
          <li class="item">
            <span>退费详情：</span>
            <div style="margin-right:5px" v-for="(item,index) in ordreHistoryData.paidTypes" :key="index" class="item-list">退回{{item.paidType | tradetype }}￥{{item.tradeMoney}}</div>
          </li>
          <!-- <li class="item">
            <span>退费金额：</span>
            <div class="item-list">元</div>
          </li>-->
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogrefund",
  props: {},
  data() {
    return {
      dialogrefundIsShow: false,
      tradeCode: "",
      invoiceNum: "",
      usedMoney: 0,
      ordreHistoryData: []
    };
  },
  methods: {
    getData: function() {
      let that = this;
      this.$axios
        .get(this.$api.TradeHistoryDetailQuery, {
          params: {
            tradeCode: this.tradeCode
          }
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.ordreHistoryData = response.data.entity;
          } else {
            that.$message.error(response.data.message);
          }

          //关闭遮罩
          //that.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
.dialogrefund .title {
  padding: 2px 5px;
  /* background-color: #ecf8ff; */
  /* border-radius: 4px; */
  border-left: 3px solid #50bfff;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: rgba(96, 98, 102, 1);
  /* margin: 20px 0; */
}
.dialogrefund .con {
  padding: 16px 0px 16px;
  font-size: 12px;
  color: #606266;
  overflow: hidden;
}
.dialogrefund .con ul {
  overflow: hidden;
}
.dialogrefund .con .item {
  width: 50%;
  float: left;
  text-align: left;
}
.dialogrefund .con .item span {
  display: block;
  float: left;
  width: 70px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 16px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
}
.dialogrefund .con .item-list {
  display: block;
  float: left;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 16px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
}
</style>

