<template>
  <div class="content RoleIndex">
    <div class="topTitle">
      <span>角色</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="角色名/首拼"
            v-model="searchParams.roleName"
            class="arcRadius"
            @keyup.enter.native="getData()"
            style="width: 150px;"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" style="margin-left:16px" @click="getData()">查询</el-button>
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
        <el-table-column property="roleCode"  label="角色编号" align="left"></el-table-column>
        <el-table-column property="roleName" label="角色名称" align="left"></el-table-column>
        <el-table-column show-overflow-tooltip label="功能项集合" align="left">
          <template slot-scope="scope">
            <el-popover trigger="click" @show="getRole(scope.row.roleCode)" placement="bottom">
              <div class="tree">
                <el-tree
                  :data="treeOptions"
                  show-checkbox
                  accordion
                  :default-checked-keys="treeDefaultCheckd"
                  node-key="funcCode"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                ></el-tree>
              </div>
              <!-- <span slot="reference">{{scope.row.funcNames}}</span> -->
              <el-button v-if="scope.row.funcCodes!=''" type="text" slot="reference">查看功能项</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column property="discountLowLimit"  label="最低折扣" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="80px" >
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
    </div>
    <RoleCreate ref="RoleCreate"></RoleCreate>
  </div>
</template>

<script>
import RoleCreate from "./Create.vue";
export default {
  name: "RoleIndex",
  components: { RoleCreate },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      //tree
      treeOptions: [],
      treeDefaultCheckd: [],
      defaultProps: {
        children: "childrenNodes",
        label: "funcName"
      },
      searchParams: {
        roleName: "",
        pageSize: 10,
        pageIndex: 1
      },
      multipleSelection: [] //选中项
    };
  },
  created: function() {
    this.getData();
    this.GetAllFuncSort();
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
    //报告功能项目分级树形
    GetAllFuncSort() {
      this.$axios
        .get(this.$api.GetAllFuncSort)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.treeOptions = this.getOptionsData(res.data.entity);
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getOptionsData(data) {
      for (var i = 0; i < data.length; i++) {
        data[i]["disabled"] = true; //Question:是否可选，不可选的话看起来不直观。
        if (data[i].childrenNodes.length < 1) {
          data[i].childrenNodes = undefined;
        } else {
          this.getOptionsData(data[i].childrenNodes);
        }
      }
      return data;
    },
    getRole(roleCode) {
      this.$refs.tree.setCheckedKeys([]);
      this.$axios
        .get(this.$api.GetRole, { params: { key: roleCode } })
        .then(res => {
          if (res.data.status == 1) {
            this.treeDefaultCheckd = res.data.entity.funcCodes.split(",");
            console.log(this.treeDefaultCheckd);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getData() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.GetRoleList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resDicRoles;
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
      let RoleCreate = this.$refs.RoleCreate;
      RoleCreate.isShow = true;
    },
    edit(index, row) {
      let RoleCreate = this.$refs.RoleCreate;
      RoleCreate.Code = row.roleCode;
      RoleCreate.isShow = true;
    },
    batchDelete() {
      let keys = this.multipleSelection.map(z => z.roleCode);
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
          .post(this.$api.BatchDeleteRole, keys)
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

