<template>
  <div id="RoleCreate" class="RoleCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      height="600px"
      title="角色字典"
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
        <el-form-item label="角色编号" :label-width="formLabelWidth" prop="roleCode">
          <el-input v-model="fromData.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="fromData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="最低折扣" class="is-required" :label-width="formLabelWidth" prop="discountLowLimit">
          <el-input maxlength="4" v-model="fromData.discountLowLimit"></el-input>
        </el-form-item>
        <el-form-item label="排序号" :label-width="formLabelWidth" >
          <el-input v-model="fromData.orderNum"></el-input>
        </el-form-item>
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
  name: "RoleCreate",
  data() {
    var checkDic = (rule, value, callback) => {
      if (value != "") {
        var re = /^(0.\d+|0|1)$/;
        if (!re.test(value)) {
          callback(new Error("请输入0-1之间的小数(包括0和1)"));
        }
      }else{
        callback(new Error("请输入折扣"));
      }
      callback();
    };
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      treeOptions: [],
      treeDefaultCheckd: [],
      defaultProps: {
        children: "childrenNodes",
        label: "funcName"
      },
      fromData: {
        oldRoleCode: "",
        roleCode: "",
        roleName: "",
        funcCodes: "",
        discountLowLimit: 0,
        orderNum: 0
      },
      rules: {
        roleCode: [
          { required: true, message: "请输入角色编号", trigger: "blur" },
          { max: 5, message: "最大支持5个字符输入", trigger: "blur" }
        ],
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { max: 50, message: "最大支持50个字符输入", trigger: "blur" }
        ],
        discountLowLimit: [{ validator: checkDic, trigger: "blur" }]
      }
    };
  },
  created() {},
  inject: ["getData"],
  methods: {
    init() {
      if (this.$refs.createFrom !== undefined) {
         if (this.$refs.createFrom !== undefined) {
        this.$refs.createFrom.resetFields();
      }
      }
      this.GetAllFuncSort();
      if (this.Code) {
        this.$axios
          .get(this.$api.GetRole, { params: { key: this.Code } })
          .then(res => {
            if (res.data.status == 1) {
              this.fromData = res.data.entity;
              this.treeDefaultCheckd = res.data.entity.funcCodes.split(",");
              console.log(this.treeDefaultCheckd);
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
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
    submitForm() {
      let checkValue = this.$refs.tree.getCheckedKeys();
      this.fromData.funcCodes = checkValue.join(",");
      this.fromData.oldRoleCode = this.Code;
      console.log(this.fromData);
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.$axios
            .post(this.$api.SaveRole, this.fromData)
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
        oldRoleCode: "",
        roleCode: "",
        roleName: "",
        funcCodes: "",
        discountLowLimit: 0,
        orderNum: 0
      };
      this.treeOptions = new Array();
      this.treeDefaultCheckd = new Array();
      this.Code = "";
    }
  }
};
</script>
<style>
.RoleCreate .el-select {
  width: 178px;
}
.RoleCreate .el-textarea {
  width: 465px;
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
</style>


