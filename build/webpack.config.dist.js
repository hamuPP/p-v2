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
        vendor: ['vue', 'vue-router']
    },
    output: {
        // 输出到这个目录下
        path: path.join(__dirname, '../dist'),
        // publicPath:'/',                        // 资源路径
        // 生成的文件名, [name] 即为entry配置中的key
        filename: '[name].[hash].js',                       // 入口js命名
        chunkFilename: '[name].[hash].chunk.js'            // 路由js命名
    },
    module: {
        // noParse: /es6-promise\.js$/,
        rules: [
            {
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