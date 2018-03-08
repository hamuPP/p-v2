/*********************************************************************
* 天气据块                                                           *
* Created by tr on 2017/7/27.                                        *
* 由于1.0.3改版，这模块暂时没有用                                    *
*********************************************************************/
<template>
    <div id="weather" class="weather" ref="weather">
        <div class="col-xs-10 col-md-10 col-lg-10 weatherText">
            <template v-if="weatherData && weatherData != null">
                <!--当天的数据-->
                <label class="col-xs-4 col-md-4 col-lg-4">
                    <p>{{weatherData[0].currentCity}}</p>
                    <p>{{weatherData[0].weather_data[0].date}}</p>
                </label>
                <label class="col-xs-3 col-md-3 col-lg-3 pictureLabel">
                    <p class="picture">
                        <!--根据小时判断是白天还是晚上-->
                        <img :src="(curHour > 18 || curHour < 6) ? weatherData[0].weather_data[0].nightPictureUrl : weatherData[0].weather_data[0].dayPictureUrl" alt="无法显示" id="weatherImg">
                        <br/>{{weatherData[0].weather_data[0].temperature}}
                    </p>
                    <p >
                        {{weatherData[0].weather_data[0].weather}}<br/>
                        {{weatherData[0].weather_data[0].wind}}
                    </p>
                </label>
                <label class="col-xs-4 col-md-4 col-lg-4 tipt">
                    <p v-for="(index,i) in weatherData[0].index">
                        {{index.tipt}}:{{index.zs}}
                    </p>
                </label>
            </template>
            <!--没有获取到数据-->
            <div v-else class="notData">
                无法连接到天气
            </div>
        </div>
        <!--功能模块的操作入口-->
        <div class="col-xs-2 col-md-2 col-lg-2 setComponent">
            <p @click="showEditMaskBtn" :class="startOrCancle">
                <span class="icon iconfont icon-bianji_xiugai font-s16"> </span> {{editMaskBtnText}}</p>
            <p class="startEditMaskBtn" v-show="showBackDefault">
                <span class="icon iconfont icon-fanhui font-s16"> </span> 恢复默认</p>
            <p @click="hideEditMaskBtn" class="startEditMaskBtn" v-show="showCancleEdit">
                <span class="icon iconfont icon-quxiao font-s16"> </span> 取消定制</p>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from "vuex"
    export default{
        /**
         * @returns {{
         * curHour: number 当前的时间,
         * editMaskBtnText: string 定制的操作按钮的内容,
         * showBackDefault: boolean 恢复默认的按钮是否显示,
         * showCancleEdit: boolean 取消定制按钮是否显示,
         * startOrCancle: string 启动或取消的按钮
         * }}
         */
        data() {
            return {
                curHour: new Date().getHours(),
                editMaskBtnText: '定制组件',
                showBackDefault: true,
                showCancleEdit: false,
                startOrCancle: 'startEditMaskBtn'
            }
        },
        computed: mapGetters({
            /*天气的数据*/
            weatherData: 'weatherData',
            /*点击编辑组件显示覆盖层*/
            showEditMask: 'showEditMask',
            /*右边模块的数据*/
            rightModelPadding: 'rightModelPadding'
        }),
        methods: {
            /**
             * 定制模块的按钮事件
             * @param evt
             */
            showEditMaskBtn(evt){
                /*显示or隐藏 覆盖层*/
                if (this.showEditMask) {
                    this.hideMaskFun();
                } else {
                    this.showMaskFun();
                }
            },
            /*取消定制的按钮事件*/
            hideEditMaskBtn(evt){
                this.hideMaskFun();
            },
            /**
             * 隐藏对应的模块
             */
            hideMaskFun(){
                this.$store.dispatch('hideRightModelPaddingFun');
                this.$refs.weather.setAttribute('class', 'weather');
                this.showBackDefault = true;
                this.showCancleEdit = false;
                this.startOrCancle = 'startEditMaskBtn';
                this.editMaskBtnText = '定制组件';
                this.$store.dispatch('hideEditMaskFun');
                this.$store.dispatch('hideAddComponentFun');
            },
            /**
             * 显示对应的模块
             */
            showMaskFun(){
                this.$store.dispatch('rightModelPaddingFun');
                this.$refs.weather.setAttribute('class', 'weatherEditMask');
                this.showBackDefault = false;
                this.showCancleEdit = true;
                this.startOrCancle = 'cancleEditMaskBtn';
                this.editMaskBtnText = '定制完成';
                this.$store.dispatch('showEditMaskFun');
                this.$store.dispatch('showAddComponentFun');
            }
        },
        created() {
            let reqData = {
                location: remote_ip_info["city"],
                output: "json",
                ak: '0A5bc3c4fb543c8f9bc54b77bc155724'
            };
            /*获取天气的数据*/
            this.$store.dispatch('getWeatherData', {reqData});
        }
    };

</script>