<template>
  <div class="content EquipmentCheckIndex">
    <div class="topTitle">
      <span>设备维护</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="设备名称/首拼"
            v-model="searchParams.EquipmentName"
            class="arcRadius"
            clearable
            @keyup.enter.native="getData()"
            style="width: 150px;"
          >

          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 8px;">
            <el-select clearable v-model="searchParams.IsExpire" placeholder="是否到期">
              <el-option
                v-for="item in boolItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.label}}</el-option>
            </el-select>
          </div>
          <el-button style="margin-left:8px" type="primary" @click="getData()">查询</el-button>
          <div class="right">
            <!-- <el-button type="primary" @click="showCreateDialog()">新建</el-button>
            <el-button type="primary" @click="batchDelete()">删除</el-button>-->
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
        <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
        <el-table-column property="equipmentName" label="设备名称" align="left"></el-table-column>
        <el-table-column property="lastCheckTime" label="上次检修日期" align="left">
          <template
            slot-scope="datescope"
          >{{ datescope.row.lastCheckTime | formatDate("YYYY-MM-DD") }}</template>
        </el-table-column>
        <el-table-column property="lastOperatorName" label="上次检查人" align="left"></el-table-column>
        <el-table-column property="checkCycle" label="检修周期(天)" align="center"></el-table-column>
        <el-table-column property="isExpire" label="是否到期" align="center">
          <template slot-scope="scope">{{scope.row.isExpire | boolFilter}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="200px">
          <template slot-scope="scope">
            <el-button type="text" @click="details(scope.$index,scope.row)">查看详情</el-button>
            <el-button type="text" @click="maintain(scope.$index,scope.row)">维护</el-button>
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
    <EquipmentCheckMaintain ref="EquipmentCheckMaintain"></EquipmentCheckMaintain>
    <EquipmentCheckDetails ref="EquipmentCheckDetails"></EquipmentCheckDetails>
  </div>
</template>

<script>
import EquipmentCheckMaintain from "./Maintain.vue";
import EquipmentCheckDetails from "./Details.vue";
export default {
  name: "EquipmentCheckIndex",
  components: { EquipmentCheckMaintain, EquipmentCheckDetails },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
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
      searchParams: {
        EquipmentName: "",
        IsExpire: null,
        pageSize: 10,
        pageIndex: 1
      },
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
        .get(this.$api.GetEquipmentList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resDICEquipments;
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
    maintain(index, row) {
      let EquipmentCheckMaintain = this.$refs.EquipmentCheckMaintain;
      EquipmentCheckMaintain.isShow = true;
      EquipmentCheckMaintain.Code = row.equipmentCode;
    },
    details(index, row) {
      let EquipmentCheckDetails = this.$refs.EquipmentCheckDetails;
      EquipmentCheckDetails.Code = row.equipmentCode;
      EquipmentCheckDetails.isShow = true;
    }
    // batchDelete() {
    //   let keys = this.multipleSelection.map(z => z.innerCode);
    //   if (keys.length <= 0) {
    //     this.$message.error("请至少选中一项进行删除");
    //     return;
    //   }
    //   this.$confirm(
    //     '<span>您确定要删除选中数据吗？</span><br /><i style="color:#8F9399;">删除后不可恢复</i>',
    //     "提醒：",
    //     {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       dangerouslyUseHTMLString: true,
    //       type: "warning"
    //     }
    //   ).then(() => {
    //     this.$axios
    //       .post(this.$api.BatchDeleteEquipmentCheck, keys)
    //       .then(res => {
    //         if (res.status == 200 && res.data.status == 1) {
    //           this.$message.success("删除成功！");
    //           this.getData();
    //         } else {
    //           this.$message.error(res.data.message);
    //         }
    //       })
    //       .catch(err => {
    //         console.error(err);
    //       });
    //   });
    // }
  }
};
</script>
<style scoped>
</style>

