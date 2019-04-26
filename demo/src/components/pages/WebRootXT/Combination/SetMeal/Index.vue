<template>
  <div class="content SetMealIndex">
    <div class="topTitle">
      <span>套餐模板</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="请输入套餐名称"
            v-model="searchParams.packageName"
            class="arcRadius"
            style="width: 150px;"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.packageType" placeholder="套餐类型">
              <el-option
                v-for="item in packageItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.name}}</el-option>
            </el-select>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.filterType" placeholder="筛选条件">
              <el-option
                v-for="item in filterItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.name}}</el-option>
            </el-select>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.sexType" placeholder="适用性别">
              <el-option
                v-for="item in sexItems"
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
        @selection-change="handleSelectionChange"
        :data="tableData"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column property="packageName" label="套餐名称" align="center"></el-table-column>
        <el-table-column property="exePrice" label="执行价格" align="center">
          <template slot-scope="scope">￥{{scope.row.exePrice}}</template>
        </el-table-column>
        <el-table-column property="packageTypeName" label="套餐类型" align="center"></el-table-column>
        <el-table-column property="sexTypeName" label="使用性别" align="center"></el-table-column>
        <el-table-column property="filterTypeName" label="筛选条件" align="center"></el-table-column>
        <el-table-column
          property="inspectPurpose"
          label="检查目的与意义"
          show-overflow-tooltip
          width="120px"
          align="left"
        ></el-table-column>
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
    <SetmealCreat ref="SetmealCreat"></SetmealCreat>
   <SetmealEdit ref="SetmealEdit"></SetmealEdit>
  </div>
</template>

<script>
import SetmealCreat from "./Create.vue";
import SetmealEdit from './Edit.vue';
import { resolve, reject } from "q";
export default {
  name: "SetMealIndex",
  components: { SetmealCreat,SetmealEdit },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      sexItems: [],
      filterItems: [],
      packageItems: [],
      searchParams: {
        packageCode: "",
        packageName: "",
        packageType: null, //int  套餐类型
        sexType: null, //int
        filterType: null, //int  筛选条件
        pageSize: 10,
        pageIndex: 1
      }
    };
  },
  created: function() {
    this.getData();
    this.getSexItems();
    this.getFilterTypeItems();
    this.getPackageTypeItems();
  },
  provide() {
    return {
      getData: this.getData
    };
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
    handleSelectionChange(val) {
      this.selection = val;
    },

    /* 	data 	*/
    //获取项目
    getData() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.GetPackageList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
              that.tableData = response.data.entity.resDicPackages;
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
    //获取性别下拉
    getSexItems() {
      this.getEnumItems("SexType").then(items => {
        this.sexItems = items;
      });
    },
    //获取套餐类型下拉
    getPackageTypeItems() {
      this.getEnumItems("PackagesType").then(items => {
        this.packageItems = items;
      });
    },
    //获取筛选条件下拉
    getFilterTypeItems() {
      this.getEnumItems("PackageFilterType").then(items => {
        this.filterItems = items;
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
      let SetmealCreat = this.$refs.SetmealCreat;
      SetmealCreat.isShow = true;
    },
    batchDelete() {
      this.$confirm(
        '<p>确定删除当前选中的套餐吗？</p><span style="color: #8F9399;">删除后不可恢复，请谨慎操作</span>',
        "作废确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
          dangerouslyUseHTMLString: true,
          closeOnClickModal: false
        }
      )
        .then(result => {
          let delArr = new Array();
          this.selection.forEach(el => {
            delArr.push(el.packageCode);
          });
          this.$axios
            .post(this.$api.BatchDeletePackage, delArr)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("删除成功！");
                this.getData();
              } else {
                this.$message.success(res.data.message);
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    edit(index, row) {
      let SetmealEdit = this.$refs.SetmealEdit;
      SetmealEdit.Code = row.packageCode;
      SetmealEdit.isShow = true;
    }
  }
};
</script>
<style scoped>
</style>

