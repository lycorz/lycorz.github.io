<template>
  <el-dialog
    :title="title"
    :visible.sync="adviceVisible"
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
        <el-row style="margin-top:20px;">
          <el-col :span="4" style="padding-top:6px;">
            <span>建议内容：</span>
          </el-col>
          <el-col :span="20">
            <el-input type="textarea" v-model="content" autocomplete="off" rows="8"></el-input>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row style="margin-top:20px;">
          <el-col :span="4" style="padding-top:6px;">
            <span>是否标星</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="isStar" placeholder="请选择">
              <el-option :key="true" :value="true" label="是"></el-option>
              <el-option :key="false" :value="false" label="否"></el-option>
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
      <el-button @click="adviceVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveChange()" :loading="saveF">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "SHDialogAddAdviceAbnormal",
  data() {
    return {
      adviceVisible: false,
      isStar: "false",
      adviceName: "",
      itemValue: "",
      orderCode: "",
      Priority: "",
      content: "",
      options: [],
      proOptions: [],
      operatorCode: "",
      title: "主检建议新增",
      //1新增 2编辑
      flag: 1,
      saveF:false
    };
  },
  methods: {
    getItemsByOrderCode(orderCode) {
      var that = this;
      that.options = [];
      this.$axios
        .post(this.$api.GetAllMedicalAdviceLst, { orderCode })
        .then(function(response) {
          if (response.data.status == 1) {
            that.options = response.data.entity;
            that.itemValue = response.data.entity[0].advCode;
            that.adviceName = response.data.entity[0].advName;
            that.content = response.data.entity[0].advContent;
            that.isStar = response.data.entity[0].isStar;
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
      that.saveF = true;
      let entity = {};
      entity.OrderCode = this.orderCode;
      entity.AdvCode = this.itemValue;
      entity.AdvName = this.adviceName;
      entity.Content = this.content;
      entity.IsStar = this.isStar;
      if (this.Priority != "") {
        entity.Priority = this.Priority;
      }
      this.$axios
        .post(this.$api.InsertIntoShFinalRstDetail, entity)
        .then(function(response) {
          if (response.data.status == 1) {
            that.$message.success("插入成功");
            that.Priority = "";
            that.$parent.getAdvice(
              that.$parent.orderCode,
              that.$parent.operatorCode
            );
            that.adviceVisible = false;
          } else {
            that.$message.error(
              `InsertPGMasterRstDetail错误：${response.data.message}`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(`InsertPGMasterRstDetail错误：${error}`);
        });
    },
   getinit() {
      this.orderCode = this.$parent.orderCode;
      this.saveF = false;
      //根据订单编号获取组合项目 并 初始化
      this.getItemsByOrderCode(this.orderCode);
      this.getPriorityType();
    }
  }
};
</script>

<style>
#addadvice .el-dialog__body{
  padding-left: 20px;
}
.el-dialog__title{
  font-family: Microsoft YaHei;
}
</style>

