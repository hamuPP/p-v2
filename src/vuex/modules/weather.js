/*********************************************************************
 * 获取天气的数据                                                    *
 * Created by tr on 2017/6/27.                                       *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{weatherData: null}}
 */
const state = {
    /*获取天气的数据*/
    weatherData: {}
};
/**
 * @type {{weatherData: ((p1:*)=>null)}}
 */
const getters = {
    weatherData: state => state.weatherData
};
/**
 * @type {{getWeatherData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *}))}}
 */
const actions = {
    /**
     * 获取天气的数据
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getWeatherData({dispatch, commit}, {reqData}){
        sync.getWeather(reqData, data => {
            const newData = data;
            dispatch('loadingHide');
            commit(types.WEATHER_DATA, {newData});
        });

    }
};
/**
 * @type {{[[types.WEATHER_DATA]]: ((state, {newData}:{newData: *}))}}
 */
const mutations = {
    [types.WEATHER_DATA](state, {newData}){
        state.weatherData = newData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}