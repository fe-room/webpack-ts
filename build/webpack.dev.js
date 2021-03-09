const baseWebpackConfig = require("./webpack.base.js");
const merge = require("webpack-merge");
module.exports = merge(baseWebpackConfig, {
  devServer: {
    mode: "development",
    devtool: 'eval-source-map',
    proxy: [
      {
        //需代理的应用
        context: ["/api"],
        //代理目标主机
        target: "http://localhost:8088",
        //代理域名
        changeOrigin: true
      },
    ],
    hot: true,
    port: 8080,
    host: "localhost",
  }
});
