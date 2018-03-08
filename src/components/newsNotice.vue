/*********************************************************************
* Created by tr on 2017/10/31.                                       *
*********************************************************************/
<template>
    <div class="newsNotice" v-if="newsListVisible">
        <div>
            <div class="row topper">
                <div class="col-xs-10 col-md-10 col-lg-10">
                    <span class="title">消息通知</span>
                    <button class="goBackTo" @click="goBack"><i class="iconfont col icon-fanhuishangyiji"></i>返回上级
                    </button>
                </div>
            </div>
            <div class="row search-box">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <form class="form-inline">
                        <div class="form-group">
                            <label>消息来源:</label>
                            <select v-model="clientId" class="form-control">
                                <option v-for="(send , i) in sendersData" :value="i">{{send}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>提交时间:</label>
                            <div class="form-control calendar-ipt createTime" id="createTime" @click="stateTime"
                                 v-model="createTime"
                                 now-id="activityST" :new-val="queryObj.activityDateStart">{{
                                queryObj.activityDateStart}}
                                <div class="input-group-addon iconfont icon-riqi"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>消息类型:</label>
                            <select v-model="newsId" class="form-control">
                                <option v-for="(ny , i) in newsType" :value="i">{{ny}}</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-default background-40 font-c6 font-s12 font-cf"
                                @click="search">
                            搜索
                        </button>
                        <button type="button" class="btn btn-default font-c6 font-s12 background-cF" @click="reset">
                            重置
                        </button>
                    </form>
                </div>
            </div>

            <div class="row todo-tab">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <ul class="nav nav-tabs">
                        <li role="presentation" :class="{active: !isHidden}" @click='tabToggle(true)'><a
                                href="javascript:void('dealed')">未读消息</a></li>
                        <li role="presentation" :class="{active: isHidden}" @click='tabToggle(false)'><a
                                href="javascript:void('undealed')">已读消息</a></li>
                    </ul>
                    <div class="table-div">
                        <ul class="col-xs-12 col-md-12 col-lg-12 ulEle headClass">
                            <li class="col-xs-12 col-md-12 col-lg-12">
                                <label class="col-xs-2 col-md-2 col-lg-2 font-s12">
                                    <input type="checkbox" name="all" class="checkbox" style="visibility: hidden">标题
                                </label>
                               <label class="col-xs-4 col-md-4 col-lg-4 font-s12">内容</label>
                               <label class="col-xs-2 col-md-2 col-lg-2 font-s12">消息来源</label>
                               <label class="col-xs-3 col-md-3 col-lg-3 font-s12">提交时间</label>
                               <label class="text-right col-xs-1 col-md-1 col-lg-1 font-s12">消息类型</label>
                            </li>
                        </ul>
                        <ul class="col-xs-12 col-md-12 col-lg-12 ulEle"  v-if="newsNoticeData && newsNoticeData.data && newsNoticeData.data.length > 0">
                            <li class="col-xs-12 col-md-12 col-lg-12"  v-for="(nd , i) in newsNoticeData.data">
                                <label class="col-xs-2 col-md-2 col-lg-2 font-s12 text-overflow-ellipsis">
                                    <input type="checkbox" name="all"
                                           class="checkbox"
                                           :checked="nd.check ? 'checked' : false" @click="selectEvt(nd)">{{nd.title}}</label>
                                <label class="col-xs-4 col-md-4 col-lg-4 font-s12 text-overflow-ellipsis">{{nd.content}}</label>
                                <label class="col-xs-2 col-md-2 col-lg-2 font-s12">{{nd.senderName}}</label>
                                <label class="col-xs-3 col-md-3 col-lg-3 font-s12">{{nd.createTime}}</label>
                                <label class="text-right col-xs-1 col-md-1 col-lg-1 font-s12">{{nd.statusStr}}</label>
                            </li>
                        </ul>
                        <ul class="col-xs-12 col-md-12 col-lg-12 footClass ulEle">
                            <li class="col-xs-12 col-md-12 col-lg-12">
                                <label class="col-xs-2 col-md-2 col-lg-2 font-s12" v-if="elideVisible">
                                    <input type="checkbox" name="all" class="checkbox" @click="allCheckbox">
                                    <button @click="deleteAllEvt">全部忽略</button>
                                </label>
                                <label class="col-xs-10 col-md-10 col-lg-10 font-s12 lastLabel" style="float: right;">
                                    <label>共有{{newsNoticeData.total}}条,每页显示</label>
                                    <select @change="getPageEvt" v-model="dropDataValue">
                                        <option v-for="(page, i) in dropData">{{page}}</option>
                                    </select>条
                                    <ul class="pagination pageList">
                                        <!--去第一页-->
                                        <li>
                                            <a href="#" @click="curPage(1,$event)">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        <!--上一页-->
                                        <li>
                                            <a href="#" aria-label="Previous" @click="curPage('previous',$event)">
                                                <span aria-hidden="true">&lt;</span>
                                            </a>
                                        </li>
                                        <!--当前显示的页数-->
                                        <template v-for="(page, i) in totalPage">
                                            <template v-if="(i+1) == currentPage">
                                                <li class="select page" @click="curPage(i+1,$event)"><a>{{i+1}}</a></li>
                                            </template>
                                            <template v-else>
                                                <li class="page" @click="curPage(i+1,$event)"><a>{{i+1}}</a></li>
                                            </template>
                                        </template>
                                        <!--下一页-->
                                        <li>
                                            <a href="#" aria-label="Next" @click="curPage('next',$event)">
                                                <span aria-hidden="true">&gt;</span>
                                            </a>
                                        </li>
                                        <!--去最后一页-->
                                        <li>
                                            <a href="#" @click="curPage(totalPage.length,$event)">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <!--去指定的页面-->
                                    <ul class="pagination pageList">
                                        <li>
                                            <span contenteditable="true" ref="pageName" @input="pageEvt"></span>
                                        </li>
                                        <li>
                                            <span class="iconfont icon-tiaozhuan" @click="curPage(0,$event)"></span>
                                        </li>
                                    </ul>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <CalendarTpl></CalendarTpl>
            <!--确认信息框-->
            <ConfirmTpl :confirm="confirmVisible" @confirmEle="confirmEvt" @cancelEle="cancelEvt"></ConfirmTpl>
        </div>
    </div>
</template>
<script>
    import CalendarTpl from './calendar/CalendarTpl.vue'
    import ConfirmTpl from './common/ConfirmTpl.vue'
    import {mapGetters} from "vuex"
    export default{
        data(){
            return {
                queryObj: {
                    activityDateStart: ''
                },
                timeRanges: 0,
                dropDataValue: 15, //页面展示的条数
                currentP: 15, //默认条数
                newsId: '',
                clientId: '',
                createTime:'',
                elideVisible:true,
                currentPage: 1, //当前页数
                totalPage: [], //消息的总页数
                dropData: [15, 30, 50, 100, 500],
                confirmVisible: false, //是否展示弹出框
                newsType: ['一般', '重要', '紧急'] //消息类型
            }
        },
        components: {
            CalendarTpl,ConfirmTpl
        },
        computed: mapGetters({
            newsListVisible: 'newsListVisible', //消息通知页面的状态
            sendersData: "sendersData",//消息来源数据
            newsNoticeData: "newsNoticeData",//系统消息通知数据
            deleteAll: 'deleteAll', //全部忽略
        }),
        watch: {
            /*监听系统消息通知数据*/
            newsNoticeData(val){
                let that = this;
                that.totalPage = [];
                if (val.total > 0) {
                    /*计算总页面*/
                    let sum = val.total % that.currentP;
                    let totalPage = parseInt(val.total / that.currentP);
                    totalPage = sum > 0 ? (totalPage + 1) : totalPage;
                    for (let i = 0; i < totalPage; i++) {
                        that.totalPage.push((i + 1));
                    }
                }
            }
        },
        methods: {
            /**
             * 返回上级
             */
            goBack(){
                this.$store.dispatch('hideNews');
                this.$store.dispatch('rightModelShow');
            },
            /**
             * 创建日历控件
             * @param evt
             */
            stateTime(evt){
                let that = this;
                let _target = document.getElementById('createTime');
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
            /**
             * 请求数据
             * @param data
             */
            getNoticeData(page){
                let reqData = {
                    senderName: this.clientId || '',
                    createTime: this.createTime || "",
                    page: page || 1,
                    rows: this.currentP,
                    statusStr: this.newsId || "",
                    state: this.isHidden ? 1 : 0
                };
                this.$store.dispatch('getNewsNoticeData', {reqData})
            },
            /**
             * 全选/取消全选
             * @param evt
             */
            allCheckbox(evt){
                let that = this;
                let newData = [];
                that.newsNoticeData.data.map(item => {
                    let newItem = item;
                    newItem.check = evt.target.checked;
                    newData.push(newItem);
                });
                that.newsNoticeData.data = newData;
            },
            selectEvt(evt){
                evt.check = !evt.check;
            },
            /*tal的切换*/
            tabToggle(bool){
                this.isHidden = !bool;
                this.elideVisible = bool;
                this.getNoticeData(1);
            },
            /*搜索功能*/
            search(){
                this.getNoticeData();
            },
            /*重置*/
            reset(){
                this.clientId = '';
                this.newsId = "";
                this.queryObj.activityDateStart = '';

            },
            /*翻页*/
            pageEvt(){
                let that = this;
                let pageValue = that.$refs.pageName.innerText;
                if (pageValue && isNaN(pageValue)) {
                    that.$refs.pageName.innerText = 1;
                }
            },
            /*当前页面搜索*/
            curPage(sum, e){
                e.preventDefault();
                let that = this;
                if (sum === 'previous') {
                    if (that.currentPage > 1) {
                        that.getNoticeData(--that.currentPage);
                    }
                } else if (sum === 'next') {
                    if (that.currentPage < that.totalPage.length) {
                        that.getNoticeData(++that.currentPage);
                    }
                } else if (sum) {
                    if (sum !== that.currentPage) {
                        that.currentPage = sum;
                        that.getNoticeData(sum);
                    }
                } else {
                    let pageValue = that.$refs.pageName.innerText;
                    if (pageValue && !isNaN(pageValue)) {
                        that.getNoticeData(sum);
                    }
                }
            },
            /*打开提示框*/
            deleteAllEvt(){
                this.confirmVisible = true;
            },
            /*关闭提示框*/
            cancelEvt(){
                this.confirmVisible = false;
            },
            /**
             * 忽略全部
             */
            confirmEvt(){
                this.confirmVisible = false;
                let that = this;
                /*所有要删除的ID*/
                let reqData = '';
                let allData = that.newsNoticeData.data;
                /*获取所有要删除的ID*/
                if(allData){
                    allData.map((item,i)=>{
                        reqData += item.check ? ((i + 1) === allData.length ? (i + 1) === allData.length : (item.messageId + ',')) : '';
                    });
                }
                if(reqData.indexOf(',') > -1){
                    this.$store.dispatch('deleteIdNoticeData',{reqData:{messageId:reqData}});
                }
            },
            /*搜索的条数*/
            getPageEvt(){
                this.currentP = this.dropDataValue;
                this.getNoticeData();
            },
            /*打开提示框*/
            deleteAllEvt(){
                this.confirmVisible = true;
            },
            /*关闭提示框*/
            cancelEvt(){
                this.confirmVisible = false;
            }
        },
        mounted(){
            let that = this;
            /*获取消息来源数据*/
            that.$nextTick(() => {
                that.$store.dispatch('getSendersData');
                /*获取未读消息*/
                that.getNoticeData();
            });
        }
    }
</script>