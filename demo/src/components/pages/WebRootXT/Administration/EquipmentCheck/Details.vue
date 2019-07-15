<template>
  <div id="EquipmentCheckDetails" class="EquipmentCheckDetails">
    <el-dialog
      class="infoucs"
      width="660px"
      title="设备维护"
      :visible.sync="isShow"
      :before-close="close"
      @open="init"
      :close-on-click-modal="false"
    >
      <el-table ref="singleTable" :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
        <el-table-column property="checkDate" label="检查时间" align="left">
          <template slot-scope="scope">{{scope.row.checkDate | formatDate("YYYY-MM-DD")}}</template>
        </el-table-column>
        <el-table-column property="checkStatusName" label="设备状态" align="left"></el-table-column>
        <el-table-column property="operatorName" label="检查人" align="left"></el-table-column>
        <el-table-column property="checkSummary" show-overflow-tooltip label="检查描述" align="left"></el-table-column>
      </el-table>
      <!-- <div class="right">
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
      </div>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <!-- <el-button type="primary" @click="submitForm">确定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  namne: "EquipmentCheckDetails",
  data() {
    return {
      Code: "",
      tableData: [],
      isShow: false,
      loading: false,
      searchParams: {
        equipmentCode:""
      }
    };
  },
  methods: {
    init() {
      this.loading = true;
      this.searchParams.equipmentCode = this.Code;
      this.$axios
        .get(this.$api.GetEquipmentCheckList, {
          params: this.searchParams
        })
        .then(res => {
          if (res.data.status == 1) {
            this.tableData = res.data.entity.resZKEquipmentChecks;
          } else {
            this.$message.error("获取设备维护列表失败，请重试");
            console.error(res.data.message);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.error(err);
        });
    },
    close() {
      this.isShow = false;
    }
  }
};
</script>

<style>
</style>

