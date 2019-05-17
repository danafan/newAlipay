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
			<div class="timeItem" :class="{'selTimeItem':isDay == 1}" @click="changeIsDay(1)">按日</div>
			<div class="timeItem" :class="{'selTimeItem':isDay == 2}" @click="changeIsDay(2)">按月</div>
		</div>
		<!-- 时间区间 -->
		<div class="block">
			<div class="demonstration">查询时间</div>
			<div class="day" v-show="isDay == 1">
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
		<div class="month" v-show="isDay == 2">
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
	<el-select v-model="selAli" filterable placeholder="支付宝账号">
		<el-option
		v-for="item in alipay"
		:key="item.id"
		:label="item.alipay_name"
		:value="item.id"
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
				isDay:1,						   //默认选中按日查询
				daySector:[new Date().setDate(1),new Date().getTime() - 24*60*60*1000], //选中的日期区间（可传递）			
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				pickerOptions2: {
					disabledDate(time) {
						return time.getTime() > Date.now() - 8.64e7||
						time.getTime() > new Date(that.end).getTime();
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
				selAli:"",						    //选中的账号的id
			}
		},
		props:{
			alipay:{
				type:Array,
				default:[]
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
				}
				this.isDay = 1;
				this.daySector = null;
				this.start = "";
				this.end = "";
			},
			//监听切换按日或者按月
			changeIsDay(index){
				if(this.isDay != index){
					this.isDay = index;
					this.weekStart = "";
					this.value = "";
					if(index == 1){
						this.start = "";
						this.end = "";
					}else{
						this.daySector = null;
					}
				}
			},
			//监听按日选择的日期
			changeDay(val){
				this.value = "";
				this.weekStart = "";
				this.start = "";
				this.end = "";
				this.daySector = val;
			},
			//监听按月选择的初始月
			changeStart(){
				this.value = "";
				this.weekStart = "";
				this.daySector = null;
			},
			//监听按月选择的结束月
			changeEnd(){
				this.value = "";
				this.weekStart = "";
				this.daySector = null;
			},
			//点击查询
			seach(){
				let obj = {bill_type:this.isDay,alipay_account_id:this.selAli};
				if(this.weekStart != ""){				//走势图
					obj.start_time = this.weekStart;
					obj.end_time = new Date(new Date(new Date()-1*24*3600*1000)).getTime();
				}
				if(this.daySector){					//日区间
					obj.start_time = this.daySector[0];
					obj.end_time = this.daySector[1];
				}
				if(this.weekStart == "" && !this.daySector){
					if(this.isDay == 2){
						if(!this.start && !this.end){
							obj.start_time = "";
							obj.end_time = "";
						}else if(!this.start && !!this.end){
							this.$message.error("请填写开始月");
							return;
						}else if(!!this.start && !this.end){
							this.$message.error("请填写结束月");
							return;
						}else{
							obj.start_time = this.start;
							obj.end_time = this.end;
						}
					}else{
						obj.start_time = "";
						obj.end_time = "";
					}
				}
				this.$emit("change",obj);
			}
		},
	}
</script>









