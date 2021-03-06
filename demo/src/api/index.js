const api = {
	Login: '/api/Auth/RequestToken',//登录接口
	GetUserFuncItemList: '/api/Auth/GetUserFuncItemList', //获取菜单
	GetEnumValueList: '/api/XT/GetEnumValueList', //根据枚举类型名获取枚举值列表
  ///DD Start////////
	GetOrderType: '/api/DD/GetOrderType', //获取订单类型
	GetOrderReportType: '/api/DD/GetOrderReportType',//获取订单报告类型字典
	GetOrderSpecialReportType: '/api/DD/GetOrderSpecialReportType',//获取订单特殊报告类型字典
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
	GetPackageFilter: '/api/DD/GetPackageFilter', //按过滤（分组）获取套餐列表
	ImportCustomer: '/api/DD/ImportCustomer', //上传excel
	GetUnitList: '/api/DD/GetUnitList', //获取单位列表
  SaveUnit: '/api/DD/SaveUnit',//创建团检单位
	DeleteUnit: '/api/DD/DeleteUnit',//删除单位
	SaveCustomer: '/api/DD/SaveCustomer',//保存客户信息
	CreateGroupOrder: '/api/DD/CreateGroupOrder',//创建团检订单
	SubmitGroupOrder: '/api/DD/SubmitGroupOrder',//提交团检订单
  GetGroupOrder: '/api/DD/GetGroupOrder',//获取团检订单详情

  GetGroupOrderList:'/api/DD/GetGroupOrderList',//查询团检订单列表（团检订单管理）
  BatchDiscount:'/api/DD/BatchDiscount',  //订单统一打折（团检订单统一打折）
  GrpPayOrder:'/api/DD/GrpPayOrder',  //团检缴费申请
  GetGrpPayOrderList:'/api/DD/GetGrpPayOrderList', //获取可撤销团检缴费申请
  CancelGrpPayOrder:'/api/DD/CancelGrpPayOrder',//撤销团检缴费申请
  GetGrpPaidOrderList:'/api/DD/GetGrpPaidOrderList', //获取可退费团检缴费申请单
  GrpOrderPayback:'/api/DD/GrpOrderPayback',//团检退费申请
  GetGrpOrderPaybackList:'/api/DD/GetGrpOrderPaybackList',//获取可撤销团检 退费申请列表
  CancelGrpOrderPayback:'/api/DD/CancelGrpOrderPayback',//撤销团检退费申请
  GetOrderLisBar:'/api/DD/GetOrderLisBar',//根据定订编号获取订单下的条码
  EndGroupOrder:'/api/DD/EndGroupOrder',    //标记团检订单结束
  DeleteGroupOrder:'/api/DD/DeleteGroupOrder',    //删除团检订单
  SignGroupOrderPayStatus:'/api/DD/SignGroupOrderPayStatus',    //标记团检订单缴费
  GetOrderListByGrp:'/api/DD/GetOrderListByGrp',  //获取团检订单下的个人订单列表(详情)
  GetOrderListByPay:'/api/DD/GetOrderListByPay',    //获取团检订单下需要缴费的人员订单列表
  ExportPaidDetail:'/api/DD/ExportPaidDetail',    //导出缴费明细
  ExportPersonDetail:'/api/DD/ExportPersonDetail',    //导出人员明细
  GetDepts:'/api/DD/GetDepts',    //获取部门列表
  GetTeams:'/api/DD/GetTeams',    //获取组别列表
  ///DD End////////////////
   /*          分检检查-分检结论录入  start         */
  PermissionDept: '/api/FJ/PermissionDept', //获取当前用户拥有权限的科室
  OrderList: '/api/FJ/OrderList',//获取订单/历史订单
  InspectionItem: '/api/FJ/InspectionItem',//获取报告项目
  InspectionItemDetail: "/api/FJ/InspectionItemDetail",//获取报告子项目
  SubResultTemplate: "/api/FJ/SubResultTemplate",//获取三级小结字典
  GetOrderChargeItemInspectionState: "/api/FJ/GetOrderChargeItemInspectionState",//获取订单已检查项目未检查项目
  SaveCommonSubItemResult: "/api/FJ/SaveCommonSubItemResult",//提交结论
  UpdateLisSubItemResultType: "/api/FJ/UpdateLisSubItemResultType",//更新检验结果类型
  SaveVisitConent: "/api/FJ/SaveVisitConent",//提交回访
  GetCommonResult: "/api/FJ/GetCommonResult",//获取一般检查结果
  GetLisResult: "/api/FJ/GetLisResult",//获取实验室检查结果
  ResAuxiliaryResult: "/api/FJ/ResAuxiliaryResult",//获取辅助检查结果
  HiddenLisSubItemResult: "/api/FJ/HiddenLisSubItemResult",//隐藏检验子项目
  ShowRptItemResults: "/api/FJ/ShowRptItemResults",//显示所有隐藏项目
  GetOrderDicRptItem: "/api/FJ/GetOrderDicRptItem",//获取报告项目
  GetDicOrderItems: "/api/FJ/GetDicOrderItems",//获取开单项目
  SaveRptSubItem4RptItem: "/api/FJ/SaveRptSubItem4RptItem",//提交报告项目
  SaveRptSubItem4DicOrderItem: "/api/FJ/SaveRptSubItem4DicOrderItem",//提交开单项目
  GetFZJCItem: "/api/FJ/GetFZJCItem",//初始化，获取辅助检查结果
  SaveFZJCItemResult: "/api/FJ/SaveFZJCItemResult",//保存辅助检查结果
  GetFZJCItemHistoryResult: "/api/FJ/GetFZJCItemHistoryResult",//获取辅助检查结果历史

    /*          分检检查-分检结论录入  end         */
  DeleCommonSubItemResult: '/api/FJ/DeleCommonSubItemResult',//删除一般检查图片
  DeleCommonSubItemResults: '/api/FJ/DeleCommonSubItemResults',//删除小结
  InvoiceQuery: '/api/SF/InvoiceQuery', // 获取财务-展示列表
  ReturnInvoiceStateEnum: '/api/SF/ReturnInvoiceStateEnum', // 获取财务-发票管理-状态类型
  ReturnInvoiceDateEnum: '/api/SF/ReturnInvoiceDateEnum', // 获取财务-发票管理-时间类型
  InvoiceInitialization: '/api/SF/InvoiceInitialization',// 获取财务-发票管理-发票入库
	InvoiceInvalid: '/api/SF/InvoiceInvalid',// 获取财务-发票管理-发票作废
  MINInvoiceQuery: '/api/SF/MINInvoiceQuery', // 获取财务-发票管理-获取最小发票号
  InvoiceReopen: '/api/SF/InvoiceReopen', // 获取财务-发票管理-重开发票
  TradeTypeQueryByInvoiceNum: '/api/SF/TradeTypeQueryByInvoiceNum', // 获取财务-发票管理-获取缴费历史
  SaveCommonSubItemResult: "/api/FJ/SaveCommonSubItemResult",//保存一般检查
  GetCommonSubItemResultHistory: "/api/FJ/GetCommonSubItemResultHistory",//获取历史对比
  GetLisSubItemResult: "/api/FJ/GetLisSubItemResult",//获取所有lis检验结果
  GetCrisis: "/api/FJ/GetCrisis",//获取危急值用户列表
  UpdateSmsContent: "/api/FJ/UpdateSmsContent",//修改短信内容
  SaveOrUpdateCommonSubItemResult: "/api/FJ/SaveOrUpdateCommonSubItemResult",//修改订单后保存
  SendCrisisSms: "/api/FJ/SendCrisisSms",//发送短信
  /*          财务收费-交易管理  start         */
  TransactionQuery: '/api/SF/TransactionQuery', //交易管理-获取财务收退费客户列表
  ReturnTradeTypeEnum: '/api/SF/ReturnTradeTypeEnum', //交易管理-获取类型枚举
  ReturnPaidTypeEnum: '/api/SF/ReturnPaidTypeEnum', //交易管理-获取缴费方式枚举
  TransactionDetailQueryByPerson: '/api/SF/TransactionDetailQueryByPerson', //交易管理-个检根据tradeCode获取详情
  TransactionDetailQueryByUnit: '/api/SF/TransactionDetailQueryByUnit', //交易管理-个检根据tradeCode获取详情
  TransactionOK: '/api/SF/TransactionOK', //交易管理-缴费
  RefundTradeMessageQuery: '/api/SF/RefundTradeMessageQuery', //交易管理-根据订单号获取已开发票
  TradeLock: '/api/SF/TradeLock', //交易管理-标记交易是否正在处理
  InvoicePrintMod: '/api/SF/InvoicePrintMod',//打印发票
  InvoicePrint: '/api/SF/InvoicePrint',//打印发票，发票入库接口
  /*          财务收费-交易管理  end         */

  /*          财务收费-历史查询  start         */
  ReturnTradeTypeEnum: '/api/SF/ReturnTradeTypeEnum',// 获取业务类型枚举
  ReturnTradeFormEnum: '/api/SF/ReturnTradeFormEnum',// 获取缴费形式枚举
  ReturnOperators: '/api/SF/ReturnOperators',  //获取系统人员列表（以后可能会过滤出财务角色？）
  TransactionDetailItemsQueryByUnit: '/api/SF/TransactionDetailItemsQueryByUnit',//团检个人交易明细查询
  TransactionDetailQueryByPerson: '/api/SF/TransactionDetailQueryByPerson',   //个检交易明细查询
  TradeHistoryDetailQuery: '/api/SF/TradeHistoryDetailQuery',//交易历史详情查询
  ExportSFReport: '/api/SF/ExportSFReport',    //导出财务收费统计报表
  ExportSFReportDetail: '/api/SF/ExportSFReportDetail',    //导出财务收费明细报表
  /*          财务收费-历史查询  end         */

  /*          总检审核  start         */
  GetSHUserLstByCondition: '/api/SH/GetSHUserLstByCondition', //获取审核用户列表信息 //待评估 0 //已评估 1 //评估中 2
  GetReviewRstType: '/api/SH/GetReviewRstType', //获取审核状态  =0 待审核  =1 已审核 =2审核中
  LockSHUser: '/api/SH/LockSHUser', //锁定评估用户
  UnLockSHUser: '/api/SH/UnLockSHUser',//解锁已经锁定的评估用户
  GetPgDiseaseAssessRstByOrderCode: '/api/PG/GetPgDiseaseAssessRstByOrderCode',//获取评估柱状图数据
  IsLockSHUserByOrderCode: '/api/SH/IsLockSHUserByOrderCode',
  IsHasShFinalRstDetailByOrderCode: '/api/SH/IsHasShFinalRstDetailByOrderCode', //判断是否已经生成总检医学建议
  LockPGUserOperatorNotHasGuidance: '/api/SH/LockPGUserOperatorNotHasGuidance',//锁定用户不重新生成总检建议
  LockSHUserOperatorHasGuidance: '/api/SH/LockSHUserOperatorHasGuidance',//锁定用户生成总检建议
  ZJGenerateMedicalGuidancesByOrderCode: '/api/SH/GenerateMedicalGuidancesByOrderCode', //重新生成医学指导建议

  RejectSHFinalRst: '/api/SH/RejectSHFinalRst',//驳回 通过订单号和操作者编码
  GetDicRejectReasons: '/api/SH/GetDicRejectReasons',  //获取驳回字典列表
  IsCanRejectOrReviewSHUserByOrderCodeAndOperatorCode: '/api/SH/IsCanRejectOrReviewSHUserByOrderCodeAndOperatorCode',  //通过订单编码OrderCode和操作人编码 OperatorCode判断是否可以驳回或通过审核
  PassSHFinalRst: '/api/SH/PassSHFinalRst',  //通过订单号和操作者编码 审核通过并生成报告
  InsertSHFinalRejectByOrderCodeCondition: '/api/SH/InsertSHFinalRejectByOrderCodeCondition',  //【驳回按钮先插入驳回记录再调用驳回接口】插入总检驳回记录 Condition为驳回原因 通过订单编码和原因


  //建议
  InsertIntoShFinalRstDetail: '/api/SH/InsertIntoShFinalRstDetail',  //插入总检建议明细
  UpdateShFinalRstDetail: '/api/SH/UpdateShFinalRstDetail',  //更新总检建议明细
  BatchUpdateShFinalRstDetail: '/api/SH/BatchUpdateShFinalRstDetail',  //批量更新总检建议明细
  BatchDeleteShFinalRstDetail: '/api/SH/BatchDeleteShFinalRstDetail',  //批量删除总检医学建议
  GetShFinalRstDetailsByOrderCode: '/api/SH/GetShFinalRstDetailsByOrderCode',  //通过订单获取全部明细
  GetLstShFinalRstDetailByLstAbnomalCode: '/api/SH/GetLstShFinalRstDetailByLstAbnomalCode',  //根据选择的异常进行筛选总检建议明细列表
  SHGetAKeySequenceByOrderCode: '/api/SH/GetAKeySequenceByOrderCode',  //总检一键排序通过订单编码
  DeleteLstShFinalRstDetailByOrderCode: '/api/SH/DeleteLstShFinalRstDetailByOrderCode', //通过订单编码删除总检全部明细
  GetShFinalRstDetailByInnerCode: '/api/SH/GetShFinalRstDetailByInnerCode',//【查看、编辑明细】获取总检建议明细
  GenerateMedicalGuidancesByOrderCode: "/api/SH/GenerateMedicalGuidancesByOrderCode",//重新生成建议
  InsertIntoShFinalRstDetail: "/api/SH/InsertIntoShFinalRstDetail",//添加建议
  GetShFinalRstDetailsByOrderCode: "/api/SH/GetShFinalRstDetailsByOrderCode",//通过订单获取订单建议全部明细


  /*          总检审核  end         */

  /*          主检评估  start         */
  IsHasSH: '/api/PG/IsHasSH',  //查看程序是否支持总检
	GetPGUserLstByCondition: '/api/PG/GetPGUserLstByCondition', //通过条件查询，获取评估用户列表信息，总数量
  GetAssessRstType: '/api/PG/GetAssessRstType', //获取评估状态枚举
  GetMedicalAdviceByCondition:'api/PG/GetMedicalAdviceByCondition', //获取此订单筛查建议
  //异常汇总
  QuerySubtestExceptionItemSummaryByOrderCode: '/api/PG/QuerySubtestExceptionItemSummaryByOrderCode', //获取所有异常汇总
  GenerateAbnomalSummaryByOrderCode: '/api/PG/GenerateAbnomalSummaryByOrderCode', //重新生成异常汇总
  BatchDeleteFjRstAbnormal: '/api/PG/BatchDeleteFjRstAbnormal', //删除某条异常汇总
  GetAllRptItemByOrderCode: '/api/PG/GetAllRptItemByOrderCode', //获取该客户所有组合项目
  InsertIntoFjRstAbnormal: '/api/PG/InsertIntoFjRstAbnormal', //新增异常项目信息
  GetFjRstAbnormalByInnerCode: '/api/PG/GetFjRstAbnormalByInnerCode', //通过内部编码获取分检异常信息
  UpdateFjRstAbnormal: '/api/PG/UpdateFjRstAbnormal', //更新异常汇总
  ReviewSummaryEachExceptionByOrderCode: '/api/PG/ReviewSummaryEachExceptionByOrderCode',//查看历次对比
  GetFjRstAbnormalByOrderCodeAndTypeCode: '/api/PG/GetFjRstAbnormalByOrderCodeAndTypeCode',//查看某项异常汇总
  GetPaperFjRstAbnormalByOrderCodeAndType: '/api/PG/GetPaperFjRstAbnormalByOrderCodeAndType',//查看问卷异常汇总
  GetAllAbnomals: '/api/PG/GetAllAbnomals',//获取异常汇总字典
  GetAbnomalsByCondition: '/api/PG/GetAbnomalsByCondition',//根据条件获取异常汇总字典

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
  GetCrisisFjRstAbnormalsByOrderCode: '/api/PG/GetCrisisFjRstAbnormalsByOrderCode',  //根据订单号获取危急值


  //主检子页面业务操作
  GetDicRptItemType: '/api/PG/GetDicRptItemType', //查看下拉列表检查类型。
  GetDomainPgDiseaseAssessRstByTypeByOrderCodeAndCondition: '/api/PG/GetDomainPgDiseaseAssessRstByTypeByOrderCodeAndCondition',//慢病及风险评估结果  Condition 为 评估类型
  GetFjNoLisItemSummaryInfoByOrderCodeAndCondition: '/api/PG/GetFjNoLisItemSummaryInfoByOrderCodeAndCondition',// 查看非分检检验项目结论 =H 异常（阳性）//=N 正常（阴性）
  GetFjLisItemSummaryInfoByOrderCodeAndCondition: '/api/PG/GetFjLisItemSummaryInfoByOrderCodeAndCondition',//查看分检检验项目结论, condition 为空默认查询全部,，否则为只查询异常项目  =H 偏高=L 偏低= N 正常
  GetBase64StringByImagePath: '/api/PG/GetBase64StringByImagePath',// 根据图片路径获取Base64流
  GetPhysicalEexamQuestionPaperByOrderCode: '/api/PG/GetPhysicalEexamQuestionPaperByOrderCode',  //获取体检问卷信息。
  GetLastShFinalRejectRecordByOrderCode: '/api/PG/GetLastShFinalRejectRecordByOrderCode',  //查看最后一次驳回原因
  GetLstShFinalRejectRecordByOrderCode: '/api/PG/GetLstShFinalRejectRecordByOrderCode',  //查看所有驳回原因
  GetDomainPgDiseaseAssessRstByOrderCode: '/api/PG/GetDomainPgDiseaseAssessRstByOrderCode', //【获取评估结果通过订单编码】慢病及风险评估结果
  GetDiseaseRickLevelByDiseaseCode: '/api/PG/GetDiseaseRickLevelByDiseaseCode',  //【获取慢病评估等级字典】通过慢病编码获取疾病等级
  DomainDicDiseaseType: '/api/PG/DomainDicDiseaseType',  //【获取评估病名称】通过ByDiseaseCode获取评估病名称


  //主检弹出层
  GetPgDiseaseAssessRst: '/api/PG/GetPgDiseaseAssessRst',// 获取单条评估信息
  GetFjRptSubItemRstNoLisByInnerCode: '/api/PG/GetFjRptSubItemRstNoLisByInnerCode',//单条分检非LIS项目信息。
  GetFjRptSubItemRstLisByInnerCode: '/api/PG/GetFjRptSubItemRstLisByInnerCode',  //获取单条分检LIS项目信息。
  UpdateFjRptSubItemRisNoLis: '/api/PG/UpdateFjRptSubItemRisNoLis',// 更新分检非LIS项目结果
  UpdateFjRptSubItemRisLis: '/api/PG/UpdateFjRptSubItemRisLis',// 更新分检LIS项目
  UpdatePgDiseaseAssessRst: '/api/PG/UpdatePgDiseaseAssessRst',// 更新评估信息
	/*          主检评估  end         */




	// 报告
	ReportQuery: '/api/BG/ReportQuery',//个人体检报告查询
	ReportPrint: '/api/BG/ReportPrint',//个人体检报告打印
	ReportPreview: '/api/BG/ReportPreview',//个人体检报告预览
	ReportPrintSuccess: '/api/BG/ReportPrintSuccess',//报告打印成功
  MakeReportByReturnValue: '/api/BG/MakeReportByReturnValue',//生成体检报告(有返回值)
  ReportTake: '/api/BG/ReportTake',//报告领取
  SendSmsModByReportQuery: '/api/BG/SendSmsModByReportQuery',//报告管理界面的发送短信接口
	SendSmsModBySMSQuery: '/api/BG/SendSmsModBySMSQuery',//短信管理界面的发送短信接口
  MakeReport: '/api/BG/MakeReport',//生成体检报告
  ReturnSMSType: '/api/BG/ReturnSMSType',//获取所有短信类型
  SMSSendQuery: '/api/BG/SMSSendQuery',//短信查询
  UnitReportQuery: '/api/BG/UnitReportQuery',//团检报告查询
  MarkUnitReport: '/api/BG/MarkUnitReport',//团检报告生成

  //辅助功能
  GetProgressQueryInfo: "/api/FZGN/GetProgressQueryInfo",//【查询】获取进度查询信息
  GetProgressQueryInfoByCardNum: "/api/FZGN/GetProgressQueryInfoByCardNum",//【查询】根据卡号获取进度查询信息
  GetOrderStatusInfo: "/api/FZGN/GetOrderStatusInfo",//【状态下拉列表】获取订单状态列表信息
  GetDdOrderInfo: "/api/FZGN/GetDdOrderInfo",//获取订单详情
  GetOrderStatusRollBackEnum: '/api/FZGN/GetOrderStatusRollBackEnum',//【允许回退状态列表】获取订单回退状态枚举
  ChangeOrderStatusProgressByOrderCodeAndCondition: '/api/FZGN/ChangeOrderStatusProgressByOrderCodeAndCondition',//【变更状态】 OrderCode订单编码、Condition回退状态，OperatorCode（需记录回退人编码） 必填
  GetOrderStatusTimeInfo: '/api/FZGN/GetOrderStatusTimeInfo',//获取订单状态
  BeginCheckByCardNum: '/api/FZGN/BeginCheckByCardNum',//到检























  /* 系统管理/字典 */
  GetOrderItemList: '/api/DIC/GetOrderItemList', //获取开单项目列表
  GetAllOrderItemList: '/api/DIC/GetAllOrderItemList',//获取所有的开单项目列表
  GetOrderItem: '/api/DIC/GetOrderItem',  //获取单个开单项目
  SaveOrderItem: '/api/DIC/SaveOrderItem', //保存单个开单项目
  BatchSaveOrderItem: '/api/DIC/BatchSaveOrderItem', //批量保存开单项目
  BatchDeleteOrderItem: '/api/DIC/BatchDeleteOrderItem', //批量删除开单项目
  GetOrderItemKeywords: '/api/DIC/GetOrderItemKeywords', //获取用于报告回传时判断是否该项目已全部回传结论的关键词
  SaveOrderItemKeywords: '/api/DIC/SaveOrderItemKeywords', //保存用于报告回传是判断是否该项目已全部回传结论的关键词
  GetOrderItemIfsDic: '/api/DIC/GetOrderItemIfsDic',  // 获取开单项目外部对接信息
  SaveOrderItemIfsDic: '/api/DIC/SaveOrderItemIfsDic',   //保存开单项目外部对接信息
  GetDicRptSubItem: '/api/DIC/GetDicRptSubItem', //获取一个开单组合项目对应的所有报告子项目集合
  SaveDicRptSubItem: '/api/DIC/SaveDicRptSubItem',   //保存一个开单组合项目对应的所有报告子项目关系
  //GetAllDicRptSubItem:'/api/DIC/GetAllDicRptSubItem', //获取所有报告子项目集合

  GetDeptList: '/api/DIC/GetDeptList',    //  获取科室列表接口
  GetAllDeptList: '/api/DIC/GetAllDeptList', //获取所有科室list
  GetListByDistributionType: '/api/DIC/GetListByDistributionType',//分成类型调用
  GetDept: '/api/DIC/GetDept',   //获取一条科室记录
  SaveDept: '/api/DIC/SaveDept',   // 保存一条科室记录的接口
  BatchDeleteDept: '/api/DIC/BatchDeleteDept',    //批量删除科室记录接口


  GetPackage: '/api/DIC/GetPackage',   //获取一条套餐记录
  GetPackageList: '/api/DIC/GetPackageList',   //  获取套餐字典列表
  SavePackage: '/api/DIC/SavePackage',  //  保存一条套餐记录（连同套餐所含项目一并保存）
  BatchSavePackage: '/api/DIC/BatchSavePackage',    //  批量保存套餐记录（连同套餐所含项目一并保存）
  BatchDeletePackage: '/api/DIC/BatchDeletePackage',   //  批量删除套餐记录（连同套餐所含项目一并删除）


  GetRptItemList: '/api/DIC/GetRptItemList',  //获取报告组合项目列表
  GetAllRptItemList: '/api/DIC/GetAllRptItemList', //获取所有报告组合项目列表
  GetRptItem: '/api/DIC/GetRptItem', //获取单个报告组合项目数据
  SaveRptItem: '/api/DIC/SaveRptItem',//保存单个报告组合项目（连同包含的报告子项目集合一起保存）
  UpdateItemVsSubItem: '/api/DIC/UpdateItemVsSubItem',  //更新报告组合项目与报告子项目的关系
  GetRptSubItem: '/api/DIC/GetRptSubItem', //获取单个报告子项目接口
  GetRptSubItemList: '/api/DIC/GetRptSubItemList',  //获取报告子项目列表
  SaveRptSubItem: '/api/DIC/SaveRptSubItem',   //保存单个报告子项目
  GetRptSubItemVs3rd: '/api/DIC/GetRptSubItemVs3rd',   //获取某个开单子项目的外部代码集合
  SaveRptSubItemVs3rd: '/api/DIC/SaveRptSubItemVs3rd',   //保存报告子项目的外部代码
  GetAllRptSubItemList: '/api/DIC/GetAllRptSubItemList',   //获取所有报告子项目


  GetRptSubItemRstTmplList: '/api/DIC/GetRptSubItemRstTmplList',  //获取物理检查所见及小结模板列表接口
  GetRptSubItemRstTmpl: '/api/DIC/GetRptSubItemRstTmpl',  //获取一条物理检查所见及小结模板接口
  SaveRptSubItemRstTmpl: '/api/DIC/SaveRptSubItemRstTmpl',   //保存一条物理检查所见及小结模板接口
  BatchDeleteRptSubItemRstTmpl: '/api/DIC/BatchDeleteRptSubItemRstTmpl',  //批量删除物理检查所见及小结模板接口


  GetAbnormal: '/api/DIC/GetAbnormal', //根据异常编号获取一条异常接口
  GetAbnormalList: '/api/DIC/GetAbnormalList', //获取异常列表接口
  SaveAbnormal: '/api/DIC/SaveAbnormal',   //保存一条异常接口
  BatchDeleteAbnormal: '/api/DIC/BatchDeleteAbnormal',    //批量删除异常接口

  //检查异常规则
  GetAbnormalRuleLisList: '/api/DIC/GetAbnormalRuleLisList',   //根据异常编号获取某个异常相关的检验项目发现规则
  GetRuleLisByRuleCode: '/api/DIC/GetRuleLisByRuleCode',     //根据ruleCode获取一个检验项目发现规则
  SaveAbnormalRuleLis: '/api/DIC/SaveAbnormalRuleLis',   //保存某个异常的一条检验项目发现规则
  BatchDeleteAbnormalRuleLis: '/api/DIC/BatchDeleteAbnormalRuleLis', //批量删除某个异常的检验项目发现规则

  //非检验异常发现规则
  GetAbnormalRuleNotLisList: '/api/DIC/GetAbnormalRuleNotLisList',   //根据异常编号获取某个异常相关的非检验项目发现规则
  GetAbnormalRuleNotLisByRuleCode: '/api/DIC/GetAbnormalRuleNotLisByRuleCode',   //根据ruleCode获取一个非检验项目发现规则
  SaveAbnormalRuleNotLis: '/api/DIC/SaveAbnormalRuleNotLis',   //保存某个异常的一条非检验项目发现规则
  BatchDeleteAbnormalRuleNotLis: '/api/DIC/BatchDeleteAbnormalRuleNotLis',   //批量删除某个异常的非检验项目发现规则

  //问卷异常发现规则
  GetAbnormalRulePaperByRuleCode: '/api/DIC/GetAbnormalRulePaperByRuleCode',   //根据问卷Code获取一条问卷发现规则
  GetAllQuestion: '/api/DIC/GetAllQuestion', //获取所有的问题，返回json字符串
  GetAllAnswerByQuesNo: '/api/DIC/GetAllAnswerByQuesNo', //根据问题编号获取所有的答案，返回json字符串
  GetAbnormalRulePaperList: '/api/DIC/GetAbnormalRulePaperList',   //根据异常编号获取某个异常相关的问卷发现规则
  SaveAbnormalRulePaper: '/api/DIC/SaveAbnormalRulePaper',   //保存某个异常的一条问卷发现规则
  BatchDeleteAbnormalRulePaper: '/api/DIC/BatchDeleteAbnormalRulePaper', //批量删除某个异常的问卷发现规则

  GetMedicalAdvice: '/api/DIC/GetMedicalAdvice',   //获取一条医学建议模板
  GetMedicalAdviceList: '/api/DIC/GetMedicalAdviceList',   //获取医学建议模板列表
  SaveMedicalAdvice: '/api/DIC/SaveMedicalAdvice',   //保存一条
  BatchDeleteMedicalAdvice: '/api/DIC/BatchDeleteMedicalAdvice',   //批量删除医学建议模板
  VerifyExpr: '/api/DIC/VerifyExpr',   //验证一个匹配表达式是否正确

  GetFuncList: '/api/DIC/GetFuncList',  //获取功能项列表接口
  GetFunc: '/api/DIC/GetFunc',   //获取一条功能项记录
  SaveFunc: '/api/DIC/SaveFunc',   //保存一条功能项记录的接口
  BatchDeleteFunc: '/api/DIC/BatchDeleteFunc',   //批量删除功能项记录
  GetFuncNamesByCodes: '/api/DIC/GetFuncNamesByCodes',   //根据功能项代码字符串获取功能项名称字符串
  GetAllFunc: '/api/DIC/GetAllFunc',   //获取所有的功能项(未结构化)
  GetAllFuncSort: '/api/DIC/GetAllFuncSort',   //获取所有的功能项(结构化)


  GetRole: '/api/DIC/GetRole',   //获取一条角色记录
  GetAllRoleList: '/api/DIC/GetAllRoleList', //获取所有角色list
  GetRoleList: '/api/DIC/GetRoleList',   //获取角色列表接口
  SaveRole: '/api/DIC/SaveRole',   //保存一条角色记录的接口
  BatchDeleteRole: '/api/DIC/BatchDeleteRole',   //批量删除角色记录


  GetUser: '/api/XT/GetUser',  //获取系统用户接口
  GetUserList: '/api/XT/GetUserList',  //获取系统用户列表
  SaveUser: '/api/XT/SaveUser',    //保存一个系统用户记录
  BatchDeleteUser: '/api/XT/BatchDeleteUser',    //批量删除系统用户
  ResetUserPassword: '/api/XT/ResetUserPassword',    //重置系统系统用户密码
  FileUpload: '/api/XT/FileUpload',
  FileDelete: '/api/XT/FileDelete',
  GetImage: '/api/XT/GetImage',


  GetUserCert: '/api/XT/GetUserCert',    //获取一条用户岗位证书记录
  GetUserCertList: '/api/XT/GetUserCertList',    //获取一个用户的所有证书列表
  SaveUserCert: '/api/XT/SaveUserCert',     //保存一条岗位证书记录
  BatchDeleteUserCert: '/api/XT/BatchDeleteUserCert',    //删除一条用户的证书记录
  GetQrCode: '/api/XT/GetQrCode',


  GetRejectReasonList: "/api/DIC/GetRejectReasonList", //获取驳回原因列表
  GetRejectReason: '/api/DIC/GetRejectReason',   //获取单个驳回原因
  SaveRejectReason: '/api/DIC/SaveRejectReason',   //保存单个驳回原因
  BatchDeleteRejectReason: '/api/DIC/BatchDeleteRejectReason', //批量删除驳回原因


  GetReportItemDisplayList: '/api/DIC/GetReportItemDisplayList', //获取报告显示方式列表
  GetReportItemDisplay: '/api/DIC/GetReportItemDisplay',   //获取单个报告显示方式
  SaveReportItemDisplay: '/api/DIC/SaveReportItemDisplay', //保存单个报告显示方式
  BatchDeleteReportItemDisplay: '/api/DIC/BatchDeleteReportItemDisplay', //批量删除报告显示方式

  GetSmstypeList: '/api/DIC/GetSmstypeList',   //获取短信类型列表
  GetSmstype: '/api/DIC/GetSmstype',   //获取单个短信类型
  SaveSmstype: '/api/DIC/SaveSmstype',   //保存单个短信类型
  GetAbnormalListByIsCrisis: '/api/DIC/GetAbnormalListByIsCrisis',    //获取异常接口(true:是危急值)
  BatchDeleteSmstype: '/api/DIC/BatchDeleteSmstype', //批量删除短信类型


  GetSmsCriticalTemplateList: '/api/DIC/GetSmsCriticalTemplateList',   //获取危急值短信模版列表
  GetSmsCriticalTemplate: '/api/DIC/GetSmsCriticalTemplate',   //获取单个危急值短信模版
  SaveSmsCriticalTemplate: '/api/DIC/SaveSmsCriticalTemplate',   //保存单个危急值短信模版
  BatchDeleteSmsCriticalTemplate: '/api/DIC/BatchDeleteSmsCriticalTemplate',   //批量删除危急值短信模版


  GetOverTimeList: '/api/DIC/GetOverTimeList',   //获取加班字典列表
  GetOverTime: '/api/DIC/GetOverTime',   //获取单个加班字典
  SaveOverTime: '/api/DIC/SaveOverTime',   //保存单个加班字典
  BatchDeleteOverTime: '/api/DIC/BatchDeleteOverTime',   //批量删除加班字典


  GetCostList: '/api/DIC/GetCostList',   //获取成本列表
  GetCost: '/api/DIC/GetCost',   //获取单个成本
  SaveCost: '/api/DIC/SaveCost',   //保存单个成本
  BatchDeleteCost: '/api/DIC/BatchDeleteCost',   //批量删除成本

  GetDistributionTypeList: '/api/DIC/GetDistributionTypeList',   //获取分成列表
  GetDistributionType: '/api/DIC/GetDistributionType',   //获取单个分成
  SaveDistributionType: '/api/DIC/SaveDistributionType',   //保存单个分成
  BatchDeleteDistributionType: '/api/DIC/BatchDeleteDistributionType',   //批量删除分成

  GetEquipmentList: '/api/DIC/GetEquipmentList',   //获取设备列表
  GetEquipment: '/api/DIC/GetEquipment',   //获取单个设备
  SaveEquipment: '/api/DIC/SaveEquipment',   //保存单个设备

  GetEquipmentCheck: '/api/DIC/GetEquipmentCheck',   //获取一条设备维护
  GetEquipmentCheckList: '/api/DIC/GetEquipmentCheckList',   //获取设备维护列表
  SaveEquipmentCheck: '/api/DIC/SaveEquipmentCheck',   //保存一条设备维护
  BatchDeleteEquipmentCheck: '/api/DIC/BatchDeleteEquipmentCheck',   //批量删除设备维护

  DICGetGuideClassList: '/api/DIC/GetGuideClassList',   //获取导检单列表
  GetGuideClass: '/api/DIC/GetGuideClass',   //获取单个导检单
  SaveGuideClass: '/api/DIC/SaveGuideClass',   //保存单个导检单
  BatchDeleteGuideClass: '/api/DIC/BatchDeleteGuideClass',   //批量删除导检单
  GetDeptListByGuideClass: '/api/DIC/GetDeptListByGuideClass',   //获取科室字典列表（导检单相关）
  GetOrderItemListByGuideClass: '/api/DIC/GetOrderItemListByGuideClass',   //获取科室字典列表（导检单相关）

	//排班api-主检
	GetPGMasterDoctor: '/api/PG/GetPGMasterDoctor',//获取医生列表
	BatchSavePGScheduleMaster: '/api/PG/BatchSavePGScheduleMaster',//批量插入排班记录
	QueryPGScheduleMasterByDateRange: '/api/PG/QueryPGScheduleMasterByDateRange',//根据时间段获取所有排班记录
	DeletePGScheduleMasterByDateRange: '/api/PG/DeletePGScheduleMasterByDateRange',//删除指定时间段的排班记录
	UpdatePGScheduleMaster: '/api/PG/UpdatePGScheduleMaster',//【更新当天排班记录】更新排班信息
	//排班api-总检
	GetSHFinalDoctor: '/api/SH/GetSHFinalDoctor',//获取总检医生列表
	BatchSaveSHScheduleFinal: '/api/SH/BatchSaveSHScheduleFinal',//批量插入排班记录
	QuerySHScheduleFinalByDateRange: '/api/SH/QuerySHScheduleFinalByDateRange',//根据时间段获取所有排班记录
	DeleteShScheduleFinalByDateRange: '/api/SH/DeleteShScheduleFinalByDateRange',//根据时间段批量删除排班总检记录
	UpdateSHScheduleFinal: '/api/SH/UpdateSHScheduleFinal',//【更新当天排班记录】更新排班信息

	GetAllUser: '/api/PG/GetAllUser',//【获取所有用户列表】获取所有用户列表
	CheckCanEditSchedulePG: '/api/PG/CheckCanEditSchedule',//【编辑单条排班】判断当前排班医生列表是否允许编辑
	CheckCanEditScheduleSH: '/api/SH/CheckCanEditSchedule',//【编辑单条排班】判断当前排班医生列表是否允许编辑
	//排班节假日
	GetTjHoliday: '/api/PG/GetTjHoliday',//查询全部假期-获取已存在的假期
	DeleteTjHoliday: '/api/PG/DeleteTjHoliday',//批量删除节假日信息
	InsertTjHoliday: '/api/PG/InsertTjHoliday',//批量保存节假日信息


	//统计分析api
	//财务统计
	GetFJDoctor: '/api/TJ/GetFJDoctor',//获取分检医生列表
	TjCostQuery: '/api/TJ/TjCostQuery',//成本统计查询
	TjCostDetailQuery: '/api/TJ/TjCostDetailQuery',//成本明细统计查询
	ExportTjFinanceDetailReport: '/api/TJ/ExportTjFinanceDetailReport',//导出财务单月统计报表
	ExportTjFinanceReport: '/api/TJ/ExportTjFinanceReport',//导出财务统计报表(总)
	TjReceivablesQueryDetail: '/api/TJ/TjReceivablesQueryDetail',//统计应收款明细查询
	TjReceivablesQuery: '/api/TJ/TjReceivablesQuery',//统计应收款汇总查询
  ExportTjReceivablesReport: '/api/TJ/ExportTjReceivablesReport',//导出应收款统计报表

  //工作量统计
  //医生工作量统计
  GetDoctorType: "/api/TJ/GetDoctorType",//获取医生类型
  GetHolidayType: "/api/TJ/GetHolidayType",//获取统计类型
  GetOvertimeType: "/api/TJ/GetOvertimeType",//获取工时类型
  GetWorkLoadInfos: "/api/TJ/GetWorkLoadInfos",//获取工作量
  ShowDetailInfo: "/api/TJ/ShowDetailInfo",//工作量详情
  GetHolidayByDataRange: "/api/TJ/GetHolidayByDataRange",//获取假期类型
  ExportWorkLoadToExcel: "/api/TJ/ExportWorkLoadToExcel",//导出列表报表
  ExportDetailToExcel: "/api/TJ/ExportDetailToExcel",//导出工作量报表
  // VIP统计
  TjVIPQuery: "/api/TJ/TjVIPQuery",
  // 财务报表统计
  GetReportTypeEnum: "/api/TJ/GetReportTypeEnum",//【获取报表类型】 报表类型 月报 季报 年报
  GetQuarterTypeEnum: "/api/TJ/GetQuarterTypeEnum", //【获取季度类型】 季度类型
  GetPackageEnum: "/api/TJ/GetPackageEnum",//【获取套餐种类】 //套餐种类 =0 普通套餐 =1 筛查套餐 =2 DIY套餐
  GetOrderType: "/api/TJ/GetOrderType",//【订单类型】 //订单类型 0=普通 1= 筛查
  QueryStatisticsReportForFinance: "/api/TJ/QueryStatisticsReportForFinance",//获取报表
  // 业务综合报表
  TjMonthReportQuery: "/api/TJ/TjMonthReportQuery",

	ReturnDICCost: '/api/TJ/ReturnDICCost',//返回成本字典
	InsertOrUpdateCost: '/api/TJ/InsertOrUpdateCost',//插入或更新成本
	TjDiscountQuery: '/api/TJ/TjDiscountQuery',//统计折扣查询
	ExportTjDiscountReport: '/api/TJ/ExportTjDiscountReport',//导出折扣统计报表
	TjDeptDistributionQuery: '/api/TJ/TjDeptDistributionQuery',//统计科间分成查询
	TjDeptDistributionDetailQuery: '/api/TJ/TjDeptDistributionDetailQuery',//统计科间分成明细查询
	ExportTjDeptDistributionReport: '/api/TJ/ExportTjDeptDistributionReport',//导出科间分成统计报表
	ExportTjDeptDistributionDetailReport: '/api/TJ/ExportTjDeptDistributionDetailReport',//导出科间分成统计明细报表

	TjItemDistributionQuery: '/api/TJ/TjItemDistributionQuery',//统计项目分成查询
	TjItemDistributionDetailQuery: '/api/TJ/TjItemDistributionDetailQuery',//统计项目分成明细查询
	ExportTjItemDistributionReport: '/api/TJ/ExportTjItemDistributionReport',//导出科间分成统计报表




	//体检质控
	GetGuideClassList: '/api/ZK/GetGuideClassList',//导检质控列表
	ExportGuideClass: '/api/ZK/ExportGuideClass',//导检质控列表导出
	GetAbandonList: '/api/ZK/GetAbandonList',//弃检质控列表
	ExportAbandon: '/api/ZK/ExportAbandon',//弃检质控列表导出
	GetResMainInsList: '/api/ZK/GetResMainInsList',//主检质控列表
	ExportMainIns: '/api/ZK/ExportMainIns',//主检质控列表导出
	GetResReportTakeList: '/api/ZK/GetResReportTakeList',//报告发放质控列表
	ExportReportTake: '/api/ZK/ExportReportTake',//报告发放质控列表导出
	GetDocetrQuaList: '/api/ZK/GetDocetrQuaList',//医生资质审核
	ExportDocetrQua: '/api/ZK/ExportDocetrQua',//医生资质审核导出
	GetResReportCycleList: '/api/ZK/GetResReportCycleList',//报告周期质控
	ExportReportCycle: '/api/ZK/ExportReportCycle',//报告周期质控导出
	GetEquipmentList: '/api/DIC/GetEquipmentList',//设备指控
	ExportEquipment: '/api/ZK/ExportEquipment',//设备指控导出

}

export default api;
