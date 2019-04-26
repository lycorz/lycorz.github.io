<template>
  <el-dialog
    @open="getInit"
    id="summary"
    title="编辑小结"
    :visible.sync="EditVisible"
    :modal="modal"
    width="500px"
  >
    <el-input type="textarea" v-model="content" rows="6"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="EditVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveChange()">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      EditVisible: false,
      content: "",
      index: ""
    };
  },
  methods: {
    saveChange() {
      let obj = {};
      obj.content = this.content;
      obj.index = this.index;
      this.$emit("posSummary", obj);
      this.EditVisible = false;
    },
    getInit() {}
  }
};
</script>

<style scoped>
img {
  width: 465px;
  height: 400px;
}
#fjcheck #summary .el-textarea__inner {
  border-radius: 10px !important;
}
</style>
