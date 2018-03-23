/*********************************************************************
* 小工具全屏页面                                                       *
* Created by tr on 2018/03/?                                        *
* Modified by ty on 2018/03/23.                                      *
*********************************************************************/
<style scoped lang="less">
    @import '../styles/small-tools.less';
</style>
<template>
    <div class="small-tools">
        <div>
            <!--用户的操作按钮-->
            <userOperation></userOperation>
        </div>
        <!--编辑日程表事务-->
        <div class="content-main">
            <div class="close" @click="close()">X</div>
            <iframe ref="myIframe"
                    src=""
                    frameborder="0"
                    width="100%"
                    height="100%"
            ></iframe>
        </div>
    </div>
</template>
<script>
    import userOperation from './basic/userOperation.vue'

    export default{
        components:{
            userOperation
        },
        methods: {
            close(){
                this.$router.push({path:'/index'});
            }
        },
        watch:{
            '$route.query.href': function(val){
                let that = this;

                that.$refs.myIframe.src = val;
            }
        },
        mounted(){
            let that = this;

            let $route = that.$route;
            that.$refs.myIframe.src = $route.query.href;
        }
    }
</script>