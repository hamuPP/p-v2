/*********************************************************************
* 确认模块                                                           *
* Created by tr on 2017/11/17.                                        *
*<ConfirmTpl :confirm="confirmVisible" @confirmEle="confirmEvt" @cancelEle="cancelEvt"></ConfirmTpl>                                        *
*********************************************************************/
<template>
    <div v-if="confirm" :style="confirmTpl">
        <div :style="confirmTpl_div">
            <p :style="confirmTpl_first">提示<i class="iconfont icon-guanbi_quxiao" @click="cancelEvt" :style="iconEvt"></i></p>
            <transition name="fade">
               <p :style="confirmTpl_p"> 是否执行该操作？</p>
            </transition>
            <p :style="last_p">
                <button @click="cancelEvt" :style="cancelEle">取消</button>
                <button :style="confirmEle" @click="confirmEvt">确认</button>
            </p>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        props:['confirm'],
        data(){
            return{
                confirmTpl:{'background':'rgba(0, 0, 0, 0.2)', 'position': 'fixed', 'top':0,'bottom': 0,'left': 0,'right': 0, 'z-index': 999999999999999},
                confirmTpl_div:{'position': 'absolute', 'top':'50%', 'left': '50%', 'height': '160px', 'width': '300px', 'margin-top': '-80px', 'margin-left': '-150px', 'background': '#fff', 'border-radius': '5px', 'text-align': 'center', 'overflow': 'hidden'},
                confirmTpl_first:{'color': '#333333','padding': '10px 15px', 'font-size': '16px', 'text-align': 'left'},
                iconEvt:{'position': 'absolute', 'right': '15px', 'font-size': '16px', 'cursor': 'pointer'},
                confirmTpl_p:{'color':' #333333', 'font-size': '14px'},
                last_p:{'position': 'absolute', 'bottom': 0, 'width': '100%', 'margin-bottom': '10px', 'overflow': 'hidden'},
                cancelEle:{'border': 0, 'font-size': '16px', 'color': '#ffffff', 'width': '30%', 'background': '#878d99', 'padding': '5px 0', 'border-radius': '2px', 'line-height': 'normal', 'height': 'inherit'},
                confirmEle:{'border': 0, 'font-size': '16px', 'color': '#ffffff', 'width': '30%', 'background': '#407DD1', 'padding': '5px 0', 'border-radius': '2px', 'line-height': 'normal', 'height': 'inherit','margin-left': '30px'}
            }
        },
        computed: mapGetters({}),
        methods:{
            /**
             * 关闭当前页面
             */
            cancelEvt(){
                let that = this;
                that.$emit('cancelEle');
            },
            /**
             * 提交数据
             */
            confirmEvt(){
                let that = this;
                that.$emit('confirmEle');
            }
        }
    }
</script>
