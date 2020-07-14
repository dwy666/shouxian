<template>
	<el-row class="tac">
		<el-col>
			<img class="logo" :src="logoImg" alt="">
			<el-menu class="el-menu-vertical-demo" :unique-opened="true" @open="handleOpen" @close="handleClose"
				background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
				<el-submenu v-for="item in meunList" :key="item.index" :index="item.index">
					<template slot="title">
						<i :class="item.icon"></i>
						<span>{{item.name}}</span>
					</template>
					<el-menu-item-group v-if="item.children">
						<el-menu-item v-for="itm in item.children" :key="itm.index" :index="itm.index"
							:route="itm.router">{{itm.name}}
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
export default {
	name: "HelloWorld",
	data() {
		return {
			meunList: [
				{
					index: "1",
					icon: "el-icon-my-manager",
					name: "人员管理",
					children: [
						{
							index: "1-1",
							name: "人员账号",
							router: "peasonSetting"
						}
					]
				},
				{
					index: "2",
					icon: "el-icon-my-setting",
					name: "设置",
					children: [
						{
							index: "2-1",
							name: "安全管理",
							router: "securitySetting"
						}
					]
				}
			],
			logoImg: require("../../assets/jx_logo.png")
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			// console.log(key, keyPath);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.tac,
.el-menu {
	height: 99%;
	background-color: #343951 !important;
}
.el-col {
	height: 92%;
}
.el-submenu__title {
	background-color: #343951 !important;
}
.tac .el-submenu__title {
	text-align: left;
}
.logo {
	width: 103px;
	height: 28px;
	margin: 18px 0 20px -39px;
}
.tac .el-submenu .el-menu-item {
	text-align: left;
	padding-left: 50px !important;
}
.tac .el-menu-item.is-active {
	color: #ffffff !important;
	position: relative;
}
.tac .el-menu-item.is-active::after {
	content: "";
	position: absolute;
	background: #f29716;
	display: block;
	width: 4px;
	height: 46px;
	top: 0;
	right: 0px;
}
.tac .el-submenu__title i {
	color: #ffffff;
}
.tac .el-icon-my-manager {
	background: url("../../assets/manager.png") center no-repeat;
}
.tac .el-icon-my-setting {
	background: url("../../assets/setting.png") center no-repeat;
}
.tac .el-icon-my-manager::before,
.tac .el-icon-my-setting::before {
	content: "\66ff";
	font-size: 10px;
	visibility: hidden;
}
.tac .el-submenu .el-menu-item{
	min-width: 180px;
}
</style>
