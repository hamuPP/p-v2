<template>
    <div class="fullpage-main" v-if="isFullpageShow">
        <div>
            <!--用户的操作按钮-->
            <userOperation></userOperation>
        </div>

        <!--所有右边的数据模块-->
        <div ref="noticeFull" class="row inner-main">
            <div class="inner-inner-main noticeFull noticeManage">
                <div class="notice-title">
                    <p>公告管理</p>
                    <button class="goBackTo" @click="closeFull">
                      <i class="iconfont col icon-fanhuishangyiji"></i>返回上级
                    </button>
                    <!--<div class="toolbar-right" @click="closeFull">-->
                        <!--<span class="iconfont icon-shiyingpingmu font-s12 addressbook-right-icon"></span>-->
                    <!--</div>-->
                    <button class="toolbar-right noticeManage" @click="showNoticeEdit">新增公告</button>
                </div>
                <div class="notice-search">
                    <div class="notice-input notice-pr10">
                        <Selection showType='scroll' :objProps="noticeType" @clickEvt="noticeTypeEvt"></Selection>
                    </div>
                    <div class="notice-input">
                        <Selection showType='scroll' :objProps="noticeTime" @clickEvt="noticeTimeEvt"></Selection>
                    </div>
                    <div class="notice-time">
                        <div class="form-control calendar-ipt"
                             data-id="calendar-group"
                             id="firstTime"
                             @click="firstTime"
                             v-model="createTime"
                             now-id="activityST"
                             :new-val="queryFirstObj.activityDateStart">{{
                            queryFirstObj.activityDateStart}}
                            <i class="input-group-addon iconfont icon-riqi" data-id="calendar-group"></i>
                        </div>
                    </div>
                    <label class="notice-input">至</label>
                    <div class="notice-time notice-pr10">
                        <div class="form-control calendar-ipt"
                             data-id="calendar-group"
                             id="lastTime"
                             @click="lastTime"
                             v-model="createTime"
                             now-id="activityST" :new-val="queryLastObj.activityDateStart">{{
                            queryLastObj.activityDateStart}}
                            <i class="input-group-addon iconfont icon-riqi" data-id="calendar-group"></i>
                        </div>
                    </div>
                    <div class="notice-input notice-keyword notice-pr10">
                        <InputTpl :objProps="iptIBObj" @compEvt='compEvt'></InputTpl>
                    </div>
                    <button class="search" @click="noticeSearchEvt">搜索</button>

                </div>
                <div class="notice-content">
                    <Table showHead
                           border
                           tableSize="middle"
                           :headStyleOpt="tableHeadStyleOpt"
                           :columns="tableColumns"
                           :data="tableData"
                           @click="clickEvt"></Table>
                </div>
                <div class="pagination-wrapper">
                    <Pagination
                            :paginationData="paginationData"
                            @paginationCheck='paginationCheck'
                            @paginationChange="paginationChange"
                            @batchButtonClick="batchButtonClick"
                    ></Pagination>
                </div>
            </div>
        </div>
        <!--日历控件-->
        <CalendarTpl></CalendarTpl>
        <ConfirmTpl :confirm="confirm" @confirmEle="confirmEle" @cancelEle="cancelEle"></ConfirmTpl>
    </div>

</template>
<script>
    import userOperation from '../basic/userOperation.vue'
    import Selection from '../Selection.vue'
    import CalendarTpl from '../calendar/CalendarTpl.vue'
    import InputTpl from '../plugins/Input.vue'
    import Table from '../plugins/NoticeTable.vue'
    import Pagination from '../Pagination.vue'
    import ConfirmTpl from '../common/ConfirmTpl.vue'
    import UTILS from '../../vuex/Utils'

    import {mapGetters} from "vuex"

    export default {
        name:'NoticeManage.vue',
        components: {
            userOperation, Selection, CalendarTpl, InputTpl, Table, Pagination,ConfirmTpl
        },
        data() {
            return {
                isFullpageShow:true,
                confirm:false,
                curId:0,
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
                        {id: 'batchDelete', text: '全部删除'}
                    ],
                    showBatchButtons: true
                },
                tableHeadStyleOpt: {
                    bgColor: 'rgb(245,246,250)',
                    color: '#999'
                },
                tableColumns: [
                    {
                        title: '标题内容',
                        field: 'annoTitle',
                        align: 'left',
                        flex: 2
                    },
                    {
                        title: '发布人',
                        field: 'releasePerson',
                        align: 'left'
                    },
                    {
                        title: '类型',
                        field: 'annoTypeText'
                    },
                    {
                        title: '发布范围',
                        field: 'releaseScodeText',
                        align: 'left'
                    },
                    {
                        title: '创建时间',
                        field: 'createDate',
                        align: 'right'
                    },
                    {
                        title: '生效时间',
                        field: 'effectiveStartTime',
                        align: 'right'
                    },
                    {
                        title: '终止时间',
                        field: 'effectiveEndTime',
                        align: 'right'
                    },
                    {
                        title: '发布状态',
                        field: 'releaseText',
                        align: 'left'
                    },
                    {
                        title: '操作',
                        field: 'button',
                        align: 'right',
                        flex:2,
                        render (row, column, index) {
                            return `<i type="icon" text="edit" size="small" @click="show(${index})">编辑</i><i type="icon" text="delete" size="small"  @click="remove(${index})">删除</i>`;
                        }
                    }
                ],
                tableData: [],
                iptIBObj: {
                    placeholder: "请输入标题内容或发布人",
                    height: '24px',
                    radius: true,
                    shadow: true
                },
                queryFirstObj: { //日期控件对象
                    activityDateStart: ''
                },
                queryLastObj: { //日期控件对象
                    activityDateStart: ''
                },
                noticeStyle: {
                    isFull: true
                },
                noticeType: {
                    placeholder: '请选择',
                    list: [
                        {id: 0, name: '所有类型'},
                        {id: 1, name: '通知'},
                        {id: 2, name: '通报'},
                        {id: 3, name: '决议'},
                        {id: 4, name: '其他'},
                    ]
                },//公告的类型数据
                noticeTime: {
                    placeholder: '请选择',
                    list: [
                        {id: 1, name: '创建时间'},
                        {id: 2, name: '有效时间'},
                        {id: 3, name: '结束时间'},
                    ]
                },//公告的类型数据
                searchObj: {
                    annoType: 0,
                    timeType: 1,
                    keyword: ''
                },//公告搜索数据
                curNoticeId:[], //当前公告的id
            }
        },
        computed: mapGetters({
            noticeFindListData: 'noticeFindListData',
            noticeDelete:'noticeDelete',
            noticeRelease:'noticeRelease',
        }),
        watch: {
            'noticeFindListData': function (val) {
                let that = this;
                that.$nextTick(() => {
                    that.tableData = [];
                    if (val.data && val.data.length) {
                        that.tableData = val.data.map(item => {
                            item.checked = false;
                            switch (parseInt(item.annoType)) {
                                case 1:
                                    item.annoTypeText = '通知';
                                    break;
                                case 2:
                                    item.annoTypeText = '通报';
                                    break;
                                case 3:
                                    item.annoTypeText = '决议';
                                    break;
                                case 4:
                                    item.annoTypeText = '其他';
                                    break;
                            }
                            switch (parseInt(item.isRelease)){
                                case 1:
                                    item.releaseText = '生效';
                                    break;
                                case 2:
                                    item.releaseText = '未生效';
                                    break;
                                case 3:
                                    item.releaseText = '失效';
                                    break;
                            }
                            switch (parseInt(item.releaseScode)){
                                case 1:
                                    item.releaseScodeText = '公司';
                                    break;
                                case 2:
                                    item.releaseScodeText = '单位';
                                    break;
                            }
                            item.createDate = item.createDate.substring(0,10);
                            item.effectiveEndTime = item.effectiveEndTime.substring(0,10);
                            item.effectiveStartTime = item.effectiveStartTime.substring(0,10);
                            return item;
                        });
                    }
                    that.$set(that.paginationData, 'total', val.total);

                    that.paginationData.rows = val.rows;
                    (that.paginationData._reloadFlag)++;
                });
            },
            'noticeDelete':function (val) {
                let that = this;
                //TODO
                that.$nextTick(()=>{
                    if(val){
                        that.searchNotice();
                         this.confirm = false;
                    }
                });
            },
            'noticeRelease':function (val) {
                let that = this;
                that.$nextTick(()=>{
                    if(val){
                        that.searchNotice();
                    }
                });
            }
        },
        methods: {
            hideFullpage(flag){
                this.isFullpageShow = !flag;
            },
            confirmEle(){
                let that = this;
                that.$store.dispatch('getNoticeDelete', {reqData: that.curId});
            },
            cancelEle(){
              this.confirm = false;
            },
            /**
             *打开编辑页面
             */
            showNoticeEdit(){
                sessionStorage.removeItem('editNoticeId');
                /**田蓉 修改  为了兼容ie*/
                this.$router.push({path:'/index/noticeEdit'});
                //window.location.hash = '/noticeEdit'
            },
            /**
             * 开始时间的事件方法
             * @param evt
             */
            firstTime(evt){
                let Utils = new UTILS();
                let that = this;
                let target = evt.target || evt.srcElement;
//                let parentNode = target.parentNode;
//                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

                let offsetPosition = Utils.offset(evt);

                let calendarPosLeft = offsetPosition.left;
                let calendarPosTop = offsetPosition.top - 10;
                //如果点击的是小icon，left 和 top 位置减少一些
                if(target.tagName.toUpperCase() === 'I'){
                    calendarPosLeft -= 97;
                    calendarPosTop -= 4;
                }

                let calendarParentId = target.getAttribute('now-id');
                let calendarStartTime = target.getAttribute('now-val');

                let calendarCallback = function (date) {
                    if (calendarParentId === 'activityST') {
                        that.searchObj.startTime = date;
                        that.queryFirstObj.activityDateStart = date;
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
             * 结束时间的事件方法
             * @param evt
             */
            lastTime(evt){
                let Utils = new UTILS();
                let that = this;
                let target = evt.target || evt.srcElement;

                let offsetPosition = Utils.offset(evt);

                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

                let calendarPosLeft = offsetPosition.left;
                let calendarPosTop = offsetPosition.top - 10;
                //如果点击的是小icon，left 和 top 位置减少一些
                if(target.tagName.toUpperCase() === 'I'){
                    calendarPosLeft -= 97;
                    calendarPosTop -= 4;
                }

                let calendarParentId = target.getAttribute('now-id');
                let calendarStartTime = target.getAttribute('now-val');
                let calendarCallback = function (date) {
                    if (calendarParentId === 'activityST') {
                        that.searchObj.endTime = date;
                        that.queryLastObj.activityDateStart = date;
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
             * 接收事件类型
             * @param ele
             */
            noticeTimeEvt(ele){
                let that = this;
                that.searchObj.timeType = ele.id;
            },
            /**
             * 获取公告类型数据事件
             * @param ele
             */
            noticeTypeEvt(ele){
                let that = this;
                that.searchObj.annoType = ele.id;
            },
            /**
             * 查询数据
             * @param page
             * @param rows
             */
            searchNotice(page, rows){
                let that = this;
                that.searchObj.page = page;
                that.searchObj.rows = rows;
                that.$store.dispatch('getFindListNotice', {reqData: that.searchObj});
            },
            /*搜索框事件*/
            noticeSearchEvt(){
                this.searchNotice();
            },
            /**
             * 接受input输入框里面的值
             * @param val
             */
            compEvt(val) {
                if (val.type === 'input') {
                    this.searchObj.keyword = val.val;
                }
            },
            paginationCheck(bool){
                let that = this;
                let temp = that.tableData.map(item => {
                    item.checked = bool;
                    return item;
                });
                that.tableData = temp;
            },
            /**
             * 接收table的事件
             * @param ele
             */
            clickEvt(ele){
                let that = this;
                switch (ele.type){
                    case 'cancel':
                        that.$store.dispatch('getNoticeRelease',{reqData:ele.obj.id +",2"});
                        break;
                    case 'add':
                        that.$store.dispatch('getNoticeRelease',{reqData: ele.obj.id +",1"});
                        break;
                    case 'edit':
                        sessionStorage.setItem('editNoticeId',ele.obj.id);
                        /**田蓉 修改  为了兼容ie*/
                        this.$router.push({path:'/index/noticeEdit'});
                        //window.location.hash = '/noticeEdit';
                        break;
                    case 'delete':
                        that.confirm = true;
                        that.curId = ele.obj.id;
                        break;
                    case 'detail':
                        sessionStorage.setItem('noticeDetailsId',ele.obj.id);
                        sessionStorage.setItem('currentReleaseScope',parseInt(ele.obj.releaseScode));
                        /**田蓉 修改  为了兼容ie*/
                        this.$router.push({path:'/index/noticeDetails'});
                        //window.location.hash = '/noticeDetails';
                        break;
                    default:
                            break;
                }
            },
            paginationChange(data){
                let that = this;
                let page = data.page * 1;
                
                that.searchNotice(page,data.rows*1);
            },
            batchButtonClick(val){
                let that = this;
                let id = "";
                that.tableData.map(item=>{
                    if(item.checked){
                        id += item.id+',';
                    }
                });
                that.$store.dispatch('getNoticeDelete',{reqData: id});
            },
            closeFull(){
              window.history.go(-1);
            }
        },
        mounted() {
            let that = this;
            that.$nextTick(() => {
                that.searchNotice();
            });
        }
    }
</script>
