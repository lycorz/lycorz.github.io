import axios from 'axios';
import router from '../router';
import store from '../store'
import { Message } from 'element-ui';
let baseURL = 'http://localhost:7417'
 //let baseURL = 'http://192.168.0.254:8889'
if (process.env.NODE_ENV === 'production'){
	baseURL = 'http://192.168.0.254:8889'
}
axios.defaults.baseURL = baseURL;
// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
	if (router.history.current.path !== '/login') {
		if (store.state.USERINFO.token) {
			config.headers.Authorization = store.state.USERINFO.token;
			config.headers.OperatorCode = store.state.USERINFO.operatorCode;
			return config
		} else {
			router.push('/login');
		}
	} else {
		return config;
	}
}, err => {
	return Promise.reject(err)
})
// 响应拦截 token过期处理
axios.interceptors.response.use(res => {
	return res
}, err => {
		//Message.error('登陆已失效，请重新登录');
		router.push('/login');
	return Promise.reject(err)
})

export default axios
