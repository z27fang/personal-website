---
title: "Babel and Webpack"
excerpt: "This article is an introduction to Babel and Webpack, and some code reading on their behavior."
category: "JS Dev"
coverImage: "/assets/babel.png,/assets/webpack.png"
date: "2021-06-17"
author:
  name: Zihao
  picture: "/assets/blog/authors/tim.jpeg"
tags: "js,js-babel,js-webpack"
---

## Webpack and Babel (1) - introduction

### Why Webpack?

在开发一个前端的应用的时候，一定会遇到各种需求，例如：

- 打包JavaScript，css， html和图片资源，方便他们能够以更小的体积被部署
- 更先进一点，你会想要有个hot-reloading的功能，每次改完代码，自动更新
- 有些资源你想要对他们做个压缩
- 针对不同的平台，例如不同的浏览器版本，不同的客户端（手机，电脑）

webpack是为了方便集成这些功能而开发出来的一个打包工具，其核心是plugin和loader的模式，即按照用户的需求，来对打包功能进行细分操作。

### Webpack 结构

webpack主要由以下几个主要概念构成：entry，output，module和plugins，在webpack.config.js中这些都是需要由用户定义的field。核心是通过loader定义不同文件类型的打包器，再通过plugins来添加各种行为。

#### entry

指需要打包js项目的入口，通常是index.js。

#### output

打包完后的js储存的位置，在这里可以指定打包文件名的格式，并且支持hash文件名的功能，或是自动生成等等

#### module

module用来定义需要哪些loader。通常针对不同的文件格式，会用到不同的loader。loader同样是非常灵活的，不同的loader自身也支持不同的option来适应各种需求。loader的运作模式是链式的，即多个loader按照顺序依次进行工作。

#### plugins

plugins是webpack的核心，值得一提的是，webpack本身也是由一个个plugin构成的。所以我们有必要看一下plugin的定义

```javascript
// 很简单，plugin即带有'apply'这个属性的javascript object
Class myPlugin {
    apply(compiler) {
        ...
    }
}
```

在以上的例子中，compiler是由webpack提供的一个接口，可以通过这个接口来对webpack的编译循环进行各种操作。

### Babel.js

当提到webpack的时候，不得不提到Babel。Babel.js是著名的javascript compiler，承担了转译，编译等等各种作用。webpack也提供了babel loader来方便大家将babel添加到自己的build过程中。这里我自己新建了一个仅包含babel和webpack的项目以学习之用。

#### webpack.config.js

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js', // 入口
    output: {  // 定义打包后的位置
        path: path.resolve(__dirname, 'dist'),   
        filename: '[id].bundle.js'
    },
    mode: 'development', //选择使用build的模式，在development下会自动添加很多注释，并且不会修改命名
    devtool: 'source-map', //选择一个友善的devtool
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/, //不转义node_modules下的js
                use: {
                    loader: 'babel-loader' 
                    // 在这里使用babel-loader, 根据官网，对应各种js有各种匹配的loader，
                    //  包括react-lodaer等等
                }
            }
        ]
    },
    // 定义本地 dev-server的属性
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        hot: true, 
        inline: true,
        host: "localhost" 
    },
    plugins: [
        // 这个插件负责打包html
        new HtmlWebpackPlugin({
            title: 'main', 
            filename: 'index.html', 
            template: 'index.html' 
        }),
        //  这个插件负责打包css
        new MiniCssExtractPlugin(),
        //  这个插件支持hot-reloading
        new webpack.HotModuleReplacementPlugin()
    ]
```

#### .babelrc

.babelrc为babel的配置文件。

```json
{
	"presets": [
        // preset-env 根据用户定义的属性，来判断需要将javascript如何进行转义
        //      这里定义了targets，即目标环境为IE5，preset-env会根据IE5支持的
        //      javascript api来告诉babel需要做哪些转义
        // 这里，会对大部分es6新增语法进行转移，然而对于新增API，则不会进行识别
        //     例如 Array.prototypes.includes
        // 为了处理这种情况，需要添加另外两个库来对这些api进行额外的转义
        //     core-js, regenator-runtime
		["@babel/preset-env", {
            "debug":true,
            "corejs": 3,
            // useBuiltIns 有三种值
            //     usage: 根据需求自动转义
            //     entry: 对添加了 import core-js的文件进行转义
            //     false：不转义
            "useBuiltIns": "usage",
            // 指定输出环境
            "targets": {
                "ie": "5"
            // targets 支持多种写法
            //   可以通过上述方法指定build
            //   也可以写babel自定义的query来确保通用性
            //     例如： "browserslist": "> 0.25%, not dead"
            }
		}]
    ],
    // https://babeljs.io/docs/en/plugins
    "plugins": [
        ["@babel/plugin-transform-arrow-functions", { "spec": true }]
    ]
}
```

