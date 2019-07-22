<template>
  <div class="content">
    <div class="topTitle">
      <span>主检评估</span>
    </div>
    <div class="peopleData">
      <div class="propleSearch">
        <el-input
          placeholder="姓名/卡号/单位名"
          v-model="searchParams.condition"
          class="arcRadius"
          @keyup.enter.native="getData()"
          style="width: 150px;"
        ></el-input>
        <div class="searchItem" style="display: inline-block;margin: 0 16px;">
          <el-select v-model="searchParams.status" @change="selChange" placeholder="评估结果">
            <el-option
              v-for="item in assessRst"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </div>
        <div style="display: inline-block;margin-right: 16px;">
          <el-date-picker
            v-model="searchParams.dateRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </div>
        <el-button type="primary" @click="getData">查询</el-button>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      height="9999"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
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
      <!-- <el-table-column prop="customerName" label="客户姓名" width="200" align="center">
      </el-table-column>-->
      <el-table-column
        property="customerGender"
        label="性别"
        width="120"
        align="center"
        :sortable="true"
      ></el-table-column>
      <el-table-column property="age" label="年龄" width="120" align="center" :sortable="true"></el-table-column>
      <el-table-column property="cardNum" label="体检卡号" width="120" align="center" :sortable="true"></el-table-column>
      <el-table-column property="idCardNum" label="身份证号" width="120" align="center"></el-table-column>
      <el-table-column property="unitName" label="单位名称" align="center"></el-table-column>
      <el-table-column property="deptName" label="部门" align="center"></el-table-column>
      <el-table-column property="teamName" label="组别" align="center"></el-table-column>
      <el-table-column property="checkBeginTime" label="体检开始时间" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.checkBeginTime| formatDate('YYYY-MM-DD') }}</template>
      </el-table-column>
      <el-table-column property="summaryFinishTime" label="报告回传时间" width="150" align="center">
        <template slot-scope="scope">{{scope.row.summaryFinishTime | formatDate('YYYY-MM-DD') }}</template>
      </el-table-column>
      <el-table-column label="驳回" align="center" v-if="showState">
        <template slot-scope="scope">
          <i style="color:#F56C6C" class="iconfont" v-if="scope.row.isReject==0">&#xe623;</i>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" :width="caozuowidth" align="center">
        <template slot-scope="scope">
          <el-button type="text" v-if="strobj==0" @click="lock(scope.$index,scope.row)">锁定</el-button>
          <div v-else-if="strobj==2">
            <el-button type="text" @click="unlock(scope.$index,scope.row)">解锁</el-button>
            <el-button type="text" @click="auditing(scope.$index,scope.row)">评估</el-button>
          </div>
          <div v-else>
            <el-button type="text" @click="see(scope.row,true)">查看</el-button>
            <el-button type="text" @click="withdraw(scope.$index,scope.row)">撤回</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部信息栏 -->
    <div class="fixBottom">
      <div class="right">
        <el-pagination
          style="display:inline-block;text-align:right;"
          :current-page="searchParams.pageIndex"
          @current-change="handleCurrentChange"
          @size-change="sizeChange"
          :page-sizes="[10, 15, 20, 30,50,100]"
          layout="sizes, prev, pager, next, jumper"
          :page-count="pageNum"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "PGMain",
  data() {
    return {
      assessRst: [],
      searchParams: {
        dateRange: [
          moment()
            .subtract(1, "years")
            .format("YYYY-MM-DD"),
          moment().format("YYYY-MM-DD")
        ],
        condition: "",
        status: 0,
        masterCode: "001",
        pageSize: 10,
        pageIndex: 1
      },
      showState: false,
      loading: false,
      pageNum: 1,
      caozuowidth: "80px",
      strobj: 0,
      total: 0,
      tableData: [],
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
      },
      operatorCode: "001" //TODO: 主页面接口未返回操作人字段，暂且用001代替
    };
  },
  created: function() {
    this.getData();
    this.getAssessRstType();
  },
  methods: {
    sizeChange(ex) {
      this.searchParams.pageSize = ex;
      this.getData();
    },
    handleCurrentChange(ex) {
      this.searchParams.pageIndex = ex;
      this.getData();
    },
    selChange(val) {
      this.getData();
    },
    getData() {
      let that = this;
      this.loading = true;
      this.$axios
        .post(this.$api.GetPGUserLstByCondition, this.searchParams)
        .then(response => {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.item1;
            that.total = response.data.entity.item2;
            that.pageNum = Math.ceil(that.total / that.searchParams.pageSize);
            that.strobj = that.searchParams.status;
            if (that.searchParams.status == 0) {
              that.caozuowidth = "80px";
              that.showState = false;
            } else if (that.searchParams.status == 2) {
              that.caozuowidth = "150px";
              that.showState = true;
            } else {
              that.caozuowidth = "150px";
              that.showState = false;
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
    //获取评估状态枚举
    getAssessRstType() {
      this.$axios.post(this.$api.GetAssessRstType).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.assessRst = res.data.entity;
        }
      });
    },
    /* 锁定   start
     * 判断此信息是否已被锁定=》
     * 1、未锁定=》锁定用户，判断是否已生成指导建议=》
     * 已生成=》自动生成。
     * 未生成=》弹窗询问用户是否生成建议。
     * 2、已锁定=》提示，已被锁定
     */
    lock(index, row) {
      let that = this;
      this.$axios
        .post(this.$api.IsLockPGUserByOrderCode, {
          OrderCode: row.orderCode,
          OperatorCode: this.operatorCode
        })
        .then(res => {
          let data = res.data;
          if (data.status == 1) {
            if (data.entity) {
              //已锁定
              //DONE:提示已被锁定
              that.$message.warning("已被锁定请刷新页面"); //data.message +
            } else {
              //未锁定
              this.notlocked(row);
            }
          } else {
            that.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    //未锁定
    notlocked(row) {
      //锁定
      this.$axios
        .post(this.$api.LockPGUser, {
          OrderCode: row.orderCode,
          OperatorCode: this.operatorCode
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              //锁定成功后查看是否拥有医疗指导建议。
              this.$axios
                .post(this.$api.IsHasPgMasterRstDetailByOrderCode, {
                  OrderCode: row.orderCode,
                  OperatorCode: this.operatorCode
                })
                .then(result => {
                  if (res.data.status == 1) {
                    this.proposalChoice(res.data.entity, row);
                  } else {
                    this.$message.error(res.data.message);
                  }
                })
                .catch(err => {
                  console.error(err.message);
                });
            } else {
              this.$message.error(res.data.message);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    //生成建议or不生成or重新生成
    proposalChoice(isHasProposal, row) {
      if (isHasProposal) {
        //提示是否重新生成。
        this.$confirm("该条数据已存在医学指导建议，是否重新生成?", "提示", {
          confirmButtonText: "重新生成",
          cancelButtonText: "不生成",
          dangerouslyUseHTMLString: true,
          closeOnClickModal: false,
          type: "warning"
        })
          .then(() => {
            this.aginProposal(row);
          })
          .catch(() => {
            this.notProposal(row);
          });
      } else {
        //无建议，则自动生成
        this.doProposal(row);
      }
    },
    //正常生成建议
    doProposal(row) {
      this.$axios
        .post(this.$api.LockPGUserOperatorHasGuidance, {
          OrderCode: row.orderCode,
          OperatorCode: this.operatorCode
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              this.$message.success("生成成功。");
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
    //重新生成建议
    aginProposal(row) {
      this.$axios
        .post(this.$api.GenerateMedicalGuidancesByOrderCode, {
          OrderCode: row.orderCode,
          OperatorCode: this.operatorCode
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              this.$message.success("重新生成成功。");
              this.see(row, false);
              //操作结束后刷新页面。
              // this.searchParams.status = 2;
              // this.getData();
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
    //不生成建议。
    notProposal(row) {
      this.$axios
        .post(this.$api.LockPGUserOperatorNotHasGuidance, {
          OrderCode: row.orderCode,
          OperatorCode: this.operatorCode
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.entity) {
              this.see(row, false);
              //操作结束后刷新页面。
              // this.searchParams.status = 2;
              // this.getData();
              // this.$message.success("生成成功。");
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
      this.getData();
    },
    /* 锁定 end */

    //解锁
    unlock(index, row) {
      let that = this;
      this.$confirm(
        '<span>该用户将会进入未评估列表！</span><br /><i style="color:#8F9399;">请去未评估列表寻找该客户。</i>',
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
            .post(this.$api.UnLockPGUser, {
              OrderCode: row.orderCode,
              OperatorCode: this.operatorCode
            })
            .then(res => {
              let data = res.data;
              if (data.status == 1) {
                if (data.entity) {
                  that.$message.success("解锁成功");
                  this.searchParams.status = 0;
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
    //评估
    auditing(index, row) {
      this.see(row, false);
    },
    //撤回
    withdraw(index, row) {
      let that = this;
      this.$confirm(
        '<span>该用户将会进入评估中列表！</span><br /><i style="color:#8F9399;">请去评估中列表寻找该客户</i>',
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
            .post(this.$api.RevokePGUser, {
              OrderCode: row.orderCode,
              OperatorCode: this.operatorCode
            })
            .then(res => {
              let data = res.data;
              if (data.status == 1) {
                if (data.entity) {
                  that.$message.success("撤回成功");
                  this.searchParams.status = 2;
                  this.getData();
                } else {
                  this.openNotify("撤回失败", data.message);
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
    //查看  isDisabled:是否禁用二级页面的修改按钮。
    see(row, isDisabled) {
      let text = isDisabled ? "查看中，请稍候" : "评估中，请稍候";
      const loading = this.$loading({
        lock: true,
        text: text
      });
      this.$router.push({
        path: "/pg/pgmodal",
        query: {
          rowData: row,
          parentName: this.$options.name,
          operatorCode: this.operatorCode,
          isDisabled: isDisabled
        }
      });
      loading.close();
    },
    //打开Notify 消息弹窗。
    openNotify(title, message) {
      const h = this.$createElement;
      this.$notify({
        title: title,
        message: h({ style: "color: teal" }, message)
      });
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
    // components: { dialogmodal }
  }
};
</script>

<style scope>
</style>
