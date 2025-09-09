# 命令速查表

## Claude Code 实战命令集合

### 启动和权限管理

```bash
# 标准启动
claude

# 绕过权限模式启动（推荐）
claude --dangerously-skip-permissions

# 设置别名（一次性设置）
echo 'alias claude="claude --dangerously-skip-permissions"' >> ~/.zshrc
source ~/.zshrc

# 或者让 Claude Code 帮你设置
# 直接问：我想要在终端输入claude 等同于输入 claude --dangerously-skip-permissions，你帮我设置好
```

### 多会话管理

```bash
# 同时打开多个 Claude Code 会话
# 在 IDE 中连续点击 Claude Code 图标 3 次

# 查看历史聊天记录
/resume

# 选择特定会话继续
/resume [会话编号]
```

### 思考模式控制

```bash
# 基础思考模式
think

# 深度思考模式
think hard

# 更深度思考
think harder

# 极限思考模式（推荐复杂任务使用）
ultrathink

# 示例用法
请帮我重构这个复杂的用户认证模块 ultrathink
```

### IDE 集成命令

```bash
# 检查 IDE 连接状态
# 查看右上角是否显示 "IDE connected" 绿色状态

# 在 VS Code 中安装插件
code --install-extension Anthropic.claude-dev

# 在 Cursor 中查看 Claude Code 状态
# 右上角 Claude Code 图标 + 绿色圆点 = 已连接
```

### 图片和文件操作

```bash
# 粘贴图片到 Claude Code
Ctrl+V  # 注意：使用 Ctrl+V 而不是 Cmd+V

# 上下文文件管理
@add [文件路径]     # 添加文件到上下文
@remove [文件路径]  # 从上下文移除文件
@list              # 查看当前上下文文件
@clear             # 清空上下文
```

### 项目开发命令

```bash
# 代码生成
@claude generate component --name "ComponentName" --type "react/vue/angular"
@claude generate api --endpoint "/api/users" --method "GET/POST/PUT/DELETE"

# 代码审查和重构
@claude review --file "src/components/App.tsx" --focus "security/performance/style"
@claude refactor --file "legacy-code.js" --pattern "modern-es6"

# 测试生成
@claude test generate --file "src/utils/helper.js" --framework "jest/vitest"
@claude test fix --file "tests/user.test.js"

# 文档生成
@claude docs generate --input "src/" --output "docs/" --format "markdown/html"
@claude docs api --swagger --output "api-docs.yaml"
```

### 任务分解和协作

```bash
# 智能任务分解
@claude task split --requirement "用户管理模块" --team-size 4 ultrathink
@claude task estimate --feature "支付系统" --complexity "high"

# 进度同步
@claude sync status --project "rag-chatbot"
@claude sync conflicts --resolve "auto/manual"
@claude sync review --since "yesterday"
```

## 使用量监控命令

```bash
# 安装使用量监控工具
npm install -g ccusage

# 查看全部使用记录
ccusage

# 查看指定日期以来的消耗
ccusage -s 20250625

# 实时监控使用量（推荐）
ccusage blocks --live

# 查看今日消耗
ccusage -s $(date +%Y%m%d)

# 查看本月消耗统计
ccusage -s $(date +%Y%m01)
```

## MCP 服务器配置命令

### 必装 MCP 工具

```bash
# Context7 - 获取最新代码库知识
mcp install context7
mcp configure context7 --api-key "your-key"

# BrowserMCP - 浏览器自动化
mcp install browsermcp
mcp configure browsermcp --browser "chrome"

# 启动 MCP 服务
mcp server start --config config.json --port 8080
```

### MCP 使用示例

```bash
# 使用 Context7 获取最新文档
@context7 search "React 18 新特性"
@context7 docs "Next.js 14 App Router"

# 使用 BrowserMCP 自动化浏览
打开浏览器,打开小红书,搜索"背单词",查看最前面10个内容,用漂亮的形式总结给我
打开我的网站 localhost:3000，检查首页布局是否正常
```

## Git Worktrees 多会话管理

### 基础操作

```bash
# 为不同功能创建独立工作树
git worktree add ../project-frontend feature/frontend-ui
git worktree add ../project-backend feature/backend-api
git worktree add ../project-docs feature/documentation

# 列出所有工作树
git worktree list

# 删除完成的工作树
git worktree remove ../project-frontend
git worktree prune  # 清理无效引用
```

### SuperClaude命令参考

**快速测试命令**：
```bash
# 终端验证
python3 -m SuperClaude --version

# Claude Code测试
/sc:brainstorm "test project"    # 交互式需求发现
/sc:implement "auth system"     # 智能功能实现
/sc:analyze README.md           # 代码质量分析
```

**核心工作流**：
```bash
/sc:brainstorm "项目概念" → /sc:implement "功能名称" → /sc:test
```

### DDAD治理框架与最佳实践

```bash
# 为团队成员创建专用分支
git worktree add ../project-alice feature/alice-user-auth
git worktree add ../project-bob feature/bob-payment-system

# 创建共享的集成分支
git worktree add ../project-integration develop

# 定期同步和合并
cd ../project-integration
git pull origin develop
git merge feature/alice-user-auth
git merge feature/bob-payment-system
```

## 高效工作流命令组合

### 项目启动标准流程

```bash
# 1. 启动 Claude Code（绕过权限）
claude --dangerously-skip-permissions

# 2. 开启实时监控
ccusage blocks --live

# 3. 创建多个工作会话
# 在 IDE 中连续点击 Claude Code 图标 3 次

# 4. 设置项目上下文
@add README.md
@add package.json
@add src/main.js

# 5. 开始复杂任务
请帮我分析这个项目结构并提出优化建议 ultrathink
```

### 代码审查和重构流程

```bash
# 1. 添加需要审查的文件
@add src/components/UserAuth.tsx
@add src/utils/validation.js

# 2. 进行深度代码审查
请审查这些文件的安全性、性能和可维护性 ultrathink

# 3. 生成重构建议
基于审查结果，生成详细的重构计划 think harder

# 4. 执行重构
请按照计划逐步重构代码，确保向后兼容 ultrathink
```

### 多人协作开发流程

```bash
# 1. 创建团队工作树
git worktree add ../team-frontend feature/frontend-team
git worktree add ../team-backend feature/backend-team
git worktree add ../team-testing feature/testing-team

# 2. 分配任务给不同的 Claude Code 会话
# 会话1：前端开发
cd ../team-frontend
请开发用户登录界面，使用 React + TypeScript ultrathink

# 会话2：后端开发  
cd ../team-backend
请开发用户认证 API，使用 Node.js + Express ultrathink

# 会话3：测试开发
cd ../team-testing
请为用户认证功能编写完整的测试用例 think harder

# 3. 定期同步进度
/resume  # 查看各会话进度
git worktree list  # 检查工作树状态
```

### 问题排查和调试流程

```bash
# 1. 收集错误信息
@add logs/error.log
@add package.json
@add src/problematic-file.js

# 2. 深度分析问题
这个错误的根本原因是什么？请提供详细的分析和解决方案 ultrathink

# 3. 生成修复代码
请生成修复代码，并解释每个修改的原因 think harder

# 4. 验证修复效果
请帮我编写测试用例来验证修复效果 ultrathink
```

## Docker 开发环境命令

### 基础容器操作

```bash
# 构建开发环境
docker build -t team-vibe-dev .
docker-compose up -d

# 进入开发容器
docker exec -it team-vibe-dev bash

# 查看容器状态
docker ps
docker logs team-vibe-dev

# 清理环境
docker-compose down
docker system prune -f
```

### 多环境管理

```bash
# 开发环境
docker-compose -f docker-compose.dev.yml up

# 测试环境
docker-compose -f docker-compose.test.yml up

# 生产环境
docker-compose -f docker-compose.prod.yml up
```

## 测试命令集合

### 单元测试

```bash
# 运行所有测试
npm test
pytest

# 运行特定测试文件
npm test -- --testPathPattern=components
pytest tests/test_api.py

# 生成覆盖率报告
npm test -- --coverage
pytest --cov=src --cov-report=html
```

### 集成测试

```bash
# API测试
newman run postman-collection.json
curl -X GET "http://localhost:8000/api/health"

# 端到端测试
npx playwright test
cypress run
```

## 部署命令

### 本地部署

```bash
# 构建项目
npm run build
python setup.py build

# 启动服务
npm start
gunicorn app:app --bind 0.0.0.0:8000

# 健康检查
curl http://localhost:3000/health
```

### 云端部署

```bash
# AWS部署
aws deploy create-deployment --application-name myapp
eb deploy

# Kubernetes部署
kubectl apply -f k8s/
helm install myapp ./helm-chart

# Docker部署
docker push myregistry/myapp:latest
docker run -p 8080:8080 myregistry/myapp:latest
```

## 监控和调试命令

### 性能监控

```bash
# 系统资源监控
htop
docker stats

# 应用性能监控
npm run analyze
python -m cProfile app.py

# 网络监控
netstat -tulpn
ss -tulpn
```

### 日志管理

```bash
# 查看应用日志
tail -f logs/app.log
docker logs -f container-name

# 日志分析
grep "ERROR" logs/app.log
awk '/ERROR/ {print $1, $2, $NF}' logs/app.log

# 日志轮转
logrotate /etc/logrotate.d/app
```

## 安全检查命令

### 代码安全扫描

```bash
# 依赖安全检查
npm audit
pip-audit

# 代码质量检查
eslint src/
flake8 src/
sonar-scanner

# 密钥泄露检查
git-secrets --scan
truffleHog --regex --entropy=False .
```

### 容器安全

```bash
# 镜像安全扫描
docker scan myapp:latest
trivy image myapp:latest

# 容器运行时安全
docker run --security-opt no-new-privileges myapp
```

## 备份和恢复命令

### 数据备份

```bash
# 数据库备份
pg_dump mydb > backup.sql
mysqldump -u user -p mydb > backup.sql

# 文件备份
tar -czf backup.tar.gz /path/to/data
rsync -av /source/ /backup/
```

### 恢复操作

```bash
# 数据库恢复
psql mydb < backup.sql
mysql -u user -p mydb < backup.sql

# 文件恢复
tar -xzf backup.tar.gz
rsync -av /backup/ /restore/
```

## 实战脚本集合

### Claude Code 完整启动脚本

```bash
#!/bin/bash
# claude-dev-start.sh

echo "🚀 启动 Claude Code 开发环境..."

# 1. 启动 Claude Code（绕过权限模式）
echo "启动 Claude Code..."
claude --dangerously-skip-permissions &

# 2. 启动实时使用量监控
echo "启动使用量监控..."
ccusage blocks --live &

# 3. 启动必要的 MCP 服务
echo "启动 MCP 服务..."
mcp server start --name context7 &
mcp server start --name browsermcp &

# 4. 打开 IDE
echo "启动 IDE..."
cursor . || code .

echo "✅ Claude Code 开发环境启动完成！"
echo "💡 记住：复杂任务使用 ultrathink"
echo "📊 实时监控：ccusage blocks --live"
echo "📚 历史记录：/resume"
```

### 团队协作项目初始化脚本

```bash
#!/bin/bash
# team-vibe-init.sh

PROJECT_NAME=${1:-"team-project"}
TEAM_SIZE=${2:-3}

echo "🎯 初始化团队 Vibe Coding 项目: $PROJECT_NAME"

# 创建项目结构
mkdir -p {src,docs,tests,config,scripts}

# 初始化 Git 仓库
git init
git add .
git commit -m "Initial commit"

# 为团队成员创建工作树
for i in $(seq 1 $TEAM_SIZE); do
    BRANCH_NAME="feature/member-$i-workspace"
    git checkout -b $BRANCH_NAME
    git checkout main
    git worktree add "../$PROJECT_NAME-member-$i" $BRANCH_NAME
    echo "✅ 创建工作树: ../$PROJECT_NAME-member-$i"
done

# 创建文档工作树
git checkout -b docs-branch
git checkout main
git worktree add "../$PROJECT_NAME-docs" docs-branch

# 安装依赖和工具
npm init -y
npm install -g ccusage

# 创建 Claude Code 配置
cat > .claude-config.json << EOF
{
  "project": "$PROJECT_NAME",
  "team_size": $TEAM_SIZE,
  "default_mode": "ultrathink",
  "mcp_servers": ["context7", "browsermcp"]
}
EOF

echo "🎉 团队项目初始化完成！"
echo "📁 工作树列表："
git worktree list
```

### 日常开发增强脚本

```bash
#!/bin/bash
# daily-dev-enhanced.sh

echo "🌟 启动增强版开发环境..."

# 检查 Claude Code 是否运行
if ! pgrep -f "claude" > /dev/null; then
    echo "启动 Claude Code..."
    claude --dangerously-skip-permissions &
    sleep 2
fi

# 启动开发服务
if [ -f "docker-compose.yml" ]; then
    echo "启动 Docker 服务..."
    docker-compose up -d
fi

if [ -f "package.json" ]; then
    echo "启动前端开发服务器..."
    npm run dev &
fi

# 启动实时监控
echo "启动使用量监控..."
ccusage blocks --live &

# 运行代码质量检查
echo "运行代码质量检查..."
if [ -f "package.json" ]; then
    npm run lint 2>/dev/null || echo "⚠️ 未配置 lint 脚本"
    npm test 2>/dev/null || echo "⚠️ 未配置 test 脚本"
fi

# 显示项目状态
echo "📊 项目状态："
echo "Git 分支: $(git branch --show-current)"
echo "工作树: $(git worktree list | wc -l) 个"
echo "最近提交: $(git log -1 --oneline)"

echo "✅ 开发环境就绪！"
echo "💡 使用技巧："
echo "  - 复杂任务: ultrathink"
echo "  - 查看历史: /resume"
echo "  - 粘贴图片: Ctrl+V"
echo "  - 实时监控: ccusage blocks --live"
```

### 代码审查自动化脚本

```bash
#!/bin/bash
# auto-review.sh

BRANCH=${1:-$(git branch --show-current)}
BASE_BRANCH=${2:-"main"}

echo "🔍 自动代码审查: $BRANCH vs $BASE_BRANCH"

# 获取变更的文件
CHANGED_FILES=$(git diff --name-only $BASE_BRANCH...$BRANCH)

if [ -z "$CHANGED_FILES" ]; then
    echo "❌ 没有发现文件变更"
    exit 1
fi

echo "📁 变更的文件:"
echo "$CHANGED_FILES"

# 启动 Claude Code 进行审查
echo "🤖 启动 Claude Code 审查..."

# 创建审查提示
REVIEW_PROMPT="请审查以下文件的变更，重点关注：
1. 代码质量和最佳实践
2. 安全性问题
3. 性能优化机会
4. 可维护性改进

变更的文件：
$CHANGED_FILES

请使用 ultrathink 进行深度分析。"

# 将提示保存到临时文件
echo "$REVIEW_PROMPT" > /tmp/review-prompt.txt

echo "✅ 审查提示已准备好"
echo "💡 请在 Claude Code 中运行："
echo "cat /tmp/review-prompt.txt"
echo "然后添加相关文件到上下文中进行审查"
```

## 💡 实战使用技巧

### Claude Code 最佳实践

```bash
# ✅ 推荐的工作流
1. 启动时使用绕过权限模式
   claude --dangerously-skip-permissions

2. 复杂任务必用 ultrathink
   请重构这个复杂模块 ultrathink

3. 多会话并行处理
   - 会话1：主要开发任务（保持 IDE 连接）
   - 会话2：文档生成和整理
   - 会话3：测试用例编写

4. 实时监控使用量
   ccusage blocks --live

5. 定期查看历史记录
   /resume
```

### 工具组合建议

```bash
# 🚀 主力组合（推荐）
IDE: Cursor + Claude Code 插件
AI: Claude Code (Max Plan $200/月)
监控: ccusage 实时监控
MCP: context7 + browsermcp

# 🔄 备选组合
IDE: VS Code + Claude Code 插件  
AI: Claude Code + AugmentCode
版本控制: Git Worktrees 多会话管理
```

### ⚠️ 重要注意事项

```bash
# 🚨 新手避坑指南
1. 不要一开始就使用多会话
   - 先熟练单会话操作
   - 理解任务依赖关系后再多开

2. 避免多会话修改同一文件
   - 会造成代码冲突
   - 建议多会话处理不同项目或模块

3. 合理使用 ultrathink
   - 简单任务不需要 ultrathink
   - 复杂任务才使用，避免浪费 Token

4. 定期检查使用量
   - 使用 ccusage 监控消耗
   - Max Plan 用户可以放心使用 ultrathink
```

### 🎯 效率提升技巧

```bash
# 快速上下文管理
@add src/          # 添加整个目录
@add *.js          # 添加所有 JS 文件
@list              # 查看当前上下文
@clear             # 清空重新开始

# 智能任务分解
请将这个大功能拆分成可并行开发的小任务 ultrathink

# 代码质量保证
请审查代码并提供重构建议，重点关注性能和安全性 ultrathink

# 文档自动生成
基于当前代码生成完整的 API 文档和使用说明 think harder
```

### 📊 成本优化策略

```bash
# 💰 Max Plan ($200/月) 用户
- 无脑使用 ultrathink
- 多会话并行开发
- 实时监控看到消耗超过 $200/天很正常

# 💡 普通用户优化建议
- 简单任务使用 think 或不加修饰词
- 复杂任务才使用 ultrathink
- 定期检查 ccusage 避免超支

# 📈 ROI 计算
- 单日消耗 $187 vs 包月 $200
- 约等于 1 天回本
- 开发效率提升 > 成本投入
```

---

**🎯 使用建议：**
1. 新手从单会话 + 基础命令开始
2. 熟练后逐步引入多会话和高级功能
3. 定期更新命令和脚本
4. 结合团队规范制定标准流程
5. 重要提醒：免费的才是最贵的，选择专业工具

**🔗 相关资源：**
- [模块信息表模板](module-template.md)
- [文档模板集合](doc-templates.md)
- [企业开发规范 Prompt 集合](prompt-collection.md)

**💬 交流反馈：**
- 欢迎分享使用经验和改进建议
- 持续优化命令和脚本
- 共同探索 AI 协作开发的最佳实践