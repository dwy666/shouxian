<template>
	<div id="resetPasswd">
		<div class="resetPasswd-header">
			<img :src="loginIcon" alt />
		</div>
		<div v-if="step == 0" class="phoneVerify">
			<div class="formTitle">通过手机验证找回密码</div>
			<div class="formContent">
				<div>您可以通过安全手机进行帐号修复</div>
				<div style="margin:15px 0 22px">请输入验证手机号：</div>
				<el-input v-model="telphone"></el-input>
				<div class="getCode" @click="getCode"
					:style="{background:$common.expPhone(this.telphone)&& (timer == 0 || timer == -1 )?'#f29716':'#D1D3D5'}">
					{{timer == 0 ||timer == -1? '发送验证码':timer +'s'}}</div>
				<div style="line-height:62px">为了确认您的身份，请输入收到的验证码：</div>
				<div class="code-input-main">
					<div class="code-input-main-item"
						:style="{border:index== code.length&&/^1[3456789]\d{9}$/.test(telphone.trim()) && codeHeightLight?'1px solid #F29716':'1px solid #DCDEE0'}"
						v-for="(item,index) in codeList" :key="index">{{code[index] ||''}}</div>
					<input ref="telphone" class="code-input-input" v-model="code" maxlength="6" type="number"
						@click="codeHL" @blur="codeNL" />
				</div>
				<div class="nextBtn" @click="nextBtn"
					:style="{background:$common.expPhone(this.telphone)&&code.length == 6?'#f29716':'#D1D3D5'}">
					下一步</div>
			</div>
		</div>
		<div v-else class="setPwd">
			<div class="formTitle">修改密码</div>
			<div class="formContent">
				<div style="margin-bottom:7px">新密码：</div>
				<el-input v-model="pwd" @blur="verifyPwd('pwd')" show-password></el-input>
				<div style="font-size:12px;line-height:16px;width:360px" :style="{color:pwdStyle?'':'#fc2449'}">
					安全性高的密码可以使账号更安全,建议您定期更换密码,且设置一个包含数字和字母,并长度超过8位以上的密码</div>
				<div style="margin: 40px 0 7px">确认新密码：
				</div>
				<el-input v-model="confirmPwd" @blur="verifyPwd('confirmPwd')" show-password></el-input>
				<span v-if="!pwdBoth" class="pwdTip">两次输入的密码不一致</span>
				<div class="saveBtn" @click="resetPasswd" :style="{background:pwd == confirmPwd?'#f29716':'#C1CBD7'}">
					保存</div>
			</div>
		</div>
		<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
			<div
				style="font-size:14px;color:#000000A6;border-bottom:1px solid #00000009;padding:74px 24px 66px;text-align:left">
				{{dialogContent}}</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogBtn">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import ajax from "../../libs/ajax";
export default {
	props: {
		codeLength: {
			default: 6,
			type: Number
		}
	},
	data() {
		return {
			loginIcon: require("../../assets/jx_resetP_logo.png"),
			telphone: "",
			codeList: [],
			code: "",
			confirmPwd: "",
			pwd: "",
			codeHeightLight: false,
			step: 0,
			pwdStyle: true,
			pwdBoth: true,
			timer: -1,
			codeFlag: true,
			dialogVisible: false,
			dialogTitle: "",
			dialogContent: ""
		};
	},
	mounted() {
		// 定义一个数组用于循环
		this.codeList = new Array(this.codeLength).fill("");
	},
	watch: {
		// 截取字符长度
		code() {
			if (this.code.length > this.codeLength) {
				this.code = this.code.substring(0, this.codeLength);
			}
		}
	},
	methods: {
		async getCode() {
			if (!this.codeFlag) return;
			if (this.timer == 0 || this.timer == -1) {
				if (this.$common.expPhone(this.telphone)) {
					this.codeFlag = false;
					var result = await ajax.getCode(this.telphone);
					if (result.code == "200") {
						this.timer = 60;
						this.countTime();
					} else {
						this.codeFlag = true;
					}
				} else {
					this.$message.error("请输入正确的手机号码！");
				}
			}
		},
		codeHL() {
			this.codeHeightLight = true;
		},
		codeNL() {
			this.codeHeightLight = false;
		},
		nextBtn() {
			if (this.$common.expPhone(this.telphone) && this.code.length == 6)
				this.step = 1;
		},
		verifyPwd(type) {
			if (type == "pwd") {
				if (
					/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/.test(this.pwd.trim())
				) {
					this.pwdStyle = true;
					if (this.confirmPwd.trim()) {
						if (this.pwd.trim() != this.confirmPwd.trim()) {
							this.pwdBoth = false;
						} else {
							this.pwdBoth = true;
						}
					}
				} else {
					this.pwdStyle = false;
				}
			} else {
				if (this.pwd.trim()) {
					if (this.pwd.trim() != this.confirmPwd.trim()) {
						this.pwdBoth = false;
					} else {
						this.pwdBoth = true;
					}
				}
			}
		},
		countTime() {
			var Intime = setInterval(() => {
				if (this.timer > 0) {
					this.timer--;
				} else {
					clearInterval(Intime);
					this.codeFlag = true;
					this.timer = 0;
				}
			}, 1000);
		},
		async resetPasswd() {
			if (
				/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/.test(this.pwd.trim()) &&
				this.pwd.trim() === this.confirmPwd.trim()
			) {
				var password = Base64.encode(this.pwd);
				var result = await ajax.resetPasswd(
					this.telphone,
					password,
					this.code
				);
				if (result.code == "000000") {
					this.dialogTitle = "提示";
					this.dialogContent = result.mesg;
					this.dialogVisible = true;
				} else if (result.code == "SMS0010") {
					this.dialogTitle = "错误";
					this.dialogContent = result.mesg;
					this.dialogVisible = true;
				} else {
					this.$message.error(result.mesg);
					this.step = 0;
				}
			}
		},
		dialogBtn() {
			this.dialogVisible = false;
			if (this.dialogTitle == "提示") {
				this.$router.push({ name: "login" });
			} else {
				this.step = 0;
			}
		}
	}
};
</script>
<style lang="">
#resetPasswd {
	height: 100%;
	background: #f6f6f6;
	color: #2e2f34;
}
#resetPasswd .resetPasswd-header {
	height: 88px;
	background: white;
	padding: 19px 465px;
	text-align: left;
	box-sizing: border-box;
	box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.09);
}
.phoneVerify,
.setPwd {
	width: 990px;
	height: 786px;
	background-color: #fff;
	margin: 37px auto;
}

.formTitle {
	font-size: 32px;
	font-weight: 500;
	line-height: 149px;
	border-bottom: 1px solid #e5e5e5;
}
.formContent {
	padding: 104px 0 0 315px;
	text-align: left;
	font-size: 18px;
	line-height: 1;
}
.phoneVerify .el-input {
	width: 246px;
	height: 44px;
	vertical-align: middle;
	font-size: 17px;
}
.setPwd .el-input {
	width: 360px;
	height: 44px;
}
.getCode {
	width: 100px;
	height: 44px;
	background: #d1d3d5;
	color: white;
	line-height: 44px;
	text-align: center;
	display: inline-block;
	vertical-align: middle;
	cursor: pointer;
}
.phoneVerify input::-webkit-outer-spin-button,
.phoneVerify input::-webkit-inner-spin-button {
	-webkit-appearance: none !important;
	margin: 0;
}

.phoneVerify .code-input-main {
	width: 360px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	position: relative;
}

.phoneVerify .code-input-input {
	height: 44px;
	width: 100%;
	position: absolute;
	border: none;
	outline: none;
	color: transparent;
	background-color: transparent;
	text-shadow: 0 0 0 transparent;
}

.phoneVerify .code-input-main-item {
	width: 38px;
	height: 50px;
	background: #fffaf3;
	border-radius: 2px;
	border: 1px solid #dcdee0;
	padding-bottom: 0;
	text-align: center;
	font-size: 30px;
	color: #7a7a7a;
	font-size: 25px;
	line-height: 50px;
}
.phoneVerify .nextBtn {
	width: 360px;
	height: 44px;
	color: white;
	font-size: 15px;
	line-height: 44px;
	margin-top: 30px;
	text-align: center;
}
.saveBtn {
	width: 360px;
	height: 44px;
	line-height: 44px;
	color: white;
	text-align: center;
	margin-top: 40px;
}
.pwdTip {
	font-size: 14px;
	color: #fc2449;
}
.el-dialog__body {
	padding: 0;
}
</style>