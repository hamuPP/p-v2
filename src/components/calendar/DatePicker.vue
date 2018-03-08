/*********************************************************************
* 日期选择器的控制                                                   *
* Modified by tr on 2017/12/25.                                      *
*********************************************************************/
<template>
    <div class="datePicker" :style="{'top': calendarPosTop+'px', 'left': calendarPosLeft+'px'}">
        <div class="opt">
            <span class="left" @click="preMonthEvt"></span>
            <span class="center">
                <sub @click="yearEvt" v-if="dtShowDate.year">{{dtShowDate.year}}年</sub>
                <sub @click="monthEvt" v-if="dtShowDate.month">{{dtShowDate.month}}月</sub>
            </span>
            <span class="right" @click="nextMonthEvt"></span>
        </div>
        <div v-if="dtVisible === 'day'">
            <div class="title"><span class="item" v-for="it in dtTitle">{{it}}</span></div>
            <div class="body" v-for="it in dtData">
                <span class="item user-touch content" v-for="item in it"
                      :class="{'active': item.cls != '' && item.other== 'c', 'other': item.cls == '' && item.other== 'c'}"
                      :now-date="item.date" @click="dayClick(item)">
                      <sub :class="{'select':item.sl}">{{item.txt}}</sub>
                </span>
            </div>
        </div>
        <div class="body month" v-else-if="dtVisible === 'month'" v-for="(it,i) in dtMonth">
            <span class="item" v-for="(item,j) in it" :data-id="item"
                  :class="{'active':parseInt(dtShowDate.month)===parseInt(item > 9 ? item : '0'+ item)}"
                  @click="monthClickEvt(item)">{{item}}月</span>
        </div>
        <div class="body month" v-else-if="dtVisible === 'year'" v-for="(it,i) in dtYear">
            <span class="item" v-for="(item,j) in it" :data-id="item"
                  :class="{'active':parseInt(dtShowDate.date.substring(0,4)) === parseInt(item) }"
                  @click="yearClickEvt(item)">{{item}}</span>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        props: {
            dateTimeData: {
                type: Object,
                default: {
                    posTop: 0,
                    show: true,
                    nowPick: new Date()
                }
            },
            selectTimeData: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                dtTitle: ['一', '二', '三', '四', '五', '六', '日'], //日历的标题
                dtMonth: [['1', '2', '3', '4',], ['5', '6', '7', '8',], ['9', '10', '11', '12']],//日历月份
                dtShowDate: {
                    year: '',
                    month: '',
                    day: '',
                    date: ''
                }, //日历显示
                dtShow: false, //日历上面需要显示的数据
                dtData: [], //日历数据
                dtYear: [],//日历年的数据
                dtNowDate: "", //当前日历的数据
                dtPosTop: 0,//日历距离头部的距离
                dtPosLeft: 0,//日历距离左边的距离
                yearSum: 100, //年份的相差值
                timeDate: [], //需要选中的日期
                dtVisible: 'day' //默认值 ‘year’、‘month’、‘day’
            }
        },
        watch: {
            "selectTimeData": function (val) {
                let that = this;
                that.$nextTick(()=> {
                    that.timeDate = val;
                    that.initData(this.dtShowDate.date);
                });
            }
        },
        methods: {
            /**
             * 初始化控件
             * @param startDate
             */
            initData(startDate){
                let that = this;
                that.calculateData(startDate);
            },
            /**
             * 计算日期数据
             * @param startDate
             */
            calculateData(startDate){
                let that = this;
                let dtData = that.dateTimeData;
                startDate = that.getDate(startDate);
                let nowPick = that.getDate(dtData.nowPick);
                //日历开始时间
                let arr = [];
                let st = startDate.replace(/-/gi, '/');
                let d = new Date(st);
                /*当前月份的时间*/
                let cMax = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
                /*上一个月月份的时间*/
                let pMax = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
                let w = new Date(d.getFullYear(), d.getMonth(), 0).getDay();
                w = w === 0 ? 7 : w;
                let timeDate = that.timeDate;
                /*获取上个月在当月显示的日期*/
                for (let i = pMax - w; i < pMax; i++) {
                    let nowDate = that.getDate(new Date(d.getFullYear(), d.getMonth() - 1, i + 1));
                    arr.push({txt: i + 1, date: nowDate, other: 'p', cls: nowDate === nowPick ? 'active' : '', sl: ''});
                }
                for (let i = 1; i <= cMax; i++) {
                    let nowDate = that.getDate(new Date(d.getFullYear(), d.getMonth(), i));
                    let isBool = false;
                    if (timeDate && timeDate.length) {
                        timeDate.map(item => {
                            if(item === String(nowDate)){
                                isBool = item === String(nowDate);
                                return;
                            }
                        });
                    }
                    arr.push({
                        txt: i,
                        date: nowDate,
                        other: 'c',
                        cls: nowDate === nowPick ? 'active' : '',
                        sl: isBool ? 'select' : ''
                    });
                }
                let nextData = 42 - arr.length;
                for (let i = 1; i <= nextData; i++) {
                    let nowDate = that.getDate(new Date(d.getFullYear(), d.getMonth(), i));
                    arr.push({txt: i, date: nowDate, other: 'n', cls: nowDate === nowPick ? 'active' : '', sl: ''});
                }

                that.dtData = [];
                for (let i = 0; i < 6; i++) {
                    let newData = [];
                    for (let j = 0; j < 7; j++) {
                        newData.push(arr[i * 7 + j]);
                    }
                    that.dtData.push(newData);
                }
            },
            /**
             * 获取当前时间
             * @param date
             */
            getDate(date){
                //判断传入值的类型
                if (date && date.constructor === String) {
                    date = date.replace(/-/gi, '/');
                } else if (date && date.constructor === Object) {
                    date = date.year + '-' + date.month + '-' + date.day;
                }
                let dd = new Date(date);
                let m = dd.getMonth() + 1;
                m = m > 9 ? m : '0' + m;
                let cd = dd.getDate();
                cd = cd > 9 ? cd : '0' + cd;
                return dd.getFullYear() + '-' + m + '-' + cd;
            },
            /**
             * 计算年份数据
             * @param date
             */
            calculateYear(startYear){
                let that = this;
                startYear = startYear || new Date().getFullYear();
                that.dtYear = [];
                let tempYear = [];
                for (let i = 0; i < 12; i++) {
                    tempYear.push(startYear * 1 + i);
                }
                for (let i = 0; i < 3; i++) {
                    let newData = [];
                    for (let j = 0; j < 4; j++) {
                        newData.push(tempYear[i * 3 + j]);
                    }
                    that.dtYear.push(newData);
                }
            },
            /**
             *当前日期的点击事件
             * @param date
             */
            dayClick(date){
                let that = this;
                that.dtData.map(item => {
                    item.map(it => {
                        date.other !== 'c' || (it.cls = '');
                    });
                });
                date.other !== 'c' || (date.cls = 'active');
                /*把点击当前的事件，返回父级*/
                that.$emit('datePicker', date.date)
            },
            /*上一页*/
            preMonthEvt(){
                let that = this;
                let dtShowDate = that.dtShowDate;
                let cerYear = new Date().getFullYear();
                if (that.dtVisible === 'year') {
                    if (parseInt(cerYear) - parseInt(that.dtYear[0][0] * 1 - 10) >= parseInt(that.yearSum))  return false;
                    that.calculateYear(that.dtYear[0][0] * 1 - 10);
                    that.$nextTick(() => {
                        that.dtShowDate.year = that.dtYear[0][0] + '-' + that.dtYear[2][3];
                    });
                } else if (that.dtVisible === 'day') {
                    if (parseInt(cerYear) - parseInt(that.yearSum) === parseInt(dtShowDate.year) && dtShowDate.month === 1) return false;
                    dtShowDate.month-- > 1 || ((dtShowDate.month = 12) && (dtShowDate.year--));
                    let newDate = that.makeUpDate();
                    that.dtShowDate.month = dtShowDate.month;
                    that.dtShowDate.date = newDate;

                    that.calculateData(newDate);
                }
            },
            /*下一页*/
            nextMonthEvt(){
                let that = this;
                let dtShowDate = that.dtShowDate;
                let cerYear = new Date().getFullYear();
                if (that.dtVisible === 'year') {
                    if (parseInt(that.dtYear[2][3] * 1 + 1) - parseInt(cerYear) >= parseInt(that.yearSum)) return false;
                    that.calculateYear(that.dtYear[2][3] * 1 + 1);
                    that.$nextTick(() => {
                        that.dtShowDate.year = that.dtYear[0][0] + '-' + that.dtYear[2][3];
                    });
                } else if (that.dtVisible === 'day') {
                    if (parseInt(dtShowDate.year) - parseInt(cerYear) === parseInt(that.yearSum) && dtShowDate.month === 12) return false;
                    dtShowDate.month++ < 12 || ((dtShowDate.month = 1) && (dtShowDate.year++));
                    let newDate = that.makeUpDate();
                    that.dtShowDate.month = dtShowDate.month;
                    that.dtShowDate.date = newDate;

                    that.calculateData(newDate);
                }
            },
            /*年份的点击事件*/
            yearEvt(){
                let that = this;
                that.dtVisible = 'year';
                let curYear = new Date().getFullYear();
                that.dtShowDate.month = '';
                let year = that.dtShowDate.year;
                !(year.toString().indexOf('-') > -1) || (year = curYear);
                year = year.toString().substring(0, 3) + curYear.toString().substring(3, 4);
                that.calculateYear(year - (100 % 12));
                that.dtShowDate.year = that.dtYear[0][0] + '-' + that.dtYear[2][3];
            },
            /**
             * 年份的点击事件
             * @param date
             */
            yearClickEvt(date){
                let that = this;
                that.dtShowDate.year = date;
                that.dtShowDate.date = that.makeUpDate();
                that.dtVisible = 'month';
            },
            /*组合时间*/
            makeUpDate(){
                let that = this;
                let dtShowDate = that.dtShowDate;
                return dtShowDate.year + "-" + dtShowDate.month + '-' + dtShowDate.day
            },
            /*月份切换的事件*/
            monthEvt(){
                let that = this;
                that.dtVisible = 'month';
            },
            /*月份点击事件*/
            monthClickEvt(date){
                let that = this;
                that.dtShowDate.month = date;
                that.dtShowDate.date = that.makeUpDate();
                that.dtVisible = 'day';
            }
        },
        mounted(){
            let that = this;
            that.$nextTick(() => {
                this.timeDate = that.selectTimeData;
                let dtData = that.dateTimeData;
                that.dtPosTop = parseInt(dtData.posTop) + 40;
                if (!dtData.startTime || dtData.startTime === '') {
                    let dd = new Date();
                    let m = dd.getMonth() + 1;
                    m = m > 9 ? m : '0' + m;
                    let cd = dd.getDate();
                    cd = cd > 9 ? cd : '0' + cd;
                    that.dtShowDate = {
                        year: dd.getFullYear(),
                        month: m,
                        day: cd,
                        date: dd.getFullYear() + '-' + m + '-' + cd
                    }
                }
                that.$nextTick(()=>{
                    //初始化控件
                    that.initData(that.dtShowDate.date);
                });
            });
        }
    }
</script>
