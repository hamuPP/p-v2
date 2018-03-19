/*********************************************************************
 * 通讯录的业务                                        *
 * Created by tangyue on 2018/01/02.                                       *
 *********************************************************************/
// import * as types from '../mutation-types'
// import sync from '../syncData'

import * as common from '../CommonConst'
import * as expAxios from "../common/expAxios"
import commonMethods from '../modules/commonMethods'


const state = {
    /* 通讯录的数据列表的数据*/
    addressBookData: [],
};


const getters = {
    addressBookData: state => state.addressBookData
};

const actions = {
    getAddressBookDataList({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.ADDRESS_BOOK }),
            data: reqData,
            success: data => {
                let newList = [];

                if (data && data.meta && data.meta.code * 1 === 1) {
                    newList = (data.data && data.data.rows && data.data.rows.length) ? data.data.rows : [];
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.ADDRESS_BOOK_DATA, { newData: newList });
            }
        });

        // sync.getAddressBookData(reqData, data => {
        //     const newData = data;
        //     commit(types.ADDRESS_BOOK_DATA, {newData});
        // });
    }
};


const mutations = {
    [common.ADDRESS_BOOK_DATA](state, { newData }) {
        state.addressBookData = newData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}