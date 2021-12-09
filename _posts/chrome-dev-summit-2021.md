---
title: "Chrome Dev Summit 2021 notes"
excerpt: "These are some notes I took for Chrome Dev Summit 2021 for review in future."
category: "JS Dev"
coverImage: "/assets/chrome.png"
date: "2021-12-08"
author:
  name: Zihao
  picture: "/assets/blog/authors/tim.jpeg"
tags: "js"
---

## A summary on Google Chrome Dev Summit 2021

Google has recently held a [chrome developer summit](https://www.youtube.com/watch?v=Df2U9-R-OJs) at the beginning of November. Here I took down some notes for myself and everyone who's interested to have a reference on what's new to us from the summit.

On this summit, google focused on the following 4 concepts:

- Cross Browser Compability
- Privacy
- Web-Capabilities
- Core Web Vitals

### Cross Browser Compability

Google mentioned cross browser compability will be their focus in the upcoming dev of Chrome. They also referenced [web-platform-tests (github.com)](https://github.com/web-platform-tests) as a standard for their latest initiative called compact 2021 - CSS. As a result of this project, the team was able to use 5 different features to give a score to a web.

The 5 features are listed as:

- Flexbox
- Grid
- Position
- Aspect-ratio
- Transforms

They also provided this link [web-platform-tests dashboard (wpt.fyi)](https://wpt.fyi/results/?label=experimental&label=master&aligned) to help developers to test their web pages for cross browser performance scores.

### Privacy

Chrome is developing a tool named [The Privacy Sandbox - Chrome Developers](https://developer.chrome.com/docs/privacy-sandbox/) to manage all confindentials including:

- Relevant Ads and Contents
- Measuremants
- Fraud detections
- Identity
- Device customization

With the coming deprecation of cookies, they are willing to provide a purpose-built api for developer to retrieve and store information in the tool.

They also encourage developers to take part in the development life-cycle on [github](https://github.com/GoogleChromeLabs/privacy-sandbox-dev-support) as they are also actively collecting developers feedback in the development process.

They also revealed some architecture planning for the re-factoring of user-agent string, which will be called "User-Agent Client Hints" in the future. The new sturcture of this will include:

- Default on every request in a format of k-v pairs including broser, major version, platform, mobile
- The hint will be sent when requested

### Web-Capabilities

In this section google showed many successful cases built by developers among different companies.

### Core Web Vitals

Chrome will provide a way of measureing a web's performance through the following 3 criterias:

- Loading performance
- Input responsiveness
- Visual stability

In order to provide accurate and efficient measurements across webs, google has collaborated with open-source web frameworks and tools for a new project named [Aurora](https://web.dev/introducing-aurora/). The goal of this project is as below:

*In a nutshell, our vision is that a high bar of UX quality becomes a side effect of building for the web.*

In the future, we might see a tool integrated in chrome for providing accurate web vital scores for measuring our products



In summay, the summit has provided an insight and some future plans for many interesting functions.

