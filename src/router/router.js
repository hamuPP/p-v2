// import basicDemoAndApi from './views/pages/basicDemoAndApi.vue'
// import reloadTreeData from './views/pages/reloadTreeData.vue'


import loginPage from '../components/login/login.vue'
import HomePage from '../components/homePage/homePage.vue'
import RightModel from '../components/basic/RightModel.vue'
import FunctionMap from '../components/basic/FunctionalMap.vue'
import AgencyFull from '../components/agency/AgencyFull.vue'
import Addressbookfullpage from '../components/Addressbookfullpage.vue'
import noticeFull from '../components/notice/NoticeFull.vue'
import noticeManage from '../components/notice/NoticeManage.vue'
import NoticeDetails from '../components/notice/NoticeDetails.vue'
import NoticeAddAndEdit from '../components/notice/NoticeAddAndEdit.vue'

const routers = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: loginPage
    },
    {
        path: '/index',
        meta: {
            title: '门户'
        },
        component: HomePage,
        children: [
            {
                path: '',
                components: {
                    a:RightModel,
                    // b:FunctionMap,
                    c:AgencyFull
                }
            },
            {
                path: 'addressbookfullpage',//通讯录全屏
                components: {
                    a:Addressbookfullpage,
                }
            },
            {
                path: 'noticeFull',//通知公告全屏
                components: {
                    a:noticeFull,
                }
            },
            {
                path: 'noticeManage',//通知公告全屏-管理
                components: {
                    a:noticeManage,
                }
            },
            {
                path: 'noticeDetails',//通知公告全屏-详情
                components: {
                    a:NoticeDetails,
                }
            },
            {
                path: 'noticeEdit',//通知公告全屏-编辑器那个页面
                components: {
                    a:NoticeAddAndEdit,
                }
            },
        ]
    },
    // {path: "/basicDemoAndApi", component: basicDemoAndApi},
    // {path: "/reloadTreeData", component: reloadTreeData},
];

export default routers;