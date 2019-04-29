<template>
  <div class="relationship">
    <el-dialog
      title="报告对应关系"
      :visible.sync="isShow"
      @open="firstInit"
      :close-on-click-modal="false"
      @close="close"
      width="700px"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="所含报告项目" name="first">
          <div>
            <div class="ul-title">
              <ul>
                <li class="item">
                  <span>子项目编号</span>
                </li>
                <li class="item">
                  <span>子项目名称</span>
                </li>
                <li class="item-btn">
                  <el-button type="text" @click="edit">编辑</el-button>
                </li>
              </ul>
            </div>
            <div class="ul-con">
              <ul v-for="(item,index) in sonItems" :key="index">
                <li class="item1">
                  <div class="item-list">{{item.rptSubItemCode }}</div>
                </li>
                <li class="item2">
                  <div class="item-list">{{item.rptSubItemName}}</div>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="所含关键词" name="second">
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
                <template slot-slot-scope="scope">
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
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="子项目列表"
      width="580px"
      :visible.sync="editIsShow"
      :close-on-click-modal="false"
      @open="editInit"
      @close="editClose"
    >
      <el-transfer
        v-model="transferValue"
        filterable
        :titles="['选择列表', '添加列表']"
        style="text-align: left; display: inline-block;"
        filter-placeholder="请输入"
        :props="{key: 'rptSubItemCode',label: 'rptSubItemName'}"
        :data="transferData"
      ></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editClose">取消</el-button>
        <el-button type="primary" @click="editSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "relationship",
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i,
          desc: `备选项 ${i}`
          // disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      orderItemCode: "",
      isShow: false,
      activeName: "first",

      //first
      sonItems: [],
      //second
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
      ],
      //edit子窗体
      editIsShow: false,
      transferData: [],
      transferValue: []
    };
  },
  created() {},
  filters: {},
  methods: {
    firstInit() {
      this.$axios
        .get(this.$api.GetDicRptSubItem, {
          params: { OrderItemCode: this.orderItemCode }
        })
        .then(res => {
          if (res.data.status == 1) {
            this.sonItems = res.data.entity;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    secondInit() {},
    //切换tabl事件，按需加载
    handleClick(val, e) {
      switch (val.index) {
        case "0":
          this.firstInit();
          break;
        case "1":
          this.secondInit();
          break;
        default:
          this.firstInit();
          break;
      }
    },
    //一级页面关闭
    close() {
      this.isShow = false;
      this.sonItems = [];
    },

    //一级页面提交 同时提交关键项目和关键词
    submit() {
      //提交报告项目
      this.$axios
        .post(this.$api.SaveDicRptSubItem, this.sonItems)
        .then(res => {
          if (res.data.status == 1) {
            this.$message.success("保存成功！");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //table编辑
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
    },
    //修改弹出层
    edit() {
      this.editIsShow = true;
    },
    //二级页面搜索
    filterSearch() {},
    editInit() {
      this.$axios
        .get(this.$api.GetAllDicRptSubItem)
        .then(res => {
          if (res.data.status == 1) {
            this.transferData = res.data.entity;
            if (this.sonItems.length > 0) {
              this.sonItems.forEach(element => {
                this.transferValue.push(element.rptSubItemCode);
              });
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    editClose() {
      this.editIsShow = false;
      this.transferData = [];
      this.transferValue = [];
    },
    //修改弹出层提交事件
    editSubmit() {
      this.sonItems = [];
      this.transferValue.forEach(el => {
        let item = this.transferData.find(z => z.rptSubItemCode == el);
        this.sonItems.push(item);
      });
      this.editClose();
    }

    //数组对象扩展方法
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
.ul-title {
  padding: 8px 16px 16px;
  overflow: hidden;
}
.ul-title ul {
  background: #f6f6f6;
  overflow: hidden;
}
.ul-title .item {
  width: 21%;
  line-height: 28px;
  float: left;
  text-align: left;
  font-size: 14px;
  color: #606266;
}
.ul-title .item-btn {
  width: 50%;
  line-height: 28px;
  float: right;
  text-align: right;
  font-size: 14px;
}
.ul-con {
  padding: 0px 16px 16px;
  font-size: 12px;
  color: #606266;
  overflow: hidden;
}
.ul-con ul {
  overflow: hidden;
}
.ul-con .item1 {
  width: 21%;
  line-height: 28px;
  float: left;
  margin-bottom: 16px;
  text-align: left;
}
.ul-con .item2 {
  width: 79%;
  line-height: 28px;
  float: left;
  margin-bottom: 16px;
  text-align: left;
}
.ul-con .item .item-list {
  display: block;
  float: left;
}
</style>

