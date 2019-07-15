<template>
  <div id="SmsCriticalTemplateCreate" class="SmsCriticalTemplateCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="危急值短信模版"
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
        <el-form-item label="模版编号" :label-width="formLabelWidth" prop="templateCode">
          <el-input v-model="fromData.templateCode"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型编号" :label-width="formLabelWidth" prop="typeCode">
          <el-input v-model="fromData.typeCode"></el-input>
        </el-form-item> -->
        <el-form-item label="危急值" :label-width="formLabelWidth" prop="criticalCode">
          <el-select v-model="fromData.criticalCode" placeholder="请选择">
            <el-option
              v-for="item in CriticalItems"
              :key="item.abnormalCode"
              :label="item.abnormalName"
              :value="item.abnormalCode"
              filter-placement="bottom-end"
            >{{item.abnormalName}}</el-option>
          </el-select>
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
  name: "SmsCriticalTemplateCreate",
  data() {
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      CriticalItems: [],
      fromData: {
        templateCode: "",
        typeCode: "002",
        criticalCode: "",
        templateContent: ""
      },
      rules: {
        // typeCode: [
        //   { required: true, message: "请输入类型编号", trigger: "blur" },
        //   { max: 3, message: "最大支持3个字符输入", trigger: "blur" }
        // ],
        templateCode: [
          { required: true, message: "请输入模版编号", trigger: "blur" },
          { max: 10, message: "最大支持10个字符输入", trigger: "blur" }
        ],
        criticalCode: [
          { required: true, message: "请选择危急值", trigger: "change" }
        ],
        type: [{ max: 200, message: "最大支持200个字符输入", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getCriticalItems();
  },
  inject: ["getData"],
  methods: {
    getCriticalItems() {
      this.$axios
        .get(this.$api.GetAbnormalListByIsCrisis, { params: { req: true } })
        .then(res => {
          if (res.data.status == 1) {
            this.CriticalItems = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    init() {
      if (this.$refs.createFrom !== undefined) {
        this.$refs.createFrom.resetFields();
      }
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetSmsCriticalTemplate, {
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
          this.fromData.oldTemplateCode = this.Code;
          this.$axios
            .post(this.$api.SaveSmsCriticalTemplate, this.fromData)
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
        templateCode: "",
        typeCode: "002",
        criticalCode: "",
        templateContent: ""
      };
      this.Code = "";
    }
  }
};
</script>
<style>
</style>


