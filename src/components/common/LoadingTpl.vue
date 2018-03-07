/*********************************************************************
* 加载中模块                                                         *
* Created by tr on 2017/6/27.                                        *
*********************************************************************/
<template>
    <div v-show="loadingVisible" class="loading-layer-2">
        <div class="modal-cls"></div>
        <div class="box-cls">
            <img src="../../images/loading.gif">
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        computed: mapGetters({
            /*是否打开加载中页面*/
            loadingVisible: "loadingVisible"
        })
    }
</script>
