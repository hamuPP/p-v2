<template>
    <div class="fullPage" v-if="isFullpageShow">
        <div>
            <!--用户的操作按钮-->
            <userOperation></userOperation>
        </div>

        <!--所有右边的数据模块-->
        <div ref="noticeFull" class="row inner-main">
            <div class="noticeFull inner-inner-main">
                <div class="notice-title">
                    <p>通知公告</p>
                    <button class="goBackTo" @click="backSpace">
                        <i class="iconfont col icon-fanhuishangyiji"></i>返回上级
                    </button>
                </div>
                <div class="noticeDetails-content">
                    <p>
                        <label>{{noticeObj.annoTitle}}</label>
                        <span v-if="noticeObj.isTop === 1" class="noticeTop"><sub>置顶</sub></span>
                    </p>
                    <p>[发布时间:{{noticeObj.createDate}}]</p>
                    <div class="notice-content" >
                        <div v-html="noticeObj.annoContent"></div>
                        <template v-if="noticeObj.annexInfo && noticeObj.annexInfo.length">
                            <p v-for="ann in noticeObj.annexInfo">附件：
                                <a :href="ann.download" :download="ann.fileName">{{ann.fileName}}</a>
                                ({{(fileSize/1024).toFixed(2)}}kb)
                            </p>
                        </template>
                    </div>
                    <div class="notice-footer">

                        <p class="buttonEvt">
                            <button @click="backSpace">返回页面</button>
                            <button class="active" :style="styleDisplay" @click="nextNotice">下一条</button>
                        </p>
                        <ul class="notice-list">
                            <li v-for="(not,i) in noticeList"
                                v-if="i < 8"
                                :class="{showBorder:i < (currentTotal > 4 ? 4 : currentTotal)}"
                                @click="noticeDet(not)"
                            >
                                <p>
                                    <label >{{not.annoTitle}}</label>
                                    <span v-if="Number(not.isTop) === 1" class="noticeTop"><sub>置顶</sub></span>
                                    <span class="notice-date">[{{not.createDate}}]</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import userOperation from '../basic/userOperation.vue'

    import {mapGetters} from "vuex"

    export default {
        name:'NoticeDetails.vue',
        components: {
            userOperation
        },
        data() {
            return {
                isFullpageShow:true,
                noticeStyle: {
                    isFull: true
                },
                noticeObj:{}, //详情数据
                noticeList: [], //公告列表数据
                currentTotal:0, //当前的条数
                currentReleaseScope:1, //是否是公司 1为公司，2:单位
                currentId:1, //当前公告Id
                styleDisplay:''
            }
        },
        computed: mapGetters({
            noticeIdFindData: 'noticeIdFindData',
            noticeQuickData : "noticeQuickData",
            noticeNextData:"noticeNextData"
        }),
        watch: {
            "noticeQuickData":function (val) {
                let that = this;
                that.$nextTick(()=>{
                    that.noticeList = val.data.map(item=>{
                      item.createDate = item.createDate.substring(0, 10);
                      return item;
                    });
                    that.currentTotal =  parseInt(val.total/2) + val.total % 2;
                });
            },
            "noticeIdFindData":function (val) {
                let that = this;
                that.$nextTick(()=>{
                    let temp = val;
                    let annexInfo = val.annexInfo;
                    if(annexInfo) {
                        let newAnnexInfo = annexInfo.map(item => {
                            item.download = that.common.getUrl({url: that.common.NOTION_DOWNLOAD, params: String(item.fileUuid)});
                            return item;
                        });
                        temp.annexInfo = newAnnexInfo;
                    }
                    that.noticeObj = temp;
                });
            },
            "noticeNextData":function (val) {
                let that = this;
                that.$nextTick(()=>{
                    if(val) {
                        that.noticeObj = val;
                    }else{
                        that.styleDisplay = "background:#ccc;cursor: auto;border-color:#ccc;";
                    }
                });
            }
        },
        methods: {
            hideFullpage(flag){
                this.isFullpageShow = !flag;
            },
            /**
             * 根据id来获取公告详情
             * @param id
             */
            getNoticeDetail(id){
                let that = this;
                that.$store.dispatch('findIdNoticeData',{reqData:id});

            },
            /*获取详情*/
            noticeDet(ele){
               let that = this;
               that.getNoticeDetail(ele.id);
              that.$store.dispatch('quickNoticeData',{reqData:{resCode:that.currentReleaseScope,extId:{excludeId:ele.id}}});
            },
            /*返回上级*/
            backSpace(){
                window.history.go(-1);
            },
            /*下一条公告数据*/
            nextNotice(){
                let that = this;
                that.$store.dispatch('getNextNoticeData', {reqData: that.currentReleaseScope + "," + that.noticeObj.id});

            },

        },
        mounted() {
            let that = this;
            that.$nextTick(() => {
                that.currentId = sessionStorage.getItem('noticeDetailsId');
                that.getNoticeDetail(that.currentId);
                /*获取快速公告查询*/
                that.currentReleaseScope = sessionStorage.getItem('currentReleaseScope');

                that.$store.dispatch('quickNoticeData',{reqData:{resCode:that.currentReleaseScope,extId:{excludeId:that.currentId}}});
            });
        }
    }
</script>
