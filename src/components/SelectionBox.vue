/*********************************************************************
* Created by deming-su on 2017/10/25                                 *
* Modified by tr on  2017/11/22                                      *
* <SelectionBox :listObj="listObj" :listProp="listProp"  v-on:onSelectEvt="dropPick"></SelectionBox>*
* listObj.checked  是否选择                                          *
* listObj.id  数据对应的id                                           *
* listObj.name  数据对应的存值                                       *
*                                                                    *
* listProp.et  输入框单位                                            *
 *********************************************************************/

<template>
    <div>
        <div :class="computedShowBoxCls" selection-box="Y" ref="showBoxNode">
            <input placeholder="" :class="computedShowInputCls" @click="boxShowEvt" v-model="nowPickItem" readonly/>
            <i :class="computedShowIconCls" @click="boxShowEvt"></i>
            <span :style="showEndTextCls" v-if="hasEndText" @mouseover="overEvt">{{listProp.et}}</span>
        </div>
        <div v-show="boxShow" date-calendar="Y" :style="pickBoxCls">
            <div :style="pickContentCls" ref="listBox">
                <span v-for="item in listObjD"
                      :class="computedTitleCellCls"
                      :style="item.checked ? checkedCls : item.hovered ? hoverCls : ''"
                      :now-id="item.id"
                      @click="pickEvt">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    export default{
        /* 传递过来的初始化日期 */
        props: ['listObj', 'listProp', 'sizeType'],
        data() {
            return {
//                showBoxCls: {},
//                showIconCls: {},
//                showInputCls: "display: block; width: 100%; height: 30px; line-height: 30px; font-size: 12px; text-indent: 8px; padding: 0; margin: 0; outline: none; border: none;",
                showEndTextCls: "cursor: pointer;position: absolute; top: 0; right: 0; width: 100%; height: 31px; line-height: 31px; text-align: center; background-color: #f0f0f0; font-size: 12px; color: #333; overflow: hidden; border-left: solid 1px #dcdcdc; border-bottom: solid 1px #dcdcdc;",
                pickBoxCls: "position: fixed; background-color: #fff; padding: 3px 0; border: solid 1px #dcdcdc; z-index: 9999;",
                pickContentCls: "max-height: 220px; overflow-x: hidden; overflow-y: auto;",
//                titleCellCls: "display: block; height: 28px; min-width: 200px; padding-right: 5px; text-align: left; text-indent: 15px; line-height: 28px; cursor: pointer; user-select: none; color: #333; font-weight: 500; font-size: 14px; overflow: hidden;",
                checkedCls: "background-color: #1E90FF; color: #fff;",
                hoverCls: "background-color: #eee;",
                nowPickItem: "",
                hasEndText: false,
                itemHover: false,
                boxShow: false,
                listObjD:[]
            }
        },
        computed:{
            /* 根据用户传参，生成样式 */
            computedShowBoxCls(){
                let me = this;

                let _sizeType = me.sizeType || "";
                let result = `selection-showbox ${_sizeType}`;

                return result;
            },
            computedShowInputCls(){
                let me = this;

                let _sizeType = me.sizeType || "";
                let result = `selection-showinput ${_sizeType}`;

                return result;
            },
            computedShowIconCls(){
                let me = this;

                let _sizeType = me.sizeType || "";
                let result = `selection-showicon ${_sizeType}`;

                return result;
            },
            computedTitleCellCls(){
                let me = this;

                let _sizeType = me.sizeType || "";
                let result = `selection-titlecell ${_sizeType}`;

                return result;
            }
        },
        watch:{
            /*监听下拉框的数据变化*/
            'listObj' : function (val) {
                let that = this;
                that.$nextTick(()=>{
                    that.getNewListObj(val);
                });
            }
        },
        methods: {
            /* 用户显示框点击事件 */
            boxShowEvt() {
                this.boxShow = !this.boxShow;
                /* 如果展示弹出框，重新计算框位置 */
                if(this.boxShow) {
                    this.calculatePos();
                }
            },
            /* 计算弹出框的位置 */
            calculatePos() {
                let me = this;
                /* 获取页面显示栏目的节点和相对与screen的位置 */
                let node = me.$refs.showBoxNode;
                let r = node.getBoundingClientRect();
                let t = r.top;
                let l = r.left;
                me.pickBoxCls = me.pickBoxCls + "top: "+(t+r.height+3)+"px; left: "+l+"px;";
            },
            /*下拉框点击事件*/
            pickEvt(evt) {
                let me = this;
                let id = evt.target.getAttribute('now-id');
                let obj = me.listObjD;
                let temp = [];
                obj.map(it => {
                    it.checked = it.id === id;
                    if(it.checked) {
                        me.$emit('onSelectEvt', it);
                        me.nowPickItem = it.name;
                    }
                    temp.push(it);
                });
                me.listObjD = temp;
            },
            /*鼠标显示浮层*/
            overEvt(){
                this.$emit('onSelectEvt', {ele:'over'});
            },
            /*hover事件*/
            hoverEvt(type, evt) {
                let me = this;
                let id = evt.target.getAttribute('now-id');
                if(id) {
                    let obj = me.listObjD;
                    let temp = [];
                    obj.map(it => {
                        if(it.id === id) it.hovered = type;
                        temp.push(it);
                    });
                    me.listObjD = temp;
                }
            },
            /*获取新列表数据*/
            getNewListObj(val){
                let that = this;
                let temp = [];
                let sum = 0; //默认变量
                let sumName = "";
                let obj = val || that.listObj;
                if(!obj || !obj.length) return false;
                obj.map((it, i) => {
                    /*判断是否有checked为true的属性*/
                    if(it.checked){
                        sum++;
                        sumName = it.name;
                    }else {
                        it.checked = false;
                    }
                    temp.push(it);
                });
                if(!sum){
                    temp[0].checked = true;
                }
                that.listObjD = temp;
                that.nowPickItem = sumName ? sumName : that.listObjD[0] ? that.listObjD[0].name : '';
                that.$nextTick(() => {
                    that.$refs.listBox.addEventListener("mouseover", function (evt) {
                        that.hoverEvt(true, evt);
                    });
                    that.$refs.listBox.addEventListener("mouseout", function (evt) {
                        that.hoverEvt(false, evt);
                    });
                    /* 注册全局点击事件，如果存在打开未关闭的下拉弹出框 关闭掉 -last Modified:tianrong*/
                    /* 修改这个关闭下拉弹窗的事件 Modified by tangyue 2017/12/05*/
                    document.addEventListener("click", function (evt) {
                        /* 当前点击元素 */
                        let clickedNode = (evt || window.event).target;
                        /* 当前点击元素的父元素 */
                        let parentNode = clickedNode.parentNode;
                        /*
                        * 有以下属性则表示点击元素为下拉组件输入框的内部dom元素，
                        * 没有则表示点击的为页面其他区域或者是下拉组件的下拉弹窗
                        */
                        let attr = parentNode ? parentNode.getAttribute("selection-box") : null;
                        if(!attr && that.boxShow){
                            that.boxShow = false;
                        }

//                        //以前的写法 Last modified by tianrong
//                        let node = evt.target.parentNode;
//                        let attr = node.getAttribute("selection-box");
//                        if(!attr) {
//                            node = node.parentNode;
//                            if(node) {
//                                attr = node.getAttribute("selection-box");
//                                if(!attr && that.boxShow) that.boxShow = false;
//                            }
//                        }
                    });
                });
            }
        },
        mounted() {
            let me = this;
            me.hasEndText = me.listProp && me.listProp.et;
            if(me.hasEndText) {
                me.showBoxCls["padding-right"] = "118px";
                me.showIconCls["right"] = "80px";
            }
            me.getNewListObj();
            me.$nextTick(() => {
                document.addEventListener('scroll', function(evt) {
                    if(me.boxShow) me.boxShow = false;
                });
            })
        }
    }
</script>