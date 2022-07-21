<template>
	<div class="box">
		<!-- 顶部导航 -->
		<div class="tabBar">
			<div class="tabLeft">
				<el-menu 
				:default-active="activeIndex" 
				:router="true" 
				:unique-opened="true" 
				class="el-menu-demo" 
				mode="horizontal" 
				@select="handleSelect">
				<el-menu-item index="/home">首页</el-menu-item>
				<el-submenu index="2">
					<template slot="title">财务</template>
					<el-menu-item index="/control">支付宝管理</el-menu-item>
					<el-menu-item index="/detailed">支付宝流水</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">费用类型</template>
					<el-menu-item index="/cost_type">费用类型管理</el-menu-item>
				</el-submenu>
			</el-menu>
		</div>
		<div class="tabRight">
			<div class="userItem">
				<img class="userimg" src="../assets/background.png">
				{{username}}
			</div>
			<div class="userItem" @click="loginOut">
				<img class="quit" src="../assets/quit.png">
				退出
			</div>
		</div>
	</div>
	<!-- 下面内容 -->
	<div class="cotentBox">
		<router-view></router-view>
	</div>
</div>
</template>
<style lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #f4f4f4;
	display:flex;
	flex-direction: column;
}
.tabBar{
	width: 100%;
	height: 4rem;
	background: #fff;
	display:flex;
	justify-content: space-between;
	padding-left: 7.4rem;
	padding-right: 7.4rem;
	.tabLeft{
		height: 4rem;
		display: flex;
		align-items: center;
		font-size: .8rem;
		color: #333;
		.tabItem{
			position: relative;
			margin-right: 1rem;
			height: 4rem;
			width: 4.35rem;
			display:flex;
			align-items: center;
			justify-content:center;
			img{
				margin-left: .75rem;
				width: 0.7rem;
				height: 0.5rem;
			}
			.line{
				position: absolute;
				left: 0;
				bottom:0;
				width: 100%;
				height: .15rem;
				background: #0f98ff;
			}
			.selectBox{
				background: #fff;
				box-shadow: 0rem 0.2rem 0.46rem 0.04rem 
				rgba(233, 232, 232, 0.82);
				border-radius: 0.2rem;
				position: absolute;
				bottom: -5.35rem;
				left: 0;
				width: 100%;
				height: 5.35rem;
				display:flex;
				flex-direction: column;
				align-items: center;
				justify-content:center;
				font-size: .7rem;
				color: #333;
				z-index: 9;
				.selItem{
					line-height: 2rem;
				}
				.selItem:hover{
					color: #24a0fd;
				}
				.selectedItem{
					color: #24a0fd;
				}
			}
		}
		.selTabItem{
			height: 4rem;
			color: #0f98ff;
		}
	}
	.tabRight{
		height: 4rem;
		display: flex;
		align-items: center;
		font-size: .8rem;
		color: #333;
		.userItem{
			height: 4rem;
			margin-left: 2.85rem;
			display:flex;
			align-items: center;
			.userimg{
				margin-right: .55rem;
				border-radius: 50%;
				width: 1.95rem;
				height: 1.95rem;
			}
			.quit{
				margin-right: .55rem;
				width: 1.35rem;
				height: 1.5rem;
			}
		}
	}
}
.cotentBox{
	margin-top: 1.65rem;
	width: 100%;
	flex:1;
	box-shadow: 0rem 0.2rem 0.46rem 0.04rem 
	rgba(233, 232, 232, 0.82);
	border-radius: 0.2rem;
}
</style>
<script>
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				activeIndex:"/home",
				username:"",		//用户名
			}
		},
		created(){
			this.username = sessionStorage.getItem("username");
			let tab = sessionStorage.getItem("tab");
			this.activeIndex = tab;
		},
		methods:{
			//切换导航
			handleSelect(index){
				sessionStorage.setItem("tab",index);
				this.activeIndex = index;
			},
			//退出
			loginOut(){
				this.$confirm('确认退出?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.loginOut().then(res => {
						if(res.data.code == '1'){
							sessionStorage.clear();
							this.$message({
								type: 'success',
								message: '已退出'
							}); 
							this.$router.replace("/login");
						}else{
							this.$message({
								type: 'warning',
								message: res.data.message
							});   
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消退出'
					});          
				});
			}
		}
	}
</script>










