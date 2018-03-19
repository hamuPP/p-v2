/*********************************************************************
* 登录模块                                                           *
* Created by tr on 2017/6/27.                                        *
*********************************************************************/
<style scoped>
    /*@import "../../styles/style.css";*/
</style>
<template>
    <div id="Login" class="Login">
        <div class="logo-box">
            <img src="" alt="logo" style="visibility: hidden"/>
        </div>
        <!-- <div class="client-box" style="position:absolute;top:15px;right:10px;padding:2px;">
             <a  href="/publish/portal-setup-1.1.6.exe">windows客户端下载</a>
         </div>-->
        <!--用户信息模块-->
        <div class="login-wrapper">
            <div class="header">
                <h3>统一业务平台</h3>
                <h4>UNIFIED SERVICE PLATFORM</h4>
                <img src="../../images/login-avatar.png" alt="avatar"/>
            </div>
            <form>
                <div class="control-group">
                    <label><img src="../../images/account.png" alt="account"/><span>账号</span></label>
                    <input type="text" class="form-control"
                           placeholder="请输入用户名" required="true" v-model="userName">
                </div>
                <div class="control-group">
                    <label><img src="../../images/pwd.png" alt="account"/><span>密码</span></label>
                    <input class="form-control"
                           type="password" style=""
                           placeholder="密 码" required="true"  v-model="password">
                </div>
                <div class="checkbox" style="text-align: left;color: #ccc;width: 85%;">
                    <input type="checkbox" class="checkbox"> 记住我
                </div>
                <div class="msg-group" v-bind:class="{'show':isShow}">
                    <p id="msgTxt">{{loginDataValue}}</p>
                </div>
                <template v-if="!isShow">
                    <button type="button" class="btn btn-primary" @click="loginEle">
                        <span class="text">登录</span>
                    </button>
                </template>
                <template v-else>
                    <button type="submit" class="btn btn-primary">
                        <img src="../../images/loading_white.gif" width="20">
                    </button>
                </template>
            </form>
        </div>
        <!--<div class="footer">-->
        <!--<p>Copyright ©️ 2017 <a href="javascript:">四川省水电集团</a> 版权所有</p>-->
        <!--</div>-->

        <div class="footer-software-dept">
            <div class="img"></div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default{
        /**
         * @returns {{
         * password: string 登录密码,
         * userName: string 用户名,
         * isShow: boolean 是否显示提示信息,
         * loginDataValue: string 提示的信息
         * }}
         */
        data(){
            return {
                password:'123456',
                userName:'admin',
                isShow:false,
                loginDataValue : ''
            }
        },
        computed: mapGetters({
            /*登录后的数据*/
            loginData: "loginData"
        }),
        watch:{
            /**
             * 监听登录后返回的数据
             * @param val 返回的数据信息
             */
            loginData(val){
                const that = this;

                that.loginDataValue = val.msg;
                that.isShow = true;
                sessionStorage.setItem('loginAccount', that.userName);
                /*2s后信息自动隐藏*/
                if (val) {
                    setTimeout(function () {
                        that.loginDataValue = "";
                        that.isShow = false;

                        //页面跳转到首页index
                        that.$router.push({path:'/index'});
                    }, 2000);
                }
            }
        },
        methods : {
            /**
             * 登录操作
             */
            loginEle : function () {
                const that = this;
//                that.$store.dispatch('loadingShow');
                let password = that.password,
                    username = that.userName;
                if(password && username) {
                    let reqData = {
                        password: password,
                        username: username
                    };
                    that.$store.dispatch('loginV2', {reqData});
                }
            }
        },

        created(){
            console.log('login.vue created');
        }
    }
</script>
