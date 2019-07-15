<template>
  <div id="DistributionTypeCreate" class="DistributionTypeCreate">
    <el-dialog
      class="infoucs"
      width="700px"
      title="分成类型"
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
        <el-form-item label="分成类型编号" :label-width="formLabelWidth" prop="distributionTypeCode">
          <el-input v-model="fromData.distributionTypeCode"></el-input>
        </el-form-item>
        <el-form-item label="分成类型名称" :label-width="formLabelWidth" prop="distributionTypeName">
          <el-input v-model="fromData.distributionTypeName"></el-input>
        </el-form-item>
        <el-form-item
          class="is-required"
          label="分成比例"
          :label-width="formLabelWidth"
          prop="distributionCoefficient"
        >
          <el-input v-model="fromData.distributionCoefficient"></el-input>
        </el-form-item>
        <el-form-item label="包含科室" :label-width="formLabelWidth" prop="DistributionTypeType">
          <el-transfer
            v-model="transferValue"
            filterable
            :titles="['选择列表', '添加列表']"
            filter-placeholder="请输入"
            :props="{key: 'deptCode',label: 'deptName'}"
            :data="transferData"
          ></el-transfer>
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
  name: "DistributionTypeCreate",
  data() {
    var checkDic = (rule, value, callback) => {
      if (value || value == 0) {
        var re = /^(0.\d{1,2}|0|1)$/;
        if (!re.test(value)) {
          callback(new Error("请输入0-1之间的小数(包括0和1),小数点后最多两位"));
        }
      } else {
        callback(new Error("请输入分成比例"));
      }
      callback();
    };
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      DistributionTypeTypeItems: [],
      transferData: [],
      transferValue: [],
      fromData: {
        oldDistributionTypeCode: "",
        distributionTypeCode: "",
        distributionTypeName: "",
        distributionTypeVSDepts: [],
        distributionCoefficient: null
      },
      rules: {
        distributionTypeCode: [
          { required: true, message: "请输入分成类型编号", trigger: "blur" },
          { max: 5, message: "最大支持5个字符输入", trigger: "blur" }
        ],
        distributionTypeName: [
          { required: true, message: "请输入分成类型名称", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        distributionCoefficient: [{ validator: checkDic, trigger: "blur" }]
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
      this.getAllDept();
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetDistributionType, {
            params: { key: that.Code }
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              that.fromData = res.data.entity;
              if (res.data.entity.distributionTypeVSDepts.length > 0) {
                res.data.entity.distributionTypeVSDepts.forEach(item => {
                  this.transferValue.push(item.deptCode);
                  console.log(this.transferValue);
                });
              }
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
    getAllDept() {
      this.$axios
        .get(this.$api.GetListByDistributionType, {
          params: { distributionTypeCode: this.Code }
        })
        .then(res => {
          if (res.data.status == 1) {
            this.transferData = res.data.entity;
          } else {
            this.$message.error("获取科室列表失败，请稍后重试");
            console.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    submitForm() {
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.fromData.distributionTypeVSDepts = new Array();
          this.transferValue.forEach(item => {
            this.fromData.distributionTypeVSDepts.push({
              deptCode: item,
              distributionTypeCode: this.fromData.distributionTypeCode
            });
          });
          this.fromData.oldDistributionTypeCode = this.Code;
          this.$axios
            .post(this.$api.SaveDistributionType, this.fromData)
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
        oldDistributionTypeCode: "",
        distributionTypeCode: "",
        distributionTypeName: "",
        distributionTypeVSDepts: new Array(),
        distributionCoefficient: null
      };
      this.Code = "";
      this.transferValue = this.transferData = new Array();
    }
  }
};
</script>
<style>
</style>


