<template>
  <div class="content">
    <div class="topTitle">
      <el-button icon="el-icon-back">返回</el-button>
      <el-button-group style="margin: 0 16px;">
        <el-button type="primary">检查结果</el-button>
        <el-button type="primary">异常汇总</el-button>
        <el-button type="primary">主检建议</el-button>
      </el-button-group>
      <span class="subitem">
        当前客户：
        <span class="labelColor">张三</span>
      </span>
      <span class="subitem">
        体检账号：
        <span class="labelColor" style="font-family: Arial;">000978877774</span>
      </span>
      <span class="subitem">
        单位名称：
        <span class="labelColor">某某某集团有限公司</span>
      </span>
      <div class="right">
        <el-button>驳回</el-button>
        <el-button type="success" @click="submitAdvice()">通过</el-button>
      </div>
    </div>
    <el-row>
      <div
        style="flex: 0 0 500px;border-right: 1px solid #DCDFE5;display: flex;flex-direction: column;"
      >
        <div class="subTitle">
          <span>检查结果</span>
          <div class="right">
            <el-checkbox v-model="isAbnormal">只看异常</el-checkbox>
            <el-select v-model="curItem" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="peopleInfo">
          <div class="quote">
            <p>一般检查</p>
          </div>
          <div style="padding: 4px 8px;">
            <div class="quote-s">
              <p>一般检查</p>
            </div>
            <el-table border :data="tableData" style="width:100%; ">
              <el-table-column prop="name" align="left" label="项目名称" width="180"></el-table-column>
              <el-table-column prop="see" align="center" label="所见" width="180"></el-table-column>
              <el-table-column prop="type" align="center" label="结果类型"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row,scope.$index)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="xiaojie"
              border
              style="width:100%;"
              :cell-style="cellClass"
              :header-cell-style="rowClass"
            >
              <el-table-column prop="neirong" align="left" :label="xiaojie[0].th"></el-table-column>
            </el-table>
          </div>
          <div class="quote">
            <p>物理检查</p>
          </div>
          <div style="padding: 4px 8px;">
            <div class="quote-s">
              <p>检查名字</p>
            </div>
            <el-table border :data="tableData" style="width:100%; ">
              <el-table-column prop="name" align="left" label="项目名称" width="180"></el-table-column>
              <el-table-column prop="see" align="center" label="所见" width="180"></el-table-column>
              <el-table-column prop="type" align="center" label="结果类型"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope.row,scope.$index)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div
        id="abnormal"
        style="flex: 0 0 416px;border-right: 1px solid #DCDFE5;display: flex;flex-direction: column;"
      >
        <div class="subTitle" style="flex:0 0 40px;">
          <span>异常汇总</span>
          <div class="right">
            <el-button @click="reBuild(orderCode,operatorCode)">重新生成</el-button>
            <el-button @click="addAbnormalShow">新增</el-button>
            <el-button @click="deleteAbnormal(multipleSelection)">删除</el-button>
          </div>
        </div>
        <div style="flex: 1;overflow-y: auto;">
          <el-table
            ref="abnormalTable"
            :data="tableData1"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-loading="loading"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="keys" align="left" label="异常内容"></el-table-column>
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope.row,scope.$index)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fixContainer">
          <div class="fixedBottom">
            <span class="reverseChoose" @click="chooseReverse">反选</span>
            <span>合计：</span>
            <span class="allCount">{{abnormalCount}}</span>
            <span>选中：</span>
            <span>{{abnormalChoosenCount}}</span>
          </div>
          <div class="floatRight">
            <el-button @click="compare">历次对比</el-button>
          </div>
        </div>
      </div>
      <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;" id="advSug">
        <div class="subTitle">
          <span>主检建议</span>
          <div class="right">
            <el-button @click="reBuildAdvice(orderCode,operatorCode)">重新生成</el-button>
            <el-button @click="addAdvicelShow">新增</el-button>
            <el-button @click="deleteAdvice(multipleSelection1)">删除</el-button>
          </div>
        </div>
        <div style="flex:1;overflow-y:auto;" id="advTable">
          <el-table
            ref="adviceTable"
            :data="tableData2"
            tooltip-effect="light"
            style="width: 100%"
            @selection-change="handleSelectionChangeSecond"
            v-loading="loading1"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="advName" align="left" label="建议的名称"></el-table-column>
            <el-table-column prop="content" align="left" label="建议" width="200"></el-table-column>
            <el-table-column prop="isStar" align="left" label="标记">
              <template slot-scope="scope">
                <i v-if="scope.row.isStar" class="el-icon-star-on" style="color:red"></i>
                <i v-else class="el-icon-star-off"></i>
              </template>
            </el-table-column>

            <el-table-column align="center" label="异常的组合">
              <template slot-scope="scope">
                <el-popover placement="top-start" width="200" trigger="click">
                  <span>{{itemcodes}}</span>
                  <el-button
                    slot="reference"
                    style="border:0px;color:#3a8ee6;"
                    @click="getItem(scope.row.orderCode,scope.row.advCode)"
                  >查看</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column align="center" width="80" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="editAdvise(scope.row,scope.$index)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fixContainer">
          <div class="fixedBottom">
            <span class="reverseChoose" @click="chooseReverseAdvice">反选</span>
            <span>合计：</span>
            <span class="allCount">{{abnormalCount1}}</span>
            <span>选中：</span>
            <span>{{abnormalChoosenCount1}}</span>
          </div>
          <div class="floatRight">
            <el-button @click="goUp()">上移</el-button>
            <el-button>下移</el-button>
            <el-button @click="reSort(orderCode)">一键排序</el-button>
          </div>
        </div>
      </div>
    </el-row>
    <dialogaddabnormal ref="dialogaddabnormal"></dialogaddabnormal>
    <dialogcompare ref="dialogcompare" :operatorCod="operatorCode" :orderCod="orderCode"></dialogcompare>
    <dialogaddadviece ref="dialogaddadviece"></dialogaddadviece>
    <dialogeditadviece ref="dialogeditadviece"></dialogeditadviece>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import dialogaddabnormal from "./DialogAddAbnormal.vue";
import dialogcompare from "./DialogCompare.vue";
import dialogaddadviece from "./DialogAddAdvice.vue";
import dialogeditadviece from "./DialogEditAdvice.vue";
export default {
  name: "PGModal",
  components: {
    dialogaddabnormal,
    dialogcompare,
    dialogaddadviece,
    dialogeditadviece
  },
  data() {
    return {
      isAbnormal: false,
      curItem: "1",
      multipleSelection: [],
      loading: true,
      loading1: true,
      abnormalCount: 0,
      abnormalChoosenCount: 0,
      itemcodes: "",
      tableData: [
        {
          name: "我是检查项目的名字",
          see: "我是所见的内容",
          type: "上"
        },
        {
          name: "我是检查项目的名字",
          see: "我是所见的内容",
          type: "上"
        },
        {
          name: "我是检查项目的名字",
          see: "我是所见的内容",
          type: "上"
        },
        {
          name: "我是检查项目的名字",
          see: "我是所见的内容",
          type: "上"
        },
        {
          name: "我是检查项目的名字",
          see: "我是所见的内容",
          type: "上"
        },
        {
          name: "我是检查项目的名字",
          see: "我是所见的内容",
          type: "上"
        }
      ],
      tableData1: [],
      tableData2: [],
      abnormalCount1: 0,
      multipleSelection1: [],
      abnormalChoosenCount1: 0,
      xiaojie: [
        {
          th:
            "我是小结内容我是小结内容我是小结内容我是小结内容我是小结内容我是小结内容我是小结内容我是小结内容我是小结内容我是小结内容",
          neirong:
            "报告医生：放美娟 报告时间：2019-03-12 审核医生：放美娟 审核时间：2019-03-12"
        }
      ],
      options: [
        {
          value: "0",
          label: "黄金糕"
        },
        {
          value: "1",
          label: "双皮奶"
        },
        {
          value: "2",
          label: "蚵仔煎"
        },
        {
          value: "3",
          label: "龙须面"
        },
        {
          value: "4",
          label: "北京烤鸭"
        }
      ],
      orderCode: "784f46c1-c391-43d9-ab83-b9b827de9d5d",
      operatorCode: "001"
    };
  },
  created() {
    //获取异常汇总
    this.getAbnormal(this.orderCode, this.operatorCode);
    this.getAdvice(this.orderCode, this.operatorCode);
    this.$store.commit("changeCollapse", true);
  },
  methods: {
    getAbnormal(orderCode, operatorCode) {
      let that = this;
      that.loading = true;
      this.$axios
        .post(this.$api.QuerySubtestExceptionItemSummaryByOrderCode, {
          orderCode,
          operatorCode
        })
        .then(function(response) {
          that.loading = false;
          if (response.data.status == 1) {
            that.tableData1 = response.data.entity;
            //计算总数
            that.abnormalCount = response.data.entity.length;
          } else {
            that.$message.error(
              `QuerySubtestExceptionItemSummaryByOrderCode错误：${
                response.data.message
              }`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(
            `QuerySubtestExceptionItemSummaryByOrderCode错误：${error}`
          );
        });
    },
    getAdvice(orderCode, operatorCode) {
      let that = this;
      that.loading1 = true;
      this.$axios
        .post(this.$api.GetLstPgMasterRstDetailByOrderCode, {
          orderCode,
          operatorCode
        })
        .then(function(response) {
          console.log(1, response);
          that.loading1 = false;
          if (response.data.status == 1) {
            that.tableData2 = response.data.entity;
            //计算总数
            that.abnormalCount1 = response.data.entity.length;
          } else {
            that.$message.error(
              `QuerySubtestExceptionItemSummaryByOrderCode错误：${
                response.data.message
              }`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(
            `QuerySubtestExceptionItemSummaryByOrderCode错误：${error}`
          );
        });
    },
    getItem(orderCode, advCode) {
      var that = this;
      this.$axios
        .post(this.$api.GetAbonomalSourceByAdvCode, {
          orderCode,
          advCode
        })
        .then(function(response) {
          console.log(1, response);
          if (response.data.status == 1) {
            if (response.data.entity.length != 0) {
              that.itemcodes = response.data.entity;
            }
          } else {
            that.$message.error(
              `QuerySubtestExceptionItemSummaryByOrderCode错误：${
                response.data.message
              }`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(
            `QuerySubtestExceptionItemSummaryByOrderCode错误：${error}`
          );
        });
    },
    compare() {
      this.$refs.dialogcompare.compareVisible = true;
    },
    reBuild(orderCode, operatorCode) {
      let that = this;
      this.$confirm(
        '<span>确定重新生成异常汇总？</span><br /><i style="color:#8F9399;">重新生成会导致新增异常丢失，请谨慎操作</i>',
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "error"
        }
      )
        .then(() => {
          this.$axios
            .post(this.$api.GenerateAbnomalSummaryByOrderCode, {
              orderCode,
              operatorCode
            })
            .then(function(response) {
              if (response.data.status == 1) {
                that.$message.success("重新生成成功");
                that.getAbnormal(orderCode, operatorCode);
                //取消加载遮罩
              } else {
                that.$message.error(
                  `GenerateAbnomalSummaryByOrderCode错误：${
                    response.data.message
                  }`
                );
              }
            })
            .catch(function(error) {
              that.$message.error(
                `GenerateAbnomalSummaryByOrderCode错误：${error}`
              );
            });
        })
        .catch(() => {
          return;
        });
    },
    reBuildAdvice(orderCode, operatorCode) {
      let that = this;
      this.$confirm(
        '<span>确定重新生成建议？</span><br /><i style="color:#8F9399;">重新生成会导致新增建议丢失，请谨慎操作</i>',
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "error"
        }
      )
        .then(() => {
      this.$axios
        .post(this.$api.GenerateMedicalGuidancesByOrderCode, {
          orderCode,
          operatorCode
        })
        .then(function(response) {
          if (response.data.status == 1) {
            that.$message.success("重新生成成功");
            that.getAdvice(orderCode, operatorCode);
            //取消加载遮罩
          } else {
            that.$message.error(
              `GenerateMedicalGuidancesByOrderCode错误：${
                response.data.message
              }`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(
            `GenerateAbnomalSummaryByOrderCode错误：${error}`
          );
        });
                })
        .catch(() => {
          return;
        });
    },
    reSort(orderCode){
      var that = this;
      this.$axios
        .post(this.$api.GetAKeySequenceByOrderCode, {
          orderCode
        })
        .then(function(response) {
          if (response.data.status == 1) {
            that.tableData2 = response.data.entity;
          } else {
            that.$message.error(
              `GetAKeySequenceByOrderCode错误：${
                response.data.message
              }`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(
            `GetAKeySequenceByOrderCode错误：${error}`
          );
        });
    },
    submitAdvice(){
     var that = this;
     //提交建议
     //修改排序号
     that.tableData2.map((ele,index)=>{
       return ele.orderNum = parseInt(index+1);
     });
      this.$axios
        .post(this.$api.BatchUpdatePgMasterRstDetail, 
          that.tableData2
        )
        .then(function(response) {
          if (response.data.status == 1) {
            that.$message.success("建议插入成功")
          } else {
            that.$message.error(
              `GetAKeySequenceByOrderCode错误：${
                response.data.message
              }`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(
            `GetAKeySequenceByOrderCode错误：${error}`
          );
        });
    },
    deleteAbnormal(innerCode) {
      if (innerCode.length == 0) {
        this.$message.error("至少选中一条");
        return;
      }
      this.$confirm(
        '<span>确定对当前所选异常进行删除操作？</span><br /><i style="color:#8F9399;">删除后不可恢复，请谨慎操作</i>',
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "error"
        }
      )
        .then(() => {
          var that = this;
          this.$axios
            .post(this.$api.BatchDeleteFjRstAbnormal, innerCode)
            .then(function(response) {
              if (response.data.status == 1) {
                that.$message.success("删除成功");
                that.getAbnormal(that.orderCode, that.operatorCode);
                //取消加载遮罩
              } else {
                that.$message.error(
                  `BatchDeleteFjRstAbnormal错误：${response.data.message}`
                );
              }
            })
            .catch(function(error) {
              that.$message.error(`BatchDeleteFjRstAbnormal错误：${error}`);
            });
        })
        .catch(() => {
          return;
        });
    },
    deleteAdvice(innerCode) {
      let arr = [];
      let ob = {};
      ob.innerCode = "f0af410e-3fa5-40ca-9c4d-802eb700cb21";
      arr.push(ob)
      if (innerCode.length == 0) {
        this.$message.error("至少选中一条");
        return;
      }
      this.$confirm(
        '<span>确定对当前所选建议进行删除操作？</span><br /><i style="color:#8F9399;">删除后不可恢复，请谨慎操作</i>',
        "删除确认",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "error"
        }
      )
        .then(() => {
          var that = this;
          this.$axios
            .post(this.$api.BathchDeletePgMasterRstDetail, arr)
            .then(function(response) {
              if (response.data.status == 1) {
                that.$message.success("删除成功");
                that.getAdvice(that.orderCode, that.operatorCode);
                //取消加载遮罩
              } else {
                that.$message.error(
                  `BatchDeleteFjRstAbnormal错误：${response.data.message}`
                );
              }
            })
            .catch(function(error) {
              that.$message.error(`BatchDeleteFjRstAbnormal错误：${error}`);
            });
        })
        .catch(() => {
          return;
        });
    },
    //反选
    chooseReverse() {
      this.tableData1.forEach(row => {
        this.$refs.abnormalTable.toggleRowSelection(row);
      });
      alert(this.multipleSelection1)
    },
    //反选（建议）
    chooseReverseAdvice() {
      this.tableData2.forEach(row => {
        this.$refs.adviceTable.toggleRowSelection(row);
      });
    },
    //上移医学指导建议
    goUp() {
      let that = this;
      //如果选中的不为空
      if (this.multipleSelection1.length == 0) {
        this.$message.error("至少选中一个项目");
        return;
      }
      //列表集合
      let finalArr = [];
      //选中项目集合
      // let chooseArr = [];

      this.tableData2.forEach((element, index) => {
        finalArr.push(element);
        this.multipleSelection1.forEach((ele, ind) => {
          //位置互换
          if (element.innerCode == ele.innerCode) {
          //   let temp = Object.assign(finalArr[index - 1], {});
          //   finalArr[index - 1] = Object.assign(element, {});
          //   finalArr[index] = temp;
            // chooseArr.push(element);
that.tableDataUp(that.tableData2, that.tableData2[index], index)
          }
        });
      });
      // console.log(finalArr)
      // this.tableData2 = finalArr;
      // this.multipleSelection1 = [];
      // this.handleSelectionChangeSecond(chooseArr)
      
    },
    edit(row, index) {
      this.$refs.dialogaddabnormal.flag = 2;
      this.$refs.dialogaddabnormal.innerCode = row.innerCode;
      this.$refs.dialogaddabnormal.itemCode = row.rptItemCodes;
      this.$refs.dialogaddabnormal.addVisible = true;
    },
    editAdvise(row, index) {
      this.$refs.dialogeditadviece.innerCode = row.innerCode;
      this.$refs.dialogeditadviece.adviceEditVisible = true;
    },
    addAbnormalShow() {
      this.$refs.dialogaddabnormal.flag = 1;
      this.$refs.dialogaddabnormal.addVisible = true;
    },
    addAdvicelShow() {
      this.$refs.dialogaddadviece.flag = 1;
      this.$refs.dialogaddadviece.adviceVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.abnormalChoosenCount = this.multipleSelection.length;
    },
    handleSelectionChangeSecond(val) {
      this.multipleSelection1 = val;
      
      console.log(this.multipleSelection1)
      this.abnormalChoosenCount1 = this.multipleSelection1.length;
    },
    tableDataUp(tableData, currRow, currRowIndex){
      if (currRowIndex > 0) {
        let upData = tableData[currRowIndex - 1];
        tableData.splice(currRowIndex- 1, 1);  
        tableData.splice(currRowIndex,0, upData);
      }
    },
    rowClass: function(row, rowIndex) {
      return "color:#606266;font-size:12px";
    },
    cellClass: function(row, column, rowIndex, columnIndex) {
      return "color:#909398;font-size:10px;text-align:right";
    },
    ...mapMutations(["changeCollapse"])
  }
};
</script>
<style scoped>
.right > * {
  display: inline-block;
}
.right .el-select {
  width: 100px;
}
.peopleInfo .quote {
  padding: 8px 16px;
  background-color: #eff0f1;
  border-left: 5px solid #c1c4cb;
  margin: 16px 0;
}
.peopleInfo .quote p {
  font-size: 16px;
  color: #606266;
  line-height: 1.5em;
}
.peopleInfo .quote-s {
  padding: 4px 10px;
  background-color: #eff0f1;
  border-radius: 4px 4px 0px 0px;
}
.peopleInfo .quote-s p {
  font-size: 14px;
  color: #606266;
  line-height: 1.5em;
}
.fixContainer {
  flex: 0 0 40px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #ebeef5;
  padding: 0px 16px;
  line-height: 40px;
  color: rgba(144, 147, 152, 1);
}
.fixedBottom {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  opacity: 1;
  float: left;
}
.reverseChoose {
  margin-right: 24px;
  cursor: pointer;
}
.allCount {
  margin-right: 16px;
}
.floatRight {
  float: right;
}
#abnormal .content .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

