<template>
  <div id="SmstypeCreate" class="SmstypeCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="其他短信模版"
      :visible.sync="isShow"
      :before-close="close"
      @open="init"
      :close-on-click-modal="false"
    >
      <el-form
        :model="fromData"
        ref="createFrom"
        label-width="50px"
        :rules="rules"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="类型编号" :label-width="formLabelWidth" prop="typeCode">
          <el-input v-model="fromData.typeCode"></el-input>
        </el-form-item> 
        <el-form-item label="类型名称" :label-width="formLabelWidth" prop="typeName">
          <el-input v-model="fromData.typeName"></el-input>
        </el-form-item>
        <el-form-item label="模板内容" :label-width="formLabelWidth" prop="templateContent">
          <el-input type="textarea" autosize v-model="fromData.templateContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SmstypeCreate",
  data() {
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        typeCode: "",
        typeName: "",
        templateContent: ""
      },
      rules: {
        typeCode: [
          { required: true, message: "请输入类型编号", trigger: "blur" },
          { max: 3, message: "最大支持3个字符输入", trigger: "blur" }
        ],
        typeName: [
          { required: true, message: "请输入类型名称", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        type: [{ max: 200, message: "最大支持200个字符输入", trigger: "blur" }]
      }
    };
  },
  created() {},
  inject: ["getData"],
  methods: {
    init() {
      if (this.$refs.createFrom !== undefined) {
        this.$refs.createFrom.resetFields();
      }
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetSmstype, {
            params: { key: that.Code }
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              that.fromData = res.data.entity;
            } else {
              that.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
      }
    },
    submitForm() {
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.fromData.oldTypeCode = this.Code;
          this.$axios
            .post(this.$api.SaveSmstype, this.fromData)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("保存成功！");
                this.close();
                this.getData();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          return false;
        }
      });
    },
    close() {
      this.isShow = false;
      if (this.$refs["fromData"] !== undefined) {
        this.$refs["fromData"].resetFields();
      }
      this.fromData = {
        typeCode: "",
        typeName: "",
        templateContent: ""
      };
      this.Code = "";
    }
  }
};
</script>
<style>
</style>


