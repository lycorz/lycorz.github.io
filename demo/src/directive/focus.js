const install = function (Vue) {
	//获取焦点
	Vue.directive('focus', {
		inserted: function (el) {
			el.focus()
		}
	})
}
if (window.Vue) {
	window.focus = focus
	Vue.use(install);
}
focus.install = install;
export default focus;

