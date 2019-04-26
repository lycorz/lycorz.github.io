<template>
  <div class="content ProjectSortIndex">
    <div class="topTitle">
      <span>报告项目分类</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="项目名称/首拼"
            v-model="searchParams.subItemName"
            class="arcRadius"
            style="width: 150px;"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.deptCode" placeholder="所属科室">
              <el-option
                v-for="item in deptItems"
                :key="item.deptCode"
                :label="item.deptName"
                :value="item.deptCode"
                filter-placement="bottom-end"
              >{{item.deptName}}</el-option>
            </el-select>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.inputType" placeholder="录入类型">
              <el-option
                v-for="item in inputItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.name}}</el-option>
            </el-select>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.isEnable" placeholder="是否启用">
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
          </div>
        </div>
      </div>
      <el-table ref="singleTable" :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column type="index" width="55"></el-table-column>
        <el-table-column property="itemCode" label="报告项目分类编号" align="center"></el-table-column>
        <el-table-column property="itemName" label="报告项目分类名称" align="center"></el-table-column>
        <el-table-column property="typeCodeName" label="类型" align="center"></el-table-column>
        <el-table-column property="deptCodeName" label="所属科室" align="center"></el-table-column>
        <el-table-column property="inputTypeName" label="结论录入类型" align="center"></el-table-column>
        <el-table-column property="isEnable" label="是否启用" align="center">
          <template slot-scope="scope">{{scope.row.isEnable | boolFilter}}</template>
        </el-table-column>
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
    <ProjectSortCreate ref="ProjectSortCreate"></ProjectSortCreate>
    <ProjectSortEdit ref="ProjectSortEdit"></ProjectSortEdit>
  </div>
</template>

<script>
import ProjectSortCreate from "./Create.vue";
import ProjectSortEdit from "./Edit.vue";
import { resolve, reject } from "q";
export default {
  name: "ProjectSortIndex",
    components: { ProjectSortCreate, ProjectSortEdit },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      searchParams: {
        itemName: "",
        typeCode: "",
        deptCode: "",
        isEnable: null, //bool  是否分类
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
      deptItems: [],
      inputItems: []
      //   rptTypeItems: []
    };
  },
  created: function() {
    this.getData();
    this.getDeptItems();
    this.getInputTypeItems();
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
        .get(this.$api.GetRptItemList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resDicRptItems;
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
    //获取所属科室下拉
    getDeptItems() {
      let that = this;
      that.$axios
        .get(that.$api.GetDeptList)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            that.deptItems = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //获取结论录入类型
    getInputTypeItems() {
      this.$getType("InputType").then(res => {
        this.inputItems = res.data.entity;
      });
    },
    /*  弹出层方法start  */
    showCreateDialog() {
      let ProjectSortCreate = this.$refs.ProjectSortCreate;
      ProjectSortCreate.isShow = true;
    },
    edit(index, row) {
      let ProjectSortEdit = this.$refs.ProjectSortEdit;
      ProjectSortEdit.Code = row.itemCode;
      ProjectSortEdit.isShow = true;
    }
  }
};
</script>
<style scoped>
</style>

