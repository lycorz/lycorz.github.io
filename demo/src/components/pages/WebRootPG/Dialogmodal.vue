<template>
  <div class="dialogmodal">
    <el-dialog
      :title="title"
      :visible.sync="dialoggeninsIsShow"
      :close-on-click-modal="false"
      @open="getGenData"
      width="600px"
    >
      <el-form :model="genData">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <span class="span-text">{{ genItemName }}</span>
        </el-form-item>
        <el-form-item label="所见编辑" :label-width="formLabelWidth">
          <el-input
            :type="suojianType"
            :rows="suojianRows"
            v-model="genData.findings"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="小结编辑" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="我是提示文本"
            :rows="4"
            v-model="genData.summary"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="结果类型" :label-width="formLabelWidth">
          <el-select style="width:100px" v-model="genData.resultType">
            <el-option
              v-for="(item,index) of options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeGen">取 消</el-button>
        <el-button type="primary" @click="UpdateGenData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="实验室检查编辑"
      :visible.sync="dialoglabinsIsShow"
      :close-on-click-modal="false"
      @open="getLabData"
      width="600px"
    >
      <el-form :model="labData">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <span class="span-text">{{labItemName}}</span>
        </el-form-item>
        <el-form-item label="检查结果" :label-width="formLabelWidth">
          <span class="span-text">{{labData.examValue}}</span>
        </el-form-item>
        <el-form-item label="参考范围" :label-width="formLabelWidth">
          <span class="span-text">{{labData.lowReffer}} - {{labData.highReffer}}</span>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <span class="span-text">{{labData.unit}}</span>
        </el-form-item>
        <el-form-item label="结果类型" :label-width="formLabelWidth">
          <el-select style="width:100px" v-model="labData.resultType">
            <el-option
              v-for="(item,index) of laboptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeLab">取 消</el-button>
        <el-button type="primary" @click="UpdateLabData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="慢性病风险评估编辑"
      :visible.sync="dialogchrinsIsShow"
      :close-on-click-modal="false"
      @open="getchrData"
      width="600px"
    >
      <el-form :model="chrData">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <span class="span-text">高血压风险评估结果</span>
        </el-form-item>
        <el-form-item label="结果类型" :label-width="formLabelWidth">
          <el-select style="width:100px" v-model="chrData.resultType">
            <el-option
              v-for="(item,index) of laboptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeChr">取 消</el-button>
        <el-button type="primary" @click="UpdateChrData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="图片"
      :visible.sync="dialogimgIsShow"
      :close-on-click-modal="false"
      @open="getImg"
      @close="closeImg"
      width="600px"
    >
      <img :src="imgBase64">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogmodal",
  props: {},
  data() {
    return {
      dialoggeninsIsShow: false,
      dialoglabinsIsShow: false,
      dialogchrinsIsShow: false,
      dialogimgIsShow: false,
      imgPath:"",
      imgBase64:"",
      genItemName: "",
      labItemName: "",
      chrItemName: "",
      genSearch: {},
      labSearch: {},
      chrSearch: {},
      genData: {},
      labData: {},
      chrData: {},
      title: "一般检查编辑",
      suojianType: "",
      suojianRows: "",
      formLabelWidth: "60px",
      options: [
        {
          value: "N",
          label: "正常"
        },
        {
          value: "H",
          label: "不正常"
        }
      ],
      laboptions: [
        {
          value: "H",
          label: "↑"
        },
        {
          value: "N",
          label: "正常"
        },
        {
          value: "L",
          label: "↓"
        }
      ]
    };
  },
  inject:['getPGItems','getNoFJItems','getFJItems'],
  methods: {
    //获取分检非LIS数据
    getGenData() {
      this.$axios
        .post(this.$api.GetFjRptSubItemRstNoLisByInnerCode, {
          InnerCode: this.genSearch.innerCode
        })
        .then(res => {
          if (res.data.status == 1) {
            this.genData = res.data.entity;
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //获取分检LIS数据
    getLabData() {
      this.$axios
        .post(this.$api.GetFjRptSubItemRstLisByInnerCode, {
          innerCode: this.labSearch.innerCode
        })
        .then(res => {
          if (res.data.status == 1) {
            this.labData = res.data.entity;
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //获取评估数据
    getchrData() {
      this.$axios
        .post(this.$api.GetFjRptSubItemRstNoLisByInnerCode, {
          innerCode: this.chrSearch.innerCode
        })
        .then(res => {
          if (res.data.status == 1) {
            this.chrData = res.data.entity;
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //获取图片(base64)
    getImg(){
      this.$axios.post(this.$api.GetBase64StringByImagePath,{Condition : "E:\\project\\vue\\src\\assets\\img\\xiongbu.jpg"}).then(res => {
        // Condition : "E:\\project\\vue\\src\\assets\\img\\xiongbu.jpg"Condition:this.imgPath
        if (res.data.status==1) {
          let path = "data:image/jpg;base64,"+ res.data.entity;
          this.imgBase64 = path;
        }else{
          this.$message(res.data.message);
        }
      }).catch(err => {
        console.error(err.message);
      });
    },
    //更新分检非LIS数据
    UpdateGenData() {
      this.$axios
        .post(this.$api.UpdateFjRptSubItemRisNoLis, this.genData)
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              this.$message.success("更新成功");
              this.closeGen();
              this.getNoFJItems();
            } else {
              this.$message(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //更新分检LIS数据
    UpdateLabData() {
      this.$axios
        .post(this.$api.UpdateFjRptSubItemRisLis, this.labData)
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              this.$message.success("更新成功");
              this.closeLab();
              this.getFJItems();
            } else {
              this.message(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //更新评估数据
    UpdateChrData() {
      this.$axios
        .post(this.$api.UpdatePgDiseaseAssessRst, this.chrData)
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              this.$message.success("更新成功");
              this.closeChr();
              this.getPGItems();
            } else {
              this.message(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    closeGen() {
      this.genData = {};
      this.genItemName = "";
      this.genSearch = {};
      this.dialoggeninsIsShow = false;
    },
    closeLab() {
      this.labData = {};
      this.labItemName = "";
      this.labSearch = {};
      this.dialoglabinsIsShow = false;
    },
    closeChr() {
      this.chrData = {};
      this.chrItemName = "";
      this.chrSearch = {};
      this.dialogchrinsIsShow = false;
    },
    closeImg(){
      this.imgPath = "";
      this.imgBase64 = "";
      this.dialogimgIsShow = false;
    }
  }
};
</script>
<style scoped>
.span-text {
  font-size: 14px;
  color: #606266;
}
.el-dialog__body {
  padding: 20px 20px;
}
</style>


