# 第7章：工具模板与资源库

## 📋 本章目录

- [📖 章节概述](#章节概述)
- [🛠️ 项目模板库](#项目模板库)

## 📄 章节文件导航

### 核心模板库
- [工具模板集合](./tool-templates.md) - 完整的项目模板、配置文件和脚本集合
- [AI提示词模板库](./prompt-templates.md) - 涵盖开发全流程的AI提示词库
- [综合资源库](./resource-library.md) - 学习资源、工具推荐和社区资源汇总

### 评估与工具
- [评估工具集合](./assessment-tools.md) - 团队协作效能评估工具和方法
- [文档模板库](./doc-templates.md) - 各类文档的标准模板
- [术语指南](./terminology-guide.md) - 专业术语和概念解释

### 技术参考
- [Claude Markdown模板](./claude-md-templates.md) - Claude AI的Markdown文档模板
- [命令参考手册](./command-reference.md) - 常用命令的详细参考手册
- [常用命令集合](./commands.md) - 开发过程中的常用命令集合
- [现代化环境配置](./modern-setup.md) - 现代开发环境的配置指南

### SuperClaude相关
- [SuperClaude快速参考](./superclaude-quickref.md) - SuperClaude的快速参考指南
- [工作模式说明](./modes.md) - 各种工作模式的详细说明

### 开发模板
- [模块开发模板](./module-template.md) - 标准化的模块开发模板
- [提示词收集库](./prompt-collection.md) - 精选的AI提示词收集
- [工具模板库](./tools-templates.md) - 各类开发工具的模板集合

### 其他资源
- [参考资料汇总](./references.md) - 相关参考资料和文献汇总
- [结语与展望](./epilogue.md) - 总结和未来展望
- [使用指南](./使用指南.md) - 详细的使用指南和操作说明

## 🔗 章节导航

← [上一章：最佳实践与未来展望](../chapter6/README.md) | [返回主目录](../README.md)

---

## 章节概述

本章提供Team Vibe Coding实施过程中所需的各种工具模板、配置文件、脚本和资源库。这些模板和工具经过实际项目验证，可以直接使用或根据具体需求进行定制。

## 7.1 项目模板库

### 基础项目模板

#### Node.js + Express API模板
```json
{
  "name": "vibe-coding-api-template",
  "version": "1.0.0",
  "description": "Team Vibe Coding API项目模板",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "build": "npm run lint && npm run test",
    "docker:build": "docker build -t vibe-api .",
    "docker:run": "docker run -p 3000:3000 vibe-api"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "dotenv": "^16.3.1",
    "joi": "^17.9.2",
    "winston": "^3.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0",
    "@types/jest": "^29.5.3"
  },
  "engines": {
    "node": ">=16.0.0"
  },
  "keywords": ["vibe-coding", "api", "express", "template"],
  "author": "Team Vibe Coding",
  "license": "MIT"
}
```

#### React + TypeScript前端模板
```json
{
  "name": "vibe-coding-react-template",
  "version": "1.0.0",
  "description": "Team Vibe Coding React项目模板",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write src/",
    "type-check": "tsc --noEmit",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.2",
    "axios": "^1.4.0",
    "zustand": "^4.4.1",
    "react-query": "^3.39.3",
    "styled-components": "^6.0.7",
    "react-hook-form": "^7.45.2",
    "zod": "^3.21.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vitest": "^0.34.1",
    "@vitest/ui": "^0.34.1",
    "@vitest/coverage-v8": "^0.34.1",
    "prettier": "^3.0.0",
    "@storybook/react": "^7.1.1",
    "@storybook/react-vite": "^7.1.1"
  }
}
```

### 微服务架构模板

#### Docker Compose配置
```yaml
# docker-compose.yml - 微服务开发环境
version: '3.8'

services:
  # API网关
  api-gateway:
    build: ./services/api-gateway
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - REDIS_URL=redis://redis:6379
      - USER_SERVICE_URL=http://user-service:3001
      - ORDER_SERVICE_URL=http://order-service:3002
    depends_on:
      - redis
      - user-service
      - order-service
    volumes:
      - ./services/api-gateway:/app
      - /app/node_modules
    networks:
      - vibe-network

  # 用户服务
  user-service:
    build: ./services/user-service
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/users
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - postgres
    volumes:
      - ./services/user-service:/app
      - /app/node_modules
    networks:
      - vibe-network

  # 订单服务
  order-service:
    build: ./services/order-service
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/orders
      - RABBITMQ_URL=amqp://rabbitmq:5672
    depends_on:
      - postgres
      - rabbitmq
    volumes:
      - ./services/order-service:/app
      - /app/node_modules
    networks:
      - vibe-network

  # 数据库
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_MULTIPLE_DATABASES=users,orders
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-databases.sh:/docker-entrypoint-initdb.d/init-databases.sh
    networks:
      - vibe-network

  # Redis缓存
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - vibe-network

  # 消息队列
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      - RABBITMQ_DEFAULT_USER=admin
      - RABBITMQ_DEFAULT_PASS=password
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - vibe-network

  # 监控服务
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    networks:
      - vibe-network

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources
    networks:
      - vibe-network

volumes:
  postgres_data:
  redis_data:
  rabbitmq_data:
  prometheus_data:
  grafana_data:

networks:
  vibe-network:
    driver: bridge
```

## 7.2 CI/CD模板库

### GitHub Actions工作流

#### 基础CI/CD流水线
```yaml
# .github/workflows/ci-cd.yml
name: Team Vibe Coding CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # 代码质量检查
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout代码
        uses: actions/checkout@v4

      - name: 设置Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: 安装依赖
        run: npm ci

      - name: 代码格式检查
        run: npm run lint

      - name: 类型检查
        run: npm run type-check

      - name: 安全漏洞扫描
        run: npm audit --audit-level moderate

  # 单元测试
  unit-tests:
    runs-on: ubuntu-latest
    needs: quality-check
    steps:
      - name: Checkout代码
        uses: actions/checkout@v4

      - name: 设置Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: 安装依赖
        run: npm ci

      - name: 运行单元测试
        run: npm run test:coverage

      - name: 上传测试覆盖率
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella

  # 集成测试
  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: Checkout代码
        uses: actions/checkout@v4

      - name: 设置Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: 安装依赖
        run: npm ci

      - name: 运行数据库迁移
        run: npm run db:migrate
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: 运行集成测试
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
          REDIS_URL: redis://localhost:6379

  # 构建Docker镜像
  build-image:
    runs-on: ubuntu-latest
    needs: [unit-tests, integration-tests]
    if: github.event_name == 'push'
    outputs:
      image: ${{ steps.image.outputs.image }}
      digest: ${{ steps.build.outputs.digest }}
    steps:
      - name: Checkout代码
        uses: actions/checkout@v4

      - name: 设置Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: 登录容器注册表
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: 提取元数据
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: 构建并推送镜像
        id: build
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: 输出镜像信息
        id: image
        run: |
          echo "image=${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}" >> $GITHUB_OUTPUT

  # 安全扫描
  security-scan:
    runs-on: ubuntu-latest
    needs: build-image
    if: github.event_name == 'push'
    steps:
      - name: 运行Trivy漏洞扫描
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ needs.build-image.outputs.image }}:${{ github.sha }}
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: 上传Trivy扫描结果
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  # 部署到测试环境
  deploy-staging:
    runs-on: ubuntu-latest
    needs: [build-image, security-scan]
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.example.com
    steps:
      - name: 部署到测试环境
        run: |
          echo "部署镜像 ${{ needs.build-image.outputs.image }}:${{ github.sha }} 到测试环境"
          # 这里添加实际的部署脚本

  # 部署到生产环境
  deploy-production:
    runs-on: ubuntu-latest
    needs: [build-image, security-scan]
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://example.com
    steps:
      - name: 部署到生产环境
        run: |
          echo "部署镜像 ${{ needs.build-image.outputs.image }}:${{ github.sha }} 到生产环境"
          # 这里添加实际的部署脚本

  # 性能测试
  performance-test:
    runs-on: ubuntu-latest
    needs: deploy-staging
    if: github.ref == 'refs/heads/develop'
    steps:
      - name: Checkout代码
        uses: actions/checkout@v4

      - name: 运行性能测试
        run: |
          npm install -g artillery
          artillery run tests/performance/load-test.yml
```

### Jenkins Pipeline模板
```groovy
// Jenkinsfile - Team Vibe Coding Pipeline
pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'vibe-coding-app'
        KUBECONFIG = credentials('kubeconfig')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                }
            }
        }
        
        stage('Setup') {
            steps {
                sh '''
                    nvm use ${NODE_VERSION}
                    npm ci
                '''
            }
        }
        
        stage('Code Quality') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                    post {
                        always {
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'reports/lint',
                                reportFiles: 'index.html',
                                reportName: 'ESLint Report'
                            ])
                        }
                    }
                }
                
                stage('Security Audit') {
                    steps {
                        sh 'npm audit --audit-level moderate'
                    }
                }
                
                stage('Type Check') {
                    steps {
                        sh 'npm run type-check'
                    }
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:coverage'
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'reports/junit.xml'
                            publishCoverage adapters: [
                                istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')
                            ], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                        }
                    }
                }
                
                stage('Integration Tests') {
                    steps {
                        sh '''
                            docker-compose -f docker-compose.test.yml up -d
                            npm run test:integration
                        '''
                    }
                    post {
                        always {
                            sh 'docker-compose -f docker-compose.test.yml down'
                        }
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    def image = docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${env.GIT_COMMIT_SHORT}")
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-registry-credentials') {
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                sh '''
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                        -v $PWD:/tmp/.cache/ aquasec/trivy:latest \
                        image --exit-code 0 --no-progress --format table \
                        ${DOCKER_REGISTRY}/${IMAGE_NAME}:${GIT_COMMIT_SHORT}
                '''
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                sh '''
                    helm upgrade --install vibe-coding-staging ./helm/vibe-coding \
                        --namespace staging \
                        --set image.tag=${GIT_COMMIT_SHORT} \
                        --set environment=staging
                '''
            }
        }
        
        stage('Performance Test') {
            when {
                branch 'develop'
            }
            steps {
                sh '''
                    artillery run tests/performance/load-test.yml \
                        --target https://staging.example.com
                '''
            }
            post {
                always {
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'reports/performance',
                        reportFiles: 'report.html',
                        reportName: 'Performance Test Report'
                    ])
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: '确认部署到生产环境?', ok: '部署'
                sh '''
                    helm upgrade --install vibe-coding-prod ./helm/vibe-coding \
                        --namespace production \
                        --set image.tag=${GIT_COMMIT_SHORT} \
                        --set environment=production
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend(
                channel: '#deployments',
                color: 'good',
                message: "✅ Pipeline成功: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
        failure {
            slackSend(
                channel: '#deployments',
                color: 'danger',
                message: "❌ Pipeline失败: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
    }
}
```

## 7.3 配置文件模板

### ESLint配置
```javascript
// .eslintrc.js - Team Vibe Coding ESLint配置
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'unused-imports'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  rules: {
    // TypeScript规则
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    
    // React规则
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Import规则
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error',
    'import/no-unused-modules': 'warn',
    
    // 通用规则
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': 'off', // 使用TypeScript版本
    'unused-imports/no-unused-imports': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error'
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx,js,jsx}', '**/*.spec.{ts,tsx,js,jsx}'],
      env: {
        jest: true
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['**/*.config.{ts,js}', '**/vite.config.{ts,js}'],
      rules: {
        'import/no-default-export': 'off'
      }
    }
  ]
};
```

### Prettier配置
```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "rangeStart": 0,
  "rangeEnd": null,
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false,
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "printWidth": 100,
        "proseWrap": "always"
      }
    },
    {
      "files": "*.json",
      "options": {
        "printWidth": 120
      }
    }
  ]
}
```

### TypeScript配置
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "removeComments": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/types/*": ["src/types/*"],
      "@/services/*": ["src/services/*"],
      "@/stores/*": ["src/stores/*"]
    }
  },
  "include": [
    "src/**/*",
    "tests/**/*",
    "vite.config.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build"
  ],
  "ts-node": {
    "esm": true
  }
}
```

## 7.4 测试模板库

### Jest配置
```javascript
// jest.config.js - Team Vibe Coding Jest配置
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'cobertura'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },
  testTimeout: 10000,
  verbose: true,
  clearMocks: true,
  restoreMocks: true
};
```

### 测试工具函数
```typescript
// tests/utils/test-utils.tsx - 测试工具函数
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/theme';

// 创建测试用的QueryClient
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

// 测试包装器组件
interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  const queryClient = createTestQueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

// 自定义render函数
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// 模拟API响应
export const mockApiResponse = <T>(data: T, delay = 0) => {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// 模拟API错误
export const mockApiError = (message = 'API Error', status = 500) => {
  return Promise.reject({
    response: {
      status,
      data: { message },
    },
  });
};

// 创建模拟用户数据
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  createdAt: '2023-01-01T00:00:00Z',
  ...overrides,
});

// 创建模拟产品数据
export const createMockProduct = (overrides = {}) => ({
  id: '1',
  name: 'Test Product',
  price: 99.99,
  description: 'Test product description',
  category: 'electronics',
  inStock: true,
  ...overrides,
});

// 等待异步操作完成
export const waitForAsync = () => 
  new Promise(resolve => setTimeout(resolve, 0));

// 模拟文件上传
export const createMockFile = (
  name = 'test.jpg',
  type = 'image/jpeg',
  size = 1024
) => {
  const file = new File(['test content'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

// 模拟localStorage
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
  };
};

// 模拟IntersectionObserver
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
};

// 导出所有工具
export * from '@testing-library/react';
export { customRender as render };
```

### 单元测试模板
```typescript
// src/components/Button/Button.test.tsx - 组件测试模板
import React from 'react';
import { render, screen, fireEvent } from '@/tests/utils/test-utils';
import { Button } from './Button';

describe('Button Component', () => {
  // 基础渲染测试
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  // 属性测试
  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="secondary">Test</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
    
    rerender(<Button variant="danger">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');
  });

  // 事件处理测试
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 禁用状态测试
  it('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // 加载状态测试
  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  // 可访问性测试
  it('has proper accessibility attributes', () => {
    render(
      <Button aria-label="Custom label" aria-describedby="help-text">
        Button
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
    expect(button).toHaveAttribute('aria-describedby', 'help-text');
  });

  // 快照测试
  it('matches snapshot', () => {
    const { container } = render(<Button>Snapshot test</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### API测试模板
```typescript
// src/services/api.test.ts - API服务测试模板
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { userService } from './userService';
import { createMockUser, mockApiError } from '@/tests/utils/test-utils';

// 设置MSW服务器
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([createMockUser()]));
  }),
  
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(createMockUser({ id })));
  }),
  
  rest.post('/api/users', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(createMockUser()));
  }),
  
  rest.put('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.json(createMockUser({ id })));
  }),
  
  rest.delete('/api/users/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  })
);

// 测试生命周期
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('User Service', () => {
  describe('getUsers', () => {
    it('fetches users successfully', async () => {
      const users = await userService.getUsers();
      
      expect(users).toHaveLength(1);
      expect(users[0]).toMatchObject({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('handles API errors', async () => {
      server.use(
        rest.get('/api/users', (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: 'Server Error' }));
        })
      );

      await expect(userService.getUsers()).rejects.toThrow('Server Error');
    });
  });

  describe('getUserById', () => {
    it('fetches user by id successfully', async () => {
      const user = await userService.getUserById('123');
      
      expect(user).toMatchObject({
        id: '123',
        name: 'Test User',
      });
    });

    it('handles not found error', async () => {
      server.use(
        rest.get('/api/users/:id', (req, res, ctx) => {
          return res(ctx.status(404), ctx.json({ message: 'User not found' }));
        })
      );

      await expect(userService.getUserById('999')).rejects.toThrow('User not found');
    });
  });

  describe('createUser', () => {
    it('creates user successfully', async () => {
      const userData = {
        name: 'New User',
        email: 'new@example.com',
      };

      const user = await userService.createUser(userData);
      
      expect(user).toMatchObject({
        id: expect.any(String),
        name: 'New User',
        email: 'new@example.com',
      });
    });

    it('handles validation errors', async () => {
      server.use(
        rest.post('/api/users', (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({ message: 'Validation failed', errors: ['Email is required'] })
          );
        })
      );

      await expect(userService.createUser({})).rejects.toThrow('Validation failed');
    });
  });

  describe('updateUser', () => {
    it('updates user successfully', async () => {
      const updateData = { name: 'Updated Name' };
      const user = await userService.updateUser('1', updateData);
      
      expect(user).toMatchObject({
        id: '1',
        name: 'Updated Name',
      });
    });
  });

  describe('deleteUser', () => {
    it('deletes user successfully', async () => {
      await expect(userService.deleteUser('1')).resolves.toBeUndefined();
    });

    it('handles delete errors', async () => {
      server.use(
        rest.delete('/api/users/:id', (req, res, ctx) => {
          return res(ctx.status(403), ctx.json({ message: 'Forbidden' }));
        })
      );

      await expect(userService.deleteUser('1')).rejects.toThrow('Forbidden');
    });
  });
});
```

## 章节导航

### 7.1 项目模板库
- [基础项目模板](./project-templates.md)
- [微服务架构模板](./microservice-templates.md)
- [全栈应用模板](./fullstack-templates.md)

### 7.2 CI/CD模板库
- [GitHub Actions工作流](./github-actions.md)
- [Jenkins Pipeline](./jenkins-pipeline.md)
- [GitLab CI配置](./gitlab-ci.md)

### 7.3 配置文件模板
- [代码质量配置](./code-quality-configs.md)
- [构建工具配置](./build-configs.md)
- [开发环境配置](./dev-configs.md)

### 7.4 测试模板库
- [单元测试模板](./unit-test-templates.md)
- [集成测试模板](./integration-test-templates.md)
- [E2E测试模板](./e2e-test-templates.md)

### 7.5 文档模板库
- [API文档模板](./api-doc-templates.md)
- [用户手册模板](./user-manual-templates.md)
- [技术规范模板](./tech-spec-templates.md)

### 7.6 监控与运维
- [监控配置模板](./monitoring-templates.md)
- [日志配置模板](./logging-templates.md)
- [部署脚本模板](./deployment-templates.md)

---

**上一章节**: [第6章：最佳实践与未来展望](../chapter6/README.md)

**返回目录**: [图书目录](../SUMMARY-new.md)