(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48430cb8"],{"180f":function(e,t,a){"use strict";var o=a("7557"),r=a.n(o);r.a},"517c":function(e,t,a){"use strict";var o=a("7957"),r=a.n(o);r.a},7557:function(e,t,a){},7957:function(e,t,a){},f414:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content RoleIndex"},[e._m(0),a("div",{staticStyle:{flex:"1",overflow:"hidden",display:"flex","flex-direction":"column"}},[a("div",{staticClass:"peopleData"},[a("div",{staticClass:"propleSearch"},[a("el-input",{staticClass:"arcRadius",staticStyle:{width:"150px"},attrs:{placeholder:"角色名/首拼"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.getData()}},model:{value:e.searchParams.roleName,callback:function(t){e.$set(e.searchParams,"roleName",t)},expression:"searchParams.roleName"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),a("el-button",{staticStyle:{"margin-left":"16px"},attrs:{type:"primary"},on:{click:function(t){e.getData()}}},[e._v("查询")]),a("div",{staticClass:"right"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showCreateDialog()}}},[e._v("新建")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.batchDelete()}}},[e._v("删除")])],1)],1)]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"singleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{property:"roleCode",width:"150px",label:"角色编号",align:"left"}}),a("el-table-column",{attrs:{property:"roleName",width:"150px",label:"角色名称",align:"left"}}),a("el-table-column",{attrs:{property:"funcNames","show-overflow-tooltip":"",label:"功能项集合",align:"left"}}),a("el-table-column",{attrs:{property:"discountLowLimit",width:"100px",label:"最低折扣",align:"center"}}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){e.edit(t.$index,t.row)}}},[e._v("编辑")])]}}])})],1),a("div",{staticClass:"fixBottom"},[a("div",{staticClass:"right"},[a("el-pagination",{staticStyle:{display:"inline-block","text-align":"right"},attrs:{"current-page":e.searchParams.pageIndex,"page-sizes":[10,15,20,30,50,100],layout:"sizes, prev, pager, next, jumper","page-count":e.pageNum},on:{"current-change":e.handleCurrentChange,"size-change":e.sizeChange}})],1)])],1),a("RoleCreate",{ref:"RoleCreate"})],1)},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"topTitle"},[a("span",[e._v("角色字典")])])}],i=(a("cadf"),a("551c"),a("097d"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"RoleCreate",attrs:{id:"RoleCreate"}},[a("el-dialog",{staticClass:"infoucs",attrs:{width:"660px",height:"600px",title:"角色字典",visible:e.isShow,"before-close":e.close,"close-on-click-modal":!1},on:{"update:visible":function(t){e.isShow=t},open:e.init}},[a("el-form",{ref:"createFrom",staticClass:"demo-ruleForm",attrs:{model:e.fromData,"label-width":"50px",inline:!0,rules:e.rules,"label-position":"left"}},[a("el-form-item",{attrs:{label:"角色编号","label-width":e.formLabelWidth,prop:"roleCode"}},[a("el-input",{model:{value:e.fromData.roleCode,callback:function(t){e.$set(e.fromData,"roleCode",t)},expression:"fromData.roleCode"}})],1),a("el-form-item",{attrs:{label:"角色名称","label-width":e.formLabelWidth,prop:"roleName"}},[a("el-input",{model:{value:e.fromData.roleName,callback:function(t){e.$set(e.fromData,"roleName",t)},expression:"fromData.roleName"}})],1),a("el-form-item",{staticClass:"is-required",attrs:{label:"最低折扣","label-width":e.formLabelWidth,prop:"discountLowLimit"}},[a("el-input",{attrs:{maxlength:"4"},model:{value:e.fromData.discountLowLimit,callback:function(t){e.$set(e.fromData,"discountLowLimit",t)},expression:"fromData.discountLowLimit"}})],1),a("el-form-item",{attrs:{label:"排序号","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.fromData.orderNum,callback:function(t){e.$set(e.fromData,"orderNum",t)},expression:"fromData.orderNum"}})],1),a("el-form-item",{attrs:{label:"功能项目集合","label-width":e.formLabelWidth}},[a("div",{staticClass:"tree"},[a("el-tree",{ref:"tree",attrs:{data:e.treeOptions,"show-checkbox":"",accordion:"","default-checked-keys":e.treeDefaultCheckd,"node-key":"funcCode","highlight-current":"",props:e.defaultProps}})],1)])],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.close()}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("确定")])],1)],1)],1)}),s=[],l=(a("28a5"),{name:"RoleCreate",data:function(){var e=function(e,t,a){if(""!=t){var o=/^(0.\d+|0|1)$/;o.test(t)||a(new Error("请输入0-1之间的小数(包括0和1)"))}else a(new Error("请输入折扣"));a()};return{Code:"",isShow:!1,formLabelWidth:"100px",treeOptions:[],treeDefaultCheckd:[],defaultProps:{children:"childrenNodes",label:"funcName"},fromData:{oldRoleCode:"",roleCode:"",roleName:"",funcCodes:"",discountLowLimit:0,orderNum:0},rules:{roleCode:[{required:!0,message:"请输入角色编号",trigger:"blur"},{max:5,message:"最大支持5个字符输入",trigger:"blur"}],roleName:[{required:!0,message:"请输入角色名称",trigger:"blur"},{max:50,message:"最大支持50个字符输入",trigger:"blur"}],discountLowLimit:[{validator:e,trigger:"blur"}]}}},created:function(){},inject:["getData"],methods:{init:function(){var e=this;void 0!==this.$refs.createFrom&&void 0!==this.$refs.createFrom&&this.$refs.createFrom.resetFields(),this.GetAllFuncSort(),this.Code&&this.$axios.get(this.$api.GetRole,{params:{key:this.Code}}).then(function(t){1==t.data.status?(e.fromData=t.data.entity,e.treeDefaultCheckd=t.data.entity.funcCodes.split(","),console.log(e.treeDefaultCheckd)):e.$message.error(t.data.message)}).catch(function(e){console.error(e)})},GetAllFuncSort:function(){var e=this;this.$axios.get(this.$api.GetAllFuncSort).then(function(t){200==t.status&&1==t.data.status?e.treeOptions=e.getOptionsData(t.data.entity):console.log(t.data.message)}).catch(function(e){console.error(e)})},getOptionsData:function(e){for(var t=0;t<e.length;t++)e[t].childrenNodes.length<1?e[t].childrenNodes=void 0:this.getOptionsData(e[t].childrenNodes);return e},submitForm:function(){var e=this,t=this.$refs.tree.getCheckedKeys();this.fromData.funcCodes=t.join(","),this.fromData.oldRoleCode=this.Code,console.log(this.fromData),this.$refs.createFrom.validate(function(t){if(!t)return!1;e.$axios.post(e.$api.SaveRole,e.fromData).then(function(t){200==t.status&&1==t.data.status?(e.$message.success("保存成功！"),e.close(),e.getData()):e.$message.error(t.data.message)}).catch(function(e){console.error(e)})})},close:function(){this.isShow=!1,void 0!==this.$refs["fromData"]&&this.$refs["fromData"].resetFields(),this.fromData={oldRoleCode:"",roleCode:"",roleName:"",funcCodes:"",discountLowLimit:0,orderNum:0},this.treeOptions=new Array,this.treeDefaultCheckd=new Array,this.Code=""}}}),n=l,c=(a("517c"),a("2877")),u=Object(c["a"])(n,i,s,!1,null,null,null);u.options.__file="Create.vue";var d=u.exports,f={name:"RoleIndex",components:{RoleCreate:d},data:function(){return{name:"",total:0,loading:!1,pageNum:1,tableData:[],searchParams:{roleName:"",pageSize:10,pageIndex:1},multipleSelection:[]}},created:function(){this.getData()},provide:function(){return{getData:this.getData}},filters:{boolFilter:function(e,t,a){return e?"是":"否"}},methods:{handleSelectionChange:function(e){this.multipleSelection=e},sizeChange:function(e){this.searchParams.pageSize=e,this.getData()},handleCurrentChange:function(e){this.searchParams.pageIndex=e,this.getData()},getData:function(){this.loading=!0;var e=this;this.$axios.get(this.$api.GetRoleList,{params:this.searchParams}).then(function(t){1===t.data.status?(e.tableData=t.data.entity.resDicRoles,e.pageNum=Math.ceil(t.data.entity.recordNum/e.searchParams.pageSize),e.total=t.data.entity.recordNum):e.$message.error(t.data.message),e.loading=!1}).catch(function(t){e.loading=!1,console.error(t)})},showCreateDialog:function(){var e=this.$refs.RoleCreate;e.isShow=!0},edit:function(e,t){var a=this.$refs.RoleCreate;a.Code=t.roleCode,a.isShow=!0},batchDelete:function(){var e=this,t=this.multipleSelection.map(function(e){return e.roleCode});t.length<=0?this.$message.error("请至少选中一项进行删除"):this.$confirm('<span>您确定要删除选中数据吗？</span><br /><i style="color:#8F9399;">删除后不可恢复</i>',"提醒：",{confirmButtonText:"确定",cancelButtonText:"取消",dangerouslyUseHTMLString:!0,type:"warning"}).then(function(){e.$axios.post(e.$api.BatchDeleteRole,t).then(function(t){200==t.status&&1==t.data.status?(e.$message.success("删除成功！"),e.getData()):e.$message.error(t.data.message)}).catch(function(e){console.error(e)})})}}},m=f,h=(a("180f"),Object(c["a"])(m,o,r,!1,null,"f4abe364",null));h.options.__file="Index.vue";t["default"]=h.exports}}]);