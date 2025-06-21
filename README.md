# JSON Formatter

一个强大的JSON格式化工具，提供格式化、转义和语法高亮功能，帮助开发者更方便地处理JSON数据。

## 📋 功能特点

- **JSON格式化**：自动将紧凑的JSON字符串转换为具有适当缩进和换行的格式化版本
- **语法高亮**：使用不同颜色和样式高亮显示JSON数据的不同元素，增强可读性
- **转义处理**：正确处理JSON中的特殊字符和Unicode序列
- **大数据支持**：能够高效处理大容量JSON数据
- **跨平台可用**：支持Windows、macOS和Linux平台

## 🔧 技术栈

- **前端**：React、Webpack、Babel
- **后端**：Express.js
- **打包工具**：pkg

## 📥 安装

### 先决条件

- Node.js 16+
- npm 或 yarn

### 开发环境安装

1. 克隆仓库：

```bash
git clone <repository-url>
cd json-formatter
```

2. 安装依赖：

```bash
npm install
# 或
yarn install
```

## 🚀 使用方法

### 开发模式

启动开发服务器：

```bash
npm start
# 或
yarn start
```

应用将在浏览器中自动打开，默认地址为 [http://localhost:8080](http://localhost:8080)。

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

构建后的文件将位于 `dist` 目录中。

### 启动服务器

```bash
npm run server
# 或
yarn server
```

服务器将在 [http://localhost:3000](http://localhost:3000) 上运行。

### 打包为可执行文件

```bash
npm run pkg
# 或
yarn pkg
```

打包后的可执行文件将位于 `bin` 目录中，适用于Windows、macOS和Linux平台。

## 📁 项目结构

```
.
├── public/                # 静态资源目录
│   └── index.html         # HTML模板
├── src/                   # 源代码目录
│   ├── components/        # React组件
│   │   ├── FormattedOutput.js  # 格式化输出组件
│   │   ├── JsonInput.js        # JSON输入组件
│   │   └── JsonNode.js         # JSON节点组件
│   ├── App.js            # 主应用组件
│   ├── index.js          # 应用入口
│   └── styles.css        # 全局样式
├── bin/                  # 可执行文件目录
├── dist/                 # 构建输出目录
├── server.js             # Express服务器
├── webpack.config.js     # Webpack配置
└── package.json          # 项目配置与依赖
```

## 📃 许可证

该项目采用 ISC 许可证 - 详情请参阅 LICENSE 文件。