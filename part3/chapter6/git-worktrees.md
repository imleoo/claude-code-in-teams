# Git Worktrees 多会话管理

在团队协作中，最常见的瓶颈之一就是分支切换。开发者在不同任务间切换时，需要频繁地 `git checkout`，这不仅耗时，还会导致依赖项、IDE索引和AI会话的混乱。**Git Worktrees** 是解决这个问题的终极利器。

## 什么是Git Worktree？

简单来说，`git worktree` 命令允许你将一个Git仓库同时检出到多个不同的目录中。每一个目录就是一个“工作树”，它拥有自己独立的文件、分支和修改状态，但它们共享同一个底层的 `.git` 数据库。

**传统工作流 vs. Worktree工作流**

- **传统工作流**：一个仓库，一个目录。切换任务意味着在同一个目录里切换分支，所有文件都会被替换。
  ```
  /my-project (当前在 feature-A 分支)
  $ git checkout feature-B  // 文件被替换，IDE重新索引...
  ```

- **Worktree工作流**：一个仓库，多个目录。切换任务意味着切换目录，每个任务环境都保持独立和稳定。
  ```
  /my-project-main (main 分支)
  /my-project-feature-A (feature-A 分支)
  /my-project-feature-B (feature-B 分支)
  
  // 想做A任务，就进入 my-project-feature-A 目录
  // 想做B任务，就进入 my-project-feature-B 目录
  // 互不干扰！
  ```

## 为什么Worktree对AI协作是革命性的？

1.  **AI会话隔离**：你可以在一个worktree中让AI进行大规模的代码重构，而在另一个worktree中，AI会话的上下文完全不受影响，可以稳定地进行bug修复。这是实现真正“多会话并行”的基础。
2.  **依赖环境隔离**：不同功能可能需要安装不同的依赖包。使用worktree，每个目录可以有自己独立的 `node_modules`，彻底告别依赖冲突。
3.  **IDE性能与稳定**：每个worktree都可以在一个独立的VS Code窗口中打开。IDE无需在分支切换时重建索引，响应速度更快，也避免了因文件频繁变化导致的插件崩溃。
4.  **“边写代码边看文档”的终极形态**：你可以为主分支创建一个worktree，专门用于浏览和参考稳定代码，同时在另一个worktree中进行新功能开发，无需来回切换。

## 核心操作与实践指南

### 1. 创建Worktree

最常用的命令是 `git worktree add <path> <branch>`。

- **为新功能创建一个新的worktree和分支**：
  ```bash
  # 从当前分支（如 develop）创建一个名为 feature/login 的新分支，
  # 并将其检出到 ../my-project-login 目录
  git worktree add -b feature/login ../my-project-login develop
  ```

- **为已存在的分支创建一个worktree**：
  ```bash
  # 假如 hotfix/urgent-bug 分支已存在，
  # 将其检出到 ../my-project-hotfix 目录
  git worktree add ../my-project-hotfix hotfix/urgent-bug
  ```

### 2. 查看和管理Worktree

- **列出所有worktree**：
  ```bash
  git worktree list
  # 输出:
  # /path/to/my-project-main   (bare)
  # /path/to/my-project-login  [feature/login]
  # /path/to/my-project-hotfix [hotfix/urgent-bug]
  ```

### 3. 清理和移除Worktree

当你完成一个功能的开发并合并了分支后，就可以安全地移除对应的worktree。

- **移除worktree**：
  ```bash
  # 首先，确保你不在要删除的目录中
  cd ../my-project-main
  
  # 然后移除worktree
  # 注意：这只会删除worktree的元数据，目录本身需要手动删除
  git worktree remove ../my-project-login
  
  # 手动删除目录
  rm -rf ../my-project-login
  ```
- **清理无效引用**：
  如果你手动删除了worktree目录，Git中可能会留下无效的引用。可以使用`prune`命令清理。
  ```bash
  git worktree prune
  ```

## 团队协作策略

1.  **目录结构规范**：建议将所有worktree创建在主仓库的上一级目录，并使用统一的前缀或后缀，便于管理。
    ```
    /workspace/
    ├── my-project-main/
    ├── my-project-feat-login/
    └── my-project-hotfix-payment/
    ```
2.  **自动化脚本**：可以编写一个简单的shell脚本来自动化worktree的创建和初始化过程（如安装依赖）。
    ```bash
    #!/bin/bash
    # new-task.sh
    
    BRANCH_NAME=$1
    WORKTREE_PATH="../my-project-${BRANCH_NAME//\//-}" # 将 feature/login 变为 feature-login
    
    git worktree add -b "$BRANCH_NAME" "$WORKTREE_PATH" develop
    
    echo "Worktree for $BRANCH_NAME created at $WORKTREE_PATH"
    echo "Installing dependencies..."
    
    cd "$WORKTREE_PATH"
    npm install
    
    echo "Done! You can now open a new VS Code window:"
    echo "code $WORKTREE_PATH"
    ```
3.  **与AI会话绑定**：在开始一个新任务时，遵循“先建Worktree，再开AI会话”的原则。将AI会话的关注点严格限制在当前的worktree目录内。

---

**本节小结：** Git Worktrees 是实现高效、安全并行开发的基石。它通过提供物理层面的隔离，彻底解决了传统分支切换带来的上下文混乱和环境污染问题。对于希望在团队中实践多线程AI协作的开发者而言，熟练掌握和使用Git Worktrees是必备的核心技能。

**下一节：** [跨会话文档同步机制](doc-sync.md)