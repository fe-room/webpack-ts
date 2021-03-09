const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const baseWebpackConfig = require('./webpack.base.js')
const merge = require('webpack-merge')
module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
          }),
        new CleanWebpackPlugin()
    ]
})