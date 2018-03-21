/*********************************************************************
* 首页显示                                                           *
* Created by tr on 2017/7/27.                                        *
*********************************************************************/
<template>
    <div id="homePage" class="container-fluid homePage">
        <div class="fixed-header">
            <div class="logo"></div>
            <a class="fixed-logo" @click="logoHref"></a>
        </div>

        <div class="fixed-right ccff">
            <!--&lt;!&ndash;右边的模块&ndash;&gt;-->
            <!--<RightModel></RightModel>-->
            <!--&lt;!&ndash;地图模块&ndash;&gt;-->
            <FunctionMap></FunctionMap>
            <!--&lt;!&ndash;代办全屏模块&ndash;&gt;-->
            <!--<AgencyFull></AgencyFull>-->

            <router-view name="a"></router-view>
            <!--<router-view name="b"></router-view>-->
            <router-view name="c"></router-view>
        </div>
        <div class="navbar-fixed-left">
            <!--基本信息模块-->
            <Business></Business>
        </div>

        <!--提示信息模块-->
        <PromptTpl></PromptTpl>
        <!--加载中模块-->
        <Loading></Loading>

        <template v-if="showEditComponent">
            <!--编辑组件模块-->
            <editComponent ></editComponent>
        </template>
        <!--修改密码模块-->
        <pwdTpl></pwdTpl>
    </div>
</template>
<script>
    import Business from '../basic/BusinessPortal.vue'
    import Loading from '../common/LoadingTpl.vue'
//    import RightModel from '../basic/RightModel.vue'
    import FunctionMap from '../basic/FunctionalMap.vue'
    import Agency from '../agency/Agency.vue'
//    import AgencyFull from '../agency/AgencyFull.vue'
    import PromptTpl from '../common/PromptTpl.vue'
    import editComponent from '../assembly/EditComponent.vue'
    import pwdTpl from '../basic/PasswordTpl.vue'
    import commonMethods from '../../vuex/modules/commonMethods'

    import {mapGetters} from "vuex"
    export default{
        name:'HomePage.vue',
        computed: mapGetters({
            /*是否弹出编辑组件弹框*/
            showEditComponent:'showEditComponent'
        }),
        components: {
            Loading,
            Business,
            FunctionMap,
//            RightModel,
//            AgencyFull,
            PromptTpl,
            editComponent,
            pwdTpl
        },
        methods: {
            logoHref(){
                this.$router.push({path:"/index"});
            },

            getUserData(){
                let reqData = {};
                /*获取用户信息*/
//                debugger;
                this.$store.dispatch('getUserData',{ reqData });
            }
        },
        mounted(){
            let that =this;
            that.$nextTick(()=>{
                /*隐藏地图*/
                 this.$store.dispatch('mapHide');

            });
        },
        created() {
            let that = this;
            let CM = new commonMethods();
            CM.clearConsole();
            /* 获取用户信息 --by ty 2018年03月08日11:49:49 */
            that.getUserData();
            setTimeout(()=>{
                CM.clearConsole();
            },1500);
        }
    }

</script>