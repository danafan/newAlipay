<template>
	<div>
		<div class="bottom">
			<div class="title">支付宝管理</div>
			<div class="seachBox">
				<el-select class="seach" v-model="name" filterable placeholder="支付宝账号/店铺名称">
					<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
			<div class="seachs" @click="seach">查询</div>
		</div>
		<div class="setBox">
			<div class="down">
				<img src="../assets/Excel.png">
				导出excel
			</div>
			<div class="add" @click="show('1')">
				<img src="../assets/new.png">
				添加账户
			</div>
		</div>
		<!-- 表格 -->
		<div class="tabel">
			<el-table :data="tableData" :cell-class-name="tabBox" :header-cell-class-name="tabHead" style="width: 100%">
				<el-table-column prop="account" label="支付宝账号" style="width: 10%"> </el-table-column>
				<el-table-column prop="addTime" label="添加时间" style="width: 10%"> </el-table-column>
				<el-table-column prop="shouTime" label="授权时间" style="width: 10%">
				</el-table-column>
				<el-table-column label="账户状态" style="width: 10%">
					<template slot-scope="scope">
						<p class="hong" v-if="scope.row.status == true">未授权</p>
						<p class="blue" v-else>已授权</p>
					</template>
				</el-table-column>
				<el-table-column align="center" label="授权" style="width: 10%">
					<template slot-scope="scope">
						<div class="shou" v-if="scope.row.status == true">授权</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" style="width: 10%">
					<template slot-scope="scope">
						<div class="icon">
							<img src="../assets/update.png" @click="show('2')">
							<img src="../assets/delete.png" @click="show('3')">
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-pagination
		class="page"
		background
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="page"
		:page-sizes="[10, 20, 30, 40]"
		:page-size="10"
		layout="total, sizes, prev, pager, next, jumper"
		:total="100">
	</el-pagination>
</div>
<!-- 弹框 -->
<div class="modelBox" v-if="ismo" @click="hide">
	<!-- 编辑或添加 -->
	<div class="box1" v-if="moType == 1" @click.stop>
		<div class="modelTitle">{{title}}</div>
		<div class="numName">
			<div class="name">账户名称</div>
			<input type="text" v-model="numname">
		</div>
		<div class="submit">提交</div>
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
</div>

</template>
<style lang="less" scoped>
.bottom{
	position: absolute;
	top: 5.65rem;
	bottom: 0;
	width: 100%;
	padding: 1.4rem 3.2rem;
	background-color: #ffffff;
	box-shadow: 0rem 0.2rem 0.46rem 0.04rem 
	rgba(233, 232, 232, 0.82);
	border-radius: 0.2rem;
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
	.tabel{
		margin-top: 1rem;
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
	}
	.page{
		margin-top: 1rem;
		display:flex;
		justify-content:flex-end;
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
		position: relative;
		width: 20.6rem;
		height: 12.3rem;
		background-color: #ffffff;
		border-radius: 0.3rem;
		.modelTitle{
			margin-top: 1.85rem;
			width: 100%;
			text-align: center;
			font-size: .8rem;
			color: #333;
		}
		.numName{
			margin-top: 2.45rem;
			display:flex;
			align-items: center;
			justify-content:center;
			.name{
				margin-right: .85rem;
				font-size: .8rem;
				color: #333;
			}
			input{
				width: 14.4rem;
				height: 1.9rem;
				border: solid 0.05rem #cecece;
			}
		}
		.submit{
			position: absolute;
			bottom: 0;
			left: 0;
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
	export default{
		data(){
			return{
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}],
				name: '',						//输入的搜索名称
				tableData: [{
					account: '23874234',
					addTime: '2018-06-24',
					shouTime:"2017-04-12",
					status:true,
					endMoney:"3787"
				},
				{
					account: '23874234',
					addTime: '2018-06-24',
					shouTime:"2017-04-12",
					status:false,
					endMoney:"3787"
				},{
					account: '23874234',
					addTime: '2018-06-24',
					shouTime:"2017-04-12",
					status:true,
					endMoney:"3787"
				},
				{
					account: '23874234',
					addTime: '2018-06-24',
					shouTime:"2017-04-12",
					status:false,
					endMoney:"3787"
				},{
					account: '23874234',
					addTime: '2018-06-24',
					shouTime:"2017-04-12",
					status:true,
					endMoney:"3787"
				},
				{
					account: '23874234',
					addTime: '2018-06-24',
					shouTime:"2017-04-12",
					status:false,
					endMoney:"3787"
				},{
					account: '23874234',
					addTime: '2018-06-24',
					shouTime:"2017-04-12",
					status:true,
					endMoney:"3787"
				},
				{
					account: '23874234',
					addTime: '2018-06-24',
					shouTime:"2017-04-12",
					status:false,
					endMoney:"3787"
				}],
				total:100,				//总条数
				page: 1,				//当前页码
				id:"",					//操作的id
				ismo:false,				//弹框默认不显示
				moType:1,				//默认弹框1
				title:"添加支付宝账户",	//弹框标题
				numname:"",				//输入的账户名称
			}
		},
		methods:{
			//点击搜索
			seach(){
				console.log(this.name);
			},
			//设置表格头部样式
			tabHead({ row, rowIndex}) {
				return 'table-head-th';
			},
    		//设置表格内容每一行的样式
    		tabBox({ row, rowIndex}) {
    			return 'table-th';
    		},
    		handleSizeChange(val) {
    			console.log(`每页 ${val} 条`);
    		},
    		handleCurrentChange(val) {
    			console.log(`当前页: ${val}`);
    		},
    		//点击添加或编辑
    		show(index){
    			if(index == "1"){
    				this.ismo = true;
    				this.moType = 1;
    				this.title = "添加支付宝账户";
    			}else if(index == "2"){
    				this.ismo = true;
    				this.moType = 1;
    				this.title = "编辑支付宝账户";
    			}else if(index == "3"){
    				this.ismo = true;
    				this.moType = 2;
    			}
    		},
    		//点击关闭弹框
    		hide(){
    			this.numname = "";		//清空账户名
    			this.ismo = false;
    		},
    		//点击删除账户的确认
    		ok(){
    			this.ismo = false;
    			console.log(id);
    		}

    	}
    }
</script>












