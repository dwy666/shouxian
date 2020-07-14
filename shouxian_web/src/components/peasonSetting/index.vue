<template>
	<div id="peasonSetting">
		<el-container>
			<el-aside width="230px">
				<el-tree :data="treeData" @node-click="handleNodeClick" accordion>
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span v-if="node.data.diamond" class="treeDiamondIcon">
							<img :src="diamond" alt="">
						</span>
						<span style="font-size:14px;float:left">{{ node.label }}</span>
						<span class="treeInfoIcon">
							<img :src="imgInfo" alt=""></span>
						<span v-if="node.data.add" class="treeAddIcon">
							<img :src="add" alt="">
						</span>
					</span>
				</el-tree>
				<el-button class="addHeight" type="warning" icon="el-icon-plus" plain>新建高级合伙人</el-button>
			</el-aside>
			<el-container>
				<el-header>
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<i class="el-icon-my-breadcrumb"></i>
						<el-breadcrumb-item>管理员子账号</el-breadcrumb-item>
						<el-breadcrumb-item v-for="item in breakcrumbData" :key="item">{{item}}</el-breadcrumb-item>
					</el-breadcrumb>
				</el-header>
				<el-main>
					<div class="controlBtn clearfix">
						<el-button @click="addUser" type="warning" icon="el-icon-plus">新建</el-button>
						<el-button>批量导入</el-button>
						<el-button>删除</el-button>
						<div class="searchBox">
							<el-input placeholder="请输入手机号或账户名称" v-model="searchInput">
								<i slot="prefix" class="el-input__icon el-icon-search"></i>
							</el-input>
							<div class="searchBtn">搜索</div>
						</div>
					</div>
					<div class="userForm">
						<el-table :data="tableData" style="width: 100%">
							<el-table-column prop="username" label="账户名称" align="center">
							</el-table-column>
							<el-table-column prop="phone" label="登录手机号" align="center">
							</el-table-column>
							<el-table-column prop="status" label="状态" align="center">
								<template slot-scope="scope">
									<span class="testify"
										:class="{'noTestify':scope.row.status=='1','testified':scope.row.status=='2','failTestify':scope.row.status=='3'}">
										{{scope.row.status == 1? '未认证':scope.row.status == 2?'认证通过':"认证失败"}}</span>
									<span>{{ scope.row.message}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="creator" label="创建人" align="center">
							</el-table-column>
							<el-table-column prop="creatTime" label="创建时间" align="center">
							</el-table-column>
							<el-table-column class-name="operation" prop="operation" label="操作" align="center">
							</el-table-column>
						</el-table>
					</div>
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
						layout="total, sizes, prev, pager, next" :total="4000" background>
					</el-pagination>
				</el-main>
			</el-container>
		</el-container>
		<el-dialog :title="'新增团队'" :visible.sync="dialogFormVisible">
			<addUser />
			<div slot="footer" class="dialog-footer clearfix">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			treeData: [
				{
					label: "一级 1",
					diamond: true,
					add: true,
					children: [
						{
							label: "一级 1-1",
							add: true,
							children: [
								{
									label: "一级 1-2",
									add: true,
									children: [
										{
											label: "一级 1-3"
										}
									]
								}
							]
						}
					]
				},
				{
					label: "二级 1",
					diamond: true,
					add: true,
					children: [
						{
							label: "二级 1-1",
							add: true
						}
					]
				}
			],
			breakcrumbData: [],
			searchInput: "",
			tableData: [
				{
					id: 1,
					username: "李欣欣",
					phone: "18855669988",
					status: "1",
					message: "",
					creator: "行知事务所",
					creatTime: "2020-07-06 13:42",
					operation: "修改信息"
				},
				{
					id: 2,
					username: "董晓华",
					phone: "18810629988",
					status: "1",
					message: "短信提醒",
					creator: "行知事务所",
					creatTime: "2020-07-05 13:42",
					operation: "修改信息"
				},
				{
					id: 3,
					username: "阿卜来提·库尔班",
					phone: "18810629942",
					status: "1",
					message: "系统已短信提醒",
					creator: "开单大吉",
					creatTime: "2020-07-05 12:42",
					operation: "修改信息"
				},
				{
					id: 4,
					username: "曹琼",
					phone: "18810989942",
					status: "3",
					message: "",
					creator: "行知事务所",
					creatTime: "2020-07-05 12:42",
					operation: "修改信息"
				},
				{
					id: 5,
					username: "李欣欣",
					phone: "13810629942",
					status: "2",
					message: "",
					creator: "开单大吉",
					creatTime: "2020-07-04 09:42",
					operation: "修改信息"
				}
			],
			imgInfo: require("../../assets/info.png"),
			diamond: require("../../assets/diamond.png"),
			add: require("../../assets/add.png"),
			currentPage: 1,
			dialogFormVisible: false
		};
	},
	components: {
		addUser: function(resolve) {
			require(["./addUser.vue"], resolve);
		}
	},
	methods: {
		handleNodeClick(data, node, vueComponent) {
			var treeNode = vueComponent.node;
			this.treeNodeTG(treeNode);
		},
		treeNodeTG(treeNode) {
			if (!treeNode.parent.data instanceof Array && treeNode.parent) {
				this.treeNodeTG(treeNode.parent);
			} else {
				if (treeNode.parent.data instanceof Array) {
					this.breakcrumbData = [];
				}
				this.breakcrumbData.push(treeNode.data.label);
			}
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		addUser() {
			this.dialogFormVisible = true;
		}
	}
};
</script>
<style >
#peasonSetting {
	height: 100%;
}
#peasonSetting .el-aside {
	padding: 44px 0 0 20px;
	border-right: 1px solid #e8e8e8;
	position: relative;
}
#peasonSetting .el-main {
	padding: 0;
}
#peasonSetting .addHeight {
	position: absolute;
	bottom: 20px;
	left: 20px;
	font-size: 12px;
}

#peasonSetting .el-header {
	height: 44px !important;
	border-bottom: 1px solid #e8e8e8;
}
#peasonSetting .custom-tree-node {
	width: 100%;
}
#peasonSetting .treeDiamondIcon {
	float: left;
	display: block;
	margin: 3px 7px 0 0px;
}
#peasonSetting .treeInfoIcon {
	display: block;
	margin: 3px 24px 0 0;
	float: right;
}
#peasonSetting .treeAddIcon {
	display: block;
	margin: 3px 6px 0 0;
	float: right;
}
#peasonSetting .el-aside .el-button--warning.is-plain {
	border-color: #d9d9d9;
	background: white;
}
#peasonSetting .el-aside .el-button--warning.is-plain:active,
#peasonSetting .el-aside .el-button--warning.is-plain:focus,
#peasonSetting .el-aside .el-button--warning.is-plain:hover {
	color: #e6a23c;
	background: white;
	border-color: #f5dab1;
}
#peasonSetting .el-button {
	float: left;
}
#peasonSetting .el-icon-my-breadcrumb {
	float: left;
	margin: 15px 4px 0 24px;
	background: url("../../assets/breadcrumb.png") center no-repeat;
}
#peasonSetting .el-icon-my-breadcrumb::before {
	content: "\66ff";
	font-size: 10px;
	visibility: hidden;
}
#peasonSetting .el-breadcrumb__inner {
	color: #000000;
	line-height: 44px;
}
#peasonSetting .controlBtn {
	padding: 24px 31px;
}
#peasonSetting .controlBtn .el-button {
	height: 32px;
	width: 88px;
	padding: 0;
}
#peasonSetting .controlBtn .el-button--default:hover,
#peasonSetting .controlBtn .el-button--default:focus,
#peasonSetting .controlBtn .el-button--default:active {
	color: #f29716;
	border: 1px solid #f29716;
	background: white;
}
#peasonSetting .controlBtn .el-input {
	width: 397px;
}
#peasonSetting .searchBox {
	float: right;
}
#peasonSetting .searchBox .el-input__inner {
	height: 32px;
	border-radius: 4px 0 0 4px;
}
#peasonSetting .searchBox .el-input__icon {
	line-height: 32px;
}
#peasonSetting .searchBox .searchBtn {
	display: inline-block;
	width: 64px;
	height: 32px;
	background: #f29716;
	border-radius: 0px 4px 4px 0px;
	color: white;
	line-height: 32px;
	font-size: 14px;
	margin-left: -5px;
}
#peasonSetting .userForm {
	margin: 0 32px;
}
#peasonSetting .userForm .el-table__header {
	background: #fafafa;
}
#peasonSetting .el-table thead tr,
#peasonSetting .el-table thead th {
	background-color: #fafafa;
}
#peasonSetting .operation .cell {
	color: #f29716;
}
#peasonSetting thead .is-center .cell {
	color: #000000;
	font-weight: 600;
}
#peasonSetting .testify {
	position: relative;
}
#peasonSetting .testify::before {
	position: absolute;
	content: "";
	top: 5px;
	left: -13px;
	width: 6px;
	height: 6px;
	display: block;
	border-radius: 50%;
}
#peasonSetting .noTestify::before {
	background: #ffa726;
}
#peasonSetting .testified::before {
	background: #52c41a;
}
#peasonSetting .failTestify::after {
	content: "";
	background: url("../../assets/info.png");
	display: block;
	position: absolute;
	top: 0;
	right: -23px;
	width: 16px;
	height: 16px;
}
#peasonSetting .failTestify::before {
	background: #f5222d;
}
#peasonSetting .el-pagination {
	width: 74%;
	display: flex;
	justify-content: flex-end;
	margin: 24px;
	position: fixed;
	bottom: 15px;
}
#peasonSetting .el-pagination__total {
	margin: 4px 22px 0 0px;
}
#peasonSetting .el-pagination__sizes .el-input .el-input__inner:hover {
	border-color: #c0c4cc;
}
#peasonSetting .el-pagination .el-select .el-input .el-input__inner {
	height: 32px;
}
#peasonSetting .el-pagination__sizes {
	width: 70%;
	text-align: left;
}
#peasonSetting .el-pagination.is-background .btn-next,
#peasonSetting .el-pagination.is-background .btn-prev,
#peasonSetting .el-pagination.is-background .el-pager li {
	margin: 0 -1px;
	background-color: #ffffff;
	border: 1px solid #d9d9d9;
}
#peasonSetting .el-pagination.is-background .btn-prev,
#peasonSetting .el-pagination.is-background .btn-next {
	width: 36px;
	height: 32px;
}
#peasonSetting .el-pagination.is-background .el-pager li {
	width: 32px;
	height: 32px;
	line-height: 32px;
}
#peasonSetting .el-pagination.is-background .el-pager li:not(.disabled).active {
	background-color: #f29716;
	font-weight: 100;
}
#peasonSetting .el-pagination.is-background .el-pager li:not(.disabled):hover {
	color: #000000;
}
#peasonSetting .el-dialog {
	width: 640px;
	height: 626px;
}
#peasonSetting .el-dialog__header {
	width: 100%;
	line-height: 48px;
	float: left;
	padding: 0;
	text-align: left;
	padding-left: 24px;
	border-bottom: 1px solid #00000009;
}
.el-dialog__footer {
	height: 60px;
	position: absolute;
	bottom: 0;
	background: white;
	width: 100%;
}
.dialog-footer {
	float: right;
}
</style>