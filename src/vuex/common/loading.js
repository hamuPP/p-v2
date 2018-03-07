/*********************************************************************
 * 加载中的操作                                                      *
 * Created by tr on 2017/6/28.                                       *
 *********************************************************************/
import * as types from '../mutation-types'

/**
 * @type {{loadingVisible: boolean}}
 */
const state = {
    /*是否隐藏或显示*/
    loadingVisible: false
};
/**
 * @type {{loadingVisible: ((p1:*)=>boolean)}}
 */
const getters = {
    loadingVisible: state => state.loadingVisible
};
/**
 * @type {{loadingShow: (({commit}:{commit: *})), loadingHide: (({commit}:{commit: *}))}}
 */
const actions = {
    /**
     * 显示方法
     * @param commit
     */
    loadingShow({ dispatch, commit }) {
        let getTimeout = setTimeout(function() {
            dispatch('loadingHide');
            clearTimeout(getTimeout);
        }, 3000);
        commit(types.LOADING_SHOW);
    },
    /**
     * 隐藏方法
     * @param commit
     */
    loadingHide({ commit }) {
        commit(types.LOADING_HIDE);
    }
};
/**
 * @type {{[[types.LOADING_SHOW]]: ((state)), [[types.LOADING_HIDE]]: ((state))}}
 */
const mutations = {
    [types.LOADING_SHOW](state) {
        state.loadingVisible = true;

    },
    [types.LOADING_HIDE](state) {
        state.loadingVisible = false;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};