<template>
	<div id="login">
		<div class="tab">
			<div class="tabName" :class="{tabNameActive:active==0}">账户登录</div>
			<div class="tabName" :class="{tabNameActive:active==1}">短信登录</div>
		</div>
	</div>
</template>
<script>
import common from "../libs/common";
export default {
	data() {
		return {
			token: this.$common.getCookie("token"),
			active: 0
		};
	},
	mounted() {
		// if (!this.token) {
		// 	window.location.href =
		// 		process.env.WX_OPEN_URL +
		// 		process.env.API_IP +
		// 		"jx-insure/h5/wechat/getWechatParam&response_type=code&scope=snsapi_userinfo&state=phoneLogin#wechat_redirect";
		// } else {
		// 	this.getopenid();
		// }
	},
	methods: {
		// 获取授权信息存放
		getopenid() {
			var parts = window.location.href.split("?")[1];
			var partsArr = parts.split("&");
			partsArr.forEach(item => {
				var keyValuePair = item.split("=");
				var key = decodeURIComponent(keyValuePair[0]);
				var value = keyValuePair[1]
					? decodeURIComponent(keyValuePair[1].replace(/\+/g, " "))
					: keyValuePair[1];
				if (key == "access_token") {
					this.accessToken = value;
					this.$common.setCookie(
						"accessToken",
						this.accessToken,
						"d10"
					);
				}
				if (key == "openid") {
					this.openId = value;
					this.$common.setCookie("openId", this.openId, "d10");
				}
				if (key == "unionid") {
					this.unionId = value;
					this.$common.setCookie("unionId", this.unionId, "d10");
				}
			});
		}
	}
};
</script>
<style lang="">
#login {
	padding: 0 39px;
}

.tabName {
	color: #bbbdbf;
	font-size: 15px;
	float: right;
	line-height: 21px;
	margin: 30px 108px 0 0;
}
.tabNameActive {
	color: #7a7a7a;
	font-weight: 600;
	font-size: 24px;
	float: left;
	line-height: 33px;
	margin: 21px 21px 34px 0;
}
</style>