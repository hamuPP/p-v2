/*********************************************************************
* 代办事务的模板                                                    *
* Created by tr on 2017/6/27.                                       *
*********************************************************************/
<template>
    <div id="agencyFullBox" v-if="isFullScreen" class="agencyFullBox">
        <!--标题-->
        <div>
            <div class="row topper">
                <div class="col-xs-10 col-md-10 col-lg-10">
                    <span class="title">待办事务</span>
                </div>
                <!--退出全屏-->
                <div class="col-xs-2 col-md-2 col-lg-2">
                    <span class="iconfont icon-suoxiao_huanyuan font-s12" @click='resetSreen'></span>
                </div>
            </div>
            <!--条件搜索-->
            <div class="row search-box">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <form class="form-inline">
                        <!--事项来源-->
                        <div class="form-group">
                            <label>事项来源:</label>
                            <select v-model="clientId" class="form-control">
                                <option v-for="(agency, i) in clientsData" :value="i">{{agency}}</option>
                            </select>
                        </div>
                        <!--时间范围-->
                        <div class="form-group">
                            <label>时间范围:</label>
                            <select v-model="timeRanges" class="form-control" @change="timeChange">
                                <option v-for="item in timeRangesValue" :value="item.value" :key="item">{{ item.label }}
                                </option>
                            </select>
                            <!--日历控件-->
                            <div class="input-group" v-if="sum === 1">
                                <div class="form-control calendar-ipt" id="createTime" @click="stateTime" v-model="createTime" now-id="activityST" :new-val="queryObj.activityDateStart">{{ queryObj.activityDateStart}}
                                    <div class="input-group-addon iconfont icon-riqi"></div>
                                </div>
                            </div>
                            <!--滞留时长-->
                            <select v-model="durationMin" class="form-control" v-else-if="sum === 2" id="durationM">
                                <option v-for="item in timeShots" :value="item.value" :key="item">{{ item.label }}
                                </option>
                            </select>
                        </div>
                        <!--事项来源的搜索-->
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="keyWord" placeholder="输入要搜索值">
                        </div>
                        <!--搜索按钮-->
                        <button type="submit" class="btn btn-default background-40 font-c6 font-s12 font-cf" @click="search">
                            搜索
                        </button>
                        <!--重置按钮-->
                        <button type="button" class="btn btn-default font-c6 font-s12 background-cF" @click="reset">
                            重置
                        </button>
                    </form>
                </div>
            </div>
            <!--代办事务的列表-->
            <div class="row agency-tab">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div>
                        <!--代办事务的表格-->
                        <table class="table table-hover">
                            <!--代办事务的头部-->
                            <thead>
                                <tr>
                                    <th class="col-xs-3 col-md-3 col-lg-3 font-s12">任务描述</th>
                                    <th class="col-xs-3 col-md-3 col-lg-3 font-s12">任务节点</th>
                                    <th class="col-xs-2 col-md-2 col-lg-2 font-s12">发送时间</th>
                                    <th class="col-xs-2 col-md-2 col-lg-2 font-s12">事项来源</th>
                                    <th class="text-right col-xs-2 col-md-2 col-lg-2 font-s12">流程启动时间</th>
                                </tr>
                            </thead>
                            <!--代办事务的内容-->
                            <tbody v-if="backlogsData.data && backlogsData.data.length > 0">
                                <tr v-for="(b,i) in backlogsData.data" @click="path(b.url)">
                                    <td class="font-s12">{{b.themeName}}</td>
                                    <td class="font-s12">{{b.backlogName}}</td>
                                    <td class="font-s12">{{ b.createTime }}</td>
                                    <td class="font-s12">
                                        <span class="font-s12 hex iconfont col icon-yemianxiangqing"></span>{{ b.form }}
                                    </td>
                                    <td class="text-right font-s12">{{ b.duration}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--翻页-->
                    <template v-if="backlogsData.totalPage > 0">
                        <nav aria-label="Page navigation" class="text-center navbar-fixed-bottom">
                            <!--  <ul class="pagination" id="pagination">
                               
                                <li>
                                    <a href="#" aria-label="Previous" @click="previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <template v-for="(page, i) in backlogsData.totalPage" v-if="i < 5">
                                    <template v-if="(i+1) == currentPage">
                                        <li class="select page" @click="currentEle(i+1)"><a>{{i+1}}</a></li>
                                    </template>
                                    <template v-else>
                                        <li class="page" @click="currentEle(i+1)"><a>{{i+1}}</a></li>
                                    </template>
                                </template>
                                <li v-if='backlogsData.totalPage > 5' class="page" >...</li>
                                
                                <li>
                                    <a href="#" aria-label="Next" @click="next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul> -->
                            <Pagination 
                                v-if="backlogsData.totalPage" 
                                :paginationData="paginationData" 
                                :showTotal="showTotal" 
                                :showStyle="showTotal"
                                  @paginationChange="paginationChange"
                                ></Pagination>
                        </nav>
                    </template>
                </div>
            </div>
            <!--日历控件-->
            <CalendarTpl></CalendarTpl>
        </div>
    </div>
</template>

<script>
    import CalendarTpl from '../calendar/CalendarTpl.vue'
    import Pagination from '../Pagination.vue'
    import {mapGetters} from "vuex"
    export default {
        /**
         * @returns {{
         * tabStatus: boolean 是否是已处理,
         * isHidden: boolean 是否未处理,
         * isFull: boolean 是否显示全屏,
         * currentPage: number 当前的页数,
         * sum: number 判断是不是日历控件,
         * queryObj: object 日历的初始化数据,
         * timeRangesValue: array 时间范围的值,
         * timeShots: array 滞留时长的数据
         * }}
         */
        data() {
            return {
                 showTotal: false,
                 paginationData: {
                    _reloadFlag:0,
                    total: 5,
                    rows: 20,
                    page: 1,
                    pageGroup: 7,
                    rowsData: [
                        {value: 10, text: '10条/页'},
                        {value: 20, text: '20条/页'},
                        {value: 30, text: '30条/页'},
                        {value: 40, text: '40条/页'},
                        {value: 50, text: '50条/页'}
                    ],
                    batchButtons: [
                        {id: 'batchDelete', text: '批量删除'}
                    ],
                    showBatchButtons: false
                },
                tabStatus: true,
                isHidden: false,
                isFull: false,
                currentPage: 1,
                sum: 0,
                queryObj: {
                    activityDateStart: ''
                },
                timeRangesValue: [{
                        value: '1',
                        label: '创建时间'
                    },
                    {
                        value: '2',
                        label: '滞留时长'
                    }
                ],
                timeRanges: '',
                createTime: '',
                durationMin: '',
                clientId: '',
                timeShots: [{
                        value: '',
                        label: '全部时段'
                    },
                    {
                        value: '5',
                        label: '5分钟内'
                    },
                    {
                        value: '30',
                        label: '半小时内'
                    },
                    {
                        value: '1440',
                        label: '1天内'
                    },
                    {
                        value: '10080',
                        label: '一周内'
                    },
                    {
                        value: '44640',
                        label: '一个月内'
                    }
                ]
            }
        },
        /**
         * @type {{
         * isFullScreen: boolean 是否是全屏,
         * userData: Object 用户的基本信息,
         * backlogsData: Object 代办的数据,
         * calendarData: Object 日历的数据,
         * clientsData:Object 事项来源数据
         * }}
         */
        computed: mapGetters({
            isFullScreen: "isFullScreen",
            userData: 'userData',
            backlogsData: 'backlogsData',
            calendarData: 'calendarData',
            clientsData: 'clientsData'
        }),
        /**
         * @define {{isFullScreen: function 监听方法 是否是全屏}}
         */
        watch: {
            isFullScreen(val) {
                this.isHidden = val ? false : true;
            },
            backlogsData(val){
                let that = this;
                that.$nextTick(()=>{
                    that.$set(that.paginationData, 'total', val.totalPage * 20);
                    that.$set(that.paginationData, 'page', that.currentPage);
                    (that.paginationData._reloadFlag)++;
                });
            }
        },
        components: {
            CalendarTpl,Pagination
        },
        /**
         * @define {{
         * timeChange: function 根据选择时间范围，来显示对应的控件,
         * previous: function 上一页,
         * currentEle: function 根据数字来获取当前页面,
         * next: function 下一页,
         * stateTime: function 日历控件数据的处理,
         * path: function 路径的跳转,
         * tabToggle: function 已处理和未处理的切换,
         * resetSreen: function 退出全屏,
         * reset: function 重置搜索的数据,
         * search: function 根据条件搜索,
         * createTimeSearch: function 根据创建时间搜索
         * }}
         */
        methods: {
              paginationChange(data){
                let that = this;
                let page = data.page * 1;
                that.currentPage = page;
                this.createTimeSearch(page, 20, this.isHidden ? 0 : 1);
            },
            timeChange() {
                let that = this;
                that.sum = that.timeRanges * 1;
                if (that.sum === 2) {
                    that.queryObj.activityDateStart = '';
                } else if (that.sum === 1) {
                    that.durationMin = '';
                }
            },
           /*  previous(e) {
                e.preventDefault();

                if (this.currentPage > 1) {
                    this.currentPage -= 1;
                    this.createTimeSearch(this.currentPage, 20, this.isHidden ? 0 : 1);
                }
            },
            currentEle(i) {
                if (i !== this.currentPage) {
                    this.currentPage = i;
                    this.createTimeSearch(i, 20, this.isHidden ? 0 : 1);
                }
            },
            next(e) {
                e.preventDefault();
                let page = document.getElementsByClassName('page');

                if (this.currentPage < this.backlogsData.totalPage) {
                    this.currentPage += 1;
                    this.createTimeSearch(this.currentPage, 20, this.isHidden ? 0 : 1);
                }
            }, */
            stateTime(evt) {
                let that = this;
                let _target = document.getElementById(evt.target.id);
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                let calendarPosTop = $(evt.target).offset().top - scrollTop - 10;
                let calendarPosLeft = $(evt.target).offset().left;
                let calendarParentId = _target.getAttribute('now-id');
                let calendarStartTime = _target.getAttribute('now-val');
                let calendarCallback = function (date) {
                    if (calendarParentId === 'activityST') {
                        that.queryObj.activityDateStart = date;
                    }
                };
                that.$store.dispatch('calendarToggleEvt', {
                    calendarStartTime,
                    calendarParentId,
                    calendarPosTop,
                    calendarPosLeft,
                    calendarCallback
                });
            },
            path(url) {
                window.open(url);
            },
            tabToggle: function (status) {
                this.isHidden = status ? false : true;
                this.createTimeSearch(1, 20, status ? 1 : 0);
            },
            resetSreen: function () {
                let that = this;
                that.$store.dispatch('loadingShow');
                that.$store.dispatch('resetScreen');
                that.$store.dispatch('rightModelShow');
                that.$store.dispatch('showUserVisible');

                let reqData = {
                    url: {
                        executorId: that.userData.account
                    },
                    parameter: {
                        page: 1,
                        rows: 8,
                        status: 1
                    }
                };
                that.$store.dispatch('getBacklogsData', {
                    reqData
                });

            },
            reset() {
                this.clientId = '';
                this.sum = 0;
                this.queryObj.activityDateStart = '';
                this.durationMin = '';
                this.keyWord = '';
                this.timeRanges = '';
            },
            search() {
                this.createTimeSearch(1, 20, this.isHidden ? 0 : 1);
            },
            createTimeSearch(page, rows, status) {
                let createTime = document.getElementById('createTime');
                let reqData = {
                    url: {
                        executorId: this.userData.account
                    },
                    parameter: {
                        keyWord: this.keyWord || '',
                        clientId: this.clientId || '',
                        createTime: this.timeRanges == 1 ? createTime.getAttribute('new-val') : '',
                        durationMin: this.timeRanges == 2 ? this.durationMin : '',
                        page: page,
                        rows: rows,
                        status: status
                    }
                };
                this.$store.dispatch('loadingShow');
                this.$store.dispatch('getBacklogsData', {
                    reqData
                });
            }
        }

    }
</script>