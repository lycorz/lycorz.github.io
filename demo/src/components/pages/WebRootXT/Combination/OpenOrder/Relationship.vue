<template>
  <div class="relationship">
    <el-dialog
      title="报告对应关系"
      :visible.sync="isShow"
      @open="init"
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
                      placeholder="请输入内容"
                      :maxlength="item.maxlength"
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
                    v-else
                    class="el-tag el-tag--mini"
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
        :props="{key: 'subItemCode',label: 'subItemName'}"
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
import { resolve, reject } from "q";
export default {
  name: "relationship",
  data() {
    return {
      orderItemCode: "",
      isShow: false,
      loading: false,
      activeName: "first",

      //first
      sonItems: [],
      newSonItems: [],
      //second
      master_data: {
        sel: null, //选中行
        columns: [
          { field: "nameKeyword", title: "名称关键词", maxlength: 10 },
          { field: "resultKeyword", title: "结论关键词", maxlength: 50 }
        ],
        tableData: []
      },
      //edit子窗体
      editIsShow: false,
      transferData: [],
      transferValue: []
    };
  },
  created() {},
  filters: {},
  methods: {
    init() {
      this.firstInit();
      this.secondInit();
    },
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
    secondInit() {
      this.loading = true;
      this.$axios
        .get(this.$api.GetOrderItemKeywords, {
          params: { itemCode: this.orderItemCode }
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity.length > 0) {
              this.master_data.tableData = new Array();
              res.data.entity.forEach(el => {
                el["isSet"] = false;
                this.master_data.tableData.push(el);
              });
            }
          } else {
            this.$message.error("加载失败，请重试。");
            console.error(res.data.message);
          }
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });
    },
    //切换tabl事件，按需加载
    handleClick(val, e) {
      // switch (val.index) {
      //   case "0":
      //     this.firstInit();
      //     break;
      //   case "1":
      //     this.secondInit();
      //     break;
      //   default:
      //     this.firstInit();
      //     break;
      // }
    },
    //一级页面关闭
    close() {
      this.isShow = false;
      this.sonItems = [];
      this.activeName = "first";
      this.master_data.tableData = new Array();
      this.master_data.sel = null;
    },

    //一级页面提交 同时提交关键项目和关键词
    submit() {
      //提交报告项目
      for (let i of this.master_data.tableData) {
        if (i.isSet) {
          this.$message.warning("请先保存当前编辑项");
          this.activeName = "second";
          return;
        }
      }
      this.master_data.tableData.forEach(el => {
        delete el.isSet;
      });
      new Promise((resolve, reject) => {
        this.$axios
          .post(this.$api.SaveOrderItemKeywords, this.master_data.tableData)
          .then(res => {
            if (res.data.status != 1) {
              this.$message.error("保存失败，请重试。");
              console.error(res.data.message);
            } else {
              resolve(true);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }).then(val => {
        if (val) {
          this.$axios
            .post(this.$api.SaveDicRptSubItem, this.sonItems)
            .then(res => {
              if (res.data.status == 1) {
                this.$message.success("保存成功！");
                this.close();
              } else {
                this.$message.error("保存失败，请重试。");
                console.error(res.data.message);
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    },
    //关键词table编辑
    //table 添加
    add() {
      let that = this;
      for (let i of that.master_data.tableData) {
        if (i.isSet) return that.$message.warning("请先保存当前编辑项");
      }
      let j = {
        keywordCode: null,
        itemCode: "",
        resultKeyword: "",
        nameKeyword: "",
        priority: null, //TODO：优先级，未提供维护，先设置为null
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
        let data = JSON.parse(JSON.stringify(that.master_data.sel));
        for (let k in data) {
          if (k != "isSet" && k != "itemCode" && data[k] === "") {
            return that.$message.warning("不可输入空值");
          }
          row[k] = data[k];
        }
        this.master_data.tableData.map(i => {
          i.itemCode = this.orderItemCode;
          return i;
        });
        row.isSet = false;
      } else {
        that.master_data.sel = JSON.parse(JSON.stringify(row));
        row.isSet = true;
      }
    },
    //table删除按钮，未启用。
    remove(row, index) {
      this.master_data.tableData.remove(index);
      this.master_data.sel = null;
    },
    //修改弹出层
    edit() {
      this.editIsShow = true;
    },
    //二级页面搜索
    filterSearch() {},
    editInit() {
      this.$axios //GetAllDicRptSubItem
        .get(this.$api.GetAllRptSubItemList)
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
      let that = this;
      that.sonItems = [];
      that.transferValue.forEach(el => {
        let item = that.transferData.find(z => z.subItemCode == el);
        that.sonItems.push({
          rptSubItemCode: item.subItemCode,
          rptSubItemName: item.subItemName,
          orderItemCode: that.orderItemCode,
          lastModifyTime: new Date(),
          Operator: "001" //TODO:操作人，默认001，待修改。
        });
      });
      that.editClose();
    }

    //数组对象扩展方法
  }
};
</script>
<style>
/* table点击编辑 start */
.relationship .el-table-add-row {
  margin-top: 5px;
  width: 99.5%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
}
/* .tb_edit .el-input {
  display: none;
}
.tb_edit .current-row .el-input {
  display: block;
}
.tb_edit .current-row .el-input + span {
  display: none;
} */
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

