# CFO·金融·经济 学习博客

这是一个专为金融和商业学习者设计的个人知识博客网页，采用现代毛玻璃设计风格，集成了财务计算器、学习路径和财经时讯等功能。

## 技术栈

- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion (动画效果)
- React Router (路由管理)
- Recharts (数据可视化)

## 功能特点

- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🧮 **财务计算器** - 包含ROI、毛利率、现金流等多种计算器
- 📚 **学习路径** - 系统化的CFO、金融、经济学习资源
- 📊 **Excel教程** - 财务Excel视频教程和模板
- 📰 **财经时讯** - 每日更新的财经新闻和市场分析
- 🎨 **毛玻璃设计** - 现代化的UI设计，带有深度和层次感

## 快速开始

### 前提条件

确保您已安装以下软件：

- Node.js (v18+)
- npm/yarn/pnpm

### 安装与运行

1. 克隆仓库

```bash
git clone <your-repo-url>
cd project_template_react
```

2. 安装依赖

```bash
# 使用npm
npm install

# 或使用pnpm
pnpm install
```

3. 启动开发服务器

```bash
# 使用npm
npm run dev

# 或使用pnpm
pnpm dev
```

开发服务器将在 http://localhost:3000 启动

### 构建生产版本

```bash
# 使用npm
npm run build

# 或使用pnpm
pnpm build
```

构建后的文件将生成在 `dist` 目录中

## 部署到GitHub Pages

### 方法1：手动部署

1. 构建项目

```bash
pnpm build
```

2. 创建一个名为 `gh-pages` 的分支

```bash
git checkout -b gh-pages
```

3. 删除 `gh-pages` 分支中的所有文件（除了 `dist` 目录）

4. 将 `dist` 目录中的内容移动到根目录

5. 提交更改并推送到GitHub

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

6. 在GitHub仓库设置中启用GitHub Pages，选择 `gh-pages` 分支

### 方法2：使用GitHub Actions自动部署

您也可以设置GitHub Actions来自动部署您的项目。在项目根目录创建 `.github/workflows/deploy.yml` 文件，内容如下：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]  # 或者您的主要分支名称

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: pnpm install
      - name: Build
        run: pnpm build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 目录结构

```
├── src/
│   ├── components/    # 可复用组件
│   ├── contexts/      # React上下文
│   ├── hooks/         # 自定义钩子
│   ├── lib/           # 工具函数
│   ├── pages/         # 页面组件
│   ├── App.tsx        # 应用入口组件
│   ├── index.css      # 全局样式
│   └── main.tsx       # 应用挂载点
├── .gitignore         # Git忽略文件
├── package.json       # 项目依赖和脚本
├── README.md          # 项目说明文档
└── vite.config.ts     # Vite配置
```

## 自定义指南

### 修改主题颜色

您可以在 `src/index.css` 文件中修改全局颜色变量：

```css
/* 全局样式增强 */
body {
  background: linear-gradient(
    120deg, 
    #0b1e2e, 
    #1a2f3f, 
    #0a3d62, 
    #1a2f3f
  );
  /* ... */
}
```

### 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/App.tsx` 中添加路由配置

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT

## 致谢

感谢您使用本项目！如果您有任何问题或建议，欢迎提交Issue或Pull Request。

© 2025 · 保持好奇 · 未来CFO