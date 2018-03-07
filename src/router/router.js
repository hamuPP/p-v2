// import basicDemoAndApi from './views/pages/basicDemoAndApi.vue'
// import reloadTreeData from './views/pages/reloadTreeData.vue'


import loginPage from '../components/login/login.vue'

const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: loginPage
    },
    // {path: "/basicDemoAndApi", component: basicDemoAndApi},
    // {path: "/reloadTreeData", component: reloadTreeData},
];

export default routers;