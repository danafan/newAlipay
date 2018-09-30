<template>
	<div>
		<div class="bottom">
			<div class="title">支付宝明细</div>
			<div class="seachBox">
				<div class="kua">
					<div class="type">业务类型</div>
					<el-select v-model="selType" @change="changeType">
						<el-option
						v-for="item in typeList"
						:key="item.value"
						:label="item.value"
						:value="item.id"
						>
					</el-option>
				</el-select>
			</div>
			<div class="kua">
				<div class="type">账单日期</div>
				<el-date-picker
				v-model="daySector"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				value-format="timestamp"
				:picker-options="pickerOptions1"
				@change="changeDay">
			</el-date-picker>
		</div>
		<el-select v-model="selNum" placeholder="支付宝账号" @change="changeNum">
			<el-option
			v-for="item in accountList"
			:key="item.id"
			:label="item.value"
			:value="item.id"
			>
		</el-option>
	</el-select>
	<div class="seach" @click="seach">查询</div>
</div>
<div class="down">
	<img src="../assets/Excel.png">
	导出excel
</div>
<!-- 表格 -->
<div class="tabel">
	<el-table :data="tableData" :cell-class-name="tabBox" :header-cell-class-name="tabHead" style="width: 100%">
		<el-table-column prop="date" label="账务流水号" style="width: 10%">
		</el-table-column>
		<el-table-column prop="account" label="业务流水号" style="width: 10%">
		</el-table-column>
		<el-table-column prop="startMoney" label="订单号" style="width: 10%"> 
		</el-table-column>
		<el-table-column prop="income" label="商品名称" style="width: 10%">
		</el-table-column>
		<el-table-column prop="disbur" label="发生时间" style="width: 10%">
		</el-table-column>
		<el-table-column prop="endMoney" label="账户" style="width: 10%">
		</el-table-column>
		<el-table-column prop="endMoney" label="入账金额" style="width: 10%">
			<template slot-scope="scope">
				<p class="blue">{{scope.row.endMoney}}</p>
			</template>
		</el-table-column>
		<el-table-column prop="endMoney" label="出账金额" style="width: 10%">
			<template slot-scope="scope">
				<p class="hong">{{scope.row.endMoney}}</p>
			</template>
		</el-table-column>
		<el-table-column prop="income" label="余额" style="width: 10%">
		</el-table-column>
		<el-table-column prop="disbur" label="交易方式" style="width: 10%">
		</el-table-column>
		<el-table-column prop="endMoney" label="业务类型" style="width: 10%">
		</el-table-column>
		<el-table-column prop="endMoney" label="对方账号" style="width: 10%">
		</el-table-column>
		<el-table-column prop="endMoney" label="备注" style="width: 10%">
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
		position: relative;
		width: 100%;
		text-align:center;
		font-size: .8rem;
		color: #333;
		font-weight: bold;
	}
	.seachBox{
		margin-top: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.kua{
			display:flex;
			align-items: center;
			.type{
				margin-right: 1rem;
				font-size:.8rem;
				color: #333;
			}
		}
		.seach{
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
	.down{
		margin-top: 1rem;
		font-size: .8rem;
		color: #419c49;
		display:flex;
		align-items: center;
		justify-content:flex-end;
		img{
			margin-right: .5rem;
			width: 1.2rem;
			height: 1.2rem;
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
	}
	.page{
		margin-top: 1rem;
		display:flex;
		justify-content:flex-end;
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
				typeList:[{id:"1",value:"全部"},{id:"2",value:"交易付款"},{id:"3",value:"交易退款"},{id:"4",value:"转账"},{id:"5",value:"红包"},{id:"6",value:"其他"}],
				selType:"全部",				//选中的业务类型
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				daySector:"",				//选中的时间区间
				accountList:[{id:"1",value:"13067882143"},{id:"2",value:"15067452143"},{id:"3",value:"13836483838"}],		//账号列表
				selNum:"",						   	  //选中的账号的id
				tableData: [{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				},{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				},{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				},{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				},{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				}],									  //列表
				total:100,				//总条数
				page: 1,				//当前页码
			}
		},
		methods:{
			//设置表格头部样式
			tabHead({ row, rowIndex}) {
				return 'table-head-th';
			},
    		//设置表格内容每一行的样式
    		tabBox({ row, rowIndex}) {
    			return 'table-th';
    		},
			//监听修改的业务类型
			changeType(val){
				console.log(val);
			},
			//监听查询时间的变化
			changeDay(val){
				console.log(val);
			},
			//监听账号切换
			changeNum(val){
				console.log(val);
			},
			//点击查询按钮
			seach(){

			},
			//监听页码的改变
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	}
</script>












