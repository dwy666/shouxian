import http from './axios';
import router from '../router';
import store from '../store/index';
import common from './common';
import {
  Loading
} from 'element-ui';
let ajax = {
  loginByPasswd: loginByPasswd,
  loginByVerify: loginByVerify,
  getCode: getCode,
  resetPasswd: resetPasswd,
  getInfo: getInfo,
  safeInfo: safeInfo,
  modifyPasswd: modifyPasswd,
  modifyTelphone: modifyTelphone,
  bindTelphone: bindTelphone,
  wxUnbound: wxUnbound,
  queryCardImage: queryCardImage
}

function loginByPasswd(telphone, passwd) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        telphone: telphone,
        passwd: passwd
      },
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/web/login/loginByPasswd",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      if (data.code == "000000") {
        common.setCookie('accessToken', data.data.accessToken, 'h1');
        router.push({
          name: "peasonSetting"
        });
      } else {
        resolve(data)
      }
    })
  });
}

function loginByVerify(telphone, code) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        telphone: telphone,
        verifyCode: code
      },
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/web/login/loginByVerify",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      if (data.code == "000000") {
        common.setCookie('accessToken', data.data.accessToken, 'h1');
        router.push({
          name: "peasonSetting"
        });
      } else {
        resolve(data)
      }
    })
  });
}

function getCode(telphone) {
  return new Promise((resolve, Rejected) => {
    var postData = {
      sendData: {
        mobile: telphone,
        smsType: "SMSSECU01",
        content: "(动态验证码，请在10分钟内完成填写，勿将验证码透露给他人。如非本人操作，请忽略。)",
        smsSign: "【嘉信保险测试】"
      },
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.JIAXIN_CENTER_API +
        "common-api/smsapi/emay/security/send/msg",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    }).catch(error => {
      Rejected(error)
    });
  })
}

function resetPasswd(telphone, passwd, verifyCode) {
  return new Promise((resolve, Rejected) => {
    var postData = {
      sendData: {
        telphone: telphone,
        newPasswd: passwd,
        verifyCode: verifyCode
      },
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/web/login/resetPasswd",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function getInfo() {
  return new Promise(resolve => {
    var postData = {
      token: common.getCookie('accessToken'),
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/user/base/info",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function safeInfo() {
  return new Promise(resolve => {
    var postData = {
      token: common.getCookie('accessToken'),
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/user/base/safeInfo",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function modifyPasswd(newPasswd, oldPasswd) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        newPasswd: newPasswd,
        oldPasswd: oldPasswd
      },
      token: common.getCookie('accessToken'),
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/web/login/modifyPasswd",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function modifyTelphone(oldTelphone, oldVerifyCode, newTelphone, newVerifyCode) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        oldTelphone: oldTelphone,
        oldVerifyCode: oldVerifyCode,
        newTelphone: newTelphone,
        newVerifyCode: newVerifyCode
      },
      token: common.getCookie('accessToken'),
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/web/login/modifyTelphone",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function bindTelphone(newTelphone, newVerifyCode) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        newTelphone: newTelphone,
        newVerifyCode: newVerifyCode
      },
      token: common.getCookie('accessToken'),
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/web/login/bindTelphone",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function wxUnbound() {
  return new Promise(resolve => {
    var postData = {
      token: common.getCookie('accessToken'),
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/web/login/wxUnbound",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function queryCardImage() {
  return new Promise(resolve => {
    var postData = {
      token: common.getCookie('accessToken'),
      sysCode: "jx-insure-web"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/web/login/queryCardImage",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}
export default ajax;
