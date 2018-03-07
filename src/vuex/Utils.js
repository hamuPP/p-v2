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
}
export default Utils;