(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ff78a160"],{2390:function(e,t,a){},"8f5c":function(e,t,a){"use strict";var o=a("2390"),l=a.n(o);l.a},b4cf:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"DDInfo content"},[e._m(0),a("el-row",[a("div",{staticStyle:{flex:"1",overflow:"hidden",display:"flex","flex-direction":"column"}},[a("div",{staticClass:"peopleData"},[a("div",{staticClass:"propleSearch"},[a("el-input",{staticClass:"arcRadius",staticStyle:{width:"150px"},attrs:{placeholder:"请搜索"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.getData(!0)}},model:{value:e.params.Filter,callback:function(t){e.$set(e.params,"Filter",t)},expression:"params.Filter"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),a("div",{staticStyle:{display:"inline-block",margin:"0 16px"}},[a("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.timeRange,callback:function(t){e.timeRange=t},expression:"timeRange"}},[e._v("\n\t\t\t\t\t\t\t\t\t\t\t>")])],1),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.getData(!0)}}},[e._v("查询")]),a("div",{staticClass:"right"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.peopleInfoModal=!0,e.clearPropleInfo(),e.peopleInfo.Customer.IdcardNum=""}}},[e._v("新建客户")])],1)],1)]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{prop:"customerName",label:"客户姓名"}}),a("el-table-column",{attrs:{prop:"sex",label:"性别",width:"50"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t\t\t\t\t\t"+e._s(1===t.row.sex?"男":"女")+"\n\t\t\t\t\t\t\t\t\t")]}}])}),a("el-table-column",{attrs:{prop:"tele",label:"电话",width:"130"}}),a("el-table-column",{attrs:{prop:"idcardNum",label:"身份证号",width:"170"}}),a("el-table-column",{attrs:{prop:"unitName",label:"单位"}}),a("el-table-column",{attrs:{prop:"deptName",label:"部门"}}),a("el-table-column",{attrs:{prop:"teamName",label:"组别"}}),a("el-table-column",{attrs:{prop:"lastModifyTime",label:"最后编辑时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n\t\t\t\t\t\t\t\t\t\t"+e._s(e._f("formatDate")(t.row.lastModifyTime,"YYYY-MM-DD"))+"\n\t\t\t\t\t\t\t\t\t")]}}])}),a("el-table-column",{attrs:{prop:"state",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){e.editPeople(t.row.idcardNum)}}},[e._v("编辑客户")])]}}])})],1),a("div",{staticClass:"fixBottom"},[a("div",{staticClass:"right"},[a("el-pagination",{attrs:{"current-page":e.searchParams.PageIndex,"page-sizes":[10,20,50,100],total:e.total,layout:"total,sizes, prev, pager, next, jumper"},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}})],1)]),a("el-dialog",{staticClass:"peopleInfoForm",attrs:{title:"客户信息",visible:e.peopleInfoModal,width:"1000px","close-on-click-modal":!1},on:{"update:visible":function(t){e.peopleInfoModal=t},close:e.closeModal}},[a("el-form",{ref:"peopleForm",attrs:{model:e.peopleInfo.Customer,rules:e.rules,inline:!0,"label-width":"50px"}},[a("el-form-item",{attrs:{label:"身份证号",prop:"IdcardNum","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"130px","margin-right":"8px"},attrs:{maxlength:"18"},model:{value:e.peopleInfo.Customer.IdcardNum,callback:function(t){e.$set(e.peopleInfo.Customer,"IdcardNum",t)},expression:"peopleInfo.Customer.IdcardNum"}}),a("el-button",{attrs:{type:"primary",plain:""},on:{click:e.getIdentity}},[e._v("刷身份证")])],1),a("el-form-item",{attrs:{label:"体检卡号",prop:"CardNum","label-width":e.formLabelWidth}},[a("el-input",{attrs:{maxlength:"20",autocomplete:"off"},model:{value:e.peopleInfo.Customer.CardNum,callback:function(t){e.$set(e.peopleInfo.Customer,"CardNum",t)},expression:"peopleInfo.Customer.CardNum"}})],1),a("el-form-item",{attrs:{label:"姓名",prop:"CustomerName","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.peopleInfo.Customer.CustomerName,callback:function(t){e.$set(e.peopleInfo.Customer,"CustomerName",t)},expression:"peopleInfo.Customer.CustomerName"}})],1),a("el-form-item",{attrs:{label:"性别",prop:"Sex","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"100%"},model:{value:e.peopleInfo.Customer.Sex,callback:function(t){e.$set(e.peopleInfo.Customer,"Sex",t)},expression:"peopleInfo.Customer.Sex"}},[a("el-option",{attrs:{label:"男",value:1}}),a("el-option",{attrs:{label:"女",value:2}})],1)],1),a("el-form-item",{attrs:{label:"民族",prop:"Nation","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.peopleInfo.Customer.Nation,callback:function(t){e.$set(e.peopleInfo.Customer,"Nation",t)},expression:"peopleInfo.Customer.Nation"}})],1),a("el-form-item",{attrs:{label:"出生日期",prop:"Birthday","label-width":e.formLabelWidth}},[a("el-date-picker",{staticStyle:{width:"143px","margin-right":"8px"},attrs:{type:"date"},model:{value:e.peopleInfo.Customer.Birthday,callback:function(t){e.$set(e.peopleInfo.Customer,"Birthday",t)},expression:"peopleInfo.Customer.Birthday"}}),a("el-button-group",[a("el-button",{staticStyle:{padding:"7px 6px",width:"50%"}},[e._v(e._s(e.age||0))]),a("el-button",{staticStyle:{padding:"7px 6px",width:"50%"}},[e._v("岁")])],1)],1),a("el-form-item",{attrs:{label:"职业",prop:"Occupation","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.peopleInfo.Customer.Occupation,callback:function(t){e.$set(e.peopleInfo.Customer,"Occupation",t)},expression:"peopleInfo.Customer.Occupation"}})],1),a("el-form-item",{attrs:{label:"婚姻状况",prop:"MaritalStatus","label-width":e.formLabelWidth}},[a("el-select",{model:{value:e.peopleInfo.Customer.MaritalStatus,callback:function(t){e.$set(e.peopleInfo.Customer,"MaritalStatus",t)},expression:"peopleInfo.Customer.MaritalStatus"}},[a("el-option",{attrs:{label:"未婚",value:1}}),a("el-option",{attrs:{label:"已婚",value:2}})],1)],1),a("el-form-item",{attrs:{label:"手机号",prop:"Tele","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.peopleInfo.Customer.Tele,callback:function(t){e.$set(e.peopleInfo.Customer,"Tele",t)},expression:"peopleInfo.Customer.Tele"}})],1),a("el-form-item",{attrs:{label:"部门",prop:"DeptName","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.peopleInfo.Customer.DeptName,callback:function(t){e.$set(e.peopleInfo.Customer,"DeptName",t)},expression:"peopleInfo.Customer.DeptName"}})],1),a("el-form-item",{attrs:{label:"班组",prop:"TeamName","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.peopleInfo.Customer.TeamName,callback:function(t){e.$set(e.peopleInfo.Customer,"TeamName",t)},expression:"peopleInfo.Customer.TeamName"}})],1),a("el-form-item",{attrs:{label:"VIP属性",prop:"VipFlag","label-width":e.formLabelWidth}},[a("el-radio-group",{model:{value:e.peopleInfo.Customer.VipFlag,callback:function(t){e.$set(e.peopleInfo.Customer,"VipFlag",t)},expression:"peopleInfo.Customer.VipFlag"}},[a("el-radio",{attrs:{label:1}},[e._v("是")]),a("el-radio",{attrs:{label:0}},[e._v("否")])],1)],1),a("el-form-item",{attrs:{label:"单位",prop:"UnitName","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.peopleInfo.Customer.UnitName,callback:function(t){e.$set(e.peopleInfo.Customer,"UnitName",t)},expression:"peopleInfo.Customer.UnitName"}})],1),a("el-form-item",{staticClass:"w65",attrs:{label:"地址",prop:"Addr","label-width":e.formLabelWidth}},[a("el-input",{model:{value:e.peopleInfo.Customer.Addr,callback:function(t){e.$set(e.peopleInfo.Customer,"Addr",t)},expression:"peopleInfo.Customer.Addr"}})],1),a("el-form-item",{staticClass:"w100",attrs:{label:"备注信息",prop:"Remark","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.peopleInfo.Customer.Remark,callback:function(t){e.$set(e.peopleInfo.Customer,"Remark",t)},expression:"peopleInfo.Customer.Remark"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.peopleInfoModal=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addPeopleBtn}},[e._v("确定")])],1)],1)],1)])],1)},l=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"topTitle"},[a("span",[e._v("客户管理")])])}],r=(a("cadf"),a("551c"),a("097d"),a("c1df")),s=a.n(r),i={name:"DDOrder",data:function(){return{value:"",total:0,loading:!1,orderVipFlag:0,peopleInfoModal:!1,formLabelWidth:"70px",timeRange:[s()().subtract(.5,"year").format(),s()().format()],pickerOptions:{shortcuts:[{text:"最近半年",onClick:function(e){var t=new Date,a=new Date(s()().subtract(.5,"year"));e.$emit("pick",[a,t])}},{text:"最近一年",onClick:function(e){var t=new Date,a=new Date(s()().subtract(1,"year"));e.$emit("pick",[a,t])}},{text:"最近二年",onClick:function(e){var t=new Date,a=new Date(s()().subtract(2,"year"));e.$emit("pick",[a,t])}}]},params:{Filter:"",timeRange:[s()().subtract(.5,"year").format(),s()().format()]},searchParams:{Filter:"",StartDate:"",EndDate:"",PageIndex:1,PageSize:10},peopleModal:!1,tableData:[],age:0,peopleInfo:{OrderCode:"",Operator:"001",Customer:{CustomerCode:"00000000-0000-0000-0000-000000000000",CardNum:"00000000-0000-0000-0000-000000000000",CustomerName:"",Sex:"",Nation:"",IdcardNum:"",Birthday:"",Photo:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2161523157,1298941018&fm=26&gp=0.jpg",MaritalStatus:1,VipFlag:0,Occupation:"",UnitName:"",DeptName:"",TeamName:"",Tele:"",Addr:"",lastModifyTime:s()().format(),Remark:""}},rules:{CardNum:[{required:!0,message:"请输入正确位数的体检卡号",trigger:"blur"}],CustomerName:[{required:!0,message:"请输入姓名",trigger:"blur"}],Sex:[{required:!0,message:"请输入性别",trigger:"blur"}],IdcardNum:[{required:!0,message:"请输入身份证号",trigger:"blur"},{max:18,min:18,message:"与身份证号码位数不符",trigger:"blur"}],Birthday:[{required:!0,message:"请选择时间",trigger:"change"}],VipFlag:[{required:!0,message:"请选择Vip属性",trigger:"blur"}],Tele:[{required:!0,message:"请输入联系电话",trigger:"blur"}]}}},created:function(){this.getData(!0)},methods:{getData:function(e){var t=this;e?(this.searchParams.Filter=this.params.Filter,this.timeRange&&2===this.timeRange.length?(this.searchParams.StartDate=s()(this.timeRange[0]).format("YYYY-MM-DD"),this.searchParams.EndDate=s()(this.timeRange[1]).format("YYYY-MM-DD")):(this.searchParams.StartDate="",this.searchParams.EndDate=""),this.params.timeRange=this.timeRange,this.searchParams.PageIndex=1):(this.params.Filter=this.searchParams.Filter,this.timeRange=this.params.timeRange),this.loading=!0,this.$axios.get(this.$api.GetCustomerList,{params:this.searchParams}).then(function(e){1===e.data.status?(t.tableData=e.data.entity.resultData,t.total=e.data.entity.totalCount):(t.$message.error(e.data.message),t.total=0),t.loading=!1}).catch(function(e){t.$message.error(e.data.message),t.loading=!1,t.total=0})},addPeopleBtn:function(){var e=this;this.$refs.peopleForm.validate(function(t){t&&e.$axios.post(e.$api.SaveCustomer,e.peopleInfo).then(function(t){1===t.data.status?e.$message.success("保存成功！"):e.$message.error(t.data.message),e.peopleInfoModal=!1,e.getData()}).catch(function(t){e.$message.error(t.data.message)})})},editPeople:function(e){this.clearPropleInfo(),this.peopleInfoModal=!0,this.peopleInfo.Customer.IdcardNum=e,this.setCustomer(e)},clearPropleInfo:function(){this.peopleInfo.Customer.Sex="",this.peopleInfo.Customer.CardNum="00000000-0000-0000-0000-000000000000",this.peopleInfo.Customer.CustomerName="",this.peopleInfo.Customer.Nation="",this.peopleInfo.Customer.Birthday="",this.peopleInfo.Customer.Occupation="",this.peopleInfo.Customer.MaritalStatus=1,this.peopleInfo.Customer.DeptName="",this.peopleInfo.Customer.TeamName="",this.peopleInfo.Customer.VipFlag=0,this.peopleInfo.Customer.UnitName="",this.peopleInfo.Customer.Addr="",this.peopleInfo.Customer.Remark="",this.peopleInfo.Customer.lastModifyTime=s()().format(),this.peopleInfo.Customer.Tele=""},getCustomer:function(e){var t=this;this.$axios.get(this.$api.GetCustomer,{params:{IdcardNum:this.peopleInfo.Customer.IdcardNum}}).then(function(e){if(e.data.entity&&1===e.data.status){var a=e.data.entity;t.setCustomer(a)}})},getIdentity:function(){api.getIdcard(this.setCustomer)},closeModal:function(){this.peopleInfo.Customer.IdcardNum=""},setCustomer:function(e){for(var t in e)if(e.hasOwnProperty(t)){var a="";t.length>0&&(a=t.substr(0,1).toUpperCase()+t.substr(1)),e[t]&&a&&(this.peopleInfo.Customer[a]=e[t])}},handleCurrentChange:function(e){this.searchParams.PageIndex=e,this.getData()},handleSizeChange:function(e){this.searchParams.PageSize=e,this.searchParams.PageIndex=1,this.getData()},handleSelectionChange:function(e){this.multipleSelection=e}},watch:{"peopleInfo.Customer.IdcardNum":function(e,t){e!==t&&18===e.length?this.getCustomer():this.clearPropleInfo()},"peopleInfo.Customer.Birthday":function(e,t){e!==t&&(this.age=s()().year()-s()(e).year())},"peopleInfo.Customer.VipFlag":function(e,t){e!==t&&(this.orderVipFlag=1===e)},orderVipFlag:function(e,t){e!==t&&(this.peopleInfo.Customer.VipFlag=e?1:0)}}},n=i,p=(a("8f5c"),a("2877")),m=Object(p["a"])(n,o,l,!1,null,null,null);m.options.__file="DDInfo.vue";t["default"]=m.exports}}]);