<template>
  <div id="login">
    <div class="tab clearfix">
      <div class="tabName" :class="{tabNameActive:active==0}" @click="codeLogin">账户登录</div>
      <div @click="passwdLogin" class="tabName" :class="{tabNameActive:active==1}">短信登录</div>
    </div>
    <div v-if="active == 0" class="codeForm">
      <div style="margin-bottom:14px">手机号</div>
      <div class="phoneInput">
        <span>+86</span>
        <input type="text" v-model="telphone" placeholder="请输入手机号" @blur="phoneBlur" />
        <div v-if="phoneTip" class="phontTip">手机号码格式错误</div>
      </div>
      <div style="margin-bottom:14px">密码</div>
      <div class="passwdInput">
        <input type="password" v-model="passwd" placeholder="请输入密码" />
      </div>
      <div class="loginBtn" @click="loginByPasswd" :style="{background:this.$common.expPhone(this.telphone) && this.$common.expPasswd(this.passwd) ? '#F29716':''}">登录</div>
      <div class="forgetPasswd" @click="forgetPasswd">忘记密码</div>
    </div>
    <div v-else class="passwdForm">
      <div style="margin-bottom:14px">手机号</div>
      <div class="phoneInput">
        <span>+86</span>
        <input type="text" v-model="telphone" placeholder="请输入手机号" @blur="phoneBlur" />
        <div v-if="phoneTip" class="phontTip">手机号码格式错误</div>
      </div>
      <div style="margin-bottom:14px">验证码</div>
      <div class="codeInput">
        <input type="text" v-model="verifyCode" placeholder="请输入验证码" />
        <span :style="{color:$common.expPhone(telphone)?'#F29716':''}" @click="getCode">{{timer == 0 ||timer == -1? '发送验证码':timer +'s'}}</span>
      </div>
      <div class="loginBtn" :style="{background:this.$common.expPhone(this.telphone) && this.verifyCode.length == 6 ? '#F29716':''}" @click="loginByVerify">登录</div>
    </div>
  </div>
</template>
<script>
  import ajax from "../../libs/ajax";
  export default {
    data() {
      return {
        token: this.$common.getCookie("access_token"),
        error: require("../../assets/error.png"),
        active: 0,
        phoneTip: false,
        telphone: "",
        passwd: "",
        verifyCode: "",
        codeFlag: true,
        timer: -1
      };
    },
    mounted() {
      if (window.location.href.indexOf("access_token") == -1) {
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8d07c9f36f8ada65&redirect_uri=http://agent.jiahedev.com/jx-insure/h5/wechat/getWechatParam&response_type=code&scope=snsapi_userinfo&state=phoneLogin#wechat_redirect";
      } else {
        this.getopenid();
      }
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
            this.$common.setCookie("access_token", this.accessToken, "d30");
          }
          if (key == "openid") {
            this.openId = value;
            this.$common.setCookie("openId", this.openId, "d30");
          }
          if (key == "unionid") {
            this.unionId = value;
            this.$common.setCookie("unionId", this.unionId, "d30");
          }
        });
      },
      passwdLogin() {
        this.active = 1;
      },
      codeLogin() {
        this.active = 0;
      },
      phoneBlur() {
        if (this.$common.expPhone(this.telphone)) {
          this.phoneTip = false;
        } else {
          this.phoneTip = true;
        }
      },
      forgetPasswd() {
        this.$router.push({ name: "forgetPasswd" });
      },
      async loginByVerify() {
        if (this.$common.expPhone(this.telphone) && this.verifyCode.length == 6) {
          var result = await ajax.loginByVerify(this.telphone, this.verifyCode);
          if (result.code == "000000") {
            this.$common.setCookie("jx_token", result.data.accessToken, "d30");
            this.$router.push({ name: "mine" });
          } else if (result.code == "SMS0010") {
            this.$toast({
              message: "短信验证码错误",
              icon: this.error
            });
          } else {
            this.$toast({
              message: result.mesg,
              icon: this.error
            });
          }
        }
      },
      async loginByPasswd() {
        if (
          this.$common.expPhone(this.telphone) &&
          this.$common.expPasswd(this.passwd)
        ) {
          let Base64 = require("js-base64").Base64;
          var password = Base64.encode(this.passwd);
          var result = await ajax.loginByPasswd(this.telphone, password);
          if (result.code == "000000") {
            this.$common.setCookie("jx_token", result.data.accessToken, "d30");
            this.$router.push({ name: "mine" });
          } else if (result.code == "1005") {
            this.$toast({
              message: "密码错误!",
              icon: this.error
            });
          } else {
            this.$toast({
              message: result.mesg,
              icon: this.error
            });
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
              this.$toast({
                message: result.msg,
                icon: this.error
              });
            }
          }
        }
      }
    }
  };
</script>
<style scoped>
#login {
  padding: 0 39px;
}

.tabName {
  color: #7d8184;
  font-size: 15px;
  float: right;
  line-height: 21px;
  margin: 70px 116px 0 0;
}
.tabNameActive {
  color: #25292e;
  font-weight: 600;
  font-size: 24px;
  float: left;
  line-height: 33px;
  margin: 60px 21px 34px 0;
}
.codeForm,
.passwdForm {
  color: #000000;
  font-size: 17px;
  text-align: left;
}
.phoneInput {
  margin-bottom: 35px;
  position: relative;
}
.phoneInput span {
  padding: 0 8px;
  color: #25292e;
  line-height: 36px;
  font-size: 17px;
  display: inline-block;
  margin-right: 27px;
  border-bottom: 1px solid #eaeaea;
}
.codeInput span {
  border-bottom: 1px solid #eaeaea;
  line-height: 36px;
  display: inline-block;
  color: #c1cbd7;
  font-size: 15px;
  margin-left: -5px;
  width: 75px;
}
.phoneInput input,
.codeInput input {
  border: none;
  border-bottom: 1px solid #eaeaea;
  font-size: 17px;
  line-height: 36px;
  width: 220px;
}

.passwdInput input {
  border: none;
  border-bottom: 1px solid #eaeaea;
  font-size: 17px;
  line-height: 36px;
  width: 100%;
}
.phontTip {
  position: absolute;
  font-size: 12px;
  color: #fc2449;
  top: 40px;
  left: 76px;
}
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #a1a3a6;
  font-size: 17px;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #a1a3a6;
  font-size: 17px;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #a1a3a6;
  font-size: 17px;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #a1a3a6;
  font-size: 17px;
}
.loginBtn {
  width: 295px;
  height: 44px;
  background: #c1cbd7;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  margin-top: 44px;
}
.forgetPasswd {
  font-size: 15px;
  color: #bbbdbf;
  line-height: 21px;
  margin: 12px 11px 0 0;
  text-align: right;
}
</style>