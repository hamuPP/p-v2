/**
 * Created by ty on 18/1/23.
 */

import * as common from '../CommonConst'
import * as expAxios from "../modules/expAxios"
import * as con from '../constant'

const state = {
    mockLoginSyss: [],
    allSystemData: [],
    mockloginAppsActiveResult: {},
    mockloginAppActiveResult: {},
    mockloginAppUpdateResultInEditPage: {},
    mockLoginActivedAppsInFullpage: {}
};

const getters = {
    mockLoginSyss: state => state.mockLoginSyss,
    allSystemData: state => state.allSystemData,
    mockloginAppsActiveResult: state => state.mockloginAppsActiveResult,
    mockloginAppActiveResult: state => state.mockloginAppActiveResult,
    mockloginAppUpdateResultInEditPage: state => state.mockloginAppUpdateResultInEditPage,
    mockLoginActivedAppsInFullpage: state => state.mockLoginActivedAppsInFullpage
};

const actions = {
    getLoginSys({ commit }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.MOCKLOGIN_SYSTEMS }),
            success: data => {
                let newList = [];

                if (data && data.meta && data.meta.code * 1 === 1 && data.data && data.data.length) {
                    let icons = con.ICON_ARRAY; //随机的字体图标

                    newList = data.data.map(it => {
                        let randomNumber = Math.ceil(Math.random() * 17);
                        it.icon = icons[randomNumber];
                        return it;
                    });

                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.MOCK_LOGIN, { newData: newList });
            }
        });
    },

    getActivedAppsInAllAppsFullPage({ commit }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.MOCKLOGIN_SYSTEMS }),
            success: data => {
                let newList = [];

                if (data && data.meta && data.meta.code * 1 === 1 && data.data && data.data.length) {
                    let icons = con.ICON_ARRAY; //随机的字体图标

                    newList = data.data.map(it => {
                        let randomNumber = Math.ceil(Math.random() * 17);
                        it.icon = icons[randomNumber];
                        return it;
                    });

                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.MOCK_LOGIN_ACTIVED_APPS_IN_FULLPAGE, { newData: newList });
            }
        });
    },

    getAllSystems({ commit }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.MOCKLOGIN_ALL_SYSTEMS }),
            success: data => {
                let newList = [];

                if (data && data.meta && data.meta.code * 1 === 1 && data.data && data.data.length) {
                    let icons = con.ICON_ARRAY; //随机的字体图标

                    newList = data.data.map(it => {
                        let randomNumber = Math.ceil(Math.random() * 17);
                        it.icon = icons[randomNumber];
                        return it;
                    });

                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.MOCK_LOGIN_ALL_DATA, { newData: newList });
            }
        });
    },

    activeApp({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.ACTIVE_APP }),
            method: 'put',
            data: reqData,
            success: data => {
                commit(common.MOCK_LOGIN_ACTIVE_APP, { newData: data });
            }
        });
    },

    activeApps({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.ACTIVE_APPS }),
            method: 'put',
            data: reqData,
            success: data => {

                commit(common.MOCK_LOGIN_ACTIVE_APPS, { newData: data });
            }
        });
    },

    updateAppAccountPasswordInEditPage({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.ACTIVE_APP }),
            method: 'put',
            data: reqData,
            success: data => {
                commit(common.MOCK_LOGIN_ACTIVE_APP_IN_EDITPAGE, { newData: data });
            }
        });
    },

    ajaxLogin({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: reqData.requestUrl,
            method: reqData.requestType,
            data: {
                [reqData.loginParameters]: reqData.login,
                [reqData.passwordParameters]: reqData.password,
            },
            success: data => {
                //todo commit必要時？
                // commit(common.MOCK_LOGIN_ACTIVE_APPS, { newData: result });
            }
        });
    }
};

const mutations = {
    [common.MOCK_LOGIN](state, { newData }) {
        state.mockLoginSyss = newData;
    },
    [common.MOCK_LOGIN_ACTIVED_APPS_IN_FULLPAGE](state, { newData }) {
        state.mockLoginActivedAppsInFullpage = newData;
    },
    [common.MOCK_LOGIN_ALL_DATA](state, { newData }) {
        state.allSystemData = newData;
    },
    [common.MOCK_LOGIN_ACTIVE_APPS](state, { newData }) {
        state.mockloginAppsActiveResult = newData;
    },
    [common.MOCK_LOGIN_ACTIVE_APP](state, { newData }) {
        state.mockloginAppActiveResult = newData;
    },
    [common.MOCK_LOGIN_ACTIVE_APP_IN_EDITPAGE](state, { newData }) {
        state.mockloginAppUpdateResultInEditPage = newData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}