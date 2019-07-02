<template>
  <div class="content CombinationIndex">
    <div class="topTitle">
      <span>开单项目</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="项目名称"
            v-model="searchParams.itemName"
             @keyup.enter.native="getData()"
            class="arcRadius"
            style="width: 150px;"
          >

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
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.isEmpty" placeholder="是否空腹">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.label}}</el-option>
            </el-select>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.isEnable" placeholder="是否启用">
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
            <el-button type="primary" @click="showCreateDialog()">新建开单组合项</el-button>
          </div>
        </div>
      </div>
      <el-table ref="singleTable" :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column property="itemCode" label="项目编号" align="center"></el-table-column>
        <el-table-column property="itemName" label="项目名称" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column property="deptName" label="所属科室" align="left" show-overflow-tooltip></el-table-column>
        <el-table-column
          property="inspectPurpose"
          label="检查目的与意义"
          show-overflow-tooltip
          width="120px"
          align="left"
        ></el-table-column>
        <el-table-column property="sexTypeName" label="使用性别" align="center">
        </el-table-column>
        <el-table-column property="isEmpty" label="是否空腹" align="center">
          <template slot-scope="scope">{{ scope.row.isEmpty | boolFilter}}</template>
        </el-table-column>
        <el-table-column property="exePrice" label="执行价格" align="center"></el-table-column>
        <el-table-column property="isEnable" label="是否启用" align="center">
          <template slot-scope="scope">{{ scope.row.isEnable | boolFilter}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" width="200px">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text" @click="showRelationship(scope.$index,scope.row)">报告对应关系</el-button>
            <el-button type="text" @click="showDocking(scope.$index,scope.row)">对接属性</el-button>
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
    <CombinationCreate ref="CombinationCreate"></CombinationCreate>
    <relationship ref="relationship"></relationship>
    <docking ref="docking"></docking>
  </div>
</template>

<script>
import CombinationCreate from "./Create.vue";
import relationship from "./Relationship.vue";
import docking from "./Docking.vue";
export default {
  name: "CombinationIndex",
  components: { CombinationCreate, relationship, docking },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      deptItems: [],
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
      sexItems: [],
      searchParams: {
        itemName: "",
        deptCode: "",
        sexType: null,
        virginDisabled: null, //不知道这个字段是干嘛的
        isEmpty: null,
        isEnable: null,
        pageSize: 10,
        pageIndex: 1
      }
    };
  },
  created: function() {
    this.getDeptItems();
    this.getData();
    this.getSexItems();
  },
  provide() {
    return {
      getData: this.getData
    };
  },
  filters: {
    sexFilter(value, row, column) {
      let val = "";
      switch (value) {
        case 0:
          val = "男女通用";
          break;
        case 1:
          val = "男";
          break;
        case 2:
          val = "女";
          break;
        default:
          val = "男女通用";
          break;
      }
      return val;
    },
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
    //获取项目
    getData() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.GetOrderItemList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
              that.tableData = response.data.entity.resDicOrderItems;
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
        .get(that.$api.GetAllDeptList)
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
    //获取性别下拉
    getSexItems() {
      let that = this;
      that.$axios
        .get(that.$api.GetEnumValueList, { params: { typeName: "SexType" } })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            that.sexItems = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /*  弹出层方法start  */
    showCreateDialog() {
      let CombinationCreate = this.$refs.CombinationCreate;
      CombinationCreate.isShow = true;
    },
    edit(index, row) {
      let CombinationCreate = this.$refs.CombinationCreate;
      CombinationCreate.Code = row.itemCode;
      CombinationCreate.isShow = true;
    },
    showRelationship(index, row) {
      let relationship = this.$refs.relationship;
      relationship.orderItemCode = row.itemCode;
      relationship.isShow = true;
    },
    showDocking(index, row) {
      let docking = this.$refs.docking;
      docking.Code = row.itemCode;
      docking.isShow = true;
    }
  }
};
</script>
<style scoped>
</style>

