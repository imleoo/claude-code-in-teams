# Claude Code CLI 参考手册

## 概述

Claude Code 命令行界面 (CLI) 是一个强大的工具，让开发者能够在终端中直接使用 Claude Code 的所有功能。CLI 工具支持项目管理、代码生成、分析、测试等全方位的开发任务，是提升开发效率的重要工具。

## 安装和配置

### 安装 CLI

```bash
# 通过 npm 安装
npm install -g @anthropic/claude-code-cli

# 通过 yarn 安装
yarn global add @anthropic/claude-code-cli

# 通过 pip 安装 (Python 版本)
pip install claude-code-cli

# 验证安装
claude-code --version
```

### 初始配置

```bash
# 配置 API 密钥
claude-code config set api-key YOUR_API_KEY

# 配置默认模型
claude-code config set model claude-3-5-sonnet-20241022

# 查看当前配置
claude-code config list

# 配置代理 (如需要)
claude-code config set proxy http://proxy.company.com:8080
```

## 1. 基础命令

### `claude-code init`

初始化新的 Claude Code 项目。

#### 语法
```bash
claude-code init [project-name] [options]
```

#### 选项
- `--template, -t <template>`: 使用指定模板
- `--language, -l <language>`: 设置项目主要语言
- `--framework, -f <framework>`: 选择框架
- `--git`: 初始化 Git 仓库
- `--install`: 自动安装依赖

#### 示例
```bash
# 创建基础项目
claude-code init my-project

# 使用 React 模板创建项目
claude-code init my-app --template react --language typescript

# 创建 Node.js API 项目
claude-code init my-api --template node-api --framework express --git

# 交互式创建项目
claude-code init --interactive
```

#### 可用模板
```bash
# 查看所有可用模板
claude-code templates list

# 模板类别
├─ Frontend
│  ├─ react          # React + TypeScript
│  ├─ vue            # Vue.js 3
│  ├─ angular        # Angular
│  └─ svelte         # Svelte
├─ Backend
│  ├─ node-api       # Node.js API
│  ├─ python-api     # FastAPI/Flask
│  ├─ go-api         # Go Gin/Echo
│  └─ rust-api       # Rust Actix
├─ Fullstack
│  ├─ nextjs         # Next.js
│  ├─ nuxt           # Nuxt.js
│  └─ t3-stack       # T3 Stack
└─ Mobile
   ├─ react-native   # React Native
   └─ flutter        # Flutter
```

### `claude-code generate`

生成代码、文档或其他项目文件。

#### 语法
```bash
claude-code generate <type> [options]
```

#### 代码生成
```bash
# 生成 React 组件
claude-code generate component UserProfile --props "name:string,age:number"

# 生成 API 路由
claude-code generate api users --methods "GET,POST,PUT,DELETE"

# 生成数据库模型
claude-code generate model User --fields "name:string,email:string,createdAt:date"

# 生成测试文件
claude-code generate test UserService --type unit

# 生成 TypeScript 接口
claude-code generate interface ApiResponse --fields "data:any,status:number,message:string"
```

#### 文档生成
```bash
# 生成 API 文档
claude-code generate docs api --format openapi

# 生成 README
claude-code generate readme --sections "installation,usage,api,contributing"

# 生成变更日志
claude-code generate changelog --from v1.0.0 --to v1.1.0

# 生成项目文档
claude-code generate docs project --include-architecture
```

#### 配置文件生成
```bash
# 生成 Docker 配置
claude-code generate docker --service web --database postgres

# 生成 CI/CD 配置
claude-code generate ci github-actions --tests --deploy

# 生成 ESLint 配置
claude-code generate config eslint --preset typescript

# 生成 Prettier 配置
claude-code generate config prettier --semi --single-quote
```

### `claude-code analyze`

分析代码质量、性能和安全性。

#### 语法
```bash
claude-code analyze [target] [options]
```

#### 代码分析
```bash
# 分析整个项目
claude-code analyze .

# 分析特定文件
claude-code analyze src/components/UserProfile.tsx

# 分析特定目录
claude-code analyze src/services/ --recursive

# 性能分析
claude-code analyze . --performance --report

# 安全分析
claude-code analyze . --security --severity high

# 代码质量分析
claude-code analyze . --quality --metrics complexity,maintainability
```

#### 分析选项
- `--performance`: 性能分析
- `--security`: 安全漏洞检测
- `--quality`: 代码质量评估
- `--dependencies`: 依赖分析
- `--coverage`: 测试覆盖率分析
- `--report`: 生成详细报告
- `--format <format>`: 输出格式 (json, html, markdown)
- `--output <file>`: 输出到文件

#### 示例输出
```bash
claude-code analyze src/ --quality --report

📊 代码质量分析报告

🎯 总体评分: B+ (82/100)

📈 指标详情:
├─ 可维护性: 85/100 ✅
├─ 可读性: 78/100 ⚠️
├─ 复杂度: 72/100 ⚠️
├─ 测试覆盖率: 89/100 ✅
└─ 文档完整性: 65/100 ❌

🔍 主要问题:
1. 函数复杂度过高 (src/utils/parser.ts:45)
2. 缺少类型注释 (src/services/api.ts:23)
3. 未处理的异常 (src/components/Form.tsx:67)

💡 改进建议:
1. 重构复杂函数，拆分为更小的单元
2. 添加完整的 TypeScript 类型定义
3. 实现全面的错误处理机制
```

## 2. 项目管理命令

### `claude-code project`

项目级别的管理和操作。

#### 子命令

##### `project info`
```bash
# 显示项目信息
claude-code project info

# 输出示例
📋 项目信息

🏷️  名称: my-awesome-app
📁 路径: /Users/dev/projects/my-awesome-app
🏗️  类型: React TypeScript Application
📦 包管理器: npm
🔧 构建工具: Vite

📊 项目统计:
├─ 文件总数: 156
├─ 代码行数: 12,847
├─ 测试文件: 23
├─ 依赖包数: 45
└─ 开发依赖: 28

🎯 最近活动:
├─ 最后提交: 2小时前
├─ 活跃分支: feature/user-auth
└─ 待处理问题: 3个
```

##### `project status`
```bash
# 检查项目状态
claude-code project status

# 详细状态检查
claude-code project status --detailed

# 输出示例
🔍 项目状态检查

✅ 依赖完整性: 所有依赖已安装
✅ 代码格式: 符合项目规范
⚠️  测试覆盖率: 78% (目标: 80%)
❌ 安全漏洞: 发现 2 个中等风险漏洞
✅ 构建状态: 构建成功
⚠️  文档更新: 3 个 API 缺少文档

🔧 建议操作:
1. 运行 npm audit fix 修复安全漏洞
2. 增加测试用例提升覆盖率
3. 更新 API 文档
```

##### `project clean`
```bash
# 清理项目
claude-code project clean

# 深度清理
claude-code project clean --deep

# 清理特定内容
claude-code project clean --cache --logs --temp
```

### `claude-code workspace`

工作空间管理命令。

#### 子命令
```bash
# 创建工作空间
claude-code workspace create team-workspace

# 列出工作空间
claude-code workspace list

# 切换工作空间
claude-code workspace switch team-workspace

# 工作空间信息
claude-code workspace info

# 同步工作空间
claude-code workspace sync

# 分享工作空间配置
claude-code workspace export --output workspace-config.json
```

## 3. 代码操作命令

### `claude-code refactor`

代码重构工具。

#### 语法
```bash
claude-code refactor <operation> [target] [options]
```

#### 重构操作
```bash
# 提取函数
claude-code refactor extract-function src/utils.ts:45-67 --name calculateTotal

# 重命名变量
claude-code refactor rename userData --to userInformation --scope file

# 提取组件
claude-code refactor extract-component src/pages/Dashboard.tsx:120-180 --name UserCard

# 移动文件
claude-code refactor move src/components/old/ --to src/components/ui/

# 合并重复代码
claude-code refactor deduplicate src/services/ --similarity 0.8

# 优化导入
claude-code refactor imports src/ --remove-unused --sort
```

#### 高级重构
```bash
# 架构重构
claude-code refactor architecture --pattern mvc --target src/

# 性能优化重构
claude-code refactor performance --target src/components/ --lazy-loading

# 类型安全重构
claude-code refactor types --strict --target src/

# 现代化重构
claude-code refactor modernize --es2022 --target src/
```

### `claude-code fix`

自动修复代码问题。

#### 语法
```bash
claude-code fix [target] [options]
```

#### 修复类型
```bash
# 修复 ESLint 错误
claude-code fix . --eslint

# 修复 TypeScript 错误
claude-code fix . --typescript

# 修复安全漏洞
claude-code fix . --security

# 修复性能问题
claude-code fix . --performance

# 修复可访问性问题
claude-code fix . --accessibility

# 自动修复所有问题
claude-code fix . --all --auto
```

#### 修复选项
- `--dry-run`: 预览修复但不应用
- `--interactive`: 交互式修复
- `--backup`: 修复前创建备份
- `--report`: 生成修复报告

### `claude-code optimize`

代码优化工具。

#### 语法
```bash
claude-code optimize [target] [options]
```

#### 优化类型
```bash
# 性能优化
claude-code optimize . --performance

# 包大小优化
claude-code optimize . --bundle-size

# 内存使用优化
claude-code optimize . --memory

# 数据库查询优化
claude-code optimize . --database

# 图片资源优化
claude-code optimize assets/ --images

# CSS 优化
claude-code optimize styles/ --css --minify
```

## 4. 测试命令

### `claude-code test`

测试管理和执行。

#### 语法
```bash
claude-code test [command] [options]
```

#### 测试执行
```bash
# 运行所有测试
claude-code test run

# 运行特定测试文件
claude-code test run UserService.test.ts

# 运行特定测试套件
claude-code test run --suite integration

# 监视模式运行测试
claude-code test run --watch

# 运行测试并生成覆盖率报告
claude-code test run --coverage

# 运行性能测试
claude-code test run --performance
```

#### 测试生成
```bash
# 为文件生成测试
claude-code test generate src/services/UserService.ts

# 生成集成测试
claude-code test generate --type integration --target src/api/

# 生成端到端测试
claude-code test generate --type e2e --scenarios login,checkout

# 生成性能测试
claude-code test generate --type performance --endpoints /api/users,/api/orders
```

#### 测试分析
```bash
# 分析测试覆盖率
claude-code test coverage --report html

# 分析测试性能
claude-code test performance --benchmark

# 测试质量分析
claude-code test quality --metrics reliability,maintainability

# 查找测试缺口
claude-code test gaps --suggest
```

## 5. 部署和发布命令

### `claude-code deploy`

部署管理工具。

#### 语法
```bash
claude-code deploy [environment] [options]
```

#### 部署操作
```bash
# 部署到开发环境
claude-code deploy dev

# 部署到生产环境
claude-code deploy prod --confirm

# 蓝绿部署
claude-code deploy prod --strategy blue-green

# 金丝雀部署
claude-code deploy prod --strategy canary --percentage 10

# 回滚部署
claude-code deploy rollback --version v1.2.3

# 查看部署状态
claude-code deploy status

# 部署健康检查
claude-code deploy health-check --environment prod
```

#### 部署配置
```bash
# 初始化部署配置
claude-code deploy init

# 验证部署配置
claude-code deploy validate

# 部署预检查
claude-code deploy pre-check --environment prod

# 生成部署报告
claude-code deploy report --from v1.0.0 --to v1.1.0
```

### `claude-code release`

版本发布管理。

#### 语法
```bash
claude-code release [command] [options]
```

#### 发布操作
```bash
# 创建新版本
claude-code release create --version 1.2.0

# 自动版本号
claude-code release create --auto --type minor

# 预发布版本
claude-code release create --prerelease --tag beta

# 发布到 npm
claude-code release publish --registry npm

# 发布到私有仓库
claude-code release publish --registry private --token TOKEN

# 生成发布说明
claude-code release notes --from v1.1.0 --to v1.2.0
```

## 6. 协作命令

### `claude-code team`

团队协作工具。

#### 语法
```bash
claude-code team [command] [options]
```

#### 团队管理
```bash
# 初始化团队配置
claude-code team init

# 添加团队成员
claude-code team add-member john@company.com --role developer

# 同步团队设置
claude-code team sync

# 团队代码规范检查
claude-code team lint --rules team-standards

# 生成团队报告
claude-code team report --period monthly

# 知识分享
claude-code team share --topic "React最佳实践" --format markdown
```

### `claude-code review`

代码审查工具。

#### 语法
```bash
claude-code review [target] [options]
```

#### 审查操作
```bash
# 审查当前分支
claude-code review current

# 审查特定提交
claude-code review commit abc123

# 审查 Pull Request
claude-code review pr 42

# 自动审查
claude-code review auto --rules security,performance,style

# 生成审查报告
claude-code review report --format html --output review-report.html

# 审查建议
claude-code review suggest --focus maintainability
```

## 7. 配置和插件命令

### `claude-code config`

配置管理工具。

#### 语法
```bash
claude-code config [command] [options]
```

#### 配置操作
```bash
# 查看所有配置
claude-code config list

# 设置配置项
claude-code config set editor.theme dark

# 获取配置项
claude-code config get editor.theme

# 重置配置
claude-code config reset

# 导出配置
claude-code config export --output config.json

# 导入配置
claude-code config import config.json

# 验证配置
claude-code config validate
```

#### 常用配置项
```bash
# API 配置
claude-code config set api.key YOUR_API_KEY
claude-code config set api.model claude-3-5-sonnet-20241022
claude-code config set api.timeout 30000

# 编辑器配置
claude-code config set editor.theme dark
claude-code config set editor.fontSize 14
claude-code config set editor.tabSize 2

# 输出配置
claude-code config set output.format markdown
claude-code config set output.verbose true
claude-code config set output.color true

# 项目配置
claude-code config set project.defaultLanguage typescript
claude-code config set project.testFramework jest
claude-code config set project.linter eslint
```

### `claude-code plugin`

插件管理工具。

#### 语法
```bash
claude-code plugin [command] [options]
```

#### 插件操作
```bash
# 列出已安装插件
claude-code plugin list

# 搜索插件
claude-code plugin search react

# 安装插件
claude-code plugin install @claude-code/react-plugin

# 卸载插件
claude-code plugin uninstall @claude-code/react-plugin

# 更新插件
claude-code plugin update @claude-code/react-plugin

# 更新所有插件
claude-code plugin update --all

# 插件信息
claude-code plugin info @claude-code/react-plugin

# 启用/禁用插件
claude-code plugin enable @claude-code/react-plugin
claude-code plugin disable @claude-code/react-plugin
```

## 8. 实用工具命令

### `claude-code doctor`

诊断和修复工具。

#### 语法
```bash
claude-code doctor [options]
```

#### 诊断操作
```bash
# 系统诊断
claude-code doctor

# 详细诊断
claude-code doctor --verbose

# 特定诊断
claude-code doctor --check dependencies,config,permissions

# 自动修复
claude-code doctor --fix

# 生成诊断报告
claude-code doctor --report --output diagnosis.json
```

#### 诊断输出示例
```bash
claude-code doctor

🏥 Claude Code 系统诊断

✅ Node.js 版本: v18.17.0 (推荐)
✅ npm 版本: 9.6.7 (最新)
✅ API 连接: 正常
✅ 配置文件: 有效
⚠️  磁盘空间: 85% 已使用 (建议清理)
❌ 权限设置: 缺少写入权限 (/usr/local/lib)

🔧 修复建议:
1. 清理临时文件释放磁盘空间
2. 修复权限: sudo chown -R $USER /usr/local/lib
3. 更新过期依赖包

💊 自动修复: claude-code doctor --fix
```

### `claude-code benchmark`

性能基准测试。

#### 语法
```bash
claude-code benchmark [target] [options]
```

#### 基准测试
```bash
# 代码生成性能测试
claude-code benchmark generate --iterations 10

# API 响应性能测试
claude-code benchmark api --endpoint /api/users --concurrent 50

# 构建性能测试
claude-code benchmark build --project-size large

# 内存使用测试
claude-code benchmark memory --duration 60s

# 生成基准报告
claude-code benchmark report --format html
```

### `claude-code migrate`

项目迁移工具。

#### 语法
```bash
claude-code migrate [source] [target] [options]
```

#### 迁移操作
```bash
# JavaScript 到 TypeScript
claude-code migrate js-to-ts src/

# React Class 组件到 Function 组件
claude-code migrate class-to-hooks src/components/

# Webpack 到 Vite
claude-code migrate webpack-to-vite

# Jest 到 Vitest
claude-code migrate jest-to-vitest

# 版本升级迁移
claude-code migrate upgrade --from react@17 --to react@18

# 自定义迁移
claude-code migrate custom --script migration-script.js
```

## 9. 高级功能

### 批处理操作

#### 批量文件处理
```bash
# 批量重构
claude-code batch refactor --pattern "*.ts" --operation "add-types"

# 批量测试生成
claude-code batch test generate --pattern "src/**/*.service.ts"

# 批量格式化
claude-code batch format --pattern "src/**/*.{ts,tsx}" --config prettier

# 批量分析
claude-code batch analyze --pattern "src/**/*.ts" --output analysis-report.json
```

### 管道操作

#### 命令组合
```bash
# 分析后自动修复
claude-code analyze . --security | claude-code fix --auto

# 生成测试后运行
claude-code generate test UserService.ts | claude-code test run

# 重构后验证
claude-code refactor extract-function src/utils.ts:45-67 | claude-code analyze --quality
```

### 脚本集成

#### 自定义脚本
```bash
# 运行自定义脚本
claude-code script run deploy-staging

# 创建脚本模板
claude-code script create --name "custom-deploy" --template deployment

# 脚本管理
claude-code script list
claude-code script edit deploy-staging
claude-code script delete old-script
```

## 10. 最佳实践

### 日常开发工作流

#### 项目启动
```bash
# 1. 项目初始化
claude-code init my-project --template react --git

# 2. 配置项目
cd my-project
claude-code config set project.testFramework jest
claude-code config set project.linter eslint

# 3. 安装推荐插件
claude-code plugin install @claude-code/react-plugin
claude-code plugin install @claude-code/testing-plugin
```

#### 开发过程
```bash
# 1. 生成组件
claude-code generate component UserProfile --props "user:User,onEdit:Function"

# 2. 生成测试
claude-code generate test UserProfile.tsx

# 3. 代码分析
claude-code analyze src/components/UserProfile.tsx --quality

# 4. 运行测试
claude-code test run UserProfile.test.tsx
```

#### 代码审查
```bash
# 1. 自动审查
claude-code review current --auto

# 2. 修复问题
claude-code fix . --eslint --typescript

# 3. 优化性能
claude-code optimize . --performance

# 4. 生成报告
claude-code review report --format html
```

### 团队协作工作流

#### 项目设置
```bash
# 1. 团队初始化
claude-code team init

# 2. 同步配置
claude-code config export --output team-config.json
# 团队成员导入: claude-code config import team-config.json

# 3. 设置代码规范
claude-code config set team.lintRules strict
claude-code config set team.testCoverage 80
```

#### 持续集成
```bash
# CI 脚本示例
#!/bin/bash
claude-code analyze . --all --report
claude-code test run --coverage
claude-code build --production
claude-code deploy staging --auto
```

### 性能优化建议

#### 命令优化
```bash
# 使用缓存加速
claude-code config set cache.enabled true
claude-code config set cache.ttl 3600

# 并行处理
claude-code analyze . --parallel --workers 4

# 增量操作
claude-code test run --changed-only
claude-code analyze . --incremental
```

## 总结

Claude Code CLI 提供了完整的命令行开发体验，涵盖了从项目初始化到部署发布的全流程。通过合理使用这些命令，开发者可以：

1. **提升效率**：自动化重复性任务
2. **保证质量**：集成代码分析和测试
3. **优化协作**：统一团队开发标准
4. **简化部署**：自动化部署和发布流程
5. **持续改进**：通过分析和监控不断优化

掌握 CLI 工具的使用是充分发挥 Claude Code 潜力的关键，建议开发者根据项目需求选择合适的命令组合，并将其集成到日常开发工作流中。