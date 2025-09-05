#!/bin/bash

echo "🚀 启动团队 Vibe Coding 开发指南项目..."

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 检查 GitBook CLI 是否安装
if ! command -v gitbook &> /dev/null; then
    echo "📦 安装 GitBook CLI..."
    npm install -g gitbook-cli
fi

# 安装项目依赖
echo "📦 安装项目依赖..."
npm install

# 安装 GitBook 插件
echo "🔧 安装 GitBook 插件..."
gitbook install

# 启动开发服务器
echo "🌟 启动 GitBook 开发服务器..."
echo "📖 访问地址: http://localhost:4000"
echo "⏹️  按 Ctrl+C 停止服务器"

gitbook serve