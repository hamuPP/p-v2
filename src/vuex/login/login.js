/**
 * Created by tr on 17/11/14.
 * Modified by ty on  18/3/19.
 */


import * as common from '../CommonConst'
import * as expAxios from "../common/expAxios"

/* 增加  md5 --by:ty 18/3/19. */
import Md5 from '../md5'
import UTILS from '../Utils'

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
                //登録時にsessionStorageに保存したアカウントを削除
                sessionStorage.removeItem("loginAccount");

                new UTILS().removeIframes();
                commit(common.LOGIN_OUT_DATA, {resData: data});
            },
            error:data=>{
                if(data.code === 302) {
                    new UTILS().removeIframes();
                    setTimeout(function(){
                        location.hash = "#/login";
                    },200);
                }
            }
        })
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