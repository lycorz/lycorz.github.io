import axios from './http';
import api from '../api'

export default {
	install: function (Vue) {
		Vue.prototype.$axios = axios,
		Vue.prototype.$api = api,
		Vue.prototype.$getType = function(){
			if (arguments.length !== 1) return;
			let params = { typeName: arguments[0].toString() };
			return  axios.get(api.GetEnumValueList, { params })
		},
		Vue.prototype.clickRow = function(row, ref) {
			this.$refs[ref].toggleRowSelection(row);
		}
		// 首字母大写转换
		Vue.prototype.$handleUpperCase = function (obj) {// 参数为object
			let result = {};
			for (let key in obj) {
				if (obj.hasOwnProperty(key)) {
					let key2 = '';
					if (key.length > 0) {
						key2 = key.substr(0, 1).toUpperCase() + key.substr(1);
					}
					result[key2] = obj[key];
				}
			}
			return result;
		}
		Vue.prototype.$isNull = function isNull(arg1)
		{
		 	//return !arg1  && typeof arg1!=="boolean"?true:false;//&& arg1!==0 因为不判断null
		}
		// table全选
		Vue.prototype.allSelection = function (source, target) {//source操作的总数据  target当前table的ref
			this.$refs[target].clearSelection();
			this[source].forEach(row => {
				this.$refs[target].toggleRowSelection(row);
			});
		},
		// table反选
		Vue.prototype.toggleSelection = function (source, target) {//source操作的总数据  target当前table的ref
			if (this[source]) {
				this[source].forEach(row => {
					this.$refs[target].toggleRowSelection(row);
				});
			} else {
				this.$refs[target].clearSelection();
			}
		},
		// table取消选择
		Vue.prototype.cancelSelection = function (target) { // target当前table的ref
			this.$refs[target].clearSelection();
		},
		// 数组删除扩展方法 
		Array.prototype.remove = function (from, to) {
			var rest = this.slice((to || from) + 1 || this.length);
			this.length = from < 0 ? this.length + from : from;
			return this.push.apply(this, rest);
		},
		// 数组数字排序方法
		Vue.prototype.sortNumbers = function (a,b)
		{
			return a - b;
		}
		Vue.prototype.guid = function () {
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
			s[8] = s[13] = s[18] = s[23] = "-";
		 
			var uuid = s.join("");
			return uuid;
		}
	}
}
