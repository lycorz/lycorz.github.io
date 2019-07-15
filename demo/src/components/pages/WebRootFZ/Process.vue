<template>
  <div class="Process">
    <el-dialog
      title="进度查询"
      :visible.sync="processShow"
      :close-on-click-modal="false"
      width="1000px"
      @open="getInit"
    >
      <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
        <div class="peopleData">
          <div class="propleSearch">
            <span @keyup.13="getUser()">
              <el-input placeholder="请搜索" v-model="keyword" class="arcRadius" style="width: 150px;"></el-input>
            </span>
            <el-select
              v-model="orderStatus"
              filterable
              placeholder="订单状态"
              style="width:118px;display:inline-block;margin-left:10px;"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <div style="display: inline-block;margin: 0 16px;">
              <el-date-picker
                v-model="tfDate"
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                class="datepicker"
              ></el-date-picker>
            </div>
            <el-button type="default" @click="getUser()">查询</el-button>
            <div @keyup.13="getU()" style="display:inline">
              <el-input
                placeholder="请刷卡"
                v-model="cardNum"
                class="arcRadius"
                style="width: 150px;float:right"
              ></el-input>
            </div>
          </div>
        </div>
        <el-table
          class="processTable"
          :data="tableData"
          style="width: 100%;"
          v-loading="loading"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column type="index" label="序号" width="50" sortable></el-table-column>
          <el-table-column prop="customerName" label="用户名" width="80"></el-table-column>
          <el-table-column prop="gender" label="性别" width="50"></el-table-column>
          <el-table-column prop="cardNum" label="体检卡号" width="100"></el-table-column>
          <el-table-column prop="idNumber" label="身份证号" sortable width="150"></el-table-column>
          <el-table-column prop="mobilePhone" label="电话" sortable width="80"></el-table-column>
          <el-table-column prop="unitName" label="单位" sortable width="80"></el-table-column>
          <el-table-column prop="checkBeginTime" label="体检开始时间" width="100">
            <template slot-scope="scope">{{scope.row.checkBeginTimecheckBeginTime | formatDate}}</template>
          </el-table-column>
          <el-table-column label="订单状态" sortable width="80">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="bottom">
                <el-steps
                  process-status="wait"
                  :space="80"
                  :active="scope.row.orderStatus + 1"
                  align-center
                >
                  <el-step
                    :title="item.statusInfo"
                    icon="el-icon-success"
                    :description="item.statusTimeInfo"
                    :key="index"
                    v-for="(item,index) in scope.row.orderProgressTimeInfos"
                  ></el-step>
                </el-steps>
                <span slot="reference" class="name-wrapper">
                  {{ scope.row.orderStatusInfo }}
                  <!-- <el-tag size="medium">{{ scope.row.idCardNum }}</el-tag> -->
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="reportStatusInfo" label="报告状态" width="80">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="bottom">
                <div>
                  <i class="el-icon-s-check"></i>&nbsp;&nbsp;&nbsp;
                  <span>{{scope.row.reportStatusInfos}}</span>&nbsp;&nbsp;&nbsp;
                  <span>2019-08-12 12：00</span>
                </div>
                <div>
                  <i class="el-icon-s-check"></i>&nbsp;&nbsp;&nbsp;
                  <span>郭志鹏</span>&nbsp;&nbsp;&nbsp;
                  <span>2019-08-12 12：00</span>
                </div>
                <span slot="reference" class="name-wrapper">
                  {{ scope.row.idCardNum }}
                  <!-- <el-tag size="medium">{{ scope.row.idCardNum }}</el-tag> -->
                </span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button
                @click="dialogInfoDetail(scope.row,scope.$index)"
                type="text"
                size="small"
                class="detail"
              >详情</el-button>
              <el-dropdown @command="handleCommand($event,scope.row)" trigger="click">
                <span class="el-dropdown-link">
                  更多
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="jg">检查结果</el-dropdown-item>
                  <el-dropdown-item command="changeSta">变更状态</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部信息栏 -->
        <div class="fixBottom" v-if="orderStatus == null">
          <div class="fixBottomDiv">统计</div>
          <div
            class="fixBottomDiv"
            :key="index"
            v-for="(item,index) in lstStatisticsInfos"
          >{{item.statisticsStatusInfo}}：{{item.statisticsCountInfo}}</div>
          <el-button type="default" class="default" @click="processShow = false;">关闭</el-button>
          <div style="clear:both"></div>
        </div>
      </div>
    </el-dialog>
    <dialoginfo ref="dialoginfo"></dialoginfo>
    <backto ref="backto"></backto>
    <resultWatch ref="resultWatch"></resultWatch>
  </div>
</template>

<script>
import dialoginfo from "./DialogInfo.vue";
import backto from "./DialogChange.vue";
import resultWatch from "./DialogResultWatch.vue";
export default {
  name: "Process",
  components: { dialoginfo, backto, resultWatch },
  data() {
    return {
      // 显示属性
      processShow: false,
      name: "",
      // 订单状态枚举，下拉菜单
      options: [],
      // 订单状态
      orderStatus: null,
      // 脚部数据
      lstStatisticsInfos: [],
      //搜索条件，客户姓名
      keyword: "",
      // 卡号
      cardNum: "",
      //查询条件，时间段
      tfDate: [new Date(new Date()), new Date()],
      tableData: [],
      loading: true,
      //查询条件 时间段 格式化
      pickerOptions2: {
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
  methods: {
    // 初始化函数
    async getInit() {
      this.keyword = "";
      this.cardNum = "";
      this.tfDate = [new Date(new Date()), new Date()];
      // 设置初始化加载“开单登记”
      let a = await this.getEnum();
      let b = await this.getUser();
      // this.getUser();
    },
    //查看详情
    dialogInfoDetail(row, index) {
      this.$refs.dialoginfo.dialogInfoVisible = true;
      this.$refs.dialoginfo.orderCode = row.orderCode;
    },
    //查看检查结果
    dialogWatchResult(row, index) {
      this.$refs.dialoginfo.resultwatch = true;
      this.$refs.dialoginfo.orderCode = row.orderCode;
    },
    //
    handleCommand(command, row) {
      if (command == "jg") {
        this.$refs.resultWatch.resultwatch = true;
      } else if (command == "changeSta") {
        this.$refs.backto.ChangeVisible = true;
        this.$refs.backto.orderCode = row.orderCode;
      }
    },
    // 订单状态搜索条件枚举
    getEnum() {
      let that = this;
      let pro = new Promise((resolve, reject) => {
        this.$axios
          .post(this.$api.GetOrderStatusInfo)
          .then(function(response) {
            console.log(response.data.entity);
            if (response.data.status == 1) {
              that.options = response.data.entity.filter((item,index)=>{
                return item.value!==0
              });
              resolve(true);
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(`GetOrderStatusInfo:${response.data.message}`);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(`GetOrderStatusInfo:${error}`);
          });
      });
      return pro;
    },
    // 获取用户
    getUser() {
      let that = this;
      that.loading = true;
      // 发送条件
      let entity = {};
      entity.condition = that.keyword;
      if (that.orderStatus !== null && that.orderStatus !== "") {
        entity.orderStatus = that.orderStatus;
      } else {
        entity.orderStatus = 99;
      }

      entity.dateRange = that.tfDate;
      entity.cardNum = that.cardNum;
      console.log(entity, 77896654);
      // 发送ajax
      let pro = new Promise((resolve, reject) => {
        this.$axios
          .post(this.$api.GetProgressQueryInfo, entity)
          .then(function(response) {
            //取消加载遮罩
            that.loading = false;
            if (response.data.status == 1) {
              // 列表数据
              that.tableData = response.data.entity.lstProgressInfos;
              // 列表人数信息
              that.lstStatisticsInfos = response.data.entity.lstStatisticsInfos;
              resolve(true);
            } else {
              that.tableData = [];
              that.$message.error(`${response.data.message}`);
              reject(`GetProgressQueryInfo:${response.data.message}`);
            }
          })
          .catch(function(error) {
            that.tableData = [];
            that.$message.error(`错误：${error}`);
            reject(`GetProgressQueryInfo:${error}`);
          });
      });
      return pro;
    },
    // 刷卡获取
    getU() {
      let that = this;
      that.loading = true;
      // 发送条件
      let entity = {};
      entity.condition = that.keyword;
      if (that.orderStatus != null) {
        entity.orderStatus = that.orderStatus;
      } else {
        entity.orderStatus = 99;
      }
      entity.dateRange = that.tfDate;
      entity.cardNum = that.cardNum;
      // 发送ajax
      let pro = new Promise((resolve, reject) => {
        this.$axios
          .post(this.$api.GetProgressQueryInfoByCardNum, entity)
          .then(function(response) {
            //取消加载遮罩
            that.loading = false;
            if (response.data.status == 1) {
              that.tableData = response.data.entity;
              resolve(true);
            } else {
              that.tableData = [];
              that.$message.error(`${response.data.message}`);
              reject(`GetProgressQueryInfo:${response.data.message}`);
            }
          })
          .catch(function(error) {
            that.tableData = [];
            that.$message.error(`错误：${error}`);
            reject(`GetProgressQueryInfo:${error}`);
          });
      });
      return pro;
    }
  }
};
</script>
<style scoped>
.Process >>> .el-dialog__header {
  padding-top: 0px !important;
  height: 50px;
}
.Process >>> .el-dialog__body {
  padding: 0px 20px;
}

.Process >>> th {
  background: rgba(246, 246, 246, 1);
  line-height: 34px !important;
  padding: 0px;
}
.datepicker {
  width: 248px;
}
.propleSearch {
  padding: 0px;
}
.Process >>> .cell {
  padding-left: 5px;
  padding-right: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail,
.Process >>> .el-dropdown {
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
}
.processTable {
  height: 345px;
}
.fixBottomDiv {
  display: inline;
  margin-right: 10px;
}
.Process .fixBottom {
  padding: 20px 0px !important;
}
.Process .default {
  float: right;
  margin-top: 5px;
}
.Process .fixBottomDiv:first-child {
  font-weight: bold;
}
.Process .el-table::before {
  height: 0px;
}
.el-steps >>> .el-step__icon.is-icon {
  width: auto !important;
}
.el-steps {
  display: block !important;
}
.el-step {
  vertical-align: top !important;
  width: 90px;
}
.Process >>> .el-table__body-wrapper {
  height: 335px;
  overflow: auto;
}
</style>

