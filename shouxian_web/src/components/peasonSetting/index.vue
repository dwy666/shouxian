<template>
	<div id="peasonSetting">
		<el-container>
			<el-aside width="230px">
				<el-tree v-if="treeData.length != 0" :data="treeData" @node-click="handleNodeClick">
					<span class="custom-tree-node" slot-scope="{ node }">
						<span v-if="node.data.diamond" class="treeDiamondIcon">
							<img :src="diamond" alt />
						</span>
						<span style="font-size:14px;float:left">{{ node.label }}</span>
						<span v-if="node.data.delete" class="treeDeleteIcon">
							<img :src="deleteIcon" alt @click.stop="deleteTeam(node.data.type,node.label)" />
						</span>
						<span class="treeInfoIcon"
							@click.stop="lookInfo(node.data.type,node.data.testify,node.data.isMessage)">
							<img v-if="node.data.testify == 1" :src="noInfoIcon" alt />
							<img v-else :src="infoIcon" alt />
						</span>
						<span v-if="node.data.add" class="treeAddIcon" @click.stop="addTeam(node.data.type)">
							<img :src="addIcon" alt />
						</span>
					</span>
				</el-tree>
				<div class="popTip" v-if="userClick&&treeData.length == 0 ">
					<div class="popTipHead">点击按钮新建高级合伙人</div>
					<div class="popTipBtn" @click="knowHead">我知道了</div>
				</div>
				<el-button class="addHeight" type="warning" icon="el-icon-plus" plain @click="addTeam('A')">新建高级合伙人
				</el-button>
			</el-aside>
			<el-container>
				<div class="hasTeam" v-if="treeData.length != 0">
					<el-header>
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<i class="el-icon-my-breadcrumb"></i>
							<el-breadcrumb-item>全部子账号</el-breadcrumb-item>
							<el-breadcrumb-item v-for="item in breakcrumbData" :key="item">{{item}}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-header>
					<el-main>
						<div class="controlBtn clearfix">
							<el-button @click="addTeam('D')" type="warning" icon="el-icon-plus">新建
							</el-button>
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
								<el-table-column type="selection" width="55">
								</el-table-column>
								<el-table-column prop="username" label="账户名称" align="center">
								</el-table-column>
								<el-table-column prop="phone" label="登录手机号" align="center"></el-table-column>
								<el-table-column prop="status" label="状态" align="center">
									<template slot-scope="scope">
										<span class="testify"
											:class="{'noTestify':scope.row.status=='1','testified':scope.row.status=='2','failTestify':scope.row.status=='3'}">{{scope.row.status == 1? '待认证':scope.row.status == 2?'已开通':"认证失效"}}</span>
										<span>{{ scope.row.message}}</span>
										<span v-if="scope.row.status=='3'"
											@click="reAddBtn(scope.row.username,scope.row.creator)"
											style="top:15px;position:absolute;left:145px;">
											<img :src="infoIcon" alt />
											<div v-if="reDiv" class="reAdd">
												系统已解除{{reUsername}}和{{reCreator}}的关系，若想获取该账户，请<span
													style="color:#f29716;margin-left:6px">重新创建</span>
											</div>
										</span>
									</template>
								</el-table-column>
								<el-table-column prop="creator" label="创建人" align="center"></el-table-column>
								<el-table-column prop="creatTime" label="创建时间" align="center"></el-table-column>
								<el-table-column class-name="operation" prop="operation" label="操作" align="center">
								</el-table-column>
							</el-table>
						</div>
						<noTeam v-if="tableData.length == 0" :data="'建立'" :type="'Peasonal'"
							@establishPeasonal="addPeasonal" />
						<el-pagination v-if="tableData.length != 0" @size-change="handleSizeChange"
							@current-change="handleCurrentChange" :current-page="currentPage"
							:page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next"
							:total="4000" background></el-pagination>
					</el-main>
				</div>
				<noTeam v-if="treeData.length == 0" :data="'建立团队'" :type="'headist'" @establishTeam="addTeam" />
			</el-container>
		</el-container>
		<el-dialog :title="isAdd == 'lookInfo'?'团队信息':isAdd == 'deleteTeam'?'确定删除'+teamName+'?':'新增团队'"
			:visible.sync="dialogFormVisible">
			<dialogComponent v-if="isAdd != 'deleteTeam'" :teamType="teamType" :isAdd="isAdd"
				:teamIsTestify="teamIsTestify" :isMessage="isMessage" />
			<div v-else
				style="font-size:14px;color:#00000065;border-bottom:1px solid #00000006;padding:24px 24px 66px;text-align:left">
				删除之后该团队下的所有团队及子账户均被删除。</div>
			<div slot="footer" class="dialog-footer clearfix">
				<el-button v-if="isAdd != 'deleteTeam'" @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addTeamBtn">确 定</el-button>
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
					type: "A",
					label: "一级 1",
					diamond: true,
					add: true,
					children: [
						{
							type: "B",
							label: "一级 1-1",
							add: true,
							delete: true,
							testify: "1",
							isMessage: true,
							children: [
								{
									delete: true,
									type: "C",
									testify: "2",
									isMessage: true,
									label: "一级 1-2"
								}
							]
						}
					]
				},
				{
					type: "A",
					label: "二级 1",
					diamond: true,
					add: true,
					children: [
						{
							delete: true,
							type: "B",
							testify: "1",
							isMessage: false,
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
			infoIcon: require("../../assets/info.png"),
			noInfoIcon: require("../../assets/noInfo.png"),
			diamond: require("../../assets/diamond.png"),
			addIcon: require("../../assets/add.png"),
			deleteIcon: require("../../assets/delete.png"),
			currentPage: 1,
			dialogFormVisible: false,
			userClick: true,
			teamType: "",
			isAdd: "",
			teamIsTestify: "",
			isMessage: null,
			teamName: "",
			reUsername: "",
			reCreator: "",
			reDiv: ""
		};
	},
	components: {
		dialogComponent: function(resolve) {
			require(["./dialogComponent.vue"], resolve);
		},
		noTeam: function(resolve) {
			require(["./noTeam.vue"], resolve);
		}
	},
	methods: {
		handleNodeClick(data, node, vueComponent) {
			this.breakcrumbData = [];
			this.treeNodeTG(vueComponent.node);
		},
		treeNodeTG(treeNode) {
			this.breakcrumbData.unshift(treeNode.label);
			if (
				!Array.isArray(treeNode.parent.data) &&
				JSON.stringify(treeNode.parent.data) != "{}"
			) {
				this.treeNodeTG(treeNode.parent);
			}
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		//新增团队(A,B,C,D)
		addTeam(type) {
			this.dialogFormVisible = true;
			this.teamType = type;
			this.isAdd = "addTeam";
		},
		// 查询团队信息
		lookInfo(type, testify, isMessage) {
			this.dialogFormVisible = true;
			this.isAdd = "lookInfo";
			this.teamType = type;
			this.teamIsTestify = testify;
			this.isMessage = isMessage;
		},
		// 删除团队
		deleteTeam(type, label) {
			this.dialogFormVisible = true;
			this.isAdd = "deleteTeam";
			this.teamName = label;
		},
		// 确定新增团队按钮
		addTeamBtn() {
			this.dialogFormVisible = false;
			if (this.teamType == "lookInfo") {
			} else {
				this.$message({
					message: "已添加成功，不要忘记提醒对方查收短信哦～",
					type: "success"
				});
			}
		},
		// 新建高级合伙人的提示框"我知道了"按钮
		knowHead() {
			this.userClick = false;
		},
		//重建个人账号
		reAddBtn(username, creator) {
			console.log(username);
			this.reUsername = username;
			this.reCreator = creator;
			this.reDiv = true;
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
#peasonSetting .el-tree-node__content:hover .treeDeleteIcon {
	display: block;
}
#peasonSetting .treeDeleteIcon {
	display: none;
	position: absolute;
	margin: 3px 1px 0 0;
	right: 1px;
	float: right;
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
	margin: 0 22px;
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

#peasonSetting .failTestify::before {
	background: #f5222d;
}
#peasonSetting .el-pagination {
	width: 67%;
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
	width: 63%;
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
	margin: 0 auto;
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
#peasonSetting .el-dialog__footer {
	height: 60px;
	position: absolute;
	bottom: -60px;
	background: white;
	width: 100%;
}
#peasonSetting .dialog-footer {
	float: right;
}
#peasonSetting .el-dialog__body {
	padding: 30px 0 0 20px;
}
#peasonSetting .dialog-footer .el-button--primary:focus,
#peasonSetting .el-button--primary:hover,
#peasonSetting .dialog-footer .el-button--primary {
	background: #f29716;
	width: 64px;
	height: 32px;
	line-height: 32px;
	padding: 0;
	border-color: #f29716;
}
#peasonSetting .dialog-footer .el-button {
	width: 64px;
	height: 32px;
	line-height: 32px;
	padding: 0;
}
#peasonSetting .popTip {
	width: 186px;
	height: 86px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	position: absolute;
	bottom: 77px;
}
#peasonSetting .popTip .popTipHead {
	line-height: 54px;
	font-size: 14px;
	color: #00000065;
	border-bottom: 1px solid #00000015;
}
#peasonSetting .popTipBtn {
	font-size: 14px;
	color: #000000;
	font-weight: 600;
	line-height: 31px;
	text-align: right;
	padding-right: 16px;
	position: relative;
}
#peasonSetting .popTip::after {
	content: "";
	display: block;
	height: 0;
	width: 0;
	background: white;
	border: 6px solid;
	border-color: transparent white white transparent;
	transform: rotate(45deg);
	position: absolute;
	bottom: -6px;
	left: 46%;
	box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.15);
}
#peasonSetting .hasTeam {
	width: 100%;
}
#peasonSetting .el-table__empty-block {
	display: none;
}
#peasonSetting .hasTeam .el-checkbox__input.is-checked .el-checkbox__inner,
#peasonSetting .el-checkbox__input.is-indeterminate .el-checkbox__inner {
	background-color: #f29716;
	border-color: #f29716;
}
#peasonSetting .el-checkbox__inner:hover,
#peasonSetting .el-checkbox__input.is-focus .el-checkbox__inner {
	border-color: #f29716;
}
.reAdd {
	font-size: 14px;
	line-height: 54px;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
	padding: 0 16px;
	width: 500px;
	position: absolute;
	z-index: 99;
	background: white;
	left: -228px;
	border-radius: 4px;
	top: 24px;
}
.reAdd::after {
	content: "";
	display: block;
	height: 0;
	width: 0;
	background: white;
	border: 6px solid;
	border-color: white transparent transparent white;
	transform: rotate(135deg);
	position: absolute;
	top: 0px;
	left: 46%;
	box-shadow: 0px 10px 8px 0px rgba(0, 0, 0, 0.15);
}
</style>