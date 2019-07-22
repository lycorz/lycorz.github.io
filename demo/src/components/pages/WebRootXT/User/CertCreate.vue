<template>
  <div id="CertCreate" class="CertCreate">
    <el-dialog
      class="infoucs"
      width="700px"
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
        <el-form-item label="证书类型" :label-width="formLabelWidth" prop="certType">
          <el-select clearable v-model="fromData.certType" placeholder="请选择">
            <el-option
              v-for="item in certTypeItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="颁发机构" :label-width="formLabelWidth" prop="certAuthority">
          <el-input v-model="fromData.certAuthority"></el-input>
        </el-form-item>
        <el-form-item label="颁发时间" :label-width="formLabelWidth" prop="getTime">
          <el-date-picker
            v-model="fromData.getTime"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="有效截至日期" :label-width="formLabelWidth" prop="expireTime">
          <el-date-picker
            v-model="fromData.expireTime"
            :picker-options="pickerOptions"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-col :span="24">
          <el-form-item label="上传图片" :label-width="formLabelWidth">
            <el-upload
              :action="uploadPath"
              list-type="picture-card"
              :file-list="fileList"
              ref="upload"
              :before-upload="beforeUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="onSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <div style="margin:10px 0;color: #F56C6C;font-size: 10px;">图片大小不得超过 2MB</div>
        </el-col>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgdialogVisible" class="infoucs">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import consts from "../../../../utils/const";
export default {
  name: "CertCreate",
  data() {
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      uploadPath: consts.IMG_UPLOAD_URL,
      basePath: consts.IMG_BASE_PATH,
      dialogImageUrl: "",
      fileList: [],
      imgPath: [],
      allPath: [],
      certTypeItems: [],
      imgdialogVisible: false,
      fromData: {
        oldInnerCode: null,
        innerCode: null,
        operatorCode: "",
        certCode: "",
        certName: "",
        certType: null,
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
        certType: [
          { required: true, message: "请选择证书类型", trigger: "change" }
        ],
        getTime: [
          { required: true, message: "请选择颁发日期", trigger: "change" }
        ],
        expireTime: [
          { required: true, message: "请选择有效截至日期", trigger: "change" }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      }
    };
  },
  created() {
    this.getCertType();
  },
  inject: ["getData"],
  methods: {
    //图片上的删除
    handleRemove(file, fileList) {
      let fileNames = this.imgPath.find(
        z => z.slice(-file.name.length, z.length) == file.name
      );

      this.imgPath.splice(this.imgPath.indexOf(fileNames), 1);
      if (!this.Code) {
        this.delImage([fileNames]);
      }
    },
    //图片上的放大镜
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.imgdialogVisible = true;
    },
    //上传前判断图片是否合法
    beforeUpload(file) {
      // const isJPG = file.type === "image/jpeg" || "jpg" || "png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG/PNG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      if (file.name.indexOf(";") != -1) {
        this.$message.error("图片名称不可包含 ';' !");
      }
      return isLt2M;
    },
    //图片上传成功
    onSuccess(response, file, fileList) {
      console.log(this.imgPath);
      this.imgPath.push(response.entity[0]);
      console.log(this.imgPath);
      this.allPath.push(response.entity[0]);
    },
    //医生证书枚举获取
    getCertType() {
      this.$getType("CertType")
        .then(res => {
          this.certTypeItems = res.data.entity;
        })
        .catch(err => {
          console.error(err);
        });
    },
    init() {
      if (this.$refs.createFrom !== undefined) {
        if (this.$refs.createFrom !== undefined) {
          this.$refs.createFrom.resetFields();
        }
      }
      if (this.Code) {
        let that = this;
        this.$axios
          .get(this.$api.GetUserCert, { params: { key: this.Code } })
          .then(res => {
            if (res.data.status == 1) {
              this.fromData = res.data.entity;
              if (res.data.entity.certPhoto) {
                console.log(res.data.entity.certPhoto.split(";"));
                this.imgPath = res.data.entity.certPhoto.split(";");
                this.allPath = res.data.entity.certPhoto.split(";");
                this.imgPath.forEach((item, index) => {
                  let file = {
                    uid: index++,
                    url: that.basePath + item,
                    name: item
                  };
                  this.fileList.push(file);
                });
              }
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    delImage(fileNames) {
      this.$axios.post(this.$api.FileDelete, fileNames);
    },
    submitForm() {
      this.fromData.oldInnerCode = this.Code;
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.fromData.certPhoto = this.imgPath.join(";");
          this.$axios
            .post(this.$api.SaveUserCert, this.fromData)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("保存成功！");
                this.close(true);
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
    close(isUpdate) {
      this.isShow = false;
      if (!this.Code && this.imgPath && isUpdate != true) {
        //新增不保存
        this.delImage(this.imgPath);
      }
      if (this.Code) {
        let delItems = new Array();
        if (isUpdate == true) {
          if (this.imgPath) {
            delItems = this.allPath
              .concat(this.imgPath)
              .filter(function(v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
              });
          } else {
            delItems = this.allPath;
          }
        } else {
          if (this.fromData.certPhoto) {
            let oldItems = this.fromData.certPhoto.split(";");
            delItems = this.allPath
              .concat(oldItems)
              .filter(function(v, i, arr) {
                return arr.indexOf(v) === arr.lastIndexOf(v);
              });
          } else {
            delItems = this.allPath;
          }
        }
        if (delItems.length > 0) {
          this.delImage(delItems);
        }
      }
      if (this.$refs["fromData"] !== undefined) {
        this.$refs["fromData"].resetFields();
      }
      this.fromData = {
        oldInnerCode: null,
        innerCode: null,
        operatorCode: "",
        certCode: "",
        certName: "",
        certType: null,
        certAuthority: "",
        getTime: null,
        expireTime: null,
        certPhoto: "",
        validLogin: false, //是否用于验证登陆，默认false，页面上此字段未作维护。
        remark: ""
      };
      this.allPath = new Array();
      this.fileList = new Array();
      this.imgPath = new Array();
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
.el-select {
  width: 178px;
}
</style>


