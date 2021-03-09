const baseWebpackConfig = require('./webpack.base.js')
const merge = require('webpack-merge')
module.exports = merge(baseWebpackConfig, {
    devServer: {

    },
    mode: 'development',
    devtool: 'source-map',
})