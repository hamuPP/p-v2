/**
 * Created by ty on 18/1/31.
 */
"use strict";
import 'babel-polyfill'

/* 引入Vue相关 */
import Vue from 'vue'
import VueRouter from 'vue-router';
import Routers from './router/router.js';

import App from './app.vue';

/* 加载vue状态管理器 */
import store from './vuex'


Vue.use(VueRouter);

/*引入公用提示方法 todo 后期整理一下：是否 commonMethods 和 common都需要 --start-- */
import commonMethods from './vuex/modules/commonMethods'
import * as common from './vuex/CommonConst'

Vue.prototype.commonMethods = new commonMethods();
Vue.prototype.common = common;
/*引入公用提示方法 todo 后期整理一下：是否 commonMethods 和 common都需要 --end-- */



//引入公共css start
import "./styles/bootstrap.css";
import "./styles/font_img/iconfont.css";
import "./styles/font_newImg/iconfont.css"
import "./styles/style.css";
import "./styles/all.css";
import "./styles/animation.css";

//todo 这个css后期整理一下，有些样式不需要全局
import './styles/main.less';
//引入公共css end


// 路由配置
const RouterConfig = {
    routes: Routers
};



const router = new VueRouter(RouterConfig);

new Vue({
    el: '#app',
    router: router,
    store,
    render: h => h(App)
});
