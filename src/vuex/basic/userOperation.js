/*********************************************************************
 * 消息通知的数据操作                                                *
 * Created by tr on 2017/11/1.                                       *
 *********************************************************************/

import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{newsListVisible: boolean}}
 */
const state = {
    /*消息通知页面的状态*/
    newsListVisible: false,
    /*消息通知页面的数据*/
    newsNoticeData: {},
    /*未读消息数据*/
    noNoticeData:{},
    /*消息通知来源的数据*/
    sendersData: [],
    /*忽略所有数据*/
    deleteAll:{},
    /*根据ID忽略数据*/
    deleteId:{},
    /*用户操作栏*/
    userVisible:true
};
/**
 * @type {{newsListVisible: ((p1:*)=>boolean)}}
 */
const getters = {
    newsListVisible: state => state.newsListVisible,
    newsNoticeData: state => state.newsNoticeData,
    noNoticeData: state => state.noNoticeData,
    sendersData: state => state.sendersData,
    deleteAll: state => state.deleteAll,
    deleteId: state => state.deleteId,
    userVisible: state => state.userVisible,
};
/**
 * @type {{showNews: (({commit}:{commit: *})), hideNews: (({commit}:{commit: *})), getNewsNoticeData: (({commit}:{commit: *}, {reqData}:{reqData?: *})), getSendersData: (({commit}:{commit: *}))}}
 */
const actions = {
    /**
     * 显示消息通知
     * @param commit
     */
    showNews({commit}) {
        commit(types.SHOW_NEWS_NOTICE);
    },
    /**
     * 关闭消息通知
     * @param commit
     */
    hideNews({commit}) {
        commit(types.HIDE_NEWS_NOTICE);
    },
    /**
     * 获取条件查询系统通知消息
     * @param commit
     * @param reqData
     */
    getNewsNoticeData({commit}, {reqData}){
        sync.getNotices(reqData, data => {
            let newData = {};
            let isBool = true;
            if (data) {
                newData.total = data.total;
                newData.data = [];
                if(data.data) {
                    data.data.map(item => {
                        let newItem = item;
                        isBool = !item.state;
                        /*判断是不是选择当前数据*/
                        newItem.selectState = false;
                        newItem.check = false;
                        newData.data.push(newItem);
                    });
                }
            }
            !isBool || commit(types.NEWS_NO_NOTICE_DATA, {newData});
            commit(types.NEWS_NOTICE_DATA, {newData})
        });
    },
    /**
     * 获取查询通知消息来源
     * @param commit
     */
    getSendersData({commit}){
        sync.getSenders(data => {
            let newData = [];
            if (data) {
                newData = data;
            }
            commit(types.SENDERS_DATA, {newData});
        });
    },
    /**
     * 全部忽略
     * @param commit
     */
    deleteAllNoticeData({commit}){
        sync.deleteAllNotice(data=>{
            let newData = [];
            if (data) {
                newData = data;
            }
            commit(types.DELETE_ALL_SENDERS_DATA, {newData});
        });
    },
    /**
     * 根据ID忽略
     * @param commit
     */
    deleteIdNoticeData({commit},{reqData}){
        sync.deleteIdNotice(reqData,data=>{
            let newData = [];
            if (data) {
                newData = data;
            }
            commit(types.DELETE_ID_SENDERS_DATA, {newData});
        });
    },
    /**
     * 显示用户操作栏
     */
    showUserVisible({commit}){
        commit(types.SHOW_USER_VISIBLE);
    },
    /**
     * 隐藏用户操作栏
     */
    hideUserVisible({commit}){
        commit(types.HIDE_USER_VISIBLE);
    },

};
/**
 * @type {{[[types.SHOW_NEWS_NOTICE]]: ((state)), [[types.HIDE_NEWS_NOTICE]]: ((state)), [[types.NEWS_NOTICE_DATA]]: ((state, {newData}:{newData: *})), [[types.SENDERS_DATA]]: ((state, {newData}:{newData: *}))}}
 */
const mutations = {
    [types.SHOW_NEWS_NOTICE] (state) {
        state.newsListVisible = true;
    },
    [types.HIDE_NEWS_NOTICE] (state) {
        state.newsListVisible = false;
    },
    [types.NEWS_NOTICE_DATA](state, {newData}){
        state.newsNoticeData = newData;
    },
    [types.NEWS_NO_NOTICE_DATA](state, {newData}){
        state.noNoticeData = newData;
    },
    [types.SENDERS_DATA](state, {newData}){
        state.sendersData = newData;
    },
    [types.DELETE_ALL_SENDERS_DATA](state, {newData}){
        state.deleteAll = newData;
    },
    [types.DELETE_ID_SENDERS_DATA](state,{newData}){
        state.deleteId = newData;
    },
    [types.SHOW_USER_VISIBLE](state){
        state.userVisible = true;
    },
    [types.HIDE_USER_VISIBLE](state){
        state.userVisible = false;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};