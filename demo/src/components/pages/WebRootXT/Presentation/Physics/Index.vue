<template>
  <div class="content PhysicsIndex">
    <div class="topTitle">
      <span>分检结论模板</span>
    </div>
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="请搜索"
            v-model="searchParams.searchValue"
             @keyup.enter.native="getData()"
            class="arcRadius"
            style="width: 150px;"
          >
            
          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.isAbnormal" placeholder="是否异常">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.name}}</el-option>
            </el-select>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select style="width:130px" clearable v-model="searchParams.isDefault" placeholder="是否默认选项">
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
        <el-table-column property="tmplCode" label="模版编号" align="left"></el-table-column>
        <el-table-column property="rptSubItemName" label="报告子项目" align="left"></el-table-column>
        <el-table-column property="finding" show-overflow-tooltip label="模版所见内容" align="left"></el-table-column>
        <el-table-column property="summary" show-overflow-tooltip label="模版小结" align="left"></el-table-column>
        <el-table-column property="isAbnormal" label="是否异常" align="center">
          <template slot-scope="scope">{{scope.row.isAbnormal | boolFilter}}</template>
        </el-table-column>
        <el-table-column property="isDefault" label="是否默认选项" align="center">
          <template slot-scope="scope">{{scope.row.isDefault | boolFilter}}</template>
        </el-table-column>
        <el-table-column label="操作"  fixed="right" align="center" width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.$index,scope.row)">编辑</el-button>
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
    <PhysicsCreate ref="PhysicsCreate"></PhysicsCreate>
    <PhysicsEdit ref="PhysicsEdit"></PhysicsEdit>
  </div>
</template>

<script>
import PhysicsCreate from "./Create.vue";
import PhysicsEdit from "./Edit.vue";
import { resolve, reject } from "q";
export default {
  name: "PhysicsIndex",
  components: { PhysicsCreate, PhysicsEdit },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      searchParams: {
        searchValue: "",
        isAbnormal: "",
        isDefault: "",
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
        .get(this.$api.GetRptSubItemRstTmplList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resDicRptSubItemRstTmpls;
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
      let PhysicsCreate = this.$refs.PhysicsCreate;
      PhysicsCreate.isShow = true;
    },
    edit(index, row) {
      let PhysicsEdit = this.$refs.PhysicsEdit;
      PhysicsEdit.Code = row.tmplCode;
      PhysicsEdit.isShow = true;
    },
    batchDelete() {
      let keys = this.multipleSelection.map(z => z.tmplCode);
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
          .post(this.$api.BatchDeleteRptSubItemRstTmpl, keys)
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

