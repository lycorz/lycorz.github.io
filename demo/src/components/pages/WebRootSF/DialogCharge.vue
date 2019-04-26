<template>
  <div class="dialogcharge">
    <el-dialog
      title="收费详情"
      :visible.sync="dialogchargeIsShow"
      :close-on-click-modal="false"
      @open="getData"
      width="720px"
    >
      <div class="modal-title">客户信息</div>
      <div class="modal-con">
        <ul>
          <li class="item">
            <span>金额：</span>
            <div class="item-list" style="color:#F56C6C;font-size:14px;">￥{{ordreHistoryData.tradeMoney}}元</div>
          </li>
          <li class="item">
            <span>发票号：</span>
            <div class="item-list">{{invoiceNum}}</div>
          </li>
          <li class="item">
            <span>抬头：</span>
            <div class="item-list">{{ordreHistoryData.accountName}}</div>
          </li>
        </ul>
      </div>
      <div class="modal-title">缴费明细</div>
      <div class="modal-con">
        <ul v-for="(item,index) in ordreHistoryData.paidTypes" :key="index" >
          <li class="item">
            <span>缴费方式：</span>
            <div class="item-list">{{item.paidType | tradetype }}</div>
          </li>
          <li class="item">
            <span>缴费金额：</span>
            <div class="item-list">￥{{item.tradeMoney}}元</div>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogcharge",
  props: {},
  data() {
    return {
      dialogchargeIsShow: false,
      tradeCode: "",
      customerName: "",
      invoiceNum:"",
      ordreHistoryData: []
    };
  },
  methods: {
    getData: function() {
      let that = this;
      this.$axios
        .get(this.$api.TradeHistoryDetailQuery, {
          params: {
           tradeCode:this.tradeCode
          }
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.ordreHistoryData = response.data.entity;
            console.log(that.ordreHistoryData);
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
  },
};
</script>

