<template>
  <el-dialog
    id="dialogchange"
    title="变更状态"
    :visible.sync="ChangeVisible"
    :close-on-click-modal="false"
    width="424px"
    append-to-body
    @open="getInit"
  >
    <el-radio-group v-model="radioValue">
      <el-radio
        :label="item.value"
        :key="index"
        v-for="(item,index) in options"
        @change="setvalue(index)"
      >
        {{item.name}}
        <span
          class="notAllow"
          v-if="cantChoose==false && index == choosedOption"
        >不能退回到此状态</span>
      </el-radio>
    </el-radio-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="ChangeVisible = false">取 消</el-button>
      <el-button type="primary" @click="changeStatus()" :disabled="radioValue==''">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      ChangeVisible: false,
      radioValue: "",
      choosedOption: null,
      // 不可选标识
      cantChoose: null,
      options: [],
      OperatorCode: "001"
    };
  },

  methods: {
    async getInit() {
      // 初始化
      this.cantChoose = 4;
      this.radioValue = "";
      await this.getEnum();
    },
    // 订单状态搜索条件枚举
    getEnum() {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        this.$axios
          .post(this.$api.GetOrderStatusRollBackEnum)
          .then(function(response) {
            console.log(response.data.entity);
            if (response.data.status == 1) {
              that.options = response.data.entity;
              // 初始化成“订单状态”
              // that.orderStatus = response.data.entity[8].value;
              resolve(true);
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(`GetOrderStatusRollBackEnum:${response.data.message}`);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(`GetOrderStatusRollBackEnum:${error}`);
          });
      });
      return pro;
    },
    // 变更状态
    changeStatus() {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        this.$axios
          .post(this.$api.ChangeOrderStatusProgressByOrderCodeAndCondition, {
            OrderCode: that.orderCode,
            Condition: that.radioValue,
            OperatorCode: that.OperatorCode
          })
          .then(function(response) {
            console.log(response.data.entity);
            if (response.data.status == 1) {
              that.$message.success(`回退成功`);
              resolve(true);
              that.ChangeVisible = false;
              that.$parent.getUser();
            } else {
              //
              console.log(response.data,8888999)
              that.cantChoose = false;
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(`GetOrderStatusRollBackEnum:${error}`);
          });
      });
      return pro;
    },
    setvalue(value) {
      // 显示是否可回退
      this.cantChoose = null;
      this.choosedOption = value;
    }
  }
};
</script>
<style scoped>
#dialogchange >>> .el-radio {
  display: block;
  margin-top: 10px;
}
.notAllow {
  color: red;
  margin-left: 10px;
}
</style>
