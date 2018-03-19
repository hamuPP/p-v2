/**
 * Created by tr on 17/11/14.
 * Modified by ty on  18/3/19.
 */


import * as common from '../CommonConst'
import * as expAxios from "../common/expAxios"

/* 增加  md5 --by:ty 18/3/19. */
import Md5 from '../md5'

const state ={
    /*登录后的信息*/
    loginData:{},
    loginOutData:{}
};
const getters ={
    loginData: state => state.loginData,
    loginOutData: state => state.loginOutData,
};
const actions = {
    /**
     * 登录，注意密码需要MD5转换
     * @param commit
     */
    loginV2({commit},{reqData}){
        let me = this;
        let _md5 = new Md5();

        let password = reqData.password;
        var passwordMd5 = _md5.hex_md5(password); //加密
        var passwordMd5Upper = passwordMd5.toUpperCase(); //转换全大写

        expAxios.sendRequest({
            url:common.getUrl({url:common.LOGIN}),
            method: 'post',
            data:{
                username: reqData.username,
                password: passwordMd5Upper
            },
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: data=>{
                console.log('succ',data);
                sessionStorage.setItem('loginData', new Date().getTime());

                sessionStorage.setItem('access_token', JSON.stringify(data.data));
                sessionStorage.setItem('x_token', JSON.stringify(data.data));

                let newData = {};
                if(data  && data.meta && (data.meta.code) == 1){
                    newData = data.data;
                }

                //如果是软件部的那个需要登录2个旧系统的，先发送登录情况
                //todo 这个方法还没测试,而且还没写
               // me.softDeptLogin(req.username, password, passwordMd5Upper);

                commit(common.LOGIN_DATA, {resData: newData});
            },
            error:data=>{
                console.log('error',data);
                if(data.code === 302) {
                    location.hash = "#/login";
                }
            }
        })
    },

    /**
     * 退出登录
     * @param commit
     */
    loginOutV2({commit}){
        let me = this;

        expAxios.sendRequest({
            url:common.getUrl({url:common.LOGIN_OUT}),
            data:{},
            success: data=>{
                console.log('LOG OUT succ',data);

                //登録時にsessionStorageに保存したアカウントを削除
                sessionStorage.removeItem("loginAccount");

                me.removeIframes();
                commit(common.LOGIN_OUT_DATA, {resData: data});
            },
            error:data=>{
                console.log('error', data);
                if(data.code === 302) {
                    me.removeIframes();
                    setTimeout(function(){
                        location.hash = "#/login";
                    },1000);
                }
            }
        })
    },

    /**
     * 移除所有iframes，主要是登录时，很多软件部的旧系统登录是用的嵌入iframes方式登录的
     * @return undefined
     */
    removeIframes(){
        let ifrms = document.getElementsByTagName("iframe");
        let copyIfrms = Object.assign({}, ifrms);

        for (let i in copyIfrms) {
            let ifr = copyIfrms[i];
            let dataId = ifr.getAttribute("data-id");
            let parentNode = ifr.parentNode;

            if (dataId === "sc") {
                ifr.setAttribute('src', 'http://10.176.155.47:7001/webclient/login/logout.jsp');
                // document.body.removeChild(parentNode);
            } else if (dataId === "wz") {
                ifr.setAttribute('src', 'http://10.176.105.94:9002/webclient/login/logout.jsp');
                // document.body.removeChild(parentNode);
            } else if (dataId === "mobile") {
                let forms = document.getElementsByTagName("form");
                for (let k = 0; k < forms.length; k++) {
                    let _form = forms[k];

                    if (_form.getAttribute("data-id") === "mobileform") {
                        _form.setAttribute("action", "http://10.176.105.138:8090/default/coframe/auth/login/logout.jsp");

                        _form.submit();

                        // document.body.removeChild(parentNode);
                        // document.body.removeChild(_form);
                        break;
                    }
                }
            }
        }
    }
};
const mutations = {
    [common.LOGIN_DATA](state,{resData}){
        state.loginData = resData;
    },
    [common.LOGIN_OUT_DATA](state,{resData}){
        state.loginOutData = resData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};