<template>
  <div id="CostCreate" class="CostCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="成本设置"
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
        <el-form-item label="成本编号" :label-width="formLabelWidth" prop="costCode">
          <el-input v-model="fromData.costCode"></el-input>
        </el-form-item>
        <el-form-item label="成本名称" :label-width="formLabelWidth" prop="costName">
          <el-input v-model="fromData.costName"></el-input>
        </el-form-item>
        <el-form-item label="成本类型" :label-width="formLabelWidth" prop="costType">
          <el-select v-model="fromData.costType" placeholder="请选择">
            <el-option
              v-for="item in CostTypeItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="排序号" :label-width="formLabelWidth">
          <el-input v-model="fromData.orderNum"></el-input>
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
  name: "CostCreate",
  data() {
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      CostTypeItems: [],
      fromData: {
        costCode: "",
        costName: "",
        costType: null,
        orderNum: 0
      },
      rules: {
        costCode: [
          { required: true, message: "请输入成本编号", trigger: "blur" },
          { max: 3, message: "最大支持3个字符输入", trigger: "blur" }
        ],
        costName: [
          { required: true, message: "请输入成本名称", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        costType: [
          { required: true, message: "请选择成本类型", trigger: "change" }
        ],
      }
    };
  },
  created() {
  },
  inject: ["getData"],
  methods: {
    init() {
      if (this.$refs.createFrom !== undefined) {
        this.$refs.createFrom.resetFields();
      }
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetCost, {
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
          this.fromData.oldCostCode = this.Code;
          this.$axios
            .post(this.$api.SaveCost, this.fromData)
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
       costCode: "",
        costName: "",
        costType: null,
        orderNum: 0
      };
      this.Code = "";
    }
  }
};
</script>
<style>
</style>


