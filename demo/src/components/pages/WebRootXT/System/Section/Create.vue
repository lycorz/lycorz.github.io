<template>
  <div id="SectionCreate" class="SectionCreate">
    <el-dialog
      class="infoucs"
      width="460px"
      title="科室"
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
        <el-form-item label="科室编号" :label-width="formLabelWidth" prop="deptCode">
          <el-input v-model="fromData.deptCode"></el-input>
        </el-form-item>
        <el-form-item label="科室名称" :label-width="formLabelWidth" prop="deptName">
          <el-input v-model="fromData.deptName"></el-input>
        </el-form-item>
        <el-form-item label="排队标记" :label-width="formLabelWidth" prop="level">
          <el-select v-model="fromData.isQueue" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.label}}</el-option>
          </el-select>
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
  name: "SectionCreate",
  data() {
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        oldDeptCode: "",
        deptCode: "",
        deptName: "",
        isQueue: false
      },
      boolItems: [
        {
          label: "是",
          value: true
        },
        {
          label: "否",
          value: false
        }
      ],
      rules: {
        deptCode: [
          { required: true, message: "请输入科室编号", trigger: "blur" },
          { max: 5, message: "最大支持5个字符输入", trigger: "blur" }
        ],
        deptName: [
          { required: true, message: "请输入科室名称", trigger: "blur" },
          { max: 50, message: "最大支持50个字符输入", trigger: "blur" }
        ]
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
      if (this.Code) {
        this.$axios
          .get(this.$api.GetDept, { params: { key: this.Code } })
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
      this.fromData.oldDeptCode = this.Code;
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.$axios
            .post(this.$api.SaveDept, this.fromData)
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
        deptCode: "",
        deptName: "",
        isQueue: false
      };
      this.Code = "";
    }
  }
};
</script>
<style>
</style>


