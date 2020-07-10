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