'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_IP: '"http://agent.jiahedev.com/"',
    WX_OPEN_URL: '"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8d07c9f36f8ada65&redirect_uri"',
})
