<template>
    <div class="fullpage-main" v-if="isFullpageShow">
        <div>
            <!--用户的操作按钮-->
            <userOperation></userOperation>
        </div>

        <!--所有右边的数据模块-->
        <div ref="noticeFull" class="row inner-main">
            <div class="inner-inner-main noticeFull">
                <div class="notice-title">
                    <p>通知公告</p>
                    <div class="toolbar-right" @click="closeFull">
                        <span class="iconfont icon-shiyingpingmu font-s12 addressbook-right-icon"></span>
                    </div>
                    <button class="toolbar-right noticeManage" @click="showNoticeManage">公告管理</button>
                </div>
                <Notice :noticeList="noticeList" :noticeStyle="noticeStyle"></Notice>

            </div>
        </div>
    </div>
</template>
<script>
    import userOperation from '../basic/userOperation.vue'
    import Notice from './Notice.vue'
    import Pagination from '../Pagination.vue'

    import {mapGetters} from "vuex"

    export default {
        name:'NoticeFull.vue',
        components: {
            userOperation, Notice, Pagination
        },
        data() {
            return {
                isFullpageShow:true,
                noticeStyle:{
                    isFull:true
                },

                noticeList: []
            }
        },
        computed: mapGetters({}),
        watch: {},
        methods: {
            hideFullpage(flag){
                this.isFullpageShow = !flag;
            },
            /*打开公告*/
            showNoticeManage(){
                /**田蓉 修改  为了兼容ie*/
                this.$router.push({path:"/noticeManage"});
                //window.location.hash = '/noticeManage'
            },
          closeFull(){
            window.history.go(-1);
          }
        },
        mounted() {
            let that = this;
            that.$nextTick(() => {

            });
        }
    }
</script>
