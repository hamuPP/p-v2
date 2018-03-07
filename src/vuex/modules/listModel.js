/*********************************************************************
 * 新用户的列表                                                      *
 * Created by tr on 2017/7/7.                                        *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{listData: Array}}
 */
const state = {
    listData: []
};
/**
 * @type {{listData: ((p1:*)=>Array)}}
 */
const getters = {
    listData: state => state.listData
};
/**
 * @type {{getListData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), getElementsData: (({dispatch,commit}:{dispatch?: *, commit: *}, {reqData}:{reqData?: *}))}}
 */
const actions = {
    /**
     * 获取新用户的操作
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getElementsData({dispatch, commit}, {reqData}){
        sync.getElements(reqData, data => {
            let list = data;
            let newData = [];
            if(list) {
                list.map(da => {
                    let reqD = JSON.stringify({
                        accessUrl: da.accessUrl
                    });
                    sync.geData(reqD, d => {
                        dispatch('loadingHide');
                        newData.push({
                            name: da.resName,
                            data: d
                        });
                    });
                });
            }
            commit(types.LIST_DATA, {newData});
        });
    }
};
/**
 * @type {{[[types.LIST_DATA]]: ((state, {newData}:{newData: *}))}}
 */
const mutations = {
    [types.LIST_DATA](state, {newData}){
        state.listData = newData;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
}