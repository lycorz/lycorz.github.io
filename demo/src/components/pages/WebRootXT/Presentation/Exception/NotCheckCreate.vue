<template>
  <div id="NotCheckCreate" class="NotCheckCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="非检验项目获取异常规则"
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
        <el-form-item label="报告子项目" :label-width="formLabelWidth" prop="rptItemCode">
          <el-select filterable v-model="fromData.rptItemCode" placeholder="请选择">
            <el-option
              v-for="item in rptItem"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
              filter-placement="bottom-end"
            >{{item.itemName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词" :label-width="formLabelWidth" prop="abnormalName">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
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
  name: "NotCheckCreate",
  data() {
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        ruleCode: null,
        abnormalCode: "",
        rptItemCode: "",
        keys: ""
      },
      rules: {
        rptItemCode: [
          { required: true, message: "请选择项目", trigger: "change" }
        ]
      },
      rptItem: [],
      //tag标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
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
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetAbnormalRuleNotLisByRuleCode, {
            params: { ruleCode: that.Code }
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              that.fromData = res.data.entity;
              let tags = that.fromData.keys.split("#");
              that.dynamicTags = tags;
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

    //获取报告子项目
    getAllRptSubItemList() {
      this.$axios
        .get(this.$api.GetAllRptItemList)
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

    submitForm() {
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.fromData.ruleCode = this.Code;
          this.fromData.keys = this.dynamicTags.join("#");
          console.log(this.fromData.keys);
          this.$axios
            .post(this.$api.SaveAbnormalRuleNotLis, this.fromData)
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
        ruleCode: null,
        abnormalCode: "",
        rptItemCode: "",
        keys: ""
      };
      this.dynamicTags = [];
      this.inputVisible = false;
      this.inputValue = "";
      this.Code = "";
    },

    //tag
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;

      if (inputValue) {
        var values = inputValue.split(/[,， \n]/).filter(item => {
          return item != "" && item != undefined;
        });

        values.forEach(element => {
          var index = this.dynamicTags.findIndex(i => {
            return i == element;
          });

          if (index < 0) {
            this.dynamicTags.push(element);
          }
        });
      }

      this.inputVisible = false;

      this.inputValue = "";
    }
  }
};
</script>
<style>
.el-tag {
  margin-right: 10px;
  margin-top: 5px;
}

.el-tag + .el-tag {
  margin-right: 10px;
}

.button-new-tag {
  height: 32px;

  line-height: 30px;

  padding-top: 0;

  padding-bottom: 0;

  margin-top: 5px;
}

.input-new-tag {
  width: 100px;
  margin-right: 10px;
  vertical-align: bottom;
}
</style>


