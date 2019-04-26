var api;
var AppCore = {
    createNew: function () {
        var api = {};
        //刷身份证
        api.getIdcard = function (callback) {
            return bound.getIdcard(callback);
        }
        //刷身份证
        api.shot = function (callback) {
            return bound.shot(callback);
        }

        //打印导检单
        api.printCheckGuide = function (cardNum) {
            return bound.printCheckGuide(cardNum);
        }
        return api;
    }
};
if (!api) {
    api = AppCore.createNew();
}
window.api = api;