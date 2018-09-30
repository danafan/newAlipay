<template>
	<div>
		<div class="bottom">
			<div class="title">支付宝流水
				<div class="down">
					<img src="../assets/Excel.png">
					导出excel
				</div>
			</div>
			<!-- 查询条件弹框 -->
			<div class="date">
				<datePicker @change="callback"></datePicker>
			</div>
			<!-- 总统计 -->
			<div class="biao">
				<div>初始总额：238000</div>
				<div>总收入：2300</div>
				<div>总支出：34788</div>
				<div>最终金额：4723847</div>
			</div>
			<!-- 表格 -->
			<div class="tabel">
				<el-table :data="tableData" :cell-class-name="tabBox" :header-cell-class-name="tabHead" style="width: 100%">
					<el-table-column prop="date" label="日期" style="width: 10%">
					</el-table-column>
					<el-table-column prop="account" label="支付宝账号" style="width: 10%"> </el-table-column>
					<el-table-column prop="startMoney" label="初始余额" style="width: 10%"> </el-table-column>
					<el-table-column label="收入" style="width: 10%">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top">
								<p>交易到账: {{ scope.row.income }}</p>
								<p>退款退回: {{ scope.row.income }}</p>
								<p>提现: {{ scope.row.income }}</p>
								<p>红包退还: {{ scope.row.income }}</p>
								<p>其他: {{ scope.row.income }}</p>
								<div slot="reference" class="blue">
									{{ scope.row.income }}
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="支出" style="width: 10%">
						<template slot-scope="scope">
							<p class="hong">{{scope.row.disbur}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="endMoney" label="最终余额" style="width: 10%"> </el-table-column>
					<el-table-column label="操作" style="width: 10%">
						<template slot-scope="scope">
							<el-button @click="lookDetail(scope.row)" type="text" size="small">支付宝明细</el-button>
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
	.biao{
		margin-bottom: .2rem;
		margin-top: 2.45rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: .8rem;
		color: #333;
	}
	.tabel{
		.hong{
			color: #ff5858;
		}
		.blue{
			color: #0f98ff;
		}
	}
	.date{
		margin-top: 2.55rem;
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
	import datePicker from '../common/datePicker.vue'
	export default{
		data(){
			return{
				tableData: [{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				}, {
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				},
				{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				},
				{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				},
				{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				},
				{
					date: '2016-05-02',
					account: '23874234',
					startMoney: '133',
					income:"3678",
					disbur:"354",
					endMoney:"3787"
				}],
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
			//点击购买
			handleClick(row) {
				console.log(row);
			},
			//监听子组件传递过来的查询条件
			callback(val){
				console.log(val);
			},
			//点击某一条的查看明细
			lookDetail(val){
				console.log(val);
				sessionStorage.setItem("tab",'/content');
				this.$router.push('/content');
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
			
		},
		components:{
			datePicker
		}
	}
</script>









