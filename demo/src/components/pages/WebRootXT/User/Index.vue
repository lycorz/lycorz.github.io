<template>
  <div class="content UserIndex">
    <div class="topTitle">
      <span>用户字典</span>
    </div>
    <div style="flex:1;overflow: hidden;display: flex;flex-direction:column;">
      <div class="peopleData">
        <div class="propleSearch">
          <el-input
            placeholder="姓名/首拼"
            v-model="searchParams.userName"
            clearable
            class="arcRadius"
            @keyup.enter.native="getData()"
            style="width: 150px;"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" style="margin-left:16px" @click="getData()">查询</el-button>
          <div class="right">
            <el-button type="primary" @click="showCreateDialog()">新建</el-button>
            <el-button type="primary" @click="batchDelete()">删除</el-button>
          </div>
        </div>
      </div>
      <el-table
        ref="singleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              ref="singleTableson"
              :data="scope.row.userCertificates"
              v-loading="loading"
              style="width: 100%"
            >
              <el-table-column property="certName" label="证书名称" align="center"></el-table-column>
              <el-table-column property="certCode" label="证书编号" align="center"></el-table-column>
              <el-table-column property="certAuthority" label="颁发机构" align="center"></el-table-column>
              <el-table-column property="getTime" label="颁发日期" align="center">
                <template
                  slot-scope="datescope"
                >{{ datescope.row.getTime | formatDate("YYYY-MM-DD") }}</template>
              </el-table-column>
              <el-table-column property="expireTime" label="有效截止日期" align="center">
                <template
                  slot-scope="datescope"
                >{{ datescope.row.expireTime | formatDate("YYYY-MM-DD") }}</template>
              </el-table-column>
              <el-table-column property="empNum" label="照片" align="center">
                <template slot-scope="scopedata">
                  <el-button
                    v-if="scopedata.row.certPhoto"
                    type="text"
                    @click="showCertImg(scope.$index,scope.row)"
                  >点击预览</el-button>
                  <span v-else>暂无</span>
                </template>
              </el-table-column>
              <el-dialog :visible.sync="imgdialogVisible" class="infoucs">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
              <el-table-column label="操作" align="center" width="200px">
                <template slot-scope="scopedata2">
                  <el-button
                    type="text"
                    @click="editCertificate(scopedata2.$index,scopedata2.row)"
                  >编辑</el-button>
                  <el-button
                    type="text"
                    @click="delCertificate(scopedata2.$index,scopedata2.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column property="operatorCode" label="用户编号" align="left"></el-table-column>
        <el-table-column property="empNum" label="医院工号" align="left"></el-table-column>
        <el-table-column property="loginName" label="账号" align="left"></el-table-column>
        <el-table-column property="userName" label="姓名" align="left"></el-table-column>
        <el-table-column property="idcardNum" label="身份证号" align="left"></el-table-column>
        <el-table-column property="tele" label="联系电话" align="left"></el-table-column>
        <el-table-column property="roleNames" label="所属角色" align="left"></el-table-column>
        <el-table-column property="discountLowLimit" label="折扣下限" align="left"></el-table-column>
        <el-table-column property="funcNames" show-overflow-tooltip label="功能项集合" align="left"></el-table-column>
        <el-table-column property="remark" show-overflow-tooltip label="备注" align="left"></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <el-button type="text" @click="addCertificate(scope.$index,scope.row)">添加证书</el-button>
            <el-button type="text" @click="edit(scope.$index,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <UserCreate ref="UserCreate"></UserCreate>
    <CertCreate ref="CertCreate"></CertCreate>
  </div>
</template>

<script>
import UserCreate from "./Create.vue";
import CertCreate from "./CertCreate.vue";
export default {
  name: "UserIndex",
  components: { UserCreate, CertCreate },
  data() {
    return {
      name: "",
      total: 0,
      loading: false,
      pageNum: 1,
      tableData: [],
      dialogImageUrl:"",
      imgdialogVisible:false,
      searchParams: {
        userName: "",
        pageSize: 10,
        pageIndex: 1
      },
      multipleSelection: [] //选中项
    };
  },
  created: function() {
    this.getData();
  },
  provide() {
    return {
      getData: this.getData
    };
  },
  filters: {
    boolFilter(value, row, column) {
      return value ? "是" : "否";
    }
  },
  methods: {
    /* table */
    handleSelectionChange(ex) {
      this.multipleSelection = ex;
    },
    sizeChange(ex) {
      this.searchParams.pageSize = ex;
      this.getData();
    },
    handleCurrentChange(ex) {
      this.searchParams.pageIndex = ex;
      this.getData();
    },
    /* 	data 	*/
    getData() {
      this.loading = true;
      let that = this;
      this.$axios
        .get(this.$api.GetUserList, {
          params: this.searchParams
        })
        .then(function(response) {
          if (response.data.status === 1) {
            that.tableData = response.data.entity.resXtUsers;
            that.pageNum = Math.ceil(
              response.data.entity.recordNum / that.searchParams.pageSize
            );
            that.total = response.data.entity.recordNum;
          } else {
            that.$message.error(response.data.message);
          }
          //关闭遮罩
          that.loading = false;
        })
        .catch(function(error) {
          //关闭遮罩
          that.loading = false;
          console.error(error);
        });
    },

    /*  dialogfunction  */
    showCreateDialog() {
      let UserCreate = this.$refs.UserCreate;
      UserCreate.isShow = true;
    },
    edit(index, row) {
      let UserCreate = this.$refs.UserCreate;
      UserCreate.Code = row.operatorCode;
      UserCreate.isShow = true;
    },
    //证书相关
    showCertImg(index,row){
      this.dialogImageUrl = row.certPhoto;
      this.imgdialogVisible = true;
    },
    addCertificate(index, row) {
      let CertCreate = this.$refs.CertCreate;
      CertCreate.isShow = true;
      CertCreate.fromData.operatorCode = row.operatorCode;
    },
    editCertificate(index, row) {
      let CertCreate = this.$refs.CertCreate;
      CertCreate.isShow = true;
      CertCreate.Code = row.innerCode;
    },
    delCertificate(index, row) {
      let keys = new Array();
      keys.push(row.innerCode);
      this.$confirm(
        '<span>您确定要删除选中数据吗？</span><br /><i style="color:#8F9399;">删除后不可恢复</i>',
        "提醒：",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      ).then(() => {
        this.$axios
          .post(this.$api.BatchDeleteUserCert,keys )
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.$message.success("删除成功！");
              this.getData();
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    },
    batchDelete() {
      let keys = this.multipleSelection.map(z => z.operatorCode);
      if (keys.length <= 0) {
        this.$message.error("请至少选中一项进行删除");
        return;
      }
      this.$confirm(
        '<span>您确定要删除选中数据吗？</span><br /><i style="color:#8F9399;">删除后不可恢复</i>',
        "提醒：",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          type: "warning"
        }
      ).then(() => {
        this.$axios
          .post(this.$api.BatchDeleteUser, keys)
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.$message.success("删除成功！");
              this.getData();
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    }
  }
};
</script>
<style scoped>
</style>

