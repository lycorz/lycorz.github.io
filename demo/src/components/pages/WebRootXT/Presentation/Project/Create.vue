<template>
  <div id="ProjectCreate" class="ProjectCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="报告项目"
      :visible.sync="isShow"
      :before-close="close"
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
        <el-form-item label="报告项目编号" :label-width="formLabelWidth" prop="subItemCode">
          <el-input v-model="fromData.subItemCode"></el-input>
        </el-form-item>
        <el-form-item label="报告项目名称" :label-width="formLabelWidth" prop="subItemName">
          <el-input v-model="fromData.subItemName"></el-input>
        </el-form-item>
        <el-form-item label="排序号" :label-width="formLabelWidth" prop="orderNum">
          <el-input v-model.number="fromData.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-select v-model="fromData.isEnable" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="fromData.unit"></el-input>
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
  name: "ProjectCreate",
  data() {
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        oldSubItemCode: "",
        subItemCode: "",
        subItemName: "",
        itemCode: "",
        unit: "",
        orderNum: 0,
        isEnable: true // bool
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
        subItemCode: [
          { required: true, message: "报告项目编号", trigger: "blur" },
          { min: 1, max: 10, message: "最大支持10个字符输入", trigger: "blur" }
        ],
        subItemName: [
          { required: true, message: "报告项目名称", trigger: "blur" },
          { min: 1, max: 50, message: "最大支持100个字符输入", trigger: "blur" }
        ],
        orderNum: [
          { required: true, message: "请输入排序号", trigger: "blur" },
          { type: "number", message: "排序号必须为数字" }
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
          .get(that.$api.GetOrderItem, { params: { key: that.Code } })
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
          //   this.fromData.OldItemCode = this.Code;
          //子项目赋值
          this.$axios
            .post(this.$api.SaveRptSubItem, this.fromData)
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
        oldSubItemCode: "",
        subItemCode: "",
        subItemName: "",
        itemCode: "",
        unit: "",
        orderNum: "",
        isEnable: true // bool
      };
    }
  }
};
</script>
<style>
</style>


