import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import api from '../api'
import { MessageBox } from 'element-ui';
const header = require('../header.json')
Vue.use(Vuex);

const state = {
  collapse: false, // 是否展开左侧列表
  activeIndex: '',
  Menus: [], // 总导航
  sideBarMenus: [], // 侧边导航
  openList: [], // 侧边栏默认打开
	isGoto: true,  // 当前页面是否允许调转
	USERINFO: {}// 用户信息
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
    state.Menus = menu;
    state.sideBarMenus = menu.filter(x => x.path === state.activeIndex)[0].childrenNodes;
    state.openList[0] = state.sideBarMenus[0].part
	},
	//改变当前页面所属的第一级导航
  changeActiveIndex(state, key) {
    state.activeIndex = key;
    state.sideBarMenus = state.Menus.filter(x => x.path === key)[0].childrenNodes;
    state.openList[0] = state.sideBarMenus[0].part
	},
	// 改变当前页面是否可以跳转
  changeGoto(state, key) {
		state.isGoto = key;
	},
	//当前页面是否可以跳转的弹窗提示
	GotoHandle(state, key) {
		if (!state.isGoto) {
			MessageBox.confirm('当前内容未保存，是否保存后离开?', '提示', {
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
		state.USERINFO = data;
	}
}
const actions = {
	//异步获取导航菜单
	getMenu({ commit }, operatorCode) {
		axios.post(api.GetUserFuncItemList, {
			operatorCode
		}).then(res => {
		  if (res.data) {
				commit('changeMenu', header);
      }
    })
	}
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
