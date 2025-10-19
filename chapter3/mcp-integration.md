# Claude Code MCP集成详解

## 概述

Model Context Protocol (MCP) 是Claude Code的核心扩展机制，它提供了一个标准化的协议，让Claude Code能够与各种外部工具、服务和数据源进行深度集成。通过MCP，开发团队可以将Claude Code连接到他们的整个工具链，包括数据库、API服务、项目管理工具、监控系统等，实现真正的智能化开发环境。

## MCP架构原理

### 核心概念

```mermaid
graph TD
    A[Claude Code Client] --> B[MCP Protocol Layer]
    B --> C[MCP Server Registry]
    C --> D[Database MCP Server]
    C --> E[API MCP Server]
    C --> F[Tool MCP Server]
    C --> G[Custom MCP Server]
    
    D --> H[PostgreSQL/MySQL]
    E --> I[REST/GraphQL APIs]
    F --> J[Jira/GitHub/Slack]
    G --> K[Custom Services]
    
    B --> L[Resource Management]
    B --> M[Tool Execution]
    B --> N[Prompt Templates]
```

### MCP协议特性

1. **标准化通信**：统一的JSON-RPC协议
2. **资源抽象**：将外部数据源抽象为可查询资源
3. **工具集成**：标准化的工具调用接口
4. **安全控制**：细粒度的权限和访问控制
5. **异步支持**：支持长时间运行的操作
6. **错误处理**：完善的错误处理和重试机制

## 1. 基础MCP配置

### MCP服务器配置

#### 全局MCP配置
```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:pass@localhost:5432/mydb"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-filesystem", "/path/to/project"]
    },
    "github": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "jira": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-jira"],
      "env": {
        "JIRA_API_TOKEN": "${JIRA_TOKEN}",
        "JIRA_BASE_URL": "https://company.atlassian.net",
        "JIRA_EMAIL": "${JIRA_EMAIL}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_APP_TOKEN": "${SLACK_APP_TOKEN}"
      }
    }
  }
}
```

#### 项目级MCP配置
```json
{
  "mcpServers": {
    "project-db": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://localhost:5432/project_db"
      }
    },
    "project-api": {
      "command": "node",
      "args": ["./scripts/mcp-api-server.js"],
      "env": {
        "API_BASE_URL": "https://api.project.com",
        "API_KEY": "${PROJECT_API_KEY}"
      }
    }
  }
}
```

#### 环境变量管理
```bash
# .env 文件
POSTGRES_CONNECTION_STRING=postgresql://user:pass@localhost:5432/mydb
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
JIRA_TOKEN=ATATT3xFfGF0T...
JIRA_EMAIL=developer@company.com
SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxx
SLACK_APP_TOKEN=xapp-xxxxxxxxxxxx
PROJECT_API_KEY=pk_live_xxxxxxxxxxxx
```

## 2. 数据库集成

### PostgreSQL MCP服务器

#### 资源列表
```typescript
// MCP服务器提供的资源
const resources = [
  {
    uri: "postgres://tables",
    name: "Database Tables",
    description: "List all tables in the database",
    mimeType: "application/json"
  },
  {
    uri: "postgres://schema/{table}",
    name: "Table Schema",
    description: "Get schema for a specific table",
    mimeType: "application/json"
  }
];
```

#### 工具定义
```typescript
const tools = [
  {
    name: "postgres_query",
    description: "Execute a PostgreSQL query",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "SQL query to execute"
        },
        params: {
          type: "array",
          description: "Query parameters"
        }
      },
      required: ["query"]
    }
  },
  {
    name: "postgres_explain",
    description: "Explain a PostgreSQL query execution plan",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "SQL query to explain"
        }
      },
      required: ["query"]
    }
  }
];
```

#### 查询执行示例
```typescript
// Claude Code 使用示例
async function analyzeUserActivity() {
  // 查询用户活动数据
  const result = await mcp.callTool("postgres_query", {
    query: `
      SELECT 
        u.id, u.name, 
        COUNT(a.id) as activity_count,
        MAX(a.created_at) as last_activity
      FROM users u 
      LEFT JOIN activities a ON u.id = a.user_id 
      WHERE a.created_at > $1
      GROUP BY u.id, u.name
      ORDER BY activity_count DESC
    `,
    params: ["2024-01-01"]
  });
  
  // 分析查询性能
  const explanation = await mcp.callTool("postgres_explain", {
    query: "SELECT * FROM users WHERE email = $1"
  });
  
  return {
    data: result.rows,
    performance: explanation.plan
  };
}
```

### MongoDB MCP服务器

#### 配置示例
```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-mongodb"],
      "env": {
        "MONGODB_CONNECTION_STRING": "mongodb://localhost:27017/myapp",
        "MONGODB_DATABASE": "myapp"
      }
    }
  }
}
```

#### 工具使用示例
```typescript
// 聚合查询示例
const aggregationResult = await mcp.callTool("mongodb_aggregate", {
  collection: "orders",
  pipeline: [
    { $match: { status: "completed" } },
    { $group: { 
      _id: "$customer_id", 
      total_amount: { $sum: "$amount" },
      order_count: { $sum: 1 }
    }},
    { $sort: { total_amount: -1 } },
    { $limit: 10 }
  ]
});
```

## 3. API服务集成

### REST API MCP服务器

#### 服务器实现
```typescript
import { Server } from '@anthropic/mcp-sdk/server/index.js';
import { StdioServerTransport } from '@anthropic/mcp-sdk/server/stdio.js';
import axios from 'axios';

class RestApiMcpServer {
  private server: Server;
  private apiBaseUrl: string;
  private apiKey: string;

  constructor() {
    this.server = new Server(
      { name: "rest-api-server", version: "1.0.0" },
      { capabilities: { resources: {}, tools: {} } }
    );
    
    this.apiBaseUrl = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    
    this.setupHandlers();
  }

  private setupHandlers() {
    // 资源处理器
    this.server.setRequestHandler('resources/list', async () => ({
      resources: [
        {
          uri: "api://endpoints",
          name: "API Endpoints",
          description: "Available REST API endpoints"
        }
      ]
    }));

    // 工具处理器
    this.server.setRequestHandler('tools/list', async () => ({
      tools: [
        {
          name: "api_get",
          description: "Make GET request to API",
          inputSchema: {
            type: "object",
            properties: {
              endpoint: { type: "string" },
              params: { type: "object" }
            }
          }
        },
        {
          name: "api_post",
          description: "Make POST request to API",
          inputSchema: {
            type: "object",
            properties: {
              endpoint: { type: "string" },
              data: { type: "object" }
            }
          }
        }
      ]
    }));

    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;
      
      switch (name) {
        case "api_get":
          return this.handleGet(args.endpoint, args.params);
        case "api_post":
          return this.handlePost(args.endpoint, args.data);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async handleGet(endpoint: string, params?: any) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}${endpoint}`, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
        params
      });
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify(response.data, null, 2)
        }]
      };
    } catch (error) {
      throw new Error(`API GET failed: ${error.message}`);
    }
  }

  private async handlePost(endpoint: string, data?: any) {
    try {
      const response = await axios.post(`${this.apiBaseUrl}${endpoint}`, data, {
        headers: { 
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify(response.data, null, 2)
        }]
      };
    } catch (error) {
      throw new Error(`API POST failed: ${error.message}`);
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

// 启动服务器
const server = new RestApiMcpServer();
server.run().catch(console.error);
```

### GraphQL MCP服务器

#### 配置和使用
```typescript
// GraphQL查询工具
const tools = [
  {
    name: "graphql_query",
    description: "Execute GraphQL query",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        variables: { type: "object" }
      }
    }
  }
];

// 使用示例
const userQuery = await mcp.callTool("graphql_query", {
  query: `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
        email
        posts {
          id
          title
          createdAt
        }
      }
    }
  `,
  variables: { id: "123" }
});
```

## 4. 项目管理工具集成

### 增强版Jira MCP服务器

#### 资源列表
```typescript
const resources = [
  {
    uri: "jira://projects",
    name: "Jira Projects",
    description: "List all accessible Jira projects"
  },
  {
    uri: "jira://issues/{project}",
    name: "Project Issues",
    description: "Issues in a specific project"
  },
  {
    uri: "jira://sprints/{board}",
    name: "Sprint Information",
    description: "Active and future sprints"
  }
];
```

#### 问题管理工具
```typescript
const issueTools = [
  {
    name: "jira_create_issue",
    description: "Create a new Jira issue",
    inputSchema: {
      type: "object",
      properties: {
        project: { type: "string" },
        issueType: { type: "string" },
        summary: { type: "string" },
        description: { type: "string" },
        assignee: { type: "string" },
        priority: { type: "string" },
        labels: { type: "array", items: { type: "string" } },
        components: { type: "array", items: { type: "string" } }
      },
      required: ["project", "issueType", "summary"]
    }
  },
  {
    name: "jira_update_issue",
    description: "Update an existing Jira issue",
    inputSchema: {
      type: "object",
      properties: {
        issueKey: { type: "string" },
        fields: { type: "object" },
        transition: { type: "string" }
      },
      required: ["issueKey"]
    }
  },
  {
    name: "jira_search_issues",
    description: "Search Jira issues using JQL",
    inputSchema: {
      type: "object",
      properties: {
        jql: { type: "string" },
        fields: { type: "array", items: { type: "string" } },
        maxResults: { type: "number" }
      },
      required: ["jql"]
    }
  }
];
```

#### 性能分析工具
```typescript
const analyticsTools = [
  {
    name: "jira_sprint_analysis",
    description: "Analyze sprint performance metrics",
    inputSchema: {
      type: "object",
      properties: {
        boardId: { type: "number" },
        sprintId: { type: "number" }
      },
      required: ["boardId"]
    }
  },
  {
    name: "jira_team_velocity",
    description: "Calculate team velocity over time",
    inputSchema: {
      type: "object",
      properties: {
        boardId: { type: "number" },
        sprints: { type: "number", default: 5 }
      },
      required: ["boardId"]
    }
  }
];

// 使用示例
async function analyzeSprintPerformance(boardId: number) {
  const analysis = await mcp.callTool("jira_sprint_analysis", { boardId });
  const velocity = await mcp.callTool("jira_team_velocity", { boardId, sprints: 10 });
  
  return {
    currentSprint: analysis.content[0].text,
    velocityTrend: velocity.content[0].text
  };
}
```

## 5. 监控系统集成

### Grafana MCP服务器

#### 服务器实现
```typescript
class GrafanaMcpServer {
  private grafanaUrl: string;
  private apiKey: string;

  constructor() {
    this.grafanaUrl = process.env.GRAFANA_URL || '';
    this.apiKey = process.env.GRAFANA_API_KEY || '';
  }

  // 指标查询工具
  async queryMetrics(query: string, timeRange: string) {
    const response = await axios.get(`${this.grafanaUrl}/api/datasources/proxy/1/api/v1/query_range`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
      params: {
        query,
        start: this.getTimeStart(timeRange),
        end: Date.now() / 1000,
        step: '60s'
      }
    });

    return {
      content: [{
        type: "text",
        text: this.formatMetrics(response.data)
      }]
    };
  }

  // 仪表板检索
  async getDashboard(dashboardId: string) {
    const response = await axios.get(`${this.grafanaUrl}/api/dashboards/uid/${dashboardId}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });

    return {
      content: [{
        type: "text",
        text: JSON.stringify(response.data.dashboard, null, 2)
      }]
    };
  }

  // 性能分析
  async analyzePerformance(service: string, timeRange: string) {
    const queries = [
      `rate(http_requests_total{service="${service}"}[5m])`,
      `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket{service="${service}"}[5m]))`,
      `rate(http_requests_total{service="${service}",status=~"5.."}[5m])`
    ];

    const results = await Promise.all(
      queries.map(query => this.queryMetrics(query, timeRange))
    );

    return {
      content: [{
        type: "text",
        text: this.generatePerformanceReport(results, service)
      }]
    };
  }

  private formatMetrics(data: any): string {
    // 格式化指标数据为可读文本
    return JSON.stringify(data.data.result, null, 2);
  }

  private generatePerformanceReport(results: any[], service: string): string {
    return `
# ${service} 性能分析报告

## 请求速率
${results[0].content[0].text}

## 95%延迟
${results[1].content[0].text}

## 错误率
${results[2].content[0].text}

## 建议
基于当前指标，建议关注以下方面：
1. 监控延迟趋势
2. 检查错误率峰值
3. 优化高频请求路径
    `;
  }

  private getTimeStart(timeRange: string): number {
    const now = Date.now() / 1000;
    switch (timeRange) {
      case '1h': return now - 3600;
      case '24h': return now - 86400;
      case '7d': return now - 604800;
      default: return now - 3600;
    }
  }
}
```

## 6. 自定义MCP服务器开发

### 通用TypeScript模板

#### 基础服务器结构
```typescript
import { Server } from '@anthropic/mcp-sdk/server/index.js';
import { StdioServerTransport } from '@anthropic/mcp-sdk/server/stdio.js';

export class CustomMcpServer {
  private server: Server;

  constructor(name: string, version: string) {
    this.server = new Server(
      { name, version },
      {
        capabilities: {
          resources: {},
          tools: {},
          prompts: {}
        }
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // 资源列表处理器
    this.server.setRequestHandler('resources/list', async () => {
      return {
        resources: this.getResources()
      };
    });

    // 资源读取处理器
    this.server.setRequestHandler('resources/read', async (request) => {
      const { uri } = request.params;
      return this.readResource(uri);
    });

    // 工具列表处理器
    this.server.setRequestHandler('tools/list', async () => {
      return {
        tools: this.getTools()
      };
    });

    // 工具调用处理器
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;
      return this.callTool(name, args);
    });

    // 提示模板处理器
    this.server.setRequestHandler('prompts/list', async () => {
      return {
        prompts: this.getPrompts()
      };
    });

    this.server.setRequestHandler('prompts/get', async (request) => {
      const { name, arguments: args } = request.params;
      return this.getPrompt(name, args);
    });
  }

  protected getResources(): any[] {
    // 子类实现
    return [];
  }

  protected async readResource(uri: string): Promise<any> {
    // 子类实现
    throw new Error(`Resource not found: ${uri}`);
  }

  protected getTools(): any[] {
    // 子类实现
    return [];
  }

  protected async callTool(name: string, args: any): Promise<any> {
    // 子类实现
    throw new Error(`Tool not found: ${name}`);
  }

  protected getPrompts(): any[] {
    // 子类实现
    return [];
  }

  protected async getPrompt(name: string, args: any): Promise<any> {
    // 子类实现
    throw new Error(`Prompt not found: ${name}`);
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}
```

### 高级示例：异步操作MCP服务器

#### 支持长时间运行任务的服务器
```typescript
import { CustomMcpServer } from './base-server.js';
import { EventEmitter } from 'events';

export class AsyncTaskMcpServer extends CustomMcpServer {
  private taskManager: TaskManager;

  constructor() {
    super("async-task-server", "1.0.0");
    this.taskManager = new TaskManager();
  }

  protected getTools() {
    return [
      {
        name: "start_analysis",
        description: "Start long-running code analysis",
        inputSchema: {
          type: "object",
          properties: {
            projectPath: { type: "string" },
            analysisType: { type: "string", enum: ["security", "performance", "quality"] }
          },
          required: ["projectPath", "analysisType"]
        }
      },
      {
        name: "get_task_status",
        description: "Get status of running task",
        inputSchema: {
          type: "object",
          properties: {
            taskId: { type: "string" }
          },
          required: ["taskId"]
        }
      },
      {
        name: "cancel_task",
        description: "Cancel running task",
        inputSchema: {
          type: "object",
          properties: {
            taskId: { type: "string" }
          },
          required: ["taskId"]
        }
      }
    ];
  }

  protected async callTool(name: string, args: any) {
    switch (name) {
      case "start_analysis":
        return this.startAnalysis(args.projectPath, args.analysisType);
      case "get_task_status":
        return this.getTaskStatus(args.taskId);
      case "cancel_task":
        return this.cancelTask(args.taskId);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  private async startAnalysis(projectPath: string, analysisType: string) {
    const taskId = this.taskManager.createTask(projectPath, analysisType);
    
    // 异步执行分析
    this.performAnalysis(taskId, projectPath, analysisType);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          taskId,
          status: "started",
          message: `Analysis task ${taskId} started for ${projectPath}`
        })
      }]
    };
  }

  private async performAnalysis(taskId: string, projectPath: string, analysisType: string) {
    try {
      this.taskManager.updateTask(taskId, "running", "Analysis in progress...");
      
      // 模拟长时间运行的分析
      const result = await this.runAnalysis(projectPath, analysisType);
      
      this.taskManager.updateTask(taskId, "completed", "Analysis completed", result);
    } catch (error) {
      this.taskManager.updateTask(taskId, "failed", error.message);
    }
  }

  private async runAnalysis(projectPath: string, analysisType: string): Promise<any> {
    // 实际的分析逻辑
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          analysisType,
          projectPath,
          findings: [
            { type: "warning", message: "Potential security issue found" },
            { type: "info", message: "Code quality is good" }
          ],
          completedAt: new Date().toISOString()
        });
      }, 5000); // 模拟5秒的分析时间
    });
  }

  private async getTaskStatus(taskId: string) {
    const task = this.taskManager.getTask(taskId);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(task, null, 2)
      }]
    };
  }

  private async cancelTask(taskId: string) {
    this.taskManager.cancelTask(taskId);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          taskId,
          status: "cancelled",
          message: "Task has been cancelled"
        })
      }]
    };
  }
}

class TaskManager extends EventEmitter {
  private tasks: Map<string, any> = new Map();

  createTask(projectPath: string, analysisType: string): string {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.tasks.set(taskId, {
      id: taskId,
      projectPath,
      analysisType,
      status: "created",
      message: "Task created",
      createdAt: new Date().toISOString(),
      result: null
    });

    return taskId;
  }

  updateTask(taskId: string, status: string, message: string, result?: any) {
    const task = this.tasks.get(taskId);
    if (task) {
      task.status = status;
      task.message = message;
      task.updatedAt = new Date().toISOString();
      if (result) {
        task.result = result;
      }
      this.emit('taskUpdated', task);
    }
  }

  getTask(taskId: string) {
    return this.tasks.get(taskId) || null;
  }

  cancelTask(taskId: string) {
    const task = this.tasks.get(taskId);
    if (task && task.status === "running") {
      task.status = "cancelled";
      task.message = "Task cancelled by user";
      task.updatedAt = new Date().toISOString();
      this.emit('taskCancelled', task);
    }
  }
}
```

## 总结

MCP集成是Claude Code实现智能化开发环境的核心机制。通过标准化的协议和丰富的服务器生态，开发团队可以：

1. **统一工具链**：将所有开发工具整合到一个智能化平台
2. **提升效率**：通过AI自动化处理复杂的跨系统操作
3. **增强协作**：实现团队知识和工具的无缝共享
4. **扩展能力**：根据特定需求开发自定义MCP服务器
5. **保证质量**：通过智能化监控和分析提升代码质量

MCP的强大之处在于其标准化和可扩展性，它为构建真正智能的开发环境提供了坚实的基础。