<template>
    <div class="fullpage-main small-tool">
        <div style="margin-top:100px;">
            small-tool
            <!--用户的操作按钮-->
            <!--<userOperation></userOperation>-->
        </div>
    </div>
</template>

<script>
//    import userOperation from './basic/userOperation.vue'

    export default{
        components:{
//            userOperation
        },
        methods: {
            close(){
                this.$router.push({path:'/index/1'});
            }
        },
        watch:{
            '$route.query.href': function(val){
                let that = this;

                that.$refs.myIframe.src = val;
            }
        },
        mounted(){
            console.log('smallTools.vue mounted')

//            let that = this;
//
//            let $route = that.$route;
//            that.$refs.myIframe.src = $route.query.href;
        },

        created(){
            console.log('smallTools.vue created')
        }
    }
</script>