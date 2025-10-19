# 附录：核心文档模板集合

本附录提供了“团队Vibe Coding”模式中两个最核心的元文档模板：`CLAUDE.md` (项目信息表) 和 `modules.md` (模块信息表)。这些文档是AI理解项目、与团队高效协作的基石。

---

## 1. CLAUDE.md (项目信息表) 模板

`CLAUDE.md` 是与AI协作的“根文件”，是整个项目的“索引”或“摘要”。在开始一个新的AI会话时，应首先将此文件内容提供给AI。

```markdown
# 项目信息表：[你的项目名称]

## 1. 项目概述 (Project Overview)
- **项目名称**: [项目全名]
- **一句话描述**: [用一句话描述这个项目是做什么的]
- **风险等级**: [高 / 中 / 低，参考第2章风险矩阵]
- **代码仓库**: [代码库Git地址]

## 2. 核心目标 (Key Objectives)
- [目标1，最好是可量化的，例如：将XX接口的响应时间降低50%]
- [目标2，例如：实现XX功能，支持XX业务]
- [目标3]

## 3. 技术栈 (Tech Stack)
- **前端**: [例如：Vue 3, TypeScript, Vite, Pinia]
- **后端**: [例如：Go, Gin, GORM]
- **数据库**: [例如：PostgreSQL, Redis]
- **AI服务**: [例如：Claude 3 Sonnet, OpenAI API]
- **部署环境**: [例如：Docker, Kubernetes, AWS]

## 4. 关键文档入口 (Key Document Entrypoints)
- **产品需求 (PRD)**: `[链接到PRD文档]`
- **系统架构**: `[链接到架构图或设计文档]`
- **API规范**: `[链接到OpenAPI/Swagger文件]`
- **模块信息表**: `[链接到modules.md]`

## 5. 交互指南 (Interaction Guide)
- **代码风格**: [例如：遵循Google Go Style Guide]
- **命名约定**: [例如：接口使用UpperCamelCase, 函数使用lowerCamelCase]
- **核心原则**: [例如：安全第一，性能优先]
- **禁止操作**: [例如：禁止直接操作生产数据库]
```

---

## 2. modules.md (模块信息表) 模板

`modules.md` 是代码库的详细地图，将功能、代码和人关联起来。

```markdown
# 模块信息表

| 模块名称 | 核心职责 | 关键代码目录/文件 | 负责人 |
| :--- | :--- | :--- | :--- |
| **`[模块名-示例]`** | [该模块负责的核心功能] | `src/modules/[模块路径]/` | [负责人姓名 (角色)] |
| | | | |
| | | | |