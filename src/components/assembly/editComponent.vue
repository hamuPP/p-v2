/*********************************************************************
* 编辑组件页面                                                       *
* Created by tyy on 2017/6/27.                                       *
* Modified by tr on 2017/6/27.                                       *
*********************************************************************/
<template>
    <div id="editComponent" class="editComponent">
        <!--编辑组件-->
        <div class="popContent border-cc">
            <header>
                <span>编辑组件</span>
                <span class="closeBtn icon iconfont icon-guanbi_quxiao font-s16" @click="hideEditComponent"></span>
            </header>
            <!--表单页面-->
            <article>
                <form class="form-horizontal">
                    <!--所属项目-->
                    <div class="form-group">
                        <label class="col-sm-2 control-label">所属项目：</label>
                        <div class="col-sm-9">
                            <select ref="resourceSelectID" class="form-control" :disabled="resourceDisable"
                                    @change="resourceChange">
                                <option v-for="item in appsAndResourcesDtoList" :value="item.appCode">
                                    {{ item.appName }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <!--功能名称-->
                    <div class="form-group">
                        <label class="col-sm-2 control-label">功能名称：</label>
                        <div class="col-sm-9">
                            <select ref="nameSelectID" class="form-control" :disabled="nameDisable">
                                <!--<option >功能名称</option>-->
                                <option v-for="name in resourceList" :value="name.resCode">
                                    {{ name.resName }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <!--组件外观-->
                    <div class="form-group">
                        <label class="col-sm-2 control-label">组件外观：</label>
                        <div class="col-sm-9 font-cf componentExterior">
                            <label v-for="(item, i) in persentList" :class="[item.cls, item.checked ? 'active' : '']"
                                   @click="spaceMoveLableCli(item.value, i)">{{item.text}}</label>
                        </div>
                    </div>
                    <!--提交的按钮-->
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <div class="checkbox">
                                <!--确定按钮-->
                                <label>
                                    <button type="button" class="btn btn-default background-40 font-cf"
                                            @click="sureAddComponent">确定
                                    </button>
                                </label>
                                <!--取消按钮-->
                                <label>
                                    <button type="button" class="btn btn-default background-cF"
                                            @click="hideEditComponent">取消
                                    </button>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </article>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        /**
         * @returns {{
         * numInput: boolean 输入的搜索值,
         * appsAndResourcesDtoList: array 所属项目列表,
         * resourceList: array 功能名称列表,
         * resourceData: string 所属项目value,
         * nameData: string 所属名称value,
         * numPercentData: number 组件外观value,
         * resourceDisable: boolean 禁止所属项目,
         * nameDisable: boolean 禁止名称选项,
         * numPercentDisable: boolean 禁止组件外观选项,
         * cbNumber: number 接口返回数,
         * persentList: array 组件外观的数据,
         * }}
         */
        data(){
            return {
                numInput: 2,
                appsAndResourcesDtoList: [],
                resourceList: [],
                resourceData: '',
                nameData: '',
                numPercentData: '0.33',
                resourceDisable: false,
                nameDisable: false,
                numPercentDisable: false,
                cbNumber: 0,
                persentList: [
                    {cls: 'col-sm-4', checked: true, value: '0.33', text: "1/3"},
                    {cls: 'col-sm-4', checked: false, value: '0.66', text: "2/3"},
                    {cls: 'col-sm-4', checked: false, value: '1', text: "100%"}
                ]
            }
        },
        computed: mapGetters({
            /*获取所有资源列表*/
            appsResourcesData: "appsResourcesData",
            /*根据ＩＤ获取所有资源列表*/
            getIdComponentData: 'getIdComponentData',
            /*根据ID获取编辑的数据*/
            getIdEditData: 'getIdEditData',
            /*根据数据获取列表数据*/
            getIdListData: 'getIdListData',
            /* 用户登录信息*/
            userData: 'userData',
            /* 判断是新增还是编辑组件 */
            isAddOrEditComponent: 'isAddOrEditComponent',
            /* 监听数据是否新增成功 */
            setAddComponentData: 'setAddComponentData'
        }),
        /**
         * @define {{
         * blurInput: function 监听组件外观值失去焦点,
         * focusInput: function 监听组件外观值获取焦点,
         * changeInput: function 监听组件外观值改变,
         * spaceMoveLeft: function 组件外观左移,
         * hideEditComponent: function 隐藏编辑框,
         * resourceChange: function 二级联动,
         * sureAddComponent: function 新增组件,
         * spaceMoveLableCli: function 点击lable移动间隔按钮
         * }}
         */
        methods: {
            blurInput(evt){
                evt.target.setAttribute('type', 'text');
                if (evt.target.value) {
                    this.numInput = evt.target.value;
                    evt.target.value += '/3';
                }
            },
            focusInput(evt){
                evt.target.setAttribute('type', 'number');
            },
            changeInput(evt){
                let val = evt.target.value;
                if (val == 1) {
                    this.spaceMoveLeft(-100);
                } else if (val == 2) {
                    this.spaceMoveLeft(-50);
                } else if (val == 3) {
                    this.spaceMoveLeft(0);
                }
            },
            spaceMoveLeft(num){
                let spaceMoveID = this.$refs.spaceMoveID;
                spaceMoveID.style.marginLeft = num + "px";
            },
            hideEditComponent(){
                let that = this;
                that.$store.dispatch("hideEditComponentFun");
            },
            resourceChange(evt){
                let that = this;
                let val = that.$refs.resourceSelectID.value;
                let yy = that.appsResourcesData[0].appsAndResourcesDtoList.findIndex(function (value, index, arr) {
                    return value.appCode == val;
                });
                that.resourceList = that.appsAndResourcesDtoList[yy].resourceList;
            },
            sureAddComponent(evt){
                let that = this;
               /* 判断是新增还是修改*/
                this.resourceData = this.$refs.resourceSelectID.value;
                this.nameData = this.$refs.nameSelectID.value;

                if (this.isAddOrEditComponent) {
                    if (this.resourceData && this.nameData && this.numPercentData) {
                        let reqAddData = {
                            url: {
                                userId: this.userData.account
                            },
                            data: {
                                appCode: this.resourceData,
                                resCode: this.nameData,
                                resType: "4",
                                resRatio: this.numPercentData
                            }
                        };

                        this.$store.dispatch("setAddComponentFun", {reqAddData});
                    }
                } else {
                    let reqData = {
                        url: {userId: this.userData.account, id: that.getIdListData.id}, type: 'put',
                        data: JSON.stringify({
                            appCode: this.resourceData,
                            resCode: this.nameData,
                            //                           resType:"4",
                            resRatio: this.numPercentData
                        })
                    };
//                获取当前图形数据
                    this.$store.dispatch('getIdComponentFun', {reqData});

                }
            },
            spaceMoveLableCli(val, index){
                this.numPercentData = val;
                this.persentList.map((it, i) => {
                    it.checked = i <= index;
                })
            }
        },
        created(){
            this.cbNumber = 0;
            /* 获取所有业务对应下的功能*/
            this.$store.dispatch("appsResources");
        },
        /**
         * @define {{
         * cbNumber: function 监听获取所有资源列表,
         * appsResourcesData: function 监听获取所有资源列表,
         * getIdListData: function 计算列表资源,
         * getIdEditData: function 编辑返回的数据,
         * setAddComponentData: function 监听数据是否新增成功,
         * }}
         */
        watch: {
            "cbNumber": function (val) {
                let me = this;
                if (val >= 2) {
                    me.$nextTick(function () {
                        me.$refs.resourceSelectID.childNodes.forEach(it => {
                            if (me.getIdListData.appCode == it.value) {
                                it.setAttribute('selected', true);
                                me.resourceList = me.appsAndResourcesDtoList[it.index].resourceList;
                            }
                        });
                        me.$refs.nameSelectID.childNodes.forEach(it => {
                            if (me.getIdListData.resCode == it.value) {
                                it.setAttribute('selected', true);
                            }
                        });
                        me.numPercentData = me.getIdListData.resRatio;
                        me.persentList.map((it, i) => {
                            if (it.value == me.numPercentData) {
                                this.persentList.map((jt, j) => {
                                    jt.checked = j <= i;
                                })
                            }
                        });
                    });
                }

            },
            appsResourcesData(val) {
                let me = this;
                this.appsAndResourcesDtoList = val[0].appsAndResourcesDtoList;
                this.resourceList = this.appsAndResourcesDtoList[0] ? this.appsAndResourcesDtoList[0].resourceList : '';
                ++this.cbNumber;
            },
            getIdListData(){
                ++this.cbNumber;
            },
            getIdEditData(val){
                this.cbNumber = 0;
                if (val > 0) {
                    let reqDate = "编辑成功";
                    let reqData = {userId: this.userData.account};
                    /*获取组件列表getComponentList*/
                    this.$store.dispatch('getComponentListFun', {reqData});
                    /*隐藏编辑组件*/
                    this.$store.dispatch("hideEditComponentFun");
                    /*显示提示框*/
                    this.$store.dispatch('promptShow', {reqDate});
                } else {
                    let reqDate = "编辑失败";
                    this.$store.dispatch('promptShow', {reqDate});
                }
            },
            setAddComponentData(val){
                if (val > 0) {
                    let reqDate = "新增成功";
                    let reqData = {userId: this.userData.account};
                    /*获取组件列表getComponentList*/
                    this.$store.dispatch('getComponentListFun', {reqData});
                    /*隐藏编辑组件*/
                    this.$store.dispatch("hideEditComponentFun");
                    /*显示提示框*/
                    this.$store.dispatch('promptShow', {reqDate});
                } else {
                    let reqDate = "新增失败";
                    this.$store.dispatch('promptShow', {reqDate});
                }
            }
        }
    }
</script>
