<template>
	<div id="addUser">
		<div style="height:458px">
			<el-scrollbar>
				<div class="dialogMain">
					<el-form class="clearfix" ref="form" :model="form" label-width="85px">
						<el-form-item v-if="isAdd !='bulkImport' &&teamType != 'A'" label="上级编码：">
							<el-input v-model="form.name" disabled></el-input>
						</el-form-item>
						<el-form-item
							v-if="teamType != 'D' && isAdd !='bulkImport' &&isAdd == 'lookInfo'&& teamType != 'A'"
							label="上级名称：">
							<el-input v-model="form.name" disabled></el-input>
						</el-form-item>
						<el-form-item
							v-if="teamType != 'D' && isAdd !='bulkImport'&& teamType == 'A' || isAdd == 'lookInfo'"
							label="团队编码：">
							<el-input v-model="form.name" disabled></el-input>
						</el-form-item>
						<el-form-item v-if="teamType != 'D'&& isAdd !='bulkImport'" label="团队级别：">
							<el-input v-model="form.name" disabled></el-input>
						</el-form-item>
						<el-form-item v-if="(isAdd == 'lookInfo' &&teamType != 'D') &&isAdd !='bulkImport'"
							label="登陆手机号：">
							<el-input v-model="form.name" disabled></el-input>
						</el-form-item>
						<el-form-item v-if="teamType != 'D'&& isAdd !='bulkImport'" label="团队名称：">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item v-if="teamType == 'A'&& isAdd !='bulkImport'" label="所在省份：">
							<el-select v-model="form.region" placeholder="请选择所在省份">
								<el-option label="区域一" value="shanghai"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item v-if="teamType == 'D'&& isAdd !='bulkImport'" label="子账户名称：">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item v-if="isAdd == 'addTeam'&& isAdd !='bulkImport'" label="登陆手机号：">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<el-form-item v-if="isAdd == 'addTeam'&& isAdd !='bulkImport'" label="登陆密码：">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
						<div class="clearfix" v-if="(teamType !='A' && teamType != 'D')&& isAdd =='lookInfo'">
							<span class="testify"
								:class="{'noTestify':teamIsTestify=='1','testified':teamIsTestify=='2','failTestify':teamIsTestify=='3'}">{{teamIsTestify == 2? '已开通':teamIsTestify == 3?'认证失效':"待认证"}}</span>
							<span
								class="tipInfo">{{teamIsTestify == '2'? '已开通':teamIsTestify == "3"?'认证失效':isMessage?"您可以通过下发短信提醒经纪人进行身份认证。":"系统已进行短信提醒"}}</span>
						</div>
						<el-form-item v-if=" isAdd =='bulkImport'" label="批量文件：">
							<span class="uploadFiles" @click="uploadFile">
								<img :src="uploadIcon" alt style="vertical-align: middle;" />
								<span style="vertical-align: middle;">上传文件</span>
							</span>
							<input type="file" name="" ref="uploadWord" style="display:none" accept=".docx"
								@change="handleFileChanged">
							<div class="uploadItem" style="margin-top: 15px;padding-left: 70px;line-height: 20px;">
								<img :src="attachmentIcon" alt style="vertical-align: middle;" />
								<span style="vertical-align: middle;color:#606266;font-size:14px">子账户模版下载</span>
								<i class="el-icon-delete" @click="deleteFile"></i>
							</div>
							<div style="padding-left: 70px;">
								<img :src="downloadIcon" alt style="vertical-align: middle;" />
								<span style="vertical-align: middle;color:#f29716;font-size:14px">子账户模版下载</span>

							</div>
						</el-form-item>
						<el-form-item
							v-if="isAdd == 'addTeam' || isAdd =='bulkImport' || isMessage &&teamIsTestify=='1'"
							label="请选择下发短信模版：" style="width:103%" label-width="82px">
							<div v-for="(item,index) in messageList" :key="item.id" class="messageBox"
								:style="{width:isMessage?'auto':'240px'}"
								:class="{'messageChecked':index == activeIndex}" @click="checkMeassage(index)">
								{{item.label}}{{isMessage}}</div>
						</el-form-item>
					</el-form>
				</div>
			</el-scrollbar>
		</div>
		<div class="dialogFooter" v-if="teamType != 'D'"
			:class="{disabled:isAdd=='lookInfo'?(teamType== 'C'?(teamIsTestify=='2'?true:false):true):teamType== 'C'?false:true}">
			<el-checkbox
				:disabled="isAdd=='lookInfo'?(teamType== 'C'?(teamIsTestify=='2'?true:false):true):teamType== 'C'?false:true"
				v-model="checked" :checked="teamType== 'C'?false:true">对该账户开通平台操作权限</el-checkbox>
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
			],
			uploadIcon: require("../../assets/upload.png"),
			downloadIcon: require("../../assets/download.png"),
			attachmentIcon: require("../../assets/attachment.png")
		};
	},
	props: {
		teamType: "",
		isAdd: "",
		teamIsTestify: "",
		isMessage: ""
	},
	methods: {
		checkMeassage(index) {
			this.activeIndex = index;
		},
		handleFileChanged() {
			var files = this.$refs.uploadWord.files;
			var file = files[0];
		},
		uploadFile() {
			this.$refs.uploadWord.dispatchEvent(new MouseEvent("click"));
		},
		deleteFile() {
			this.$confirm("确认删除?", {
				distinguishCancelAndClose: true,
				confirmButtonText: "确定",
				cancelButtonText: "取消"
			})
				.then(() => {
					this.$message({
						type: "info",
						message: "已删除"
					});
				})
				.catch(action => {
					this.$message({
						type: "info",
						message:
							action === "cancel"
								? "放弃保存并离开页面"
								: "停留在当前页面"
					});
				});
		}
	},
	mounted() {
		console.log(this.teamIsTestify == "2", this.teamType == "C");
	}
};
</script>
<style lang="">
#addUser .dialogMain {
	font-size: 16px;
	padding-right: 20px;
	color: #000;
	line-height: 48px;
	padding-bottom: 60px;
}
#addUser .el-form {
	padding: 30px 0px 0 0;
}
#addUser .el-form-item {
	width: 50%;
	float: left;
}
#addUser .el-input {
	width: 200px;
}
#addUser .messageBox {
	float: left;
	width: 240px;
	border: 1px solid #00000015;
	margin: 0 32px 20px 0;
	font-size: 16px;
	line-height: 22px;
	padding: 12px;
	box-sizing: border-box;
	text-align: left;
}
#addUser .messageBox:nth-child(2n) {
	margin: 0 0 20px 0;
}
#addUser .messageChecked {
	border: 1px solid #f29716;
	position: relative;
}
#addUser .messageChecked::before {
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
#addUser .messageChecked::after {
	content: "";
	display: block;
	position: absolute;
	top: 1px;
	right: 1px;
	width: 14px;
	height: 14px;
	background: url("../../assets/select.png");
}
#addUser .dialogFooter {
	margin: 0 -20px;
	width: 100%;
	position: absolute;
	bottom: 0px;
	background: white;
	box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
	border-bottom: 1px solid #00000015;
}
#addUser .el-checkbox {
	float: left;
	margin-left: 120px;
}
#addUser .el-checkbox__label {
	line-height: 60px;
}
#addUser .el-scrollbar {
	width: 100%;
	height: 100%;
}
#addUser .el-scrollbar__wrap {
	overflow-x: hidden;
}
#addUser .el-scrollbar {
	left: 0;
}
#addUser .el-select-dropdown__wrap {
	margin-bottom: 0 !important;
}
#addUser .el-form-item__label {
	padding: 0;
}
#addUser .dialogFooter .is-checked .el-checkbox__label {
	color: #606266;
}
#addUser .testify {
	font-size: 14px;
	color: #00000065;
}
#addUser .testify {
	float: left;
	margin-left: 20px;
}
#addUser .dialogMain .el-form .testify::before {
	top: 21px !important;
}
#addUser .tipInfo {
	color: #00000045;
	font-size: 14px;
	margin-left: 12px;
	float: left;
}

#addUser .el-checkbox__input.is-checked .el-checkbox__inner {
	background-color: #f29716;
	border-color: #f29716;
}
#addUser .disabled .el-checkbox__input.is-checked .el-checkbox__inner {
	background-color: #f2f6fc !important;
	border-color: #dcdfe6 !important;
}
#addUser .uploadFiles {
	display: inline-block;
	width: 240px;
	height: 40px;
	border-radius: 4px;
	border: 1px solid #00000015;
	font-size: 14px;
	color: #606266;
	cursor: pointer;
}
#addUser .uploadItem {
	position: relative;
}
#addUser .uploadItem:hover .el-icon-delete {
	display: inline-block;
}
#addUser .uploadItem .el-icon-delete {
	position: absolute;
	top: 4px;
	left: 210px;
	display: none;
	cursor: pointer;
}

</style>