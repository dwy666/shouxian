<template>
  <div id="securitySetting">
    <el-scrollbar>
      <el-collapse v-model="activeName" accordion @change="open">
        <el-collapse-item title="安全设置" name="0" disabled></el-collapse-item>
        <el-collapse-item name="1">
          <template slot="title">
            <div class="tipTitle">身份认证</div>
            <div v-if="!isopen1">
              <div class="tipWord">已通过注册材料的审核</div>
              <div class="unfold">
                <span>查看资料身份证</span>
                <img :src="unfoldIcon" alt />
              </div>
            </div>
            <div v-else class="fold">
              <span>收起</span>
              <img :src="foldIcon" alt />
            </div>
          </template>
          <div class="content content1">
            <div>
              <span>身份证正面</span>
              <img src alt />
            </div>
            <div>
              <span>身份证反面</span>
              <img src alt />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <div class="tipTitle">登录密码</div>
            <div v-if="!isopen2">
              <div class="tipWord">安全性高的密码可以使账号更安全,建议您定期更换密码,且设置一个包含数字和字母,并长度超过8位以上的密码</div>
              <div class="unfold">
                <span>修改登录密码</span>
                <img :src="unfoldIcon" alt />
              </div>
            </div>
            <div v-else class="fold">
              <span>收起</span>
              <img :src="foldIcon" alt />
            </div>
          </template>
          <div class="content content2">
            <el-form label-width="120px" :model="pwForm">
              <el-form-item label="当前密码：">
                <el-input v-model="pwForm.password" show-password></el-input>
              </el-form-item>
              <el-form-item label="新密码：">
                <el-input v-model="pwForm.newPassword" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认新密码：">
                <el-input v-model="pwForm.newRePassword" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="onSubmit">保存</el-button>
              </el-form-item>
              <div class="passwordTip">安全性高的密码可以使账号更安全,建议您定期更换密码,且设置一个包含数字和字母,并长度超过8位以上的密码</div>
            </el-form>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <div class="tipTitle">绑定手机号 133*****765</div>
            <div v-if="!isopen3">
              <div class="tipWord">绑定手机后,您即可使用手机号进行登录或者找回密码</div>
              <div class="unfold">
                <span>修改手机号</span>
                <img :src="unfoldIcon" alt />
              </div>
            </div>
            <div v-else class="fold">
              <span>收起</span>
              <img :src="foldIcon" alt />
            </div>
          </template>
          <div class="content content3">
            <el-form v-if="oldPhone" label-width="120px" :model="phoneForm">
              <el-form-item label="旧手机号：">
                <div>{{phoneForm.oldPhone}}</div>
              </el-form-item>
              <el-form-item label="手机验证码：">
                <el-input v-model="phoneForm.oldCode"></el-input>
                <el-button type="warning" @click="sendCode" plain>发送验证码</el-button>
                <span class="codeWrong">验证码错误</span>
              </el-form-item>
              <el-form-item label-width="120px">
                <el-button type="warning" @click="nextBtn">下一步</el-button>
                <el-button type="type">取消</el-button>
              </el-form-item>
            </el-form>
            <el-form v-else label-width="120px" :model="phoneForm">
              <el-form-item label="新手机号：">
                <el-input v-model="phoneForm.newPhone"></el-input>
              </el-form-item>
              <el-form-item label="手机验证码：">
                <el-input v-model="phoneForm.newCode"></el-input>
                <el-button type="warning" @click="sendCode" plain>发送验证码</el-button>
                <span class="codeWrong">验证码错误</span>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="savePhone">绑定</el-button>
                <el-button type="type">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <el-collapse-item name="4" disabled>
          <template v-if="isBundling" slot="title">
            <div class="tipTitle">微信认证</div>
            <div class="tipWord">绑定微信号，可在“嘉信保险”公众号中查看您的订单信息</div>
            <div class="unfold" @click="unbundling">
              <span>解绑</span>
              <img :src="unfoldIcon" alt />
            </div>
          </template>
          <template v-else slot="title">
            <div class="tipTitle">微信认证</div>
            <div class="tipWord">未绑定微信号，绑定后可在“嘉信保险”公众号中查看您的订单信息</div>
            <div class="unfold" @click="bundling" v-clickOutSide="handleClose">
              <span>绑定公众号</span>
              <img :src="unfoldIcon" alt />
            </div>
            <div v-if="goBundling" class="qrcode" >
              <img src alt />
            </div>
          </template>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="25%" style="margin-top:20vh">
      <span>确认解绑吗？</span>
      <span slot="footer" class="dialog-footer clearfix">
        <el-button class="sure" type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button class="cancel" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: "",
        isTestify: true,
        isopen1: false,
        isopen2: false,
        isopen3: false,
        oldPhone: true,
        foldIcon: require("../../assets/fold.png"),
        unfoldIcon: require("../../assets/unfold.png"),
        pwForm: {
          password: "",
          newPassword: "",
          newRePassword: ""
        },
        phoneForm: {
          oldPhone: "",
          oldCode: "",
          newPhone: "",
          newCode: ""
        },
        dialogVisible: false,
        isBundling: false,
        goBundling: false
      };
    },
    methods: {
      open(activeNames) {
        switch (activeNames) {
          case "1":
            this.isopen1 = true;
            break;
          case "2":
            this.isopen2 = true;
            break;
          case "3":
            this.isopen3 = true;
            break;
          default:
            this.isopen1 = false;
            this.isopen2 = false;
            this.isopen3 = false;
            break;
        }
      },
      onSubmit() {},
      sendCode() {},
      nextBtn() {},
      savePhone() {},
      unbundling() {
        this.dialogVisible = true;
      },
      bundling() {
        this.goBundling = true;
	  },
	  handleClose(){
		  this.goBundling = false;
	  }
    }
  };
</script>
<style lang="">
#securitySetting {
  padding: 0 0 0 50px ;
  height: 100%;
}
#securitySetting .el-scrollbar{
	height: 100%;
}
#securitySetting .el-scrollbar__wrap{
	overflow-x: hidden;
	padding-right: 50px;
}
#securitySetting .el-collapse-item__header {
  height: 82px;
  font-weight: 600;
  color: #000000d9;
  font-size: 16px;
  line-height: 1;
  flex-direction: column;
  align-items: start;
  position: relative;
}
#securitySetting .el-collapse-item.is-disabled .el-collapse-item__header {
  cursor: pointer;
  color: #000000d9;
}
#securitySetting .el-collapse-item__header.is-active {
  height: 52px;
}
#securitySetting .el-collapse-item:nth-child(1) .el-collapse-item__header {
  height: 88px;
  font-size: 20px;
  line-height: 88px;
}
#securitySetting .tipTitle {
  margin: 18px 0 12px;
}
#securitySetting .tipWord {
  font-size: 14px;
  color: #000000a6;
}
#securitySetting .el-collapse-item .el-collapse-item__arrow {
  display: none;
}
#securitySetting .el-collapse-item__header.is-active .unfold,
#securitySetting .el-collapse-item__header.is-active .fold {
  top: 18px;
}
#securitySetting .unfold,
#securitySetting .fold {
  position: absolute;
  top: 41px;
  right: 00px;
  font-size: 14px;
  color: #f29716;
}
#securitySetting .unfold img,
#securitySetting .fold img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
#securitySetting .content {
  border-top: 1px dotted #e8e8e8;
}
#securitySetting .content1 {
  font-size: 14px;
  display: flex;
}
#securitySetting .content1 > div {
  width: 200px;
  margin-right: 60px;
  line-height: 52px;
  text-align: left;
}
#securitySetting .content1 > div img {
  width: 200px;
  height: 128px;
  display: block;
}
#securitySetting .el-form {
  margin-top: 20px;
  position: relative;
}
#securitySetting .content2 .el-input {
  width: 200px;
  float: left;
}
#securitySetting .el-button {
  float: left;
  width: 120px;
  height: 44px;
  padding: 0;
}
#securitySetting .content2 .passwordTip {
  top: 70px;
  left: 334px;
  color: #028dff;
  line-height: 15px;
  font-size: 12px;
  width: 330px;
  text-align: left;
  position: absolute;
}
#securitySetting .content3 .el-input {
  width: 260px;
  float: left;
  margin-right: 14px;
}
#securitySetting .content3 .codeWrong {
  font-size: 12px;
  color: #fc2449;
  float: left;
  display: block;
  margin-left: 14px;
  padding-top: 15px;
}
#securitySetting .el-dialog {
  text-align: left;
}
#securitySetting .el-dialog__body {
  padding: 24px 24px 66px;
  border-top: 1px solid #0000000f;
  border-bottom: 1px solid #0000000f;
}
#securitySetting .el-dialog__footer {
  padding: 10px;
}
#securitySetting .el-dialog__footer .el-button {
  width: 65px;
  height: 32px;
  float: right;
  margin-left: 8px;
}
#securitySetting .sure {
  background-color: #f29716;
  border-color: #f29716;
}

#securitySetting .sure:hover {
  background-color: #f4a73a;
  border-color: #f29716;
}
#securitySetting .sure:focus,
#securitySetting .sure.is-active,
#securitySetting .sure:active {
  background-color: #e38e14;
  border-color: #e38e14;
}
#securitySetting .cancel:focus,
#securitySetting .cancel:hover {
  color: #f29716;
  background: white;
  border-color: #f29716;
}
#securitySetting .cancel:active {
  color: #f29716;
  background: white;
  border-color: #f29716;
}
#securitySetting .qrcode {
  width: 180px;
  height: 180px;
  border: 1px solid #f29716;
  padding: 7px;
  position: absolute;
  right: 0;
  top: 80px;
}
</style>