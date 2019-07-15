<template>
  <el-dialog
    @open="getInit"
    id="resultwatch"
    title="查看其他项目"
    :visible.sync="resultwatch"
    width="600px"
    append-to-body
  >
    <!-- 下拉类别 -->
    <div>
      <span>项目类型：</span>
      <el-select
        v-model="choosedDept"
        placeholder="请选择"
        class="resultSelect"
        @change="selectChange"
      >
        <el-option
          v-for="item in deptTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- 内容面板，不同类型显示不同 -->
    <div class="contentContainer">
      <!-- 一般检查 if ybjc.type is 1 render ybjc -->
      <div v-if="choosedDept == '02'">
        <div class="ybjc" :key="index" v-for="(item,index) in ybjc">
          <div class="subTitle">
            <span>一般检查（{{item.rptItemName}}）</span>
          </div>
          <div class="ybjcTable">
            <el-table :data="item.commonSubItemResults" style="width: 100%">
              <el-table-column prop="subItemName" label="项目名称" width="180"></el-table-column>
              <el-table-column prop="finds" label="所见" width="180"></el-table-column>
              <el-table-column label="结果类型" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.resultType == 'N'"></span>
                  <span v-else class="red">●</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- 所见 -->
            <div class="ybjcSummary">{{item.summary}}</div>
            <!-- 医生 -->
            <div class="ybjcDoc">
              <section></section>
              <section></section>
              <section>报告医生:{{item.reportDoc}}</section>
              <section>报告时间:{{item.reportDate}}</section>
            </div>
          </div>
        </div>
      </div>
      <!-- 实验室检查 -->
      <div class="sysjc" :key="index" v-for="(item,index) in sysjc" v-else-if="choosedDept == '03'">
        <div class="subTitle">
          <span>实验室检查（{{item.rptItemName}}）</span>
        </div>
        <div>
          <el-table :data="item.subItemResults" style="width: 100%">
            <el-table-column prop="subItemName" label="项目名称"></el-table-column>
            <el-table-column prop="result" label="检查结果"></el-table-column>
            <el-table-column prop="range" label="参考范围"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column label="结果类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.resultType == 'H'">↑</span>
                <span v-else-if="scope.row.resultType == 'N'"></span>
                <span v-else>↓</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 医生 -->
        <div class="ybjcDoc">
          <section>报告医生:{{item.reportDoc}}</section>
          <section>报告时间:{{item.reportDate}}</section>
          <section>审核医生:{{item.reviewDoc}}</section>
          <section>审核时间:{{item.reviewDate}}</section>
        </div>
      </div>
      <!-- 辅助检查 -->
      <div v-if="choosedDept == '04'">
        <div class="fzjc" :key="index" v-for="(item,index) in fzjc">
          <div class="subTitle">
            <!-- <img class="jpgPic" :key="inx" v-for="(it,inx) in item.images" src="./login-bg.jpg" />  -->
            <span>辅助检查（{{item.rptItemName}}）</span>
            <!-- 图片图标 -->
            <i
              class="el-icon-picture picture jpgPic"
              :key="inx"
              v-for="(it,inx) in item.images"
              @click="showImg(it)"
            ></i>
          </div>
          <div>
            <!-- 所见 -->
            <div class="fzjcFinding fzjcDiv">
              <div class="divTitle">所见：</div>
              <div class="divContent">{{item.finding}}</div>
            </div>
            <div class="fzjcSummary fzjcDiv">
              <div class="divTitle">小结：</div>
              <div class="divContent">{{item.summary}}</div>
            </div>
            <div class="fzjcYc">
              <span>结果类型：</span> &nbsp;
              <span v-if="item.resultType == 'N'"></span>
              <span v-else class="red">●</span>
            </div>
            <!-- 医生 -->
            <div class="ybjcDoc">
              <section>报告医生:{{item.reportDoc}}</section>
              <section>报告时间:{{item.reportDate}}</section>
              <section>审核医生:{{item.reviewDoc}}</section>
              <section>审核时间:{{item.reviewDate}}</section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="resultwatch = false">关 闭</el-button>
    </div>
    <bigpic ref="bigpic"></bigpic>
  </el-dialog>
</template>

<script>
import bigpic from "./showPic.vue";
export default {
  components: {
    bigpic
  },
  data() {
    return {
      resultwatch: false,
      index: "",
      orderCode: "",
      //检查结果 因为三种检查的数据结构不同，开辟三个数据对象存储，代码更清晰
      //一般检查结果
      ybjc: [],
      //实验室检查结果
      sysjc: [],
      //辅助检查结果
      fzjc: [],
      //已选科室
      choosedDept: "",
      //科室类型
      deptTypes: [
        {
          label: "一般检查",
          value: "01"
        },
        {
          label: "物理检查",
          value: "02"
        },
        {
          label: "实验室检查",
          value: "03"
        },
        {
          label: "辅助检查",
          value: "04"
        }
      ]
    };
  },
  methods: {
    //初始化
    getInit() {
      this.choosedDept = "01";
      //初始化获取结果
      this.getResult(this.orderCode, this.choosedDept);
    },
    //切换下拉菜单
    selectChange(value) {
      this.getResult(this.orderCode, value);
    },
    //获取结果
    getResult(orderCode, chooseCode) {
      let that = this;
      that.loading1 = true;
      //获取一般检查结果
      if (chooseCode === "01"||chooseCode === "02") {
        this.$axios
          .get(this.$api.GetCommonResult, {
            params: {
              orderCode,
              ReptItemType: chooseCode
            }
          })
          .then(function(response) {
            console.log(54188, response.data.entity);
            that.loading = false;
            if (response.data.status == 1) {
              if (response.data.entity.length != 0) {
                that.ybjc = response.data.entity;
              } else {
                that.$message.error(`无一般检查项目`);
              }
            } else {
              that.$message.error(`GetCommonResult${response.data.message}`);
            }
          })
          .catch(function(error) {
            that.loading = false;
            that.$message.error(`GetCommonResult${error}`);
          });
      }
      //获取实验室检查
      else if (chooseCode == "03") {
        this.$axios
          .get(this.$api.GetLisResult, {
            params: {
              orderCode,
              ReptItemType: chooseCode
            }
          })
          .then(function(response) {
            console.log(654, response.data.entity);
            that.loading = false;
            if (response.data.status == 1) {
              if (response.data.entity.length != 0) {
                that.sysjc = response.data.entity;
              } else {
                that.$message.error(`无实验室检查项目`);
              }
            } else {
              that.$message.error(`GetLisResult${response.data.message}`);
            }
          })
          .catch(function(error) {
            that.loading = false;
            that.$message.error(`GetLisResult${error}`);
          });
      }
      //获取辅助检查
      else if (chooseCode == "04") {
        this.$axios
          .get(this.$api.ResAuxiliaryResult, {
            params: {
              orderCode,
              ReptItemType: chooseCode
            }
          })
          .then(function(response) {
            console.log(654, response.data.entity);
            that.loading = false;
            if (response.data.status == 1) {
              if (response.data.entity.length != 0) {
                console.log(that.fzjc, 8889996);
                that.fzjc = response.data.entity;
              } else {
                that.$message.error(`无辅助检查项目`);
              }
            } else {
              that.$message.error(`ResAuxiliaryResult${response.data.message}`);
            }
          })
          .catch(function(error) {
            that.loading = false;
            that.$message.error(`ResAuxiliaryResult${error}`);
          });
      }
    },
    //展示image
    showImg(src) {
      this.$refs.bigpic.dialogVisible = true;
      this.$refs.bigpic.src = src;
    }
  }
};
</script>

<style scoped>
img {
  width: 465px;
  height: 400px;
}
#resultwatch >>> .el-dialog__body {
  padding: 17px !important;
}
#resultwatch .resultSelect {
  display: inline-block;
  width: 120px;
}
.contentContainer {
  margin-top: 16px;
  padding: 13px;
  padding-right: 8px;
  border: 1px solid #dcdfe6;
  overflow: auto;
  height: 460px;
}
.ybjc,
.sysjc,
.fzjc {
  border: 1px solid rgba(220, 223, 230, 1);
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  margin-bottom: 10px;
}
.red {
  color: #ff6565;
}
.ybjcSummary {
  padding: 8px 16px;
  font-size: 12px;
  border-bottom: 1px solid #dcdfe6;
  min-height: 47px;
}
.ybjcDoc {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 16px;
  color: rgba(144, 147, 152, 1);
  opacity: 1;
}
.ybjcDoc section {
  display: inline-block;
  text-align: center;
  width: 24%;
  height: 32px;
  line-height: 32px;
}
.fzjcDiv {
  padding: 8px 16px;
  font-size: 12px;
  border-bottom: 1px solid #dcdfe6;
  min-height: 70px;
  display: flex;
}
.divTitle {
  line-height: 18px;
  flex: 1;
}
.divContent {
  flex: 9;
  line-height: 18px;
}
.fzjcYc {
  padding: 8px 16px;
  font-size: 12px;
  border-bottom: 1px solid #dcdfe6;
}
.jpgPic {
  font-size: 14px;
}
</style>
