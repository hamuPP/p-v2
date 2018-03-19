/*********************************************************************
 * 所有的变量                                                         *
 * Modified by tr on  2018/01/22                                      *
 * Modified by ty on  2018/01/04                                      *
 *********************************************************************/

/*******************************start 所有数据变量 start*****************************/

//所有的后端服务的基础地址 start
//const BASE_SCHEDULE = 'http://192.168.1.163:20240/'; //日程
const BASE_SCHEDULE = '/schedule/'; //日程
// const BASE_ADDRESSBOOK = 'http://192.168.13.145:20200/addressList/';//通讯录
const BASE_ADDRESSBOOK = '/addressList/'; //通讯录
//const BASE_TY = 'http://192.168.13.113:10303/'; //老子自己的服务
//const BASE_NOTICE = 'http://192.168.1.163:20250/'; //公告
const BASE_NOTICE = '/announce/'; //公告
//所有的后端服务的基础地址 end

/*===========start 登录模块 请求接口和数据变量 start==========*/
export const LOGIN = "login";
export const LOGIN_DATA = "LOGIN_DATA";
/*===========end 登录模块 请求接口和数据变量 end==========*/

/*===========start 日程表变量 start==========*/
//日程列表变量
export const FIND_BY_DATE = "FIND_BY_DATE";
//添加日程表变量
export const SCHEDULE_ADD_DATE = 'SCHEDULE_ADD_DATE';
//修改日程表变量
export const SCHEDULE_UPDATE_DATE = 'SCHEDULE_UPDATE_DATE';
//日程删除的数据变量
export const SCHEDULE_DELETE_DATE = 'SCHEDULE_DELETE_DATE';
//获取日程中所有的日期变量
export const SCHEDULE_ALL_DATE = 'SCHEDULE_ALL_DATE';

/*===========end 日程表变量 end==========*/

/*============ start 公告变量 start ==========*/
//根据发布范围查询公告变量
export const NOTICE_FIND_FLAG_DATA = 'NOTICE_FIND_FLAG_DATA';
//通过ID获取公告的详情编辑
export const NOTICE_ID_FIND_DATA = `NOTICE_ID_FIND_DATA`;
//获取快速公告链接
export const NOTICE_QUICK_LIST_DATA = `NOTICE_QUICK_LIST_DATA`;
//获取下一条公告
export const NOTICE_NEXT_DATA = `NOTICE_NEXT_DATA`;
//根据条件查询数据变量
export const NOTICE_FIND_DATA = `NOTICE_FIND_DATA`;
//发布或撤销发布变量
export const NOTICE_RELEASE_DATA = `NOTICE_RELEASE_DATA`;
//批量删除和删除变量
export const NOTICE_DELETE_DATA = `NOTICE_DELETE_DATA`;
//企业组织树变量
export const NOTICE_TREE_DATA = `NOTICE_TREE_DATA`;
export const NOTICE_SAVE_DATA = `NOTICE_SAVE_DATA`;
export const DELETE_FILE_DATA = `DELETE_FILE_DATA`;
/*============ end 公告变量 end ==========*/

/*===========start 通讯录 start==========*/
export const ADDRESS_BOOK_DATA = "ADDRESS_BOOK_DATA";
export const ADDRESS_BOOK_DATA_FULLPAGE = "ADDRESS_BOOK_DATA_FULLPAGE";
export const ADDRESS_BOOK_PAGINATION_DATA_FULLPAGE = "ADDRESS_BOOK_PAGINATION_DATA_FULLPAGE";
export const ENTERPRISE_ORGS_TREE_DATA_FULLPAGE = "ENTERPRISE_ORGS_TREE_DATA_FULLPAGE";
/*===========end 通讯录 end==========*/

/*===========start 偽ログィン start==========*/
export const MOCK_LOGIN = "MOCK_LOGIN";
export const MOCK_LOGIN_ALL_DATA = "MOCK_LOGIN_ALL_DATA";
export const MOCK_LOGIN_ACTIVE_APPS = "MOCK_LOGIN_ACTIVE_APPS";
export const MOCK_LOGIN_ACTIVE_APP = "MOCK_LOGIN_ACTIVE_APP";
export const MOCK_LOGIN_ACTIVE_APP_IN_EDITPAGE = "MOCK_LOGIN_ACTIVE_APP_IN_EDITPAGE";
export const MOCK_LOGIN_ACTIVED_APPS_IN_FULLPAGE = "MOCK_LOGIN_ACTIVED_APPS_IN_FULLPAGE";
/*===========end 偽ログィン end==========*/
/*******************************end 所有数据变量 end*****************************/

/*******************************start 所有数据请求URL start*****************************/
/*============start 日程表请求 start==========*/
//根据传入的日期来查询日程信息
export const FIND_BY = `${BASE_SCHEDULE}schedule/date/{date}`;
//添加日程表  请求方式“post”新增；“put”修改；“get”获取所有的日期
export const SCHEDULE_ADD = `${BASE_SCHEDULE}schedule`;
//日程表删除 请求方式“delete”
export const SCHEDULE_DELETE = `${BASE_SCHEDULE}schedule/{id}`;
/*============ end 日程表请求 end ==========*/

/*============ start 公告请求 start ==========*/
//根据发布范围查询公告列表 flag:1 为公司，2 为单位
export const NOTICE_FIND_FLAG = `${BASE_NOTICE}home/pageQuery/{flag}`;
//通过ID获取公告的详情
export const NOTICE_ID_FIND = `${BASE_NOTICE}manager/{announId}`;
//获取快速公告链接
export const NOTICE_QUICK_LIST = `${BASE_NOTICE}home/quickList/{releaseScode}`;
//查看下一条公告
export const NOTICE_NEXT = `${BASE_NOTICE}home/nextAnnounce/{releaseScode}/{id}`;
//根据条件查询数据
export const NOTICE_FIND = `${BASE_NOTICE}manager/pageQuery`;
//根据输入的值来查询数据
export const NOTICE_FIND_KEYWORD = `${BASE_NOTICE}manager/pageQuery/{keyword}`;
//快速发布和撤销发布
export const NOTICE_RELEASE = `${BASE_NOTICE}manager/{announId}/{flag}`;
//批量删除和删除单个
export const NOTICE_DELETE = `${BASE_NOTICE}manager/announId`;
//获取企业组织树
export const NOTICE_TREE = `${BASE_NOTICE}home/enterprise/orgs/tree/{flag}`;
// export const NOTICE_TREE = "enterprise/orgsTree.json";
//保存公告
export const NOTICE_SAVE = `${BASE_NOTICE}manager/saveAnnoun`;
export const NOTICE_UPLOAD = `/zuul${BASE_NOTICE}annex/annex`;
export const DELETE_UPLOADED_FILE = `${BASE_NOTICE}annex/{annexUUID}`;
//下载附件
export const NOTION_DOWNLOAD = `${BASE_NOTICE}annex/{annexUUID}`;
/*============ end 公告请求 end ==========*/

/*============end 公告请求 end==========*/

/*============ 通讯录：首页模块和全屏页面的 start ==========*/
/* 获取通讯录数据 */
// export const ADDRESS_BOOK = `enterprise/accounts.json`; //todo local dev url
export const ADDRESS_BOOK = `${BASE_ADDRESSBOOK}enterprise/accounts`; //TODO online url
/* 获取企业组织树的数据 */
// export const ENTERPRISE_ORGS_TREE = 'enterprise/orgsTree.json'; ///todo local dev url
export const ENTERPRISE_ORGS_TREE = `${BASE_ADDRESSBOOK}enterprise/orgs/tree`; //TODO online url

// export const ADDRESSBOOK_FULLPAGE_DOWNLOAD = `http://10.176.156.95:10200${BASE_ADDRESSBOOK}excel/export`;
export const ADDRESSBOOK_FULLPAGE_DOWNLOAD = `${BASE_ADDRESSBOOK}excel/export`;
/*============ 通讯录：首页模块和全屏页面的 end ==========*/

// export const MOCKLOGIN_SYSTEMS = `otherApps/status1.active.json`; //todo local dev url
export const MOCKLOGIN_SYSTEMS = `/portal/otherApps?status=1`; //TODO online url

// export const MOCKLOGIN_ALL_SYSTEMS = `otherApps/status0.all.json`; //todo local dev url
export const MOCKLOGIN_ALL_SYSTEMS = `/portal/otherApps?status=0`; //TODO online url

export const ACTIVE_APPS = `/portal/otherApps`;
export const ACTIVE_APP = `/portal/otherApp`;
/*******************************end 所有数据请求 end*****************************/
/**
 * 定义方法
 * {{getUrl：Function 获取url方法}}
 * getUrl：(urlObj:{url: 'string',params:'string'})
 */
export const getUrl = function(urlObj) {
    let url = urlObj.url;
    let reg = /\{.*?\}/g;

    // const urlStart = url.endsWith('.json') ? "../mokeData/" : 'http://192.168.1.115:20600/';//谢富强
    const urlStart = url.endsWith('.json') ? "../mokeData/" : '';
    /* 匹配请求路径中的参数 */
    let urlParams = url.match(reg);
    /* 匹配字符串，判断字符串是否包含{}字样 */
    if (urlParams) {
        let paramsArray = urlObj.params.split(',');
        /* 遍历匹配数组 */
        urlParams.map((it, i) => {
            url = url.replace(it, paramsArray[i]);
        });
    }
    let newUrl = urlStart + url;
    // if (url !== 'login') {
    //     let access_token = JSON.parse(sessionStorage.getItem('access_token'));
    //     newUrl = urlStart + url;
    //     newUrl += (newUrl.indexOf('?') > -1) ? ('&' + access_token) : ('?' + access_token);
    // }
    return newUrl;
};