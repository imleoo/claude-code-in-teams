# SuperClaude快速参考 🚀

> SuperClaude为Claude Code提供五种智能行为模式，实现AI协作的自动化和智能化

## 五种行为模式速览

| 模式 | 触发方式 | 核心功能 | 使用场景 |
|---|---|---|---|
| 🧠 **头脑风暴** | `/sc:brainstorm` | 交互式需求发现 | 新项目规划、需求不明确 |
| 🔍 **内省** | `/sc:analyze --introspect` | 元认知分析 | 调试、学习、优化 |
| 📋 **任务管理** | 复杂任务自动触发 | 多步协调 | 大型项目、复杂依赖 |
| 🎯 **编排** | 多工具操作自动触发 | 智能工具路由 | 性能优化、并行处理 |
| ⚡ **令牌效率** | `/sc:command --uc` | 压缩通信 | 资源约束、大型代码库 |

## 核心命令速查

### 需求发现阶段
```bash
/sc:brainstorm "项目想法"           # 交互式需求发现
/sc:workflow "功能描述"            # 生成实施计划
```

### 开发实施阶段
```bash
/sc:implement "功能名称"          # 智能功能实现
/sc:implement "auth system" --type backend --focus security
```

### 质量保证阶段
```bash
/sc:analyze [路径] --focus security    # 代码质量分析
/sc:test --coverage --fix            # 全面测试
/sc:improve --type performance       # 性能优化
```

### 问题诊断阶段
```bash
/sc:troubleshoot "错误描述" --type runtime
/sc:troubleshoot "build failed" --type build
```

## 模式组合工作流

### 标准项目工作流
```bash
# 1. 需求发现
/sc:brainstorm "e-commerce platform"

# 2. 任务规划
/sc:workflow "implement user authentication"

# 3. 功能实现  
/sc:implement "JWT-based auth system"

# 4. 质量验证
/sc:test --coverage

# 5. 优化改进
/sc:improve --focus security
```

### 调试优化工作流
```bash
/sc:troubleshoot "performance issues" --introspect
/sc:analyze . --focus performance
/sc:improve --type performance
```

## 安装与验证

### 终端验证
```bash
# 检查安装状态
python3 -m SuperClaude --version

# 查看已安装组件
python3 -m SuperClaude install --list-components
```

### Claude Code验证
```bash
# 测试基础命令
/sc:brainstorm "test project"
/sc:help                    # 显示可用命令
```

## 快速问题解决

| 问题类型 | 推荐命令 |
|---|---|
| 需求不明确 | `/sc:brainstorm "描述"` |
| 代码质量问题 | `/sc:analyze --focus quality` |
| 安全漏洞 | `/sc:analyze --focus security` |
| 性能瓶颈 | `/sc:troubleshoot "slow" --type performance` |
| 构建失败 | `/sc:troubleshoot --type build` |
| 测试不足 | `/sc:test --coverage --fix` |

## 文档化要求

使用SuperClaude时，确保为每个会话创建相应的文档：

1. **模式使用记录**：记录使用的模式和触发原因
2. **决策过程**：保存AI的推理和选择路径
3. **效果评估**：量化模式使用的效果
4. **经验总结**：积累最佳实践案例

## 与DDAD框架集成

SuperClaude完美契合DDAD（文档驱动AI开发）理念：

- **文档化需求**：头脑风暴模式生成结构化需求文档
- **标准化流程**：任务管理模式创建可重复的工作流程
- **可追溯决策**：内省模式记录所有决策过程
- **知识积累**：每种模式都产生可复用的知识资产