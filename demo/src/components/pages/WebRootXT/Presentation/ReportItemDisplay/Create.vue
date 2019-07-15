<template>
  <div id="ReportItemDisplayCreate" class="ReportItemDisplayCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="报告屏蔽项目"
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
        <el-form-item label="报告组合项目" :label-width="formLabelWidth" prop="itemCode">
          <el-select v-model="fromData.itemCode" placeholder="请选择">
            <el-option
              v-for="item in RptItems"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
              filter-placement="bottom-end"
            >{{item.itemName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示类型" :label-width="formLabelWidth" prop="displayType">
          <el-select v-model="fromData.displayType" placeholder="请选择">
            <el-option
              v-for="item in DisplayTypeItems"
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
  name: "ReportItemDisplayCreate",
  data() {
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        itemCode: "",
        displayType: null
      },
      DisplayTypeItems: [],
      RptItems: [],
      rules: {
        itemCode: [
          { required: true, message: "请选择报告项目分类", trigger: "change" }
        ],
        displayType: [
          { required: true, message: "请选择显示类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getRptItems();
  },
  inject: ["getData"],
  methods: {
    getRptItems() {
      this.$axios
        .get(this.$api.GetAllRptItemList)
        .then(res => {
          if (res.data.status == 1) {
            this.RptItems = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    init() {
      if (this.$refs.createFrom !== undefined) {
        this.$refs.createFrom.resetFields();
      }
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetReportItemDisplay, {
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
          this.fromData.oldItemCode = this.Code;
          this.$axios
            .post(this.$api.SaveReportItemDisplay, this.fromData)
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
        itemCode: "",
        displayType: null
      };
      this.Code = "";
    }
  }
};
</script>
<style>
</style>


