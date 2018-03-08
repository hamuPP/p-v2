/**
 * Created by ty on 18/1/24.
 * Author 879372858@qq.com
 */
/*jshint esversion: 6 */

import Modal from './Modal.vue';
import Vue from 'vue';
/* 加载vue状态管理器 */
import store from '../../vuex'

let Instance;

let top = '24px';
let right = '44px';

function getInstance(){
    Instance = Instance || (function(){
            let basicProps = {
                top: top,
                right: right
            };

            const Instance = new Vue({
                data: basicProps,store,
                render (h) {
                    return h(Modal, {
                        props: basicProps
                    });
                }
            });

            const component = Instance.$mount();
            document.body.appendChild(component.$el);
            const allSystemsFullpage = Instance.$children[0];

            //TODO
            return {
                show(opts){
                    allSystemsFullpage.addFFF(opts);
                }
            };
        })();


    return Instance;
}

function fullPage(type, options) {
    let opts = Object.assign({
        type:'info',//info|error|wraning|success
        title:'',
        desc:'',
        closeEvt: function(){}
    }, options);

    let instance = getInstance();

    /* 根据传参type的不同，区分是新建还是销毁这个Messager*/
    /* 然后调用instance 的增删功能 */
    if(type === 'show'){
        instance.show(opts);
    }else if(type === 'destroy'){
        //TODO 销毁
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
