/*********************************************************************
* 用户基本信息                                                       *
* Created by tr on 2017/7/27.                                        *
*********************************************************************/
<template>
    <div>
        <div class="row container-fluid businessPortal">
            <!--用户基本信息-->
            <nav class="navbar" style="display:none;">
                <div>
                    <div class="collapse navbar-collapse">
                        <ul class="nav navbar-nav">
                            <!--常用的业务-->
                            <!--<li class="col-xs-12 col-sm-12 col-md-12 padding0">-->
                                <!--<p class="font-s12 font-c9 col-xs-12 col-sm-12 col-md-12">常用业务:</p>-->
                                <!--<div class="row common-business">-->
                                    <!--<template v-if="clicksData.length > 0">-->
                                        <!--<div v-for="(func,i) in clicksData"-->
                                             <!--class="col-xs-4 col-sm-4 col-md-4 text-center"-->
                                             <!--v-if="i < 3" @click="skipClickUrl(func.accessUrl)">-->
                                            <!--<div class="hex iconfont col icon-yemianxiangqing" :id="func.appCode"-->
                                                 <!--:move="checkMove">-->
                                            <!--</div>-->
                                            <!--<p class="font-s12 font-c6">{{func.resName}}</p>-->
                                        <!--</div>-->
                                    <!--</template>-->
                                <!--</div>-->
                            <!--</li>-->
                        </ul>
                    </div>
                </div>
            </nav>
            <!--业务入口-->
            <div class="entry" :class="isShow ? 'entryB' : 'entryA'">
                <div class="entry-wrapper">
                    <div class="entry-main-content">
                        <p class="font-s12 font-c9 col-xs-12 col-sm-12 col-md-12 height-25">业务入口</p>
                        <!--展示定制成功后的功能信息-->
                        <ul class="col-xs-12 col-sm-12 col-md-12 margin-top-10 mapList">
                            <li class="entry-ul-first" @drop='drop("",$event)'
                                @dragover='allowDrop($event)'></li>
                            <!--判断是定制还是功能地图，定制业务是可以拖动的。-->
                            <template v-if="list.length > 0">
                                <template v-if="isShow">
                                    <draggable :list="list" :move="getData" @update="datadragEnd" @end="onEnd" @start="onStart"
                                               :options="{animation: 1000,handle:'.dargDiv'}">
                                        <li v-for="fun in list" v-if="fun.activeStatus === 0"
                                            :class="[fun.styleId === 3 ? 'hover' :'',fun.children && !fun.children.length ? 'funcHover':'']"
                                            :title="fun.resName"
                                            class="col-xs-4 col-sm-4 col-md-4 text-center height-72 function list-complete-item dargDiv margin-top-5"
                                            @dragstart='drag(fun,$event)'
                                            @click="skipUrl(fun)">
                                            <!--判断是否是文件夹-->
                                            <div :class="fun.resourceType === 2 && fun.children && fun.children.length > 0 ? 'func-file' : ''">
                                                <!--是文件夹，把数据循环出来-->
                                                <template v-if="fun.children && fun.children.length > 0">
                                                    <div v-for="cl in fun.children" class="hex iconfont col"
                                                         :id="cl.index" :class="cl.icon">
                                                    </div>
                                                </template>
                                                <!--单功能的展示-->
                                                <template v-else>
                                                    <div class="height-42 hex iconfont col" :id="fun.index"
                                                         :class="fun.icon">
                                                    </div>
                                                </template>
                                            </div>
                                            <p class="font-s12 font-c6 margin-top-5 text-overflow-ellipsis">{{ (fun.resourceType === 2 && fun.children
                                                ? fun.packageName : fun.resName) |intercept }}</p>
                                        </li>
                                    </draggable>
                                </template>
                                <!--不能拖动-->
                                <template v-else>
                                    <li v-for="fun in list" v-if="fun.activeStatus === 0"
                                        :class="[fun.styleId === 3 ? 'hover' :'',fun.children && !fun.children.length ? 'funcHover':'']"
                                        :title="fun.resName"
                                        class="col-xs-4 col-sm-4 col-md-4 text-center height-72 function list-complete-item dargDiv margin-top-5"
                                        @dragstart='drag(fun,$event)'
                                        @click="skipUrl(fun)">
                                        <!--判断是否是文件夹-->
                                        <div :class="(fun.resourceType === 2 && fun.children.length > 0) ? 'func-file' : ''">
                                            <!--是文件夹，把数据循环出来-->
                                            <template v-if="fun.children && fun.children.length > 0">
                                                <div v-for="cl in fun.children" class="hex iconfont col"
                                                     :id="cl.index" :class="cl.icon">
                                                </div>
                                            </template>
                                            <!--单元素-->
                                            <template v-else>
                                                <div class="height-42 hex iconfont col" :id="fun.index"
                                                     :class="fun.icon">
                                                </div>
                                            </template>
                                        </div>
                                        <p class="font-s12 font-c6 margin-top-5 text-overflow-ellipsis">{{ (fun.resourceType === 2 && fun.children ?
                                            fun.packageName : fun.resName) |
                                        intercept}}</p>
                                    </li>
                                </template>
                            </template>
                        </ul>
                        <!--新增功能报页面-->
                        <template v-if="isShow && popupVisible">
                            <div class="popup">
                                <div>
                                    <p>是否需要创建功能包?</p>
                                    <p>
                                        <label>文件名：</label>
                                        <input type="text" v-model="packageName" placeholder="请输入文件名" maxlength="8">
                                    </p>
                                    <button type="button" @click="confirm">确认</button>
                                    <button @click="cancel">取消</button>
                                </div>
                            </div>
                        </template>
                        <!--功能包展示页面-->
                        <template v-if="isFolder">
                            <div class="showFolder">
                                <template v-if="isShow">
                                    <div class="input-group">
                                        <input type="text" class="form-control height-25" placeholder="报装功能包"
                                               v-model="packageEle" maxlength="8"
                                               @input="packageN">
                                        <span class="input-group-addon iconfont icon-bianjiziliao font-s12"></span>
                                    </div>
                                    <ul v-if="currentChildList">

                                        <draggable :list="currentChildList.children" :move="folderMove" @update="" @end=""
                                                   @start="" :options="{animation: 1000,handle:'.dargDiv'}">
                                            <li v-for="fun in currentChildList.children" v-if="fun.activeStatus === 0"
                                                :title="fun.resName"
                                                class="col-xs-4 col-sm-4 col-md-4 text-center height-72 function list-complete-item dargDiv margin-top-5"
                                                @dragstart='drag(fun,$event)'
                                                @click="skipUrl(fun)">
                                                <!--单功能的展示-->
                                                <div class="height-42 hex iconfont col" :id="fun.index"
                                                     :class="fun.icon">
                                                </div>
                                                <p class="font-s12 font-c6 margin-top-5 text-overflow-ellipsis">{{ fun.resName |
                                                intercept}}</p>
                                            </li>
                                        </draggable>
                                    </ul>
                                </template>
                                <!--不能拖动-->
                                <template v-else>
                                    <div class="input-group">
                                        <input type="text" class="form-control height-25" placeholder="报装功能包"
                                               v-model="packageEle"
                                               @input="packageN" readonly="readonly">
                                        <span class="input-group-addon iconfont icon-bianjiziliao font-s12"></span>
                                    </div>
                                    <ul v-if="currentChildList">
                                        <li v-for="fun in currentChildList.children" v-if="fun.activeStatus === 0"
                                            :title="fun.resName"
                                            class="col-xs-4 col-sm-4 col-md-4 text-center height-72 function list-complete-item dargDiv margin-top-5"
                                            @dragstart='drag(fun,$event)'
                                            @click="skipUrl(fun)">
                                            <!--单功能的展示-->
                                            <div class="height-42 hex iconfont col" :id="fun.index"
                                                 :class="fun.icon">
                                            </div>
                                            <p class="font-s12 font-c6 margin-top-5 text-overflow-ellipsis">{{ fun.resName |
                                            intercept}}</p>
                                        </li>
                                    </ul>
                                </template>
                            </div>
                        </template>
                    </div>
                </div>


                <div class="mock-login-4-softDept-wrapper" v-if="isMockLoginAreaShow && !isShow">
                <!--<div class="mock-login-4-softDept-wrapper" v-if=0>-->
                    <div class="main-content">
                        <MockLogin></MockLogin>
                    </div>
                </div>
            </div>

            <!--业务定制和功能地图的切换-->
            <div class="footer">
                <div class="container col-xs-12 col-sm-12 col-md-12">
                    <div class="row text-center">
                        <div class="col-xs-6 col-sm-6 col-md-6 "
                             :class="mapValue.isCls ? 'background-c4':'background-cF'" id="custom"
                             @click="funcMap('custom',$event)">
                            <span class="iconfont font-s12" :class="mapValue.cls"></span>
                            {{mapValue.value}}
                        </div>
                        <div class="col-xs-6 col-sm-6 col-md-6"
                             ref="funcBtn"
                             :class="componentValue.isCls ? 'background-c4':'background-cF'" id="func"
                             @click="funcMap('func',$event)">
                            <span class="iconfont font-s12" :class="componentValue.cls"></span>
                            {{componentValue.value}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from "vuex"
    import sortable from 'sortablejs'
    import draggable from 'vuedraggable'
    import MockLogin from '../mocklogin/MockLogin.vue'

    export default{
        /**
         * @returns {{
         * mapShowBtu: boolean 是否显示定制功能按钮,
         * businessBool: boolean 是否显示定制主件按钮,
         * isShow: boolean 是否显示功能地图页面,
         * reqDataStr: Array 处理功能地图的数据,
         * saveReqData: Array 保存定制功能的数据,
         * list: Array 显示功能的数据,
         * seconds: number 鼠标停留的时间,
         * draggedContext: object 拖动元素的数据,
         * relatedContext: object 被放元素的数据,
         * isDragged: boolean 是否在拖动,
         * isPopup: boolean 是否显示功能包,
         * mapValue: Array 定制功能按钮的值,
         * componentValue: Array 定制组件按钮的值,
         * isFolder: boolean 是否打开显示文件名里面的内容,
         * currentChildList: Array 当前选择中的文件夹
         * }}
         */
        data() {
            return {
                urlPath:"",
                mapShowBtu: true,
                businessBool: true,
                searchValue: '',
                isShow: false,
                reqDataStr: [],
                saveReqData: [],
                list: [],
                seconds: 0,
                draggedContext: {},
                relatedContext: {},
                isDragged: true,
                isPopup: false,
                isMockLoginAreaShow:true,
                mapValue: {
                    isCls: false,
                    cls: "icon-yewudingzhi",
                    value: '功能地图'
                },
                componentValue: {
                    isCls: false,
                    cls: 'icon-gongnengditu',
                    value: '组件定制'
                },
                isFolder: false,
                currentChildList: {},
                /*修改功能包的值*/
                packageEle: ""
            }
        },
        /**
         * @type {{
         * userData: Object 返回用户信息的数据对象,
         * funcData: Object 返回定制业务的对象,
         * functionMapData: Object 个人项目角色类型数组,
         * mapListData: Object 业务入口的数据对象,
         * custom:Object 保存定制业务,返回是否成功的数据,
         * clicksData:Object 常用业务的数据,
         * packageData:Object 功能包的数据,
         * componentListData:Object 获取初始化的数据
         * }}
         */
        computed: mapGetters({
            userData: 'userData',
            funcData: 'funcData',
            functionMapData: 'functionMapData',
            mapListData: 'mapListData',
            custom: 'custom',
            clicksData: 'clicksData',
            packageData: 'packageData',
            componentListData: 'componentListData',
            popupVisible: 'popupVisible'
        }),
        /**
         * @type {{
         * userData: Function ,
         * packageData: Function,
         * mapListData: Function,
         * reqDataStr: Function,
         * custom: Function
         * }}
         */
        watch: {
            urlPath(val){// eg: val值为'/index','/index/1' 或者'/addressbookfull'类似的格式
                debugger
                let that = this;
                let arrPaths = val.split("/");//['','index'],['','index','1'], ['', 'addressbookfull'] , ['','aaa', 'bbb']
                if(arrPaths.length > 1){
                    if(arrPaths[1] === 'index'){
                        let type = arrPaths[2];
                        //1と2に限り,今は undefined もある
                        if(type && type == 2){//2：indexページがフーページから入る
                            that.dispatchClick();
                        }else if(type && type == 1){//1：普通のindexページ

                        }else{//undefined の場合
                             /**田蓉 修改  为了兼容ie*/
                            //this.$router.push({path:'/index/1'});

                             /* 现在直接跳转到index，因为我想取消掉 通过1/2区分全屏非全屏的页面模式 */
                            this.$router.push({path:'/index'});
                            //location.hash = "/index/1";
                        }

                    }else{//フーページ

                    }
                }
            },
            userData(val) {
                let me = this;
                me.$store.dispatch('loadingShow');
                me.$nextTick(function () { //获取业务定制里面的数据
                    let reqData = {
                        url: 'FUNC',
                        data: {
                            userId: val.account
                        }
                    };
                    me.$store.dispatch('getFuncData', {reqData});
                });
                me.$nextTick(function () {
                    let reqData = "";
                    me.$store.dispatch('getOrgInfo', {reqData});
                });

                /*获取常用的定制信息*/
                me.$nextTick(function () {
                    let reqData = {
                        data: {
                            num: 3
                        },
                        url: {
                            userId: val.account
                        }
                    };
                    me.$store.dispatch('getClicksData', {reqData});
                });

                /*获取系统通知消息*/
                me.$nextTick(() => {
                    let reqData = {
                        page: 1,
                        rows: 15,
                        state: 0
                    };
                    me.$store.dispatch('getNewsNoticeData',{reqData});
                });
            },
            packageData(val){
                // this.isPopup = false;
                this.$store.dispatch('hidePopup');
            },
            mapListData(val){
                for (let unfix = val.length - 1; unfix > 0; unfix--) {
                    /*给进度做个记录，比到未确定位置*/
                    for (let i = 0; i < unfix; i++) {
                        if (val[i].index > val[i + 1].index) {
                            let temp = val[i];
                            val.splice(i, 1, val[i + 1]);
                            val.splice(i + 1, 1, temp);
                        }
                    }
                }
                this.list = val;
            },
            reqDataStr(curVal, oldVal){
                let that = this;
                that.saveReqData = [];
                if (curVal) {
                    curVal.map(data => {
                        let funcData = data.children;
                        if (funcData && funcData.length) {
                            funcData.map(da => {
                                //删除自定义的styleId;
                                delete da.styleId;
                                //删除自定义的icon;
                                delete da.icon;
                                that.saveReqData.push(da);
                            });
                        }
                    });
                }
            },
            custom(val){
                this.$store.dispatch('loadingShow');
                if (val.code * 1 === 1) {
                    document.getElementsByClassName('navbar')[0].style = " display: block;";
                    this.$store.dispatch('mapHide');
                    this.$store.dispatch('rightModelShow');

                    let reqData = {
                        url: 'FUNC',
                        data: {
                            userId: this.userData.account
                        }
                    };
                    this.$store.dispatch('getFuncData', {reqData});
                    this.businessBool = true;
                    this.mapShowBtu = true;
                    this.mapValue = {
                        isCls: false,
                        cls: "icon-yewudingzhi",
                        value: '功能地图'
                    };
                    this.componentValue = {
                        isCls: false,
                        cls: 'icon-zujiandingzhi',
                        value: '组件定制'
                    };
                }
            },
            /*判断功能包是否打开*/
            isFolder(val){
                let that = this;
                /*滚动鼠标功能包事件*/
                $(document).on('click scroll', function (evt) {
                    let $tar = $(evt.target);
                    if ($tar.parents('div.func-file').length <= 0 &&
                        $tar.parents('div.showFolder').length <= 0 &&
                        !$tar.hasClass('showFolder') &&
                        !$tar.hasClass('func-file') &&
                        $tar.parents('func-file').length <= 0) {
                        if (val) {
                            that.isFolder = false;
                        }
                    } else {
                        that.isFolder = true;
                    }
                });

            },
        },
        components: {
            draggable,MockLogin
        },
        methods: {
            /**
             * 搜索的事件
             * @param e
             */
            search: function (e) {
                let funcMapData = this.list;
                funcMapData.map(item => {
                    /*‘styleId’为1，不是搜索值*/
                    item.styleId = 1;
                    let resName = item.resName;
                    /*判断是不是搜索的内容*/
                    if (resName.indexOf(this.searchValue) >= 0 && this.searchValue) {
                        /*‘styleId’为3，搜索值*/
                        item.styleId = 3;
                    }
                });
            },
            /**
             * 退出登录
             */
            loginOut(){
                /*登出清除其他进程 by other*/
                if (typeof nodeRequire !== 'undefined') {
                    nodeRequire('electron').ipcRenderer.send('logout');
                }
                /*退出登录*/
                this.$store.dispatch('loginOut');
                /*隐藏编辑组件*/
                this.$store.dispatch('hideEditMaskFun');
                /*隐藏增加组件按钮*/
                this.$store.dispatch('hideAddComponentFun');
                //关闭代办的全屏
                this.$store.dispatch('resetScreen');
                //打开首页
                this.$store.dispatch('rightModelShow');
            },
            /**
             * 常用业务的跳转对应的页面
             * @param url
             */
            skipClickUrl(url){
                let reqData = {
                    url: url,
                    data: ''
                };
                /*跳转前先ajax进行一次验证*/
                this.$store.dispatch('isGoToURL', {reqData});
            },
            /**
             * 跳转到对应的页面
             * @param fun
             */
            skipUrl: function (fun) {
                let that = this;
                //点击是判断是不是功能包
                if (fun.children && fun.children.length) {
                    that.isFolder = true;
                    that.currentChildList = fun;
                    that.packageEle = fun.packageName;
                } else {
                    let reqData = {
                        userId: that.userData.account,
                        appCode: fun.appCode,
                        resCode: fun.resCode,
                        clientId: fun.clientId
                    };
                    /*点击是给后台推送消息*/
                    that.$store.dispatch('resourceSocketIo', {reqData});
                    reqData = {
                        url: fun.accessUrl,
                        data: ''
                    };
                    /*跳转前先ajax进行一次验证*/
                    this.$store.dispatch('isGoToURL', {reqData});
                }

            },
            /**
             * 元素拖动中
             * @param evt
             * @returns {boolean}
             */
            getData: function (evt) {
                /*获取被放的元素的对象值*/
                let relatedCon = evt.relatedContext.element,
                        /*获取拖动的元素*/
                    draggedCon = evt.draggedContext.element;
                /*拖动是用的时间*/
                let getSeconds = new Date().getSeconds(),
                    that = this;
                if (draggedCon.children && draggedCon.children.length) {
                    return true;
                } else {
                    if (getSeconds - this.seconds > 1) {
                        return true;
                    } else {
                        that.relatedContext = relatedCon;
                        that.draggedContext = draggedCon;
                        return false;
                    }
                }
            },
            /**
             * 开始拖动事件
             */
            onStart: function () {
                this.seconds = new Date().getSeconds();
            },
            /**
             * 结束拖动事件
             * @param evt
             */
            onEnd: function (evt) {
                let that = this;
                /*获取被放的元素的对象值*/
                let element = that.relatedContext;
                /*判断是否有文件夹*/
                if (that.popupVisible || element.resourceType) {
                    /*判断放入的是不是文件夹，2为文件夹*/
                    if (element.resourceType === 2) {
                        let index = -1,
                            num = 0;
                        that.list.map(data => {
                            index++;
                            if (data === element) {
                                that.draggedContext.resourceType = 2;
                                that.draggedContext.parentId = data.customizationId;
                                that.draggedContext.index = data.children.length + 1;
                                data.children.push(that.draggedContext);
                            }
                            if (data === that.draggedContext) {
                                num = index;
                            }
                        });
                        if (num > -1) {
                            that.list.splice(num, 1);
                        }
                        that.relatedContext = '';
                        that.draggedContext = '';
                    } else {
                        that.$store.dispatch('showPopup');
                    }

                }

            },
            /**
             * 新增功能包
             */
            confirm(){
                let that = this;
                that.relatedContext.resourceType = 2;
                that.relatedContext.index = 1;
                that.relatedContext.packageName = that.packageName || '功能包';
                that.draggedContext.resourceType = 2;
                that.draggedContext.index = 2;
                that.draggedContext.parentId = that.relatedContext.customizationId;
                that.getList();
                this.$store.dispatch('hidePopup');
                that.relatedContext = '';
                that.draggedContext = '';
            },
            /**
             * 修改对应文件名的名字
             */
            packageN(){
                let that = this;
                that.currentChildList.packageName = that.packageEle || '功能包';
            },
            /**
             * 关闭新增功能包的页面
             */
            cancel(){
                this.relatedContext = '';
                this.draggedContext = '';
                this.$store.dispatch('hidePopup');
            },
            /**
             * 拖动完成后事件
             * @param evt
             */
            datadragEnd: function (evt) {
                let that = this;
                that.isDragged = false;
                let newList = [];
                that.list.map(data => {
                    if (data.activeStatus === 0) {
                        newList.push(data);
                    }
                });

                for (let i = 0; i < newList.length; i++) {
                    newList[i].index = i;
                }
                that.list = newList;
            },
            /**
             * 业务定制和功能地图的事件
             */
            funcMap: function (ele, event) {
                let that = this;
                this.$store.dispatch('hideNews');
                this.$store.dispatch('notAllowAssembly');
                this.$store.dispatch('resetScreen');
                document.getElementsByClassName('navbar')[0].style = " display: block;";
                this.isShow = false;
                /*判断是功能地图，还是定制业务*/
                if (ele === 'func') {//点击了按钮：组件定制 或 定制完成
                    /*首先判断是否为全屏页面，是则跳到首页*/
                    let isFullPage = that.isFullpage();

                    if(isFullPage){
                        this.jumpToIndexPage();
                        return;
                    }else{

                    }

                    this.mapValue = {
                        isCls: false,
                        cls: "icon-yewudingzhi",
                        value: '功能地图'
                    };
                    this.componentValue = {
                        isCls: false,
                        cls: "icon-zujiandingzhi",
                        value: '组件定制'
                    };
                    /*判断按钮是不是取消定制*/
                    if (this.mapShowBtu === 3) {
                        let reqData = {
                            url: 'FUNC',
                            data: {
                                userId: this.userData.account
                            }
                        };
                        this.$store.dispatch('getFuncData', {reqData});
                        this.$store.dispatch('mapHide');
                        this.$store.dispatch('rightModelShow');
                        this.mapShowBtu = true;
                        this.businessBool = true;
                        /*显示全屏页面(若为全屏页面)*/
                        this.hideFullpage(false);
                        return;
                    }
                    /*显示功能地图的数据*/
                    if (this.mapShowBtu) {
                        this.componentValue = {
                            isCls: true,
                            cls: "icon-queren",
                            value: '定制完成'
                        };

                        //编辑和新增定制组件
                        this.$store.dispatch('showEditMaskFun');
                        this.$store.dispatch('showAddComponentFun');
                        this.$store.dispatch('allowAssembly');

                        this.mapShowBtu = false;
                        /*退出功能地图数据*/
                    } else {//mapShowBtu 为false时，是点击的'定制完成'按钮
                        this.mapShowBtu = true;
                        this.$store.dispatch('hideEditMaskFun');
                        this.$store.dispatch('hideAddComponentFun');
                        this._resetIndexPageHash();

                    }
                } else {//custom
                    this.$store.dispatch('hideEditMaskFun');
                    this.$store.dispatch('hideAddComponentFun');

                    this.mapValue = {
                        isCls: false,
                        cls: "icon-yewudingzhi",
                        value: '功能地图'
                    };
                    this.componentValue = {
                        isCls: false,
                        cls: "icon-quxiao",
                        value: '取消定制'
                    };
                    /*显示业务定制的数据*/
                    if (this.businessBool) {
                        let reqData = {
                            url: 'FUNC',
                            data: {
                                userId: this.userData.account
                            }
                        };
                        this.isShow = true;
                        this.reqDataStr = this.functionMapData;
                        /*获取定制业务的数据*/
                        this.$store.dispatch('getFuncData', {reqData});
                        /*获取功能地图的数据*/
                        this.$store.dispatch('customTitleName');
                        /*显示功能地图的事件*/
                        this.$store.dispatch('mapShow');
                        /*基本功能隐藏*/
                        this.$store.dispatch('rightModelHide');
                        this.mapValue = {
                            isCls: true,
                            cls: "icon-queren",
                            value: '定制完成'
                        };
                        /*获取列表数据里面的树形图*/
                        reqData = {};
                        this.$store.dispatch('getTreeData', {reqData});
                        document.getElementsByClassName('navbar')[0].style = "display:none";
                        this.businessBool = false;
                        this.mapShowBtu = 3;
                        /*保存定制页面，成功后返回首页，失败就在本页面*/
                        /*隐藏全屏页面(若为全屏页面)*/
                        this.hideFullpage(true);
                    } else {
                        document.getElementsByClassName('navbar')[0].style = "display:none";
                        let reqData = this.cusData();
                        reqData = JSON.stringify({"customizationList": reqData});
                        this.$store.dispatch('addCustomEle', {reqData});
                        this.$store.dispatch('loadingShow');
                        this.$store.dispatch('mapHide');
                        this.$store.dispatch('rightModelShow');
                        /*显示全屏页面(若为全屏页面)*/
                        this.hideFullpage(false);
                    }
                }
            },
            /**
             * 处理定制后的数据
             * @returns {Array} 返回处理后的数据
             */
            cusData(){
                /*定制的列表数据*/
                let cusDataList = [];
                /*排序*/
                let sum = 0;
                this.list.map(data => {
                    let child = data.children;
                    if (child && child.length) {
                        let num = 0;
                        child.map(item => {
                            if (data.customizationId === item.customizationId) {
                                item.packageName = data.packageName;
                                /* todo 现在这里不加功能包的排序 */
                                /*item.packageIndex = ++num;*/
                            }
                            if (++num === 1) {
                                item.index = ++sum;
                            } else {
                                item.index = num;
                            }
                            cusDataList.push(item);
                        });
                    } else {
                        data.index = ++sum;
                        cusDataList.push(data);
                    }
                });
                return cusDataList;
            },
            /**
             * 开始拖动事件
             * @param ele
             * @param event
             */
            drag: function (ele, event) {
                this.$store.dispatch('hidePopup');
                /*判断是不是定制功能*/
                if (this.mapShowBtu) {
                    /*判断是不是功能包，是功能包就不允许拖动到右边*/
                    window.ele = '';
                    window.dom = '';
                    if (!ele.children || !ele.children.length) {
                        window.ele = ele;
                        window.dom = event.currentTarget;
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("Text", event.target.id);
                    }
                }
            },
            /**
             * 拖动停止的事件
             * @param ele
             * @param event
             */
            drop: function (ele, event) {
                event.preventDefault();
                let reqData = window.ele;
                if (reqData) {
                    reqData.activeStatus = 0;
                    /*parentId 功能包的父级ID*/
                    reqData.parentId = "";
                    reqData.children = [];
                    this.$store.dispatch('mapListDataManage', {reqData});
                    let index = 0;
                    this.list.map(data => {
                        if (data.activeStatus === 0) {
                            index++;
                        }
                    });

                    if (index <= 0) {
                        reqData.index = 0;
                    } else {
                        reqData.index = this.list[--index].index * 1 + 1;
                    }
                    let newEle = '';
                    /*判断是不是文件夹，2为文件夹*/
                    if (reqData.resourceType === 2) {
                        reqData.resourceType = 1;
                        if (!reqData.parentId) {
                            newEle = reqData;
                            this.getCurrentChildList(newEle);
                        }
                    }
                    this.getList(newEle);
                }
            },
            /**
             * 获取当前子集列表数据
             * @param ele
             */
            getCurrentChildList(ele){
                let currentChild = [];
                if (this.currentChildList && this.currentChildList.children) {
                    this.currentChildList.children.map(data => {
                        if (data !== ele) {
                            currentChild.push(data);
                        }
                    });
                    this.currentChildList.children = currentChild;
                }
            },
            /**
             * 清除事件的本事方法
             * @param event
             */
            allowDrop: function (event) {
                event.preventDefault();
            },
            /**
             * 获取到业务入口文件
             * @param data
             */
            getList(data){
                let newData = {
                    func: this.functionMapData,
                    data: data
                };
                this.$store.dispatch('manageDataFunc', {newData});
            },
            /**
             * 修改密码
             */
            resetPwd(){
                this.$store.dispatch('showResetPwd');
            },

            /**
             * @param: {Boolean} flag true-隐藏|false-显示
             * 隐藏全屏页面(若当前确实为全屏页面,全屏页面的模块：通讯录和通知公告)
             */
            hideFullpage(flag){
                let that = this;
                let originalPath = that.$route.path;//'/index','/aaa/bbb'

                if(!originalPath){return;}
                let path = originalPath.split("/")[1];
                let isFullpage = !(path == 'login'|| path == 'index');

                if(isFullpage){
                    let parents = that.$parent;
                    let siblings = parents.$children;

                    siblings.forEach(it=>{
                        let name = it.$options.name;
                        if(name){
                            let instance = it;
                            instance.hideFullpage(flag);
                        }
                    })
                }
            },

            /**
             * 判断当前网页是否为全屏页面
             */
            isFullpage(){
                let that = this;
                let originalPath = that.$route.path; // '/index'、'/aaa/bb'此类的格式
                if(!originalPath){return;}
                let path = originalPath.split("/")[1];
                let isFullpage = !(path == 'login'|| path == 'index');
                return isFullpage;
            },

            jumpToIndexPage(){
                let that = this;
                let isFullpage = that.isFullpage();

                if(isFullpage){
                    let parent = that.$parent;
                    let name = parent.$options.name;
                    if(name === 'index.vue'){
                        /**田蓉 修改  为了兼容ie*/
                        this.$router.push({path:'/index/2'});
                        //window.location.hash = "/index/2";
                    }
                }
            },

            dispatchClick(){
                let that = this;
                let clickevent = document.createEvent('MouseEvent');
                clickevent.initEvent("click",true,true);

                that.$refs.funcBtn.dispatchEvent(clickevent);
            },

            _resetIndexPageHash(){
                let that = this;
                let originalPath = that.$route.path;//'/index','/aaa/bbb'
                if(!originalPath){return;}
                let path = originalPath.substring(0,8);

                if(path && path === '/index/2'){
                    /**田蓉 修改  为了兼容ie*/
                    this.$router.push({path:'/index/1'});
                    //location.hash = '#/index/1';
                }
            }
        },
        created(){
            let that =this;
            let path = that.$route.path;
            that.urlPath = path;
        }
    }

</script>
