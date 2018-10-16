module.exports = {	
	devServer: {
		host: '192.168.1.112', 			//主机名
		port: 8080, 					//端口号（默认8080）
		// autoOpenBrowser: true,		//是否自动打开浏览器
		proxy: {
			'/api': {
				target: 'https://alipay.ppg8090.com',
				ws: true,
				changOrigin: true,		//是否跨域
			}
		}
	}
}