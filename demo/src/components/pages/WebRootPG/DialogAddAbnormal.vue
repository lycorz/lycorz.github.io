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
            <el-select
              value-key="abnormalCode"
              v-model="abnormalContent"
              filterable
              placeholder="请选择"
              @change="changeContent"
            >
              <el-option
                v-for="item in abnormalItems"
                :key="item.abnormalCode"
                :value="item"
                :label="item.abnormalName"
              ></el-option>
            </el-select>
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
      flag: 1,
      abnormalItems: [],
      abnormalContent: ""
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
            if (that.flag == 1 && response.data.entity!=0) {
              that.itemValue.push(response.data.entity[0].itemCode);
            } else if (that.flag == 2) {
              console.log(that.itemCode);
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
        //参数拼接
        var entity = {};
        entity.orderCode = this.orderCode;
        entity.RptItemCodes = this.itemValue.join(",");
        entity.keys = this.content;
        entity.IsCrisis = this.ifCrisis;
        if (this.content == this.abnormalContent.abnormalName) {
          entity.AbnormalCode = this.abnormalContent.abnormalCode;
        }
        this.$axios
          .post(this.$api.InsertIntoFjRstAbnormal, entity)
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
        //参数拼接
        var entity = {};
        entity.innerCode = this.innerCode;
        entity.orderCode = this.orderCode;
        entity.RptItemCodes = this.itemValue.join(",");
        entity.keys = this.content;
        entity.IsCrisis = this.ifCrisis;
        entity.operatorCode = this.$parent.operatorCode;
        if (this.content == this.abnormalContent.abnormalName) {
          entity.AbnormalCode = this.abnormalContent.abnormalCode;
        }
        this.$axios
          .post(this.$api.UpdateFjRstAbnormal, entity)
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
            //初始化异常内容，异常内容value为对象
            if(response.data.entity.abnormalCode != null){
              let entity  = {};
              entity.Condition=response.data.entity.abnormalCode;
            that.$axios
              .post(that.$api.GetAbnomalsByCondition,entity)
              .then(function(response) {
                console.log(response);
                if (response.data.status == 1 && response.data.entity.length!=0) {
                  that.abnormalContent = response.data.entity[0];
                } else {
                  that.$message.error(
                    `GetAllAbnomals错误：${response.data.message}`
                  );
                }
              })
              .catch(function(error) {
                that.$message.error(`GetAllAbnomals错误：${error}`);
              });
              }
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
    //获取异常内容字典
    GetAllAbnomals() {
      var that = this;
      this.$axios
        .post(this.$api.GetAllAbnomals)
        .then(function(response) {
          console.log(response);
          if (response.data.status == 1) {
            that.abnormalItems = response.data.entity;
            //初始化第一个
            // that.content = that.abnormalContent.abnormalName;
          } else {
            that.$message.error(`GetAllAbnomals错误：${response.data.message}`);
          }
        })
        .catch(function(error) {
          that.$message.error(`GetAllAbnomals错误：${error}`);
        });
    },
    changeContent(val) {
      this.content = val.abnormalName;
    },
    getinit() {
      this.content = "";
      this.itemValue = [];
      this.options = [];
      this.ifCrisis = false;
      this.abnormalContent = "";
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
      //加载异常内容字典
      this.GetAllAbnomals();
    }
  }
};
</script>

<style scoped>
</style>

