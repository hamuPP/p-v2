<template>
    <div class="Table" :class="computedTableCls">
        <div class="Table-content">
            <div v-if="openLoading" class="Table-loading-layer">
                <img class="img" src="../images/loading.gif" alt="">
            </div>

            <div v-show="showHead" class="Table-header" :style="computedHeadStyles">
                <template v-for="it in columns">
                    <div :class="it.align"
                         :style="formattedCellStyle(it)">
                    <span class="text"
                          :data-field="it.field" >{{it.title}}</span>
                    </div>
                </template>
            </div>

            <div class="Table-body">
                <div class="content">
                    <div class="body-row" v-for="(it,i) in data" :key="i">
                        <template v-for="_it in copiedColumns">
                        <span
                                class="text"
                                :class="_it.align"
                                :style="formattedCellStyle(_it)"
                                @click="bodyRowClick(it,i)">
                            {{cellText(_it.field, it)}}</span>
                        </template>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default{
        props: {
            openLoading:{
                type: Boolean,
                default: true
            },
            showHead:{
                type: Boolean,
                default: false
            },
            border:{
                type: Boolean,
                default: false
            },
            tableSize:{
                type: String,
                default: 'small'
            },
            headStyleOpt:{
                type: Object,
                default:{

                }
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
                copiedColumns:[],
                columnsWidthSum:0
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
                    bgColor:'',
                    fontSize:'12px',
                    color: 'auto'
                }, me.headStyleOpt);

                let result = `backgroundColor:${metaStyles.bgColor};fontSize:${metaStyles.fontSize};color:${metaStyles.color};`;
                return result;
            },

            computedTableCls(val){
                let me = this;
                return (me.border ? 'bordered ' : '') + me.tableSize;
            },

            computedLoadingLayer(){
                let me = this;
                let result = me.openLoading? 'loading':'non-loading';
                return result;
            }
        },

        methods:{
            copyColumns() {
                let me = this;
                let columns = [];

                columns = me.columns.map(it => it);

                return columns;

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

            cellText(field, row){
                return row[field];
            },

            formattedCellStyle(val){
                let that = this;
                //y以前用的flex布局，由于要改为ie兼容，改为左浮了；
//                let flexStyle = `flex:${val.flex || 1}`;
                let width = ((val.flex || 1)*100/that.columnsWidthSum).toFixed(3);
                let styles = `width:${width}%`;

                return styles;



            },
//
//            cellCls(field, row){
//
//            }
            bodyRowClick(row, idx){
              let that = this;
              that.$emit('rowClick',{
                  data:row,
                  index:idx
              });
            }
        },

        created(){
            let me = this;

            me.copiedColumns = me.copyColumns();
            me.columnsWidthSum = me.countColumnsWidth();
        }
    }
</script>