/**
 * Created by ty on 17/11/29.
 * 一些工具函数
 *
 */
class Utils {
    constructor() {
    }

    /**
     * 是否为对象{}
     * @param val
     * @returns {boolean}
     */
    isObject(val) {
        return val !== null && val.constructor === Object;
    }

    /**
     * 是否为空对象
     * @param val
     * @returns {boolean} true 表示为空对象，注意一定不要搞反了
     */
    isEmptyObj(val){
        let b;
        for(b in val){
            return !1;
        }

        return !0
    }

    /**
     * 是否为ie11以下,否返回false,是返回具体的版本号
     */
    isIElt11(){
        let agent = window.navigator.userAgent;
        let isIE = agent.indexOf("MSIE") >-1 &&  agent.indexOf("Trident") >-1;
        if(!isIE){return false;}
        let version = agent.match(/MSIE\s[0-9].?[0-9]/)[0];//6,7,8,9,10,11等等
        return version;
    }

    /**
     * 移除所有iframes，主要是登录时，很多软件部的旧系统登录是用的嵌入iframes方式登录的
     * @return undefined
     */
    removeIframes(){
        let ifrms = document.getElementsByTagName("iframe");
        let copyIfrms = Object.assign({}, ifrms);

        for (let i in copyIfrms) {
            let ifr = copyIfrms[i];
            let dataId = ifr.getAttribute("data-id");
            let parentNode = ifr.parentNode;

            if (dataId === "sc") {
                ifr.setAttribute('src', 'http://10.176.155.47:7001/webclient/login/logout.jsp');
                // document.body.removeChild(parentNode);
            } else if (dataId === "wz") {
                ifr.setAttribute('src', 'http://10.176.105.94:9002/webclient/login/logout.jsp');
                // document.body.removeChild(parentNode);
            } else if (dataId === "mobile") {
                let forms = document.getElementsByTagName("form");
                for (let k = 0; k < forms.length; k++) {
                    let _form = forms[k];

                    if (_form.getAttribute("data-id") === "mobileform") {
                        _form.setAttribute("action", "http://10.176.105.138:8090/default/coframe/auth/login/logout.jsp");

                        _form.submit();

                        // document.body.removeChild(parentNode);
                        // document.body.removeChild(_form);
                        break;
                    }
                }
            }
        }
    }

    offset(evt){
        if(!evt){return;}

        let target = evt.target || evt.srcElement;
        let left = (evt.clientX || evt.pageX || evt.screenX) - evt.layerX;
        let top = (evt.clientY || evt.pageY || evt.screenY) - evt.layerY;

        return {
            left: left,
            top: top
        }

    }
}
export default Utils;