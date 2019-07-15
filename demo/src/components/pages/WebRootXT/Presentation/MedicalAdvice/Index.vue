<template>
  <div class="content MedicalAdviceIndex">
    <div class="topTitle">
      <span>医学建议</span>
    </div>
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="建议名称/首拼 "
            v-model="searchParams.advName"
            @keyup.enter.native="getData()"
            class="arcRadius"
            style="width: 150px;"
          >
            
          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px; ">
            <el-select clearable v-model="searchParams.advType" placeholder="建议类型">
              <el-option
                v-for="item in AdvTypeItems"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.name}}</el-option>
            </el-select>
          </div>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.isStar" placeholder="是否星标">
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
            <el-select clearable v-model="searchParams.priority" placeholder="优先级">
              <el-option
                v-for="item in priorityItems"
                :key="item.value"
                :value="item.value"
                :label="item.name"
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
        <el-table-column
          property="advName"
          width="200px"
          show-overflow-tooltip
          label="建议名称"
          align="left"
        ></el-table-column>
        <el-table-column property="advContent" show-overflow-tooltip label="建议内容" align="left"></el-table-column>
        <el-table-column property="expression" show-overflow-tooltip label="异常表达式" align="left"></el-table-column>
        <el-table-column property="advTypeName" width="80px" label="建议类型" align="center"></el-table-column>
        <!-- <el-table-column property="funcName" label="异常类集合" align="center"></el-table-column> -->
        <el-table-column property="isStar" width="100px" label="是否星标" align="center">
          <template slot-scope="scope">{{scope.row.isStar | boolFilter}}</template>
        </el-table-column>
        <el-table-column
          property="priorityName"
          show-overflow-tooltip
          width="250px"
          label="优先级"
          align="left"
        ></el-table-column>
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
    <MedicalAdviceCreate ref="MedicalAdviceCreate"></MedicalAdviceCreate>
    <!-- <MedicalAdviceEdit ref="MedicalAdviceEdit"></MedicalAdviceEdit> -->
  </div>
</template>

<script>
import MedicalAdviceCreate from "./Create.vue";
export default {
  name: "MedicalAdviceIndex",
  components: { MedicalAdviceCreate },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      searchParams: {
        advName: "",
        expression: "",
        advType: null,
        priority: null,
        isStar: null,
        pageSize: 10,
        pageIndex: 1
      },
      priorityItems: [],
      AdvTypeItems: [],
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
    this.getAdvTypeItems();
    this.getPriorityItems();
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

    getPriorityItems() {
      let that = this;
      this.$axios
        .post(this.$api.getPriorityType)
        .then(function(response) {
          if (response.data.status == 1) {
            that.priorityItems = response.data.entity;
          } else {
            that.$message.error("加载优先级失败，请重试");
            console.error(response.data.message);
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    },

    getData() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.GetMedicalAdviceList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resDicMedicalAdvices;
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
    getAdvTypeItems() {
      this.$getType("AdvType").then(res => {
        if (res.status == 200 && res.data.status == 1) {
          let items = res.data.entity;
          this.AdvTypeItems = items;
        }
      });
    },
    /*  dialogfunction  */
    showCreateDialog() {
      let MedicalAdviceCreate = this.$refs.MedicalAdviceCreate;
      MedicalAdviceCreate.AdvTypeItems = this.AdvTypeItems;
      MedicalAdviceCreate.priorityItems = this.priorityItems;
      MedicalAdviceCreate.isShow = true;
    },
    edit(index, row) {
      let MedicalAdviceCreate = this.$refs.MedicalAdviceCreate;
      MedicalAdviceCreate.AdvTypeItems = this.AdvTypeItems;
      MedicalAdviceCreate.priorityItems = this.priorityItems;
      MedicalAdviceCreate.Code = row.advCode;
      MedicalAdviceCreate.isShow = true;
    },
    batchDelete() {
      let keys = this.multipleSelection.map(z => z.advCode);
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
          .post(this.$api.BatchDeleteMedicalAdvice, keys)
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

