/*********************************************************************
 * 成功和失败的提示                                                  *
 * Created by tr on 2017/7/9.                                        *
 *********************************************************************/
import * as types from '../mutation-types'

/**
 * @type {{promptVisible: boolean, promptData: string}}
 */
const state = {
    /*是否显示或隐藏*/
    promptVisible: false,
    /*提示的数据*/
    promptData: ''
};
/**
 * @type {{promptVisible: ((p1:*)=>boolean), promptData: ((p1:*)=>string)}}
 */
const getters = {
    promptVisible: state => state.promptVisible,
    promptData: state => state.promptData
};
/**
 * @type {{promptShow: (({dispatch,commit}:{dispatch: *, commit: *}, {reqDate}:{reqDate: *})), promptHide: (({commit}:{commit: *}))}}
 */
const actions = {
    /*显示提示框*/
    promptShow({dispatch, commit}, {reqDate}) {
        const reqData = reqDate;
        commit(types.PROMPT_SHOW);
        commit(types.PROMPT_DATA, {reqData});
        setTimeout(function () {
            dispatch('promptHide');
        }, 2000);
    },
    /*隐藏提示框*/
    promptHide({commit}) {
        const reqData = '';
        commit(types.PROMPT_HIDE);
        commit(types.PROMPT_DATA, {reqData});
    }
};
/**
 * @type {{[[types.PROMPT_SHOW]]: ((state)), [[types.PROMPT_DATA]]: ((state, {reqData}:{reqData: *})), [[types.PROMPT_HIDE]]: ((state))}}
 */
const mutations = {
    [types.PROMPT_SHOW] (state) {
        state.promptVisible = true;
    },
    [types.PROMPT_DATA] (state, {reqData}) {
        state.promptData = reqData;
    },
    [types.PROMPT_HIDE] (state) {
        state.promptVisible = false;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};