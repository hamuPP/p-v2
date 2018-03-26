<!--/**-->
<!--* Created by ty on 18/03/09.-->
<!--* Author 879372858@qq.com-->
<!--*/-->
<!--/*jshint esversion: 6 */-->
<style scoped lang="less">
    @import './modalPage.less';
</style>

<template>
    <div class="favorites-tools-modal-wrapper" v-if="show" @click="hideModal">
        <div class="main-content">
            <div class="mocklogin-loading-layer" v-show="isLoading">
                <img class="img" src="../../images/loading.gif" alt="">
            </div>
            <!--<div class="mocklogin"></div>-->
            <main class="body">
                <div v-for="it in formatedData" :key="it._frontId" class="body-item" @click.stop="openToolPage(it.href)">
                    <div class="img-box">
                        <i class="iconfont col " :class="it.icon"></i>
                    </div>

                    <div class="text-box">
                        {{it.title}}
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"

    export default{
        name: 'favoritesToolsModal',
        components: {},
        props: {
            top:0,
            right:0,
            _dummy: {
                type: Array,
                default: []
            }
        },
        computed: mapGetters({
            mockloginAppUpdateResultInEditPage: 'mockloginAppUpdateResultInEditPage'
        }),
        data() {

            return {
                isLoading: true,
                show: true,
                formatedData: [],
                mmm: function(cc){}
            }
        },

        watch: {},
        methods: {

            add(opts){
                let me = this;
                me.show = true;
                let idx = 0;
                me.formatedData = opts.data.map(it => {

                    it._frontId = idx;
                    idx++;

                    return it;
                });

                //bind eventlistener
                if(opts.onClickItem.constructor === Function){
                    me.mmm = opts.onClickItem;
                }
            },

            hide(opts){
                let me = this;
                me.show = false;
            },

            openLoading(){
                let me = this;
                me.isLoading = true;
            },

            closeLoading(){
                let me = this;
                me.isLoading = false;
            },

            closeModal(e){
                let me = this;
                me.show = false;
            },
            showToast(msg){
                let me = this;
                alert(msg);
            },

            openToolPage(href){
                let that = this;

                that.mmm(href);
            },

            hideModal(){
                let that = this;

                that.show = false;
            }
        },
        mounted () {
            let that = this;
            that.closeLoading();
        }
    }
</script>
