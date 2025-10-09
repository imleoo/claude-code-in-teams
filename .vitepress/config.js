import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "团队Vibe Coding开发指南 - DDAD方法论",
  description: "AI时代下的团队协作开发实践指南",
  base: '/claude-code-in-teams/',
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/imleoo/claude-code-in-teams' }
    ],
    sidebar: [
      {
        text: '第一部分：开篇与核心概念',
        collapsed: false,
        items: [
          { text: '前言', link: '/readme' },
          {
            text: '第1章 前言——为什么需要团队 Vibe Coding',
            link: '/part1/chapter1.md',
            items: [
              { text: '写作背景与行业变革', link: '/part1/chapter1/background.md' },
              { text: '文档驱动AI开发（DDAD）理念导入', link: '/part1/chapter1/ddad.md' },
              { text: '目标读者与阅读收益', link: '/part1/chapter1/audience.md' },
              { text: '行业趋势与挑战', link: '/part1/chapter1/trends.md' }
            ]
          },
          {
            text: '第2章 核心概念解析',
            link: '/part1/chapter2.md',
            items: [
              { text: '什么是"团队 Vibe Coding"', link: '/part1/chapter2/definition.md' },
              { text: '场景适配与风险等级矩阵', link: '/part1/chapter2/risk-matrix.md' },
              { text: '团队效能关键因素', link: '/part1/chapter2/team-effectiveness.md' }
            ]
          }
        ]
      },
      {
        text: '第二部分：工具准备与基础操作',
        collapsed: false,
        items: [
          {
            text: '第3章 AI工具与开发环境搭建',
            link: '/part2/chapter3.md',
            items: [
              { text: '主流AI编码工具对比', link: '/part2/chapter3/tools-comparison.md' },
              { text: '文档工具体系与树状结构设计', link: '/part2/chapter3/doc-system.md' },
              { text: 'MCP服务器与项目管理集成', link: '/part2/chapter3/mcp-integration.md' }
            ]
          },
          {
            text: '第4章 Claude Code核心操作',
            link: '/part2/chapter4.md',
            items: [
              { text: '上下文控制与信息管理', link: '/part2/chapter4/context-control.md' },
              { text: '文档驱动的AI交互流程', link: '/part2/chapter4/doc-driven-flow.md' },
              { text: '实时协作与沟通机制', link: '/part2/chapter4/collaboration.md' }
            ]
          }
        ]
      },
      {
        text: '第三部分：团队协作核心流程',
        collapsed: false,
        items: [
          {
            text: '第5章 需求拆解与任务分配',
            link: '/part3/chapter5.md',
            items: [
              { text: 'AI辅助的需求分析方法', link: '/part3/chapter5/requirement-analysis.md' },
              { text: '需求阶段的心理安全建设', link: '/part3/chapter5/psychological-safety.md' },
              { text: '需求文档标准化', link: '/part3/chapter5/doc-standards.md' }
            ]
          },
          {
            text: '第6章 产品与架构设计',
            link: '/part3/chapter6.md',
            items: [
              { text: 'AI驱动的产品设计与管理', link: '/part3/chapter6/product-design.md' },
              { text: 'AI辅助的系统架构与UI/UX设计', link: '/part3/chapter6/architecture-design.md' }
            ]
          },
          {
            text: '第7章 多会话并行开发',
            link: '/part3/chapter7.md',
            items: [
              { text: 'Git Worktrees 多会话管理', link: '/part3/chapter7/git-worktrees.md' },
              { text: '跨会话文档同步机制', link: '/part3/chapter7/doc-sync.md' },
              { text: 'AI驱动的协作诊断', link: '/part3/chapter7/ai-diagnosis.md' }
            ]
          },
          {
            text: '第8章 代码审查与质量管控',
            link: '/part3/chapter8.md',
            items: [
              { text: 'AI增强的代码审查流程', link: '/part3/chapter8/ai-code-review.md' },
              { text: '文档驱动的自动测试体系', link: '/part3/chapter8/doc-driven-testing.md' },
              { text: '大厂经验借鉴', link: '/part3/chapter8/best-practices.md' }
            ]
          }
        ]
      },
      {
        text: '第四部分：实战案例',
        collapsed: false,
        items: [
          {
            text: '第9章 CI/CD自动化实践',
            link: '/part4/chapter9.md',
            items: [
              { text: '项目背景与团队分工', link: '/part4/chapter9/project-setup.md' },
              { text: '树状文档与模块信息表实践', link: '/part4/chapter9/doc-practice.md' },
              { text: 'AI辅助开发全流程示例', link: '/part4/chapter9/development-flow.md' },
              { text: '构建与优化智能CI/CD流水线', link: '/part4/chapter9/cicd.md' }
            ]
          },
          {
            text: '第10章 API文档自动化重构（中风险）',
            link: '/part4/chapter10.md',
            items: [
              { text: '遗留代码的智能考古与文档生成', link: '/part4/chapter10/legacy-code-analysis.md' },
              { text: 'AI辅助的数据迁移策略与验证', link: '/part4/chapter10/data-migration.md' },
              { text: '高性能后端的重构与查询优化', link: '/part4/chapter10/backend-refactor.md' },
              { text: '现代前端的组件化重写', link: '/part4/chapter10/frontend-rewrite.md' },
              { text: '重构规划与效率提升', link: '/part4/chapter10/refactoring.md' },
              { text: '流程闭环与交付成果', link: '/part4/chapter10/delivery.md' },
              { text: '新旧系统并行与无缝切换', link: '/part4/chapter10/switch-over.md' }
            ]
          }
        ]
      },
      {
        text: '第五部分:高风险场景与企业实践',
        collapsed: false,
        items: [
          {
            text: '第11章 知识库与文档站点构建（高风险）',
            link: '/part5/chapter11.md',
            items: [
              { text: '跨部门AI协作架构设计', link: '/part5/chapter11/architecture.md' },
              { text: '数据层、能力层、应用层方案', link: '/part5/chapter11/layered-solution.md' },
              { text: 'AI辅助的性能建模与瓶颈预测', link: '/part5/chapter11/performance-modeling.md' },
              { text: '并发安全与形式化验证', link: '/part5/chapter11/concurrent-safety.md' },
              { text: 'AI模型的可解释性与公平性保障', link: '/part5/chapter11/explainable-ai.md' },
              { text: '"影子"与"回放"：零风险的线上验证', link: '/part5/chapter11/shadow-replay.md' },
              { text: '基于AI分析的智能A/B测试与模型迭代', link: '/part5/chapter11/intelligent-ab-testing.md' },
              { text: '实际成效与可复制经验', link: '/part5/chapter11/results.md' }
            ]
          },
          {
            text: '第12章 文档国际化最佳实践',
            link: '/part5/chapter12.md',
            items: [
              { text: '风险分级使用策略', link: '/part5/chapter12/risk-strategies.md' },
              { text: '开发者体验优化', link: '/part5/chapter12/developer-experience.md' },
              { text: 'AI协作治理框架', link: '/part5/chapter12/governance.md' }
            ]
          },
          {
            text: '第13章 开源协作与问题解决',
            link: '/part5/chapter13.md',
            items: [
              { text: '如何有效管控AI的"幻觉"？', link: '/part5/chapter13/ai-hallucination.md' },
              { text: '如何处理并行开发中的合并冲突？', link: '/part5/chapter13/merge-conflicts.md' },
              { text: '冲突处理机制', link: '/part5/chapter13/conflict-resolution.md' },
              { text: '如何修复团队的心理安全障碍？', link: '/part5/chapter13/psychological-safety.md' },
              { text: '心理安全障碍修复', link: '/part5/chapter13/safety-repair.md' },
              { text: '如何管理"人机在环"的协作成本？', link: '/part5/chapter13/collaboration-cost.md' },
              { text: '如何应对工具链的复杂性挑战？', link: '/part5/chapter13/toolchain-complexity.md' }
            ]
          }
        ]
      },
      {
        text: '附录',
        collapsed: false,
        items: [
          { text: '后记：Vibe永续，代码长青', link: '/appendix/epilogue.md' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/imleoo/claude-code-in-teams' }
    ]
  }
})
