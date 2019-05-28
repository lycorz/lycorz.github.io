<template>
  <div id="QuestionnaireCreate" class="QuestionnaireCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="问卷结果获取异常规则"
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
        <el-form-item label="题目" :label-width="formLabelWidth" prop="questionNum">
          <el-select
            filterable
            v-model="fromData.questionNum"
            @change="getAnswers"
            placeholder="请选择"
          >
            <el-option
              v-for="item in questionItems"
              :key="item.ID"
              :label="item.Content"
              :value="item.ID"
              filter-placement="bottom-end"
            >{{item.Content}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth" prop="answerNum">
          <el-select
            filterable
            :multiple="ismultiple"
            :collapse-tags="istags"
            v-model="fromData.answerNum"
            placeholder="请选择"
          >
            <el-option
              v-for="item in answerItems"
              :key="item.Title"
              :label="item.Content"
              :value="item.Title"
              filter-placement="bottom-end"
            >{{item.Content}}</el-option>
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
  name: "QuestionnaireCreate",
  data() {
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      ismultiple: false,
      istags: false,
      fromData: {
        ruleCode: null,
        abnormalCode: "",
        answerNum: "",
        questionNum: ""
      },
      questionItems: [],
      answerItems: [],
      rules: {
        questionNum: [
          { required: true, message: "请选择答案", trigger: "change" }
        ],
        answerNum: [
          { required: true, message: "请选择问题", trigger: "change" }
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
      this.getAllQuestion();
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetAbnormalRulePaperByRuleCode, {
            params: { ruleCode: that.Code }
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              let ismultiple = this.questionItems.find(
                z => z.ID === res.data.entity.questionNum
              ).Type;
              if (ismultiple) {
                that.fromData = {
                  abnormalCode: res.data.entity.abnormalCode,
                  answerNum: res.data.entity.answerNum.split(","),
                  questionNum: res.data.entity.questionNum,
                  ruleCode: res.data.entity.ruleCode
                };
              } else {
                that.fromData = res.data.entity;
              }
              this.getAnswers(that.fromData.questionNum, false);
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
    getAllQuestion() {
      let that = this;
      that.$axios
        .get(that.$api.GetAllQuestion)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            let jsonStr = res.data.entity;
            that.questionItems = JSON.parse(jsonStr);
          } else {
            that.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getAnswers(val, isLoad) {
      let that = this;
      this.istags = this.ismultiple = this.questionItems.find(
        z => z.ID == val
      ).Type;
      if (isLoad == undefined) {
        if (this.ismultiple) {
          this.fromData.answerNum = new Array();
        } else {
          this.fromData.answerNum = "";
        }
      }
      that.$axios
        .get(that.$api.GetAllAnswerByQuesNo, { params: { questionNo: val } })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            let jsonStr = res.data.entity;
            that.answerItems = JSON.parse(jsonStr);
          } else {
            that.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    submitForm() {
      let isArr = this.fromData.answerNum instanceof Array;
      if (isArr) {
        this.fromData.answerNum = this.fromData.answerNum.join(",");
      }
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.fromData.ruleCode = this.Code;
          this.$axios
            .post(this.$api.SaveAbnormalRulePaper, this.fromData)
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
      this.istags = false;
      this.ismultiple = false;
      this.Code = "";
      this.fromData = {
        abnormalCode: "",
        answerNum: "",
        questionNum: ""
      };
    }
  }
};
</script>
<style>
.QuestionnaireCreate .el-select {
  width: 480px;
}
</style>


