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
            name: 'HelloWorld',
            component: resolve => require(['../components/viewPage/index.vue'], resolve)
        }
    ]
})
