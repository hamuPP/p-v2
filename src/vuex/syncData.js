/*********************************************************************
 * 所有的ajax的请求                                                  *
 * Created by tr on 2017/6/22                                        *
 *********************************************************************/
import um from './UrlMapping'
import com from './common/common'
import Ajax from './Ajax'
import * as con from './constant'
import commonMethods from './modules/commonMethods'

import Md5 from './md5'


export default {
    /**
     * 日期相减得天数
     * @param d1
     * @param d2
     * @returns {*}
     * @constructor
     */
    DateDiff(d1, d2) {
        let day = 24 * 60 * 60 * 1000;
        try {
            return (d1 - d2) / day;
        } catch (e) {
            return false;
        }
    },
    /**
     * ajax的请求操作
     * @param 请求时所需要传的参数
     */
    syncData(options) {
        let getTime = new Date().getTime();
        let loginData = sessionStorage.getItem('loginData');
        if (this.DateDiff(loginData, getTime) >= 2) {
            sessionStorage.clear('loginData');
            this.loginOut();
        } else {
            new Ajax().ajax(options);
        }
    },
    /**
     * 获取用户的基本信息
     * @param req
     * @param res
     */
    userNew(req, res) {
        this.syncData({
            url: new um().getUrl('ME'),
            data: req,
            cb: data => {
                if (data && data.meta && data.meta.code * 1 === 1) {
                    res(data.data);
                } else {

                    window.location.href = "#/login";
                }
            }
        });
        //获取access_token
        this.syncData({
            url: new um().getUrl('ACCESS_TOKEN'),
            cb: d => {
                if (d && d.meta && d.meta.code === 1) {
                    let _accessToken = d.data.value || d.data["access_token"];
                    sessionStorage.setItem('access_token', JSON.stringify("access_token=" + _accessToken));
                }
            }
        });
    },
    /**
     * 获取用户其他职位信息
     * @param req
     * @param res
     */
    orgInfo(req, res) {
        this.syncData({
            url: new um().getUrl('ORGINFO'),
            data: req,
            cb: data => {
                if (data && data.meta && data.meta.code * 1 === 1) {
                    res(data.data);
                } else {
                    window.location.href = "#/login";
                }
            }
        });
    },
    /**
     * 获取常用业务
     * @param req
     * @param res
     */
    getClicks(req, res) {
        this.syncData({
            url: new um().getUrl('CLICKS', req.url),
            data: req.data,
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取业务定制
     * @param req
     * @param res
     */
    getFunc(req, res) {
        this.syncData({
            url: new um().getUrl('FUNC'),
            data: req,
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取主键模块
     * @param req
     * @param res
     */
    getElements(req, res) {
        this.syncData({
            url: new um().getUrl('ELEMENTS'),
            data: req,
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取主件的数据
     * @param req
     * @param res
     */
    geData(req, res) {
        this.syncData({
            url: new um().getUrl('DATA'),
            data: req,
            type: 'put',
            dataType: 'json',
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data.rows;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 新建功能包
     * @param req
     * @param res
     */
    foundPackage(req, res) {
        this.syncData({
            url: new um().getUrl('PACKAGE'),
            data: req,
            type: 'post',
            dataType: 'json',
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取accessToken的值
     * @param req
     * @param res
     */
    getClientId(req, res) {
        this.syncData({
            url: new um().getUrl('CLIENTID', req),
            data: {},
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        })
    },
    /**
     * 获取所用的应用信息
     * @param req
     * @param res
     */
    getAppsFunctionMap(req, res) {
        let that = this;
        that.syncData({
            url: new um().getUrl("APPS"),
            data: req,
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);

            }
        });
    },
    /**
     * 获取所有应用中树形列表
     * @param req
     * @param res
     */
    getTree(req, res) {
        this.syncData({
            url: new um().getUrl('TREE'),
            data: req,
            cb: data => {
                let newList = [];
                if (data && data.meta && data.meta.code * 1 === 1) {
                    newList.push(data.data);
                    newList = new com().recursion(newList);
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newList);
            }
        });
    },
    /**
     * 获取点击数对应的列表
     * @param req
     * @param res
     */
    getChildList(req, res) {
        this.syncData({
            url: new um().getUrl('CHILDLIST'),
            data: req,
            cb: data => {
                let newData = [],
                    sum = 0;
                /*随机图标字体图标的下标*/
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                    let strData = con.ICON_ARRAY; //随机的字体图标
                    newData.map(data => {
                        data.icon = strData[sum >= 17 ? sum = 0 : sum];
                        sum++;
                    });
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 登录
     * @param req
     * @param res
     */
    login(req, res) {
        let me = this;
        let _um = new um();

        let _md5 = new Md5();
        let password = req.password;
        var passwordMd5 = _md5.hex_md5(password); //加密
        var passwordMd5Upper = passwordMd5.toUpperCase(); //转换全大写

        me.syncData({
            url: _um.getUrl('LOGIN'),
            data: {
                username: req.username,
                password: passwordMd5Upper
            },
            type: 'POST',
            cb: data => {
                if (data) {
                    let newData = {};
                    sessionStorage.setItem('loginData', new Date().getTime());

                    sessionStorage.setItem('access_token', JSON.stringify(newData.data));
                    sessionStorage.setItem('x_token', JSON.stringify(newData.data));
                    newData = data;
                    //如果是软件部的那个需要登录2个旧系统的，先发送登录情况
                    me.softDeptLogin(req.username, password, passwordMd5Upper);

                    res(newData);

                } else {
                    res({});
                }

            }
        });
    },

    /**
     * login in software dept system
     * @return undefined
     */
    softDeptLogin(user, originalPwd, md5Pwd) {
        //生产
        let _loginUi = () => {
            let me = this;

            let mockUser = 'maxadmin';
            let mockPwd = '111111';

            let oldDivs = document.getElementsByClassName("sc-wrapper");
            let currentDiv;
            let currentIframe;
            if (oldDivs && oldDivs.length) {
                currentDiv = oldDivs[0];
                currentIframe = currentDiv.getElementsByTagName("iframe")[0];
            } else {
                currentDiv = document.createElement("div");
                currentIframe = document.createElement("iframe");

                currentDiv.style.display = "none";
                currentDiv.style.overflow = "hidden";
                currentDiv.setAttribute("class", "sc-wrapper");

                currentIframe.setAttribute("sandbox", "");
                currentIframe.setAttribute("security", "restricted");
                currentIframe.setAttribute("data-id", "sc");
                currentIframe.style.display = "none";

                currentDiv.appendChild(currentIframe);
                document.body.appendChild(currentDiv);
            }
            currentIframe.setAttribute("src", "http://10.176.155.47:7001/ui/?event=loadapp&value=startcntr&username=" + user + "&password=" + md5Pwd + "&login=true");

        };

        //物资
        let _login9002Ui = () => {
            let me = this;

            let mockUser = 'maxadmin';
            let mockPwd = '111111';

            let oldDivs = document.getElementsByClassName("wz-wrapper");
            let currentDiv;
            let currentIframe;

            if (oldDivs && oldDivs.length) {
                currentDiv = oldDivs[0];
                currentIframe = currentDiv.getElementsByTagName("iframe")[0];
            } else {
                currentDiv = document.createElement("div");
                currentIframe = document.createElement("iframe");

                currentDiv.style.display = "none";
                currentDiv.style.overflow = "hidden";
                currentDiv.setAttribute("class", "wz-wrapper");

                currentIframe.setAttribute("data-id", "wz");
                currentIframe.setAttribute("sandbox", "");
                currentIframe.setAttribute("security", "restricted");
                currentIframe.style.display = "none";

                currentDiv.appendChild(currentIframe);
                document.body.appendChild(currentDiv);
            }

            currentIframe.setAttribute("src", "http://10.176.105.94:9002/ui/?username=" + user + "&password=" + md5Pwd + "&login=true");
        };

        let _loginMobileEnd = () => {
            const url = "http://10.176.105.138:8090/default/org.gocom.components.coframe.auth.login.login.flow";

            let oldDivs = document.getElementsByClassName("mobile-wrapper");
            let oldForms = document.getElementsByClassName("mobileform");
            let currentDiv;
            let currentIframe;
            let currentForm;

            if (oldDivs && oldDivs.length) {
                currentDiv = oldDivs[0];
                currentIframe = currentDiv.getElementsByTagName("iframe")[0];
                currentForm = oldForms[0];
            } else {
                currentDiv = document.createElement("div");
                currentIframe = document.createElement("iframe");
                currentForm = document.createElement("form");

                currentDiv.style.display = "none";
                currentDiv.style.overflow = "hidden";
                currentDiv.setAttribute("class", "mobile-wrapper");

                currentIframe.setAttribute("data-id", "mobile");
                currentIframe.setAttribute("name", "loginFrmMobile");
                currentIframe.style.overflow = "hidden";
                currentIframe.style.display = "none";
                currentIframe.setAttribute("sandbox", "");
                currentIframe.setAttribute("security", "restricted");

                currentForm.setAttribute("method", "post");
                currentForm.setAttribute("target", "loginFrmMobile");
                currentForm.setAttribute('data-id', 'mobileform');
                currentForm.setAttribute('class', 'mobileform');
                currentForm.style.display = "none";
                currentDiv.appendChild(currentIframe);
                document.body.appendChild(currentDiv);
                document.body.appendChild(currentForm);
            }

            currentForm.innerHTML = "<input name='event' value='loadapp'/>" +
                "<input name='userId' value=" + user + " />" +
                "<input name='password' value=" + md5Pwd + " />";

            currentForm.setAttribute("action", url);
            currentForm.submit();

            // document.body.removeChild(ifr);
        };

        //just for test.do not delete these code
        let _loginMe = () => {
            let me = this;

            let div = document.createElement("div");
            let ifr = document.createElement("iframe");


            div.style.display = "none";
            div.style.overflow = "hidden";

            ifr.setAttribute("src", "http://10.176.155.47:7001/ui/?event=loadapp&value=startcntr&username=maxadmin&password=111111&login=true");

            div.appendChild(ifr);
            document.body.appendChild(div);
        };

        _loginUi();
        _login9002Ui();
        _loginMobileEnd();
    },
    /**
     * 退出
     */
    loginOut() {
        let me = this;

        me.syncData({
            url: new um().getUrl('LOGINOUT'),
            data: {},
            cb: data => {
                /*remove iframes*/
                let ifrms = document.getElementsByTagName("iframe");
                let copyIfrms = Object.assign({}, ifrms);


                //登録時にsessionStorageに保存したアカウントを削除
                sessionStorage.removeItem("loginAccount");
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
                window.location.href = "#/login";
            }
        });
    },
    /**
     * 修改密码
     * @param req
     * @param res
     */
    resetPwd(req, res) {
        this.syncData({
            url: new um().getUrl('RESETPWD'),
            data: req,
            type: 'put',
            cb: data => {
                let newData = 0;
                if (data && data.meta) {
                    newData = data.meta;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 判断请求的接口是否有效
     * @param url
     * @param time
     * @param callback
     */
    timedGetText(url, time, callback) {
        let me = this;
        let request = new XMLHttpRequest();
        let timeout = false;
        let timer = setTimeout(function() {
            timeout = true;
            request.abort();
        }, time);
        request.open("GET", url);
        me.showLoadingModal();
        request.onreadystatechange = function() {
            me.hideLoadingModal();
            if (request.readyState !== 4) {
                return;
            }
            if (timeout) {
                return;
            }
            clearTimeout(timer);
            callback(request.status);
        };
        request.send(null);
    },
    /**
     * 判断跳转路径是不是可以跳转
     * @param req
     * @param res
     */
    isGoToURL(req, res) {
        this.timedGetText(req.url, '5000', data => {
            if (data * 1 === 0 || data * 1 === 200) {
                window.open(req.url);
            } else {
                res('该跳转页面无效!');
            }
        });
    },
    /**
     * 获取功能地图的信息或定制功能的信息
     * @param req
     * @param res
     */
    getFunctionMap(req, res) {
        let that = this;
        that.syncData({
            url: new um().getUrl('FUNC', req),
            data: {},
            cb: data => {
                if (data) {
                    let newData = data.data,
                        sum = 0;
                    /*随机图标字体图标的下标*/

                    if (newData) {
                        let strData = con.ICON_ARRAY; //随机的字体图标
                        if (newData) {
                            newData.map(data => {
                                sum++;
                                let children = data.children ? data.children : [];
                                if (children.length) {
                                    children.map(item => {
                                        item.styleId = 1;
                                        /* 17 为随机图标的长度 */
                                        item.icon = strData[sum >= 17 ? sum = 0 : sum];
                                        item.activeStatus = item.activeStatus === 0 ? item.activeStatus : 1;
                                        item.resourceType = item.resourceType ? item.resourceType : 1;
                                        sum++;
                                    });

                                }

                            });
                        }
                    }
                    res(newData);
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
            }
        });
    },
    /**
     * 保存定制功能
     * @param req
     * @param res
     */
    addCustom(req, res) {
        this.syncData({
            url: new um().getUrl('CUSTOM'),
            data: req,
            type: 'put',
            cb: data => {
                let newData = {};
                if (data) {
                    newData = data.meta;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        })
    },
    /**
     * 获取功能模块的信息
     * @param req
     * @param res
     */
    getList(req, res) {
        this.syncData({
            url: req.url,
            data: req.data,
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data.rows;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取代办的信息
     * @param req
     * @param res
     */
    getBacklogs(req, res) {
        this.syncData({
            url: new um().getUrl('BACKLOGS', req.url),
            data: req.parameter,
            cb: data => {
                if (data.code == 1) {
                    let totalPage = parseInt(data.total / 20);
                    totalPage = data.total % 20 > 0 ? totalPage + 1 : totalPage;

                    let list = {
                        "totalPage": totalPage,
                        "data": []
                    };

                    if (data.data) {
                        data.data.map(da => {
                            let newDa = da;
                            let date = new Date().getTime() - new Date(da.createTime).getTime();
                            date = date / 1000 / 60;
                            let duration = '';
                            switch (true) {
                                case date < 5:
                                    duration = '5分钟内';
                                    break;
                                case date < 30:
                                    duration = '半小时内';
                                    break;
                                case date < 24 * 60:
                                    duration = '1天内';
                                    break;
                                case date < 24 * 60 * 7:
                                    duration = '一周内';
                                    break;
                                case date < 24 * 60 * 31:
                                    duration = '一个月内';
                                    break;
                                default:
                                    duration = '一个月前';
                            }

                            newDa.createTime = da.createTime.substring(5, da.createTime.length - 3);

                            newDa.duration = duration;
                            list.data.push(newDa);
                        });
                    }
                    res(list);
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
            }
        });
    },
    /**
     * 获取代办Tag的信息
     * @param req
     * @param res
     */
    getBacklogsTag(req, res) {
        this.syncData({
            url: new um().getUrl('BACKLOGS_TAG', req),
            data: {},
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取查询事件来源
     * @param req
     * @param res
     */
    getClients(req, res) {
        this.syncData({
            url: new um().getUrl('CLIENTS', req),
            data: {},
            cb: data => {

                let newData = { '': '全部系统' };
                if (data) {
                    let list = data.data;
                    for (let li in list) {
                        newData[li] = list[li]
                    }
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取天气的信息
     * @param req
     * @param res
     */
    getWeather(req, res) {
        this.syncData({
            url: new um().getPageUrl('WEATHER'),
            data: req,
            jsonp: 'json',
            cb: data => {
                let newData = {};
                if (data) {
                    newData = data.results;
                }
                res(newData);
            }
        });
    },
    /**
     * 获取新闻的基本信息
     * @param req
     * @param res
     */
    getNews(req, res) {
        let reqD = new Object(req);
        reqD["queryName"] = "queryTop";
        reqD["filterQuery"] = true;
        reqD["queryType"] = "page";
        reqD["cmstype"] = "PORTAL_ACTIVE";
        reqD["doubleCmstype"] = "AC_NEWS";
        reqD["page"] = "1";
        this.syncData({
            url: new um().getPageUrl('NEWS'),
            data: reqD,
            jsonp: 'jsonp',
            cb: data => {
                let newData = [];
                if (data.rows) {
                    data.rows.map(da => {
                        let dataVal = da;
                        dataVal.imgSrc = "http://lensyn.imwork.net:7000/portal/rest/downloadFile?fileId=" + da.imgId;
                        dataVal.url = new um().getPageUrl('NEWSDETAIL') + "?id=" + da.uuid + "&" + new um().getPageUrl("NEWSDETAILELE");
                        newData.push(dataVal);
                    });
                }
                res(newData);
            }
        });
    },
    /**
     * 新增组件时，获取列表
     * @param res
     */
    getAppsResources(res) {
        this.syncData({
            url: new um().getUrl('ANDRESOURCES'),
            data: {},
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                }
                res(newData);
            }
        });
    },
    /**
     * 打开主页，获取组件列表数据
     * @param req
     * @param res
     */
    getComponentList(req, res) {
        this.syncData({
            url: new um().getUrl('COMONENTLIST', req),
            data: {},
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                }
                res(newData);
            }
        });
    },
    /**
     * 查询单个组件get   删除组件delete  更新组件put
     * @param req
     * @param res
     */
    getIdComponent(req, res) {
        let that = this;
        this.syncData({
            url: new um().getUrl('IDCOMPONENT', req.url),
            data: req.data,
            type: req.type,
            cb: data => {
                let newData = {};
                if (data) {
                    newData = data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 新增组件post
     * @param req
     * @param res
     */
    setAddComponent(req, res) {
        this.syncData({
            url: new um().getUrl('ADDCOMPONENT', req.url),
            data: req.data,
            type: "post",
            cb: data => {
                let newData = {};
                if (data) {
                    newData = data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 排序组件put
     * @param req
     * @param res
     */
    setComponentOder(req, res) {
        this.syncData({
            url: new um().getUrl('ORDERCOMPONENT', req.url),
            data: req.IDOrder,
            type: "put",
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取ECHARTS数据POST parameter: url  id
     * @param req
     * @param res
     */
    getEchartsData(req, res) {
        this.syncData({
            url: new um().getUrl('ECHARTSSDATA'),
            data: req,
            type: "POST",
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取ECHARTS数据
     * @param res
     */
    getMapPowerData(res) {
        this.syncData({
            url: '../mokeData/marketingGroup/mapPower.json',
            data: {},
            type: "get",
            cb: data => {
                res(data.data[0]);
            }
        });
    },
    /**
     * 获取通过条件查询通知消息
     * @param req
     * @param res
     */
    getNotices(req, res) {
        this.syncData({
            url: new um().getUrl('NOTICES'),
            data: req,
            type: 'get',
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 获取通知消息来源
     * @param res
     */
    getSenders(res) {
        this.syncData({
            url: new um().getUrl("SENDERS"),
            type: 'get',
            cb: data => {
                let newData = [];
                if (data && data.meta && data.meta.code * 1 === 1) {
                    newData = data.data;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },
    /**
     * 全部忽略
     * @param res
     */
    deleteAllNotice(res) {
        this.syncData({
            url: new um().getUrl('DELETEALL'),
            type: 'delete',
            cb: data => {
                let newData = [];
                if (data && data.meta) {
                    newData = data.meta;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        })
    },
    /**
     * 根据id忽略数据
     * @param req
     * @param res
     */
    deleteIdNotice(req, res) {
        this.syncData({
            url: new um().getUrl('DELETEID', req),
            type: 'delete',
            cb: data => {
                let newData = [];
                if (data && data.meta) {
                    newData = data.meta;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },

    /**
     * show loading layer
     */
    showLoadingModal() {
        this._hideOldLayers();

        let eleNewLayer = document.createElement("div");
        let eleHomepage = document.getElementById("homePage");

        eleNewLayer.innerHTML = '<div class="modal-cls"></div>' +
            '<div class="box-cls">' +
            '<img src="../../../../static/images/loading.gif">' +
            '</div>' +
            '</div>';
        eleNewLayer.setAttribute("class", "functionmap-full-loading-layer");
        eleNewLayer.style.display = "block";
        if (eleHomepage) { eleHomepage.appendChild(eleNewLayer); }
    },

    /**
     * hide loading layer
     */
    hideLoadingModal() {
        this._hideOldLayers();
        let eleLayer = document.getElementsByClassName("functionmap-full-loading-layer");
        if (eleLayer.length < 1) return;
        for (let i = 0; i < eleLayer.length; i++) {
            eleLayer[i].style.display = 'none';
        }
    },

    /**
     * show loading layer
     */
    showLoadingModal() {
        this._hideOldLayers();

        let eleNewLayer = document.createElement("div");
        let eleHomepage = document.getElementById("homePage");

        eleNewLayer.innerHTML = '<div class="modal-cls"></div>' +
            '<div class="box-cls">' +
            '<img src="../../../../static/images/loading.gif">' +
            '</div>' +
            '</div>';
        eleNewLayer.setAttribute("class", "functionmap-full-loading-layer");
        eleNewLayer.style.display = "block";
        if (eleHomepage) { eleHomepage.appendChild(eleNewLayer); }
    },

    /**
     * hide loading layer
     */
    hideLoadingModal() {
        this._hideOldLayers();
        let eleLayer = document.getElementsByClassName("functionmap-full-loading-layer");
        if (eleLayer.length < 1) return;
        for (let i = 0; i < eleLayer.length; i++) {
            eleLayer[i].style.display = 'none';
        }
    },

    /**
     * hide the loading layer(s) which was(were) created by <LoadingTpl>
     * @private
     * @return undefined
     */
    _hideOldLayers() {
        let eleOldLayers = document.getElementsByClassName("loading-layer");
        if (eleOldLayers.length < 1) return;
        for (let i = 0; i < eleOldLayers.length; i++) {
            eleOldLayers[i].style.display = 'none';
        }
    }
}