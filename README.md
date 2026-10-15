# ZCode 学习手册

面向日常电脑工作的中文互动教程。使用原生 HTML / CSS / JavaScript，无构建依赖，适合 GitHub Pages。

课程包含 LLM 与上下文、Agent 循环、工具与权限、Skills、自定义角色、项目、工作流与自动化，以及完整办公练习。九章约 66 分钟，可分次学习。

## 本地查看

在项目目录运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

打开 http://127.0.0.1:4173 。也可以直接打开 `index.html`；复制到剪贴板等能力在 HTTP localhost / HTTPS 环境下更可靠。

## 发布到 github.io

1. 在你的 GitHub 账号创建仓库，例如 `zcode-study`。GitHub Free 使用公开仓库即可。
2. 将项目推送到仓库的 `main` 分支。
3. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
4. 在 **Actions** 中运行 `Publish tutorial to GitHub Pages`，或再次推送到 `main` 触发它。
5. 成功后，从部署记录或 Pages 设置中取得实际地址，通常为 `https://用户名.github.io/zcode-study/`。

本项目仓库：[mammgerL/zcode-study](https://github.com/mammgerL/zcode-study)。网站地址：[ZCode 学习手册](https://mammgerl.github.io/zcode-study/)。

已提供 `.github/workflows/pages.yml`，推送 `main` 分支即可自动发布。它仅发布网页资源与练习包，不发布脚本、说明文档和浏览器检查产物。发布状态可在仓库 Actions 中查看。

若希望根地址为 `https://用户名.github.io/`，仓库应命名为 `用户名.github.io`。自定义域名可在 Pages 设置中另外配置。

依据：[GitHub Pages 简介](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。核对日期：2026-10-15。

## 修改内容

- `content.js`：九章课程、问题、术语、模板与资料来源。
- `app.js`：导航、实验、进度、下载与表单行为。
- `styles.css`：响应式界面。
- `scripts/build_practice.py`：生成虚构资料练习包；修改技能/项目规则后重新运行。
- `downloads/zcode-office-practice.zip`：可下载练习资料与参考答案。

修改后检查：

```sh
node --check content.js
node --check app.js
python3 scripts/build_practice.py
```

全部交互均为预设教学模拟，不调用真实模型、邮箱或 ZCode。角色与定时任务生成器只生成文字，不安装配置或创建任务。

进度与输入草稿只保存在当前浏览器 localStorage；不跨设备同步，没有本站分析统计。字体尝试从 Google Fonts 加载，网络不可用时回退到系统字体。无需模型 API 密钥；真实 AI 或邮箱功能需要另行设计后端与授权。

## 内容依据

页面 `#sources` 中有官方原文入口与版本说明。以 `https://zcode.z.ai/cn/docs/` 当前官方文档为产品依据；原理参考 Google 的语言模型课程与 Anthropic 的 Agent 文章。所有会议记录、人名、角色和练习数据为教学设计，教程非 ZCode 官方出品。

## 已完成的验证

通过 Chrome 实际交互检查：九章渲染与答题通关、全部模拟实验、表单和进度刷新保留、技能和 ZIP 下载、剪贴板复制、术语搜索及 Esc 关闭、键盘跳过导航、390px 手机导航与页面溢出、项目子路径资源加载。JavaScript 语法检查与练习 ZIP 完整性检查通过。

GitHub Actions 工作流负责语法检查、练习包生成和 Pages 发布，远程运行结果见仓库 Actions。本地页面通过 HTTP 预览验证；自动化浏览器不支持直接验证 file:// 页面，建议使用上面的本地 HTTP 启动方式。
