# front-task

> It's a task for front-end development interview

本项目一共两个页面：登录页和主页。主页包括：用户列表和代办列表。

## 项目

本地查看运行结果：  
```
git clone https://github.com/csdxy/front-task.git
cd front-task
npm install
// 源码运行结果
npm run dev
// 打包后代码运行结果
npm run build
node prod.server.js
```
线上查看运行结果：  
* 提示：由于线上协议是https，ajax是http请求，所有不能访问后端数据。因此，在https的线上环境，返回结果是本地数据。想要查看前后端交互，请把项目下载到本地运行查看。

* [线上demo运行地址](https://csdxy.github.io/front-task/#/login)

# 项目介绍

## 登录页

* 功能：登录、注册。  
* 注意：1）前端验证用户名或密码不为空。2）输入密码后，按回车键触发登录功能。

## 主页

* 功能：用户列表、待办列表和退出。  

### 用户列表

* 功能：获取用户注册信息。

### 待办列表

* 功能：对用户的待办事项可进行添加、修改、删除、标记完成等功能，实现本地存储。  
* 详细介绍：  
  * 添加：在输入框内输入内容，按下回车键，进行添加（文字前后的空格会被删除）。
  * 修改：1）双击待办事项进行修改，按下回车键或者失去焦点完成修改。2）双击待办事项进行修改，按下esc键取消修改。  
  * 删除：点击每行的“X”按钮，删除此条记录。
  * 完成：点击每行的头部按钮，实现标记完成功能。点击输入框前面的向下箭头，实现全选或全不选功能。  
  * 选择查看：点击最后一行的all、Active、Completed按钮，查看全部、未完成和已完成列表。  
  * Clear completed：点击此按钮，实现清空已完成信息功能。

## 代码结构

```
|——src 资源文件
| |—— api 与后端请求相关代码  
| |—— common 静态资源（字体文件、默认图片、通用js、通用样式css）  
| |—— base 基础组件  
| |—— components 通用组件  
| |—— router 路由  
| |—— App.vue 根组件  
| |—— main.js 入口文件，渲染App.vue文件  
|
|__ prod.server.js 用node执行此文件可以启动打包后的文件dist
```