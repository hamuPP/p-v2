<template>
    <div class="calendar-notice-wrapper-new">
        <div class="left">
            <!--编辑日程表事务-->
            <editMask refValue="agencyBox"></editMask>
            <div class="left-content">
                <div class="content-title">
                    <p class="title">我的日程</p>
                </div>
                <div class="content-body">
                    <div class='calendar-date'>
                        <DatePicker @datePicker="datePicker" :selectTimeData="allTaskDate"></DatePicker>
                    </div>
                    <div class="calendar-content" v-if="taskState === 'list'">
                        <div @click="addTask('add')" class="addTask">
                            <i class="iconfont icon-xinjianricheng"></i>
                            <div class="task-title">
                                <p>新建任务事件</p>
                                <p style="display: none;">创建一条选定时间日程</p>
                            </div>
                        </div>
                        <ul class="task-list" v-if="!isShow">
                            <template v-if="taskDate.length">
                                <li v-for="td in taskDate" :class="{isShow:isShow}" @click="curTaskEvt(td)">
                                    <p>{{td.newTime}}</p>
                                    <p>{{td.scheduleName}}</p>
                                    <i class="delete iconfont icon-shanchu_lajitong" @click.stop="deleteTask(td)"> </i>
                                </li>
                            </template>
                            <li v-else class="notStyle">无任务事件</li>
                        </ul>
                        <ul class="task-list task-detail" v-else>
                            <li>
                                <p>{{taskObj.newTime}}</p>
                                <p>{{taskObj.scheduleName}}</p>
                            </li>
                            <li class="notStyle">
                                <p>{{taskObj.eventDescription}}</p>
                                <button @click="addTask('edit')" class="addTask">编辑</button>
                                <button @click="closeTaskEvt">返回</button>
                            </li>
                        </ul>

                    </div>
                    <div class="calendar-content task_add" v-else-if="taskState === 'edit'">
                        <input type="text" placeholder="事件名称" v-model="taskObj.scheduleName" maxlength="12"/>
                        <selection label="开始:" showType='scroll' :objProps="startTime" @clickEvt="dropPick"></selection>
                        <selection label="结束:" showType='scroll' :objProps="endTime" @clickEvt="dropPickA"></selection>
                        <textarea placeholder="事件描述" maxlength="60" v-model="taskObj.eventDescription"></textarea>
                        <button @click="addTaskEvt" class="addTask">{{Object.keys(taskObj).length === 0 ? '创建' :'保存' }}
                        </button>
                        <button @click="closeTaskEvt">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <!--编辑日程表事务-->
            <editMask refValue="agencyBox"></editMask>
            <div class="right-content">
                <div class="content-title">
                    <p class="title">通知公告</p>

                    <div class="toolbar-right" @click="showNoticeFull">
                        <span class="iconfont icon-shiyingpingmu font-s12 addressbook-right-icon"></span>
                    </div>
                    <!--<button class="toolbar-right noticeManage">公告管理</button>-->
                </div>
                <div class="content-body">
                    <Notice></Notice>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Selection from './Selection.vue'
    import DatePicker from './calendar/DatePicker.vue'
    import Notice from './notice/Notice.vue'
    import editMask from './assembly/EditMask.vue'

    import {mapGetters} from "vuex"

    export default {
        components: {
            DatePicker,
            Selection,
            Notice,
            editMask
        },
        data() {
            return {
                noticeList: [],
                taskState: 'list', //任务的状态，‘list’，‘edit’，‘show’
                taskDate: [],
                taskObj: {},
                timeList: [],
                isShow: false,
                allTaskDate: [],
                startTime: {}, //开始的时间
                endTime: {}, //结束时间
                currentDate: '' //当前的时间
            }
        },
        computed: mapGetters({
            taskList: 'taskList',
            addTaskDate: 'addTaskDate',
            updateTaskDate: 'updateTaskDate',
            deleteTaskDate: 'deleteTaskDate',
            allDate: 'allTaskDate'
        }),
        watch: {
            /*监听日程列表数据*/
            "taskList": function (val) {
                if(!val){return;}
                let that = this;
                that.$nextTick(() => {
                    that.taskDate = val.map(item => {
                        let it = item;
                        it.newTime = item.startTime.substring(11, 16) + "-" + item.endTime.substring(
                            11, 16);
                        return it;
                    });
                });
            },
            /*监听日程新增数据*/
            "addTaskDate": function (val) {
                let that = this;
                that.$nextTick(() => {
                    if (val) {
                        that.taskState = "list";
                        that.taskDate.push(that.taskObj);
                        that.taskObj = {};
                        /*获取所有日程的日期*/
                        that.$store.dispatch('getAllTaskData');
                    }
                });
            },
            /*监听日程新增数据*/
            "updateTaskDate": function (val) {
                let that = this;
                that.$nextTick(() => {
                    if (val) {
                        that.taskState = "list";
                        let temp = that.taskDate.map(item => {
                            let newItem = item;
                            if (item.id === that.taskObj.id) {
                                newItem = that.taskObj;
                            }
                            return newItem;
                        });
                        that.taskDate = temp;
                        that.taskObj = {};
                    }
                });
            },
            /*监听日程新增数据*/
            "deleteTaskDate": function (val) {
                let that = this;
                that.$nextTick(() => {
                    if (val) {
                        that.taskState = "list";
                        let temp = [];
                        that.taskDate.map(item => {
                            item.id === that.taskObj.id || temp.push(item);
                        });
                        that.taskDate = temp;
                        that.taskObj = {};

                      /*获取所有日程的日期*/
                      that.$store.dispatch('getAllTaskData');
                    }
                });
            },
            "allDate": function (val) {
                let that = this;
                that.$nextTick(() => {
                    that.allTaskDate = val;
                });
            }
        },
        methods: {
            /*新增任务*/
            addTask(ele) {
                let that = this;
                ele === 'edit' || (that.taskObj = {});
                that.taskState = "edit";
                this.isShow = false;
            },
            /*新增日程表的数据*/
            addTaskEvt() {
                let that = this;
                let taskObj = that.taskObj;
                if (taskObj.id) {
                    that.$store.dispatch('updateTaskDate', {
                        reqData: taskObj
                    });
                } else {
                    that.$store.dispatch('addTaskDate', {
                        reqData: taskObj
                    });
                }
            },
            /*删除日程表数据*/
            deleteTask(ele) {
                this.taskObj = ele;
                this.$store.dispatch('deleteTaskData', {
                    reqData: ele.id
                });
            },
            /*开始时间点击事件*/
            dropPick(data) {
                let that = this;
                that.taskObj.startTime = that.currentDate + " " + data.name + ":00";
                that.getTimer('end', data.name);
            },
            /*获取当前下拉框的时间*/
            getTimer(type, value) {
                let that = this;
                let temp = [];
                that.timeList.map(item => {
                    if (type === 'end' && item.name >= value) {
                        temp.push(item);
                    } else if (type === 'start' && item.name <= value) {
                        temp.push(item);
                    }
                });
                type === 'end' ? that.endTime.list = temp : that.startTime.list = temp;
            },
            /*结束时间点击事件*/
            dropPickA(data) {
                let that = this;
                that.taskObj.endTime = that.currentDate + " " + data.name + ":00";
                that.taskObj.newTime = that.taskObj.startTime.substring(11, 16) + "-" + data.name;
                that.getTimer('start', data.name);
            },
            /*获取当初页面*/
            datePicker(data) {
                this.currentDate = data;
                this.$store.dispatch('getTaskList', {
                    reqData: data
                });
            },
            /**
             * 点击当前列表信息
             * @param ele
             */
            curTaskEvt(ele) {
                let that = this;
                that.taskObj = ele;
                that.isShow = true;
            },
            /*关闭操作页*/
            closeTaskEvt() {
                this.isShow = false;
                this.taskState = "list";
            },
            /*计算下拉框里面的值*/
            calculateData() {
                let that = this;
                for (let i = 0; i < 24; i++) {
                    for (let j = 0; j < 2; j++) {
                        let newData = {
                            id: i.toString() + j,
                            _select_show: true,
                            name: (i > 9 ? i : ('0' + i)) + ":" + (j === 0 ? '00' : '30')
                        };
                        that.timeList.push(newData);
                    }

                }
                that.startTime.list = that.timeList;
                that.endTime.list = that.timeList;
            },
            /*点击跳转公告全屏页操作*/
            showNoticeFull(){
                 /**田蓉 修改  为了兼容ie*/
                this.$router.push({path:'index/noticeFull'});
                //window.location.hash = '/noticeFull';
            }
        },
        mounted() {
            let that = this;
            that.$nextTick(() => {
                that.timeList = [];
                /*默认展示的数据*/
                that.calculateData();
                /*获取当前时间*/
                let dd = new Date();
                let m = dd.getMonth() + 1;
                m = m > 9 ? m : '0' + m;
                let cd = dd.getDate();
                cd = cd > 9 ? cd : '0' + cd;
                that.currentDate = dd.getFullYear() + '-' + m + '-' + cd;
                /*获取当天的日程数据*/
                that.$store.dispatch('getTaskList', {
                    reqData: dd.getFullYear() + '-' + m + '-' + cd
                });
                /*获取所有日程的日期*/
                that.$store.dispatch('getAllTaskData');

            });
        }
    }
</script>
