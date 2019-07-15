<template>
  <el-dialog
    id="checkin"
    title="客户到检"
    :visible.sync="checkInVisible"
    :close-on-click-modal="false"
    width="424px"
    @open="getInit"
  >
    <span @keyup.13="submit()">
      <el-input placeholder="请刷卡" maxlength="20" v-model="input" clearable v-focus></el-input>
    </span>
    <span class="colorRed" v-if="inputLengthFlag">体检卡位数不对，请重刷！</span>
    <span class="colorRed" v-if="noPersonFlag">当前卡号下没有绑定用户，请重刷！</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="checkInVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
    <checinstatus ref="checinstatus"></checinstatus>
  </el-dialog>
</template>

<script>
import checinstatus from "./DialogCheckInStatus.vue";
import { resolve, reject } from "q";
export default {
  components: { checinstatus },
  data() {
    return {
      checkInVisible: false,
      // 卡号
      input: "",
      // 卡号位数不对提示 显示标志
      inputLengthFlag: false,
      // 没该人信息提示 显示标志
      noPersonFlag: false
    };
  },
  methods: {
    getInit() {
      this.input = "";
      this.inputLengthFlag = false;
    },
    async submit() {
      let that = this;
      let pro = await that.$axios
        .post(this.$api.BeginCheckByCardNum, { cardnum: that.input })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
          reject(false);
        });

      console.log(pro);
      // 如果后台没进catch 到检成功
      if (pro.data.status == 1) {
        // 人员信息
        this.$refs.checinstatus.personInfo = pro.data.entity.personInfo;
        // 未完成列表
        if (pro.data.entity.items.length != 0) {
          let arr = [];
          pro.data.entity.items.forEach(element => {
            let obj = {};
            obj.itemName = element;
            arr.push(obj);
          });
          this.$refs.checinstatus.tableData = arr;
        }
        // 是否到检成功 决定显示哪些组件
        if (pro.data.entity.checkBeginStatus) {
          this.$refs.checinstatus.ifSuccess = true;
          this.checkInVisible = false;
          this.$refs.checinstatus.checkInStatusVisible = true;
        } else {
          if (pro.data.entity.items.length == 0) {
            this.$message.error("错误的体检卡号")
          } else {
            this.$refs.checinstatus.ifSuccess = false;
            this.checkInVisible = false;
            this.$refs.checinstatus.checkInStatusVisible = true;
          }
        }
      }
      // 如果后台进了catch 到检没成功
      else {
        that.$message.error(`错误：${pro.data.message}`);
      }
    }
  }
};
</script>
<style scoped>
#checkin >>> .el-dialog__header {
  padding: 0px 20px 0 20px;
}
#checkin >>> .el-dialog__body {
  padding: 0px 32px;
  line-height: 20px;
}
#checkin >>> .el-radio {
  display: block;
  margin-top: 10px;
}
.colorRed {
  color: red;
}
</style>
