<template>
  <div id="MedicalAdviceCreate" class="MedicalAdviceCreate">
    <el-dialog
      class="infoucs"
      width="660px"
      title="医学建议"
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
        <el-form-item label="建议名称" :label-width="formLabelWidth" prop="advName">
          <el-input v-model="fromData.advName"></el-input>
        </el-form-item>
        <el-form-item label="建议内容" :label-width="formLabelWidth" prop="advContent">
          <el-input type="textarea" autosize v-model="fromData.advContent"></el-input>
        </el-form-item>
        <el-form-item label="异常表达式" :label-width="formLabelWidth" prop="expression">
          <el-input style="width: 88%;" :disabled="true" v-model="fromData.expression"></el-input>
          <el-button type="text" @click="EditisShow = true">编辑</el-button>
        </el-form-item>
        <el-form-item label="建议类型" :label-width="formLabelWidth" prop="advType">
          <el-select v-model="fromData.advType" placeholder="请选择">
            <el-option
              v-for="item in AdvTypeItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="异常类集合" :label-width="formLabelWidth">
          <el-select v-model="fromData.advType" placeholder="请选择">
            <el-option
              v-for="item in AdvTypeItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="是否星标" :label-width="formLabelWidth">
          <el-select v-model="fromData.isStar" placeholder="请选择">
            <el-option
              v-for="item in boolItems"
              :key="item.value"
              :label="item.name"
              :value="item.value"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" :label-width="formLabelWidth">
          <el-select v-model="fromData.priority" placeholder="请选择">
            <el-option
              v-for="item in priorityItems"
              :key="item.value"
              :value="item.value"
              :label="item.name"
              filter-placement="bottom-end"
            >{{item.name}}</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="infoucs"
      width="560px"
      title="异常表达式"
      @open="dialogInit"
      @close="dialogClose"
      :visible.sync="EditisShow"
      :close-on-click-modal="false"
    >
      <el-row :gutter="5">
        <el-col :span="8">
          <el-select
            v-model="selval"
            @change="setOption"
            clearable
            filterable
            remote
            @clear="selclear"
            placeholder="请选择/搜索"
            :remote-method="getAbnormalItems"
            :loading="dialogSelLoading"
          >
            <el-option
              v-for="item in abnormalItems"
              :key="item.abnormalCode"
              :label="item.abnormalName"
              :value="item.abnormalCode"
              filter-placement="bottom-end"
            >{{item.abnormalName}}</el-option>
          </el-select>
        </el-col>
        <el-col style="margin-left:10px" :span="2">
          <el-button @click="left" type="text">(</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="right" type="text">)</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="or" type="text">或</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="and" type="text">且</el-button>
        </el-col>
        <el-col style=" padding-left: 92px;" :span="8">
          <el-button @click="VerifyExpr">[ 验 证 ]</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-popover
            placement="bottom"
            v-for="(tag,index) in dynamicTags"
            :key="index"
            :content="tag.name"
            :trigger="tag.name?'hover':''"
          >
            <el-tag
              slot="reference"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag.value}}</el-tag>
          </el-popover>
          <!-- <el-input type="textarea" id="edit" v-model="dialogVal" autosize></el-input> -->
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose()">取消</el-button>
        <el-button type="primary" @click="dialogSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// $.extend($.fn, {
//   //获取文本框内光标位置
//   getSelectionStart: function() {
//     let e = this[0];
//     if (e.selectionStart) {
//       return e.selectionStart;
//     } else if (document.selection) {
//       e.focus();
//       let r = document.selection.createRange();
//       let sr = r.duplicate();
//       sr.moveToElementText(e);
//       sr.setEndPoint("EndToEnd", r);
//       return sr.text.length - r.text.length;
//     }

//     return 0;
//   },
//   getSelectionEnd: function() {
//     let e = this[0];
//     if (e.selectionEnd) {
//       return e.selectionEnd;
//     } else if (document.selection) {
//       e.focus();
//       let r = document.selection.createRange();
//       let sr = r.duplicate();
//       sr.moveToElementText(e);
//       sr.setEndPoint("EndToEnd", r);
//       return sr.text.length;
//     }
//     return 0;
//   },
//   //自动插入默认字符串
//   insertString: function(str) {
//     $(this).each(function() {
//       let tb = $(this);
//       tb.focus();
//       if (document.selection) {
//         let r = document.selection.createRange();
//         document.selection.empty();
//         r.text = str;
//         r.collapse();
//         r.select();
//       } else {
//         let newstart = tb.get(0).selectionStart + str.length;
//         tb.val(
//           tb.val().substr(0, tb.get(0).selectionStart) +
//             str +
//             tb.val().substring(tb.get(0).selectionEnd)
//         );
//         tb.get(0).selectionStart = newstart;
//         tb.get(0).selectionEnd = newstart;
//       }
//     });

//     return this;
//   },
//   setSelection: function(startIndex, len) {
//     $(this).each(function() {
//       if (this.setSelectionRange) {
//         this.setSelectionRange(startIndex, startIndex + len);
//       } else if (document.selection) {
//         let range = this.createTextRange();
//         range.collapse(true);
//         range.moveStart("character", startIndex);
//         range.moveEnd("character", len);
//         range.select();
//       } else {
//         this.selectionStart = startIndex;
//         this.selectionEnd = startIndex + len;
//       }
//     });

//     return this;
//   },
//   getSelection: function() {
//     let elem = this[0];

//     let sel = "";
//     if (document.selection) {
//       let r = document.selection.createRange();
//       document.selection.empty();
//       sel = r.text;
//     } else {
//       let start = elem.selectionStart;
//       let end = elem.selectionEnd;
//       let content = $(elem).is(":input") ? $(elem).val() : $(elem).text();
//       sel = content.substring(start, end);
//     }
//     return sel;
//   }
// });
import edit from "vue-quill-editor";
// import $ from "jquery";
import { resolve, reject } from "q";
// const html = '<el-select v-model="abnormalCode" clearable filterable placeholder="请选择添加异常"><el-option> v-for="item in abnormalItems" :key="item.abnormalCode" :label="item.abnormalName" :value="item.abnormalCode" filter-placement="bottom-end">{{item.abnormalName}}</el-option></el-select>',

export default {
  name: "MedicalAdviceCreate",
  data() {
    return {
      Code: "",
      EditisShow: false,
      isShow: false,
      formLabelWidth: "100px",
      fromData: {
        advCode: null,
        advName: "",
        advContent: "",
        isStar: false,
        advType: 1,
        priority: 100,
        expression: ""
      },
      priorityItems: [],
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
      AdvTypeItems: [],
      rules: {
        advName: [
          { required: true, message: "请输入建议名称", trigger: "blur" },
          { max: 100, message: "最大支持100个字符输入", trigger: "blur" }
        ],
        advContent: [
          { required: true, message: "请输入建议内容", trigger: "blur" },
          { max: 500, message: "最大支持100个字符输入", trigger: "blur" }
        ],
        expression: [
          { required: true, message: "请键入异常表达式", trigger: "change" }
        ]
      },

      /* dialog */
      abnormalItems: [],
      expressionIsTrue: 0, //0:未验证，1:验证成功,-1:验证失败
      selval: "",
      dialogVal: "",
      dialogSelLoading: false,

      //tag标签
      dynamicTags: []
      /* edit */
      // editorOption: {
      //   modules: {
      //     toolbar: "#toolbar"
      //   }
      // },
      // expressionValue: "",
      // lastEditRange: null
    };
  },
  created() {
    // this.getPriorityItems();
    this.getAbnormalItems();
  },
  inject: ["getData"],
  methods: {
    init() {
      if (this.$refs.createFrom !== undefined) {
        this.$refs.createFrom.resetFields();
      }
      let that = this;
      if (this.Code != "") {
        that.$axios
          .get(that.$api.GetMedicalAdvice, {
            params: { advCode: that.Code }
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
          this.fromData.oldTmplCode = this.Code;
          this.$axios
            .post(this.$api.SaveMedicalAdvice, this.fromData)
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
        advName: "",
        advContent: "",
        isStar: false,
        advType: 1,
        priority: 100,
        expression: ""
      };
      this.Code = "";
    },

    /* dialog */
    dialogInit() {
      // $("#edit").val(this.fromData.expression);
      if (this.Code) {
        let items = this.fromData.expression.split(" ");
        items.forEach(ele => {
          let tag = {};
          tag.value = ele;
          if (ele.indexOf("[") != -1) {
            let code = ele.replace(/\[|]/g, "");
            let name = this.abnormalItems.find(z => z.abnormalCode == code)
              .abnormalName;
            tag.name = name;
          }
          this.dynamicTags.push(tag);
        });
      }
    },
    selclear() {
      this.getAbnormalItems();
    },
    getAbnormalItems(queryName) {
      if (queryName) {
        queryName = queryName.replace(/\s+/g, ""); //去空格
      }
      this.dialogSelLoading = true;
      this.$axios
        .get(this.$api.GetAbnormalListByIsCrisis, {
          params: { name: queryName }
        })
        .then(res => {
          this.dialogSelLoading = false;
          if (res.data.status == 1) {
            this.abnormalItems = res.data.entity;
          } else {
            console.error(res.data.message);
          }
        })
        .catch(err => {
          this.dialogSelLoading = false;
          console.error(err);
        });
    },
    //验证表达式
    VerifyExpr() {
      // let exprVal = this.content.replace(/<\/?.+?>/g, "").toString();
      let expressionValue = this.dynamicTags.map(z => z.value).join(" ");
      if (!expressionValue) {
        return this.$message.warning("请键入表达式");
      }
      this.$axios
        .get(this.$api.VerifyExpr, { params: { expr: expressionValue } })
        .then(res => {
          if (res.data.status == 1) {
            this.$message.success("正确");
            // this.expressionIsTrue = 1;
          } else {
            this.$message.error(res.data.message);
            // this.expressionIsTrue = -1;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    dialogSubmit() {
      // let expressionValue = $("#edit").val();
      let expressionValue = this.dynamicTags.map(z => z.value).join(" ");
      if (!expressionValue) {
        return this.$message.warning("请键入表达式");
      }
      new Promise((resolve, reject) => {
        this.$axios
          .get(this.$api.VerifyExpr, { params: { expr: expressionValue } })
          .then(res => {
            if (res.data.status == 1) {
              resolve(true);
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(err => {
            console.error(err);
          });
      }).then(val => {
        this.fromData.expression = expressionValue;
        this.dialogClose();
      });
    },
    dialogClose() {
      this.EditisShow = false;
      // $("#edit").val("");
      // this.expressionIsTrue = 0;
      // this.expressionValue = "";
      this.dynamicTags = new Array();
      this.selval = "";
    },

    /* edit */
    setOption(val) {
      if (val) {
        // $("#edit").insertString("[" + val + "] ");
        let abnormalName = this.abnormalItems.find(z => z.abnormalCode == val)
          .abnormalName;
        let tag = { value: "[" + val + "]", name: abnormalName };
        this.dynamicTags.push(tag);
      }
    },
    left() {
      let tag = { value: "(" };
      this.dynamicTags.push(tag);
      // $("#edit").insertString("( ");
    },
    right() {
      let tag = { value: ") " };
      this.dynamicTags.push(tag);
      // $("#edit").insertString(") ");
    },
    or() {
      let tag = { value: "or" };
      this.dynamicTags.push(tag);
      // $("#edit").insertString("or ");
    },
    and() {
      let tag = { value: "and" };
      this.dynamicTags.push(tag);
      // $("#edit").insertString("and ");
    },

    //tag
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    }

    // onEditorChange(editor) {
    //   //内容改变事件
    //   let selection = getSelection();
    //   // 设置最后光标对象
    //   this.lastEditRange = selection.getRangeAt(0);
    //   console.log(this.lastEditRange);
    // },
    // onEditorFocus(editor) {
    //   //获得焦点事件
    //   console.log("获得焦点");
    //   let selection = getSelection();
    //   // 设置最后光标对象
    //   this.lastEditRange = selection.getRangeAt(0);
    //   console.log(this.lastEditRange);
    // },
    // addFormattingText(e) {
    //   let edit = $(".ql-editor")[0];
    //   edit.focus();
    //   let selection = getSelection();
    //   if (this.lastEditRange) {
    //     console.log("文本不为空，不换行每次都出现");
    //     // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
    //     selection.removeAllRanges();
    //     selection.addRange(this.lastEditRange);
    //   }
    //   if (selection.anchorNode.nodeName != "#text") {
    //     // 如果是编辑框范围。则创建表情文本节点进行插入
    //     let emojiText = e;
    //     // let range = document.createRange()
    //     // console.log(emojiText)
    //     console.log(edit.childNodes);
    //     console.log(selection.anchorOffset);
    //     if (edit.childNodes.length > 0) {
    //       // 如果文本框的子元素大于0，则表示有其他元素，则按照位置插入表情节点
    //       for (let i = 0; i < edit.childNodes.length; i++) {
    //         if (i == selection.anchorOffset && selection.anchorOffset != 0) {
    //           console.log("成功");
    //           edit.insertBefore(emojiText, edit.childNodes[i]);
    //         } else {
    //           console.log("失败");
    //           console.log(edit.children[0]);
    //           edit.children[0].appendChild(document.createTextNode(emojiText));
    //         }
    //       }
    //     } else {
    //       // 否则直接插入一个表情元素
    //       edit.appendChild(emojiText);
    //     }
    //     if (window.getSelection) {
    //       //ie11 10 9 ff safari
    //       edit.focus(); //解决ff不获取焦点无法定位问题
    //       let range = window.getSelection(); //创建range
    //       range.selectAllChildren(edit); //range 选择obj下所有子内容
    //       range.collapseToEnd(); //光标移至最后
    //     } else if (document.selection) {
    //       //ie10 9 8 7 6 5
    //       let range = document.selection.createRange(); //创建选择对象
    //       //let range = document.body.createTextRange();
    //       range.moveToElementText(edit); //range定位到obj
    //       range.collapse(false); //光标移至最后
    //       range.select();
    //     }
    //     // 创建新的光标对象
    //     // edit.focus();
    //     // let range = document.createRange();
    //     // console.log(range);

    //     // // 光标对象的范围界定为新建的表情节点
    //     // range.selectNodeContents(emojiText);
    //     // // 光标位置定位在表情节点的最大长度
    //     // range.setStart(emojiText, emojiText.length);
    //     // // 使光标开始和光标结束重叠
    //     // range.collapse(true);
    //     // // 清除选定对象的所有光标对象
    //     // selection.removeAllRanges();
    //     // // 插入新的光标对象
    //     // selection.addRange(range);
    //   } else {
    //     console.log("已选择光标");
    //     // 如果是文本节点则先获取光标对象
    //     let range = selection.getRangeAt(0);
    //     // 获取光标对象的范围界定对象，一般就是textNode对象
    //     let textNode = range.startContainer;
    //     // 获取光标位置
    //     let rangeStartOffset = range.startOffset;
    //     // 文本节点在光标位置处插入新的表情内容
    //     textNode.insertData(rangeStartOffset, e);
    //     //                    textNode.insertData(rangeStartOffset, emojiInput.value)
    //     // 光标移动到到原来的位置加上新内容的长度
    //     range.setStart(textNode, rangeStartOffset + e.length);
    //     //                    range.setStart(textNode, rangeStartOffset + emojiInput.value.length)
    //     // 光标开始和光标结束重叠
    //     range.collapse(true);
    //     // 清除选定对象的所有光标对象
    //     selection.removeAllRanges();
    //     // 插入新的光标对象
    //     selection.addRange(range);
    //   }
    //   // 无论如何都要记录最后光标对象
    //   this.lastEditRange = selection.getRangeAt(0);
    // },
    // onEditorReady(editor) {
    //   // console.log('editor ready!', editor)
    // },
    // onEditorBlur(editor) {
    //   // console.log('editor blur!', editor)
    // }
  }
};
</script>
<style>
.el-row {
  margin-bottom: 3px;
}

.el-tag {
  margin-right: 10px;
  margin-top: 5px;
}

.el-tag + .el-tag {
  margin-right: 10px;
}
</style>


