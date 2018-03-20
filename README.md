# 统一门户平台前端架构

## web技术栈
> 基于vue2+vuex+webpack+gulp的web项目

## web目录

```
├── build/    (打包指令 )
├── src/      (开发用的目录 )
├		├── components/  (功能模块/业务模块)
├		├		├──information/ (页面模块)
├		├		├		└── 具体页面子模块1/
├		├		├──templates/ (功能模块)
├		├		├		├── addTree/ (树形图模块)
├		├		├		├── agency/ (代办模块)
├		├		├		├── assembly/ (组件模块)
├		├		├		├── basic/ (主键模块)
├		├		├		├── calendar/ (日历控件)
├		├		├		├── common/ (公用的提示模块)
├		├		├		└── 具体功能模块子模块1/
├		├		└── Index.vue (入口vue文件)
├		├── vuex/ (vuex目录： 放 数据管理状态管理的相关逻辑)
├		├		├── assembly/ (组件模块逻辑)
├		├		├── basic/ (基本模块逻辑)
├		├		├── calendar/ (日历模块逻辑)
├		├		├── common/ (公用提示信息逻辑)
├		├		├── func/ (功能地图模块逻辑)
├		├		├── ajax.js/ (原生ajax封装)
├		├		├── constant.js/ (静态数据)
├		├		├── index.js/ (入口js文件)
├		├		├── mutation-types.js/ (静态变量)
├		├		├── syncData.js/ (所有接口的处理)
├		├		└── URLMapping.js/ (所有接口和路径的处理)
├		└── main.js/ (路由的配置)
├── libs/    (其他第三方js)
├── dist/      (打包后的文件)
├── gulpfile.js   (gulp配置文件)
├── package.json  (项目描述)
└── webpack.config.js （webpack配置）


## 跟原版本不同之处

1. 更改页面的router-view结构

2.更改全屏页面的路由配置，以前是index/1代表首页，index/sdfsdfsdf代表其他全屏页面，现在取消，直接用index代表首页

## 备注

1. static 里面的/lang和/themes全是ueditor的相关资源