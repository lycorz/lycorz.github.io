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
         <el-form-item label="题目" :label-width="formLabelWidth" prop="questionContent">
          <el-select filterable v-model="fromData.questionContent" @change="getAnswers" placeholder="请选择">
            <el-option
              v-for="item in questionItems"
              :key="item.ID"
              :label="item.Content"
              :value="item.ID"
              filter-placement="bottom-end"
            >{{item.Content}}</el-option>
          </el-select>
        </el-form-item>
            <el-form-item label="答案" :label-width="formLabelWidth" prop="answerContent">
         <el-select filterable v-model="fromData.answerContent" placeholder="请选择">
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
      fromData: {
        ruleCode: null,
        abnormalCode: "",
        answerContent: "",
        questionContent: ""
      },
      questionItems:[],
      answerItems:[],
      rules: {
        questionContent: [
          { required: true, message: "请选择答案", trigger: "change" }
        ],
        answerContent: [
          { required: true, message: "请选择问题", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  inject: ["getData"],
  methods: {
    init() {
      this.getAllQuestion();
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetAbnormalRulePaperByRuleCode, {
            params: { ruleCode: that.Code }
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
    getAllQuestion(){
      let that = this;
       that.$axios
          .get(that.$api.GetAllQuestion)
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              let jsonStr = res.data.entity;
              that.questionItems = JSON.parse(jsonStr);
              console.log(jsonStr);  
              console.log(that.questionItems);
                          
            } else {
              that.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
    },
    getAnswers(val){
       let that = this;
       that.$axios
          .get(that.$api.GetAllAnswerByQuesNo,{params:{ questionNo: val}})
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              let jsonStr = res.data.entity;
              that.answerItems = JSON.parse(jsonStr);
              console.log(jsonStr);  
              console.log(that.questionItems);
                          
            } else {
              that.$message.error(res.data.message);
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
      this.fromData = {
        abnormalCode: "",
        answerContent: "",
        questionContent: ""
      };
    }
  }
};
</script>
<style>
</style>


