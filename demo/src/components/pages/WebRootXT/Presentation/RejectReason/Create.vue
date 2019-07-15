<template>
  <div id="RejectReasonCreate" class="RejectReasonCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="驳回原因"
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
        <el-form-item label="驳回原因" :label-width="formLabelWidth" prop="rejectReason">
          <el-input type="textarea" autosize v-model="fromData.rejectReason"></el-input>
        </el-form-item>
        <el-form-item label="驳回类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="fromData.type" placeholder="请选择">
            <el-option
              v-for="item in RejectTypeItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
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
  name: "RejectReasonCreate",
  data() {
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        innerCode: null,
        type: 1,
        rejectReason: ""
      },
      RejectTypeItems: [],
      rules: {
        rejectReason: [
          { required: true, message: "请输入驳回原因", trigger: "blur" },
          { max: 200, message: "最大支持200个字符输入", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择驳回类型", trigger: "change" }]
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
          .get(that.$api.GetRejectReason, {
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
          this.fromData.oldInnerCode = this.Code;
          this.$axios
            .post(this.$api.SaveRejectReason, this.fromData)
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
        type: 1,
        rejectReason: ""
      };
      this.Code = "";
    }
  }
};
</script>
<style>
</style>


