import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/viewPage/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: './login',
            name: 'login',
            component: resolve => require(['../components/login.vue'], resolve)
        },
        {
            path: '/',
            name: 'index',
            component: resolve => require(['../components/viewPage/index.vue'], resolve),
            children:[{
                path:'peasonSetting',
                name:'peasonSetting',
                component: resolve => require(['../components/peasonSetting/index.vue'], resolve),
            }]
        }
    ]
})
