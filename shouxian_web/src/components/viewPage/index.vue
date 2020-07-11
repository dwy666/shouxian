<template>
	<el-container>
		<el-aside width="200px">
			<asideView />
		</el-aside>
		<el-container>
			<el-header>
				<headerView />
			</el-header>
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
export default {
	components: {
		headerView: function(resolve) {
			require(["./header.vue"], resolve);
		},
		asideView: function(resolve) {
			require(["./aside.vue"], resolve);
		}
	}
};
</script>
<style scoped>
.el-container{
	height: 100%;
}
.el-header{
	padding: 0;
}
.el-main{
	margin: 20px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>