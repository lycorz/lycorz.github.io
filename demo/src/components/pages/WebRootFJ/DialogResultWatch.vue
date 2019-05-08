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
      <el-select v-model="choosedDept" placeholder="请选择" class="resultSelect">
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
      <div v-if="choosedDept == 1">
        <div class="ybjc" :key="index" v-for="(item,index) in ybjc">
          <div class="subTitle">
            <span>一般检查（{{item.itemname}}）</span>
          </div>
          <div class="ybjcTable">
            <el-table :data="item.table" style="width: 100%">
              <el-table-column prop="subitemName" label="项目名称" width="180"></el-table-column>
              <el-table-column prop="finding" label="所见" width="180"></el-table-column>
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
              <section>报告医生:{{item.reviewDoc}}</section>
              <section>报告时间:{{item.reviewDate}}</section>
            </div>
          </div>
        </div>
      </div>
      <!-- 实验室检查 -->
      <div class="sysjc" :key="index" v-for="(item,index) in sysjc" v-else-if="choosedDept == 2">
        <div class="subTitle">
          <span>实验室检查（{{item.itemname}}）</span>
        </div>
        <div>
          <el-table :data="item.table" style="width: 100%">
            <el-table-column prop="subitemName" label="项目名称"></el-table-column>
            <el-table-column prop="finding" label="检查结果"></el-table-column>
            <el-table-column prop="finding" label="参考范围"></el-table-column>
            <el-table-column prop="finding" label="单位"></el-table-column>
            <el-table-column label="结果类型" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.resultType == 'N'">↑</span>
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
      <div v-if="choosedDept == 3">
        <div class="fzjc" :key="index" v-for="(item,index) in fzjc">
          <div class="subTitle">
            <!-- <img class="jpgPic" :key="inx" v-for="(it,inx) in item.images" src="./login-bg.jpg" />  -->
            <span>辅助检查（{{item.itemname}}）</span>
            <!-- 图片图标 -->
            <i
              class="el-icon-picture picture jpgPic"
              :key="inx"
              v-for="(it,inx) in item.images"
              @click="showimg(imgitem)"
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
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      resultwatch: false,
      index: "",
      //检查结果 因为三种检查的数据结构不同，开辟三个数据对象存储，代码更清晰
      //一般检查结果
      ybjc: [
        {
          itemname: "一般检查",
          summary: "我是小结内容",
          reportDoc: "啥子",
          reportDate: "2018-12-19",
          reviewDoc: "不知道",
          reviewDate: "2018-12-13",
          table: [
            {
              subitemName: "收缩压",
              finding: "所见内容",
              resultType: "N"
            },
            {
              subitemName: "舒张压",
              finding: "所见内容",
              resultType: "H"
            },
            {
              subitemName: "体重",
              finding: "所见内容",
              resultType: "N"
            }
          ]
        },
        {
          itemname: "内科检查",
          summary: "我是小结内容",
          reportDoc: "啥子",
          reportDate: "2018-12-19",
          reviewDoc: "不知道",
          reviewDate: "2018-12-13",
          table: [
            {
              subitemName: "直肠肛检",
              finding: "所见内容",
              resultType: "N"
            },
            {
              subitemName: "耳",
              finding: "所见内容",
              resultType: "H"
            },
            {
              subitemName: "鼻",
              finding: "所见内容",
              resultType: "N"
            }
          ]
        }
      ],
      //实验室检查结果
      sysjc: [
        {
          itemname: "一般检查",
          reportDoc: "啥子",
          reportDate: "2018-12-19",
          reviewDoc: "不知道",
          reviewDate: "2018-12-13",
          table: [
            {
              subitemName: "收缩压",
              finding: "所见内容",
              resultType: "N"
            },
            {
              subitemName: "舒张压",
              finding: "所见内容",
              resultType: "H"
            },
            {
              subitemName: "体重",
              finding: "所见内容",
              resultType: "N"
            }
          ]
        },
        {
          itemname: "内科检查",
          reportDoc: "啥子",
          reportDate: "2018-12-19",
          reviewDoc: "不知道",
          reviewDate: "2018-12-13",
          table: [
            {
              subitemName: "直肠肛检",
              finding: "所见内容所见内容所见内容所见内容所见内容所见内容",
              resultType: "N"
            },
            {
              subitemName: "耳",
              finding: "所见内容",
              resultType: "H"
            },
            {
              subitemName: "鼻",
              finding: "所见内容",
              resultType: "N"
            }
          ]
        }
      ],
      //辅助检查结果
      fzjc: [
        {
          itemname: "测试",
          summary: "我是小结内容",
          reportDoc: "啥子",
          reportDate: "2018-12-19",
          reviewDoc: "不知道",
          reviewDate: "2018-12-13",
          finding: "所见内容",
          resultType: "H",
          images: []
        }
      ],
      //已选科室
      choosedDept: "",
      //科室类型
      deptTypes: [
        {
          label: "一般检查",
          value: "1"
        },
        {
          label: "实验室检查",
          value: "2"
        },
        {
          label: "辅助检查",
          value: "3"
        }
      ]
    };
  },
  methods: {
    getInit() {
      this.choosedDept = "1";
    },
    //展示image
    showimg(imgitem) {}
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
