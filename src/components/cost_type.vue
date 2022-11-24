 <template>
 	<div class="sd">
 		<div class="title">费用类型管理</div>
 		<div class="seachBox">
 		<el-input style="width: 200px" v-model="search" placeholder="请输入搜索内容"></el-input>
 		<el-button style="margin-left: 10px" type="primary" @click="handleCurrentChange(1)">查询</el-button>
 	</div>
 	<div class="setBox">
 		<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="showDialog('add')">添加</el-button>
 	</div>
 	<!-- 表格 -->
 	<el-table :data="tableData.data" size="small" height="700" :cell-class-name="tabBox" :header-cell-class-name="tabHead" v-loading="loading">
 		<el-table-column prop="type_name" label="类型名称"></el-table-column>
 		<el-table-column label="匹配项">
 			<template slot-scope="scope">
 				<div>商品名称：{{scope.row.check_goods_name}}</div>
 				<div>对方账号：{{scope.row.check_account}}</div>
 				<div>业务类型：{{scope.row.check_business_type}}</div>
 				<div>备注：{{scope.row.check_remark}}</div>
 			</template>
 		</el-table-column>
 		<el-table-column prop="start_date" label="校验开始时间"></el-table-column>
 		<el-table-column prop="add_time" label="添加时间"></el-table-column>
 		<el-table-column label="操作">
 			<template slot-scope="scope">
 				<el-button size="small" type="text" @click="showDialog('edit',scope.row.id)">编辑</el-button>
 				<el-button size="small" type="text" @click="deleteType(scope.row.id)">删除</el-button>
 			</template>
 		</el-table-column>
 	</el-table>
 	<div class="page">
 		<el-pagination
 		@size-change="handleSizeChange"
 		@current-change="handleCurrentChange"
 		:current-page="page"
 		:page-sizes="[10, 20, 30, 40]"
 		layout="total, sizes, prev, pager, next, jumper"
 		:total="tableData.total">
 	</el-pagination>
 </div>
 <el-dialog :title="dialogTitle" center @close="closeDialog" :close-on-click-modal="false" :visible.sync="isDialog">
 	<el-form size="small" class="demo-form-inline">
 		<el-form-item label-width="100px" label="类型名称：">
 			<el-input style="width:160px" v-model="type_name" placeholder="请输入类型名称"></el-input>
 		</el-form-item>
 		<el-form-item label-width="120px" label="用友项目名称：">
 			<el-input style="width:160px" v-model="yy_type_name" placeholder="请输入用友项目名称"></el-input>
 		</el-form-item>
 		<el-form-item label-width="140px" label="用友项目大类编码：">
 			<el-input style="width:160px" v-model="yy_category_code" placeholder="请输入用友项目大类编码"></el-input>
 		</el-form-item>
 		<el-form-item label-width="120px" label="用友项目编号：">
 			<el-input style="width:160px" v-model="yy_item_no" placeholder="请输入用友项目编号"></el-input>
 		</el-form-item>
 		<el-form-item label-width="120px" label="用友科目名称：">
 			<el-input style="width:160px" v-model="yy_course_title" placeholder="请输入用友科目名称"></el-input>
 		</el-form-item>
 		<el-form-item label-width="100px" label="标题：">
 			<el-input style="width:160px" v-model="check_goods_name" placeholder="请输入标题"></el-input>
 			&nbsp
 			<el-checkbox v-model="goods_name_checked"></el-checkbox>
 		</el-form-item>
 		<el-form-item label-width="100px" label="对方账号：">
 			<el-input style="width:160px" v-model="check_account" placeholder="请输入对方账号"></el-input>
 			&nbsp
 			<el-checkbox v-model="account_checked"></el-checkbox>
 		</el-form-item>
 		<el-form-item label-width="100px" label="业务类型：">
 			<el-input style="width:160px" v-model="check_business_type" placeholder="请输入业务类型"></el-input>
 			&nbsp
 			<el-checkbox v-model="business_type_checked"></el-checkbox>
 		</el-form-item>
 		<el-form-item label-width="100px" label="备注：">
 			<el-input style="width:160px" v-model="check_remark" placeholder="请输入备注"></el-input>
 			&nbsp
 			<el-checkbox v-model="remark_checked"></el-checkbox>
 		</el-form-item>
 		<el-form-item label-width="100px" label="开始时间：">
 			<el-date-picker
 			style="width:160px"
 			v-model="start_date"
 			value-format="yyyy-MM-dd"
 			type="date"
 			placeholder="开始时间">
 		</el-date-picker>
 	</el-form-item>
 	<el-form-item label-width="100px" label="优先级排序：">
 		<el-input style="width:160px" type="number" v-model="sort" placeholder="0～99之间整数"></el-input>
 	</el-form-item>
 </el-form>
 <div slot="footer" class="dialog-footer">
 	<el-button type="primary" size="small" @click="isDialog = false">取消</el-button>
 	<el-button type="primary" size="small" @click="commit">确认</el-button>
 </div>
</el-dialog>
</div>
</template>
<style lang="less" scoped>
.sd{
	padding: 15px;
}
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
}
.setBox{
	margin-top: 10px;
	margin-bottom: 10px;
	display:flex;
	justify-content: flex-end;
}
.page{
	margin-top: 10px;
	display:flex;
	justify-content: flex-end;
}
</style>
<style>
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button{-webkit-appearance: none;}
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
				search:'',
				page: 1,				//当前页码
				pagesize:10,			//每页的条数
				tableData: {},			//列表
				loading: true,
				isDialog:false,			//添加或编辑的弹窗是否显示
				dialogTitle:"添加",		//弹窗标题
				type_name:"",			//类型名称
				yy_type_name:"",		//用友项目名称
				yy_category_code:"",		//用友项目名称
				yy_item_no:"",		//用友项目编号
				yy_course_title:"",		//用友科目名称
				check_goods_name:"",	//标题
				goods_name_checked:false,
				check_account:"",		//对方账号
				account_checked:false,
				check_business_type:"", //业务类型
				business_type_checked:false,
				check_remark:"",		//备注
				remark_checked:false,
				start_date:"",			//开始时间
				sort:0,					//排序
				type:"add",
				id:"",
				checked:true
			}
		},
		created(){
			//获取列表
			this.getData();
		},
		methods:{
			//获取列表
			getData(){
				resource.payTypeList({page:this.page,pagesize:this.pagesize,search:this.search}).then(res => {
					this.loading = false;
					if(res.data.code == "1"){
						this.tableData = res.data.data;
					}else{
						this.$message({
							message: res.data.message,
							type: 'warning'
						});
					}
				});
			},
			//编辑或添加
			showDialog(type,id){
				this.isDialog = true;
				this.type = type;
				if(!!id){
					resource.getEditPayType({id:id}).then(res => {
						if(res.data.code == 1){
							let row_data = res.data.data;
							this.type_name = row_data.type_name === null?'':row_data.type_name;
							this.yy_type_name = row_data.yy_type_name === null?'':row_data.yy_type_name;
							this.yy_category_code = row_data.yy_category_code === null?'':row_data.yy_category_code;
							this.yy_item_no = row_data.yy_item_no === null?'':row_data.yy_item_no;
							this.yy_course_title = row_data.yy_course_title === null?'':row_data.yy_course_title;

							this.check_goods_name = row_data.check_goods_name === null?'':row_data.check_goods_name;
							this.goods_name_checked = row_data.check_goods_name != null;
							this.check_account = row_data.check_account === null?'':row_data.check_account;
							this.account_checked = row_data.check_account != null;
							this.check_business_type = row_data.check_business_type === null?'':row_data.check_business_type;
							this.business_type_checked = row_data.check_business_type != null;
							this.check_remark = row_data.check_remark === null?'':row_data.check_remark;
							this.remark_checked = row_data.check_remark != null;
							this.start_date = row_data.start_date === null?'':row_data.start_date;
							this.sort = row_data.sort === null?'':row_data.sort;	
							this.id = row_data.id;
						}else{
							this.$message.warning(res.data.message);
						}
					});
				}
			},
			//关闭弹窗回调
			closeDialog(){
				this.type_name = "";
				this.yy_type_name = "";
				this.yy_category_code = "";
				this.yy_item_no = "";
				this.yy_course_title = "";
				this.check_goods_name = "";
				this.goods_name_checked = false;
				this.check_account = "";
				this.account_checked = false;
				this.check_business_type = "";
				this.business_type_checked = false;
				this.check_remark = "";
				this.remark_checked = false;
				this.start_date = "";
				this.sort = 0;	
				this.id = "";		
			},
			//提交
			commit(){
				if(this.type_name == ""){
					this.$message.warning('请输入类型名称');
					return;
				}else if(this.start_date == ""){
					this.$message.warning('请选择开始时间');
					return;
				}else if(!this.judgmentSort.test(this.sort)){
					this.$message.warning('优先级排序号为0-99的整数');
					return;
				}else if(!this.goods_name_checked && !this.account_checked && !this.business_type_checked && !this.remark_checked){
					this.$message.warning('校验项不能全为空！');
					return;
				}
				var arg = {
					type_name:this.type_name,
					yy_type_name:this.yy_type_name,
					yy_category_code:this.yy_category_code,
					yy_item_no:this.yy_item_no,
					yy_course_title:this.yy_course_title,
					start_date:!this.start_date?'':this.start_date,
					sort:this.sort
				};
				if(this.goods_name_checked){
					arg.check_goods_name = this.check_goods_name;
				}
				if(this.account_checked){
					arg.check_account = this.check_account;
				}
				if(this.business_type_checked){
					arg.check_business_type = this.check_business_type;
				}
				if(this.remark_checked){
					arg.check_remark = this.check_remark;
				}
				if(this.type == 'add'){	//添加
					resource.addPayType(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.message);
							this.isDialog = false;
							this.page == 1;
							//获取列表
							this.getData();
						}else{
							this.$message.warning(res.data.message);
						}
					});
				}else{	//编辑
					arg.id = this.id;
					resource.postEditPayType(arg).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.message);
							this.isDialog = false;
							//获取列表
							this.getData();
						}else{
							this.$message.warning(res.data.message);
						}
					});
				}
			},
			//删除
			deleteType(id){
				this.$confirm('确认删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					resource.delPayType({id:id}).then(res => {
						if(res.data.code == 1){
							this.$message.success(res.data.message);
							//获取列表
							this.getData();
						}else{
							this.$message.warning(res.data.message);
						}
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
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
    		//分页
    		handleSizeChange(val) {
    			this.pagesize = val;
				//获取列表
				this.getData();
			},
			handleCurrentChange(val) {
				this.page = val;
				//获取列表
				this.getData();
			}
		}
	}
// </script>