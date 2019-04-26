import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/icon.css';
import './assets/css/WebSite.css';
import './assets/css/iconfont.css';

import "babel-polyfill";

import filters from './filter'
import utils from './utils/utils'

Vue.config.devtools = true
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(utils);
Object.keys(filters).forEach(x => Vue.filter(x, filters[x])); // 注册filter

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
