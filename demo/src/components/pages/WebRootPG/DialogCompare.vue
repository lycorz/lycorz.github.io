<template>
  <el-dialog
    title="历次异常对比"
    :visible.sync="compareVisible"
    width="900px"
    id="dialogcompare"
    @open="getinit()"
  >
    <div style="text-align:center">
      <el-table id="table1" :data="tableData" border style="width: 400px;display:inline-block;">
        <el-table-column label="本次异常汇总" prop="abnormalName"></el-table-column>
      </el-table>
      <el-table id="table2" :data="tableData1" border style="width: 400px;display:inline-block;">
        <el-table-column align="left" prop="abnormalName" id="datatable1">
          <template slot="header" slot-scope="scope">
            <el-select v-model="value" placeholder="请选择" @change="getAbnormal(value,2,scope.row)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.checkBeginTime | formatDate('YYYY-MM-DD')"
                :value="item.orderCode"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="compareVisible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "DialogCompare",
  props: ["operatorCod", "orderCod"],
  data() {
    return {
      compareVisible: false,
      //
      tableData: [],
      tableData1: [],
      options:[],
      orderCode: "",
      operatorCode: "",
      loading: true,
      loading1: true,
      value:""
    };
  },
  mounted() {
    this.operatorCode = this.operatorCod;
    this.orderCode = this.orderCod;
  },
  watch: {
    // 如果 `operatorCode,orderCode` 发生改变，这个函数就会运行
    operatorCode: function(newoperatorCode, oldoperatorCode) {
      this.operatorCode = newoperatorCode;
      this.getinit();
    },
    orderCode: function(neworderCode, oldorderCode) {
      this.orderCode = neworderCode;
      this.getinit();
    }
  },
  methods: {
    getinit() {
      this.getAbnormal(this.orderCode,1);
      this.getCompare(this.orderCode)
    },
    getAbnormal(orderCode,flag,row) {
      let that = this;
      that.loading = true;
      this.$axios
        .post(this.$api.QuerySubtestExceptionItemSummaryByOrderCode, {
          orderCode
        })
        .then(function(response) {
          console.log(response.data.entity)
          that.loading = false;
          if (response.data.status == 1) {
            if(flag ==1){
            that.tableData = response.data.entity;
            }else{
              that.tableData1 = response.data.entity;
            }
          } else {
            that.$message.error(`QuerySubtestExceptionItemSummaryByOrderCode错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.loading = false;
          that.$message.error(`QuerySubtestExceptionItemSummaryByOrderCode错误：${error}`);
        });
    },
    getCompare(orderCode) {
      let that = this;
      that.loading1 = true;
      this.$axios
        .post(this.$api.ReviewSummaryEachExceptionByOrderCode, {
          orderCode
        })
        .then(function(response) {
          console.log(response.data.entity)
          that.loading = false;
          if (response.data.status == 1 ) {
            if (response.data.entity.length != 0) {
                that.options = response.data.entity;
            that.value = response.data.entity[0].orderCode;
            that.getAbnormal(that.value,2)
            }
          } else {
            that.$message.error(`ReviewSummaryEachExceptionByOrderCode错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.loading = false;
          that.$message.error(`ReviewSummaryEachExceptionByOrderCode错误：${error}`);
        });
    }
  }
};
</script>
<style>
#dialogcompare .cell .el-select {
  padding: 0px;
}
#dialogcompare .cell .el-select .el-input--suffix {
  padding: 0px !important;
}
#table2 th.is-leaf {
  padding: 1px !important;
  background: #f6f6f6;
}
#table1 th.is-leaf {
  background: #f6f6f6;
  color: #606266;
}
#dialogcompare td {
  height: 48px;
}
#dialogcompare .el-table__body-wrapper {
  overflow-y: auto;
  height: 192px;
}
</style>
