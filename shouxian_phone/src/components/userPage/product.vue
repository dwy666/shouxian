<template>
	<div id="product">
		<img class="banner" src="" alt="">
		<van-tabs v-model="active">
			<van-tab title="推荐">
				<div v-for="item in productList" :key="item.id" class="productItem">
					<img class="productImg" :src="item.productImg" alt="">
					<div class="productName">{{item.productName}}</div>
					<div class="productIntroduce">{{item.productIntroduce}}</div>
				</div>
			</van-tab>
			<van-tab title="百年人寿">百年人寿</van-tab>
			<van-tab title="恒大人寿">恒大人寿</van-tab>
			<van-tab title="主推人寿">主推人寿</van-tab>
		</van-tabs>
	</div>
</template>

<script>
export default {
	name: "HelloWorld",
	data() {
		return {
			active: 0,
			productList: [
				{
					id: 1,
					productImg: "",
					productName: "",
					productIntroduce: ""
				}
			]
		};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#product .banner {
	height: 134px;
	width: 100%;
	display: block;
}
.van-tabs--line .van-tabs__wrap {
	padding: 13px 0;
}
#product [class*="van-hairline"]::after {
	border: none;
}
#product .van-tabs__line {
	width: 32.5px !important;
	background-color: #f29716;
}
#product .van-tab--active {
	font-weight: 600;
	font-size: 16px;
}
#product .van-tab {
	justify-content: start;
	padding: 0 10px;
	flex: none;
	position: relative;
}
#product .van-tab:after {
	content: "";
	display: block;
	position: absolute;
	background: #d7d7d7;
	width: 1px;
	height: 12px;
	left: 0px;
}
#product .van-tab:nth-child(1):after {
	background: #fff;
}
#product .productItem {
	width: 169px;
	height: 164px;
	background: #fff;
	box-shadow: 0px 0px 14px 0px rgba(46, 47, 52, 0.1);
	border-radius: 7px;
	float: left;
	margin-left: 12px;
	text-align: left;
}
#product .productItem .productImg {
	display: block;
	height: 96px;
	width: 100%;
}
.productName {
	width: 158px;
	font-size: 15px;
	font-weight: 600;
	color: #2e2f34;
	line-height: 18px;
	margin: 15px 0 5px 10px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.productIntroduce {
	font-size: 13px;
	color: #4f5254;
	margin-left: 10px;
}
</style>
