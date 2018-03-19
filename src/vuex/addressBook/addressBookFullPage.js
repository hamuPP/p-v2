/*********************************************************************
 * 通讯录 全屏页面的业务                                        *
 * Created by tangyue on 2018/01/12.                                       *
 *********************************************************************/

import * as common from '../CommonConst'
import * as expAxios from "../common/expAxios"


const state = {
    /* 通讯录的数据列表的数据*/
    addressBookDataFullPage: [],
    paginationData: {},
    enterpriseOrgsTreeData:[]
};


const getters = {
    addressBookDataFullPage: state => state.addressBookDataFullPage,
    paginationData: state => state.paginationData,
    enterpriseOrgsTreeData: state => state.enterpriseOrgsTreeData
};

const actions = {
    getAddressBookDataListInFullPage({ commit }, { reqData }) {
        debugger;
        expAxios.sendRequest({
            url: common.getUrl({ url: common.ADDRESS_BOOK }),
            data: reqData,
            success: data => {
                let newList = [];
                let paginationData = 0;

                if (data && data.meta && data.meta.code * 1 === 1) {
                    newList = (data.data && data.data.rows && data.data.rows.length) ? data.data.rows : [];
                    // paginationData = (data.data && data.data.page && data.data.page.totalRows) ? (data.data.page.totalRows)*1 : 0;
                    paginationData = (data.data && data.data.page && data.data.page.totalRows) ? {total:(data.data.page.totalRows)*1} : {};
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.ADDRESS_BOOK_DATA_FULLPAGE, { newData: newList });
                commit(common.ADDRESS_BOOK_PAGINATION_DATA_FULLPAGE, { newData: paginationData });
            }
        });
    },

    /**
     * get enterprise orgs tree data,which will be displaied in left tree
     * @param commit
     * @param reqData
     */
    getEnterpriseOrgsTreeDataInFullPage({commit}, {reqData}){
        expAxios.sendRequest({
            url: common.getUrl({ url: common.ENTERPRISE_ORGS_TREE }),
            // url: 'http://192.168.0.105:10303/portal/treeMe',//我的接口测试
            data: reqData,
            success: data => {
                let newList = [];

                if (data && data.meta && data.meta.code * 1 === 1) {
                    newList = (data.data && data.data.length) ? data.data : [];
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.ENTERPRISE_ORGS_TREE_DATA_FULLPAGE, { newData: newList });
            }
        });
    }
};


const mutations = {
    [common.ADDRESS_BOOK_DATA_FULLPAGE](state, { newData }) {
        state.addressBookDataFullPage = newData;
    },
    [common.ADDRESS_BOOK_PAGINATION_DATA_FULLPAGE](state, { newData }) {
        state.paginationData = newData;
    },
    [common.ENTERPRISE_ORGS_TREE_DATA_FULLPAGE](state, { newData }) {
        state.enterpriseOrgsTreeData = newData;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
}