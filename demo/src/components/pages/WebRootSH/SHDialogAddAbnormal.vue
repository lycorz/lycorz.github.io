<template>
  <el-dialog :title="title" :visible.sync="addVisible" @open="getinit" width="830px">
    <ul>
      <li>
        <el-row style="margin:20px">
          <el-col :span="3">
            <span>项目名称：</span>
          </el-col>
          <el-col :span="21">
            <el-select v-model="itemValue" filterable placeholder="请选择" multiple>
              <el-option
                v-for="item in options"
                :key="item.itemCode"
                :value="item.itemCode"
                :label="item.itemName"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row style="margin:20px">
          <el-col :span="3">
            <span>异常内容：</span>
          </el-col>
          <el-col :span="21">
            <el-input type="textarea" v-model="content" autocomplete="off"></el-input>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row style="margin:20px">
          <el-col :span="3">
            <span>危急值：</span>
          </el-col>
          <el-col :span="4">
            <el-select v-model="ifCrisis" placeholder="请选择">
              <el-option :key="true" label="是" :value="true"></el-option>
              <el-option :key="false" label="否" :value="false"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </li>
    </ul>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveChange()">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogAddAbnormal",
  data() {
    return {
      addVisible: false,
      ifCrisis: false,
      content: "",
      itemValue: [],
      orderCode: "",
      options: [],
      operatorCode: "",
      title: "异常内容新增",
      //点击编辑后点编辑那条的itemcode
      itemCode: "",
      innerCode: "",
      //1新增 2编辑
      flag: 1
    };
  },

  methods: {
    getItemsByOrderCode(orderCode, operatorCode) {
      var that = this;
      that.options = [];
      this.$axios
        .post(this.$api.GetAllRptItemByOrderCode, {
          orderCode,
          operatorCode
        })
        .then(function(response) {
          if (response.data.status == 1) {
            that.options = response.data.entity;
            //根据flag决定初始化内容
            if (that.flag == 1) {
              that.itemValue.push(response.data.entity[0].itemCode);
            } else if (that.flag == 2) {
              console.log(that.itemCode)
              that.itemValue = that.itemCode.split(",");
            }
          } else {
            that.$message.error(
              `GetAllRptItemByOrderCode错误：${response.data.message}`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(`GetAllRptItemByOrderCode错误：${error}`);
        });
    },
    saveChange() {
      let that = this;
      if (this.content == "" || this.content == null) {
        that.$message.error("异常内容不能为空");
        return;
      }
      if (this.flag == 1) {
        this.$axios
          .post(this.$api.InsertIntoFjRstAbnormal, {
            orderCode: this.orderCode,
            RptItemCodes: this.itemValue.join(","),
            keys: this.content,
            IsCrisis: this.ifCrisis
          })
          .then(function(response) {
            if (response.data.status == 1) {
              that.$message.success("插入成功");
              that.$parent.getAbnormal(
                that.$parent.orderCode,
                that.$parent.operatorCode
              );
              that.addVisible = false;
            } else {
              that.$message.error(
                `InsertIntoFjRstAbnormal错误：${response.data.message}`
              );
            }
          })
          .catch(function(error) {
            that.$message.error(`InsertIntoFjRstAbnormal错误：${error}`);
          });
      } else if (this.flag == 2) {
        this.$axios
          .post(this.$api.UpdateFjRstAbnormal, {
            innerCode: this.innerCode,
            orderCode: this.orderCode,
            RptItemCodes:this.itemValue.join(","),
            keys: this.content,
            IsCrisis: this.ifCrisis,
            operatorCode: this.$parent.operatorCode
          })
          .then(function(response) {
            if (response.data.status == 1) {
              that.$message.success("更新成功");
              that.$parent.getAbnormal(
                that.$parent.orderCode,
                that.$parent.operatorCode
              );
              that.addVisible = false;
            } else {
              that.$message.error(
                `UpdateFjRstAbnormal错误：${response.data.message}`
              );
            }
          })
          .catch(function(error) {
            that.$message.error(`UpdateFjRstAbnormal错误：${error}`);
          });
      }
    },
    getEditInit(innerCode) {
      var that = this;
      this.$axios
        .post(this.$api.GetFjRstAbnormalByInnerCode, {
          innerCode
        })
        .then(function(response) {
          console.log(response);
          if (response.data.status == 1) {
            that.content = response.data.entity.keys;
            that.ifCrisis = response.data.entity.isCrisis;
          } else {
            that.$message.error(
              `GetFjRstAbnormalByInnerCode错误：${response.data.message}`
            );
          }
        })
        .catch(function(error) {
          that.$message.error(`GetFjRstAbnormalByInnerCode错误：${error}`);
        });
    },
    getinit() {
      this.content = "";
      this.itemValue = [];
      this.options = [];
      this.ifCrisis = false;
      //改变标题
      if (this.flag == 1) {
        this.title = "异常内容新增";
      } else if (this.flag == 2) {
        this.title = "异常内容编辑";
        //获取该异常信息
        this.getEditInit(this.innerCode);
      }
      this.orderCode = this.$parent.orderCode;
      //根据订单编号获取组合项目 并 初始化
      this.getItemsByOrderCode(this.orderCode, this.$parent.operatorCode);
    }
  }
};
</script>

<style scoped>
</style>

