import http from './request.js'
let path = {	
	loginCheck:"login/islogin",						//验证是否登录
	login: 'login/login',		   					//登录
	yesterdayList:"index/yesterday_data",			//首页昨日报表
	inCondition:"index/in_condition_data",			//首页按条件查询账单
	aliPayList:"index/getalipayaccounts",			//支付宝账户列表（所有支付宝账户）
	accountList:"finance/alipayaccountlist",		//支付宝管理
	addAlipay:"finance/alipayaccountadd",			//添加账户
	updateAlipay:"finance/alipayaccountedit",		//修改账户
	daleteAlipay:"finance/alipayaccountdel",		//删除账户
	alipayDetail:"index/alipaybilllist",			//支付宝流水
	businessType:"index/getbusinesstypes",			//所有业务类型
	alipayBill:"index/alipaybilldetail",			//支付宝明细
	downAlipay:"finance/exportalipayaccountlist",	//导出支付宝管理
	businessData:"index/get_business_data",			//鼠标移入收入详情
	payTypeList:'paytype/paytypelist',				//支付类型列表
	addPayType:'paytype/addpaytype',				//添加类型
	editPayType:'paytype/editpaytype',				//编辑类型
	delPayType:'paytype/delpaytype',				//删除支付类型
	getPayTypes:'index/getpaytypes',				//支付类型列表
	loginOut:"login/quitlogin",						//退出登录
}
export default{
	//验证是否登录
	loginCheck(params){
		return http.get(path.loginCheck, params)
	},
	//登录
	login(params){
		return http.post(path.login, params)
	},
	//首页昨日报表
	yesterdayList(params){
		return http.post(path.yesterdayList, params)
	},
	//首页按条件查询账单
	inCondition(params){
		return http.post(path.inCondition, params)
	},
	//支付宝账户列表
	aliPayList(params){
		return http.post(path.aliPayList, params)
	},
	//支付宝管理列表
	accountList(params){
		return http.post(path.accountList, params)
	},
	//添加账户
	addAlipay(params){
		return http.post(path.addAlipay, params)
	},
	//查询账户详情
	alipayDetail(params){
		return http.get(path.updateAlipay, params)
	},
	//修改账户
	updateAlipay(params){
		return http.post(path.updateAlipay, params)
	},
	//删除账户
	daleteAlipay(params){
		return http.get(path.daleteAlipay, params)
	},
	//支付宝流水
	alipayBil(params){
		return http.post(path.alipayDetail, params)
	},
	//获取业务类型
	businessType(params){
		return http.post(path.businessType, params)
	},
	//支付宝明细
	alipayBill(params){
		return http.post(path.alipayBill, params)
	},
	//导出支付宝管理
	downAlipay(params){
		return http.get(path.downAlipay, params)
	},
	//鼠标移入收入详情
	businessData(params){
		return http.post(path.businessData, params)
	},
	//支付类型列表
	payTypeList(params){
		return http.post(path.payTypeList, params)
	},
	//添加类型
	addPayType(params){
		return http.post(path.addPayType, params)
	},
	//获取详情
	getEditPayType(params){
		return http.get(path.editPayType, params)
	},
	//编辑类型
	postEditPayType(params){
		return http.post(path.editPayType, params)
	},
	//删除
	delPayType(params){
		return http.post(path.delPayType, params)
	},
	//支付类型列表
	getPayTypes(params){
		return http.get(path.getPayTypes, params)
	},
	//退出登录
	loginOut(params){
		return http.get(path.loginOut, params)
	},
}

