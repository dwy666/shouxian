'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    API_IP: '"http://agent.jiahedev.com/"',
    JIAXIN_CENTER_API: "'http://testapi.jiahedev.com/'",
    WX_OPEN_URL: '"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8d07c9f36f8ada65&redirect_uri"',
})