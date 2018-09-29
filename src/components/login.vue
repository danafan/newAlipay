<template>
	<div>
		<div class="loginBox">
			<img src="../assets/background.png">
			<div class="loginInput">
				<div class="title">支付宝管理系统</div>
				<div class="content">
					<div class="gan">
						<div class="label">请输入您的账号</div>
						<input type="text" v-model="uasename">
					</div>
					<div class="gan">
						<div class="label">请输入您的密码</div>
						<input type="password" v-model="password">
					</div>
					<div class="gan">
						<div class="label">请输入您的验证码</div>
						<div class="code">
							<input class="codes" type="text" v-model="code">
							<div class="getCode"></div>
						</div>
					</div>
					<div class="login">登录</div>
				</div>
			</div>
		</div>
	</div>
</template>
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
		.content{
			width: 29.45rem;
			height: 33.2rem;
			background-color: #03080e;
			border-radius: 0.3rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.gan{
				margin-bottom: 1.5rem;
				.label{
					font-size: 0.8rem;
					color: #fff;
				}
				input{
					margin-top: .85rem;
					width: 20.95rem;
					height: 2.5rem;
					background-color: #ffffff;
					border-radius: 0.2rem;
					font-size: .8rem;
					color: #333;
				}
				.code{
					width: 20.95rem;
					display:flex;
					.codes{
						margin-right: .5rem;
						width:50%;
						height: 2.5rem;
						background-color: #ffffff;
						border-radius: 0.2rem;
						font-size: .8rem;
						color: #333;
					}
					.getCode{
						margin-top: .85rem;
						width:50%;
						height: 2.5rem;
						background-color: #ffffff;
						border-radius: 0.2rem;
						font-size: .8rem;
						color: #333;
					}
				}
			}
			.login{
				margin-top: 4.25rem;
				width: 20.95rem;
				text-align: center;
				height: 2.5rem;
				line-height: 2.5rem;
				background-color: #0f98ff;
				border-radius: 0.2rem;
				font-size: .8rem;
				color: #fff;
			}
		}
	}
}
</style>
<script>
	export default{
		data(){
			return{
				uasename: "",				//用户名
				password: "",				//密码
				code: "",					//验证码
			}
		}
	}
</script>
















