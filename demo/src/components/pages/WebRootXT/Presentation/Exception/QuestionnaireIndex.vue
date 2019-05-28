<template>
  <div id="QuestionnaireIndex" class="QuestionnaireIndex">
    <el-dialog
      class="infoucs"
      width="900px"
      title="问卷结果获取异常规则"
      :visible.sync="isShow"
      :before-close="close"
      @open="init"
      :close-on-click-modal="false"
    >
      <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
        <div class="peopleData">
          <div class="propleSearch">
            <!-- <el-input
              placeholder="异常编号"
              v-model="searchParams.abnormalCode"
              class="arcRadius"
              style="width: 150px;"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button style="margin-left:10px" type="primary" @click="getData()">查询</el-button>-->
            <div class="right">
              <el-button type="primary" @click="showCreateDialog()">新建</el-button>
              <el-button type="primary" @click="batchDelete()">删除</el-button>
            </div>
          </div>
        </div>
        <el-table
          ref="singleTable"
          :data="tableData"
          @selection-change="handleSelectionChange"
          v-loading="loading"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column property="questionContent" show-overflow-tooltip label="题目" align="left"></el-table-column>
          <el-table-column property="answerContent" show-overflow-tooltip label="答案" align="center"></el-table-column>
          <el-table-column label="操作" align="center"  fixed="right" width="100px">
            <template slot-scope="scope">
              <el-button type="text" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <QuestionnaireCreate ref="QuestionnaireCreate"></QuestionnaireCreate>
  </div>
</template>

<script>
import QuestionnaireCreate from "./QuestionnaireCreate.vue";
// import { resolve, reject } from "q";
export default {
  name: "QuestionnaireIndex",
  components: { QuestionnaireCreate },
  data() {
    return {
      isShow: false,
      Code: "",
      name: "",
      loading: false,
      tableData: [],
      searchParams: {
        abnormalCode: ""
      },
      multipleSelection: [] //选中项
    };
  },
  created: function() {
    // this.getData();
  },
  provide() {
    return {
      getData: this.getData
    };
  },
  methods: {
    /* table */
    handleSelectionChange(ex) {
      this.multipleSelection = ex;
    },
    sizeChange(ex) {
      this.searchParams.pageSize = ex;
      this.getData();
    },
    handleCurrentChange(ex) {
      this.searchParams.pageIndex = ex;
      this.getData();
    },
    init() {
      this.getData();
    },
    close() {
      this.tableData = [];
      this.isShow = false;
      this.searchParams = {
        abnormalCode: ""
      };
    },
    /* 	data 	*/
    getData() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.GetAbnormalRulePaperList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity;
          } else {
            that.$message.error(response.data.message);
          }
          //关闭遮罩
          that.loading = false;
        })
        .catch(function(error) {
          //关闭遮罩
          that.loading = false;
          console.error(error);
        });
    },
    /*  弹出层方法start  */
    showEditDialog(index, row) {
      let QuestionnaireCreate = this.$refs.QuestionnaireCreate;
      QuestionnaireCreate.Code = row.ruleCode;
      QuestionnaireCreate.fromData.abnormalCode = this.searchParams.abnormalCode;
      QuestionnaireCreate.isShow = true;
    },
    showCreateDialog() {
      let QuestionnaireCreate = this.$refs.QuestionnaireCreate;
      QuestionnaireCreate.fromData.abnormalCode = this.searchParams.abnormalCode;
      QuestionnaireCreate.isShow = true;
    },
    batchDelete() {
      let keys = this.multipleSelection.map(z => z.ruleCode);
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
          .post(this.$api.BatchDeleteAbnormalRulePaper, keys)
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.$message.success("删除成功！");
              this.getData();
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    }
  }
};
</script>
<style scoped>
</style>

