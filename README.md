# 运用滚动交互来讲你的故事<br>Using scroll to tell a story

[![Demo](./src/assets/scrollytelling.gif)](https://scrollytelling.netlify.app)

## 个人介绍

您好，我叫汤詠竣，在新加坡报业控股 *“海峡时报”* 互动图表团 (SPH Straits Times Interactive Graphics Team) 担任高级网页程序员。这次来 JSConf China 是要跟您分享我在新闻互动图表这方面的工作。我相信在下的程序员参与者，比较多接触的是应用开发，可能也没听说过 JavaScript 领域里有这样的一份工作。

1. 互动图表团是做什么的？
2. 哪些公司有互动图表团？
2. 我们用的是什么工具？
3. 做一个互动图表程序员或设计师需要些什么知识？
4. 我们究竟是程序员，是平面设计师，还是新闻记者？

我会通过这个工作坊给我们这个领域一个简单的介绍。此外我也要分享我们在滚动交互方面的一些技术心得。

## 工作坊简介<br>Workshop description

近年来，各大新闻社的互动图表团像 *“纽约时报”*, *“华盛顿邮报”*, *“路透社”* 等都开始在引用 **Scrollytelling (滚动叙事)** 的方式来呈现它们的新闻图表故事。滚动叙事这个技术很适用于移动平台，也能很好抓住现今读者短缺的注意力。用最小的交互带出最大的信息是它的一大特征。来自新加坡 *“海峡时报”* 的高级网页程序员 **汤詠竣** 将带领大家学习开发一个滚动叙事的页面。掌握滚动叙事的一些技巧，你便能创意运用滚动交互来呈现你的新闻，产品，或是个人故事。

Lately, major news organizations like *New York Times*, *Washington Post* and *Reuters* are producing more and more visual stories presented in a **Scrollytelling** format. Using scroll to tell a story works really well for mobile users and is well suited for today's readers with shrinking attention span. With scrollytelling, maximum information can be conveyed with the least amount of user interaction. Senior Web Developer **Yong Jun** from Singapore's *The Straits Times* will guide you in building a scrollytelling visual story. The techniques you learn at this workshop will allow you to creatively use scroll to present your own news stories, product stories, or even personal stories.

## 滚动叙事 例子

### *Straits Times*
- https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2019/06/singapore-street-names/index.html
- https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2018/10/ST-climate-of-change-great-battered-reef/index.html
- https://graphics.straitstimes.com/STI/STIMEDIA/Interactives/2019/02/HK-Beijing-HSR/index.html

### *New York Times*
- https://www.nytimes.com/interactive/2019/03/14/arts/design/hudson-yards-nyc.html
- https://www.nytimes.com/interactive/2019/04/17/world/europe/notre-dame-cathedral-fire-spread.html

### *Washington Post*
- https://www.washingtonpost.com/graphics/2018/national/us-mexico-border-flyover/

### *Reuters*
- http://fingfx.thomsonreuters.com/gfx/rngs/PHILIPPINES-DRUGWAR/010041TN3Z8/index.html

### 财新

- https://datanews.caixin.com/interactive/2019/guangboticao/index.html

### 南华早报
- https://multimedia.scmp.com/culture/article/2154046/forbidden-city/life/chapter_01.html

### *Channel News Asia*
- https://infographics.channelnewsasia.com/jewel-changi-airport/index.html

## 目标对象 / 参与者所需知识<br>Target audience / Required prior knowledge

欢迎感兴趣于前端开发和交互设计的你参与此工作坊。为简化编程，我们将使用前端框架。教材会有 Vue 和 React 两个版本。参与者需要至少认识其中一个才能更好的跟上教程。

Anyone interested in frontend developement or user interaction design is welcomed to join this workshop. To speed up developement, we will be using a framework. You can choose using React or Vue to build the app but knowledge in one of these frameworks is required to follow along.

## 演示文稿

[https://slides.com/yongjun21/jsconf-china-2019](https://slides.com/yongjun21/jsconf-china-2019)

## 参与者事先准备<br>Participants to prepare

请参与者在工作坊的前三天内完成以下步骤载：
1. 下载这个 repo: [https://github.com/yongjun21/jsconf-china-scrollytelling-workshop](https://github.com/yongjun21/jsconf-china-scrollytelling-workshop)
2. React 用者请换去 `react` branch. Vue 用者保持在 `vue` branch.
3. `npm install` 安装
4. 在游览器安装 [Vue devtools](https://github.com/vuejs/vue-devtools) / [React devtools](https://github.com/facebook/react-devtools)
5. 本工作坊将使用一个 “海峡时报” 互动图表团开源的滚动叙事工具 `@st-graphics/scrolly`。[请参考文档](https://st-scrolly.netlify.com)

3 days before workshop
1. Clone this repo: [https://github.com/yongjun21/jsconf-china-scrollytelling-workshop](https://github.com/yongjun21/jsconf-china-scrollytelling-workshop)
2. Switch to `react` branch if you intend to build this app in React. Stay in default `vue` branch otherwise.
3. `npm install`
4. Install [Vue devtools](https://github.com/vuejs/vue-devtools) / [React devtools](https://github.com/facebook/react-devtools) browser extension
5. We will be using an opensourced scrollytelling library `@st-graphics/scrolly` by a *Straits Times* Interactive Graphics Team. [Refer to documentation here](https://st-scrolly.netlify.com)

## 成品样本

[https://scrollytelling.netlify.com/](https://scrollytelling.netlify.com/)

## 工作坊的基本规划

- 流程：3 小时
- 人数：～30
- 人手：讲师 1 位，助手 2-3 位
- 语言：英语 / 华语
- 场地需求：投影机，白板
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
6. Applications - 各种不同的使用方式
  - SVG charts
  - Maps
  - Images
  - 3D models
  - Videos
7. Intersection Observer API

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
