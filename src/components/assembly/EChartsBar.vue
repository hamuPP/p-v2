/*********************************************************************
* 编辑组件列表                                                       *
* Created by tyy on 2017/6/27.                                       *
* Modified by tr on 2017/6/27.                                       *
*********************************************************************/
<template>
    <div ref="eChartsBar" class="eChartsBar col-xs-4 col-md-4 col-lg-4" :class="eChartsBarWidth">
        <!--点击编辑组件出现的覆盖层-->
        <editMask :refValue="ref" :id="id"></editMask>
        <p class="title border-bottom-cc">{{resName}}</p>
        <div ref="eChartsBarCavans" class="eChartsBarCavans"></div>
    </div>
</template>
<script>
    import editMask from './EditMask.vue'
    import echarts from 'echarts'
    import CalenderAndNotice from '../calendarAndNotice.vue'
    import addressbook from '../addressbook.vue'
    import {mapGetters, mapActions} from "vuex"
    export default {
        /**
         * @returns {{
         * ref: string ,
         * eChartsBarWidth: string 组件eCharts的宽度,
         * eChartsData: string 组件eCharts的数据
         * }}
         */
        data() {
            return {
                ref: 'eChartsBar',
                eChartsBarWidth: '',
                eChartsData: ''
            }
        },
        components: {
            editMask,
            CalenderAndNotice,
            addressbook
        },
        /**
         * @define{{
         * resRatio: String 组件的比例,
         * id: String 组件的ID,
         * resName: String 组件的标题,
         * dataUrl: String 获取组件信息的路径,
         * rightModelWidth: String 组件一共所占的宽度
         * }}
         */
        props: {
            resRatio: String,
            id: String,
            resName: String,
            dataUrl: String,
            rightModelWidth: String
        },
        computed: mapGetters({
            componentListData: 'componentListData',
        }),
        /**
         * @define {{dataUrl: function,resRatio: function}}
         */
        watch: {
            dataUrl(val){
                this.eChartsData = val;
                this.drawGraph(val);
            },
            resRatio(val){
                let that = this;
                /*0.66为宽度的2/3*/
                if (val === '0.66') {
                    this.eChartsBarWidth = 'eChartsBarWidth66';
                    that.$refs.eChartsBarCavans.style.width = that.rightModelWidth * 0.62 + "px";

                } else if (val === '1') {  /*1为100%铺满*/
                    this.eChartsBarWidth = 'eChartsBarWidth100';
                    that.$refs.eChartsBarCavans.style.width = that.rightModelWidth * 0.945 + "px";
                } else { /*为1/3的宽度*/
                    this.eChartsBarWidth = '';
                    that.$refs.eChartsBarCavans.style.width = that.rightModelWidth * 0.295 + "px";
                }
                /*绘画*/
                that.drawGraph(that.eChartsData);
                /*echarts自适应*/
                that.chart.resize();
            }
        },
        /**
         * @define {{
         * drawGraph: function 绘图,
         * setOptionsNow: function 设置图形展示data
         * }}
         */
        methods: {
            drawGraph(val) {
                this.chart = echarts.init(this.$refs.eChartsBarCavans);
                this.chart.showLoading();
                // 设置data
                if (val) {
                    this.setOptionsNow(val);
                    this.chart.hideLoading();
                }
            },
            setOptionsNow(val) {
                let that = this;
                if (val) {
                    let optiones = eval('(' + val + ')');
                    that.chart.setOption(optiones, true, false);
                }
            },
        },
        mounted(){
            this.drawGraph();
        },
        created(){
            /*echarts的宽度为2/3*/
            if (this.resRatio === '0.66') {
                this.eChartsBarWidth = 'eChartsBarWidth66';
            } else if (this.resRatio === '1') { /*echarts的宽度为100%*/
                this.eChartsBarWidth = 'eChartsBarWidth100';
            } else { /*echarts的宽度为1/3*/
                this.eChartsBarWidth = '';
            }
        }
    }
</script>