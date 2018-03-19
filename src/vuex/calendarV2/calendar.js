/*********************************************************************
 * Created by tr on 2018/1/2.                                       *
 *********************************************************************/
import * as common from '../CommonConst'
import * as expAxios from "../common/expAxios"
import commonMethods from '../modules/commonMethods'

const state = {
    /*日程列表数据*/
    taskList: [],
    /*新增日程列表数据*/
    addTaskDate: {},
    /*修改日程表数据*/
    updateTaskDate: {},
    /*删除日程表数据*/
    deleteTaskDate: "",
    /*全部日程的数据*/
    allTaskDate: []

};
const getters = {
    taskList: state => state.taskList,
    addTaskDate: state => state.addTaskDate,
    updateTaskDate: state => state.updateTaskDate,
    deleteTaskDate: state => state.deleteTaskDate,
    allTaskDate: state => state.allTaskDate,
};
const actions = {
    /**
     * 获取日程列表数据
     * @param commit
     * @param reqData
     */
    getTaskList({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.FIND_BY, params: reqData }),
            success: data => {
                let newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.FIND_BY_DATE, { resData: newData });
            }
        });
    },
    /**
     * 新增日程列表数据
     * @param commit
     * @param reqData
     */
    addTaskDate({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.SCHEDULE_ADD }),
            method: 'post',
            data: reqData,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: data => {
                let newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = state.addTaskDate + parseInt(data.meta.code);
                } else {
                    new commonMethods().showToastMsg({ text: data.messages, priority: 'error' });
                }
                commit(common.SCHEDULE_ADD_DATE, { resData: newData });
            }
        });
    },
    /**
     * 修改日程列表数据
     * @param commit
     * @param reqData
     */
    updateTaskDate({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.SCHEDULE_ADD }),
            method: 'put',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: reqData,
            success: data => {
                let newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                } else {
                    new commonMethods().showToastMsg({ text: data.messages, priority: 'error' });
                }
                commit(common.SCHEDULE_UPDATE_DATE, { resData: newData });
            }
        });
    },
    /**
     * 删除日程列表数据
     * @param commit
     * @param reqData
     */
    deleteTaskData({ commit }, { reqData }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.SCHEDULE_DELETE, params: String(reqData) }),
            method: 'delete',
            success: data => {
                let newData = "";
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = state.deleteTaskDate + parseInt(data.meta.code);
                    new commonMethods().showToastMsg({ text: data.messages, priority: 'success' });
                } else {
                    new commonMethods().showToastMsg({ text: data.messages, priority: 'error' });
                }
                commit(common.SCHEDULE_DELETE_DATE, { resData: newData });
            }
        });
    },
    /**
     * 获取所有日程下得所有日期
     * @param commit9
     * @param reqData
     */
    getAllTaskData({ commit }) {
        expAxios.sendRequest({
            url: common.getUrl({ url: common.SCHEDULE_ADD }),
            success: data => {
                let newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.SCHEDULE_ALL_DATE, { resData: newData });
            }
        });
    },
};
const mutations = {
    [common.FIND_BY_DATE](state, { resData }) {
        state.taskList = resData;
    },
    [common.SCHEDULE_ADD_DATE](state, { resData }) {
        state.addTaskDate = resData;
    },
    [common.SCHEDULE_UPDATE_DATE](state, { resData }) {
        state.updateTaskDate = resData;
    },
    [common.SCHEDULE_DELETE_DATE](state, { resData }) {
        state.deleteTaskDate = resData;
    },
    [common.SCHEDULE_ALL_DATE](state, { resData }) {
        state.allTaskDate = resData;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};