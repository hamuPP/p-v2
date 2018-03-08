/*********************************************************************
* Created by tr on 2017/11/3.                                       *
* 上传文件的控件                                                    *
* 使用方法                                                          *
*<fileBox :fileObj="fileObj" v-on:getFileData="fileData"></fileBox>*
* fileObj.resName : 当前文件的标识                                  *
* fileObj.url : 文件要提交到的地址                                  *
* fileObj.fileName : file控件的name                                 *
* fileObj.format : 文件格式，以数组的形式传递，如['jpg','png','gif','bmp']*
* fileData 为调用组件页面需要传递的回调方法名                       *
*********************************************************************/
<template>
    <!--上传文件-->
    <div ref="fileEle">
        <iframe ref="frameEle" name="frameName" style="display: none"></iframe>
        <form ref="formEle" name="form_frameName" method="post" target="frameName" enctype="multipart/form-data"
              style="display: none;"></form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"
    import axios from 'axios'
    export default{
        props: ['fileObj'],
        data() {
            return {
                fileValue: ''
            }
        },
        methods: {
            fileInput(){
                let that = this;
                /*接收传过来的值*/
                let opt = that.fileObj;
                /*from标签*/
                let form = that.$refs.formEle;
                form.action = opt.url;
                /*创建file标签*/
                let file = document.createElement('input');
                file.type = "file";
                file.name = opt.fileName;
                /*把创建的文件对应的加入标签里面*/
                form.append(file);
                /*动态点击上传文件按钮*/
                file.click();

                file.addEventListener('change', function (evt) {
                    /* 修改获取文件名的方法，因为原方法无法正确获取文件名中包含符号.的文件 */
                    /*获取文件的后缀名 文件格式 */
                    /* let fileFormat = evt.currentTarget.files[0].name.split('.')[1]; */

                    let fileName = evt.currentTarget.files[0].name;
                    let dotIndex = fileName.lastIndexOf('.');
                    let fileFormat = fileName.substr(dotIndex + 1);
                    /*判断文件名是否符合*/
                    if (opt.format && opt.format.join('-').indexOf(fileFormat) !== -1) {
                            let size = Math.ceil(fileFormat.size / 1024);
                            if (size > 2048) {
                                alert("你上传的图片超过了2M");
                            } else {
                                let config = {
                                    headers: {'Content-Type': 'multipart/form-data'}
                                };

                                let formData = new FormData();
                                formData.append('file', evt.target.files[0]);

                                axios.post(opt.url, formData, config)
                                    .then(data => {
                                        let newData = data.data;
                                        let newList = {};
                                        if (newData && newData.meta && newData.meta.code === 1) {
                                            newList = newData.data;
                                        }
                                        that.$emit("getFileData", {
                                            name:opt.resName || "" ,
                                            obj:newList,
                                            fileName:fileName}//把本地文件名传递出去
                                        );
                                        file.remove();
                                    }).catch(e => {
                                    that.$emit("getFileData", {error:e});
                                    file.remove();
                                });
                            }
                    } else {
                        /*不符合移除控件，并提示*/
                        file.remove();
                        alert('文件格式错误，请重新选择！');
                    }
                });

            }
        }

    }

</script>