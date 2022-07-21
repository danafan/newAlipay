<template>
	<div class="bottom">
		<div class="han">
			<div class="title">支付宝明细</div>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="业务类型：">
					<el-select v-model="business_type" :popper-append-to-body="false" filterable clearable placeholder="全部">
						<el-option v-for="item in business_type_list" :key="item.business_type" :label="item.business_type" :value="item.business_type">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="账单日期：">
					<el-date-picker
					v-model="bill_date"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd"
					:picker-options="pickerOptions1"
					>
				</el-date-picker>
			</el-form-item>
			<el-form-item label="费用类型：">
				<el-select v-model="pay_type" placeholder="全部" clearable filterable>
					<el-option
					v-for="item in pay_type_list"
					:key="item.type_name"
					:label="item.type_name"
					:value="item.type_name"
					>
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="支付宝账号：">
			<el-select v-model="alipay_account_id" placeholder="全部" clearable filterable>
				<el-option
				v-for="item in account_list"
				:key="item.id"
				:label="item.alipay_name"
				:value="item.id"
				>
			</el-option>
		</el-select>
	</el-form-item>
	<el-form-item>
		<el-button type="primary" size="small" @click="searchFun">搜索</el-button>
	</el-form-item>
</el-form>
<div style="display:flex;justify-content: flex-end">
	<div class="down" @click="down">
	<img src="../assets/Excel.png">
	导出excel
</div>
</div>

</div>
<!-- 表格 -->
<div class="tabel">
	<el-table :data="dataObj.data" :cell-class-name="tabBox" :header-cell-class-name="tabHead" height="95%" style="height: 95%" v-loading="loading">
		<el-table-column prop="bill_code" label="账务流水号" style="width: 10%">
		</el-table-column>
		<el-table-column prop="business_code" label="业务流水号" style="width: 10%">
		</el-table-column>
		<el-table-column prop="order_sn" label="订单号" style="width: 10%"> 
		</el-table-column>
		<el-table-column prop="alipay_name" label="支付宝账号" style="width: 10%"> 
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
		<el-table-column prop="pay_type" label="费用类型" style="width: 10%">
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
	:total="dataObj.total">
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
			margin-bottom: 15px;
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
				bill_date:[],				//选中的时间区间
				business_type_list:[],		//业务类型列表
				business_type:"",			//选中的业务类型
				account_list:[],			//支付宝账号列表
				alipay_account_id:"",		//选中的支付宝账号
				pay_type_list:[],			//支付类型列表
				pay_type:"",				//选中的支付类型
				dataObj:{},					//返回数据
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				page: 1,					//当前页码
				pagesize:10,				//每页条数
				loading:true
			}
		},
		created(){
			this.bill_date[0] = this.$route.query.date;			//时间区间
			this.bill_date[1] = this.$route.query.date;			//时间区间
			this.alipay_account_id = parseInt(this.$route.query.id);		//选中的商家id
			//获取支付宝账户列表
			this.getAlipay();
			//获取业务类型
			this.getbisType();
			//费用类型列表
			this.getPayTypes();
			//获取支付宝明细
			this.getAlipayBill();
		},
		methods:{
			//导出
			down(){
				this.$confirm('确认导出支付宝明细?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let start_date = this.bill_date && this.bill_date.length> 0?this.bill_date[0]:"";
					let end_date = this.bill_date && this.bill_date.length> 0?this.bill_date[1]:"";
					let href = "http://alipay.92nu.com/api/index/exportalipaybilldetail?business_type=" + this.business_type + "&alipay_account_id=" + this.alipay_account_id + '&pay_type=' + this.pay_type + "&start_date=" + start_date + "&end_date=" + end_date;
					// console.log(href)
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
						this.business_type_list = res.data.data;
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
			},
			//获取支付宝账户列表
			getAlipay(){
				resource.aliPayList().then(res => {
					if(res.data.code == "1"){
						this.account_list = res.data.data;
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
			},
			//支付类型列表
			getPayTypes(){
				resource.getPayTypes().then(res => {
					if(res.data.code == 1){
						this.pay_type_list = res.data.data;
					}else{
						this.$message.warning(res.data.message);
					}
				})
			},
			//搜索
			searchFun(){
				this.page = 1;
				//获取支付宝明细
				this.getAlipayBill();
			},
			//获取支付宝明细
			getAlipayBill(){
				let arg = {
					alipay_account_id:!this.alipay_account_id?'0':this.alipay_account_id,
					business_type:this.business_type,
					pay_type:this.pay_type,
					start_date:this.bill_date && this.bill_date.length> 0?this.bill_date[0]:"",
					end_date:this.bill_date && this.bill_date.length> 0?this.bill_date[1]:"",
					page:this.page,
					pagesize:this.pagesize
				};
				resource.alipayBill(arg).then(res => {
					this.loading = false;
					if(res.data.code == '1'){
						this.dataObj = res.data.data.list;
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
			},
			//分页
			handleSizeChange(val) {
				this.pagesize = val;
				//获取列表
				this.getAlipayBill();
			},
			handleCurrentChange(val) {
				this.page = val;
				//获取列表
				this.getAlipayBill();
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
    		}	
    	}
    }
</script>












