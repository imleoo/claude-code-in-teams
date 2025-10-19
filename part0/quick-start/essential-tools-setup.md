# 必要工具快速配置指南

> "工欲善其事，必先利其器" —— 本指南将帮您快速配置团队Vibe Coding的完整工具链

## 🎯 配置目标

10分钟内完成以下工具的配置和验证：
1. **Claude Code CLI** - AI编程助手
2. **现代IDE环境** - 代码编辑器
3. **Git版本控制** - 代码管理
4. **Node.js环境** - 运行时环境

## ⚡ 一键配置脚本

### macOS/Linux
```bash
# 创建配置脚本
curl -fsSL https://raw.githubusercontent.com/your-repo/vibe-coding-setup/main/setup.sh | bash
```

### Windows
```powershell
# PowerShell配置脚本
iwr -useb https://raw.githubusercontent.com/your-repo/vibe-coding-setup/main/setup.ps1 | iex
```

## 🔧 手动配置步骤

### 1. Claude Code CLI配置 (2分钟)

#### 安装
```bash
# npm方式安装 (推荐)
npm install -g @anthropic-ai/claude-code

# 或使用yarn
yarn global add @anthropic-ai/claude-code
```

#### 验证安装
```bash
# 检查版本
claude-code --version

# 登录验证
claude-code auth login
```

#### 配置API密钥
```bash
# 设置Anthropic API密钥
claude-code config set api_key "your-api-key-here"

# 或使用环境变量
export ANTHROPIC_API_KEY="your-api-key-here"
```

### 2. IDE环境配置 (3分钟)

#### VS Code + Cline插件 (推荐)
```bash
# 安装VS Code
# macOS
brew install --cask visual-studio-code

# Ubuntu/Debian
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update && sudo apt install code

# 安装Cline插件
code --install-extension saoudrizwan.claude-dev
```

#### Cursor IDE (AI原生)
```bash
# 下载并安装Cursor
# macOS
brew install --cask cursor

# 或访问 https://cursor.com 下载对应平台版本
```

### 3. Git配置 (2分钟)

#### 安装Git
```bash
# macOS
brew install git

# Ubuntu/Debian
sudo apt update && sudo apt install git

# Windows
# 下载 Git for Windows: https://git-scm.com/download/win
```

#### 基础配置
```bash
# 用户信息配置
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 默认分支名
git config --global init.defaultBranch main

# 配置编辑器
git config --global core.editor "code --wait"
```

#### SSH密钥配置
```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your.email@example.com"

# 启动ssh-agent
eval "$(ssh-agent -s)"

# 添加密钥到ssh-agent
ssh-add ~/.ssh/id_ed25519

# 复制公钥到剪贴板 (macOS)
pbcopy < ~/.ssh/id_ed25519.pub

# Linux用户使用:
# xclip -selection clipboard < ~/.ssh/id_ed25549.pub
```

### 4. Node.js环境配置 (3分钟)

#### 使用nvm安装 (推荐)
```bash
# 安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载shell配置
source ~/.bashrc

# 安装最新LTS版本Node.js
nvm install --lts

# 设置默认版本
nvm use --lts
nvm alias default node
```

#### 验证安装
```bash
# 检查Node.js版本
node --version

# 检查npm版本
npm --version
```

## 🧪 配置验证

### 创建测试项目
```bash
# 创建测试目录
mkdir vibe-coding-test && cd vibe-coding-test

# 初始化项目
npm init -y

# 初始化Git仓库
git init

# 测试Claude Code
claude-code "创建一个简单的package.json脚本，用于验证环境配置"
```

### 运行环境检查
```bash
# 创建环境检查脚本
cat > check-env.js << 'EOF'
const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 环境配置检查\n');

// 检查Node.js
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js: ${nodeVersion.trim()}`);
} catch (e) {
  console.log('❌ Node.js未安装');
}

// 检查npm
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' });
  console.log(`✅ npm: ${npmVersion.trim()}`);
} catch (e) {
  console.log('❌ npm未安装');
}

// 检查Git
try {
  const gitVersion = execSync('git --version', { encoding: 'utf8' });
  console.log(`✅ Git: ${gitVersion.trim()}`);
} catch (e) {
  console.log('❌ Git未安装');
}

// 检查Claude Code
try {
  const claudeVersion = execSync('claude-code --version', { encoding: 'utf8' });
  console.log(`✅ Claude Code: ${claudeVersion.trim()}`);
} catch (e) {
  console.log('❌ Claude Code未安装');
}

console.log('\n🎉 环境配置完成！');
EOF

# 运行检查
node check-env.js
```

## 🛠️ 进阶配置

### 1. 全局CLI工具
```bash
# 安装常用的全局工具
npm install -g nodemon typescript ts-node live-server

# 验证安装
nodemon --version
tsc --version
live-server --version
```

### 2. IDE插件推荐

#### VS Code必备插件
```bash
# 批量安装VS Code插件
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension ms-vscode.vscode-json
```

#### Cursor特殊配置
```json
// cursor-settings.json
{
  "claude-code.autoSave": true,
  "claude-code.contextWindowSize": 8000,
  "claude-code.enableCodeReview": true,
  "claude-code.customPrompts": {
    "codeReview": "请审查这段代码的质量、性能和安全性",
    "refactor": "请重构这段代码，使其更简洁和高效"
  }
}
```

### 3. Shell环境优化

#### bash/zsh配置
```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
# Claude Code快捷命令
alias cc='claude-code'
alias cc-init='claude-code init'
alias cc-chat='claude-code chat'

# Git快捷命令
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'

# 项目快捷命令
alias dev='npm run dev'
alias build='npm run build'
alias test='npm test'
```

## 🚨 常见问题解决

### 问题1：Claude Code认证失败
```bash
# 解决方案：重新设置API密钥
claude-code config set api_key "sk-ant-api03-..."
claude-code auth login
```

### 问题2：Node.js版本不兼容
```bash
# 解决方案：使用nvm切换版本
nvm install 18.18.0
nvm use 18.18.0
```

### 问题3：Git SSH连接失败
```bash
# 解决方案：检查SSH配置
ssh -T git@github.com

# 如果失败，重新生成SSH密钥
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
```

## 📱 移动端配置

### iPad/iPhone配置
1. **安装iSH Shell** (Linux模拟器)
2. **安装Code App** (代码编辑器)
3. **配置GitHub CLI**
4. **使用Claude Code Web版本**

### Android配置
1. **安装Termux**
2. **配置完整Linux环境**
3. **安装必要工具链**

## ✅ 配置完成检查清单

- [ ] Claude Code CLI安装并认证
- [ ] 代码编辑器配置完成
- [ ] Git环境配置并SSH密钥设置
- [ ] Node.js环境安装
- [ ] 全局工具安装
- [ ] IDE插件安装
- [ ] Shell环境优化
- [ ] 测试项目创建成功
- [ ] 环境检查脚本运行通过

---

**🎯 配置完成！** 您现在拥有了完整的团队Vibe Coding开发环境。继续阅读[10分钟Vibe Coding体验](./10-minute-vibe-coding.md)，开始您的AI协作开发之旅。