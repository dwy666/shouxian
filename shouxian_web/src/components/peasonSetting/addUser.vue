<template>
	<div id="addUser">
		<div class="dialogMain">
			<el-scrollbar>
				<el-form class="clearfix" ref="form" :model="form" label-width="100px">
					<el-form-item label="团队编码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="团队级别：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="团队名称：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="所在省份：">
						<el-select v-model="form.region" placeholder="请选择所在省份">
							<el-option label="区域一" value="shanghai"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="登陆手机号：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="登陆密码：">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="请选择下发短信模版：" style="width:100%">
						<div v-for="(item,index) in messageList" :key="item.id" class="messageBox"
							:class="{'messageChecked':index == activeIndex}" @click="checkMeassage(index)">
							{{item.label}}
						</div>
					</el-form-item>
				</el-form>
			</el-scrollbar>
		</div>
		<div class="dialogFooter">
			<el-checkbox disabled v-model="checked" checked>对该账户开通平台操作权限</el-checkbox>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			form: {
				name: "",
				region: ""
			},
			activeIndex: 0,
			checked: "",
			messageList: [
				{
					id: 1,
					label:
						"【嘉信保险】尊敬的{经纪人}您好。您的账号：{手机号码}已开通，初始密码：{密码}。可登录：http****，修改密码。嘉信经纪周英虎诚邀你一起体验互联网科技平台带来的魅力！"
				},
				{
					id: 2,
					label:
						"【嘉信保险】尊敬的{经纪人}您好。您的账号：{手机号码}已开通，初始密码：{密码}。可登录：http****，修改密码。嘉信经纪，一个保险人想要的祥子，值得了解！-周英虎"
				},
				{
					id: 3,
					label:
						"【嘉信保险】尊敬的{经纪人}您好。您的账号：{手机号码}已开通，初始密码：{密码}。可登录：http****，修改密码。嘉信经纪，一个保险人想要的祥子，值得了解！-周英虎"
				},
				{
					id: 4,
					label:
						"【嘉信保险】尊敬的{经纪人}您好。您的账号：{手机号码}已开通，初始密码：{密码}。可登录：http****，修改密码。嘉信经纪，一个保险人想要的祥子，值得了解！-周英虎"
				}
			]
		};
	},
	methods: {
		checkMeassage(index) {
			this.activeIndex = index;
		}
	}
};
</script>
<style lang="">
#addUser .dialogMain {
	font-size: 16px;
	color: #000;
	line-height: 48px;
	height: 458px;
}
.el-form {
	padding-top: 30px;
}
.el-form-item {
	width: 50%;
	float: left;
}
.el-input {
	width: 200px;
}
.messageBox {
	float: left;
	width: 234px;
	border: 1px solid #00000015;
	margin: 0 32px 20px 0;
	font-size: 16px;
	line-height: 22px;
	padding: 12px;
	box-sizing: border-box;
	text-align: left;
}
.messageBox:nth-child(2n) {
	margin: 0 0 20px 0;
}
.messageChecked {
	border: 1px solid #f29716;
	position: relative;
}
.messageChecked::before {
	position: absolute;
	content: "";
	display: block;
	border: 14px solid;
	width: 0;
	height: 0;
	border-color: #f29716 #f29716 transparent transparent;
	top: 0;
	right: 0;
	background: url("../../assets/select.png");
}
.messageChecked::after {
	content: "";
	display: block;
	position: absolute;
	top: 1px;
	right: 1px;
	width: 14px;
	height: 14px;
	background: url("../../assets/select.png");
}
.dialogFooter {
	margin: 0 -20px;
	width: 100%;
	position: absolute;
	bottom: 60px;

	background: white;
	border-top: 1px solid #00000015;
	border-bottom: 1px solid #00000015;
}
.el-checkbox {
	float: left;
	margin-left: 120px;
}
.el-checkbox__label {
	line-height: 60px;
}
.el-scrollbar {
	height: 100%;
}
.el-scrollbar__wrap {
	overflow-x: hidden;
}
</style>