/*********************************************************************
* 珙县地图模块                                                       *
* Created by tyy on 2017/6/27.                                       *
* Modified by tr on 2017/6/27.                                       *
*********************************************************************/
<template>
    <div  ref="mapPower" class="mapPower col-xs-8 col-md-8 col-lg-8">
        <!--珙县电力-->
        <div class="mapArea mapAreaOne">
            <h3>珙县电力</h3>
            <ul ref="powerListID">
                <template v-if="mapPowerData.powerstation">
                    <li v-for="(item,index) in mapPowerData.powerstation.name" @click="clickLI(index,$event)" :class="{clickLiStyle:index==hasBeselected}">{{item}}</li>
                </template>
            </ul>
            <!--地图图例注释-->
            <div class="lengendImg">
                <img src="/static/images/mapPower/图例注释.png" alt="">
            </div>
        </div>
        <!--地图的图形-->
        <div class="mapArea mapAreaTwo">
            <img :src="imgSrcOne" alt="地图">
        </div>
        <!--基本信息-->
        <div class="mapArea mapAreaThree">
            <div class="mapAreaThreeDIV">
                <div class="mapInformation">
                    <h5>基本信息</h5>
                    <div class="img">
                        <img :src="imgSrcTwo" alt="基本信息图">
                    </div>
                    <!--供电总容量-->
                    <ul class="mapInformationLists">
                        <li ><span>供电总容量：</span><span>{{Math.ceil(Number(mapPowerData.powerAll)*Math.random())}} kV.A</span></li>
                        <li><span>供电线路长度：</span><span>{{Math.ceil(Number(mapPowerData.gongxianLength)*Math.random())}} 千米</span></li>
                        <li><span>用电客户数：</span><span>{{Math.ceil(Number(mapPowerData.yongdianNum)*Math.random())}} 万户</span></li>
                        <li><span>大工业用户：</span><span>{{Math.ceil(Number(mapPowerData.dagngyeMUm)*Math.random())}} 万户</span></li>
                        <li><span>一般工商业：</span><span>{{Math.ceil(Number(mapPowerData.yibanshangyeNUm)*Math.random())}} 万户</span></li>
                        <li><span>工作人员：</span><span>{{Math.ceil(Number(mapPowerData.gongzuoNUm)*Math.random())}} 人</span></li>
                        <li><span>供电辐射面积：</span><span>{{Math.ceil(Number(mapPowerData.gongdianfushe)*Math.random())}} 平方千米</span></li>
                        <li><span>变压器台数：</span><span>{{Math.ceil(Number(mapPowerData.bianyaqitaishu)*Math.random())}} 台</span></li>
                        <li><span>其他：</span><span>{{Math.ceil(Number(mapPowerData.other)*Math.random())}} 万户</span></li>
                        <li><span>趸售：</span><span>{{Math.ceil(Number(mapPowerData.fushou)*Math.random())}} 万户</span></li>
                        <li><span>抢修车辆：</span><span>{{Math.ceil(Number(mapPowerData.qiangxiucheliang)*Math.random())}} 辆</span></li>
                    </ul>
                </div>
            </div>
            <!--经营信息-->
            <div class="manageInformation mapAreaThreeDIV ">
                <div class="mapInformation">
                    <h5>经营信息</h5>
                    <h6>电费账务：</h6>
                    <ul>
                        <li><span>上月收费结余：</span><span>{{Math.ceil(Number(mapPowerData.shangyueshoufei)*Math.random())}} 万元</span></li>
                        <li><span>本月预售电费：</span><span>{{Math.ceil(Number(mapPowerData.benyueyushou)*Math.random())}} 万元</span></li>
                        <li><span>本月销售电费：</span><span>{{Math.ceil(Number(mapPowerData.benyuexiaoshou)*Math.random())}} 万元</span></li>
                        <li><span>销往年电费：</span><span>{{Math.ceil(Number(mapPowerData.xiaowangnian)*Math.random())}} 万元</span></li>
                        <li><span>销本年电费：</span><span>{{Math.ceil(Number(mapPowerData.xiaobennian)*Math.random())}} 万元</span></li>
                        <li><span>销当月电费：</span><span>{{Math.ceil(Number(mapPowerData.xiaodangyue)*Math.random())}} 万元</span></li>
                        <li><span>当前电费结余：</span><span>{{Math.ceil(Number(mapPowerData.dangqiandianfeijieyu)*Math.random())}} 万元</span></li>
                    </ul>
                    <h6 class="managePower">电量电费：</h6>
                    <ul>
                        <li><span>本月核算电费：</span><span>{{Math.ceil(Number(mapPowerData.benyuehesuan)*Math.random())}} 万元</span></li>
                        <li><span>本月销售电量：</span><span>{{Math.ceil(Number(mapPowerData.benyuexiaoshouD)*Math.random())}} kW.h</span></li>
                        <li><span>上月核算电费：</span><span>{{Math.ceil(Number(mapPowerData.shangyuehesuanD)*Math.random())}} 万元</span></li>
                        <li><span>上月销售电量：</span><span>{{Math.ceil(Number(mapPowerData.shangxiaoshouD)*Math.random())}} kW.h</span></li>
                        <li><span>去年同期核算：</span><span>{{Math.ceil(Number(mapPowerData.quniantongqi)*Math.random())}} 万元</span></li>
                        <li><span>去年同期电量：</span><span>{{Math.ceil(Number(mapPowerData.quniantongqiD)*Math.random())}} kW.h</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from "vuex"
    export default{
        /**
         * @returns {{imgSrcOne: string, imgSrcTwo: string, hasBeselected: string}}
         */
        data() {
            return {
                imgSrcOne:'/static/images/mapPower/全县_地图.png',
                imgSrcTwo:'/static/images/mapPower/珙泉.png',
                hasBeselected:"0"
            }
        },
        computed: mapGetters({
            /*地图显示数据*/
            mapPowerData:"mapPowerData"
        }),
        watch: {
            /**
             * 监听地图数据
             * @param val 返回的数据
             */
            mapPowerData(val){
                val.qiangxiucheliang=Number(val.qiangxiucheliang)+1;
            }
        },
        methods: {
            /**
             * 根据地址选地图
             * @param index
             * @param evt
             */
            clickLI(index,evt){
                let that = this;
                that.imgSrcOne = '/static/images/mapPower/'+that.mapPowerData.powerstation.imgSrc[index].imgSrcOne;
                that.imgSrcTwo = '/static/images/mapPower/'+that.mapPowerData.powerstation.imgSrc[index].imgSrcTwo;
                this.hasBeselected = index;
            }
        },
        created(){
            /*获取珙县电力数据*/
            this.$store.dispatch("getMapPowerDataFun");
        }

    }

</script>