# Claude Code 斜杠命令参考

## 概述

斜杠命令是 Claude Code 中的快捷指令系统，允许开发者通过简单的 `/` 前缀命令快速执行常用操作。这些命令可以在聊天界面、编辑器或终端中使用，大大提升开发效率和用户体验。

## 基础语法

```
/命令名 [参数1] [参数2] [...选项]
```

### 命令结构
- **命令前缀**：所有斜杠命令都以 `/` 开头
- **命令名**：描述要执行的操作
- **参数**：命令所需的输入参数
- **选项**：可选的修饰符，通常以 `--` 开头

### 自动补全
Claude Code 提供智能的命令自动补全功能：
- 输入 `/` 后会显示可用命令列表
- 输入命令名的前几个字符会过滤匹配的命令
- `Tab` 键可以自动补全命令和参数
- `Ctrl+Space` 显示命令帮助信息

## 1. 代码生成命令

### `/generate` - 代码生成
快速生成各种代码结构和文件。

#### 基础用法
```
/generate component UserProfile
/generate api users --methods GET,POST,PUT,DELETE
/generate test UserService --type unit
/generate model User --fields name:string,email:string
```

#### 子命令
```
/gen component <name> [--props] [--hooks] [--styled]
/gen api <name> [--methods] [--auth] [--validation]
/gen test <target> [--type] [--coverage]
/gen model <name> [--fields] [--relations]
/gen page <name> [--layout] [--auth]
/gen hook <name> [--params] [--return-type]
/gen util <name> [--functions]
/gen config <type> [--preset]
```

#### 示例
```
# 生成带 props 的 React 组件
/gen component UserCard --props "user:User,onClick:()=>void" --styled

# 生成完整的 API 路由
/gen api products --methods GET,POST,PUT,DELETE --auth --validation

# 生成集成测试
/gen test ProductService --type integration --coverage

# 生成数据库模型
/gen model Product --fields "name:string,price:number,category:Category" --relations "belongsTo:Category"
```

### `/create` - 文件创建
创建新文件和目录结构。

#### 基础用法
```
/create file src/components/NewComponent.tsx
/create dir src/features/auth
/create template react-component UserProfile
```

#### 示例
```
# 创建组件文件
/create file src/components/Dashboard.tsx --template functional-component

# 创建目录结构
/create dir src/features/products --structure "components,services,types,tests"

# 从模板创建
/create template api-route --name users --path src/api/
```

## 2. 代码分析命令

### `/analyze` - 代码分析
分析代码质量、性能和安全性。

#### 基础用法
```
/analyze current
/analyze file src/components/UserProfile.tsx
/analyze project --performance
/analyze security --severity high
```

#### 分析类型
```
/analyze quality [target] [--metrics]
/analyze performance [target] [--report]
/analyze security [target] [--severity]
/analyze dependencies [--outdated] [--vulnerabilities]
/analyze coverage [--threshold]
/analyze complexity [target] [--limit]
```

#### 示例
```
# 分析当前文件质量
/analyze quality --metrics maintainability,readability

# 性能分析并生成报告
/analyze performance src/components/ --report

# 安全漏洞扫描
/analyze security --severity medium,high

# 依赖分析
/analyze dependencies --outdated --vulnerabilities
```

### `/review` - 代码审查
执行自动化代码审查。

#### 基础用法
```
/review current
/review pr 123
/review commit abc123
/review changes --since yesterday
```

#### 审查选项
```
/review auto [target] [--rules]
/review suggest [target] [--focus]
/review compare <branch1> <branch2>
/review report [--format] [--output]
```

## 3. 重构命令

### `/refactor` - 代码重构
执行各种代码重构操作。

#### 基础用法
```
/refactor extract-function lines:45-67 --name calculateTotal
/refactor rename oldName --to newName
/refactor move src/old/path --to src/new/path
/refactor extract-component lines:120-180 --name UserCard
```

#### 重构类型
```
/refactor extract-function <selection> --name <name>
/refactor extract-variable <expression> --name <name>
/refactor extract-component <selection> --name <name>
/refactor rename <identifier> --to <newName> [--scope]
/refactor move <source> --to <destination>
/refactor inline <identifier>
/refactor split-file <file> --by <criteria>
/refactor merge-files <files> --output <file>
```

#### 高级重构
```
# 架构重构
/refactor architecture --pattern mvc --target src/

# 现代化重构
/refactor modernize --es2022 --async-await

# 类型安全重构
/refactor types --strict --add-generics

# 性能重构
/refactor performance --lazy-loading --memoization
```

### `/fix` - 自动修复
自动修复代码中的问题。

#### 基础用法
```
/fix current
/fix eslint
/fix typescript
/fix security --auto
/fix all --interactive
```

#### 修复类型
```
/fix lint [--rules] [--auto]
/fix types [--strict] [--add-missing]
/fix security [--severity] [--auto]
/fix performance [--suggestions]
/fix accessibility [--level]
/fix imports [--organize] [--remove-unused]
```

## 4. 测试命令

### `/test` - 测试管理
管理和执行测试。

#### 基础用法
```
/test run
/test run UserService.test.ts
/test generate UserService.ts
/test coverage --report
```

#### 测试操作
```
/test run [pattern] [--watch] [--coverage]
/test generate <target> [--type] [--scenarios]
/test debug <test> [--breakpoints]
/test coverage [--threshold] [--report]
/test performance [--benchmark]
/test e2e [--headless] [--browser]
```

#### 示例
```
# 运行特定测试
/test run UserService --watch

# 生成测试用例
/test generate src/services/PaymentService.ts --type unit,integration

# 端到端测试
/test e2e --scenarios "login,checkout,payment" --browser chrome

# 性能测试
/test performance --benchmark --duration 60s
```

## 5. 项目管理命令

### `/project` - 项目操作
项目级别的管理操作。

#### 基础用法
```
/project info
/project status
/project clean
/project build --production
```

#### 项目命令
```
/project init [name] [--template] [--language]
/project info [--detailed]
/project status [--health-check]
/project clean [--deep] [--cache]
/project build [--env] [--optimize]
/project deploy [environment] [--strategy]
```

#### 示例
```
# 项目健康检查
/project status --health-check

# 深度清理
/project clean --deep --cache --logs

# 生产构建
/project build --production --optimize

# 部署到测试环境
/project deploy staging --strategy rolling
```

### `/workspace` - 工作空间
工作空间管理。

#### 基础用法
```
/workspace info
/workspace sync
/workspace switch team-workspace
/workspace export --config
```

## 6. Git 集成命令

### `/git` - Git 操作
Git 版本控制集成。

#### 基础用法
```
/git status
/git commit "feat: add user authentication"
/git push origin feature/auth
/git merge develop --strategy squash
```

#### Git 命令
```
/git status [--short]
/git add [files] [--all]
/git commit <message> [--type] [--scope]
/git push [remote] [branch] [--force-with-lease]
/git pull [remote] [branch] [--rebase]
/git branch [name] [--from] [--delete]
/git merge <branch> [--strategy] [--no-ff]
/git rebase <branch> [--interactive]
/git stash [message] [--include-untracked]
```

#### 智能 Git 操作
```
# 智能提交消息生成
/git commit --auto-message

# 冲突解决助手
/git resolve-conflicts --interactive

# 分支建议
/git suggest-branch --based-on current-task

# 提交历史分析
/git analyze-history --since "1 month ago"
```

## 7. 文档命令

### `/docs` - 文档生成
生成和管理项目文档。

#### 基础用法
```
/docs generate api
/docs generate readme
/docs update changelog
/docs serve --port 3000
```

#### 文档类型
```
/docs generate api [--format openapi] [--output]
/docs generate readme [--sections] [--template]
/docs generate changelog [--from] [--to]
/docs generate architecture [--diagrams]
/docs generate jsdoc [target] [--config]
/docs serve [--port] [--watch]
/docs build [--output] [--theme]
```

#### 示例
```
# 生成 API 文档
/docs generate api --format openapi --output docs/api.yaml

# 更新 README
/docs generate readme --sections "installation,usage,api,contributing"

# 生成架构文档
/docs generate architecture --diagrams --output docs/architecture/

# 启动文档服务器
/docs serve --port 4000 --watch
```

## 8. 配置命令

### `/config` - 配置管理
管理 Claude Code 配置。

#### 基础用法
```
/config get editor.theme
/config set editor.theme dark
/config list --category editor
/config reset --confirm
```

#### 配置操作
```
/config get <key>
/config set <key> <value>
/config list [--category] [--search]
/config reset [key] [--confirm]
/config export [--output] [--format]
/config import <file> [--merge]
/config validate [--fix]
```

#### 常用配置
```
# 编辑器配置
/config set editor.theme dark
/config set editor.fontSize 14
/config set editor.tabSize 2

# 代码生成配置
/config set codegen.language typescript
/config set codegen.framework react
/config set codegen.testFramework jest

# 输出配置
/config set output.format markdown
/config set output.verbose true
/config set output.color auto
```

## 9. 插件命令

### `/plugin` - 插件管理
管理 Claude Code 插件。

#### 基础用法
```
/plugin list
/plugin search react
/plugin install @claude-code/react-plugin
/plugin enable react-plugin
```

#### 插件操作
```
/plugin list [--enabled] [--category]
/plugin search <query> [--category] [--sort]
/plugin install <name> [--version] [--dev]
/plugin uninstall <name> [--clean]
/plugin enable <name>
/plugin disable <name>
/plugin update [name] [--all]
/plugin info <name> [--detailed]
```

#### 示例
```
# 搜索 React 相关插件
/plugin search react --category frontend --sort popularity

# 安装开发版插件
/plugin install @claude-code/experimental-plugin --version beta --dev

# 批量更新插件
/plugin update --all

# 查看插件详细信息
/plugin info @claude-code/react-plugin --detailed
```

## 10. 实用工具命令

### `/help` - 帮助系统
获取命令帮助和文档。

#### 基础用法
```
/help
/help generate
/help generate component
/help --search "test generation"
```

#### 帮助选项
```
/help [command] [subcommand]
/help --search <query>
/help --category <category>
/help --examples [command]
/help --shortcuts
```

### `/search` - 代码搜索
在项目中搜索代码。

#### 基础用法
```
/search "function calculateTotal"
/search --regex "class \w+Service"
/search --files "*.ts,*.tsx" --content "useState"
```

#### 搜索选项
```
/search <query> [--files] [--exclude]
/search --regex <pattern> [--flags]
/search --symbol <name> [--type]
/search --references <identifier>
/search --usages <function>
```

### `/format` - 代码格式化
格式化代码文件。

#### 基础用法
```
/format current
/format src/components/
/format --config prettier
/format --fix-imports
```

#### 格式化选项
```
/format [target] [--config] [--write]
/format --imports [--organize] [--remove-unused]
/format --check [--list-different]
/format --staged [--pre-commit]
```

### `/benchmark` - 性能基准
执行性能基准测试。

#### 基础用法
```
/benchmark current
/benchmark build --iterations 5
/benchmark api --endpoint /users --concurrent 10
```

## 11. 自定义命令

### 创建自定义命令
Claude Code 允许用户创建自定义斜杠命令。

#### 命令定义文件
```json
// .claude-code/commands.json
{
  "commands": [
    {
      "name": "deploy-staging",
      "description": "Deploy to staging environment",
      "script": "npm run build && npm run deploy:staging",
      "category": "deployment",
      "parameters": [
        {
          "name": "branch",
          "type": "string",
          "default": "develop",
          "description": "Branch to deploy"
        }
      ]
    }
  ]
}
```

#### JavaScript 命令
```javascript
// .claude-code/commands/custom-deploy.js
module.exports = {
  name: 'custom-deploy',
  description: 'Custom deployment with validation',
  async execute(args, context) {
    const { branch = 'main', environment = 'staging' } = args;
    
    // 预检查
    await context.run(`git checkout ${branch}`);
    await context.run('npm run test');
    await context.run('npm run lint');
    
    // 构建和部署
    await context.run('npm run build');
    await context.run(`npm run deploy:${environment}`);
    
    return {
      success: true,
      message: `Successfully deployed ${branch} to ${environment}`
    };
  }
};
```

#### 使用自定义命令
```
/custom-deploy --branch feature/new-ui --environment production
/deploy-staging --branch develop
```

## 12. 命令组合和管道

### 命令链
多个命令可以组合执行：

```
/analyze current && /fix eslint && /test run
/generate component UserCard && /generate test UserCard && /test run UserCard.test.ts
/refactor extract-function lines:45-67 --name helper && /test run --changed
```

### 条件执行
```
/test run || /fix all && /test run
/analyze security --severity high && /fix security --auto
```

### 管道操作
```
/search "TODO" | /generate task-list
/analyze dependencies --outdated | /update packages
/git status --porcelain | /format staged
```

## 13. 快捷键和别名

### 内置别名
Claude Code 提供常用命令的简短别名：

```
/g     → /generate
/a     → /analyze
/t     → /test
/r     → /refactor
/f     → /fix
/d     → /docs
/c     → /config
/p     → /project
/h     → /help
```

### 自定义别名
```
# 在配置中定义别名
/config set aliases.gc "/git commit"
/config set aliases.gp "/git push origin"
/config set aliases.tr "/test run --watch"
/config set aliases.dev "/project serve --hot-reload"

# 使用别名
/gc "feat: add new feature"
/gp main
/tr UserService
/dev
```

## 14. 上下文感知命令

### 智能命令建议
Claude Code 根据当前上下文提供智能命令建议：

#### 在编辑器中
- 选中代码时建议重构命令
- 在测试文件中建议测试相关命令
- 在配置文件中建议配置验证命令

#### 在终端中
- 根据当前目录建议项目命令
- 根据 Git 状态建议版本控制命令
- 根据错误信息建议修复命令

#### 在聊天中
- 根据对话内容建议相关命令
- 根据问题类型建议诊断命令
- 根据需求建议生成命令

### 上下文变量
命令可以使用上下文变量：

```
/generate component ${selectedText}
/test run ${currentFile}
/analyze ${currentDirectory}
/git commit "${lastAnalysisResult}"
```

## 15. 最佳实践

### 命令使用技巧

#### 1. 利用自动补全
- 输入 `/` 后使用 `Tab` 键浏览可用命令
- 使用 `Ctrl+Space` 查看命令参数提示
- 利用模糊匹配快速找到命令

#### 2. 组合命令提升效率
```
# 完整的开发流程
/generate component UserProfile && /generate test UserProfile && /test run UserProfile.test.ts

# 代码质量检查流程
/analyze current && /fix all && /format current && /test run
```

#### 3. 使用别名简化操作
```
# 设置常用别名
/config set aliases.qa "/analyze current && /fix all && /test run"
/config set aliases.deploy "/project build --production && /project deploy production"

# 使用别名
/qa
/deploy
```

#### 4. 利用历史记录
- 使用 `↑` 和 `↓` 键浏览命令历史
- 使用 `Ctrl+R` 搜索历史命令
- 收藏常用命令组合

### 团队协作建议

#### 1. 统一命令规范
```json
// 团队配置文件
{
  "team": {
    "aliases": {
      "review": "/analyze current && /review auto",
      "deploy-dev": "/project build && /project deploy development",
      "full-test": "/test run --coverage && /test e2e"
    },
    "workflows": {
      "pre-commit": "/format staged && /lint staged && /test changed",
      "pre-push": "/test run && /analyze security"
    }
  }
}
```

#### 2. 文档化自定义命令
为团队自定义命令编写清晰的文档和使用示例。

#### 3. 命令权限管理
对敏感操作（如部署、删除）设置适当的权限控制。

### 性能优化

#### 1. 缓存利用
```
/config set cache.commands true
/config set cache.analysis 3600  # 1小时缓存
```

#### 2. 并行执行
```
/test run --parallel
/analyze . --workers 4
```

#### 3. 增量操作
```
/test run --changed-only
/analyze --incremental
/format --staged
```

## 总结

斜杠命令系统是 Claude Code 的核心功能之一，它提供了：

1. **快速访问**：通过简单的 `/` 前缀快速执行常用操作
2. **智能补全**：上下文感知的命令和参数补全
3. **灵活组合**：支持命令链、管道和条件执行
4. **可扩展性**：支持自定义命令和别名
5. **团队协作**：统一的命令规范和工作流程

掌握斜杠命令的使用可以显著提升开发效率，建议开发者：
- 从基础命令开始，逐步掌握高级功能
- 根据项目需求定制命令别名和工作流程
- 在团队中推广统一的命令使用规范
- 定期更新和优化自定义命令配置

通过合理使用斜杠命令，开发者可以在 Claude Code 中实现更加流畅和高效的开发体验。