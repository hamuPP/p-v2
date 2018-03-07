<template>
    <div class="Ttree-wrapper">
        <p>登录页面</p>
    </div>
</template>

<script>


    export default{

        components: {

        },

        data(){
            return {
                treeAllData: []
            }
        },
        computed: {
//            computedTreeWrapperCls(){
//                let that = this;
//                let result = '';
//
//                return result;
//            },
//
//            computedTreeWrapperStyles(){
//                let that = this;
//                let result = '';
//
//                return result;
//            }
        },

        watch: {
            data(val){
                let that = this;

            }
        },

        methods: {

        },

        created(){
            console.log('login page created');
            let that = this;

        },

        mounted(){

            console.log('login page mounted');
            let that = this;

       }
    }
</script>