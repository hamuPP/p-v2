/*********************************************************************
 * 编辑组件                                                          *
 * Created by ytt on 2017/07/26                                      *
 * Modified by tr on 2017/08/21                                      *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{appsResourcesData: Array, setAddComponentData: number}}
 */
const state = {
    /*获取所有业务对应下的功能*/
    appsResourcesData:[],
    /*新增后返回的数据*/
    setAddComponentData:0
};
/**
 * @type {{appsResourcesData: ((p1:*)=>Array), setAddComponentData: ((p1:*)=>number)}}
 */
const getters = {
    appsResourcesData:state => state.appsResourcesData,
    setAddComponentData:state => state.setAddComponentData
};
/**
 * @type {{appsResources: (({commit}:{commit: *})), setAddComponentFun: (({dispatch,commit}:{dispatch: *, commit: *}, {reqAddData}:{reqAddData?: *}))}}
 */
const actions = {
    /**
     * 获取所有业务对应下的功能
     * @param commit
     */
    appsResources({commit}){
        sync.getAppsResources(data =>{
            commit(types.MU_APPS_RESOURCES,{data});
        })
    },
    /**
     * 新增组件的信息
     * @param commit
     * @param reqAddData
     */
    setAddComponentFun({commit},{reqAddData}){
        sync.setAddComponent(reqAddData,data =>{
            let setData = data.meta.code == 1 ? data.meta.code * 1 + state.setAddComponentData : 0;
            commit(types.ADD_COMPONENT_DATA,{setData});
        })
    }
};
/**
 * @type {{[[types.MU_APPS_RESOURCES]]: ((state, {data}:{data: *})), [[types.ADD_COMPONENT_DATA]]: ((state, {setData}:{setData: *}))}}
 */
const mutations = {
    [types.MU_APPS_RESOURCES](state, {data}){
        state.appsResourcesData = data
    },
    [types.ADD_COMPONENT_DATA](state, {setData}){
        state.setAddComponentData = setData
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}