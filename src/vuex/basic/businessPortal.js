/*********************************************************************
 * 基本信息模块获取数据                                              *
 * Created by tr on 2017/6/22.                                       *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{userData: Array, funcData: Array, custom: {}, clicksData: Array, showEditComponent: boolean, isAddOrEditComponent: boolean, packageData: {}}}
 */
const state = {
    /*获取用户信息*/
    userData: [],
    /*获取业务定制的信息*/
    funcData: [],
    /*保存定制的信息*/
    custom: {},
    /*获取常用业务的信息*/
    clicksData: [],
    /*是否弹出编辑组件弹框*/
    showEditComponent: false,
    /*判断是新增组件还是编辑组件*/
    isAddOrEditComponent: false,
    /*获取功能包返回的数据*/
    packageData: {}
};
/**
 * @type {{userData: ((p1:*)=>Array), funcData: ((p1:*)=>Array), custom: ((p1:*)=>{}), clicksData: ((p1:*)=>Array), showEditComponent: ((p1:*)=>boolean), isAddOrEditComponent: ((p1:*)=>boolean), packageData: ((p1:*)=>{})}}
 */
const getters = {
    userData: state => state.userData,
    funcData: state => state.funcData,
    custom: state => state.custom,
    clicksData: state => state.clicksData,
    showEditComponent: state => state.showEditComponent,
    isAddOrEditComponent: state => state.isAddOrEditComponent,
    packageData: state => state.packageData
};
/**
 * @type {{getUserData: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), getOrgInfo: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), getClicksData: (({commit}:{commit: *}, {reqData}:{reqData?: *})), getFuncData: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), addCustomEle: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), showEditComponentFun: (({commit}:{commit: *}, {flgData}:{flgData: *})), hideEditComponentFun: (({commit}:{commit: *})), addPackage: (({commit}:{commit: *}, {foundPackage}:{foundPackage?: *}))}}
 */
const actions = {
    /**
     * 获取用户信息
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getUserData({dispatch, commit}, {reqData}){
        sync.userNew(reqData, data => {
            const newData = data;
            dispatch('loadingHide');
            commit(types.USER_DATA, {newData});
        });
    },
    /**
     * 获取用的职位，并把数据整合在“USER_DATA”里面
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getOrgInfo({dispatch, commit}, {reqData}){
        sync.orgInfo(reqData, data => {
            let newData = state.userData;
            newData.company = data.company;
            newData.department = data.department;
            dispatch('loadingHide');
            commit(types.USER_DATA, {newData});
        });
    },
    /**
     * 获取常用数据
     * @param commit
     * @param reqData
     */
    getClicksData({commit}, {reqData}){
        sync.getClicks(reqData, data => {
            const newData = data;
            commit(types.CLICKS_DATA, {newData});
        });
    },
    /**
     * todo
     * 获取定制后的数据
     * 注释人：田蓉
     * 原因：这方法下载暂时没有用了
     * @param dispatch
     * @param commit
     * @param reqData
     */
   /* getFuncData({dispatch, commit}, {reqData}){
        sync.getFunc(reqData, data => {
            const newData = data;
            dispatch('loadingHide');
            commit(types.FUNC_DATA, {newData});
        });
    },*/
    /**
     * 保存定制的数据
     * @param dispatch
     * @param commit
     * @param reqData
     */
    addCustomEle({dispatch, commit}, {reqData}){
        sync.addCustom(reqData, data => {
            let newData = data;
            newData.index = newData.index ? newData.index : 0 + newData.code;
            let reqDate = data.message;
            dispatch('loadingHide');
            dispatch('promptShow', {reqDate});
            commit(types.CUSTOM_DATA, {newData});
        });
    },
    /**
     * 是否弹出 编辑组件弹框
     * @param commit
     * @param flgData
     */
    showEditComponentFun({commit}, {flgData}){
        if (flgData.data === "addComponent") {
            commit(types.ISADD_OR_EDIT_COMPONENT);
        } else if (flgData.data === "editComponent") {
            commit(types.NOADD_OR_EDIT_COMPONENT);
        }
        commit(types.SHOW_EDIT_COMPONENT);
    },
    /**
     * 隐藏编辑组件
     * @param commit
     */
    hideEditComponentFun({commit}){
        commit(types.HIDE_EDIT_COMPONENT);
    },
    /**
     * 新增组件
     * @param commit
     * @param foundPackage
     */
    addPackage({commit}, {foundPackage}){
        sync.foundPackage(foundPackage, data => {
            const newData = data;
            commit(types.FOUND_PACKAGE, {newData});
        });
    }
};
/**
 * @type {{[[types.USER_DATA]]: ((state, {newData}:{newData: *})), [[types.FUNC_DATA]]: ((state, {newData}:{newData: *})), [[types.CUSTOM_DATA]]: ((state, {newData}:{newData: *})), [[types.CLICKS_DATA]]: ((state, {newData}:{newData: *})), [[types.SHOW_EDIT_COMPONENT]]: ((state)), [[types.HIDE_EDIT_COMPONENT]]: ((state)), [[types.ISADD_OR_EDIT_COMPONENT]]: ((state)), [[types.NOADD_OR_EDIT_COMPONENT]]: ((state)), [[types.FOUND_PACKAGE]]: ((state, {newData}:{newData: *}))}}
 */
const mutations = {
    [types.USER_DATA](state, {newData}){
        state.userData = newData;
    },
    [types.FUNC_DATA](state, {newData}){
        state.funcData = newData;
    },
    [types.CUSTOM_DATA](state, {newData}){
        state.custom = newData;
    },
    [types.CLICKS_DATA](state, {newData}){
        state.clicksData = newData;
    },
    [types.SHOW_EDIT_COMPONENT] (state) {
        state.showEditComponent = true;
    },
    [types.HIDE_EDIT_COMPONENT] (state) {
        state.showEditComponent = false;
    },
    [types.ISADD_OR_EDIT_COMPONENT] (state) {
        state.isAddOrEditComponent = true;
    },
    [types.NOADD_OR_EDIT_COMPONENT] (state) {
        state.isAddOrEditComponent = false;
    },
    [types.FOUND_PACKAGE](state, {newData}){
        state.packageData = newData;
    }

};
export default {
    state,
    getters,
    actions,
    mutations
}