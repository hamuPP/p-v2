/**
 * Created by ty on 18/03/09.
 * Author 879372858@qq.com
 */
/*jshint esversion: 6 */

import Page from './modalPage.vue';
import Vue from 'vue';
// /* 加载vue路由 */
import Router from 'vue-router'
/* 加载模块路由 */
import Routers  from '../../router/router.js';
/* 加载vue状态管理器 */
import store from '../../vuex'

let Instance;

let top = '24px';
let right = '44px';

function getInstance() {
    Instance = Instance || (function () {
            let basicProps = {
                top: top,
                right: right
            };

            Vue.use(Router);

            // 路由配置
            const RouterConfig = {
                routes: Routers
            };
            const router = new Router(RouterConfig);
            const Instance = new Vue({
                data: basicProps,
                store,
                router,
                render (h) {
                    return h(Page, {
                        props: basicProps
                    });
                }
            });

            const component = Instance.$mount();
            document.body.appendChild(component.$el);
            const _instance = Instance.$children[0];

            //TODO
            return {
                show(opts){
                    debugger;
                    _instance.add(opts);
                },

                hide(opts){
                    _instance.hide(opts);
                }
            };
        })();


    return Instance;
}

function fullPage(type, options) {
    let opts = Object.assign(
        {
            type: 'info',//info|error|wraning|success
            title: '',
            desc: '',
            closeEvt: function () {
            },
            onClickItem: function () {
            }
        }, options);

    let instance = getInstance();

    /* 根据传参type的不同，区分是新建还是销毁这个Messager*/
    /* 然后调用instance 的增删功能 */
    if (type === 'show') {
        instance.show(opts);
    } else if (type === 'destroy') {
        //TODO 销毁
        // let i = instance;
        instance.hide(opts);
    }

};

export default {
    show (options){
        return fullPage('show', options);
    },
    destroy (options){
        return fullPage('destroy', options);

    }
};
