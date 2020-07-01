import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import common from './utils/common'
// import VueJsonp from 'vue-jsonp'


// import 'amfe-flexible';

import 'babel-polyfill'


import promise from 'es6-promise';

promise.polyfill();

// const originalPush = router.prototype.push
// router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }
Vue.prototype.common = common;

// Vue.prototype.$axios=axios;)

Vue.use(Vant);

// axios.defaults.baseURL = "http://localhost:8888";//接口路径
// axios.defaults.withCredentials =true;//设置发起请求的‘凭据模式’为‘include’，
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//将所有接口对象注册到Vue原型 
import getData from './axiosAPI'
// window.console.log(getData)
Vue.prototype.getData = getData;

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (document.cookie.length > 0) {
            //判断有cookie执行下面操作
            var arr = document.cookie.split(";"); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split("="); //再次切割
                if (arr2[0].trim() == "userName") {
                    next();
                }
            }

        } else {
            next({
                path: '/'
            })
        }
    } else {
        next();
    }
});


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')