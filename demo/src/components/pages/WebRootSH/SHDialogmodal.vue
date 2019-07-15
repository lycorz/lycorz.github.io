<template>
  <div class="shdialogmodal">
    <el-dialog
      :title="title"
      :visible.sync="dialoggeninsIsShow"
      :close-on-click-modal="false"
      @open="getGenData"
      @close="closeGen"
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
      @close="closeLab"
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
      @close="closeChr"
      width="600px"
    >
      <el-form :model="chrData">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <span class="span-text">{{chrItemName}}</span>
        </el-form-item>
        <el-form-item label="结果类型" :label-width="formLabelWidth">
          <el-select style="width:100px" v-model="chrData.riskLevelCode">
            <el-option
              v-for="(item,index) of chrOptions"
              :key="index"
              :label="item.levelName"
              :value="item.levelCode"
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
      <img :src="imgBase64" />
    </el-dialog>
    <el-dialog
      title="驳回原因填写"
      :visible.sync="dialogrejIsShow"
      :close-on-click-modal="false"
      @open="getRejectData"
      @close="closeRej"
      width="600px"
    >
      <el-form :model="rejData">
        <el-form-item label="驳回原因" :label-width="formLabelWidth">
          <el-select v-model="rejselValue" filterable @change="setDefault" placeholder="请选择">
            <el-option
              v-for="item in rejectOptions"
              :key="item.innerCode"
              :label="item.rejectReason"
              :value="item.innerCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" class="is-required" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="我是异常内容"
            :rows="4"
            v-model="rejCondition"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRej">取 消</el-button>
        <el-button type="primary" @click="InsertReject">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="筛查建议"
      :visible.sync="dialogshaichaIsShow"
      :close-on-click-modal="false"
      @open="getshaichaData"
      width="600px"
    >
      <el-form :model="shaichaData">
        <el-form-item label>
          <el-select
            v-model="selval"
            @change="setCondition"
            clearable
            filterable
            remote
            @clear="selclear"
            placeholder="请输入关键字"
            :remote-method="getshaichaSelData"
            :loading="dialogSelLoading"
          >
            <el-option
              v-for="item in shaichaSelData"
              :key="item.advCode"
              :label="item.advName"
              :value="item.advCode"
              filter-placement="bottom-end"
            >{{item.advName}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 10}"
            v-model="shaichaData.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeShaicha">取 消</el-button>
        <el-button type="primary" @click="saveShaichaData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { resolve, reject } from "q";
export default {
  name: "shdialogmodal",
  props: {},
  data() {
    return {
      dialoggeninsIsShow: false,
      dialoglabinsIsShow: false,
      dialogchrinsIsShow: false,
      dialogimgIsShow: false,
      dialogrejIsShow: false,
      dialogshaichaIsShow: false,
      imgPath: "",
      imgBase64: "",
      genItemName: "",
      labItemName: "",
      chrItemName: "",
      genSearch: {},
      labSearch: {},
      chrSearch: {},
      shaichaSearch: {},
      isInsert: true,
      selval: "",
      operatorCode: "",
      dialogSelLoading: false,
      chrOptions: [],
      genData: {},
      labData: {},
      chrData: {},
      rejData: {},
      shaichaData: {
        orderCode: this.shaichaSearch.orderCode,
        innerCode: null,
        content: "",
        advName: "",
        isStar: false,
        orderNum: 0
      },
      shaichaSelData: [],
      rejCondition: "",
      rejselValue: "",
      rejectOptions: [],
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
  inject: ["getPGItems", "getNoFJItems", "getFJItems", "backParent"],
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
      this.chrOptions = this.chrSearch.lstDicDiseaseRickLevel;
      this.$axios
        .post(this.$api.GetPgDiseaseAssessRst, {
          orderCode: this.chrSearch.orderCode,
          diseaseCode: this.diseaseCode
        })
        .then(res => {
          if (res.data.status == 1) {
            this.chrData = res.data.entity;
            console.log(this.chrData);
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //获取图片(base64)
    getImg() {
      this.$axios
        .post(this.$api.GetBase64StringByImagePath, {
          // Condition: "E:\\project\\vue\\src\\assets\\img\\xiongbu.jpg"
          Condition: this.imgPath
        })
        .then(res => {
          // Condition : this.imgPath
          if (res.data.status == 1) {
            let path = "data:image/jpg;base64," + res.data.entity;
            this.imgBase64 = path;
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {
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
    getshaichaData() {
      this.getshaichaSelData();
      this.$axios
        .post(this, api.GetLstPgMasterRstDetailByOrderCode, {
          orderCode: this.shaichaSearch.orderCode,
          operatorCode: this.operatorCode
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity.length > 0) {
              this.shaichaData.content = res.data.entity[0].content;
              this.isInsert = false;
            } else {
              this.isInsert = true;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    saveShaichaData() {
      this.shaichaData.orderCode = this.shaichaSearch.orderCode;
      this.$axios
        .post(
          this.isInsert
            ? this.api.InsertPGMasterRstDetail
            : this.api.UpdatePGMasterRstDetail,
          {
            request: this.shaichaData
          }
        )
        .then(res => {
          if (res.data.status == 1) {
            this.$message.success("保存成功");
          } else {
            this.$message.success("保存失败");
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // InsertPGMasterRstDetail
    // UpdatePGMasterRstDetail
    selclear() {
      this.getshaichaSelData();
    },
    setCondition(val) {
      if (val) {
        this.shaichaData.content += ";" + val;
      }
    },
    getshaichaSelData(queryName) {
      if (queryName) {
        queryName = queryName.replace(/\s+/g, ""); //去空格
      }
      this.dialogSelLoading = true;
      this.$axios
        .post(this.$api.GetMedicalAdviceByCondition, {
          Condition: queryName,
          orderCode: this.shaichaSearch.orderCode
        })
        .then(res => {
          this.dialogSelLoading = false;
          if (res.data.status == 1) {
            this.shaichaSelData = res.data.entity;
          } else {
            console.error(res.data.message);
          }
        })
        .catch(err => {
          this.dialogSelLoading = false;
          console.error(err);
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
    //插入驳回原因
    InsertReject() {
      if (!this.rejCondition) {
        return this.$message.error("驳回内容不能为空");
      }
      let that = this;
      new Promise((resolve, reject) => {
        that.$axios
          .post(that.$api.InsertSHFinalRejectByOrderCodeCondition, {
            orderCode: that.rejData.orderCode,
            operatorCode: that.rejData.operatorCode,
            Condition: that.rejCondition
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              resolve(res.data.entity);
            } else {
              that.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err.message);
          });
      }).then(res => {
        that.$axios
          .post(that.$api.RejectSHFinalRst, {
            orderCode: that.rejData.orderCode,
            operatorCode: that.rejData.operatorCode
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              that.$message.success("驳回成功");
              this.closeRej();
              this.backParent();
            } else {
              that.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err.message);
          });
      });
    },
    //插入驳回原因
    setDefault(val) {
      this.rejectOptions.forEach(item => {
        if (item.innerCode == val) {
          this.rejCondition = item.rejectReason;
        }
      });
    },
    //获取驳回原因字典
    getRejectData() {
      this.$axios
        .post(this.$api.GetDicRejectReasons)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            console.log(res.data.entity);
            this.rejectOptions = res.data.entity;
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
      this.chrOptions = [];
      this.dialogchrinsIsShow = false;
    },
    closeImg() {
      this.imgPath = "";
      this.imgBase64 = "";
      this.dialogimgIsShow = false;
    },
    closeRej() {
      this.rejData = {};
      this.rejectOptions = [];
      this.rejCondition = "";
      this.rejselValue = "";
      this.dialogrejIsShow = false;
    },
    closeShaicha() {
      this.selval = "";
      this.dialogshaichaIsShow = false;
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


