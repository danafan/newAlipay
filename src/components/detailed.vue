<template>
	<div class="bottom">
		<div class="han">
			<div class="title">支付宝流水
				<div class="down" @click="down">
					<img src="../assets/Excel.png">
					导出excel
				</div>
			</div>
			<!-- 查询条件弹框 -->
			<div class="date">
				<datePicker :alipay="accountList" @change="callback"></datePicker>
			</div>
			<!-- 总统计 -->
			<div class="biao">
				<div>总收入：{{income_total}}</div>
				<div>总支出：{{disburse_total}}</div>
			</div>
		</div>
		<!-- 表格 -->
		<div class="tabel">
			<el-table :data="tableData" :cell-class-name="tabBox" :header-cell-class-name="tabHead" height="95%" style="width: 100%;height:95%" :empty-text="text" v-loading="loading">
				<el-table-column prop="bill_date" label="日期" style="width: 10%">
				</el-table-column>
				<el-table-column prop="bill_account" label="支付宝账号" style="width: 10%"> </el-table-column>
				<el-table-column prop="init_balance" label="初始余额" style="width: 10%"> </el-table-column>
				<el-table-column label="收入" style="width: 10%">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
							<p v-for="item in incomeList">{{item | updateIncome}}</p>
							<div slot="reference" class="blue" @mouseenter="mouseEnter(scope.row,1)">
								{{ scope.row.income }}
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column label="支出" style="width: 10%">
					<template slot-scope="scope">
						<el-popover trigger="hover" placement="top">
							<p v-for="item in incomeList">{{item | updateIncome}}</p>
							<div slot="reference" class="hong" @mouseenter="mouseEnter(scope.row,2)">
								{{ scope.row.disburse }}
							</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column prop="final_balance" label="最终余额" style="width: 10%"> </el-table-column>
				<el-table-column label="操作" style="width: 10%">
					<template slot-scope="scope">
						<el-button @click="lookDetail(scope.row)" type="text" size="small">支付宝明细</el-button>
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
		height: 11rem;
		.title{
			position: relative;
			width: 100%;
			text-align:center;
			font-size: .8rem;
			color: #333;
			font-weight: bold;
			.down{
				position: absolute;
				top: 50%;
				right: 0;
				transform: translate(0,-50%);
				font-size: .8rem;
				color: #419c49;
				display:flex;
				align-items: center;
				img{
					margin-right: .5rem;
					width: 1.2rem;
					height: 1.2rem;
				}
			}
		}
		.date{
			margin-top: 2.55rem;
		}
		.biao{
			margin-bottom: .2rem;
			margin-top: 2.45rem;
			display: flex;
			align-items: center;
			justify-content: space-around;
			font-size: .8rem;
			color: #333;
		}
	}
	.tabel{
		flex: 1;
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
	import datePicker from '../common/datePicker.vue'
	export default{
		data(){
			return{
				accountList:[],			//支付宝账号列表
				tableData: [],			//所有列表
				page: 1,				//当前页码
				pagesize:10,			//每页的条数
				total:0,				//总条数
				text:"正在加载...",		//表格正在加载或者为空
				bill_type:"",			//查询条件（导出用）
				start_time:"",			
				end_time:"",			
				alipay_account_id:"",	
				disburse_total:"0",		//总支出
				income_total:"0",		//总收入
				incomeList:[],			//收入详情
				loading:true
			}
		},
		created(){
			this.text = "正在加载...";
			//获取支付宝账户列表
			this.getAlipay();
			let obj = {
				alipay_account_id:"",
				bill_type:1,
				end_time:"",
				start_time:"",
				page:this.page,
				pagesize:this.pagesize
			}
		    //获取列表
		    this.getList(obj);
		},
		methods:{
			//鼠标移入收入查看详情
			mouseEnter(val,type){
				this.incomeList = [];
				let obj = {
					alipay_name:val.bill_account,
					bill_date:val.bill_date
				}
				if(type == 1){
					obj.type = 1;
				}else{
					obj.type = 0;
				}
				resource.businessData(obj).then(res => {
					if(res.data.code == '1'){
						this.incomeList = res.data.data;
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
			},
			//导出
			down(){
				this.$confirm('确认导出支付宝流水?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let href = "http://alipay.ppg8090.com/api/index/exportalipaybilllist?bill_type=" + this.bill_type + "&alipay_account_id=" + this.alipay_account_id + "&start_time=" + this.start_time + "&end_time=" + this.end_time;
					window.open(href);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
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
            //点击查询
            callback(val){
            	this.alipay_account_id = val.alipay_account_id;
            	this.bill_type = val.bill_type;
            	this.start_time = val.start_time;
            	this.end_time = val.end_time;
            	this.page = 1;
            	this.pagesize = 10;
            	val.page = this.page;
            	val.pagesize = this.pagesize;
            	//获取列表
            	this.loading = true;
            	this.getList(val);
            },
            //获取列表
            getList(obj){
            	resource.alipayBil(obj).then(res => {
            		this.loading = false;
            		if(res.data.code == "1"){
            			if(res.data.list.length == 0){
            				this.text = "暂无数据";
            				this.tableData = [];
            			}else{
							this.tableData = res.data.list;					//列表
							this.disburse_total = res.data.disburse_total;	//总支出
							this.income_total = res.data.income_total;  	//总收入
						}
						this.total = res.data.total;						//总条数
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
            },
			//设置表格头部样式
			tabHead({ row, rowIndex}) {
				return 'table-head-th';
			},
    		//设置表格内容每一行的样式
    		tabBox({ row, rowIndex}) {
    			return 'table-th';
    		},
			//点击购买
			handleClick(row) {
				console.log(row);
			},
			//点击某一条的查看明细
			lookDetail(val){
				sessionStorage.setItem("tab",'/content');
				sessionStorage.setItem("initDate",val.bill_date);
				this.$router.push('/content');
			},
			//切换页条数
			handleSizeChange(val) {
				this.loading = true;
				this.pagesize = val;
				let obj = {
					alipay_account_id:"",
					bill_type:1,
					end_time:"",
					start_time:"",
					page:this.page,
					pagesize:this.pagesize
				}
				//获取列表
				this.getList(obj);
			},
			//切换页码
			handleCurrentChange(val) {
				this.loading = true;
				this.page = val;
				let obj = {
					alipay_account_id:"",
					bill_type:1,
					end_time:"",
					start_time:"",
					page:this.page,
					pagesize:this.pagesize
				}
				//获取列表
				this.getList(obj);
			}
			
		},
		filters:{
			updateIncome:function(val){
				return val[0] + "：" + val[1];
			}
		},
		components:{
			datePicker
		}
	}
</script>









