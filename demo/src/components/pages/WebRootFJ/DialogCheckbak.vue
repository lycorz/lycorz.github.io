
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
          <el-button>查看其他项目</el-button>
        </div>
        <div class="bgxmsjlr" style>
          <div :key="index" v-for="(item,index) in choosedObj.rptSubItems">
            <div class="subTitle" style="text-align:right;border:1px solid #DCDFE5;">
              <span style="float:left;">{{item.subItemName}}</span>
              <span v-if="item.length!=0">
                <!-- 点击下拉菜单时获取该选中组合项目下所有的子项目 所见和小结，用subresulttemplate函数筛选出当前子项目的下拉菜单option，并将结果存在该子项目对象里 -->
                <el-select
                  v-model="item.chooseSummary"
                  filterable
                  placeholder="请搜索小结"
                  style="width:150px;display:inline-block;margin-left:10px;"
                  @focus="SubResultTemplate(index,item)"
                  @change="test(choosedObj.rptSubItems)"
                >
                  <el-option
                    v-for="it in dicSummary"
                    :key="it.tmplCode"
                    :label="it.finding"
                    :value="it.finding"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="isAbnormal[index]"
                  placeholder="是否异常"
                  style="width:150px;display:inline-block;margin-left:10px;"
                >
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="异常" value="2"></el-option>
                  <el-option label="危" value="3"></el-option>
                </el-select>
              </span>
            </div>
            <el-input type="textarea" v-model="resultList[index]" rows="3"></el-input>
          </div>
        </div>
      </div>
      <div style class="rightContainer" id="resizable">
        <div class="subTitle" style="text-align:right;">
          <span style="float:left;">小结</span>
          <div>
            <el-button>新增</el-button>
            <el-button>删除</el-button>
          </div>
        </div>
        <div class="xj" style>
          <el-table ref="multipleTable" tooltip-effect="dark">
            <el-table-column type="selection" width="50px"></el-table-column>
            <el-table-column label="小结" width="100px"></el-table-column>
            <el-table-column label="操作" width="50px"></el-table-column>
          </el-table>
        </div>
        <div class="subTitle" style="text-align:right;">
          <span style="float:left;">图片列表</span>
          <div>
            <el-button>上传</el-button>
          </div>
        </div>
        <div class="tplb" style>
          <div class="tpcontainer">
            <img class="tp" @click="showBigPic('./login-bg.jpg')" src="./login-bg.jpg"/>
            <div class="del">删除</div>
          </div>
          <div class="tpcontainer">
            <img class="tp" src="./login-bg.jpg"/>
            <div class="del">删除</div>
          </div>
                    <div class="tpcontainer">
            <img class="tp" src="./login-bg.jpg"/>
            <div class="del">删除</div>
          </div>
                    <div class="tpcontainer">
            <img class="tp" src="./login-bg.jpg"/>
            <div class="del">删除</div>
          </div>
                    <div class="tpcontainer">
            <img class="tp" src="./login-bg.jpg"/>
            <div class="del">删除</div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button style="float:left;">暂 存</el-button>
      <el-button @click="FJCheckVisible = false">取 消</el-button>
      <el-button type="primary" @click="FJCheckVisible = false">确 定</el-button>
    </span>
    <bigpic ref="bigpic"></bigpic>
  </el-dialog>
</template>

<script>
import bigpic from "./showPic.vue"
export default {
    components: {
      bigpic
    },
  data() {
    return {
      FJCheckVisible: false,
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
      isAbnormal: [],
      //下拉菜单 结果集
      dicSummary: [],
      //选中的小结
      chooseSummary: [],
      //选中的组合项目对象
      choosedObj: {},
      //选中组合项目下所有子项目对应的小结集合，用于渲染小结下拉菜单
      xiaojieSelect: [],
      //所见 小结结果集
      resultList: []
    };
  },
  methods: {
    //弹窗打开初始化方法
    getInit() {
      this.getItems().then(res => {
        if (res.length != 0) this.highLight(0, res[0]);
      });
    },
    test(item) {
      console.log(item);
    },
    //获取用户信息是从父页面获取的
    //获取开单项目
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
          .post(this.$api.InspectionItemDetail, entity)
          .then(function(response) {
            console.log(888, response.data);
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
    //开单项目点击高亮
    highLight(index, item) {
      console.log(12254, index, item);
      this.blue = index;
      this.choosedObj = [];
      this.choosedObj = item;
      //获取该组合项目下所有子项目所见和小结
      // this.getAllSubResultTemplate();
      //提交该项目所见和小结，提交后清除其下拉菜单choosesummary值以及content值
    },
    //由于接口制约，首先获取激活组合项目下所有子项目的字典
    getAllSubResultTemplate() {
      let that = this;
      let arr = [];
      this.choosedObj.rptSubItems.forEach((item, index) => {
        arr.push(item.subItemCode);
      });
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.SubResultTemplate, arr)
          .then(function(response) {
            if (response.data) {
              //设置默认值
              // that.deptCode = response.data.entity[0].deptCode;
              that.xiaojieSelect = response.data;
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
    //由于接口限制，前台处理数据将所需展示字段添加进数据对象
    // handleSubitemData(data) {
    //   //循环选中的组合项目下的子项目（这个对象包含其子项目）
    //   this.choosedObj.rptSubItems.forEach((item, index) => {
    //     let arr = [];
    //     data.forEach((it, index) => {
    //       if (item.subItemCode == it.rptSubItemCode) {
    //         arr.push(it);
    //       }
    //     });
    //     //下拉菜单选中项
    //     item.selectvalue = "";
    //     //下拉菜单赋值
    //     item.selectoption = arr;
    //   });
    //   console.log(this.choosedObj.rptSubItems);
    // },
    //点击下拉菜单加载下拉菜单数据，报告项目数据录入获取三级小结字典
    SubResultTemplate(index, item) {
      let that = this;
      //只取item对象中的subitemCode
      let arr = [];
      that.xiaojieSelect.forEach((it, index) => {
        if (item.subItemCode == it.rptSubItemCode) {
          arr.push(it);
        }
      });
      that.dicSummary = arr;
      that.choosedObj.rptSubItems.forEach((itm, idx) => {
        that.xiaojieSelect.forEach((it, index) => {
          if (it.subItemCode == itm.rptSubItemCode && it.isDefault == true) {
            that.resultList.push(it.finding)
          }
        });
      });
    },
    showBigPic(src){
      this.$refs.bigpic.dialogVisible = true;
      // this.$refs.bigpic.src = src;
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
.jcxm {
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
  flex: 0 0 418px;
  border-bottom: 1px solid #dcdfe5;
  overflow-y: auto;
}
.xj {
  flex: 0 0 280px;
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
#fjcheck .subTitle{
  border-bottom: 1px solid #EFF0F1!important;
}
#fjcheck .avatar{
width:68px;height:87px;
}
#fjcheck .tpcontainer{
  float: left;
    margin-right: 5px;
  margin-bottom: 6px;
}
#fjcheck .tp{
  width: 40px;
  height: 40px;
}
#fjcheck .del{
  text-align: center;
  cursor: pointer;
}
</style>