<template>
    <div class="mockLogin-wrapper">
        <div class="login-header">
            <p class="login-title">登录</p>
            <p class="add-sys-icon" @click="addSys">
                <i class="iconfont icon-binghangwangguan"></i>
            </p>
        </div>

        <div class="login-body">

            <div class="body-item" v-for="(item,i) in data" :key="i" @click="loginApp(item, i)">
                <i class="iconfont" :class="item.icon"></i>
                <p class="item-text" :title="item.applicationName">{{item.applicationName}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import commonMethods from '../../vuex/modules/commonMethods'
    import FullModal from '../mockLoginFullModal/MockLogin.js'
    import editAppAccountPwd from '../mockLoginFullModal/editAccountPwd.js'
    import {mapGetters} from "vuex"

    export default {
        components: { FullModal,editAppAccountPwd },
        data() {
            return {
                commMethods:null,
                data:[],
                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 200
                },

                /*上传文件的参数*/
                fileObj: {},
                loginIndex:0
            }
        },
        computed: mapGetters({
            mockLoginSyss: 'mockLoginSyss'
        }),
        watch:{
            mockLoginSyss(val){
                let me = this;
                me.data = val;
            }
        },
        methods: {
            addSys(){
                let me = this;

                FullModal.show({
                    closeEvt:function(data){

                        //todo 满足某条件后，刷新已激活的应用
                        if(1){
                            me.$store.dispatch('getLoginSys');
                        }
                    }
                });
            },
            doLogin(obj, i){
                let that = this;

                let transferParametersType = (obj.transferParametersType && typeof obj.transferParametersType === "string" )?obj.transferParametersType.toLowerCase():"";
                console.clear();
                if(transferParametersType === 'form'){
                    that._formLogin(obj, i);
                }else if(transferParametersType === 'ajax'){
                    that.$store.dispatch('ajaxLogin',{reqData:obj});
                }
            },
            loginApp(obj,i){
                let that = this;
                let reqData = {
                    [obj.loginParameters]: obj.login,
                    [obj.passwordParameters]: obj.password,
                };

                if(obj.login && obj.password){
                    that.commMethods.loadingOn();
                    that.doLogin(obj,i);
                }else{
                    //TODO 修改账号密码
                    editAppAccountPwd.show(obj);
                }

                setTimeout(()=>{
                    that.commMethods.loadingOff();

                },1300);
            },

            _formLoginBAK(obj,i){

                let formData = new FormData();

                formData.append(obj.loginParameters, obj.login);
                formData.append(obj.passwordParameters, obj.password);
                formData.append('event', 'loadapp');

                let request = new XMLHttpRequest();
                request.open("POST", obj.requestUrl);
                request.send(formData);
            },
            _formLogin(obj,i){
                const url = obj.requestUrl;

                let oldDivs = document.getElementsByClassName(`form-wrapper-${i}`);
                let oldForms = document.getElementsByClassName(`mobileform-${i}`);
                let currentDiv;
                let currentIframe;
                let currentForm;

                if(oldDivs && oldDivs.length){
                    currentDiv = oldDivs[0];
                    currentIframe = currentDiv.getElementsByTagName("iframe")[0];
                    currentForm = oldForms[0];
                }else{
                    currentDiv = document.createElement("div");
                    currentIframe = document.createElement("iframe");
                    currentForm = document.createElement("form");

                    currentDiv.style.display = "none";
                    currentDiv.style.overflow = "hidden";
                    currentDiv.setAttribute("class", `form-wrapper-${i}`);
                    
                    currentIframe.setAttribute("name", `loginFrmMobile${i}`);
                    currentIframe.style.overflow = "hidden";
                    currentIframe.style.display = "none";
                    currentIframe.setAttribute("sandbox", "");
                    currentIframe.setAttribute("security", "restricted");

                    currentForm.setAttribute("method", obj.requestType);
//                    currentForm.setAttribute("target", `loginFrmMobile${i}`);
                    currentForm.setAttribute("target", '_blank');
                    currentForm.setAttribute('class', `mobileform-${i}`);
                    currentForm.style.display = "none";
                    currentDiv.appendChild(currentIframe);
                    document.body.appendChild(currentDiv);
                    document.body.appendChild(currentForm);
                }

                currentForm.innerHTML = "<input name='"+ obj.loginParameters+"' value=" + obj.login +" />" +
                    "<input name='"+ obj.passwordParameters+"' value=" + obj.password + " />";

//
//                    "<input name='"+ obj.passwordParameters+"' value='enhjODkwLC4v' />" +
//                    "<input name='execution' value='e1s1' />" +
//                    "<input name='lt' value='LT-5533-q1BA2qNzwxn2DGdzb6Wen7fWKbgRzL' />" +
//                    "<input name='_eventId' value='submit' />";

                currentForm.setAttribute("action", url);
                currentForm.submit();
            }
        },

        created(){
            let me = this;
            me.$store.dispatch('getLoginSys');
            me.commMethods = new commonMethods();
        }
    };
</script>