<template>
  <div class="content ProjectIndex">
    <div class="topTitle">
      <span>报告项目</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="项目名称/首拼"
            v-model="searchParams.subItemName"
             @keyup.enter.native="getData()"
            class="arcRadius"
            style="width: 150px;"
          >
            
          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.itemName" placeholder="报告分类">
              <el-option
                v-for="item in rptItem"
                :key="item.itemName"
                :label="item.itemName"
                :value="item.itemName"
                filter-placement="bottom-end"
              >{{item.itemName}}</el-option>
            </el-select>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.haveItemCode" placeholder="是否分类">
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
        <el-table-column type="index" width="55" label="序号"></el-table-column>
        <el-table-column property="subItemCode" label="报告项目编号" align="center"></el-table-column>
        <el-table-column property="subItemName" label="报告项目名称" align="center"></el-table-column>
        <!-- <el-table-column property label="外部子项目编号" align="center"></el-table-column>
        <el-table-column property label="外部组合项目编号" align="center"></el-table-column> -->
        <el-table-column property="rptItemName" label="所属报告项目分类" align="center"></el-table-column>
        <el-table-column property="isEnable" label="是否启用" align="center">
          <template slot-scope="scope">{{scope.row.isEnable | boolFilter}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" width="150px">
          <template slot-scope="scope">
            <el-button type="text" @click="backCode(scope.$index,scope.row)">回传代码</el-button>
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
    <ProjectCreate ref="ProjectCreate"></ProjectCreate>
    <ProjectEdit ref="ProjectEdit"></ProjectEdit>
    <ProjectBackCode ref="ProjectBackCode"></ProjectBackCode>
  </div>
</template>

<script>
import ProjectCreate from "./Create.vue";
import ProjectEdit from "./Edit.vue";
import ProjectBackCode from "./BackCode";
import { resolve, reject } from "q";
export default {
  name: "SetMealIndex",
  components: { ProjectCreate, ProjectEdit, ProjectBackCode },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      searchParams: {
        itemName: "",
        subItemName: "",
        itemCode:"", 
        haveItemCode: null, //bool  是否分类
        isEnable: null, //bool  是否启用
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
      rptItem: []
    };
  },
  mounted:function(){

  },
  created: function() {
    this.getData();
    this.getRptItems();
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
    //获取报告子项目
    getData() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.GetRptSubItemList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
              that.tableData = response.data.entity.resDicRptSubItems;
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
    //获取报告项目 下拉框
    getRptItems() {
      this.$axios
        .get(this.$api.GetAllRptItemList)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.rptItem = res.data.entity;
          } else {
            console.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    //获取枚举
    getEnumItems(enumName) {
      let that = this;
      return new Promise((resolve, reject) => {
        that.$axios
          .get(that.$api.GetEnumValueList, { params: { typeName: enumName } })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              resolve(res.data.entity);
            } else {
              console.log(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    },
    /*  弹出层方法start  */
    showCreateDialog() {
      let ProjectCreate = this.$refs.ProjectCreate;
      ProjectCreate.isShow = true;
    },
    edit(index, row) {
      let ProjectEdit = this.$refs.ProjectEdit;
      ProjectEdit.Code = row.subItemCode;
      ProjectEdit.isShow = true;
    },
    backCode(index, row) {
      let ProjectBackCode = this.$refs.ProjectBackCode;
      ProjectBackCode.Code = row.subItemCode;
      ProjectBackCode.isShow = true;
    }
  }
};
</script>
<style scoped>
</style>

