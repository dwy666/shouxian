<template>
  <div id="resetPasswd">
    <div class="resetPasswd-header">
      <img :src="loginIcon" alt />
    </div>
    <div class="resetPasswdForm">
      <div class="formTitle">通过手机验证找回密码</div>
      <div class="formContent">
        <div>您可以通过安全手机进行帐号修复</div>
        <div style="margin:15px 0 22px">请输入验证手机号：</div>
        <el-input v-model="telphone" @input="noFocus"></el-input>
        <div class="getCode" :style="{background:/^1[3456789]\d{9}$/.test(telphone.trim())?'#f29716':'#D1D3D5'}">发送验证码</div>
        <div style="line-height:62px">为了确认您的身份，请输入收到的验证码：</div>
        <div class="code-input-main">
          <div
            class="code-input-main-item"
            :style="{border:index==code.length&&/^1[3456789]\d{9}$/.test(telphone.trim())?'1px solid #F29716':'1px solid #DCDEE0'}"
            v-for="(item,index) in codeList"
            :key="index"
          >{{code[index] ||''}}</div>
          <input ref="telphone" class="code-input-input" v-model="code" maxlength="6" type="number" />
        </div>
        <div class="nextBtn" :style="{background:/^1[3456789]\d{9}$/.test(telphone.trim()).length == 6&&code?'#f29716':'#D1D3D5'}">下一步</div>
      </div>
    </div>
  </div>
</template>
<script>
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
        code: ""
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
      getCode() {
        return this.code;
      },
      noFocus() {
        console.log(1);
        if (this.telphone.length == 11) this.$refs.telphone.blur();
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
.resetPasswdForm {
  width: 990px;
  height: 886px;
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
.el-input {
  width: 242px;
  height: 38px;
  vertical-align: middle;
  font-size: 17px;
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
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

.code-input-main {
  width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
}

.code-input-input {
  height: 44px;
  width: 100%;
  position: absolute;
  border: none;
  outline: none;
  color: transparent;
  background-color: transparent;
  text-shadow: 0 0 0 transparent;
}

.code-input-main-item {
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
.nextBtn {
  width: 360px;
  height: 44px;
  color: white;
  font-size: 15px;
  line-height: 44px;
  margin-top: 30px;
  text-align: center;
}
</style>