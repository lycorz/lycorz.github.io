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
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="edit(scope.row,scope.$index)"
                    type="text"
                    size="small"
                    id="jc"
                  >编辑</el-button>
                  <el-button
                    @click="hide()"
                    type="text"
                    size="small"
                    id="jc"
                  >隐藏</el-button>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      归类
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                      <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
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
      <el-button style="float:left;">打 印</el-button>
      <el-button @click="FJCheckVisible = false">关 闭</el-button>
    </span>
<dialoglisedit ref="dialoglisedit"></dialoglisedit>
  </el-dialog>
</template>

<script>
import dialoglisedit from "./DialogLisEidt.vue";
export default {
  components:{dialoglisedit},
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
      ]
    };
  },
  methods: {
    //弹窗打开初始化方法
    getInit() {
      this.getItems().then(res => {});
      //鼠标右键显示级联菜单
      var that = this;
      // setTimeout(function() {
      //   var div = document.querySelector("#lischeck");

      //   var menu = document.querySelector("#jilian");
      //   div.addEventListener("contextmenu", function(event) {
      //     event.preventDefault();
      //     menu.style.display = "inline-block";
      //     menu.style.position = "fixed";
      //     menu.style.left = event.pageX + "px";
      //     menu.style.top = event.pageY + "px";
      //   });
      // }, 1000);
    },
    //获取用户信息是从父页面获取的
    //获取开单项目
    getItems() {
      var that = this;
      let entity = {};
      //拼接提交数据
      entity.orderCode = that.orderCode;
      entity.RptItemCode = that.RptItemCode;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .get(this.$api.GetLisSubItemResult, entity)
          .then(function(response) {
            console.log(888, response.data);
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
    //编辑子项目
    edit(row,index){
      this.$refs.dialoglisedit.dialogVisible = true;
      this.$refs.dialoglisedit.data = Object.assign(row,{});
    },
hide(row,index){

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
