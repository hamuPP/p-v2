<!--/**-->
<!--* Created by ty on 18/02/07.-->
<!--* Author 879372858@qq.com-->
<!--*/-->
<!--/*jshint esversion: 6 */-->
<style scoped lang="less">
    @import './detailsPage.less';
</style>

<template>
    <div class="addressbook-details-full-modal" v-if="show">
        <div class="main-content">
            <div class="mocklogin-loading-layer" v-show="isLoading">
                <img class="img" src="../../images/loading.gif" alt="">
            </div>
            <!--<div class="mocklogin"></div>-->
            <header class="header">
                <p class="title">账号详情</p>
                <span class="close-icon iconfont icon-guanbi_quxiao" @click="closeModal"></span>
            </header>
            <main class="body">
                <section class="edit-input-box">
                    <div class="input-group">
                        <label class="input-title">姓名：</label>
                        <div class="input-box">
                            <input type="text" disabled v-model="formatedData.userName">
                        </div>

                    </div>
                    <div class="input-group">
                        <label class="input-title">部门：</label>
                        <div class="input-box">
                            <input type="text" disabled v-model="formatedData.organizationName">
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="input-title">职务/岗位：</label>
                        <div class="input-box">
                            <input type="text" disabled v-model="formatedData.positionsInfo">
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="input-title">移动电话：</label>
                        <div class="input-box">
                            <input type="text" disabled v-model="formatedData.telephone">
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="input-title">个人邮箱：</label>
                        <div class="input-box">
                            <input type="text" disabled v-model="formatedData.email">
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="input-title">V网号码：</label>
                        <div class="input-box">
                            <input type="text" disabled v-model="formatedData.vNetNo">
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"

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
                formatedData: {}
            }
        },

        watch: {
        
        },
        methods: {

            add(opts){
                let me = this;
                me.show = true;
                me.formatedData = Object.assign(opts.data,{

                });

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
            }
        },
        mounted () {
            let that = this;
            that.closeLoading();
        }
    }
</script>
