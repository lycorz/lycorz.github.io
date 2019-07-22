import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import router from '../router';
import api from '../api'
import consts from '../utils/const'
import { MessageBox } from 'element-ui';
import { reject, resolve } from 'q';
const header = require('../header.json')
Vue.use(Vuex);

const state = {
  collapse: false, // 是否展开左侧列表
  activeIndex: '',
  Menus: [], // 总导航
  sideBarMenus: [], // 侧边导航
  openList: [], // 侧边栏默认打开
	isGoto: true,  // 当前页面是否允许调转
	USERINFO: {},// 用户信息
	assist: []//辅助功能项
}
const mutations = {
	//左侧菜单栏展开闭合
  changeCollapse(state, flag) {
    if (state.collapse != flag) {
      state.collapse = flag;
    }
	},
	//获取菜单数据后的处理
  changeMenu(state, menu) {
		state.activeIndex = window.location.href.split('#')[1].substring(0, 3);
		state.Menus = menu.filter(x => !x.parentCode && x.parentCode != 'A');
		state.assist = menu.filter(x => x.parentCode == 'A').map(x => x.funcName);
		if (state.activeIndex !== '/lo') {
			state.sideBarMenus = menu.filter(x => x.url === state.activeIndex)[0].childrenNodes;
		} else {
			state.sideBarMenus = menu[0].childrenNodes;
			state.activeIndex = menu[0].url;
		}
		let url = state.sideBarMenus[0].childrenNodes.length ? state.sideBarMenus[0].childrenNodes[0].url : state.sideBarMenus[0].url
		router.push(url)
    state.openList[0] = state.sideBarMenus[0].orderNum;
	},
	//改变当前页面所属的第一级导航
  changeActiveIndex(state, key) {
    state.activeIndex = key;
    state.sideBarMenus = state.Menus.filter(x => x.url === key)[0].childrenNodes;
    state.openList[0] = state.sideBarMenus[0].orderNum
	},
	// 改变当前页面是否可以跳转
  changeGoto(state, key) {
		state.isGoto = key;
	},
	//当前页面是否可以跳转的弹窗提示
	GotoHandle(state, key) {
		if (!state.isGoto) {
			MessageBox.confirm('当前内容未保存，是否离开?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				closeOnClickModal: false,
				type: 'warning'
			}).then(() => {
				state.isGoto = true;
			}).catch(() => { });
		}
	},
	// 赋值用户信息
	getUserInfo(state, data) {
		data.photo = consts.IMG_BASE_PATH + data.photo;
		state.USERINFO = data;//存放在vuex
		window.USERINFO = data;//存放在window下
	}
}
const actions = {
	//异步获取导航菜单
	getMenu({ commit }, operatorCode) {
		axios.get(consts.SF_REPORT_PATH + api.GetUserFuncItemList,{params: {operatorCode}}).then(res => {
		  if (res.data) {
				commit('changeMenu', res.data.entity);
				// commit('changeMenu', header);
      }
    })
	},
	login({ commit }, userInfo) {
		return axios.post(consts.SF_REPORT_PATH + api.Login, userInfo).then(res => {
			if (res.data.status === 1) {
				commit('getUserInfo', res.data.entity);
				return resolve({
					status: 1,
					message: '登陆成功'
				})
			} else {
				return resolve({
					status: -1,
					message: res.data.message
				});
			}
		}).catch(err => {
			return reject({
				status: -1,
				message: err.data.message
			});
		});
	}
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
