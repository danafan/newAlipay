module.exports = {	
	devServer: {
		proxy: {
			'/api': {
				// target: 'http://alipay.92nu.com',
				target: 'http://testalipay.92nu.com',
				ws: true,
				changOrigin: true,		//是否跨域
			}
		}
	}
}