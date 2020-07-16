<template>
	<div id="jx-login">
		<div class="login-form">
			<div class="tab">
				<div class="tabName" :class="{tabNameActive:active==0}" @click="codeLogin">手机号码登录</div>
				<div class="tabName" :class="{tabNameActive:active==1}" @click="passwdLogin">账号密码登录</div>
			</div>
			<div class="codeForm" v-if="active == 0">
				<el-input v-model="telphone" placeholder="请输入手机号码" @blur="phoneBlur">
					<img slot="prefix" :src="usernameIcon" alt="">
				</el-input>
				<div v-if="isPhone" class="phoneTip">请输入正确的手机号码</div>
				<el-input class="code" v-model="code" placeholder="请输入验证码">
					<img slot="prefix" :src="passwordIcon" alt="">
				</el-input>
				<div :style="{background:/^1[3456789]\d{9}$/.test(telphone.trim())?'#f29716':'#C1CBD7'}"
					class="getCode">获取验证码</div>
				<div v-if="isCode" class="codeTip">验证码错误</div>
				<el-checkbox v-model="checked">自动登录</el-checkbox>
				<div :style="{background:/^1[3456789]\d{9}$/.test(telphone.trim())&& /\d{6}$/.test(code.trim())?'#f29716':'#C1CBD7'}"
					class="loginBtn" @click="loginByVerify">
					登录</div>
			</div>
			<div class="passwdForm" v-else>
				<el-input v-model="telphone" placeholder="请输入手机号码" @blur="phoneBlur">
					<img slot="prefix" :src="usernameIcon" alt="">
				</el-input>
				<div v-if="isPhone" class="phoneTip">请输入正确的手机号码</div>
				<el-input v-model="password" placeholder="请输入密码">
					<img slot="prefix" :src="passwordIcon" alt="">
				</el-input>
				<el-checkbox v-model="checked">自动登录</el-checkbox>
				<span class="forgetPasswd" @click="resetPasswd">忘记密码</span>
				<div :style="{background:/^1[3456789]\d{9}$/.test(telphone.trim())&& /\w{8,}$/.test(password.trim())?'#f29716':'#C1CBD7'}"
					class="loginBtn" @click="loginByPasswd">登录
				</div>
				<div v-if="loginWrong" class="loginTip">账号或密码错误</div>
			</div>
		</div>
	</div>
</template>
<script>
import ajax from "../../libs/ajax";
export default {
	data() {
		return {
			usernameIcon: require("../../assets/jx_login_username.png"),
			passwordIcon: require("../../assets/jx_login_password.png"),
			active: 0,
			code: "",
			telphone: "",
			password: "",
			checked: "",
			isPhone: false,
			isCode: false,
			loginWrong: false
		};
	},
	methods: {
		codeLogin() {
			this.active = 0;
		},
		passwdLogin() {
			this.active = 1;
		},
		async loginByPasswd() {
			if (
				/^1[3456789]\d{9}$/.test(this.telphone.trim()) &&
				/\w{8,}$/.test(this.password.trim())
			) {
				let Base64 = require("js-base64").Base64;
				var password = Base64.encode(this.password);
				var result = await ajax.loginByPasswd(
					this.telphone,
					this.password
				);
				if (result.code == "1005") {
					this.loginWrong = true;
				} else {
					this.$message.error(result.mesg);
				}
			}
		},
		async loginByVerify() {
			if (
				/^1[3456789]\d{9}$/.test(this.telphone.trim()) &&
				/\w{6}$/.test(this.code.trim())
			) {
				var result = await ajax.loginByVerify(this.telphone, this.code);
				if (result.code == "SMS0010") {
					this.isCode = true;
				} else {
					this.$message.error(result.mesg);
				}
			}
		},
		phoneBlur() {
			if (!/^1[3456789]\d{9}$/.test(this.telphone.trim())) {
				this.isPhone = true;
			} else {
				this.isPhone = false;
			}
		},
		resetPasswd() {
			this.$router.push({ name: "resetPasswd" });
		}
	}
};
</script>
<style lang="">
#jx-login {
	height: 90%;
	position: relative;
}
#jx-login .login-form {
	width: 376px;
	height: 405px;
	position: absolute;
	bottom: 355px;
	right: 465px;
	border: 1px solid #000000;
}
#jx-login .tabName {
	color: #a1a3a6;
	font-size: 16px;
	float: right;
	line-height: 22px;
	margin: 59px 77px 0 0;
	cursor: pointer;
}
#jx-login .tabNameActive {
	color: #08090a;
	font-weight: 600;
	font-size: 22px;
	float: left;
	line-height: 33px;
	margin: 53px 24px 40px 47px;
}

#jx-login .login-form .el-input__inner {
	width: 282px;
	height: 44px;
	padding-left: 46px;
	margin-bottom: 30px;
}
#jx-login .login-form .el-input img {
	margin: 14px 0 0 60px;
}
#jx-login .code .el-input__inner {
	width: 157px;
	height: 44px;
	float: left;
	margin-left: 47px;
}
#jx-login .getCode {
	width: 111px;
	height: 44px;
	background: #f29716;
	position: absolute;
	top: 200px;
	right: 47px;
	color: white;
	line-height: 44px;
	cursor: pointer;
}
#jx-login .el-checkbox {
	float: left;
	margin: 0 0 30px 47px;
}
#jx-login .el-checkbox__inner:hover,
#jx-login .el-checkbox__input.is-focus .el-checkbox__inner {
	border-color: #f29716;
}
#jx-login .el-checkbox__input.is-checked .el-checkbox__inner,
#jx-login .el-checkbox__input.is-indeterminate .el-checkbox__inner {
	background-color: #f29716;
	border-color: #f29716;
}
#jx-login .el-checkbox__input.is-checked + .el-checkbox__label {
	color: #4f5254;
}
#jx-login .loginBtn {
	width: 282px;
	height: 44px;
	background: #f29716;
	color: white;
	font-size: 15px;
	clear: both;
	line-height: 44px;
	margin-left: 47px;
}
#jx-login .forgetPasswd {
	font-size: 14px;
	float: right;
	color: #4f5254;
	margin: -2px 48px 0 0;
	cursor: pointer;
}
.phoneTip {
	color: #fc2449;
	font-size: 12px;
	position: absolute;
	top: 175px;
	left: 50px;
}
.loginTip {
	color: #fc2449;
	font-size: 12px;
	position: absolute;
	top: 375px;
	left: 50px;
}
.codeTip {
	color: #fc2449;
	font-size: 12px;
	position: absolute;
	top: 249px;
	left: 50px;
}
</style>
