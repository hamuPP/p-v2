/*********************************************************************
 * Created by tr on 2018/1/10.                                       *
 *********************************************************************/
import * as common from '../CommonConst'
import * as expAxios from "../common/expAxios"
import commonMethods from '../modules/commonMethods'

const state = {
    /*根据条件查询数据*/
    noticeFindData: [],
    /*根据id来获取信息*/
    noticeIdFindData: {},
    /*获取快速查询公告*/
    noticeQuickData: [],
    /*获取公告下一条数据*/
    noticeNextData: {},
    /*根据条件查询列表数据*/
    noticeFindListData: [],
    /*发布或撤销发布的数据*/
    noticeRelease: 0,
    noticeDelete: 0,
    /*企业组织树数据*/
    noticeTree: [],
    saveNoticeData: 0,
    deleteFileData: {}
};

const getters = {
    noticeFindData: state => state.noticeFindData,
    noticeIdFindData: state => state.noticeIdFindData,
    noticeQuickData: state => state.noticeQuickData,
    noticeNextData: state => state.noticeNextData,
    noticeFindListData: state => state.noticeFindListData,
    noticeRelease: state => state.noticeRelease,
    noticeDelete: state => state.noticeDelete,
    noticeTree: state => state.noticeTree,
    saveNoticeData: state => state.saveNoticeData,
    deleteFileData: state => state.deleteFileData,
};
const actions = {
    /**
     * 根据条件查询数据
     * @param commit
     * @param reqData
     */
    findNoticeData({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_FIND_FLAG, params: String(reqData.flag) }),
            data: reqData.data,
            success: data => {
                let newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_FIND_FLAG_DATA, { resData: newData });
            }
        });
    },
    /**
     * 根据id查询数据
     * @param commit
     * @param reqData
     */
    findIdNoticeData({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_ID_FIND, params: String(reqData) }),
            success: data => {
                let newData = {};
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_ID_FIND_DATA, { resData: newData });
            }
        });
    },
    /**
     * 查询快速公告列表
     * @param commit
     * @param reqData
     */
    quickNoticeData({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_QUICK_LIST, params: String(reqData.resCode) }),
            data: reqData.extId,
            success: data => {
                let newData = {};
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_QUICK_LIST_DATA, { resData: newData });
            }
        });
    },
    /**
     * 获取公告下一条数据
     * @param commit
     * @param reqData
     */
    getNextNoticeData({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_NEXT, params: String(reqData) }),
            success: data => {
                let newData = {};
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_NEXT_DATA, { resData: newData });
            }
        });
    },
    /**
     * 根据查询类型或时间获取数据
     * @param commit
     * @param reqData
     */
    getFindListNotice({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_FIND }),
            //url:'http://192.168.13.113:10303/myNotice',
            data: reqData,
            success: data => {
                let newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_FIND_DATA, { resData: newData });
            }
        });
    },
    /**
     * 根据查询类型或时间获取数据
     * @param commit
     * @param reqData
     */
    getKeywordListNotice({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_FIND_KEYWORD }),
            data: reqData,
            success: data => {
                let newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
               }
                commit(common.NOTICE_FIND_DATA, { resData: newData });
            }
        });
    },
    /**
     * 获取发布和撤销的返回数据
     * @param commit
     * @param reqData
     */
    getNoticeRelease({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_RELEASE, params: reqData }),
            method: 'put',
            success: data => {
                let newData = '';
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                   newData = state.noticeRelease + parseInt(data.meta.code);
                } 
                commit(common.NOTICE_RELEASE_DATA, { resData: newData });
            }
        });
    },
    getNoticeDelete({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_DELETE }) + '?ids=' + reqData,
            method: 'delete',
            success: data => {
                let newData = '';
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = state.noticeDelete + parseInt(data.meta.code);
                }
                commit(common.NOTICE_DELETE_DATA, { resData: newData });
            }
        });
    },
    getNoticeTree({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_TREE, params: reqData }),
            success: data => {
                let newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_TREE_DATA, { resData: newData });
            }
        });
    },
    saveNotice({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_SAVE }),
            data: reqData,
            method: 'post',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: data => {
                let newData = 0;
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = state.saveNoticeData + parseInt(data.meta.code);
                    new commonMethods().showToastMsg({ text: data.messages, priority: 'success' });
                } else {
                    new commonMethods().showToastMsg({ text: data.messages, priority: 'error' });
                }
                commit(common.NOTICE_SAVE_DATA, { resData: newData });
            }
        });
    },

    deleteFileInNoticeEditPage({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.DELETE_UPLOADED_FILE, params: reqData }),
            // url:'http://192.168.1.163:20250/annex/'+reqData+'?access_token=5f678bd4-1421-41a3-92df-a379fa6e6082',
            method: 'delete',
            // contentType:'application/x-www-form-urlencoded;charset=utf-8',
            success: data => {
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    let _data = Object.assign(data, {
                        uuid: reqData
                    });
                    commit(common.DELETE_FILE_DATA, { resData: _data });
                }


            }
        });
    }
};
const mutations = {
    [common.NOTICE_FIND_FLAG_DATA](state, { resData }) {
        state.noticeFindData = resData;
    },
    [common.NOTICE_ID_FIND_DATA](state, { resData }) {
        state.noticeIdFindData = resData;
    },
    [common.NOTICE_QUICK_LIST_DATA](state, { resData }) {
        state.noticeQuickData = resData;
    },
    [common.NOTICE_NEXT_DATA](state, { resData }) {
        state.noticeNextData = resData;
    },
    [common.NOTICE_FIND_DATA](state, { resData }) {
        state.noticeFindListData = resData;
    },
    [common.NOTICE_RELEASE_DATA](state, { resData }) {
        state.noticeRelease = resData;
    },
    [common.NOTICE_DELETE_DATA](state, { resData }) {
        state.noticeDelete = resData;
    },
    [common.NOTICE_TREE_DATA](state, { resData }) {
        state.noticeTree = resData;
    },
    [common.NOTICE_SAVE_DATA](state, { resData }) {
        state.saveNoticeData = resData;
    },
    [common.DELETE_FILE_DATA](state, { resData }) {
        state.deleteFileData = resData;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};