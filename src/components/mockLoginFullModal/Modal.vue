<!--/**-->
<!--* Created by ty on 18/1/24.-->
<!--* Author 879372858@qq.com-->
<!--*/-->
<!--/*jshint esversion: 6 */-->
<style scoped lang="less">
    @import './mockLoginFullModal.less';
</style>

<template>
    <div class="mock-login-full-modal"  v-if="show">
        <div class="main-content">
            <div class="mocklogin-loading-layer" v-show="isLoading">
                <img class="img" src="../../images/loading.gif" alt="">
            </div>
            <!--<div class="mocklogin"></div>-->
            <header class="header">
                <p class="title">全部应用</p>
                <span class="close-icon iconfont icon-guanbi_quxiao" @click="closeModal"></span>
            </header>
            <main class="body">
                <div v-for="(it,i) in formatedPageRenderData" :key="i"
                     class="body-item">
                    <div class="inner-content" :class="{'edit-mode':it.editMode}">
                        <input class="checkbox" type="checkbox" @click="check(it, i)" checked v-if="it.checked" :data-id="it.checked">
                        <input class="checkbox" type="checkbox" @click="check(it, i)" v-if="!it.checked" :data-id="it.checked">


                        <i class="avatar iconfont" :class="it.icon" v-show="!it.editMode"></i>
                        <p class="item-text" :title="it.applicationName">{{it.applicationName}}
                            <span v-if="!it.editMode" class="edit-account iconfont icon-bianji_xiugai" @click="editAccount(it, i)"></span>

                            <span v-if="it.editMode" class="edit-account iconfont icon-queren" @click="submitEditedAccount(it, i)"></span>
                            <span v-if="it.editMode" class="edit-account iconfont icon-quxiao" @click="cancleEditedAccount(it, i)"></span>
                        </p>
                        <div v-show="it.editMode" class="edit-input-box">
                            <div class="input-group">
                                <label class="input-title">账号：</label>
                                <div class="input-box">
                                    <input type="text" placeholder="输入新账号" v-model="it._login">
                                </div>

                            </div>
                            <div class="input-group">
                                <label class="input-title">密码：</label>
                                <div class="input-box">
                                    <input type="password" placeholder="输入新密码" v-model="it._password">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="content-footer">
                <button class="btn btn-success" @click="activeApps">确认</button>
                <button class="btn btn-default" @click="closeModal">取消</button>
            </footer>

        </div>
        <!--<template v-for="message in messages">-->



        <!--</template>-->
    </div>
</template>

<script>
    import {mapGetters} from "vuex"

    export default{
        components: {  },
        props:{
            _dummy:{
                type: Array,
                default: []
            }
        },
        data() {
            return {
                activedSystems:{},
                currentOperatedAppIndex:null,
                currentOperatedAppInfo:{},
                loginAccount:"",
                requestCount:0,
                isLoading:true,
                show:true,
                formatedPageRenderData:[],//
            }
        },

        watch:{
            mockLoginActivedAppsInFullpage(val){
                let that = this;

                val.forEach(it =>{
                    that.activedSystems[it.applicationId] = {
                        "applicationId": it.applicationId,
                        "id": it.id,
                        "login": it.login,
                        "password": it.password,
                    }
                });

                (that.requestCount)++;

            },
            allSystemData(val){
                let that = this;
                (that.requestCount)++;
            },

            requestCount(val){
                let that = this;

                if(val > 1){
                    that.formatedPageRenderData = that.allSystemData.map(it=>{
                        let activedSystem = that.activedSystems[it.id];
                        let result = Object.assign(it,{
                            checked:Boolean(activedSystem),
                            _login:(activedSystem && activedSystem.login)? activedSystem.login : "",
                            _password:(activedSystem && activedSystem.password)? activedSystem.password : "",
                            id:(activedSystem && activedSystem.id)? activedSystem.id:0,
                            pseudoApplicationId:it.id
                        });

                        return result;
                    });

                    that.closeLoading();
                }
            },

            /**
             * 各個アプリのアカウントとパスワードを保存した結果
             */
            mockloginAppActiveResult(val){
                let that = this;
                if(val && val.meta && val.meta.code == 1){

                    that.currentOperatedAppInfo.editMode = false;

                    that.$set(that.formatedPageRenderData, that.currentOperatedAppIndex, that.currentOperatedAppInfo);

                    that.closeLoading();
                }else{
                    let errMsg = (val && val.meta && val.meta.message)?"":"error";
                    that.$set(that.currentOperatedAppInfo, 'editMode', true);
                    that.showToast(errMsg);
                    that.closeLoading();
                }
            },

            mockloginAppsActiveResult(val){
                let me = this;

                if(val && val.meta && val.meta.code == 1){
                    me.closeLoading();
                    me.closeModal();
                }else{
                    let errMsg = (val && val.meta && val.meta.message)?"":"error";
                    me.closeLoading();
                    me.showToast(errMsg)
                }

            }
        },
        computed:mapGetters({
            mockLoginActivedAppsInFullpage:'mockLoginActivedAppsInFullpage',
            allSystemData: 'allSystemData',
            mockloginAppsActiveResult:'mockloginAppsActiveResult',
            mockloginAppActiveResult: 'mockloginAppActiveResult'
        }),
        methods: {
            /**
             * 確認buttonをクリック
             */
            activeApps(){
                let me = this;
                let editModeOverFlag = true;
                let result = [];

                for(let i=0,len = me.formatedPageRenderData.length;i<len;i++){
                    let o = me.formatedPageRenderData[i];
                    let _o = {};

                    o.editMode && (editModeOverFlag = false);

                    _o = {
                        "account":me.loginAccount,
                        "loginName": o._login || "",
                        "password": o._password || "",
                        "pseudoApplicationId": o.pseudoApplicationId,
                        "status": Number(o.checked)//1-active;0-all
                    };

                    result.push(_o);
                }

                if(editModeOverFlag){
                    me.openLoading();
                    me.$store.dispatch('activeApps',{reqData:result});
                }else{
                    me.showToast('有未保存的账号密码，请确认');
                }

            },
            /**
             * 增加并显示一个message
             */
            addFFF(opts){
                let me = this;
                me.show = true;
                me.closeEvt2 = opts.closeEvt;

                me.$store.dispatch('getAllSystems');
                me.$store.dispatch('getActivedAppsInAllAppsFullPage');
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
                me._clearAllData();
                me.closeEvt2({
                    "_id":666
                });
            },
            /**
             * アカウントとパスワードの編集
             * @param idx
             */
            editAccount(tar, idx){
                let me = this;
                let newObj = Object.assign(tar, {
                    editMode:true
                });

                me.$set(me.formatedPageRenderData, idx, newObj);
            },
            check(tar, idx){
                let me = this;

                let newObj = Object.assign(tar, {
                    checked:!tar.checked
                });

                me.$set(me.formatedPageRenderData, idx, newObj);
            },

            /**
             * 各アプリのアカウントとパスワードを保存
             * @param tar
             * @param idx
             */
            submitEditedAccount(tar, idx){
                let me = this;
                let result = [];

                me.currentOperatedAppInfo = tar;
                me.currentOperatedAppIndex = idx;

                let o = {
                    "account": me.loginAccount,
                    "id":tar.id,
                    "loginName": tar._login || "",
                    "password": tar._password || "",
                    "pseudoApplicationId": tar.pseudoApplicationId
                };

                result.push(o);
                me.openLoading();
                me.$store.dispatch('activeApp',{reqData: o});
            },

            /**
             * 各アプリのアカウントとパスワードの保存を取り消し
             * @param tar
             * @param idx
             */
            cancleEditedAccount(tar, idx){
                let me = this;

                let newObj = Object.assign(tar, {
                    editMode:false
                });

                me.$set(me.formatedPageRenderData, idx, newObj);
            },

            showToast(msg){
                let me = this;
                alert(msg);
            },

            _clearAllData(){
                this.activedSystems = {};
                this.formatedPageRenderData=[];
                this.requestCount = 0;
            }
        },
        created() {
            this.loginAccount = sessionStorage.getItem("loginAccount");
        },
        mounted () {
            let that = this;

            setTimeout(()=>{
                if(that.requestCount < 2){
                    that.closeLoading();
                }
            },5000);
        }
    }
</script>
