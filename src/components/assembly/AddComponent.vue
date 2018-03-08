/*********************************************************************
* 新增组件列表                                                       *
* Created by tyy on 2017/6/27.                                       *
* Modified by tr on 2017/6/27.                                       *
*********************************************************************/
<template>
    <div ref="addComponent" @click="editComponent" class="addComponent col-xs-4 col-md-4 col-lg-4">
        <h2 class="icon iconfont icon-tianjia font-s48 font-cf "></h2>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from "vuex"
    export default {
        computed: mapGetters({
            showEditComponent:'showEditComponent'
        }),
        /**
         * @define {{
         * editComponent: function 显示编辑框
         * }}
         */
        methods: {
            editComponent(){
                let flgData = {data:'addComponent'};
                /*显示编辑框*/
                this.$store.dispatch('showEditComponentFun',{flgData});
            }
        },
    }
</script>