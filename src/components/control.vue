<template>
	<div class="sd">
		<div class="bottom">
			<div class="han">
				<div class="title">支付宝管理</div>
				<div class="seachBox">
					<el-select style="width: 200px" v-model="name" filterable placeholder="支付宝账号/店铺名称">
						<el-option
						v-for="item in accountList"
						:key="item.id"
						:label="item.alipay_name"
						:value="item.id">
					</el-option>
				</el-select>
				<el-input style="margin-left: 10px;width: 200px" v-model="company_body" placeholder="请输入公司主体"></el-input>
				<el-input style="margin-left: 10px;width: 200px" v-model="shop" placeholder="请输入店铺"></el-input>
				<el-button style="margin-left: 10px" type="primary" @click="serach">查询</el-button>
			</div>
			<div class="setBox">
				<div class="down" @click="down">
					<img src="../assets/Excel.png">
					导出excel
				</div>
				<div class="add" @click="show('1')">
					<img src="../assets/new.png">
					添加账户
				</div>
			</div>
		</div>
		<!-- 表格 -->
		<div class="tabel">
			<el-table :data="tableData" :cell-class-name="tabBox" :header-cell-class-name="tabHead" height="95%" style="width: 100%;height: 95%" :empty-text="text" v-loading="loading">
				<el-table-column prop="alipay_name" label="支付宝账号" style="width: 10%"> </el-table-column>
				<el-table-column prop="company_body" label="公司主体" style="width: 10%"> </el-table-column>
				<el-table-column prop="shop" label="店铺" style="width: 10%"> </el-table-column>
				<el-table-column label="添加时间" style="width: 10%">
					<template slot-scope="scope">
						<p>{{scope.row.add_time | updateTime}}</p>
					</template>
				</el-table-column>
				<el-table-column label="授权时间" style="width: 10%">
					<template slot-scope="scope">
						<p v-if="!!scope.row.grant_time">{{scope.row.grant_time | updateTime}}</p>
					</template>
				</el-table-column>
				<el-table-column label="账户状态" style="width: 10%">
					<template slot-scope="scope">
						<p class="hong" v-if="scope.row.account_status == 0">未授权</p>
						<p class="blue" v-else>已授权</p>
					</template>
				</el-table-column>
				<el-table-column align="center" label="授权" style="width: 10%">
					<template slot-scope="scope">
						<div class="shou" v-if="scope.row.account_status == 0" @click="grant(scope.row.grant_url)">授权</div>
					</template>
				</el-table-column>
				<el-table-column prop="account_remark" label="备注" style="width: 10%"> </el-table-column>
				<el-table-column label="操作" style="width: 10%">
					<template slot-scope="scope">
						<div class="icon">
							<img src="../assets/update.png" @click="show('2',scope.row.id)">
							<img src="../assets/delete.png" @click="show('3',scope.row.id)">
						</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
			class="page"
			background
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page"
			:page-sizes="[10, 20, 30, 40]"
			:page-size="pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>
	</div>

</div>
<!-- 弹框 -->
<div class="modelBox" v-if="ismo" @click="hide">
	<!-- 编辑或添加 -->
	<div class="box1" v-if="moType == 1" @click.stop>
		<div class="modelTitle">{{title}}</div>
		<div class="content">
			<el-form size="mini">
				<el-form-item label="账户名称：" required>
					<el-input style="width:180px" placeholder="请输入账户名称" v-model="numname">
					</el-input>
				</el-form-item>
				<el-form-item label="公司主体：">
					<el-input style="width:180px" placeholder="请输入公司主体" v-model="edit_company_body">
					</el-input>
				</el-form-item>
				<el-form-item label="店铺：">
					<el-input style="width:180px" placeholder="请输入店铺" v-model="edit_shop">
					</el-input>
				</el-form-item>
				<el-form-item label="备注：">
					<el-input style="width:180px" placeholder="请输入备注" v-model="account_remark">
					</el-input>
				</el-form-item>
			</el-form>
		</div>
		
		<div class="submit" @click="submit">提交</div>
	</div>
	<!-- 删除 -->
	<div class="box2" v-if="moType == 2" @click.stop>
		<div class="txt">确认删除该账户？</div>
		<div class="buts">
			<div class="but ok" @click="ok">确认</div>
			<div class="but qu" @click="ismo = false">取消</div>
		</div>
	</div>
</div>
<!-- 二维码框 -->
<div class="qrcodeBox" v-show="isQrcode" @click = "clearCanvas">
	<div class="title">扫码授权</div>
	<div class="mei">
		<canvas id="qrcode" ref="qrcode"></canvas>
	</div>
</div>
</div>

</template>
<style lang="less" scoped>
.sd{
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.bottom{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 1.4rem 3.2rem;
	background-color: #ffffff;
	box-shadow: 0rem 0.2rem 0.46rem 0.04rem 
	rgba(233, 232, 232, 0.82);
	border-radius: 0.2rem;
	display:flex;
	flex-direction: column;
	.han{
		height: 9.6rem;
		.title{
			margin-top: 1.2rem;
			width: 100%;
			text-align: center;
			font-size: .8rem;
			color: #333;
			font-weight: bold;
		}
		.seachBox{
			margin-top: 2.4rem;
			display: flex;
			justify-content: center;
			align-items: center;
			.seach{
				width: 23.4rem;
			}
			.seachs{
				margin-left: 4.75rem;
				width: 7.6rem;
				text-align:center;
				height: 2.6rem;
				line-height:2.6rem;
				background: #0f98ff;
				border-radius: 0.2rem;
				font-size: .8rem;
				color: #fff;
			}
		}
		.setBox{
			margin-top: .6rem;
			display:flex;
			align-items: center;
			justify-content:flex-end;
			font-size: .8rem;
			.down{
				margin-right: 2.35rem;
				display:flex;
				align-items: center;
				color: #419c49;
				img{
					margin-right: .5rem;
					width: 1.2rem;
					height: 1.2rem;
				}
			}
			.add{
				display:flex;
				align-items: center;
				color: #4ab2ff;
				img{
					margin-right: .5rem;
					width: 1.45rem;
					height: 1.45rem;
				}
			}
		}
	}
	.tabel{
		flex: 1;
		margin-top: 1rem;
		display:flex;
		flex-direction: column;
		.hong{
			color: #ff5858;
		}
		.blue{
			color: #0f98ff;
		}
		.shou{
			margin: 0 auto;
			width: 4.65rem;
			text-align: center;
			height: 1.8rem;
			line-height: 1.8rem;
			border-radius: 0.85rem;
			border: solid 0.05rem #0f98ff;
			font-size: .6rem;
			color: #0f98ff;
		}
		.icon{
			img{
				margin-right: .5rem;
				width: 1.2rem;
				height: 1.1rem;
			}
		}
		.page{
			margin-top: 1rem;
			display:flex;
			justify-content:flex-end;
		}
	}
	
}
.modelBox{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.6);
	z-index: 10;
	display:flex;
	align-items: center;
	justify-content:center;
	.box1{
		width: 320px;
		background-color: #ffffff;
		border-radius: 0.3rem;
		.modelTitle{
			margin-top: 15px;
			width: 100%;
			text-align: center;
			font-size: .8rem;
			color: #333;
		}
		.content{
			padding:15px;
		}
		.submit{
			width: 100%;
			text-align: center;
			height: 2.5rem;
			line-height: 2.5rem;
			background-color: #0f98ff;
			border-radius: 0rem 0rem 0.3rem 0.3rem;
			font-size: .8rem;
			color: #fff;
		}
	}
	.box2{
		position: relative;
		width: 16.9rem;
		height: 8.65rem;
		background-color: #ffffff;
		border-radius: 0.3rem;
		.txt{
			margin-top: 2.5rem;
			width: 100%;
			text-align: center;
			font-size: .8rem;
			color: #333;
		}
		.buts{
			border-top: 1px solid #0f98ff;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			font-size: .8rem;
			display:flex;
			.but{
				width: 50%;
				text-align: center;
				height: 2.5rem;
				line-height: 2.5rem;
			}
			.ok{
				border-radius: 0 0 0 0.3rem;
				background: #0f98ff;
				color: #fff;
			}
			.qu{
				color: #0f98ff;
			}
		}
	}
}
.qrcodeBox{
	background: rgba(0,0,0,.6);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	display:flex;
	align-items: center;
	justify-content:center;
	flex-direction: column;
	.title{
		width: 20rem;
		height: 3rem;
		line-height:3rem;
		text-align:center;
		font-size: 1.2rem;
		color: #0f98ff;
	}
	.mei{
		background: #fff;
		display:flex;
		align-items: center;
		justify-content:center;
		#qrcode{
			width: 18rem!important;
			height: 18rem!important;
		}
	}
}
</style>
<style>
.el-table .table-head-th{
	background:#cecece;
	text-align:center;
	color:#333; 
}
.el-table .table-th{
	text-align:center;
	color:#666; 
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
	background-color: #0f98ff;
	color: #fff;
}
</style>
<script>
	import QRCode from 'qrcode';
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				accountList: [],		//支付宝账号列表
				name: '',				//输入的搜索id
				company_body:"",		//公司主体
				shop:"",				//店铺
				page: 1,				//当前页码
				pagesize:10,			//每页的条数
				tableData: [],			//列表
				total:0,				//总条数
				id:"",					//操作的id
				ismo:false,				//弹框默认不显示
				moType:1,				//默认弹框1
				title:"添加支付宝账户",	//弹框标题
				numname:"",				//输入的账户名称
				edit_company_body:"",	//公司主体
				edit_shop:"",			//店铺
				account_remark:"",		//备注
				text:"正在加载...",		//表格正在加载或者为空
				isQrcode:false,			//默认二维码弹框不显示
				loading: true
			}
		},
		created(){
			//获取支付宝账户列表
			this.getAlipay();
            //获取所有列表
            let obj = {
            	alipay_account_id:this.name,
            	company_body:this.company_body,
            	shop:this.shop,
            	page:this.page,
            	pagesize:this.pagesize
            }
            this.accountLists(obj);
        },
        methods:{
        	//导出
        	down(){
        		this.$confirm('确认导出支付宝账户?', '提示', {
        			confirmButtonText: '确定',
        			cancelButtonText: '取消',
        			type: 'warning'
        		}).then(() => {
        			let href = "http://alipay.92nu.com/api/finance/exportalipayaccountlist";
        			window.open(href)
        		}).catch(() => {
        			this.$message({
        				type: 'info',
        				message: '已取消'
        			});          
        		});
        	},
			//获取支付宝账户列表
			getAlipay(){
				resource.aliPayList({is_all:1}).then(res => {
					if(res.data.code == "1"){
						this.accountList = res.data.data;
						let obj = {
							id:"",
							alipay_name:"全部"
						}
						this.accountList.unshift(obj);
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
			},
			//查询列表
			serach(){
				this.loading = true;
				let obj = {
					alipay_account_id:this.name,
					company_body:this.company_body,
					shop:this.shop,
					page:1,
					pagesize:10
				}
    			//获取所有列表
    			this.accountLists(obj);
    		},
			//获取所有列表
			accountLists(obj){
				resource.accountList(obj).then(res => {
					this.loading = false;
					if(res.data.code == '1'){
						let dataObj = res.data.data;
						if(dataObj.data.length == 0){
							this.text = "暂无数据";
						}else{
							this.tableData = dataObj.data;			//列表
						}
						this.page = dataObj.current_page;			//当前页
						this.pagesize = parseInt(dataObj.per_page);	//每页条数
						this.total = dataObj.total;					//总条数
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
			},
			//点击添加或编辑
			show(index,id){
    			this.ismo = true;					//弹框显示
    			if(index == "1"){					//添加
    				this.moType = 1;
    				this.title = "添加支付宝账户";
    			}else if(index == "2"){				//编辑
    				this.id = id;
    				this.moType = 1;
    				this.title = "编辑支付宝账户";
    				resource.alipayDetail({id:this.id}).then(res => {
    					if(res.data.code == '1'){
    						this.numname = res.data.data.alipay_name;
    						this.edit_company_body = res.data.data.company_body;
    						this.edit_shop = res.data.data.shop;
    						this.account_remark = res.data.data.account_remark;
    					}else{
    						this.$message({
    							message: res.data.message,
    							type: 'warning'
    						});
    					}
    				});
    			}else if(index == "3"){				//删除
    				this.id = id;
    				this.moType = 2;
    			}
    		},
			//点击添加或编辑的确定
			submit(){
				if(this.numname == ""){
					this.$message({
						message: "请输入账户名称",
						type: 'warning'
					});
				}else{
					if(this.title == "添加支付宝账户"){
						let arg = {
							alipay_name:this.numname,
							company_body:this.edit_company_body,
							shop:this.edit_shop,
							account_remark:this.account_remark
						}
						resource.addAlipay(arg).then(res => {
							if(res.data.code == '1'){
								this.$message({
									message: res.data.message,
									type: 'success'
								});
								this.ismo = false;	//关闭弹框
								this.numname = "";	//清空输入框
								this.edit_company_body = "";
								this.edit_shop = "";
								this.account_remark = "";
								this.accountLists();//获取所有列表
							}else{
								this.ismo = false;	//关闭弹框
								this.numname = "";	//清空输入框
								this.edit_company_body = "";
								this.edit_shop = "";
								this.account_remark = "";
								this.$message({
									message: res.data.message,
									type: 'warning'
								});
							}
						});
					}else if(this.title == "编辑支付宝账户"){
						let obj = {
							id:this.id,
							alipay_name:this.numname,
							company_body:this.edit_company_body,
							shop:this.edit_shop,
							account_remark:this.account_remark
						}
						resource.updateAlipay(obj).then(res => {
							if(res.data.code == "1"){
								this.$message.success(res.data.message)
								this.ismo = false;	//关闭弹框
								this.numname = "";	//清空输入框
								this.edit_company_body = "";
								this.edit_shop = "";
								this.account_remark = "";
								this.accountLists();//获取所有列表
							}else{
								this.$message({
									message: res.data.message,
									type: 'warning'
								});
							}
						});
					}
					
				}
			},
			//设置表格头部样式
			tabHead({ row, rowIndex}) {
				return 'table-head-th';
			},
    		//设置表格内容每一行的样式
    		tabBox({ row, rowIndex}) {
    			return 'table-th';
    		},
    		//切换页码
    		handleCurrentChange(val) {
    			this.loading = true;
    			this.page = val;
    			let obj = {
    				alipay_account_id:this.name,
    				company_body:this.company_body,
    				shop:this.shop,
    				page:this.page,
    				pagesize:this.pagesize
    			}
    			//获取所有列表
    			this.accountLists(obj);
    		},
    		//切换每页条数
    		handleSizeChange(val) {
    			this.loading = true;
    			this.pagesize = val;
    			let obj = {
    				alipay_account_id:this.name,
    				company_body:this.company_body,
    				shop:this.shop,
    				page:this.page,
    				pagesize:this.pagesize
    			}
    			//获取所有列表
    			this.accountLists(obj);
    		},
    		//点击关闭弹框
    		hide(){
    			this.numname = "";		//清空账户名
    			this.edit_company_body = "";
    			this.edit_shop = "";
    			this.account_remark = "";
    			this.ismo = false;
    		},
    		//点击授权
    		grant(url){
    			this.isQrcode = true;
    			var canvas = document.querySelector('canvas')
    			QRCode.toCanvas(canvas, url)       
    		},
    		//点击关闭二维码弹框清除二维码
    		clearCanvas(){
    			this.$refs.qrcode.innerHTML = ""; 
    			this.isQrcode = false;
    		},
    		//点击删除账户的确认
    		ok(){
    			resource.daleteAlipay({id:this.id}).then(res => {
    				if(res.data.code == "1"){
    					this.$message({
    						message: res.data.message,
    						type: 'success'
    					});
    					this.ismo = false;	//关闭弹框
						this.accountLists();//获取所有列表
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
    		}
    	},
    	filters:{
    		updateTime:function(val){
				var date = new Date(val * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
				return Y + M + D;
			}
		}
	}
</script>












