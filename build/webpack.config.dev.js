/**
 * Created by hamupp on 2018/01/26.
 */
const path = require("path");
const webpack = require("webpack");
const uglify = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry:{
        main: './src/main',
        vendors: ['vue', 'vue-router']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath:'',                        // 资源路径
        filename: '[name].[hash].js',                       // 入口js命名
        chunkFilename: '[name].[hash].chunk.js'            // 路由js命名
    },
    devServer: {
        proxy: {
            "/": { // 会把 / 开头的请求转发到 下面 targe 对应的地址d
                 // target: "http://10.176.156.95:10200", // 这里是实际请求的地址
                target: "http://192.168.13.113:10303",
                // pathRewrite: {"^/api": ""}, // 请求的前缀
                secure: false,
                // bypass: function(req, res, proxyOptions) {
                //     console.log('hhhhhh,', req.headers.accept)
                //     if (req.headers.accept.indexOf("html") !== -1) {
                //         console.log("Skipping proxy for browser request.");
                //         return "/index.html";
                //     }
                // }
            },
            // "/addressList": { // 会把 / 开头的请求转发到 下面 targe 对应的地址
            //     target: "http://10.176.156.67:10200", // 这里是实际请求的地址
            //     // pathRewrite: {"^/api": ""}, // 请求的前缀
            //     secure: false
            // }
        }
    },
    module: {
        // noParse: /es6-promise\.js$/,
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
                loader: 'url-loader',
                query: {
                    limit: 30000,
                    name: 'images/[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.[hash].js'
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, '../src/index.html')
        }),
    ]
};