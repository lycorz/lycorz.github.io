<template>
  <el-dialog
    id="lisedit"
    title="实验室检查编辑"
    :visible.sync="dialogVisible"
    width="424px"
    height="320px"
    :modal="false"
  >
    <span>
      <li>
        <span class="itemname">项目名称</span>
        <span>{{data.rptSubItemName}}</span>
      </li>
      <li>
        <span class="itemname">检查结果</span>
        <span>{{data.examValue}}</span>
      </li>
      <li>
        <span class="itemname">参考范围</span>
        <span>{{data.lowReffer}}-{{data.highReffer}}</span>
      </li>
      <li>
        <span class="itemname">单位</span>
        <span>{{data.unit}}</span>
      </li>
      <li>
        <span class="itemname">结果类型</span>
        <span>
          <el-select v-model="data.resultType" placeholder="请选择">
            <el-option :key="0" label="↑" value="H"></el-option>
            <el-option :key="1" label="正常" value="N"></el-option>
            <el-option :key="2" label="↓" value="L"></el-option>
          </el-select>
        </span>
      </li>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      data: {}
    };
  },
  methods: {
    submit() {
      let that = this;
      this.$axios
        .post(this.$api.UpdateLisSubItemResultType, {  
          "innerCode": that.data.innerCode,
          "resultType":that.data.resultType})
        .then(function(response) {
          if (response.data.status == 1) {
            that.$message.success("类型修改成功");
              that.dialogVisible = false;
           
            
          } else {
            that.$message.error(`错误：${response.data.message}`);
            reject(false);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
          reject(false);
        });
    }
  }
};
</script>

<style>
#lisedit .el-dialog__body {
  height: 200px !important;
}
#lisedit li {
  list-style: none;
  line-height: 40px;
}
#lisedit .itemname {
  display: inline-block;
  margin-right: 10px;
  width: 60px;
}
#lisedit .el-select {
  display: inline-block !important;
}
</style>
