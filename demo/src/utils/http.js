import axios from 'axios';
import router from '../router';
import store from '../store'
import { Message } from 'element-ui';
let baseURL = 'http://localhost:7417'
// let baseURL = 'http://192.168.0.254:8889'
if (process.env.NODE_ENV === 'production'){
	baseURL = 'http://192.168.0.254:8889'
}
axios.defaults.baseURL = baseURL;

export default axios
