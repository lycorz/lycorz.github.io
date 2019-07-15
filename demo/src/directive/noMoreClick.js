const install = function (Vue) {
	//防止重复提交
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
}
if (window.Vue) {
	window['no-more-click'] = no-more-click;
	Vue.use(install);
}
noMoreClick.install = install;
export default noMoreClick;
