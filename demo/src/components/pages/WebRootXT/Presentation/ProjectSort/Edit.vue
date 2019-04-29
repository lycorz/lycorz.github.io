<template>
  <div id="ProjectSortEdit" class="ProjectSortEdit">
    <el-dialog
      class="infoucs"
      width="660px"
      title="报告项目"
      :visible.sync="isShow"
      :before-close="close"
      @open="Init"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <el-form
            :model="fromData"
            ref="createFrom"
            label-width="50px"
            :rules="rules"
            class="demo-ruleForm"
            label-position="left"
          >
            <el-form-item label="报告项目编号" :label-width="formLabelWidth" prop="itemCode">
              <el-input v-model="fromData.itemCode"></el-input>
            </el-form-item>
            <el-form-item label="报告项目名称" :label-width="formLabelWidth" prop="itemName">
              <el-input v-model="fromData.itemName"></el-input>
            </el-form-item>
            <el-form-item label="项目类型" :label-width="formLabelWidth" prop="typeCode">
                <el-select v-model="fromData.typeCode" placeholder="请选择">
                <el-option
                  v-for="item in typeItems"
                  :key="item.typeCode"
                  :label="item.typeName"
                  :value="item.typeCode"
                  filter-placement="bottom-end"
                >{{item.typeName}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属科室" :label-width="formLabelWidth" prop="deptCode">
              <el-select v-model="fromData.deptCode" placeholder="请选择">
                <el-option
                  v-for="item in deptItems"
                  :key="item.deptCode"
                  :label="item.deptName"
                  :value="item.deptCode"
                  filter-placement="bottom-end"
                >{{item.deptName}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序号" :label-width="formLabelWidth">
              <el-input v-model="fromData.orderNum"></el-input>
            </el-form-item>
            <el-form-item label="结论录入类型" :label-width="formLabelWidth">
              <el-select v-model="fromData.inputType" placeholder="请选择">
                <el-option
                  v-for="item in inputItems"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  filter-placement="bottom-end"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用" :label-width="formLabelWidth">
              <el-select v-model="fromData.isEnable" placeholder="请选择">
                <el-option
                  v-for="item in boolItems"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                  filter-placement="bottom-end"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="包含子项目" name="second">
          <el-table
            ref="singleTable"
            :data="tableData"
            @selection-change="handleSelectionChange"
            v-loading="loading"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column property="subItemCode" label="子项目编号" align="left"></el-table-column>
            <el-table-column property="subItemName" label="子项目名称" align="left"></el-table-column>
            <el-table-column align="right" width="150px" :render-header="renderHeader"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="子项目列表"
      width="580px"
      :visible.sync="editIsShow"
      :close-on-click-modal="false"
      @open="editInit"
      @close="editClose"
    >
      <el-transfer
        v-model="transferValue"
        filterable
        :titles="['选择列表', '添加列表']"
        style="text-align: left; display: inline-block"
        filter-placeholder="请输入"
        :props="{key: 'subItemCode',label: 'subItemName'}"
        :data="transferData"
      ></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editClose">取消</el-button>
        <el-button type="primary" @click="editSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ProjectSortEdit",
  data() {
    return {
      Code: "",
      isShow: false,
      loading: false,
      activeName: "first",
      formLabelWidth: "100px",
      /* tab1 */
      fromData: {
        oldItemCode: "",
        itemCode: "",
        itemName: "",
        typeCode: "",
        deptCode: "",
        inputType: 1,
        orderNum: "",
        isEnable: true, // bool
      },
      boolItems: [
        {
          name: "是",
          value: true
        },
        {
          name: "否",
          value: false
        }
      ],
      deptItems: [],
      inputItems: [],
      typeItems: [], //项目类型
      rules: {
        itemCode: [
          { required: true, message: "请填写报告项目编号", trigger: "blur" },
          { min: 1, max: 10, message: "最大支持10个字符输入", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "请填写报告项目名称", trigger: "blur" },
          { min: 1, max: 50, message: "最大支持50个字符输入", trigger: "blur" }
        ],
        typeCode: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
        deptCode: [{ required: true, message: "请选择部门", trigger: "change" }]
      },
      /* tab2 */
      tableData: [],
      multipleSelection: [],

      /* 子窗体 */
      editIsShow: false,
      transferData: [],
      transferValue: [],
    };
  },
  created() {
    this.getDeptItems();
    this.getInputTypeItems();
    this.getrptItemTypeItems();
  },
  inject: ["getData"],
  methods: {
      Init(){
          //加载fromdata和tabledata
            let that = this;
      that.$axios
        .get(that.$api.GetRptItem,{params:{key:this.Code}})
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            that.fromData = res.data.entity;
            that.tableData = res.data.entity.dicRptSubItems;
            delete that.fromData.dicRptSubItems;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
      },
    // firstInit() {},
    // secondInit() {},
    //切换tab事件，按需加载
    handleClick(val, e) {
      switch (val.index) {
        case "0":
          //   this.firstInit();
          break;
        case "1":
          //   this.secondInit();
          break;
        default:
          //   this.firstInit();
          break;
      }
    },
    submitForm() {
        let that = this;
      that.$refs.createFrom.validate(valid => {
        if (valid) {
          that.fromData.OldItemCode = that.Code;
          //子项目赋值
          that.$axios
            .post(that.$api.SaveRptItem, that.fromData)
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                let reqdic = {itemCode : that.fromData.itemCode,subItemCodes:that.transferValue}
                that.$axios.post(that.$api.UpdateItemVsSubItem,reqdic)
                .then(response=>{
                  if(res.data.status==1){
                     that.$message.success("保存成功！");
                     that.close();
                     that.getData();
                  }else{
                    that.$message.error(res.data.message);
                  }
                }) .catch(err => {
              console.error(err);
            });
              } else {
                that.$message.error(res.data.message);
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          document.getElementById('tab-first').click();
        }
         
      });
    },
    close() {
      this.isShow = false;
      if (this.$refs["fromData"] !== undefined) {
        this.$refs["fromData"].resetFields();
      }
      this.fromData = {
        oldItemCode: "",
        itemCode: "",
        itemName: "",
        typeCode: "",
        deptCode: "",
        inputType: 1,
        orderNum: 1,
        isEnable: true // bool
      };
      this.tableData = [];
      this.multipleSelection = [];
    },
    /*  tab1 */
    //获取所属科室下拉
    getDeptItems() {
      let that = this;
      that.$axios
        .get(that.$api.GetDeptList)
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
    //获取结论录入类型
    getInputTypeItems() {
      this.$getType("InputType").then(res => {
        this.inputItems = res.data.entity;
      });
    },
    //获取项目类型
    getrptItemTypeItems() {
       let that = this;
      that.$axios
        .post(that.$api.GetDicRptItemType)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.typeItems = res.data.entity;
          } else {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /*  tab2  */
    //table选中
    handleSelectionChange(ex) {
      this.multipleSelection = ex;
    },
    //表头添加按钮
    renderHeader(h) {
      return h("div", null, [
        h(
          "button",
          {
            class: "el-button el-button--text",
            on: {
              click: () => {
                this.topMove();
              }
            }
          },
          "上移"
        ),
        h(
          "button",
          {
            class: "el-button el-button--text",
            on: {
              click: () => {
                this.downMove();
              }
            }
          },
          "下移"
        ),
        h(
          "button",
          {
            class: "el-button el-button--text",
            on: {
              click: () => {
                this.tabEdit();
              }
            }
          },
          "编辑"
        )
      ]);
    },
    //上移
    topMove() {
      let that = this;
      if (that.multipleSelection.length <= 0) {
        return;
      }
        this.tableData.forEach((element, index) => {
        this.multipleSelection.forEach((ele, ind) => {
          //位置互换
          if (element.subItemCode == ele.subItemCode) {
            that.tableDataUp(that.tableData, that.tableData[index], index);
            return false;
          }
        });
      });
    },
      tableDataUp(tableData, currRow, currRowIndex) {
      if (currRowIndex > 0) {
        let upData = tableData[currRowIndex - 1];
        tableData.splice(currRowIndex - 1, 1);
        tableData.splice(currRowIndex, 0, upData);
      }
    },
    //下移
    downMove() {
        let that = this;
      let arr = [];
      //如果选中的不为空
      if (this.multipleSelection.length == 0) {
        return;
      }
      this.tableData.forEach((element, index) => {
        this.multipleSelection.forEach((ele, ind) => {
          //位置互换
          if (element.subItemCode == ele.subItemCode) {
            let obj = {};
            obj.currRow = that.tableData[index];
            obj.currRowIndex = index;
            arr.push(obj);
          }
        });
      });
      this.tableDataDown(this.tableData, arr);
    },
      tableDataDown(tableData, arr) {
      arr.reverse().forEach((ele, index) => {
        if (ele.currRowIndex.index !== tableData.length - 1) {
          let downData = tableData[ele.currRowIndex];
          tableData.splice(ele.currRowIndex, 1);
          tableData.splice(ele.currRowIndex + 1, 0, downData);
        }
      });
    },
    //修改按钮,弹出子窗体。
    tabEdit() {
      this.editIsShow = true;
    },
    /* 子窗体 */
    //加载穿梭框数据。
    editInit() {
       this.$axios
        .get(this.$api.GetAllRptSubItemList)
        .then(res => {
          if (res.data.status == 1) {
            this.transferData = res.data.entity;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
        this.transferValue = this.tableData.map(z=>z.subItemCode);
    },
    editClose() {
      this.transferData = new Array();
    //   this.transferValue = new Array();
      this.editIsShow = false;
    },
    editSubmit() {
        this.tableData = new Array();
      this.transferValue.forEach(el=>{
        let item = this.transferData.find(z=>z.subItemCode==el);
        this.tableData.push(item);
      });
      this.editClose();
    }
  }
};
</script>
<style>
</style>


