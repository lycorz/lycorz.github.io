<template>
  <div class="content CostIndex">
    <div class="topTitle">
      <span>成本设置</span>
    </div>
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="成本名称/首拼"
            v-model="searchParams.costName"
            class="arcRadius"
            @keyup.enter.native="getData()"
            style="width: 150px;"
          >

          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px; ">
            <el-select
              clearable
              v-model="searchParams.costType"
              style="width:120px;"
              placeholder="成本类型"
            >
              <el-option
                v-for="item in CostTypeItems"
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
        <el-table-column property="costCode" label="成本编号" align="left"></el-table-column>
        <el-table-column property="costName" label="成本名称" align="left"></el-table-column>
        <el-table-column property="costTypeName" width="200px" label="成本类型" align="left"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="100px">
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
    <CostCreate ref="CostCreate"></CostCreate>
    <!-- <CostEdit ref="CostEdit"></CostEdit> -->
  </div>
</template>

<script>
import CostCreate from "./Create.vue";
export default {
  name: "CostIndex",
  components: { CostCreate },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      searchParams: {
        costName: "",
        costType: null,
        pageSize: 10,
        pageIndex: 1
      },
      CostTypeItems: [],
      multipleSelection: [] //选中项
    };
  },
  created: function() {
    this.getData();
    this.getCostTypeItems();
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
        .get(this.$api.GetCostList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resDicCosts;
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
    getCostTypeItems() {
      this.$getType("CostType").then(res => {
        if (res.status == 200 && res.data.status == 1) {
          let items = res.data.entity;
          this.CostTypeItems = items;
        }
      });
    },
    /*  dialogfunction  */
    showCreateDialog() {
      let CostCreate = this.$refs.CostCreate;
      CostCreate.CostTypeItems = this.CostTypeItems;
      CostCreate.isShow = true;
    },
    edit(index, row) {
      let CostCreate = this.$refs.CostCreate;
      CostCreate.CostTypeItems = this.CostTypeItems;
      CostCreate.Code = row.costCode;
      CostCreate.isShow = true;
    },
    batchDelete() {
      let keys = this.multipleSelection.map(z => z.costCode);
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
          .post(this.$api.BatchDeleteCost, keys)
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

