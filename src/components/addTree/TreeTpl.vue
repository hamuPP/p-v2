/*********************************************************************
* Modified by tr on 2017/8/14                                        *
*********************************************************************/
<template>
    <!--树形图的显示-->
    <li class="tree-item">
      
        <div class="tree-label">
        <span :class="[dataItem.checked ? 'active' : '',  
            dataItem.children && dataItem.children.length > 0 ? 'tree-check-label' : 'tree-show-label']" @click="treeExpand(dataItem)"></span>

            <p @click='treeELe(dataItem)' :class="[dataItem.isSelect ? 'tree-select-label' : '']">
                {{dataItem.appName ? dataItem.appName : dataItem.resName }}
            </p>
        </div>
        <!--递归循环显示-->
        <ul v-show="dataItem.checked" v-if='isTreeFolder' class="tree-list">
            <treeitems v-for='item in dataItem.children' :dataItem='item'></treeitems>
        </ul>
    </li>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "treeitems",
        props: ["dataItem"],
        data() {
            return {
                isBool: ''
            }
        },
        computed: {
            /*判断是否是文件夹*/
            isTreeFolder: function () {
                return this.dataItem.children && this.dataItem.children.length
            }
        },
        methods: {
            treeExpand(resObj){
                 if (resObj.appName !== '所有业务') {
                       this.isBool = resObj.oauthClientId;
                    /*判断是否是文件夹*/
                    if (this.isTreeFolder) {
                        this.dataItem.checked = !this.dataItem.checked;
                    }
                 }
            },
            /**
             * 树形的点击事件
             * @param resObj
             */
            treeELe(resObj) {
               // if (resObj.appName !== '所有业务') {
                    /*显示方法树形图*/
                    this.$store.dispatch('loadingShow');
                    this.isBool = resObj.oauthClientId;
                   
                    /*根据选择的对象来改变树形图里面的数据*/
                    this.$store.dispatch('setTreeObj', {resObj});
               // }
                let reqData = {
                    userId: resObj.userId ? resObj.userId : '',
                    oauthClientId: resObj.oauthClientId ? resObj.oauthClientId : '',
                    appCode: resObj.appCode ? resObj.appCode : '',
                    resCode: resObj.resCode ? resObj.resCode : ''
                };
                /*根据条件获取对应的列表数据*/
                this.$store.dispatch('getTreeListData', {reqData});
            }
        }
    }
</script>
