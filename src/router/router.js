// import basicDemoAndApi from './views/pages/basicDemoAndApi.vue'
// import reloadTreeData from './views/pages/reloadTreeData.vue'


import loginPage from '../components/login/login.vue'
import HomePage from '../components/homePage/homePage.vue'

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
        component: HomePage
    },
    // {path: "/basicDemoAndApi", component: basicDemoAndApi},
    // {path: "/reloadTreeData", component: reloadTreeData},
];

export default routers;