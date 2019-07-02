<template>
  <div class="content SFJYManage">
    <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="收费管理" name="first">
          <div class="peopleData" @keyup.13="getUser">
            <div class="propleSearch">
              <el-input
                placeholder="请搜索"
                v-model="tradeName1"
                class="arcRadius"
                style="width: 150px;"
                v-focus
              >

              </el-input>
              <el-select
              clearable
                v-model="typecode1"
                filterable
                placeholder="业务类型"
                style="width:150px;display:inline-block;margin-left:10px;"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div style="display: inline-block;margin: 0 16px;">
                <span>入库时间：</span>
                <el-date-picker
                  v-model="tfDate1"
                  type="daterange"
                  :picker-options="pickerOptions2"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                ></el-date-picker>
              </div>
              <el-button type="primary" @click="getUser()">查询</el-button>
              <el-dropdown class="dpdown">
                <el-button type="primary">
                  刷卡
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>刷身份证</el-dropdown-item>
                  <el-dropdown-item>刷体检卡</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%;"
						height="9999"
            v-loading="loading"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="tradeName" label="客户姓名"></el-table-column>
            <el-table-column prop="idCardNum" label="身份证号" sortable width="200"></el-table-column>
            <el-table-column prop="cardNum" label="体检卡号"></el-table-column>
            <el-table-column prop="tradeType" label="业务类型" sortable :formatter="type" width="200"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200">
              <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="tradeMoney" label="缴费金额"></el-table-column>
            <el-table-column label="操作" width="150" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button @click="watch(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                <el-button type="text" size="small" @click="pay(scope.row,scope.$index)">缴费</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 底部信息栏 -->
          <div class="fixBottom">
            <div class="right">
              <el-pagination
                style="display:inline-block;text-align:right;"
                :current-page="pageIndex"
                @current-change="handleCurrentChange"
                @size-change="sizeChange"
                :page-sizes="[10,20,50,100]"
                layout="total,sizes, prev, pager, next, jumper"
                :page-count="pagesz"
                :total="totalData"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="退费管理" name="second">
          <div class="peopleData" @keyup.13="getUser">
            <div class="propleSearch">
              <el-input
                placeholder="请搜索"
                v-model="tradeName"
                class="arcRadius"
                style="width: 150px;"
                v-focus
              >

              </el-input>
              <el-select
              clearable
                v-model="typecode"
                filterable
                placeholder="业务类型"
                style="width:150px;display:inline-block;margin-left:10px;"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div style="display: inline-block;margin: 0 16px;">
                <span>入库时间：</span>
                <el-date-picker
                  v-model="tfDate"
                  type="daterange"
                  :picker-options="pickerOptions2"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                ></el-date-picker>
              </div>
              <el-button type="primary" @click="getUser()">查询</el-button>
              <el-dropdown class="dpdown" @command="idOrCard">
                <el-button type="primary">
                  刷卡
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="idc">刷身份证</el-dropdown-item>
                  <el-dropdown-item command="c">刷体检卡</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%;"
            v-loading="loading1"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="tradeName" label="客户姓名"></el-table-column>
            <el-table-column prop="idCardNum" label="身份证号" sortable width="200"></el-table-column>
            <el-table-column prop="cardNum" label="体检卡号"></el-table-column>
            <el-table-column prop="tradeType" label="业务类型" sortable :formatter="type"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200">
              <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
            </el-table-column>
            <el-table-column prop="tradeMoney" label="退费金额"></el-table-column>
            <el-table-column label="操作" width="150" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button @click="watch(scope.row,scope.$index)" type="text" size="small">详情</el-button>
                <el-button type="text" size="small" @click="payBack(scope.row,scope.$index)">退费</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 底部信息栏 -->
          <div class="fixBottom">
            <div class="right">
              <el-pagination
                style="display:inline-block;text-align:right;"
                :current-page="pageIndex"
                @current-change="handleCurrentChange"
                @size-change="sizeChange"
                :page-sizes="[10,20,50,100]"
                layout="total,sizes, prev, pager, next, jumper"
                :page-count="pagesz"
                :total="totalData"
              ></el-pagination>
            </div>
          </div>
          <!-- 测试自定义指令 -->
          <!-- <div style="width:100px;height:100px;" v-focus:foo="{color:'blue'}"></div> -->
        </el-tab-pane>
      </el-tabs>
    </div>
    <dialogjy ref="dialogjy" :name="name"></dialogjy>
    <dialoggroup ref="dialoggroup" :groupname="groupname"></dialoggroup>
    <dialogpay ref="dialogpay"></dialogpay>
    <dialogpayback ref="dialogpayback"></dialogpayback>
  </div>
</template>

<script>
// 个检详情
import dialogjy from "./DialogJY.vue";
// 团检详情
import dialoggroup from "./DialogGroup.vue";
// 缴费
import dialogpay from "./DialogPay.vue";
//退费
import dialogpayback from "./DialogPayBack.vue";
import { resolve, reject } from "q";
//测试自定义指令
// Vue.directive("focus",function(el,binding){
//     el.style.backgroundColor = binding.value.color;
//     if(binding.arg=="foo")
//     {
//         el.style.width = "200px";
//     }
// })

export default {
  name: "SFJYManage",
  data() {
    return {
      name: "",
      //查看团检收费记录界面交互参数
      groupname: "",
      //搜索条件，客户姓名
      tradeName: "",
      //当前激活tab
      activeName: "first",
      //查询条件，时间段
      tfDate: [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),
        new Date()
      ],
      //交易类型 1 个检 2团检
      typecode: "",
      tradeName1: "",
      tfDate1: [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 30),
        new Date()
      ],
      typecode1: "",
      pageSize: 10,
      pageIndex: 1,
      pagesz: 1,
      tableData: [],
      loading: true,
      loading1: true,
      totalData: 0,
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
      },
      options: []
    };
  },
  created: function() {
    this.getUser();
    this.getEunmType();
    //测试promise 解决地狱回调
    // new Promise((resolve,reject)=>{
    //   this.$axios
    //   .get(this.$api.ReturnTradeTypeEnum)
    //   .then(function(response) {
    //    resolve(response)
    //   })
    //   .catch(function(error) {
    //   })
    // })
    // .then(function(res){
    //    console.log(res);
    // })
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
    // 刷卡刷身份证
    idOrCard(command){
      // 刷身份证调api
      if(command == "idc"){
        api.getIdcard(callback());
      }else{

      }
    },
    // 获取用户列表
    getUser() {
      this.loading = true;
      this.loading1 = true;
      let that = this;
      //处理时间为空的情况
      // let begt
      // if(this.tfDate1){

      // }
      //first收费  else退费
      if (that.activeName == "first") {
        console.log(this.tfDate1);
        this.$axios
          .get(this.$api.TransactionQuery, {
            params: {
              pageIndex: this.pageIndex,
              pageSize: this.pageSize,
              BeginTime: this.tfDate1 == null ? null : this.tfDate1[0],
              EndTime: this.tfDate1 == null ? null : this.tfDate1[1],
              TradeName: this.tradeName1,
              TimeType: 1,
              TradeType: this.typecode1,
              TradeStatus: 0,
              TradeForm: 1
            }
          })
          .then(function(response) {
            console.log(response.data.entity);
            that.loading = false;
            if (response.data.status == 1) {
              that.tableData = response.data.entity.tradeMessages;
              that.pagesz = response.data.entity.pageNum;
              that.totalData = response.data.entity.dataNum;
              //取消加载遮罩
            } else {
              that.$message.error(`错误：${response.data.message}`);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
          });
      } else {
        this.$axios
          .get(this.$api.TransactionQuery, {
            params: {
              pageIndex: this.pageIndex,
              pageSize: this.pageSize,
              BeginTime: this.tfDate == null ? null : this.tfDate[0],
              EndTime: this.tfDate == null ? null : this.tfDate[1],
              TradeName: this.tradeName,
              TimeType: 1,
              TradeType: this.typecode,
              TradeStatus: 0,
              TradeForm: 2
            }
          })
          .then(function(response) {
            //取消加载遮罩
            that.loading1 = false;
            if (response.data.status == 1) {
              that.tableData = response.data.entity.tradeMessages;
              that.pagesz = response.data.entity.pageNum;
              that.totalData = response.data.entity.dataNum;
            } else {
              that.tableData = [];
              that.$message.error(`错误：${response.data.message}`);
            }
          })
          .catch(function(error) {
            that.tableData = [];
            that.$message.error(`错误：${error}`);
          });
      }
    },
    watch(row, index) {
      //实验父传子的两种方式
      //方式1 prop传参 只能界面渲染用，name 也可以直接写在子组件
      this.name = row.tradeName;
      this.groupname = row.tradeName;
      //方式2 ref选择器   tradetype 1 个检 2团检 3会员卡
      if (row.tradeType == 1) {
        this.$refs.dialogjy.dialogFormVisible = true;
        this.$refs.dialogjy.tradeCode = row.tradeCode;
        this.$refs.dialogjy.allmoney = row.tradeMoney;
      } else if (row.tradeType == 2) {
        this.$refs.dialoggroup.dialogGroupFormVisible = true;
        this.$refs.dialoggroup.tradeCode = row.tradeCode;
        this.$refs.dialoggroup.allmoney = row.tradeMoney;
      }
    },
    //收费操作，打开收费弹窗并传参
    pay(row, index) {
      if (row.tradeType == 1) {
        this.$refs.dialogpay.tradeType = 1;
      } else if (row.tradeType == 2) {
        this.$refs.dialogpay.tradeType = 2;
      }
      this.$refs.dialogpay.dialogpayVisible = true;
      this.$refs.dialogpay.tradeCode = row.tradeCode;
      this.$refs.dialogpay.money = row.tradeMoney;
      this.$refs.dialogpay.taitou = row.tradeName;
    },
    //退费操作，打开退费弹窗并传参
    payBack(row, index) {
      if (row.tradeType == 1) {
        this.$refs.dialogpayback.tradeType = 1;
        this.$refs.dialogpayback.orderCode = row.orderCode;
      } else if (row.tradeType == 2) {
        this.$refs.dialogpayback.tradeType = 2;
        this.$refs.dialogpayback.orderCode = row.grpOrderCode;
      }
      //清空发票
      this.$refs.dialogpayback.optionItems = [];
      this.$refs.dialogpayback.value11 = [];
      this.$refs.dialogpayback.selectedMoney = 0;
      this.$refs.dialogpayback.dialogPayBackVisible = true;
      this.$refs.dialogpayback.tradeCode = row.tradeCode;
      this.$refs.dialogpayback.money = row.tradeMoney;
      this.$refs.dialogpayback.taitou = row.tradeName;
    },
    //获取收费类型枚举
    getEunmType() {
      var that = this;
      this.$axios
        .get(this.$api.ReturnTradeTypeEnum)
        .then(function(response) {
          if (response.data.status == 1) {
            that.options = response.data.entity;
          } else {
            that.$message.error(`错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`错误：${error}`);
        });
    },
    //格式化业务类型
    type(row, column) {
      let it;
      this.options.forEach((item, index) => {
        if (item.value == row.tradeType) {
          it = item.name;
        }
      });
      return it;
    }
  },
  components: { dialogjy, dialoggroup, dialogpay, dialogpayback }
};
</script>
<style scoped>
.SFJYManage >>> .el-tab-pane,
.SFJYManage >>> .el-tabs.el-tabs--top {
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;
}
.SFJYManage >>> .el-tabs__header {
  flex: 0 0 40px;
  line-height: 48px;
}
.SFJYManage >>> .el-tabs__content {
  flex: 1 !important;
}
.SFJYManage .peopleData {
  flex: 0 0 49px;
}
.SFJYManage .fixBottom {
  flex: 0 0 40px;

}
/* .SFJYManage >>> .el-table--fit {
	height: 79vh;
} */
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.dpdown {
  float: right;
}
.el-date-editor{
	width: 230px;
}
</style>

