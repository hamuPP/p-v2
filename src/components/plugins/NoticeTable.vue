<template>
    <div class="Table" :class="computedTableCls">
        <div class="Table-content">
            <div v-show="showHead" class="Table-header" :style="computedHeadStyles">
                <div v-if="checked">
                    <span class="show-checked" ></span>
                </div>
                <template v-for="(it,i) in columns">
                    <div :class="it.align"
                         :style="formattedCellStyle(it)">
                        <span class="text" :data-field="it.field">{{it.title}}</span>
                    </div>
                </template>
            </div>
            <div class="Table-body">
                <div class="content">
                    <template v-for="(it,i) in data">
                        <div class="body-row">
                            <span class="text" :class="{'show-checked':checked,'active':it.checked}" v-if="checked"
                                  @click="selectEvt(it, i)"></span>
                            <template v-for="(_it,j) in copiedColumns">
                                <span
                                        class="text"
                                        :class="_it.align"
                                        :style="formattedCellStyle(_it,j,it)"
                                        v-if="!_it.render && j ==0 "
                                        @click="clickEvt(it,'detail')">
                                    {{cellText(_it.field, it)}}</span>
                                <span
                                        class="text"
                                        :class="_it.align"
                                        :style="formattedCellStyle(_it,j,it)"
                                        v-if="!_it.render && j != 0">
                                    {{cellText(_it.field, it)}}</span>
                            </template>

                            <!-- 1生效 绿色 蓝色方片 2未生效：红字 蓝色小飞机  3失效：灰色方片 -->
                            <span class="text" :class="copiedColumns[copiedColumns.length-1].align"
                                  :style="formattedCellStyle(copiedColumns[copiedColumns.length-1])" v-if="buttonEvt">
                                <i class="iconfont icon-chexiaofabu font-s12"
                                   :class="[parseInt(it.isRelease) === 3 ? 'not-edit':'active']"
                                   v-if="parseInt(it.isRelease) != 2"
                                   @click="clickEvt(it,'cancel')"></i>
                                <i class="iconfont icon-fabu font-s12 active"
                                   v-if="parseInt(it.isRelease)=== 2"
                                   @click="clickEvt(it,'add')"></i>

                                <i class="iconfont icon-bianji font-s12"
                                   :class="[parseInt(it.isRelease) === 3 ? 'not-edit':'active']"
                                   @click="clickEvt(it,'edit')"></i>
                                <i class="iconfont icon-shanchu font-s12 delete"
                                   @click="clickEvt(it,'delete')"></i>
                            </span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: {
            checked: {
                type: Boolean,
                default: true
            },
            showHead: {
                type: Boolean,
                default: false
            },
            border: {
                type: Boolean,
                default: false
            },
            tableSize: {
                type: String,
                default: 'small'
            },
            headStyleOpt: {
                type: Object,
                default: {}
            },

            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            columns: {
                type: Array,
                default () {
                    return [];
                }
            },
        },
        data(){
            return {
                copiedColumns: [],
                buttonEvt: '',
                columnsWidthSum:0,

            }
        },

        computed: {
            computedFontAlign(val) {
                let me = this;
                return 'zzz'
            },

            computedHeadStyles(val){
                let me = this;
                let metaStyles = Object.assign({
                    bgColor: '',
                    fontSize: '12px',
                    color: 'auto'
                }, me.headStyleOpt);

                let result = `backgroundColor:${metaStyles.bgColor};fontSize:${metaStyles.fontSize};color:${metaStyles.color};`;
                return result;
            },

            computedTableCls(val){
                let me = this;
                return (me.border ? 'bordered ' : '') + me.tableSize;
            }
        },
        watch: {
            'data': function (val) {
            }
        },
        methods: {
            formattedCellStyle(val, i, ele){
                let that = this;

                let flexStyle = `width:calc((${(val.flex || 1)*100}% - 28px)/${that.columnsWidthSum})`;

                if (!i) {
                    flexStyle = `${flexStyle};color:#407dd1;cursor:pointer`;
                }
//                isRelease 1生效 绿色(#48A031) 蓝色方片 2未生效：红色(CF4747)小飞机  3失效：灰色方片(#888)
                if (ele && (parseInt(ele.isRelease) === 1) && (i === this.copiedColumns.length - 2)) {
                    flexStyle = `${flexStyle};color:#48A031`;
                } else if (ele && (parseInt(ele.isRelease) === 2) && (i === this.copiedColumns.length - 2)) {
                    flexStyle = `${flexStyle};color:#CF4747`;
                } else if (ele && (parseInt(ele.isRelease) === 3) && (i === this.copiedColumns.length - 2)) {
                    flexStyle = `${flexStyle};color:#888`;
                }
                return flexStyle;
            },
            copyColumns() {
                let me = this;
                let columns = [];

                columns = me.columns.map(it => it);
                console.log(columns);
                return columns;

            },

            cellText(field, row){
                return row[field];
            },
//
//            cellCls(field, row){
//
//            }
            getBut(){
                let that = this;
                let lastColumns = that.columns[that.columns.length - 1];
                if (that.columns[that.columns.length - 1].hasOwnProperty("render")) {
                    that.buttonEvt = lastColumns.render();
                }
            },
            selectEvt(ele, i){
                let that = this;
                /* 原来的写法 by tr --start-- */
                //ele.checked = !ele.checked;i
                /* 原来的写法 by tr --end-- */
                /* 修改为以下的写法 by ty 2018年01月15日17:13:28 --start-- */
                let newObj = Object.assign(this.data[i], {
                    checked: !this.data[i].checked
                });
                this.$set(this.data, i, newObj);
                /* 修改为以上的写法 by ty 2018年01月15日17:13:28 --end-- */

                this.$emit('clickEvt', {obj: that.treeObj, curObj: ele});
            },
            clickEvt(ele, type){
                if (ele.isRelease != 3) {
                    this.$emit('click', {obj: ele, type: type});
                } else if (type === "delete") {
                    this.$emit('click', {obj: ele, type: type});
                }
            },
            countColumnsWidth(){
                let me = this;
                let count = 0;

                me.columns.forEach(it=>{
                    let flex = it.flex;
                    count += flex?flex:1;
                });

                return count;
            },
        },

        created(){
            let me = this;
            me.getBut();
            me.copiedColumns = me.copyColumns();
            me.columnsWidthSum = me.countColumnsWidth();
        }
    }
</script>