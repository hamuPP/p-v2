/*********************************************************************
 * Created by tr on 2017/11/14.                                       *
 *********************************************************************/
import commonMethods from '../modules/commonMethods'
import axios from 'axios'

/**
 * 发送请求函数
 * @param obj 请求参数
 * eg:sendRequest({method: 'post',url: '',data: {},success:function(result){},error:function(result){})
 */
export const sendRequest = function(obj) {
    /* 定义请求数据参数 */
    let reqData = {};
    obj.method = obj.method || 'get';
    let methods = (obj.method).toLowerCase();
    /* 设置post和patch的请求头 */
    if (methods === 'post' || methods === 'patch' || methods === 'put' || methods === 'delete') {
        reqData.data = obj.data;
        reqData.headers = { 'Content-Type': obj.contentType || 'application/json;charset=utf-8' };

        reqData.transformRequest = [
            function(result) {
                if (obj.contentType && obj.contentType.indexOf('application/x-www-form-urlencoded') > -1) {
                    let ret = '';
                    for (let it in result) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(result[it]) + '&'
                    }
                    return ret;
                } else {
                    return JSON.stringify(result);
                }
            }
        ];
    } else {
        /* get 方法 */
        obj.data && (reqData.params = obj.data);
    }
    reqData.method = obj.method;
    reqData.url = obj.url;
    reqData.timeout = obj.timeout || 30000; //设置延迟时间

    /* 添加loading遮罩 */
    //new commonMethods().loadingOn();
    /* 请求接口 */
    axios(reqData)
        .then(resData => {
            /* 移除loading遮罩 */
            // new commonMethods().loadingOff();
            let newData = resData.data;
            if (newData && newData.meta) {
                if (newData.meta.code === 1) {
                    (obj.success && typeof obj.success === 'function') && obj.success(newData);
                    // !newData.data || (newData.data && !(newData.data instanceof Array && newData.data.length)) ?
                    //     new commonMethods().showToastMsg({text: newData.meta.message, priority: 'success'}) : "";
                } else {
                    // new commonMethods().showToastMsg({text: newData.meta.message, priority: 'success'});
                }
            } else {
                (obj.success && typeof obj.success === 'function') && obj.success(newData);
            }

        })
        .catch(e => {
            /* 移除loading遮罩 */
            //  new commonMethods().loadingOff();
            if (e.response) {
                let result = e.response.data;
                /* 提示错误消息 */
                new commonMethods().showToastMsg({ text: e.response.data.meta ? e.response.data.meta.message : '', priority: 'error' });
                (obj.success && typeof obj.success === 'function') && obj.success(result);
            } else {
                /*todo 判断接口是否有问题*/
                // obj.error({code:303});
                new commonMethods().showToastMsg();
            }
        });
    /* 如果一直在pending，3秒后取消遮罩 */
    setTimeout(function() {
        /* 移除loading遮罩 */
        new commonMethods().loadingOff();
    }, 3000);
};