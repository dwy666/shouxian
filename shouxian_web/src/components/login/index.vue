<template>
	<div style="height:100%;background:#F6F6F6">
		<div class="login-header">
			<img :src="loginIcon" alt="">
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	data() {
		return {
			loginIcon: require("../../assets/jx_login_logo.png")
		};
	}
};
</script>
<style scoped>
.login-header {
	height: 88px;
	background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0) 100%
		)
		rgba(246, 246, 246, 1);
	padding: 19px 465px;
	text-align: left;
	box-sizing: border-box;
}
</style>