/*********************************************************************
 * 编辑eCharts数据                                                   *
 * Created by ytt on 2017/07/28                                      *
 * Modified by tr on 2017/08/21                                      *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{getIdComponentData: number, getIdEditData: number, getIdListData: string}}
 */
const state = {
    /*删除组件的数据  */
    getIdComponentData: 0,
    /*更新组件的数据*/
    getIdEditData: 0,
    /*查询单个组件的数据*/
    getIdListData: ''
};
/**
 * @type {{getIdComponentData: ((p1:*)=>number), getIdEditData: ((p1:*)=>number), getIdListData: ((p1:*)=>string)}}
 */
const getters = {
    getIdComponentData: state => state.getIdComponentData,
    getIdEditData: state => state.getIdEditData,
    getIdListData: state => state.getIdListData
};
/**
 * @type {{getIdComponentFun: (({commit}:{commit: *}, {reqData}:{reqData?: *}))}}
 */
const actions = {
    /**
     * 获取组件里面的数据
     * @param commit
     * @param reqData
     */
    getIdComponentFun({commit}, {reqData}){
        sync.getIdComponent(reqData, data => {
            /*更新组件的数据*/
            if (reqData.type === "put") {
                let getIdEditData = data.meta.code * 1 === 1 ? data.meta.code * 1 + state.getIdEditData : 0;
                commit(types.GET_ID_EDIT_DATA, {getIdEditData});
            } else if (reqData.type === "delete") {  /*删除组件里面的数据*/
                let resData = data.meta.code * 1 === 1 ? data.meta.code * 1 + state.getIdComponentData : 0;
                commit(types.GET_ID_COMPONENT, {resData});
            } else { /*获取组件里面的数据*/
                let resData = data.data;
                commit(types.GET_ID_LIST_DATA, {resData});
            }

        })
    },
};
/**
 * @type {{[[types.GET_ID_COMPONENT]]: ((state, {resData}:{resData: *})), [[types.GET_ID_EDIT_DATA]]: ((state, {getIdEditData}:{getIdEditData: *})), [[types.GET_ID_LIST_DATA]]: ((state, {resData}:{resData: *}))}}
 */
const mutations = {
    [types.GET_ID_COMPONENT](state, {resData}){
        state.getIdComponentData = resData;
    },
    [types.GET_ID_EDIT_DATA](state, {getIdEditData}){
        state.getIdEditData = getIdEditData;
    },
    [types.GET_ID_LIST_DATA](state, {resData}){
        state.getIdListData = resData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};