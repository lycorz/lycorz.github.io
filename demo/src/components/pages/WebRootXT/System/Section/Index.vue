<template>
  <div class="content SectionIndex">
    <div class="topTitle">
      <span>科室</span>
    </div>
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="科室名/首拼"
            v-model="searchParams.deptName"
            class="arcRadius"
             @keyup.enter.native="getData()"
            style="width: 150px;"
          >
            
          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px; ">
            <el-select
              clearable
              v-model="searchParams.isQueue"
              style="width:120px;"
              placeholder="是否排队"
            >
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.label}}</el-option>
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
        <el-table-column property="deptCode" label="科室编号" align="left"></el-table-column>
        <el-table-column property="deptName" label="科室名称" align="left"></el-table-column>
        <el-table-column property="isQueue" label="排队标记" align="center">
          <template slot-scope="scope">{{scope.row.isQueue | boolFilter}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="80px">
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
    <SectionCreate ref="SectionCreate"></SectionCreate>
  </div>
</template>

<script>
import SectionCreate from "./Create.vue";
export default {
  name: "SectionIndex",
  components: { SectionCreate },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      searchParams: {
        deptName: "",
        isQueue: null,
        pageSize: 10,
        pageIndex: 1
      },
      boolItems: [
        {
          label: "是",
          value: true
        },
        {
          label: "否",
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
        .get(this.$api.GetDeptList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resDicDepts;
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
    /*  dialogfunction  */
    showCreateDialog() {
      let SectionCreate = this.$refs.SectionCreate;
      SectionCreate.isShow = true;
    },
    edit(index, row) {
      let SectionCreate = this.$refs.SectionCreate;
      SectionCreate.Code = row.deptCode;
      SectionCreate.isShow = true;
    },
    batchDelete() {
      let keys = this.multipleSelection.map(z => z.deptCode);
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
          .post(this.$api.BatchDeleteDept, keys)
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

