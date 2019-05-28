<template>
  <div id="UserCreate" class="UserCreate">
    <el-dialog
      class="infoucs"
      width="760px"
      height="600px"
      title="用户管理"
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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户信息" name="first">
            <el-col style="margin-left:8px" :span="10">
              <el-form-item label="用户编号" :label-width="formLabelWidth" prop="operatorCode">
                <el-input v-model="fromData.operatorCode"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
                <el-input v-model="fromData.userName"></el-input>
              </el-form-item>
              <el-form-item label="所属角色" :label-width="formLabelWidth" prop="roleCode">
                <el-select
                  @change="roleChange"
                  clearable
                  v-model="fromData.roleCode"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in roleList"
                    :key="item.roleCode"
                    :label="item.roleName"
                    :value="item.roleCode"
                    filter-placement="bottom-end"
                  >{{item.roleName}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="折扣下限"
                class="is-required"
                :label-width="formLabelWidth"
                prop="discountLowLimit"
              >
                <el-input v-model="fromData.discountLowLimit"></el-input>
              </el-form-item>
              <el-form-item label="优惠自由" :label-width="formLabelWidth">
                <el-checkbox v-model="fromData.canExcItemLimit"></el-checkbox>
              </el-form-item>
              <el-form-item label="身份证号" :label-width="formLabelWidth">
                <el-input v-model="fromData.idcardNum"></el-input>
              </el-form-item>
              <el-form-item label="医院工号" :label-width="formLabelWidth">
                <el-input v-model="fromData.empNum"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="fromData.tele"></el-input>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="fromData.remark"
                  autocomplete="off"
                  maxlength="200"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col style="margin-left:8px" :span="10">
              <el-form-item label="功能项目集合" :label-width="formLabelWidth">
                <div class="tree">
                  <el-tree
                    :data="treeOptions"
                    show-checkbox
                    accordion
                    :default-checked-keys="treeDefaultCheckd"
                    node-key="funcCode"
                    ref="tree"
                    highlight-current
                    :props="defaultProps"
                  ></el-tree>
                </div>
              </el-form-item>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="图片信息" name="second">
            <el-form-item style="margin-left:20px" label="本人照片" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                :action="uploadPath"
                :show-file-list="false"
                :on-error="upLoadError"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-change="onChange"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item style="margin-left:20px" label="签名照片" :label-width="formLabelWidth">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :action="uploadPath"
                :on-success="handleAvatarSuccess1"
                :before-upload="beforeAvatarUpload"
                :on-change="onChange1"
                :on-error="upLoadError1"
              >
                <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <div style="margin:10px 20px;color: #F56C6C;font-size: 10px;">图片大小不得超过 2MB</div>
          </el-tab-pane>
          <el-tab-pane label="账户信息" name="third">
            <div style="margin-bottom: 20px">
              <el-form-item style="margin-left:20px" label="账号" label-width="50px" prop="loginName">
                <el-input v-model="fromData.loginName"></el-input>
              </el-form-item>
              <el-form-item
                style="margin-left:20px"
                label="密码"
                show-password
                label-width="50px"
                prop="pwd"
              >
                <el-input v-model="fromData.pwd"></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { resolve, reject } from "q";
import consts from "../../../../utils/const";
export default {
  name: "UserCreate",
  data() {
    var checkDic = (rule, value, callback) => {
      if (value || value == 0) {
        var re = /^(0.\d+|0|1)$/;
        if (!re.test(value)) {
          callback(new Error("请输入0-1之间的小数(包括0和1)"));
        }
      } else {
        callback(new Error("请输入折扣"));
      }
      callback();
    };
    return {
      activeName: "first",
      Code: "",
      fileList: [],
      isShow: false,
      formLabelWidth: "100px",
      treeOptions: [],
      treeDefaultCheckd: [],
      imageUrl: "",
      imageUrl1: "",
      photoPath: "",
      uploadPath: consts.IMG_UPLOAD_URL,
      basePath: consts.IMG_BASE_PATH,
      signaturePath: "",
      roleList: [],
      delImagePath: [],
      defaultProps: {
        children: "childrenNodes",
        label: "funcName"
      },
      fromData: {
        oldOperatorCode: "",
        operatorCode: "",
        empNum: "",
        loginName: "",
        userName: "",
        idcardNum: "",
        pwd: "",
        tele: "",
        roleCode: "",
        discountLowLimit: null,
        funcItems: "",
        deptCodes: "",
        photo: "",
        signature: "",
        deleted: false,
        remark: "",
        canExcItemLimit:false,   //是否突破最低价打折,2019/05/23，经由颜寒通知进行增加。
      },
      rules: {
        operatorCode: [
          { required: true, message: "请输入用户编号", trigger: "blur" },
          { max: 5, message: "最大支持5个字符输入", trigger: "blur" }
        ],
        loginName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        roleCode: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        discountLowLimit: [{ validator: checkDic, trigger: "blur" }]
      }
    };
  },
  inject: ["getData"],
  methods: {
    roleChange(val) {
      let role = this.roleList.find(z => z.roleCode == val);
      if (role) {
        this.fromData.discountLowLimit = role.discountLowLimit;
        this.treeDefaultCheckd = new Array();
        this.$refs.tree.setCheckedKeys([]);
        this.treeDefaultCheckd = role.funcCodes.split(",");
      }
    },
    handleClick(val) {
      // if (val == 2) {
      //   this.getImageByPath(this.fromdata.photo).then(res=>{
      //     this.imageUrl = res;
      //   });
      //     this.getImageByPath(this.fromdata.signature).then(res=>{
      //     this.imageUrl1 = res;
      //   })
      // }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.photoPath = res.entity[0];
      this.delImagePath.push(res.entity[0]);
      console.log("上传头像成功");
    },
    onChange(file) {
      // this.fromData.photo = URL.createObjectURL(file.raw);
      console.log(file);
    },
    onChange1(file) {
      // this.fromData.signature = URL.createObjectURL(file.raw);
    },
    //文件上传失败时的钩子
    upLoadError(response, file, fileList) {
      console.log("上传头像失败");
    },
    upLoadError1(response, file, fileList) {
      console.log("上传签名照失败");
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg" || "jpg" || "png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传图片只能是 JPG/PNG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleAvatarSuccess1(res, file) {
      this.imageUrl1 = URL.createObjectURL(file.raw);
      this.signaturePath = res.entity[0];
      this.delImagePath.push(res.entity[0]);
      console.log("上传签名照成功");
    },

    init() {
      if (this.$refs.createFrom !== undefined) {
        if (this.$refs.createFrom !== undefined) {
          this.$refs.createFrom.resetFields();
        }
      }
      this.getRoleSel();
      this.GetAllFuncSort();
      if (this.Code) {
        this.$axios
          .get(this.$api.GetUser, { params: { key: this.Code } })
          .then(res => {
            if (res.data.status == 1) {
              this.fromData = res.data.entity;
              this.treeDefaultCheckd = res.data.entity.funcItems.split(",");
              this.imageUrl = this.basePath + res.data.entity.photo;
              this.imageUrl1 = this.basePath + res.data.entity.signature;
              this.photoPath = res.data.entity.photo;
              this.signaturePath = res.data.entity.signature;
              this.delImagePath.push(this.photoPath, this.signaturePath);
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    getImageByPath(imagePath) {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(this.$api.GetImage, { params: { imgPath: imagePath } })
          .then(res => {
            resolve(res);
          });
      });
    },
    //报告功能项目分级树形
    GetAllFuncSort() {
      this.$axios
        .get(this.$api.GetAllFuncSort)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.treeOptions = this.getOptionsData(res.data.entity);
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getOptionsData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].childrenNodes.length < 1) {
          data[i].childrenNodes = undefined;
        } else {
          this.getOptionsData(data[i].childrenNodes);
        }
      }
      return data;
    },
    //角色下拉框
    getRoleSel() {
      let that = this;
      that.$axios
        .get(that.$api.GetAllRoleList)
        .then(function(response) {
          if (response.data.status === 1) {
            that.roleList = response.data.entity;
          } else {
            that.$message.error(response.data.message);
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    submitForm() {
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.delImage();
          this.fromData.photo = this.photoPath;
          this.fromData.signature = this.signaturePath;
          let checkValue = this.$refs.tree.getCheckedKeys();
          this.fromData.funcItems = checkValue.join(",");
          this.fromData.oldOperatorCode = this.Code;
          this.$axios
            .post(this.$api.SaveUser, this.fromData)
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
          let data = this.fromData;
          if (
            data.operatorCode != "" &&
            data.roleCode != "" &&
            data.discountLowLimit != "" &&
            data.userName != ""
          ) {
            this.activeName = "third";
          } else {
            this.activeName = "first";
          }
        }
      });
    },
    delImage() {
      this.delImagePath.splice(this.delImagePath.indexOf(this.photoPath), 1);
      this.delImagePath.splice(this.delImagePath.indexOf(this.signaturePath));
      let fileNames = this.delImagePath;
      this.$axios.post(this.$api.FileDelete, fileNames);
    },
    close() {
      this.delImage();
      this.isShow = false;
      if (this.$refs["fromData"] !== undefined) {
        this.$refs["fromData"].resetFields();
      }
      this.fromData = {
        operatorCode: "",
        empNum: "",
        loginName: "",
        userName: "",
        idcardNum: "",
        pwd: "",
        tele: "",
        roleCode: "",
        discountLowLimit: null,
        funcItems: "",
        deptCodes: "",
        photo: "",
        signature: "",
        deleted: false,
        remark: "",
        canExcItemLimit:false
      };
      this.activeName = "first";
      this.treeOptions = new Array();
      this.treeDefaultCheckd = new Array();
      this.Code = "";
      this.imageUrl = this.imageUrl1 = "";
      this.delImagePath = new Array();
      this.photoPath = this.signaturePath = "";
    }
  }
};
</script>
<style>
.UserCreate .el-select {
  width: 178px;
}
.UserCreate .el-textarea {
  width: 180px;
}
.el-tree {
  min-width: 100%;
  display: inline-block;
}
.tree {
  overflow-y: auto;
  height: 350px;
  width: 475px;
  /*width:200px;*/
  /* border: 1px solid blue; */
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


