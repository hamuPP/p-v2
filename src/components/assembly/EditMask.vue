/*********************************************************************
* 编辑组件页面                                                       *
* Created by tyy on 2017/6/27.                                       *
* Modified by tr on 2017/6/27.                                       *
*********************************************************************/
<template>
    <div ref="editMask" class="editMask" v-show="showEditMask" @mouseover="over" @mouseout="out">
        <div class="editMaskCont">
            <span class="icon iconfont  font-s48 font-cf" :class="iconClass"></span>
            <div v-show="showMaskBtn" >
                <label class="btn font-cf font-s12" @click="editMaskBtn">编辑组件</label>
                <label class="btn font-cf font-s12" @click="delMaskBtn">删除组件</label>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        /**
         * @returns {{showMaskBtn: boolean, editMaskList: [*,*,*,*,*], iconClass: string, curuntId: string}}
         */
        data(){
            return{
                showMaskBtn:false,
                editMaskList:[
                    {'ref':'eChartsBar','iconClass':'icon-ziyuanshuju'},
                    {'ref':'eChartsPie','iconClass':'icon-shujuxinxi'},
                    {'ref':'news','iconClass':'icon-chakanxiangqing'},
                    {'ref':'agencyBox','iconClass':'icon-baocun'},
                    {'ref':'eChartsLineSmoth','iconClass':'icon-Send-task'}
                ],
                iconClass: 'icon-ziyuanshuju',
                curuntId:''
            }
        },
        /**
         * @define {{
         * refValue: String,
         * id: String
         * }}
         */
        props: {
            refValue: String,
            id: String
        },
        computed: mapGetters({
            /*点击编辑组件显示覆盖层*/
            showEditMask: 'showEditMask',
            /*用户的基本信息*/
            userData: 'userData',
            /*删除组件的数据*/
            getIdComponentData: 'getIdComponentData'
        }),
        /**
         * @define {{
         * over: function 鼠标移上覆盖层显示btn,
         * out: function 鼠标移出覆盖层隐藏btn,
         * editMaskBtn: function 编辑的事件,
         * delMaskBtn: function 删除的事件
         * }}
         */
        methods: {
            over(evt){
                let that = this;
                /*组件为agencyBox或者news，不显示操作按钮*/
                //TODO
              /*  if(that.refValue === "agencyBox" || that.refValue === "news") {
                    that.showMaskBtn = false;
                } else {
                    that.showMaskBtn = true;
                }*/
                that.showMaskBtn = !(that.refValue === "agencyBox" || that.refValue === "news");
            },
            out(evt){
                this.showMaskBtn = false;
            },
            editMaskBtn(evt){
                let reqData = {url: {userId: this.userData.account, id: this.id}, type: 'get', data: {}};
                //获取当前图形数据
                this.$store.dispatch('getIdComponentFun', {reqData});
                //显示编辑框
                let flgData = {data: 'editComponent'};
                this.$store.dispatch('showEditComponentFun', {flgData});
            },
            delMaskBtn(evt){
                this.curuntId = this.id;
                var reqData = {url: {userId: this.userData.account, id: this.id}, type: 'delete', data: {}};
                //获取当前图形数据
                this.$store.dispatch('getIdComponentFun', {reqData});
            }
        },
        mounted() {
            let that = this;
            that.$nextTick(function () {
                for (let [index, elem] of that.editMaskList.entries()) {
                    if (that.refValue === elem.ref) {
                        that.iconClass = elem.iconClass;
                    }
                }
            })
        },
        /**
         * @define {{getIdComponentData: function}}
         */
        watch: {
            getIdComponentData(val){
                if (val > 0 ) {
                    let reqDate = "删除成功";
                    if(this.curuntId == this.id) {
                        let reqData = {userId: this.userData.account};
                        this.$store.dispatch('getComponentListFun', {reqData});
                        this.$store.dispatch("hideEditComponentFun");
                    }
                    this.$store.dispatch('promptShow', {reqDate});
                } else {
                    let reqDate = "删除失败";
                    this.$store.dispatch('promptShow', {reqDate});
                }

            }
        }
    }
</script>
