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
                type="datetimerange"
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
          <div style="display:inline;float:right">
              <!-- <el-upload
                class="upload-demo"
                :action="url"
                :show-file-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :file-list="fileList"
                style="display:inline-block;margin-right:10px;">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload> -->
              <el-button>强制获取</el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%;"
        v-loading="loading"
        :default-sort="{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column prop="customerName" label="姓名" width="80"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardNum" label="体检卡号" sortable width="200"></el-table-column>
        <el-table-column prop="idcardNum" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="checkBeginTime" label="体检时间"></el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button @click="watch(scope.row,scope.$index)" type="text" size="small" id="jc">查看详情</el-button>
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
            :page-sizes="[10, 15, 20, 30,50,100]"
            layout="total,sizes, prev, pager, next, jumper"
            :page-count="pagesz"
            :total="totalData"
          ></el-pagination>
        </div>
      </div>
    </div>
    <dialogcheck ref="dialogcheck"></dialogcheck>
  </div>
</template>

<script>
import { Promise, resolve, reject } from "q";
import dialogcheck from "./DialogLis.vue";
export default {
  name: "FJMain",
  components: { dialogcheck },
  data() {
    return {
      name: "",
      //查询条件，用户姓名
      customerName: "",
      custname:"",
      sex:"",
      age:1,
      tfDate: [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 60),
        new Date()
      ],
      cardNum: "",
      //已检项目
      inspectionOverItemName:[],
      //未检项目
      willInspectionItemName:[],
      operatorCode: "001",
      typecode1: "",
      pageSize: 10,
      pageIndex: 1,
      pagesz: 1,
      tableData: [],
      loading: true,
      totalData: 0,
      multipleSelection:[],
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
    this.getEunmType(this.operatorCode)
      .then(res => {
        this.getUser();
      })
      .catch(res => {
        that.$message.error(`错误：枚举类型获取失败`);
      });

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
    getCheckedNoCheckedItems(orderCode){
      let that = this;
      this.$axios
        .get(this.$api.GetOrderChargeItemInspectionState, {orderCode})
        .then(function(response) {
          that.loading = false;
          console.log(388, response);
          if (response.data.status == 1) {
            that.inspectionOverItemName = response.data.entity.inspectionOverItemName;
            that.willInspectionItemName = response.data.entity.willInspectionItemName;
          } else {
            that.tableData = [];
          }
        })
        .catch(function(error) {
          that.tableData = [];
          that.$message.error(`错误：${error}`);
        });

    },
    //cardinfo显示此人信息
    cardInfoShow() {
      this.shuaCard = "block";
    },
    //获取用户列表
    getUser(card) {
      //遮罩开启
      this.loading = true;
      let entity = {};
      //按条件拼接参数
      entity.PageIndex = this.pageIndex;
      entity.PageSize = this.pageSize;
      entity.StartDate = this.tfDate == null ? null : this.tfDate[0];
      entity.EndDate = this.tfDate == null ? null : this.tfDate[1];
      if (this.customerName != "") {
        entity.PersonKey = this.customerName;
      }
       let arr = [];
        arr.push('K09');
      entity.DeptCodes=arr;
      let that = this;
      this.$axios
        .post(this.$api.OrderList, entity)
        .then(function(response) {
          that.loading = false;
          console.log(32, response);
          if (response.data.status == 1 && response.data.entity.resultData.length != 0) {
            that.tableData = response.data.entity.resultData;
            that.pagesz = response.data.entity.totalPages;
            that.totalData = response.data.entity.totalCount;
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
      // this.$refs.dialogcheck.orderCode = row.orderCode;
      this.$refs.dialogcheck.depts = this.options;
      this.$refs.dialogcheck.customerName = row.customerName;
      this.$refs.dialogcheck.sex = row.sex;
      this.$refs.dialogcheck.age = row.age;
      this.$refs.dialogcheck.idcardNum = row.idcardNum;
      this.$refs.dialogcheck.marriageState = row.marriageState;
      this.$refs.dialogcheck.headImg = "data:image/png;base64," + row.headImg;
    },
    //根据用户编码获取科室
    getEunmType(operatorCode) {
      var that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .get(this.$api.PermissionDept, {
            params: {
              operatorCode
            }
          })
          .then(function(response) {
            if (response.data.status == 1 && response.data.entity.length != 0) {
              //设置默认值
              // that.deptCode = response.data.entity[0].deptCode;
              that.options = response.data.entity;
              resolve(true);
            } else {
              that.$message.error(`错误：${response.data.message}`);
              reject(false);
            }
          })
          .catch(function(error) {
            that.$message.error(`错误：${error}`);
            reject(false);
          });
      });
      return pro;
    },
    //table勾选
          handleSelectionChange(val) {
        this.multipleSelection = val;
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
</style>

