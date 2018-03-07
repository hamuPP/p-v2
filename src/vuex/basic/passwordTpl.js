/*********************************************************************
 * 修改密码的操作                                                    *
 * Created by tr on 2017/8/4.                                        *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{resetPwdData: string, pwdVisible: boolean}}
 */
const state = {
    /*修改密码返回的数据*/
    resetPwdData:'',
    /*是否打开修改密码页面*/
    pwdVisible:false
};
/**
 * @type {{resetPwdData: ((p1:*)=>string), pwdVisible: ((p1:*)=>boolean)}}
 */
const getters = {
    resetPwdData: state => state.resetPwdData,
    pwdVisible: state => state.pwdVisible
};
/**
 * @type {{getResetPwd: (({commit}:{commit: *}, {reqData}:{reqData?: *})), showResetPwd: (({commit}:{commit: *})), hideResetPwd: (({commit}:{commit: *}))}}
 */
const actions = {
    /**
     * 修改密码的操作
     * @param commit
     * @param reqData
     */
    getResetPwd({commit},{reqData}){
        sync.resetPwd(reqData,data=>{
            let newData = data;
            newData.code = newData.code === 1 ? state.resetPwdData.code * 1 + newData.code : 0;
            commit(types.RESET_PWD_DATA ,{newData});
        });
    },
    /**
     * 打开修改密码页面
     * @param commit
     */
    showResetPwd({commit}){
        commit(types.SHOW_RESET_PWD);
    },
    /**
     * 关闭修改密码页面
     * @param commit
     */
    hideResetPwd({commit}){
        commit(types.HIDE_RESET_PWD);
    }
};
/**
 * @type {{[[types.RESET_PWD_DATA]]: ((state, {newData}:{newData: *})), [[types.SHOW_RESET_PWD]]: ((state)), [[types.HIDE_RESET_PWD]]: ((state))}}
 */
const mutations = {
    [types.RESET_PWD_DATA](state,{newData}){
        state.resetPwdData = newData;
    },
    [types.SHOW_RESET_PWD](state){
        state.pwdVisible = true;
    },
    [types.HIDE_RESET_PWD](state){
        state.pwdVisible = false;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}