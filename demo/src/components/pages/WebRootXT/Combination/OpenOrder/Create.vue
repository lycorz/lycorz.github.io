<template>
  <div id="CombinationCreate" class="CombinationCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="开单组合项"
      @open="init"
      :visible.sync="isShow"
      :before-close="close"
      :close-on-click-modal="false"
    >
      <el-form
        :model="fromData"
        ref="createFrom"
        label-width="50px"
        :rules="rules"
        :inline="true"
        class="demo-ruleForm"
        label-position="left"
      >
        <!-- <el-row>
        <el-col :span="12">-->
        <el-form-item label="项目编号" :label-width="formLabelWidth" prop="itemCode">
          <el-input v-model="fromData.itemCode"></el-input>
        </el-form-item>
        <!-- </el-col>
        <el-col :span="12">-->
        <el-form-item
          class="is-required"
          label="项目原价"
          autocomplete="off"
          :label-width="formLabelWidth"
          prop="fullPrice"
        >
          <el-input @change="fullChange" v-model="fromData.fullPrice">
            <!--  <template slot="append">元</template> -->
          </el-input>
        </el-form-item>
        <!-- </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">-->
        <el-form-item label="所属科室" :label-width="formLabelWidth" prop="deptCode">
          <el-select clearable v-model="fromData.deptCode" width placeholder="请选择">
            <el-option
              v-for="item in deptItems"
              :key="item.deptCode"
              :label="item.deptName"
              :value="item.deptCode"
              filter-placement="bottom-end"
            >{{item.deptName}}</el-option>
          </el-select>
        </el-form-item>
        <!-- </el-col>
        <el-col :span="12">-->
        <el-form-item label="项目名称" :label-width="formLabelWidth" prop="itemName">
          <el-input v-model="fromData.itemName"></el-input>
        </el-form-item>
        <!-- </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">-->
        <el-form-item
          label="执行价格"
          class="is-required"
          :label-width="formLabelWidth"
          autocomplete="off"
          prop="exePrice"
        >
          <el-input v-model="fromData.exePrice">
            <!-- <template slot="append">元</template> -->
          </el-input>
        </el-form-item>
        <!-- </el-col>
        <el-col :span="12">-->
        <el-form-item
          label="最低价格"
          class="is-required"
          :label-width="formLabelWidth"
          autocomplete="off"
          prop="lowestPrice"
        >
          <el-input v-model="fromData.lowestPrice">
            <!-- <template slot="append">元</template> -->
          </el-input>
        </el-form-item>
        <!-- </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">-->
        <el-form-item
          label="成本价格"
          class="is-required"
          :label-width="formLabelWidth"
          autocomplete="off"
          prop="costPrice"
        >
          <el-input v-model="fromData.costPrice">
            <!-- <template slot="append">元</template> -->
          </el-input>
        </el-form-item>
        <!-- </el-col>
        <el-col :span="12">-->

        <el-form-item label="适用性别" :label-width="formLabelWidth">
          <el-select clearable v-model="fromData.sexType" placeholder="请选择">
            <el-option
              v-for="item in sexItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <!-- </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">-->
        <el-form-item label="是否空腹" :label-width="formLabelWidth">
          <el-select clearable v-model="fromData.isEmpty" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <!-- </el-col>
        <el-col :span="12">-->
        <el-form-item :label-width="formLabelWidth" label="排序号">
          <el-input v-model="fromData.orderNum"></el-input>
        </el-form-item>
        <!-- </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">-->
        <el-form-item :label-width="formLabelWidth" label="未婚不适用">
          <el-select clearable v-model="fromData.virginDisabled" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <!-- </el-col>
        <el-col :span="12">-->
        <el-form-item :label-width="formLabelWidth" label="是否费用类项目">
          <el-select clearable v-model="fromData.isFee" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.label}}</el-option>
          </el-select>
        </el-form-item>
        <!-- </el-col>
        </el-row>
        <el-row>
        <el-col :span="24">-->
        <el-form-item :label-width="formLabelWidth" label="是否启用">
          <el-switch v-model="fromData.isEnable" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <!-- </el-col>
        </el-row>

        <el-row>
        <el-col :span="24">-->
        <el-form-item
          class="el-area"
          label="检查目的及意义"
          :label-width="formLabelWidth"
          prop="inspectPurpose"
        >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="fromData.inspectPurpose"
            autocomplete="off"
            maxlength="500"
          ></el-input>
        </el-form-item>
        <!-- </el-col>
        </el-row>-->
        <!-- <el-form-item align="right">
          <el-button @click="close()">取消</el-button>
          <el-button type="primary" @click="submitForm('fromData')">确定</el-button>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CombinationCreate",
  data() {
    var checkDic = (rule, value, callback) => {
      if (value || value == 0) {
        // var re = /^[0-9]+([.]{1}[0-9]+){0,3}$/;
        var re = /^-?\d+(\.\d{1,3})?$/;
        if (!re.test(value)) {
          callback(new Error("整数或小数(小数点后最多三位)"));
        }
        if (value.length > 10) {
          callback(new Error("最多支持十位数输入"));
        }
      } else {
        callback(new Error("请输入"));
      }
      callback();
    };
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        OldItemCode: "",
        itemCode: "",
        itemName: "",
        deptCode: "",
        inspectPurpose: "",
        sexType: 0,
        virginDisabled: true,
        isFee: false,
        isEmpty: true,
        isSelectAll: true,
        fullPrice: null,
        exePrice: null,
        costPrice: null,
        lowestPrice: null,
        orderNum: null,
        brunchCode: "",
        isEnable: true
      },
      rules: {
        itemCode: [
          { required: true, message: "请输入项目编号", trigger: "blur" },
          { max: 10, message: "最大支持10个字符输入", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { max: 50, message: "最大支持50个字符输入", trigger: "blur" }
        ],
        deptCode: [
          { required: true, message: "请选择科室", trigger: "change" }
        ],
        inspectPurpose: [
          { max: 500, message: "最大支持500个字符输入", trigger: "blur" }
        ],
        fullPrice: [{ validator: checkDic, trigger: "blur" }],
        exePrice: [{ validator: checkDic, trigger: "blur" }],
        costPrice: [{ validator: checkDic, trigger: "blur" }],
        lowestPrice: [{ validator: checkDic, trigger: "blur" }]
      },
      deptItems: [],
      boolItems: [
        {
          label: "是",
          value: true
        },
        {
          label: "否",
          value: false
        }
      ],
      sexItems: []
    };
  },
  created() {
    this.getDeptItems();
    this.getSexItems();
  },
  inject: ["getData"],
  methods: {
    fullChange(val) {
      if (val || value == 0) {
        this.fromData.exePrice = val;
      }
    },
    init() {
      if (this.$refs.createFrom !== undefined) {
        this.$refs.createFrom.resetFields();
      }
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetOrderItem, { params: { key: that.Code } })
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
        // this.$nextTick(() => {
        //   this.$refs["fromData"].resetFields();
        // });
      }
    },
    //获取性别下拉
    getSexItems() {
      let that = this;
      that.$axios
        .get(that.$api.GetEnumValueList, { params: { typeName: "SexType" } })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            that.sexItems = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    submitForm() {
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          
          if (parseFloat(this.fromData.exePrice) > parseFloat(this.fromData.fullPrice)) {
            return this.$message.error("执行价格不得超过原价");
          }
          if (parseFloat(this.fromData.lowestPrice) > parseFloat(this.fromData.exePrice)) {
            return this.$message.error("执行价格不能小于最低价格");
          }
          // if (parseFloat(this.fromData.costPrice) > parseFloat(this.fromData.fullPrice)) {
          //   return this.$message.error("成本价格不得超过原价");
          // }
          this.fromData.OldItemCode = this.Code;
          this.$axios
            .post(this.$api.SaveOrderItem, this.fromData)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                this.$message.success("保存成功！");
                this.close();
                this.getData();
              } else {
                // console.error(res.data.message);
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
    //获取所属科室下拉
    getDeptItems() {
      let that = this;
      that.$axios
        .get(that.$api.GetAllDeptList)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            that.deptItems = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    close() {
      this.isShow = false;

      this.Code = "";
      // if (this.$refs["fromData"] !== undefined) {
      //   this.$refs["fromData"].resetFields();
      // }
      this.fromData = {
        OldItemCode: "",
        itemCode: "",
        itemName: "",
        deptCode: "",
        inspectPurpose: "",
        sexType: 0,
        virginDisabled: true,
        isFee: true,
        isEmpty: true,
        isSelectAll: true,
        fullPrice: null,
        exePrice: null,
        costPrice: null,
        lowestPrice: null,
        orderNum: null,
        brunchCode: "",
        isEnable: true
      };
      // this.$nextTick(() => {
      //   this.$refs["fromData"].resetFields();
      // });
    }
  }
};
</script>
<style>
/* .el-form-item__content {
  margin-left: 10px;
} */
.CombinationCreate .el-select {
  width: 178px;
}
.CombinationCreate .el-textarea {
  width: 465px;
}
</style>


