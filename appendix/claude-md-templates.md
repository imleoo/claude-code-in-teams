# CLAUDE.md 模板

## 概述

CLAUDE.md 是项目的"智能体记忆文件"，用于为 AI 助手提供项目上下文和协作指导。这个文件应该放在项目根目录，作为 AI 理解项目的核心参考。

## 基础模板

```markdown
# 项目名称 - AI 协作指南

## 项目概述
- **项目类型**: [Web应用/移动应用/API服务/数据分析等]
- **技术栈**: [主要技术栈列表]
- **开发阶段**: [原型/开发/测试/生产]
- **团队规模**: [人数和角色分工]

## 项目架构
### 目录结构
```
project/
├── src/           # 源代码
├── docs/          # 文档
├── tests/         # 测试
└── config/        # 配置
```

### 核心模块
- **模块A**: 功能描述和职责
- **模块B**: 功能描述和职责

## 开发规范
### 代码风格
- 使用 [ESLint/Prettier/其他] 进行代码格式化
- 遵循 [具体编码规范]

### 提交规范
- feat: 新功能
- fix: 修复
- docs: 文档更新
- refactor: 重构

## AI 协作指导
### 优先级原则
1. 代码质量和可维护性
2. 性能优化
3. 用户体验

### 常用任务模式
- **功能开发**: 先写测试，再实现功能
- **Bug修复**: 先复现问题，再定位根因
- **重构**: 保持功能不变，优化结构

## 项目特定信息
### 业务逻辑
[项目特有的业务规则和约束]

### 技术债务
[当前已知的技术债务和改进计划]

### 部署信息
[部署环境和流程说明]
```

## 高级模板示例

### Web 应用项目模板

```markdown
# 电商平台 - AI 协作指南

## 项目概述
- **项目类型**: 全栈电商Web应用
- **技术栈**: React + Node.js + PostgreSQL + Redis
- **开发阶段**: MVP开发阶段
- **团队规模**: 3人（1前端 + 1后端 + 1全栈）

## 项目架构
### 微服务架构
- **用户服务**: 认证、用户管理
- **商品服务**: 商品目录、库存管理
- **订单服务**: 订单处理、支付集成
- **通知服务**: 邮件、短信通知

### 数据库设计
- **用户表**: users (id, email, password_hash, created_at)
- **商品表**: products (id, name, price, stock, category_id)
- **订单表**: orders (id, user_id, total, status, created_at)

## 开发规范
### API 设计
- RESTful API 设计原则
- 统一错误响应格式
- JWT 认证机制

### 前端组件规范
- 使用 TypeScript 严格模式
- 组件按功能模块组织
- 统一的状态管理（Redux Toolkit）

## AI 协作指导
### 开发优先级
1. 核心购买流程（浏览-加购-结算-支付）
2. 用户体验优化
3. 性能和安全性

### 测试策略
- 单元测试覆盖率 > 80%
- 集成测试覆盖关键业务流程
- E2E 测试覆盖用户核心路径

## 业务规则
### 库存管理
- 下单时锁定库存，支付成功后扣减
- 库存不足时显示预订选项
- 支持库存预警和自动补货

### 价格策略
- 支持会员价、促销价
- 价格变更需要审批流程
- 历史价格追踪

## 部署配置
### 环境变量
- DATABASE_URL: 数据库连接
- REDIS_URL: Redis连接
- JWT_SECRET: JWT密钥
- PAYMENT_API_KEY: 支付接口密钥

### Docker 配置
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
```

### API 服务项目模板

```markdown
# 数据分析API - AI 协作指南

## 项目概述
- **项目类型**: RESTful API 服务
- **技术栈**: Python + FastAPI + PostgreSQL + Redis + Celery
- **开发阶段**: 生产环境运行
- **团队规模**: 2人后端开发

## 项目架构
### 分层架构
```
api/
├── routers/       # API路由层
├── services/      # 业务逻辑层
├── models/        # 数据模型层
├── utils/         # 工具函数
└── tasks/         # 异步任务
```

### 核心服务
- **数据接入服务**: 支持多种数据源
- **数据处理服务**: ETL 和数据清洗
- **分析引擎**: 统计分析和机器学习
- **报告生成**: 自动化报告和可视化

## 开发规范
### API 设计原则
- OpenAPI 3.0 规范
- 版本化 API (v1, v2)
- 统一的响应格式
- 完整的错误处理

### 数据处理规范
- 数据验证使用 Pydantic
- 异步处理大数据集
- 结果缓存策略

## AI 协作指导
### 性能优化重点
1. 数据库查询优化
2. 缓存策略实施
3. 异步任务处理

### 监控指标
- API 响应时间 < 200ms
- 数据处理准确率 > 99.9%
- 系统可用性 > 99.5%

## 数据模型
### 核心实体
```python
class DataSource(BaseModel):
    id: int
    name: str
    type: DataSourceType
    config: Dict[str, Any]
    created_at: datetime

class AnalysisJob(BaseModel):
    id: int
    source_id: int
    status: JobStatus
    result: Optional[Dict[str, Any]]
    created_at: datetime
```

## 部署和运维
### 容器化部署
- Docker Compose 本地开发
- Kubernetes 生产部署
- 自动化 CI/CD 流程

### 监控和日志
- Prometheus + Grafana 监控
- ELK Stack 日志分析
- Sentry 错误追踪
```

## 使用指南

### 1. 创建 CLAUDE.md 文件
在项目根目录创建 `CLAUDE.md` 文件，选择合适的模板作为起点。

### 2. 定制项目信息
根据实际项目情况，填写和修改模板中的各个部分：
- 项目概述和技术栈
- 架构设计和模块划分
- 开发规范和流程
- 业务规则和约束

### 3. 持续更新
随着项目发展，及时更新 CLAUDE.md 中的信息：
- 新增功能模块
- 架构变更
- 规范调整
- 经验总结

### 4. 团队协作
确保团队成员都了解 CLAUDE.md 的作用和内容，在与 AI 协作时主动引用相关信息。

## 最佳实践

### 信息组织原则
1. **分层次**: 从概览到细节，层次清晰
2. **可操作**: 提供具体的指导和示例
3. **及时性**: 保持信息的准确和最新
4. **完整性**: 覆盖 AI 协作的关键信息

### 内容更新策略
- 每个迭代结束后更新项目状态
- 重大架构变更时及时同步
- 定期回顾和优化内容结构
- 收集团队反馈持续改进

通过合理使用 CLAUDE.md 模板，可以显著提升 AI 协作的效率和质量，让 AI 助手更好地理解项目上下文，提供更精准的帮助。