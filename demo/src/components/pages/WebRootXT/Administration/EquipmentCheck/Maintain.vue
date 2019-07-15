<template>
  <div id="EquipmentCheckMaintain" class="EquipmentCheckMaintain">
    <el-dialog
      class="infoucs"
      width="560px"
      title="设备维护"
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
        <el-form-item label="检查人" :label-width="formLabelWidth" prop="operatorName">
          <el-input v-model="fromData.operatorName"></el-input>
        </el-form-item>
        <el-form-item label="设备状态" :label-width="formLabelWidth" prop="checkStatus">
          <el-select v-model="fromData.checkStatus" placeholder="请选择">
            <el-option
              v-for="item in statusTypeItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检查描述" :label-width="formLabelWidth" prop="checkSummary">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            maxlength="200"
            autocomplete="off"
            v-model="fromData.checkSummary"
          ></el-input>
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
import moment from "moment";
export default {
  name: "EquipmentCheckMaintain",
  data() {
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      statusTypeItems: [],
      fromData: {
        innerCode: null,
        equipmentCode: "",
        checkDate: null,
        checkSummary: "",
        checkStatus: null,
        operatorName: ""
      },
      rules: {
        operatorName: [
          { required: true, message: "请输入检查人", trigger: "blur" },
          { max: 100, message: "最大支持100个字符输入", trigger: "blur" }
        ],
        checkStatus: [
          { required: true, message: "请选择设备状态", trigger: "change" }
        ],
        checkSummary: [
          { max: 200, message: "最大支持200个字符输入", trigger: "blur" }
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
      this.getStatusType();
    },
    submitForm() {
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.fromData.equipmentCode = this.Code;
          this.fromData.checkDate = moment();
          console.log(this.fromData);
          this.$axios
            .post(this.$api.SaveEquipmentCheck, this.fromData)
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
        innerCode: null,
        equipmentCode: "",
        checkDate: null,
        checkSummary: "",
        checkStatus: null,
        operatorName: ""
      };
      this.Code = "";
    },
    getStatusType() {
      this.$getType("StatusType")
        .then(res => {
          if (res.data.status == 1) {
            this.statusTypeItems = res.data.entity;
          } else {
            console.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style>
/* .EquipmentCheckMaintain .el-date-editor {
  width: 178px;
}
.EquipmentCheckMaintain .el-textarea {
  width: 465px;
} */
</style>


