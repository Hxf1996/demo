# webpack

> 一个vue项目模板

## 使用手册

``` bash

# 安装依赖
npm install

# 启动本地服务，热重载 + 端口默认：8080
npm run dev

# 将文件打包到./dist目录下
npm run build

```

## 技术总览

* JS框架：vue

  地址：https://github.com/vuejs/vue

* HTTP库：axios

  地址：https://github.com/mzabriskie/axios

* CSS处理器：postcss(import, cssnext, cssnano)

  import地址: https://github.com/postcss/postcss-import

  cssnext地址: https://github.com/MoOx/postcss-cssnext

  cssnano地址: https://github.com/ben-eb/cssnano

## 目录说明

```js

|-- README.md                // 帮助文档
|-- index.html               // 模板页面
|-- build                    // 打包配置
|   |-- build.js             // 生产环境的配置
|   |-- dev-server.js        // 开发环境的配置
|-- config                   // 变量设置
|-- src                      // 源代码
|   |-- api                  // ajax请求模块
|   |-- assets               // src中引用的打包资源
|   |-- components           // 公共组件
|   |-- libs                 // 函数库
|   |-- router               // vue-router目录
|   |-- store                // vuex目录
|   |-- page                 // 视图文件（入口文件）
|-- static                   // 静态文件（直接迁移）
|   |-- manifest.json        // 应用信息文件

```

## 语法规范

### 基础
* 缩进：4空格
* 文件编码： UTF-8

### HTML
* 元素属性值必须包含在双引号中
* class 必须单词全字母小写，单词间以 - 分隔
* id、class 命名，在避免冲突并描述清楚
* 标签名必须使用小写字母
* 标签必须闭合
* 布尔类型的属性，不添加属性值
* 为重要图片添加 alt 属性
* 使用 button 元素时必须指明 type 属性值

### JS
* 采用`ESlint`检查代码规范
* 采用`airbnb`规范（https://github.com/airbnb/javascript）
* 改动
    - 只能使用单引号
    - 单行最大字符数150
    - 参数的属性可以修改，但参数本身不可更改

### CSS

* 每个声明块的左花括号前添加一个空格，右花括号应当单独成行
* 每条声明语句的 : 后应该插入一个空格
* 对于属性值或颜色参数，省略小于`1`的小数前面的`0`
* 十六进制值应该全部小写且尽量使用简写形式
* 避免为 0 值指定单位，如：`margin: 0;` 代替 `margin: 0px;`
* 将媒体查询放在尽可能相关规则的附近

* 变量 （扩展css4语法）

    - 单个属性
    ```css

    :root {
      --mainColor: red;
    }

    a {
      color: var(--mainColor);
    }

    ```

    - 多个属性
    ```css

    :root {
      --danger-theme: {
        color: white;
        background-color: red;
      };
    }

    .danger {
      @apply --danger-theme;
    }

    ```

    - 多个选择器
    ```css

    @custom-selector :--button button, .button;
    @custom-selector :--enter :hover, :focus;

    :--button {
        // button, .button
    }
    :--button:--enter {
        // button:hover, button:focus, .button:hover, .button:focus
    }

    ```

* CSS嵌套（扩展css4语法）

```css

  a {
      & span {
          color: white;
      }

      @media (min-width: 30em) {
          color: yellow;
      }
  }

```
* @import (加载相应文件)

  ```css

  @import './common.css';

  ```

### VUE


