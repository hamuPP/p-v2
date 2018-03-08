/*********************************************************************
 * 登录信息操作                                                      *
 * Created by tr on 2017/7/9.                                        *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{loginData: string}}
 */
const state = {
    /*登录后的信息*/
    loginData: {}
};
/**
 * @type {{loginData: ((p1:*)=>string)}}
 */
const getters = {
    loginData: state => state.loginData
};
/**
 * @type {{login: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), loginOut: (({dispatch,commit}:{dispatch: *, commit: *}))}}
 */
const actions = {
    /**
     * 登录方法
     * @param dispatch
     * @param commit
     * @param reqData
     */
    login({ commit }, { reqData }) {
        sync.login(reqData, data => {
            let nowTableData = {};
            if (data.meta.code === 1) {
                sessionStorage.setItem('loginAccount', reqData.username);
                window.location.href = "#/index";
            } else {
                nowTableData.code = state.loginData.code ? state.loginData.code : 0 + data.meta.code;
                if (data.meta) {
                    nowTableData.msg = data.meta.message;
                } else {
                    nowTableData.msg = "网络出错";
                }

                commit(types.LOGIN_DATA, { nowTableData });
            }
        });
    },
    /**
     * 退出方法
     * @param dispatch
     * @param commit
     */
    loginOut({ dispatch, commit }) {
        sync.loginOut();
        dispatch('closeSocketIo');
    }
};
/**
 * @type {{[[types.LOGIN_DATA]]: ((state, {nowTableData}:{nowTableData: *}))}}
 */
const mutations = {
    [types.LOGIN_DATA](state, { nowTableData }) {
        state.loginData = nowTableData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};