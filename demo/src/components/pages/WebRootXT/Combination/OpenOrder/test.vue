<template>
  <div id="test">
    <el-dialog
      title="驳回原因填写"
      :visible.sync="dialogrejIsShow"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="我是异常内容"
            :rows="4"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogrejIsShow = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:"test",
  data() {
    return {
      formLabelWidth: "100px",
      dialogrejIsShow: false
    };
  }
};
</script>

