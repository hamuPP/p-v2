import Vue from 'vue'
/* vuex 数据状态管理器 */
import Vuex from 'vuex'

import loading from './common/loading'
import homePage from  './basic/businessPortal'
import weather from './modules/weather'
import functionalMap from './func/functionalMap'
import login from './basic/login'
import agency from './modules/agency'
import news from './modules/news'
import rightModel from './modules/rightModel'
import calendar from './calendar/calendar'
import listModel from './modules/listModel'
import prompt from './common/prompt'
import editComponent from './assembly/editComponent'
import editMask from './assembly/editMask'
import passwordTpl from './basic/passwordTpl'
import mapPower from './assembly/mapPower'
import userOp from './basic/userOperation'
import notice from './notice/notice'
/* addressbook */
import addressBook from './addressBook/addressBook'
import addressBookFullPage from './addressBook/addressBookFullPage'
import calendarV2 from './calendarV2/calendar'
import mockLogin from './mockLogin/mockLogin'

Vue.use(Vuex);
/* 实例化Vuex状态管理器对象 */
export default new Vuex.Store({
    modules: {
        loading,
        homePage,
        weather,
        functionalMap,
        login,
        agency,
        news,
        rightModel,
        calendar,
        listModel,
        prompt,
        editComponent,
        editMask,
        passwordTpl,
        mapPower,
        userOp,
        addressBook,
        calendarV2,
        addressBookFullPage,
        notice,
        mockLogin
    },
    strict: false
});