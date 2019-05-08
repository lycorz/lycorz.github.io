<template>
  <div id="CertCreate" class="CertCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      height="600px"
      title="证书信息"
      :visible.sync="isShow"
      :before-close="close"
      @open="init"
      :close-on-click-modal="false"
    >
      <el-form
        :model="fromData"
        ref="createFrom"
        label-width="50px"
        :inline="true"
        :rules="rules"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="证书名称" :label-width="formLabelWidth" prop="certName">
          <el-input v-model="fromData.certName"></el-input>
        </el-form-item>
        <el-form-item label="证书编号" :label-width="formLabelWidth" prop="certCode">
          <el-input v-model="fromData.certCode"></el-input>
        </el-form-item>
        <el-form-item label="颁发机构" :label-width="formLabelWidth" prop="certAuthority">
          <el-input v-model="fromData.certAuthority"></el-input>
        </el-form-item>
        <el-form-item label="颁发时间" :label-width="formLabelWidth" prop="getTime">
          <el-date-picker v-model="fromData.getTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效截至日期" :label-width="formLabelWidth" prop="expireTime">
          <el-date-picker v-model="fromData.expireTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-col :span="24">
          <el-form-item label="上传图片" :label-width="formLabelWidth">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgdialogVisible" class="infoucs">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CertCreate",
  data() {
    return {
      Code: "",
      imageUrl: "",
      isShow: false,
      formLabelWidth: "100px",
      dialogImageUrl: "",
      imgdialogVisible: false,
      fromData: {
        oldInnerCode: null,
        innerCode: null,
        operatorCode: "",
        certCode: "",
        certName: "",
        certAuthority: "",
        getTime: null,
        expireTime: null,
        certPhoto: "",
        validLogin: false, //是否用于验证登陆，默认false，页面上此字段未作维护。
        remark: ""
      },
      rules: {
        certCode: [
          { required: true, message: "请输入证书编号", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        certName: [
          { required: true, message: "请输入证书名称", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        certAuthority: [
          { required: true, message: "请输入颁发机构", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        getTime: [
          { required: true, message: "请选择颁发日期", trigger: "change" }
        ],
        expireTime: [
          { required: true, message: "请选择有效截至日期", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  inject: ["getData"],
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgdialogVisible = true;
    },
    init() {
      if (this.$refs.createFrom !== undefined) {
        if (this.$refs.createFrom !== undefined) {
          this.$refs.createFrom.resetFields();
        }
      }
      if (this.Code) {
        this.$axios
          .get(this.$api.GetUserCert, { params: { key: this.Code } })
          .then(res => {
            if (res.data.status == 1) {
              this.fromData = res.data.entity;
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    submitForm() {
      this.fromData.oldInnerCode = this.Code;
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.$axios
            .post(this.$api.SaveUserCert, this.fromData)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("保存成功！");
                this.close();
                this.getData();
              } else {
                this.$message.error("保存失败，请重试。");
                console.error(res.data.message);
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
        oldInnerCode: null,
        innerCode: null,
        operatorCode: "",
        certCode: "",
        certName: "",
        certAuthority: "",
        getTime: null,
        expireTime: null,
        certPhoto: "",
        validLogin: false, //是否用于验证登陆，默认false，页面上此字段未作维护。
        remark: ""
      };
      this.dialogImageUrl = "";
      this.Code = "";
    }
  }
};
</script>
<style>
.CertCreate .el-date-editor {
  width: 178px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
</style>


