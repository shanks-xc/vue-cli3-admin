## 建立这个仓库的原因
每当我们建立一个新的项目的时候，我们都要去重新搭建一个vue的架子，所以才有了这个快速建立项目的仓库
## 快速启动项目

```
 cnpm i 或者 npm i
 npm run serve
```

#### 该项目用到的是 vue-cli3+element-ui

#### 介绍一下目录结构（主要介绍 src 里面的结构）

```
├── src
│   ├── api                                     // 所有的接口在这里管理
│   ├── assets                                  // style img之类的东西，图片会被打包
│   ├── layout                                  // 布局，一般做后台的时候登陆页跟其他页面用的布局是不一样的
│   ├── plugins                                 // 插件
│   ├── router
│   │   ├── modules                             // 划分模块路由
│   │   └── index.js                            // 路由配置
│   ├──store                                      // vuex的状态管理
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   ├── style                                   // 存放一些样式
│   └── utils                                   // 放一个工具函数
│   │   └── request.js                          // axios的拦截处理
```
