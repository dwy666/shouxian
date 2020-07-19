import http from 'axios';
import common from './common';
import wx from 'weixin-js-sdk';
let wxSDK = {
  wxUpload: wxUpload,
}

function wxConfig() {
  http({
    method: "get",
    url: process.env.API_IP + "jx-insure/h5/wechat/sign" + "?url=" + encodeURIComponent(location.href.split('#')[0]),
    dataType: 'json',
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  }).then(data => {
    wx.config({
      debug: false,
      appId: data.data.data.appId, // 必填，公众号的唯一标识
      timestamp: data.data.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.data.data.nonceStr, // 必填，生成签名的随机串
      signature: data.data.data.signature, // 必填，签名，见附录1
      jsApiList: ['chooseImage', 'uploadImage', 'hideMenuItems', 'chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
      wx.hideMenuItems({
        menuList: [
          'menuItem:share:appMessage',
          'menuItem:copyUrl',
          'menuItem:share:timeline',
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:share:QZone',
          'menuItem:openWithQQBrowser',
          "menuItem:openWithSafari",
          'menuItem:share:email',
          "menuItem:favorite"
        ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      });
    });

  });
}
wxConfig();

function wxUpload() {
  return new Promise((resolve, rejected) => {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        //上传图片
        wx.uploadImage({
          localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID、
            var postData = {
              sendData: {
                "imagePath": "userImage/",
                "mediaWeChatId": serverId,
              },
              token: common.getCookie("jx_token"),
              sysCode: "jx-insure-h5"
            };
            resolve(postData)
          }
        });
      }
    });
  });
}


export default wxSDK;
