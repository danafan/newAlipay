<template>
	<div>
		<!-- 走势周 -->
		<div class="condition">
			<el-select v-model="value" placeholder="选择走势周" @change="changeDate">
				<el-option
				v-for="item in dateList"
				:key="item.id"
				:label="item.value"
				:value="item.id"
				>
			</el-option>
		</el-select>
		<!-- 按日或按月 -->
		<div class="selectime">
			<div class="timeItem" :class="{'selTimeItem':isDay == 0}" @click="isDay = 0">按日</div>
			<div class="timeItem" :class="{'selTimeItem':isDay == 1}" @click="isDay = 1">按月</div>
		</div>
		<!-- 时间区间 -->
		<div class="block">
			<div class="demonstration">查询时间</div>
			<div class="day" v-if="isDay == 0">
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
		<div class="month" v-else>
			<el-date-picker
			v-model="start"
			type="month"
			placeholder="开始月"
			value-format="yyyy-MM"
			:picker-options="pickerOptions2"
			@change="changeStart"
			>
		</el-date-picker>
		<div class="line">-</div>
		<el-date-picker
		v-model="end"
		type="month"
		placeholder="结束月"
		value-format="yyyy-MM"
		:picker-options="pickerOptions3"
		@change="changeEnd"
		>
	</el-date-picker>
</div>
</div>
<div class="selAli">
	<el-select v-model="selAli" placeholder="支付宝账号" @change="changeNum">
		<el-option
		v-for="item in aliList"
		:key="item.id"
		:label="item.value"
		:value="item.value"
		>
	</el-option>
</el-select>
</div>
<div class="seach" @click="seach">查询</div>
</div>
</div>
</template>
<style lang="less" scoped>
.condition{
	display:flex;
	justify-content:space-between;
	align-items: center;
	.selectime{
		width: 13.5rem;
		height: 2.6rem;
		border: solid 0.05rem #cecece;
		display:flex;
		font-size: .8rem;
		color: #333;
		.timeItem{
			display:flex;
			align-items: center;
			justify-content:center;
			width: 50%;
			height: 100%;
		}
		.selTimeItem{
			background: #0f98ff;
			color: #fff;
		}
	}
	.block{
		width: 35rem;
		display:flex;
		align-items: center;
		.demonstration{
			margin-right: 1rem;
		}
		.month{
			display:flex;
			align-items: center;
			.line{
				margin-right: 1rem;
				margin-left: 1rem;
			}
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
</style>
<script>
	export default{
		data(){
			let that = this;
			return{
				dateList:[{id:"1",value:"近一周"},{id:"2",value:"近一个月"}],//走势区间列表
				value:"",						   //选中的区间（展示）
				weekStart:"",			 		   //选中的走势起始时间(可传递)
				isDay:0,						   //默认选中按日查询
				daySector:"",					   //选中的日期区间（可传递）				
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				pickerOptions2: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7||
						time.getTime() > new Date(that.end).getTime();;
					}
				},
				pickerOptions3: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7 ||
						time.getTime() < new Date(that.start).getTime();
					}
				},
				start:"",							//选中的初始月（可传递）
				end:"",								//选中的结束月（可传递）
				aliList:[{id:"1",value:"13067882143"},{id:"2",value:"15067452143"},{id:"3",value:"13836483838"}],		  //支付宝账号列表
				selAli:"",						    //选中的账号的id
			}
		},
		watch:{
			//监听按日或按月查询条件
			isDay:function(n){
				if(n == 0){
					this.start = "";
					this.end = "";
				}else{
					this.daySector = "";
				};
			}
		},
		methods:{
			//监听选择走势周的变化
			changeDate(val){
				let date = new Date();
				if(val == "1"){			//近一周
					this.weekStart = new Date(date-7*24*3600*1000).getTime();
				}else if(val == "2"){	//近一个月
					this.weekStart = new Date(date-31*24*3600*1000).getTime();
				};
				this.isDay = 0;
				this.daySector = "";
				this.start = "";
				this.end = "";
				console.log(this.weekStart);
			},
			//监听按日选择的日期
			changeDay(val){
				this.value = "";
				this.weekStart = "";
				this.start = "";
				this.end = "";
				console.log(val);
			},
			//监听按月选择的初始月
			changeStart(val){
				this.value = "";
				this.weekStart = "";
				this.daySector = "";
				console.log(val);
			},
			//监听按月选择的结束月
			changeEnd(val){
				this.value = "";
				this.weekStart = "";
				this.daySector = "";
				console.log(val);
			},
			//监听选择的支付宝账号
			changeNum(val){
				console.log(val);
			},
			//点击查询
			seach(){
				let obj = {type:this.isDay};
				if(this.weekStart != ""){				//走势图
					obj.startTime = this.weekStart;
					obj.endTime = new Date().getTime();
				}
				if(this.daySector != ""){				//日区间
					obj.startTime = this.daySector[0];
					obj.endTime = this.daySector[1];
				}
				if(this.isDay == 1){	//月区间
					if(this.start != "" && this.end != ""){
						obj.startTime = this.start;
						obj.endTime = this.end;
					}else{
						this.$message.error("请填写正确的时间区间");
					}
				}
				this.$emit("change",obj);
			}
		},
	}
</script>









