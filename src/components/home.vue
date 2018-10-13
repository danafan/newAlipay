<template>
	<div class="homeBox">
		<div class="top">
			<div class="report">
				<div class="title">
					<img src="../assets/order.png">
					昨日报表
				</div>
				<div class="order">
					<div class="orderItem">
						<div class="icon">
							<img src="../assets/revenue.png">
							收入订单
						</div>
						<div class="number">
							<div class="money">¥{{yeasterDay.income_money}}</div>
							<div class="count">{{yeasterDay.income_orders}}笔</div>
						</div>
					</div>
					<div class="orderItem">
						<div class="icon">
							<img src="../assets/amount.png">
							支出订单
						</div>
						<div class="number">
							<div class="money">¥{{yeasterDay.disburse_money}}</div>
							<div class="count">{{yeasterDay.disburse_orders}}笔</div>
						</div>
					</div>
				</div>
			</div>
			<div class="selCode">
				<el-select v-model="selNum" filterable placeholder="选择账号" @change="changeNum">
					<el-option
					v-for="item in accountList"
					:key="item.id"
					:label="item.alipay_name"
					:value="item.id"
					>
				</el-option>
			</el-select>
		</div>
	</div>
	<div class="bottom">
		<!-- 查询条件弹框 -->
		<div class="date">
			<datePicker :alipay="accountList" @change="callback"></datePicker>
			<div class="title">
				<div class="txt">收入支出走势</div>
				<div class="val">{{time}}</div>
			</div>
		</div>
		<div id="Statistics"></div>
	</div>
</div>
</div>
</template>
<style lang="less" scoped>
.homeBox{
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display:flex;
	flex-direction: column;
	.top{
		padding: 1rem 3.8rem;
		width: 100%;
		height: 15.05rem;
		background-color: #ffffff;
		box-shadow: 0rem 0.2rem 0.46rem 0.04rem 
		rgba(233, 232, 232, 0.82);
		border-radius: 0.2rem;
		display: flex;
		justify-content: space-between;
		.report{
			font-size: .8rem;
			color: #333;
			display:flex;
			.title{
				display:flex;
				img{
					margin-right: .6rem;
					width: 0.9rem;
					height: 1.2rem;
				}
			}
			.order{
				margin-left: 1.05rem;
				display:flex;
				align-items: center;
				.orderItem{
					padding-right: .8rem;
					padding-left: .8rem;
					display:flex;
					justify-content:space-between;
					align-items: center;
					margin-right: 10.25rem;
					width: 12.4rem;
					height: 8.2rem;
					background-color: #ffffff;
					box-shadow: 0rem 0.2rem 0.46rem 0.04rem 
					rgba(233, 232, 232, 0.82);
					.icon{
						display:flex;
						align-items: center;
						font-size: .8rem;
						color: #333;
						img{
							margin-right: .2rem;
							width: 3rem;
							height: 3rem;
						}
					}
					.number{
						font-size: .8rem;
						color: #ff5858;
					}
				}
			}
		}
	}
	.bottom{
		padding: 1.4rem 3.2rem;
		margin-top: 1rem;
		flex: 1;
		width: 100%;
		background-color: #ffffff;
		box-shadow: 0rem 0.2rem 0.46rem 0.04rem 
		rgba(233, 232, 232, 0.82);
		border-radius: 0.2rem;
		display:flex;
		flex-direction: column;
		.date{
			height: 7rem;
			.title{
				margin-top: 1.2rem;
				width: 100%;
				text-align:center;
				.txt{
					font-size: .8rem;
					color:#333;
				}
				.val{
					font-size: .6rem;
					color:#666;
				}
			}
		}
		#Statistics{
			width: 100%;
			flex:1;
		}
	}
}
</style>
<script>
	import resource from '../api/resource.js'
	import datePicker from '../common/datePicker.vue'
	var echarts = require('echarts/lib/echarts');
	require("echarts/lib/chart/line");				//折线图
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/legend');
	export default{
		data(){
			return{
				accountList:[],						  //账号列表
				selNum:"",						   	  //选中的账号的id
				yeasterDay:{},						  //昨日报表数据(res)
				time:"全部",		  					  //选中的日期区间
				lineObj:{},						      //折线数据
			}
		},
		created(){
			//获取支付宝账户列表
			this.getAlipay();
      		//获取顶部昨日报表
      		this.yesterdayList();
      		//获取底部折线图数据
      		let obj = {
      			alipay_account_id: "",
      			bill_type: 1,
      			end_time: "",
      			start_time: "",
      		}
      		this.getLine(obj);
      	},
      	methods:{
			//监听选择账号的变化
			changeNum(val){
				this.selNum = val;
				//获取顶部昨日报表
				this.yesterdayList();
			},
			//监听子组件传递过来的查询条件
			callback(val){
				if(!!val.end_time && !!val.start_time){
					this.time = "hahah 全部";
					if(val.bill_type == 1){
						var date1 = new Date(val.start_time);
						var Y1 = date1.getFullYear() + '-';
						var M1 = (date1.getMonth()+1 < 10 ? '0'+(date1.getMonth()+1) : date1.getMonth()+1) + '-';
						var D1 = (date1.getDate() < 0 ? '0' + (date1.getDate()) : date1.getDate());
						var starTime = Y1 + M1 + D1;
						var date2 = new Date(val.end_time);
						var Y2 = date2.getFullYear() + '-';
						var M2 = (date2.getMonth()+1 < 10 ? '0'+(date2.getMonth()+1) : date2.getMonth()+1) + '-';
						var D2 = (date2.getDate() < 0 ? '0' + (date2.getDate()) : date2.getDate());
						var endTime = Y2 + M2 + D2;
						this.time = starTime + " -- " + endTime;
					}else{
						this.time = val.start_time + " -- " + val.end_time;
					}
				}else{	
					this.time = "全部";
				}
				//获取底部折线图数据
				this.getLine(val);
			},
			// 当月访问量统计
			drawLine() {
      			// 当月访问量统计
      			let myChart = echarts.init(document.getElementById('Statistics'))
      			// 绘制图表
      			myChart.setOption({
      				tooltip: {
      					trigger: 'axis'
      				},
      				legend: {
      					left:'7%',
      					top:"20",
      					data: [{
      						name: '收入',
    						// 强制设置图形为圆。
    						icon: 'circle',
    						// 设置文本为红色
    						textStyle: {
    							color: 'red'
    						}
    					},
    					{
    						name: '支出',
    						// 强制设置图形为圆。
    						icon: 'circle',
    						// 设置文本为红色
    						textStyle: {
    							color: 'red'
    						}
    					},
    					{
    						name: '开始金额',
    						// 强制设置图形为圆。
    						icon: 'circle',
    						// 设置文本为红色
    						textStyle: {
    							color: 'red'
    						}
    					},
    					{
    						name: '结束金额',
    						// 强制设置图形为圆。
    						icon: 'circle',
    						// 设置文本为红色
    						textStyle: {
    							color: 'red'
    						}
    					}]
    				},
    				xAxis: {
    					type: 'category',
    					boundaryGap: false,
    					axisTick:{
	        				alignWithLabel:true,	//刻度左右有留白
      						inside:true,			//坐标轴线朝内
      					},
      					data: this.lineObj.dates
      				},
      				yAxis: {
      					type: 'value'
      				},
      				series: [
      				{
      					name:'收入',
      					type:'line',
      					data:this.lineObj.income
      				},
      				{
      					name:'支出',
      					type:'line',
      					data:this.lineObj.disburse
      				},
      				{
      					name:'开始金额',
      					type:'line',
      					data:this.lineObj.start_balance
      				},
      				{
      					name:'结束金额',
      					type:'line',
      					data:this.lineObj.end_balance
      				}
      				]
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
      		//获取顶部昨日报表
      		yesterdayList(){
      			resource.yesterdayList({alipay_account_id:this.selNum}).then(res => {
      				if(res.data.code == "1"){
      					this.yeasterDay = res.data.data;
      				}else{
      					this.$message({
      						message: res.data.message,
      						type: 'warning'
      					});
      				}
      			});
      		},
      		//获取底部折线图数据
      		getLine(val){
      			resource.inCondition(val).then(res => {
      				if(res.data.code == "1"){
      					this.lineObj = res.data.data;
      					// 当月访问量统计
      					this.drawLine();
      				}else{
      					this.$message({
      						message: res.data.message,
      						type: 'warning'
      					});
      				}
      			});
      		}
      	},
      	components:{
      		datePicker
      	}
      }
  </script>










