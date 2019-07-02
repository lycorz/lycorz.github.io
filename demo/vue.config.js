const path = require('path');
function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
    baseUrl: './',
		productionSourceMap: false,
    chainWebpack: config => {
			config.resolve.alias
				.set('@', resolve('src'))
				.set('common', resolve('src/components/common'))
				.set('pages', resolve('src/components/pages'))
		}
}
