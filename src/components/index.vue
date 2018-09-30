<template>
	<div class="box">
		<!-- 顶部导航 -->
		<div class="tabBar">
			<div class="tabLeft">
				<div class="tabItem" :class="{'selTabItem':selTab == 0}" @click="changeTab(0)">首页
					<div class="line" v-if="selTab == 0"></div>
				</div>
				<div class="tabItem" :class="{'selTabItem':selTab == 1}" @click="changeTab(1)" @click.stop>
					财务
					<img src="../assets/down1.png" v-if="selTab == 1">
					<img src="../assets/down.png" v-else>
					<div class="line" v-if="selTab == 1"></div>
					<div class="selectBox" v-if="isAli == true"  @click.stop>
						<div class="selItem" :class="{'selectedItem':aliTab == 0}" @click="selAli(0)">支付宝管理</div>
						<div class="selItem" :class="{'selectedItem':aliTab == 1}" @click="selAli(1)">支付宝流水</div>
					</div>
				</div>
			</div>
			<div class="tabRight">
				<div class="userItem">
					<img class="userimg" src="../assets/background.png">
					张小乙
				</div>
				<div class="userItem">
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
		display: flex;
		align-items: center;
		font-size: .8rem;
		color: #333;
		.tabItem{
			position: relative;
			margin-right: 1rem;
			height: 100%;
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
				.selectedItem{
					color: #24a0fd;
				}
			}
		}
		.selTabItem{
			color: #0f98ff;
		}
	}
	.tabRight{
		display: flex;
		align-items: center;
		font-size: .8rem;
		color: #333;
		.userItem{
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
	export default{
		data(){
			return{
				selTab:0,			//默认选中首页
				aliTab:0,			//默认选中支付宝管理
				isAli:false,		//默认财务子菜单不显示
			}
		},
		created(){
			let tab = sessionStorage.getItem("tab");
			if(!!tab){
				this.$router.push(tab);
				if(tab == '/home'){
					this.selTab = 0;
				}else if(tab == '/control'){
					this.selTab = 1;
					this.aliTab = 0;
				}else if(tab == '/detailed' || tab == '/content'){
					this.selTab = 1;
					this.aliTab = 1;
				}
			}else{
				this.$router.push('/home');
			}
		},	
		methods:{
			//点击切换导航
			changeTab(index){
				this.selTab = index;
				if(index == 0){
					sessionStorage.setItem("tab",'/home');
					this.$router.push('/home');
					this.aliTab = 0;
					this.isAli = false;
				}else{
					this.isAli = !this.isAli;
					if(this.aliTab == 0){
						this.$router.push('/control');
					}else{
						let tab = sessionStorage.getItem("tab");
						this.$router.push(tab);
					}
				}
			},
			//点击切换财务导航
			selAli(index){
				this.aliTab = index;
				this.isAli = false;
				if(index == 0){
					sessionStorage.setItem("tab",'/control');
					this.$router.push('/control');
				}else{
					sessionStorage.setItem("tab",'/detailed');
					this.$router.push('/detailed');
				}
			}
		}
	}
</script>










