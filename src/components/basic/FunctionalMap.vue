/*********************************************************************
* 功能地图                                                           *
* Created by tr on 2017/7/27.                                        *
*********************************************************************/
<template>
    <div class="functionMapDiv" v-if="mapVisible">
        <div class="functionMap background-ff">
            <!--标题-->
            <div>
                <div class="col-xs-8 col-sm-8 col-md-6 height-25">
                    <!--标题内容-->
                    <p class="font-s24 font-cb height-25">{{mapTitle}}</p>
                    <!--搜索框-->
                    <div class="input-group">
                        <input type="text" class="form-control height-25" placeholder="输入业务名称" v-model="searchValue"
                               @input="search">
                        <span class="input-group-addon iconfont icon-sousuo font-s12"></span>
                    </div>
                </div>
                <!--视图切换-->
                <div class="col-xs-4 col-sm-4 col-md-6 height-25 tree-icon">
                    <label :class="isListTree ? 'select' : ''" @click="clickList(true)">
                        <div class="hex iconfont col icon-tubiaoxianshi"></div>
                        <span class="font-12">图标显示</span>
                    </label>
                    <label :class="isListTree ? '' : 'select'" @click="clickList(false)">
                        <div class="hex iconfont col icon-liebiaoxianshi"></div>
                        <span class="font-12">列表显示</span>
                    </label>
                </div>
            </div>
            <!--功能地图中图标显示数据-->
            <div v-if="functionMapData.length > 0 && !isList" class="mapList" @drop='drop($event)'
                 @dragover='allowDrop($event)'>
                <!--判断获取是否有数据-->
                <template v-for="(func ,i ) in functionMapData" v-if="func.children && func.children.length">
                    <!--显示对应的应用名-->
                    <p class="font-cb">{{func.appName}}</p>
                    <!--显示对应的图形-->
                    <ul class="row">
                        <!--循环显示对应的图形-->
                        <li v-for="(d , j) in func.children"
                            v-if="d.resType === 1 && (d.isMenuLeaf || d.menuLeaf)"
                            :title="d.resName"
                            class="col-xs-4 col-sm-2 col-md-1 text-center height-72"
                            :class="[d.styleId === 3 ?'hover':'',d.activeStatus === 0 ? 'customized':'']"
                            @click="skipUrl(d.accessUrl,d.resCode,func.accessToken,func.appCode,func.clientId)"
                            @dragstart='drag(d,$event)' :draggable='true'>

                            <div class="height-26 hex iconfont col " :class="d.icon">
                            </div>
                            <p class="font-s12 font-c6 margin-top-5 text-overflow-ellipsis">{{d.resName | intercept}}</p>
                        </li>
                    </ul>
                </template>
            </div>
            <!--功能地图中列表显示-->
            <div class="list" v-if="isList">
                <div class="left-tree">
                    <div ref="mainNode">
                        <ul class="tree-parent-list">
                            <TreeTpl v-for="item in mapTreeData" :dataItem="item"></TreeTpl>
                        </ul>
                    </div>
                </div>
                <div class="right-list">
                    <template v-if="mapTreeListData.length > 0">
                        <ul>
                            <li v-for="(d , i) in mapTreeListData">
                                <label>
                                    <div class="height-26 hex iconfont col " :class="d.icon"></div>
                                </label>
                                <label>
                                    <p class="font-c3 font-s12">{{d.resName}}</p>
                                    <p class="font-c9 font-s12">{{d.info}}</p>
                                </label>
                                <!--操作按钮-->
                                <label class="position-right" :class="d.activeStatus === 0 ? 'select': ''"
                                       @click="oneKeyClick(d)">{{d.activeStatus
                                    === 0 ? '取消':'一键'}}定制</label>
                            </li>
                        </ul>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import TreeTpl from '../addTree/TreeTpl.vue'
    import {mapGetters} from "vuex"
    export default{
        /**
         * @returns {{
         * isList: boolean 是否是列表展示,
         * isListTree: boolean 是否显示树形图,
         * }}
         */
        data(){
            return {
                isList: false,
                isListTree: true
            }
        },
        /**
         * @type {{
         * functionMapData: Object 地图的数据,
         * mapVisible: Object 隐藏或显示功能页面,
         * mapTitle: Object 功能里面的名称,
         * mapListData: Object 业务入口的数据对象,
         * userData:Object 返回用户信息的数据对象,
         * mapTreeData:Object 地图里面树形图的数据,
         * mapTreeListData:Object 根据条件来获取对应的数据,
         * }}
         */
        computed: mapGetters({
            functionMapData: 'functionMapData',
            mapVisible: 'mapVisible',
            mapTitle: 'mapTitle',
            mapListData: 'mapListData',
            userData: 'userData',
            mapTreeData: 'mapTreeData',
            mapTreeListData: 'mapTreeListData'
        }),
        components: {
            /*树形图的控件*/
            TreeTpl
        },
        methods: {
            /**
             * 搜索功能
             */
            search: function () {
                let funcMapData = this.functionMapData;
                funcMapData.map(item => {
                    let data = item.children;
                    data.map(res => {
                        /*‘styleId’为1，不是搜索值*/
                        res.styleId = 1;
                        let resName = res.resName;
                        /*判断是不是搜索的内容*/
                        if (resName.indexOf(this.searchValue) >= 0 && this.searchValue) {
                            /*‘styleId’为3，搜索值*/
                            res.styleId = 3;
                        }
                    });
                });
            },
            /**
             * 点击跳转路径
             * @param url 访问路劲
             * @param resCode
             * @param access_token
             * @param appCode
             * @param clientId
             */
            skipUrl: function (url, resCode, access_token, appCode, clientId) {
                let that = this;
                /*点击后先用socket给后台发一个请求*/
                let reqData = {
                    userId: that.userData.account,
                    appCode: appCode,
                    resCode: resCode,
                    clientId: clientId
                };
                that.$store.dispatch('resourceSocketIo', {reqData});

                /*判断路径是否有效，有效就跳入对应的页面，无效就给提示*/
                reqData = {
                    url: url,
                    data: ''
                };
                this.$store.dispatch('isGoToURL', {reqData});

            },
            /**
             * 开始拖动的事件
             * @param ele
             * @param event
             */
            drag: function (ele, event) {
                window.ele = '';
                window.dom = '';
                if (ele.activeStatus !== 0) {
                    window.ele = ele;
                    window.dom = event.currentTarget;
                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setData("Text", event.target.id);
                }
            },
            /**
             * 结束拖动，并且修改对应的状态
             * @param event
             */
            drop: function (event) {
                event.preventDefault();
                this.$store.dispatch('hidePopup');
                /*拖动的元素*/
                let reqData = window.ele;
                if (reqData) {
                    /*刷新右边的数据*/
                    let newData = {
                        func: this.functionMapData,
                        data: ''
                    };

                    /* activeStatus：1 为没有定制*/
                    reqData.activeStatus = 1;
                    /*判断是不是文件夹*/
                    if (reqData.resourceType === 2) {
                        /* resourceType：1 为应该，也不是功能包没有的数据*/
                        reqData.resourceType = 1;
                        /*parentId 功能包的父级ID*/
                        reqData.parentId = "";
                        if (!reqData.parentId) {
                            newData = {
                                func: this.functionMapData,
                                data: reqData
                            }
                        }
                    }
                    /*修改列表里面的数据*/
                    this.$store.dispatch('mapListDataManage', {reqData});

                    this.$store.dispatch('manageDataFunc', {newData});
                }

            },
            /**
             * 清除全局停止的事件
             * @param event
             */
            allowDrop: function (event) {
                event.preventDefault();
            },
            /**
             * 功能地图里显示的切换
             * @param isBool
             */
            clickList: function (isBool) {
                this.isList = !isBool;
                this.isListTree = isBool;
                if (!isBool) {
                    let reqData = {
                        userId: this.userData.account,
                        oauthClientId: '',
                        appCode: '',
                        resCode: ''
                    };
                    /*根据条件获取对应的列表数据*/
                    this.$store.dispatch('getTreeListData', {reqData})
                }
            },
            /**
             * 一键定制或者取消定制
             * @param ele
             */
            oneKeyClick: function (ele) {
                ele.activeStatus = ele.activeStatus * 1 ? 0 : 1;
                this.$store.dispatch('treeManage', {reqData: ele});
            }
        }

    }

</script>