<template>
  <div id="FuncItemsCreate" class="FuncItemsCreate">
    <el-dialog
      class="infoucs"
      width="460px"
      title="新建"
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
        <el-form-item label="功能项编号" :label-width="formLabelWidth" prop="funcCode">
          <el-input v-model="fromData.funcCode"></el-input>
        </el-form-item>
        <el-form-item label="功能项目名称" :label-width="formLabelWidth" prop="funcCode">
          <el-input v-model="fromData.funcName"></el-input>
        </el-form-item>
        <el-form-item label="功能项级别" :label-width="formLabelWidth" prop="level">
          <el-select v-model="fromData.level" placeholder="请选择">
            <el-option
              v-for="item in levelItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父类编号" placeholder="请选择" :label-width="formLabelWidth">
          <el-cascader
            v-model="cascaderValue"
            placeholder="请选择"
            clearable
            :props="{
                value: 'funcCode',
                label: 'funcName',
                children:'childrenNodes'
            }"
            style="width:296px"
            expand-trigger="hover"
            :options="options"
            filterable
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="跳转地址" :label-width="formLabelWidth" prop="url">
          <el-input v-model="fromData.url"></el-input>
        </el-form-item>
        <el-form-item label="展示图标" placeholder="icon图标的类名" :label-width="formLabelWidth">
          <el-input v-model="fromData.icon"></el-input>
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
import { resolve, reject } from "q";
export default {
  name: "FuncItemsCreate",
  data() {
    return {
      Code: "",
      options: [],
      cascaderValue: [], //下拉菜单的value，每次提交取第一条就可以。
      isShow: false,
      levelItems: [], //父页面回传
      formLabelWidth: "100px",
      allDataNotSort: [],
      fromData: {
        oldFuncCode: "",
        funcCode: "",
        parentCode: "",
        level: 0,
        funcName: "",
        url: "",
        icon: "",
        orderNum: 1
      },
      rules: {
        level: [{ required: true, message: "请选择等级", trigger: "change" }],
        funcCode: [
          { required: true, message: "请输入功能项编号", trigger: "blur" },
          { max: 5, message: "最大支持5个字符输入", trigger: "blur" }
        ],
        funcName: [
          { required: true, message: "请输入功能项名称", trigger: "blur" },
          { max: 20, message: "最大支持20个字符输入", trigger: "blur" }
        ],
        url: [
          { required: true, message: "请输入跳转地址", trigger: "blur" },
          { max: 200, message: "最大支持200个字符输入", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  inject: ["getData"],
  methods: {
    init() {
      this.GetAllFuncSort();
      this.GetAllFunc().then(z => {
        if (this.Code) {
          this.$axios
            .get(this.$api.GetFunc, { params: { key: this.Code } })
            .then(res => {
              if (res.data.status == 1) {
                this.fromData = res.data.entity;
                if (res.data.entity.parentCode) {
                  this.getcascValue(
                    res.data.entity.parentCode,
                    this.cascaderValue
                  );
                }
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    },
    getcascValue(code, arr) {
      arr.push(code);
      let item = this.allDataNotSort.find(z => z.funcCode == code);
      if (item && item.parentCode) {
        this.getcascValue(item.parentCode, arr);
      } else {
        return arr.reverse();
      }
    },
    //报告功能项目分级下拉框
    GetAllFuncSort() {
      this.$axios
        .get(this.$api.GetAllFuncSort)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.options = this.getOptionsData(res.data.entity);
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //获取所有的功能项目
    GetAllFunc() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(this.$api.GetAllFunc)
          .then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.allDataNotSort = res.data.entity;
              resolve(true);
            } else {
              console.log(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    },
    getOptionsData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].childrenNodes.length < 1) {
          data[i].childrenNodes = undefined;
        } else {
          this.getOptionsData(data[i].childrenNodes);
        }
      }
      return data;
    },
    submitForm() {
      this.fromData.oldFuncCode = this.Code;
      this.cascaderValue.length > 1
        ? (this.fromData.parentCode = this.cascaderValue[
            this.cascaderValue.length - 1
          ])
        : (this.fromData.parentCode = "");

      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.$axios
            .post(this.$api.SaveFunc, this.fromData)
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
        oldFuncCode: "",
        parentCode: "",
        level: 0,
        funcName: "",
        url: "",
        icon: "",
        orderNum: 1
      };
      this.Code = "";
      this.allDataNotSort = new Array();
      this.cascaderValue = new Array();
    }
  }
};
</script>
<style>
</style>


