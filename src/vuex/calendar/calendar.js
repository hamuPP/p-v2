/*********************************************************************
 * 日历时间控件                                                      *
 * Created by tr on 2017/6/22.                                       *
 *********************************************************************/
import * as types from '../mutation-types'

/**
 * @type {{calendarData: Array, calendarNowDate: string, calendarPickDate: string, calendarShow: boolean, calendarPosTop: number, calendarPosLeft: number, calendarParentId: string, calendarCallback: null, calendarShowDate: string, needHour: boolean}}
 */
const state = {
    /*所有的日期*/
    calendarData: [],
    /*当前的日期*/
    calendarNowDate: '',
    /*选择的日期*/
    calendarPickDate: '',
    /*是否显示日期控件*/
    calendarShow: false,
    /*距离顶部的位置*/
    calendarPosTop: 0,
    /*距离左边的位置*/
    calendarPosLeft: 0,
    /*父级的Id值*/
    calendarParentId: '',
    /*回收数据*/
    calendarCallback: null,
    /*应该显示的数据*/
    calendarShowDate: '',
    /*是否需要小时*/
    needHour: false
};
/**
 * @type {{calendarData: ((p1:*)=>Array), calendarNowDate: ((p1:*)=>string), calendarPickDate: ((p1:*)=>string), calendarShow: ((p1:*)=>boolean), calendarPosTop: ((p1:*)=>number), calendarPosLeft: ((p1:*)=>number), calendarParentId: ((p1:*)=>string), calendarCallback: ((p1:*)=>null), calendarShowDate: ((p1:*)=>string), needHour: ((p1:*)=>boolean)}}
 */
const getters = {
    calendarData: state => state.calendarData,
    calendarNowDate: state => state.calendarNowDate,
    calendarPickDate: state => state.calendarPickDate,
    calendarShow: state => state.calendarShow,
    calendarPosTop: state => state.calendarPosTop,
    calendarPosLeft: state => state.calendarPosLeft,
    calendarParentId: state => state.calendarParentId,
    calendarCallback: state => state.calendarCallback,
    calendarShowDate: state => state.calendarShowDate,
    needHour: state => state.needHour
};
/**
 * @type {{calendarCellClick: (({commit}:{commit: *}, evt)), calendarToggleEvt: (({commit, dispatch}:{commit: *, dispatch: *}, { calendarStartTime, calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback }:{calendarStartTime?: *, calendarParentId: *, calendarPosTop?: *, calendarPosLeft: *, calendarCallback: *})), initCalendar: (({commit, dispatch}:{commit: *, dispatch: *}, { calendarStartTime, needHour }:{calendarStartTime: *, needHour: *})), calculateCalendarData: (({commit}:{commit: *}, { calendarStartTime }:{calendarStartTime?: *})), calendarPreMonthEvt: (({dispatch}:{dispatch: *})), calendarNextMonthEvt: (({dispatch}:{dispatch: *})), calendarHiddenEvt: (({commit}:{commit: *}))}}
 */
const actions = {
    /**
     *日历单元格单击
     * @param commit
     * @param evt
     */
    calendarCellClick({commit}, evt) {
        let calendarStartTime = evt.target.getAttribute('now-date');
        if (state.calendarCallback && state.calendarCallback.constructor == Function) state.calendarCallback(calendarStartTime);
        commit(types.CALENDAR_NOW, {calendarStartTime});
        commit(types.CALENDAR_SHOW);
    },
    /**
     * 日历相互切换的事件
     * @param commit
     * @param dispatch
     * @param calendarStartTime
     * @param calendarParentId
     * @param calendarPosTop
     * @param calendarPosLeft
     * @param calendarCallback
     */
    calendarToggleEvt({commit, dispatch}, {calendarStartTime, calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback}) {
        debugger;
        calendarPosTop = parseInt(calendarPosTop) + 40;
        if (!calendarStartTime || calendarStartTime === '') {
            let dd = new Date();
            let m = dd.getMonth() + 1;
            m = m > 9 ? m : '0' + m;
            let cd = dd.getDate();
            cd = cd > 9 ? cd : '0' + cd;
            calendarStartTime = dd.getFullYear() + '-' + m + '-' + cd;
        }
        if (state.calendarShow) {
            commit(types.CALENDAR_SHOW);
            if (state.calendarParentId !== calendarParentId) {
                commit(types.CALENDAR_PROP, {calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback});
                dispatch('initCalendar', {calendarStartTime});
            }
        } else {
            commit(types.CALENDAR_PROP, {calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback});
            dispatch('initCalendar', {calendarStartTime});
        }
    },
    /**
     * 初始化日历控件
     * @param commit
     * @param dispatch
     * @param calendarStartTime
     * @param needHour
     */
    initCalendar({commit, dispatch}, {calendarStartTime, needHour}) {
        commit(types.CALENDAR_NOW, {calendarStartTime, needHour});
        dispatch('calculateCalendarData', {calendarStartTime});
        commit(types.CALENDAR_SHOW);
    },
    /**
     * 计算日历数据
     * @param commit
     * @param calendarStartTime
     */
    calculateCalendarData({commit}, {calendarStartTime}) {
        /**
         * 计算得到当前的时间
         * @param date
         * @returns {string}
         */
        function getDate(date) {
            if (date && date.constructor === String) {
                date = date.replace(/-/gi, '/');
            }
            let dd = new Date(date);
            let m = dd.getMonth() + 1;
            m = m > 9 ? m : '0' + m;
            let cd = dd.getDate();
            cd = cd > 9 ? cd : '0' + cd;
            return dd.getFullYear() + '-' + m + '-' + cd;
        }

        /*现在的时间*/
        let nowPick = state.calendarNowDate;
        calendarStartTime = getDate(calendarStartTime);
        /*日历开始的时间*/
        let calendarShowDate = calendarStartTime;
        commit(types.CALENDAR_SHOW_DATE, {calendarShowDate});
        commit(types.CALENDAR_PICK, {calendarStartTime});
        let arr = [];
        let st = calendarStartTime.replace(/-/gi, '/');
        let d = new Date(st);
        /*当前月份的时间*/
        let cMax = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        /*上一个月月份的时间*/
        let pMax = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
        let w = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
        w = w === 0 ? 7 : w;
        for (let i = pMax - w; i < pMax; i++) {
            let nowDate = getDate(new Date(d.getFullYear(), d.getMonth() - 1, i + 1));
            arr.push({txt: i + 1, date: nowDate, other: 'y', cls: nowDate === nowPick ? 'active' : ''});
        }
        for (let i = 1; i <= cMax; i++) {
            let nowDate = getDate(new Date(d.getFullYear(), d.getMonth(), i));
            arr.push({txt: i, date: nowDate, other: 'n', cls: nowDate === nowPick ? 'active' : ''});
        }
        let nd = 42 - arr.length;
        for (let i = 1; i <= nd; i++) {
            let nowDate = getDate(new Date(d.getFullYear(), d.getMonth() + 1, i));
            arr.push({txt: i, date: nowDate, other: 'y', cls: nowDate === nowPick ? 'active' : ''});
        }
        let calendarData = [];
        for (let i = 0; i < 6; i++) {
            let c = [];
            for (let k = 0; k < 7; k++) {
                c.push(arr[i * 7 + k]);
            }
            calendarData.push(c);
        }
        commit(types.CALENDAR_DATA, {calendarData});
    },
    /**
     * 计算日历的上一个月份值
     * @param dispatch
     */
    calendarPreMonthEvt({dispatch}) {
        let calendarStartTime = new Date(state.calendarPickDate.replace(/-/gi, '/'));
        calendarStartTime = new Date(calendarStartTime.getFullYear(), calendarStartTime.getMonth() - 1, 1);
        dispatch('calculateCalendarData', {calendarStartTime});
    },
    /**
     * 计算日历的下一个月份值
     * @param dispatch
     */
    calendarNextMonthEvt({dispatch}) {
        let calendarStartTime = new Date(state.calendarPickDate.replace(/-/gi, '/'));
        calendarStartTime = new Date(calendarStartTime.getFullYear(), calendarStartTime.getMonth() + 1, 1);
        dispatch('calculateCalendarData', {calendarStartTime});
    },
    /**
     * 是否显示日历控件
     * @param commit
     */
    calendarHiddenEvt({commit}) {
        commit(types.CALENDAR_SHOW);
    }
};
/**
 * @type {{[[types.CALENDAR_DATA]]: ((state, {calendarData}:{calendarData: *})), [[types.CALENDAR_NOW]]: ((state, {calendarStartTime, needHour}:{calendarStartTime: *, needHour: *})), [[types.CALENDAR_PICK]]: ((state, {calendarStartTime}:{calendarStartTime: *})), [[types.CALENDAR_SHOW]]: ((state)), [[types.CALENDAR_SHOW_DATE]]: ((state, {calendarShowDate}:{calendarShowDate: *})), [[types.CALENDAR_PROP]]: ((state, {calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback}:{calendarParentId: *, calendarPosTop: *, calendarPosLeft: *, calendarCallback: *}))}}
 */
const mutations = {
    [types.CALENDAR_DATA] (state, {calendarData}) {
        state.calendarData = calendarData;
    },
    [types.CALENDAR_NOW] (state, {calendarStartTime, needHour}) {
        state.needHour = needHour;
        state.calendarShowDate = calendarStartTime;
        state.calendarNowDate = calendarStartTime;
    },
    [types.CALENDAR_PICK] (state, {calendarStartTime}) {
        state.calendarPickDate = calendarStartTime;
    },
    [types.CALENDAR_SHOW] (state) {
        state.calendarShow = !state.calendarShow;
    },
    [types.CALENDAR_SHOW_DATE] (state, {calendarShowDate}) {
        state.calendarShowDate = calendarShowDate;
    },
    [types.CALENDAR_PROP] (state, {calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback}) {
        state.calendarParentId = calendarParentId;
        state.calendarPosTop = calendarPosTop;
        state.calendarPosLeft = calendarPosLeft;
        state.calendarCallback = calendarCallback;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};