<template>
  <el-dialog
    @open="getInit"
    id="summary"
    title="新增小结"
    :visible.sync="adviceEditVisible"
    width="500px"
    append-to-body
  >
    <el-input type="textarea" v-model="summary" rows="6"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="adviceEditVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveChange()">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      adviceEditVisible: false,
      summary: "",
      index: ""
    };
  },
  methods: {
    saveChange() {
      let obj = {};
      obj.summary = this.summary;
      obj.index = this.index;
      this.$emit("postSummary", obj);
      this.adviceEditVisible = false;
    },
    getInit() {
      this.content = "";
    }
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
