<template>
  <div class="content SFHistory">
    <div class="topTitle">
      <span>总检审核</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="姓名/卡号/单位名"
            v-model="request.Condition"
            class="arcRadius"
            @keyup.enter.native="getData()"
            style="width: 150px;"
          >

          </el-input>
          <div class="searchItem" style="display: inline-block;margin: 0 16px;">
            <el-select @change="selChange" v-model="request.Status">
              <el-option
                v-for="item in statusEnum"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                filter-placement="bottom-end"
              >{{item.name}}</el-option>
            </el-select>
          </div>
          <div style="display: inline-block;margin: 0 16px;">
            <el-date-picker
              v-model="request.DateRange"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </div>
          <el-button type="primary" @click="getData()">查询</el-button>
        </div>
      </div>
      <el-table ref="singleTable" :data="tableData" v-loading="loading" style="width: 100%">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="客户姓名" width="100" align="center">
          <template slot-scope="scope">
            <el-popover
              :trigger=" scope.row.isCrisis==1?'hover':'manual'"
              @show="getAbnormal(scope.row.orderCode)"
              placement="right"
            >
              <p>危机值</p>
              <p v-for="(item,index) of abnormalData" :key="index">{{ item.keys }}</p>
              <div slot="reference" class="name-wrapper" style=" position: relative;">
                <i
                  style="color:#F56C6C;position: absolute;left: -10px"
                  class="iconfont"
                  v-if="scope.row.isCrisis==1"
                >&#xe624;</i>
                <span>{{ scope.row.customerName }}</span>
                <!-- <span style="color:red">{{ scope.row.customerName }}</span>
                <span v-else></span>-->
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column property="customerGender" label="性别" width align="center" :sortable="true"></el-table-column>
        <el-table-column property="age" label="年龄" align="age" :sortable="true"></el-table-column>
        <el-table-column property="cardNum" label="卡号" width="200" align="center" :sortable="true"></el-table-column>
        <el-table-column
          property="idCardNum"
          label="身份证号"
          width="120"
          align="center"
          :sortable="true"
        ></el-table-column>
        <el-table-column property="unitName" label="单位名称" align="center"></el-table-column>
        <el-table-column property="deptName" label="部门" align="center"></el-table-column>
        <el-table-column property="teamName" label="组别" align="center"></el-table-column>
        <el-table-column property="checkBeginTime" label="体检开始时间" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.checkBeginTime| formatDate('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column property="summaryFinishTime" label="报告回传时间" width="150" align="center">
          <template slot-scope="scope">{{scope.row.summaryFinishTime | formatDate('YYYY-MM-DD') }}</template>
        </el-table-column>
        <!-- <el-table-column label="驳回" align="center">
          <i style="color:#F56C6C" class="iconfont" v-if="tableData.isReject==0">&#xe623;</i>
        </el-table-column>-->
        <el-table-column label="操作" fixed="right" :width="caozuowidth" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="strobj==0" @click="lock(scope.$index,scope.row)">锁定</el-button>
            <div v-else-if="strobj==2">
              <el-button type="text" @click="unlock(scope.$index,scope.row)">解锁</el-button>
              <el-button type="text" @click="auditing(scope.$index,scope.row)">审核</el-button>
            </div>
            <el-button type="text" v-else @click="see(scope.row,true)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部信息栏 -->
      <div class="fixBottom">
        <div class="right">
          <el-pagination
            style="display:inline-block;text-align:right;"
            :current-page="request.PageIndex"
            @current-change="handleCurrentChange"
            @size-change="sizeChange"
            :page-sizes="[10, 15, 20, 30,50,100]"
            layout="sizes, prev, pager, next, jumper"
            :page-count="pageNum"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "SHManage",
  data() {
    return {
      operatorCode: "001", //未返回操作用户编码，暂用001替代。
      name: "",
      request: {
        DateRange: [
          moment()
            .subtract(1, "years")
            .format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD")
        ],
        Condition: "",
        Status: 0, //默认未审核。
        FinalCode: "001", //当前登录用户的编码
        PageSize: 10,
        PageIndex: 1
      },
      caozuowidth: "80px",
      strobj: 0,
      total: 0,
      loading: false,
      person: "",
      pageNum: 1,
      tableData: [],
      statusEnum: [],
      abnormalData: [], //危急值数据。
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created: function() {
    this.getstatusEnum();
    this.getData();
  },
  methods: {
    sizeChange(ex) {
      this.request.PageSize = ex;
      this.getData();
    },
    handleCurrentChange(ex) {
      this.request.PageIndex = ex;
      this.getData();
    },
    selChange(val) {
      this.getData();
    },
    getData: function() {
      this.loading = true;
      let that = this;
      this.$axios
        .post(this.$api.GetSHUserLstByCondition, this.request, {
          "Content-Type": "application/json"
        })
        .then(response => {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.item1;
            that.total = response.data.entity.item2;
            that.pageNum = Math.ceil(that.total % that.request.PageIndex);
            that.strobj = that.request.Status;
            if (that.request.Status == 2) {
              that.caozuowidth = "150px";
            } else {
              that.caozuowidth = "80px";
            }
          } else {
            that.$message.error(response.data.message);
          }
          //关闭遮罩
          that.loading = false;
        })
        .catch(error => {
          //关闭遮罩
          that.loading = false;
          console.log(error);
        });
    },
    getstatusEnum: function() {
      let that = this;
      this.$axios
        .post(this.$api.GetReviewRstType)
        .then(function(response) {
          if (response.data.status === 1) {
            that.statusEnum = response.data.entity;
          } else {
            that.$message.error(response.data.message);
          }
        })
        .catch(function(error) {
          console.error(error.message);
        });
    },
    lock(index, row) {
      this.isLockByOrderCode(row.orderCode).then(res => {
        if (!res) {
          this.$axios
            .post(this.$api.LockSHUser, {
              orderCode: row.orderCode,
              innerCode: row.innerCode,
              OperatorCode: this.operatorCode
            })
            .then(res => {
              if (res.data.status == 1) {
                if (res.data.entity) {
                  // this.isHasProposal(row.orderCode).then(res => {
                  if (res) {
                    this.aginGenerateProposal(row);
                  }
                  // else {
                  //   this.generateProposal(row);
                  // }
                  // });
                } else {
                  this.$message.error(res.dta.message);
                }
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.error(err.message);
            });
        }
      });
    },
    unlock(index, row) {
      let that = this;
      this.$confirm(
        '<span>该用户将会进入未审核列表！</span><br /><i style="color:#8F9399;">请去未审核列表寻找该客户。</i>',
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          closeOnClickModal: false,
          type: "warning"
        }
      )
        .then(() => {
          this.$axios
            .post(this.$api.UnLockSHUser, {
              OrderCode: row.orderCode,
              OperatorCode: this.operatorCode
            })
            .then(res => {
              let data = res.data;
              if (data.status == 1) {
                if (data.entity) {
                  that.$message.success("解锁成功");
                  this.request.Status = 0;
                  this.getData();
                } else {
                  this.openNotify("解锁失败", data.message);
                }
              } else {
                that.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.error(err.message);
            });
        })
        .catch(() => {});
    },
    isLockByOrderCode(orderCode) {
      var that = this;
      let pro = new Promise(function(resolve, reject) {
        that.$axios
          .post(that.$api.IsLockSHUserByOrderCode, { orderCode: orderCode })
          .then(res => {
            if (res.data.status == 1) {
              if (res.data.entity) {
                that
                  .$confirm(res.data.message, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    closeOnClickModal: false,
                    type: "error"
                  })
                  .then(() => {})
                  .catch(() => {});
                resolve(true);
              } else {
                resolve(false);
              }
            } else {
              that.$message.error(res.data.message);
              that.getData();
            }
          })
          .catch(err => {
            console.error(err.message);
          });
      });
      return pro;
    },
    isHasProposal(orderCode) {
      var that = this;
      let pro = new Promise(function(resolve, reject) {
        that.$axios
          .post(that.$api.IsHasShFinalRstDetailByOrderCode, {
            orderCode: orderCode
          })
          .then(res => {
            if (res.data.status == 1) {
              if (res.data.entity) {
                resolve(true);
              } else {
                resolve(false);
              }
            } else {
              that.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err.message);
          });
      });
      return pro;
    },
    generateProposal(row) {
      this.$axios
        .post(this.$api.LockSHUserOperatorHasGuidance, {
          orderCode: row.orderCode,
          OperatorCode: this.operatorCode
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              this.$message.success("指导建议生成成功。");
              this.see(row, false);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    notGenerateProposal(row) {
      this.$axios
        .post(this.$api.LockPGUserOperatorNotHasGuidance, {
          orderCode: row.orderCode,
          OperatorCode: this.operatorCode
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              //转到二级页面
              this.see(row, false);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    aginGenerateProposal(row) {
      this.$axios
        .post(this.$api.LockSHUserOperatorHasGuidance, {
          orderCode: row.orderCode,
          OperatorCode: this.operatorCode
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              //this.$message.success("重新生成成功。");
              //转到二级页面
              this.see(row, false);
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    auditing(index, row) {
      // this.isLockByOrderCode(row.orderCode).then(res => {
      //   if (!res) {
      this.see(row, false);
      //   }
      // });
    },
    see(row, isDisabled) {
      let text = isDisabled ? "查看中，请稍候" : "审核中，请稍候";
      const loading = this.$loading({
        lock: true,
        text: text
      });
      this.$router.push({
        path: "/sh/shmodal",
        query: {
          rowData: row,
          parentName: this.$options.name,
          operatorCode: this.operatorCode,
          isDisabled: isDisabled
        }
      });
      loading.close();
    },
    //获取危机值
    getAbnormal(orderCode) {
      this.$axios
        .post(this.$api.GetCrisisFjRstAbnormalsByOrderCode, {
          OrderCode: orderCode
        })
        .then(res => {
          if (res.data.status == 1) {
            this.abnormalData = res.data.entity;
          } else {
            this.$message(res.data.message);
          }
        })
        .catch(err => {});
    }
  }
};
//   components: { dialogjy, dialoggroup, dialogcharge, dialogrefund }
</script>
<style scoped>
</style>

