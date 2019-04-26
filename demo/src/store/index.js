import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
// import api from '../api'
const header = require('../header.json')
Vue.use(Vuex);

const state = {
  collapse: false, // 是否展开左侧列表
  activeIndex: '',
  Menus: [], // 总导航
  sideBarMenus: [], // 侧边导航
  openList: [], // 侧边栏默认打开
	isGoto: true  // 当前页面是否允许调转
}
const mutations = {
  changeCollapse(state, flag) {
    if (state.collapse != flag) {
      state.collapse = flag;
    }
  },
  changeMenu(state, menu) {
		state.activeIndex = window.location.href.split('#')[1].substring(0, 3);
    state.Menus = menu;
    state.sideBarMenus = menu.filter(x => x.path === state.activeIndex)[0].childrenNodes;
    state.openList[0] = state.sideBarMenus[0].part
  },
  changeActiveIndex(state, key) {
    state.activeIndex = key;
    state.sideBarMenus = state.Menus.filter(x => x.path === key)[0].childrenNodes;
    state.openList[0] = state.sideBarMenus[0].part
  },
  changeGoto(state, key) {
    state.isGoto = key;
	}
}
const actions = {
  getMenu({ commit }) {
		commit('changeMenu', header);
	}
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
