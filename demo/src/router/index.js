import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			redirect: '/dd'
		},
		{
			path: '/dd',
			component: resolve => require(['common/Home.vue'], resolve),
			children: [
				{
					path: '',
					redirect: 'ddorder'
				},
				{
					path: 'ddorder',
					component: resolve => require(['pages/WebRootDD/DDOrder.vue'], resolve),
					meta: { title: '创建个检订单' }
				},
				{
					path: 'ddordermanage',
					component: resolve => require(['pages/WebRootDD/DDOrderManage.vue'], resolve),
					meta: { title: '个检订单管理' }
				},
				{
					path: 'ddinfo',
					component: resolve => require(['pages/WebRootDD/DDInfo.vue'], resolve),
					meta: { title: '客户信息管理' }
				},
				{
					path: 'ddgrporder',
					component: resolve => require(['pages/WebRootDD/DDGrpOrder.vue'], resolve),
					meta: { title: '团检订单' }
				},
				{
					path: 'ddgrpmanage',
					component: resolve => require(['pages/WebRootDD/DDGrpManage.vue'], resolve),
					meta: { title: '订单管理' }
				},
				{
					path: 'ddcardstock',
					component: resolve => require(['pages/WebRootDD/DDCardStock.vue'], resolve),
					meta: { title: '库存' }
				},
				{
					path: 'ddcardsales',
					component: resolve => require(['pages/WebRootDD/DDCardSales.vue'], resolve),
					meta: { title: '销售' }
				}
			]
		},
		{
			path: '/fj',
			component: resolve => require(['common/Home.vue'], resolve),
			children: [
				{
					path: '',
					redirect: 'fjmain'
				},
				{
					path: 'fjmain',
					component: resolve => require(['pages/WebRootFJ/FJMain.vue'], resolve),
					meta: { title: '分检结论录入' }
				},
				{
					path: 'fjlis',
					component: resolve => require(['pages/WebRootFJ/FJLis.vue'], resolve),
					meta: { title: '实验室检查结果' }
				},
				{
					path: 'fjdanger',
					component: resolve => require(['pages/WebRootFJ/FJDanger.vue'], resolve),
					meta: { title: '危急值管理' },
				},
				{
					path: 'fjbloodmeasure',
					component: resolve => require(['pages/WebRootFJ/FJBloodMeasure.vue'], resolve),
					meta: { title: '采血质控' },
				},
			]
		},
		{
			path: '/sf',
			component: resolve => require(['common/Home.vue'], resolve),
			children: [
				{
					path: '',
					redirect: 'sfjymanage'
				},
				{
					path: 'sfjymanage',
					component: resolve => require(['pages/WebRootSF/SFJYManage.vue'], resolve),
					meta: { title: '交易管理' }
				},
				{
					path: 'sffpmanage',
					component: resolve => require(['pages/WebRootSF/SFFPManage.vue'], resolve),
					meta: { title: '发票管理' }
				},
				{
					path: 'sfhistory',
					component: resolve => require(['pages/WebRootSF/SFHistory.vue'], resolve),
					meta: { title: '历史查询' },
				},
			]
		},
		{
			path: '/pg',
			component: resolve => require(['common/Home.vue'], resolve),
			children: [
				{
					path: '',
					redirect: 'pgmain'
				},
				{
					path: 'pgmain',
					component: resolve => require(['pages/WebRootPG/PGMain.vue'], resolve),
					meta: { title: '主检评估' }
				},
				{
					path: 'pgmodal',
					component: resolve => require(['pages/WebRootPG/PGModal.vue'], resolve),
					meta: { title: '主检评估' }
				}

			]
		},
		{
			path: '/sh',
			component: resolve => require(['common/Home.vue'], resolve),
			children: [
				{
					path: '',
					redirect: 'shmanage'
				},
				{
					path: 'shmanage',
					component: resolve => require(['pages/WebRootSH/SHManage.vue'], resolve),
					meta: { title: '总检审核' }
				},
				{
					path: 'shmodal',
					component: resolve => require(['../components/pages/WebRootSH/SHModal.vue'], resolve),
					meta: { title: '总检评估' }
				},
			]
		},
		{
			path: '/bg',
			component: resolve => require(['common/Home.vue'], resolve),
			children: [
				{
					path: '',
					redirect: 'bgmanage'
				},
				{
					path: 'bgmanage',
					component: resolve => require(['pages/WebRootBG/BGManage.vue'], resolve),
					meta: { title: '报告管理' }
				},
				{
					path: 'smsmanage',
					component: resolve => require(['pages/WebRootBG/SMSManage.vue'], resolve),
					meta: { title: '短信管理' }
				},
				{
					path: 'bgmake',
					component: resolve => require(['pages/WebRootBG/BGMake.vue'], resolve),
					meta: { title: '团检报告生成' }
				},
			]
		},
		{
			path: '/tj',
			component: resolve => require(['common/Home.vue'], resolve),
			meta: { title: '统计分析' },
			children: [
				{
					path: '',
					redirect: 'income'
				},
				{
					path: 'income',
					component: resolve => require(['pages/WebRootTJ/Finance/TJIncome.vue'], resolve),
					meta: { title: '收入概况' },
				},
				{
					path: 'accountstatistics',
					component: resolve => require(['pages/WebRootTJ/Finance/TJAccountStatistics.vue'], resolve),
					meta: { title: '应收款统计' },
				},
				{
					path: 'constprofit',
					component: resolve => require(['pages/WebRootTJ/Finance/TJConstProfit.vue'], resolve),
					meta: { title: '成本及利润统计' },
				},
				{
					path: 'discount',
					component: resolve => require(['pages/WebRootTJ/Finance/TJDiscount.vue'], resolve),
					meta: { title: '折扣统计' },
				},
				{
					path: 'branchdivision',
					component: resolve => require(['pages/WebRootTJ/Finance/TJBranchDivision.vue'], resolve),
					meta: { title: '科间分成统计' },
				},
				{
					path: 'projectdivision',
					component: resolve => require(['pages/WebRootTJ/Finance/TJProjectDivision.vue'], resolve),
					meta: { title: '项目分成统计' },
				},
				{
					path: 'doctorsworkload',
					component: resolve => require(['pages/WebRootTJ/Work/TJDoctorsWorkload.vue'], resolve),
					meta: { title: '医生工作量' },
				},
				{
					path: 'managerworkload',
					component: resolve => require(['pages/WebRootTJ/Work/TJManagerWorkload.vue'], resolve),
					meta: { title: '健康管理师工作量' },
				},
				{
					path: 'baseinfo',
					component: resolve => require(['pages/WebRootTJ/Platform/TJBaseInfo.vue'], resolve),
					meta: { title: '基础信息统计' },
				},
				{
					path: 'peopletype',
					component: resolve => require(['pages/WebRootTJ/Platform/TJPeopleType.vue'], resolve),
					meta: { title: '人群类型统计' },
				},
				{
					path: 'netconsultation',
					component: resolve => require(['pages/WebRootTJ/Platform/TJNetConsultation.vue'], resolve),
					meta: { title: '网络咨询统计' },
				},
				{
					path: 'smssend',
					component: resolve => require(['pages/WebRootTJ/Platform/TJSMSSend.vue'], resolve),
					meta: { title: '短信发送统计' },
				},
				{
					path: 'vip',
					component: resolve => require(['pages/WebRootTJ/Vip/TJVip.vue'], resolve),
					meta: { title: 'VIP统计' },
				},
				{
					path: 'businessStatement',
					component: resolve => require(['pages/WebRootTJ/Statement/TJBusinessStatement.vue'], resolve),
					meta: { title: '业务综合报表' },
				},
				{
					path: 'financialStatement',
					component: resolve => require(['pages/WebRootTJ/Statement/TJFinancialStatement.vue'], resolve),
					meta: { title: '财务综合报表' },
				}
			]
		},
		{
			path: '/xt',
			component: resolve => require(['../components/common/Home.vue'], resolve),
			meta: { title: '系统' },
			children: [
				{
					path: '',
					redirect: 'openorder'
				},

				{
					path: 'openorder',
					component: resolve => require(['../components/pages/WebRootXT/Combination/OpenOrder/Index.vue'], resolve),
					meta: { title: '开单组合项目' },
				},
				{
					path: 'setmeal',
					component: resolve => require(['../components/pages/WebRootXT/Combination/SetMeal/Index.vue'], resolve),
					meta: { title: '套餐模板' },
				},
				{
					path: 'guiIinspection',
					component: resolve => require(['../components/pages/WebRootXT/Combination/GuiIinspection/Index.vue'], resolve),
					meta: { title: '导检单项目分类型展示' },
				},
				{
					path: 'project',
					component: resolve => require(['../components/pages/WebRootXT/Presentation/Project/Index.vue'], resolve),
					meta: { title: '报告项目' },
				},
				{
					path: 'projectSort',
					component: resolve => require(['../components/pages/WebRootXT/Presentation/ProjectSort/Index.vue'], resolve),
					meta: { title: '报告项目分类' },
				},
				{
					path: 'physics',
					component: resolve => require(['../components/pages/WebRootXT/Presentation/Physics/Index.vue'], resolve),
					meta: { title: '物理检查三级所见及小结模版' },
				},
				{
					path: 'exception',
					component: resolve => require(['../components/pages/WebRootXT/Presentation/Exception/Index.vue'], resolve),
					meta: { title: '异常字典' },
				},
				{
					path: 'medicalAdvice',
					component: resolve => require(['../components/pages/WebRootXT/Presentation/MedicalAdvice/Index.vue'], resolve),
					meta: { title: '主检医学建议' },
				},
				{
					path: 'rejectReason',
					component: resolve => require(['../components/pages/WebRootXT/Presentation/RejectReason/Index.vue'], resolve),
					meta: { title: '驳回原因' },
				},
				{
					path: 'reportItemDisplay',
					component: resolve => require(['../components/pages/WebRootXT/Presentation/ReportItemDisplay/Index.vue'], resolve),
					meta: { title: '报告项目显示方式' },
				},
				{
					path: 'smstype',
					component: resolve => require(['../components/pages/WebRootXT/SMessage/Smstype/Index.vue'], resolve),
					meta: { title: '短信类型' },
				},
				{
					path: 'smsCriticalTemplate',
					component: resolve => require(['../components/pages/WebRootXT/SMessage/SmsCriticalTemplate/Index.vue'], resolve),
					meta: { title: '危急值短信模板' },
				},
				{
					path: 'cost',
					component: resolve => require(['../components/pages/WebRootXT/Administration/Cost/Index.vue'], resolve),
					meta: { title: '成本字典' },
				},
				{
					path: 'distributionType',
					component: resolve => require(['../components/pages/WebRootXT/Administration/DistributionType/Index.vue'], resolve),
					meta: { title: '分成字典' },
				},
				{
					path: 'equipment',
					component: resolve => require(['../components/pages/WebRootXT/Administration/Equipment/Index.vue'], resolve),
					meta: { title: '设备字典' },
				},
				{
					path: 'equipmentCheck',
					component: resolve => require(['../components/pages/WebRootXT/Administration/EquipmentCheck/Index.vue'], resolve),
					meta: { title: '设备维护' },
				},
				{
					path: 'overTime',
					component: resolve => require(['../components/pages/WebRootXT/Administration/OverTime/Index.vue'], resolve),
					meta: { title: '加班字典' },
				},
				{
					path: 'funcitems',
					component: resolve => require(['../components/pages/WebRootXT/System/FuncItems/Index.vue'], resolve),
					meta: { title: '功能项目字典' },
				},
				{
					path: 'section',
					component: resolve => require(['../components/pages/WebRootXT/System/Section/Index.vue'], resolve),
					meta: { title: '科室字典' },
				},
				{
					path: 'role',
					component: resolve => require(['../components/pages/WebRootXT/System/Role/Index.vue'], resolve),
					meta: { title: '角色字典' },
				},
				{
					path: 'user',
					component: resolve => require(['../components/pages/WebRootXT/User/Index.vue'], resolve),
					meta: { title: '用户管理' },
				},
				{
					path: 'schedulingpg',
					component: resolve => require(['../components/pages/WebRootXT/Scheduling/SchedulingPG.vue'], resolve),
					meta: { title: '主检排班' },
				},
				{
					path: 'schedulingsh',
					component: resolve => require(['../components/pages/WebRootXT/Scheduling/SchedulingSH.vue'], resolve),
					meta: { title: '总检排班' },
				},
				{
					path: 'upload',
					component: resolve => require(['../components/pages/WebRootXT/User/upload.vue'], resolve),
					meta: { title: '总检排班' },
				},
				// {
				// 	path: 'user',
				// 	component: resolve => require(['../components/pages/WebRootXT/User.vue'], resolve),
				// 	meta: { title: '用户管理' }
				// },
				// {
				// 	path: 'upload',
				// 	component: resolve => require(['pages/WebRootXT/upload.vue'], resolve),
				// 	meta: { title: '个检' }
				// }
			]
		},
		{
			path: '/zk',
			component: resolve => require(['common/Home.vue'], resolve),
			children: [
				{
					path: '',
					redirect: 'criticalvalue'
				},
				{
					path: 'criticalvalue',
					component: resolve => require(['pages/WebRootZK/ZKCriticalValue.vue'], resolve),
					meta: { title: '危急值管理' }
				},
				{
					path: 'detectionrate',
					component: resolve => require(['pages/WebRootZK/ZKDetectionRate.vue'], resolve),
					meta: { title: '检出率' }
				},
				{
					path: 'guidequality',
					component: resolve => require(['pages/WebRootZK/ZKGuideQuality.vue'], resolve),
					meta: { title: '导检质控' }
				},
				{
					path: 'discardquality',
					component: resolve => require(['pages/WebRootZK/ZKDiscardQuality.vue'], resolve),
					meta: { title: '弃检质控' }
				},
				{
					path: 'mainquality',
					component: resolve => require(['pages/WebRootZK/ZKMainQuality.vue'], resolve),
					meta: { title: '主检质控' }
				},
				{
					path: 'reportcyclequality',
					component: resolve => require(['pages/WebRootZK/ZKReportCycleQuality.vue'], resolve),
					meta: { title: '报告周期质控' }
				},
				{
					path: 'reportissuingquality',
					component: resolve => require(['pages/WebRootZK/ZKReportIssuingQuality.vue'], resolve),
					meta: { title: '报告发放质控' }
				},
				{
					path: 'doctorqualification',
					component: resolve => require(['pages/WebRootZK/ZKDoctorQualification.vue'], resolve),
					meta: { title: '医生资质审核' }
				},
				{
					path: 'equipmentquality',
					component: resolve => require(['pages/WebRootZK/ZKEquipmentQuality.vue'], resolve),
					meta: { title: '设备质检' }
				},
				{
					path: 'inspectionstandard',
					component: resolve => require(['pages/WebRootZK/ZKInspectionStandard.vue'], resolve),
					meta: { title: '检验标本质控' }
				}
			]
		},
		{
			// 权限页面
			path: '/permission',
			component: resolve => require(['pages/Permission.vue'], resolve),
			meta: { title: '权限测试', permission: true }
		},
		{
			path: '/404',
			component: resolve => require(['pages/404.vue'], resolve),
			meta: { title: '404' }
		},
		{
			path: '/403',
			component: resolve => require(['pages/403.vue'], resolve),
			meta: { title: '403' }
		},
		{
			path: '/login',
			name: 'Login',
			component: resolve => require(['pages/Login.vue'], resolve)
		},
		{
			path: '*',
			redirect: '/404'
		}
	]
})

export default router;
