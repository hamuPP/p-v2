/*********************************************************************
* 日历的控制                                                         *
* Created by sdm on 2017/6/27.                                       *
* Modified by tr on 2017/6/27.                                       *
*********************************************************************/
<template>
    <div class="calendar-layer" v-show="calendarShow"
         :style="{'top': calendarPosTop+'px', 'left': calendarPosLeft+'px'}">
        <div class="opt"><span class="left masses-font user-touch" @click="calendarPreMonthEvt">&lt;</span><span
                class="center">{{calendarShowDate}}</span><span class="right masses-font user-touch"
                                                                @click="calendarNextMonthEvt">&gt;</span></div>
        <div class="title"><span class="item" v-for="it in calendarTitle">{{it}}</span></div>
        <div class="body" v-for="it in calendarData"><span class="item user-touch" v-for="item in it"
                                                           :class="{'active': item.cls != '', 'other': item.cls == '' && item.other== 'y'}"
                                                           :now-date="item.date"
                                                           @click="calendarCellClick">{{item.txt}}</span></div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        /**
         * @returns {{
         * calendarTitle: array 日历的标题
         * }}
         */
        data() {
            return {
                calendarTitle: ['日', '一', '二', '三', '四', '五', '六']
            }
        },
        computed: mapGetters({
            /*日历显示*/
            calendarShow: "calendarShow",
            /*日历数据*/
            calendarData: "calendarData",
            /*当前日历的数据*/
            calendarNowDate: "calendarNowDate",
            /*日历距离头部的距离*/
            calendarPosTop: "calendarPosTop",
            /*日历距离左边的距离*/
            calendarPosLeft: "calendarPosLeft",
            /*日历上面需要显示的数据*/
            calendarShowDate: "calendarShowDate"
        }),
        /**
         * @define {{
         * calendarNextMonthEvt: function 下一月的事件,
         * calendarPreMonthEvt: function 上一月的事件,
         * calendarCellClick: function 日历的回滚
         * }}
         */
        methods: mapActions({
            calendarNextMonthEvt: "calendarNextMonthEvt",
            calendarPreMonthEvt: 'calendarPreMonthEvt',
            calendarCellClick: 'calendarCellClick'
        }),
        created() {
            let me = this;
            /*滚动鼠标是隐藏日历控件*/
            $(document).on('click scroll', function (evt) {
                let $tar = $(evt.target);
                if ($tar.parents('div.calendar-layer').length <= 0 && !$tar.hasClass('div.calendar-layer') && !$tar.hasClass('calendar-ipt')) {
                    if (me.calendarShow) {
                        me.$store.dispatch('calendarHiddenEvt');
                    }
                }
            });
        }
    }
</script>
