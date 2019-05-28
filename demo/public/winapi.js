var api;
var AppCore = {
	createNew: function () {
		var api = {};
		//刷身份证
		api.getIdcard = function (callback) {
			return bound.getIdcard(callback);
		}
		//拍照
		api.shot = function (callback) {
			return bound.shot(callback);
		}

		//打印
		api.print = function (cardNum) {
			return bound.print(cardNum);
		}

		//保存文件
		api.save = function (path) {
			return bound.save(path);
		}
		return api;
	}
};
if (!api) {
	api = AppCore.createNew();
}
window.api = api;
