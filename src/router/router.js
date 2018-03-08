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
                path: 'addressbookfullpage',
                components: {
                    a:Addressbookfullpage,
                }
            },
            {
                path: 'noticeFull',
                components: {
                    a:noticeFull,
                }
            },
            {
                path: 'noticeManage',
                components: {
                    a:noticeManage,
                }
            },
            {
                path: 'noticeDetails',
                components: {
                    a:NoticeDetails,
                }
            },
        ]
    },
    // {path: "/basicDemoAndApi", component: basicDemoAndApi},
    // {path: "/reloadTreeData", component: reloadTreeData},
];

export default routers;