/*********************************************************************
 * 获取本地的echarts数据                                             *
 * Created by ytt on 2017/07/26                                      *
 * Modified by tr on 2017/08/21                                      *
 *********************************************************************/
import sync from '../syncData'
import * as types from '../mutation-types'

/**
 * @type {{mapPowerData: string}}
 */
const state = {
    /*获取地图的数据*/
    mapPowerData:''
};
/**
 * @type {{mapPowerData: ((p1:*)=>string)}}
 */
const getters = {
    mapPowerData:state => state.mapPowerData,
};
/**
 * @type {{getMapPowerDataFun: (({commit}:{commit: *}))}}
 */
const actions = {
    /**
     * 获取地图的数据
     * @param commit
     */
    getMapPowerDataFun({commit}){
        sync.getMapPowerData(data =>{
            commit(types.MAP_POWER_DATA,{data})
        })
    }
};
/**
 * @type {{[[types.MAP_POWER_DATA]]: ((state, {data}:{data: *}))}}
 */
const mutations = {
    [types.MAP_POWER_DATA](state, {data}){
        state.mapPowerData = data
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}