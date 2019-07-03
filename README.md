# The Interactive Graphics Developer Toolbox - 互动图表程序员的工具箱

![Demo](./src/assets/scrollytelling.gif)

## 介绍

您好，我叫汤詠竣，在新加坡报业控股“海峡时报”互动图表团 (SPH Straits Times Interactive Graphics Team) 担任高级网页程序员。这次来 JSConf China 是要跟您分享我在新闻互动图表这方面的工作。我相信在下的程序员参与者，比较多接触的是应用开发，可能也没听说过 JavaScript 领域里有这样的一份工作。

1. 互动图表团是做什么的？
2. 哪些公司有互动图表团？
2. 我们用的是什么工具？
3. 做一个互动图表程序员或设计师需要些什么知识？
4. 我们究竟是程序员，是平面设计师，还是新闻记者？

我会通过这个工作坊给我们这个领域一个简单的介绍。此外我也要分享我们从互动图表工作得来的一些技术心得。

近年来，各大新闻社的互动图表团 像 New York Times Graphics, Washington Post Graphics, Reuters Graphics 等都开始在引用 Scrollytelling (滚动叙事) 的方式来呈现它们的新闻图表故事。滚动叙事这个技术很适用于移动平台，也很适合现今注意力短的观众。用最小的交互来带出最大的信息是它的一大特真。你们今天会跟着我一起编程一个滚动叙事的页面，故事会以一个地图图表为基础。学会了滚动叙事，你们可以发挥创意，运用在自己的项目，不限于新闻故事。

## 滚动叙事 例子

### *Straits Times*
- https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2019/06/singapore-street-names/index.html
- https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/10/ST-climate-of-change-great-battered-reef/index.html
- https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2019/02/HK-Beijing-HSR/index.html

### *New York Times*
- https://www.nytimes.com/interactive/2019/03/14/arts/design/hudson-yards-nyc.html
- https://www.nytimes.com/interactive/2019/04/17/world/europe/notre-dame-cathedral-fire-spread.html

### *Reuters*
- http://fingfx.thomsonreuters.com/gfx/rngs/PHILIPPINES-DRUGWAR/010041TN3Z8/index.html

### *South China Morning Post*
- https://multimedia.scmp.com/culture/article/2154046/forbidden-city/life/chapter_01.html

### *Channel News Asia*
- https://infographics.channelnewsasia.com/jewel-changi-airport/index.html

## 工作坊的基本规划

- 流程：3 小时
- 人数：～30
- 人手：讲师 1 位，助手 1 位
- 语言：英语 / 华语
- 场地需求：投影机，白板
- 参与者事先准备: 
    - 下载[这个 repo](https://github.com/yongjun21/jsconf-china-scrollytelling-workshop)
    - `npm install` 安装
    - 我会尽可能排除 external dependencies 让参与者无需联网开发
    - 会使用框架 (React 用者请在游览器安装 React Devtools, Vue 用者请在游览器安装 Vue Devtools)
- 参与者所需知识：Vue 或者 React (我会提供一些帮助参与者打造 Scrollytelling 的组建，会有 Vue 和 React 的版本，参与者需要起码懂其中一个框架)
- 目标：参与者在讲师的引导下一步步完成一个简单的滚动叙事页面

## 涵盖的知识范围

1. CSS `position: sticky` - 滚动时固定一个元件
2. Scroll event - 监听滚动事件并触发页面状态改变
3. 使用 window.requestAnimationFrame 来优化 scroll 的处理性能
4. Structure of a Scrollytelling app - 滚动叙事页面的结构
  - Sticky background / foreground (固定的背景/前景)
  - Scenes / slides / triggers (场景切换的触发点)
  - Entering / Exiting (逐渐进入和退出)
  - Progress tracking (进度跟踪)
5. Synchonizing dynamic scene with scroll state - 把动态场景连接上滚动状态
6. Applications - 不同的使用方式
  - SVG charts
  - Maps
  - Images
  - 3D models
  - Videos
7. Intersection Observer API

## 成品样本

[https://scrollytelling.netlify.com/](https://scrollytelling.netlify.com/)

## 关于讲师

<img src="./src/assets/photo.jpg" width="30%" />

### 汤詠竣 🇸🇬

新加坡报业控股 <img src="./src/assets/sph-logo.png" height="24px" /> 海峡时报 <img src="./src/assets/st-logo.png" height="24px" />

高级网页程序员

在互动图表和数据可视化开发上有三年的经验。

热爱数据和编程。常在新加坡 Javascript 社区里做演讲/指导工作坊分享技术心得。

在六月份刚结束的 JSConf Asia 2019 指导了一个 SVG Animation 的工作坊。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
