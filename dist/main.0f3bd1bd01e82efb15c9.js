webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(26);
var hide = __webpack_require__(15);
var redefine = __webpack_require__(16);
var ctx = __webpack_require__(23);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(70)('wks');
var uid = __webpack_require__(38);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(184);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(145);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(29);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*********************************************************************
 * 所有的时间变量                                                    *
 * Created by tr on 2017/6/22                                        *
 *********************************************************************/
/*显示加载中*/
var LOADING_SHOW = exports.LOADING_SHOW = "LOADING_SHOW";
/*隐藏加载中*/
var LOADING_HIDE = exports.LOADING_HIDE = "LOADING_HIDE";

/*提示框的显示*/
var PROMPT_SHOW = exports.PROMPT_SHOW = "PROMPT_SHOW";
/*提示框隐藏*/
var PROMPT_HIDE = exports.PROMPT_HIDE = "PROMPT_HIDE";
/*提示信息的数据*/
var PROMPT_DATA = exports.PROMPT_DATA = "PROMPT_DATA";

/*用户基本信息*/
var USER_DATA = exports.USER_DATA = "USER_DATA";
/*修改密码*/
var RESET_PWD_DATA = exports.RESET_PWD_DATA = "RESET_PWD_DATA";
/*显示修改密码*/
var SHOW_RESET_PWD = exports.SHOW_RESET_PWD = "SHOW_RESET_PWD";
/*隐藏修改密码*/
var HIDE_RESET_PWD = exports.HIDE_RESET_PWD = "HIDE_RESET_PWD";

/*获取定制地图的数据*/
var FUNC_DATA = exports.FUNC_DATA = "FUNC_DATA";
/*定制完成的数据*/
var CLICKS_DATA = exports.CLICKS_DATA = "CLICKS_DATA";

/*天气数据*/
var WEATHER_DATA = exports.WEATHER_DATA = "WEATHER_DATA";

/*地图数据*/
var FUNCTION_MAP_DATA = exports.FUNCTION_MAP_DATA = "FUNCTION_MAP_DATA";
/*定制数据*/
var MAP_LIST_DATA = exports.MAP_LIST_DATA = "MAP_LIST_DATA";
/*根据ID来获取数据*/
var CLIENT_ID_DATA = exports.CLIENT_ID_DATA = "CLIENT_ID_DATA";
/*地图的树形图数据*/
var MAP_TREE_DATA = exports.MAP_TREE_DATA = "MAP_TREE_DATA";
/*根据条件获取对应的列表数据*/
var MAP_TREE_LIST_DATA = exports.MAP_TREE_LIST_DATA = "MAP_TREE_LIST_DATA";
/*修改树形图的数据*/
var TREE_OBJ = exports.TREE_OBJ = "TREE_OBJ";

/*登陆的数据*/
var LOGIN_DATA = exports.LOGIN_DATA = "LOGIN_DATA";

/*地图的显示*/
var MAP_SHOW = exports.MAP_SHOW = "MAP_SHOW";
/*地图的隐藏*/
var MAP_HIDE = exports.MAP_HIDE = "MAP_HIDE";

/*地图中搜索的显示*/
var MAP_SEARCH_SHOW = exports.MAP_SEARCH_SHOW = "MAP_SEARCH_SHOW";
/*地图中搜索的隐藏*/
var MAP_SEARCH_HIDE = exports.MAP_SEARCH_HIDE = "MAP_SEARCH_HIDE";
/*保存定制后的数据*/
var CUSTOM_DATA = exports.CUSTOM_DATA = "CUSTOM_DATA";
/*地图里面的标题*/
var MAP_TITLE = exports.MAP_TITLE = "MAP_TITLE";
/*定制的标题*/
var CUSTOM_TITLE_NAME = exports.CUSTOM_TITLE_NAME = "CUSTOM_TITLE_NAME";
/*显示功能包里面的新增文件夹*/
var SHOW_POPUP = exports.SHOW_POPUP = "SHOW_POPUP";
/*隐藏功能包的新增文件夹*/
var HIDE_POPUP = exports.HIDE_POPUP = "HIDE_POPUP";

/*显示全屏代办*/
var MAXING_FULL_SCREEN = exports.MAXING_FULL_SCREEN = "MAXING_FULL_SCREEN";
/*关闭全屏代办*/
var RESET_SCREEN = exports.RESET_SCREEN = "RESET_SCREEN";
/*代办tag数据*/
var BACKLOGS_TAG_DATA = exports.BACKLOGS_TAG_DATA = "BACKLOGS_TAG_DATA";

/*新闻的数据*/
var NEWS_DATA_Value = exports.NEWS_DATA_Value = 'NEWS_DATA_Value';

/*代办的数据*/
var BACK_LOGS_DATA = exports.BACK_LOGS_DATA = "BACK_LOGS_DATA";
/*事项来源的数据*/
var CLIENTS_DATA = exports.CLIENTS_DATA = "CLIENTS_DATA";

/*显示右边的基本信息*/
var RIGHT_MODEL_SHOW = exports.RIGHT_MODEL_SHOW = 'RIGHT_MODEL_SHOW';
/*隐藏右边的基本信息*/
var RIGHT_MODEL_HIDE = exports.RIGHT_MODEL_HIDE = 'RIGHT_MODEL_HIDE';
/*允许组件的拖动*/
var ALLOW_ASSEMBLY = exports.ALLOW_ASSEMBLY = 'ALLOW_ASSEMBLY';
/*不允许组件的拖动*/
var NOT_ALLOW_ASSEMBLY = exports.NOT_ALLOW_ASSEMBLY = 'NOT_ALLOW_ASSEMBLY';

/*******************************日历 start*****************************/
/*今天的日期*/
var CALENDAR_NOW = exports.CALENDAR_NOW = 'CALENDAR_NOW';
/*显示日期控件*/
var CALENDAR_SHOW = exports.CALENDAR_SHOW = 'CALENDAR_SHOW';
/*关闭日期控件*/
var CALENDAR_PROP = exports.CALENDAR_PROP = 'CALENDAR_PROP';
/*当前的开开时间*/
var CALENDAR_SHOW_DATE = exports.CALENDAR_SHOW_DATE = 'CALENDAR_SHOW_DATE';
var CALENDAR_PICK = exports.CALENDAR_PICK = 'CALENDAR_PICK';
var CALENDAR_DATA = exports.CALENDAR_DATA = 'CALENDAR_DATA';
/*******************************日历 end*****************************/

var LIST_DATA = exports.LIST_DATA = 'LIST_DATA';
/*判断右侧模板是否出现覆盖层 进行编辑组件*/
var SHOW_EDIT_MASK = exports.SHOW_EDIT_MASK = 'SHOW_EDIT_MASK';
var HIDE_EDIT_MASK = exports.HIDE_EDIT_MASK = 'HIDE_EDIT_MASK';
/*显示弹出编辑组件框*/
var SHOW_EDIT_COMPONENT = exports.SHOW_EDIT_COMPONENT = 'SHOW_EDIT_COMPONENT';
/*隐藏弹出编辑组件框*/
var HIDE_EDIT_COMPONENT = exports.HIDE_EDIT_COMPONENT = 'HIDE_EDIT_COMPONENT';
/*显示编辑还是新增组件*/
var ISADD_OR_EDIT_COMPONENT = exports.ISADD_OR_EDIT_COMPONENT = 'ISADD_OR_EDIT_COMPONENT';
/*隐藏编辑还是新增组件*/
var NOADD_OR_EDIT_COMPONENT = exports.NOADD_OR_EDIT_COMPONENT = 'NOADD_OR_EDIT_COMPONENT';

/*获取定制功能包返回的数据*/
var FOUND_PACKAGE = exports.FOUND_PACKAGE = 'FOUND_PACKAGE';

/*显示增加组件按钮*/
var SHOW_ADD_COMPONENT = exports.SHOW_ADD_COMPONENT = 'SHOW_ADD_COMPONENT';
/*隐藏增加组件按钮*/
var HIDE_ADD_COMPONENT = exports.HIDE_ADD_COMPONENT = 'HIDE_ADD_COMPONENT';
/*获取主键的列表*/
var COMPONENT_LIST_MUN = exports.COMPONENT_LIST_MUN = "COMPONENT_LIST_MUN";

/********************************* start 组件的所有数据  start **********************************/
/*获取所有业务对应下的功能*/
var MU_APPS_RESOURCES = exports.MU_APPS_RESOURCES = "MU_APPS_RESOURCES";
/*新增组件的返回的数据*/
var ADD_COMPONENT_DATA = exports.ADD_COMPONENT_DATA = "ADD_COMPONENT_DATA";
/*获取更新后的数据*/
var GET_ID_EDIT_DATA = exports.GET_ID_EDIT_DATA = "GET_ID_EDIT_DATA";
/*获取删除后返回的数据*/
var GET_ID_COMPONENT = exports.GET_ID_COMPONENT = "GET_ID_COMPONENT";
/*获取所有的数据*/
var GET_ID_LIST_DATA = exports.GET_ID_LIST_DATA = "GET_ID_LIST_DATA";
/*获取echarts数据*/
var MAP_POWER_DATA = exports.MAP_POWER_DATA = "MAP_POWER_DATA";
/*右边的边框显示*/
var RIGHT_MODEL_PADDING = exports.RIGHT_MODEL_PADDING = "RIGHT_MODEL_PADDING";
/*右边的边框隐藏*/
var HIDE_RIGHT_MODEL_PADDING = exports.HIDE_RIGHT_MODEL_PADDING = "HIDE_RIGHT_MODEL_PADDING";
/********************************* end 组件的所有数据  end  **********************************/

/********************************* start 消息通知数据  start  **********************************/
/*显示消息通知*/
var SHOW_NEWS_NOTICE = exports.SHOW_NEWS_NOTICE = "SHOW_NEWS_NOTICE";
/*隐藏消息通知*/
var HIDE_NEWS_NOTICE = exports.HIDE_NEWS_NOTICE = "HIDE_NEWS_NOTICE";
/*系统通知消息数据*/
var NEWS_NOTICE_DATA = exports.NEWS_NOTICE_DATA = "NEWS_NOTICE_DATA";
/*系统通知消息数据*/
var NEWS_NO_NOTICE_DATA = exports.NEWS_NO_NOTICE_DATA = "NEWS_NO_NOTICE_DATA";
/*通知消息来源数据*/
var SENDERS_DATA = exports.SENDERS_DATA = "SENDERS_DATA";
/*全部忽略*/
var DELETE_ALL_SENDERS_DATA = exports.DELETE_ALL_SENDERS_DATA = "DELETE_ALL_SENDERS_DATA";
/*根据ID忽略数据*/
var DELETE_ID_SENDERS_DATA = exports.DELETE_ID_SENDERS_DATA = "DELETE_ID_SENDERS_DATA";
/*显示用户操作栏数据*/
var SHOW_USER_VISIBLE = exports.SHOW_USER_VISIBLE = "SHOW_USER_VISIBLE";
/*隐藏用户操作栏数据*/
var HIDE_USER_VISIBLE = exports.HIDE_USER_VISIBLE = "HIDE_USER_VISIBLE";

/********************************* end 消息通知数据  end  **********************************/

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(37);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(15);
var has = __webpack_require__(14);
var SRC = __webpack_require__(38)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(26).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(28);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = __webpack_require__(128);

var _assign2 = _interopRequireDefault(_assign);

var _stringify = __webpack_require__(91);

var _stringify2 = _interopRequireDefault(_stringify);

var _DateDiff$syncData$us; /*********************************************************************
                            * 所有的ajax的请求                                                  *
                            * Created by tr on 2017/6/22                                        *
                            *********************************************************************/


var _UrlMapping = __webpack_require__(447);

var _UrlMapping2 = _interopRequireDefault(_UrlMapping);

var _common = __webpack_require__(191);

var _common2 = _interopRequireDefault(_common);

var _Ajax = __webpack_require__(448);

var _Ajax2 = _interopRequireDefault(_Ajax);

var _constant = __webpack_require__(192);

var con = _interopRequireWildcard(_constant);

var _commonMethods = __webpack_require__(67);

var _commonMethods2 = _interopRequireDefault(_commonMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_DateDiff$syncData$us = {
    /**
     * 日期相减得天数
     * @param d1
     * @param d2
     * @returns {*}
     * @constructor
     */
    DateDiff: function DateDiff(d1, d2) {
        var day = 24 * 60 * 60 * 1000;
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
    syncData: function syncData(options) {
        var getTime = new Date().getTime();
        var loginData = sessionStorage.getItem('loginData');
        if (this.DateDiff(loginData, getTime) >= 2) {
            sessionStorage.clear('loginData');
            this.loginOut();
        } else {
            new _Ajax2.default().ajax(options);
        }
    },

    /**
     * 获取用户的基本信息
     * @param req
     * @param res
     */
    userNew: function userNew(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('ME'),
            data: req,
            cb: function cb(data) {
                if (data && data.meta && data.meta.code * 1 === 1) {
                    res(data.data);
                } else {

                    window.location.href = "#/login";
                }
            }
        });
        //获取access_token
        this.syncData({
            url: new _UrlMapping2.default().getUrl('ACCESS_TOKEN'),
            cb: function cb(d) {
                if (d && d.meta && d.meta.code === 1) {
                    var _accessToken = d.data.value || d.data["access_token"];
                    sessionStorage.setItem('access_token', (0, _stringify2.default)("access_token=" + _accessToken));
                }
            }
        });
    },

    /**
     * 获取用户其他职位信息
     * @param req
     * @param res
     */
    orgInfo: function orgInfo(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('ORGINFO'),
            data: req,
            cb: function cb(data) {
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
    getClicks: function getClicks(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('CLICKS', req.url),
            data: req.data,
            cb: function cb(data) {
                var newData = [];
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
    getFunc: function getFunc(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('FUNC'),
            data: req,
            cb: function cb(data) {
                var newData = [];
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
    getElements: function getElements(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('ELEMENTS'),
            data: req,
            cb: function cb(data) {
                var newData = [];
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
    geData: function geData(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('DATA'),
            data: req,
            type: 'put',
            dataType: 'json',
            cb: function cb(data) {
                var newData = [];
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
    foundPackage: function foundPackage(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('PACKAGE'),
            data: req,
            type: 'post',
            dataType: 'json',
            cb: function cb(data) {
                var newData = [];
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
    getClientId: function getClientId(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('CLIENTID', req),
            data: {},
            cb: function cb(data) {
                var newData = [];
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
     * 获取所用的应用信息
     * @param req
     * @param res
     */
    getAppsFunctionMap: function getAppsFunctionMap(req, res) {
        var that = this;
        that.syncData({
            url: new _UrlMapping2.default().getUrl("APPS"),
            data: req,
            cb: function cb(data) {
                var newData = [];
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
    getTree: function getTree(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('TREE'),
            data: req,
            cb: function cb(data) {
                var newList = [];
                if (data && data.meta && data.meta.code * 1 === 1) {
                    newList.push(data.data);
                    newList = new _common2.default().recursion(newList);
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
    getChildList: function getChildList(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('CHILDLIST'),
            data: req,
            cb: function cb(data) {
                var newData = [],
                    sum = 0;
                /*随机图标字体图标的下标*/
                if (data && data.meta && data.meta.code * 1 === 1 && data.data) {
                    newData = data.data;
                    var strData = con.ICON_ARRAY; //随机的字体图标
                    newData.map(function (data) {
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
    login: function login(req, res) {
        var me = this;
        var _um = new _UrlMapping2.default();

        var password = req.password;
        var passwordMd5 = hex_md5(password); //加密
        var passwordMd5Upper = passwordMd5.toUpperCase(); //转换全大写

        me.syncData({
            url: _um.getUrl('LOGIN'),
            data: {
                username: req.username,
                password: passwordMd5Upper
            },
            type: 'POST',
            cb: function cb(data) {
                if (data) {
                    var newData = {};
                    sessionStorage.setItem('loginData', new Date().getTime());

                    sessionStorage.setItem('access_token', (0, _stringify2.default)(newData.data));
                    sessionStorage.setItem('x_token', (0, _stringify2.default)(newData.data));
                    newData = data;

                    me.softDeptLogin(req.username, password, passwordMd5Upper);

                    res(newData);

                    //如果是软件部的那个需要登录2个旧系统的，先发送登录情况
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
    softDeptLogin: function softDeptLogin(user, originalPwd, md5Pwd) {
        var _this = this;

        //生产
        var _loginUi = function _loginUi() {
            var me = _this;

            var mockUser = 'maxadmin';
            var mockPwd = '111111';

            var oldDivs = document.getElementsByClassName("sc-wrapper");
            var currentDiv = void 0;
            var currentIframe = void 0;
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
        var _login9002Ui = function _login9002Ui() {
            var me = _this;

            var mockUser = 'maxadmin';
            var mockPwd = '111111';

            var oldDivs = document.getElementsByClassName("wz-wrapper");
            var currentDiv = void 0;
            var currentIframe = void 0;

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

        var _loginMobileEnd = function _loginMobileEnd() {
            var url = "http://10.176.105.138:8090/default/org.gocom.components.coframe.auth.login.login.flow";

            var oldDivs = document.getElementsByClassName("mobile-wrapper");
            var oldForms = document.getElementsByClassName("mobileform");
            var currentDiv = void 0;
            var currentIframe = void 0;
            var currentForm = void 0;

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

            currentForm.innerHTML = "<input name='event' value='loadapp'/>" + "<input name='userId' value=" + user + " />" + "<input name='password' value=" + md5Pwd + " />";

            currentForm.setAttribute("action", url);
            currentForm.submit();

            // document.body.removeChild(ifr);
        };

        //just for test.do not delete these code
        var _loginMe = function _loginMe() {
            var me = _this;

            var div = document.createElement("div");
            var ifr = document.createElement("iframe");

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
    loginOut: function loginOut() {
        var me = this;

        me.syncData({
            url: new _UrlMapping2.default().getUrl('LOGINOUT'),
            data: {},
            cb: function cb(data) {
                /*remove iframes*/
                var ifrms = document.getElementsByTagName("iframe");
                var copyIfrms = (0, _assign2.default)({}, ifrms);

                //登録時にsessionStorageに保存したアカウントを削除
                sessionStorage.removeItem("loginAccount");
                for (var i in copyIfrms) {
                    var ifr = copyIfrms[i];
                    var dataId = ifr.getAttribute("data-id");
                    var parentNode = ifr.parentNode;

                    if (dataId === "sc") {
                        ifr.setAttribute('src', 'http://10.176.155.47:7001/webclient/login/logout.jsp');
                        // document.body.removeChild(parentNode);
                    } else if (dataId === "wz") {
                        ifr.setAttribute('src', 'http://10.176.105.94:9002/webclient/login/logout.jsp');
                        // document.body.removeChild(parentNode);
                    } else if (dataId === "mobile") {
                        var forms = document.getElementsByTagName("form");
                        for (var k = 0; k < forms.length; k++) {
                            var _form = forms[k];

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
    resetPwd: function resetPwd(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('RESETPWD'),
            data: req,
            type: 'put',
            cb: function cb(data) {
                var newData = 0;
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
    timedGetText: function timedGetText(url, time, callback) {
        var me = this;
        var request = new XMLHttpRequest();
        var timeout = false;
        var timer = setTimeout(function () {
            timeout = true;
            request.abort();
        }, time);
        request.open("GET", url);
        me.showLoadingModal();
        request.onreadystatechange = function () {
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
    isGoToURL: function isGoToURL(req, res) {
        this.timedGetText(req.url, '5000', function (data) {
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
    getFunctionMap: function getFunctionMap(req, res) {
        var that = this;
        that.syncData({
            url: new _UrlMapping2.default().getUrl('FUNC', req),
            data: {},
            cb: function cb(data) {
                if (data) {
                    var newData = data.data,
                        sum = 0;
                    /*随机图标字体图标的下标*/

                    if (newData) {
                        var strData = con.ICON_ARRAY; //随机的字体图标
                        if (newData) {
                            newData.map(function (data) {
                                sum++;
                                var children = data.children ? data.children : [];
                                if (children.length) {
                                    children.map(function (item) {
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
    addCustom: function addCustom(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('CUSTOM'),
            data: req,
            type: 'put',
            cb: function cb(data) {
                var newData = {};
                if (data) {
                    newData = data.meta;
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }
                res(newData);
            }
        });
    },

    /**
     * 获取功能模块的信息
     * @param req
     * @param res
     */
    getList: function getList(req, res) {
        this.syncData({
            url: req.url,
            data: req.data,
            cb: function cb(data) {
                var newData = [];
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
    getBacklogs: function getBacklogs(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('BACKLOGS', req.url),
            data: req.parameter,
            cb: function cb(data) {
                if (data.code == 1) {
                    var totalPage = parseInt(data.total / 20);
                    totalPage = data.total % 20 > 0 ? totalPage + 1 : totalPage;

                    var list = {
                        "totalPage": totalPage,
                        "data": []
                    };

                    if (data.data) {
                        data.data.map(function (da) {
                            var newDa = da;
                            var date = new Date().getTime() - new Date(da.createTime).getTime();
                            date = date / 1000 / 60;
                            var duration = '';
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
    getBacklogsTag: function getBacklogsTag(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('BACKLOGS_TAG', req),
            data: {},
            cb: function cb(data) {
                var newData = [];
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
    getClients: function getClients(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('CLIENTS', req),
            data: {},
            cb: function cb(data) {

                var newData = { '': '全部系统' };
                if (data) {
                    var list = data.data;
                    for (var li in list) {
                        newData[li] = list[li];
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
    getWeather: function getWeather(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getPageUrl('WEATHER'),
            data: req,
            jsonp: 'json',
            cb: function cb(data) {
                var newData = {};
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
    getNews: function getNews(req, res) {
        var reqD = new Object(req);
        reqD["queryName"] = "queryTop";
        reqD["filterQuery"] = true;
        reqD["queryType"] = "page";
        reqD["cmstype"] = "PORTAL_ACTIVE";
        reqD["doubleCmstype"] = "AC_NEWS";
        reqD["page"] = "1";
        this.syncData({
            url: new _UrlMapping2.default().getPageUrl('NEWS'),
            data: reqD,
            jsonp: 'jsonp',
            cb: function cb(data) {
                var newData = [];
                if (data.rows) {
                    data.rows.map(function (da) {
                        var dataVal = da;
                        dataVal.imgSrc = "http://lensyn.imwork.net:7000/portal/rest/downloadFile?fileId=" + da.imgId;
                        dataVal.url = new _UrlMapping2.default().getPageUrl('NEWSDETAIL') + "?id=" + da.uuid + "&" + new _UrlMapping2.default().getPageUrl("NEWSDETAILELE");
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
    getAppsResources: function getAppsResources(res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('ANDRESOURCES'),
            data: {},
            cb: function cb(data) {
                var newData = [];
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
    getComponentList: function getComponentList(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('COMONENTLIST', req),
            data: {},
            cb: function cb(data) {
                var newData = [];
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
    getIdComponent: function getIdComponent(req, res) {
        var that = this;
        this.syncData({
            url: new _UrlMapping2.default().getUrl('IDCOMPONENT', req.url),
            data: req.data,
            type: req.type,
            cb: function cb(data) {
                var newData = {};
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
    setAddComponent: function setAddComponent(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('ADDCOMPONENT', req.url),
            data: req.data,
            type: "post",
            cb: function cb(data) {
                var newData = {};
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
    setComponentOder: function setComponentOder(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('ORDERCOMPONENT', req.url),
            data: req.IDOrder,
            type: "put",
            cb: function cb(data) {
                var newData = [];
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
    getEchartsData: function getEchartsData(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('ECHARTSSDATA'),
            data: req,
            type: "POST",
            cb: function cb(data) {
                var newData = [];
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
    getMapPowerData: function getMapPowerData(res) {
        this.syncData({
            url: '../mokeData/marketingGroup/mapPower.json',
            data: {},
            type: "get",
            cb: function cb(data) {
                res(data.data[0]);
            }
        });
    },

    /**
     * 获取通过条件查询通知消息
     * @param req
     * @param res
     */
    getNotices: function getNotices(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('NOTICES'),
            data: req,
            type: 'get',
            cb: function cb(data) {
                var newData = [];
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
    getSenders: function getSenders(res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl("SENDERS"),
            type: 'get',
            cb: function cb(data) {
                var newData = [];
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
    deleteAllNotice: function deleteAllNotice(res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('DELETEALL'),
            type: 'delete',
            cb: function cb(data) {
                var newData = [];
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
     * 根据id忽略数据
     * @param req
     * @param res
     */
    deleteIdNotice: function deleteIdNotice(req, res) {
        this.syncData({
            url: new _UrlMapping2.default().getUrl('DELETEID', req),
            type: 'delete',
            cb: function cb(data) {
                var newData = [];
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
    showLoadingModal: function showLoadingModal() {
        this._hideOldLayers();

        var eleNewLayer = document.createElement("div");
        var eleHomepage = document.getElementById("homePage");

        eleNewLayer.innerHTML = '<div class="modal-cls"></div>' + '<div class="box-cls">' + '<img src="../../../../static/images/loading.gif">' + '</div>' + '</div>';
        eleNewLayer.setAttribute("class", "functionmap-full-loading-layer");
        eleNewLayer.style.display = "block";
        if (eleHomepage) {
            eleHomepage.appendChild(eleNewLayer);
        }
    },


    /**
     * hide loading layer
     */
    hideLoadingModal: function hideLoadingModal() {
        this._hideOldLayers();
        var eleLayer = document.getElementsByClassName("functionmap-full-loading-layer");
        if (eleLayer.length < 1) return;
        for (var i = 0; i < eleLayer.length; i++) {
            eleLayer[i].style.display = 'none';
        }
    }
}, (0, _defineProperty3.default)(_DateDiff$syncData$us, 'showLoadingModal', function showLoadingModal() {
    this._hideOldLayers();

    var eleNewLayer = document.createElement("div");
    var eleHomepage = document.getElementById("homePage");

    eleNewLayer.innerHTML = '<div class="modal-cls"></div>' + '<div class="box-cls">' + '<img src="../../../../static/images/loading.gif">' + '</div>' + '</div>';
    eleNewLayer.setAttribute("class", "functionmap-full-loading-layer");
    eleNewLayer.style.display = "block";
    if (eleHomepage) {
        eleHomepage.appendChild(eleNewLayer);
    }
}), (0, _defineProperty3.default)(_DateDiff$syncData$us, 'hideLoadingModal', function hideLoadingModal() {
    this._hideOldLayers();
    var eleLayer = document.getElementsByClassName("functionmap-full-loading-layer");
    if (eleLayer.length < 1) return;
    for (var i = 0; i < eleLayer.length; i++) {
        eleLayer[i].style.display = 'none';
    }
}), (0, _defineProperty3.default)(_DateDiff$syncData$us, '_hideOldLayers', function _hideOldLayers() {
    var eleOldLayers = document.getElementsByClassName("loading-layer");
    if (eleOldLayers.length < 1) return;
    for (var i = 0; i < eleOldLayers.length; i++) {
        eleOldLayers[i].style.display = 'none';
    }
}), _DateDiff$syncData$us);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(61);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(62);
var createDesc = __webpack_require__(37);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(145);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(14);
var toObject = __webpack_require__(11);
var IE_PROTO = __webpack_require__(100)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(209);
var isBuffer = __webpack_require__(514);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(13);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(26);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(23);
var IObject = __webpack_require__(61);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(9);
var asc = __webpack_require__(117);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(7)) {
  var LIBRARY = __webpack_require__(39);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(80);
  var $buffer = __webpack_require__(123);
  var ctx = __webpack_require__(23);
  var anInstance = __webpack_require__(45);
  var propertyDesc = __webpack_require__(37);
  var hide = __webpack_require__(15);
  var redefineAll = __webpack_require__(47);
  var toInteger = __webpack_require__(29);
  var toLength = __webpack_require__(9);
  var toIndex = __webpack_require__(171);
  var toAbsoluteIndex = __webpack_require__(41);
  var toPrimitive = __webpack_require__(27);
  var has = __webpack_require__(14);
  var classof = __webpack_require__(63);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(11);
  var isArrayIter = __webpack_require__(114);
  var create = __webpack_require__(42);
  var getPrototypeOf = __webpack_require__(21);
  var gOPN = __webpack_require__(43).f;
  var getIterFn = __webpack_require__(116);
  var uid = __webpack_require__(38);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(31);
  var createArrayIncludes = __webpack_require__(71);
  var speciesConstructor = __webpack_require__(78);
  var ArrayIterators = __webpack_require__(119);
  var Iterators = __webpack_require__(53);
  var $iterDetect = __webpack_require__(75);
  var setSpecies = __webpack_require__(44);
  var arrayFill = __webpack_require__(118);
  var arrayCopyWithin = __webpack_require__(161);
  var $DP = __webpack_require__(8);
  var $GOPD = __webpack_require__(20);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(166);
var $export = __webpack_require__(0);
var shared = __webpack_require__(70)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(169))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(38)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(14);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(15)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(147);
var enumBugKeys = __webpack_require__(101);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(148);
var enumBugKeys = __webpack_require__(101);
var IE_PROTO = __webpack_require__(100)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(98)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(102).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(147);
var hiddenKeys = __webpack_require__(101).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(23);
var call = __webpack_require__(159);
var isArrayIter = __webpack_require__(114);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(9);
var getIterFn = __webpack_require__(116);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(16);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(86);
var IE8_DOM_DEFINE = __webpack_require__(185);
var toPrimitive = __webpack_require__(127);
var dP = Object.defineProperty;

exports.f = __webpack_require__(49) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(66)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 50 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(8).f;
var has = __webpack_require__(14);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(28);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(104);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(48);
var createDesc = __webpack_require__(87);
module.exports = __webpack_require__(49) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(188);
var defined = __webpack_require__(129);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(132)('wks');
var uid = __webpack_require__(89);
var Symbol = __webpack_require__(36).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var keys = __webpack_require__(488);
var hasBinary = __webpack_require__(198);
var sliceBuffer = __webpack_require__(489);
var after = __webpack_require__(490);
var utf8 = __webpack_require__(491);

var base64encoder;
if (global && global.ArrayBuffer) {
  base64encoder = __webpack_require__(493);
}

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = __webpack_require__(494);

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data === 'string') {
    if (data.charAt(0) === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!base64encoder) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '', n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var ret = callback(packet, i + n, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] === 255) break;

      // 310 = char length of Number.MAX_VALUE
      if (msgLength.length > 310) {
        return callback(err, 0, 1);
      }

      msgLength += tailArray[i];
    }

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 64 */,
/* 65 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(128);

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = __webpack_require__(449);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(92);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(93);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/****************************************************************************
 * Created by huanghuaqiao on 2017/10/16.                                   *
 * 表单操作相关方法                                                            *
 * 调用方式：在组件中引入该文件后在使用的地方调用相应的方法，如下                      *
 * import commonMethods from '../../vuex/modules/template/commonMethods'     *
 * new commonMethods().showToastMsg({text: '操作成功！',priority: 'success'}); *
 *****************************************************************************/
var commonMethods = function () {
    function commonMethods() {
        (0, _classCallCheck3.default)(this, commonMethods);
    }

    (0, _createClass3.default)(commonMethods, [{
        key: 'parseURL',

        /**
         * 解析url查询参数函数
         * @param u string 待解析的url
         * @returns {{source: string, protocol, host: string, port: (string|Function|*), query: (Symbol|*|string), params, file: *, hash, path: string, relative: *, segments: Array}}
         */
        value: function parseURL(u) {
            var url = u ? u : location.href;
            var a = document.createElement('a');
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':', ''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: function () {
                    var searchIndex = location.href.indexOf('?') > 0 && location.href.indexOf('?');
                    var locationSearch = searchIndex ? location.href.substr(searchIndex + 1) : '';
                    var url = u ? u.split('?')[1] : locationSearch;
                    var parameters = {};
                    var splitParameters = url.split("&");
                    for (var i = 0, length = splitParameters.length; i < length; i++) {
                        var keyValue = splitParameters[i].split("=");
                        parameters[keyValue[0]] = keyValue[1];
                    }
                    return parameters;
                }(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
                hash: a.hash.replace('#', ''),
                path: a.pathname.replace(/^([^\/])/, '/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
                segments: a.pathname.replace(/^\//, '').split('/')
            };
        }
        /**
         * {{formSerialize: Function,formClear: Function}}
         * formSerialize 表单序列化方法
         */
        /**
         * 表单序列化方法
         * @param formObj 表单项的父级div
         * eg: <div class="table-header clearfix" ref="queryForm"><label>表单字段：</label><input type="text"></div>
         *  调用方法： formSerialize(this.$refs.queryForm);
         * @returns {{formResult:{name: value}}}
         */

    }, {
        key: 'formSerialize',
        value: function formSerialize(formObj) {
            var formResult = {};
            var regData = {
                int: { reg: /^[1-9]+[0-9]*$/, text: '请输入正整数' },
                positiveNumber: { reg: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, text: '请输入正数' },
                maxLength: function maxLength(length) {
                    function returnReg(length) {
                        return { reg: new RegExp('^.{0,' + length + '}$'), text: '最大长度不超过' + length + '位' };
                    }
                    return returnReg;
                },
                ip: { reg: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/, text: '请输入正确的ip地址' },
                port: { reg: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, text: '请输入1-65535之间的数字' },
                tel: { reg: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, text: '请输入正确的电话号码' },
                email: { reg: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, text: '请输入正确的邮箱' }
            };
            if (formObj) {
                /* 获取formObj下的带name属性的字段数组 */
                var queryItems = formObj.querySelectorAll('[name]');
                /* 遍历表单字段，获取表单数据 */
                if (queryItems.length) {
                    for (var i = 0, len = queryItems.length; i < len; i++) {
                        var item = queryItems[i];
                        var validType = item.getAttribute('validType');
                        /* 复选框 */
                        if (item.outerHTML.includes('type="checkbox"')) {
                            formResult[item.name] = item.checked ? '1' : '0';
                        } else {
                            var nodeName = item.nodeName.toLowerCase();
                            item.value && (formResult[item.name] = nodeName === 'input' || nodeName === 'select' || nodeName === 'textarea' ? item.value : item.innerHTML);
                        }
                        if (validType) {
                            var valid = void 0;
                            if (validType.includes('[')) {
                                /* 获取验证名称，即maxLength */
                                var validName = validType.split('[')[0];
                                /* 获取验证参数，即最大长度 */
                                var validParams = validType.split('[')[1].replace(']', '');
                                /* 获取最大长度函数 */
                                var maxLengthFunction = regData[validName];
                                /* 获取最大长度闭包函数 */
                                var regComputed = maxLengthFunction(validParams);
                                /* 得到对应的正则参数 */
                                valid = regComputed(validParams);
                            } else {
                                valid = regData[validType];
                            }
                            if (valid) {
                                validType = valid.reg;
                                var value = formResult[item.name] || '';
                                var warnText = valid.text;
                                var existValid = document.querySelector('.valid-ele');
                                existValid && existValid.parentNode.removeChild(existValid);
                                if (!validType.test(value) && value) {
                                    formResult = null;
                                    item.focus();
                                    var warnEle = document.createElement('i');
                                    warnEle.style.cssText = 'position:absolute;display:block;font-size:12px;color:red;text-align:right;';
                                    warnEle.style.cssText += item.parentNode.nodeName === 'LABEL' ? 'top:20px;left:0;' : 'top:34px;left:135px;';
                                    warnEle.innerHTML = warnText;
                                    warnEle.className = 'valid-ele';
                                    item.parentNode.appendChild(warnEle);
                                    break;
                                }
                            }
                        }
                    }
                }
            } else {
                new commonMethods().showToastMsg({ text: '请传入正确的ref元素', priority: 'danger' });
            }
            return formResult;
        }
        /**
         * 表单值清空方法
         * @param formObj 表单项的父级div
         * eg: <div class="table-header clearfix" ref="queryForm"><label>表单字段：</label><input type="text"></div>
         *      formClear(this.$refs.queryForm);
         */

    }, {
        key: 'formClear',
        value: function formClear(formObj) {
            if (formObj) {
                /* 获取formObj下的带name属性的字段数组 */
                var queryItems = formObj.querySelectorAll('[name]');
                /* 遍历表单字段，获取表单数据 */
                if (queryItems.length) {
                    for (var i = 0, len = queryItems.length; i < len; i++) {
                        var item = queryItems[i];
                        item.value = '';
                    }
                }
            } else {
                new commonMethods().showToastMsg({ text: '请传入正确的ref元素', priority: 'danger' });
            }
        }
        /**
         * 表单值清空方法
         * @param formObj 表单项的父级div
         * eg: <div class="table-header clearfix" ref="queryForm"><label>表单字段：</label><input type="text"></div>
         *      formClear(this.$refs.queryForm);
         */

    }, {
        key: 'disableItems',
        value: function disableItems(formObj) {
            if (formObj) {
                /* 获取formObj下的带name属性的字段数组 */
                var queryItems = formObj.querySelectorAll('[name]');
                /* 遍历表单字段，获取表单数据 */
                if (queryItems.length) {
                    for (var i = 0, len = queryItems.length; i < len; i++) {
                        var className = queryItems[i].className;
                        queryItems[i].setAttribute('disabled', true);
                        className.includes('datebox') && (queryItems[i].className += ' disabled');
                    }
                }
            }
        }

        /**
         * 提示消息函数，默认3秒后消失
         * @param opt: {text: 'string' 提示文本,priority:'string' 提示样式（success:成功，danger失败）}(选择传入)
         * @param callback 文本消失后的回调操作(选择传入)
         */

    }, {
        key: 'showToastMsg',
        value: function showToastMsg() {
            var positionArray = ['top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'],
                DEFAULT_TIME = 3000,
                nExistTime = DEFAULT_TIME,
                opt = {
                priority: 'success',
                closable: false
            },
                callback = void 0,
                flag = false;

            for (var i = 0, length = arguments.length; i < length; i++) {
                var argument = arguments[i],
                    type = typeof argument === 'undefined' ? 'undefined' : (0, _typeof3.default)(argument);
                if (type === 'number') {
                    nExistTime = argument;
                } else if (type === 'object') {
                    opt = (0, _assign2.default)(opt, argument);
                } else if (type === 'function') {
                    callback = argument;
                }
            }
            /* 遍历位置数组，与传入的位置做比较，如果没有找到对应的值则设置默认值 */
            positionArray.map(function (it) {
                it === opt.position && (flag = true);
            });
            !flag && (opt.position = 'center-center');

            /* 如果页面上存在*/
            var sText = opt.text,
                sHeight = sText && String(sText).length > 20 ? Math.ceil(String(sText).length / 22) * 20 + 12 : 34,
                priority = opt.priority,
                sClassName = 'comm_toast_' + priority,
                parentDiv = document.createElement("div"),
                childDiv = document.createElement("div"),
                toastEle = document.body.querySelectorAll('.comm_toast_body'),
                toastEleDirection = {},
                errorImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAh5JREFUOBGtlb1rFEEYxp93sntphBRKMCEI5+mhIVFQG8FWbE/FP0CFlELEE8GIAVFCAsbaQv8AidkufrSCjVYGFfFMI4l4aeQuCHdmx/eZyy43u4rRc5rZfZ95fzvvx8wKfjHsxNFw5c2XioWtQHBM52EuE8gqLF7pHBXHd0dy/3U76y5Zw8cTQ6cRyxysLWU1712kBmOr+16sLXbbTfJip6fNp+PDs9jE4z/C6MQP6lr60DfhpDukEMNWE+FvZgOZ2/ty9Sp9HNCFyZ31MvpwhuEbFsDlrAsmfQH6DxyChIUu69ajMaodVi30Nc07WYbVzOYs3FPCyIMnGJy650MVtmvylmpL6B894gM1p2QZ1xq+hPbnFXxbeIgdJysYvD6f7oawgbPn0XweofVhOeOlddI2C9hn+uQN225hff6GsxFgN38g3mh2YM8W8fX2JLgmN5QVJE2bE+MY63enAJ0Hzl10cuPpAup3Liss189OJyvtnxzwHw0Bj5OSyzn/rQIw5MbSI8TNhu70AkTMb0MmK+DZVJgHZLvsvHQzzVl95konTCPOplTUZ6qIv2/4+1CWLpHItwLhSDGtZqcAnZyxUEn1C+WxrBsvj0jYjLXltXfdvcjGLuwfRav2Pl9NNnZ5XLW3fnH0siiNDR38/0eP+3ZnUA94LoZtGng5JNdY2jbFUxPXKGyTkS6jD30TQ3p9JYZeL9gckOBefgE/AWdx9phuOa94AAAAAElFTkSuQmCC',
                warningImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAYlJREFUOBGtVbFKA0EQfXNc0CZlMJdOBEFEG9Om8geipR+gjZUQERWx0MZ8gZ9gE2NtZx07QUHELjHaK5jkxpm93KnRzBniwHLszpu3sztv5wi/GJ8uZfDyVAZxWdxFMBccjKgp3waY6sjl67Rx3RkMp8EFPgpWAKoCPDPo+z6nB8FUaL91/nXdiyfMhx4fF05kXksn0yi3YU1jNDbmSTJ0ZMyV2DHSl6hKe81tjXGE0TE1s7FsVY9PUQFat+YxS1vA1DxwsQl03obsKneaC+Y8V820AuQXgOkS4GWGkOmy3Kkow+tLwwCKq/MaZRZ2bZzITKtTtFHi7b3LEDLupUGLXiJaC9oVwlA0HIYWSjbkQqIfExlnFn8NsA99TsyzBgZ4vgP8SckgJUPh8oWoIcMmfLwC2jcCU9myjKHWkDuUh55mywfA2hkwkbWRwvU3YQeLQDYA7i+NY0fC/ven56rsWpA8cPs8hlebQ7+Nfcpmd31HKj46qcZobN+S9hUvjNtgfxAq8Ti/gA9hT5/p2R0XpQAAAABJRU5ErkJggg==',
                successImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAftJREFUOBGtlcsrRFEcx7/nuh55Rom8wtQYoiZmgbJnh6UFkoWFx0JkaWNDin8AOztmZ2tlY5Qk8lqpiaQ8QsPMPX6/c50xM3eKG3dz5vx+39/n3Ht+jxFI87SFQpln73e9sGSvAAKAqLBlMiyBEAwRbMgqDR4EAh+p4aRPfgr2dvogsSSl9CR7kndCiCsIzDx39mwnegy9mZfSINiitOTWTzCOYQ1rOYZjNSf+hl+wGe1wswpDLNGbznKMAvJn8mluIKlagvbz5wtOwHnk7vQ3n5kKSdzznXqzSxsNzqZb2Eh5NdoLixN56k6ZZXBpJHl+2AyWVWHV0wx/XqFTSSzDrjOnL52lq6gEKwQL3t9g/fbaIWEWpVsXre03hcCmrxULtT4Yds6Uoz4nF+teP05enzF+eYyIZTmAzIrXj/ZSJ+BDSkxW1mHZ06SQ+RkmNhr81CACw2eHeIw6GkSHw6QSDdPOqy0xgo1dHCFK62h5DTIJkkfAFrqzvpN9XL69aGmaVYZN1ZsJQFa9WjEFjcgYhsqqVeDU1TF2H+7TQL5NzDK50SnTA99m+9e7tDBBd/UUjeKFDli7cSYhNYZZ/1/YagTR1HCc5tZADGapLKsepAZ3y9D6r+Ggxli8bKY7uufYoUW/XTmGY7U+Pr60gSfPXwasA8jgv/wFfAL85t+sOQKQNAAAAABJRU5ErkJggg==',
                closeEle = void 0,
                timer = null;
            /* 为div设置样式 */
            parentDiv.className = 'comm_toast_body ' + opt.position;
            parentDiv.style.cssText = 'position: fixed;width: 350px;min-height:32px;height:auto;text-align: left;z-index: 9999;padding: 6px 8px;line-height: 20px;font-size: 14px;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;background:#fff;color:#333;-webkit-box-shadow: 0 1px 6px rgba(0,0,0,.2);-moz-box-shadow: 0 1px 6px rgba(0,0,0,.2);-mz-box-shadow: 0 1px 6px rgba(0,0,0,.2);box-shadow: 0 1px 6px rgba(0,0,0,.2);-webkit-transition(all .3s linear);-moz-transition(all .3s linear);-mz-transition(all .3s linear);transition(all .3s linear);';

            /* 如果页面上存在消息提示框，判断其位置 */
            if (toastEle.length) {
                for (var _i = 0, len = toastEle.length; _i < len; _i++) {
                    var curEle = toastEle[_i];
                    if (curEle.className.includes('top-') || curEle.className.includes('center-')) {
                        toastEleDirection.top = curEle.offsetTop + curEle.offsetHeight;
                    } else {
                        toastEleDirection.bottom = curEle.offsetTop;
                    }
                }
            }
            /* 根据传入的位置信息设置位置值 */
            if (String(opt.position).startsWith('top-')) {
                /* 10为两个提示框之间的上下间距，55为顶部导航栏的高度 */
                var topPOs = toastEleDirection.top && toastEleDirection.top <= screen.height - sHeight + 10 ? toastEleDirection.top + 10 : 55;
                parentDiv.style.cssText += 'top:' + topPOs + 'px;';
            } else if (String(opt.position).startsWith('bottom-')) {
                /* toastEleDirection.bottom实为元素的top位置，55为顶部导航栏的高度,10为两个提示框之间的上下距离 */
                var bottomPOs = toastEleDirection.bottom && toastEleDirection.bottom <= 55 ? toastEleDirection.bottom + 10 : 20;

                parentDiv.style.cssText += 'bottom:' + bottomPOs + 'px;';
            } else {
                var _topPOs = toastEleDirection.top && toastEleDirection.top <= screen.height - sHeight ? toastEleDirection.top + sHeight : '50%;margin-top: -' + sHeight / 2;
                parentDiv.style.cssText += 'top:' + _topPOs + 'px;';
            }
            if (String(opt.position).endsWith('left')) {
                parentDiv.style.cssText += 'left:25px;';
            } else if (String(opt.position).endsWith('right')) {
                parentDiv.style.cssText += 'right:25px;';
            } else {
                parentDiv.style.cssText += 'left:50%;margin-left: -175px;';
            }
            /* 判断页面上有没有正在显示的提示消息，若有，则在当前消息下方新增一条 */
            toastEle && (parentDiv.style.cssText = parentDiv.style.cssText.replace('/top.+px;/', 'top:' + (toastEle.offsetTop + 60) + 'px;'));

            childDiv.className = sClassName;

            childDiv.style.cssText = 'padding-left:20px;width:' + (opt.closable ? '310px;' : '338px;');
            /* 如果传入了关闭属性，创建关闭按钮 */
            if (opt.closable) {
                closeEle = document.createElement('span');
                closeEle.style.cssText += 'position:absolute;top:15px;right:8px;font-size:26px;color:#333;cursor:pointer;';
                closeEle.innerHTML = '×';
                parentDiv.appendChild(closeEle);
            }
            /* 创建图标元素 */
            var imgEle = document.createElement('img');
            imgEle.style.cssText = 'position:absolute;left:8px;display:block;width:14px;' + (sHeight === 34 ? 'top:8px;' : 'top:18px;');
            imgEle.src = priority === 'success' ? successImg : priority === 'danger' ? errorImg : warningImg;
            /*childDiv.style.cssText += priority === 'success' ?
            	'border: 1px solid #b1f0a3;color: #468847;background-color: #c7f0bf;' :
            	priority === 'danger' ? 'border: 1px solid #ebccd1;color: #b94a48;background-color: #f2dede;' :
            		'border: 1px solid #ff7d00;color: #b94a48;background-color: #ff7d00;';*/

            parentDiv.appendChild(imgEle);
            /* 设置显示内容 */
            childDiv.innerHTML = priority === 'success' ? sText || '操作成功！' : sText || '操作失败！';
            parentDiv.appendChild(childDiv);
            /* 将元素添加到body中去 */
            document.body.appendChild(parentDiv);
            /* 为关闭按钮绑定点击事件 */
            closeEle && (closeEle.onclick = function (evt) {
                var target = evt.target;
                var container = target.parentNode;
                container && container.parentNode.removeChild(container);
            });
            /* 移除提示消息框 */
            timer = setTimeout(function () {
                callback && callback();
                parentDiv.style.opacity = 0;
                document.body.removeChild(parentDiv);
                clearTimeout(timer);
                timer = null;
            }, nExistTime);
            /* 为提示框添加鼠标移入移出事件 */
            parentDiv.addEventListener('mouseover', function () {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
            });
            parentDiv.addEventListener('mouseout', function () {
                timer = setTimeout(function () {
                    callback && callback();
                    parentDiv.style.opacity = 0;
                    document.body.removeChild(parentDiv);
                    clearTimeout(timer);
                    timer = null;
                }, nExistTime);
            });
        }

        /**
         * 加载蒙层函数
         */

    }, {
        key: 'loadingOn',
        value: function loadingOn() {
            /* 创建加载框元素 */
            var body = document.body;
            var parentDiv = document.createElement("div");
            var childModal = document.createElement("div");
            var childBox = document.createElement("div");
            var image = document.createElement("img");
            /* 为加载狂元素添加class */
            parentDiv.className = 'loading-layer';
            parentDiv.style.cssText = 'position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;';
            //childModal.className = 'modal-cls';
            childModal.style.cssText = 'position: relative;width: 100%;height: 100%;background: rgba(255,255,255,.2);';
            //childBox.className = 'box-cls';
            childBox.style.cssText = 'position: absolute;top: 50%;left: 50%;margin-top: -32px;margin-left: -32px;width: 64px;height: 64px;';
            image.src = '../../../static/images/loading.gif';
            image.style.cssText = 'display: block;';
            /* 将元素依次append到对应父元素上 */
            childBox.appendChild(image);
            childModal.appendChild(childBox);
            parentDiv.appendChild(childModal);
            body.appendChild(parentDiv);
        }

        /**
         * 关闭蒙层函数
         */

    }, {
        key: 'loadingOff',
        value: function loadingOff() {
            var body = document.body;
            /* 移除蒙层元素 */
            var modalEle = document.querySelector('.loading-layer');
            modalEle && body.removeChild(modalEle);
        }
    }, {
        key: 'clearConsole',
        value: function clearConsole() {
            console.clear();
        }
    }]);
    return commonMethods;
}();

exports.default = commonMethods;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*********************************************************************
 * 所有的变量                                                         *
 * Modified by tr on  2018/01/22                                      *
 * Modified by ty on  2018/01/04                                      *
 *********************************************************************/

/*******************************start 所有数据变量 start*****************************/

//所有的后端服务的基础地址 start
//const BASE_SCHEDULE = 'http://192.168.1.163:20240/'; //日程
var BASE_SCHEDULE = '/schedule/'; //日程
// const BASE_ADDRESSBOOK = 'http://192.168.13.145:20200/addressList/';//通讯录
var BASE_ADDRESSBOOK = '/addressList/'; //通讯录
//const BASE_TY = 'http://192.168.13.113:10303/'; //老子自己的服务
//const BASE_NOTICE = 'http://192.168.1.163:20250/'; //公告
var BASE_NOTICE = '/announce/'; //公告
//所有的后端服务的基础地址 end

/*===========start 日程表变量 start==========*/
//日程列表变量
var FIND_BY_DATE = exports.FIND_BY_DATE = "FIND_BY_DATE";
//添加日程表变量
var SCHEDULE_ADD_DATE = exports.SCHEDULE_ADD_DATE = 'SCHEDULE_ADD_DATE';
//修改日程表变量
var SCHEDULE_UPDATE_DATE = exports.SCHEDULE_UPDATE_DATE = 'SCHEDULE_UPDATE_DATE';
//日程删除的数据变量
var SCHEDULE_DELETE_DATE = exports.SCHEDULE_DELETE_DATE = 'SCHEDULE_DELETE_DATE';
//获取日程中所有的日期变量
var SCHEDULE_ALL_DATE = exports.SCHEDULE_ALL_DATE = 'SCHEDULE_ALL_DATE';

/*===========end 日程表变量 end==========*/

/*============ start 公告变量 start ==========*/
//根据发布范围查询公告变量
var NOTICE_FIND_FLAG_DATA = exports.NOTICE_FIND_FLAG_DATA = 'NOTICE_FIND_FLAG_DATA';
//通过ID获取公告的详情编辑
var NOTICE_ID_FIND_DATA = exports.NOTICE_ID_FIND_DATA = 'NOTICE_ID_FIND_DATA';
//获取快速公告链接
var NOTICE_QUICK_LIST_DATA = exports.NOTICE_QUICK_LIST_DATA = 'NOTICE_QUICK_LIST_DATA';
//获取下一条公告
var NOTICE_NEXT_DATA = exports.NOTICE_NEXT_DATA = 'NOTICE_NEXT_DATA';
//根据条件查询数据变量
var NOTICE_FIND_DATA = exports.NOTICE_FIND_DATA = 'NOTICE_FIND_DATA';
//发布或撤销发布变量
var NOTICE_RELEASE_DATA = exports.NOTICE_RELEASE_DATA = 'NOTICE_RELEASE_DATA';
//批量删除和删除变量
var NOTICE_DELETE_DATA = exports.NOTICE_DELETE_DATA = 'NOTICE_DELETE_DATA';
//企业组织树变量
var NOTICE_TREE_DATA = exports.NOTICE_TREE_DATA = 'NOTICE_TREE_DATA';
var NOTICE_SAVE_DATA = exports.NOTICE_SAVE_DATA = 'NOTICE_SAVE_DATA';
var DELETE_FILE_DATA = exports.DELETE_FILE_DATA = 'DELETE_FILE_DATA';
/*============ end 公告变量 end ==========*/

/*===========start 通讯录 start==========*/
var ADDRESS_BOOK_DATA = exports.ADDRESS_BOOK_DATA = "ADDRESS_BOOK_DATA";
var ADDRESS_BOOK_DATA_FULLPAGE = exports.ADDRESS_BOOK_DATA_FULLPAGE = "ADDRESS_BOOK_DATA_FULLPAGE";
var ADDRESS_BOOK_PAGINATION_DATA_FULLPAGE = exports.ADDRESS_BOOK_PAGINATION_DATA_FULLPAGE = "ADDRESS_BOOK_PAGINATION_DATA_FULLPAGE";
var ENTERPRISE_ORGS_TREE_DATA_FULLPAGE = exports.ENTERPRISE_ORGS_TREE_DATA_FULLPAGE = "ENTERPRISE_ORGS_TREE_DATA_FULLPAGE";
/*===========end 通讯录 end==========*/

/*===========start 偽ログィン start==========*/
var MOCK_LOGIN = exports.MOCK_LOGIN = "MOCK_LOGIN";
var MOCK_LOGIN_ALL_DATA = exports.MOCK_LOGIN_ALL_DATA = "MOCK_LOGIN_ALL_DATA";
var MOCK_LOGIN_ACTIVE_APPS = exports.MOCK_LOGIN_ACTIVE_APPS = "MOCK_LOGIN_ACTIVE_APPS";
var MOCK_LOGIN_ACTIVE_APP = exports.MOCK_LOGIN_ACTIVE_APP = "MOCK_LOGIN_ACTIVE_APP";
var MOCK_LOGIN_ACTIVE_APP_IN_EDITPAGE = exports.MOCK_LOGIN_ACTIVE_APP_IN_EDITPAGE = "MOCK_LOGIN_ACTIVE_APP_IN_EDITPAGE";
var MOCK_LOGIN_ACTIVED_APPS_IN_FULLPAGE = exports.MOCK_LOGIN_ACTIVED_APPS_IN_FULLPAGE = "MOCK_LOGIN_ACTIVED_APPS_IN_FULLPAGE";
/*===========end 偽ログィン end==========*/
/*******************************end 所有数据变量 end*****************************/

/*******************************start 所有数据请求URL start*****************************/
/*============start 日程表请求 start==========*/
//根据传入的日期来查询日程信息
var FIND_BY = exports.FIND_BY = BASE_SCHEDULE + 'schedule/date/{date}';
//添加日程表  请求方式“post”新增；“put”修改；“get”获取所有的日期
var SCHEDULE_ADD = exports.SCHEDULE_ADD = BASE_SCHEDULE + 'schedule';
//日程表删除 请求方式“delete”
var SCHEDULE_DELETE = exports.SCHEDULE_DELETE = BASE_SCHEDULE + 'schedule/{id}';
/*============ end 日程表请求 end ==========*/

/*============ start 公告请求 start ==========*/
//根据发布范围查询公告列表 flag:1 为公司，2 为单位
var NOTICE_FIND_FLAG = exports.NOTICE_FIND_FLAG = BASE_NOTICE + 'home/pageQuery/{flag}';
//通过ID获取公告的详情
var NOTICE_ID_FIND = exports.NOTICE_ID_FIND = BASE_NOTICE + 'manager/{announId}';
//获取快速公告链接
var NOTICE_QUICK_LIST = exports.NOTICE_QUICK_LIST = BASE_NOTICE + 'home/quickList/{releaseScode}';
//查看下一条公告
var NOTICE_NEXT = exports.NOTICE_NEXT = BASE_NOTICE + 'home/nextAnnounce/{releaseScode}/{id}';
//根据条件查询数据
var NOTICE_FIND = exports.NOTICE_FIND = BASE_NOTICE + 'manager/pageQuery';
//根据输入的值来查询数据
var NOTICE_FIND_KEYWORD = exports.NOTICE_FIND_KEYWORD = BASE_NOTICE + 'manager/pageQuery/{keyword}';
//快速发布和撤销发布
var NOTICE_RELEASE = exports.NOTICE_RELEASE = BASE_NOTICE + 'manager/{announId}/{flag}';
//批量删除和删除单个
var NOTICE_DELETE = exports.NOTICE_DELETE = BASE_NOTICE + 'manager/announId';
//获取企业组织树
var NOTICE_TREE = exports.NOTICE_TREE = BASE_NOTICE + 'home/enterprise/orgs/tree/{flag}';
// export const NOTICE_TREE = "enterprise/orgsTree.json";
//保存公告
var NOTICE_SAVE = exports.NOTICE_SAVE = BASE_NOTICE + 'manager/saveAnnoun';
var NOTICE_UPLOAD = exports.NOTICE_UPLOAD = '/zuul' + BASE_NOTICE + 'annex/annex';
var DELETE_UPLOADED_FILE = exports.DELETE_UPLOADED_FILE = BASE_NOTICE + 'annex/{annexUUID}';
//下载附件
var NOTION_DOWNLOAD = exports.NOTION_DOWNLOAD = BASE_NOTICE + 'annex/{annexUUID}';
/*============ end 公告请求 end ==========*/

/*============end 公告请求 end==========*/

/*============ 通讯录：首页模块和全屏页面的 start ==========*/
/* 获取通讯录数据 */
// export const ADDRESS_BOOK = `enterprise/accounts.json`; //todo local dev url
var ADDRESS_BOOK = exports.ADDRESS_BOOK = BASE_ADDRESSBOOK + 'enterprise/accounts'; //TODO online url
/* 获取企业组织树的数据 */
// export const ENTERPRISE_ORGS_TREE = 'enterprise/orgsTree.json'; ///todo local dev url
var ENTERPRISE_ORGS_TREE = exports.ENTERPRISE_ORGS_TREE = BASE_ADDRESSBOOK + 'enterprise/orgs/tree'; //TODO online url

// export const ADDRESSBOOK_FULLPAGE_DOWNLOAD = `http://10.176.156.95:10200${BASE_ADDRESSBOOK}excel/export`;
var ADDRESSBOOK_FULLPAGE_DOWNLOAD = exports.ADDRESSBOOK_FULLPAGE_DOWNLOAD = BASE_ADDRESSBOOK + 'excel/export';
/*============ 通讯录：首页模块和全屏页面的 end ==========*/

// export const MOCKLOGIN_SYSTEMS = `otherApps/status1.active.json`; //todo local dev url
var MOCKLOGIN_SYSTEMS = exports.MOCKLOGIN_SYSTEMS = '/portal/otherApps?status=1'; //TODO online url

// export const MOCKLOGIN_ALL_SYSTEMS = `otherApps/status0.all.json`; //todo local dev url
var MOCKLOGIN_ALL_SYSTEMS = exports.MOCKLOGIN_ALL_SYSTEMS = '/portal/otherApps?status=0'; //TODO online url

var ACTIVE_APPS = exports.ACTIVE_APPS = '/portal/otherApps';
var ACTIVE_APP = exports.ACTIVE_APP = '/portal/otherApp';
/*******************************end 所有数据请求 end*****************************/
/**
 * 定义方法
 * {{getUrl：Function 获取url方法}}
 * getUrl：(urlObj:{url: 'string',params:'string'})
 */
var getUrl = exports.getUrl = function getUrl(urlObj) {
    var url = urlObj.url;
    var reg = /\{.*?\}/g;

    // const urlStart = url.endsWith('.json') ? "../mokeData/" : 'http://192.168.1.115:20600/';//谢富强
    var urlStart = url.endsWith('.json') ? "../mokeData/" : '';
    /* 匹配请求路径中的参数 */
    var urlParams = url.match(reg);
    /* 匹配字符串，判断字符串是否包含{}字样 */
    if (urlParams) {
        var paramsArray = urlObj.params.split(',');
        /* 遍历匹配数组 */
        urlParams.map(function (it, i) {
            url = url.replace(it, paramsArray[i]);
        });
    }
    var newUrl = urlStart + url;
    // if (url !== 'login') {
    //     let access_token = JSON.parse(sessionStorage.getItem('access_token'));
    //     newUrl = urlStart + url;
    //     newUrl += (newUrl.indexOf('?') > -1) ? ('&' + access_token) : ('?' + access_token);
    // }
    return newUrl;
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendRequest = undefined;

var _stringify = __webpack_require__(91);

var _stringify2 = _interopRequireDefault(_stringify);

var _commonMethods = __webpack_require__(67);

var _commonMethods2 = _interopRequireDefault(_commonMethods);

var _axios = __webpack_require__(512);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 发送请求函数
 * @param obj 请求参数
 * eg:sendRequest({method: 'post',url: '',data: {},success:function(result){},error:function(result){})
 */
/*********************************************************************
 * Created by tr on 2017/11/14.                                       *
 *********************************************************************/
var sendRequest = exports.sendRequest = function sendRequest(obj) {
    /* 定义请求数据参数 */
    var reqData = {};
    obj.method = obj.method || 'get';
    var methods = obj.method.toLowerCase();
    /* 设置post和patch的请求头 */
    if (methods === 'post' || methods === 'patch' || methods === 'put' || methods === 'delete') {
        reqData.data = obj.data;
        reqData.headers = { 'Content-Type': obj.contentType || 'application/json;charset=utf-8' };

        reqData.transformRequest = [function (result) {
            if (obj.contentType && obj.contentType.indexOf('application/x-www-form-urlencoded') > -1) {
                var ret = '';
                for (var it in result) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(result[it]) + '&';
                }
                return ret;
            } else {
                return (0, _stringify2.default)(result);
            }
        }];
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
    (0, _axios2.default)(reqData).then(function (resData) {
        /* 移除loading遮罩 */
        // new commonMethods().loadingOff();
        var newData = resData.data;
        if (newData && newData.meta) {
            if (newData.meta.code === 1) {
                obj.success && typeof obj.success === 'function' && obj.success(newData);
                // !newData.data || (newData.data && !(newData.data instanceof Array && newData.data.length)) ?
                //     new commonMethods().showToastMsg({text: newData.meta.message, priority: 'success'}) : "";
            } else {
                    // new commonMethods().showToastMsg({text: newData.meta.message, priority: 'success'});
                }
        } else {
            obj.success && typeof obj.success === 'function' && obj.success(newData);
        }
    }).catch(function (e) {
        /* 移除loading遮罩 */
        //  new commonMethods().loadingOff();
        if (e.response) {
            var result = e.response.data;
            /* 提示错误消息 */
            new _commonMethods2.default().showToastMsg({ text: e.response.data.meta ? e.response.data.meta.message : '', priority: 'error' });
            obj.success && typeof obj.success === 'function' && obj.success(result);
        } else {
            /*todo 判断接口是否有问题*/
            // obj.error({code:303});
            new _commonMethods2.default().showToastMsg();
        }
    });
    /* 如果一直在pending，3秒后取消遮罩 */
    setTimeout(function () {
        /* 移除loading遮罩 */
        new _commonMethods2.default().loadingOff();
    }, 3000);
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(41);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(24);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(15);
var redefine = __webpack_require__(16);
var fails = __webpack_require__(3);
var defined = __webpack_require__(28);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(13);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(16);
var redefineAll = __webpack_require__(47);
var meta = __webpack_require__(34);
var forOf = __webpack_require__(46);
var anInstance = __webpack_require__(45);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(75);
var setToStringTag = __webpack_require__(51);
var inheritIfRequired = __webpack_require__(105);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(15);
var uid = __webpack_require__(38);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(39) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(13);
var ctx = __webpack_require__(23);
var forOf = __webpack_require__(46);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 84 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(36);
var core = __webpack_require__(55);
var ctx = __webpack_require__(437);
var hide = __webpack_require__(56);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(65);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(187);
var enumBugKeys = __webpack_require__(133);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 89 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(446), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(184);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(479);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = Object({"NODE_ENV":"production"}).DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)))

/***/ }),
/* 95 */
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),
/* 96 */
/***/ (function(module, exports) {


module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(495);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = Object({"NODE_ENV":"production"}).DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)))

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(26);
var LIBRARY = __webpack_require__(39);
var wksExt = __webpack_require__(146);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(70)('keys');
var uid = __webpack_require__(38);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(23)(Function.call, __webpack_require__(20).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(103).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(28);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 107 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(39);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(16);
var hide = __webpack_require__(15);
var has = __webpack_require__(14);
var Iterators = __webpack_require__(53);
var $iterCreate = __webpack_require__(111);
var setToStringTag = __webpack_require__(51);
var getPrototypeOf = __webpack_require__(21);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(42);
var descriptor = __webpack_require__(37);
var setToStringTag = __webpack_require__(51);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(74);
var defined = __webpack_require__(28);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(53);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(37);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(63);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(53);
module.exports = __webpack_require__(26).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(307);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(41);
var toLength = __webpack_require__(9);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(35);
var step = __webpack_require__(162);
var Iterators = __webpack_require__(53);
var toIObject = __webpack_require__(19);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(110)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(23);
var invoke = __webpack_require__(152);
var html = __webpack_require__(102);
var cel = __webpack_require__(98);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(24)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(120).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(24)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(13);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(7);
var LIBRARY = __webpack_require__(39);
var $typed = __webpack_require__(80);
var hide = __webpack_require__(15);
var redefineAll = __webpack_require__(47);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(45);
var toInteger = __webpack_require__(29);
var toLength = __webpack_require__(9);
var toIndex = __webpack_require__(171);
var gOPN = __webpack_require__(43).f;
var dP = __webpack_require__(8).f;
var arrayFill = __webpack_require__(118);
var setToStringTag = __webpack_require__(51);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 125 */,
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (false) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (false) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (false) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (false) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (false) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    false
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (false) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (false) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (false) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (false) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (false) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (false) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (false) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(65);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(440), __esModule: true };

/***/ }),
/* 129 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 130 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(132)('keys');
var uid = __webpack_require__(89);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(36);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 133 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 134 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(48).f;
var has = __webpack_require__(50);
var TAG = __webpack_require__(58)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(58);


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(36);
var core = __webpack_require__(55);
var LIBRARY = __webpack_require__(135);
var wksExt = __webpack_require__(138);
var defineProperty = __webpack_require__(48).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 140 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(480)('socket.io-parser');
var Emitter = __webpack_require__(59);
var hasBin = __webpack_require__(198);
var binary = __webpack_require__(483);
var isArray = __webpack_require__(199);
var isBuf = __webpack_require__(200);

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  if ((obj.type === exports.EVENT || obj.type === exports.ACK) && hasBin(obj.data)) {
    obj.type = obj.type === exports.EVENT ? exports.BINARY_EVENT : exports.BINARY_ACK;
  }

  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  }
  else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    str += JSON.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch(e){
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module

var hasCORS = __webpack_require__(486);

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) { }
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var parser = __webpack_require__(60);
var Emitter = __webpack_require__(59);

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(22);
var normalizeHeaderName = __webpack_require__(516);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(210);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(210);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)))

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(98)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(19);
var arrayIndexOf = __webpack_require__(71)(false);
var IE_PROTO = __webpack_require__(100)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(40);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(19);
var gOPN = __webpack_require__(43).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(40);
var gOPS = __webpack_require__(72);
var pIE = __webpack_require__(62);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(61);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(13);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(152);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 152 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(52).trim;
var ws = __webpack_require__(104);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(52).trim;

module.exports = 1 / $parseFloat(__webpack_require__(104) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(24);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 157 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(107);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(13);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(61);
var toLength = __webpack_require__(9);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(41);
var toLength = __webpack_require__(9);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(7) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(76)
});


/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(122);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(167);
var validate = __webpack_require__(54);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(79)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(8).f;
var create = __webpack_require__(42);
var redefineAll = __webpack_require__(47);
var ctx = __webpack_require__(23);
var anInstance = __webpack_require__(45);
var forOf = __webpack_require__(46);
var $iterDefine = __webpack_require__(110);
var step = __webpack_require__(162);
var setSpecies = __webpack_require__(44);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(34).fastKey;
var validate = __webpack_require__(54);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(167);
var validate = __webpack_require__(54);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(79)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(31)(0);
var redefine = __webpack_require__(16);
var meta = __webpack_require__(34);
var assign = __webpack_require__(150);
var weak = __webpack_require__(170);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(54);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(79)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(47);
var getWeak = __webpack_require__(34).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(45);
var forOf = __webpack_require__(46);
var createArrayMethod = __webpack_require__(31);
var $has = __webpack_require__(14);
var validate = __webpack_require__(54);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(29);
var toLength = __webpack_require__(9);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(43);
var gOPS = __webpack_require__(72);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(73);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(9);
var ctx = __webpack_require__(23);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(9);
var repeat = __webpack_require__(106);
var defined = __webpack_require__(28);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(40);
var toIObject = __webpack_require__(19);
var isEnum = __webpack_require__(62).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(63);
var from = __webpack_require__(177);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(46);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 178 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 179 */,
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Login = __webpack_require__(421);

var _Login2 = _interopRequireDefault(_Login);

var _LoadingTpl = __webpack_require__(427);

var _LoadingTpl2 = _interopRequireDefault(_LoadingTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    components: {
        Login: _Login2.default,
        Loading: _LoadingTpl2.default
    }
};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(126);

exports.default = {
    /**
     * @returns {{
     * password: string 登录密码,
     * userName: string 用户名,
     * isShow: boolean 是否显示提示信息,
     * loginDataValue: string 提示的信息
     * }}
     */
    data: function data() {
        return {
            password: '123456',
            userName: 'admin',
            isShow: false,
            loginDataValue: ''
        };
    },

    computed: (0, _vuex.mapGetters)({
        /*登录后的数据*/
        loginData: "loginData"
    }),
    watch: {
        /**
         * 监听登录后返回的数据
         * @param val 返回的数据信息
         */
        loginData: function loginData(val) {
            var that = this;

            that.loginDataValue = val.msg;
            that.isShow = true;
            /*2s后信息自动隐藏*/
            if (val) {
                setTimeout(function () {
                    that.loginDataValue = "";
                    that.isShow = false;
                }, 2000);
            }
        }
    },
    methods: {
        /**
         * 登录操作
         */
        loginEle: function loginEle() {
            var that = this;
            //                that.$store.dispatch('loadingShow');
            var password = that.password,
                username = that.userName;
            if (password && username) {
                var reqData = {
                    password: password,
                    username: username
                };
                that.$store.dispatch('login', { reqData: reqData });
            }
        }
    },

    created: function created() {
        console.log('login.vue created');
        debugger;
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(126);

exports.default = {
    computed: (0, _vuex.mapGetters)({
        /*是否打开加载中页面*/
        loadingVisible: "loadingVisible"
    })
}; //
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//

exports.default = {
    data: function data() {
        return {};
    },
    mounted: function mounted() {
        console.log('app.vue');
    },
    beforeDestroy: function beforeDestroy() {},

    methods: {}
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(435), __esModule: true };

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(49) && !__webpack_require__(66)(function () {
  return Object.defineProperty(__webpack_require__(186)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(65);
var document = __webpack_require__(36).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(50);
var toIObject = __webpack_require__(57);
var arrayIndexOf = __webpack_require__(443)(false);
var IE_PROTO = __webpack_require__(131)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(189);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 189 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(129);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(92);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(93);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*********************************************************************
 * Created by tr on 2017/8/11.                                       *
 *********************************************************************/
var common = function () {
    function common() {
        (0, _classCallCheck3.default)(this, common);
    }

    (0, _createClass3.default)(common, [{
        key: "recursion",
        value: function recursion(data, obj) {
            var _this = this;

            if (data) {
                var newData = [];
                if (data.length) {
                    data.map(function (da) {
                        var newDa = da;
                        newDa.isSelect = false;
                        if (obj) {
                            /*判断是不是选中的数据*/
                            if (da.customizationId && da.customizationId === obj.customizationId || da.oauthClientId && da.oauthClientId === obj.oauthClientId && da.resCode === obj.resCode) {
                                newDa.isSelect = true;
                            }
                        } else {
                            newDa.checked = false;
                            if (da.appName) {
                                newDa.checked = true;
                            }
                        }
                        newData.push(newDa);
                        if (da.children && da.children.length) {
                            return _this.recursion(da.children, obj);
                        }
                    });
                }
                return newData;
            } else {
                return data;
            }
        }
    }]);
    return common;
}();

exports.default = common;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*********************************************************************
 * 常用的变量封装                                                    *
 * Created by tr on 2017/8/23.                                       *
 *********************************************************************/

/*图标的随机图形*/
var ICON_ARRAY = exports.ICON_ARRAY = ['icon-baorongxingwangguan', 'icon-chongzhang', 'icon-fabu', 'icon-neirongchaxun', 'icon-saomiaoneirong', 'icon-shijianwangguan', 'icon-shujuchaxun', 'icon-shujuxiangying', 'icon-shujuxinxi', 'icon-shuipingduiqi', 'icon-wenjianbianji', 'icon-xiangqingye', 'icon-xinzengyemian', 'icon-yemianxiangqing', 'icon-niantie', 'icon-gongnengditu', 'icon-zhongzhi', 'icon-zhuanhuaweimoxing'];

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(135);
var $export = __webpack_require__(85);
var redefine = __webpack_require__(194);
var hide = __webpack_require__(56);
var has = __webpack_require__(50);
var Iterators = __webpack_require__(136);
var $iterCreate = __webpack_require__(454);
var setToStringTag = __webpack_require__(137);
var getPrototypeOf = __webpack_require__(457);
var ITERATOR = __webpack_require__(58)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(56);


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(86);
var dPs = __webpack_require__(455);
var enumBugKeys = __webpack_require__(133);
var IE_PROTO = __webpack_require__(131)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(186)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(456).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(187);
var hiddenKeys = __webpack_require__(133).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 197 */
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__(482);

var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof global.Buffer === 'function' && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
     (typeof global.ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
     (withNativeBlob && obj instanceof Blob) ||
     (withNativeFile && obj instanceof File)
    ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 199 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
         (global.ArrayBuffer && (obj instanceof ArrayBuffer || ArrayBuffer.isView(obj)));
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var eio = __webpack_require__(484);
var Socket = __webpack_require__(206);
var Emitter = __webpack_require__(59);
var parser = __webpack_require__(141);
var on = __webpack_require__(207);
var bind = __webpack_require__(208);
var debug = __webpack_require__(94)('socket.io-client:manager');
var indexOf = __webpack_require__(205);
var Backoff = __webpack_require__(500);

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager (uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' === typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting () {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies
 */

var XMLHttpRequest = __webpack_require__(142);
var XHR = __webpack_require__(487);
var JSONP = __webpack_require__(496);
var websocket = __webpack_require__(497);

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling (opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__(143);
var parseqs = __webpack_require__(95);
var parser = __webpack_require__(60);
var inherit = __webpack_require__(96);
var yeast = __webpack_require__(204);
var debug = __webpack_require__(97)('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function () {
  var XMLHttpRequest = __webpack_require__(142);
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause () {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function (packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close () {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function () {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
     ('http' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),
/* 205 */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__(141);
var Emitter = __webpack_require__(59);
var toArray = __webpack_require__(499);
var on = __webpack_require__(207);
var bind = __webpack_require__(208);
var debug = __webpack_require__(94)('socket.io-client:socket');
var parseqs = __webpack_require__(95);

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket (io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = { type: parser.EVENT, data: args };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  delete this.flags;

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({type: parser.CONNECT, query: query});
    } else {
      this.packet({type: parser.CONNECT});
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  if (packet.nsp !== this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags = this.flags || {};
  this.flags.compress = compress;
  return this;
};


/***/ }),
/* 207 */
/***/ (function(module, exports) {


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on (obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}


/***/ }),
/* 208 */
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);
var settle = __webpack_require__(517);
var buildURL = __webpack_require__(519);
var parseHeaders = __webpack_require__(520);
var isURLSameOrigin = __webpack_require__(521);
var createError = __webpack_require__(211);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(522);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(523);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(518);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by ty on 18/1/31.
 */


__webpack_require__(215);

var _vue = __webpack_require__(125);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(179);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _router = __webpack_require__(419);

var _router2 = _interopRequireDefault(_router);

var _app = __webpack_require__(431);

var _app2 = _interopRequireDefault(_app);

var _vuex = __webpack_require__(433);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

// 路由配置


/* 加载vue状态管理器 */


/* 引入Vue相关 */
var RouterConfig = {
    routes: _router2.default
};

var router = new _vueRouter2.default(RouterConfig);

new _vue2.default({
    el: '#app',
    router: router,
    store: _vuex2.default,
    render: function render(h) {
        return h(_app2.default);
    }
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(216);

__webpack_require__(413);

__webpack_require__(414);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(217);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(119);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(163);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(166);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(354);
__webpack_require__(355);
__webpack_require__(356);
__webpack_require__(357);
__webpack_require__(358);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(364);
__webpack_require__(365);
__webpack_require__(366);
__webpack_require__(367);
__webpack_require__(368);
__webpack_require__(369);
__webpack_require__(370);
__webpack_require__(371);
__webpack_require__(372);
__webpack_require__(373);
__webpack_require__(374);
__webpack_require__(375);
__webpack_require__(376);
__webpack_require__(377);
__webpack_require__(378);
__webpack_require__(379);
__webpack_require__(380);
__webpack_require__(381);
__webpack_require__(382);
__webpack_require__(383);
__webpack_require__(384);
__webpack_require__(385);
__webpack_require__(386);
__webpack_require__(387);
__webpack_require__(388);
__webpack_require__(389);
__webpack_require__(390);
__webpack_require__(391);
__webpack_require__(392);
__webpack_require__(393);
__webpack_require__(394);
__webpack_require__(395);
__webpack_require__(396);
__webpack_require__(397);
__webpack_require__(398);
__webpack_require__(399);
__webpack_require__(400);
__webpack_require__(401);
__webpack_require__(402);
__webpack_require__(403);
__webpack_require__(404);
__webpack_require__(405);
__webpack_require__(406);
__webpack_require__(407);
__webpack_require__(408);
__webpack_require__(409);
__webpack_require__(410);
__webpack_require__(411);
__webpack_require__(412);
module.exports = __webpack_require__(26);


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(14);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(16);
var META = __webpack_require__(34).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(70);
var setToStringTag = __webpack_require__(51);
var uid = __webpack_require__(38);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(146);
var wksDefine = __webpack_require__(99);
var enumKeys = __webpack_require__(218);
var isArray = __webpack_require__(73);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(19);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(37);
var _create = __webpack_require__(42);
var gOPNExt = __webpack_require__(149);
var $GOPD = __webpack_require__(20);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(40);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(43).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(62).f = $propertyIsEnumerable;
  __webpack_require__(72).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(39)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(40);
var gOPS = __webpack_require__(72);
var pIE = __webpack_require__(62);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(42) });


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperties: __webpack_require__(148) });


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(19);
var $getOwnPropertyDescriptor = __webpack_require__(20).f;

__webpack_require__(30)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(11);
var $getPrototypeOf = __webpack_require__(21);

__webpack_require__(30)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11);
var $keys = __webpack_require__(40);

__webpack_require__(30)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(30)('getOwnPropertyNames', function () {
  return __webpack_require__(149).f;
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(34).onFreeze;

__webpack_require__(30)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(34).onFreeze;

__webpack_require__(30)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(34).onFreeze;

__webpack_require__(30)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(30)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(30)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(30)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(150) });


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(234) });


/***/ }),
/* 234 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(103).set });


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(63);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(16)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(151) });


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(21);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(8).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(153);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(154);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(14);
var cof = __webpack_require__(24);
var inheritIfRequired = __webpack_require__(105);
var toPrimitive = __webpack_require__(27);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(43).f;
var gOPD = __webpack_require__(20).f;
var dP = __webpack_require__(8).f;
var $trim = __webpack_require__(52).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(42)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(16)(global, NUMBER, $Number);
}


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(29);
var aNumberValue = __webpack_require__(155);
var repeat = __webpack_require__(106);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(155);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(156) });


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(156);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(154);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(153);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(157);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(107);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(108);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(158) });


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(157) });


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(107) });


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(108);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(108);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(41);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(9);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(52)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(109)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(110)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(109)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(9);
var context = __webpack_require__(112);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(113)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(112);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(113)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(106)
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(9);
var context = __webpack_require__(112);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(113)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(17)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(17)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(17)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(17)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(17)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(17)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(17)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(17)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(17)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(17)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(17)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(17)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(17)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(27);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(296);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(16)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(15)(proto, TO_PRIMITIVE, __webpack_require__(299));


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(27);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(73) });


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(23);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var call = __webpack_require__(159);
var isArrayIter = __webpack_require__(114);
var toLength = __webpack_require__(9);
var createProperty = __webpack_require__(115);
var getIterFn = __webpack_require__(116);

$export($export.S + $export.F * !__webpack_require__(75)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(115);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(19);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(61) != Object || !__webpack_require__(25)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(102);
var cof = __webpack_require__(24);
var toAbsoluteIndex = __webpack_require__(41);
var toLength = __webpack_require__(9);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(13);
var toObject = __webpack_require__(11);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(25)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(31)(0);
var STRICT = __webpack_require__(25)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(73);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(31)(1);

$export($export.P + $export.F * !__webpack_require__(25)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(31)(2);

$export($export.P + $export.F * !__webpack_require__(25)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(31)(3);

$export($export.P + $export.F * !__webpack_require__(25)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(31)(4);

$export($export.P + $export.F * !__webpack_require__(25)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(160);

$export($export.P + $export.F * !__webpack_require__(25)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(160);

$export($export.P + $export.F * !__webpack_require__(25)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(71)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(19);
var toInteger = __webpack_require__(29);
var toLength = __webpack_require__(9);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(161) });

__webpack_require__(35)('copyWithin');


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(118) });

__webpack_require__(35)('fill');


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(31)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(35)(KEY);


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(31)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(35)(KEY);


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44)('Array');


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(105);
var dP = __webpack_require__(8).f;
var gOPN = __webpack_require__(43).f;
var isRegExp = __webpack_require__(74);
var $flags = __webpack_require__(76);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(16)(global, 'RegExp', $RegExp);
}

__webpack_require__(44)('RegExp');


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(163);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(76);
var DESCRIPTORS = __webpack_require__(7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(16)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(77)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(77)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(77)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(77)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(74);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(39);
var global = __webpack_require__(2);
var ctx = __webpack_require__(23);
var classof = __webpack_require__(63);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(13);
var anInstance = __webpack_require__(45);
var forOf = __webpack_require__(46);
var speciesConstructor = __webpack_require__(78);
var task = __webpack_require__(120).set;
var microtask = __webpack_require__(121)();
var newPromiseCapabilityModule = __webpack_require__(122);
var perform = __webpack_require__(164);
var promiseResolve = __webpack_require__(165);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(47)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(51)($Promise, PROMISE);
__webpack_require__(44)(PROMISE);
Wrapper = __webpack_require__(26)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(75)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(170);
var validate = __webpack_require__(54);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(79)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(80);
var buffer = __webpack_require__(123);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(41);
var toLength = __webpack_require__(9);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(78);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(44)(ARRAY_BUFFER);


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(80).ABV, {
  DataView: __webpack_require__(123).DataView
});


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(13);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(42);
var aFunction = __webpack_require__(13);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(151);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(8);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(27);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(20).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(111)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(20);
var getPrototypeOf = __webpack_require__(21);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(20);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(21);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(172) });


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(8);
var gOPD = __webpack_require__(20);
var getPrototypeOf = __webpack_require__(21);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(37);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(103);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(71)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(35)('includes');


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(173);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(9);
var aFunction = __webpack_require__(13);
var arraySpeciesCreate = __webpack_require__(117);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(35)('flatMap');


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(173);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(9);
var toInteger = __webpack_require__(29);
var arraySpeciesCreate = __webpack_require__(117);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(35)('flatten');


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(109)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(174);
var userAgent = __webpack_require__(124);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(174);
var userAgent = __webpack_require__(124);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(52)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(52)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(28);
var toLength = __webpack_require__(9);
var isRegExp = __webpack_require__(74);
var getFlags = __webpack_require__(76);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(111)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(99)('asyncIterator');


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(99)('observable');


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(172);
var toIObject = __webpack_require__(19);
var gOPD = __webpack_require__(20);
var createProperty = __webpack_require__(115);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(175)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(175)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(13);
var $defineProperty = __webpack_require__(8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(7) && $export($export.P + __webpack_require__(81), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(13);
var $defineProperty = __webpack_require__(8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(7) && $export($export.P + __webpack_require__(81), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(21);
var getOwnPropertyDescriptor = __webpack_require__(20).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(81), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(21);
var getOwnPropertyDescriptor = __webpack_require__(20).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(81), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(176)('Map') });


/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(176)('Set') });


/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(82)('Map');


/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(82)('Set');


/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(82)('WeakMap');


/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(82)('WeakSet');


/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(83)('Map');


/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(83)('Set');


/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(83)('WeakMap');


/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(83)('WeakSet');


/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(24);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(178);
var fround = __webpack_require__(158);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 389 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 390 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(178) });


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(26);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(78);
var promiseResolve = __webpack_require__(165);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(122);
var perform = __webpack_require__(164);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(21);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(168);
var from = __webpack_require__(177);
var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(21);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(21);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(13);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(121)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(24)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(26);
var microtask = __webpack_require__(121)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(13);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(45);
var redefineAll = __webpack_require__(47);
var hide = __webpack_require__(15);
var forOf = __webpack_require__(46);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(44)('Observable');


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(124);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(120);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(119);
var getKeys = __webpack_require__(40);
var redefine = __webpack_require__(16);
var global = __webpack_require__(2);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(53);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(415);
module.exports = __webpack_require__(26).RegExp.escape;


/***/ }),
/* 415 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(416)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 416 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 417 */,
/* 418 */,
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _login = __webpack_require__(420);

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routers = [{
    path: '/',
    meta: {
        title: ''
    },
    component: _login2.default
}]; // import basicDemoAndApi from './views/pages/basicDemoAndApi.vue'
// import reloadTreeData from './views/pages/reloadTreeData.vue'


exports.default = routers;

/***/ }),
/* 420 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dd7a443a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(430);
var disposed = false
var normalizeComponent = __webpack_require__(84)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_dd7a443a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/login/login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dd7a443a", Component.options)
  } else {
    hotAPI.reload("data-v-dd7a443a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 421 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_175b1f70_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__ = __webpack_require__(422);
var disposed = false
var normalizeComponent = __webpack_require__(84)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_175b1f70_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/basic/Login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-175b1f70", Component.options)
  } else {
    hotAPI.reload("data-v-175b1f70", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 422 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "Login", attrs: { id: "Login" } }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "login-wrapper" }, [
      _vm._m(1),
      _vm._v(" "),
      _c(
        "form",
        [
          _c("div", { staticClass: "control-group" }, [
            _vm._m(2),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.userName,
                  expression: "userName"
                }
              ],
              staticClass: "form-control",
              attrs: {
                type: "text",
                placeholder: "请输入用户名",
                required: "true"
              },
              domProps: { value: _vm.userName },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.userName = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "control-group" }, [
            _vm._m(3),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password,
                  expression: "password"
                }
              ],
              staticClass: "form-control",
              attrs: {
                type: "password",
                placeholder: "密 码",
                required: "true"
              },
              domProps: { value: _vm.password },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.password = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _vm._m(4),
          _vm._v(" "),
          _c("div", { staticClass: "msg-group", class: { show: _vm.isShow } }, [
            _c("p", { attrs: { id: "msgTxt" } }, [
              _vm._v(_vm._s(_vm.loginDataValue))
            ])
          ]),
          _vm._v(" "),
          !_vm.isShow
            ? [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    attrs: { type: "submit" },
                    on: { click: _vm.loginEle }
                  },
                  [_c("span", { staticClass: "text" }, [_vm._v("登录")])]
                )
              ]
            : [_vm._m(5)]
        ],
        2
      )
    ]),
    _vm._v(" "),
    _vm._m(6)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "logo-box" }, [
      _c("img", {
        staticStyle: { visibility: "hidden" },
        attrs: { src: "", alt: "logo" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "header" }, [
      _c("h3", [_vm._v("统一业务平台")]),
      _vm._v(" "),
      _c("h4", [_vm._v("UNIFIED SERVICE PLATFORM")]),
      _vm._v(" "),
      _c("img", {
        attrs: { src: __webpack_require__(423), alt: "avatar" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("img", {
        attrs: { src: __webpack_require__(424), alt: "account" }
      }),
      _c("span", [_vm._v("账号")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _c("img", {
        attrs: { src: __webpack_require__(425), alt: "account" }
      }),
      _c("span", [_vm._v("密码")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "checkbox",
        staticStyle: { "text-align": "left", color: "#ccc", width: "85%" }
      },
      [
        _c("input", { staticClass: "checkbox", attrs: { type: "checkbox" } }),
        _vm._v(" 记住我\n            ")
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "btn btn-primary", attrs: { type: "submit" } },
      [
        _c("img", {
          attrs: { src: __webpack_require__(426), width: "20" }
        })
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "footer-software-dept" }, [
      _c("div", { staticClass: "img" })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-175b1f70", esExports)
  }
}

/***/ }),
/* 423 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAACjJJREFUeJztnXts3lUZxz+dk7EAu2CnSGZTYGPTdoDI7HRuFtQA8o+XBLwUjdmYiSwYUNTEMEH+4g9RJCXRriKhahZwQIL3hGxjkylD7eouZd1GRsdkG2OXjptr5x/PeeXdu7ft79xP+55P8v6x9ZzzPOd82997fuec5zmQyWQymUwmk8lkMplMJpPJjAXqiha86o5un364YAZwCdAEXAg0AucB9cC5wDuBs1XZAeC/wCHgIPAf4AVgF7AF2AwcCOa5AU/dfWmhchM9++GTWcDVwEL1adCoWxJ6OnDRMGX2ABvU509An5mbcRlrAs8F2oAbEIF90qA+X1T/7gNWAV3Ads+2nTEhtgMFOBdYDmwEtgHfx7+41ZilbG9TvixXviVNygLPAX4G7AXuB1riunMKLYhPexEf58R1Z3hSFPhi5DG4FVgGnBnXnRE5E/FxK/ArxPekSEngeqAdmcV+mbR8G40JwJcQ39uRviRBCoNYBywBdgDfYOxN/MqZiPRhB7AUjddQX8QWuBF4ClgJTIvrilOmAR1I3xpjOhJT4DagG2iN6INvWpE+tsVyIIbAk5Df7oeBKRHsh2YK0tcOpO9BCS3wecDTyPdTrbEU6ft7QxoNKXAz8DdgfkCbqTEfWSRpDmUwlMALgHXorRePVxqQsVgQwlgIgRcDf0EW9jPCdGRMFvs25FvgFuB3vL17k3mbs4En8bwE61Pgecg2WxZ3eM5BxmieLwO+BD4f+D0w1VP744mpyFjN9NG4D4HPAFbjyeFxykzgUWTsnOJD4HbS2tobK7QAD7hu1LXAbdTmIoYrluB4WdOlwI3IX2/GjnYcblC42pqrA35BemvLO4C1QA+wGzlNCXAWcvJyHvBxYHYU76ozBXgQuAo4aduYK4GXAFc6asuWY8j244OIsEWYB3wN+Xo5x5NfOrQivnTYNuTiEf0u4B4H7dhyAjkn1QjcRnFxUWVvU3XvV23F5h5kbK1wIfBdxD9duAdZ9rsFOcxuyiHVxmLVZkymAz+0bcRW4IuBr9s6YcmzwBXAMw7bfAb4MPCcwzZNWIblQT5bgX9A3DNU/wA+hZ8wk5eBTygbsZgI3GnTgI3Ac4Av2Bi35CXgWuCIRxtHlI2XPNoYjRuQiA4jbAT+lmV9G04iR2v3B7C1X9myfmUxZAIyATSubEI9EQ+SAb8E1gS0twZ57YpFG4ZnrU0F/gow2bCuLW8Bd0SwuwJ4M4JdkLH+qklFU4FvMqzngi4kJig0e5HwlFgYrfGbCPwhLL70HfBQjdqei4y9FiYCX29QxxWHgPUR7a/HbiHFFu2xNxH4cwZ1XPE0MBTR/pDyIRbaY68r8EXECb4usTWi7RIxfZjF8CknqqIr8DWa5V3zYmT7EH+NWksDXYE/plneNT5XrYpyNLJ9LQ10BV6oWd41scNdIb4P3gSeAbxPzxfnpBAdEduHmYgWhdAR+BJ9X5zTGNsB4ILYDgCXFS2oI3CTgSOuKZbezS8p/KK/v2hBHYEvNHDENR8lQhB1GZOUD7EprIWOwCk8miYD10W0fx3xNlnK8SLw+QaO+GBJjdoup3CWAB2BU8n9dC3wwQh2L1O2U8DLLDqVNEd1wL2EzUEVw+ZIFI7a1BH4HQaO+KKVsHvSN5HOwX7QOOioI3AKJ/7L+QlytNU385WtlCgcVB972a0ou4HnK/5vMpICwWem1zlICorKmXOv8il5dAQ+5s2LkelF1l+vB16r+NkMZH/WRzxyi2q7ckLzGnKUdaHyLQYDoxcRdAQeNHDEln7gk8i55G4ko2ulHzOQCMJbcPNEmqDaWsvp4g4qH7qBfcq3fgc2dSkcO6UzIIcNHLHhOPBpTh3AJ5BQmUqRJwH3AX8FFlnYXKTauI/TV8wGle0nyv6vX/l43MKmCYW3TXUEPmjgiA03Uj1CsBOJqKj2mGpBkoytRxYliry716uyG1Tdao/748pmZ5Wf9ShfQx6MLxyqoxNXFDJ8oxN4bISfP4pMulZT/QhL6SaWDkSALci1OaXf/KnIzlQTEhs80vvtTuQs1OYRyjyGBMCHWunaV7SgjsChZo17gFsLlNuMrC7dhXxnVutLHbL7Y7IDdAL4KRJgV2RScysSCBciXWNhLXQe0bsMHDHhdorP2AeQGKnLgUdwMxEcVG1drtouOmM9BnzTgf0i7CxaUEfgEKcJNyGDq0sP8ho1F4mMN7nEqk/Vnava0skQUOJxZJLmm21FC+o8okPcbbcCu8lKH/A99WlCEqxcihw3fQ+yYDGEfBe/gnwvdyOvRFss7JZzN/AHR20Nx0jzgVPQEfgA8lrgK4PdTiRvoyu24E40Hf6M9EXr/LIG/UhweiF0FwZ8ho10EDdqwRVDOMiOMwJaGqQk8G88th2aX3tse4NOYV2B/6hZvig9xI8YcMmLmE3SiqD1/a4r8E40puga+PrFiYmPiZb2+Jsszq82qDMaIV4tQuOjT7/VrWAi8CqDOqPxTw9txuZfHtrUXiMwEfg53F6Q/BZxttx804/0zRW9yEKQFqb7pysN61XjEHH2mn0ziNtsAEavXqYCPwS8bli3khRCQn3hqm+vY5gfxFTgg0i2GxfEjrf1iau+dWG4H29zxOVe3Kw8Ob+IIiFcxFENAT82rWwj8HbczKhTO47rEhd3Rq1CY/eoEttDandinzw7tWsAXGJ7b9QJ5ECDMbYCPw/83LKNetIJi3HJNOwztndgeTTXxTHTFcCrlm34PLweC9tsgIdxkJPTRTLvV4DvYveX3MX4e12yfTx/BxlbK1xla1+JHAhvNawfM7laiqzB0WKSq9ikk8i1NOP5nTYUR5GxdHLO2mXw2QvAzQ7bq1WWI2PpBNfRhV1UP/2fKUYn8LDLBn2Ej94M/N1Du+OdTXh4AvoQ+E3g84zPLUBf9AOfxcOVAb4CwEtRd+Pt1ccHRzg9itIZPiP8e5DUt4WDlWuQAWSMfB3Q857CYSOSPCyLfDoDyNhs9GkkRI6OdUjUXegA8pQ5jIzJOt+GQiVh2UgaN3qmQOmmVK9/uSVCZtnpARYgt4XWKs8CH8Hjd24lodMo7UN+e2txMaQT6XvQiy5j5Ml6A7nF60ZqY+36KHIV4FKk70GJmQitC0kqujaiD75Zi/TR6fKjDrEz3e1CckAuY3zNsg8jfbqScKkvqhJbYJBtsQ5gNvAA9me8YnIC6cNspE+x7hz+PykIXOIgstjejMTXjqVg8CEkvrkZ6UPonGLDkpLAJXqRG7c/gBwDCj4x0eANxMcm5ERLrNyVw5KiwCV6kdSBDcC3cRvwZst2xKcGxMeUfDsFV2eyfHIA+JH6XIFkev0M4c9x9SFpklZhEOUXi7EgcDmb1Od2ROCrkZSFi3Cf/Wcvsla8Acn+Y5J7KzpjTeBy+tSnXf373UjKwmbkCqALkNxY9ch1dGcAZ6myx5HY3VeRCdHLSHrA3cC/kTxU+0N0IpPJZDKZTCaTyWQymUwmk8kA/A/WJMgWUqNuzgAAAABJRU5ErkJggg=="

/***/ }),
/* 424 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAASNJREFUWIXt1L1KA0EUhuEnopWGNLb2KQQRFNJJ1tafzvuIhSDRSiPY6CV4DRpr0yc2dla5C3uLHRDEzP5kF5t9YYrlfHPmPcMyNDQ0/DOtWDG5/lhUOsYA++F7hge8/hV+u9lZeMZKluEf3OIFfWyE1cc41ApRVOAIw0h9KL2d2gTOc2QGdQrsVZQpLZCH6I+9rMB7jsysToHHijKlBcYYReqjkKlNAK5wigm+wprgJNQKUUSgi3u0pQ9R4uchSqSTt0OmW7XAAaa4wByX2MYa1rErnX4eMtOwJ5PVHJkunqXTwSbuwlpEO+zp4TPWPOsGWnhCJ4fobzphb/RdyBI4lE5Rll7oUVrgbInDc/XIEkgqEIj2yBLYqkCgih4NDQ318Q2+/CdVy1lRdAAAAABJRU5ErkJggg=="

/***/ }),
/* 425 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAATxJREFUWIXt1E0rRFEcx/HPIE/lBVgpu0lYIqPEhrwM8pAkL8DKVhaykNh6A1JWVogskLK0G5TsFIpYzLERM3fmXmbhfut0buf+/v/z7Z7TJSXlv5Mp9nJo8eK75S5MYghtqMU19rCJq68F+0vdP+5RE1mVBqzjHLPIojmsZ7GAy5Bpito0qkAjdjGFN6yhNwi0oA+reA2ZHdQnKbCMYdxjEHM4wRMecYx59CAfsitJCXRiBu8Yw2GR7HnIvGAaHUkIXOIojNMI+QtsKFzOiSQEYAC5iFnYDvNIUgLlchbm9rgCo7hROP9yxnOofwg9KhbYQmuJTDFaQ4+KBeJsHqlHnDuQU/iVZxQuaUUkdQnfqyFw8MPznwkkQl3M+v5qC1T86T8pdQS3cTfAXRyBiVINSpDHeIz6lJSU3+cD17Y/aemrlGYAAAAASUVORK5CYII="

/***/ }),
/* 426 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhJAAkAIABAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIwQzQ5NjQ4OEQ2QTExRTdBNDdFQzREOEQ2QkE2RTI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIwQzQ5NjQ5OEQ2QTExRTdBNDdFQzREOEQ2QkE2RTI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjBDNDk2NDY4RDZBMTFFN0E0N0VDNEQ4RDZCQTZFMjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjBDNDk2NDc4RDZBMTFFN0E0N0VDNEQ4RDZCQTZFMjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFAAABACwAAAAAJAAkAAACe4yPGcCgD6NpTlpJb2S79c49megpVJiM6WmeFaIe7gu7KzrZ0FzjPKZblISsS5AUsxRBNM0QqIlKp9Sq9faLzrZLJ/c7/YKl46v5jE7fjDjvs/UGJrHtXVCVtXdjeXo72ZfTJdhENHckE2dYZ6hXSPjhGGk1p9ZoiTVVAAAh+QQJAAABACwDAAMAFgAeAAACHQyCqbvHD6OctNqLs968+w+G4kiW5ommKuVwbVYAACH5BAUAAAEALAAAAAAkACQAAAJkjI+py+0Po2QAtFpnwnZxfXCZ8oGBOCKliXYhZr6iCodgK7vphDo7v/K4bj9P7IhMKomzJa3pNOCi0h71is1ea1koheUlDSPTE7fos1Z343Q4CAyb0RD1sy2B55D0OV4LGIhUAAAh+QQFAAABACwAAAAAAQABAAACAkwBACH5BAUAAAEALAAAAAABAAEAAAICTAEAIfkECQAAAQAsAwADAB4AHgAAAiMMgqnLe9eiTHDai7PevPsPhuJIluaJpurKtu4Lx/JMpRVZAAAh+QQFAAABACwAAAAAJAAkAAACdoyPqcvtD6NkALRar6WY54VtSfiNnUKKR6oaIZqCMfLSs0zaZcA+vXvi3RxDWC2S0wQlS8/kCY1Kp5MfsyhMXrUrLBFrRXqp5LK53ORAubjW99jeKY/0cZcLD5vY8GwfyOZn9Of15ycH6JbooQg0p3EWKTm5UAAAIfkEBQAAAQAsAAAAAAEAAQAAAgJMAQAh+QQFAAABACwAAAAAAQABAAACAkwBACH5BAkAAAEALAMAAwAeABYAAAIdDIKpy3vXokxw2ouz3rz7D4biSJbmiabqyrYuVgAAIfkEBQAAAQAsAAAAACQAJAAAAlyMj6nL7Q+jZAC0Wq+lmOeFbUn4jZ1CikeqGiGagjHy0rNM2mXAPr174t0cQ1gtktMEJUvP5AmNSqeTH7MoTF61KywRa0V6qeSyubxTQo+e9PkNj8vn9Lr9js/bCwAh+QQFAAABACwAAAAAAQABAAACAkwBACH5BAUAAAEALAAAAAABAAEAAAICTAEAIfkECQAAAQAsAwADAB4AHgAAAiMMgqnLe9eiTHDai7PevPsPhuJIluaJpurKtu4Lx/K8VuRRAAAh+QQFAAABACwAAAAAJAAkAAACc4yPqcvtD6NkALRar6WY54VtSfiNnUKKR6oaIZqCMfLSs0zaZcA+vXvi3RxDWC2S0wQlS8/kCY1Kp5MfsyhMXrUrLBFrRXqp5LK5vFNCj570l21stoPHMI6NH2fhfK99HyfnJ7fnBnjXpqHUYnPm+Ai5UAAAIfkEBQAAAQAsAAAAAAEAAQAAAgJMAQAh+QQFAAABACwAAAAAAQABAAACAkwBACH5BAkAAAEALAsAAwAWAB4AAAIcjI+ZoO3Bnpy02ouz3rz7D4biSJbmiaZqGmlMAQAh+QQFAAABACwAAAAAJAAkAAACY4yPqcvtD6OcCFjQLE0Xr74doNJp4ViV3oYa6grB7UuZAUrXMFmeTx+KXILEovGIlOSSLhVT5HzeotKq9eqK2Vg7Tmuy5X2FKxxVmdouT8P0WNl2x3Xh5ltbt3fh+Sb2DyhRAAAh+QQFAAABACwAAAAAAQABAAACAkwBACH5BAUAAAEALAAAAAABAAEAAAICTAEAIfkECQAAAQAsAwADAB4AHgAAAiOMj6kL668anLTai7PevPsPhuJIluaJpurKtu4LI5LYzF9TAAAh+QQFAAABACwAAAAAJAAkAAACd4yPqcvtD6NkALRar6WY54VtSfiNnUKKR6oaIZqCMfLSs0zaZcA+vXvi3RxDWC1y9OyQLc/kCY1Kp5OfxLoq+rRYSFeYq2qp5LLZHNQ0t2njkhhWvnHH+liXzN/BSb4pjtfm99fHN1douIY46KahtgZ0JjlJuVAAACH5BAUAAAEALAAAAAABAAEAAAICTAEAIfkEBQAAAQAsAAAAAAEAAQAAAgJMAQAh+QQJAAABACwDAAsAHgAWAAACG4yPqcvtD6OctNqLs968+w+G4kiWZgKAadqlBQAh+QQFAAABACwAAAAAJAAkAAACXIyPqcvtD6OctNqLs968++8BoviMQDVGJMi2bmCmU7wi9DnTyk3xiS8BvoZEi8xxDJqQS2WToYMAn8KF8AmLWrUGbDa2Bf+SXW7Ze8aN0V/12m0jxxvscvGOTxQAACH5BAUAAAEALAAAAAABAAEAAAICTAEAIfkEBQAAAQAsAAAAAAEAAQAAAgJMAQAh+QQFAAABACwAAAAAAQABAAACAkwBACH5BAUAAAEALAMAAwAeAB4AAAIjDIKpy30No5y02ouz3rz7D4biSJbmiabqyrbuC0ePeMzfUQAAIfkEBQAAAQAsAAAAAAEAAQAAAgJMAQA7"

/***/ }),
/* 427 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LoadingTpl_vue__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LoadingTpl_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LoadingTpl_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LoadingTpl_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LoadingTpl_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60dc1578_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LoadingTpl_vue__ = __webpack_require__(428);
var disposed = false
var normalizeComponent = __webpack_require__(84)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_LoadingTpl_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60dc1578_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_LoadingTpl_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/common/LoadingTpl.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60dc1578", Component.options)
  } else {
    hotAPI.reload("data-v-60dc1578", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 428 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.loadingVisible,
          expression: "loadingVisible"
        }
      ],
      staticClass: "loading-layer-2"
    },
    [_c("div", { staticClass: "modal-cls" }), _vm._v(" "), _vm._m(0)]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "box-cls" }, [
      _c("img", { attrs: { src: __webpack_require__(429) } })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-60dc1578", esExports)
  }
}

/***/ }),
/* 429 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhJAAkAOZ1APv7+/z8/Pn5+fLy8vj4+I+Pj+Xl5WZmZszMzPPz87Kysn9/fwAAAJmZmTMzM9ra2ri4uGtra0xMTGBgYKKiotXV1e3t7c7Ozvf39/39/ejo6Pr6+u/v7/b29unp6aampr+/v/T09J6enuDg4K6uroCAgE1NTWFhYSsrK/Hx8erq6n19fezs7Obm5sHBwXR0dI6OjnV1dcDAwNfX125ubnx8fNjY2MPDw6enp9LS0p+fn7Ozs+Pj48jIyLS0tKqqqqGhoWlpafX19c3Nzdvb26urq8XFxbe3t9zc3OTk5IiIiK2trampqaysrIuLi729vZaWlmRkZJiYmE5OTlNTU3h4ePDw8FhYWDg4OCYmJufn57u7u97e3pOTk1VVVVdXV8/Pz+Li4nJyctDQ0NTU1JCQkImJiX5+ftPT0zc3N4eHh5SUlMTExCwsLGJiYpWVlWVlZaCgoOvr6zk5OWhoaP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY0QjA5MjNBOEQ2NTExRTc4ODM5ODQyNDZERjI4MjlEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkY0QjA5MjNCOEQ2NTExRTc4ODM5ODQyNDZERjI4MjlEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjRCMDkyMzg4RDY1MTFFNzg4Mzk4NDI0NkRGMjgyOUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjRCMDkyMzk4RDY1MTFFNzg4Mzk4NDI0NkRGMjgyOUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCgB1ACwAAAAAJAAkAAAH6YB1goOEhYIMDIaKi4yEiI2QkXWPkpWGlJaEHDocjZiKLQctizoLBZ2Ln4UtJg4HixwFpqiXiaCtJgaMsbOKqoKsDrmQvKe1hga4upHFtIe2g8nCy5LNjdLDmbxAjXTTmYMcQFaNGkHU4Onq6+zt7pAK8fLzmQf29/jz+gr1+P7vAAMKHPguAIsAjRL4SKAugAYDLBr5aPCBYSaHBjQgZDTgA0WLkjBqLIQAQaGOH0M+HEnS5EmPFSGJ3NhSUQKYIA3NXFRy0c2UilhkpGmop0+POxYZJFrUpc8dA9gZJThoKtU6VqlmjRQIACH5BAkKAHUALAAAAAAkACQAAAf/gHWCg4SFdQATEwCGjI2OgoiKj5OTkYuUmIaWmYYYCCGOm40ePwmNCB8koIyihh4nVz+NCSQUqqyJl4WvEicajrS2q4Stg7y+k8G3xLmFGie9v5TKw4dRUbp1z9Gc1I/byJx1IbUQjzTc4oIhEByPNjTS6vP09fb3+IICBPz9/RcAAwYcI65KhIMIEQpcSJCTwYQJ8+nzR1GixYsYKQXgQeCRFhwD6AUY8YDHIxwFRIQUN/LBiACPBohIuRJTy5eEAoAAAXOQTJo2SeLMCQFCT58zVU66eXRQgKJNBf1U2ogpo6dGGU2tWSgEl6GGsEZFKiWHoxBjnUJ1NCCHgHpiDDOqzSq3Tty6dzMFAgAh+QQJCgB1ACwAAAAAJAAkAAAH/4B1goOEhXUYCwsYhoyNjoKIio+Tk5GLlJiGlpmMGAKOm40qBqBPIJ+diZeGKihZpIwEIAqnqZKsKAwoHo6ytKiEoYSturyPvrXBqoUeubuYyMB1BGVlBITNxZzRj9nPnHUCszePadrgggI3Fo83acbo8fLz9PQZ9/j46CEp/f7+BgIKFKgC3BcHCBMmHMiwIKeDChXmm7jvn8V6GDNqzAhgRoJHRJQMkAegAoIZj5QcKDESXEkEFQA8GlBiZUtML2MS2oADxwZCNG3iNKmTkIAGDaTVCcpyUk6ZhY4mNcT0pqGnjKQqFVS10QYyRQ1pbURzBQdHG6BmRbp10ICz8w7GbozKdi7dqXYHyc0UCAAh+QQJCgB1ACwAAAAAJAAkAAAH/4B1goOEhXUAFBQAhoyNjoKIio+Tk5GLlJiGlpmGGSmXjJuNFkYYjSloFaCFooYWLzRGjQAVF6qhiauDrxMvFo60trqHua4vvb+PwbeErYK8vpjLqwE/PwGE0MnStcyjx9Gch7U2j2fI4oMANkKPD2fb6fLz9PX293UbBPv8/A//AAEiEedFgsGDBwMqHMipIEKE+ATp69cvosWLGClh6JHgURgn8ThhcAGhxyMnEVaE1EjShSlHLFakXOloJASXhDJ06ZKBUMyZmGziJBSgQAFsPmWqnCT0JVGjSLMppSmoKaOiRxlZmNpoxpahhrBGLbRVzJJGBGY4DQvVkYUlAw7oic04aC7dOnbp5sUUCAAh+QQJCgB1ACwAAAAAJAAkAAAH6IB1goOEhYIKCoaKi4yEiI2QkXWPkpWGlJaEASwBjZiKHDoci3IGGp2Ln4UcBQs6iwEapqiXiaCtBaOwsqeKqoKsC7mQsbO1hsHDkcW9jraDybqSzLS3wtKVxSyNcdeZg5vVhlZA2N/n6Onq6+yNCO/w8ZkM9PX28fgI8/b87f7/AAO2S+AjQSMNQVqgS/ChgY9GQRyYUJiJYYMPBhkZMCGRoiSLGAsdOFBoY8ePDUOKJFmS40RIIDOuVNTCpUdDMReNXFTzpKIdF2Ua2smTI0tDA3YIHXqU5gED6ogKHCR1ap2qU7FGCgQAIfkECQoAdQAsAAAAACQAJAAAB/+AdYKDhIWCFxeGiouMhIiNkJF1j5KVhpSWhSEBjZiKIQgYiwNcI5yLnpokHwiLASMPpqiJnyQUJAmMr7GnhamCIba4kLuyvrSECcK5kcW9gmBghcq3zJLOjdTDmbs8jRDVmYMBPASNHBDW4uvs7e7tAPHy8s+RABv4+fkQ/P39MpkOTBhIkKC/gwAtCSxYcJ7DepDu6dP3rqLFixYH4NDSyAYND+wGiCiAoxENCSdAZhJZQMSARhpOoFQpiaVLQhtixNhAKObMmiNvEhIQIYKAQj5TQrL5shBRo4Y8yFQ6KmhTp0WPRp1Ks1AOKUINPdW69QqTRQJyXBWblZGHH2sPM43FyBYq3aFt7w6aaykQACH5BAkKAHUALAAAAAAkACQAAAf/gHWCg4SFdRkGBhmGjI2OgoiKj5OTkYuUmIaWmYwbAI6bjQIYjhtkFZ+MoYYCIE+kjAAVCKiqiZeFrQogBI6ytKmEq4O6vJO/tcK3hQQgu72UyMGCGhrMzsaZ0o/Nz5yCvzOPN97f4DMJjxY30Obu7/Dx8QT09fUC3wQd+/z8Df8AARb5BmWBwYMHAyocyKkgQoT2IuLjpK9fP3kYM2rMOEAJkXFYVLwbUOKAkkdYGKAQ+Y3kgRIDHnlAoZIlJpcwCQmZMkUIoZk1b5bMSSiBAwfpftJcOQlnzEJGkRpSsdSmIaeMoiYtRDUoIw4riBrS2ohqliSOODzNenTrVAPxDshuhNp2Ll2pdgfJzRQIACH5BAkKAHUALAAAAAAkACQAAAf/gHWCg4SFgg8PhoqLjISIjZCRdY+SlYaUloQCMxiNmIoAKRmLM1sunYufhQAVaCmLHS4Qp6mJoBUXFQCMsbOohaqCrLm7jb20wLaEw7qSx7+CSEiruM2Vz43MxZa9PY02xJmDHT0JjUI22+Lr7O3u7QHx8vOZAQD3+PgF+/z8b5lNKAgcOLCfwX+WAhIkOK9hgHr5Ir6bSLEiRQtOwnhaYIGdhRURnDRaMOFFx0wfI6w4ucjCi5IsI6VcSWgDFSobCLmEKWlmzDoCJEgQUGinSUg+DQUdasjoT50gaSoVSrTpy6OKloiROpWpIpc0jCwasOTpoKVVvxqBlgmtxa5pCt8Kciv3LNVMgQAAIfkECQoAdQAsAAAAACQAJAAAB+eAdYKDhIWCCAiGiouMhIiNkJF1j5KVhpSWhAk7CY2YigEsAYsKDR+di5+FARoGLIsDH6aol4mgrRqjsLKniqqCrAa5kLGztYbBw5HFvY62g8m6ksy0t8LSlcU+jSzXmYMDPtXIot/m5+jp6uuVB+7v8JkK8/T18PcH8vX77P3+/wDZtQiioZEVIBzOtTDhIEgjIAsKJMy00IGJFo04FIg4UVLFi4UYMCikkaNHhiBDjiS5USKkjxgNiVRU0uUimItm0mzZsdABizEV6dy5QMciAweCCl25iIOOnt+GBhQkdWrVgFchBQIAIfkECQoAdQAsAAAAACQAJAAAB/+AdYKDhIV1ARAQAYaMjY6CiIqPk5ORi5SYhpaZhgI5A46bjQEhjjlSIqCMopojXKWMAyIFqauJl4UBIw8juIaytKqErIO6vL6xs7XDt7m7vZjAy5AgIL7G0JnSwqvPyJTAOI88x5yEAzhajwQ83+bv8PHy83UE9vf3AvSEEf3+/lXMjblAsGDBfwgDchpo0CC+h/r2SZxIsSI8DzRsPOIAAdY7D24k0HgEgQIJj5lASjjh4VECEiZRTvJwYmXLQQCiRAFA6GVMTDRtFgIwYQLPnjBPzqzJ0hBRo4ZCJJVJKGhTp0WPFpL6kxGTK1exQmUk9QOCRgOY3GT0VGtUBBgO5LW1SGguXUF27+bFFAgAIfkECQoAdQAsAAAAACQAJAAAB/+AdYKDhIV1Ag0NAoaMjY6CiIqPk5ORi5SYhpaZjBwDjpuNABuOHCsln4yhhgAVZKSMAyUHqKqJl4WtCBUAjrK0qYSrg7q8k7+1wre5Fbu9lMjBdRs4OLCCxc+Y0Y/ZnIK/So8zzt+DA2pEjwkz2ubv8PHy8Sn19vYh5hn7/PwO/wABfvmmwoDBgwcDKhzIqSBChPci5vvWr+K8ixgzYlQx58YjCzdwEWzDAMujGwpAiMSkgiQKFY8IgEi58pEKFAxeEiJQpgyBnTNVssSpkxCGBQswFJJJc9LNnDALHU2qKWjNQU+LSkWqtGpTRkmyaN1KVRWIJ13BRmU0Na0mt+YO2mo0JHeuUa5275bNFAgAIfkECQoAdQAsAAAAACQAJAAAB/+AdYKDhIV1AQUFAYaMjY6CiIqPk5ORi5SYhpaZhgNLFo6bjRgzAo1NYiugjKKGGC5bM40sKxGqrImXha8QLh2OtLarhK2DvL6TwbfEuYUdLr2/lMrDdRldXRmEz9Gc1I/cyJx1wU6PPd3jgixmYY8JPdLq8/T19vYE+fr6G/eEEgADBvQyDsmDgwgRClxIkJPBhAn3Seznr6LFixjnWVjw4JEQGwDoWYgxYcEjGxcqhBw3csKLaoYAVEi5EpOFFy6rBfjxQ1cdmTRt4nxZCAAFCjUFAVU56WbOmEeTKp3JtJFTolCRMloqdZARGlizdp2KJsUoIzAJGdXaCEAKbfQO1o61KDej2qh2B9XlFAgAIfkECQoAdQAsAAAAACQAJAAAB+eAdYKDhIWCBweGiouMhIiNkJF1j5KVhpSWhC0HLY2Yigk7CYtwDiadi5+FCR8NO4sGJqaol4mgrR8DjLGziqqCrA25kLyntYYDuLqRxbSHtoPJwsuSzY3Sw5m8QY0705mDBkEajQk+1ODp6uvs7e6QDPHy85kI9vf48/oM9fj+7wADChz4jgMQK40CsAigjkOBBUAasTCggWEmhwsKcEiogaJFSRg1FlKgoFCAjhVBPhQ5sqRJlB8XhdxoiKSikx4ZzVxk8ybMRToy0lTU06cBFjJ1DCXqcpHCmOCKEhQkdWpVglchBQIAIfkECQoAdQAsAAAAACQAJAAAB/+AdYKDhIV1AhERAoaMjY6CiIqPk5ORi5SYhpaZhglMHo6bjQM5l4ZMVyegjKKGAyJSOY0aJxKqrImmhK8FIgOOtLarhK2DvL6TwbfEuYXHv5TKw3UbMTEbuyK90JjSj8+cgsE0jx/b4YMaNDaPWjjc6PHy8/TzG/f4+ADhAQD+//8mCBw48EA4GRASKlRIsKFBTggXLsxHcR+nfgAB1tvIsSPHEBA4PCLAI4C8ECQoQHjE48EIk+FQUiAR4lGAES5hYpJJsxAYMIVu5tyZsmehCxcMCX05iWdNQ0gZLdVpyGmjqFJxMmWE4INRRlizcnlqCAMCsmCTOgqANl5Yj0cK1cKNOxeq3EyBAAAh+QQJCgB1ACwAAAAAJAAkAAAH/4B1goOEhXUJDg4JhoyNjoKIio+Tk5GLlJiGlpmMSSqOm40DHI5JWSifjKGGAyUrpIweKAyoqomXha0HJQOOsrSphKuDuryTv7XCt7klu72UyMF1QlNTQoTFz5jRj9mcgiqzWI9qzt+DKmk3j0Rq2ufw8fLz8h329/cE3wIE/f7+CwIKFAjlW5EGCBMmHMiwIKeDChXim6iPE79//+hp3Mhxo4AbFh4lmAEgngAQCtY5moGgQsl9KEEIeASgQsuXmE4qkFlIg4ZCNW/mjDmTUAYDBjIAtelykk6ehY4mNRS0aaOnRaMiVUqVKc5CGJ5ANSSVa1cyGxxhyEp2qyMAaQ/lle3Ydipdo27vDprLKRAAIfkEBQoAdQAsAAAAACQAJAAAB/+AdYKDhIV1AhISAoaMjY6CiIqPk5ORi5SYhpaZhhhsFo6bjSxNA41sNDGgjKKGLDViTY0WMROqrImXha8RNSyOtLarhK2DvL6TwbfEubs1vb+UysN1G1RUG4TH0ZjTj9ucgsELj2bQ4YMWZw+PYWbc6PHy8/TzAPf4+AHhAf3+/xQCChRYJNwaGAgTJhzIsCCngwoV5pu4j9O/ixXradzIsd4GGyEeJeiBQd6GCkNsPOpxREbJcCeHVMjmqIOMli8xxZxZiAiRQjZx6kTJs9ADdkBvupy0k6ZRpIUwKM1pqGmjo42kCmWUIkdRRlizytgyo1GGFE7BQmWEYQYBemENOxqKK5cQ3bqC7lIKBAA7"

/***/ }),
/* 430 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("Login"), _vm._v(" "), _c("Loading")], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-dd7a443a", esExports)
  }
}

/***/ }),
/* 431 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ef48958_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__ = __webpack_require__(432);
var disposed = false
var normalizeComponent = __webpack_require__(84)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ef48958_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/app.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ef48958", Component.options)
  } else {
    hotAPI.reload("data-v-5ef48958", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 432 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("router-view")], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5ef48958", esExports)
  }
}

/***/ }),
/* 433 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(125);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(126);

var _vuex2 = _interopRequireDefault(_vuex);

var _loading = __webpack_require__(434);

var _loading2 = _interopRequireDefault(_loading);

var _businessPortal = __webpack_require__(439);

var _businessPortal2 = _interopRequireDefault(_businessPortal);

var _weather = __webpack_require__(473);

var _weather2 = _interopRequireDefault(_weather);

var _functionalMap = __webpack_require__(474);

var _functionalMap2 = _interopRequireDefault(_functionalMap);

var _login = __webpack_require__(475);

var _login2 = _interopRequireDefault(_login);

var _agency = __webpack_require__(476);

var _agency2 = _interopRequireDefault(_agency);

var _news = __webpack_require__(501);

var _news2 = _interopRequireDefault(_news);

var _rightModel = __webpack_require__(502);

var _rightModel2 = _interopRequireDefault(_rightModel);

var _calendar = __webpack_require__(503);

var _calendar2 = _interopRequireDefault(_calendar);

var _listModel = __webpack_require__(504);

var _listModel2 = _interopRequireDefault(_listModel);

var _prompt = __webpack_require__(505);

var _prompt2 = _interopRequireDefault(_prompt);

var _editComponent = __webpack_require__(506);

var _editComponent2 = _interopRequireDefault(_editComponent);

var _editMask = __webpack_require__(507);

var _editMask2 = _interopRequireDefault(_editMask);

var _passwordTpl = __webpack_require__(508);

var _passwordTpl2 = _interopRequireDefault(_passwordTpl);

var _mapPower = __webpack_require__(509);

var _mapPower2 = _interopRequireDefault(_mapPower);

var _userOperation = __webpack_require__(510);

var _userOperation2 = _interopRequireDefault(_userOperation);

var _notice = __webpack_require__(511);

var _notice2 = _interopRequireDefault(_notice);

var _addressBook = __webpack_require__(531);

var _addressBook2 = _interopRequireDefault(_addressBook);

var _addressBookFullPage = __webpack_require__(532);

var _addressBookFullPage2 = _interopRequireDefault(_addressBookFullPage);

var _calendar3 = __webpack_require__(533);

var _calendar4 = _interopRequireDefault(_calendar3);

var _mockLogin = __webpack_require__(534);

var _mockLogin2 = _interopRequireDefault(_mockLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* addressbook */

/* vuex 数据状态管理器 */
_vue2.default.use(_vuex2.default);
/* 实例化Vuex状态管理器对象 */
exports.default = new _vuex2.default.Store({
    modules: {
        loading: _loading2.default,
        homePage: _businessPortal2.default,
        weather: _weather2.default,
        functionalMap: _functionalMap2.default,
        login: _login2.default,
        agency: _agency2.default,
        news: _news2.default,
        rightModel: _rightModel2.default,
        calendar: _calendar2.default,
        listModel: _listModel2.default,
        prompt: _prompt2.default,
        editComponent: _editComponent2.default,
        editMask: _editMask2.default,
        passwordTpl: _passwordTpl2.default,
        mapPower: _mapPower2.default,
        userOp: _userOperation2.default,
        addressBook: _addressBook2.default,
        calendarV2: _calendar4.default,
        addressBookFullPage: _addressBookFullPage2.default,
        notice: _notice2.default,
        mockLogin: _mockLogin2.default
    },
    strict: false
});

/***/ }),
/* 434 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 加载中的操作                                                      *
                 * Created by tr on 2017/6/28.                                       *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{loadingVisible: boolean}}
 */
var state = {
    /*是否隐藏或显示*/
    loadingVisible: false
};
/**
 * @type {{loadingVisible: ((p1:*)=>boolean)}}
 */
var getters = {
    loadingVisible: function loadingVisible(state) {
        return state.loadingVisible;
    }
};
/**
 * @type {{loadingShow: (({commit}:{commit: *})), loadingHide: (({commit}:{commit: *}))}}
 */
var actions = {
    /**
     * 显示方法
     * @param commit
     */
    loadingShow: function loadingShow(_ref) {
        var dispatch = _ref.dispatch,
            commit = _ref.commit;

        var getTimeout = setTimeout(function () {
            dispatch('loadingHide');
            clearTimeout(getTimeout);
        }, 3000);
        commit(types.LOADING_SHOW);
    },

    /**
     * 隐藏方法
     * @param commit
     */
    loadingHide: function loadingHide(_ref2) {
        var commit = _ref2.commit;

        commit(types.LOADING_HIDE);
    }
};
/**
 * @type {{[[types.LOADING_SHOW]]: ((state)), [[types.LOADING_HIDE]]: ((state))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.LOADING_SHOW, function (state) {
    state.loadingVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.LOADING_HIDE, function (state) {
    state.loadingVisible = false;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 435 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(436);
var $Object = __webpack_require__(55).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(85);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(49), 'Object', { defineProperty: __webpack_require__(48).f });


/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(438);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 438 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 基本信息模块获取数据                                              *
                 * Created by tr on 2017/6/22.                                       *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{userData: Array, funcData: Array, custom: {}, clicksData: Array, showEditComponent: boolean, isAddOrEditComponent: boolean, packageData: {}}}
 */
var state = {
    /*获取用户信息*/
    userData: [],
    /*获取业务定制的信息*/
    funcData: [],
    /*保存定制的信息*/
    custom: {},
    /*获取常用业务的信息*/
    clicksData: [],
    /*是否弹出编辑组件弹框*/
    showEditComponent: false,
    /*判断是新增组件还是编辑组件*/
    isAddOrEditComponent: false,
    /*获取功能包返回的数据*/
    packageData: {}
};
/**
 * @type {{userData: ((p1:*)=>Array), funcData: ((p1:*)=>Array), custom: ((p1:*)=>{}), clicksData: ((p1:*)=>Array), showEditComponent: ((p1:*)=>boolean), isAddOrEditComponent: ((p1:*)=>boolean), packageData: ((p1:*)=>{})}}
 */
var getters = {
    userData: function userData(state) {
        return state.userData;
    },
    funcData: function funcData(state) {
        return state.funcData;
    },
    custom: function custom(state) {
        return state.custom;
    },
    clicksData: function clicksData(state) {
        return state.clicksData;
    },
    showEditComponent: function showEditComponent(state) {
        return state.showEditComponent;
    },
    isAddOrEditComponent: function isAddOrEditComponent(state) {
        return state.isAddOrEditComponent;
    },
    packageData: function packageData(state) {
        return state.packageData;
    }
};
/**
 * @type {{getUserData: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), getOrgInfo: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), getClicksData: (({commit}:{commit: *}, {reqData}:{reqData?: *})), getFuncData: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), addCustomEle: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), showEditComponentFun: (({commit}:{commit: *}, {flgData}:{flgData: *})), hideEditComponentFun: (({commit}:{commit: *})), addPackage: (({commit}:{commit: *}, {foundPackage}:{foundPackage?: *}))}}
 */
var actions = {
    /**
     * 获取用户信息
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getUserData: function getUserData(_ref, _ref2) {
        var dispatch = _ref.dispatch,
            commit = _ref.commit;
        var reqData = _ref2.reqData;

        _syncData2.default.userNew(reqData, function (data) {
            var newData = data;
            dispatch('loadingHide');
            commit(types.USER_DATA, { newData: newData });
        });
    },

    /**
     * 获取用的职位，并把数据整合在“USER_DATA”里面
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getOrgInfo: function getOrgInfo(_ref3, _ref4) {
        var dispatch = _ref3.dispatch,
            commit = _ref3.commit;
        var reqData = _ref4.reqData;

        _syncData2.default.orgInfo(reqData, function (data) {
            var newData = state.userData;
            newData.company = data.company;
            newData.department = data.department;
            dispatch('loadingHide');
            commit(types.USER_DATA, { newData: newData });
        });
    },

    /**
     * 获取常用数据
     * @param commit
     * @param reqData
     */
    getClicksData: function getClicksData(_ref5, _ref6) {
        var commit = _ref5.commit;
        var reqData = _ref6.reqData;

        _syncData2.default.getClicks(reqData, function (data) {
            var newData = data;
            commit(types.CLICKS_DATA, { newData: newData });
        });
    },

    /**
     * todo
     * 获取定制后的数据
     * 注释人：田蓉
     * 原因：这方法下载暂时没有用了
     * @param dispatch
     * @param commit
     * @param reqData
     */
    /* getFuncData({dispatch, commit}, {reqData}){
         sync.getFunc(reqData, data => {
             const newData = data;
             dispatch('loadingHide');
             commit(types.FUNC_DATA, {newData});
         });
     },*/
    /**
     * 保存定制的数据
     * @param dispatch
     * @param commit
     * @param reqData
     */
    addCustomEle: function addCustomEle(_ref7, _ref8) {
        var dispatch = _ref7.dispatch,
            commit = _ref7.commit;
        var reqData = _ref8.reqData;

        _syncData2.default.addCustom(reqData, function (data) {
            var newData = data;
            newData.index = newData.index ? newData.index : 0 + newData.code;
            var reqDate = data.message;
            dispatch('loadingHide');
            dispatch('promptShow', { reqDate: reqDate });
            commit(types.CUSTOM_DATA, { newData: newData });
        });
    },

    /**
     * 是否弹出 编辑组件弹框
     * @param commit
     * @param flgData
     */
    showEditComponentFun: function showEditComponentFun(_ref9, _ref10) {
        var commit = _ref9.commit;
        var flgData = _ref10.flgData;

        if (flgData.data === "addComponent") {
            commit(types.ISADD_OR_EDIT_COMPONENT);
        } else if (flgData.data === "editComponent") {
            commit(types.NOADD_OR_EDIT_COMPONENT);
        }
        commit(types.SHOW_EDIT_COMPONENT);
    },

    /**
     * 隐藏编辑组件
     * @param commit
     */
    hideEditComponentFun: function hideEditComponentFun(_ref11) {
        var commit = _ref11.commit;

        commit(types.HIDE_EDIT_COMPONENT);
    },

    /**
     * 新增组件
     * @param commit
     * @param foundPackage
     */
    addPackage: function addPackage(_ref12, _ref13) {
        var commit = _ref12.commit;
        var foundPackage = _ref13.foundPackage;

        _syncData2.default.foundPackage(foundPackage, function (data) {
            var newData = data;
            commit(types.FOUND_PACKAGE, { newData: newData });
        });
    }
};
/**
 * @type {{[[types.USER_DATA]]: ((state, {newData}:{newData: *})), [[types.FUNC_DATA]]: ((state, {newData}:{newData: *})), [[types.CUSTOM_DATA]]: ((state, {newData}:{newData: *})), [[types.CLICKS_DATA]]: ((state, {newData}:{newData: *})), [[types.SHOW_EDIT_COMPONENT]]: ((state)), [[types.HIDE_EDIT_COMPONENT]]: ((state)), [[types.ISADD_OR_EDIT_COMPONENT]]: ((state)), [[types.NOADD_OR_EDIT_COMPONENT]]: ((state)), [[types.FOUND_PACKAGE]]: ((state, {newData}:{newData: *}))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.USER_DATA, function (state, _ref14) {
    var newData = _ref14.newData;

    state.userData = newData;
}), (0, _defineProperty3.default)(_mutations, types.FUNC_DATA, function (state, _ref15) {
    var newData = _ref15.newData;

    state.funcData = newData;
}), (0, _defineProperty3.default)(_mutations, types.CUSTOM_DATA, function (state, _ref16) {
    var newData = _ref16.newData;

    state.custom = newData;
}), (0, _defineProperty3.default)(_mutations, types.CLICKS_DATA, function (state, _ref17) {
    var newData = _ref17.newData;

    state.clicksData = newData;
}), (0, _defineProperty3.default)(_mutations, types.SHOW_EDIT_COMPONENT, function (state) {
    state.showEditComponent = true;
}), (0, _defineProperty3.default)(_mutations, types.HIDE_EDIT_COMPONENT, function (state) {
    state.showEditComponent = false;
}), (0, _defineProperty3.default)(_mutations, types.ISADD_OR_EDIT_COMPONENT, function (state) {
    state.isAddOrEditComponent = true;
}), (0, _defineProperty3.default)(_mutations, types.NOADD_OR_EDIT_COMPONENT, function (state) {
    state.isAddOrEditComponent = false;
}), (0, _defineProperty3.default)(_mutations, types.FOUND_PACKAGE, function (state, _ref18) {
    var newData = _ref18.newData;

    state.packageData = newData;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(441);
module.exports = __webpack_require__(55).Object.assign;


/***/ }),
/* 441 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(85);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(442) });


/***/ }),
/* 442 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(88);
var gOPS = __webpack_require__(134);
var pIE = __webpack_require__(90);
var toObject = __webpack_require__(190);
var IObject = __webpack_require__(188);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(66)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 443 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(57);
var toLength = __webpack_require__(444);
var toAbsoluteIndex = __webpack_require__(445);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(130);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(130);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 446 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(55);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 447 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(92);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(93);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*********************************************************************
 * 所有的接口路径存放                                                *
 * just for old portal project                                       *
 * Created by tr on 2017/7/5.                                        *
 *********************************************************************/
var UrlMapping = function () {
  function UrlMapping() {
    (0, _classCallCheck3.default)(this, UrlMapping);


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


  (0, _createClass3.default)(UrlMapping, [{
    key: 'getUrl',
    value: function getUrl(str, obj) {
      var b = location.port === '9010';
      var getUrl = this[str];
      if (obj) {
        //把{}里面的值替换成传的参数值
        getUrl = this[str].replace(/\{.*?\}/g, function (word) {
          return obj[word.substring(1, word.length - 1)];
        });
      }

      var urlStr = getUrl.split('/');
      //getUrl = b && urlStr.length > 1 ? urlStr[urlStr.length - 1] : getUrl;
      var host = location.protocol + "//" + location.host + '/';

      //todo 这是门户的线上版地址
      // let host = 'http://192.168.1.163:20210/';

      //todo 这是老子自己的服务
      //let host = 'http://192.168.13.113:10303/';
      var url = (b ? '../mokeData/marketingGroup/' : host) + getUrl + (b ? '.json' : '');

      if (getUrl !== 'login' && getUrl !== 'me' && getUrl !== 'access_token') {
        url = (b ? '../mokeData/marketingGroup/' : host + "portal/") + getUrl + (b ? '.json' : '');
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
    }
  }, {
    key: 'getPageUrl',


    /**
     * 根据条件返回全路径
     * @param str
     * @returns {*}
     */
    value: function getPageUrl(str) {
      return this[str];
    }
  }]);
  return UrlMapping;
}();

exports.default = UrlMapping;

/***/ }),
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(92);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(93);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*********************************************************************
 * 原生js封装的ajax请求                                                  *
 * Created by tr on 2017/7/18                                        *
 *********************************************************************/
var Ajax = function () {
    function Ajax() {
        (0, _classCallCheck3.default)(this, Ajax);
    }

    (0, _createClass3.default)(Ajax, [{
        key: 'ajax',
        value: function ajax(params) {
            params = params || {};
            params.data = params.data || {};
            params.jsonp ? this.jsonp(params) : this.json(params);
        }

        // jsonp请求

    }, {
        key: 'jsonp',
        value: function jsonp(params) {
            //创建script标签并加入到页面中
            var callbackName = params.jsonp;
            var head = document.getElementsByTagName('head')[0];
            // 设置传递给后台的回调参数名
            params.data['callback'] = callbackName;
            var data = this.formatParams(params.data);
            var script = document.createElement('script');
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
        }
    }, {
        key: 'formatParams',


        //格式化参数
        value: function formatParams(data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }

            // 添加一个随机数，防止缓存
            arr.push('v=' + this.random());
            return arr.join('&');
        }

        /*json格式*/

    }, {
        key: 'json',
        value: function json(obj) {
            obj.type = obj.type || "get"; //指定提交方式的默认值
            obj.async = obj.async || true; //设置是否异步，默认为true(异步)
            obj.data = obj.data || null; //设置数据的默认值
            obj.type = obj.type.toLowerCase();
            obj.dataType = obj.dataType || null;

            var ajax = new XMLHttpRequest();
            if (!window.XMLHttpRequest) {
                ajax = new ActiveXObject("Microsoft.XMLHTTP"); //ie
            }
            if (obj.type === "get" || obj.type === "GET") {
                //区分请求的类型
                var url = '';
                if (obj.url.indexOf('?') > -1) {
                    url = obj.url;
                } else {
                    url = obj.url + "?" + this.toData(obj.data); //get
                }
                ajax.open(obj.type, url, obj.async);
                ajax.send();
            } else {
                var contentType = 'application/x-www-form-urlencoded;charset=UTF-8'; //请求的数据格式
                var data = this.toData(obj.data);
                if (obj.dataType && obj.dataType !== 'null' || obj.type === 'put' || obj.type === 'PUT') {
                    contentType = 'application/json;charset=UTF-8';
                    data = obj.data;
                }
                ajax.open(obj.type, obj.url, obj.async);
                ajax.setRequestHeader("Content-Type", contentType);
                ajax.send(data);
            }

            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) {
                    var _data = '';
                    if (ajax.status >= 200 && ajax.status < 300 || ajax.status === 304 || ajax.status === 302) {
                        if (ajax.responseText.constructor === String) {
                            try {
                                _data = JSON.parse(ajax.responseText);
                            } catch (e) {
                                if (_data === '') {
                                    _data = { code: "ERROR" };
                                }
                            }
                        }
                    } else {
                        _data = "ERROR232";
                    }

                    obj.cb(_data);
                }
            };
        }
    }, {
        key: 'toData',
        value: function toData(obj) {
            if (obj === null) {
                return obj;
            }
            var arr = [];
            for (var i in obj) {
                var str = i + "=" + obj[i];
                arr.push(str);
            }
            // 添加一个随机数参数，防止缓存
            arr.push('v=' + this.random());
            return arr.join('&');
        }
    }, {
        key: 'random',


        // 获取随机数
        value: function random() {
            return Math.floor(Math.random() * 10000 + 500);
        }
    }]);
    return Ajax;
}();

exports.default = Ajax;

/***/ }),
/* 449 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(450);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(462);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(451), __esModule: true };

/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(452);
__webpack_require__(458);
module.exports = __webpack_require__(138).f('iterator');


/***/ }),
/* 452 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(453)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(193)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 453 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(130);
var defined = __webpack_require__(129);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 454 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(195);
var descriptor = __webpack_require__(87);
var setToStringTag = __webpack_require__(137);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(56)(IteratorPrototype, __webpack_require__(58)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(48);
var anObject = __webpack_require__(86);
var getKeys = __webpack_require__(88);

module.exports = __webpack_require__(49) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 456 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(36).document;
module.exports = document && document.documentElement;


/***/ }),
/* 457 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(50);
var toObject = __webpack_require__(190);
var IE_PROTO = __webpack_require__(131)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 458 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(459);
var global = __webpack_require__(36);
var hide = __webpack_require__(56);
var Iterators = __webpack_require__(136);
var TO_STRING_TAG = __webpack_require__(58)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 459 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(460);
var step = __webpack_require__(461);
var Iterators = __webpack_require__(136);
var toIObject = __webpack_require__(57);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(193)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 460 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 461 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 462 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(463), __esModule: true };

/***/ }),
/* 463 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(464);
__webpack_require__(470);
__webpack_require__(471);
__webpack_require__(472);
module.exports = __webpack_require__(55).Symbol;


/***/ }),
/* 464 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(36);
var has = __webpack_require__(50);
var DESCRIPTORS = __webpack_require__(49);
var $export = __webpack_require__(85);
var redefine = __webpack_require__(194);
var META = __webpack_require__(465).KEY;
var $fails = __webpack_require__(66);
var shared = __webpack_require__(132);
var setToStringTag = __webpack_require__(137);
var uid = __webpack_require__(89);
var wks = __webpack_require__(58);
var wksExt = __webpack_require__(138);
var wksDefine = __webpack_require__(139);
var enumKeys = __webpack_require__(466);
var isArray = __webpack_require__(467);
var anObject = __webpack_require__(86);
var isObject = __webpack_require__(65);
var toIObject = __webpack_require__(57);
var toPrimitive = __webpack_require__(127);
var createDesc = __webpack_require__(87);
var _create = __webpack_require__(195);
var gOPNExt = __webpack_require__(468);
var $GOPD = __webpack_require__(469);
var $DP = __webpack_require__(48);
var $keys = __webpack_require__(88);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(196).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(90).f = $propertyIsEnumerable;
  __webpack_require__(134).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(135)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(56)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 465 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(89)('meta');
var isObject = __webpack_require__(65);
var has = __webpack_require__(50);
var setDesc = __webpack_require__(48).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(66)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 466 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(88);
var gOPS = __webpack_require__(134);
var pIE = __webpack_require__(90);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 467 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(189);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 468 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(57);
var gOPN = __webpack_require__(196).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 469 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(90);
var createDesc = __webpack_require__(87);
var toIObject = __webpack_require__(57);
var toPrimitive = __webpack_require__(127);
var has = __webpack_require__(50);
var IE8_DOM_DEFINE = __webpack_require__(185);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(49) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 470 */
/***/ (function(module, exports) {



/***/ }),
/* 471 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139)('asyncIterator');


/***/ }),
/* 472 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(139)('observable');


/***/ }),
/* 473 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{weatherData: null}}
 */
/*********************************************************************
 * 获取天气的数据                                                    *
 * Created by tr on 2017/6/27.                                       *
 *********************************************************************/
var state = {
    /*获取天气的数据*/
    weatherData: {}
};
/**
 * @type {{weatherData: ((p1:*)=>null)}}
 */
var getters = {
    weatherData: function weatherData(state) {
        return state.weatherData;
    }
};
/**
 * @type {{getWeatherData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *}))}}
 */
var actions = {
    /**
     * 获取天气的数据
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getWeatherData: function getWeatherData(_ref, _ref2) {
        var dispatch = _ref.dispatch,
            commit = _ref.commit;
        var reqData = _ref2.reqData;

        _syncData2.default.getWeather(reqData, function (data) {
            var newData = data;
            dispatch('loadingHide');
            commit(types.WEATHER_DATA, { newData: newData });
        });
    }
};
/**
 * @type {{[[types.WEATHER_DATA]]: ((state, {newData}:{newData: *}))}}
 */
var mutations = (0, _defineProperty3.default)({}, types.WEATHER_DATA, function (state, _ref3) {
    var newData = _ref3.newData;

    state.weatherData = newData;
});
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 474 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 所有功能地图里面的数据处理                                        *
                 * Created by tr on 2017/6/28.                                       *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

var _common = __webpack_require__(191);

var _common2 = _interopRequireDefault(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{functionMapData: Array, mapVisible: boolean, mapSearchVisible: boolean, mapTitle: string, mapListData: Array, mapTreeData: Array, mapTreeListData: Array, popupVisible: boolean}}
 */
var state = {
    /*地图的数据*/
    functionMapData: [],
    /*隐藏或显示功能页面*/
    mapVisible: true,
    /*判断页面里面是否显示搜索框*/
    mapSearchVisible: false,
    /*功能里面的名称*/
    mapTitle: '',
    /*获取地图的列表数据*/
    mapListData: [],
    /*地图里面树形图的数据*/
    mapTreeData: [],
    /*根据条件来获取对应的数据*/
    mapTreeListData: [],
    /*是否需要显示新增文件框*/
    popupVisible: false
};
/**
 * @type {{functionMapData: ((p1:*)=>Array), mapVisible: ((p1:*)=>boolean), mapSearchVisible: ((p1:*)=>boolean), mapTitle: ((p1:*)=>string), mapListData: ((p1:*)=>Array), mapTreeData: ((p1:*)=>Array), mapTreeListData: ((p1:*)=>Array)}}
 */
var getters = {
    functionMapData: function functionMapData(state) {
        return state.functionMapData;
    },
    mapVisible: function mapVisible(state) {
        return state.mapVisible;
    },
    mapSearchVisible: function mapSearchVisible(state) {
        return state.mapSearchVisible;
    },
    mapTitle: function mapTitle(state) {
        return state.mapTitle;
    },
    mapListData: function mapListData(state) {
        return state.mapListData;
    },
    mapTreeData: function mapTreeData(state) {
        return state.mapTreeData;
    },
    mapTreeListData: function mapTreeListData(state) {
        return state.mapTreeListData;
    },
    popupVisible: function popupVisible(state) {
        return state.popupVisible;
    }
};
/**
 * @type {{getFuncData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData: *})), manageDataFunc: (({commit}:{commit: *}, {newData}:{newData: *})), getFunctionMapData: (({dispatch, commit}:{dispatch?: *, commit: *}, {reqData}:{reqData?: *})), getTreeData: (({commit}:{commit: *}, {reqData}:{reqData?: *})), setTreeObj: (({dispatch,commit}:{dispatch: *, commit: *}, {resObj}:{resObj?: *})), getTreeListData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), treeManage: (({commit}:{commit: *}, {reqData}:{reqData?: *})), mapListDataManage: (({commit}:{commit: *}, {reqData}:{reqData: *})), mapShow: (({commit}:{commit: *})), mapHide: (({commit}:{commit: *})), mapSearchShow: (({commit}:{commit: *})), mapSearchHide: (({commit}:{commit: *})), mapTitleName: (({commit}:{commit: *})), customTitleName: (({commit}:{commit: *})), isGoToURL: (({dispatch, commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), showPopup: (({commit}:{commit: *})), hidePopup: (({commit}:{commit: *}))}}
 */
var actions = {
    /**
     * 获取定制页面里面的所有应用
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getFuncData: function getFuncData(_ref, _ref2) {
        var dispatch = _ref.dispatch,
            commit = _ref.commit;
        var reqData = _ref2.reqData;

        _syncData2.default.getFunctionMap(reqData.data, function (data) {
            dispatch('loadingHide');
            var newData = data;
            commit(types.FUNCTION_MAP_DATA, { newData: newData });
            newData = {
                func: newData,
                data: ''
            };
            dispatch('manageDataFunc', { newData: newData });
        });
    },

    /**
     * 处理业务入口的数据
     * @param commit
     * @param newData
     */
    manageDataFunc: function manageDataFunc(_ref3, _ref4) {
        var dispatch = _ref3.dispatch,
            commit = _ref3.commit;
        var newData = _ref4.newData;

        dispatch('loadingHide');
        /*业务入口的数据结构*/
        var listData = [],
            nDate = [];
        if (newData.data) {
            var nData = newData;
            dispatch('updateFuncData', { nData: nData });
            nDate = state.functionMapData;
        } else {
            nDate = newData.func;
        }
        if (nDate) {
            nDate.map(function (da) {
                var children = da.children ? da.children : [];
                if (children.length) {
                    children.map(function (item) {
                        /*判断是否是定制后的数据*/
                        if (item.activeStatus === 0 && !item.parentId) {
                            var newList = {
                                customizationId: item.customizationId,
                                userId: item.userId,
                                index: item.index,
                                activeStatus: item.activeStatus,
                                resourceType: item.resourceType,
                                packageName: item.packageName,
                                children: []
                            };

                            if (item.resourceType === 2) {
                                newList.children.push(item);
                                children.map(function (child) {
                                    if (child.parentId === item.customizationId) {
                                        newList.children.push(child);
                                    }
                                });
                            } else {
                                newList = item;
                            }
                            listData.push(newList);
                        }
                    });
                }
            });
        }
        commit(types.MAP_LIST_DATA, { listData: listData });
    },

    /**
     * 移除功能包主数据，重新选择并重置主数据
     * @param commit
     * @param nData
     */
    updateFuncData: function updateFuncData(_ref5, _ref6) {
        var dispatch = _ref5.dispatch,
            commit = _ref5.commit;
        var nData = _ref6.nData;

        dispatch('loadingHide');
        var num = 0;
        var newData = [],
            cusId = "";
        if (nData.data) {
            nData.func.map(function (item) {
                var nItem = item.children;
                var nDa = [];
                if (nItem.length) {
                    nItem.map(function (data) {
                        if (data.parentId === nData.data.customizationId) {
                            /*判断功能包里面是否有1个以上的功能包*/
                            if (++num === 1) {
                                data.packageName = nData.data.packageName;
                                data.parentId = '';
                                cusId = data.customizationId;
                            } else {
                                data.parentId = cusId;
                            }
                        }
                        nDa.push(data);
                    });
                }
                newData.push({
                    appName: item.appName,
                    children: nDa
                });
            });
            commit(types.FUNCTION_MAP_DATA, { newData: newData });
        }
    },

    /**
     * 获取所有的应用
     * 1.0.4 的版本后台的数据改变，结构也改变，这现在没有用了 ------ 注释人：tr
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getFunctionMapData: function getFunctionMapData(_ref7, _ref8) {
        var dispatch = _ref7.dispatch,
            commit = _ref7.commit;
        var reqData = _ref8.reqData;

        _syncData2.default.getAppsFunctionMap(reqData.data, function (data) {
            dispatch('loadingHide');
            var list = data;
            var dataValue = reqData.url;
            var newData = [];

            var listData = state.mapListData ? state.mapListData : [];
            if (dataValue === 'FUNC') {
                listData = [];
            }
            var index = -1;
            if (list) {
                list.map(function (item) {
                    //循环获取制定或功能地图的数据
                    index++;
                    if (index > 17) index = 0;

                    var data = reqData.data;
                    data.clientId = item.oauthClientId;

                    _syncData2.default.getFunctionMap({ data: data, url: reqData.url, sum: index }, function (data) {
                        //获取对应的功能地图或定制的数据
                        dispatch('loadingHide');
                        if (dataValue === 'FUNC') {
                            var _dataValue = '';
                            if (data) {
                                data.map(function (d) {
                                    if (d.activeStatus === 0) {
                                        _dataValue = d;
                                        _dataValue.clientId = item.oauthClientId;
                                        _dataValue.accessToken = '';
                                        _dataValue.url = item.accessUrl;

                                        listData.push(_dataValue);
                                    }
                                });
                            }
                        }
                        newData.push({
                            name: item.appName,
                            appCode: item.appCode,
                            accessToken: "",
                            url: item.accessUrl,
                            clientId: item.oauthClientId,
                            data: data
                        });
                    });
                });
                commit(types.MAP_LIST_DATA, { listData: listData });
                commit(types.FUNCTION_MAP_DATA, { newData: newData });
            }
        });
    },

    /**
     * 获取树形图的数据
     * @param commit
     * @param reqData
     */
    getTreeData: function getTreeData(_ref9, _ref10) {
        var dispatch = _ref9.dispatch,
            commit = _ref9.commit;
        var reqData = _ref10.reqData;

        _syncData2.default.getTree(reqData, function (data) {
            dispatch('loadingHide');
            var newData = data;
            commit(types.MAP_TREE_DATA, { newData: newData });
        });
    },

    /**
     * 根据选择的对象来改变树形图里面的数据
     * @param commit
     * @param resObj
     */
    setTreeObj: function setTreeObj(_ref11, _ref12) {
        var dispatch = _ref11.dispatch,
            commit = _ref11.commit;
        var resObj = _ref12.resObj;

        dispatch('loadingHide');
        if (resObj) {
            var newData = new _common2.default().recursion(state.mapTreeData, resObj);
            commit(types.MAP_TREE_DATA, { newData: newData });
        }
    },

    /**
     * 根据条件获取对应的列表数据
     * @param commit
     * @param reqData
     */
    getTreeListData: function getTreeListData(_ref13, _ref14) {
        var dispatch = _ref13.dispatch,
            commit = _ref13.commit;
        var reqData = _ref14.reqData;

        dispatch('loadingHide');
        _syncData2.default.getChildList(reqData, function (data) {
            var newD = data,
                newData = data,
                newMap = state.mapListData;
            if (newMap.length > 0 && newMap.length > 0) {
                newMap.map(function (data) {
                    newD.map(function (da) {
                        if (da.resCode === data.resCode && da.appCode === data.appCode) {
                            da.activeStatus = data.activeStatus;
                        }
                    });
                });
            }
            commit(types.MAP_TREE_LIST_DATA, { newData: newData });
        });
    },

    /**
     * 根据定制或取消的来修改地图里面的数据
     * @param commit
     * @param reqData
     */
    treeManage: function treeManage(_ref15, _ref16) {
        var dispatch = _ref15.dispatch,
            commit = _ref15.commit;
        var reqData = _ref16.reqData;

        dispatch('loadingHide');
        var funcData = state.functionMapData,
            newData = [];
        funcData.map(function (data) {
            var newDa = data.children;
            var newD = data;
            newD.children = [];
            if (newDa && newDa.length > 0) {
                newDa.map(function (da) {
                    if (da.resCode === reqData.resCode && da.appCode === reqData.appCode) {
                        da.activeStatus = reqData.activeStatus;
                    }

                    newD.children.push(da);
                });
            }
            newData.push(newD);
        });
        //commit(types.MAP_LIST_DATA, {listData});

        commit(types.FUNCTION_MAP_DATA, { newData: newData });
        newData.func = newData;
        dispatch('manageDataFunc', { newData: newData });
    },

    /**
     * 根据地图里面选中和取消来修改列表事件里面的值
     * @param commit
     * @param reqData
     */
    mapListDataManage: function mapListDataManage(_ref17, _ref18) {
        var dispatch = _ref17.dispatch,
            commit = _ref17.commit;
        var reqData = _ref18.reqData;

        dispatch('loadingHide');
        var newData = state.mapTreeListData;
        newData.map(function (data) {
            if (data.resCode === reqData.resCode && data.appCode === reqData.appCode) {
                data.activeStatus = reqData.activeStatus;
            }
        });

        commit(types.MAP_TREE_LIST_DATA, { newData: newData });
    },

    /**
     * 显示地图
     * @param commit
     */
    mapShow: function mapShow(_ref19) {
        var commit = _ref19.commit;

        commit(types.MAP_SHOW);
    },

    /**
     * 隐藏地图
     * @param commit
     */
    mapHide: function mapHide(_ref20) {
        var commit = _ref20.commit;

        commit(types.MAP_HIDE);
    },

    /**
     * 页面里搜索框的显示
     * @param commit
     */
    mapSearchShow: function mapSearchShow(_ref21) {
        var commit = _ref21.commit;

        commit(types.MAP_SEARCH_SHOW);
    },

    /**
     * 页面里搜索框的隐藏
     * @param commit
     */
    mapSearchHide: function mapSearchHide(_ref22) {
        var commit = _ref22.commit;

        commit(types.MAP_SEARCH_HIDE);
    },

    /**
     * 功能地图里面title的值
     * @param commit
     */
    mapTitleName: function mapTitleName(_ref23) {
        var commit = _ref23.commit;

        commit(types.MAP_TITLE);
    },

    /**
     * 定制功能里面title的值
     * @param commit
     */
    customTitleName: function customTitleName(_ref24) {
        var commit = _ref24.commit;

        commit(types.CUSTOM_TITLE_NAME);
    },

    /**
     * 判断跳转路径是否有用
     * @param dispatch
     * @param commit
     * @param reqData
     */
    isGoToURL: function isGoToURL(_ref25, _ref26) {
        var dispatch = _ref25.dispatch,
            commit = _ref25.commit;
        var reqData = _ref26.reqData;

        if (reqData.url) {
            _syncData2.default.isGoToURL(reqData, function (data) {
                var reqDate = data;
                if (reqDate) {
                    dispatch('promptShow', { reqDate: reqDate });
                }
            });
        }
    },

    /**
     * 显示新增文件框
     * @param commit
     */
    showPopup: function showPopup(_ref27) {
        var commit = _ref27.commit;

        commit(types.SHOW_POPUP);
    },

    /**
     * 隐藏新增文件框
     * @param commit
     */
    hidePopup: function hidePopup(_ref28) {
        var commit = _ref28.commit;

        commit(types.HIDE_POPUP);
    }
};
/**
 * @type {{[[types.MAP_TREE_LIST_DATA]]: ((state, {newData}:{newData: *})), [[types.MAP_LIST_DATA]]: ((state, {listData}:{listData: *})), [[types.MAP_TREE_DATA]]: ((state, {newData}:{newData: *})), [[types.FUNCTION_MAP_DATA]]: ((state, {newData}:{newData: *})), [[types.MAP_SHOW]]: ((state)), [[types.MAP_HIDE]]: ((state)), [[types.MAP_SEARCH_SHOW]]: ((state)), [[types.MAP_SEARCH_HIDE]]: ((state)), [[types.MAP_TITLE]]: ((state)), [[types.CUSTOM_TITLE_NAME]]: ((state)), [[types.SHOW_POPUP]]: ((state)), [[types.HIDE_POPUP]]: ((state))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.MAP_TREE_LIST_DATA, function (state, _ref29) {
    var newData = _ref29.newData;

    state.mapTreeListData = newData;
}), (0, _defineProperty3.default)(_mutations, types.MAP_LIST_DATA, function (state, _ref30) {
    var listData = _ref30.listData;

    state.mapListData = listData;
}), (0, _defineProperty3.default)(_mutations, types.MAP_TREE_DATA, function (state, _ref31) {
    var newData = _ref31.newData;

    state.mapTreeData = newData;
}), (0, _defineProperty3.default)(_mutations, types.FUNCTION_MAP_DATA, function (state, _ref32) {
    var newData = _ref32.newData;

    state.functionMapData = newData;
}), (0, _defineProperty3.default)(_mutations, types.MAP_SHOW, function (state) {
    state.mapVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.MAP_HIDE, function (state) {
    state.mapVisible = false;
}), (0, _defineProperty3.default)(_mutations, types.MAP_SEARCH_SHOW, function (state) {
    state.mapSearchVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.MAP_SEARCH_HIDE, function (state) {
    state.mapSearchVisible = false;
}), (0, _defineProperty3.default)(_mutations, types.MAP_TITLE, function (state) {
    state.mapTitle = '功能地图';
}), (0, _defineProperty3.default)(_mutations, types.CUSTOM_TITLE_NAME, function (state) {
    state.mapTitle = '更多业务和工具';
}), (0, _defineProperty3.default)(_mutations, types.SHOW_POPUP, function (state) {
    state.popupVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.HIDE_POPUP, function (state) {
    state.popupVisible = false;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 475 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{loginData: string}}
 */
/*********************************************************************
 * 登录信息操作                                                      *
 * Created by tr on 2017/7/9.                                        *
 *********************************************************************/
var state = {
    /*登录后的信息*/
    loginData: {}
};
/**
 * @type {{loginData: ((p1:*)=>string)}}
 */
var getters = {
    loginData: function loginData(state) {
        return state.loginData;
    }
};
/**
 * @type {{login: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), loginOut: (({dispatch,commit}:{dispatch: *, commit: *}))}}
 */
var actions = {
    /**
     * 登录方法
     * @param dispatch
     * @param commit
     * @param reqData
     */
    login: function login(_ref, _ref2) {
        var commit = _ref.commit;
        var reqData = _ref2.reqData;

        _syncData2.default.login(reqData, function (data) {
            var nowTableData = {};
            if (data.meta.code === 1) {
                sessionStorage.setItem('loginAccount', reqData.username);
                window.location.href = "#/index/1";
            } else {
                nowTableData.code = state.loginData.code ? state.loginData.code : 0 + data.meta.code;
                if (data.meta) {
                    nowTableData.msg = data.meta.message;
                } else {
                    nowTableData.msg = "网络出错";
                }

                commit(types.LOGIN_DATA, { nowTableData: nowTableData });
            }
        });
    },

    /**
     * 退出方法
     * @param dispatch
     * @param commit
     */
    loginOut: function loginOut(_ref3) {
        var dispatch = _ref3.dispatch,
            commit = _ref3.commit;

        _syncData2.default.loginOut();
        dispatch('closeSocketIo');
    }
};
/**
 * @type {{[[types.LOGIN_DATA]]: ((state, {nowTableData}:{nowTableData: *}))}}
 */
var mutations = (0, _defineProperty3.default)({}, types.LOGIN_DATA, function (state, _ref4) {
    var nowTableData = _ref4.nowTableData;

    state.loginData = nowTableData;
});
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 476 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = __webpack_require__(91);

var _stringify2 = _interopRequireDefault(_stringify);

var _mutations; /*********************************************************************
                 * 获取代办的数据                                                    *
                 * Created by tr on 2017/7/9.                                        *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

var _socket = __webpack_require__(477);

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{isFullScreen: boolean, backlogsData: Array, clientsData: Array, socket: string, currentStatus: number}}
 */
var state = {
    /*全屏是否显示*/
    isFullScreen: false,
    /*代办的数据*/
    backlogsData: [],
    /*事项来源的数据*/
    clientsData: [],
    /*socket的对象*/
    socket: {},
    /*当前是已处理还是未处理*/
    currentStatus: 0,
    backlogsTagsData: []
};
/**
 * @type {{isFullScreen: ((p1:*)=>boolean), backlogsData: ((p1:*)=>Array), clientsData: ((p1:*)=>Array), socket: ((p1:*)=>string), currentStatus: ((p1:*)=>number)}}
 */
var getters = {
    isFullScreen: function isFullScreen(state) {
        return state.isFullScreen;
    },
    backlogsData: function backlogsData(state) {
        return state.backlogsData;
    },
    clientsData: function clientsData(state) {
        return state.clientsData;
    },
    socket: function socket(state) {
        return state.socket;
    },
    currentStatus: function currentStatus(state) {
        return state.currentStatus;
    },
    backlogsTagsData: function backlogsTagsData(state) {
        return state.backlogsTagsData;
    }
};
/**
 * @type {{getBacklogsData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), getSocketIo: (({commit}:{commit: *}, {reqData}:{reqData: *})), closeSocketIo: (({commit}:{commit: *})), getClientsData: (({commit}:{commit: *}, {reqData}:{reqData?: *})), maxingFullScreen: (({commit}:{commit: *})), resetScreen: (({commit}:{commit: *}))}}
 */
var actions = {
    /**
     * 获取代办的数据
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getBacklogsData: function getBacklogsData(_ref, _ref2) {
        var dispatch = _ref.dispatch,
            commit = _ref.commit;
        var reqData = _ref2.reqData;

        _syncData2.default.getBacklogs(reqData, function (data) {
            dispatch('loadingHide');
            var newData = data;
            state.currentStatus = reqData.parameter.status;
            commit(types.BACK_LOGS_DATA, { newData: newData });
        });
    },

    /**
     * socket的链接
     * @param commit
     * @param reqData
     */
    getSocketIo: function getSocketIo(_ref3, _ref4) {
        var commit = _ref3.commit;
        var reqData = _ref4.reqData;

        state.socket = _socket2.default.connect(location.protocol + "//" + location.hostname + ':' + (location.port * 1 + 10) + '/', { 'connect timeout': 15000 });
        if (state.socket.connect) {
            state.socket.on('connect', function () {
                state.socket.emit('initEvent', reqData.executorId);
            });
            /*接受推送消息的数据*/
            state.socket.on('backlogEvent', function (data) {
                var newData = state.backlogsData;
                /*判断是不是新增*/
                if (data && state.executorId) {
                    var da = data;
                    var date = new Date().getTime() - new Date(data.createTime).getTime();
                    date = date / 1000 / 60;
                    var duration = '';
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
                    da.duration = duration;
                    /*新增代办信息*/
                    newData.data.splice(0, 0, da);
                    /*修改代办信息*/
                } else if (data && data.id) {
                    var newDataEle = [];
                    newData.data.map(function (item) {
                        var nItem = item;
                        if (nItem.backlogId === data.backlogId) {
                            nItem.status = data.status;
                        }
                        newDataEle.push(nItem);
                    });
                    newData.data = newDataEle;
                }
                commit(types.BACK_LOGS_DATA, { newData: newData });
            });
            state.socket.on('noticeEvent', function (data) {
                var newData = state.newsNoticeData;
                if (data) {
                    newData.total++;
                    newData.data.splice(0, 0, data);
                }
                commit(types.NEWS_NOTICE_DATA, { newData: newData });
            });
        } else {}
    },

    /**
     * 推送消息
     * @param commit
     * @param reqData
     */
    resourceSocketIo: function resourceSocketIo(_ref5, _ref6) {
        var commit = _ref5.commit;
        var reqData = _ref6.reqData;

        if (state.socket.connect) {
            state.socket.emit('resourceClickEvent', (0, _stringify2.default)(reqData));
        }
    },

    /**
     * 断开socket链接
     * @param commit
     */
    closeSocketIo: function closeSocketIo(_ref7) {
        var commit = _ref7.commit;

        state.socket.on('disconnect', function () {
            console.log("与服务其断开");
        });
    },

    /**
     * 获取事项来源的数据
     * @param commit
     * @param reqData
     */
    getClientsData: function getClientsData(_ref8, _ref9) {
        var commit = _ref8.commit;
        var reqData = _ref9.reqData;

        _syncData2.default.getClients(reqData, function (data) {
            var newData = data;
            commit(types.CLIENTS_DATA, { newData: newData });
        });
    },

    /**
     * 全屏数据的处理
     * @param commit
     */
    maxingFullScreen: function maxingFullScreen(_ref10) {
        var commit = _ref10.commit;

        commit(types.MAXING_FULL_SCREEN);
    },

    /**
     * 关闭全屏数据
     * @param commit
     */
    resetScreen: function resetScreen(_ref11) {
        var commit = _ref11.commit;

        commit(types.RESET_SCREEN);
    },
    getBacklogsTagData: function getBacklogsTagData(_ref12, _ref13) {
        var commit = _ref12.commit;
        var reqData = _ref13.reqData;

        _syncData2.default.getBacklogsTag(reqData, function (data) {
            var newData = data;
            commit(types.BACKLOGS_TAG_DATA, { newData: newData });
        });
    }
};
/**
 * @type {{[[types.BACK_LOGS_DATA]]: ((state, {newData}:{newData: *})), [[types.TODO_CLIENTS_DATA]]: ((state, {newData}:{newData: *})), [[types.MAXING_FULL_SCREEN]]: ((state)), [[types.RESET_SCREEN]]: ((state))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.BACK_LOGS_DATA, function (state, _ref14) {
    var newData = _ref14.newData;

    state.backlogsData = newData;
}), (0, _defineProperty3.default)(_mutations, types.CLIENTS_DATA, function (state, _ref15) {
    var newData = _ref15.newData;

    state.clientsData = newData;
}), (0, _defineProperty3.default)(_mutations, types.MAXING_FULL_SCREEN, function (state) {
    state.isFullScreen = true;
}), (0, _defineProperty3.default)(_mutations, types.NEWS_NOTICE_DATA, function (state, _ref16) {
    var newData = _ref16.newData;

    state.newsNoticeData = newData;
}), (0, _defineProperty3.default)(_mutations, types.RESET_SCREEN, function (state) {
    state.isFullScreen = false;
}), (0, _defineProperty3.default)(_mutations, types.BACKLOGS_TAG_DATA, function (state, _ref17) {
    var newData = _ref17.newData;

    state.backlogsTagsData = newData;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 477 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var url = __webpack_require__(478);
var parser = __webpack_require__(141);
var Manager = __webpack_require__(201);
var debug = __webpack_require__(94)('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup (uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__(201);
exports.Socket = __webpack_require__(206);


/***/ }),
/* 478 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module dependencies.
 */

var parseuri = __webpack_require__(197);
var debug = __webpack_require__(94)('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url (uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

  return obj;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 479 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(140);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(481);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = Object({"NODE_ENV":"production"}).DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)))

/***/ }),
/* 481 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(140);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 482 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 483 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__(199);
var isBuf = __webpack_require__(200);
var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 484 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(485);

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__(60);


/***/ }),
/* 485 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var transports = __webpack_require__(202);
var Emitter = __webpack_require__(59);
var debug = __webpack_require__(97)('engine.io-client:socket');
var index = __webpack_require__(205);
var parser = __webpack_require__(60);
var parseuri = __webpack_require__(197);
var parseqs = __webpack_require__(95);

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket (uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure
    : (global.location && 'https:' === location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port
      ? location.port
      : (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = typeof global === 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__(143);
Socket.transports = __webpack_require__(202);
Socket.parser = __webpack_require__(60);

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void (0)
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function () {
    self.onDrain();
  })
  .on('packet', function (packet) {
    self.onPacket(packet);
  })
  .on('error', function (e) {
    self.onError(e);
  })
  .on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen () {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport () {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror (err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose () {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose () {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade (to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup () {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState ||
      'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close () {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose () {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade () {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 486 */
/***/ (function(module, exports) {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),
/* 487 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module requirements.
 */

var XMLHttpRequest = __webpack_require__(142);
var Polling = __webpack_require__(203);
var Emitter = __webpack_require__(59);
var inherit = __webpack_require__(96);
var debug = __webpack_require__(97)('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty () {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR (opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== global.location.hostname ||
      port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request (opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    if (this.supportsBinary) {
      xhr.responseType = 'arraybuffer';
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (contentType !== 'application/octet-stream') {
              xhr.responseType = 'text';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      if (this.xhr.responseType === 'arraybuffer') {
        data = this.xhr.response || this.xhr.responseText;
      } else {
        data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
      }
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (global.document) {
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler () {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 488 */
/***/ (function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};


/***/ }),
/* 489 */
/***/ (function(module, exports) {

/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};


/***/ }),
/* 490 */
/***/ (function(module, exports) {

module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}


/***/ }),
/* 491 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint, strict) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			if (strict) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
			return false;
		}
		return true;
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint, strict) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			if (!checkScalarValue(codePoint, strict)) {
				codePoint = 0xFFFD;
			}
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint, strict);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol(strict) {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol(strict)) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return utf8;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(492)(module), __webpack_require__(10)))

/***/ }),
/* 492 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 493 */
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();


/***/ }),
/* 494 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 495 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(140);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 496 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module requirements.
 */

var Polling = __webpack_require__(203);
var inherit = __webpack_require__(96);

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 497 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var Transport = __webpack_require__(143);
var parser = __webpack_require__(60);
var parseqs = __webpack_require__(95);
var inherit = __webpack_require__(96);
var yeast = __webpack_require__(204);
var debug = __webpack_require__(97)('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = __webpack_require__(498);
  } catch (e) { }
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? (protocols ? new WebSocket(uri, protocols) : new WebSocket(uri)) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done () {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
    ('ws' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 498 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 499 */
/***/ (function(module, exports) {

module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}


/***/ }),
/* 500 */
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),
/* 501 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{newsDataValue: null}}
 */
/*********************************************************************
 * 获取新闻的数据                                                    *
 * Created by tr on 2017/7/9.                                        *
 *********************************************************************/
var state = {
    /*新闻的数据*/
    newsDataValue: null
};
/**
 * @type {{newsDataValue: ((p1:*)=>null)}}
 */
var getters = {
    newsDataValue: function newsDataValue(state) {
        return state.newsDataValue;
    }
};
/**
 * @type {{getNewsData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *}))}}
 */
var actions = {
    /**
     * 获取新闻的数据
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getNewsData: function getNewsData(_ref, _ref2) {
        var dispatch = _ref.dispatch,
            commit = _ref.commit;
        var reqData = _ref2.reqData;

        _syncData2.default.getNews(reqData, function (data) {
            var newData = data;
            dispatch('loadingHide');
            commit(types.NEWS_DATA_Value, { newData: newData });
        });
    }
};
/**
 * @type {{[[types.NEWS_DATA_Value]]: ((state, { newData }:{newData: *}))}}
 */
var mutations = (0, _defineProperty3.default)({}, types.NEWS_DATA_Value, function (state, _ref3) {
    var newData = _ref3.newData;

    state.newsDataValue = newData;
});
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 502 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 右边的所有数据方法                                                *
                 * Created by tr on 2017/7/9.                                        *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{rightModelVisible: boolean, showEditMask: boolean, rightModelPadding: string, componentListData: Array, addComponentVisible: boolean, isAssemblyVisible: boolean}}
 */
var state = {
    /*是否隐藏或显示右边数据*/
    rightModelVisible: true,
    /*点击编辑组件显示覆盖层 值定义*/
    showEditMask: false,
    /*右边模块的数据*/
    rightModelPadding: '',
    /*获取初始化的数据*/
    componentListData: [],
    /*是否显示新增组件的按钮*/
    addComponentVisible: false,
    /*判断是定制组件中*/
    isAssemblyVisible: false
};
/**
 * @type {{rightModelVisible: ((p1:*)=>boolean), showEditMask: ((p1:*)=>boolean), rightModelPadding: ((p1:*)=>string), componentListData: ((p1:*)=>Array), addComponentVisible: ((p1:*)=>boolean), isAssemblyVisible: ((p1:*)=>boolean)}}
 */
var getters = {
    rightModelVisible: function rightModelVisible(state) {
        return state.rightModelVisible;
    },
    showEditMask: function showEditMask(state) {
        return state.showEditMask;
    },
    rightModelPadding: function rightModelPadding(state) {
        return state.rightModelPadding;
    },
    componentListData: function componentListData(state) {
        return state.componentListData;
    },
    addComponentVisible: function addComponentVisible(state) {
        return state.addComponentVisible;
    },
    isAssemblyVisible: function isAssemblyVisible(state) {
        return state.isAssemblyVisible;
    }
};
/**
 * @type {{rightModelShow: (({commit}:{commit: *})), rightModelHide: (({commit}:{commit: *}))}}
 */
var actions = {
    /**
     * 允许拖动
     * @param commit
     */
    allowAssembly: function allowAssembly(_ref) {
        var commit = _ref.commit;

        commit(types.ALLOW_ASSEMBLY);
    },

    /**
     * 不允许拖动
     * @param commit
     */
    notAllowAssembly: function notAllowAssembly(_ref2) {
        var commit = _ref2.commit;

        commit(types.NOT_ALLOW_ASSEMBLY);
    },

    /**
     * 右边数据显示
     * @param commit
     */
    rightModelShow: function rightModelShow(_ref3) {
        var commit = _ref3.commit;

        commit(types.RIGHT_MODEL_SHOW);
    },

    /**
     * 右边的数据隐藏
     * @param commit
     */
    rightModelHide: function rightModelHide(_ref4) {
        var commit = _ref4.commit;

        commit(types.RIGHT_MODEL_HIDE);
    },

    /**
     * 显示编辑组件
     * @param commit
     */
    showEditMaskFun: function showEditMaskFun(_ref5) {
        var commit = _ref5.commit;

        commit(types.SHOW_EDIT_MASK);
    },

    /**
     * 隐藏编辑组件
     * @param commit
     */
    hideEditMaskFun: function hideEditMaskFun(_ref6) {
        var commit = _ref6.commit;

        commit(types.HIDE_EDIT_MASK);
    },

    /**
     * 显示右边数据
     * @param commit
     */
    rightModelPaddingFun: function rightModelPaddingFun(_ref7) {
        var commit = _ref7.commit;

        commit(types.RIGHT_MODEL_PADDING);
    },

    /**
     * 隐藏右边
     * @param commit
     */
    hideRightModelPaddingFun: function hideRightModelPaddingFun(_ref8) {
        var commit = _ref8.commit;

        commit(types.HIDE_RIGHT_MODEL_PADDING);
    },

    /**
     * 获取组件列表getComponentList
     * @param commit
     * @param reqData
     */
    getComponentListFun: function getComponentListFun(_ref9, _ref10) {
        var commit = _ref9.commit;
        var reqData = _ref10.reqData;

        _syncData2.default.getComponentList(reqData, function (data) {
            var newData = [];
            if (data.length > 0) {
                data.map(function (item) {
                    var newItem = item;
                    newItem.data = '';
                    newData.push(newItem);
                    _syncData2.default.getEchartsData({ id: item.id, url: item.dataUrl }, function (da) {
                        newData.map(function (it) {
                            if (it.id === da.id) {
                                it.data = da.data;
                            }
                        });
                    });
                });
                commit(types.COMPONENT_LIST_MUN, { newData: newData });
            }
        });
    },

    /**
     * 拖动后，设置组件排序
     * @param commit
     * @param reqOderData
     */
    setComponentOderFun: function setComponentOderFun(_ref11, _ref12) {
        var commit = _ref11.commit;
        var reqOderData = _ref12.reqOderData;

        _syncData2.default.setComponentOder(reqOderData, function (data) {});
    },

    /**
     * 显示增加组件按钮
     * @param commit
     */
    showAddComponentFun: function showAddComponentFun(_ref13) {
        var commit = _ref13.commit;

        commit(types.SHOW_ADD_COMPONENT);
    },

    /**
     * 隐藏增加组件按钮
     * @param commit
     */
    hideAddComponentFun: function hideAddComponentFun(_ref14) {
        var commit = _ref14.commit;

        commit(types.HIDE_ADD_COMPONENT);
    }
};
/**
 * @type {{[[types.ALLOW_ASSEMBLY]]: ((state)), [[types.NOT_ALLOW_ASSEMBLY]]: ((state)), [[types.RIGHT_MODEL_SHOW]]: ((state)), [[types.RIGHT_MODEL_HIDE]]: ((state)), [[types.SHOW_EDIT_MASK]]: ((state)), [[types.HIDE_EDIT_MASK]]: ((state)), [[types.RIGHT_MODEL_PADDING]]: ((state)), [[types.HIDE_RIGHT_MODEL_PADDING]]: ((state)), [[types.COMPONENT_LIST_MUN]]: ((state, {newData}:{newData: *})), [[types.SHOW_ADD_COMPONENT]]: ((state)), [[types.HIDE_ADD_COMPONENT]]: ((state))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.ALLOW_ASSEMBLY, function (state) {
    state.isAssemblyVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.NOT_ALLOW_ASSEMBLY, function (state) {
    state.isAssemblyVisible = false;
}), (0, _defineProperty3.default)(_mutations, types.RIGHT_MODEL_SHOW, function (state) {
    state.rightModelVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.RIGHT_MODEL_HIDE, function (state) {
    state.rightModelVisible = false;
}), (0, _defineProperty3.default)(_mutations, types.SHOW_EDIT_MASK, function (state) {
    state.showEditMask = true;
}), (0, _defineProperty3.default)(_mutations, types.HIDE_EDIT_MASK, function (state) {
    state.showEditMask = false;
}), (0, _defineProperty3.default)(_mutations, types.RIGHT_MODEL_PADDING, function (state) {
    state.rightModelPadding = 'rightModelPadding';
}), (0, _defineProperty3.default)(_mutations, types.HIDE_RIGHT_MODEL_PADDING, function (state) {
    state.rightModelPadding = '';
}), (0, _defineProperty3.default)(_mutations, types.COMPONENT_LIST_MUN, function (state, _ref15) {
    var newData = _ref15.newData;

    state.componentListData = newData;
}), (0, _defineProperty3.default)(_mutations, types.SHOW_ADD_COMPONENT, function (state) {
    state.addComponentVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.HIDE_ADD_COMPONENT, function (state) {
    state.addComponentVisible = false;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 503 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 日历时间控件                                                      *
                 * Created by tr on 2017/6/22.                                       *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{calendarData: Array, calendarNowDate: string, calendarPickDate: string, calendarShow: boolean, calendarPosTop: number, calendarPosLeft: number, calendarParentId: string, calendarCallback: null, calendarShowDate: string, needHour: boolean}}
 */
var state = {
    /*所有的日期*/
    calendarData: [],
    /*当前的日期*/
    calendarNowDate: '',
    /*选择的日期*/
    calendarPickDate: '',
    /*是否显示日期控件*/
    calendarShow: false,
    /*距离顶部的位置*/
    calendarPosTop: 0,
    /*距离左边的位置*/
    calendarPosLeft: 0,
    /*父级的Id值*/
    calendarParentId: '',
    /*回收数据*/
    calendarCallback: null,
    /*应该显示的数据*/
    calendarShowDate: '',
    /*是否需要小时*/
    needHour: false
};
/**
 * @type {{calendarData: ((p1:*)=>Array), calendarNowDate: ((p1:*)=>string), calendarPickDate: ((p1:*)=>string), calendarShow: ((p1:*)=>boolean), calendarPosTop: ((p1:*)=>number), calendarPosLeft: ((p1:*)=>number), calendarParentId: ((p1:*)=>string), calendarCallback: ((p1:*)=>null), calendarShowDate: ((p1:*)=>string), needHour: ((p1:*)=>boolean)}}
 */
var getters = {
    calendarData: function calendarData(state) {
        return state.calendarData;
    },
    calendarNowDate: function calendarNowDate(state) {
        return state.calendarNowDate;
    },
    calendarPickDate: function calendarPickDate(state) {
        return state.calendarPickDate;
    },
    calendarShow: function calendarShow(state) {
        return state.calendarShow;
    },
    calendarPosTop: function calendarPosTop(state) {
        return state.calendarPosTop;
    },
    calendarPosLeft: function calendarPosLeft(state) {
        return state.calendarPosLeft;
    },
    calendarParentId: function calendarParentId(state) {
        return state.calendarParentId;
    },
    calendarCallback: function calendarCallback(state) {
        return state.calendarCallback;
    },
    calendarShowDate: function calendarShowDate(state) {
        return state.calendarShowDate;
    },
    needHour: function needHour(state) {
        return state.needHour;
    }
};
/**
 * @type {{calendarCellClick: (({commit}:{commit: *}, evt)), calendarToggleEvt: (({commit, dispatch}:{commit: *, dispatch: *}, { calendarStartTime, calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback }:{calendarStartTime?: *, calendarParentId: *, calendarPosTop?: *, calendarPosLeft: *, calendarCallback: *})), initCalendar: (({commit, dispatch}:{commit: *, dispatch: *}, { calendarStartTime, needHour }:{calendarStartTime: *, needHour: *})), calculateCalendarData: (({commit}:{commit: *}, { calendarStartTime }:{calendarStartTime?: *})), calendarPreMonthEvt: (({dispatch}:{dispatch: *})), calendarNextMonthEvt: (({dispatch}:{dispatch: *})), calendarHiddenEvt: (({commit}:{commit: *}))}}
 */
var actions = {
    /**
     *日历单元格单击
     * @param commit
     * @param evt
     */
    calendarCellClick: function calendarCellClick(_ref, evt) {
        var commit = _ref.commit;

        var calendarStartTime = evt.target.getAttribute('now-date');
        if (state.calendarCallback && state.calendarCallback.constructor == Function) state.calendarCallback(calendarStartTime);
        commit(types.CALENDAR_NOW, { calendarStartTime: calendarStartTime });
        commit(types.CALENDAR_SHOW);
    },

    /**
     * 日历相互切换的事件
     * @param commit
     * @param dispatch
     * @param calendarStartTime
     * @param calendarParentId
     * @param calendarPosTop
     * @param calendarPosLeft
     * @param calendarCallback
     */
    calendarToggleEvt: function calendarToggleEvt(_ref2, _ref3) {
        var commit = _ref2.commit,
            dispatch = _ref2.dispatch;
        var calendarStartTime = _ref3.calendarStartTime,
            calendarParentId = _ref3.calendarParentId,
            calendarPosTop = _ref3.calendarPosTop,
            calendarPosLeft = _ref3.calendarPosLeft,
            calendarCallback = _ref3.calendarCallback;

        calendarPosTop = parseInt(calendarPosTop) + 40;
        if (!calendarStartTime || calendarStartTime === '') {
            var dd = new Date();
            var m = dd.getMonth() + 1;
            m = m > 9 ? m : '0' + m;
            var cd = dd.getDate();
            cd = cd > 9 ? cd : '0' + cd;
            calendarStartTime = dd.getFullYear() + '-' + m + '-' + cd;
        }
        if (state.calendarShow) {
            commit(types.CALENDAR_SHOW);
            if (state.calendarParentId !== calendarParentId) {
                commit(types.CALENDAR_PROP, { calendarParentId: calendarParentId, calendarPosTop: calendarPosTop, calendarPosLeft: calendarPosLeft, calendarCallback: calendarCallback });
                dispatch('initCalendar', { calendarStartTime: calendarStartTime });
            }
        } else {
            commit(types.CALENDAR_PROP, { calendarParentId: calendarParentId, calendarPosTop: calendarPosTop, calendarPosLeft: calendarPosLeft, calendarCallback: calendarCallback });
            dispatch('initCalendar', { calendarStartTime: calendarStartTime });
        }
    },

    /**
     * 初始化日历控件
     * @param commit
     * @param dispatch
     * @param calendarStartTime
     * @param needHour
     */
    initCalendar: function initCalendar(_ref4, _ref5) {
        var commit = _ref4.commit,
            dispatch = _ref4.dispatch;
        var calendarStartTime = _ref5.calendarStartTime,
            needHour = _ref5.needHour;

        commit(types.CALENDAR_NOW, { calendarStartTime: calendarStartTime, needHour: needHour });
        dispatch('calculateCalendarData', { calendarStartTime: calendarStartTime });
        commit(types.CALENDAR_SHOW);
    },

    /**
     * 计算日历数据
     * @param commit
     * @param calendarStartTime
     */
    calculateCalendarData: function calculateCalendarData(_ref6, _ref7) {
        var commit = _ref6.commit;
        var calendarStartTime = _ref7.calendarStartTime;

        /**
         * 计算得到当前的时间
         * @param date
         * @returns {string}
         */
        function getDate(date) {
            if (date && date.constructor === String) {
                date = date.replace(/-/gi, '/');
            }
            var dd = new Date(date);
            var m = dd.getMonth() + 1;
            m = m > 9 ? m : '0' + m;
            var cd = dd.getDate();
            cd = cd > 9 ? cd : '0' + cd;
            return dd.getFullYear() + '-' + m + '-' + cd;
        }

        /*现在的时间*/
        var nowPick = state.calendarNowDate;
        calendarStartTime = getDate(calendarStartTime);
        /*日历开始的时间*/
        var calendarShowDate = calendarStartTime;
        commit(types.CALENDAR_SHOW_DATE, { calendarShowDate: calendarShowDate });
        commit(types.CALENDAR_PICK, { calendarStartTime: calendarStartTime });
        var arr = [];
        var st = calendarStartTime.replace(/-/gi, '/');
        var d = new Date(st);
        /*当前月份的时间*/
        var cMax = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        /*上一个月月份的时间*/
        var pMax = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
        var w = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
        w = w === 0 ? 7 : w;
        for (var i = pMax - w; i < pMax; i++) {
            var nowDate = getDate(new Date(d.getFullYear(), d.getMonth() - 1, i + 1));
            arr.push({ txt: i + 1, date: nowDate, other: 'y', cls: nowDate === nowPick ? 'active' : '' });
        }
        for (var _i = 1; _i <= cMax; _i++) {
            var _nowDate = getDate(new Date(d.getFullYear(), d.getMonth(), _i));
            arr.push({ txt: _i, date: _nowDate, other: 'n', cls: _nowDate === nowPick ? 'active' : '' });
        }
        var nd = 42 - arr.length;
        for (var _i2 = 1; _i2 <= nd; _i2++) {
            var _nowDate2 = getDate(new Date(d.getFullYear(), d.getMonth() + 1, _i2));
            arr.push({ txt: _i2, date: _nowDate2, other: 'y', cls: _nowDate2 === nowPick ? 'active' : '' });
        }
        var calendarData = [];
        for (var _i3 = 0; _i3 < 6; _i3++) {
            var c = [];
            for (var k = 0; k < 7; k++) {
                c.push(arr[_i3 * 7 + k]);
            }
            calendarData.push(c);
        }
        commit(types.CALENDAR_DATA, { calendarData: calendarData });
    },

    /**
     * 计算日历的上一个月份值
     * @param dispatch
     */
    calendarPreMonthEvt: function calendarPreMonthEvt(_ref8) {
        var dispatch = _ref8.dispatch;

        var calendarStartTime = new Date(state.calendarPickDate.replace(/-/gi, '/'));
        calendarStartTime = new Date(calendarStartTime.getFullYear(), calendarStartTime.getMonth() - 1, 1);
        dispatch('calculateCalendarData', { calendarStartTime: calendarStartTime });
    },

    /**
     * 计算日历的下一个月份值
     * @param dispatch
     */
    calendarNextMonthEvt: function calendarNextMonthEvt(_ref9) {
        var dispatch = _ref9.dispatch;

        var calendarStartTime = new Date(state.calendarPickDate.replace(/-/gi, '/'));
        calendarStartTime = new Date(calendarStartTime.getFullYear(), calendarStartTime.getMonth() + 1, 1);
        dispatch('calculateCalendarData', { calendarStartTime: calendarStartTime });
    },

    /**
     * 是否显示日历控件
     * @param commit
     */
    calendarHiddenEvt: function calendarHiddenEvt(_ref10) {
        var commit = _ref10.commit;

        commit(types.CALENDAR_SHOW);
    }
};
/**
 * @type {{[[types.CALENDAR_DATA]]: ((state, {calendarData}:{calendarData: *})), [[types.CALENDAR_NOW]]: ((state, {calendarStartTime, needHour}:{calendarStartTime: *, needHour: *})), [[types.CALENDAR_PICK]]: ((state, {calendarStartTime}:{calendarStartTime: *})), [[types.CALENDAR_SHOW]]: ((state)), [[types.CALENDAR_SHOW_DATE]]: ((state, {calendarShowDate}:{calendarShowDate: *})), [[types.CALENDAR_PROP]]: ((state, {calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback}:{calendarParentId: *, calendarPosTop: *, calendarPosLeft: *, calendarCallback: *}))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.CALENDAR_DATA, function (state, _ref11) {
    var calendarData = _ref11.calendarData;

    state.calendarData = calendarData;
}), (0, _defineProperty3.default)(_mutations, types.CALENDAR_NOW, function (state, _ref12) {
    var calendarStartTime = _ref12.calendarStartTime,
        needHour = _ref12.needHour;

    state.needHour = needHour;
    state.calendarShowDate = calendarStartTime;
    state.calendarNowDate = calendarStartTime;
}), (0, _defineProperty3.default)(_mutations, types.CALENDAR_PICK, function (state, _ref13) {
    var calendarStartTime = _ref13.calendarStartTime;

    state.calendarPickDate = calendarStartTime;
}), (0, _defineProperty3.default)(_mutations, types.CALENDAR_SHOW, function (state) {
    state.calendarShow = !state.calendarShow;
}), (0, _defineProperty3.default)(_mutations, types.CALENDAR_SHOW_DATE, function (state, _ref14) {
    var calendarShowDate = _ref14.calendarShowDate;

    state.calendarShowDate = calendarShowDate;
}), (0, _defineProperty3.default)(_mutations, types.CALENDAR_PROP, function (state, _ref15) {
    var calendarParentId = _ref15.calendarParentId,
        calendarPosTop = _ref15.calendarPosTop,
        calendarPosLeft = _ref15.calendarPosLeft,
        calendarCallback = _ref15.calendarCallback;

    state.calendarParentId = calendarParentId;
    state.calendarPosTop = calendarPosTop;
    state.calendarPosLeft = calendarPosLeft;
    state.calendarCallback = calendarCallback;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 504 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = __webpack_require__(91);

var _stringify2 = _interopRequireDefault(_stringify);

var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{listData: Array}}
 */
/*********************************************************************
 * 新用户的列表                                                      *
 * Created by tr on 2017/7/7.                                        *
 *********************************************************************/
var state = {
    listData: []
};
/**
 * @type {{listData: ((p1:*)=>Array)}}
 */
var getters = {
    listData: function listData(state) {
        return state.listData;
    }
};
/**
 * @type {{getListData: (({dispatch,commit}:{dispatch: *, commit: *}, {reqData}:{reqData?: *})), getElementsData: (({dispatch,commit}:{dispatch?: *, commit: *}, {reqData}:{reqData?: *}))}}
 */
var actions = {
    /**
     * 获取新用户的操作
     * @param dispatch
     * @param commit
     * @param reqData
     */
    getElementsData: function getElementsData(_ref, _ref2) {
        var dispatch = _ref.dispatch,
            commit = _ref.commit;
        var reqData = _ref2.reqData;

        _syncData2.default.getElements(reqData, function (data) {
            var list = data;
            var newData = [];
            if (list) {
                list.map(function (da) {
                    var reqD = (0, _stringify2.default)({
                        accessUrl: da.accessUrl
                    });
                    _syncData2.default.geData(reqD, function (d) {
                        dispatch('loadingHide');
                        newData.push({
                            name: da.resName,
                            data: d
                        });
                    });
                });
            }
            commit(types.LIST_DATA, { newData: newData });
        });
    }
};
/**
 * @type {{[[types.LIST_DATA]]: ((state, {newData}:{newData: *}))}}
 */
var mutations = (0, _defineProperty3.default)({}, types.LIST_DATA, function (state, _ref3) {
    var newData = _ref3.newData;

    state.listData = newData;
});
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 505 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 成功和失败的提示                                                  *
                 * Created by tr on 2017/7/9.                                        *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{promptVisible: boolean, promptData: string}}
 */
var state = {
    /*是否显示或隐藏*/
    promptVisible: false,
    /*提示的数据*/
    promptData: ''
};
/**
 * @type {{promptVisible: ((p1:*)=>boolean), promptData: ((p1:*)=>string)}}
 */
var getters = {
    promptVisible: function promptVisible(state) {
        return state.promptVisible;
    },
    promptData: function promptData(state) {
        return state.promptData;
    }
};
/**
 * @type {{promptShow: (({dispatch,commit}:{dispatch: *, commit: *}, {reqDate}:{reqDate: *})), promptHide: (({commit}:{commit: *}))}}
 */
var actions = {
    /*显示提示框*/
    promptShow: function promptShow(_ref, _ref2) {
        var dispatch = _ref.dispatch,
            commit = _ref.commit;
        var reqDate = _ref2.reqDate;

        var reqData = reqDate;
        commit(types.PROMPT_SHOW);
        commit(types.PROMPT_DATA, { reqData: reqData });
        setTimeout(function () {
            dispatch('promptHide');
        }, 2000);
    },

    /*隐藏提示框*/
    promptHide: function promptHide(_ref3) {
        var commit = _ref3.commit;

        var reqData = '';
        commit(types.PROMPT_HIDE);
        commit(types.PROMPT_DATA, { reqData: reqData });
    }
};
/**
 * @type {{[[types.PROMPT_SHOW]]: ((state)), [[types.PROMPT_DATA]]: ((state, {reqData}:{reqData: *})), [[types.PROMPT_HIDE]]: ((state))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.PROMPT_SHOW, function (state) {
    state.promptVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.PROMPT_DATA, function (state, _ref4) {
    var reqData = _ref4.reqData;

    state.promptData = reqData;
}), (0, _defineProperty3.default)(_mutations, types.PROMPT_HIDE, function (state) {
    state.promptVisible = false;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 506 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 编辑组件                                                          *
                 * Created by ytt on 2017/07/26                                      *
                 * Modified by tr on 2017/08/21                                      *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{appsResourcesData: Array, setAddComponentData: number}}
 */
var state = {
    /*获取所有业务对应下的功能*/
    appsResourcesData: [],
    /*新增后返回的数据*/
    setAddComponentData: 0
};
/**
 * @type {{appsResourcesData: ((p1:*)=>Array), setAddComponentData: ((p1:*)=>number)}}
 */
var getters = {
    appsResourcesData: function appsResourcesData(state) {
        return state.appsResourcesData;
    },
    setAddComponentData: function setAddComponentData(state) {
        return state.setAddComponentData;
    }
};
/**
 * @type {{appsResources: (({commit}:{commit: *})), setAddComponentFun: (({dispatch,commit}:{dispatch: *, commit: *}, {reqAddData}:{reqAddData?: *}))}}
 */
var actions = {
    /**
     * 获取所有业务对应下的功能
     * @param commit
     */
    appsResources: function appsResources(_ref) {
        var commit = _ref.commit;

        _syncData2.default.getAppsResources(function (data) {
            commit(types.MU_APPS_RESOURCES, { data: data });
        });
    },

    /**
     * 新增组件的信息
     * @param commit
     * @param reqAddData
     */
    setAddComponentFun: function setAddComponentFun(_ref2, _ref3) {
        var commit = _ref2.commit;
        var reqAddData = _ref3.reqAddData;

        _syncData2.default.setAddComponent(reqAddData, function (data) {
            var setData = data.meta.code == 1 ? data.meta.code * 1 + state.setAddComponentData : 0;
            commit(types.ADD_COMPONENT_DATA, { setData: setData });
        });
    }
};
/**
 * @type {{[[types.MU_APPS_RESOURCES]]: ((state, {data}:{data: *})), [[types.ADD_COMPONENT_DATA]]: ((state, {setData}:{setData: *}))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.MU_APPS_RESOURCES, function (state, _ref4) {
    var data = _ref4.data;

    state.appsResourcesData = data;
}), (0, _defineProperty3.default)(_mutations, types.ADD_COMPONENT_DATA, function (state, _ref5) {
    var setData = _ref5.setData;

    state.setAddComponentData = setData;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 507 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 编辑eCharts数据                                                   *
                 * Created by ytt on 2017/07/28                                      *
                 * Modified by tr on 2017/08/21                                      *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{getIdComponentData: number, getIdEditData: number, getIdListData: string}}
 */
var state = {
    /*删除组件的数据  */
    getIdComponentData: 0,
    /*更新组件的数据*/
    getIdEditData: 0,
    /*查询单个组件的数据*/
    getIdListData: ''
};
/**
 * @type {{getIdComponentData: ((p1:*)=>number), getIdEditData: ((p1:*)=>number), getIdListData: ((p1:*)=>string)}}
 */
var getters = {
    getIdComponentData: function getIdComponentData(state) {
        return state.getIdComponentData;
    },
    getIdEditData: function getIdEditData(state) {
        return state.getIdEditData;
    },
    getIdListData: function getIdListData(state) {
        return state.getIdListData;
    }
};
/**
 * @type {{getIdComponentFun: (({commit}:{commit: *}, {reqData}:{reqData?: *}))}}
 */
var actions = {
    /**
     * 获取组件里面的数据
     * @param commit
     * @param reqData
     */
    getIdComponentFun: function getIdComponentFun(_ref, _ref2) {
        var commit = _ref.commit;
        var reqData = _ref2.reqData;

        _syncData2.default.getIdComponent(reqData, function (data) {
            /*更新组件的数据*/
            if (reqData.type === "put") {
                var getIdEditData = data.meta.code * 1 === 1 ? data.meta.code * 1 + state.getIdEditData : 0;
                commit(types.GET_ID_EDIT_DATA, { getIdEditData: getIdEditData });
            } else if (reqData.type === "delete") {
                /*删除组件里面的数据*/
                var resData = data.meta.code * 1 === 1 ? data.meta.code * 1 + state.getIdComponentData : 0;
                commit(types.GET_ID_COMPONENT, { resData: resData });
            } else {
                /*获取组件里面的数据*/
                var _resData = data.data;
                commit(types.GET_ID_LIST_DATA, { resData: _resData });
            }
        });
    }
};
/**
 * @type {{[[types.GET_ID_COMPONENT]]: ((state, {resData}:{resData: *})), [[types.GET_ID_EDIT_DATA]]: ((state, {getIdEditData}:{getIdEditData: *})), [[types.GET_ID_LIST_DATA]]: ((state, {resData}:{resData: *}))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.GET_ID_COMPONENT, function (state, _ref3) {
    var resData = _ref3.resData;

    state.getIdComponentData = resData;
}), (0, _defineProperty3.default)(_mutations, types.GET_ID_EDIT_DATA, function (state, _ref4) {
    var getIdEditData = _ref4.getIdEditData;

    state.getIdEditData = getIdEditData;
}), (0, _defineProperty3.default)(_mutations, types.GET_ID_LIST_DATA, function (state, _ref5) {
    var resData = _ref5.resData;

    state.getIdListData = resData;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 508 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 修改密码的操作                                                    *
                 * Created by tr on 2017/8/4.                                        *
                 *********************************************************************/


var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{resetPwdData: string, pwdVisible: boolean}}
 */
var state = {
    /*修改密码返回的数据*/
    resetPwdData: '',
    /*是否打开修改密码页面*/
    pwdVisible: false
};
/**
 * @type {{resetPwdData: ((p1:*)=>string), pwdVisible: ((p1:*)=>boolean)}}
 */
var getters = {
    resetPwdData: function resetPwdData(state) {
        return state.resetPwdData;
    },
    pwdVisible: function pwdVisible(state) {
        return state.pwdVisible;
    }
};
/**
 * @type {{getResetPwd: (({commit}:{commit: *}, {reqData}:{reqData?: *})), showResetPwd: (({commit}:{commit: *})), hideResetPwd: (({commit}:{commit: *}))}}
 */
var actions = {
    /**
     * 修改密码的操作
     * @param commit
     * @param reqData
     */
    getResetPwd: function getResetPwd(_ref, _ref2) {
        var commit = _ref.commit;
        var reqData = _ref2.reqData;

        _syncData2.default.resetPwd(reqData, function (data) {
            var newData = data;
            newData.code = newData.code === 1 ? state.resetPwdData.code * 1 + newData.code : 0;
            commit(types.RESET_PWD_DATA, { newData: newData });
        });
    },

    /**
     * 打开修改密码页面
     * @param commit
     */
    showResetPwd: function showResetPwd(_ref3) {
        var commit = _ref3.commit;

        commit(types.SHOW_RESET_PWD);
    },

    /**
     * 关闭修改密码页面
     * @param commit
     */
    hideResetPwd: function hideResetPwd(_ref4) {
        var commit = _ref4.commit;

        commit(types.HIDE_RESET_PWD);
    }
};
/**
 * @type {{[[types.RESET_PWD_DATA]]: ((state, {newData}:{newData: *})), [[types.SHOW_RESET_PWD]]: ((state)), [[types.HIDE_RESET_PWD]]: ((state))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.RESET_PWD_DATA, function (state, _ref5) {
    var newData = _ref5.newData;

    state.resetPwdData = newData;
}), (0, _defineProperty3.default)(_mutations, types.SHOW_RESET_PWD, function (state) {
    state.pwdVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.HIDE_RESET_PWD, function (state) {
    state.pwdVisible = false;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 509 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{mapPowerData: string}}
 */
/*********************************************************************
 * 获取本地的echarts数据                                             *
 * Created by ytt on 2017/07/26                                      *
 * Modified by tr on 2017/08/21                                      *
 *********************************************************************/
var state = {
    /*获取地图的数据*/
    mapPowerData: ''
};
/**
 * @type {{mapPowerData: ((p1:*)=>string)}}
 */
var getters = {
    mapPowerData: function mapPowerData(state) {
        return state.mapPowerData;
    }
};
/**
 * @type {{getMapPowerDataFun: (({commit}:{commit: *}))}}
 */
var actions = {
    /**
     * 获取地图的数据
     * @param commit
     */
    getMapPowerDataFun: function getMapPowerDataFun(_ref) {
        var commit = _ref.commit;

        _syncData2.default.getMapPowerData(function (data) {
            commit(types.MAP_POWER_DATA, { data: data });
        });
    }
};
/**
 * @type {{[[types.MAP_POWER_DATA]]: ((state, {data}:{data: *}))}}
 */
var mutations = (0, _defineProperty3.default)({}, types.MAP_POWER_DATA, function (state, _ref2) {
    var data = _ref2.data;

    state.mapPowerData = data;
});
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 510 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 消息通知的数据操作                                                *
                 * Created by tr on 2017/11/1.                                       *
                 *********************************************************************/

var _mutationTypes = __webpack_require__(12);

var types = _interopRequireWildcard(_mutationTypes);

var _syncData = __webpack_require__(18);

var _syncData2 = _interopRequireDefault(_syncData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {{newsListVisible: boolean}}
 */
var state = {
    /*消息通知页面的状态*/
    newsListVisible: false,
    /*消息通知页面的数据*/
    newsNoticeData: {},
    /*未读消息数据*/
    noNoticeData: {},
    /*消息通知来源的数据*/
    sendersData: [],
    /*忽略所有数据*/
    deleteAll: {},
    /*根据ID忽略数据*/
    deleteId: {},
    /*用户操作栏*/
    userVisible: true
};
/**
 * @type {{newsListVisible: ((p1:*)=>boolean)}}
 */
var getters = {
    newsListVisible: function newsListVisible(state) {
        return state.newsListVisible;
    },
    newsNoticeData: function newsNoticeData(state) {
        return state.newsNoticeData;
    },
    noNoticeData: function noNoticeData(state) {
        return state.noNoticeData;
    },
    sendersData: function sendersData(state) {
        return state.sendersData;
    },
    deleteAll: function deleteAll(state) {
        return state.deleteAll;
    },
    deleteId: function deleteId(state) {
        return state.deleteId;
    },
    userVisible: function userVisible(state) {
        return state.userVisible;
    }
};
/**
 * @type {{showNews: (({commit}:{commit: *})), hideNews: (({commit}:{commit: *})), getNewsNoticeData: (({commit}:{commit: *}, {reqData}:{reqData?: *})), getSendersData: (({commit}:{commit: *}))}}
 */
var actions = {
    /**
     * 显示消息通知
     * @param commit
     */
    showNews: function showNews(_ref) {
        var commit = _ref.commit;

        commit(types.SHOW_NEWS_NOTICE);
    },

    /**
     * 关闭消息通知
     * @param commit
     */
    hideNews: function hideNews(_ref2) {
        var commit = _ref2.commit;

        commit(types.HIDE_NEWS_NOTICE);
    },

    /**
     * 获取条件查询系统通知消息
     * @param commit
     * @param reqData
     */
    getNewsNoticeData: function getNewsNoticeData(_ref3, _ref4) {
        var commit = _ref3.commit;
        var reqData = _ref4.reqData;

        _syncData2.default.getNotices(reqData, function (data) {
            var newData = {};
            var isBool = true;
            if (data) {
                newData.total = data.total;
                newData.data = [];
                if (data.data) {
                    data.data.map(function (item) {
                        var newItem = item;
                        isBool = !item.state;
                        /*判断是不是选择当前数据*/
                        newItem.selectState = false;
                        newItem.check = false;
                        newData.data.push(newItem);
                    });
                }
            }
            !isBool || commit(types.NEWS_NO_NOTICE_DATA, { newData: newData });
            commit(types.NEWS_NOTICE_DATA, { newData: newData });
        });
    },

    /**
     * 获取查询通知消息来源
     * @param commit
     */
    getSendersData: function getSendersData(_ref5) {
        var commit = _ref5.commit;

        _syncData2.default.getSenders(function (data) {
            var newData = [];
            if (data) {
                newData = data;
            }
            commit(types.SENDERS_DATA, { newData: newData });
        });
    },

    /**
     * 全部忽略
     * @param commit
     */
    deleteAllNoticeData: function deleteAllNoticeData(_ref6) {
        var commit = _ref6.commit;

        _syncData2.default.deleteAllNotice(function (data) {
            var newData = [];
            if (data) {
                newData = data;
            }
            commit(types.DELETE_ALL_SENDERS_DATA, { newData: newData });
        });
    },

    /**
     * 根据ID忽略
     * @param commit
     */
    deleteIdNoticeData: function deleteIdNoticeData(_ref7, _ref8) {
        var commit = _ref7.commit;
        var reqData = _ref8.reqData;

        _syncData2.default.deleteIdNotice(reqData, function (data) {
            var newData = [];
            if (data) {
                newData = data;
            }
            commit(types.DELETE_ID_SENDERS_DATA, { newData: newData });
        });
    },

    /**
     * 显示用户操作栏
     */
    showUserVisible: function showUserVisible(_ref9) {
        var commit = _ref9.commit;

        commit(types.SHOW_USER_VISIBLE);
    },

    /**
     * 隐藏用户操作栏
     */
    hideUserVisible: function hideUserVisible(_ref10) {
        var commit = _ref10.commit;

        commit(types.HIDE_USER_VISIBLE);
    }
};
/**
 * @type {{[[types.SHOW_NEWS_NOTICE]]: ((state)), [[types.HIDE_NEWS_NOTICE]]: ((state)), [[types.NEWS_NOTICE_DATA]]: ((state, {newData}:{newData: *})), [[types.SENDERS_DATA]]: ((state, {newData}:{newData: *}))}}
 */
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, types.SHOW_NEWS_NOTICE, function (state) {
    state.newsListVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.HIDE_NEWS_NOTICE, function (state) {
    state.newsListVisible = false;
}), (0, _defineProperty3.default)(_mutations, types.NEWS_NOTICE_DATA, function (state, _ref11) {
    var newData = _ref11.newData;

    state.newsNoticeData = newData;
}), (0, _defineProperty3.default)(_mutations, types.NEWS_NO_NOTICE_DATA, function (state, _ref12) {
    var newData = _ref12.newData;

    state.noNoticeData = newData;
}), (0, _defineProperty3.default)(_mutations, types.SENDERS_DATA, function (state, _ref13) {
    var newData = _ref13.newData;

    state.sendersData = newData;
}), (0, _defineProperty3.default)(_mutations, types.DELETE_ALL_SENDERS_DATA, function (state, _ref14) {
    var newData = _ref14.newData;

    state.deleteAll = newData;
}), (0, _defineProperty3.default)(_mutations, types.DELETE_ID_SENDERS_DATA, function (state, _ref15) {
    var newData = _ref15.newData;

    state.deleteId = newData;
}), (0, _defineProperty3.default)(_mutations, types.SHOW_USER_VISIBLE, function (state) {
    state.userVisible = true;
}), (0, _defineProperty3.default)(_mutations, types.HIDE_USER_VISIBLE, function (state) {
    state.userVisible = false;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 511 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = __webpack_require__(128);

var _assign2 = _interopRequireDefault(_assign);

var _mutations; /*********************************************************************
                 * Created by tr on 2018/1/10.                                       *
                 *********************************************************************/


var _CommonConst = __webpack_require__(68);

var common = _interopRequireWildcard(_CommonConst);

var _expAxios = __webpack_require__(69);

var expAxios = _interopRequireWildcard(_expAxios);

var _commonMethods = __webpack_require__(67);

var _commonMethods2 = _interopRequireDefault(_commonMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    /*根据条件查询数据*/
    noticeFindData: [],
    /*根据id来获取信息*/
    noticeIdFindData: {},
    /*获取快速查询公告*/
    noticeQuickData: [],
    /*获取公告下一条数据*/
    noticeNextData: {},
    /*根据条件查询列表数据*/
    noticeFindListData: [],
    /*发布或撤销发布的数据*/
    noticeRelease: 0,
    noticeDelete: 0,
    /*企业组织树数据*/
    noticeTree: [],
    saveNoticeData: 0,
    deleteFileData: {}
};

var getters = {
    noticeFindData: function noticeFindData(state) {
        return state.noticeFindData;
    },
    noticeIdFindData: function noticeIdFindData(state) {
        return state.noticeIdFindData;
    },
    noticeQuickData: function noticeQuickData(state) {
        return state.noticeQuickData;
    },
    noticeNextData: function noticeNextData(state) {
        return state.noticeNextData;
    },
    noticeFindListData: function noticeFindListData(state) {
        return state.noticeFindListData;
    },
    noticeRelease: function noticeRelease(state) {
        return state.noticeRelease;
    },
    noticeDelete: function noticeDelete(state) {
        return state.noticeDelete;
    },
    noticeTree: function noticeTree(state) {
        return state.noticeTree;
    },
    saveNoticeData: function saveNoticeData(state) {
        return state.saveNoticeData;
    },
    deleteFileData: function deleteFileData(state) {
        return state.deleteFileData;
    }
};
var actions = {
    /**
     * 根据条件查询数据
     * @param commit
     * @param reqData
     */
    findNoticeData: function findNoticeData(_ref, _ref2) {
        var commit = _ref.commit;
        var reqData = _ref2.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_FIND_FLAG, params: String(reqData.flag) }),
            data: reqData.data,
            success: function success(data) {
                var newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_FIND_FLAG_DATA, { resData: newData });
            }
        });
    },

    /**
     * 根据id查询数据
     * @param commit
     * @param reqData
     */
    findIdNoticeData: function findIdNoticeData(_ref3, _ref4) {
        var commit = _ref3.commit;
        var reqData = _ref4.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_ID_FIND, params: String(reqData) }),
            success: function success(data) {
                var newData = {};
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_ID_FIND_DATA, { resData: newData });
            }
        });
    },

    /**
     * 查询快速公告列表
     * @param commit
     * @param reqData
     */
    quickNoticeData: function quickNoticeData(_ref5, _ref6) {
        var commit = _ref5.commit;
        var reqData = _ref6.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_QUICK_LIST, params: String(reqData.resCode) }),
            data: reqData.extId,
            success: function success(data) {
                var newData = {};
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_QUICK_LIST_DATA, { resData: newData });
            }
        });
    },

    /**
     * 获取公告下一条数据
     * @param commit
     * @param reqData
     */
    getNextNoticeData: function getNextNoticeData(_ref7, _ref8) {
        var commit = _ref7.commit;
        var reqData = _ref8.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_NEXT, params: String(reqData) }),
            success: function success(data) {
                var newData = {};
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_NEXT_DATA, { resData: newData });
            }
        });
    },

    /**
     * 根据查询类型或时间获取数据
     * @param commit
     * @param reqData
     */
    getFindListNotice: function getFindListNotice(_ref9, _ref10) {
        var commit = _ref9.commit;
        var reqData = _ref10.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_FIND }),
            //url:'http://192.168.13.113:10303/myNotice',
            data: reqData,
            success: function success(data) {
                var newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_FIND_DATA, { resData: newData });
            }
        });
    },

    /**
     * 根据查询类型或时间获取数据
     * @param commit
     * @param reqData
     */
    getKeywordListNotice: function getKeywordListNotice(_ref11, _ref12) {
        var commit = _ref11.commit;
        var reqData = _ref12.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_FIND_KEYWORD }),
            data: reqData,
            success: function success(data) {
                var newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_FIND_DATA, { resData: newData });
            }
        });
    },

    /**
     * 获取发布和撤销的返回数据
     * @param commit
     * @param reqData
     */
    getNoticeRelease: function getNoticeRelease(_ref13, _ref14) {
        var commit = _ref13.commit;
        var reqData = _ref14.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_RELEASE, params: reqData }),
            method: 'put',
            success: function success(data) {
                var newData = '';
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = state.noticeRelease + parseInt(data.meta.code);
                }
                commit(common.NOTICE_RELEASE_DATA, { resData: newData });
            }
        });
    },
    getNoticeDelete: function getNoticeDelete(_ref15, _ref16) {
        var commit = _ref15.commit;
        var reqData = _ref16.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_DELETE }) + '?ids=' + reqData,
            method: 'delete',
            success: function success(data) {
                var newData = '';
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = state.noticeDelete + parseInt(data.meta.code);
                }
                commit(common.NOTICE_DELETE_DATA, { resData: newData });
            }
        });
    },
    getNoticeTree: function getNoticeTree(_ref17, _ref18) {
        var commit = _ref17.commit;
        var reqData = _ref18.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_TREE, params: reqData }),
            success: function success(data) {
                var newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.NOTICE_TREE_DATA, { resData: newData });
            }
        });
    },
    saveNotice: function saveNotice(_ref19, _ref20) {
        var commit = _ref19.commit;
        var reqData = _ref20.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.NOTICE_SAVE }),
            data: reqData,
            method: 'post',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function success(data) {
                var newData = 0;
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = state.saveNoticeData + parseInt(data.meta.code);
                    new _commonMethods2.default().showToastMsg({ text: data.messages, priority: 'success' });
                } else {
                    new _commonMethods2.default().showToastMsg({ text: data.messages, priority: 'error' });
                }
                commit(common.NOTICE_SAVE_DATA, { resData: newData });
            }
        });
    },
    deleteFileInNoticeEditPage: function deleteFileInNoticeEditPage(_ref21, _ref22) {
        var commit = _ref21.commit;
        var reqData = _ref22.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.DELETE_UPLOADED_FILE, params: reqData }),
            // url:'http://192.168.1.163:20250/annex/'+reqData+'?access_token=5f678bd4-1421-41a3-92df-a379fa6e6082',
            method: 'delete',
            // contentType:'application/x-www-form-urlencoded;charset=utf-8',
            success: function success(data) {
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    var _data = (0, _assign2.default)(data, {
                        uuid: reqData
                    });
                    commit(common.DELETE_FILE_DATA, { resData: _data });
                }
            }
        });
    }
};
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, common.NOTICE_FIND_FLAG_DATA, function (state, _ref23) {
    var resData = _ref23.resData;

    state.noticeFindData = resData;
}), (0, _defineProperty3.default)(_mutations, common.NOTICE_ID_FIND_DATA, function (state, _ref24) {
    var resData = _ref24.resData;

    state.noticeIdFindData = resData;
}), (0, _defineProperty3.default)(_mutations, common.NOTICE_QUICK_LIST_DATA, function (state, _ref25) {
    var resData = _ref25.resData;

    state.noticeQuickData = resData;
}), (0, _defineProperty3.default)(_mutations, common.NOTICE_NEXT_DATA, function (state, _ref26) {
    var resData = _ref26.resData;

    state.noticeNextData = resData;
}), (0, _defineProperty3.default)(_mutations, common.NOTICE_FIND_DATA, function (state, _ref27) {
    var resData = _ref27.resData;

    state.noticeFindListData = resData;
}), (0, _defineProperty3.default)(_mutations, common.NOTICE_RELEASE_DATA, function (state, _ref28) {
    var resData = _ref28.resData;

    state.noticeRelease = resData;
}), (0, _defineProperty3.default)(_mutations, common.NOTICE_DELETE_DATA, function (state, _ref29) {
    var resData = _ref29.resData;

    state.noticeDelete = resData;
}), (0, _defineProperty3.default)(_mutations, common.NOTICE_TREE_DATA, function (state, _ref30) {
    var resData = _ref30.resData;

    state.noticeTree = resData;
}), (0, _defineProperty3.default)(_mutations, common.NOTICE_SAVE_DATA, function (state, _ref31) {
    var resData = _ref31.resData;

    state.saveNoticeData = resData;
}), (0, _defineProperty3.default)(_mutations, common.DELETE_FILE_DATA, function (state, _ref32) {
    var resData = _ref32.resData;

    state.deleteFileData = resData;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 512 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(513);

/***/ }),
/* 513 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);
var bind = __webpack_require__(209);
var Axios = __webpack_require__(515);
var defaults = __webpack_require__(144);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(213);
axios.CancelToken = __webpack_require__(529);
axios.isCancel = __webpack_require__(212);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(530);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 514 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 515 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(144);
var utils = __webpack_require__(22);
var InterceptorManager = __webpack_require__(524);
var dispatchRequest = __webpack_require__(525);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 516 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 517 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(211);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 518 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 519 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 520 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 521 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 522 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 523 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 524 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 525 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);
var transformData = __webpack_require__(526);
var isCancel = __webpack_require__(212);
var defaults = __webpack_require__(144);
var isAbsoluteURL = __webpack_require__(527);
var combineURLs = __webpack_require__(528);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 526 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(22);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 527 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 528 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 529 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(213);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 530 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 531 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _CommonConst = __webpack_require__(68);

var common = _interopRequireWildcard(_CommonConst);

var _expAxios = __webpack_require__(69);

var expAxios = _interopRequireWildcard(_expAxios);

var _commonMethods = __webpack_require__(67);

var _commonMethods2 = _interopRequireDefault(_commonMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    /* 通讯录的数据列表的数据*/
    addressBookData: []
}; /*********************************************************************
    * 通讯录的业务                                        *
    * Created by tangyue on 2018/01/02.                                       *
    *********************************************************************/
// import * as types from '../mutation-types'
// import sync from '../syncData'

var getters = {
    addressBookData: function addressBookData(state) {
        return state.addressBookData;
    }
};

var actions = {
    getAddressBookDataList: function getAddressBookDataList(_ref, _ref2) {
        var commit = _ref.commit;
        var reqData = _ref2.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.ADDRESS_BOOK }),
            data: reqData,
            success: function success(data) {
                var newList = [];

                if (data && data.meta && data.meta.code * 1 === 1) {
                    newList = data.data && data.data.rows && data.data.rows.length ? data.data.rows : [];
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.ADDRESS_BOOK_DATA, { newData: newList });
            }
        });

        // sync.getAddressBookData(reqData, data => {
        //     const newData = data;
        //     commit(types.ADDRESS_BOOK_DATA, {newData});
        // });
    }
};

var mutations = (0, _defineProperty3.default)({}, common.ADDRESS_BOOK_DATA, function (state, _ref3) {
    var newData = _ref3.newData;

    state.addressBookData = newData;
});
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 532 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * 通讯录 全屏页面的业务                                        *
                 * Created by tangyue on 2018/01/12.                                       *
                 *********************************************************************/

var _CommonConst = __webpack_require__(68);

var common = _interopRequireWildcard(_CommonConst);

var _expAxios = __webpack_require__(69);

var expAxios = _interopRequireWildcard(_expAxios);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    /* 通讯录的数据列表的数据*/
    addressBookDataFullPage: [],
    paginationData: {},
    enterpriseOrgsTreeData: []
};

var getters = {
    addressBookDataFullPage: function addressBookDataFullPage(state) {
        return state.addressBookDataFullPage;
    },
    paginationData: function paginationData(state) {
        return state.paginationData;
    },
    enterpriseOrgsTreeData: function enterpriseOrgsTreeData(state) {
        return state.enterpriseOrgsTreeData;
    }
};

var actions = {
    getAddressBookDataListInFullPage: function getAddressBookDataListInFullPage(_ref, _ref2) {
        var commit = _ref.commit;
        var reqData = _ref2.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.ADDRESS_BOOK }),
            data: reqData,
            success: function success(data) {
                var newList = [];
                var paginationData = 0;

                if (data && data.meta && data.meta.code * 1 === 1) {
                    newList = data.data && data.data.rows && data.data.rows.length ? data.data.rows : [];
                    // paginationData = (data.data && data.data.page && data.data.page.totalRows) ? (data.data.page.totalRows)*1 : 0;
                    paginationData = data.data && data.data.page && data.data.page.totalRows ? { total: data.data.page.totalRows * 1 } : {};
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.ADDRESS_BOOK_DATA_FULLPAGE, { newData: newList });
                commit(common.ADDRESS_BOOK_PAGINATION_DATA_FULLPAGE, { newData: paginationData });
            }
        });
    },


    /**
     * get enterprise orgs tree data,which will be displaied in left tree
     * @param commit
     * @param reqData
     */
    getEnterpriseOrgsTreeDataInFullPage: function getEnterpriseOrgsTreeDataInFullPage(_ref3, _ref4) {
        var commit = _ref3.commit;
        var reqData = _ref4.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.ENTERPRISE_ORGS_TREE }),
            // url: 'http://192.168.0.105:10303/portal/treeMe',//我的接口测试
            data: reqData,
            success: function success(data) {
                var newList = [];

                if (data && data.meta && data.meta.code * 1 === 1) {
                    newList = data.data && data.data.length ? data.data : [];
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.ENTERPRISE_ORGS_TREE_DATA_FULLPAGE, { newData: newList });
            }
        });
    }
};

var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, common.ADDRESS_BOOK_DATA_FULLPAGE, function (state, _ref5) {
    var newData = _ref5.newData;

    state.addressBookDataFullPage = newData;
}), (0, _defineProperty3.default)(_mutations, common.ADDRESS_BOOK_PAGINATION_DATA_FULLPAGE, function (state, _ref6) {
    var newData = _ref6.newData;

    state.paginationData = newData;
}), (0, _defineProperty3.default)(_mutations, common.ENTERPRISE_ORGS_TREE_DATA_FULLPAGE, function (state, _ref7) {
    var newData = _ref7.newData;

    state.enterpriseOrgsTreeData = newData;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 533 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /*********************************************************************
                 * Created by tr on 2018/1/2.                                       *
                 *********************************************************************/


var _CommonConst = __webpack_require__(68);

var common = _interopRequireWildcard(_CommonConst);

var _expAxios = __webpack_require__(69);

var expAxios = _interopRequireWildcard(_expAxios);

var _commonMethods = __webpack_require__(67);

var _commonMethods2 = _interopRequireDefault(_commonMethods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    /*日程列表数据*/
    taskList: [],
    /*新增日程列表数据*/
    addTaskDate: {},
    /*修改日程表数据*/
    updateTaskDate: {},
    /*删除日程表数据*/
    deleteTaskDate: "",
    /*全部日程的数据*/
    allTaskDate: []

};
var getters = {
    taskList: function taskList(state) {
        return state.taskList;
    },
    addTaskDate: function addTaskDate(state) {
        return state.addTaskDate;
    },
    updateTaskDate: function updateTaskDate(state) {
        return state.updateTaskDate;
    },
    deleteTaskDate: function deleteTaskDate(state) {
        return state.deleteTaskDate;
    },
    allTaskDate: function allTaskDate(state) {
        return state.allTaskDate;
    }
};
var actions = {
    /**
     * 获取日程列表数据
     * @param commit
     * @param reqData
     */
    getTaskList: function getTaskList(_ref, _ref2) {
        var commit = _ref.commit;
        var reqData = _ref2.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.FIND_BY, params: reqData }),
            success: function success(data) {
                var newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.FIND_BY_DATE, { resData: newData });
            }
        });
    },

    /**
     * 新增日程列表数据
     * @param commit
     * @param reqData
     */
    addTaskDate: function addTaskDate(_ref3, _ref4) {
        var commit = _ref3.commit;
        var reqData = _ref4.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.SCHEDULE_ADD }),
            method: 'post',
            data: reqData,
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            success: function success(data) {
                var newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = state.addTaskDate + parseInt(data.meta.code);
                } else {
                    new _commonMethods2.default().showToastMsg({ text: data.messages, priority: 'error' });
                }
                commit(common.SCHEDULE_ADD_DATE, { resData: newData });
            }
        });
    },

    /**
     * 修改日程列表数据
     * @param commit
     * @param reqData
     */
    updateTaskDate: function updateTaskDate(_ref5, _ref6) {
        var commit = _ref5.commit;
        var reqData = _ref6.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.SCHEDULE_ADD }),
            method: 'put',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data: reqData,
            success: function success(data) {
                var newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                } else {
                    new _commonMethods2.default().showToastMsg({ text: data.messages, priority: 'error' });
                }
                commit(common.SCHEDULE_UPDATE_DATE, { resData: newData });
            }
        });
    },

    /**
     * 删除日程列表数据
     * @param commit
     * @param reqData
     */
    deleteTaskData: function deleteTaskData(_ref7, _ref8) {
        var commit = _ref7.commit;
        var reqData = _ref8.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.SCHEDULE_DELETE, params: String(reqData) }),
            method: 'delete',
            success: function success(data) {
                var newData = "";
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = state.deleteTaskDate + parseInt(data.meta.code);
                    new _commonMethods2.default().showToastMsg({ text: data.messages, priority: 'success' });
                } else {
                    new _commonMethods2.default().showToastMsg({ text: data.messages, priority: 'error' });
                }
                commit(common.SCHEDULE_DELETE_DATE, { resData: newData });
            }
        });
    },

    /**
     * 获取所有日程下得所有日期
     * @param commit9
     * @param reqData
     */
    getAllTaskData: function getAllTaskData(_ref9) {
        var commit = _ref9.commit;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.SCHEDULE_ADD }),
            success: function success(data) {
                var newData = [];
                if (data && data.meta && parseInt(data.meta.code) === 1) {
                    newData = data.data;
                }
                commit(common.SCHEDULE_ALL_DATE, { resData: newData });
            }
        });
    }
};
var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, common.FIND_BY_DATE, function (state, _ref10) {
    var resData = _ref10.resData;

    state.taskList = resData;
}), (0, _defineProperty3.default)(_mutations, common.SCHEDULE_ADD_DATE, function (state, _ref11) {
    var resData = _ref11.resData;

    state.addTaskDate = resData;
}), (0, _defineProperty3.default)(_mutations, common.SCHEDULE_UPDATE_DATE, function (state, _ref12) {
    var resData = _ref12.resData;

    state.updateTaskDate = resData;
}), (0, _defineProperty3.default)(_mutations, common.SCHEDULE_DELETE_DATE, function (state, _ref13) {
    var resData = _ref13.resData;

    state.deleteTaskDate = resData;
}), (0, _defineProperty3.default)(_mutations, common.SCHEDULE_ALL_DATE, function (state, _ref14) {
    var resData = _ref14.resData;

    state.allTaskDate = resData;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ }),
/* 534 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(6);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mutations; /**
                 * Created by ty on 18/1/23.
                 */

var _CommonConst = __webpack_require__(68);

var common = _interopRequireWildcard(_CommonConst);

var _expAxios = __webpack_require__(69);

var expAxios = _interopRequireWildcard(_expAxios);

var _constant = __webpack_require__(192);

var con = _interopRequireWildcard(_constant);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    mockLoginSyss: [],
    allSystemData: [],
    mockloginAppsActiveResult: {},
    mockloginAppActiveResult: {},
    mockloginAppUpdateResultInEditPage: {},
    mockLoginActivedAppsInFullpage: {}
};

var getters = {
    mockLoginSyss: function mockLoginSyss(state) {
        return state.mockLoginSyss;
    },
    allSystemData: function allSystemData(state) {
        return state.allSystemData;
    },
    mockloginAppsActiveResult: function mockloginAppsActiveResult(state) {
        return state.mockloginAppsActiveResult;
    },
    mockloginAppActiveResult: function mockloginAppActiveResult(state) {
        return state.mockloginAppActiveResult;
    },
    mockloginAppUpdateResultInEditPage: function mockloginAppUpdateResultInEditPage(state) {
        return state.mockloginAppUpdateResultInEditPage;
    },
    mockLoginActivedAppsInFullpage: function mockLoginActivedAppsInFullpage(state) {
        return state.mockLoginActivedAppsInFullpage;
    }
};

var actions = {
    getLoginSys: function getLoginSys(_ref) {
        var commit = _ref.commit;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.MOCKLOGIN_SYSTEMS }),
            success: function success(data) {
                var newList = [];

                if (data && data.meta && data.meta.code * 1 === 1 && data.data && data.data.length) {
                    var icons = con.ICON_ARRAY; //随机的字体图标

                    newList = data.data.map(function (it) {
                        var randomNumber = Math.ceil(Math.random() * 17);
                        it.icon = icons[randomNumber];
                        return it;
                    });
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.MOCK_LOGIN, { newData: newList });
            }
        });
    },
    getActivedAppsInAllAppsFullPage: function getActivedAppsInAllAppsFullPage(_ref2) {
        var commit = _ref2.commit;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.MOCKLOGIN_SYSTEMS }),
            success: function success(data) {
                var newList = [];

                if (data && data.meta && data.meta.code * 1 === 1 && data.data && data.data.length) {
                    var icons = con.ICON_ARRAY; //随机的字体图标

                    newList = data.data.map(function (it) {
                        var randomNumber = Math.ceil(Math.random() * 17);
                        it.icon = icons[randomNumber];
                        return it;
                    });
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.MOCK_LOGIN_ACTIVED_APPS_IN_FULLPAGE, { newData: newList });
            }
        });
    },
    getAllSystems: function getAllSystems(_ref3) {
        var commit = _ref3.commit;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.MOCKLOGIN_ALL_SYSTEMS }),
            success: function success(data) {
                var newList = [];

                if (data && data.meta && data.meta.code * 1 === 1 && data.data && data.data.length) {
                    var icons = con.ICON_ARRAY; //随机的字体图标

                    newList = data.data.map(function (it) {
                        var randomNumber = Math.ceil(Math.random() * 17);
                        it.icon = icons[randomNumber];
                        return it;
                    });
                } else if (data === 'ERROR') {
                    window.location.href = "#/login";
                }

                commit(common.MOCK_LOGIN_ALL_DATA, { newData: newList });
            }
        });
    },
    activeApp: function activeApp(_ref4, _ref5) {
        var commit = _ref4.commit;
        var reqData = _ref5.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.ACTIVE_APP }),
            method: 'put',
            data: reqData,
            success: function success(data) {
                commit(common.MOCK_LOGIN_ACTIVE_APP, { newData: data });
            }
        });
    },
    activeApps: function activeApps(_ref6, _ref7) {
        var commit = _ref6.commit;
        var reqData = _ref7.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.ACTIVE_APPS }),
            method: 'put',
            data: reqData,
            success: function success(data) {

                commit(common.MOCK_LOGIN_ACTIVE_APPS, { newData: data });
            }
        });
    },
    updateAppAccountPasswordInEditPage: function updateAppAccountPasswordInEditPage(_ref8, _ref9) {
        var commit = _ref8.commit;
        var reqData = _ref9.reqData;

        expAxios.sendRequest({
            url: common.getUrl({ url: common.ACTIVE_APP }),
            method: 'put',
            data: reqData,
            success: function success(data) {
                commit(common.MOCK_LOGIN_ACTIVE_APP_IN_EDITPAGE, { newData: data });
            }
        });
    },
    ajaxLogin: function ajaxLogin(_ref10, _ref11) {
        var _data;

        var commit = _ref10.commit;
        var reqData = _ref11.reqData;

        expAxios.sendRequest({
            url: reqData.requestUrl,
            method: reqData.requestType,
            data: (_data = {}, (0, _defineProperty3.default)(_data, reqData.loginParameters, reqData.login), (0, _defineProperty3.default)(_data, reqData.passwordParameters, reqData.password), _data),
            success: function success(data) {
                //todo commit必要時？
                // commit(common.MOCK_LOGIN_ACTIVE_APPS, { newData: result });
            }
        });
    }
};

var mutations = (_mutations = {}, (0, _defineProperty3.default)(_mutations, common.MOCK_LOGIN, function (state, _ref12) {
    var newData = _ref12.newData;

    state.mockLoginSyss = newData;
}), (0, _defineProperty3.default)(_mutations, common.MOCK_LOGIN_ACTIVED_APPS_IN_FULLPAGE, function (state, _ref13) {
    var newData = _ref13.newData;

    state.mockLoginActivedAppsInFullpage = newData;
}), (0, _defineProperty3.default)(_mutations, common.MOCK_LOGIN_ALL_DATA, function (state, _ref14) {
    var newData = _ref14.newData;

    state.allSystemData = newData;
}), (0, _defineProperty3.default)(_mutations, common.MOCK_LOGIN_ACTIVE_APPS, function (state, _ref15) {
    var newData = _ref15.newData;

    state.mockloginAppsActiveResult = newData;
}), (0, _defineProperty3.default)(_mutations, common.MOCK_LOGIN_ACTIVE_APP, function (state, _ref16) {
    var newData = _ref16.newData;

    state.mockloginAppActiveResult = newData;
}), (0, _defineProperty3.default)(_mutations, common.MOCK_LOGIN_ACTIVE_APP_IN_EDITPAGE, function (state, _ref17) {
    var newData = _ref17.newData;

    state.mockloginAppUpdateResultInEditPage = newData;
}), _mutations);
exports.default = {
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};

/***/ })
],[214]);
//# sourceMappingURL=main.0f3bd1bd01e82efb15c9.js.map