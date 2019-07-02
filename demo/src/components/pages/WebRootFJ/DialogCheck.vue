
<template>
  <!-- 分检检查弹窗 -->
  <el-dialog
    id="fjcheck"
    title="录入详情"
    :visible.sync="FJCheckVisible"
    width="1000px"
    @open="getInit"
    :close-on-click-modal="false"
  >
    <div class="container" style="display:flex;flex-direction:row;" v-loading="loading">
      <div style class="leftContainer" id="resizable">
        <div class="subTitle">
          <span>客户信息</span>
        </div>
        <div class="khxx" style>
          <div style="float:left">
            <div>
              <span>客户姓名:</span>
              <span>&nbsp;{{customerName}}</span>
            </div>
            <div>
              <span>性别：</span>
              <span v-if="sex == 1">&nbsp;男</span>
              <span v-else>&nbsp;女</span>
            </div>
            <div>
              <span>年龄:</span>
              <span>&nbsp;{{age}}</span>
            </div>
          </div>
          <div style="float:right;margin-top:10px">
            <img class="avatar" src="./login-bg.jpg" alt="头像">
          </div>
          <div style="clear:both;">
            <span>身份证号:</span>
            <span>{{idcardNum}}</span>
          </div>
          <div>
            <span>婚姻状况:</span>
            <span>&nbsp;{{marriageState}}</span>
          </div>
        </div>
        <div class="subTitle">
          <span>检查项目</span>
        </div>
        <div class="jcxm">
          <div
            class="overflowHandle"
            :class="{blue:blue == index}"
            @click="highLight(index,item)"
            :key="index"
            v-for="(item,index) in items"
          >{{item.rptItemName}}</div>
        </div>
      </div>
      <div class="middleContainer" id="resizable">
        <div class="subTitle" style="text-align:right;">
          <span style="float:left;">报告项目数据录入</span>
          <el-button @click="watchOther()">查看其他项目</el-button>
          <el-select
            v-model="compare"
            placeholder="历次对比"
            style="width:150px;display:inline-block;margin-left:10px;"
            @change="getAllCompareData()"
          >
            <el-option
              v-for="item in historyOrder"
              :key="item.orderCode"
              :label="item.checkBeginTime | formatDate('YYYY-MM-DD')"
              :value="item.orderCode"
            ></el-option>
          </el-select>
        </div>
        <div class="middleCt">
          <div class="bgxmsjlr">
            <div class="leftInput">
              <!-- 左侧：本次要录入的，若为01一般检查 02物理检查 -->
              <div v-if="choosedObj.typeCode == '01' || choosedObj.typeCode == '02'">
                <div :key="index" v-for="(item,index) in xiaojieSelect">
                  <div class="subTitle" style="text-align:right;border:1px solid #DCDFE5;">
                    <span style="float:left;">{{item.subItemName}}</span>
                    <span v-if="item.length!=0">
                      <!-- 点击下拉菜单时获取该选中组合项目下所有的子项目 所见和小结，用subresulttemplate函数筛选出当前子项目的下拉菜单option，并将结果存在该子项目对象里 -->
                      <!-- 一般检查不选择小结模板，通过手输来匹配规则 -->
                      <el-select
                        v-if="choosedObj.typeCode == '02'"
                        v-model="item.chooseFinding"
                        value-key="tmplCode"
                        filterable
                        placeholder="请搜索所见"
                        style="width:150px;display:inline-block;margin-left:10px;"
                        @change="appendFinding($event,index)"
                      >
                        <el-option
                          v-for="it in item.resSubResultTemplates"
                          :key="it.tmplCode"
                          :label="it.finding"
                          :value="it"
                        ></el-option>
                      </el-select>
                      <el-select
                        v-model="item.resultType"
                        placeholder="是否异常"
                        style="width:100px;display:inline-block;margin-left:10px;"
                      >
                        <el-option label="正常" value="N"></el-option>
                        <el-option label="异常" value="H"></el-option>
                      </el-select>
                    </span>
                  </div>
                  <el-input
                    type="textarea"
                    v-model="item.defaultResSubResultTemplate.finding"
                    rows="3"
                    @keyup.native="ybcjRules(item)"
                    @focus="bmiRules(item)"
                  ></el-input>
                </div>
              </div>
              <!-- 辅助检查界面 -->
              <!-- 辅助检查 若为04辅助检查 -->
              <div v-else-if="choosedObj.typeCode == '04'">
                <div class="fzjc" :key="index" v-for="(item,index) in fzjc">
                  <div class="subTitle">
                    <!-- <img class="jpgPic" :key="inx" v-for="(it,inx) in item.images" src="./login-bg.jpg" />  -->

                    <span>{{item.itemName}}</span>
                    <div class="fzjcRight">
                      <!-- 图片图标 -->
                      <span :key="ind" v-for="(imgitem,ind) in fzjc[index].images">
                        <i
                          class="el-icon-picture picture jpgPic"
                          @click="showImg(imgitem)"
                          @contextmenu.prevent="removeImg(index,ind)"
                        ></i>
                      </span>
                      <div style="padding-top:5px;height:20px;float:right">
                        <a href="javascript:;" class="a-upload">
                          <input
                            type="file"
                            name
                            :id="'scFzjc'+index"
                            @change="previewFileFzjc(index)"
                            accept="image/*"
                          >上传
                        </a>
                      </div>
                      <el-button @click="delFzjc(index)" v-if="item.ifHandAdd">移除</el-button>
                    </div>
                  </div>
                  <div>
                    <!-- 所见 -->
                    <div class="fzjcFinding fzjcDiv">
                      <div class="divTitle">所见：</div>
                      <el-input
                        class="divContent"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="item.finding"
                      ></el-input>
                    </div>
                    <div class="fzjcSummary fzjcDiv">
                      <div class="divTitle">小结：</div>
                      <el-input
                        class="divContent"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="item.summary"
                      ></el-input>
                    </div>
                    <div class="fzjcYc">
                      <span>结果类型：</span> &nbsp;
                      <el-select v-model="item.resultType" placeholder="请选择" class="resultSelect">
                        <el-option label="正常" value="N"></el-option>
                        <el-option label="异常" value="H"></el-option>
                      </el-select>
                    </div>
                    <!-- 医生 -->
                    <div class="ybjcDoc">
                      <section>
                        报告医生 :&nbsp;
                        <el-input
                          style="display:inline-block;height:30px;width:80px;"
                          type="text"
                          v-model="item.reportDoc"
                        />
                      </section>
                      <section>
                        报告时间 :&nbsp;
                        <el-input
                          style="display:inline-block;height:30px;width:110px;"
                          type="text"
                          v-model="item.reportDate"
                        />
                      </section>
                      <section>
                        审核医生 :&nbsp;
                        <el-input
                          style="display:inline-block;height:30px;width:80px;"
                          type="text"
                          v-model="item.reviewDoc"
                        />
                      </section>
                      <section>
                        审核时间 :&nbsp;
                        <el-input
                          style="display:inline-block;height:30px;width:110px;"
                          type="text"
                          v-model="item.reviewDate"
                        />
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右侧：历史订单结果 -->
            <div class="rightInput" v-if="ifShowCompare">
              <div ref="history" :key="index" v-for="(item,index) in xiaojieSelect">
                <div class="subTitle" style="text-align:right;border:1px solid #DCDFE5;">
                  <span style="float:left;">{{item.subItemName}}</span>
                </div>
                <div
                  type="textarea"
                  class="suojiandiv"
                  style
                >{{item.defaultResSubResultTemplate.finding}}</div>
              </div>
            </div>
          </div>
          <div style="text-align:center" v-if="choosedObj.typeCode == '04'">
            <el-button @click="addFzjc">
              <i class="el-icon-plus"></i>添加
            </el-button>
          </div>
        </div>
      </div>
      <!-- 小结和图片列表容器 -->
      <div
        style
        class="rightContainer"
        id="resizable"
        v-if="choosedObj.typeCode == '01'||choosedObj.typeCode == '02'"
      >
        <!-- 小结 -->
        <div class="subTitle" style="text-align:right;">
          <span style="float:left;">小结</span>
          <div>
            <el-button @click="addSummary">新增</el-button>
            <el-button @click="delSummary">删除</el-button>
          </div>
        </div>
        <div class="xj">
          <el-table
            ref="multipleTable"
            tooltip-effect="dark"
            :data="dataTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50px"></el-table-column>
            <el-table-column label="小结" prop="summary" width="100px"></el-table-column>
            <el-table-column label="操作" width="50px">
              <template slot-scope="scope">
                <el-button @click="editSummary(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 图片列表 -->
        <div class="subTitle" style="text-align:right;">
          <span style="float:left;">图片列表</span>
          <div style="padding-top:5px">
            <a href="javascript:;" class="a-upload">
              <input type="file" name id="sc" @change="previewFile()" accept="image/*">上传
            </a>
          </div>
        </div>
        <div class="tplb" style>
          <div class="tpcontainer" :key="index" v-for="(item,index) in picList">
            <img class="tp" @click="showBigPic(item)" :src="item.imageBase64">
            <div class="del" @click="delPic(index)">删除</div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer" style="display:flex;">
      <el-button style="flex:1">暂 存</el-button>
      <div style="flex:25;text-align:center;">
        <el-button type="primary" @click="saveResult()">提交录入信息</el-button>
      </div>
      <el-button style="flex:1" @click="FJCheckVisible = false">取 消</el-button>
    </span>
    <bigpic ref="bigpic"></bigpic>
    <dialogaddsummary ref="dialogaddsummary" @postSummary="addNewSummary"></dialogaddsummary>
    <dialogeditsummary ref="dialogeditsummary" @posSummary="editNewSummary"></dialogeditsummary>
    <dialogresultwatch ref="dialogresultwatch"></dialogresultwatch>
  </el-dialog>
</template>

<script>
import bigpic from "./showPic.vue";
import dialogaddsummary from "./DialogAddSummary.vue";
//编辑小结
import dialogeditsummary from "./DialogEditSummary.vue";
//查看其他项目结果
import dialogresultwatch from "./DialogResultWatch.vue";
export default {
  components: {
    bigpic,
    dialogaddsummary,
    dialogeditsummary,
    dialogresultwatch
  },
  data() {
    return {
      FJCheckVisible: false,
      // 加载等待
      loading: true,
      //当前工作人员
      operatorCode: "001",
      //用户信息
      orderCode: "c0015e6f-d95e-4deb-94cd-e2035af42b1a",
      depts: ["K01"],
      items: [],
      customerName: "",
      sex: 1,
      age: 1,
      idcardNum: "",
      marriageState: "",
      //头像
      headImg: "",
      //控制组合项目高亮，当前选中的组合项目索引
      blue: 0,
      compare: [],
      //下拉菜单 结果集
      dicSummary: [],
      //选中的小结
      chooseSummary: [],
      //选中的组合项目对象
      choosedObj: {},
      //选中组合项目下所有子项目对应的小结集合
      xiaojieSelect: [],
      //页面加载后默认的数据
      originSelect: [],
      //
      originFzjc: [],
      //所见 小结结果集
      resultList: [],
      //展示图片base64
      picList: [],
      //上传图片file，适应接口
      fileList: [],
      // 辅助检查上传图片
      picListFzjc: [],
      // 辅助检查上传图片file，适应接口
      fileListFzjc: [],
      //小结
      dataTable: [],
      //小结选中的checkbox
      multipleSelection: [],
      //历史订单
      historyOrder: "",
      //选中组合项目下所有子项目对应的小结集合
      historyxiaojieSelect: [],
      //请求报告后根据有无对比报告数据确定是否显示出对比报告
      ifShowCompare: false,
      //切换组合项目时是否需要请求对比报告，该订单点击过历史订单就将该字段置1
      ifAsk: false,
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
      ]
    };
  },
  methods: {
    //弹窗打开初始化方法
    getInit() {
      // 初始化重置为空
      this.resetEmpty();
      // 切换项目，显示加载状态
      this.loading = false;
      // 获取是否有历史订单
      this.getCompare(this.orderCode);
      //加载组合项目
      this.getItems().then(res => {
        if (res.length != 0) {
          this.blue = 0;
          this.choosedObj = res[0];
          // 判断是什么类型项目
          if (this.choosedObj.typeCode == "04") {
            this.getFzjcInit();
            if (this.ifAsk) {
              this.getFzjcHistory();
            }
          } else if (
            this.choosedObj.typeCode == "01" ||
            this.choosedObj.typeCode == "02"
          ) {
            //获取该组合项目下所有子项目所见和小结
            this.getAllSubResultTemplate();
            //如果需要获取则获取对比报告
            if (this.ifAsk) {
              this.getAllCompareData();
            }
          }
        }
      });
    },
    // 重置为空
    resetEmpty() {
      this.compare = [];
      //下拉菜单 结果集
      this.dicSummary = [];
      //选中的小结
      this.chooseSummary = [];
      //选中的组合项目对象
      this.choosedObj = {};
      //选中组合项目下所有子项目对应的小结集合
      this.xiaojieSelect = [];
      //页面加载后默认的数据
      this.originSelect = [];
      //
      (this.originFzjc = []),
        //所见 小结结果集
        (this.resultList = []);
      //展示图片base64
      this.picList = [];
      //上传图片file，适应接口
      this.fileList = [];
      // 辅助检查上传图片
      this.picListFzjc = [];
      // 辅助检查上传图片file，适应接口
      this.fileListFzjc = [];
      //小结
      this.dataTable = [];
      //小结选中的checkbox
      this.multipleSelection = [];
      //历史订单
      this.historyOrder = "";
      //选中组合项目下所有子项目对应的小结集合
      this.historyxiaojieSelect = [];
      //请求报告后根据有无对比报告数据确定是否显示出对比报告
      this.ifShowCompare = false;
      //切换组合项目时是否需要请求对比报告，该订单点击过历史订单就将该字段置1
      this.ifAsk = false;
      //辅助检查结果
      this.fzjc = [];
    },
    //获取用户信息是从父页面获取的

    //获取开单组合项目
    getItems() {
      var that = this;
      let entity = {};
      //拼接提交数据
      entity.orderCode = that.orderCode;
      //只取options对象中的deptCode
      let arr = [];
      this.depts.forEach((item, index) => {
        arr.push(item.deptCode);
      });
      entity.depts = arr;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.InspectionItem, entity)
          .then(function(response) {
            console.log(8889, response.data);
            if (response.data.status == 1 && response.data.entity.length != 0) {
              //设置默认值
              // that.deptCode = response.data.entity[0].deptCode;
              that.items = response.data.entity;
              resolve(response.data.entity);
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(false);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(false);
          });
      });
      return pro;
    },
    //切换开单组合项目，当前点击组合项目高亮
    async highLight(index, item) {
      let that = this;
      let prevBlue = this.blue;
      //判断有没切换至其他组合项目
      if (index != prevBlue) {
        // && this.fileList == 0
        //切换菜单判断界面是否修改过
        // 如果离开之前的对象(prevBlue是上一个的索引)是一般检查或物理检查
        if (
          that.items[prevBlue].typeCode == "01" ||
          that.items[prevBlue].typeCode == "02"
        ) {
          if (
            this.originSelect ==
            JSON.stringify(this.xiaojieSelect) +
              JSON.stringify(this.dataTable) +
              JSON.stringify(this.fileList)
          ) {
          } else {
            //若修改过，弹出提示框 确认是否要提交结论
            await this.$confirm(
              "<span>是否提交已编辑结论？</span><br />",
              "提交确认",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                dangerouslyUseHTMLString: true,
                type: "warning"
              }
            )
              .then(() => {
                that.saveResult();
              })
              .catch(action => {});
          }
        }
        // 如果是辅助检查
        else if (that.items[prevBlue].typeCode == "04") {
          if (this.originFzjc == JSON.stringify(this.fzjc)) {
          } else {
            //若修改过，弹出提示框 确认是否要提交结论
            await this.$confirm(
              "<span>是否提交已编辑辅助检查结论？</span><br />",
              "提交确认",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                dangerouslyUseHTMLString: true,
                type: "warning"
              }
            )
              .then(() => {
                that.saveResult();
              })
              .catch(action => {});
          }
        }
      } else {
      }
      this.blue = index;
      this.choosedObj = item;
      // 判断是什么类型项目
      if (item.typeCode == "04") {
        this.getFzjcInit();
        if (this.ifAsk) {
          this.getFzjcHistory();
        }
      } else if (item.typeCode == "01" || item.typeCode == "02") {
        //获取该组合项目下所有子项目所见和小结
        this.getAllSubResultTemplate();
        //如果需要获取则获取对比报告
        if (this.ifAsk) {
          this.getAllCompareData();
        }
      }

      //提交该项目所见和小结，提交后清除其下拉菜单choosesummary值以及content值
    },
    //根据组合项目获取子项目
    getAllSubResultTemplate() {
      let that = this;
      let entity = {};
      let arr = [];
      arr.push(that.choosedObj.rptItemCode);
      entity.orderCode = that.orderCode;
      entity.rptItemCode = arr;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.InspectionItemDetail, entity)
          .then(function(response) {
            that.loading = false;
            if (response.data.entity != 0) {
              console.log(response.data.entity, 5656);
              //页面加载后的要操作的数据对象
              that.xiaojieSelect = response.data.entity.resSubItems;
              //页面加载后的原始数据对象，用于切换组合项目或关闭弹窗时判断是否弹出保存提示框
              that.originSelect =
                JSON.stringify(response.data.entity.resSubItems) +
                JSON.stringify(response.data.entity.summaryList) +
                JSON.stringify(response.data.entity.resImageLists);
              // 初始化小结
              if (response.data.entity.summaryList.length != 0) {
                that.dataTable = response.data.entity.summaryList;
              } else {
                that.dataTable = [];
              }
              // 初始化图片
              if (response.data.entity.resImageLists.length != 0) {
                that.picList = [];
                that.fileList = [];
                response.data.entity.resImageLists.forEach(ele => {
                  that.picList.push(ele);
                });
                response.data.entity.resImageLists.forEach(ele => {
                  that.fileList.push(ele);
                });
              } else {
                that.picList = [];
                that.fileList = [];
              }
              resolve(true);
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(false);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(false);
          });
      });
      return pro;
    },
    //显示大图
    showBigPic(src) {
      this.$refs.bigpic.dialogVisible = true;
      this.$refs.bigpic.src = src;
    },
    // 一般检查，物理检查上传图片
    previewFile() {
      let that = this;
      //   var preview = document.querySelector("img");
      var file = document.querySelector("input[type=file]").files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function() {
        let obj = {};
        obj.imageBase64 = reader.result;
        //picList展示缩略图
        that.picList.push(obj);
        //fileList只保存新增的图片，上传给后台
        that.fileList.push(obj);
      };
      document.getElementById("sc").value = "";
    },
    // 一般检查，物理检查删除图片
    delPic(index) {
      this.$confirm(
        '<span>您确定要删除该图片吗？</span><br /><i style="color:#8F9399;">确定删除后将不可恢复</i>',
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "error"
        }
      ).then(() => {
        this.picList.splice(index, 1);
        this.fileList.splice(index, 1);
      });
    },
    // 辅助检查图片上传
    previewFileFzjc(index) {
      let that = this;
      var file = document.getElementById("scFzjc" + index).files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        that.fzjc[index].images.push(reader.result);
      };
      document.getElementById("scFzjc" + index).value = "";
    },
    //添加小结
    addSummary() {
      this.$refs.dialogaddsummary.adviceEditVisible = true;
    },
    //子传父处理数据
    addNewSummary(data) {
      this.dataTable.push(data);
    },
    //编辑小结
    editSummary(row, index) {
      this.$refs.dialogeditsummary.EditVisible = true;
      this.$refs.dialogeditsummary.content = row.summary;
      this.$refs.dialogeditsummary.index = index;
    },
    //子传父处理数据
    editNewSummary(data) {
      console.log(data);
      this.dataTable[data.index].summary = data.content;
    },
    handleSelectionChange(val) {
      console.log(val, 7788);
      this.multipleSelection = val;
    },
    //删除小结
    delSummary() {
      let that = this;
      //删除小结确认
      if (that.multipleSelection.length != 0) {
        this.$confirm(
          '<span>您确定要删除已选中的小结吗？</span><br /><i style="color:#8F9399;">确定删除后将不可恢复</i>',
          "删除确认",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            dangerouslyUseHTMLString: true,
            type: "error"
          }
        ).then(() => {
          this.dataTable.forEach((item, index) => {
            that.multipleSelection.forEach((it, idx) => {
              if (item == it) {
                //要用选中长度，删除所有选中的项目
                that.dataTable.splice(index, that.multipleSelection.length);
              }
            });
          });
        });
      }
    },
    //选择小结 并自动填充所见 小结
    appendFinding(value, index) {
      //若不为空且不重复,添加所选所见的对应小结
      if (value.summary != "" && value.summary != null) {
        let ifSame = this.dataTable.filter((item, index) => {
          return item.summary == value.summary;
        });
        console.log(43, value);
        if (ifSame.length == 0) {
          this.dataTable.push(value);
        }
      }
      if (value.isAbnormal) {
        // 若之前是正常，选了异常，将所见的 ”未见明显异常“ 所见删除，和未见明显异常小结删除
        if (this.xiaojieSelect[index].resultType == "N") {
          this.xiaojieSelect[index].defaultResSubResultTemplate.finding = "";
          this.dataTable.forEach((item, index) => {
            if (
              item.rptSubItemCode == value.rptSubItemCode &&
              item.isAbnormal == false
            ) {
              this.dataTable.splice(index, 1);
            }
          });
        }
        // 设置异常标志
        this.xiaojieSelect[index].resultType = "H";

        this.xiaojieSelect[index].defaultResSubResultTemplate.finding +=
          value.finding + "；";
      } else {
        // 设置正常标志
        this.xiaojieSelect[index].resultType = "N";
        //当前所见若为无明显异常替换 不为无明显异常append
        this.xiaojieSelect[index].defaultResSubResultTemplate.finding =
          value.finding;
        this.dataTable = this.dataTable.filter((item, index) => {
          return item.rptSubItemCode != value.rptSubItemCode;
        });
      }
    },
    // 提交结果，需要判断提交的是物理检查（包含一般检查）结果还是辅助检查结果
    saveResult() {
      if (this.choosedObj.typeCode == "04") {
        this.summitFzjc();
      }
      // 修改后提交
      else if (this.ybjcChanged()) {
        this.SaveOrUpdateCommonSubItemResult();
      }
      // 一般检查第一次提交
      else {
        this.postResult();
      }
    },
    // 判断一般检查是否修改过
    ybjcChanged() {
      let ifchanged = false;
      this.xiaojieSelect.forEach(ele => {
        if (
          ele.defaultResSubResultTemplate.innerCode != "" &&
          ele.defaultResSubResultTemplate.innerCode != null
        ) {
          ifchanged = true;
        }
      });
      return ifchanged;
    },
    // 修改一般检查后保存调用
    SaveOrUpdateCommonSubItemResult() {
      let that = this;
      //所见和结论数组
      let entity = {};
      //要提交的对象
      let arr = [];
      //拼接所见上传参数 由于接口要一起传所见，小结，图片,所以三者分开拼接
      if (this.xiaojieSelect.length != 0) {
        //循环子项目获取所见数据
        this.xiaojieSelect.forEach((item, index) => {
          console.log("所见对象", item);
          //拼接所见传输参数
          let entityFinding = {};
          //判断是否是编辑所见
          if (
            item.defaultResSubResultTemplate.innerCode != null &&
            item.defaultResSubResultTemplate.innerCode != ""
          ) {
            entityFinding.innerCode =
              item.defaultResSubResultTemplate.innerCode;
          }
          entityFinding.orderCode = this.orderCode;
          entityFinding.rptItemCode = this.choosedObj.rptItemCode;
          entityFinding.rptSubItemCode = item.subItemCode;
          //若填写了finding
          if (item.defaultResSubResultTemplate.finding) {
            entityFinding.findings = item.defaultResSubResultTemplate.finding;
          }
          entityFinding.resultType = item.resultType;
          entityFinding.rptDoctor = this.operatorCode;
          entityFinding.operator = this.operatorCode;
          entityFinding.reviewDoctor = this.operatorCode;
          //将所见对象放入数组
          arr.push(entityFinding);
        });
      }
      //拼接小结上传参数 由于接口要一起传所见，小结，图片,所以三者分开拼接
      if (this.xiaojieSelect.length != 0) {
        //循环子项目获取所见数据
        this.dataTable.forEach((item, index) => {
          //拼接小结传输参数
          let entitySummary = {};
          //判断是否是编辑所见
          if (item.innerCode != null && item.innerCode != "") {
            entitySummary.innerCode = item.innerCode;
          }
          entitySummary.orderCode = this.orderCode;
          entitySummary.rptItemCode = this.choosedObj.rptItemCode;
          if (item.rptSubItemCode) {
            entitySummary.rptSubItemCode = item.rptSubItemCode;
          }
          if (item.summary) {
            entitySummary.summary = item.summary;
          }
          entitySummary.rptDoctor = this.operatorCode;
          entitySummary.operator = this.operatorCode;
          entitySummary.reviewDoctor = this.operatorCode;
          //将小结对象放入数组
          arr.push(entitySummary);
        });
      }
      entity.reqCommonSubItemResults = arr;
      //拼接图片上传参数 由于接口要一起传所见，小结，图片,所以三者分开拼接
      let images = [];
      if (this.fileList.length != 0) {
        console.log(this.fileList);
        //循环新增图片列表获取所见数据
        this.fileList.forEach((item, index) => {
          console.log(item, 6655);
          //拼接图片上传传输参数
          let entityPhoto = {};
          entityPhoto.orderCode = this.orderCode;
          entityPhoto.rptItemCode = this.choosedObj.rptItemCode;
          entityPhoto.imgBase64 = item.imageBase64;
          if (item.innerCode) {
            entityPhoto.innerCode = item.innerCode;
          }
          //将图片base64对象放入数组
          images.push(entityPhoto);
        });
        entity.images = images;
      }
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.SaveOrUpdateCommonSubItemResult, entity)
          .then(function(response) {
            that.$message.success(`结论修改成功`);
            if (response.data.entity != 0) {
              resolve(true);
              // 如果提交成功就不做切换验证
              that.notChangeSubmit();
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(false);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(false);
          });
      });
      return pro;
      this.FJCheckVisible = false;
    },
    //提交一般检查结果
    postResult() {
      let that = this;
      //所见和结论数组
      let entity = {};
      //要提交的对象
      let arr = [];
      //拼接所见上传参数 由于接口要一起传所见，小结，图片,所以三者分开拼接
      if (this.xiaojieSelect.length != 0) {
        //循环子项目获取所见数据
        this.xiaojieSelect.forEach((item, index) => {
          console.log("所见对象", item);
          //拼接所见传输参数
          let entityFinding = {};
          //判断是否是编辑所见
          if (
            item.defaultResSubResultTemplate.innerCode != null &&
            item.defaultResSubResultTemplate.innerCode != ""
          ) {
            entityFinding.innerCode =
              item.defaultResSubResultTemplate.innerCode;
          }
          entityFinding.orderCode = this.orderCode;
          entityFinding.rptItemCode = this.choosedObj.rptItemCode;
          entityFinding.rptSubItemCode = item.subItemCode;
          //若填写了finding
          if (item.defaultResSubResultTemplate.finding) {
            entityFinding.findings = item.defaultResSubResultTemplate.finding;
          }
          entityFinding.resultType = item.resultType;
          entityFinding.rptDoctor = this.operatorCode;
          entityFinding.operator = this.operatorCode;
          entityFinding.reviewDoctor = this.operatorCode;
          //将所见对象放入数组
          arr.push(entityFinding);
        });
      }
      //拼接小结上传参数 由于接口要一起传所见，小结，图片,所以三者分开拼接
      if (this.xiaojieSelect.length != 0) {
        //循环子项目获取所见数据
        this.dataTable.forEach((item, index) => {
          //拼接小结传输参数
          let entitySummary = {};
          //判断是否是编辑所见
          if (item.innerCode != null && item.innerCode != "") {
            entitySummary.innerCode = item.innerCode;
          }
          entitySummary.orderCode = this.orderCode;
          entitySummary.rptItemCode = this.choosedObj.rptItemCode;
          if (item.rptSubItemCode) {
            entitySummary.rptSubItemCode = item.rptSubItemCode;
          }
          if (item.summary) {
            entitySummary.summary = item.summary;
          }
          entitySummary.rptDoctor = this.operatorCode;
          entitySummary.operator = this.operatorCode;
          entitySummary.reviewDoctor = this.operatorCode;
          //将小结对象放入数组
          arr.push(entitySummary);
        });
      }
      entity.reqCommonSubItemResults = arr;
      //拼接图片上传参数 由于接口要一起传所见，小结，图片,所以三者分开拼接
      let images = [];
      if (this.fileList.length != 0) {
        console.log(this.fileList);
        //循环新增图片列表获取所见数据
        this.fileList.forEach((item, index) => {
          console.log(item, 6655);
          //拼接图片上传传输参数
          let entityPhoto = {};
          entityPhoto.orderCode = this.orderCode;
          entityPhoto.rptItemCode = this.choosedObj.rptItemCode;
          entityPhoto.imgBase64 = item.imageBase64;
          //将图片base64对象放入数组
          images.push(entityPhoto);
        });
        entity.images = images;
      }
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.SaveCommonSubItemResult, entity)
          .then(function(response) {
            console.log(response.data, 999);
            if (response.data.entity != 0) {
              that.$message.success(`结论提交成功`);
              // 如果提交成功就不做切换验证
              that.notChangeSubmit();
              resolve(true);
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(false);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(false);
          });
      });
      return pro;
      this.FJCheckVisible = false;
    },
    //获取历次对比订单
    getCompare(orderCode) {
      let that = this;
      this.$axios
        .post(this.$api.ReviewSummaryEachExceptionByOrderCode, {
          orderCode
        })
        .then(function(response) {
          console.log(999, response);
          if (response.data.status == 1) {
            if (response.data.entity.length != 0) {
              that.historyOrder = response.data.entity;
              if (response.data.entity.length != 0) {
                that.value = response.data.entity[0].orderCode;
              }
              // that.getAbnormal(that.value,2)
            }
          } else {
            that.$message.error(
              `ReviewSummaryEachExceptionByOrderCode错误：${
                response.data.message
              }`
            );
          }
        })
        .catch(function(error) {
          that.loading = false;
          that.$message.error(
            `ReviewSummaryEachExceptionByOrderCode错误：${error}`
          );
        });
    },
    //请求历次对比数据
    getAllCompareData() {
      let that = this;
      that.ifAsk = true;
      let entity = {};
      that.choosedObj.rptItemCode;
      entity.OrderCode = that.compare;
      entity.RptItemCode = that.choosedObj.rptItemCode;
      console.log(45, entity);
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .get(this.$api.GetCommonSubItemResultHistory, {
            params: entity
          })
          .then(function(response) {
            if (response.data.entity.length != 0 && response.data.status == 1) {
              that.ifShowCompare = true;
              console.log(0, response.data.entity);
              //页面加载后的历史订单数据
              that.historyxiaojieSelect = response.data.entity;
              resolve(true);
            } else {
              that.ifShowCompare = false;
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(false);
          });
      });
      return pro;
    },
    //查看其它检查项目结论
    watchOther() {
      this.$refs.dialogresultwatch.resultwatch = true;
    },
    //辅助检查查看大图
    showImg(src) {
      this.$refs.bigpic.dialogVisible = true;
      this.$refs.bigpic.src = src;
    },
    // 右键删除图片
    removeImg(index, ind) {
      this.fzjc[index].images.splice(ind, 1);
    },
    //手动添加辅助检查项目
    addFzjc() {
      console.log(this.fzjc,6654)
      let empty = {};
      empty.itemName = this.fzjc[0].itemName;
      empty.rptItemCode = this.fzjc[0].rptItemCode;
      empty.rptSubItemCode = this.fzjc[0].rptSubItemCode;
      empty.orderCode = this.fzjc[0].orderCode;
      empty.summary = "";
      empty.reportDoc = "";
      empty.reportDate = "";
      empty.reviewDoc = "";
      empty.reviewDate = "";
      empty.finding = "";
      empty.resultType = "";
      empty.images = [];
      //判断该条是否手动添加的，只有手动添加的才显示移除按钮
      empty.ifHandAdd = true;
      //添加一个空对象
      this.fzjc.push(empty);
    },
    //移除手动添加的辅助检查项目
    delFzjc(index) {
      this.fzjc.splice(index, 1);
    },
    //获取辅助检查默认值
    getFzjcInit() {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .get(this.$api.GetFZJCItem, {
            params: {
              orderCode: that.orderCode,
              rptItemCode: that.choosedObj.rptItemCode
            }
          })
          .then(function(response) {
            if (response.data.status == 1) {
              console.log(response.data.entity, 111);
              // 要操作对象
              that.fzjc = response.data.entity;
              //页面加载后的原始数据对象，用于切换组合项目或关闭弹窗时判断是否弹出保存提示框
              that.originFzjc = JSON.stringify(response.data.entity);
              resolve(true);
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(false);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(false);
          });
      });
      return pro;
    },
    //获取辅助检查历史数据
    getFzjcHistory() {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .get(this.$api.GetFZJCItemHistoryResult, {
            params: {
              orderCode: that.orderCode,
              rptItemCode: that.choosedObj.rptItemCode
            }
          })
          .then(function(response) {
            if (response.data.status == 1) {
              that.historyxiaojieSelect = response.data.entity;
              resolve(true);
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(false);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(false);
          });
      });
      return pro;
    },
    // 不做切换验证方法
    notChangeSubmit() {
      let that = this;
      if (
        that.choosedObj.typeCode == "01" ||
        that.choosedObj.typeCode == "02"
      ) {
        this.originSelect =
          JSON.stringify(this.xiaojieSelect) +
          JSON.stringify(this.dataTable) +
          JSON.stringify(this.fileList);
      } else if (that.choosedObj.typeCode == "04") {
        this.originFzjc = JSON.stringify(this.fzjc);
      }
    },
    //提交辅助检查数据
    summitFzjc() {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.SaveFZJCItemResult, this.fzjc)
          .then(function(response) {
            if (response.data.status == 1) {
              that.$message.success(`提交成功`);
              // 如果提交成功就不做切换验证
              that.notChangeSubmit();
              resolve(true);
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(false);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(false);
          });
      });
      return pro;
    },
    // 一般检查处理规则，keyup
    ybcjRules(item) {
      let that = this;
      // 如果当前项目是一般检查
      if (this.choosedObj.typeCode == "01") {
        switch (item.subItemCode) {
          // 如果是收缩压
          case "90002":
            {
              // 设置异常，增加小结（需要一起判断收缩压和舒张压）
              that.bloodSSYPressure(item);
            }
            break;
          // 如果是舒张压
          case "90003":
            {
              // 设置异常，增加小结（需要一起判断收缩压和舒张压）
              that.bloodSZYPressure(item);
            }
            break;
        }
      }
    },
    // 设置一般检查收缩压正常异常，增加小结（需要一起判断收缩压和舒张压）
    bloodSSYPressure(item) {
      let find = item.defaultResSubResultTemplate.finding;
      // 设置正常与否
      if (parseInt(find) >= 140) {
        item.resultType = "H";
      } else if (parseInt(find) >= 120 && parseInt(find) <= 139) {
        item.resultType = "H";
      } else if (parseInt(find) >= 90 && parseInt(find) <= 119) {
        item.resultType = "N";
      } else if (parseInt(find) < 90) {
        item.resultType = "H";
      }

      // 进入规则判断是否异常并添加小结(舒张压先输入情况)
      this.rules();
    },
    // 设置一般检查舒张压正常异常，增加小结（需要一起判断收缩压和舒张压）
    bloodSZYPressure(item) {
      let find = item.defaultResSubResultTemplate.finding;
      // 设置正常与否
      if (parseInt(find) >= 90) {
        item.resultType = "H";
      } else if (parseInt(find) >= 80 && parseInt(find) <= 89) {
        item.resultType = "H";
      } else if (parseInt(find) >= 60 && parseInt(find) <= 79) {
        item.resultType = "N";
      } else if (parseInt(find) < 60) {
        item.resultType = "H";
      }
      // 进入规则判断是否异常并添加小结
      this.rules();
    },
    // 血压判断规则
    rules() {
      let szy = null;
      let find = null;
      this.xiaojieSelect.forEach(element => {
        // 如果是舒张压
        if (
          element.subItemCode == "90003" &&
          parseInt(element.defaultResSubResultTemplate.finding)
        ) {
          szy = parseInt(element.defaultResSubResultTemplate.finding);
        }
        // 如果是收缩压
        if (
          element.subItemCode == "90002" &&
          parseInt(element.defaultResSubResultTemplate.finding)
        ) {
          find = parseInt(element.defaultResSubResultTemplate.finding);
        }
      });
      // 如果舒张压和收缩压都不等于null，则进入规则判断是否正常并且是否要添加小结
      if (szy != null && find != null) {
        //清除血压的小结
        this.dataTable = this.dataTable.filter(el => {
          return el.summary.indexOf("血压") === -1;
        });
        // ----------收缩压舒张压规则----------
        // 收缩压大于140
        if (parseInt(find) >= 140) {
          let obj = {};
          obj.index = "";
          obj.summary = "血压升高";
          this.dataTable.push(obj);
        }
        // 收缩压大于120 小于140
        else if (parseInt(find) >= 120 && parseInt(find) <= 139) {
          let obj = {};
          obj.index = "";
          // 如果舒张压大于等于90
          if (szy >= 90) {
            obj.summary = "血压升高";
            this.dataTable.push(obj);
          }
          // 其他的都是正常高值
          else {
            obj.summary = "血压正常高值";
            this.dataTable.push(obj);
          }
        }
        // 收缩压大于90 小于120
        else if (parseInt(find) >= 90 && parseInt(find) <= 119) {
          let obj = {};
          obj.index = "";
          // 如果舒张压大于等于90
          if (szy >= 90) {
            obj.summary = "血压升高";
            this.dataTable.push(obj);
          } else if (szy >= 80 && szy < 90) {
            obj.summary = "血压正常高值";
            this.dataTable.push(obj);
          }
          // 正常血压，舒张压60-80
          else if (szy >= 60 && szy < 80) {
          }
          //
          else if (szy < 60) {
            obj.summary = "血压偏低";
            this.dataTable.push(obj);
          }
        }
        // 收缩压小于90
        else if (parseInt(find) < 90) {
          let obj = {};
          obj.index = "";
          // 如果舒张压大于等于90
          if (szy >= 90) {
            obj.summary = "血压升高";
            this.dataTable.push(obj);
          } else if (szy >= 80 && szy < 90) {
            obj.summary = "血压正常高值";
            this.dataTable.push(obj);
          }
          // 正常血压，舒张压60-80
          else if (szy >= 60 && szy < 80) {
            obj.summary = "血压偏低";
            this.dataTable.push(obj);
          }
          //
          else if (szy < 60) {
            obj.summary = "血压偏低";
            this.dataTable.push(obj);
          }
        }
        // ------------------------------------------
      }
    },
    // bmi规则
    bmiRules(item) {
      let that = this;
      // 如果当前项目是一般检查
      if (this.choosedObj.typeCode == "01") {
        switch (item.subItemCode) {
          // 如果是体重指数
          case "90006":
            {
              // 计算体重指数，并计算是否正常
              that.heavyHeightNumber(item);
            }
            break;
        }
      }
    },
    // 身高体重判断规则（体重kg，身高m）
    heavyHeightNumber(item) {
      let height = null;
      let heavy = null;
      this.xiaojieSelect.forEach(element => {
        // 如果是身高
        if (
          element.subItemCode == "90004" &&
          parseInt(element.defaultResSubResultTemplate.finding)
        ) {
          height = parseInt(element.defaultResSubResultTemplate.finding);
        }
        // 如果是体重
        if (
          element.subItemCode == "90005" &&
          parseInt(element.defaultResSubResultTemplate.finding)
        ) {
          heavy = parseInt(element.defaultResSubResultTemplate.finding);
        }
      });
      // 如果身高不等于null，则进入规则判断是否正常并且是否要添加小结
      if (height != null && heavy != null) {
        //清除体重指数的小结
        this.dataTable = this.dataTable.filter(el => {
          return el.summary.indexOf("血压") !== -1;
        });
        // bmi = 体重(kg) / 身高^2(m)
        let bmi = heavy / Math.pow(height / 100, 2);
        // 体重指数结果值填充
        item.defaultResSubResultTemplate.finding = parseInt(bmi);
        //
        if (bmi < 18.5) {
          let obj = {};
          obj.index = "";
          obj.summary = "体重过轻";
          this.dataTable.push(obj);
          // 设置异常
          item.resultType = "H";
        } else if (bmi >= 24 && bmi < 28) {
          let obj = {};
          obj.index = "";
          obj.summary = "超重";
          this.dataTable.push(obj);
          item.resultType = "H";
        } else if (bmi >= 28) {
          let obj = {};
          obj.index = "";
          obj.summary = "肥胖";
          this.dataTable.push(obj);
          item.resultType = "H";
        }
      }
    }
  }
};
</script>

<style>
#fjcheck .el-dialog__body {
  padding: 17px !important;
}
.leftContainer {
  flex: 0 0 200px;
  border: 1px solid #dcdfe5;
  display: flex;
  flex-direction: column;
}
.middleContainer {
  flex: 1 0 564px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dcdfe5;
  border-right: 1px solid #dcdfe5;
}
.rightContainer {
  flex: 0 0 200px;
  border: 1px solid #dcdfe5;
  border-left: 0px;
  display: flex;
  flex-direction: column;
}
#fjcheck .jcxm {
  flex: 0 0 85px;
  padding: 5px 19px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  color: rgba(48, 49, 51, 1);
  opacity: 1;
  overflow-y: auto;
}
.overflowHandle {
  width: 142px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.khxx {
  border-bottom: 1px solid #dcdfe5;
  padding: 5px 10px 10px 10px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(48, 49, 51, 1);
  line-height: 38px;
  opacity: 1;
  vertical-align: top;
  flex: 0 0 265px;
}
.bgxmsjlr {
  padding: 12px;

  overflow-y: auto;
  display: flex;
}
.leftInput {
  flex: 1 0 358px;
}
.rightInput {
  flex: 0 0 180px;
  margin-left: 5px;
}
.suojiandiv {
  padding: 5px;
  height: 63px;
  margin-bottom: 10px;
  overflow: auto;
  border: 1px solid #dcdfe5;
  word-break: break-all;
  line-height: 20px;
}
.xj {
  flex: 0 0 280px;
  overflow: auto;
}
.tplb {
  flex: 0 0 95px;
  padding: 7px;
  overflow-y: auto;
}
#fjcheck thead {
  display: none;
}
.blue {
  color: #409fff;
}
#fjcheck .el-textarea__inner {
  border-radius: 0 !important;
  margin-bottom: 10px;
}
#fjcheck .subTitle {
  border-bottom: 1px solid #eff0f1 !important;
}
#fjcheck .avatar {
  width: 68px;
  height: 87px;
}
#fjcheck .tpcontainer {
  float: left;
  margin-right: 5px;
  margin-bottom: 6px;
}
#fjcheck .tp {
  width: 40px;
  height: 40px;
}
#fjcheck .del {
  text-align: center;
  cursor: pointer;
}
/*a  upload */
.a-upload {
  padding: 4px 10px;
  height: 20px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: #888;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}

.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}

.a-upload:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none;
}
.fzjc {
  border: 1px solid rgba(220, 223, 230, 1);
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  margin-bottom: 10px;
}
.fzjcDiv {
  padding: 8px 16px;
  font-size: 12px;
  border-bottom: 1px solid #dcdfe6;
  min-height: 70px;
  display: flex;
}
.fzjcYc {
  padding: 8px 16px;
  font-size: 12px;
  border-bottom: 1px solid #dcdfe6;
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
#fjcheck .resultSelect {
  display: inline-block;
  width: 100px;
}
.fzjcRight {
  display: inline-block;
  float: right;
}
.middleCt {
  flex: 0 0 422px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dcdfe5;
  overflow: auto;
}
.divTitle {
  line-height: 18px;
  flex: 1;
}
.divContent {
  flex: 9;
  line-height: 18px;
}
.jpgPic {
  margin-right: 5px;
  font-size: 16px;
}
#fjcheck .el-input__inner {
  height: 24px !important;
}
</style>