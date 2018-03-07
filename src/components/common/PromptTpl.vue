/*********************************************************************
* 提示模块                                                           *
* Created by tr on 2017/6/27.                                        *
*********************************************************************/
<template>
    <div id="prompt" v-if="promptVisible" class="prompt">
        <div>
            <transition name="fade">
                <p v-if="promptVisible">{{promptData}}</p>
            </transition>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        computed: mapGetters({
            /*是否隐藏提示框*/
            promptVisible: "promptVisible",
            /*提示的信息数据*/
            promptData : "promptData"
        })
    }
</script>
