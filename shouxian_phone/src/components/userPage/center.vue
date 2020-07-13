<template>
	<div id="center">
		<van-cell-group>
			<van-cell class="userImg" title="头像">
				<!-- 使用 right-icon 插槽来自定义右侧图标 -->
				<template #right-icon>
					<img src="" alt="">
				</template>
			</van-cell>
			<van-cell title="姓名" value="内容" />
			<van-cell class="identity" title="身份认证" value="查看认证" is-link />
			<van-cell title="账号名称" value="内容" />
		</van-cell-group>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	
};
</script>
<style lang="">
#center {
	padding: 0 23px;
}
.van-cell {
	color: #2e2f34;
	font-size: 16px;
	font-weight: 600;
	padding: 0;
	height: 82px;
}
.userImg {
	height: 104px;
}
.van-cell__title {
	text-align: left;
	line-height: 82px;
}
.van-cell__value {
	line-height: 82px;
	color: #4f5254;
	font-weight: 400;
}
.van-cell::after {
	left: 0;
	right: 0;
}
.userImg .van-cell__title {
	line-height: 104px;
}
.userImg img {
	width: 64px;
	height: 64px;
	border-radius: 50%;
	display: inline-block;
	margin-top: 20px;
}
.van-cell__right-icon {
	line-height: 82px;
	color: #f29716;
}
.identity .van-cell__value {
	color: #f29716;
}
</style>