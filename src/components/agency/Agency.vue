/*********************************************************************
* 代办事务的模板                                                    *
* Created by tr on 2017/6/27.                                       *
* Modified by ty on 2017/6/27.                                       *
*********************************************************************/
<template>
    <div id="agencyBox" ref="agencyBox" class="col-xs-8 col-md-8 col-lg-8 agencyBox">
        <!--标题-->
        <div class="row">
            <div class="agency-title">
                <!--编辑代办事务-->
                <editMask :refValue="ref"></editMask>
                <div class="col-xs-8 col-md-8 col-lg-8 agency-title-span">
                    <span class="title">待办事务</span>
                    <template v-if="backlogsTagsData.length" v-for="bt in backlogsTagsData">
                        <button @click="backlogTag(bt.clientId)" :class="{'active':curId === bt.clientId}">{{bt.clientName}}<span>({{bt.count}})</span></button>
                    </template>
                    <!-- <button>全部<span>(12)</span></button>
                    <button>营销系统<span>(6)</span></button>
                    <button>OA系统<span>(3)</span></button>
                    <button>生产系统<span>(3)</span></button> -->
                </div>
                <!--全屏按钮-->
                <div class="col-xs-4 col-md-4 col-lg-4 agency-title-span">
                    <div class="row">
                        <div class="col-xs-11 col-md-11 col-lg-11 full-screen agency-title-span">
                            <!--全屏图标-->
                            <span class="iconfont icon-shiyingpingmu font-s12"
                                  @click='maxingFullScreen'></span>
                        </div>
                    </div>
                </div>
            </div>
            <!--代办的列表数据-->
            <div class="agency-tab">
                <div class="col-xs-12 col-md-12 col-lg-12">
                    <div>
                        <!--代办列表-->
                        <!--table-singleline这个样式，控制单行显示 Modified by tangyue 2018年01月09日-->
                        <table class="table table-hover table-singleline">

                            <!--列表的头部-->
                            <thead>
                            <tr>
                                <th class="col-xs-3 col-md-3 col-lg-3 font-s12">任务描述</th>
                                <th class="col-xs-3 col-md-3 col-lg-3 font-s12">任务节点</th>
                                <th class="col-xs-2 col-md-2 col-lg-2 font-s12">发送时间</th>
                                <th class="col-xs-2 col-md-2 col-lg-2 font-s12">事项来源</th>
                                <th class="text-right col-xs-2 col-md-2 col-lg-2 font-s12">流程启动时间</th>
                            </tr>
                            </thead>
                            <!--列表的数据部分-->
                            <tbody v-if="backlogsData.data && backlogsData.data.length > 0">
                            <tr v-for="(b,i) in backlogsData.data" v-if="i < 8" @click="skipUrl(b.url)">
                                <td class="font-s12"><div class="table-cell">{{b.themeName}}</div></td>
                                <td class="font-s12"><div class="table-cell">{{b.backlogName}}</div></td>
                                <td class="font-s12"><div class="table-cell">{{ b.createTime }}</div></td>
                                <td class="font-s12"><div class="table-cell">
                                    <span class="font-s12 hex iconfont col icon-yemianxiangqing"></span>{{ b.form }}
                                </div></td>
                                <td class="text-right font-s12"><div class="table-cell">{{ b.duration}}</div></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import editMask from '../assembly/EditMask.vue'
    import {mapGetters, mapActions} from "vuex"
    export default{
        /**
         * @returns {{ref: string, tabStatus: boolean, isHidden: boolean}}
         */
        data() {
            return {
                ref: 'agencyBox',
                tabStatus: true,
                isHidden: false,
                curId:''
            }
        },
        /**
         * @type {{userData: Object, backlogsData: Object}}
         * userData 用户的基本信息
         * backlogsData 代办事务的数据
         */
        computed: mapGetters({
            userData: 'userData',
            backlogsData: 'backlogsData',
            backlogsTagsData: 'backlogsTagsData'
        }),
        /**
         * @define {{userData: function 监听用户的基本信息}}
         */
        watch: {
            userData(val) {
                let me = this;
                me.$nextTick(function () {
                    let reqData = {
                        url: {executorId: val.account},
                        parameter: {
                            page: 1,
                            rows: 8,
                            status: 1
                        }
                    };
                    me.$store.dispatch('getBacklogsData', {reqData});
                    reqData = {
                        userId:val.account
                    }
                     me.$store.dispatch('getBacklogsTagData', {reqData});
                });
                me.$nextTick(function () {
                    let reqData = {executorId: val.account};
                    /*todo*/
                    //this.$store.dispatch('getSocketIo', {reqData});
                });

            },
        },
        components: {
            editMask
        },
        /**
         * @define {{
         * skipUrl: function 跳转页面方法,
         * tabToggle: function 获取代办事务里面的数据,
         * maxingFullScreen: function 打开全屏方法，并获取20的数据,
         * search: function 搜索方法
         * }}
         */
        methods: {
            backlogTag: function(clientId){
                this.curId = clientId;
                let reqData = {
                    url: {executorId: this.userData.account},
                    parameter: {
                        clientId: clientId,
                        page: 1,
                        rows: 8,
                        status: this.isHidden ? 0 : 1
                    }
                };
                this.$store.dispatch('getBacklogsData', {reqData});
            },
            skipUrl: function (url) {
                let reqData = {
                    url: url,
                    data: ''
                };
                this.$store.dispatch('isGoToURL', {reqData});
            },
            tabToggle: function (status) {
                this.isHidden = status ? false : true;
                let reqData = {
                    url: {executorId: this.userData.account},
                    parameter: {
                        keyWord: this.inputSearch || '',
                        page: 1,
                        rows: 8,
                        status: status ? 1 : 0
                    }
                };
                this.$store.dispatch('getBacklogsData', {reqData});
            },
            maxingFullScreen: function () {
                let that = this;
                that.$store.dispatch('maxingFullScreen');
                that.$store.dispatch('rightModelHide');
                that.$store.dispatch('hideUserVisible');

                let reqData = {
                    url: {executorId: that.userData.account},
                    parameter: {
                        page: 1,
                        rows: 20,
                        status: 1
                    }
                };
                that.$store.dispatch('getBacklogsData', {reqData});
                reqData = {
                    executorId: that.userData.account,
                };
                that.$store.dispatch('getClientsData', {reqData});
            },
        },
    }

</script>