<template>
	<div>
		<div class="loginBox">
			<img src="../assets/background.png">
			<div class="loginInput">
				<div class="title">支付宝管理系统</div>
				<div class="ddd" id="container"></div>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
.ddd{
	background: #ffffff;
	width: 360px!important;
	height: 360px!important;
}
</style>
<style lang="less" scoped>
.loginBox{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.loginInput{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.title{
			margin-bottom: 4.2rem;
			width: 100%;
			text-align:center;
			font-size: 1.8rem;
			color: #fffefe;
		}
	}
}
</style>
<script>
	import http from　'../api/request.js'
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				
			}
		},
		created(){
			this.getAppKey();
		},
		methods:{
			getAppKey() {
				resource.getAppKey().then((res) => {
					if (res.data.code == "1") {
						let appKey = res.data.data.appkey;
						this.ddLoginInit(appKey);
					} else {
						this.$message.warning(res.data.msg);
					}
				});
			},
			ddLoginInit(appKey) {
				let url = `${location.origin}/api/login/dingcallback`;
				// let url = "http://selectiontest.92nu.com/api/scancodes/ewmlogin";
				const goto = encodeURIComponent(
					`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appKey}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`
					);
				window.DDLogin({
					id: "container",
					goto: goto,
					style: "border:none;background-color:#FFFFFF;margin:0 auto;",
        			width: "100%", //官方参数 365
        			height: "460", //官方参数 400
        		});
				let handleMessage = (event) => {
					let origin = event.origin;
					if (origin == "https://login.dingtalk.com") {
						const loginTmpCode = event.data;
						window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appKey}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}&loginTmpCode=${loginTmpCode}`;
					}
				};
				if (typeof window.addEventListener != "undefined") {
					window.addEventListener("message", handleMessage, false);
				} else if (typeof window.attachEvent != "undefined") {
					window.attachEvent("onmessage", handleMessage);
				}
			},
		}
	}
</script>
















