/*********************************************************************
 * 获取新闻的数据                                                    *
 * Created by tr on 2017/7/9.                                        *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{newsDataValue: null}}
 */
let state = {
    /*新闻的数据*/
    newsDataValue: null
};
/**
 * @type {{newsDataValue: ((p1:*)=>null)}}
 */
const getters = {
    newsDataValue: state => state.newsDataValue
};
/**
 * @type {{getNewsData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *}))}}
 */
const actions = {
    /**
     * 获取新闻的数据
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getNewsData({dispatch, commit}, {reqData}){
        sync.getNews(reqData, data => {
            const newData = data;
            dispatch('loadingHide');
            commit(types.NEWS_DATA_Value, {newData});
        });
    }
};
/**
 * @type {{[[types.NEWS_DATA_Value]]: ((state, { newData }:{newData: *}))}}
 */
const mutations = {
    [types.NEWS_DATA_Value] (state, {newData}) {
        state.newsDataValue = newData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};