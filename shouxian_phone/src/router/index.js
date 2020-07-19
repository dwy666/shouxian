import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/h5/',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['../components/login/login.vue'], resolve),
            meta: {
                title: "嘉信保险"
            }
        },{
            path: '/forgetPasswd',
            name: 'forgetPasswd',
            component: resolve => require(['../components/login/forgetPasswd.vue'], resolve),
            meta: {
                title: "嘉信保险"
            }
        },{
            path: '/identity',
            name: 'identity',
            component: resolve => require(['../components/userPage/identity.vue'], resolve),
            meta: {
                title: "嘉信保险"
            }
        },{
            path:'/productItem',
            name:'productItem',
            component:resolve => require(['../components/userPage/productItem.vue'],resolve)
        },
        {
            path: '/userPage',
            name: 'userPage',
            component: resolve => require(['../components/userPage/index.vue'], resolve),
            meta: {
                title: "嘉信保险"
            },
            children: [{
                path: 'product',
                name: 'product',
                component: resolve => require(['../components/userPage/product.vue'], resolve),
                meta: {
                    title: "嘉信保险"
                }
            },
            {
                path: 'mine',
                name: 'mine',
                component: resolve => require(['../components/userPage/center.vue'], resolve),
                meta: {
                    title: "嘉信保险"
                }
            },
            ]
        },

    ]
})
