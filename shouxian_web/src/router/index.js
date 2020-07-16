import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/viewPage/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: resolve => require(['../components/login/login.vue'], resolve)
    }, {
      path: '/resetPasswd',
      name: 'resetPasswd',
      component: resolve => require(['../components/login/resetPasswd.vue'], resolve)

    },
    {
      path: '/',
      name: 'index',
      component: resolve => require(['../components/viewPage/index.vue'], resolve),
      children: [{

        path: '/peasonSetting',
        name: 'peasonSetting',
        component: resolve => require(['../components/peasonSetting/index.vue'], resolve),
      }, {
        path: '/securitySetting',
        name: 'securitySetting',
        component: resolve => require(['../components/securitySetting/index.vue'], resolve),
      }]
    },
  ]
})
