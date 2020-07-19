<template>
	<div>
		<router-view />
		<van-tabbar v-model="active">
			<van-tabbar-item to="/userPage/product">
				<span>产品</span>
				<template #icon="props">
					<img :src="props.active ? icon.productActive : icon.productInactive" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="/userPage/mine">
				<span>我的</span>
				<template #icon="props">
					<img :src="props.active ? icon.profileActive : icon.profileInactive" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>
<script>
export default {
	data() {
		return {
			active: 0,
			icon: {
				productActive: require("../../assets/product_selected.png"),
				productInactive: require("../../assets/product_unselected.png"),
				profileActive: require("../../assets/profile_selected.png"),
				profileInactive: require("../../assets/proflle_unselected.png")
			}
		};
	},

	watch: {
		$route(to, from) {
			if (this.$route.path == "/userPage/product") {
				this.active = 0;
			} else {
				this.active = 1;
			}
		}
	}
};
</script>

<style>
.van-tabbar-item--active {
	color: #000000;
}
</style>
