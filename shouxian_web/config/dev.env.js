'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_IP: '"http://agent.jiahedev.com/"',
    JIAXIN_CENTER_API:"'http://testapi.jiahedev.com/'"
})
