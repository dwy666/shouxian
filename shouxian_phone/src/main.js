// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './libs/rem'

import { Tab, Tabs, Tabbar, TabbarItem, Cell, CellGroup } from 'vant';

Vue.use(Tab).use(Tabs).use(Tabbar).use(TabbarItem).use(Cell).use(CellGroup);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
})
import $axios from './libs/axios'
Vue.prototype.$http = $axios

import common from './libs/common'
Vue.prototype.$common = common
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
