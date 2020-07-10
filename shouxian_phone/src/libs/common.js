let common = {
    getOpenId: getOpenId,
    delCookie: delCookie,
    getCookie: getCookie,
    setCookie: setCookie,
    clearAllCookie: clearAllCookie,
    isplatform: isplatform
}
function getOpenId() {
    var parts = window.location.search.substr(1).replace("==", "%3D%3D").replace(/\+/g, '%2B').replace(/\"/g, '%22').split('\x26');
    for (var i = 0; i < parts.length; i++) {
        var keyValuePair = parts[i].split('=');
        var key = decodeURIComponent(keyValuePair[0]);
        var value = keyValuePair[1] ? decodeURIComponent(keyValuePair[1].replace(/\+/g, ' ')) : keyValuePair[1];
        switch (typeof (parts[key])) {
            case 'undefined':
                parts[key] = value;
                break; //first
            case 'array':
                parts[key].push(value);
                break; //third or more
            default:
                parts[key] = [parts[key], value]; // second
        }
        if (i == 0) {
            token = value;
        }
        if (i == 1) {
            openid = value;
            // localStorage.openid = value;
            setCookie("openid", value, "d30");
        }
    }
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + ";path=/";
    }
}
// 获取所在平台是Android还是IOS端
function isplatform() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return "android";
    };
    if (isiOS) {
        return "ios";
    }
}
export default common