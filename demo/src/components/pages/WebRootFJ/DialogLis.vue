<template>
  <!-- 分检检查弹窗 -->
  <el-dialog
    id="lischeck"
    title="录入详情"
    :visible.sync="FJCheckVisible"
    width="1000px"
    @open="getInit"
  >
    <div id="container" :key="index" v-for="(item,index) in items">
      <div style class="leftContainer" id="resizable">
        <div class="subTitle">
          <span>{{item.itemName}}</span>
          <div style="display:inline;float:right">
            <span>检查医生：</span>
            {{item.rptDoctor}}
            <span style="margin-left:5px;">审核医生：</span>
            {{item.reviewDoctor}}
            <span style="margin-left:5px;">检查时间：</span>
            {{item.checkTime}}
          </div>
        </div>
        <div class="jcxm">
          <div class="xj" style>
            <!--  @contextmenu="contextmenu(event)" -->
            <el-table ref="multipleTable" tooltip-effect="dark" :data="item.rptSubItemResults">
              <el-table-column label="检查项目名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.rptSubItemName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="检查结果">
                <template slot-scope="scope">
                  <span>{{ scope.row.examValue }}</span>
                </template>
              </el-table-column>
              <el-table-column label="参考范围">
                <template slot-scope="scope">
                  <span>{{ scope.row.lowReffer }}-{{ scope.row.highReffer }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位">
                <template slot-scope="scope">
                  <span>{{ scope.row.unit }}</span>
                </template>
              </el-table-column>
              <el-table-column label="结果类型">
                <template slot-scope="scope">
                  <span v-if=" scope.row.resultType == 'N' ">正常</span>
                  <span v-else-if=" scope.row.resultType == 'H' ">升高</span>
                  <span v-else>降低</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="200px">
                <template slot-scope="scope">
                  <el-button
                    @click="edit(scope.row,scope.$index)"
                    type="text"
                    size="small"
                    id="jc"
                  >编辑</el-button>
                  <el-button
                    @click="hide(scope.row,scope.index)"
                    type="text"
                    size="small"
                    id="jc"
                  >隐藏</el-button>
                  <!-- 报告项目 -->
                  <el-dropdown @command="sortRpt()">
                    <span class="el-dropdown-link">
                      归类
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        :key="index"
                        v-for="(item,index) in rptItems"
                        command="item"
                      >item.itemname</el-dropdown-item>
                      <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item> -->
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-dropdown @command="sortOrder()">
                    <span class="el-dropdown-link">
                      归类
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        :key="index"
                        v-for="(item,index) in orderItems"
                        command="item"
                      >item.itemname</el-dropdown-item>
                      <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item> -->
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <el-cascader
        :options="options"
        style="display:none;"
        :show-all-levels="false"
        ref="jilian"
        id="jilian"
      ></el-cascader>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button style="float:left;" @click="allNotHide">全部取消隐藏</el-button>
      <el-button style="float:left;">打 印</el-button>
      <el-button @click="FJCheckVisible = false">关 闭</el-button>
    </span>
    <dialoglisedit ref="dialoglisedit" @submit="getChildValue"></dialoglisedit>
  </el-dialog>
</template>

<script>
import dialoglisedit from "./DialogLisEidt.vue";
export default {
  components: { dialoglisedit },
  data() {
    return {
      FJCheckVisible: false,
      //用户信息
      orderCode: "c0015e6f-d95e-4deb-94cd-e2035af42b1a",
      depts: ["K01"],
      items: [],
      checkDoctor: "123",
      reviewDoctor: "321",
      checkTime: "23123123",
      idcardNum: "",
      marriageState: "",
      //头像
      headImg: "",
      //控制组合项目高亮，当前选中的组合项目索引
      blue: 0,
      isAbnormal: [],
      //所见 小结结果集
      options: [
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      //要显示的报告项目
      rptItems: [],
      // 要现实的开单项目
      OrderItems: []
    };
  },
  methods: {
    //弹窗打开初始化方法
    async getInit() {
      var that = this;
      //测试promise.all res也为数组[getitems的结果],执行顺序是task1=》task2=》then
      // Promise.all([this.getItems(),this.getOrderItems()]).then(res => {
      //   that.getReportItems();
      // });
      //测试async,可行
      // let task1 = await this.getItems();
      // let task2 = await this.getOrderItems();
      // that.getReportItems()
    },
    //获取用户信息是从父页面获取的
    //获取开单组合项目和子项目
    getItems() {
      var that = this;
      let entity = {};
      //拼接提交数据
      entity.orderCode = that.orderCode;
      // entity.RptItemCode = that.RptItemCode;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .get(this.$api.GetLisSubItemResult, { params: entity })
          .then(function(response) {
            alert(12321323);
            if (response.data.status == 1 && response.data.entity.length != 0) {
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
    //获取报告项目填充下拉菜单
    getReportItems() {
      var that = this;
      let entity = {};
      //拼接提交数据
      entity.orderCode = that.orderCode;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .get(this.$api.GetOrderDicRptItem, { params: entity })
          .then(function(response) {
            if (response.data.status == 1 && response.data.entity.length != 0) {
              that.rptItems = response.data.entity;
              console.log(789789, that.rptItems);
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
    //获取开单组合项目填充下拉菜单
    getOrderItems() {
      var that = this;
      let entity = {};
      //拼接提交数据
      entity.orderCode = that.orderCode;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .get(this.$api.GetDicOrderItems, { params: entity })
          .then(function(response) {
            if (response.data.status == 1 && response.data.entity.length != 0) {
              that.rptItems = response.data.entity;
              console.log(789789, that.rptItems);
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
    //编辑子项目
    edit(row, index) {
      this.$refs.dialoglisedit.dialogVisible = true;
      this.$refs.dialoglisedit.data = Object.assign(row, {});
      this.$refs.dialoglisedit.isAbnormal = row.resultType;
    },
    //隐藏子项目
    hide(row, index) {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.HiddenLisSubItemResult, { innerCode: row.innerCode })
          .then(function(response) {
            if (response.data.status == 1) {
              that.getItems();
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
    //全部取消隐藏子项目
    allNotHide(row, index) {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.ShowRptItemResults, { orderCode: that.orderCode })
          .then(function(response) {
            if (response.data.status == 1) {
              that.getItems();
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
    //归类报告项目
    sortRpt(value) {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.SaveRptSubItem4RptItem, {
            orderCode: that.orderCode,
            rptItemCode: value.rptItemCode,
            rptSubItemCode: value.rptSubItemCode
          })
          .then(function(response) {
            if (response.data.status == 1) {
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
    //归类开单项目
    sortOrder(value) {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.SaveRptSubItem4DicOrderItem, {
            orderCode: that.orderCode,
            rptItemCode: value.rptItemCode,
            rptSubItemCode: value.rptSubItemCode
          })
          .then(function(response) {
            if (response.data.status == 1) {
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
    //获取子界面更新后的值(逻辑也可以放在子界面，熟悉emit是否可以传多值)
    getChildValue(value1, value2) {
      value2.resultType = value1;
    }
  }
};
</script>

<style>
#lischeck .el-dialog__body {
  /* padding: 17px !important; */
  height: 460px;
  overflow: auto;
}
.leftContainer {
  flex: 0 0 200px;
  border: 1px solid #dcdfe5;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.jcxm {
  min-height: 100px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  color: rgba(48, 49, 51, 1);
  opacity: 1;
  overflow-y: auto;
  width: 100%;
}
#lischeck .el-textarea__inner {
  border-radius: 0 !important;
  margin-bottom: 10px;
}
#lischeck .subTitle {
  border-bottom: 1px solid #eff0f1 !important;
}
#lischeck .el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
#lischeck .el-icon-arrow-down {
  font-size: 12px;
}
</style>
