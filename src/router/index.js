import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../user/index.vue'
import index from '../user/index.vue'
import Customer from '../components/Parent_component/Customer.vue'

import Information from '../components/Parent_component/Information.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/index',
        name: 'index',

        meta: { requireAuth: true },
        component: () =>
            import ( /* webpackChunkName: "about" */ '../user/index.vue')
    },
    //添加客户
    {
        path: '/Customer',
        component: Customer,
        meta: { requireAuth: true },
    },
    // 个人信息
    {
        path: '/Information',
        component: Information,
        meta: { requireAuth: true },

    },
    //委托大厅（大家保险）
    {
        path: '/Commission_Hall',
        name: 'hall',
        meta: { requireAuth: true },
        component: () =>
            import ('../components/Parent_component/Commission_Hall.vue')
    },
    //待确认委托人
    {
        path: '/Details/',
        name: 'Details',
        meta: { requireAuth: true },
        component: () =>
            import ('../components/Parent_component/Details.vue')
    },
    //待确认意向代理人
    {
        path: '/Agent_details/',
        name: 'Agent_details',
        props: true,
        meta: { requireAuth: true },
        component: () =>
            import ('../components/Parent_component/Agent_details.vue')
    },
    //确认委托是否完成
    {
        path: '/Confirm',
        name: 'confirm',
        meta: { requireAuth: true },
        component: () =>
            import ('../components/Parent_component/Confirm.vue')
    },
    //委托大厅（其它保险）
    {
        path: '/Commission_t',
        name: 'commission_t',
        component: () =>
            import ('../components/Parent_component/Commission_T.vue')
    },
    //详情（其他保险）
    {
        path: '/weituo_Details',
        name: 'weituo_Details',
        meta: { requireAuth: true },
        component: () =>
            import ('../components/Parent_component/weituo_Details.vue')
    },
    //还单页面
    {
        path: '/huandan',
        name: 'huandan',
        meta: { requireAuth: true },
        component: () =>
            import ('../components/Parent_component/huandan.vue')
    },
    //客户详情
    {
        path: '/Customer_details',
        name: 'Customer_details',
        meta: { requireAuth: true },
        component: () =>
            import ('../components/Parent_component/Customer_details.vue')
    },
    //登陆
    {
        path: '/',
        name: 'login',
        component: () =>
            import ('../user/login.vue')
    },
    //代理认证
    {
        path: '/authentication',
        name: 'authentication',
        component: () =>
            import ('../user/authentication.vue')
    },
    //空白页面
    {
        path: '/blank',
        name: '/blank',
        component: () =>
            import ('../components/Parent_component/blank.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router