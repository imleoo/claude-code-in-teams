# 跨会话文档同步机制

Git Worktrees为我们提供了完美的开发环境隔离，但这把“双刃剑”的另一面是信息隔离。如果团队的“单一事实来源”——我们的文档——不能在各个并行的工作树之间有效同步，那么这种隔离很快就会演变成信息孤岛和协作混乱。

因此，建立一套可靠的跨会话文档同步机制，是并行开发成功的关键保障。

## 同步的挑战：什么需要同步？何时同步？

我们需要解决两个核心问题：

1.  **识别共享文档**：并非所有文件都需要同步。我们需要明确定义哪些是“项目级”的共享文档（如API规范、架构决策记录、全局配置文件），哪些是“功能级”的本地文档。
2.  **选择同步策略**：是实时同步，还是定期同步？是自动合并，还是手动处理冲突？不同的团队和项目需要不同的策略。

## 设计一个文档同步系统

一个基础的文档同步系统可以通过脚本和Git钩子来实现。其核心逻辑是“监听变更，分发更新”。

```mermaid
graph TD
    subgraph Worktree A (feature/login)
        A[开发者A修改了 docs/api/auth.md]
    end

    subgraph 主仓库
        B[Git Commit & Push]
    end

    subgraph CI/CD 或 Git Hook
        C{检测到 docs/ 目录变更}
        C -- 是 --> D[触发同步脚本]
    end

    subgraph 同步脚本
        E[识别所有其他Worktree]
        F[在每个Worktree中执行 git pull]
        G[处理合并冲突]
    end

    subgraph Worktree B (feature/payment)
        H[开发者B收到文档更新通知]
    end

    A --> B --> C --> D --> E --> F --> G --> H
```

### 1. 定义共享文件范围

我们可以在项目根目录创建一个配置文件，来定义需要同步的文件模式。

**配置文件示例 (`.sync-config.yml`)**
```yaml
# 定义需要跨工作树同步的文件或目录
shared_files:
  - 'docs/**/*.md'         # 所有文档
  - 'README.md'
  - 'CLAUDE.md'            # AI核心上下文文件
  - 'package.json'         # 依赖定义
  - 'vite.config.ts'       # 项目构建配置
  - '.eslintrc.cjs'        # Linting规则

# 冲突解决策略:
#   - source-wins: 总是以变更源为准
#   - manual: 需要手动解决
conflict_resolution: manual

# 通知渠道
notification:
  - slack
```

### 2. 实现同步脚本

我们可以编写一个脚本，当主分支（如`develop`）更新后，自动将这些共享文件的最新版本同步到所有其他功能分支的worktree中。

**同步脚本示例 (`scripts/sync-worktrees.sh`)**
```bash
#!/bin/bash

# 获取主分支名称，例如 develop
MAIN_BRANCH="develop"

echo "Fetching latest changes for $MAIN_BRANCH..."
git fetch origin $MAIN_BRANCH:$MAIN_BRANCH

# 读取需要同步的文件列表
# (这里简化处理，实际应解析 .sync-config.yml)
SHARED_FILES=("docs/" "README.md" "package.json")

# 遍历所有worktree
for worktree_path in $(git worktree list --porcelain | grep worktree | cut -d' ' -f2); do
    branch=$(git -C "$worktree_path" rev-parse --abbrev-ref HEAD)

    if [ "$branch" != "$MAIN_BRANCH" ]; then
        echo "Syncing shared files to worktree: $worktree_path (branch: $branch)"
        
        # 对于每个共享文件，都从主分支checkout最新版本
        for file_pattern in "${SHARED_FILES[@]}"; do
            # 使用 git checkout <source_branch> -- <file_path>
            # 这会将指定分支的特定文件检出到当前工作目录
            git -C "$worktree_path" checkout $MAIN_BRANCH -- $file_pattern
        done
        
        # 提醒开发者检查变更
        echo "Worktree $worktree_path has been updated. Please check for changes."
    fi
done

echo "Sync complete."
```
**注意**：这个脚本采用了“主分支覆盖”的简单策略，适用于文档变更不那么频繁的场景。对于更复杂的冲突，需要更精细的处理。

### 3. 自动化触发

- **客户端（本地）**：可以使用Git的`post-merge`钩子。当开发者在自己的worktree中`git merge develop`或`git pull`后，自动运行一个脚本来检查是否有共享文件被更新。
- **服务端（CI/CD）**：在CI/CD流水线中设置一个专门的`sync-docs`作业。当`develop`分支有新的提交时，自动运行同步脚本，甚至可以创建一个Pull Request到各个功能分支，通知开发者更新。

## 冲突处理与AI协作

当两个开发者在各自的worktree中修改了**同一个**共享文档时，冲突就产生了。

- **手动解决（推荐）**：脚本检测到冲突后，应停止自动合并，并通知相关开发者进行手动沟通和合并。这是最安全的方式。
- **AI协作解决**：
  在发生冲突时，可以利用AI来辅助决策。
  **Prompt示例：**
  > 文件 `docs/api/payment.md` 发生了合并冲突。
  >
  > **分支A的修改**：
  > (粘贴A的修改内容)
  >
  > **分支B的修改**：
  > (粘贴B的修改内容)
  >
  > 请扮演一个资深架构师，帮我分析这两个修改的意图，并提供一个融合了双方优点的、最佳的合并建议。

---

**本节小结：** 文档同步是并行开发的“神经系统”。通过明确定义共享文件、编写同步脚本，并将其与Git钩子或CI/CD流程结合，我们可以建立一套半自动化的同步机制。这套机制旨在确保关键知识能够在团队中无延迟、低冲突地流动，从而支撑起高效、可靠的多会话并行开发。

**下一节：** [AI驱动的协作诊断](ai-diagnosis.md)