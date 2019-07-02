<template>
  <div class="dialogcharge">
    <el-dialog
      title="收费详情"
      :visible.sync="dialogchargeIsShow"
      :close-on-click-modal="false"
      @open="getData"
      width="720px"
    >
      <div class="title">发票信息</div>
      <div class="con">
        <ul>
          <li class="item">
            <span>金额：</span>
            <div
              class="item-list"
              style="color:#F56C6C;font-size:14px;"
            >￥{{ordreHistoryData.tradeMoney}}元</div>
          </li>
          <li class="item">
            <span>发票号：</span>
            <div class="item-list">{{invoiceNum}}</div>
          </li>
          <li style="margin-top:16px" class="item">
            <span>抬头：</span>
            <div class="item-list">{{ordreHistoryData.accountName}}</div>
          </li>
        </ul>
      </div>
      <div class="title">缴费明细</div>
      <div class="con">
        <ul>
          <li class="item">
            <span>缴费方式：</span>
            <div
              style="margin-right:5px"
              v-for="(item,index) in ordreHistoryData.paidTypes"
              :key="index"
              class="item-list"
            >{{item.paidType | tradetype }}￥{{item.tradeMoney}}</div>
          </li>
          <!-- <li class="item">
            <span>缴费金额：</span>
            <div class="item-list">元</div>
          </li>-->
        </ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
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
      invoiceNum: "",
      ordreHistoryData: []
    };
  },
  methods: {
    close: function() {
      this.dialogchargeIsShow = false;
    },
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
  }
};
</script>
<style>
.dialogcharge .title {
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
.dialogcharge .con {
  padding: 16px 0px 16px;
  font-size: 12px;
  color: #606266;
  overflow: hidden;
}
.dialogcharge .con ul {
  overflow: hidden;
}
.dialogcharge .con .item {
  width: 50%;
  float: left;
  text-align: left;
}
.dialogcharge .con .item span {
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
.dialogcharge .con .item-list {
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

