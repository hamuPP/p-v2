/*********************************************************************
 * 原生js封装的ajax请求                                                  *
 * Created by tr on 2017/7/18                                        *
 *********************************************************************/
class Ajax {
    ajax(params) {
        params = params || {};
        params.data = params.data || {};
        params.jsonp ? this.jsonp(params) : this.json(params);
    }

    // jsonp请求
    jsonp(params) {
        //创建script标签并加入到页面中
        let callbackName = params.jsonp;
        let head = document.getElementsByTagName('head')[0];
        // 设置传递给后台的回调参数名
        params.data['callback'] = callbackName;
        let data = this.formatParams(params.data);
        let script = document.createElement('script');
        head.appendChild(script);

        //创建jsonp回调函数
        window[callbackName] = function (json) {
            head.removeChild(script);
            clearTimeout(script.timer);
            window[callbackName] = null;
            params.cb && params.cb(json);

        };
        //发送请求
        if (params.url.indexOf('?') > 0) {
            script.src = params.url + '&' + data;
        } else {
            script.src = params.url + '?' + data;
        }
        //为了得知此次请求是否成功，设置超时处理
        if (params.time) {
            script.timer = setTimeout(function () {
                window[callbackName] = null;
                head.removeChild(script);
                params.cb && params.cb({
                    message: '超时'
                });
            }, params.time);
        }
    };

    //格式化参数
    formatParams(data) {
        let arr = [];
        for (let name in data) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }

        // 添加一个随机数，防止缓存
        arr.push('v=' + this.random());
        return arr.join('&');
    }

    /*json格式*/
    json(obj) {
        obj.type = obj.type || "get";   //指定提交方式的默认值
        obj.async = obj.async || true;  //设置是否异步，默认为true(异步)
        obj.data = obj.data || null;  //设置数据的默认值
        obj.type = obj.type.toLowerCase();
        obj.dataType = obj.dataType || null;

        let ajax = new XMLHttpRequest();
        if (!window.XMLHttpRequest) {
            ajax = new ActiveXObject("Microsoft.XMLHTTP"); //ie
        }
        if (obj.type === "get" || obj.type === "GET") {  //区分请求的类型
            let url = '';
            if (obj.url.indexOf('?') > -1) {
                url = obj.url;
            } else {
                url = obj.url + "?" + this.toData(obj.data);//get
            }
            ajax.open(obj.type, url, obj.async);
            ajax.send();
        } else {
            let contentType = 'application/x-www-form-urlencoded;charset=UTF-8'; //请求的数据格式
            let data = this.toData(obj.data);
            if ((obj.dataType && obj.dataType !== 'null') || (obj.type === 'put' || obj.type === 'PUT')) {
                contentType = 'application/json;charset=UTF-8';
                data = obj.data;
            }
            ajax.open(obj.type, obj.url, obj.async);
            ajax.setRequestHeader("Content-Type", contentType);
            ajax.send(data);

        }

        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                let data = '';
                if (ajax.status >= 200 && ajax.status < 300 || ajax.status === 304 || ajax.status === 302) {
                    if (ajax.responseText.constructor === String) {
                        try {
                            data = JSON.parse(ajax.responseText);
                        } catch (e) {
                            if (data === '') {
                                data = {code: "ERROR"};
                            }
                        }
                    }
                } else {
                    data = "ERROR232";
                }

                obj.cb(data);
            }
        }
    };

    toData(obj) {
        if (obj === null) {
            return obj;
        }
        let arr = [];
        for (let i in obj) {
            let str = i + "=" + obj[i];
            arr.push(str);
        }
        // 添加一个随机数参数，防止缓存
        arr.push('v=' + this.random());
        return arr.join('&');
    };

    // 获取随机数
    random() {
        return Math.floor(Math.random() * 10000 + 500);
    }
}
export default Ajax;
