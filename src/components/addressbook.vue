<template>
    <div class="addressbook-wrapper">
        <!--编辑日程表事务-->
        <editMask refValue="agencyBox"></editMask>
        <div class="main-content">
            <div class="content-title">
                <p class="title">通讯录</p>
                <div class="toolbar-right">
                    <span class="iconfont icon-shiyingpingmu font-s12 addressbook-right-icon"
                          @click="showAddressbookFullpage"></span>
                </div>
            </div>
            <div class="content-body">
                <div class="main-content">
                    <div class="inner-content">
                        <!-- 上方的列表工具栏 start -->
                        <div class="list-toolbar">
                            <div class="search-box">
                                <div class="search-input-box">
                                    <input class="search-input" v-model="queryKeyWords" placeholder="请输入搜索"/>
                                </div>
                                <span class="search-button" @click="queryAddressBookAccounts">
                                <i class="iconfont icon-sousuo"></i>
                            </span>
                            </div>
                        </div>
                        <!-- 上方的列表工具栏 end -->

                        <!-- 下面的列表 start -->
                        <div class="list-body">
                            <Table showHead
                                   :openLoading="isTableLoading"
                                   :columns="tableColumns"
                                   :data="tableData"
                                   @rowClick="tableRowClickEvt"></Table>
                        </div>
                        <!-- 下面的列表 end -->
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapGetters} from "vuex"
    import Table from './Table.vue'
    import editMask from './assembly/editMask.vue'
    import AddressBookDetails from './addressBook/detailsPage.js'

    export default{
        data(){
            return {
                isTableLoading:false,
                queryKeyWords:'',//查询条件
                tableColumns: [
                    {
                        title: '姓名',
                        field: 'name',
                        align: 'left'
                    },
                    {
                        title: '部门',
                        field: 'dept',
                        align: 'left'
                    },
                    {
                        title: '职务/岗位',
                        field: 'position'
                    },
                    {
                        title: '移动电话',
                        field: 'mobile',
                        align: 'right'
                    },
                    {
                        title: '个人邮箱',
                        field: 'email',
                        align: 'right'
                    },
                    {
                        title: 'V网号码',
                        field: 'VCode',
                        align: 'right'
                    }
                ],
                tableData:[
                    {
                        name: '张三',
                        dept: '采购部',
                        mobile: '13699999999',
                        position:'董事长',
                        VCode:'6100',
                        email: 'k89c3df@163.com'
                    },
                    {
                        name: '张四',
                        dept: '采购部',
                        mobile: '13699999999',
                        position:'总经理',
                        VCode:'6100',
                        email: 'k89c3df@163.com'
                    },
                    {
                        name: '张五',
                        dept: '采购部',
                        mobile: '13699999999',
                        position:'总经理',
                        VCode:'6100',
                        email: 'k89c3df@163.com'
                    },
                    {
                        name: '张六',
                        dept: '采购部',
                        mobile: '13699999999',
                        position:'总经理',
                        VCode:'6100',
                        email: 'k89c3df@163.com'
                    },
                    {
                        name: '张七',
                        dept: '采购部',
                        mobile: '13699999999',
                        position:'总经理',
                        VCode:'6100',
                        email: 'k89c3df@163.com'
                    },
                    {
                        name: '张八',
                        dept: '采购部',
                        mobile: '13699999999',
                        VCode:'6100',
                        position:'总经理',
                        email: 'k89c3df@163.com'
                    },
                    {
                        name: '张九',
                        dept: '采购部',
                        mobile: '13699999999',
                        position:'总经理',
                        VCode:'6100',
                        email: 'k89c3df@163.com'
                    },
                    {
                        name: '张十',
                        dept: '采购部',
                        mobile: '13699999999',
                        position:'总经理',
                        VCode:'6100',
                        email: 'k89c3df@163.com'
                    },
                    {
                        name: '张十一',
                        dept: '采购部',
                        mobile: '13699999999',
                        position:'总经理',
                        VCode:'6100',
                        email: 'k89c3df@163.com'
                    },
                    {
                        name: '张十二',
                        dept: '采购部',
                        mobile: '13699999999',
                        position:'总经理',
                        VCode:'6100',
                        email: 'k89c3df@163.com'
                    }
                ]
            }
        },
        computed: mapGetters({
            addressBookData: 'addressBookData'
        }),
        components:{
            Table,
            editMask,
            AddressBookDetails
        },
        methods: {

            /**
             * 通讯录的查询按钮 查询功能
             */
            queryAddressBookAccounts(){
                let me = this;

                //组装查询参数
                let formattedQueryKeyWords = me.queryKeyWords.trim();
                let queryParams = {
                    flag:1,
                    keyword: formattedQueryKeyWords,
                    orgCode:'',
                    page:1,
                    size:5
                };

                me.isTableLoading = true;
                me.$store.dispatch('getAddressBookDataList',{'reqData': queryParams});
            },

            showAddressbookFullpage(){
                /**田蓉 修改  为了兼容ie*/
                this.$router.push({path:'/addressbookfullpage'})
               // window.location.hash = '/addressbookfullpage';
            },
            /**
             * Table单行点击事件
             */
            tableRowClickEvt({data,index}){
                let that = this;
                //找到当前点击的行的对应的原数据（即后端查询到的原数据）
                let metaData = that.addressBookData[index];
                //打开弹窗
                AddressBookDetails.show({
                    data:metaData,
                    closeEvt:function(data){

                        if(1){
                            //todo 关闭后是否干点啥？

                        }
                    }
                });
            },
        },

        watch:{
            /* 通讯录列表数据 */
            addressBookData(val){
                let me = this;

                me.tableData = val.map(it => {
                    return {
                        name: it.userName,
                        dept: it.organizationName,
                        mobile: it.telephone,
                        position: it.positionName,
                        VCode:it.vNetNo || "",
                        email: it.organizationCodeorganizationCode
                    };
                });

                me.isTableLoading = false;
            }
        },

        created(){
            this.queryAddressBookAccounts();
        },
        mounted(){
            let me = this;

        }
    }
</script>