# 树状文档与模块信息表实践

在“团队Vibe Coding”中，文档不再是代码的附属品，而是驱动开发的“第一公民”。对于RAG聊天机器人项目，我们构建了一个清晰的、AI可读的树状文档结构，并创建了两个关键的元文档：“项目信息表 (`CLAUDE.md`)” 和 “模块信息表”，它们是AI理解项目的核心入口。

## 1. 整体树状文档结构

我们设计的文档目录结构如下，它清晰地反映了项目从需求到设计再到决策的全过程。

```
docs/
├── 00_Project_Info/
│   ├── CLAUDE.md                # (核心) AI交互的起点，项目元信息
│   └── modules.md               # (核心) 模块信息表
├── 01_Requirements/
│   ├── PRD-RAG-Chatbot.md       # 产品需求文档
│   └── user_stories.md          # 用户故事
├── 02_Architecture_Design/
│   ├── tech_stack.md            # 技术选型方案
│   └── system_architecture.md   # 系统架构图与说明
├── 03_API_Design/
│   └── openapi.v1.yaml          # OpenAPI v3 规范
├── 04_Meeting_Notes/
│   └── 2025-08-20_kickoff.md    # 项目启动会纪要
└── 05_ADR/
    └── ADR-001_use_postgresql.md # 架构决策记录
```

这个结构的好处是：
- **逻辑清晰**：按项目生命周期组织，方便人类查找。
- **AI友好**：结构化的路径和文件名本身就构成了有意义的上下文。当AI需要查找API设计时，它会知道优先查看`03_API_Design/`目录。

## 2. 项目信息表 (`CLAUDE.md`)：AI的“项目说明书”

`CLAUDE.md` 是我们与AI协作的“根文件”，是整个项目的“索引”或“摘要”。每当开始一个新的AI会话时，我们都会首先将这个文件的内容提供给AI，让它在几秒钟内建立起对项目的宏观认知。

**`docs/00_Project_Info/CLAUDE.md` 内容示例：**

```markdown
# 项目信息表：智能客服RAG聊天机器人

## 1. 项目概述 (Project Overview)
- **项目名称**: 智能客服RAG聊天机器人
- **一句话描述**: 一个基于内部知识库，使用RAG技术为客服团队提供支持的AI聊天机器人。
- **风险等级**: 低
- **代码仓库**: `https://github.com/our-company/rag-chatbot`

## 2. 核心目标 (Key Objectives)
- 将40%的重复性客服工单自动化。
- 对标准问题的回答准确率达到85%以上。
- 95%的查询响应时间在3秒以内。

## 3. 技术栈 (Tech Stack)
- **前端**: React (Vite), TypeScript, Tailwind CSS
- **后端**: Python, FastAPI
- **数据库**: PostgreSQL (用于对话历史), pgvector (用于向量存储)
- **AI服务**: OpenAI API (gpt-4, text-embedding-ada-002)

## 4. 关键文档入口 (Key Document Entrypoints)
- **产品需求 (PRD)**: `docs/01_Requirements/PRD-RAG-Chatbot.md`
- **系统架构**: `docs/02_Architecture_Design/system_architecture.md`
- **API规范**: `docs/03_API_Design/openapi.v1.yaml`
- **模块信息表**: `docs/00_Project_Info/modules.md`

## 5. 交互指南 (Interaction Guide)
- **代码风格**: 遵循Google TypeScript Style Guide和PEP 8。
- **命名约定**: 前端组件使用PascalCase, 后端函数使用snake_case。
- **核心原则**: 安全第一，代码质量优先于开发速度。
```

这个文件就像是给AI的“项目岗前培训材料”，简洁、全面、直达重点。

## 3. 模块信息表 (`modules.md`)：代码库的“导航地图”

如果说`CLAUDE.md`是项目概览，那么`modules.md`就是代码库的详细地图。它将项目的宏观功能与具体的代码目录和负责人关联起来。

**`docs/00_Project_Info/modules.md` 内容示例：**

```markdown
# 模块信息表

| 模块名称 | 核心职责 | 关键代码目录 | 负责人 |
| :--- | :--- | :--- | :--- |
| **`frontend-chat-ui`** | 聊天界面与用户交互 | `src/features/chat/` | 李雪 (FE) |
| **`frontend-doc-mgmt`** | 知识库文档上传与管理界面 | `src/features/docs/` | 李雪 (FE) |
| **`backend-api-server`** | FastAPI应用主服务和路由 | `app/main.py`, `app/api/` | 张伟 (BE) |
| **`backend-rag-engine`** | RAG检索与生成核心逻辑 | `app/services/rag_service.py` | 王浩 (AIE) |
| **`backend-doc-parser`** | 文档解析、切分与向量化 | `app/services/document_service.py` | 王浩 (AIE) |
| **`backend-db-models`** | 数据库模型与对话历史管理 | `app/models/` | 张伟 (BE) |
```

这个表格的价值在于：
- **快速定位**：当AI需要修改“文档上传”相关功能时，它能通过查表，迅速定位到关键代码在`src/features/docs/`，而不需要在整个代码库中盲目搜索。
- **明确责任人**：当AI在审查代码时发现一个后端API的问题，它知道这个问题应该@张伟，而不是其他成员。

---

**本节小结：** “磨刀不误砍柴工”。通过在项目初期投入少量时间，精心设计树状文档结构，并创建`CLAUDE.md`和`modules.md`这两个核心元文档，我们为整个项目建立了一个清晰、一致、AI可读的“知识底座”。这个底座是后续所有高效人机协作得以展开的先决条件，是“团队Vibe Coding”模式的真正起点。

**下一节：** [AI辅助开发全流程示例](development-flow.md)