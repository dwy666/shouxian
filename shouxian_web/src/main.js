
import Vue from 'vue'
import App from './App'
import router from './router'
import { Container, Main, Aside, Header } from 'element-ui';
Vue.use(Container).use(Main).use(Aside).use(Header)

Vue.config.productionTip = false

import $axios from './libs/axios'
Vue.prototype.$http = $axios

import common from './libs/common'
Vue.prototype.$common = common
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
