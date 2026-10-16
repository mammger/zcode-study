# ZCode 学习手册

面向日常电脑工作的中文互动教程。使用原生 HTML / CSS / JavaScript，无构建依赖，适合 GitHub Pages。

主线按“原理 → 工作中的问题 → ZCode 功能 → 操作与结果”组织：模型、上下文、Agent、工具、执行环境、项目、本地系统、Skill、角色、插件、流水线、自动化、完整办公案例。十三个主题约 81 分钟，按需阅读，无测验、练习或通关要求。首页另有功能地图，覆盖 Command、Memory、编辑历史、目标模式、闲时任务、远程入口与使用统计等未单列成章的能力。

每篇有操作步骤、办公示例、预期结果和就近的官方来源；“秋季活动筹备”贯穿项目与流程。动态工作流与定时任务分开说明，不暗示保存工作流就会自动排程。

Agent 主题包含聊天与 Agent 对比、运行环境分工图、系统提示词示例、五次模型调用的上下文查看器，以及上下文压缩对比。执行环境章节解释常开电脑、服务器、远程开发与手机远程控制之间的关系；本地系统章节从需求、工作区、实现、localhost 预览到反馈迭代，说明怎样让 ZCode 开发可在本机运行的小工具；插件章节解释 Skill、命令、子智能体、MCP 和 Hook 怎样组成可安装的能力包。其他图解包括训练与使用、技能加载、子智能体交接和材料到产物的完整案例。图中请求与提示词均为原创说明性示例，不是 ZCode 内部实现的还原。

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

本项目仓库：[mammger/zcode-study](https://github.com/mammger/zcode-study)。网站地址：[ZCode 学习手册](https://mammger.github.io/zcode-study/)。

已提供 `.github/workflows/pages.yml`，推送 `main` 分支即可自动发布。它仅发布网页资源，不发布脚本、说明文档和浏览器检查产物。发布状态可在仓库 Actions 中查看。

若希望根地址为 `https://用户名.github.io/`，仓库应命名为 `用户名.github.io`。自定义域名可在 Pages 设置中另外配置。

依据：[GitHub Pages 简介](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。核对日期：2026-10-15。

## 修改内容

- `content.js`：十三个主题、术语、模板与资料来源。
- `app.js`：导航、概念演示、模板下载与最近阅读位置。
- `styles.css`：响应式界面。
- `scripts/build_site.py`：发布时为 CSS、JavaScript 生成带内容指纹的地址，并写入可见版本标识，避免新页面继续使用旧脚本。
- `diagrams.js`：原理图解、上下文演示、项目/任务关系、流水线阶段及操作示例。

修改后检查：

```sh
node --check content.js
node --check app.js
node --check diagrams.js
python3 scripts/build_site.py
```

全部交互均为预设教学模拟，不调用真实模型、邮箱或 ZCode。角色与工作流内容只是说明示例，不安装配置或创建任务。

最近阅读位置只保存在当前浏览器 localStorage；不跨设备同步，没有本站分析统计。使用本机系统字体，不依赖外部字体服务。无需模型 API 密钥；真实 AI 或邮箱功能需要另行设计后端与授权。

## 内容依据

页面 `#sources` 中有官方原文入口与版本说明。以 `https://zcode.z.ai/cn/docs/` 当前官方文档为产品依据；原理参考 Google 的语言模型课程与 Anthropic 的 Agent 文章。动态工作流依据 zai-org/ZCode 官方仓库的 docs/dynamic-workflow.md 和 launch.md，固定到 aac4755666d09fdcd70272fcf063c077a639015f，并在页面标明入口的版本与开放限制。所有会议记录、人名、角色和案例数据为原创示例，教程非 ZCode 官方出品。

## 验证方式

已在 Chrome 验证十二主题和概览、资料页：1440px、390px、320px 均无横向溢出；每篇的操作步骤与就近来源、四阶段流水线切换、章节内跳转、项目目录演示、Agent 五次调用的历史累积与新增标记、三种上下文状态、键盘切换、手机导航、工具能力切换、术语搜索与阅读位置保存均通过。桌面与手机图解已检查截图。图解按说明性模拟验证，不验证真实模型或工具行为。

GitHub Actions 工作流负责 JavaScript 语法检查与 Pages 发布，远程运行结果见仓库 Actions。本地页面使用 HTTP 预览；建议使用上面的本地启动方式。
