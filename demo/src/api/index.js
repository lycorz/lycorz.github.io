const api = {
	Login: '/api/Auth/RequestToken',//登录接口
	GetUserFuncItemList: '/api/Auth/GetUserFuncItemList', //获取菜单
	GetEnumValueList: '/api/XT/GetEnumValueList', //根据枚举类型名获取枚举值列表
  ///DD Start////////
	GetOrderType: '/api/DD/GetOrderType', //获取订单类型
	GetOrderReportType: '/api/DD/GetOrderReportType',//获取订单报告类型字典
	GetDeptListDD: '/api/DD/GetDeptList', //获取科室字典
	GetItemList: '/api/DD/GetItemList', //获取检查项目字典
  GetDeptListDD: '/api/DD/GetDeptList', //获取科室字典
	GetPackageListDD: '/api/DD/GetPackageList', //获取套餐列表
	GetPackage: '/api/DD/GetPackage', //获取套餐项目列表
	GetCustomer: '/api/DD/GetCustomer', //查询客户信息
	GetOrderList: '/api/DD/GetOrderList', //获取订单列表
	GetOrder: '/api/DD/GetOrder', //获取订单内容
	SubmitOrder: '/api/DD/SubmitOrder', //保存订单
	Replace: '/api/DD/Replace', //替检
	GiveUpOrder: '/api/DD/GiveUpOrder', //订单弃检
	DeleteOrder: '/api/DD/DeleteOrder', //订单删除
	GiveUpItem: '/api/DD/GiveUpItem', //订单项目弃检
	GetCustomerList: '/api/DD/GetCustomerList', //查询客户列表(分页)
	CancelSubmitOrder: '/api/DD/CancelSubmitOrder', //撤销提交订单
	GetPackageFilter: '/api/DD/GetPackageFilter', //按过滤（分组）获取套餐列表
	ImportCustomer: '/api/DD/ImportCustomer', //上传excel
	GetUnitList: '/api/DD/GetUnitList', //获取单位列表
  SaveUnit: '/api/DD/SaveUnit',//创建团检单位
	DeleteUnit: '/api/DD/DeleteUnit',//删除单位
	SaveCustomer: '/api/DD/SaveCustomer',//保存客户信息
	CreateGroupOrder: '/api/DD/CreateGroupOrder',//创建团检订单
	SubmitGroupOrder: '/api/DD/SubmitGroupOrder',//提交团检订单

  ///DD End////////////////
   /*          分检检查-分检结论录入  start         */
   PermissionDept:'/api/FJ/PermissionDept', //获取当前用户拥有权限的科室
   OrderList:'/api/FJ/OrderList',//获取订单/历史订单
   InspectionItem:'/api/FJ/InspectionItem',//获取报告项目
   InspectionItemDetail:"/api/FJ/InspectionItemDetail",//获取报告子项目
   SubResultTemplate:"/api/FJ/SubResultTemplate",//获取三级小结字典
   GetOrderChargeItemInspectionState:"/api/FJ/GetOrderChargeItemInspectionState",//获取订单已检查项目未检查项目
   SaveCommonSubItemResult:"/api/FJ/SaveCommonSubItemResult",//提交结论
   UpdateLisSubItemResultType:"/api/FJ/UpdateLisSubItemResultType",//更新检验结果类型
    /*          分检检查-分检结论录入  end         */
  InvoiceQuery: '/api/SF/InvoiceQuery', // 获取财务-展示列表
  ReturnInvoiceStateEnum: '/api/SF/ReturnInvoiceStateEnum', // 获取财务-发票管理-状态类型
  ReturnInvoiceDateEnum: '/api/SF/ReturnInvoiceDateEnum', // 获取财务-发票管理-时间类型
  InvoiceInitialization: '/api/SF/InvoiceInitialization',// 获取财务-发票管理-发票入库
	InvoiceInvalid: '/api/SF/InvoiceInvalid',// 获取财务-发票管理-发票作废
  MINInvoiceQuery: '/api/SF/MINInvoiceQuery', // 获取财务-发票管理-获取最小发票号
  InvoiceReopen: '/api/SF/InvoiceReopen', // 获取财务-发票管理-重开发票
  TradeTypeQueryByInvoiceNum: '/api/SF/TradeTypeQueryByInvoiceNum', // 获取财务-发票管理-获取缴费历史
  SaveCommonSubItemResult:"/api/FJ/SaveCommonSubItemResult",//保存一般检查
  GetCommonSubItemResultHistory:"/api/FJ/GetCommonSubItemResultHistory",//获取历史对比
  GetLisSubItemResult:"/api/FJ/GetLisSubItemResult",//获取所有lis检验结果
  /*          财务收费-交易管理  start         */
  TransactionQuery: '/api/SF/TransactionQuery', //交易管理-获取财务收退费客户列表
  ReturnTradeTypeEnum: '/api/SF/ReturnTradeTypeEnum', //交易管理-获取类型枚举
  ReturnPaidTypeEnum: '/api/SF/ReturnPaidTypeEnum', //交易管理-获取缴费方式枚举
  TransactionDetailQueryByPerson: '/api/SF/TransactionDetailQueryByPerson', //交易管理-个检根据tradeCode获取详情
  TransactionDetailQueryByUnit: '/api/SF/TransactionDetailQueryByUnit', //交易管理-个检根据tradeCode获取详情
  TransactionOK: '/api/SF/TransactionOK', //交易管理-缴费
  RefundTradeMessageQuery: '/api/SF/RefundTradeMessageQuery', //交易管理-根据订单号获取已开发票
  TradeLock: '/api/SF/TradeLock', //交易管理-标记交易是否正在处理
  /*          财务收费-交易管理  end         */

  /*          财务收费-历史查询  start         */
  ReturnTradeTypeEnum: '/api/SF/ReturnTradeTypeEnum',// 获取业务类型枚举
  ReturnTradeFormEnum: '/api/SF/ReturnTradeFormEnum',// 获取缴费形式枚举
  ReturnOperators:'/api/SF/ReturnOperators',  //获取系统人员列表（以后可能会过滤出财务角色？）
  TransactionDetailItemsQueryByUnit: '/api/SF/TransactionDetailItemsQueryByUnit',//团检个人交易明细查询
  TransactionDetailQueryByPerson: '/api/SF/TransactionDetailQueryByPerson',   //个检交易明细查询
  TradeHistoryDetailQuery: '/api/SF/TradeHistoryDetailQuery',//交易历史详情查询
  /*          财务收费-历史查询  end         */

  /*          总检审核  start         */
  GetSHUserLstByCondition: '/api/SH/GetSHUserLstByCondition', //获取审核用户列表信息 //待评估 0 //已评估 1 //评估中 2
  GetReviewRstType: '/api/SH/GetReviewRstType', //获取审核状态  =0 待审核  =1 已审核 =2审核中
  LockSHUser: '/api/SH/LockSHUser', //锁定评估用户
  UnLockSHUser: '/api/SH/UnLockSHUser',//解锁已经锁定的评估用户
  GetPgDiseaseAssessRstByOrderCode:'/api/PG/GetPgDiseaseAssessRstByOrderCode',//获取评估柱状图数据
  IsLockSHUserByOrderCode:'/api/SH/IsLockSHUserByOrderCode',
  IsHasShFinalRstDetailByOrderCode:'/api/SH/IsHasShFinalRstDetailByOrderCode', //判断是否已经生成总检医学建议
  LockPGUserOperatorNotHasGuidance:'/api/SH/LockPGUserOperatorNotHasGuidance',//锁定用户不重新生成总检建议
  LockSHUserOperatorHasGuidance:'/api/SH/LockSHUserOperatorHasGuidance',//锁定用户生成总检建议
  ZJGenerateMedicalGuidancesByOrderCode:'/api/SH/GenerateMedicalGuidancesByOrderCode', //重新生成医学指导建议

  RejectSHFinalRst :'/api/SH/RejectSHFinalRst',//驳回 通过订单号和操作者编码
  GetDicRejectReasons:'/api/SH/GetDicRejectReasons',  //获取驳回字典列表
  IsCanRejectOrReviewSHUserByOrderCodeAndOperatorCode:'/api/SH/IsCanRejectOrReviewSHUserByOrderCodeAndOperatorCode',  //通过订单编码OrderCode和操作人编码 OperatorCode判断是否可以驳回或通过审核
  PassSHFinalRst:'/api/SH/PassSHFinalRst',  //通过订单号和操作者编码 审核通过并生成报告
  InsertSHFinalRejectByOrderCodeCondition:'/api/SH/InsertSHFinalRejectByOrderCodeCondition',  //【驳回按钮先插入驳回记录再调用驳回接口】插入总检驳回记录 Condition为驳回原因 通过订单编码和原因

  //建议
  InsertIntoShFinalRstDetail:'/api/SH/InsertIntoShFinalRstDetail',  //插入总检建议明细
  UpdateShFinalRstDetail:'/api/SH/UpdateShFinalRstDetail',  //更新总检建议明细
  BatchUpdateShFinalRstDetail:'/api/SH/BatchUpdateShFinalRstDetail',  //批量更新总检建议明细
  BatchDeleteShFinalRstDetail:'/api/SH/BatchDeleteShFinalRstDetail',  //批量删除总检医学建议
  GetShFinalRstDetailsByOrderCode:'/api/SH/GetShFinalRstDetailsByOrderCode',  //通过订单获取全部明细
  GetLstShFinalRstDetailByLstAbnomalCode:'/api/SH/GetLstShFinalRstDetailByLstAbnomalCode',  //根据选择的异常进行筛选总检建议明细列表
  SHGetAKeySequenceByOrderCode:'/api/SH/GetAKeySequenceByOrderCode',  //总检一键排序通过订单编码
  DeleteLstShFinalRstDetailByOrderCode:'/api/SH/DeleteLstShFinalRstDetailByOrderCode', //通过订单编码删除总检全部明细
  GetShFinalRstDetailByInnerCode:'/api/SH/GetShFinalRstDetailByInnerCode',//【查看、编辑明细】获取总检建议明细



  /*          总检审核  end         */

  /*          主检评估  start         */
  IsHasSH:'/api/PG/IsHasSH',  //查看程序是否支持总检
	GetPGUserLstByCondition: '/api/PG/GetPGUserLstByCondition', //通过条件查询，获取评估用户列表信息，总数量
  GetAssessRstType: '/api/PG/GetAssessRstType', //获取评估状态枚举
  //异常汇总
  QuerySubtestExceptionItemSummaryByOrderCode: '/api/PG/QuerySubtestExceptionItemSummaryByOrderCode', //获取所有异常汇总
  GenerateAbnomalSummaryByOrderCode: '/api/PG/GenerateAbnomalSummaryByOrderCode', //重新生成异常汇总
  BatchDeleteFjRstAbnormal: '/api/PG/BatchDeleteFjRstAbnormal', //删除某条异常汇总
  GetAllRptItemByOrderCode: '/api/PG/GetAllRptItemByOrderCode', //获取该客户所有组合项目
  InsertIntoFjRstAbnormal: '/api/PG/InsertIntoFjRstAbnormal', //新增异常项目信息
  GetFjRstAbnormalByInnerCode: '/api/PG/GetFjRstAbnormalByInnerCode', //通过内部编码获取分检异常信息
  UpdateFjRstAbnormal: '/api/PG/UpdateFjRstAbnormal', //更新异常汇总
  ReviewSummaryEachExceptionByOrderCode: '/api/PG/ReviewSummaryEachExceptionByOrderCode',//查看历次对比
  GetFjRstAbnormalByOrderCodeAndTypeCode:'/api/PG/GetFjRstAbnormalByOrderCodeAndTypeCode',//查看某项异常汇总
  GetPaperFjRstAbnormalByOrderCodeAndType:'/api/PG/GetPaperFjRstAbnormalByOrderCodeAndType',//查看问卷异常汇总
  GetAllAbnomals:'/api/PG/GetAllAbnomals',//获取异常汇总字典
  GetAbnomalsByCondition:'/api/PG/GetAbnomalsByCondition',//根据条件获取异常汇总字典

  //医学指导建议
  GetLstPgMasterRstDetailByOrderCode: '/api/PG/GetLstPgMasterRstDetailByOrderCode',//通过订单编码获取主检建议明细集合
  GenerateMedicalGuidancesByOrderCode: '/api/PG/GenerateMedicalGuidancesByOrderCode',//重新生成医学指导意见
  BathchDeletePgMasterRstDetail: '/api/PG/BathchDeletePgMasterRstDetail',//删除医学指导意见
  GetAllMedicalAdviceLst: '/api/PG/GetAllMedicalAdviceLst',//获取医学建议字典全部内容
  InsertPGMasterRstDetail: '/api/PG/InsertPGMasterRstDetail',//插入医学指导建议
  GetAbonomalSourceByAdvCode: '/api/PG/GetAbonomalSourceByAdvCode',//根据条件查看项目
  GetPgMasterRstDetailByInnerCode: '/api/PG/GetPgMasterRstDetailByInnerCode',//根据条件查看建议
  UpdatePGMasterRstDetail: '/api/PG/UpdatePGMasterRstDetail',//更新建议
  GetAKeySequenceByOrderCode: '/api/PG/GetAKeySequenceByOrderCode',//一键排序
  BatchUpdatePgMasterRstDetail: '/api/PG/BatchUpdatePgMasterRstDetail',//提交建议
  getPriorityType: '/api/PG/getPriorityType',//获取权重枚举

  //主检评估业务操作
  LockPGUser: '/api/PG/LockPGUser',//锁定待评估用户
  UnLockPGUser: '/api/PG/UnLockPGUser',//解锁已经锁定的评估用户
  IsLockPGUserByOrderCode: '/api/PG/IsLockPGUserByOrderCode', //判断订单是否被锁定
  LockPGUserOperatorHasGuidance: '/api/PG/LockPGUserOperatorHasGuidance',//锁定，重新生成指导建议
  LockPGUserOperatorNotHasGuidance: '/api/PG/LockPGUserOperatorNotHasGuidance', //锁定，不重新生成指导建议
  IsHasPgMasterRstDetailByOrderCode: '/api/PG/IsHasPgMasterRstDetailByOrderCode',//通过订单号查询是否已经含有医学指导建议
  GenerateMedicalGuidancesByOrderCode: '/api/PG/GenerateMedicalGuidancesByOrderCode',//重新生成医学指导建议
  AdoptionAssessorPGUser: '/api/PG/AdoptionAssessorPGUser',//评估通过
  RevokePGUser: '/api/PG/RevokePGUser', //撤回
  GetCrisisFjRstAbnormalsByOrderCode:'/api/PG/GetCrisisFjRstAbnormalsByOrderCode',  //根据订单号获取危急值


  //主检子页面业务操作
  GetDicRptItemType: '/api/PG/GetDicRptItemType', //查看下拉列表检查类型。
  GetDomainPgDiseaseAssessRstByTypeByOrderCodeAndCondition: '/api/PG/GetDomainPgDiseaseAssessRstByTypeByOrderCodeAndCondition',//慢病及风险评估结果  Condition 为 评估类型
  GetFjNoLisItemSummaryInfoByOrderCodeAndCondition: '/api/PG/GetFjNoLisItemSummaryInfoByOrderCodeAndCondition',// 查看非分检检验项目结论 =H 异常（阳性）//=N 正常（阴性）
  GetFjLisItemSummaryInfoByOrderCodeAndCondition: '/api/PG/GetFjLisItemSummaryInfoByOrderCodeAndCondition',//查看分检检验项目结论, condition 为空默认查询全部,，否则为只查询异常项目  =H 偏高=L 偏低= N 正常
  GetBase64StringByImagePath: '/api/PG/GetBase64StringByImagePath',// 根据图片路径获取Base64流
  GetPhysicalEexamQuestionPaperByOrderCode:'/api/PG/GetPhysicalEexamQuestionPaperByOrderCode',  //获取体检问卷信息。
  GetLastShFinalRejectRecordByOrderCode:'/api/PG/GetLastShFinalRejectRecordByOrderCode',  //查看最后一次驳回原因
  GetLstShFinalRejectRecordByOrderCode:'/api/PG/GetLstShFinalRejectRecordByOrderCode',  //查看所有驳回原因
  GetDomainPgDiseaseAssessRstByOrderCode:'/api/PG/GetDomainPgDiseaseAssessRstByOrderCode', //【获取评估结果通过订单编码】慢病及风险评估结果
  GetDiseaseRickLevelByDiseaseCode:'/api/PG/GetDiseaseRickLevelByDiseaseCode',  //【获取慢病评估等级字典】通过慢病编码获取疾病等级
  DomainDicDiseaseType:'/api/PG/DomainDicDiseaseType',  //【获取评估病名称】通过ByDiseaseCode获取评估病名称


  //主检弹出层
  GetPgDiseaseAssessRst: '/api/PG/GetPgDiseaseAssessRst',// 获取单条评估信息
  GetFjRptSubItemRstNoLisByInnerCode:'/api/PG/GetFjRptSubItemRstNoLisByInnerCode',//单条分检非LIS项目信息。
  GetFjRptSubItemRstLisByInnerCode:'/api/PG/GetFjRptSubItemRstLisByInnerCode',  //获取单条分检LIS项目信息。
  UpdateFjRptSubItemRisNoLis: '/api/PG/UpdateFjRptSubItemRisNoLis',// 更新分检非LIS项目结果
  UpdateFjRptSubItemRisLis: '/api/PG/UpdateFjRptSubItemRisLis',// 更新分检LIS项目
  UpdatePgDiseaseAssessRst: '/api/PG/UpdatePgDiseaseAssessRst',// 更新评估信息
	/*          主检评估  end         */




	// 报告
	ReportQuery: '/api/BG/ReportQuery',//个人体检报告查询
	ReturnTakeTypeEnum: '/api/BG/ReturnTakeTypeEnum',//获取领取方式
	ReturnReportTimeTypeEnum: '/api/BG/ReturnReportTimeTypeEnum',//获取报告时间类型
	ReturnSendStatusEnum: '/api/BG/ReturnSendStatusEnum',//获取发送状态
  ReportPrint: '/api/BG/ReportPrint',//个人体检报告打印/预览
  MakeReport:'/api/BG/MakeReport',//生成体检报告


























  /* 系统管理/字典 */
  GetOrderItemList:'/api/DIC/GetOrderItemList', //获取开单项目列表
  GetAllOrderItemList:'/api/DIC/GetAllOrderItemList',//获取所有的开单项目列表
  GetOrderItem:'/api/DIC/GetOrderItem',  //获取单个开单项目
  SaveOrderItem:'/api/DIC/SaveOrderItem', //保存单个开单项目
  BatchSaveOrderItem:'/api/DIC/BatchSaveOrderItem', //批量保存开单项目
  BatchDeleteOrderItem:'/api/DIC/BatchDeleteOrderItem', //批量删除开单项目
  fGetOrderItemKeywordsda:'/api/DIC/GetOrderItemKeywords', //获取用于报告回传时判断是否该项目已全部回传结论的关键词
  SaveOrderItemKeywords:'/api/DIC/SaveOrderItemKeywords', //保存用于报告回传是判断是否该项目已全部回传结论的关键词
  GetOrderItemIfsDic:'/api/DIC/GetOrderItemIfsDic',  // 获取开单项目外部对接信息
  SaveOrderItemIfsDic:'/api/DIC/SaveOrderItemIfsDic',   //保存开单项目外部对接信息
  GetDicRptSubItem:'/api/DIC/GetDicRptSubItem', //获取一个开单组合项目对应的所有报告子项目集合
  SaveDicRptSubItem:'/api/DIC/SaveDicRptSubItem',   //保存一个开单组合项目对应的所有报告子项目关系


  GetDeptList:'/api/DIC/GetDeptList',    //  获取科室列表接口
  GetDept:'/api/DIC/GetDept',   //获取一条科室记录
  SaveDept:'/api/DIC/SaveDept',   // 保存一条科室记录的接口
  BatchDeleteDept:'/api/DIC/BatchDeleteDept',    //批量删除科室记录接口


  GetPackage:'/api/DIC/GetPackage',   //获取一条套餐记录
  GetPackageList:'/api/DIC/GetPackageList',   //  获取套餐字典列表
  SavePackage:'/api/DIC/SavePackage',  //  保存一条套餐记录（连同套餐所含项目一并保存）
  BatchSavePackage:'/api/DIC/BatchSavePackage',    //  批量保存套餐记录（连同套餐所含项目一并保存）
  BatchDeletePackage:'/api/DIC/BatchDeletePackage',   //  批量删除套餐记录（连同套餐所含项目一并删除）


  GetRptItemList:'/api/DIC/GetRptItemList',  //获取报告组合项目列表
  GetAllRptItemList:'/api/DIC/GetAllRptItemList', //获取所有报告组合项目列表
  GetRptItem:'/api/DIC/GetRptItem', //获取单个报告组合项目数据
  SaveRptItem:'/api/DIC/SaveRptItem',//保存单个报告组合项目（连同包含的报告子项目集合一起保存）
  UpdateItemVsSubItem:'/api/DIC/UpdateItemVsSubItem',  //更新报告组合项目与报告子项目的关系
  GetRptSubItem:'/api/DIC/GetRptSubItem', //获取单个报告子项目接口
  GetRptSubItemList:'/api/DIC/GetRptSubItemList',  //获取报告子项目列表
  SaveRptSubItem:'/api/DIC/SaveRptSubItem',   //保存单个报告子项目
  GetRptSubItemVs3rd:'/api/DIC/GetRptSubItemVs3rd',   //获取某个开单子项目的外部代码集合
  SaveRptSubItemVs3rd:'/api/DIC/SaveRptSubItemVs3rd',   //保存报告子项目的外部代码
  GetAllRptSubItemList:'/api/DIC/GetAllRptSubItemList',   //获取所有报告子项目


  GetRptSubItemRstTmplList:'/api/DIC/GetRptSubItemRstTmplList',  //获取物理检查所见及小结模板列表接口
  GetRptSubItemRstTmpl:'/api/DIC/GetRptSubItemRstTmpl',  //获取一条物理检查所见及小结模板接口
  SaveRptSubItemRstTmpl:'/api/DIC/SaveRptSubItemRstTmpl',   //保存一条物理检查所见及小结模板接口
  BatchDeleteRptSubItemRstTmpl:'/api/DIC/BatchDeleteRptSubItemRstTmpl',  //批量删除物理检查所见及小结模板接口


  GetAbnormal:'/api/DIC/GetAbnormal', //根据异常编号获取一条异常接口
  GetAbnormalList:'/api/DIC/GetAbnormalList', //获取异常列表接口
  SaveAbnormal:'/api/DIC/SaveAbnormal',   //保存一条异常接口
  BatchDeleteAbnormal:'/api/DIC/BatchDeleteAbnormal',    //批量删除异常接口

  //检查异常规则
  GetAbnormalRuleLisList:'/api/DIC/GetAbnormalRuleLisList',   //根据异常编号获取某个异常相关的检验项目发现规则
  GetRuleLisByRuleCode:'/api/DIC/GetRuleLisByRuleCode',     //根据ruleCode获取一个检验项目发现规则
  SaveAbnormalRuleLis:'/api/DIC/SaveAbnormalRuleLis',   //保存某个异常的一条检验项目发现规则
  BatchDeleteAbnormalRuleLis:'/api/DIC.BatchDeleteAbnormalRuleLis', //批量删除某个异常的检验项目发现规则

  //非检验异常发现规则
  GetAbnormalRuleNotLisList:'/api/DIC/GetAbnormalRuleNotLisList',   //根据异常编号获取某个异常相关的非检验项目发现规则
  GetAbnormalRuleNotLisByRuleCode:'/api/DIC/GetAbnormalRuleNotLisByRuleCode',   //根据ruleCode获取一个非检验项目发现规则
  SaveAbnormalRuleNotLis:'/api/DIC/SaveAbnormalRuleNotLis',   //保存某个异常的一条非检验项目发现规则
  BatchDeleteAbnormalRuleNotLis:'/api/DIC/BatchDeleteAbnormalRuleNotLis',   //批量删除某个异常的非检验项目发现规则

  //问卷异常发现规则
  GetAbnormalRulePaperByRuleCode:'/api/DIC/GetAbnormalRulePaperByRuleCode',   //根据问卷Code获取一条问卷发现规则
  GetAllQuestion:'/api/DIC/GetAllQuestion', //获取所有的问题，返回json字符串
  GetAllAnswerByQuesNo:'/api/DIC/GetAllAnswerByQuesNo', //根据问题编号获取所有的答案，返回json字符串
  GetAbnormalRulePaperList:'/api/DIC/GetAbnormalRulePaperList',   //根据异常编号获取某个异常相关的问卷发现规则
  SaveAbnormalRulePaper:'/api/DIC/SaveAbnormalRulePaper',   //保存某个异常的一条问卷发现规则
  BatchDeleteAbnormalRulePaper:'/api/DIC/BatchDeleteAbnormalRulePaper', //批量删除某个异常的问卷发现规则



}

export default api;
