<template>
  <el-dialog
    :title="title"
    :visible.sync="adviceEditVisible"
    @open="getinit"
    width="600px"
    id="addadvice"
  >
    <ul>
      <li>
        <el-row>
          <el-col :span="4" style="padding-top:6px;">
            <span>建议名称：</span>
          </el-col>
          <el-col :span="8">
            <el-select v-model="itemValue" filterable placeholder="请选择" @change="setDefault">
              <el-option
                v-for="item in options"
                :key="item.advCode"
                :value="item.advCode"
                :label="item.advName"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input type="text" v-model="adviceName" autocomplete="off"></el-input>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row style="margin-top:20px">
          <el-col :span="4" style="padding-top:6px;">
            <span>建议内容：</span>
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" v-model="content" autocomplete="off" rows="8"></el-input>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row style="margin-top:20px">
          <el-col :span="4" style="padding-top:6px;">
            <span>是否标星</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="isStar" placeholder="请选择">
              <el-option :key="true"  :value=true label="是"></el-option>
              <el-option :key="false" :value=false label="否"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row style="margin-top:20px">
          <el-col :span="4" style="padding-top:6px;">
            <span>权重</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="Priority" placeholder="请选择">
              <el-option
                v-for="item in proOptions"
                :key="item.value"
                :value="item.value"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </li>
    </ul>
    <div slot="footer" class="dialog-footer">
      <el-button @click="adviceEditVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveChange()">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogAddAdviceAbnormal",
  data() {
    return {
      adviceEditVisible: false,
      isStar: false,
      adviceName: "",
      itemValue: "",
      orderCode: "",
      adviceType:"",
      Priority: 1,
      proOptions:"",
      content: "",
      options: [],
      operatorCode: "",
      title: "主检建议编辑",
      innerCode: "",
      entity: {}
    };
  },
  methods: {
    getItemsByOrderCode(orderCode) {
      var that = this;
      that.options = [];
      let pro = new Promise(function(resolve, reject) {
        that.$axios
          .post(that.$api.GetAllMedicalAdviceLst, { orderCode })
          .then(function(response) {
            if (response.data.status == 1) {
              that.options = response.data.entity;
              resolve(response.data.entity);
            } else {
              that.$message.error(
                `GetAllMedicalAdviceLst错误：${response.data.message}`
              );
            }
          })
          .catch(function(error) {
            that.$message.error(`GetAllMedicalAdviceLst错误：${error}`);
          });
      });
      return pro;
    },
        getPriorityType() {
      var that = this;
      that.options = [];
      this.$axios
        .post(this.$api.getPriorityType)
        .then(function(response) {
          console.log(2, response.data.entity);
          if (response.data.status == 1) {
            that.proOptions = response.data.entity;
          } else {
            that.$message.error(
              `GetAllMedicalAdviceLst错误：${response.data.message}`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(`GetAllMedicalAdviceLst错误：${error}`);
        });
    },
    //下拉切换更换内容
    setDefault() {
      let that = this;
      that.options.forEach(el => {
        if (el.advCode == that.itemValue) {
          that.itemValue = el.advCode;
          that.adviceName = el.advName;
          that.content = el.advContent;
          that.isStar = el.isStar;
        }
      });
    },
    getInitData(innerCode) {
      this.itemValue = "";
      let that = this;
      this.$axios
        .post(this.$api.GetPgMasterRstDetailByInnerCode, {
          innerCode
        })
        .then(function(response) {
          if (response.data.status == 1) {
            that.adviceName = response.data.entity.advName;
            that.content = response.data.entity.content;
            that.isStar = response.data.entity.isStar;
            that.Priority = response.data.entity.priority;
            that.entity = response.data.entity;
          } else {
            that.$message.error(
              `GetLstPgMasterRstDetailByOrderCode错误：${response.data.message}`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(
            `GetLstPgMasterRstDetailByOrderCode错误：${error}`
          );
        });
    },
    saveChange() {
      let that = this;
      if (this.adviceName == "" || this.adviceName == null) {
        that.$message.error("建议名称不能为空");
        return;
      }
      if (this.content == "" || this.content == null) {
        that.$message.error("建议内容不能为空");
        return;
      }
      //组织数据
      this.entity.advName = that.adviceName;
      this.entity.content = that.content;
      this.entity.isStar = that.isStar;
      this.entity.advType = that.adviceType;
      this.entity.Priority = that.Priority;
      //发送请求
      this.$axios
        .post(this.$api.UpdatePGMasterRstDetail, that.entity)
        .then(function(response) {
          if (response.data.status == 1) {
            that.$message.success("更新成功");
            that.$parent.getAdvice(
              that.$parent.orderCode,
              that.$parent.operatorCode
            );
            that.adviceEditVisible = false;
          } else {
            that.$message.error(
              `UpdatePGMasterRstDetail200错误：${response.data.message}`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(`UpdatePGMasterRstDetail错误：${error}`);
        });
    },
    getinit() {
      let that = this;
      this.orderCode = this.$parent.orderCode;
      this.getPriorityType();
      //根据订单编号获取组合项目 并 初始化
      this.getItemsByOrderCode(this.orderCode).then(res => {
        that.getInitData(that.innerCode);
      });

    }
  }
};
</script>

<style>
#addadvice .el-dialog__body{
  padding-left: 20px;
}
#addadvice .el-dialog__title{
  font-family: Microsoft YaHei;
}
</style>

