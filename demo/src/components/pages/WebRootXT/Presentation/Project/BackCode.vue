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
          :data="master_data.tableData"
          v-loading="loading"
          style="width:100%"
          highlight-current-row
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column
            v-for="(item,index) in master_data.columns"
            :prop="item.field"
            :label="item.title"
            :width="item.width"
            :key="index"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-input
                  size="mini"
                  :maxlength="item.maxlength"
                  placeholder="请输入内容"
                  class="is-request"
                  v-model="master_data.sel[item.field]"
                ></el-input>
              </span>
              <span v-else>{{scope.row[item.field]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <span
                class="el-tag el-tag--info el-tag--mini"
                style="cursor: pointer;margin-right:5px"
                @click="change(scope.row,scope.$index,true)"
              >{{scope.row.isSet?'保存':"修改"}}</span>
              <span
                v-if="!scope.row.isSet"
                class="el-tag el-tag--danger el-tag--mini"
                style="cursor: pointer;"
                @click="remove(scope.row,scope.$index)"
              >删除</span>
              <span
                class="el-tag el-tag--mini"
                v-else
                style="cursor: pointer;"
                @click="change(scope.row,scope.$index,false)"
              >取消</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <div class="el-table-add-row" @click="add()">
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
import moment from "moment";
export default {
  name: "ProjectBackCode",
  data() {
    return {
      Code: "",
      isShow: false,
      loading: false,
      master_data: {
        sel: null, //选中行
        columns: [
          {
            field: "outRptSubItemCode",
            title: "外部子项目编号",
            maxlength: 30
          },
          { field: "outRptItemCode", title: "外部组合项目编号", maxlength: 30 }
        ],
        tableData: []
      }
    };
  },
  methods: {
    Init() {
      this.loading = true;
      this.$axios
        .get(this.$api.GetRptSubItemVs3rd, {
          params: { rptSubItemCode: this.Code }
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity.length > 0) {
              res.data.entity.forEach(el => {
                el["isSet"] = false;
                this.master_data.tableData.push(el);
              });
            }
          } else {
            this.$message.error("加载失败，请重试");
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
      this.master_data.tableData = [];
      this.isShow = false;
    },
    submit() {
      let that = this;
      for (let i of that.master_data.tableData) {
        if (i.isSet) return that.$message.warning("请先保存当前编辑项");
      }
      let vs3rdData = new Array();
      this.master_data.tableData.forEach(el => {
        let item = {
          outRptSubItemCode: el.outRptSubItemCode,
          outRptItemCode: el.outRptItemCode,
          rptSubItemCode: el.rptSubItemCode,
          lastModifyTime: moment(),
          operatorCode: "001" //TODO:操作人
        };
        vs3rdData.push(item);
      });
      let data = {
        RptSubItemCode: this.Code,
        IfsDicRptSubItemVs3rdList: vs3rdData
      };
      this.$axios
        .post(this.$api.SaveRptSubItemVs3rd, data)
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
    //table 添加
    add() {
      let that = this;
      // if (that.master_data.tableData.length > 0)
      //   return that.$message.error("只允许有一条对应属性！");
      for (let i of that.master_data.tableData) {
        if (i.isSet) return that.$message.warning("请先保存当前编辑项");
      }
      let j = {
        outRptSubItemCode: "",
        outRptItemCode: "",
        rptSubItemCode: "",
        isSet: true
      };
      that.master_data.tableData.push(j);
      that.master_data.sel = JSON.parse(JSON.stringify(j));
    },
    change(row, index, cg) {
      let that = this;
      //点击修改 判断是否已经保存所有操作
      for (let i of that.master_data.tableData) {
        if (i.isSet && i.rptSubItemCode != row.rptSubItemCode) {
          that.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      //是否是取消操作
      if (!cg) {
        if (!that.master_data.sel.rptSubItemCode)
          that.master_data.tableData.splice(index, 1);
        return (row.isSet = !row.isSet);
      }
      //提交数据
      if (row.isSet) {
        //项目是模拟请求操作  自己修改下
        let data = JSON.parse(JSON.stringify(that.master_data.sel));
        for (let k in data) {
          if (k != "isSet" && k != "rptSubItemCode" && k !="outRptItemCode" && data[k] == "") {
            return that.$message.warning("请输入外部子项目代码");
          }
          row[k] = data[k];
        }
        this.master_data.tableData.map(z => {
          z.rptSubItemCode = this.Code;
          return z;
        });
        row.isSet = false;
      } else {
        that.master_data.sel = JSON.parse(JSON.stringify(row));
        row.isSet = true;
      }
    },
    remove(row, index) {
      this.master_data.tableData.remove(index);
      this.master_data.sel = null;
    }
  }
};
</script>
<style>
/* table点击编辑 start */
.el-table-add-row {
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  margin-bottom: 20px;
  line-height: 34px;
}
/* table点击编辑 end */
</style>


