#!/bin/bash

echo "🚀 启动 VitePress 团队 Vibe Coding 开发指南..."

# 检查 Node.js 版本
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ 需要 Node.js 18 或更高版本，当前版本: $(node -v)"
    echo "💡 请升级 Node.js 或使用 nvm: nvm use 18"
    exit 1
fi

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装项目依赖..."
    npm install
fi

# 启动开发服务器
echo "🌟 启动 VitePress 开发服务器..."
echo "📖 访问地址: http://localhost:5173/claude-code-in-teams/"
echo "⏹️  按 Ctrl+C 停止服务器"
echo ""

npm run dev