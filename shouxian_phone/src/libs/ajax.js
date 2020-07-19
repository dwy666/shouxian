import http from './axios';
import store from '../store/index';
import common from './common';
let ajax = {
  loginByVerify: loginByVerify,
  getCode: getCode,
  loginByPasswd: loginByPasswd,
  resetPasswd: resetPasswd,
  info: info,
  idcard: idcard,
  uploadCardImage: uploadCardImage,
  queryCardImage: queryCardImage,
  uploadWeChatImg: uploadWeChatImg
}

function loginByVerify(telphone, code) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        telphone: telphone,
        verifyCode: code,
        accessToken: common.getCookie('access_token'),
        openId: common.getCookie('openId'),
      },

      sysCode: "jx-insure-h5"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/h5/login/loginByVerify",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function loginByPasswd(telphone, passwd) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        telphone: telphone,
        passwd: passwd,
        accessToken: common.getCookie('access_token'),
        openId: common.getCookie('openId'),
      },

      sysCode: "jx-insure-h5"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/h5/login/loginByPasswd",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
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
      sysCode: "jx-insure-h5"
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

function resetPasswd(telphone, newPasswd, verifyCode) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        telphone: telphone,
        newPasswd: newPasswd,
        verifyCode: verifyCode
      },
      sysCode: "jx-insure-h5"
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

function info() {
  return new Promise(resolve => {
    var postData = {
      token: common.getCookie('jx_token'),
      sysCode: "jx-insure-h5"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/user/base/h5/info",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}


function idcard(img, type) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        imgUrl: img,
        imgType: type
      },
      sysCode: "jx-insure-h5"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/common/ocr/idcard",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function uploadCardImage(faceImage, nationImage, userName, idCard) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        faceImage: faceImage,
        nationImage: nationImage,
        userName: userName,
        idCard: idCard
      },
      token: common.getCookie('jx_token'),
      sysCode: "jx-insure-h5"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/h5/login/uploadCardImage",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function queryCardImage(faceImage, nationImage,userName,idCard) {
  return new Promise(resolve => {
    var postData = {
      sendData: {
        faceImage: faceImage,
        nationImage: nationImage,
        userName: userName,
        idCard: idCard
      },
      token: common.getCookie('jx_token'),
      sysCode: "jx-insure-h5"
    };
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/h5/login/queryCardImage",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}

function uploadWeChatImg(data) {
  return new Promise(resolve => {
    var postData = data;
    http({
      method: "post",
      url: process.env.API_IP + "jx-insure/common/image/uploadWeChatImg",
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(data => {
      resolve(data)
    })
  });
}
export default ajax
