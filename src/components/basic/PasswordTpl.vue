/*********************************************************************
* 修改密码模块                                                       *
* Created by tr on 2017/6/27.                                        *
*********************************************************************/
<template>
    <div id="pwdTpl" v-if="pwdVisible" class="pwdTpl">
        <div>
            <p class="title">修改密码<span @click="cancel">X</span></p>
            <form class="form-inline">
                <div class="form-group">
                    <label>帐户名:</label>
                    <span class="font-s14 font-c6">{{userData.userName}}</span>
                </div>
                <div class="form-group">
                    <label for="oldPassword">原密码:</label>
                    <input type="password" class="form-control" id="oldPassword" placeholder="请输入原密码" v-model="oldPwd">
                </div>
                <div class="form-group">
                    <label for="newPassword">新密码:</label>
                    <input type="password" maxlength="16" class="form-control" id="newPassword" placeholder="请输入新密码，6-16字符" v-model="newPwd" @input="inputEle">
                </div>
                <div class="form-group">
                    <label for="confirmPassword">确认密码:</label>
                    <input type="password"  maxlength="16" class="form-control" id="confirmPassword" placeholder="请与新密码一致" v-model="confirmPwd" @input="inputEle">
                </div>
                <div class="form-group prompt">
                    {{this.promptData}}
                </div>
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-default" @click="confirm">保存</button>
                    <button type="button" class="btn btn-default" @click="cancel">取消</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        /**
         * @returns {{promptData: string}}
         */
        data(){
            return{
                promptData:''
            }
        },
        computed: mapGetters({
            /*是否打开修改密码页面*/
            pwdVisible: "pwdVisible",
            /*用户的基本信息*/
            userData:'userData',
            /*修改密码返回的数据*/
            resetPwdData:'resetPwdData'
        }),
        watch:{
            /**
             * 修改密码返回的数据
             * @param val 修改密码
             */
            resetPwdData(val){
                if(val.code === 0) {
                    this.promptData = val.message;
                }else {
                    this.$store.dispatch('hideResetPwd');
                     /**田蓉 修改  为了兼容ie*/
                    this.$router.push({path:'/login'});
                    //window.location.href = "#/login";
                }
            }
        },
        methods:{
            /**
             * 提交信息
             */
            confirm(){
                let confirmPwd = this.confirmPwd,
                    newPwd = this.newPwd,
                    oldPwd = this.oldPwd;

                /*判断信息是否正确*/
                if(confirmPwd && newPwd && oldPwd && confirmPwd === newPwd) {

                    if(confirmPwd.length < 6 || confirmPwd.length > 16){
                        this.promptData="密码6~16位";
                    }else{
                        this.promptData="";

                        /* change pwd to MD5 */
                        let reqData = JSON.stringify({
                            account: this.userData.account,
                            oldPwd: hex_md5(oldPwd).toUpperCase(),
                            newPwd: hex_md5(confirmPwd).toUpperCase()
                        });
                        this.$store.dispatch('getResetPwd',{reqData});
                    }
                }else if(confirmPwd !== newPwd) {
                    this.promptData="两次输入的密码不一致";
                } else {
                    this.promptData="密码不能为空";
                }
            },
            /**
             * 关闭修改密码页面
             */
            cancel(){
                this.$store.dispatch('hideResetPwd');
            },
            /**
             * 判断两次输入的新密码是否正确
             */
            inputEle(){
                let confirmPwd = this.confirmPwd,
                    newPwd = this.newPwd;

                if(confirmPwd !== newPwd) {
                    this.promptData="两次输入的密码不一致";
                }else {

                    this.promptData = "";
                }
            }
        }
    }
</script>
