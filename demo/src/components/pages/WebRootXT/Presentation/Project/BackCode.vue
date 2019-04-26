<template>
  <div class="ProjectBackCode">
    <el-dialog
      title="回传代码"
      :visible.sync="isShow"
      @open="Init"
      :close-on-click-modal="false"
      @close="close"
      width="700px"
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
          <el-table-column label="名称关键词" align="left">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.name"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="结论关键词" align="left">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.con"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
              <span>{{scope.row.con}}</span>
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
  name: "ProjectBackCode",
  data() {
    return {
      Code: "",
      isShow: false,
      loading: false,
      tableData: [
        {
          name: "我是名称关键词",
          con: "我是项目关键词"
        },
        {
          name: "我是名称关键词",
          con: "我是项目关键词"
        },
        {
          name: "我是名称关键词",
          con: "我是项目关键词"
        }
      ]
    };
  },
  methods: {
    Init() {},
    close() {
      this.isShow = false;
    },
    submit() {},
    handleCurrentChange(row, event, column) {
      console.log(row, event, column, event.currentTarget);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    //table 删除
    deltable(index) {
      this.tableData.remove(index);
    },
    //table 添加
    addRow() {
      let row = { name: "", con: "" };
      this.tableData.push(row);
      this.$refs.singleTable.setCurrentRow(row);
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


