# CLAUDE.md

此文件为Claude Code (claude.ai/code)在此代码库中工作时提供指导。

## 项目概述

这是一个为碧蓝幻想(グランブルーファンタジー)游戏开发的Chrome扩展程序。该扩展为玩家提供各种实用工具和增强功能，包括：
- 战斗日志跟踪和分析
- 掉落物品跟踪
- 队伍编成管理
- 抽卡记录跟踪
- 各种游戏活动跟踪
- 每日资源消耗跟踪(AP/BP消耗、物品数量等)

## 架构

扩展遵循标准的Chrome扩展架构，包含：

1. 后台服务工作线程 (src/background/index.ts)：处理扩展生命周期事件，管理内容脚本和弹窗之间的通信，处理从游戏中拦截的网络请求。
2. 内容脚本 (src/contentScripts/index.ts 和 src/contentScripts/inject.ts)：注入到碧蓝幻想页面中，使用jQuery的ajaxSuccess捕获AJAX响应，通过webext-bridge将数据发送到后台脚本。
3. 弹窗/UI (src/main.ts, src/App.vue)：基于Vue 3的用户界面，使用Element Plus UI组件和UnoCSS样式。
4. 数据存储 (src/logic/storage.ts)：使用Chrome存储API和可组合的包装器存储用户数据、设置、战斗记录等。
5. 数据处理 (src/composables/useDataCenter.ts)：核心数据处理逻辑，解析来自AJAX响应的游戏数据，根据游戏事件更新各种数据存储。

## 关键组件

- 数据流：游戏AJAX请求 → 内容脚本 → 后台脚本 → 数据处理 → 存储
- UI框架：Vue 3 with Composition API
- 状态管理：基于自定义可组合存储包装器
- 构建系统：Vite with TypeScript
- UI组件：Element Plus
- 样式：UnoCSS实用优先CSS框架
- 通信：webext-bridge用于扩展各部分之间的消息传递

## 常见开发任务

### 构建命令
```bash
# 开发构建
pnpm ba

# 生产构建
pnpm bp

# 创建zip包
pnpm zip
```

### package.json中的关键脚本

- ba：为开发构建
- bp：为生产构建
- zip：创建可分发的ZIP文件
- lint：运行ESLint

### 项目结构

src/
├── background/         # 后台服务工作线程脚本
├── composables/        # Vue可组合函数用于共享逻辑
├── contentScripts/     # 注入到网页的内容脚本
├── logic/             # 数据存储和逻辑
├── views/             # UI视图/组件
└── constants/         # 常量和默认值

### 数据流详情

1. 游戏向granbluefantasy.jp发出AJAX请求
2. inject.ts使用jQuery ajaxSuccess捕获响应
3. 内容脚本通过webext-bridge将数据转发到后台
4. 后台在useDataCenter.ts的unpack函数中处理数据
5. 处理后的数据通过storage.ts存储在Chrome存储中
6. UI从存储中读取数据显示信息

### 关键数据结构

- 战斗记录和日志
- 抽卡历史和概率
- 活动进度跟踪
- 每日资源消耗
- 队伍编成数据
- 掉落跟踪信息

### 使用的技术

- Vue 3 (Composition API)
- TypeScript
- Vite
- Element Plus UI库
- UnoCSS样式
- webext-bridge用于扩展消息传递
- Cheerio用于HTML解析
