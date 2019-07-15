<template>
  <div id="GuideClassCreate" class="GuideClassCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="导检单类别"
      :visible.sync="isShow"
      :before-close="close"
      @open="init"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-form
            :model="fromData"
            ref="createFrom"
            label-width="50px"
            :rules="rules"
            class="demo-ruleForm"
            label-position="left"
          >
            <el-form-item label="类别编号" :label-width="formLabelWidth" prop="classCode">
              <el-input v-model="fromData.classCode"></el-input>
            </el-form-item>
            <el-form-item label="类别描述" :label-width="formLabelWidth" prop="className">
              <el-input v-model="fromData.className"></el-input>
            </el-form-item>
            <el-form-item label="排序号" :label-width="formLabelWidth">
              <el-input v-model="fromData.orderNum"></el-input>
            </el-form-item>
            <!-- <el-form-item label="所含科室" :label-width="formLabelWidth" prop="deptListNames">
          <el-input style="width: 88%;" :disabled="true" v-model="deptListNames"></el-input>
          <el-button type="text" @click="EditisShow = true">编辑</el-button>
        </el-form-item>
        <el-form-item label="所含项目" :label-width="formLabelWidth" prop="itemListNames">
          <el-input style="width: 88%;" :disabled="true" v-model="itemListNames"></el-input>
          <el-button type="text" @click="EditisShow = true">编辑</el-button>
            </el-form-item>-->
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="所含科室" name="second">
          <el-transfer
            v-model="deptTransferValue"
            style="padding:16px"
            filterable
            :titles="['选择列表', '添加列表']"
            filter-placeholder="请输入"
            :props="{key: 'deptCode',label: 'deptName'}"
            :data="deptLists"
          ></el-transfer>
        </el-tab-pane>
        <el-tab-pane label="所含项目" name="third">
          <el-transfer
            v-model="itemTransferValue"
            style="padding:16px"
            filterable
            :titles="['选择列表', '添加列表']"
            filter-placeholder="请输入"
            :props="{key: 'itemCode',label: 'itemName'}"
            :data="itemLists"
          ></el-transfer>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GuideClassCreate",
  data() {
    return {
      Code: "",
      isShow: false,
      formLabelWidth: "100px",
      guideClassList: [],
      activeName: "first",
      deptLists: [],
      itemLists: [],
      itemTransferValue: [],
      deptTransferValue: [],
      deptListNames: "",
      itemListNames: "",
      fromData: {
        OldClassCode: "",
        classCode: "",
        className: "",
        deptList: "",
        itemList: "",
        orderNum: null
      },
      rules: {
        classCode: [
          { required: true, message: "请输入导检单类别编号", trigger: "blur" },
          { max: 5, message: "最大支持5个字符输入", trigger: "blur" }
        ],
        className: [
          { required: true, message: "请输入功能项名称", trigger: "blur" },
          { max: 50, message: "最大支持50个字符输入", trigger: "blur" }
        ],
        deptListNames: [
          { required: true, message: "请键入所含科室", trigger: "blur" },
          { max: 500, message: "最大支持500个字符输入", trigger: "blur" }
        ],
        itemListNames: [
          { required: true, message: "请键入所含项目", trigger: "blur" },
          { max: 2000, message: "最大支持2000个字符输入", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  inject: ["getData"],
  methods: {
    init() {
      this.GetItemLists();
      this.GetDeptLists();
      if (this.Code) {
        this.$axios
          .get(this.$api.GetGuideClass, { params: { key: this.Code } })
          .then(res => {
            if (res.data.status == 1) {
              this.fromData = res.data.entity;
              if (res.data.entity.deptList) {
                this.deptTransferValue = res.data.entity.deptList.split(",");
              }
              if (res.data.entity.itemList) {
                this.itemTransferValue = res.data.entity.itemList.split(",");
              }
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    GetDeptLists() {
      this.$axios
        .get(this.$api.GetDeptListByGuideClass, {
          params: { guideClass: this.Code }
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.deptLists = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    GetItemLists() {
      this.$axios
        .get(this.$api.GetOrderItemListByGuideClass, {
          params: { guideClass: this.Code }
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.itemLists = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    submitForm() {
      this.fromData.OldClassCode = this.Code;
      if (this.deptTransferValue.length <= 0) {
        this.activeName = "second";
        return this.$message.error("所含科室不可为空");
      }
      if (this.itemTransferValue.length <= 0) {
        this.activeName = "third";
        return this.$message.error("所含项目不可为空");
      }
      // if (this.fromData.orderNum || this.fromData.orderNum == 0) {
      //   if (
      //     this.guideClassList
      //       .find(z => z.classCode != this.fromData.classCode)
      //       .find(z => z.orderNum == this.fromData.orderNum)
      //   ) {
      //     return this.$message.error("排序号重复");
      //   }
      // }
      this.fromData.deptList = this.deptTransferValue.join(",");
      this.fromData.itemList = this.itemTransferValue.join(",");
      this.$refs.createFrom.validate(valid => {
        if (valid) {
          this.$axios
            .post(this.$api.SaveGuideClass, this.fromData)
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
        OldClassCode: "",
        classCode: "",
        className: "",
        deptList: "",
        itemList: "",
        orderNum: null
      };
      this.Code = "";
      this.itemLists = new Array();
      this.deptLists = new Array();
      this.deptTransferValue = new Array();
      this.itemTransferValue = new Array();
      this.deptListNames = "";
      this.itemListNames = "";
    }
  }
};
</script>
<style>
</style>


