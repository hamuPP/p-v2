/**
 * Created by tr on 2017/5/18.
 */
class PackageAjax {
    ajax(obj) {
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
            let contentType = 'application/json;charset=UTF-8'; //请求的数据格式
            let data = obj.data;
            if (obj.type === 'post' || obj.type === 'POST') {
                contentType = 'application/x-www-form-urlencoded;charset=UTF-8';
                data = this.toData(obj.data);
            }
            ajax.open(obj.type, obj.url, obj.async);
            ajax.setRequestHeader("Content-Type", contentType);
            ajax.send(data);

        }

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                let data = '';
                if (ajax.status >= 200 && ajax.status < 300 || ajax.status == 304 || ajax.status == 302) {
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
                    data = ajax.status

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
        return arr.join('&');
    };
}
export default PackageAjax;