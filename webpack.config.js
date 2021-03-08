const path = require('path')
const HtmlWepackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode:'production',
    entry:'./src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
        // //设置webpack 打包出来不使用箭头函数兼容IE
        // environment: {
        //     arrowFuntion: false
        // }
    },
    //执行webpack打包要使用的模块
    module: {
        rules: [
            {
                test:/\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    //指定环境 
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            "ie": "11"
                                        },
                                        "corejs": "3",
                                        "useBuiltIns": "usage"   
                                    }
                                ]
                                
                            ]
                        }
                    }
                    ,
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test:/\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    //配置插件
    plugins:[
        new HtmlWepackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],
    resolve: {
        extensions: ['.ts','.js']
    }
}