/*********************************************************************
* 新用户模块                                                         *
* Created by tr on 2017/7/27.                                        *
*********************************************************************/
<template>
    <div id="listModel" class="col-xs-8 col-md-8 col-lg-8 listModel">
        <template v-if="listData.length > 0">
            <div class="row">
                <!--列表标题-->
                <div>
                    <div class="col-xs-8 col-md-8 col-lg-8">
                        <span class="title">{{listData[0].name}}</span>
                    </div>
                </div>
                <!--列表内容-->
                <div class="agency-tab">
                    <div class="col-xs-12 col-md-12 col-lg-12">
                        <div>
                            <table class="table table-hover">
                                <!--表头信息-->
                                <thead>
                                <tr>
                                    <th class="col-xs-2 col-md-2 col-lg-2">用户编号</th>
                                    <th class="col-xs-2 col-md-2 col-lg-2">用户名称</th>
                                    <th class="col-xs-3 col-md-3 col-lg-3">用户地址</th>
                                    <th class="col-xs-3 col-md-3 col-lg-3">立户日期</th>
                                    <th class="col-xs-2 col-md-2 col-lg-2 text-right">供电单位名称</th>
                                </tr>
                                </thead>
                                <!--表头内容-->
                                <tbody v-if="listData[0].data.length > 0">
                                <tr v-for="(li,i) in listData[0].data">
                                    <td>{{ li.consCode }}</td>
                                    <td>{{ li.consName }}</td>
                                    <td>{{ li.addr }}</td>
                                    <td>{{ li.buildTime }}</td>
                                    <td class="text-right">{{ li.orgName}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    export default{
        data(){
            return {}
        },
        computed: mapGetters({
            /*用户信息*/
            userData: "userData",
            /*新用户的数据*/
            listData: 'listData'
        })
    }
</script>
