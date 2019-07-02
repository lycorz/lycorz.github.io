import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import  VueQuillEditor from 'vue-quill-editor'  //富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/icon.css';
import './assets/css/WebSite.css';
import './assets/css/iconfont.css';

import "babel-polyfill";

import filters from './filter'
import utils from './utils/utils'
// 通过指令防止重复点击
/* <el-button type="primary" @click="openDetail" v-no-more-click>创建订单</el-button> */
Vue.directive('noMoreClick', {
	inserted(el) {
		el.addEventListener('click', e => {
			el.classList.add('is-disabled');
			el.disabled = true;
			setTimeout(() => {
				el.disabled = false;
				el.classList.remove('is-disabled');
			}, 3000)
		})
	}
})
Vue.directive('focus', {
	update(el) {
		el.firstElementChild.focus()
	}
})
Vue.config.devtools = true
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(utils);
Vue.use(VueQuillEditor);    //富文本编辑器
Object.keys(filters).forEach(x => Vue.filter(x, filters[x])); // 注册filter
window.imgUploadPath = "";
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
