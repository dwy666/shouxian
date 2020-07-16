import http from './axios';
import router from '../router';
import store from '../store/index';
import common from './common';

let ajax = {
    loginByPasswd: loginByPasswd,
    loginByVerify: loginByVerify
}
function loginByPasswd(telphone, passwd) {
    return new Promise(resolve => {
        var postData = {
            sendData: { telphone: telphone, passwd: passwd },
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
                router.push({ name: "peasonSetting" });
            } else {
                resolve(data)
            }
        })
    });
}
function loginByVerify(telphone, code) {
    return new Promise(resolve => {
        var postData = {
            sendData: { telphone: telphone, verifyCode: code },
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
                router.push({ name: "peasonSetting" });
            } else {
                resolve(data)
            }
        })
    });
}
export default ajax;