<template>
  <div class="content FJDanger">
    <div style="flex:1;overflow: hidden;display: flex;flex-direction: column;">
      <div class="peopleData">
        <div class="propleSearch">
          <div @keyup.13="getUser()" style="display:inline">
            <el-input placeholder="请搜索" v-model="keyStr" class="arcRadius" style="width: 150px;">

            </el-input>
            <el-select
              v-model="sendFlag"
              filterable
              placeholder="短信状态"
              style="width:150px;display:inline-block;margin-left:10px;"
            >
              <el-option label="未发送" value="0"></el-option>
              <el-option label="已发送" value="1"></el-option>
              <el-option label="发送失败" value="2"></el-option>
            </el-select>
            <el-select
              v-model="visitState"
              filterable
              placeholder="回访状态"
              style="width:150px;display:inline-block;margin-left:10px;"
            >
              <el-option label="未回访" value="false"></el-option>
              <el-option label="已回访" value="true"></el-option>
            </el-select>
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
            <el-button type="primary" @click="sendMessage">发送短信</el-button>
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="80"></el-table-column>
        <el-table-column prop="telePhone" label="电话号码" sortable width="200"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column prop="cardNum" label="体检卡号" sortable width="200"></el-table-column>
        <el-table-column prop="crisisName" label="危急值名称" width="200"></el-table-column>
        <el-table-column prop="smsContent" label="短信内容" width="200"></el-table-column>
        <el-table-column prop="itemName" label="来源项目" width="200"></el-table-column>
        <el-table-column prop="sendState" label="短信状态" width="200"></el-table-column>
        <el-table-column prop="visitState" label="回访状态" width="200"></el-table-column>
        <el-table-column prop="keyWord" label="关键词" width="200"></el-table-column>
        <el-table-column prop="content" label="结论" width="200"></el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row,scope.$index)" type="text" size="small" id="jc">编辑</el-button>
            <el-button @click="review(scope.row,scope.$index)" type="text" size="small" id="jc">回访</el-button>
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
    <!-- 编辑短信 -->
    <el-dialog title="编辑短信" :visible.sync="dialogEditVisible" width="424px">
      <el-form>
        <el-form-item>
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="editTextarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChange()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 回访编辑 -->
    <el-dialog title="回访编辑" :visible.sync="dialogReviewVisible" width="424px">
      <el-form>
        <el-form-item label="通知人" label-width="60px">
          <el-input placeholder="请输入内容" v-model="tzr"></el-input>
        </el-form-item>
        <el-form-item label="受检人" label-width="60px">
          <el-input placeholder="请输入内容" v-model="sjr"></el-input>
        </el-form-item>
        <el-form-item label="回访内容" label-width="60px">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="hfnr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogReviewVisible = false">取 消</el-button>
        <el-button type="primary" @click="postReview()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Promise, resolve, reject } from "q";
export default {
  name: "FJDanger",
  data() {
    return {
      name: "",
      //查询条件，用户姓名
      keyStr: "",
      //回访状态
      visitState: "false",
      //短信状态
      sendFlag: "0",
      //编辑界面的富文本框
      editTextarea: "",
      //选中的obj
      choosedObj: {},
      tfDate: [
        new Date(new Date().getTime() - 3600 * 1000 * 24 * 90),
        new Date()
      ],
      //编辑弹窗是否显示，默认否
      dialogEditVisible: false,
      //编辑回访是否显示，默认否
      dialogReviewVisible: false,
      // 回访界面
      hfInnerCode:"",
      tzr:"",
      sjr:"",
      hfnr:"",
      pageSize: 10,
      pageIndex: 1,
      pagesz: 1,
      tableData: [],
      loading: true,
      totalData: 0,
      multipleSelection: [],
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
      //编辑界面
      editContent: ""
    };
  },
  created: function() {
    // this.getEunmType(this.operatorCode)
    //   .then(res => {
    this.getUser();
    // })
    // .catch(res => {
    //   that.$message.error(`错误：枚举类型获取失败`);
    // });
  },
  methods: {
    //切换tab页
    handleClick() {
      this.pageIndex = 1;
      //切换后初始化
      this.getUser();
    },
    //每页条数变化
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
      entity.startDate = this.tfDate == null ? null : this.tfDate[0];
      entity.endDate = this.tfDate == null ? null : this.tfDate[1];
      entity.HadSended = this.sendFlag
      entity.visitState = this.visitState;
      if (this.keyStr != "") {
        entity.keyStr = this.keyStr;
      }
      let that = this;
      this.$axios
        .post(this.$api.GetCrisis, entity)
        .then(function(response) {
          that.loading = false;
          if (
            response.data.status == 1 &&
            response.data.entity.resultData.length != 0
          ) {
            console.log(response.data.entity.resultData);
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
    //table勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //编辑短信
    edit(row, index) {
      this.choosedObj = row;
      this.dialogEditVisible = true;
      this.editTextarea = row.smsContent;
    },
    //编辑短信保存结果
    submitChange() {
      var that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.UpdateSmsContent, {
            innerCode: that.choosedObj.smsContentInnerCode,
            smsConetnt: this.editTextarea
          })
          .then(function(response) {
            if (response.data.status == 1) {
              //设置默认值
              that.$message.success(`修改成功`);
              that.getUser();
              that.dialogEditVisible = false;
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
    //发送短信
    sendMessage() {
      //取出选中项的innercode发给后台
      let postArr = [];
      if(this.multipleSelection.length === 0){
        this.$message.error(`至少勾选一位客户`);
        return false;
      }
      this.multipleSelection.forEach((item,index)=>{
        postArr.push(item.innerCode);
      })
      let that = this;
      let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.SendCrisisSms, {
            innerCode: postArr
          })
          .then(function(response) {
            if (response.data.status == 1) {
              //设置默认值
              that.$message.success(`发送成功`);
              that.getUser();
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
    // 回访
    review(row,index){
        this.dialogReviewVisible = true;
        this.hfInnerCode = row.innerCode;
        this.sjr = row.respondents;
        this.tzr = row.visitPerson;
        this.hfnr = row.visitContent;
    },
    // 提交回访
    postReview(){
      let that = this;
       let pro = new Promise((resolve, reject) => {
        that.$axios
          .post(this.$api.SaveVisitConent, {
                "innerCode": this.hfInnerCode,
                "visitContent": this.hfnr,
                "visitPerson":this.tzr,
                "respondents": this.sjr
              })
          .then(function(response) {
            that.dialogReviewVisible = false;
            if (response.data.status == 1) {
              //设置默认值
              that.$message.success(`提交成功`);
              that.getUser();
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

    }
  }
};
</script>
<style>
.FJDanger .el-tab-pane,
.FJDanger .el-tabs.el-tabs--top {
  display: flex;
  height: 100%;
  flex: 1;
  flex-direction: column;
}
.FJDanger .el-tabs__header {
  flex: 0 0 40px;
  line-height: 48px;
}
.FJDanger .el-tabs__content {
  flex: 1 !important;
}
.FJDanger .peopleData {
  flex: 0 0 49px;
}
.FJDanger .fixBottom {
  flex: 0 0 40px;
}
/* .FJDanger .el-table--fit {
  height: 79vh;
} */
.FJDanger .peopleData .el-date-editor {
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

