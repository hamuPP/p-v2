/*********************************************************************
 * 所有功能地图里面的数据处理                                        *
 * Created by tr on 2017/6/28.                                       *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'
import com from '../common/common'

/**
 * @type {{functionMapData: Array, mapVisible: boolean, mapSearchVisible: boolean, mapTitle: string, mapListData: Array, mapTreeData: Array, mapTreeListData: Array, popupVisible: boolean}}
 */
const state = {
    /*地图的数据*/
    functionMapData: [],
    /*隐藏或显示功能页面*/
    mapVisible: true,
    /*判断页面里面是否显示搜索框*/
    mapSearchVisible: false,
    /*功能里面的名称*/
    mapTitle: '',
    /*获取地图的列表数据*/
    mapListData: [],
    /*地图里面树形图的数据*/
    mapTreeData: [],
    /*根据条件来获取对应的数据*/
    mapTreeListData: [],
    /*是否需要显示新增文件框*/
    popupVisible: false
};
/**
 * @type {{functionMapData: ((p1:*)=>Array), mapVisible: ((p1:*)=>boolean), mapSearchVisible: ((p1:*)=>boolean), mapTitle: ((p1:*)=>string), mapListData: ((p1:*)=>Array), mapTreeData: ((p1:*)=>Array), mapTreeListData: ((p1:*)=>Array)}}
 */
const getters = {
    functionMapData: state => state.functionMapData,
    mapVisible: state => state.mapVisible,
    mapSearchVisible: state => state.mapSearchVisible,
    mapTitle: state => state.mapTitle,
    mapListData: state => state.mapListData,
    mapTreeData: state => state.mapTreeData,
    mapTreeListData: state => state.mapTreeListData,
    popupVisible: state => state.popupVisible
};
/**
 * @type {{getFuncData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData: *})), manageDataFunc: (({commit}:{commit: *}, {newData}:{newData: *})), getFunctionMapData: (({dispatch, commit}:{dispatch?: *, commit: *}, {reqData}:{reqData?: *})), getTreeData: (({commit}:{commit: *}, {reqData}:{reqData?: *})), setTreeObj: (({dispatch,commit}:{dispatch: *, commit: *}, {resObj}:{resObj?: *})), getTreeListData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), treeManage: (({commit}:{commit: *}, {reqData}:{reqData?: *})), mapListDataManage: (({commit}:{commit: *}, {reqData}:{reqData: *})), mapShow: (({commit}:{commit: *})), mapHide: (({commit}:{commit: *})), mapSearchShow: (({commit}:{commit: *})), mapSearchHide: (({commit}:{commit: *})), mapTitleName: (({commit}:{commit: *})), customTitleName: (({commit}:{commit: *})), isGoToURL: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), showPopup: (({commit}:{commit: *})), hidePopup: (({commit}:{commit: *}))}}
 */
const actions = {
    /**
     * 获取定制页面里面的所有应用
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getFuncData({ dispatch, commit }, { reqData }) {
        sync.getFunctionMap(reqData.data, data => {
            dispatch('loadingHide');
            let newData = data;
            commit(types.FUNCTION_MAP_DATA, { newData });
            newData = {
                func: newData,
                data: ''
            };
            dispatch('manageDataFunc', { newData });
        });
    },
    /**
     * 处理业务入口的数据
     * @param commit
     * @param newData
     */
    manageDataFunc({ dispatch, commit }, { newData }) {
        dispatch('loadingHide');
        /*业务入口的数据结构*/
        let listData = [],
            nDate = [];
        if (newData.data) {
            let nData = newData;
            dispatch('updateFuncData', { nData });
            nDate = state.functionMapData;
        } else {
            nDate = newData.func;
        }
        if (nDate) {
            nDate.map(da => {
                let children = da.children ? da.children : [];
                if (children.length) {
                    children.map(item => {
                        /*判断是否是定制后的数据*/
                        if (item.activeStatus === 0 && !item.parentId) {
                            let newList = {
                                customizationId: item.customizationId,
                                userId: item.userId,
                                index: item.index,
                                activeStatus: item.activeStatus,
                                resourceType: item.resourceType,
                                packageName: item.packageName,
                                children: []
                            };

                            if (item.resourceType === 2) {
                                newList.children.push(item);
                                children.map(child => {
                                    if (child.parentId === item.customizationId) {
                                        newList.children.push(child);
                                    }
                                });
                            } else {
                                newList = item;
                            }
                            listData.push(newList);
                        }
                    });
                }
            });
        }
        commit(types.MAP_LIST_DATA, { listData });
    },
    /**
     * 移除功能包主数据，重新选择并重置主数据
     * @param commit
     * @param nData
     */
    updateFuncData({ dispatch, commit }, { nData }) {
        dispatch('loadingHide');
        let num = 0;
        let newData = [],
            cusId = "";
        if (nData.data) {
            nData.func.map(item => {
                let nItem = item.children;
                let nDa = [];
                if (nItem.length) {
                    nItem.map(data => {
                        if (data.parentId === nData.data.customizationId) {
                            /*判断功能包里面是否有1个以上的功能包*/
                            if (++num === 1) {
                                data.packageName = nData.data.packageName;
                                data.parentId = '';
                                cusId = data.customizationId;
                            } else {
                                data.parentId = cusId;
                            }
                        }
                        nDa.push(data);
                    });
                }
                newData.push({
                    appName: item.appName,
                    children: nDa
                });

            });
            commit(types.FUNCTION_MAP_DATA, { newData });
        }
    },
    /**
     * 获取所有的应用
     * 1.0.4 的版本后台的数据改变，结构也改变，这现在没有用了 ------ 注释人：tr
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getFunctionMapData({ dispatch, commit }, { reqData }) {
        sync.getAppsFunctionMap(reqData.data, data => {
            dispatch('loadingHide');
            const list = data;
            const dataValue = reqData.url;
            let newData = [];

            let listData = state.mapListData ? state.mapListData : [];
            if (dataValue === 'FUNC') {
                listData = [];
            }
            let index = -1;
            if (list) {
                list.map(item => { //循环获取制定或功能地图的数据
                    index++;
                    if (index > 17) index = 0;

                    let data = reqData.data;
                    data.clientId = item.oauthClientId;

                    sync.getFunctionMap({ data: data, url: reqData.url, sum: index }, data => { //获取对应的功能地图或定制的数据
                        dispatch('loadingHide');
                        if (dataValue === 'FUNC') {
                            let dataValue = '';
                            if (data) {
                                data.map(d => {
                                    if (d.activeStatus === 0) {
                                        dataValue = d;
                                        dataValue.clientId = item.oauthClientId;
                                        dataValue.accessToken = '';
                                        dataValue.url = item.accessUrl;

                                        listData.push(dataValue);
                                    }
                                });
                            }
                        }
                        newData.push({
                            name: item.appName,
                            appCode: item.appCode,
                            accessToken: "",
                            url: item.accessUrl,
                            clientId: item.oauthClientId,
                            data: data
                        });
                    });

                });
                commit(types.MAP_LIST_DATA, { listData });
                commit(types.FUNCTION_MAP_DATA, { newData });
            }
        });
    },
    /**
     * 获取树形图的数据
     * @param commit
     * @param reqData
     */
    getTreeData({ dispatch, commit }, { reqData }) {
        sync.getTree(reqData, data => {
            dispatch('loadingHide');
            const newData = data;
            commit(types.MAP_TREE_DATA, { newData });
        });
    },
    /**
     * 根据选择的对象来改变树形图里面的数据
     * @param commit
     * @param resObj
     */
    setTreeObj({ dispatch, commit }, { resObj }) {
        dispatch('loadingHide');
        if (resObj) {
            let newData = new com().recursion(state.mapTreeData, resObj);
            commit(types.MAP_TREE_DATA, { newData });
        }
    },
    /**
     * 根据条件获取对应的列表数据
     * @param commit
     * @param reqData
     */
    getTreeListData({ dispatch, commit }, { reqData }) {
        dispatch('loadingHide');
        sync.getChildList(reqData, data => {
            let newD = data,
                newData = data,
                newMap = state.mapListData;
            if (newMap.length > 0 && newMap.length > 0) {
                newMap.map(data => {
                    newD.map(da => {
                        if (da.resCode === data.resCode && da.appCode === data.appCode) {
                            da.activeStatus = data.activeStatus;
                        }
                    });
                });
            }
            commit(types.MAP_TREE_LIST_DATA, { newData });
        });
    },
    /**
     * 根据定制或取消的来修改地图里面的数据
     * @param commit
     * @param reqData
     */
    treeManage({ dispatch, commit }, { reqData }) {
        dispatch('loadingHide');
        let funcData = state.functionMapData,
            newData = [];
        funcData.map(data => {
            let newDa = data.children;
            let newD = data;
            newD.children = [];
            if (newDa && newDa.length > 0) {
                newDa.map(da => {
                    if (da.resCode === reqData.resCode && da.appCode === reqData.appCode) {
                        da.activeStatus = reqData.activeStatus;
                    }

                    newD.children.push(da);
                });
            }
            newData.push(newD);
        });
        //commit(types.MAP_LIST_DATA, {listData});

        commit(types.FUNCTION_MAP_DATA, { newData });
        newData.func = newData;
        dispatch('manageDataFunc', { newData });
    },
    /**
     * 根据地图里面选中和取消来修改列表事件里面的值
     * @param commit
     * @param reqData
     */
    mapListDataManage({ dispatch, commit }, { reqData }) {
        dispatch('loadingHide');
        let newData = state.mapTreeListData;
        newData.map(data => {
            if (data.resCode === reqData.resCode && data.appCode === reqData.appCode) {
                data.activeStatus = reqData.activeStatus;
            }
        });

        commit(types.MAP_TREE_LIST_DATA, { newData });

    },
    /**
     * 显示地图
     * @param commit
     */
    mapShow({ commit }) {
        commit(types.MAP_SHOW);
    },
    /**
     * 隐藏地图
     * @param commit
     */
    mapHide({ commit }) {
        commit(types.MAP_HIDE);
    },
    /**
     * 页面里搜索框的显示
     * @param commit
     */
    mapSearchShow({ commit }) {
        commit(types.MAP_SEARCH_SHOW);
    },
    /**
     * 页面里搜索框的隐藏
     * @param commit
     */
    mapSearchHide({ commit }) {
        commit(types.MAP_SEARCH_HIDE);
    },
    /**
     * 功能地图里面title的值
     * @param commit
     */
    mapTitleName({ commit }) {
        commit(types.MAP_TITLE);
    },
    /**
     * 定制功能里面title的值
     * @param commit
     */
    customTitleName({ commit }) {
        commit(types.CUSTOM_TITLE_NAME);
    },
    /**
     * 判断跳转路径是否有用
     * @param dispatch
     * @param commit
     * @param reqData
     */
    isGoToURL({ dispatch, commit }, { reqData }) {
        if (reqData.url) {
            sync.isGoToURL(reqData, data => {
                const reqDate = data;
                if (reqDate) {
                    dispatch('promptShow', { reqDate })
                }
            });
        }

    },
    /**
     * 显示新增文件框
     * @param commit
     */
    showPopup({ commit }) {
        commit(types.SHOW_POPUP);
    },
    /**
     * 隐藏新增文件框
     * @param commit
     */
    hidePopup({ commit }) {
        commit(types.HIDE_POPUP);
    }
};
/**
 * @type {{[[types.MAP_TREE_LIST_DATA]]: ((state, {newData}:{newData: *})), [[types.MAP_LIST_DATA]]: ((state, {listData}:{listData: *})), [[types.MAP_TREE_DATA]]: ((state, {newData}:{newData: *})), [[types.FUNCTION_MAP_DATA]]: ((state, {newData}:{newData: *})), [[types.MAP_SHOW]]: ((state)), [[types.MAP_HIDE]]: ((state)), [[types.MAP_SEARCH_SHOW]]: ((state)), [[types.MAP_SEARCH_HIDE]]: ((state)), [[types.MAP_TITLE]]: ((state)), [[types.CUSTOM_TITLE_NAME]]: ((state)), [[types.SHOW_POPUP]]: ((state)), [[types.HIDE_POPUP]]: ((state))}}
 */
const mutations = {
    [types.MAP_TREE_LIST_DATA](state, { newData }) {
        state.mapTreeListData = newData;
    },
    [types.MAP_LIST_DATA](state, { listData }) {
        state.mapListData = listData;
    },
    [types.MAP_TREE_DATA](state, { newData }) {
        state.mapTreeData = newData;
    },
    [types.FUNCTION_MAP_DATA](state, { newData }) {
        state.functionMapData = newData;
    },
    [types.MAP_SHOW](state) {
        state.mapVisible = true;
    },
    [types.MAP_HIDE](state) {
        state.mapVisible = false;
    },
    [types.MAP_SEARCH_SHOW](state) {
        state.mapSearchVisible = true;
    },
    [types.MAP_SEARCH_HIDE](state) {
        state.mapSearchVisible = false;
    },
    [types.MAP_TITLE](state) {
        state.mapTitle = '功能地图';
    },
    [types.CUSTOM_TITLE_NAME](state) {
        state.mapTitle = '更多业务和工具';
    },
    [types.SHOW_POPUP](state) {
        state.popupVisible = true;
    },
    [types.HIDE_POPUP](state) {
        state.popupVisible = false;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}