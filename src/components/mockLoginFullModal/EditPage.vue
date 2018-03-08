<!--/**-->
<!--* Created by ty on 18/1/26.-->
<!--* Author 879372858@qq.com-->
<!--*/-->
<!--/*jshint esversion: 6 */-->
<style scoped lang="less">
    @import './mockLoginFullModal.less';
</style>

<template>
    <div class="mock-login-full-modal single-edit" v-if="show">
        <div class="main-content">
            <div class="mocklogin-loading-layer" v-show="isLoading">
                <img class="img" src="../../images/loading.gif" alt="">
            </div>
            <!--<div class="mocklogin"></div>-->
            <header class="header">
                <p class="title">设置账号密码</p>
                <span class="close-icon iconfont icon-guanbi_quxiao" @click="closeModal"></span>
            </header>
            <main class="body">
                <h4 class="body-title"><span class="inner-text">{{data.applicationName}}</span></h4>
                <section class="edit-input-box">
                    <div class="input-group">
                        <label class="input-title">账号：</label>
                        <div class="input-box">
                            <input type="text" placeholder="输入新账号" v-model="data.login">
                            <!--<input type="text" placeholder="输入新账号">-->
                        </div>

                    </div>
                    <div class="input-group">
                        <label class="input-title">密码：</label>
                        <div class="input-box">
                            <input type="password" placeholder="输入新密码" v-model="data.password">
                            <!--<input type="password" placeholder="输入新密码">-->
                        </div>
                    </div>
                </section>
            </main>
            <footer class="content-footer">
                <button class="btn btn-success" @click="save">确认</button>
                <button class="btn btn-default" @click="closeModal">取消</button>
            </footer>

        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"

    export default{
        components: {},
        props: {
            _dummy: {
                type: Array,
                default: []
            }
        },
        computed:mapGetters({
            mockloginAppUpdateResultInEditPage: 'mockloginAppUpdateResultInEditPage'
        }),
        data() {

            return {
                isLoading: true,
                show: true,
                data: {}
            }
        },

        watch: {
            /**
             * 各個アプリのアカウントとパスワードを保存した結果
             */
            mockloginAppUpdateResultInEditPage(val){
                let that = this;
                if(val && val.meta && val.meta.code == 1){
                    that.closeLoading();
                    that.closeModal();
                }else{
                    let errMsg = (val && val.meta && val.meta.message)?"":"error";
                    that.showToast(errMsg);
                    that.closeLoading();
                    that.closeModal();
                }
            }
        },
        methods: {

            add(opts){
                let me = this;
                me.show = true;
                me.data = opts;
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
            save(){
                let me = this;
                let o = {
                    "account": me.data.account,
                    "id":me.data.id,
                    "loginName": me.data.login || "",
                    "password": me.data.password || "",
                    "pseudoApplicationId": me.data.applicationId
                };

                me.openLoading();
                me.$store.dispatch('updateAppAccountPasswordInEditPage',{reqData: o});
            },
            showToast(msg){
                let me = this;
                alert(msg);
            }
        },
        created() {


        },
        mounted () {
            let that = this;
            that.closeLoading();
        }
    }
</script>
