/*********************************************************************
* 登录页面                                                           *
* Created by tr on 2017/7/27.                                        *
*********************************************************************/
<template>
    <div>
        <!--登录模块-->
        <Login></Login>
        <!--加载中-->
        <Loading></Loading>
    </div>
</template>

<script>
    import Login from  './loginBasic.vue'
    import Loading from '../common/LoadingTpl.vue'

    export default{
        components: {
            Login :Login,
            Loading : Loading
        }
    }
</script>
