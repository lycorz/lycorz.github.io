<template>
  <div id="PhysicsCreate" class="PhysicsCreate">
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
        <el-form-item label="模板编号" :label-width="formLabelWidth" prop="tmplCode">
          <el-input v-model="fromData.tmplCode"></el-input>
        </el-form-item>
        <el-form-item label="是否异常" :label-width="formLabelWidth">
          <el-select v-model="fromData.isAbnormal" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告子项目" :label-width="formLabelWidth" prop="rptSubItemCode">
          <el-select filterable v-model="fromData.rptSubItemCode" placeholder="请选择">
            <el-option
              v-for="item in rptItem"
              :key="item.subItemCode"
              :label="item.subItemName"
              :value="item.subItemCode"
              filter-placement="bottom-end"
            >{{item.subItemName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否默认选项" :label-width="formLabelWidth">
          <el-select v-model="fromData.isDefault" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-area" label="模版所见内容" :label-width="formLabelWidth" prop="finding">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="fromData.finding"
            autocomplete="off"
            maxlength="500"
          ></el-input>
        </el-form-item>
        <el-form-item class="el-area" label="模版所见小结" :label-width="formLabelWidth" prop="summary">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="fromData.summary"
            autocomplete="off"
            maxlength="500"
          ></el-input>
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
  name: "PhysicsCreate",
  data() {
    return {
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        oldTmplCode: "",
        parentCode: "",
        level: 0,
        tmplCode: "",
        rptSubItemCode: "",
        isAbnormal: false,
        isDefault: false,
        finding: "",
        summary: "",
        orderNum: 0
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
      rptItem: [],
      rules: {
        tmplCode: [
          { required: true, message: "请输入模板编号", trigger: "blur" },
          { min: 1, max: 10, message: "最大支持10个字符输入", trigger: "blur" }
        ],
        finding: [
          { max: 500, message: "最大支持500个字符输入", trigger: "blur" }
        ],
        summary: [
          { max: 500, message: "最大支持500个字符输入", trigger: "blur" }
        ],
        rptSubItemCode: [
          { required: true, message: "请选择子项目", trigger: "change" }
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
      this.getAllRptSubItemList();
      //   let that = this;
      //   if (this.Code != "") {
      //     that.$axios
      //       .get(that.$api.GetOrderItem, { params: { key: that.Code } })
      //       .then(res => {
      //         if (res.status == 200 && res.data.status == 1) {
      //           that.fromData = res.data.entity;
      //         } else {
      //           that.$message.error(res.data.message);
      //         }
      //       })
      //       .catch(err => {
      //         console.error(err);
      //       });
      //   } else {
      //   }
    },
    //报告子项目下拉框
    getAllRptSubItemList() {
      this.$axios
        .get(this.$api.GetAllRptSubItemList)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.rptItem = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //  { req: {
    //             OldTmplCode:this.fromData.oldTmplCode,
    //             TmplCode:this.fromData.tmplCode,
    //             ParentCode:this.fromData.parentCode,
    //             Level:this.fromData.level,
    //             RptSubItemCode:this.fromData.rptSubItemCode,
    //             Finding:this.fromData.finding,
    //             Summary:this.fromData.summary,
    //             IsAbnormal:this.fromData.isAbnormal,
    //             IsDefault:this.fromData.isDefault,
    //             OrderNum:this.fromData.orderNum
    //         } }
    submitForm() {
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          console.log(this.fromData);
          this.$axios
            .post(this.$api.SaveRptSubItemRstTmpl,this.fromData)
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
        oldTmplCode: "",
        parentCode: "",
        level: 0,
        tmplCode: "",
        rptSubItemCode: "",
        isAbnormal: false,
        isDefault: false,
        finding: "",
        summary: "",
        orderNum: 0
      };
    }
  }
};
</script>
<style>
</style>


