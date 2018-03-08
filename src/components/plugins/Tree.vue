/********************************************************************* * Created by tr on 2017/12/12. * * Tree 树形组件 * *********************************************************************/
<template>
    <!--树形图的显示-->
    <ul class="ls-tree-list single-line">
        <li class="ls-tree-item" v-for="(item,i) in treeObj">
            <div class="tree-label" :class="{'tree-check':treeParams.isCheck}">
                <!--节点icon-->
                <span :class="{'tree-icon-select':item.checked,'tree-icon':item.children && item.children.length}" @click="treeExpand(item, i)"></span>
                <span v-if="treeParams.isCheck" :class="{'tree-show-label':treeParams.isCheck,'active':item.check}" @click="treeSelectEvt(item,i)"></span>

                <div class="tree-label-text" :now-id="item.id" :now-pid="item.pid" @click="treeExpand(item, i)">
                    {{item.name}}
                </div>
            </div>
            <!--递归循环显示-->
            <treeItems
                    :newTreeObj='newTreeObj'
                    :treeObj='item.children'
                    :treeParams="treeParams"
                    v-show="item.checked"
                    @treeEvt="treeEvt"
            ></treeItems>
        </li>
    </ul>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from "vuex"
    export default {
        name: "treeItems",
        props: {
            newTreeObj:{
                type: Array,
                default () {
                    return [];
                }
            },
            treeObj: {
                type: Array,
                default () {
                    return [];
                }
            },
            treeParams: {
                type: Object,
                default: {
                    isCheck: false
                }
            }
        },
        data() {
            return {
                //                treeParams: {
                //                    isCheck: true
                //                },
                isBool: false
            }
        },
        methods: {
            /**
             * 节点的点击事件
             * @param resObj
             */
            treeExpand(resObj, i) {
                let that = this;
                /* 原来的写法 by tr --start-- */
                //resObj.checked = !resObj.checked;
                /* 原来的写法 by tr --end-- */

                /* 修改为以下的写法 by ty 2018年01月15日17:13:28 --start-- */
                let clickedNode = event.target;

                //only clicked text label ,change it's selected status
                let newObj = Object.assign(this.treeObj[i], {
                    checked: !this.treeObj[i].checked
                });
                /* 修改为以下的写法 by ty 2018年01月15日17:13:28 --end-- */

                /* */


                that.$emit("treeEvt", {
                    action: "expand",
                    curObj: newObj,
                    obj: this.treeObj,
                    target: event.target
                });

                that.$set(this.treeObj, i, newObj);
            },
            treeEvt(val) {
                this.$emit("treeEvt", val);
            },
            /*递归获取子级元素*/
            getChildEle(data, ele, isBool) {
                if (data) {
                    let newData = [];
                    if (data.length) {
                        data.map(da => {
                            let newDa = da;
                            if (ele !== 'pid') {
                                newDa[ele] = !isBool;
                            } else if (ele === 'pid' && isBool) {
                                newData.newPid = da.pid + '&' + da.id;
                            }
                            newData.push(newDa);
                            if (da.children && da.children.length) {
                                return this.getChildEle(da.children, ele, isBool);
                            }
                            return newData;
                        });
                    }

                } else {
                    return data;
                }
            },
            getParent(data, nodeId) {
                data.map(item => {
                    let obj = item;
                    if (obj.id === nodeId) {

                    } else {
                        if (obj.children) {

                        }
                    }
                });
            },
            /*判断文件是否有子级*/
            isTreeChild: function (resObj) {
                let that = this;
                let newChild = resObj.children;

                if (newChild && newChild instanceof Array && newChild.length) {
                    that.selectTreeData(newChild, resObj.check);
                  //  that.treeObj = that.deleteTreePid(that.newTreeObj, resObj.pid,newChild);
                }
            },
            selectTreeData(arr, isBool) {
                let that = this;
                let newArr = arr.map(it => {
                    let _children = [];
                    if (it.children && it.children.length) {
                        _children = that.selectTreeData(it.children, isBool);
                    }
                    let newItem = Object.assign(it, {
                        check: !isBool,
                        children: _children
                    });

                    return newItem;
                });
                return newArr;
            },
            // deleteTreePid(arr, pid) {
            //     let that = this;
            //     let pidArr = pid ? pid.split(',') : [];
            //     let sum = 0;
            //     let newArr = arr.map(it => {
            //         sum ++;
            //         let _children = [];
            //         let newItem = {};

            //         if (pidArr && pidArr.length) {
            //             if (it.children && it.children.length && pidArr.length >= sum) {
            //                 _children = that.selectTreeData(it.children,pid);
            //             }
                        
            //             pidArr.map((newIt, i) => {
            //                 newItem = Object.assign(it, {
            //                     check: newIt != it.id,
            //                     children: _children
            //                 });
            //             });
            //         }
            //         return newItem;
            //     });
            //     return newArr;
            // },
            /**
             * 选择框的点击事件
             * @param resObj
             */
            treeSelectEvt(resObj, i) {
                let that = this;
                that.isTreeChild(resObj);
                //resObj.check = !resObj.check;
                let newObj = Object.assign(this.treeObj[i], {
                    check: !this.treeObj[i].check
                });

                this.$set(this.treeObj, i, newObj);
                this.$emit('treeEvt', {
                    obj: that.treeObj,
                    curObj: resObj,
                    action: 'input'
                });
            }
        },
        mounted() {
            let that = this;
            that.$nextTick(() => {
                that.getChildEle(that.treeObj, 'pid', true);
            });
        }

    }
</script>