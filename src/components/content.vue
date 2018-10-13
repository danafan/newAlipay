<template>
	<div class="bottom">
		<div class="han">
			<div class="title">支付宝明细</div>
			<div class="seachBox">
				<div class="kua">
					<div class="type">业务类型</div>
					<el-select v-model="selType" @change="changeType">
						<el-option
						v-for="item in typeList"
						:key="item.business_type"
						:label="item.business_type"
						:value="item.business_type"
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
				value-format="yyyy-MM-dd"
				:picker-options="pickerOptions1"
				@change="changeDay">
			</el-date-picker>
		</div>
		<el-select v-model="selNum" placeholder="支付宝账号" filterable @change="changeNum">
			<el-option
			v-for="item in accountList"
			:key="item.id"
			:label="item.alipay_name"
			:value="item.id"
			>
		</el-option>
	</el-select>
	<div class="seach" @click="seach">查询</div>
</div>
<div class="down" @click="down">
	<img src="../assets/Excel.png">
	导出excel
</div>
</div>

<!-- 表格 -->
<div class="tabel">
	<el-table :data="tableData" :cell-class-name="tabBox" :header-cell-class-name="tabHead" height="95%" style="height: 95%" v-loading="loading">
		<el-table-column prop="bill_code" label="账务流水号" style="width: 10%">
		</el-table-column>
		<el-table-column prop="business_code" label="业务流水号" style="width: 10%">
		</el-table-column>
		<el-table-column prop="order_sn" label="订单号" style="width: 10%"> 
		</el-table-column>
		<el-table-column prop="goods_name" label="商品名称" style="width: 10%">
		</el-table-column>
		<el-table-column label="发生时间" style="width: 10%">
			<template slot-scope="scope">
				<p>{{scope.row.happen_time | updateTime}}</p>
			</template>
		</el-table-column>
		<el-table-column prop="alipay_name" label="账户" style="width: 10%">
		</el-table-column>
		<el-table-column label="入账金额" style="width: 10%">
			<template slot-scope="scope">
				<p class="blue">{{scope.row.income}}</p>
			</template>
		</el-table-column>
		<el-table-column label="出账金额" style="width: 10%">
			<template slot-scope="scope">
				<p class="hong">{{scope.row.disburse}}</p>
			</template>
		</el-table-column>
		<el-table-column prop="balance" label="余额" style="width: 10%">
		</el-table-column>
		<el-table-column prop="deal" label="交易方式" style="width: 10%">
		</el-table-column>
		<el-table-column prop="business_type" label="业务类型" style="width: 10%">
		</el-table-column>
		<el-table-column prop="account" label="对方账号" style="width: 10%">
		</el-table-column>
		<el-table-column prop="remark" label="备注" style="width: 10%">
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
	display:flex;
	flex-direction: column;
	.han{
		height: 8rem;
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
	}
	
	.tabel{
		flex:1;
		margin-top: 1rem;
		display:flex;
		flex-direction: column;
		.hong{
			color: #ff5858;
		}
		.blue{
			color: #0f98ff;
		}
		.page{
			margin-top: 1rem;
			display:flex;
			justify-content:flex-end;
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
	import resource from '../api/resource.js'
	export default{
		data(){
			return{
				typeList:[],				//业务类型列表
				selType:"",					//选中的业务类型
				accountList:[],				//支付宝账号列表
				tableData: [],				//明细列表
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				daySector:null,				//选中的时间区间
				startTime:"",				//开始时间
				endTime:"",					//结束时间
				selNum:"",					//选中的账号的id
				total:0,					//总条数
				page: 1,					//当前页码
				pagesize:10,				//每页条数
				loading:true
			}
		},
		created(){
			//获取支付宝明细
			let date = sessionStorage.getItem("initDate");
			if(!!date){
				let obj = {
					init_date:date,
					page:this.page,
					pagesize:this.pagesize
				}
				this.getAlipayBill(obj);
			}else{
				let obj = {
					alipay_account_id:this.selNum,
					business_type:this.selType,
					start_date:!!this.daySector ? this.daySector[0] : "",
					end_date:!!this.daySector ? this.daySector[1] : "",
					page:this.page,
					pagesize:this.pagesize
				};
				//获取支付宝明细
				this.getAlipayBill(obj);
			}
			//获取业务类型
			this.getbisType();
			//获取支付宝账户列表
			this.getAlipay();
		},
		methods:{
			//导出
			down(){
				this.$confirm('确认导出支付宝明细?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let href = "http://alipay.ppg8090.com/api/index/exportalipaybilldetail?business_type=" + this.selType + "&alipay_account_id=" + this.selNum + "&start_date=" + this.startTime + "&end_date=" + this.endTime;
					window.open(href);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			},
			//获取业务类型
			getbisType(){
				resource.businessType().then(res => {
					if(res.data.code == '1'){
						this.typeList = res.data.data;
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
			},
			//修改业务类型
			changeType(val){
				this.selType = val;
			},
			//获取支付宝账户列表
			getAlipay(){
				resource.aliPayList().then(res => {
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
			//获取支付宝明细
			getAlipayBill(obj){
				resource.alipayBill(obj).then(res => {
					this.loading = false;
					if(res.data.code == '1'){
						let dataObj = res.data.data;
						this.tableData = dataObj.list.data;		//明细列表
						this.total = dataObj.list.total;		//总条数
						this.page = dataObj.list.current_page;	//当前页
						this.pagesize = parseInt(dataObj.list.per_page);	//每页条数
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
			},
			//监听查询时间的变化
			changeDay(val){
				this.daySector = val;
			},
			//监听账号切换
			changeNum(val){
				console.log(val);
			},
			//点击查询按钮
			seach(){
				sessionStorage.removeItem("initDate");
				let obj = {
					alipay_account_id:this.selNum,
					business_type:this.selType,
					start_date:!!this.daySector ? this.daySector[0] : "",
					end_date:!!this.daySector ? this.daySector[1] : "",
					page:this.page,
					pagesize:this.pagesize
				};
				//获取支付宝明细
				this.getAlipayBill(obj);
			},
			//监听每页条数
			handleSizeChange(val) {
				this.pagesize = val;
				let obj = {
					alipay_account_id:this.selNum,
					business_type:this.selType,
					start_date:!!this.daySector ? this.daySector[0] : "",
					end_date:!!this.daySector ? this.daySector[1] : "",
					page:this.page,
					pagesize:this.pagesize
				};
				//获取支付宝明细
				this.getAlipayBill(obj);
			},
			//监听页码的改变
			handleCurrentChange(val) {
				this.page = val;
				let obj = {
					alipay_account_id:this.selNum,
					business_type:this.selType,
					start_date:!!this.daySector ? this.daySector[0] : "",
					end_date:!!this.daySector ? this.daySector[1] : "",
					page:this.page,
					pagesize:this.pagesize
				};
				//获取支付宝明细
				this.getAlipayBill(obj);
			},
			//设置表格头部样式
			tabHead({ row, rowIndex}) {
				return 'table-head-th';
			},
    		//设置表格内容每一行的样式
    		tabBox({ row, rowIndex}) {
    			return 'table-th';
    		}

    	},
    	filters:{
    		updateTime:function(val){
    			var date = new Date(val * 1000);
    			let Y = date.getFullYear() + '-';
    			let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    			let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    			let h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    			let m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    			let s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    			return Y + M + D + " " + h + m + s;
    		},
    		
    	},


    }
</script>












