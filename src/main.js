import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import axios from 'axios';


Vue.use(VueRouter);
Vue.use(iView);
Vue.prototype.$axios=axios;


/** 封装请求方法,验证登录 **/
Vue.prototype.$request = function(method, url, params = null, callbackfunc){
	var currentPosi = this.$route.path
    var router = this.$router;
    var data = {};
    if(params != null) {
        data = params;
    }
    var requestObj = {
        method:method,
        url:url
    }
    if (method == "POST") {
        requestObj['data'] = data
        requestObj['headers'] = {'Content-Type': 'application/x-www-form-urlencoded'}
    }
    this.$axios(requestObj).then(function(res){
        if(res.data.code == '700003' && currentPosi == '/home') {
            router.push({ path: '/login'})
            return
        }
        callbackfunc(res)
    })
    .catch(function(err){
        console.log(err)
    });
}



// 路由配置
const RouterConfig = {
    mode: 'hash',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
