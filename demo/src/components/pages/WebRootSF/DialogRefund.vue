<template>
  <div id="dialogrefund">
    <el-dialog
      title="退费详情"
      :visible.sync="dialogrefundIsShow"
      :close-on-click-modal="false"
      @open="getData"
      width="720px"
    >
      <div class="modal-title">退费信息</div>
      <div class="modal-con">
        <ul>
          <li class="item" style="width:100%">
            <span>退费金额：</span>
            <div class="item-list" style="color:#F56C6C;font-size:14px;">￥{{usedMoney}}元</div>
          </li>
          <div v-for="(item,index) of ordreHistoryData.UsedInvoices" :key="index">
            <li class="item">
              <span>作废发票：</span>
              <div class="item-list">{{item.invoiceNum}}</div>
            </li>
            <li class="item">
              <span>发票金额：</span>
              <div class="item-list">￥{{item.invoiceMoney}}元</div>
            </li>
          </div>
        </ul>
      </div>
      <div class="modal-title">新开发票</div>
      <div class="modal-con">
        <ul>
          <li class="item">
            <span>新开发票号：</span>
            <div class="item-list">{{invoiceNum}}</div>
          </li>
          <li class="item">
            <span>发票金额：</span>
            <div class="item-list">￥{{ordreHistoryData.tradeMoney}}元</div>
          </li>
          <li class="item">
            <span>抬头：</span>
            <div class="item-list">{{ordreHistoryData.accountName}}</div>
          </li>
        </ul>
      </div>
      <div class="modal-title">退费明细</div>
      <div class="modal-con">
        <ul v-for="(item,index) in ordreHistoryData.paidTypes" :key="index" >
          <li class="item">
            <span>退费方式：</span>
            <div class="item-list">{{item.paidType | tradetype }}</div>
          </li>
          <li class="item">
            <span>退费金额：</span>
            <div class="item-list">￥{{item.tradeMoney}}元</div>
          </li>
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
      usedMoney:0,
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

