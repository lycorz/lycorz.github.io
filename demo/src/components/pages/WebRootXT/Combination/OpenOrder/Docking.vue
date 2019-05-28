<template>
  <div class="docking">
    <el-dialog
      title="对接属性"
      :visible.sync="isShow"
      @open="Init"
      :close-on-click-modal="false"
      @close="close"
      width="1000px"
    >
      <el-col :span="24">
        <el-table
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
                <!-- <el-select v-else clearable v-model="master_data.sel[item.field]" placeholder="请选择">
                  <el-option
                    v-for="item in deptItems"
                    :key="item.deptCode"
                    :label="item.deptName"
                    :value="item.deptCode"
                    filter-placement="bottom-end"
                  >{{item.deptName}}</el-option>
                </el-select>-->
              </span>
              <span v-else>{{scope.row[item.field]}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="lisCheckType" label="检验类项目送检类型">
            <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-input size="mini" placeholder="请输入内容" v-model="master_data.sel.lisCheckType"></el-input>
              </span>
              <span v-else>{{scope.row[item.field]}}</span>
            </template>
          </el-table-column>-->
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
export default {
  name: "docking",
  data() {
    return {
      Code: "",
      isShow: false,
      loading: false,
      master_data: {
        sel: null, //选中行
        columns: [
          {
            field: "outCode",
            title: "外部系统编号",
            width: 120,
            maxlength: 50
          },
          {
            field: "lisGrpNum",
            title: "检验类项目条码合并组类",
            width: 200,
            maxlength: 20
          },
          {
            field: "lisTubeName",
            title: "检验类项目试管名称",
            width: 145,
            maxlength: 20
          },
          {
            field: "lisSampleType",
            title: "检验类项目样本类型",
            width: 165,
            maxlength: 100
          },
          { field: "lisCheckType", title: "检验类项目送检类型", maxlength: 100 }
        ],
        tableData: []
      }
    };
  },
  methods: {
    Init() {
      this.$axios
        .get(this.$api.GetOrderItemIfsDic, { params: { itemCode: this.Code } })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              res.data.entity["isSet"] = false;
              this.master_data.tableData.push(res.data.entity);
            }
          } else {
            this.$message.error("加载失败，请重试。");
            console.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    close() {
      this.master_data.tableData = [];
      this.master_data.sel = null;
      this.isShow = false;
    },
    submit() {
      let that = this;
      for (let i of that.master_data.tableData) {
        if (i.isSet) return that.$message.warning("请先保存当前编辑项");
      }
      this.master_data.tableData.forEach(el => {
        delete el.isSet;
      });
      if (this.master_data.tableData.length <= 0) {
        let j = {
          itemCode: this.Code,
          outCode: "",
          lisGrpNum: "",
          lisTubeName: "",
          lisSampleType: "",
          lisCheckType: ""
        };
        this.master_data.tableData.push(j);
      }
      this.$axios
        .post(this.$api.SaveOrderItemIfsDic, this.master_data.tableData)
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
      if (that.master_data.tableData.length > 0)
        return that.$message.error("只允许有一条对接属性！");
      for (let i of that.master_data.tableData) {
        if (i.isSet) return that.$message.warning("请先保存当前编辑项");
      }
      let j = {
        itemCode: "",
        outCode: "",
        lisGrpNum: "",
        lisTubeName: "",
        lisSampleType: "",
        lisCheckType: "",
        isSet: true
      };
      that.master_data.tableData.push(j);
      that.master_data.sel = JSON.parse(JSON.stringify(j));
    },
    change(row, index, cg) {
      let that = this;
      //点击修改 判断是否已经保存所有操作
      for (let i of that.master_data.tableData) {
        if (i.isSet && i.itemCode != row.itemCode) {
          that.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      //是否是取消操作
      if (!cg) {
        if (!that.master_data.sel.itemCode)
          that.master_data.tableData.splice(index, 1);
        return (row.isSet = !row.isSet);
      }
      //提交数据
      if (row.isSet) {
        //项目是模拟请求操作  自己修改下
        let data = JSON.parse(JSON.stringify(that.master_data.sel));
        for (let k in data) {
          if (k != "isSet" && k != "itemCode" && data[k] == "") {
            return that.$message.warning("不可输入空值");
          }
          row[k] = data[k];
        }
        this.master_data.tableData.map(z => {
          z.itemCode = this.Code;
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
.el-table-add-row {
  margin-top: 5px;
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
/* .add-row {
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
} */
/* table点击编辑 end */
</style>


