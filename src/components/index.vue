<template>
	<div class="box">
		<!-- 顶部导航 -->
		<div class="tabBar">
			<div class="tabLeft">
				<div class="tabItem" v-for="(item,index) in tabList" :class="{'selTabItem':(item.default == true || item.isHover == true)}" @mouseenter="enter(index)" @mouseleave="leave(index)" @click="changeTab(index)">
					{{item.name}}
					<div v-if="item.isChild == true">
						<img src="../assets/down1.png" v-if="item.default == true || item.isHover == true">
						<img src="../assets/down.png" v-else>
					</div>
					<div class="line" v-if="item.default == true"></div>
					<div class="selectBox" v-if="item.isHover == true && item.isChild == true" @click.stop>
						<div class="selItem" :class="{'selectedItem':aliTab == 0}" @click="selAli(0,index)">支付宝管理</div>
						<div class="selItem" :class="{'selectedItem':aliTab == 1}" @click="selAli(1,index)">支付宝流水</div>
					</div>
				</div>
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
				tabList:[{
					name:"首页",
					default:true,
					isHover:false,
					isChild:false
				},{
					name:"财务",
					default:false,
					isHover:false,
					isChild:true	
				}],									
				aliTab:-1,			//默认选中支付宝管理
				isAli:false,		//默认财务子菜单不显示
				username:"",		//用户名
			}
		},
		watch:{
			$route(n){
				if(n.path == "/home"){
					this.tabList[0].default = true;
					this.tabList[1].default = false;
				}else if(n.path == "/index"){
					let tab = sessionStorage.getItem("tab");
					if(!!tab){
						this.$router.push(tab);
						if(tab == '/home'){
							this.tabList[0].default = true;
							this.tabList[1].default = false;
						}else if(tab == '/control'){
							this.tabList[1].default = true;
							this.tabList[0].default = false;
							this.aliTab = 0;
						}else if(tab == '/detailed' || tab == '/content'){
							this.tabList[1].default = true;
							this.tabList[0].default = false;
							this.aliTab = 1;
						}
					}else{
						this.$router.push('/home');
					}
				}else{
					this.tabList[1].default = true;
					this.tabList[0].default = false;
				};
			}
		},
		created(){
			this.username = sessionStorage.getItem("username");
			let tab = sessionStorage.getItem("tab");
			if(!!tab){
				this.$router.push(tab);
				if(tab == '/home'){
					this.tabList[0].default = true;
					this.tabList[1].default = false;
				}else if(tab == '/control'){
					this.tabList[1].default = true;
					this.tabList[0].default = false;
					this.aliTab = 0;
				}else if(tab == '/detailed' || tab == '/content'){
					this.tabList[1].default = true;
					this.tabList[0].default = false;
					this.aliTab = 1;
				}
			}else{
				this.$router.push('/home');
			}
		},
		methods:{
			//鼠标移入导航                              
			enter(index){	                          
				this.tabList[index].isHover = true;                 
			},                                        
			//鼠标移出导航                              
			leave(index){	
				this.tabList[index].isHover = false;  
			},
			//点击切换导航
			changeTab(index){
				for (var i = 0; i < this.tabList.length; i++) {
					if(i != index){
						this.tabList[i].default = false;
					}else{
						this.tabList[i].default = true;
					}
				}
				if(index == 0){
					sessionStorage.setItem("tab",'/home');
					this.$router.push('/home');
					this.aliTab = -1;
				}else{
					if(this.aliTab == -1){
						sessionStorage.setItem("tab",'/control');
						this.aliTab = 0;
						this.$router.push('/control');
					}else{
						let tab = sessionStorage.getItem("tab");
						this.$router.push(tab);
					}
				}
			},
			//点击切换财务导航
			selAli(type,index){
				for (var i = 0; i < this.tabList.length; i++) {
					if(i != index){
						this.tabList[i].default = false;
					}else{
						this.tabList[i].default = true;
					}
				}
				this.aliTab = type;
				this.isAli = false;
				if(type == 0){
					sessionStorage.setItem("tab",'/control');
					this.$router.push('/control');
				}else{
					sessionStorage.setItem("tab",'/detailed');
					this.$router.push('/detailed');
				}
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










