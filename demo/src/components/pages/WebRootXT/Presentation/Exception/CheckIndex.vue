<template>
  <div id="CheckIndex" class="CheckIndex">
    <el-dialog
      class="infoucs"
      width="900px"
      title="检验项目获取异常规则"
      :visible.sync="isShow"
      :before-close="close"
      @open="init"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="根据结果类型判断" name="first">
          <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
            <div class="peopleData">
              <div class="propleSearch">
                <div class="right">
                  <el-button type="primary" @click="showCreateDialog(1)">新建</el-button>
                  <el-button type="primary" @click="batchDelete(1)">删除</el-button>
                </div>
              </div>
            </div>
            <el-table
              ref="singleTable1"
              :data="tableData1"
              @selection-change="handleSelectionChange1"
              v-loading="loading1"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="rptSubItemName" label="报告子项目" align="left"></el-table-column>
              <el-table-column prop="resultType" label="结果类型" align="width">
                <template slot-scope="scope">{{scope.row.resultType | resultFilter}}</template>
              </el-table-column>
              <el-table-column label="操作" align="width">
                <template slot-scope="scope">
                  <el-button type="text" @click="showEditDialog(scope.$index,scope.row,1)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="根据关键词判断 " name="second">
          <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
            <div class="peopleData">
              <div class="propleSearch">
                <div class="right">
                  <el-button type="primary" @click="showCreateDialog(2)">新建</el-button>
                  <el-button type="primary" @click="batchDelete(2)">删除</el-button>
                </div>
              </div>
            </div>
            <el-table
              ref="singleTable2"
              :data="tableData2"
              @selection-change="handleSelectionChange2"
              v-loading="loading2"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column property="rptSubItemName" label="报告子项目" align="left"></el-table-column>
              <el-table-column property="keys" label="关键词" align="width"></el-table-column>
              <el-table-column label="操作" align="width">
                <template slot-scope="scope">
                  <el-button type="text" @click="showEditDialog(scope.$index,scope.row,2)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="根据上下限判断 " name="third">
          <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
            <div class="peopleData">
              <div class="propleSearch">
                <div class="right">
                  <el-button type="primary" @click="showCreateDialog(3)">新建</el-button>
                  <el-button type="primary" @click="batchDelete(3)">删除</el-button>
                </div>
              </div>
            </div>
            <el-table
              ref="singleTable3"
              :data="tableData3"
              @selection-change="handleSelectionChange3"
              v-loading="loading3"
              style="width: 100%"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column property="rptSubItemName" label="报告子项目" align="left"></el-table-column>
              <el-table-column property="upperLimit" label="上限" align="left"></el-table-column>
              <el-table-column property="lowerLimit" label="下限" align="left"></el-table-column>
              <el-table-column label="操作" align="cebter"  fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" @click="showEditDialog(scope.$index,scope.row,3)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <CheckCreate ref="CheckCreate"></CheckCreate>
  </div>
</template>

<script>
import CheckCreate from "./CheckCreate.vue";
export default {
  components: { CheckCreate },
  name: "CheckIndex",
  data() {
    return {
      isShow: false,
      activeName: "first",
      searchParams: {
        abnormalCode: "",
        ruleType: 0
      },
      /* tab1 */
      loading1: false,
      tableData1: [],
      multipleSelection1: [],
      /* tab2 */
      loading2: false,
      tableData2: [],
      multipleSelection2: [],
      /* tab3 */
      loading3: false,
      tableData3: [],
      multipleSelection3: []
    };
  },
  provide() {
    return {
      firstInit: this.firstInit,
      secondInit: this.secondInit,
      thirdInit: this.thirdInit
    };
  },
  filters: {
    resultFilter(val) {
      switch (val) {
        case "N":
          return "正常";
          break;
        case "H":
          return "偏高";
          break;
        case "L":
          return "偏低";
          break;
        default:
          return val;
          break;
      }
    }
  },
  created() {},
  methods: {
    init() {
      switch (this.activeName) {
        case "first":
          this.firstInit();
          break;
        case "second":
          this.secondInit();
          break;
        case "third":
          this.thirdInit();
          break;
        default:
          this.firstInit();
          break;
      }
    },
    close() {
      this.isShow = false;
      // this.tabledata1 = this.tabledata2 = this.tableData3 = [];
    },
    //删除
    batchDelete(val) {
      let keys = new Array();
      switch (val) {
        case 1:
          keys = this.multipleSelection1.map(z => z.ruleCode);
          break;
        case 2:
          keys = this.multipleSelection2.map(z => z.ruleCode);
          break;
        case 3:
          keys = this.multipleSelection3.map(z => z.ruleCode);
          break;
      }
      if (keys.length <= 0) {
        this.$message.error("请至少选中一项进行删除");
        return;
      }
      this.$confirm(
        '<span>您确定要删除选中数据吗？</span><br /><i style="color:#8F9399;">删除后不可恢复</i>',
        "提醒：",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      ).then(() => {
        this.$axios
          .post(this.$api.BatchDeleteAbnormalRuleLis, keys)
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.$message.success("删除成功！");
              this.init(val);
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    },
    //弹出层
    showCreateDialog(val, code) {
      let CheckCreate = this.$refs.CheckCreate;
      if (code) CheckCreate.Code = code;
      switch (val) {
        case 1:
          CheckCreate.fromData1.abnormalCode = this.searchParams.abnormalCode;
          CheckCreate.firstIsShow = true;
          break;
        case 2:
          CheckCreate.fromData2.abnormalCode = this.searchParams.abnormalCode;
          CheckCreate.secondIsShow = true;
          break;
        case 3:
          CheckCreate.fromData3.abnormalCode = this.searchParams.abnormalCode;
          CheckCreate.thirdIsShow = true;
          break;
      }
    },
    showEditDialog(index, row, val) {
      this.showCreateDialog(val, row.ruleCode);
    },
    //切换tab事件，按需加载
    handleClick(val, e) {
      switch (val.index) {
        case "0":
          this.firstInit();
          break;
        case "1":
          this.secondInit();
          break;
        case "2":
          this.thirdInit();
          break;
        default:
          this.firstInit();
          break;
      }
    },
    /*  tab1 */
    firstInit() {
      this.searchParams.ruleType = 0;
      this.loading1 = true;
      this.$axios
        .get(this.$api.GetAbnormalRuleLisList, {
          params: this.searchParams
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            let aa = res.data.entity;
            this.tableData1 = aa;
          } else {
            this.$message.error(res.data.message);
          }
          this.loading1 = false;
        })
        .catch(err => {
          this.loading1 = false;
          console.error(err);
        });
    },
    handleSelectionChange1(ex) {
      this.multipleSelection1 = ex;
    },

    /*  tab2 */
    secondInit() {
      this.searchParams.ruleType = 2;
      this.loading2 = true;
      this.$axios
        .get(this.$api.GetAbnormalRuleLisList, {
          params: this.searchParams
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            let aa = res.data.entity;
            this.tableData2 = aa;
          } else {
            this.$message.error(res.data.message);
          }
          this.loading2 = false;
        })
        .catch(err => {
          this.loading2 = false;
          console.error(err);
        });
    },
    handleSelectionChange2(ex) {
      this.multipleSelection2 = ex;
    },

    /*  tab3 */
    thirdInit() {
      this.searchParams.ruleType = 3;
      this.loading2 = true;
      this.$axios
        .get(this.$api.GetAbnormalRuleLisList, {
          params: this.searchParams
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            let aa = res.data.entity;
            this.tableData3 = aa;
          } else {
            this.$message.error(res.data.message);
          }
          this.loading2 = false;
        })
        .catch(err => {
          this.loading2 = false;
          console.error(err);
        });
    },
    handleSelectionChange3(ex) {
      this.multipleSelection3 = ex;
    }
  }
};
</script>
<style>
</style>


