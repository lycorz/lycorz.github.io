<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://192.168.0.254:8889/api/XT/FileUpload"
      :show-file-list="false"
      ref="up2"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-change="onChange"
      :auto-upload="false"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-upload
      action="http://192.168.0.254:8889/api/XT/FileUpload"
      list-type="picture-card"
      ref="up1"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :auto-upload="false"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <el-upload
      class="upload-css"
      :file-list="uploadFiles"
      ref="upload"
      :on-success="upLoadSuccess"
      :on-error="upLoadError"
      :action="uploadURL"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
  </div>
</template>
<style>
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
<script>
export default {
  props: [],
  data() {
    return {
      //   projectName: "",
      //uploadURL: "/project/upload?a=1",
      uploadFiles: [], //上传的文件列表
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: ""
    };
  },
  computed: {
    //文件的上传路径
    //附带用户id和项目名称
    uploadURL: function() {
      return this.$api.FileUpload;
    }
  },
  methods: {
    onChange(file) {
       this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(res, file) {
      alert(111);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //文件上传
    submitUpload() {
      this.$refs.up2.submit();
    },
    //文件上传成功时的钩子
    upLoadSuccess(response, file, fileList) {
      if (response == "ok") {
        console.log(response + "已上传" + file);
        console.log("项目添加成功");
      } else {
        console.log("项目添加失败");
      }
    },
    //文件上传失败时的钩子
    upLoadError(response, file, fileList) {
      console.log("项目添加失败");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>