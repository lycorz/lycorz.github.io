<template>
  <div id="SetmealCreat" class="SetmealCreat">
    <el-dialog
      class="infoucs"
      width="660px"
      title="新建套餐"
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
        <el-form-item label="套餐名称" :label-width="formLabelWidth" prop="packageName">
          <el-input v-model="fromData.packageName"></el-input>
        </el-form-item>
        <el-form-item label="套餐类型" :label-width="formLabelWidth" prop="packageType">
          <el-select clearable v-model="fromData.packageType" width placeholder="请选择">
            <el-option
              v-for="item in packageItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用性别" :label-width="formLabelWidth" prop="sexType">
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
        <el-form-item
          label="执行价格"
          class="is-required"
          v-show="priceIsShow"
          :label-width="formLabelWidth"
          autocomplete="off"
          prop="exePrice"
        >
          <el-input v-model="fromData.exePrice"></el-input>
        </el-form-item>
        <el-form-item label="筛选条件" :label-width="formLabelWidth" prop="filterType">
          <el-select clearable v-model="fromData.filterType" placeholder="请选择">
            <el-option
              v-for="item in filterItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-area" label="检查目的及意义" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="fromData.inspectPurpose"
            autocomplete="off"
            maxlength="500"
          ></el-input>
        </el-form-item>
        <el-form-item label="套餐模板明细" :label-width="formLabelWidth"></el-form-item>
        <el-transfer
          v-model="transferValue"
          filterable
          @change="transferChange"
          :titles="['选择列表', '添加列表']"
          style="text-align: left; display: inline-block;height:200px;margin-left:70px"
          filter-placeholder="请输入"
          :props="{key: 'itemCode',label: 'itemName'}"
          :data="transferData"
        ></el-transfer>
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
  name: "SetmealCreat",
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
      priceIsShow: false, //默认隐藏套餐价格
      fromData: {
        packageName: "",
        exePrice: null,
        packageType: 0,
        sexType: 0,
        filterType: null,
        InspectPurpose: "",
        brunchCode: "001", //医院编码 默认001
        dicPackageItemList: []
      },
      rules: {
        packageName: [
          { required: true, message: "请输入套餐名称", trigger: "blur" },
          { min: 1, max: 50, message: "最大支持50个字符输入", trigger: "blur" }
        ],
        exePrice: [{ validator: checkDic, trigger: "blur" }],
        packageType: [
          { required: true, message: "请选择套餐类型", trigger: "change" }
        ],
        sexType: [
          { required: true, message: "请选择适用性别", trigger: "change" }
        ],
        filterType: [
          { required: true, message: "请选择筛选条件", trigger: "change" }
        ]
      },
      sexItems: [],
      filterItems: [],
      packageItems: [],

      // transferData: generateData(),
      transferData: [],
      transferValue: []
    };
  },
  created() {
    this.getSexItems();
    this.getFilterTypeItems();
    this.getPackageTypeItems();
  },
  inject: ["getData"],
  // watch:{
  //   transferValue:function (newArr,oldArr) {
  //     console.log(newArr);
  //     console.log(oldArr);
  //   }
  // },
  methods: {
    transferChange(arr, move) {
      let price = 0;
      arr.forEach(Code => {
        price += this.transferData.find(z => z.itemCode == Code).exePrice;
      });
      this.fromData.exePrice = price;
    },
    init() {
      if (this.$refs.createFrom !== undefined) {
        this.$refs.createFrom.resetFields();
      }
      this.getResItems();
    },
    //获取性别下拉
    getSexItems() {
      this.getEnumItems("SexType").then(items => {
        this.sexItems = items;
      });
    },
    //获取套餐类型下拉
    getPackageTypeItems() {
      this.getEnumItems("PackagesType").then(items => {
        this.packageItems = items;
      });
    },
    //获取筛选条件下拉
    getFilterTypeItems() {
      this.getEnumItems("PackageFilterType").then(items => {
        this.filterItems = items;
      });
    },
    //获取枚举
    getEnumItems(enumName) {
      let that = this;
      return new Promise((resolve, reject) => {
        that.$axios
          .get(that.$api.GetEnumValueList, { params: { typeName: enumName } })
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              resolve(res.data.entity);
            } else {
              console.log(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    },
    submitForm() {
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.fromData.OldItemCode = this.Code;
          //子项目赋值
          let itemsPrice = 0;
          this.transferValue.forEach(val => {
            let item = this.transferData.find(z => z.itemCode == val);
            this.fromData.dicPackageItemList.push(item);
            itemsPrice += parseInt(item.exePrice);
          });
          if (this.fromData.dicPackageItemList.length <= 0) {
            return this.$message.warning("套餐内必须含有子项目");
          }
          if (this.fromData.exePrice > itemsPrice) {
            return this.$message.warning(
              `套餐价格不得大于所含子项目的总执行价格,子项目总执行价格为：${itemsPrice}`
            );
          }
          this.$axios
            .post(this.$api.SavePackage, this.fromData)
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
        packageName: "",
        exePrice: null,
        packageType: 0,
        sexType: 0,
        filterType: null,
        brunchCode: "001", //医院编码 默认001
        InspectPurpose: "",
        dicPackageItemList: []
      };
      this.transferData = [];
      this.transferValue = [];
    },
    //穿梭框方法
    getResItems() {
      this.$axios
        .get(this.$api.GetAllOrderItemList)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.transferData = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style>
/* .el-form-item__content {
  margin-left: 10px;
} */
.add-row {
  margin-top: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
  margin-bottom: 10px;
}
.SetmealCreat .el-select {
  width: 178px;
}
.SetmealCreat .el-textarea {
  width: 465px;
}
</style>


