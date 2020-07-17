'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    API_IP: '"http://agent.jiahedev.com/"',
    JIAXIN_CENTER_API: "'http://testapi.jiahedev.com/'"
})