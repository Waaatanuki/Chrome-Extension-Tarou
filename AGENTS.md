# 碧蓝幻想Chrome扩展开发指南

## 项目概述

为碧蓝幻想(グランブルーファンタジー)游戏开发的Chrome扩展，提供战斗日志分析、掉落跟踪、队伍编成、抽卡记录等功能。

## 构建命令

- **开发服务器**: `pnpm dev`
- **开发构建**: `pnpm ba`
- **生产构建**: `pnpm bp`
- **创建ZIP包**: `pnpm zip`
- **代码检查**: `pnpm lint`

## 代码规范

- **TypeScript**: 严格模式，启用noUnusedLocals
- **路径别名**: 使用`~/`代替`src/`目录
- **自动导入**: Vue组件、`/src/composables/`方法无需手动导入
- **Lodash**: 使用`lodash-es`而非`lodash`
- **默认导出**: composables使用默认导出，工具函数使用命名导出
- **ESLint**: 使用@antfu/eslint-config配置

## 项目结构

```
src/
├── background/      # 后台服务工作线程
├── composables/     # Vue可组合函数
├── contentScripts/  # 注入脚本
├── logic/          # 数据存储
├── views/          # UI视图
└── constants/      # 常量定义
```

## 技术栈

- Vue 3 + Composition API
- TypeScript + Vite
- Element Plus + UnoCSS
- webext-bridge消息通信
- Cheerio HTML解析

## 数据流

游戏AJAX请求 → 内容脚本(jQuery ajaxSuccess) → webext-bridge → 后台脚本 → useDataCenter处理 → Chrome存储 → UI展示
