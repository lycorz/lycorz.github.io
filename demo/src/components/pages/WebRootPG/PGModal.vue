<template>
  <div class="content">
    <div class="topTitle">
      <el-button icon="el-icon-arrow-left" @click="backParent()">返回</el-button>
      <span style="margin-left:16px">
        客户：
        <el-popover placement="bottom" width="200" trigger="click">
          <div
            style="font-size:12px;font-family:Microsoft YaHei;font-weight:400;line-height:16px;color:rgba(96,98,102,1);"
          >
            <p>体检卡号：{{rowData.cardNum}}</p>
            <p style="margin-top:5px">单位名称：{{rowData.unitName}}</p>
          </div>
          <el-button
            style="padding:0px 0px;margin-left:-4px;font-size:14px;font-family:Microsoft YaHei;color:#606266;font-weight:400;line-height:19px;"
            type="text"
            slot="reference"
          >{{rowData.customerName}}</el-button>
        </el-popover>
        <i class="el-icon-arrow-down"></i>
      </span>
      <span style="margin-left:16px;">分栏展示：</span>
      <div style="margin: 0 1px; display:inline-block;vertical-align: baseline; ">
        <el-checkbox-group v-model="checkBoxModal" size="mini">
          <el-checkbox
            border
            v-for="(item,index) in checkBoxOptions"
            :label="item"
            :key="index"
            @change="showClick(index)"
          >{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="right">
        <div v-if="rowData.isReject==0">
          <el-popover trigger="click" @show="showReason()" placement="bottom">
            <div v-for="(reasonItem,reasonIndex) in reasonData" :key="reasonIndex">
              <p>时间：{{reasonItem.rejectTime | formatDate("YYYY/MM/DD-HH:MM:SS") }}</p>
              <p>操作人：{{reasonItem.operatorCode}}</p>
              <p>驳回原因：{{reasonItem.rejectReason}}</p>
              <hr>
            </div>
            <el-button
              type="text"
              slot="reference"
              style="font-size:14px;font-family:Microsoft YaHei;color:#606266;font-weight:400;line-height:19px;"
            >
              <i style="color:#F56C6C" class="iconfont">&#xe623;</i>
              <span style="margin-left:5px">查看驳回原因</span>
            </el-button>
          </el-popover>
        </div>
        <!--DONE:需要从父页面传来的信息表示是否显示此条信息。-->
        <el-button type="success" @click="via" :disabled="isDisabled" size="medium">通过</el-button>
      </div>
    </div>
    <el-row>
      <div
        id="checkResult"
        style="flex: 1;border-right: 1px solid #DCDFE5;display: flex;flex-direction: column;min-width:450px;"
      >
        <div class="subTitle" style="flex: 0 0 40px;">
          <span class="strong-Title">检查结果</span>
          <div class="right">
            <el-checkbox @change="checkboxChange">
              <span
                style="font-size:12px;font-family:Microsoft YaHei;font-weight:400;line-height:16px;color:rgba(96,98,102,1);opacity:1;"
              >只看异常</span>
            </el-checkbox>
            <el-select v-model="curItem" @change="selChange" class="selcs" placeholder="请选择">
              <el-option
                v-for="item in rptItems"
                :key="item.typeCode"
                :label="item.typeName"
                :value="item.typeCode"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="peopleInfo">
          <div id="yiban">
            <div style="padding: 16px 0px;">
              <div class="quote-s">
                <span>一般检查</span>
              </div>
              <div class="table-border">
                <el-table
                  v-loading="checkloading"
                  :data="notFJData"
                  style="width:100%;margin: 0px 0px -1px -1px; "
                >
                  <el-table-column prop="itemName" align="left" label="项目名称"></el-table-column>
                  <el-table-column prop="findings" align="center" label="所见"></el-table-column>
                  <el-table-column align="center" label="结果类型">
                    <template slot-scope="scope" v-if="scope.row.resultType!='N'">
                      <span class="circle"></span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        :disabled="isDisabled"
                        @click="showgenins(scope.row,scope.$index,1)"
                      >编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="center-smile" v-if="notFJData.length>0">
                <div
                  style="flex:1;padding-left:12px; color:#606266;font-size:12px; "
                >{{notFJData[0].combinSummary}}</div>
              </div>
              <div class="buttom" v-if="notFJData.length>0">
                <div>报告医生：{{notFJData[0].rptDoctor}} 报告时间：{{notFJData[0].rptTime | formatDate('YYYY-MM-DD') }} 审核医生：{{notFJData[0].reviewDoctor}} 审核时间：{{notFJData[0].reviewTime | formatDate('YYYY-MM-DD') }}</div>
              </div>
            </div>
          </div>
          <div id="wuli" style="display:none">
            <div style="padding: 16px 0px;">
              <div class="quote-s">
                <span>检查名字</span>
              </div>
              <div class="table-border">
                <el-table
                  v-loading="checkloading"
                  :data="notFJData"
                  style="width:100%;   margin: 0px 0px -1px -1px; "
                >
                  <el-table-column prop="itemName" align="left" label="项目名称"></el-table-column>
                  <el-table-column prop="findings" align="center" label="所见"></el-table-column>
                  <el-table-column align="center" label="结果类型">
                    <template slot-scope="scope" v-if="scope.row.resultType!='N'">
                      <span class="circle"></span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        :disabled="isDisabled"
                        @click="showgenins(scope.row,scope.$index,2)"
                      >编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="center-smile" v-if="notFJData.length>0">
                <div
                  style="flex:1;padding-left:12px; color:#606266;font-size:12px; "
                >{{notFJData[0]=="undefined"?"":notFJData[0].combinSummary}}</div>
              </div>
              <div class="buttom" v-if="notFJData.length>0">
                <div>报告医生：{{notFJData[0].rptDoctor}} 报告时间：{{notFJData[0].rptTime | formatDate('YYYY-MM-DD') }} 审核医生：{{notFJData[0].reviewDoctor}} 审核时间：{{notFJData[0].reviewTime | formatDate('YYYY-MM-DD') }}</div>
              </div>
            </div>
          </div>
          <div id="shiyanshi" style="display:none">
            <div style="padding: 16px 0px;">
              <div class="quote-s">
                <span>检查名字</span>
              </div>
              <el-table v-loading="checkloading" border :data="FJData" style="width:100%; ">
                <el-table-column prop="name" align="left" label="项目名称"></el-table-column>
                <el-table-column prop="examValue" align="center" label="检查结果"></el-table-column>
                <el-table-column align="center" label="参考范围">
                  <template slot-scope="scope">{{scope.row.lowReffer}} - {{scope.row.highReffer}}</template>
                </el-table-column>
                <el-table-column prop="unit" align="center" label="单位"></el-table-column>
                <el-table-column align="center" label="结果类型">
                  <template slot-scope="scope">
                    <span v-if="scope.row.resultType=='H'">↑</span>
                    <span v-else-if="scope.row.resultType=='L'">↓</span>
                    <span v-else></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      :disabled="isDisabled"
                      @click="showlabins(scope.row,scope.$index)"
                    >编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div id="fuzhu" style="display:none;">
            <div style="padding: 16px 0px;" v-for="(item,index) of notFJData" :key="index">
              <div class="quote-s">
                <span>{{item.itemName}}</span>
                <div class="right">
                  <i
                    v-for="(imgitem,imageIndex) of getItems(item.imagePaths)"
                    :key="imageIndex"
                    class="el-icon-picture picture"
                    @click="showimg(imgitem)"
                  ></i>
                  <el-button
                    style="padding:5px 15px"
                    :disabled="isDisabled"
                    @click="showgenins(item,'',3)"
                    type="text"
                  >编辑</el-button>
                </div>
              </div>
              <div class="center" style="display: flex;">
                <div style="flex: 0 0 50px;padding-right: 0;">所见：</div>
                <div style="flex:1;padding-left: 0;">{{item.findings}}</div>
              </div>
              <div class="center" style="display: flex;">
                <div style="flex: 0 0 50px;padding-right: 0;">小结：</div>
                <div style="flex:1;padding-left: 0;">{{item.summary}}</div>
              </div>
              <div class="center-smile" style="display:flex;">
                <div style="flex: 0 0 80px;padding-right: 0; ">结果类型:</div>
                <div style="flex:1;padding-left: 0;">
                  <span class="circle" v-if="item.resultType!='N'"></span>
                </div>
              </div>
              <div class="buttom">
                <div>报告医生：{{item.rptDoctor}} 报告时间：{{item.rptTime | formatDate('YYYY-MM-DD')}} 审核医生：{{item.reviewDoctor }} 审核时间：{{item.reviewTime | formatDate('YYYY-MM-DD') }}</div>
              </div>
            </div>
          </div>
          <div id="tijian" style="display:none">
            <div style="padding: 16px 4px;">
              <div class="quote-s">
                <span>健康体检自测问卷</span>
              </div>
              <ul class="tblist" v-for="(item,index) of WJData" :key="index">
                <li class="title ellipsis">
                  <el-popover
                    placement="bottom"
                    width="200"
                    trigger="click"
                    :content="item.questionContent"
                  >
                    <span slot="reference">{{item.questionContent}}</span>
                  </el-popover>
                </li>
                <li class="content ellipsis">
                  <el-popover
                    placement="bottom"
                    width="200"
                    trigger="click"
                    :content="item.answerValue | correctFormatter"
                  >
                    <span slot="reference">{{item.answerValue | correctFormatter}}</span>
                  </el-popover>
                </li>
              </ul>
              <!-- <el-table
                v-loading="checkloading"
                border
                :data="WJData"
                style="width:100%;  margin: 0px 0px -1px -1px; "
              >
                <el-table-column prop="questionContent" align="left" label="题目"></el-table-column>
                <el-table-column prop="answerValue" align="left" label="选项"></el-table-column>
              </el-table>-->
            </div>
          </div>
          <div id="pinggu" style="display:none">
            <div style="padding: 16px 4px;" v-for="(item,key) in PGData" :key="key">
              <div class="quote-s">
                <span>{{item.diseaseName}}</span>
                <div class="right">
                  <el-button
                    style="padding:5px 15px"
                    :disabled="isDisabled"
                    @click="showchrins()"
                    type="text"
                  >编辑</el-button>
                </div>
              </div>
              <div class="charts">
                <div :id="'main'+item.diseaseCode"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="abnormal"
        style="flex: 1 ;border-right: 1px solid #DCDFE5;display: flex;flex-direction: column;min-width:300px;"
      >
        <div class="subTitle" style="flex:0 0 40px;">
          <span class="strong-Title">异常汇总</span>
          <div class="right">
            <el-button @click="reBuild(orderCode,operatorCode)" :disabled="isDisabled">重新生成</el-button>
            <el-button @click="addAbnormalShow" :disabled="isDisabled">新增</el-button>
            <el-button @click="deleteAbnormal(multipleSelection)" :disabled="isDisabled">删除</el-button>
          </div>
        </div>
        <div style="flex: 1;overflow-y: auto;">
          <el-table
            ref="abnormalTable"
            :data="tableData1"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-loading="loading"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="keys" align="left" label="异常内容">
              <template slot-scope="scope">
                <span v-if="scope.row.isCrisis" style="color:red">{{scope.row.keys}}</span>
                <span v-else>{{scope.row.keys}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="edit(scope.row,scope.$index)"
                  :disabled="isDisabled"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fixContainer">
          <div class="fixedBottom">
            <span class="reverseChoose" @click="chooseReverse" :disabled="isDisabled">反选</span>
            <span>合计：</span>
            <span class="allCount">{{abnormalCount}}</span>
            <span>选中：</span>
            <span>{{abnormalChoosenCount}}</span>
          </div>
          <div class="floatRight">
            <el-button @click="getAbnormal(orderCode, operatorCode)" :disabled="isDisabled">查看全部</el-button>
            <el-button @click="compare" :disabled="isDisabled">历次对比</el-button>
          </div>
        </div>
      </div>
      <div style="flex:3;overflow: hidden;display: flex;flex-direction: column;" id="advSug">
        <div class="subTitle">
          <span class="strong-Title">主检建议</span>
          <div class="right">
            <el-button @click="reBuildAdvice(orderCode,operatorCode)" :disabled="isDisabled">重新生成</el-button>
            <el-button @click="addAdvicelShow" :disabled="isDisabled">新增</el-button>
            <el-button @click="deleteAdvice(multipleSelection1)" :disabled="isDisabled">删除</el-button>
          </div>
        </div>
        <div style="flex:1;overflow-y:auto;" id="advTable">
          <el-table
            ref="adviceTable"
            :data="tableData2"
            tooltip-effect="light"
            style="width: 100%"
            @selection-change="handleSelectionChangeSecond"
            v-loading="loading1"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="advName" align="left" label="建议的名称" width="100"></el-table-column>
            <el-table-column prop="content" align="left" label="建议"></el-table-column>
            <el-table-column prop="isStar" align="left" label="标记" width="80">
              <template slot-scope="scope">
                <i v-if="scope.row.isStar" class="el-icon-star-on" style="color:#FC8F00"></i>
                <i v-else class="el-icon-star-off"></i>
              </template>
            </el-table-column>

            <el-table-column align="right" label width="80">
              <template slot-scope="scope">
                <el-popover placement="top-start" width="200" trigger="click">
                  <span>{{itemcodes}}</span>
                  <el-button
                    slot="reference"
                    style="border:0px;color:#3a8ee6;"
                    @click="getItem(scope.row.orderCode,scope.row.advCode)"
                  >异常组合</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="editAdvise(scope.row,scope.$index)"
                  :disabled="isDisabled"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fixContainer">
          <div class="fixedBottom">
            <span class="reverseChoose" @click="chooseReverseAdvice" :disabled="isDisabled">反选</span>
            <span>合计：</span>
            <span class="allCount">{{abnormalCount1}}</span>
            <span>选中：</span>
            <span>{{abnormalChoosenCount1}}</span>
          </div>
          <div class="floatRight">
            <el-button @click="goUp" :disabled="isDisabled">上移</el-button>
            <el-button @click=" goDown" :disabled="isDisabled">下移</el-button>
            <el-button @click="reSort(orderCode)" :disabled="isDisabled">一键排序</el-button>
          </div>
        </div>
      </div>
    </el-row>
    <dialogmodal ref="dialogmodal" :name="dialogmodalName"></dialogmodal>
    <dialogaddabnormal ref="dialogaddabnormal"></dialogaddabnormal>
    <dialogcompare ref="dialogcompare" :operatorCod="operatorCode" :orderCod="orderCode"></dialogcompare>
    <dialogaddadviece ref="dialogaddadviece"></dialogaddadviece>
    <dialogeditadviece ref="dialogeditadviece"></dialogeditadviece>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import echarts from "echarts";
//拖拽插件
import Sortable from "sortablejs";
import dialogmodal from "./Dialogmodal.vue";
import dialogaddabnormal from "./DialogAddAbnormal.vue";
import dialogcompare from "./DialogCompare.vue";
import dialogaddadviece from "./DialogAddAdvice.vue";
import dialogeditadviece from "./DialogEditAdvice.vue";
import { isMoment } from "moment";
import { resolve, reject, async } from "q";
export default {
  name: "PGModal",
  components: {
    dialogmodal,
    dialogaddabnormal,
    dialogcompare,
    dialogaddadviece,
    dialogeditadviece,
    Sortable
  },
  data() {
    return {
      //接收父页面参数 start    //
      rowData: {},
      reasonData: [],
      parentName: "",
      operatorCode: "",
      isDisabled: true,
      checkloading: true,
      //    end   //

      checkBoxModal: ["检查结果", "异常汇总", "主检建议"],
      checkBoxOptions: ["检查结果", "异常汇总", "主检建议"],
      dialogmodalName: "",
      curItem: "01",
      multipleSelection: [],
      condition: "",
      rptItems: [],
      notFJData: [],
      FJData: [],
      PGData: [],
      levels: [],
      series: [],
      serie: {
        type: "bar",
        stack: "风险情况",
        data: [],
        itemStyle: {
          normal: { color: "" }
        }
      },
      WJData: [],
      // chartOptions: {
      //   // title: {
      //   //   text: "ECharts 入门示例"
      //   // },
      //   tooltip: { trigger: "axis" },
      //   legend: {
      //     data: ["风险等级", "当前风险"]
      //   },
      //   xAxis: {
      //     data: ["风险等级", "当前风险"],
      //     // axisLine: {
      //     //   lineStyle: {
      //     //     color: "#C1C4CB",
      //     //     width: "1px"
      //     //   }
      //     // },
      //     splitLine: {
      //       show: false
      //     }
      //   },
      //   grid: {
      //     left: 60
      //   },
      //   yAxis: {
      //     min: 0,
      //     max: this.PGData.levelItems.length,
      //     splitLine: {
      //       show: false
      //     },
      //     // axisLine: {
      //     //   lineStyle: {
      //     //     color: "#C1C4CB",
      //     //     width: "1px"
      //     //   }
      //     // },
      //     axisLabel: {
      //       formatter: function(value) {
      //         var texts = [];
      //         let item = this.PGData.levelItems.find(z=>z.diseaseCode==value);
      //         texts.push(item.levelName);
      //       }
      //     }
      //   },
      //   series: [
      //     {
      //       type: "bar",
      //       stack: "风险情况",
      //       data: [1, 1],
      //       itemStyle: {
      //         normal: { color: "#3FBB49" }
      //       }
      //     },
      //     {
      //       stack: "风险情况",
      //       type: "bar",
      //       data: [1],
      //       itemStyle: {
      //         normal: { color: "#FFDF3E" }
      //       }
      //     },
      //     {
      //       stack: "风险情况",
      //       type: "bar",
      //       data: [1],
      //       itemStyle: {
      //         normal: { color: "#FC9C20" }
      //       }
      //     },
      //     {
      //       stack: "风险情况",
      //       type: "bar",
      //       data: [1],
      //       itemStyle: {
      //         normal: { color: "#FF5454" }
      //       }
      //     }
      //   ]
      // },
      //以下是异常汇总等。
      multipleSelection: [],
      loading: true,
      loading1: true,
      abnormalCount: 0,
      abnormalChoosenCount: 0,
      itemcodes: "",
      tableData1: [],
      tableData2: [],
      abnormalCount1: 0,
      multipleSelection1: [],
      abnormalChoosenCount1: 0,
      orderCode: ""
    };
  },
  created() {
    this.$store.commit("changeCollapse", true);
    this.rowData = this.$route.query.rowData;
    this.parentName = this.$route.query.parentName;
    this.operatorCode = this.$route.query.operatorCode;
    this.isDisabled = !!this.$route.query.isDisabled;
    this.orderCode = this.$route.query.rowData.orderCode;
    console.log(this.rowData);
    this.getRptItems();
    this.getNoFJItems();
    //获取异常汇总
    this.getAbnormalDefault(this.$route.query.rowData.orderCode, this.curItem);
    this.getAdvice(this.orderCode, this.operatorCode);
  },
  provide() {
    return {
      getNoFJItems: this.getNoFJItems,
      getFJItems: this.getFJItems,
      getPGItems: this.getPGItems
    };
  },
  filters: {
    correctFormatter: function(value) {
      let contentArr = value.split(" ");
      contentArr = contentArr.map(function(val) {
        if (val != "") {
          let newVal = val.substring(2);
          newVal = "√" + newVal;
          return newVal;
        }
      });
      return contentArr.join(" ");
    }
  },
  methods: {
    ...mapMutations(["changeCollapse"]),
    //获取分检非检验的数据
    getNoFJItems() {
      this.checkloading = true;
      this.$axios
        .post(this.$api.GetFjNoLisItemSummaryInfoByOrderCodeAndCondition, {
          orderCode: this.rowData.orderCode,
          operatorCode: this.operatorCode,
          Condition: this.condition,
          typeCode: this.curItem
        })
        .then(res => {
          this.checkloading = false;
          if (res.data.status == 1) {
            this.notFJData = res.data.entity;
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //获取分检检验的数据 （实验室检查）
    getFJItems() {
      this.checkloading = true;
      this.$axios
        .post(this.$api.GetFjLisItemSummaryInfoByOrderCodeAndCondition, {
          orderCode: this.rowData.orderCode,
          operatorCode: this.operatorCode,
          Condition: this.condition
        })
        .then(res => {
          this.checkloading = false;
          if (res.data.status == 1) {
            this.FJData = res.data.entity;
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //获取评估数据 start
    getPGItems() {
      this.$axios
        .post(this.$api.GetPgDiseaseAssessRstByOrderCode, {
          OrderCode: this.rowData.orderCode
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            let data = res.data.entity;
            if (data.length > 0) {
              this.PGData = data;
              data.forEach(val => {
                setTimeout(() => {
                  this.showCharts(val);
                }, 500);
              });
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });

      // that.getPGDisease().then(res => {
      //   that.recursionPG(0, res);
      // });
    },
    showCharts(val) {
      let that = this;
      let myCharts = echarts.init(
        document.getElementById("main" + val.diseaseCode)
      );
      that.levels = val.lstDicDiseaseRickLevel;
      // let colors = {};
      let chartseries = new Array();
      val.lstDicDiseaseRickLevel.forEach((item, index) => {
        // colors[item.levelCode] = item.levelColor;
        let now = parseInt(val.riskLevelCode.substring(2, 3));
        let series = {};
        if (index == now) {
          series = {
            type: "bar",
            stack: "风险情况",
            data: [1, now + 1],
            itemStyle: {
              normal: { color: "#" + item.levelColor }
            }
          };
        } else {
          series = {
            type: "bar",
            stack: "风险情况",
            data: [1],
            itemStyle: {
              normal: { color: "#" + item.levelColor }
            }
          };
        }
        chartseries.push(series);
      });
      let chartOptions = {
        // title: {
        //   text: "ECharts 入门示例"
        // },
        tooltip: { trigger: "axis" },
        legend: {
          data: ["风险等级", "当前风险"]
        },
        xAxis: {
          data: ["风险等级", "当前风险"],
          // axisLine: {
          //   lineStyle: {
          //     color: "#C1C4CB",
          //     width: "1px"
          //   }
          // },
          splitLine: {
            show: false
          }
        },
        grid: {
          left: 60
        },
        yAxis: {
          min: 0,
          max: val.lstDicDiseaseRickLevel.length,
          splitLine: {
            show: false
          },
          // axisLine: {
          //   lineStyle: {
          //     color: "#C1C4CB",
          //     width: "1px"
          //   }
          // },
          axisLabel: {
            formatter: function(value) {
              var texts = [];
              let item = "";
              that.levels.forEach(z => {
                if (z.levelCode == "00" + parseInt(value + 1)) {
                  item = z.levelName;
                }
              });
              texts.push(item);
              return texts;
            }
          }
        },
        series: chartseries
      };
      myCharts.setOption(chartOptions);
    },
    // recursionPG(j, data) {
    //   this.$axios
    //     .all([
    //       this.getPGRickLevel(data[j].diseaseCode),
    //       this.getPGDiseaseName(data[j].diseaseCode, j)
    //     ])
    //     .then(res => {
    //       alert("第" + j + "次调用");
    //       console.log(data);
    //       console.log(this.colors);
    //       console.log(this.levels);
    //       console.log(this.diseaseNames);
    //       if (++j < data.length) {
    //         this.recursionPG(j, data);
    //       }
    //     });
    // },
    // getPGRickLevel(DiseaseCode) {
    //   return this.$axios
    //     .post(this.$api.GetDiseaseRickLevelByDiseaseCode, {
    //       DiseaseCode: DiseaseCode
    //     })
    //     .then(result => {
    //       if (result.status == 200 && result.data.status == 1) {
    //         if (result.data.entity.length > 0) {
    //           result.data.entity.forEach(item => {
    //             let levels = {};
    //             let colors = {};
    //             this.levels[item.levelCode] = item.levelName;
    //             this.colors[item.levelCode] = item.levelColor;
    //           });
    //         }
    //       } else {
    //         this.$message.error(result.data.message);
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err.message);
    //     });
    // },
    // getPGDiseaseName(DiseaseCode, index) {
    //   return this.$axios
    //     .post(this.$api.DomainDicDiseaseType, { DiseaseCode: DiseaseCode })
    //     .then(response => {
    //       if (response.status == 200 && response.data.status == 1) {
    //         if (response.data.entity.length > 0) {
    //           this.diseaseNames = {};
    //           this.diseaseNames.push(response.data.entity.diseaseName);
    //         }
    //       } else {
    //         this.$message.error(response.data.message);
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err.message);
    //     });
    // },
    // getPGDisease() {
    //   let that = this;
    //   let pro = new Promise((resolve, reject) => {
    //     that.$axios
    //       .post(that.$api.GetDomainPgDiseaseAssessRstByOrderCode, {
    //         orderCode: that.orderCode
    //       })
    //       .then(res => {
    //         if (res.data.status == 1) {
    //           if (res.data.entity.length > 0) {
    //             resolve(res.data.entity);
    //           }
    //         } else {
    //           that.$message.error(res.data.message);
    //         }
    //       })
    //       .catch(err => {
    //         console.error(err.message);
    //       });
    //   });
    //   return pro;
    // },
    //获取评估数据 end
    //获取体检问卷信息。
    GetEexamItems() {
      this.checkloading = true;
      this.$axios
        .post(this.$api.GetPhysicalEexamQuestionPaperByOrderCode, {
          // orderCode: this.rowData.orderCode,
          orderCode: "544B4A4F-107A-48B4-96BB-86597463D875"
        })
        .then(res => {
          this.checkloading = false;
          if (res.data.status == 1) {
            this.WJData = res.data.entity;
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //获取下拉框options
    getRptItems() {
      this.$axios
        .post(this.$api.GetDicRptItemType)
        .then(res => {
          if (res.data.status == 1) {
            this.rptItems = res.data.entity;
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //select 跳转锚点
    selChange(val) {
      let yiban = document.getElementById("yiban");
      let wuli = document.getElementById("wuli");
      let shiyanshi = document.getElementById("shiyanshi");
      let fuzhu = document.getElementById("fuzhu");
      let tijian = document.getElementById("tijian");
      let pinggu = document.getElementById("pinggu");
      switch (val) {
        case "01":
          yiban.style.display = "block";
          wuli.style.display = "none";
          shiyanshi.style.display = "none";
          fuzhu.style.display = "none";
          tijian.style.display = "none";
          pinggu.style.display = "none";
          this.getNoFJItems();
          break;
        case "02":
          yiban.style.display = "none";
          wuli.style.display = "block";
          shiyanshi.style.display = "none";
          fuzhu.style.display = "none";
          tijian.style.display = "none";
          pinggu.style.display = "none";
          this.getNoFJItems();
          break;
        case "04":
          yiban.style.display = "none";
          wuli.style.display = "none";
          shiyanshi.style.display = "none";
          fuzhu.style.display = "block";
          tijian.style.display = "none";
          pinggu.style.display = "none";
          this.getNoFJItems();
          break;
        case "03":
          yiban.style.display = "none";
          wuli.style.display = "none";
          shiyanshi.style.display = "block";
          fuzhu.style.display = "none";
          tijian.style.display = "none";
          pinggu.style.display = "none";
          this.getFJItems(); //获取实验室检查。
          break;
        case "05":
          yiban.style.display = "none";
          wuli.style.display = "none";
          shiyanshi.style.display = "none";
          fuzhu.style.display = "none";
          tijian.style.display = "none";
          pinggu.style.display = "block";
          this.getPGItems();
          //this.drawLine();
          break;
        case "06":
          yiban.style.display = "none";
          wuli.style.display = "none";
          shiyanshi.style.display = "none";
          fuzhu.style.display = "none";
          tijian.style.display = "block";
          pinggu.style.display = "none";
          this.GetEexamItems();
          break;
        default:
          break;
      }
      this.getAbnormalDefault(this.orderCode, this.curItem);
    },
    //echarts
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // let myChart = echarts.init(document.getElementById("main"));
      // let myChart2 = echarts.init(document.getElementById("maintwo"));
      // 绘制图表
      // myChart.setOption(this.chartOptions);
      // myChart2.setOption(this.chartOptions);
    },
    //checkbox选中事件
    checkboxChange(val) {
      //true ：只看异常
      if (val) {
        this.condition = "H";
      } else {
        this.condition = "";
      }
      this.getPGItems();
      this.getFJItems();
      this.getNoFJItems();
    },
    /*   弹出层方法   */
    //type: 1 一般检查  2 物理检查   3辅助检查
    showgenins(row, index, type) {
      let dialogmodal = this.$refs.dialogmodal;
      switch (type) {
        case 1:
          break;
        case 2:
          dialogmodal.title = "物理检查编辑";
          dialogmodal.suojianType = "textarea";
          dialogmodal.suojianRows = 2;
          break;
        case 3:
          dialogmodal.title = "辅助检查编辑";
          dialogmodal.suojianType = "textarea";
          dialogmodal.suojianRows = 4;
          break;
        default:
          break;
      }
      dialogmodal.genSearch = row;
      dialogmodal.genItemName = row.itemName;
      dialogmodal.dialoggeninsIsShow = true;
    },
    //实验室检查
    showlabins(row, index) {
      let dialogmodal = this.$refs.dialogmodal;
      dialogmodal.labSearch = row;
      dialogmodal.labItemName = row.itemName;
      dialogmodal.dialoglabinsIsShow = true;
    },
    //慢性病、评估
    showchrins(row, index) {
      let dialogmodal = this.$refs.dialogmodal;
      dialogmodal.chrSearch = row;
      dialogmodal.chrItemName = row.itemName;
      dialogmodal.dialogchrinsIsShow = true;
    },
    //辅助检查-图片弹出层
    showimg(path) {
      this.$refs.dialogmodal.imgPath = path;
      this.$refs.dialogmodal.dialogimgIsShow = true;
    },
    //返回父页面
    backParent() {
      this.$router.push({
        path: "/pg/" + this.parentName
      });
      this.$store.commit("changeCollapse", false);
    },
    //通过
    via() {
      let that = this;
      //提交建议
      //按照危急值 修改排序号 成功后提交评估结果
      new Promise((resolve, reject) => {
        that.tableData2.map((ele, index) => {
          return (ele.orderNum = parseInt(index + 1));
        });
        this.$axios
          .post(this.$api.BatchUpdatePgMasterRstDetail, that.tableData2)
          .then(function(response) {
            if (response.data.status == 1) {
              // that.$message.success("建议插入成功");
              resolve(true);
            } else {
              that.$message.error(
                `GetAKeySequenceByOrderCode错误：${response.data.message}`
              );
            }
          })
          .catch(function(error) {
            reject(error);
            that.$message.error(`GetAKeySequenceByOrderCode错误：${error}`);
          });
      }).then(res => {
        this.$axios
          .post(this.$api.AdoptionAssessorPGUser, {
            OrderCode: this.rowData.orderCode,
            OperatorCode: this.operatorCode
          })
          .then(res => {
            let data = res.data;
            if (data.status == 1) {
              if (data.entity) {
                that.$message.success("评估通过");
                this.$axios
                  .post(this.$api.IsHasSH)
                  .then(res => {
                    if (res.data.status == 1 && !res.data.entity) {
                      this.$axios.get(this.$api.MakeReport);
                    }
                  })
                  .catch(err => {
                    console.error(err);
                  });
                that.backParent();
              } else {
                this.openNotify("评估失败", data.message);
              }
            } else {
              that.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err.message);
          });
      });
    },
    //查看驳回原因
    showReason() {
      this.$axios
        .post(this.$api.GetLstShFinalRejectRecordByOrderCode, {
          orderCode: this.rowData.orderCode
        })
        .then(res => {
          if (res.data.status == 1) {
            this.reasonData = res.data.entity;
            console.log(this.reasonData);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    //查看图片处理
    getItems(items) {
      if (items == null) {
        return;
      }
      let imageItems = items.split("|");
      return imageItems;
    },
    showClick(val) {
      let obj = null;
      switch (val) {
        case 0:
          obj = document.getElementById("checkResult");
          break;
        case 1:
          obj = document.getElementById("abnormal");
          break;
        case 2:
          obj = document.getElementById("advSug");
          break;
      }
      this.show_Hidden(obj);
    },
    show_Hidden(obj) {
      if (obj.style.display != "none") {
        obj.style.display = "none";
      } else {
        obj.style.display = "flex";
      }
    },

    //以下是异常汇总等使用的方法
    //按疾病获取异常汇总
    getAbnormalDefault(orderCode, TypeCode) {
      if (TypeCode == "06") {
        this.$axios
          .post(this.$api.GetPaperFjRstAbnormalByOrderCodeAndType, {
            orderCode,
            TypeCode: 2
          })
          .then(res => {
            this.loading = false;
            if (res.data.status == 1) {
              if (res.data.entity.length != 0) {
                this.tableData1 = res.data.entity;
                //计算总数
                this.abnormalCount = res.data.entity.length;
              } else {
                this.tableData1 = [];
                this.abnormalCount = 0;
              }
            } else {
              this.$message(res.data.message);
            }
          })
          .catch(err => {
            console.error(1, err.message);
          });
      } else {
        this.$axios
          .post(this.$api.GetFjRstAbnormalByOrderCodeAndTypeCode, {
            orderCode,
            TypeCode
          })
          .then(res => {
            this.loading = false;
            if (res.data.status == 1) {
              if (res.data.entity.length != 0) {
                this.tableData1 = res.data.entity;
                //计算总数
                this.abnormalCount = res.data.entity.length;
              } else {
                this.tableData1 = [];
                this.abnormalCount = 0;
              }
            } else {
              this.$message(res.data.message);
            }
          })
          .catch(err => {
            console.error(1, err.message);
          });
      }
    },
    //获取所有异常汇总
    getAbnormal(orderCode, operatorCode) {
      let that = this;
      that.loading = true;
      this.$axios
        .post(this.$api.QuerySubtestExceptionItemSummaryByOrderCode, {
          orderCode,
          operatorCode
        })
        .then(function(response) {
          that.loading = false;
          if (response.data.status == 1) {
            that.tableData1 = response.data.entity;
            //计算总数
            that.abnormalCount = response.data.entity.length;
          } else {
            that.$message.error(
              `QuerySubtestExceptionItemSummaryByOrderCode错误：${
                response.data.message
              }`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(
            `QuerySubtestExceptionItemSummaryByOrderCode错误：${error}`
          );
        });
    },
    //获取医学指导建议
    getAdvice(orderCode, operatorCode) {
      let that = this;
      that.loading1 = true;
      this.$axios
        .post(this.$api.GetLstPgMasterRstDetailByOrderCode, {
          orderCode,
          operatorCode
        })
        .then(function(response) {
          that.loading1 = false;
          if (response.data.status == 1) {
            that.tableData2 = response.data.entity;
            //计算总数
            that.abnormalCount1 = response.data.entity.length;
          } else {
            that.$message.error(
              `QuerySubtestExceptionItemSummaryByOrderCode错误：${
                response.data.message
              }`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(
            `QuerySubtestExceptionItemSummaryByOrderCode错误：${error}`
          );
        });
    },
    //获取建议所属项目
    getItem(orderCode, advCode) {
      var that = this;
      this.$axios
        .post(this.$api.GetAbonomalSourceByAdvCode, {
          orderCode,
          advCode
        })
        .then(function(response) {
          if (response.data.status == 1) {
            if (response.data.entity.length != 0) {
              that.itemcodes = response.data.entity;
            }
          } else {
            that.$message.error(
              `GetAbonomalSourceByAdvCode错误：${response.data.message}`
            );
          }
        })
        .catch(function(error) {
          console.log(
            `GetAbonomalSourceByAdvCode错误(新增的建议没有项目组合)：${
              response.data.message
            }`
          );
        });
    },
    compare() {
      this.$refs.dialogcompare.compareVisible = true;
    },
    //重新生成异常汇总
    reBuild(orderCode, operatorCode) {
      let that = this;
      this.$confirm(
        '<span>确定重新生成异常汇总？</span><br /><i style="color:#8F9399;">重新生成会导致新增异常丢失，请谨慎操作</i>',
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          iconClass: "el-icon-warning",
          type: "error"
        }
      )
        .then(() => {
          this.$axios
            .post(this.$api.GenerateAbnomalSummaryByOrderCode, {
              orderCode,
              operatorCode
            })
            .then(function(response) {
              if (response.data.status == 1) {
                that.$message.success("重新生成成功");
                that.getAbnormal(orderCode, operatorCode);
                //取消加载遮罩
              } else {
                that.$message.error(
                  `GenerateAbnomalSummaryByOrderCode错误：${
                    response.data.message
                  }`
                );
              }
            })
            .catch(function(error) {
              that.$message.error(
                `GenerateAbnomalSummaryByOrderCode错误：${error}`
              );
            });
        })
        .catch(() => {
          return;
        });
    },
    reBuildAdvice(orderCode, operatorCode) {
      let that = this;
      this.$confirm(
        '<span>确定重新生成建议？</span><br /><i style="color:#8F9399;">重新生成会导致新增建议丢失，请谨慎操作</i>',
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "error"
        }
      )
        .then(() => {
          this.$axios
            .post(this.$api.GenerateMedicalGuidancesByOrderCode, {
              orderCode,
              operatorCode
            })
            .then(function(response) {
              if (response.data.status == 1) {
                that.$message.success("重新生成成功");
                that.getAdvice(orderCode, operatorCode);
                //取消加载遮罩
              } else {
                that.$message.error(
                  `GenerateMedicalGuidancesByOrderCode错误：${
                    response.data.message
                  }`
                );
              }
            })
            .catch(function(error) {
              that.$message.error(
                `GenerateAbnomalSummaryByOrderCode错误：${error}`
              );
            });
        })
        .catch(() => {
          return;
        });
    },
    reSort(orderCode) {
      var that = this;
      this.$axios
        .post(this.$api.GetAKeySequenceByOrderCode, {
          orderCode
        })
        .then(function(response) {
          if (response.data.status == 1) {
            that.tableData2 = response.data.entity;
          } else {
            that.$message.error(
              `GetAKeySequenceByOrderCode错误：${response.data.message}`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(`GetAKeySequenceByOrderCode错误：${error}`);
        });
    },
    // 拖拽上移下移 弃用
    // drag() {
    //   const el = document.querySelectorAll("#advSug table tbody")[0];
    //   Sortable.create(el, {
    //     disabled: false,
    //     ghostClass: "sortable-ghost",
    //     forceFallback: true,
    //     onEnd: evt => {}
    //   });
    // },
    //以下4个方法为 上移下移方法
    goUp() {
      let that = this;
      //如果选中的不为空
      if (this.multipleSelection1.length == 0) {
        this.$message.error("至少选中一个项目");
        return;
      }
      this.tableData2.forEach((element, index) => {
        // finalArr.push(element);
        this.multipleSelection1.forEach((ele, ind) => {
          //位置互换
          if (element.innerCode == ele.innerCode) {
            that.tableDataUp(that.tableData2, that.tableData2[index], index);
            return false;
          }
        });
      });
    },
    tableDataUp(tableData, currRow, currRowIndex) {
      if (currRowIndex > 0) {
        let upData = tableData[currRowIndex - 1];
        tableData.splice(currRowIndex - 1, 1);
        tableData.splice(currRowIndex, 0, upData);
      }
    },
    goDown() {
      let that = this;
      let arr = [];
      //如果选中的不为空
      if (this.multipleSelection1.length == 0) {
        this.$message.error("至少选中一个项目");
        return;
      }
      console.log(88, this.tableData2, this.multipleSelection1);
      this.tableData2.forEach((element, index) => {
        // finalArr.push(element);
        this.multipleSelection1.forEach((ele, ind) => {
          //位置互换
          if (element.innerCode == ele.innerCode) {
            // that.tableDataDown(that.tableData2, that.tableData2[index], index);
            let obj = {};
            obj.currRow = that.tableData2[index];
            obj.currRowIndex = index;
            arr.push(obj);
          }
        });
      });
      this.tableDataDown(this.tableData2, arr);
    },
    tableDataDown(tableData, arr) {
      arr.reverse().forEach((ele, index) => {
        if (ele.currRowIndex.index !== tableData.length - 1) {
          let downData = tableData[ele.currRowIndex];
          console.log(11, ele.currRowIndex);
          tableData.splice(ele.currRowIndex, 1);
          tableData.splice(ele.currRowIndex + 1, 0, downData);
          // tableData.splice(currRowIndex + 1, 1);
          // console.log(89,downData)
          // tableData.splice(currRowIndex, 0, tableData[currRowIndex + 1]);
        }
      });
    },
    submitAdvice() {
      var that = this;
      //提交建议
      //修改排序号
      that.tableData2.map((ele, index) => {
        return (ele.orderNum = parseInt(index + 1));
      });
      this.$axios
        .post(this.$api.BatchUpdatePgMasterRstDetail, that.tableData2)
        .then(function(response) {
          if (response.data.status == 1) {
            that.$message.success("建议插入成功");
          } else {
            that.$message.error(
              `GetAKeySequenceByOrderCode错误：${response.data.message}`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(`GetAKeySequenceByOrderCode错误：${error}`);
        });
    },
    deleteAbnormal(innerCode) {
      if (innerCode.length == 0) {
        this.$message.error("至少选中一条");
        return;
      }
      this.$confirm(
        '<span>确定对当前所选异常进行删除操作？</span><br /><i style="color:#8F9399;">删除后不可恢复，请谨慎操作</i>',
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "error"
        }
      )
        .then(() => {
          var that = this;
          this.$axios
            .post(this.$api.BatchDeleteFjRstAbnormal, innerCode)
            .then(function(response) {
              if (response.data.status == 1) {
                that.$message.success("删除成功");
                that.getAbnormal(that.orderCode, that.operatorCode);
                //取消加载遮罩
              } else {
                that.$message.error(
                  `BatchDeleteFjRstAbnormal错误：${response.data.message}`
                );
              }
            })
            .catch(function(error) {
              that.$message.error(`BatchDeleteFjRstAbnormal错误：${error}`);
            });
        })
        .catch(() => {
          return;
        });
    },
    deleteAdvice(innerCode) {
      if (innerCode.length == 0) {
        this.$message.error("至少选中一条");
        return;
      }
      this.$confirm(
        '<span>确定对当前所选建议进行删除操作？</span><br /><i style="color:#8F9399;">删除后不可恢复，请谨慎操作</i>',
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "error"
        }
      )
        .then(() => {
          var that = this;
          this.$axios
            .post(this.$api.BathchDeletePgMasterRstDetail, innerCode)
            .then(function(response) {
              if (response.data.status == 1) {
                that.$message.success("删除成功");
                that.getAdvice(that.orderCode, that.operatorCode);
                //取消加载遮罩
              } else {
                that.$message.error(
                  `BatchDeleteFjRstAbnormal错误：${response.data.message}`
                );
              }
            })
            .catch(function(error) {
              that.$message.error(`BatchDeleteFjRstAbnormal错误：${error}`);
            });
        })
        .catch(() => {
          return;
        });
    },
    //反选
    chooseReverse() {
      this.tableData1.forEach(row => {
        this.$refs.abnormalTable.toggleRowSelection(row);
      });
    },
    //反选（建议）
    chooseReverseAdvice() {
      this.tableData2.forEach(row => {
        this.$refs.adviceTable.toggleRowSelection(row);
      });
    },
    edit(row, index) {
      this.$refs.dialogaddabnormal.flag = 2;
      this.$refs.dialogaddabnormal.innerCode = row.innerCode;
      this.$refs.dialogaddabnormal.itemCode = row.rptItemCodes;
      this.$refs.dialogaddabnormal.addVisible = true;
    },
    editAdvise(row, index) {
      this.$refs.dialogeditadviece.innerCode = row.innerCode;
      this.$refs.dialogeditadviece.adviceType = row.adviceType;
      this.$refs.dialogeditadviece.adviceEditVisible = true;
    },
    addAbnormalShow() {
      this.$refs.dialogaddabnormal.flag = 1;
      this.$refs.dialogaddabnormal.addVisible = true;
    },
    addAdvicelShow() {
      this.$refs.dialogaddadviece.flag = 1;
      this.$refs.dialogaddadviece.adviceVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.abnormalChoosenCount = this.multipleSelection.length;
    },
    handleSelectionChangeSecond(val) {
      this.multipleSelection1 = val;
      this.abnormalChoosenCount1 = this.multipleSelection1.length;
    },
    rowClass: function(row, rowIndex) {
      return "color:#606266;font-size:12px";
    },
    cellClass: function(row, column, rowIndex, columnIndex) {
      return "color:#909398;font-size:10px;text-align:right";
    }
  }
};
</script>
<style scoped>
.right > * {
  display: inline-block;
}
.right .el-select {
  width: 110px;
}
.strong-Title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 19px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
}
.el-checkbox {
  margin-right: 10px;
}
.table-border {
  margin: 0px 0px -1px -1px;
  padding: 0 1px;
  border: 1px solid #ebeef5;
}
.peopleInfo .quote {
  padding: 8px 16px;
  background-color: #eff0f1;
  border-left: 5px solid #c1c4cb;
  margin: 16px 0;
}
.peopleInfo .center {
  margin: 0px 0px -1px -1px;
  padding: 10px 0;
  box-sizing: border-box;
  min-height: 97px;
  border: 1px solid #ebeef5;
}
.peopleInfo .center-smile {
  margin: 0px 0px -1px -1px;
  padding: 12px 0;
  box-sizing: border-box;
  min-height: 40px;
  border: 1px solid #ebeef5;
}
.peopleInfo .center-smile div {
  flex-direction: row;
  padding: 0px 10px;
  color: #606266;
  line-height: 20px;
  font-size: 14px;
}
.peopleInfo .center div {
  flex-direction: row;
  padding: 0px 10px;
  color: #606266;
  line-height: 1.5em;
  font-size: 14px;
}
.peopleInfo .buttom {
  margin: 0px 0px -1px -1px;
  padding: 12px 0;
  box-sizing: border-box;
  min-height: 40px;
  overflow: hidden;
  border: 1px solid #ebeef5;
}
.peopleInfo .buttom div {
  flex-direction: row;
  padding: 0px 10px;
  color: #909398;
  line-height: 1.5em;
  font-size: 10px;
  float: right;
}
.peopleInfo .tblist {
  margin: 0px 0px -1px -1px;
  padding: 12px 0;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #ebeef5;
}
.peopleInfo .tblist .title {
  padding: 0px 10px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: rgba(144, 147, 152, 1);
  opacity: 1;
}
.peopleInfo .tblist .content {
  padding: 5px 30px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: rgba(48, 49, 51, 1);
  opacity: 1;
}
.peopleInfo .quote p {
  font-size: 16px;
  color: #606266;
  line-height: 1.5em;
}
.peopleInfo .quote-s {
  padding: 4px 10px;
  background-color: rgba(251, 251, 251, 1);
  margin: 0px 0px -1px -1px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #ebeef5;
  display: block;
  min-height: 20px;
  border-radius: 4px 4px 0px 0px;
}
.peopleInfo .quote-s span {
  font-size: 14px;
  color: #606266;
  line-height: 1.5em;
}
.circle {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #ff6565;
  border-radius: 50%;
  text-align: center;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.picture {
  vertical-align: middle;
  margin-right: 5px;
}
.charts {
  margin: 0px 0px -1px -1px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  padding: 0 50px;
}
.charts div {
  width: 400px;
  height: 300px;
}

/* 以下是异常汇总等使用的样式 */
.fixContainer {
  flex: 0 0 40px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #ebeef5;
  padding: 0px 16px;
  line-height: 40px;
  color: rgba(144, 147, 152, 1);
}
.fixedBottom {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  opacity: 1;
  float: left;
}
.reverseChoose {
  margin-right: 24px;
  cursor: pointer;
}
.allCount {
  margin-right: 16px;
}
.floatRight {
  float: right;
}
#abnormal .content .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
