<template>
  <div class="docking">
    <el-dialog
      title="报告对应关系"
      :visible.sync="isShow"
      @open="Init"
      :close-on-click-modal="false"
      @close="close"
      width="1000px"
    >
      <el-col :span="24">
        <el-table
          class="tb_edit"
          ref="singleTable"
          :data="tableData"
          v-loading="loading"
          style="width:100%"
          highlight-current-row
          @row-click="handleCurrentChange"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="outCode" label="外部系统编号" align="left">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.outCode"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
              <span>{{scope.row.outCode}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lisGrpNum" label="检验类项目条码合并组类" width="200px" align="left">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lisGrpNum"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
              <span>{{scope.row.lisGrpNum}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lisTubeName" label="检验类项目试管名称" align="left">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lisTubeName"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
              <span>{{scope.row.lisTubeName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lisSampleType" label="检验类项目样本类型" align="left">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lisSampleType"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
              <span>{{scope.row.lisSampleType}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="lisCheckType" label="检验类项目送检类型" align="left">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.lisCheckType"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
              <span>{{scope.row.lisCheckType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px" align="center">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="medium"
                @click="deltable(scope.$index)"
                circle
                style="padding: 0px 1px"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <div class="add-row" style="width: 99.2%;" @click="addRow()">
          <span>+ 添加</span>
        </div>
      </el-col>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "docking",
  data() {
    return {
      Code: "",
      isShow: false,
      loading: false,
      tableData: []
    };
  },
  methods: {
    Init() {
      this.$axios
        .get(this.$api.GetOrderItemIfsDic, { params: { itemCode: this.Code } })
        .then(res => {
          if (res.data.status == 1) {
            this.tableData.push(res.data.entity);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    close() {
      this.tableData = [];
      this.isShow = false;
    },
    submit() {
      this.$axios
        .post(this.$api.SaveOrderItemIfsDic, this.tableData[0])
        .then(res => {
          if (res.data.status == 1) {
            this.$message.success("保存成功！");
            this.close();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleCurrentChange(row, event, column) {
      console.log(row, event, column, event.currentTarget);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    //table 删除
    deltable(index) {
      this.tableData.remove(index);
      console.log(index);
      console.log(this.tableData);
    },
    //table 添加
    addRow() {
      if ((this.tableData.length < 1)) {
        let row = {
          outCode: "",
          lisGrpNum: "",
          lisTubeName: "",
          lisSampleType: "",
          lisCheckType: ""
        };
        this.tableData.push(row);
        this.$refs.singleTable.setCurrentRow(row);
      }else{
        this.$message.error("只允许有一条对接属性");
      }
    }
  }
};
</script>
<style>
/* table点击编辑 start */
.add-row {
  margin-top: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
  margin-bottom: 10px;
}
.tb_edit .el-input {
  display: none;
}
.tb_edit .current-row .el-input {
  display: block;
}
.tb_edit .current-row .el-input + span {
  display: none;
}
/* table点击编辑 end */
</style>


