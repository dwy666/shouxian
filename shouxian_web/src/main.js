import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import {
  Container,
  Main,
  Aside,
  Header,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tree,
  Button,
  Breadcrumb,
  BreadcrumbItem,Input
  
} from 'element-ui';
Vue.use(Container).use(Main).use(Aside).use(Header).use(Row).use(Col).use(Menu).use(Submenu).use(MenuItem)
.use(MenuItemGroup).use(Tree).use(Button).use(Breadcrumb).use(BreadcrumbItem).use(Input)
Vue.use(Vuex)
Vue.config.productionTip = false

import $axios from './libs/axios'
Vue.prototype.$http = $axios

import common from './libs/common'
Vue.prototype.$common = common
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
