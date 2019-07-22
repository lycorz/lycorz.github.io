<template>
  <div id="MedicalAdviceCreate" class="MedicalAdviceCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="医学建议"
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
        <el-form-item label="建议名称" :label-width="formLabelWidth" prop="advName">
          <el-input v-model="fromData.advName"></el-input>
        </el-form-item>
        <el-form-item label="建议内容" :label-width="formLabelWidth" prop="advContent">
          <el-input type="textarea" autosize v-model="fromData.advContent"></el-input>
        </el-form-item>
        <el-form-item label="异常表达式" :label-width="formLabelWidth" prop="expression">
          <el-input style="width: 88%;" :disabled="true" v-model="fromData.expression"></el-input>
          <el-button type="text" @click="EditisShow = true">编辑</el-button>
        </el-form-item>
        <el-form-item label="建议类型" :label-width="formLabelWidth" prop="advType">
          <el-select v-model="fromData.advType" placeholder="请选择">
            <el-option
              v-for="item in AdvTypeItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="异常类集合" :label-width="formLabelWidth">
          <el-select v-model="fromData.advType" placeholder="请选择">
            <el-option
              v-for="item in AdvTypeItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="是否星标" :label-width="formLabelWidth">
          <el-select v-model="fromData.isStar" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" :label-width="formLabelWidth">
          <el-select v-model="fromData.priority" placeholder="请选择">
            <el-option
              v-for="item in priorityItems"
              :key="item.value"
              :value="item.value"
              :label="item.name"
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
    <el-dialog
      class="infoucs"
      width="560px"
      title="异常表达式"
      @open="dialogInit"
      @close="dialogClose"
      :visible.sync="EditisShow"
      :close-on-click-modal="false"
    >
      <el-row :gutter="5">
        <el-col :span="8">
          <el-select
            v-model="selval"
            @change="setOption"
            clearable
            filterable
            remote
            @clear="selclear"
            placeholder="请选择/搜索"
            :remote-method="getAbnormalItems"
            :loading="dialogSelLoading"
          >
            <el-option
              v-for="item in abnormalItems"
              :key="item.abnormalCode"
              :label="item.abnormalName"
              :value="item.abnormalCode"
              filter-placement="bottom-end"
            >{{item.abnormalName}}</el-option>
          </el-select>
        </el-col>
        <el-col style="margin-left:10px" :span="2">
          <el-button @click="left" type="text">(</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="right" type="text">)</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="or" type="text">或</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="and" type="text">且</el-button>
        </el-col>
        <el-col style=" padding-left: 92px;" :span="8">
          <el-button @click="VerifyExpr">[ 验 证 ]</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-popover
            placement="bottom"
            v-for="(tag,index) in dynamicTags"
            :key="index"
            :content="tag.name"
            :trigger="tag.name?'hover':''"
          >
            <el-tag
              slot="reference"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag.value}}</el-tag>
          </el-popover>
          <!-- <el-input type="textarea" id="edit" v-model="dialogVal" autosize></el-input> -->
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose()">取消</el-button>
        <el-button type="primary" @click="dialogSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import edit from "vue-quill-editor";
import { resolve, reject } from "q";

export default {
  name: "MedicalAdviceCreate",
  data() {
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        advCode: null,
        advName: "",
        advContent: "",
        isStar: false,
        advType: 1,
        priority: 100,
        expression: ""
      },
      priorityItems: [],
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
      AdvTypeItems: [],
      rules: {
        advName: [
          { required: true, message: "请输入建议名称", trigger: "blur" },
          { max: 100, message: "最大支持100个字符输入", trigger: "blur" }
        ],
        advContent: [
          { required: true, message: "请输入建议内容", trigger: "blur" },
          { max: 500, message: "最大支持100个字符输入", trigger: "blur" }
        ],
        expression: [
          { required: true, message: "请键入异常表达式", trigger: "change" }
        ]
      },

      /* dialog */
      abnormalItems: [],
      expressionIsTrue: 0, //0:未验证，1:验证成功,-1:验证失败
      selval: "",
      dialogVal: "",
      dialogSelLoading: false,

      //tag标签
      dynamicTags: []
    };
  },
  created() {
    this.getAbnormalItems();
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
          .get(that.$api.GetMedicalAdvice, {
            params: { advCode: that.Code }
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
            .post(this.$api.SaveMedicalAdvice, this.fromData)
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
        advName: "",
        advContent: "",
        isStar: false,
        advType: 1,
        priority: 100,
        expression: ""
      };
      this.Code = "";
    },

    /* dialog */
    dialogInit() {
      // $("#edit").val(this.fromData.expression);
      if (this.Code) {
        let items = this.fromData.expression.split(" ");
        items.forEach(ele => {
          let tag = {};
          tag.value = ele;
          if (ele.indexOf("[") != -1) {
            let code = ele.replace(/\[|]/g, "");
            let name = this.abnormalItems.find(z => z.abnormalCode == code)
              .abnormalName;
            tag.name = name;
          }
          this.dynamicTags.push(tag);
        });
      }
    },
    selclear() {
      this.getAbnormalItems();
    },
    getAbnormalItems(queryName) {
      if (queryName) {
        queryName = queryName.replace(/\s+/g, ""); //去空格
      }
      this.dialogSelLoading = true;
      this.$axios
        .get(this.$api.GetAbnormalListByIsCrisis, {
          params: { name: queryName }
        })
        .then(res => {
          this.dialogSelLoading = false;
          if (res.data.status == 1) {
            this.abnormalItems = res.data.entity;
          } else {
            console.error(res.data.message);
          }
        })
        .catch(err => {
          this.dialogSelLoading = false;
          console.error(err);
        });
    },
    //验证表达式
    VerifyExpr() {
      // let exprVal = this.content.replace(/<\/?.+?>/g, "").toString();
      let expressionValue = this.dynamicTags.map(z => z.value).join(" ");
      if (!expressionValue) {
        return this.$message.warning("请键入表达式");
      }
      this.$axios
        .get(this.$api.VerifyExpr, { params: { expr: expressionValue } })
        .then(res => {
          if (res.data.status == 1) {
            this.$message.success("正确");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    dialogSubmit() {
      // let expressionValue = $("#edit").val();
      let expressionValue = this.dynamicTags.map(z => z.value).join(" ");
      if (!expressionValue) {
        return this.$message.warning("请键入表达式");
      }
      new Promise((resolve, reject) => {
        this.$axios
          .get(this.$api.VerifyExpr, { params: { expr: expressionValue } })
          .then(res => {
            if (res.data.status == 1) {
              resolve(true);
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }).then(val => {
        this.fromData.expression = expressionValue;
        this.dialogClose();
      });
    },
    dialogClose() {
      this.EditisShow = false;
      this.dynamicTags = new Array();
      this.selval = "";
    },

    /* edit */
    setOption(val) {
      if (val) {
        let abnormalName = this.abnormalItems.find(z => z.abnormalCode == val)
          .abnormalName;
        let tag = { value: "[" + val + "]", name: abnormalName };
        this.dynamicTags.push(tag);
      }
    },
    left() {
      let tag = { value: "(" };
      this.dynamicTags.push(tag);
    },
    right() {
      let tag = { value: ") " };
      this.dynamicTags.push(tag);
    },
    or() {
      let tag = { value: "or" };
      this.dynamicTags.push(tag);
    },
    and() {
      let tag = { value: "and" };
      this.dynamicTags.push(tag);
    },

    //tag
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    }
  }
};
</script>
<style>
.el-row {
  margin-bottom: 3px;
}

.el-tag {
  margin-right: 10px;
  margin-top: 5px;
}

.el-tag + .el-tag {
  margin-right: 10px;
}
</style>


