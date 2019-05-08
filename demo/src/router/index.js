import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'
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
