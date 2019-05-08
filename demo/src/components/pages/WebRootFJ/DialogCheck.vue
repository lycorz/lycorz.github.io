
<template>
  <!-- 分检检查弹窗 -->
  <el-dialog
    id="fjcheck"
    title="录入详情"
    :visible.sync="FJCheckVisible"
    width="1000px"
    @open="getInit"
  >
    <div class="container" style="display:flex;flex-direction:row;">
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
              <!-- 左侧：本次要录入的 -->
              <div v-if="choosedObj.xx == 1">
                <div :key="index" v-for="(item,index) in xiaojieSelect">
                  <div class="subTitle" style="text-align:right;border:1px solid #DCDFE5;">
                    <span style="float:left;">{{item.subItemName}}</span>
                    <span v-if="item.length!=0">
                      <!-- 点击下拉菜单时获取该选中组合项目下所有的子项目 所见和小结，用subresulttemplate函数筛选出当前子项目的下拉菜单option，并将结果存在该子项目对象里 -->
                      <el-select
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
                  ></el-input>
                </div>
              </div>
              <!-- 辅助检查界面 -->
              <!-- 辅助检查 -->
              <div v-else>
                <div class="fzjc" :key="index" v-for="(item,index) in fzjc">
                  <div class="subTitle">
                    <!-- <img class="jpgPic" :key="inx" v-for="(it,inx) in item.images" src="./login-bg.jpg" />  -->
                    <span>辅助检查（{{item.itemname}}）</span>
                    <div class="fzjcRight">
                      <!-- 图片图标 -->
                      <i class="el-icon-picture picture jpgPic" @click="showimg(imgitem)"></i>
                      <el-button @click="addSummary">上传</el-button>
                      <el-button @click="delSummary">删除</el-button>
                    </div>
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
                      <el-select v-model="choosedAbnormal" placeholder="请选择" class="resultSelect">
                        <el-option label="正常" value="N"></el-option>
                        <el-option label="异常" value="H"></el-option>
                      </el-select>
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
          <div style="text-align:center">
            <el-button @click="delSummary">上传</el-button>
          </div>
        </div>
      </div>
      <div style class="rightContainer" id="resizable">
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
        <div class="subTitle" style="text-align:right;">
          <span style="float:left;">图片列表</span>
          <div style="padding-top:5px">
            <a href="javascript:;" class="a-upload">
              <input type="file" name id @change="previewFile()" accept="image/*">上传
            </a>
          </div>
        </div>
        <div class="tplb" style>
          <div class="tpcontainer" :key="index" v-for="(item,index) in picList">
            <img class="tp" @click="showBigPic(item)" :src="item">
            <div class="del" @click="delPic">删除</div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button style="float:left;">暂 存</el-button>
      <el-button @click="FJCheckVisible = false">取 消</el-button>
      <el-button type="primary" @click="postResult()">确 定</el-button>
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
      //所见 小结结果集
      resultList: [],
      //展示图片base64
      picList: [],
      //上传图片file，适应接口
      fileList: [],
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
      ],
      choosedAbnormal: "N"
    };
  },
  methods: {
    //弹窗打开初始化方法
    getInit() {
      //加载组合项目
      this.getItems().then(res => {
        if (res.length != 0) {
          this.blue = 0;
          this.choosedObj = res[0];
          //获取该组合项目下所有子项目所见和小结
          this.getAllSubResultTemplate();
        }
      });
      this.getCompare(this.orderCode);
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
    highLight(index, item) {
      let prevBlue = this.blue;
      this.blue = index;
      this.choosedObj = item;
      //判断有没切换至其他组合项目
      if (index != prevBlue) {
        console.log(this.originSelect, 123, JSON.stringify(this.xiaojieSelect));
        // && this.fileList == 0
        //切换菜单判断界面是否修改过
        if (this.originSelect == JSON.stringify(this.xiaojieSelect)) {
        } else {
          //若修改过，弹出提示框 确认是否要提交结论
          this.$confirm("<span>是否提交已编辑结论？</span><br />", "提交确认", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            dangerouslyUseHTMLString: true,
            type: "warning"
          }).then(() => {
            postResult();
          });
        }
      } else {
      }
      //获取该组合项目下所有子项目所见和小结
      this.getAllSubResultTemplate();
      //如果需要获取则获取对比报告
      if (this.ifAsk) {
        this.getAllCompareData();
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
            console.log("result", response.data.entity);
            if (response.data.entity != 0) {
              //页面加载后的要操作的数据对象
              that.xiaojieSelect = response.data.entity;
              //页面加载后的原始数据对象，用于切换组合项目或关闭弹窗时判断是否弹出保存提示框
              that.originSelect = JSON.stringify(response.data.entity);
              //由于接口限制，前台处理数据将所需展示字段添加进数据对象
              // that.handleSubitemData(response.data);
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
    //上传图片
    previewFile() {
      let that = this;
      //   var preview = document.querySelector("img");
      var file = document.querySelector("input[type=file]").files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function() {
        //picList展示缩略图
        that.picList.push(reader.result);
        //fileList只保存新增的图片，上传给后台
        that.fileList.push(reader.result);
      };
    },
    //删除图片
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
      });
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
      this.$refs.dialogeditsummary.content = row.content;
      this.$refs.dialogeditsummary.index = index;
    },
    //子传父处理数据
    editNewSummary(data) {
      console.log(data);
      this.dataTable[data.index].content = data.content;
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
      console.log(value);
      //若不为空且不重复,添加所选所见的对应小结
      if (value.summary != "" && value.summary != null) {
        let ifSame = this.dataTable.filter((item, index) => {
          return item.summary == value.summary;
        });
        console.log(ifSame);
        if (ifSame.length == 0) {
          this.dataTable.push(value);
        }
      }
      //选中项为无明显异常，替换当前所见
      if (value == "无明显异常") {
        this.xiaojieSelect[index].defaultResSubResultTemplate.finding =
          value.finding;
      }
      //当前所见若为无明显异常替换 不为无明显异常append
      if (
        this.xiaojieSelect[index].defaultResSubResultTemplate.finding !=
        "无明显异常"
      ) {
        this.xiaojieSelect[index].defaultResSubResultTemplate.finding +=
          value.finding;
      } else {
        this.xiaojieSelect[index].defaultResSubResultTemplate.finding =
          value.finding;
      }
      if (value.isAbnormal) {
        this.xiaojieSelect[index].resultType = "H";
      } else {
        this.xiaojieSelect[index].resultType = "N";
      }
      console.log(1112, this.xiaojieSelect);
      console.log(2111, this.choosedObj);
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
          //拼接图片上传传输参数
          let entityPhoto = {};
          entityPhoto.orderCode = this.orderCode;
          entityPhoto.rptItemCode = this.choosedObj.rptItemCode;
          entityPhoto.imgBase64 = item;
          //将图片base64对象放入数组
          images.push(entityPhoto.substri);
        });
        entity.images = images;
      }
      console.log(JSON.stringify(entity));
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.SaveCommonSubItemResult, entity)
          .then(function(response) {
            console.log(response.data, 999);
            if (response.data.entity != 0) {
              alert(true);
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
      that.loading1 = true;
      this.$axios
        .post(this.$api.ReviewSummaryEachExceptionByOrderCode, {
          orderCode
        })
        .then(function(response) {
          console.log(654, response.data.entity);
          that.loading = false;
          if (response.data.status == 1) {
            if (response.data.entity.length != 0) {
              that.historyOrder = response.data.entity;
              that.value = response.data.entity[0].orderCode;
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
  flex: 0 0 564px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #dcdfe5;
}
.rightContainer {
  flex: 0 0 200px;
  border: 1px solid #dcdfe5;
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
.middleCt{
  flex: 0 0 429px;border-bottom: 1px solid #dcdfe5;
}
</style>