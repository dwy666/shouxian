<template>
	<el-container>
		<el-aside width="180px">
			<asideView />
		</el-aside>
		<el-container>
			<el-header>
				<headerView :userName="userName"  />
			</el-header>
			<el-main>
				<router-view />
			</el-main>
			<div style="font-size:14px;line-height:70px;color:#00000065">CopyRight © 2020 嘉信保险经纪公司 版权所有 粤ICP备18102183号
			</div>
		</el-container>
	</el-container>
</template>
<script>
import ajax from "../../libs/ajax";
export default {
	data() {
		return {
			userName: ""
		};
	},
	components: {
		headerView: function(resolve) {
			require(["./header.vue"], resolve);
		},
		asideView: function(resolve) {
			require(["./aside.vue"], resolve);
		}
	},
	mounted() {
		this.getInfo();
	},
	methods: {
		async getInfo() {
			var result = await ajax.getInfo();
			if (result.code == "000000") {
				this.userName = result.data.userName;
				this.userImage = result.data.userImage;
			} else {
				this.$message.error(result.mesg);
			}
		}
	}
};
</script>
<style scoped>
.el-container {
	height: 100%;
}
.el-header {
	padding: 0;
}
.el-main {
	padding: 0;
	margin: 20px 24px 0px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>