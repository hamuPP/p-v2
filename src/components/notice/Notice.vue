<template>
    <div class="notice">
        <Tabs :tabsData="tabsData" @tabsEvt="tabsEvt"></Tabs>
        <ul class="notice-list" v-if="noticeList.length" :class="{'noticeFull-list':noticeStyle.isFull}">
            <li v-for="(no,i) in noticeList">
                <p>
                    <label @click="showNoticeDec(no)">{{no.annoTitle}}</label>
                    <span v-if="parseInt(no.isTop) === 1" class="noticeTop"><sub>置顶</sub></span>
                    <span class="notice-date">[{{no.createDate.substring(0,10)}}]</span></p>
                <!--<p v-if="i === 0 && !noticeStyle.isFull" class="notice-dec">{{no.annoContent}}</p>-->
            </li>
        </ul>
        <Pagination  
            v-if="noticeList.length && noticeStyle.isFull" 
            :paginationData="paginationData" 
            :showTotal="showTotal" 
            :showStyle="showTotal"
            @paginationChange="paginationChange"
            ></Pagination>
    </div>
</template>
<script>
    import Tabs from '../Tabs.vue'
    import Pagination from '../Pagination.vue'

    import {mapGetters} from "vuex"

    export default {
        components: {
            Tabs,
            Pagination
        },
        props: {
            noticeStyle: {
                type: Object,
                default: {
                    isFull: false
                }
            }
        },
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
                tabsData: {
                    borderShow: true,
                    list: [
                        {
                            id: "1",
                            name: "公司"
                        },
                        {
                            id: "2",
                            name: "单位"
                        }
                    ]
                },
                noticeList: [],
                currentReleaseScope:1
            }
        },
        computed: mapGetters({
            noticeFindData: 'noticeFindData'
        }),
        watch: {
            "noticeFindData": function (val) {
                let that = this;
                that.$nextTick(() => {
                    that.noticeList = val.data;
                    that.$set(that.paginationData, 'total', val.total);
                    that.$set(that.paginationData, 'page', that.currentPage);
                    that.$set(that.paginationData, 'rows', val.rows);
                    (that.paginationData._reloadFlag)++;
                });
            }
        },
        methods: {
             paginationChange(data){
                  
                let that = this;
                let page = data.page * 1;
                !page || (that.getNoticeData(that.currentReleaseScope, page));
            },
            /*跳转到详情*/
            showNoticeDec(ele){
                sessionStorage.setItem('noticeDetailsId',ele.id);
                sessionStorage.setItem('currentReleaseScope',this.currentReleaseScope);
                 /**田蓉 修改  为了兼容ie*/
                this.$router.push({path:"/noticeDetails"});
               // window.location.hash = '/noticeDetails';
            },
            /*获取公告的接口*/
            getNoticeData(flag, sum){
                let that = this;
                let reqData = {
                    flag: flag,
                    data: {
                        page: sum,
                        rows: 20
                    }
                };
                that.$store.dispatch('findNoticeData', {reqData})
            },
            /**
             * 监听tabs返回的函数
             * @param ele
             */
            tabsEvt(ele){
                let that = this;
                that.currentReleaseScope = ele.obj.id;
                that.getNoticeData(ele.obj.id, 1);
            }
        },
        mounted() {
            let that = this;
            that.$nextTick(() => {
                that.getNoticeData(1, 1);
            });
        }
    }
</script>
