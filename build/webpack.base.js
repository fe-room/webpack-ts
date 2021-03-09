const path = require("path");
const HtmlWepackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");

// 此处 NODE_ENV 为node 环境变量 在生产模式里通过 DefinePlugin 来定义
const devModel = process.env.NODE_ENV !== "production" ? true : false;

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
const pages = fs.readdirSync(resolve("/src/pages"));
const enterArr = {};
const htmlPlugin = [];
pages.forEach((item) => {
  enterArr[item] = "./src/pages/${item}/index.js";
  htmlPlugin.push(
    new HtmlWepackPlugin({
      filename: `${item}.html`,
      template: "./src/pages/${item}/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    })
  );
});

const baseConfig = {
  entry: enterArr,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              //指定环境
              "@babel/preset-env",
              {
                targets: {
                  ie: "11",
                },
                corejs: "3",
                useBuiltIns: "usage",
              },
            ],
          ],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  //指定环境
                  "@babel/preset-env",
                  {
                    targets: {
                      ie: "11",
                    },
                    corejs: "3",
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
      //开发路径别名
    alias:{
      '@': resolve('src'),
    },
    //自动解析拓展
    extensions:['.ts','.js', '.vue', '.less'] 
  },
  plugins: [
      ...htmlPlugin
  ]
};

// 根据环境变量 配置是否单独抽取CSS
if (devModel) {
  baseConfig.module.rules.push({
    test: /\.(c|le)ss$/,
    use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
  });
} else {
  baseConfig.module.rules.push({
    test: /\.(c|le)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              [
                "postcss-preset-env",
                {
                  browsers: "last 2 versions",
                },
              ],
            ],
          },
        },
      },
      "less-loader",
    ],
  });
}

module.exports = baseConfig;
