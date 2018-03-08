<template>
    <div class="fullpage-main" v-if="isFullpageShow">
        <div>
            <!--用户的操作按钮-->
            <userOperation></userOperation>
        </div>

        <!--所有右边的数据模块-->
        <div ref="noticeFull" class="row inner-main">
            <div class="inner-inner-main noticeFull noticeEdit">
                <div class="notice-title">
                    <p>公告管理</p>
                    <button class="goBackTo" @click="backSpace">
                        <i class="iconfont col icon-fanhuishangyiji"></i>返回上级
                    </button>
                </div>
                <div class="noticeEdit-content">
                    <div class="notice-edit-content">
                        <div class="column">
                            <label class="content-label"><i>*</i>公告标题:</label>
                            <input class="input-width" type="text" v-model="curObj.annoTitle" required
                                   placeholder="请输入最多40个汉字、字母或数字内容" maxlength="40">
                        </div>
                        <div>
                            <label class="content-label"><i>*</i>公告类型:</label>
                            <span
                                    v-for="item in noticeType"
                                    class="radioBox-item"
                                    :class="[{'active': item.checked}]"
                                    :now-val="item.value"
                                    @click="typePickEvt(item)">{{item.name}}</span>
                        </div>
                        <div>
                            <label class="content-label"><i>*</i>发布范围:</label>
                            <button class="active" @click="rangeSet">范围设置</button>
                        </div>
                        <div>
                            <label class="content-label"><i>*</i>有效日期:</label>
                            <div class="notice-time">
                                <div class="form-control calendar-ipt"
                                     id="firstTime"
                                     @click="firstTime"
                                     v-model="createTime"
                                     now-id="activityST"
                                     :new-val="curObj.effectiveStartTime">
                                    {{curObj.effectiveStartTime}}
                                    <div class="input-group-addon iconfont icon-riqi"></div>
                                </div>
                            </div>
                            <span class="notice-input">至</span>
                            <div class="notice-time notice-pr10">
                                <div class="form-control calendar-ipt"
                                     id="lastTime"
                                     @click="lastTime"
                                     v-model="createTime"
                                     now-id="activityST"
                                     :new-val="curObj.effectiveEndTime">
                                    {{curObj.effectiveEndTime}}
                                    <div class="input-group-addon iconfont icon-riqi"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="content-label"><i>*</i>事务提醒:</label>
                            <span class="checkbox-item" :class="[curObj.isPortalNotice === 1 ? 'active':'display']"
                                  @click="checkEvt('portal')">门户消息提醒</span>
                            <span class="checkbox-item" :class="[curObj.isSmsNotice === 1 ? 'active':'display']"
                                  @click="checkEvt('sms')">手机短信提醒</span>
                        </div>
                        <div>
                            <label class="content-label">消息置顶:</label>
                            <div class="button-temp">
                                <button :class="{'active':curObj.isTop === 1}" @click="noticeTopEvt('y')">是
                                </button>
                                <button :class="{'bad': curObj.isTop === 2}" @click="noticeTopEvt('n')">否
                                </button>
                            </div>
                        </div>
                        <div>
                            <label class="content-label"></label>
                            <div class="content-select bad">
                                <Selection showType='scroll' :objProps="noticeTop"
                                           @clickEvt="noticeTopTypeEvt"></Selection>
                            </div>
                            <em>结束置顶</em>
                        </div>
                        <div>
                            <label class="content-label content-file">附件上传:</label>
                            <input type="file" name="" style="display: none;">
                            <div class="icon-file">
                                <p class="addFile" @click="upload"><i></i>添加附件</p>
                                <div class="files-box" ref="filesBox">
                                    <em class="file-item" v-for="it in uploadedFiles">{{it.fileName}} {{it._fileSize}}kb <i
                                            class="close-icon" @click="deleteFile(it)">X</i></em>
                                </div>

                            </div>
                        </div>
                        <div class="editor-row-container">
                            <div class="inner-content">
                                <label class="content-label">公告内容:</label>
                                <!--<input type="text" placeholder="请输入最多40个汉字、字母或数字内容" maxlength="40">-->
                                <div class="editor-container">
                                    <UE :defaultMsg="defaultMsg" :config="editorConfig" ref="editor"></UE>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="content-label"></label>
                        </div>
                        <div class="last">
                            <label class="content-label"></label>
                            <button @click="save(1)" class="release">发布</button>
                            <button @click="save(2)" class="save">保存</button>
                            <button @click="backSpace">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--日历控件-->
        <CalendarTpl></CalendarTpl>

        <!--范围设置-->
        <div class="setRange" v-if="showRange">
            <div>
                <p class="range-title">范围设置<label class="close" @click="closeTree">X</label></p>
                <div class="range-content">
                    <div class="range-content-title">
                        <label>发布范围</label>
                        <div>
                            <Selection showType='scroll' :objProps="selectData" @clickEvt="noticeTypeEvt"></Selection>
                        </div>
                    </div>
                    <div class="range-content-tree">
                        <div>
                            <div class="left">
                                <Tabs :tabsData="tabsData"></Tabs>
                                <div class="tree-wrapper">
                                    <Tree :newTreeObj="treeObj" :treeObj="treeObj" :treeParams="treeParams"
                                          @treeEvt="treeEvt"></Tree>
                                </div>
                            </div>
                            <div class="right">
                                <p class="right-title">已选({{curTree.length}}) <span
                                        @click="deleteTreeData('all')">清空</span></p>
                                <div class="right-content">
                                    <ul v-if="curTree.length" class="selectTree">
                                        <li v-for="(it,i) in curTree">{{it.name}}<label
                                                @click="deleteTreeData(it)">X</label></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="range-content-button">
                        <button class="active" @click="treeSave">确定</button>
                        <button @click="closeTree">取消</button>
                    </div>
                </div>
            </div>
        </div>
        <FileBox :fileObj="fileObj" v-on:getFileData="fileData" ref="file"></FileBox>
    </div>
</template>
<script>
    import userOperation from '../basic/userOperation.vue'
    import Selection from '../Selection.vue'
    import CalendarTpl from '../calendar/CalendarTpl.vue'
    import FileBox from '../plugins/FileBox.vue'
    import Tabs from '../Tabs.vue'
    import Tree from '../plugins/Tree.vue'
    import UE from '../Editor.vue'
    import Utils from '../../../vuex/Utils.js'

    import {mapGetters} from "vuex"

    export default {
        name:'NoticeAddAndEdit.vue',
        components: {
            userOperation, Selection, CalendarTpl, FileBox, Tabs, Tree, UE
        },
        data() {
            return {
                isFullpageShow:true,
                uploadedFiles: [],
                fileObj: {},
                showRange: false, //是否显示范围设置
                tabsData: {
                    borderShow: true,
                    list: [
                        {id: "001", name: "组织"},
                        {id: "002", name: "角色"}
                    ]
                },
                selectData: {
                    placeholder: "请选择",
                    list: [
                        {id: 1, name: "公司",checked:true},
                        {id: 2, name: "单位"}
                    ]
                },
                treeParams: {
                    isCheck: true
                },
                treeObj: [],
                iptIBObj: {
                    placeholder: "请选择",
                    height: '24px',
                    radius: true,
                    shadow: true
                },
                noticeStyle: {
                    isFull: true
                },
                noticeTop: {
                    placeholder: '请选择',
                    list: [
                        {id: 1, name: '一天', checked: true},
                        {id: 2, name: '三天', checked: false},
                        {id: 3, name: '一周', checked: false},
                        {id: 4, name: '一月', checked: false}
                    ]
                },//公告的类型数据
                noticeType: [
                    {id: 1, name: '通知', checked: true},
                    {id: 2, name: '通报', checked: false},
                    {id: 3, name: '决议', checked: false},
                    {id: 4, name: '其他', checked: false}
                ],//公告
                noticeTime: {
                    placeholder: '请选择',
                    list: [
                        {id: 1, name: '创建时间',checked:true},
                        {id: 2, name: '有效时间'},
                        {id: 3, name: '结束时间'},
                    ]
                },
                curObj: {
                    annoTitle: '',
                    isPortalNotice: 1,
                    isSmsNotice: 2,
                    annoType:1,
                    isTop: 2,
                    annexName: '',
                    isRelease: 2,
                    releaseScode: 1,
                    orgCode: '',
                    effectiveStartTime:'',
                    effectiveEndTime:''
                }, //当前的数据
                //editor conf options
                editorConfig: {
                    initialFrameWidth: null,
                    initialFrameHeight: 284
                },
                defaultMsg: '',
                curTree: []
            }
        },
        computed: mapGetters({
            noticeTree: 'noticeTree',
            saveNoticeData: 'saveNoticeData',
            noticeIdFindData: 'noticeIdFindData',
            deleteFileData: 'deleteFileData'
        }),
        watch: {
            'noticeTree': function (val) {
                let that = this;
                that.$nextTick(() => {
                    that.curTree = [];
                    let newOrgCodes = [];
                    let isEmptyObj = new Utils().isEmptyObj(that.noticeIdFindData);//ハジメはナイデス

                    if (that.noticeIdFindData && !isEmptyObj) {
                        newOrgCodes = (that.noticeIdFindData.departmentOrgCodes && that.noticeIdFindData.departmentOrgCodes.length) ?
                            that.noticeIdFindData.departmentOrgCodes :
                            that.noticeIdFindData.companyOrgCodes;

                    }
                    let fn = function (arr, newPid, pId) {
                        return arr.map(it => {
                            let _children = [];
                            if (it.children && it.children.length) {
                                _children = fn(it.children, it.pid, it.orgCode);
                            }
                            let pid = newPid ? (newPid + ',' + pId) : pId;
                            let newItem = {};
                            if (newOrgCodes && newOrgCodes.length) {
                                newOrgCodes.map((item, i) => {

                                    newItem = Object.assign(it, {
                                        pid: pid,
                                        name: it.orgName,
                                        id: it.orgCode,
                                        checked: it.orgCode === item,
                                        check: false,
                                        children: _children
                                    });

                                    if (it.orgCode === item) {
                                        that.curTree.push(newItem);
                                    }

                                });
                            } else {
                                newItem = Object.assign(it, {
                                    pid: pid,
                                    name: it.orgName,
                                    id: it.orgCode,
                                    checked: false,
                                    check: false,
                                    children: _children
                                });
                            }

                            return newItem;
                        });
                    };
                    that.treeObj = fn(val, 0, 0);
                });
            },
            'saveNoticeData': function (val) {
                let that = this;
                that.$nextTick(() => {
                    that.curObj = {};
                    window.history.back();
                });
            },
            'noticeIdFindData': function (val) {
                let that = this;
                that.$nextTick(() => {
                    if(val.constructor === Object && Object.keys(val).length) {
                        that.curObj = val;
                        that.curObj.effectiveStartTime = that.curObj.effectiveStartTime.substring(0, 10);
                        that.curObj.effectiveEndTime = that.curObj.effectiveEndTime.substring(0, 10);
                        that.curObj.createDate = that.curObj.createDate.substring(0, 10);

                        if (that.curObj.companyOrgCodes && that.curObj.companyOrgCodes.length) {
                            that.curObj.orgCode = that.curObj.companyOrgCodes.join();
                        } else if (that.curObj.departmentOrgCodes && that.curObj.departmentOrgCodes.length) {
                            that.curObj.orgCode = that.curObj.departmentOrgCodes.join();
                        }
                        that.noticeType = that.noticeType.map(item => {
                            item.checked = item.id === val.annoType;
                            return item;
                        });
                        that.defaultMsg = val.annoContent;
                    }

                });
            },

            'deleteFileData': function (val) {
                let me = this;
                let fileId = val.uuid;

                for (let i = 0; i < me.uploadedFiles.length; i++) {
                    let o = me.uploadedFiles[i];
                    if (o.fileUuid === fileId) {
                        me.uploadedFiles.splice(i, 1);
                        break;
                    }
                }
            }
        },
        methods: {
            hideFullpage(flag){
                this.isFullpageShow = !flag;
            },
            /*返回上级*/
            backSpace(){
                window.history.go(-1);
            },
            /**
             * 开始时间的事件方法
             * @param evt
             */
            firstTime(evt){
                let that = this;
                let _target = document.getElementById(evt.target.id);
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                let calendarPosTop = $(evt.target).offset().top - scrollTop - 10;
                let calendarPosLeft = $(evt.target).offset().left;
                let calendarParentId = _target.getAttribute('now-id');
                let calendarStartTime = _target.getAttribute('now-val');
                let calendarCallback = function (date) {
                    if (calendarParentId === 'activityST') {
                        that.curObj.effectiveStartTime = date;
                    }
                };
                that.$store.dispatch('calendarToggleEvt', {
                    calendarStartTime,
                    calendarParentId,
                    calendarPosTop,
                    calendarPosLeft,
                    calendarCallback
                });
            },
            /**
             * 结束时间的事件方法
             * @param evt
             */
            lastTime(evt){
                let that = this;
                let _target = document.getElementById(evt.target.id);
                let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                let calendarPosTop = $(evt.target).offset().top - scrollTop - 10;
                let calendarPosLeft = $(evt.target).offset().left;
                let calendarParentId = _target.getAttribute('now-id');
                let calendarStartTime = _target.getAttribute('now-val');
                let calendarCallback = function (date) {
                    if (calendarParentId === 'activityST') {
                        that.curObj.effectiveEndTime = date;
                    }
                };
                that.$store.dispatch('calendarToggleEvt', {
                    calendarStartTime,
                    calendarParentId,
                    calendarPosTop,
                    calendarPosLeft,
                    calendarCallback
                });
            },
            /**
             * 获取公告类型数据事件
             * @param ele
             */
            noticeTypeEvt(ele){
                let that = this;
                that.curObj.releaseScode = ele.id;
                that.$store.dispatch('getNoticeTree', {reqData: String(ele.id)});
            },
            noticeTopTypeEvt(ele){
                this.curObj.endTopType = ele.id;
            },
            typePickEvt(ele){
                let that = this;
                that.noticeType = that.noticeType.map(item => {
                    item.checked = ele.id === item.id;
                    return item;
                });

                that.curObj.annoType = ele.id;
            },
            /*通告的操作*/
            checkEvt(ele){
                ele === 'portal' ?
                    (this.curObj.isPortalNotice = this.curObj.isPortalNotice === 1 ? 2 : 1) :
                    ( this.curObj.isSmsNotice = this.curObj.isSmsNotice === 1 ? 2 : 1);
            },
            noticeTopEvt(ele){
                this.curObj.isTop = ele === 'y' ? 1 : 2;
            },
            rangeSet(){
                let that = this;
                that.showRange = true;
                //that.$store.dispatch('getNoticeTree', {reqData: ''});
            },
            /*接受树的事件*/
            treeEvt(ele){
                let that = this,
                    curObj = ele.curObj,
                    newTree = [];
                if (ele.action !== 'input') return false;
                if (curObj.check) {
                    that.curTree.push(curObj);
                } else {
                    that.curTree.map(item => {
                        if (item.id !== curObj.id) {
                            newTree.push(item);
                        }
                    });
                    that.curTree = newTree;
                }
            },
            /*关闭当前范围设置*/
            closeTree(){
                this.showRange = false;
            },
            getUEContent() {
                return this.$refs.editor.getUEContent();
            },
            /*删除*/
            deleteTreeData(ele){
                let that = this;
                if (ele !== 'all') {
                    that.curTree.splice(that.curTree.findIndex(item => item.id === ele.id), 1);
                    let fn = function (arr) {
                        return arr.map(it => {
                            let _children = [];

                            if (it.children && it.children.length) {
                                _children = fn(it.children);
                            }

                            if (it.id === ele.id) {
                                it.check = false;
                            }

                            return Object.assign(it, {
                                children: _children
                            });

                        });
                    };
                    that.treeObj = fn(that.treeObj);
                } else {
                    that.curTree = [];
                    let fn = function (arr) {
                        return arr.map(it => {
                            let _children = [];

                            if (it.children && it.children.length) {
                                _children = fn(it.children);
                            }

                            return Object.assign(it, {
                                check: false,
                                children: _children
                            });

                        });
                    };
                    that.treeObj = fn(that.treeObj);
                }

            },
            treeSave(){
                let that = this;
                let orgCode = "";
                if (that.curTree) {
                    that.curTree.map(item => {
                        orgCode += item.orgCode + ',';
                    });
                }
                that.curObj.orgCode = orgCode;
                this.showRange = false;
            },
            /**
             * 发布消息
             */
            save(type){
                let me = this;
                /*公告内容*/
                me.curObj.annoContent = me.getUEContent();

                //然后curObj就是提交给后端的保存的数据
                //获得上传附件的uuid
                let uuids = [];
                if (me.uploadedFiles && me.uploadedFiles.length) {
                    me.uploadedFiles.forEach((it) => {
                        uuids.push(it.fileUuid);
                    });
                }
                me.curObj.annexName = uuids.join();
                me.curObj.isRelease = type * 1;


                if (me.curObj.orgCode.constructor === Array) {
                    me.curObj.orgCode = me.curObj.orgCode.join();
                }

                delete me.curObj.annexInfo;
                delete me.curObj.companyOrgCodes;
                delete me.curObj.departmentOrgCodes;

                me.$store.dispatch('saveNotice', {reqData: me.curObj});
            },

            upload(){
                let me = this;
                me.$refs.file.fileInput();
            },

            fileData(val){
                let me = this;
                let o = Object.assign(val.obj, {
                    _fileSize: (val.obj.fileSize / 1024).toFixed(2)
                });
                me.uploadedFiles.push(o);
            },

            deleteFile(p){
                let me = this;
                let id = p.fileUuid;

                me.$store.dispatch('deleteFileInNoticeEditPage', {reqData: id});
            },
            /**
             * 获取日期
             * @param date
             * @returns {string}
             */
            getDate(date){
//                //判断传入值的类型
//                if (date && date.constructor === String) {
//                    date = date.replace(/-/gi, '/');
//                } else if (date && date.constructor === Object) {
//                    date = date.year + '-' + date.month + '-' + date.day;
//                }
                let dd = new Date();
                let m = dd.getMonth() + 1;
                m = m > 9 ? m : '0' + m;
                let cd = dd.getDate();
                cd = cd > 9 ? cd : '0' + cd;
                return dd.getFullYear() + '-' + m + '-' + cd;
            },
        },
        created(){
            let me = this;
            me.fileObj = {
                url: me.common.getUrl({url: me.common.NOTICE_UPLOAD}),
//                    url:'http://192.168.1.163:20250/annex/annex?access_token=5f678bd4-1421-41a3-92df-a379fa6e6082',
                fileName: '',
                format: ['png', 'doc', 'docx', 'xlsx', 'txt']
            };

        },
        mounted() {
            let that = this;
            that.$nextTick(() => {

                let editNoticeId = sessionStorage.getItem('editNoticeId');
                that.$store.dispatch('getNoticeTree', {reqData: '1'});
                if (editNoticeId && editNoticeId !== '') {
                    that.$store.dispatch('findIdNoticeData', {reqData: editNoticeId});
                }
                that.curObj = {
                    annoTitle: "",
                    annoType:1,
                    isPortalNotice: 1,
                    isSmsNotice: 2,
                    isTop: 2,
                    annexName: '',
                    isRelease: 2,
                    releaseScode: 1,
                    orgCode: '',
                    effectiveStartTime: that.getDate(),
                    effectiveEndTime: that.getDate()
                };
            });
        }
    }
</script>
