<template>
  <div id="ExceptionCreate" class="ExceptionCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="新建"
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
        <el-form-item label="模板编号" :label-width="formLabelWidth" prop="abnormalCode">
          <el-input v-model="fromData.abnormalCode"></el-input>
        </el-form-item>
        <el-form-item label="异常名称" :label-width="formLabelWidth" prop="abnormalName">
          <el-input v-model="fromData.abnormalName"></el-input>
        </el-form-item>
        <el-form-item label="是否危急值" :label-width="formLabelWidth">
          <el-select v-model="fromData.isCrisis" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
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
  name: "ExceptionCreate",
  data() {
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        abnormalCode: "",
        abnormalName: "",
        isCrisis: false,
        oldAbnormalCode: ""
      },
      boolItems: [
        {
          name: "是",
          value: true
        },
        {
          name: "否",
          value: false
        }
      ],
      rules: {
        abnormalCode: [
          { required: true, message: "请输入异常编号", trigger: "blur" },
          { min: 1, max: 10, message: "最大支持10个字符输入", trigger: "blur" }
        ],
        abnormalName: [
          { required: true, message: "请输入异常名称", trigger: "blur" },
          { max: 500, message: "最大支持100个字符输入", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  inject: ["getData"],
  methods: {
    init() {
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetAbnormal, {
            params: { abnormalCode: that.Code }
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
          this.fromData.oldTmplCode = this.Code;
          this.$axios
            .post(this.$api.SaveAbnormal, this.fromData)
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
      this.fromData =  {
        abnormalCode: "",
        abnormalName: "",
        isCrisis: false,
        oldAbnormalCode: ""
      };
    }
  }
};
</script>
<style>
</style>


