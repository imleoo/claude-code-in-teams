#!/bin/bash

# 团队Vibe Coding开发指南 - 自动化部署脚本
# 用于手动部署到GitHub Pages

echo "🚀 开始部署团队Vibe Coding开发指南..."

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
    echo "⚠️  检测到未提交的更改，请先提交或暂存更改"
    git status
    read -p "是否继续？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 构建项目
echo "📦 正在构建项目..."
npm run build

# 检查构建是否成功
if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "✅ 构建成功！"

# 部署到gh-pages分支
echo "🌐 正在部署到GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    echo "🎉 部署成功！"
    echo "📖 请访问: https://imleoo.github.io/claude-code-in-teams/"
else
    echo "❌ 部署失败，请检查GitHub Pages设置和网络连接"
    exit 1
fi