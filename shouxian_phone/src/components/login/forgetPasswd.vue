<template>
  <div id="forgetPasswd">
    <div class="tabName">手机找回密码</div>
    <div class="passwdForm">
      <div style="margin-bottom:14px">手机号</div>
      <div class="phoneInput">
        <span>+86</span>
        <input type="text" placeholder="请输入手机号" v-model="telphone" @blur="phoneBlur" />
        <div v-if="phoneTip" class="phontTip">手机号码格式错误</div>
      </div>
      <div style="margin-bottom:14px">验证码</div>
      <div class="codeInput">
        <input type="text" placeholder="请输入验证码" v-model="vertifyCode" />
        <span :style="{color:$common.expPhone(telphone)?'#F29716':''}" @click="getCode">{{timer == 0 ||timer == -1? '发送验证码':timer +'s'}}</span>
      </div>
      <div style="margin:34px 0 14px">新密码</div>
      <div class="passwdInput">
        <input type="password" placeholder="请输入新密码" v-model="password" @blur="verifyPwd('pwd')" />
        <div v-if="pwdTip" class="pwdTip">密码包含数字和字母,并长度为8位以上</div>
      </div>
      <div style="margin:34px 0 14px">确认新密码</div>
      <div class="passwdInput">
        <input type="password" placeholder="请输入确认新密码" v-model="confirmPwd" @blur="verifyPwd('confirmPwd')" />
      </div>
      <div
        class="passwdBtn"
        @click="resetPasswd"
        :style="{background:$common.expPhone(telphone) &&$common.expPasswd(password) &vertifyCode.length == 6 && password.trim() == confirmPwd.trim()?'#F29716':''}"
      >重置密码</div>
    </div>
  </div>
</template>
<script>
  import ajax from "../../libs/ajax";
  export default {
    data() {
      return {
        phoneTip: false,
        telphone: "",
        vertifyCode: "",
        password: "",
        confirmPwd: "",
        codeFlag: true,
        timer: -1,
        pwdTip: false,
        error: require("../../assets/error.png"),
        right: require("../../assets/right.png")
      };
    },
    methods: {
      phoneBlur() {
        if (this.$common.expPhone(this.telphone)) {
          this.phoneTip = false;
        } else {
          this.phoneTip = true;
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
      },
      verifyPwd(type) {
        if (type == "pwd") {
          if (this.$common.expPasswd(this.password.trim())) {
            this.pwdTip = false;
            if (
              this.confirmPwd.trim() &&
              this.password.trim() &&
              this.password.trim() != this.confirmPwd.trim()
            ) {
              this.$toast({
                message: "两次输入的密码不一致!",
                icon: this.error
              });
            }
          } else {
            this.pwdTip = true;
          }
        } else {
          if (
            this.password.trim() &&
            this.confirmPwd.trim() &&
            this.password.trim() != this.confirmPwd.trim()
          ) {
            this.$toast({
              message: "两次输入的密码不一致!",
              icon: this.error
            });
          }
        }
      },
      async resetPasswd() {
        if (
          this.$common.expPhone(this.telphone) &&
          this.$common.expPasswd(this.password) &&
          this.vertifyCode.length == 6 &&
          this.password.trim() == this.confirmPwd.trim()
        ) {
          let Base64 = require("js-base64").Base64;
          var password = Base64.encode(this.password);
          var result = await ajax.resetPasswd(
            this.telphone,
            password,
            this.vertifyCode
          );
          if (result.code == "000000") {
            this.$toast({
              message: "重置成功",
              icon: this.right
            });
            setTimeout(function() {
              this.$router.push({ name: "login" });
            }, 2000);
          } else if (result.code == "SMS0010") {
            this.$toast({
              message: "验证码错误",
              icon: this.error
            });
          } else {
            this.$toast({
              message: result.mesg,
              icon: this.error
            });
          }
          this.telphone = "";
          this.password = "";
          this.vertifyCode = "";
          this.confirmPwd = "";
        }
      }
    }
  };
</script>
<style >
#forgetPasswd {
  padding: 0 39px;
}
.tabName {
  color: #7a7a7a;
  font-size: 24px;
  text-align: left;
  line-height: 33px;
  margin: 40px 0px 34px 20px;
}
.passwdForm {
  color: #7a7a7a;
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
.phoneInput input,
.codeInput input {
  border: none;
  border-bottom: 1px solid #eaeaea;
  font-size: 17px;
  line-height: 36px;
  width: 220px;
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
.passwdInput input {
  border: none;
  border-bottom: 1px solid #eaeaea;
  font-size: 17px;
  line-height: 36px;
  width: 100%;
}
.pwdTip {
  color: #fc2449;
  font-size: 12px;
  position: absolute;
}
.phontTip {
  position: absolute;
  font-size: 12px;
  color: #fc2449;
  top: 40px;
  left: 76px;
}
.passwdBtn {
  width: 295px;
  height: 44px;
  background: #d1d3d5;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  margin-top: 44px;
}
</style>