/*********************************************************************
* 用户的基本信息的操作事件                                             *
* Created by tr on 2017/10/31.                                       *
*********************************************************************/
<template>
    <div class="userOperation" v-if="userVisible">
        <div class="userOperation_p">

            <!-- 注释掉通知公告轮播,根据最近的用户需求不要了 start by:ty 2018-03-19 -->
            <!--<i class="iconfont col icon-gonggao" v-if="noticeList.length"></i>-->
            <!--<div class="swiper-container" v-if="noticeList.length">-->
                <!--<div class="swiper-wrapper">-->
                    <!--<div class="swiper-slide" :data-id="str.id" v-for="str in noticeList" @click="noctionEvtA(str.id)">-->
                        <!--{{str.annoTitle}}-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!-- 注释掉通知公告轮播,根据最近的用户需求不要了 start by:ty 2018-03-19 -->


            <div class="right">
                <!-- <div>
                    <i class="iconfont col icon-xiaoxi1" @click="proTpl('news')">
                        <span class="tip">
                            <sub class="num">{{newsNoticeData.total}}</sub>
                        </span>
                    </i>
                    <label>消息</label>
                </div> -->


                <!-- 不要通讯录 -->
                <!--<div @click="proTpl('agency')">-->
                    <!--<i class="iconfont col icon-daiban"></i>-->
                    <!--<label class="useroperation-text">通讯录</label>-->
                <!--</div>-->
                <!-- 加入'小工具' by:ty start -->
                <div @click="proTpl('favorites')">
                    <i class="iconfont col icon-fuwurenwu"></i>
                    <label class="useroperation-text">工具集</label>
                </div>
                <!-- 加入'小工具' by:ty end -->

                <div @click="proTpl('quit')">
                    <i class="iconfont col icon-tuichu"></i>
                    <label class="useroperation-text">退出</label>
                </div>
                <div @click="proTpl('users')">
                    <i class="iconfont col icon-renwujiaose"></i>
                    <label class="useroperation-text">{{userAccountZH}}</label>
                </div>
            </div>
        </div>
        <!--用户基本操作-->
        <div class="userNews" v-if="userPortal.users">
            <ul>
                <li @click="resetPwd">修改密码</li>
                <li>编辑资料</li>
            </ul>
        </div>
        <!--消息弹出框-->
        <!--  <div class="promptTip" v-if="userPortal.news">
             <em></em>
             <p>消息通知 <a @click="newsDetailPage(all,$event)">查看全部</a></p>
             <div v-if="newsNoticeData.data.length">
                 <ul class="newList">
                     <li v-for="(nd , i) in newsNoticeData.data" :class="[{'unread': nd.selectState}]" @mouseover="overEvt(nd)" @mouseout="outEvt(nd)">
                         <label @click="newsDetailPage(i,$event)">{{nd.title || nd.content}}</label>
                         <span class="right-text" :style="[{'display': (nd.selectState ? 'none':'inline-block'),'color': nd.statusStr === '紧急' ? 'red' :  nd.statusStr === '重要' ? '#ff7e15':'#999'}]">{{nd.statusStr}}</span>
                         <button class="right-text" :style="[{'display': (!nd.selectState ? 'none':'block')}]" @click="deleteIdEvt(nd.messageId)">忽略</button>
                    </li>
                 </ul>
                 <p class="p-button"><button @click="deleteAllEvt">全部忽略</button></p>
             </div>
             <div class="notContent" v-else>
                 <img src="../../../../static/images/notContent.png">
                 <p>您暂时没有消息</p>
             </div>
         </div> -->
        <newsNotice></newsNotice>
        <!--确认信息框-->
        <ConfirmTpl :confirm="confirmVisible" @confirmEle="confirmEvt" @cancelEle="cancelEvt"></ConfirmTpl>
    </div>

</template>

<!-- 注释掉通知公告轮播,根据最近的用户需求不要了 start by:ty 2018-03-19 -->
<!--<style lang="less">-->
    <!--@import './swiper.css';-->

    <!--.swiper-container {-->
        <!--width: 60%;-->
        <!--position: absolute;-->
        <!--margin-left: 25px;-->
        <!--.swiper-slide {-->
            <!--overflow: hidden;-->
            <!--white-space: nowrap;-->
            <!--text-overflow: ellipsis;-->
            <!--line-height: normal;-->
            <!--cursor: pointer;-->
        <!--}-->
    <!--}-->
<!--</style>-->
<!-- 注释掉通知公告轮播,根据最近的用户需求不要了 start by:ty 2018-03-19 -->

<style scoped lang="less">
    .userOperation {
        .useroperation-text {
            cursor: pointer;
        }
    }
</style>
<script>
//    import Swiper from 'swiper'
    import {mapGetters} from "vuex"
    import newsNotice from '../newsNotice.vue'
    import ConfirmTpl from '../common/ConfirmTpl.vue'
    import FavoritesToolsModal from '../favoritesTools/modalPage.js'


    export default{
        data() {
            return {
                userAccountZH: '我',
                confirmVisible: false, //是否展示弹出框
                userPortal: {
                    news: false,
                    users: false
                },
                noticeList: [],//通知公告展示的数据
                notContent: false,
                newDeleteId: 0 //删除的消息通知Id
            }
        },
        computed: mapGetters({
            newsNoticeData: 'noNoticeData',
            deleteAll: 'deleteAll', //全部忽略
            deleteId: 'deleteId',
            userVisible: 'userVisible',
            noticeFind: "noticeFindData",
            loginOutData: "loginOutData", /* 成功退出登录后返回的数据 */
        }),
        watch: {
            /**
             * 监听通知公告的数据
             */
            "noticeFind": function (val) {
                let that = this;
                if (val && val.data && val.data.length) {
                    that.noticeList = val.data;
                }

                /* 注释掉通知公告轮播，根据最新用户需求不要 ty 2018-03-19 */
                    //that.$nextTick(() => {
                    //    that.noticeCarousel();
                  //  });
                /* 注释掉通知公告轮播，根据最新用户需求不要 ty 2018-03-19 */
            },
            /*监听删除Id时，返回的值*/
            deleteId(val){
                let that = this;
                if (val.code === 1) {
                    that.getNotice();
                    this.$store.dispatch('promptShow', {reqDate: '忽略成功'});
                } else {
                    this.$store.dispatch('promptShow', {reqDate: '忽略失败'});
                }
            },
            /*监听忽略全部的信息*/
            deleteAll(val){
                let that = this;
                if (val.code === 1) {
                    that.getNotice();
                    this.$store.dispatch('promptShow', {reqDate: '忽略成功'});
                } else {
                    this.$store.dispatch('promptShow', {reqDate: '忽略失败'});
                }
            },

            loginOutData(val){
                let that = this;
                if(val){
                    //页面跳转到登录页面
                    that.$router.push({path:'/login'});
                }
            }
        },
        components: {
            newsNotice, ConfirmTpl,FavoritesToolsModal
        },
        methods: {
            /**
             * 操作栏的点击事件
             * @param ele 点击当前的按钮
             */
            proTpl(ele) {
                let that = this;
                that.userPortal = {
                    news: false,
                    users: false
                };
                switch (ele) {
                    case 'news':
                        that.userPortal.news = true;
                        break;
                    case 'users':
                        that.userPortal.users = true;
                        break;
                    case 'quit':
                        /*登出清除其他进程 by other*/
                        if (typeof nodeRequire !== 'undefined') {
                            nodeRequire('electron').ipcRenderer.send('logout');
                        }
                        /*退出登录*/
                        that.$store.dispatch('loginOutV2');
                        /*隐藏编辑组件*/
                        that.$store.dispatch('hideEditMaskFun');
                        /*隐藏增加组件按钮*/
                        that.$store.dispatch('hideAddComponentFun');
                        //关闭代办的全屏
                        that.$store.dispatch('resetScreen');
                        //打开首页
                        that.$store.dispatch('rightModelShow');
                        break;
                    case 'agency':
                        break;
                    case 'favorites':
                        that.showFavoritesModal(event|| window.event);
                        break;
                    default:
                        break;
                }
            },
            /**
             * 修改密码
             */
            resetPwd(){
                this.userPortal.users = false;
                this.$store.dispatch('showResetPwd');
            },
            /**
             *点击去消息通知页面
             * @param i
             */
            newsDetailPage(i, e){
                e.preventDefault();
                this.userPortal.news = false;
                this.$store.dispatch('rightModelHide');
                this.$store.dispatch('showNews');
                this.$store.dispatch('resetScreen');
                this.$store.dispatch('notAllowAssembly');
            },
            /**
             * 鼠标悬浮时的事件
             * @param evt
             */
            overEvt(el){
                el.selectState = true;
            },
            /**
             * 鼠标离开时的事件
             * @param el
             */
            outEvt(el){
                el.selectState = false;
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
                this.cancelEvt();
                let that = this;
                /*所有要删除的ID*/
                let reqData = '';
                let allData = that.newsNoticeData.data;
                /*获取所有要删除的ID*/
                if (allData) {
                    allData.map((item, i) => {
                        if ((i + 1) === allData.length) {
                            reqData += item.messageId;
                        } else {
                            reqData += (item.messageId + ',');
                        }
                    });
                }
                this.$store.dispatch('deleteIdNoticeData', {reqData: {messageId: reqData}});
            },
            /**
             * 根据ID忽略信息
             * @param id
             */
            deleteIdEvt(id){
                this.newDeleteId = id;
                this.$store.dispatch('deleteIdNoticeData', {reqData: {messageId: id}});
            },
            /**获取消息通知*/
            getNotice(){
                let reqData = {
                    page: 1,
                    rows: 15,
                    state: 0
                };
                this.$store.dispatch('getNewsNoticeData', {reqData});
            },
            /**
             * 通知公告轮播
             */
            noticeCarousel(){
                let that = this;

                let mySwiper = new Swiper('.swiper-container', {
                    autoplay: 3000,//可选选项，自动滑动
                    loop: true,//可选选项，开启循环
                    preventClicks: false,
                });
            },
            noctionEvtA(dataId){
                sessionStorage.setItem('noticeDetailsId', dataId);
                sessionStorage.setItem('currentReleaseScope', 1);
                /**田蓉 修改  为了兼容ie*/
                this.$router.push({path: '/index/noticeDetails'});
                //window.location.hash = '/noticeDetails';
            },

            /**
             * 显示常用工具集
             * @author ty
             * @dates 2018年03月12日10:51:38
             */
            showFavoritesModal(evt){
                let that = this;

                //打开弹窗
                let metaData = [
                    {
                        title: '天气预报',
                        href:'http://www.weather.com.cn/',
                        icon:'icon-tianqiyubao'
                    },
                    {
                        title: '航空时刻表',
                        href:'http://flight.qunar.com/status/alphlet_order.jsp',
                        icon:'icon-hangkongshikebiao'
                    },
                    {
                        title: '列车时刻表',
                        href:'http://train.qunar.com/chezhan/',
                        icon:'icon-liecheshikebiao'
                    },
                    {
                        title: '世界时间',
                        href:'http://tech.sina.com.cn/down/baishitong/shijian.html',
                        icon:'icon-shijieshijian'
                    },
                    {
                        title: '邮编区号',
                        href:'http://www.ip138.com/post/',
                        icon:'icon-youbianquhao'
                    },
                    {
                        title: '万年历',
                        href:'http://tools.2345.com/rili.htm',
                        icon:'icon-wannianli'
                    }
                ];
                //基点元素找到最外层的div

//                console.log(evt);

                let basePointElement = evt.target || evt.srcElement;

//                console.log(basePointElement);
//                console.log(basePointElement.tagName);

                let p = (basePointElement.tagName.toLowerCase() == 'i' || basePointElement.tagName.toLowerCase() == 'label')?
                    basePointElement.parentNode : basePointElement;

                FavoritesToolsModal.show({
                    basePointDom:p,
                    data:metaData,
                    closeEvt:function(data){

                        if(1){
                            //todo 关闭后是否干点啥？

                        }
                    },
                    onClickItem:function(href){
                        console.log(arguments);
//                        that.$router.replace({ path: '/index/smallTools'});
                        that.$router.push({ path: '/index/smallTools', query: { href: href }});
                    }
                });
            }
        },
        created() {
            let that = this;
            document.addEventListener('click', (e) => {
                if (!that.$el.contains(e.target)) {
                    that.userPortal = {
                        news: false,
                        users: false
                    };
                }
            });

//            不要通知公告的数据，就是用于轮播的那个数据
//            let reqData = {
//                flag: 1,
//                data: {
//                    page: 1,
//                    rows: 20
//                }
//            };
//            that.$store.dispatch('findNoticeData', {reqData})

            FavoritesToolsModal && FavoritesToolsModal.destroy({});
        }

    }

</script>