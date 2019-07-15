<template>
  <div class="content FJMain">
    <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
      <div class="peopleData">
        <div class="propleSearch">
          <div @keyup.13="getUser()" style="display:inline">
            <el-input
              placeholder="请搜索"
              v-model="customerName"
              class="arcRadius"
              style="width: 150px;"
            >

            </el-input>
            <div style="display: inline-block;margin: 0 16px;">
              <el-date-picker
                class="input-class"
                v-model="tfDate"
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                align="right"
                size="mini"
              ></el-date-picker>
            </div>
            <el-button type="primary" @click="getUser()" plain>查询</el-button>
          </div>
          <el-button class="export" type="primary">导出报表</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;"
        v-loading="loading"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="customerName" label="用户名" width="80"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50">
        </el-table-column>
        <el-table-column prop="age" label="年龄" sortable width="100"></el-table-column>
        <!-- <el-table-column prop="cardNum" label="卡号" sortable width="200"></el-table-column> -->
        <el-table-column prop="packageName" label="所选套餐" width="200"></el-table-column>
        <el-table-column prop="isPaid" label="是否缴费" width="200"></el-table-column>
        <el-table-column prop="paidMoney" label="缴费金额"></el-table-column>
        <el-table-column prop="checkBeginTime" label="开始时间"></el-table-column>
        <!-- <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button @click="watch(scope.row,scope.$index)" type="text" size="small" id="jc">检查</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <!-- 附加信息栏 -->
      <div class="appendInfo">
        <span class="heji">合计</span>
        <span class="wenzi">总人数：</span>
        <span class="totalNum">{{personNums}}</span>
        <span class="wenzi">总金额：</span>
        <span class="totalNum">￥{{allMoney.toFixed(2)}}</span>
      </div>
      <!-- 底部信息栏 -->
      <div class="fixBottom">
        <div class="right">
          <el-pagination
            style="display:inline-block;text-align:right;"
            :current-page="pageIndex"
            @current-change="handleCurrentChange"
            @size-change="sizeChange"
            :page-sizes="[10, 15, 20, 30,50,100]"
            layout="total,sizes, prev, pager, next, jumper"
            :page-count="pagesz"
            :total="totalData"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Promise, resolve, reject } from "q";
export default {
  name: "FJMain",
  components: {},
  data() {
    return {
      name: "",
      //查询条件，用户姓名
      customerName: "",
      tfDate: [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 60),
        new Date()
      ],
      operatorCode: "001",
      typecode1: "",
      pageSize: 10,
      pageIndex: 1,
      pagesz: 1,
      tableData: [],
      personNums:0,
      allMoney:0,
      loading: false,
      totalData: 0,
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
  created: function() {
    this.getUser();
  },
  methods: {
    //切换tab页
    handleClick() {
      this.pageIndex = 1;
      //切换后初始化
      this.getUser();
    },
    sizeChange(ex) {
      this.pageSize = ex;
      this.getUser();
    },
    handleCurrentChange(ex) {
      this.pageIndex = ex;
      this.getUser();
    },
    //获取用户列表
    getUser() {
      //遮罩开启
      this.loading = true;
      let entity = {};
      //按条件拼接参数
      entity.pageIndex = this.pageIndex;
      entity.pageSize = this.pageSize;
      entity.beginTime = this.tfDate == null ? null : this.tfDate[0];
      entity.endTime = this.tfDate == null ? null : this.tfDate[1];
      if (this.customerName != "") {
        entity.condition = this.customerName;
      }
      let that = this;
      this.$axios
        .post(this.$api.TjVIPQuery, entity)
        .then(function(response) {
          that.loading = false;
          console.log(32, response);
          if (
            response.data.status == 1 &&
            response.data.entity.vipMessage.length != 0
          ) {
            that.tableData = response.data.entity.vipMessage;
            that.pagesz = response.data.entity.pageNum;
            that.totalData = response.data.entity.dataNum;
            // 总钱数
            that.allMoney = response.data.entity.paidMoneys;
            // 总条数
            that.allPeople = response.data.entity.personNums;
          } else {
            that.tableData = [];
          }
        })
        .catch(function(error) {
          that.tableData = [];
          that.$message.error(`错误：${error}`);
        });
    },
    //查看详情，父传子
    watch(row, index) {
      this.$refs.dialogcheck.FJCheckVisible = true;
      this.$refs.dialogcheck.orderCode = row.orderCode;
      this.$refs.dialogcheck.depts = this.options;
      this.$refs.dialogcheck.customerName = row.customerName;
      this.$refs.dialogcheck.sex = row.sex;
      this.$refs.dialogcheck.age = row.age;
      this.$refs.dialogcheck.idcardNum = row.idcardNum;
      this.$refs.dialogcheck.marriageState = row.marriageState;
      this.$refs.dialogcheck.headImg = "data:image/png;base64," + row.headImg;
    }
  }
};
</script>
<style>
.FJMain .el-tab-pane,
.FJMain .el-tabs.el-tabs--top {
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;
}
.FJMain .el-tabs__header {
  flex: 0 0 40px;
  line-height: 48px;
}
.FJMain .el-tabs__content {
  flex: 1 !important;
}
.FJMain .peopleData {
  flex: 0 0 49px;
}
.FJMain .fixBottom {
  flex: 0 0 40px;
}
/* .FJMain .el-table--fit {
  height: 79vh;
} */
.FJMain .peopleData .el-date-editor {
  width: 340px !important;
}
.nameSexAge {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 20px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
}
.notCheck {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 20px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
  margin-top: 10px;
}
.checked {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 20px;
  color: rgba(96, 98, 102, 1);
  opacity: 1;
  margin-top: 10px;
}
.cardInfo {
  height: 91px;
  background-color: #f9f9f9;
  padding: 17px;
  position: relative;
}
.export {
  float: right;
  margin-top: 10px;
}
.appendInfo {
  flex: 0 0 40px;
  line-height: 40px;
  padding: 0px 10px;
}
.heji {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  margin-right: 5px;
}
.wenzi {
  color: #999999;
  font-size: 14px;
  font-family: Microsoft YaHei;
}
.totalNum {
  font-weight: bold;
  font-size: 14px;
  color: #606266;
  margin-right: 10px;
}
</style>

