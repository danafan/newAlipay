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
							<div class="money">¥1248</div>
							<div class="count">1201笔</div>
						</div>
					</div>
					<div class="orderItem">
						<div class="icon">
							<img src="../assets/amount.png">
							支出订单
						</div>
						<div class="number">
							<div class="money">¥1248</div>
							<div class="count">1201笔</div>
						</div>
					</div>
				</div>
			</div>
			<div class="selCode">
				<el-select v-model="selNum" placeholder="选择账号" @change="changeNum">
					<el-option
					v-for="item in accountList"
					:key="item.id"
					:label="item.value"
					:value="item.id"
					>
				</el-option>
			</el-select>
		</div>
	</div>
	<div class="bottom">
		<!-- 查询条件弹框 -->
		<div class="date">
			<datePicker @change="callback"></datePicker>
		</div>
		<div class="title">
			<div class="txt">收入支出走势</div>
			<div class="val">{{time}}</div>
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
		#Statistics{
			width: 100%;
			height: 26rem;
		}
	}
}

</style>
<script>
	import datePicker from '../common/datePicker.vue'
	var echarts = require('echarts/lib/echarts');
	require("echarts/lib/chart/line");				//折线图
	require('echarts/lib/component/tooltip');
	export default{
		data(){
			return{
				accountList:[{id:"1",value:"13067882143"},{id:"2",value:"15067452143"},{id:"3",value:"13836483838"}],		//账号列表
				selNum:"",						   	  //选中的账号的id
				time:"2018-09-25—2018-10-3",		  //选中的日期区间
			}
		},
		mounted() {
			// 当月访问量统计
			this.drawLine();
		},
		methods:{
			//监听选择账号的变化
			changeNum(val){
				console.log(val);
			},
			//监听子组件传递过来的查询条件
			callback(val){
				console.log(val);
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
      				xAxis: {
      					type: 'category',
      					boundaryGap: false,
      					axisTick:{
	        				alignWithLabel:true,	//刻度左右有留白
      						interval:2,				//强制显示每一个刻度
      						inside:true,			//坐标轴线朝内
      					},
      					axisLabel:{
      						interval:2,				//强制显示每一个刻度标签
      					},
      					data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日']
      				},
      				yAxis: {
      					type: 'value'
      				},
      				series: [
      				{
      					name:'邮件营销',
      					type:'line',
      					data:[120, 132, 101, 134, 90, 230, 210]
      				},
      				{
      					name:'联盟广告',
      					type:'line',
      					data:[220, 182, 191, 234, 290, 330, 310]
      				},
      				{
      					name:'视频广告',
      					type:'line',
      					data:[150, 232, 201, 154, 190, 330, 410]
      				},
      				{
      					name:'直接访问',
      					type:'line',
      					data:[320, 332, 301, 334, 390, 330, 320]
      				},
      				{
      					name:'搜索引擎',
      					type:'line',
      					data:[820, 932, 901, 934, 1290, 1330, 1320]
      				}
      				]
      			});
      		},
      		//获取当前月的所有日期
      		getDates(){
      			let daysOfMonth = [];
      			let fullYear = new Date().getFullYear();
      			let month = new Date().getMonth() + 1;
      			let lastDayOfMonth = new Date(fullYear, month, 0).getDate();
      			for (var i = 1; i <= lastDayOfMonth; i++) {
      				daysOfMonth.push(i);
      			};
      			return daysOfMonth;
      		},
      		//获取当前月的所有日期
      		getMonths(){
      			let daysOfMonth = [];
      			let fullYear = new Date().getFullYear();
      			let month = new Date().getMonth() + 1;
      			return "(" + fullYear + "年" + month + "月" + ")";
      		},
      	},
      	components:{
      		datePicker
      	}
      }
  </script>










