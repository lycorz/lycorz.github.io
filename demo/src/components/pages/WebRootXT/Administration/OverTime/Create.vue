<template>
  <div id="OverTimeCreate" class="OverTimeCreate">
    <el-dialog
      class="infoucs"
      width="460px"
      title="工作时间设置"
      :visible.sync="isShow"
      :before-close="close"
      @open="init"
      :close-on-click-modal="false"
    >
      <el-form
        :model="fromData"
        ref="createFrom"
        label-width="50px"
        :rules="rules"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="加班开始时间" :label-width="formLabelWidth" prop="overTimeBegin">
          <el-time-picker
            v-model="fromData.overTimeBegin"
            @change="beginChange"
            :editable="false"
            placeholder="请选择"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="加班结束时间" :label-width="formLabelWidth" prop="overTimeEnd">
          <el-time-picker
            v-model="fromData.overTimeEnd"
            @change="endChange"
            :editable="false"
            placeholder="请选择"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="加班类型" :label-width="formLabelWidth" prop="overTimeType">
          <el-select style="width:220px" v-model="fromData.overTimeType" placeholder="请选择">
            <el-option
              v-for="item in overTimeTypeItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input style="width:220px" type="textarea" autosize v-model="fromData.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "OverTimeCreate",
  data() {
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      overTimeTypeItems: [],
      fromData: {
        overTimeBegin: "",
        overTimeEnd: "",
        overTimeType: null,
        remark: ""
      },
      rules: {
        overTimeBegin: [
          { required: true, message: "请选择加班开始时间", trigger: "change" }
        ],
        overTimeEnd: [
          { required: true, message: "请选择加班结束时间", trigger: "change" }
        ],
        overTimeType: [
          { required: true, message: "请选择加班类型", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  inject: ["getData"],
  methods: {
    beginChange(val) {
      if (this.fromData.overTimeEnd && this.fromData.overTimeEnd < val) {
        this.$message.error("结束时间不得大于开始时间,请重新选择结束时间");
        this.fromData.overTimeEnd = "";
      }
    },
    endChange(val) {
      if (this.fromData.overTimeBegin && val < this.fromData.overTimeBegin) {
        this.$message.error("结束时间不得大于开始时间,请重新选择结束时间");
        this.fromData.overTimeEnd = "";
      }
    },
    init() {
      if (this.$refs.createFrom !== undefined) {
        this.$refs.createFrom.resetFields();
      }
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetOverTime, {
            params: { key: that.Code }
          })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              that.fromData = res.data.entity;
            } else {
              that.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
      }
    },
    submitForm() {
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.fromData.oldInnerCode = this.Code;
          this.fromData.overTimeBegin = moment(
            this.fromData.overTimeBegin
          ).format("HH:mm:ss");
          this.fromData.overTimeEnd = moment(this.fromData.overTimeEnd).format(
            "HH:mm:ss"
          );
          this.$axios
            .post(this.$api.SaveOverTime, this.fromData)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("保存成功！");
                this.close();
                this.getData();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          return false;
        }
      });
    },
    close() {
      this.isShow = false;
      if (this.$refs["fromData"] !== undefined) {
        this.$refs["fromData"].resetFields();
      }
      this.fromData = {
        overTimeBegin: "",
        overTimeEnd: "",
        overTimeType: null,
        remark: ""
      };
      this.Code = "";
    }
  }
};
</script>
<style>
</style>


