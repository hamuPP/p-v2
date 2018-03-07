/*********************************************************************
 * 获取代办的数据                                                    *
 * Created by tr on 2017/7/9.                                        *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'
import io from 'socket.io-client'

/**
 * @type {{isFullScreen: boolean, backlogsData: Array, clientsData: Array, socket: string, currentStatus: number}}
 */
let state = {
    /*全屏是否显示*/
    isFullScreen: false,
    /*代办的数据*/
    backlogsData: [],
    /*事项来源的数据*/
    clientsData: [],
    /*socket的对象*/
    socket: {},
    /*当前是已处理还是未处理*/
    currentStatus: 0,
    backlogsTagsData: []
};
/**
 * @type {{isFullScreen: ((p1:*)=>boolean), backlogsData: ((p1:*)=>Array), clientsData: ((p1:*)=>Array), socket: ((p1:*)=>string), currentStatus: ((p1:*)=>number)}}
 */
const getters = {
    isFullScreen: state => state.isFullScreen,
    backlogsData: state => state.backlogsData,
    clientsData: state => state.clientsData,
    socket: state => state.socket,
    currentStatus: state => state.currentStatus,
    backlogsTagsData: state => state.backlogsTagsData
};
/**
 * @type {{getBacklogsData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), getSocketIo: (({commit}:{commit: *}, {reqData}:{reqData: *})), closeSocketIo: (({commit}:{commit: *})), getClientsData: (({commit}:{commit: *}, {reqData}:{reqData?: *})), maxingFullScreen: (({commit}:{commit: *})), resetScreen: (({commit}:{commit: *}))}}
 */
const actions = {
    /**
     * 获取代办的数据
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getBacklogsData({ dispatch, commit }, { reqData }) {
        sync.getBacklogs(reqData, data => {
            dispatch('loadingHide');
            let newData = data;
            state.currentStatus = reqData.parameter.status;
            commit(types.BACK_LOGS_DATA, { newData });
        });
    },
    /**
     * socket的链接
     * @param commit
     * @param reqData
     */
    getSocketIo({ commit }, { reqData }) {
        state.socket = io.connect(location.protocol + "//" + location.hostname + ':' + (location.port * 1 + 10) + '/', { 'connect timeout': 15000 });
        if (state.socket.connect) {
            state.socket.on('connect', function() {
                state.socket.emit('initEvent', reqData.executorId);
            });
            /*接受推送消息的数据*/
            state.socket.on('backlogEvent', data => {
                let newData = state.backlogsData;
                /*判断是不是新增*/
                if (data && state.executorId) {
                    let da = data;
                    let date = new Date().getTime() - new Date(data.createTime).getTime();
                    date = date / 1000 / 60;
                    let duration = '';
                    switch (true) {
                        case date < 5:
                            duration = '5分钟内';
                            break;
                        case date < 30:
                            duration = '半小时内';
                            break;
                        case date < 24 * 60:
                            duration = '1天内';
                            break;
                        case date < 24 * 60 * 7:
                            duration = '一周内';
                            break;
                        case date < 24 * 60 * 31:
                            duration = '一个月内';
                            break;
                        default:
                            duration = '一个月前';
                    }
                    da.duration = duration;
                    /*新增代办信息*/
                    newData.data.splice(0, 0, da);
                    /*修改代办信息*/
                } else if (data && data.id) {
                    let newDataEle = [];
                    newData.data.map(item => {
                        let nItem = item;
                        if (nItem.backlogId === data.backlogId) {
                            nItem.status = data.status;
                        }
                        newDataEle.push(nItem);
                    });
                    newData.data = newDataEle;
                }
                commit(types.BACK_LOGS_DATA, { newData });
            });
            state.socket.on('noticeEvent', data => {
                let newData = state.newsNoticeData;
                if (data) {
                    newData.total++;
                    newData.data.splice(0, 0, data);
                }
                commit(types.NEWS_NOTICE_DATA, { newData });
            });
        } else {}
    },
    /**
     * 推送消息
     * @param commit
     * @param reqData
     */
    resourceSocketIo({ commit }, { reqData }) {
        if (state.socket.connect) {
            state.socket.emit('resourceClickEvent', JSON.stringify(reqData));
        }
    },
    /**
     * 断开socket链接
     * @param commit
     */
    closeSocketIo({ commit }) {
        state.socket.on('disconnect', function() {
            console.log("与服务其断开");
        });

    },
    /**
     * 获取事项来源的数据
     * @param commit
     * @param reqData
     */
    getClientsData({ commit }, { reqData }) {
        sync.getClients(reqData, data => {
            const newData = data;
            commit(types.CLIENTS_DATA, { newData });
        });
    },
    /**
     * 全屏数据的处理
     * @param commit
     */
    maxingFullScreen({ commit }) {
        commit(types.MAXING_FULL_SCREEN);
    },
    /**
     * 关闭全屏数据
     * @param commit
     */
    resetScreen({ commit }) {
        commit(types.RESET_SCREEN);
    },
    getBacklogsTagData({ commit }, { reqData }) {
        sync.getBacklogsTag(reqData, data => {
            const newData = data;
            commit(types.BACKLOGS_TAG_DATA, { newData });
        });
    }
};
/**
 * @type {{[[types.BACK_LOGS_DATA]]: ((state, {newData}:{newData: *})), [[types.TODO_CLIENTS_DATA]]: ((state, {newData}:{newData: *})), [[types.MAXING_FULL_SCREEN]]: ((state)), [[types.RESET_SCREEN]]: ((state))}}
 */
const mutations = {
    [types.BACK_LOGS_DATA](state, { newData }) {
        state.backlogsData = newData;
    },
    [types.CLIENTS_DATA](state, { newData }) {
        state.clientsData = newData;
    },
    [types.MAXING_FULL_SCREEN](state) {
        state.isFullScreen = true;
    },
    [types.NEWS_NOTICE_DATA](state, { newData }) {
        state.newsNoticeData = newData;
    },
    [types.RESET_SCREEN](state) {
        state.isFullScreen = false;
    },
    [types.BACKLOGS_TAG_DATA](state, { newData }) {
        state.backlogsTagsData = newData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};