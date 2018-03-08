/*********************************************************************
* 右边数据块                                                         *
* Created by tr on 2017/7/27.                                        *
*********************************************************************/
<template>
    <div>
        <div>
            <!--用户的操作按钮-->
            <userOperation></userOperation>
        </div>
        <!--所有右边的数据模块-->
        <div ref="rightModelID" class="row container-fluid" v-show="rightModelVisible" :class="rightModelPadding">

            <!--珙县电力模块-->
            <mapPower v-if="userData.account === '017195'"></mapPower>
            <!--<editMask :refValue="ref"></editMask>-->
            <!--新闻资讯模块-->
            <div id="news" :ref="news" class="col-xs-4 col-sm-4 col-md-4 margin-top-10 news">
              <!-- 日程表和通知公告 start -->
              <calendarAndNotice></calendarAndNotice>
            </div>
            <!--代办事务模块-->
            <Agency></Agency>


            <!-- 日程表和通讯录 end -->

            <!-- 通讯录 start -->
            <addressbook></addressbook>
            <!-- 通讯录 end -->

            <!--组件模块-->
            <draggable :list="componentListData" :move="getdata" @update="datadragEnd">
                <template v-for="(list, index) in componentListData">
                    <eChartsBar :resRatio="list.resRatio" :id="list.id" :oderID="list.id"
                                :dataUrl="list.data" :resName="list.resName"
                                :rightModelWidth="rightModelWidth"></eChartsBar>
                </template>
            </draggable>
            <!--新增组件模块-->
            <addComponent v-show="addComponentVisible"></addComponent>
            <!--新用户模块 1.0.3版暂时没有用-->
            <!--<ListModel></ListModel>-->
        </div>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    import Weather from '../Weather.vue'
    import Agency from '../agency/Agency.vue'
    import mapPower from '../MapPower.vue'
    import ListModel from '../ListModel.vue'
    import eChartsBar from '../assembly/EChartsBar.vue'
    import editMask from '../assembly/EditMask.vue'
    import addComponent from '../assembly/AddComponent.vue'
    import userOperation from '../basic/userOperation.vue'
    import calendarAndNotice from '../calendarAndNotice.vue'
    import addressbook from '../addressbook.vue'


    import {mapGetters} from "vuex"
    export default{
        /**
         * @returns {{ref: string, IDoders: Array, rightModelWidth: string}}
         */
        data() {
            return {
                ref: 'news',
                IDoders: [],
                rightModelWidth: ''
            }
        },
        computed: mapGetters({
            /*用户基本数据*/
            userData: 'userData',
            /*新闻的数据*/
            newsDataValue: 'newsDataValue',
            /*右边模块是否显示*/
            rightModelVisible: 'rightModelVisible',
            /*右边数据*/
            rightModelPadding: 'rightModelPadding',
            /*获取初始化的数据*/
            componentListData: 'componentListData',
            /*是否显示新增组件的按钮*/
            addComponentVisible: 'addComponentVisible',
            /*判断是定制组件中*/
            isAssemblyVisible: 'isAssemblyVisible'
        }),
        watch: {
            /**
             * 监听用户信息
             * @param val 返回的数据
             */
            userData(val){
                let me = this;
                me.$nextTick(function () {
                    /*跟据userID获取组件列表数据*/
                    let reqData = {userId: val.account};
                    this.$store.dispatch('getComponentListFun', {reqData});
                });
            },
          
        },
        components: {
            draggable,
            Weather,
            Agency,
            ListModel,
            eChartsBar,
            editMask,
            addComponent,
            mapPower,
            userOperation,
            calendarAndNotice,
            addressbook
        },
        methods: {
            /**
             * 移动事件
             * @param evt
             * @returns {string|boolean|getters.isAssemblyVisible}
             */
            getdata: function (evt) {
                return this.isAssemblyVisible;
            },
            /**
             * 结束移动事件
             * @param evt
             */
            datadragEnd(evt){
                let that = this;
                that.IDoders = [];
                /*拖动的元素*/
                let childnodes = evt.target.childNodes;
                for (let [index, elem] of childnodes.entries()) {
                    if (elem.getAttribute("oderID")) {
                        that.IDoders.push(elem.getAttribute("oderID"));
                    }
                }
                let reqData = JSON.stringify({orders: that.IDoders});
                /*设置组件排序*/
                let reqOderData = {url: {userId: this.userData.account}, IDOrder: reqData};
                this.$store.dispatch("setComponentOderFun", {reqOderData});
            }
        },
        mounted(){
            this.rightModelWidth = this.$refs.rightModelID.offsetWidth;
        },
        created() {
            /*显示方法*/
            this.$store.dispatch('loadingShow');
            /*右边数据显示*/
            this.$store.dispatch('rightModelShow');
            /*隐藏右边*/
            this.$store.dispatch('hideRightModelPaddingFun');
            /*获取新闻的数据 TODO 大电不需要该功能*/
            //this.$store.dispatch('getNewsData', {reqData:{});
            /*获取组件列表getComponentList*/
            this.$store.dispatch('getComponentListFun', {reqData:{userId: this.userData.account}});
        }
    }

</script>
