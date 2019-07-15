<template>
  <div class="content ExceptionIndex">
    <div class="topTitle">
      <span>异常</span>
    </div>
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="异常名/首拼"
            v-model="searchParams.abnormalName"
            class="arcRadius"
             @keyup.enter.native="getData()"
            style="width: 150px;"
          >
            
          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select
              clearable
              style="width:120px"
              v-model="searchParams.isCrisis"
              placeholder="是否危急值"
            >
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.name}}</el-option>
            </el-select>
          </div>
          <el-button type="primary" @click="getData()">查询</el-button>
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
        height="9999"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="abnormalCode" label="异常编号" align="left"></el-table-column>
        <el-table-column property="abnormalName" show-overflow-tooltip label="异常名称" align="center"></el-table-column>
        <el-table-column property="isCrisis" label="是否危急值" align="center">
          <template slot-scope="scope">{{scope.row.isCrisis | boolFilter}}</template>
        </el-table-column>
           <el-table-column property="isCommon" label="是否常见" align="center">
          <template slot-scope="scope">{{scope.row.isCommon | boolFilter}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" width="230px">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="bottom">
              <div style="display:flex;flex-direction: column;">
                <el-button type="text" @click="ShowQuestion(scope.$index,scope.row)">问卷结果获取异常规则</el-button>
                <el-button type="text" @click="ShowCheck(scope.$index,scope.row)">检验项目获取异常规则</el-button>
                <el-button type="text" @click="ShowNotCheck(scope.$index,scope.row)">非检验项目获取异常规则</el-button>
              </div>

              <el-button type="text" slot="reference">异常发现规则</el-button>
            </el-popover>
            <el-button type="text" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fixBottom">
        <div class="right">
          <el-pagination
            style="display:inline-block;text-align:right;"
            :current-page="searchParams.pageIndex"
            @current-change="handleCurrentChange"
            @size-change="sizeChange"
           :page-sizes="[10,20,50,100]"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            :page-count="pageNum"
          ></el-pagination>
        </div>
      </div>
    <ExceptionCreate ref="ExceptionCreate"></ExceptionCreate>
    <QuestionnaireIndex ref="QuestionnaireIndex"></QuestionnaireIndex>
    <NotCheckIndex ref="NotCheckIndex"></NotCheckIndex>
    <CheckIndex ref="CheckIndex"></CheckIndex>
  </div>
</template>

<script>
import ExceptionCreate from "./Create.vue";
import QuestionnaireIndex from "./QuestionnaireIndex.vue";
import NotCheckIndex from "./NotCheckIndex.vue";
import CheckIndex from "./CheckIndex.vue";
import { resolve, reject } from "q";
export default {
  name: "ExceptionIndex",
  components: {
    ExceptionCreate,
    NotCheckIndex,
    QuestionnaireIndex,
    CheckIndex
  },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      searchParams: {
        abnormalName: "",
        isCrisis: null,
        pageSize: 10,
        pageIndex: 1
      },
      boolItems: [
        {
          name: "是",
          value: true
        },
        {
          name: "否",
          value: false
        }
      ],
      multipleSelection: [] //选中项
    };
  },
  created: function() {
    this.getData();
  },
  provide() {
    return {
      getData: this.getData
    };
  },
  filters: {
    boolFilter(value, row, column) {
      return value ? "是" : "否";
    }
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
    /* 	data 	*/
    getData() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.GetAbnormalList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resDicAbnormals;
            that.pageNum = Math.ceil(
              response.data.entity.recordNum / that.searchParams.pageSize
            );
            that.total = response.data.entity.recordNum;
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
    showCreateDialog() {
      let ExceptionCreate = this.$refs.ExceptionCreate;
      ExceptionCreate.isShow = true;
    },
    showEditDialog(index, row) {
      let ExceptionCreate = this.$refs.ExceptionCreate;
      ExceptionCreate.Code = row.abnormalCode;
      ExceptionCreate.isShow = true;
    },
    ShowCheck(index, row) {
      let CheckIndex = this.$refs.CheckIndex;
      CheckIndex.searchParams.abnormalCode = row.abnormalCode;
      CheckIndex.isShow = true;
    },
    ShowQuestion(index, row) {
      let QuestionnaireIndex = this.$refs.QuestionnaireIndex;
      QuestionnaireIndex.searchParams.abnormalCode = row.abnormalCode;
      QuestionnaireIndex.isShow = true;
    },
    ShowNotCheck(index, row) {
      let NotCheckIndex = this.$refs.NotCheckIndex;
      NotCheckIndex.searchParams.abnormalCode = row.abnormalCode;
      NotCheckIndex.isShow = true;
    },
    batchDelete() {
      let keys = this.multipleSelection.map(z => z.abnormalCode);
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
          .post(this.$api.BatchDeleteAbnormal, keys)
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

