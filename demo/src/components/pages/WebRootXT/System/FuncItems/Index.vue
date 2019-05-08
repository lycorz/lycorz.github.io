<template>
  <div class="content FuncItemsIndex">
    <div class="topTitle">
      <span>功能项目字典</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="功能项名称 "
            v-model="searchParams.funcName"
             @keyup.enter.native="getData()"
            class="arcRadius"
            style="width: 150px;"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px; ">
            <el-select
              clearable
              v-model="searchParams.level"
              style="width:120px;"
              placeholder="功能项级别"
            >
              <el-option
                v-for="item in levelItems"
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
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="funcCode" label="功能项编号" align="center"></el-table-column>
        <el-table-column property="levelName" label="功能项级别" align="center"></el-table-column>
        <el-table-column property="parentCode" show-overflow-tooltip label="父类编号" align="center"></el-table-column>
        <el-table-column property="funcName" show-overflow-tooltip label="功能项目名称" align="center"></el-table-column>
        <el-table-column property="url" label="跳转地址" align="center"></el-table-column>
        <el-table-column property="icon" label="展示图标" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
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
            :page-sizes="[10, 15, 20, 30,50,100]"
            layout="sizes, prev, pager, next, jumper"
            :page-count="pageNum"
          ></el-pagination>
        </div>
      </div>
    </div>
    <FuncItemsCreate ref="FuncItemsCreate"></FuncItemsCreate>
    <!-- <FuncItemsEdit ref="FuncItemsEdit"></FuncItemsEdit> -->
  </div>
</template>

<script>
import FuncItemsCreate from "./Create.vue";
export default {
  name: "FuncItemsIndex",
  components: { FuncItemsCreate },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      searchParams: {
        parentCode: "",
        funcName: "",
        level: null,
        pageSize: 10,
        pageIndex: 1
      },
      levelItems: [],
      multipleSelection: [] //选中项
    };
  },
  created: function() {
    this.getData();
    this.getLevelItems();
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
    /* 	data 	*/
    getData() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.GetFuncList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resDicFuncs;
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
    getLevelItems() {
      this.$getType("FuncLevel").then(res => {
        if (res.status == 200 && res.data.status == 1) {
          let items = res.data.entity;
          this.levelItems = items;
        }
      });
    },
    /*  dialogfunction  */
    showCreateDialog() {
      let FuncItemsCreate = this.$refs.FuncItemsCreate;
      FuncItemsCreate.levelItems = this.levelItems;
      FuncItemsCreate.isShow = true;
    },
    edit(index, row) {
      let FuncItemsCreate = this.$refs.FuncItemsCreate;
      FuncItemsCreate.levelItems = this.levelItems;
      FuncItemsCreate.Code = row.funcCode;
      FuncItemsCreate.isShow = true;
    },
    batchDelete() {
      let keys = this.multipleSelection.map(z => z.funcCode);
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
          .post(this.$api.BatchDeleteFunc, keys)
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

