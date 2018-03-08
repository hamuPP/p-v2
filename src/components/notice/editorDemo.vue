<template>
    <div class="components-container">
        <h3>编辑器示例-这仅仅是示例</h3>
        <div class="editor-container">
            <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
        </div>
        <button @click="getUEContent()">获取编辑器内的内容</button>
        <button @click="addUEContent()">填充内容</button>

        <hr>

        <em class="em act" @click="replaceIconEvt">点击上传替换icon</em>
        <FileBox :fileObj="fileObj" v-on:getFileData="fileData" ref="file"></FileBox>
    </div>
</template>
<style>
    .info{
        border-radius: 10px;
        line-height: 20px;
        padding: 10px;
        margin: 10px;
        background-color: #ffffff;
    }
</style>
<script>
    import UE from '../Editor.vue'
    import FileBox from '../plugins/FileBox.vue'

    export default {
        components: {UE, FileBox},
        data() {
            return {
                defaultMsg: '这里是UE测试',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 200
                },

                /*上传文件的参数*/
                fileObj: {
                }
            }
        },
        methods: {
            getUEContent() {
                let content = this.$refs.ue.getUEContent();
            },

            addUEContent(){
                let me = this;
                this.$refs.ue.setContent('hello');
            },

            replaceIconEvt(){
                let me = this;
                me.$refs.file.fileInput();
            },
            fileData(val){
                let me = this;

            },
        },

        created(){
            let me = this;
            /* 设置上传文件的接口等参数 */
            me.fileObj = {
                url: 'http://192.168.1.163:20250/annex/annex?access_token=a022c647-d14b-45fc-bb5b-f8a498047052',//TODO 接口改，rescode设置
                fileName: '',
                format: ['png']
            };
        }
    };
</script>