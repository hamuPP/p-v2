/*********************************************************************
 * 所有的接口路径存放                                                *
 * just for old portal project                                       *
 * Created by tr on 2017/7/5.                                        *
 *********************************************************************/
class UrlMapping {
    constructor() {

        this.BASE = 'portal/';
        /**
         * 登录 请求方式“post”
         * @type {string}
         */
        this.LOGIN = 'login';
        /**
         * 获取应用名称 请求方式“get”
         * @type {string}
         */
        this.APPS = 'apps';
        /**
         * 获取用户基本信息 请求方式“get”
         * @type {string}
         */
        this.ME = 'me';
        /**
         * 获取用户其他职位信息 请求方式“get”
         * @type {string}
         */
        this.ORGINFO = "user/orgInfo";
        /**
         * 获取业务定制的所有功能 请求方式“get”
         * @type {string}
         */
        this.FUNC = 'resources/{userId}/functions';
        /**
         * 定制业务信息的接口，请求方式“put”
         * @type {string}
         */
        this.CUSTOM = 'resources/customizations';
        /**
         * 获取主件的数据，请求方式“put”
         * @type {string}
         */
        this.DATA = 'elements/data';
        /**
         * 获取代办的接口 请求方式为“get”
         * @type {string}
         */
        this.BACKLOGS = 'backlogs/{executorId}';
        /**
         * 获取代办tag接口  请求方法“get”
         */
        this.BACKLOGS_TAG = "backlogs/{userId}/tags";
        /**
         * 获取accessToken的值 请求方式为“get”
         * @type {string}
         */
        this.CLIENTID = 'accessToken/swap/{clientId}';
        /**
         * 获取用户定制过的功能 请求方法为“get”
         * @type {string}
         */
        this.CUSFUNCTION = "resources/{userId}/customization/functions";
        /**
         * 获取功能地图的接口 请求方式为“get”
         * @type {string}
         */
        this.RESOURCES = 'resources/{clientId}';
        /**
         * 查询事件来源 请求方式为“get”
         * @type {string}
         */
        this.CLIENTS = 'backlogs/{executorId}/clients';
        /**
         * 获取主键 请求方式为“get”
         * @type {string}
         */
        this.ELEMENTS = "elements";
        /**
         * 退出登录 请求方式为“get”
         * @type {string}
         */
        this.LOGINOUT = 'logout';
        /**
         * 获取新闻的信息 请求方式为“get”
         * @type {string}
         */
        this.NEWS = 'http://lensyn.imwork.net:7000/portal/rest/cms/NodesService/query';
        /**
         * 新闻的详情接口
         * @type {string}
         */
        this.NEWSDETAIL = "http://lensyn.imwork.net:7000/portal/web/ywjs-info.jsp";
        this.NEWSDETAILELE = "currentLocation=%E5%BD%93%E5%89%8D%E4%BD%8D%E7%BD%AE%EF%BC%9A%E9%A6%96%E9%A1%B5%20%3E%20%E6%96%B0%E9%97%BB%E8%B5%84%E8%AE%AF%20%3E%20%E5%85%AC%E5%8F%B8%E6%96%B0%E9%97%BB&column=3";
        /**
         * 获取天气 请求方式为“JSONP”
         * @type {string}
         */
        this.WEATHER = 'http://api.map.baidu.com/telematics/v3/weather';
        /**
         * 获取当前的城市 请求方式为“JSONP”
         * @type {string}
         */
        this.CITY = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php';
        /**
         * 获取常用页面接口 请求方式为“get”
         * @type {string}
         */
        this.CLICKS = "resource/{userId}/clicks";
        /**
         * 新增组件时，获取二级菜单列表 请求方式为“get”
         * @type {string}
         */
        this.ANDRESOURCES = "resource/appsAndResources";
        /**
         * 初始化页面，获取列表 请求方式为“get”
         * @type {string}
         */
        this.COMONENTLIST = 'resource/{userId}/component/list';
        /**
         * 查询单个组件 请求方法为“get”
         * 删除组件 请求方式为“delete”
         * 更新组件 请求方式为“put”
         * @type {string}
         */
        this.IDCOMPONENT = 'resource/{userId}/{id}/component';
        /**
         * 新增组件 请求方式为“post”
         * @type {string}
         */
        this.ADDCOMPONENT = 'resource/{userId}/component';
        /**
         * 排序组件 请求方式为“put”
         * @type {string}
         */
        this.ORDERCOMPONENT = 'resource/{userId}/component/order';
        /**
         * 创建功能包 请求方式“POST”
         * @type {string}
         */
        this.PACKAGE = "resources/customizations/package";
        /**
         * 删除功能包，请求方式“DELETE”，参数“字符串（id）json数组”
         * @type {string}
         */
        this.CUSTOMIZATIONS = "resources/customizations";
        /**
         * 获取ECHARTS数据 请求方式为“get”
         * @type {string}
         */
        this.ECHARTSSDATA = "elements/data";
        /**
         * 修改密码 请求方式“put”
         * @type {string}
         */
        this.RESETPWD = "user/resetPwd";
        /**
         * 获取map数据 请求方式为“get”
         * @type {string}
         */
        this.MAPPOWERDATA = "mapPower";
        /**
         * 获取地图里面的树形图 请求方式“get”
         * @type {string}
         */
        this.TREE = "resources/tree";
        /**
         * 获取点击数对应的列表 请求方式“get”
         * @type {string}
         */
        this.CHILDLIST = "resources/childList";
        /**
         * 通过条件查询系统通知消息 请求方式“get”
         * @type {string}
         */
        this.NOTICES = "notice/notices";
        /**
         * 查询通知消息来源 请求方法“get”
         * @type {string}
         */
        this.SENDERS = "notice/senders";
        /**
         * 全部忽略 请求方式“delete”
         * @type {string}
         */
        this.DELETEALL = 'notice';
        /**
         * 根据条件忽略消息
         * @type {string}
         */
        this.DELETEID = 'notice/{messageId}';

        /**
         * 是否为软件部的，需要登录那几个旧系统的，默认为false
         * @type {boolean}
         */
        this.IS_SOFTWEAR_DEPT = true;

        this.ACCESS_TOKEN = 'access_token';
    }

    /**
     * 根据条件来获取对应的路径
     * @param str 路径的参数
     * @param obj 这对象为访问地址里面{}的值,比如:{userId:'test5',clientId:'12313',...}，键的顺序要和路径里面的{}的顺序一致
     * @returns {string} 返回对应的url路径
     */
    getUrl(str, obj) {
        let b = location.port === '9010';
        let getUrl = this[str];
        if (obj) {
            //把{}里面的值替换成传的参数值
            getUrl = this[str].replace(/\{.*?\}/g, function(word) {
                return obj[word.substring(1, word.length - 1)]
            });
        }

        let urlStr = getUrl.split('/');
        //getUrl = b && urlStr.length > 1 ? urlStr[urlStr.length - 1] : getUrl;
        let host = location.protocol + "//" + location.host + '/';

        //todo 这是门户的线上版地址
        // let host = 'http://192.168.1.163:20210/';

        //todo 这是老子自己的服务
        //let host = 'http://192.168.13.113:10303/';
        let url = (b ? '../mokeData/marketingGroup/' : host) + getUrl + (b ? '.json' : '');

        if (getUrl !== 'login' && getUrl !== 'me' && getUrl !== 'access_token') {
            url = (b ? '../mokeData/marketingGroup/' : (host + "portal/")) + getUrl + (b ? '.json' : '');
        }
        //let url = host + "portal/" + getUrl;
        //let url = host + getUrl;

        //todo
        // if (getUrl !== 'login') {
        //     let access_token = JSON.parse(sessionStorage.getItem('x_token'));
        //     access_token = access_token.split(';')[0];
        //
        //     url += (url.indexOf('?') > -1) ? ('&' + access_token) : ('?' + access_token);
        // }
        return url;
    };

    /**
     * 根据条件返回全路径
     * @param str
     * @returns {*}
     */
    getPageUrl(str) {
        return this[str];
    };
}
export default UrlMapping;