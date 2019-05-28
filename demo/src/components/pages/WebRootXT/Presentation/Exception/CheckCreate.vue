<template>
  <div id="NotCheckCreate" class="NotCheckCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="结果类型规则"
      :visible.sync="firstIsShow"
      :before-close="fclose"
      @open="finit"
      :close-on-click-modal="false"
    >
      <el-form
        :model="fromData1"
        ref="createFrom1"
        label-width="50px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="报告子项目" :label-width="formLabelWidth" prop="rptSubItemCode">
          <el-select filterable v-model="fromData1.rptSubItemCode" placeholder="请选择">
            <el-option
              v-for="item in rptSubItem"
              :key="item.subItemCode"
              :label="item.subItemName"
              :value="item.subItemCode"
              filter-placement="bottom-end"
            >{{item.subItemName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结果类型" :label-width="formLabelWidth" prop="resultType">
          <el-select filterable v-model="fromData1.resultType" placeholder="请选择">
            <el-option
              v-for="item in resultTypeItem"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fclose()">取消</el-button>
        <el-button type="primary" @click="fsubmitForm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="infoucs"
      width="660px"
      title="关键词类型规则"
      :visible.sync="secondIsShow"
      :before-close="sclose"
      @open="sinit"
      :close-on-click-modal="false"
    >
      <el-form
        :model="fromData2"
        ref="createFrom2"
        label-width="50px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="报告子项目" :label-width="formLabelWidth" prop="rptSubItemCode">
          <el-select filterable v-model="fromData2.rptSubItemCode" placeholder="请选择">
            <el-option
              v-for="item in rptSubItem"
              :key="item.subItemCode"
              :label="item.subItemName"
              :value="item.subItemCode"
              filter-placement="bottom-end"
            >{{item.subItemName}}</el-option>
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
        <el-button @click="sclose()">取消</el-button>
        <el-button type="primary" @click="ssubmitForm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="infoucs"
      width="660px"
      title="上下限规则"
      :visible.sync="thirdIsShow"
      :before-close="tclose"
      @open="tinit"
      :close-on-click-modal="false"
    >
      <el-form
        :model="fromData3"
        ref="createFrom3"
        label-width="50px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="报告子项目" :label-width="formLabelWidth">
          <el-select filterable v-model="fromData3.rptSubItemCode" placeholder="请选择">
            <el-option
              v-for="item in rptSubItem"
              :key="item.subItemCode"
              :label="item.subItemName"
              :value="item.subItemCode"
              filter-placement="bottom-end"
            >{{item.subItemName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上限" :label-width="formLabelWidth">
          <el-input v-model="fromData3.upperLimit"></el-input>
        </el-form-item>
        <el-form-item label="下限" :label-width="formLabelWidth">
          <el-input v-model="fromData3.lowerLimit"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tclose()">取消</el-button>
        <el-button type="primary" @click="tsubmitForm">确定</el-button>
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
      formLabelWidth: "100px",
      rptSubItem: [],
      /*    dialog1     */
      firstIsShow: false,
      fromData1: {
        ruleCode: null,
        abnormalCode: "",
        rptSubItemCode: "",
        resultType: ""
      },
      rules1: {
        rptSubItemCode: [
          { required: true, message: "请选择项目", trigger: "change" }
        ],
        resultType: [
          { required: true, message: "请选择项目", trigger: "change" }
        ]
      },
      resultTypeItem: [
        {
          value: "H",
          name: "偏高"
        },
        {
          value: "L",
          name: "偏低"
        },
        {
          value: "N",
          name: "正常"
        }
      ],
      /*    dialog2     */
      secondIsShow: false,
      fromData2: {
        ruleCode: null,
        abnormalCode: "",
        rptSubItemCode: "",
        keys: ""
      },
      rules2: {
        rptSubItemCode: [
          { required: true, message: "请选择项目", trigger: "change" }
        ]
      },
      //tag标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",

      /*    dialog3     */
      thirdIsShow: false,
      fromData3: {
        ruleCode: null,
        abnormalCode: "",
        rptSubItemCode: "",
        upperLimit: "",
        lowerLimit: ""
      },
      rules3: {
        rptSubItemCode: [
          { required: true, message: "请选择项目", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  inject: ["firstInit", "secondInit", "thirdInit"],
  methods: {
    finit() {
      this.getAllRptSubItemList();
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetRuleLisByRuleCode, {
            params: { ruleCode: that.Code }
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              that.fromData1 = res.data.entity;
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
    sinit() {
      this.getAllRptSubItemList();
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetRuleLisByRuleCode, {
            params: { ruleCode: that.Code }
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              that.fromData2 = res.data.entity;
              let tags = that.fromData2.keys.split("#");
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
    tinit() {
      this.getAllRptSubItemList();
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetRuleLisByRuleCode, {
            params: { ruleCode: that.Code }
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              that.fromData3 = res.data.entity;
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
        .get(this.$api.GetAllRptSubItemList)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.rptSubItem = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    fsubmitForm() {
      this.$refs.createFrom1.validate(valid => {
        if (valid) {
          this.fromData1.ruleCode = this.Code;
          this.$axios
            .post(this.$api.SaveAbnormalRuleLis, this.fromData1)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("保存成功！");
                this.fclose();
                this.firstInit();
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
    ssubmitForm() {
      this.$refs.createFrom2.validate(valid => {
        if (valid) {
          this.fromData2.ruleCode = this.Code;
          this.fromData2.keys = this.dynamicTags.join("#");
          this.$axios
            .post(this.$api.SaveAbnormalRuleLis, this.fromData2)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("保存成功！");
                this.sclose();
                this.secondInit();
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
    tsubmitForm() {
      this.$refs.createFrom3.validate(valid => {
        let up = parseFloat(this.fromData3.upperLimit);
        let low = parseFloat(this.fromData3.lowerLimit);
        if(low>up){
          return this.$message.error("下限不得高于上限");
        }
        if (valid) {
          this.fromData3.ruleCode = this.Code;
          this.$axios
            .post(this.$api.SaveAbnormalRuleLis, this.fromData3)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("保存成功！");
                this.tclose();
                this.thirdInit();
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
    fclose() {
      this.firstIsShow = false;
      if (this.$refs["fromData1"] !== undefined) {
        this.$refs["fromData1"].resetFields();
      }
      this.fromData1 = {
        ruleCode: null,
        abnormalCode: "",
        rptSubItemCode: "",
        resultType: ""
      };
      this.Code = "";
    },
    sclose() {
      this.secondIsShow = false;
      if (this.$refs["fromData2"] !== undefined) {
        this.$refs["fromData2"].resetFields();
      }
      this.fromData2 =  {
        ruleCode: null,
        abnormalCode: "",
        rptSubItemCode: "",
        keys: ""
      };
      this.Code = "";
      this.dynamicTags = [];
      this.inputVisible = false;
      this.inputValue = "";
    },
    tclose() {
      this.thirdIsShow = false;
      if (this.$refs["fromData3"] !== undefined) {
        this.$refs["fromData3"].resetFields();
      }
      this.fromData3 ={
        ruleCode: null,
        abnormalCode: "",
        rptSubItemCode: "",
        upperLimit: "",
        lowerLimit: ""
      };
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


