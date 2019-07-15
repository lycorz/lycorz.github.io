<template>
  <el-dialog
    id="printer"
    title="打印机配置"
    :visible.sync="printerVisible"
    :close-on-click-modal="false"
    width="424px"
  >
    <div :key="index" v-for="(it,index) in printer">
      <span>配置条码打印机:</span>
      <el-select v-model="it.value" filterable placeholder="请选择">
        <el-option
          v-for="item in it.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-tooltip class="item" effect="dark" content="用于打印体检号、姓名贴等" placement="bottom-end">
        <i class="el-icon-question"></i>
      </el-tooltip>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="printerVisible = false">取 消</el-button>
      <el-button type="primary" @click="printerVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      printerVisible: false,
      //   打印机 选项对象
      printer: [
        {
          //   select 值
          value: "gogo",
          options: []
        },
        {
          //   select 值
          value: "gogo",
          options: []
        },
        {
          //   select 值
          value: "gogo",
          options: []
        }
      ]
    };
  },
  methods: {}
};
</script>
<style scoped>
#printer >>> .el-dialog__header {
  padding: 0px 20px 0 20px;
}
#printer >>> .el-dialog__body {
  padding: 0px 32px;
}
#printer >>> .el-select {
  display: inline-block;
  width: 200px;
  margin-left: 10px;
  margin-right: 10px;
}
.colorRed {
  color: red;
}
</style>
