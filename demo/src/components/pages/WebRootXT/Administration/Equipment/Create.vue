<template>
  <div id="EquipmentCreate" class="EquipmentCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="设备字典"
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
        :inline="true"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="设备编号" :label-width="formLabelWidth" prop="equipmentCode">
          <el-input v-model="fromData.equipmentCode"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth" prop="equipmentName">
          <el-input v-model="fromData.equipmentName"></el-input>
        </el-form-item>
        <el-form-item label="购入日期" :label-width="formLabelWidth" prop="purchaseDate">
          <el-date-picker
            v-model="fromData.purchaseDate"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="检修周期(天)" :label-width="formLabelWidth" prop="checkCycle">
          <el-input v-model.number="fromData.checkCycle"></el-input>
        </el-form-item>
        <el-form-item label="责任人" :label-width="formLabelWidth" prop="operatorName">
          <el-input v-model="fromData.operatorName"></el-input>
        </el-form-item>
        <el-form-item label="检修电话" :label-width="formLabelWidth" prop="tele">
          <el-input v-model="fromData.tele"></el-input>
        </el-form-item>
        <el-form-item label="存放位置" :label-width="formLabelWidth" prop="position">
          <el-input v-model="fromData.position"></el-input>
        </el-form-item>
        <el-form-item label="用途" :label-width="formLabelWidth" prop="purpose">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            maxlength="500"
            autocomplete="off"
            v-model="fromData.purpose"
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
export default {
  name: "EquipmentCreate",
  data() {
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        oldEquipmentCode: "",
        equipmentCode: "",
        equipmentName: "",
        purchaseDate: null,
        purpose: "",
        operatorName: "",
        tele: "",
        position: "",
        status: 1, //默认正常
        checkCycle: 7
      },
      rules: {
        equipmentCode: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
          { max: 5, message: "最大支持5个字符输入", trigger: "blur" }
        ],
        equipmentName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
          { max: 100, message: "最大支持100个字符输入", trigger: "blur" }
        ],
        purchaseDate: [
          { required: true, message: "请选择购入日期", trigger: "change" }
        ],
        purpose: [
          { max: 500, message: "最大支持500个字符输入", trigger: "blur" }
        ],
        operatorName: [
          { required: true, message: "请输入责任人姓名", trigger: "blur" },
          { max: 100, message: "最大支持100个字符输入", trigger: "blur" }
        ],
        checkCycle: [
          { required: true, message: "请输入设备维护周期", trigger: "blur" },
          { type: "number", message: "设备维护周期必须为数字" }
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
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetEquipment, {
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
          this.fromData.oldEquipmentCode = this.Code;
          this.$axios
            .post(this.$api.SaveEquipment, this.fromData)
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
        oldEquipmentCode: "",
        equipmentCode: "",
        equipmentName: "",
        purchaseDate: null,
        purpose: "",
        operatorName: "",
        tele: "",
        position: "",
        status: 1, //默认正常
        checkCycle: 7
      };
      this.Code = "";
    }
  }
};
</script>
<style>
.EquipmentCreate .el-date-editor {
  width: 178px;
}
.EquipmentCreate .el-textarea {
  width: 465px;
}
</style>


