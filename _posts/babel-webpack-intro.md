---
title: "Babel and Webpack"
excerpt: "This article is an introduction to Babel and Webpack, and some code reading on what's their expected behavior."
category: "babel"
coverImage: "/react.svg.png"
date: "2021-06-17T05:35:07.322Z"
author:
  name: Zihao
  picture: "/assets/blog/authors/tim.jpeg"
# ogImage:
#   url: "/assets/blog/hello-world/cover.jpg"
---

## Webpack and Babel (1) - introduction



### Why Webpack?

当你在开发一个前端的应用的时候，一定会遇到各种需求，例如：

- 打包JavaScript，css， html和图片资源，方便他们能够以更小的体积被部署
- 更先进一点，你会想要有个hot-reloading的功能，每次改完代码，自动更新
- 有些资源你想要对他们做个压缩
- 针对不同的平台，例如不同的浏览器版本，不同的客户端（手机，电脑）

