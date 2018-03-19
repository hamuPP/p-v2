/*********************************************************************
* 通讯录全屏页面                                                   *
* Modified by ty on 2017/12/30.                                      *
*********************************************************************/
<template>
    <div class="fullpage-main" v-if="isFullpageShow">
        <div>
            <!--用户的操作按钮-->
            <userOperation></userOperation>
        </div>

        <!--所有右边的数据模块-->
        <div ref="addressbookMain" class="row container-fluid inner-main addressbook-fullpage-wrapper">
            <div class="inner-inner-main">
                <div>
                    <header class="header">
                        <p class="title">通讯录</p>
                        <div class="toolbar-right">
                        <span class="iconfont icon-suoxiao_huanyuan font-s12"
                              @click="jumpHomePage"></span>
                        </div>
                    </header>
                    <main class="main-content">
                        <div>
                            <div class="left">
                                <Tabs :tabsData="tabsData"></Tabs>
                                <div class="tree-wrapper">
                                    <!--<Tree :treeObj="treeObj" :treeParams="treeParams" @treeEvt="treeClickEvt"></Tree>-->
                                    <Tree
                                            :data="treeObj"
                                            @onToggle="onToggleHandle"
                                            @onSelect="treeClickEvt"
                                    ></Tree>
                                </div>
                            </div>
                            <div class="right">
                                <div class="table-wrapper">
                                    <div class="toolbar">
                                        <div class="search-box">
                                            <div class="search-input-box">
                                                <input class="search-input" v-model="queryKeyWords" placeholder="请输入搜索"/>
                                            </div>
                                            <span class="search-button" @click="getAddressListData(true)">
                                                <i class="iconfont icon-sousuo"></i>
                                            </span>
                                        </div>
                                        <div class="right-icon" v-if="tableData.length">
                                            <a :href="downloadUrl" download>
                                                <span class="download-button">
                                                    <i class="iconfont icon-xiazai">

                                                    </i>
                                                </span>
                                            </a>

                                              <!--<span class="download-button" @click="download">-->
                                              <!--<span class="download-button" @click="download">-->
                                                <!--<i class="iconfont icon-xiazai">-->
                                                    <!--<a href="/i/w3school_logo_white.gif" download="w3logo"></a>-->
                                                <!--</i>-->
                                              <!--</span>-->
                                        </div>
                                    </div>

                                    <!-- 下面的列表 start -->
                                    <div class="content-wrapper">
                                        <Table showHead
                                               border
                                               :openLoading="isTableLoading"
                                               :tableSize="tableSize"
                                               :headStyleOpt="tableHeadStyleOpt"
                                               :columns="tableColumns"
                                               :data="tableData"
                                                @rowClick="tableRowClickEvt"></Table>
                                    </div>
                                    <!-- 下面的列表 end -->

                                    <div class="pagination-wrapper">
                                        <Pagination
                                                @paginationChange="paginationChange"
                                                :paginationData="paginationData"
                                                :showTotal="showTotal"
                                                :showStyle="showTotal"></Pagination>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import userOperation from '../basic/userOperation.vue'
    import Table from '../Table.vue'
    import Tabs from '../Tabs.vue'
    import Tree from 't-vue-tree'
    import Pagination from '../Pagination.vue'
    import AddressBookDetails from './detailsPage.js'

    import Utils from '../../vuex/Utils.js'

    import {mapGetters} from "vuex"

    export default{
        name:'Addressbookfullpage.vue',
        data(){
            return {
                enterpriseOrgsTreeDataRawAndUserDataCount:0,
                isFullpageShow:true,
                treeParams:{
                    isCheck:false
                },
                isTableLoading:false,//whether show loading layer upon Table
                downloadUrl:'',
                downloadQueryParamsChanged:0,
                currentClickedOrgNode:{},//current clicked node object in the org tree
                queryKeyWords:'',//查询条件
                tableSize:'middle',
                tableHeadStyleOpt:{
                    bgColor: 'rgb(245,246,250)',
                    color:'#999'
                },
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
                tableData:[],
                tabsData: {
                    borderShow: true,
                    list: [
                        {
                            id: "001",
                            name: "组织"
                        },
                        {
                            id: "002",
                            name: "角色"
                        }
                    ]
                },
                treeObj: [],
                paginationData: {
                    _reloadFlag:0,
                    total: 5,
                    rows: 20,
                    page: 1,
                    pageGroup: 2,
                    rowsData: [
                        {value: 10,text: '10条/页'},
                        {value: 20,text: '20条/页'},
                        {value: 30,text: '30条/页'},
                        {value: 40,text: '40条/页'},
                        {value: 50,text: '50条/页'}
                    ],
                    showBatchButtons: false
                },
                showTotal:true,
                pageNumber:1,//分页的当前页数
                sizeNumber:20,//当前条数
                isRequestDone:true,//whether the query operation about enterprise accounts is done
            }
        },

        computed: mapGetters({
            addressBookDataFullPage: 'addressBookDataFullPage',//table data
            paginationDataRaw: 'paginationData',
            enterpriseOrgsTreeDataRaw: 'enterpriseOrgsTreeData',
            userData: 'userData'
        }),

        components:{
            userOperation,
            Table,
            Tabs,
            Tree,
            Pagination,
            AddressBookDetails
        },

        watch:{
            downloadQueryParamsChanged(val){
                let me = this;

                let keyword = me.queryKeyWords;
                let orgCode = me.currentClickedOrgNode.orgCode || "";
                let access_tokenRaw = sessionStorage.getItem("access_token");
                let access_token = "";
                if(access_tokenRaw){
                    access_token = JSON.parse(access_tokenRaw).split("=")[1];
                }
                let url = me.common.getUrl({url: me.common.ADDRESSBOOK_FULLPAGE_DOWNLOAD}) + `?keyword=${keyword}&orgCode=${orgCode}`;
                me.downloadUrl = url;
                //todo 下载个空excel？？？？wo ri

                //检查打印结果，是否和旧门户相同
                //                //"/addressList/excel/export?keyword=&orgCode=" 打印结果

//                me.downloadUrl = `http://10.176.156.95:10200/addressList/excel/export?keyword=${keyword}&orgCode=${orgCode}&access_token=${access_token}`;

            },

            pageNumber(val){
                let me = this;
            },

            /* 通讯录列表数据 */
            addressBookDataFullPage(val){
                let me = this;
                (me.downloadQueryParamsChanged)++;
                /* reformat data which will be displayed in table */
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

                me.$nextTick(() =>{
                    me.isTableLoading = false;
                })
            },

            /**
             * when pagination raw data changed ,transform it for displaying in page
             * @param val
             */
            paginationDataRaw(val){
                let me = this;

                me.$set(me.paginationData, 'total', val.total);
                me.$set(me.paginationData, 'page', me.pageNumber);
                me.$set(me.paginationData, 'rows', me.sizeNumber);

//                me.paginationData.rows = 20;
                (me.paginationData._reloadFlag)++;
            },

            enterpriseOrgsTreeDataRawAndUserDataCount(val){
                let me = this;

                console.log('count', val)

                //F12クリック時−２、indexからフーページに入る時-３
                //todo 以下为本地数据测试，暂时别删，测试功能用
                if(val > 1){
                    me.realData2();
                }
            },

            userData(val){
                let me = this;
                console.log('userData', val);
                (me.enterpriseOrgsTreeDataRawAndUserDataCount)++;
            },

            /**
             * when raw data of enterprise orgs tree changed ,transform it for displaying in page
             * @param val
             */
            enterpriseOrgsTreeDataRaw(val){
                let me = this;
                (me.enterpriseOrgsTreeDataRawAndUserDataCount)++;
            }
        },

        methods:{
            /**
             * Table单行点击事件
             */
            tableRowClickEvt({data,index}){
                let that = this;
                //找到当前点击的行的对应的原数据（即后端查询到的原数据）
                let metaData = that.addressBookDataFullPage[index];
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
            hideFullpage(flag){
                this.isFullpageShow = !flag;
            },
            /**
             * jump to homepage url
             */
            jumpHomePage(){
                 /**田蓉 修改  为了兼容ie*/
                this.$router.push({path:'/index'});
                //window.location.hash = "/index/1";
            },


            paginationChange: function (data) {
                let me = this;
                let page = data.page*1;

                me.pageNumber = page;
                me.sizeNumber = data.rows * 1;
                me.getAddressListData();
            },

            /**
             * 通讯录的查询按钮 查询功能
             * @param {Boolean} reloadFlag リセットページネェーション検索の条件，主にbuttonをクリックした場合
             */
            getAddressListData(reloadFlag){
                console.log('getAddressListData .vue')
                let me = this;
                //组装查询参数
                if(reloadFlag){
                    me.pageNumber = 1;
                }
                let formattedQueryKeyWords = me.queryKeyWords.trim();
                let formattedOrgCode = (me.currentClickedOrgNode && me.currentClickedOrgNode.orgCode) ?
                                        me.currentClickedOrgNode.orgCode : '';

                let queryParams = {
                    flag:2,
                    keyword: formattedQueryKeyWords,
                    orgCode: formattedOrgCode,
                    page:me.pageNumber,
                    size:me.sizeNumber
                };

                me.isTableLoading = true;
                me.$store.dispatch('getAddressBookDataListInFullPage',{'reqData': queryParams});
            },

            /**
             * get enterprise orgs tree data,which will be displaied in left tree
             * @returns undefined
             */
            getEnterpriseOrgsTree(){
                console.log('getEnterpriseOrgsTree .vue')
                let me = this;
                me.$store.dispatch('getEnterpriseOrgsTreeDataInFullPage',{'reqData': {}});

            },

            treeClickEvt(node){
                let me = this;

                me.pageNumber = 1;
                if(node && node.orgCode){
                    me.currentClickedOrgNode = node;
                    me.getAddressListData();
                }
            },

            //todo 公共方法抽出 方法需要改进，注意引用
            _getFlatTree (metaData) {
                let keyCounter = 0;
                const flatTree = [];

                function flattenChildren(node, parent) {
                    node.nodeKey = keyCounter++;
                    node.testMe = 233;
                    flatTree[node.nodeKey] = {
                        node: node,
                        nodeKey: node.nodeKey,
                    };
                    if (typeof parent != 'undefined') {
                        flatTree[node.nodeKey].parent = parent.nodeKey;
                        flatTree[parent.nodeKey].children.push(node.nodeKey);
                    }

                    if (node.children) {
                        flatTree[node.nodeKey].children = [];
                        node.children.forEach(child => flattenChildren(child, node));
                    }
                }

                metaData.forEach(rootNode => {
                    flattenChildren(rootNode);
                });
                return flatTree;
            },

            onToggleHandle(val){
                console.log('onToggleHandle', val);
            },
            realData2(){
                let me = this;

                /**
                 * transform data into target(Tree data) formats
                 * @param arr raw data
                 * @param  code [String] codeにあってるノードを選択状態と展開状態にする
                 * @param  parentsStr [String]
                 * @return []
                 */
                let fn = function(arr, {code, parentsStr}){
                    let resultArr = arr.map(it => {
                        let _children = [];

                        if(it.children && it.children.length){
                            _children = fn(it.children,{code:code, parentsStr:parentsStr});
                        }


                        return Object.assign(it, {
                            title: it.orgName,
                            id: it.orgCode,
//                            selected: code ? it.orgCode === code : false,
                            children: _children
                        });

                    });

                    return resultArr;
                };
                let result;

                let orgCode = me.userData.orgCode;
                result = fn(me.enterpriseOrgsTreeDataRaw, {
                    code:orgCode
                });


                me.treeObj = result;
            }
        },

        created() {
            let me  = this;
            //get table data
            me.getAddressListData();

            //get orgs tree data
            me.getEnterpriseOrgsTree();

        },
        mounted() {
            let me = this;

        }
    }
</script>