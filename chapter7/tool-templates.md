# Team Vibe Coding 工具模板库

## 项目初始化模板

### Node.js + Express API 模板

#### 项目结构
```
nodejs-api-template/
├── src/
│   ├── controllers/          # 控制器层
│   ├── services/            # 业务逻辑层
│   ├── models/              # 数据模型
│   ├── middleware/          # 中间件
│   ├── routes/              # 路由定义
│   ├── utils/               # 工具函数
│   ├── config/              # 配置文件
│   └── app.js               # 应用入口
├── tests/                   # 测试文件
├── docs/                    # 文档
├── scripts/                 # 脚本文件
├── .github/                 # GitHub Actions
├── docker/                  # Docker配置
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── Dockerfile
```

#### package.json 模板
```json
{
  "name": "team-vibe-api",
  "version": "1.0.0",
  "description": "Team Vibe Coding API Template",
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
    "docker:build": "docker build -t team-vibe-api .",
    "docker:run": "docker run -p 3000:3000 team-vibe-api",
    "migrate": "npx prisma migrate dev",
    "generate": "npx prisma generate",
    "seed": "node scripts/seed.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "compression": "^1.7.4",
    "express-rate-limit": "^6.8.1",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.1",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.3.1",
    "@prisma/client": "^5.1.1",
    "redis": "^4.6.7",
    "winston": "^3.10.0",
    "joi": "^17.9.2",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.1",
    "supertest": "^6.3.3",
    "eslint": "^8.45.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.27.5",
    "prettier": "^3.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^13.2.3",
    "prisma": "^5.1.1"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.js": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

#### Express 应用模板 (src/app.js)
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const config = require('./config');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

// 路由导入
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const apiRoutes = require('./routes/api');

const app = express();

// 基础中间件
app.use(helmet()); // 安全头设置
app.use(cors(config.cors)); // CORS配置
app.use(compression()); // 响应压缩
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 限流配置
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 限制每个IP 15分钟内最多100个请求
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Swagger文档配置
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Team Vibe API',
      version: '1.0.0',
      description: 'Team Vibe Coding API Documentation',
    },
    servers: [
      {
        url: process.env.API_BASE_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // 路径到包含OpenAPI定义的文件
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 路由配置
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/v1', authMiddleware, apiRoutes);

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// 错误处理中间件
app.use(errorHandler);

// 优雅关闭
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app;
```

#### 配置文件模板 (src/config/index.js)
```javascript
const dotenv = require('dotenv');
const joi = require('joi');

// 加载环境变量
dotenv.config();

// 环境变量验证schema
const envVarsSchema = joi.object({
  NODE_ENV: joi.string().valid('development', 'production', 'test').default('development'),
  PORT: joi.number().default(3000),
  
  // 数据库配置
  DATABASE_URL: joi.string().required(),
  
  // Redis配置
  REDIS_URL: joi.string().required(),
  
  // JWT配置
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRES_IN: joi.string().default('7d'),
  
  // API配置
  API_BASE_URL: joi.string().default('http://localhost:3000'),
  
  // 日志配置
  LOG_LEVEL: joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
  
  // 外部服务配置
  AI_SERVICE_URL: joi.string().required(),
  AI_SERVICE_API_KEY: joi.string().required(),
}).unknown();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  
  // 数据库配置
  database: {
    url: envVars.DATABASE_URL,
  },
  
  // Redis配置
  redis: {
    url: envVars.REDIS_URL,
  },
  
  // JWT配置
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
  
  // CORS配置
  cors: {
    origin: envVars.NODE_ENV === 'production' 
      ? ['https://yourdomain.com'] 
      : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  },
  
  // 日志配置
  logging: {
    level: envVars.LOG_LEVEL,
  },
  
  // 外部服务配置
  services: {
    ai: {
      url: envVars.AI_SERVICE_URL,
      apiKey: envVars.AI_SERVICE_API_KEY,
    },
  },
};
```

### React + TypeScript 前端模板

#### 项目结构
```
react-typescript-template/
├── public/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── common/         # 通用组件
│   │   ├── forms/          # 表单组件
│   │   └── layout/         # 布局组件
│   ├── pages/              # 页面组件
│   ├── hooks/              # 自定义Hooks
│   ├── services/           # API服务
│   ├── store/              # 状态管理
│   ├── utils/              # 工具函数
│   ├── types/              # TypeScript类型定义
│   ├── styles/             # 样式文件
│   ├── assets/             # 静态资源
│   ├── App.tsx
│   └── index.tsx
├── tests/                  # 测试文件
├── .storybook/            # Storybook配置
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

#### package.json 模板
```json
{
  "name": "team-vibe-frontend",
  "version": "1.0.0",
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
    "zustand": "^4.4.1",
    "react-query": "^3.39.3",
    "axios": "^1.4.0",
    "react-hook-form": "^7.45.2",
    "zod": "^3.21.4",
    "@hookform/resolvers": "^3.1.1",
    "react-hot-toast": "^2.4.1",
    "lucide-react": "^0.263.1",
    "clsx": "^2.0.0",
    "tailwind-merge": "^1.14.0"
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
    "jsdom": "^22.1.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/user-event": "^14.4.3",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.3.3",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27",
    "@storybook/react": "^7.1.1",
    "@storybook/react-vite": "^7.1.1"
  }
}
```

#### Vite 配置 (vite.config.ts)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

#### TypeScript 配置 (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@services/*": ["./src/services/*"],
      "@store/*": ["./src/store/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"],
      "@styles/*": ["./src/styles/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## CI/CD 模板

### GitHub Actions 工作流

#### 完整的CI/CD流水线 (.github/workflows/ci-cd.yml)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  # 代码质量检查
  code-quality:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run ESLint
      run: npm run lint
      
    - name: Run Prettier check
      run: npm run format:check
      
    - name: TypeScript type check
      run: npm run type-check
      
    - name: Run tests
      run: npm run test:coverage
      
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        
  # 安全扫描
  security-scan:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Run Snyk to check for vulnerabilities
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high
        
    - name: Run CodeQL Analysis
      uses: github/codeql-action/init@v2
      with:
        languages: javascript
        
    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2
      
  # 构建和测试
  build-and-test:
    runs-on: ubuntu-latest
    needs: [code-quality, security-scan]
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
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
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run database migrations
      run: npm run migrate
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
        
    - name: Run unit tests
      run: npm run test
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
        REDIS_URL: redis://localhost:6379
        
    - name: Run integration tests
      run: npm run test:integration
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
        REDIS_URL: redis://localhost:6379
        
    - name: Build application
      run: npm run build
      
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/
        
  # Docker构建
  docker-build:
    runs-on: ubuntu-latest
    needs: build-and-test
    if: github.event_name == 'push'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
      
    - name: Log in to Container Registry
      uses: docker/login-action@v2
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v4
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
        
  # 部署到开发环境
  deploy-dev:
    runs-on: ubuntu-latest
    needs: docker-build
    if: github.ref == 'refs/heads/develop'
    environment: development
    
    steps:
    - name: Deploy to development
      run: |
        echo "Deploying to development environment"
        # 这里添加实际的部署脚本
        
  # 部署到生产环境
  deploy-prod:
    runs-on: ubuntu-latest
    needs: docker-build
    if: github.ref == 'refs/heads/main'
    environment: production
    
    steps:
    - name: Deploy to production
      run: |
        echo "Deploying to production environment"
        # 这里添加实际的部署脚本
        
  # 性能测试
  performance-test:
    runs-on: ubuntu-latest
    needs: deploy-dev
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Run performance tests
      run: |
        npm install -g k6
        k6 run tests/performance/load-test.js
        
    - name: Upload performance results
      uses: actions/upload-artifact@v3
      with:
        name: performance-results
        path: performance-results.json
```

### Jenkins Pipeline 模板

#### Jenkinsfile
```groovy
pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'team-vibe-app'
        KUBECONFIG = credentials('kubeconfig')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    env.BUILD_TAG = "${env.BRANCH_NAME}-${env.GIT_COMMIT_SHORT}-${env.BUILD_NUMBER}"
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
                                reportDir: 'lint-results',
                                reportFiles: 'index.html',
                                reportName: 'ESLint Report'
                            ])
                        }
                    }
                }
                
                stage('Security Scan') {
                    steps {
                        sh '''
                            npm audit --audit-level high
                            npx snyk test --severity-threshold=high
                        '''
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
            steps {
                sh '''
                    npm run test:coverage
                    npm run test:integration
                '''
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'test-results.xml'
                    publishCoverage adapters: [
                        istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')
                    ], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
        
        stage('Docker Build') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    def image = docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_TAG}")
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-registry-credentials') {
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to Dev') {
            when {
                branch 'develop'
            }
            steps {
                sh '''
                    helm upgrade --install team-vibe-dev ./helm/team-vibe \\
                        --namespace development \\
                        --set image.tag=${BUILD_TAG} \\
                        --set environment=development \\
                        --wait
                '''
            }
        }
        
        stage('Deploy to Prod') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                sh '''
                    helm upgrade --install team-vibe-prod ./helm/team-vibe \\
                        --namespace production \\
                        --set image.tag=${BUILD_TAG} \\
                        --set environment=production \\
                        --wait
                '''
            }
        }
        
        stage('Performance Test') {
            when {
                branch 'develop'
            }
            steps {
                sh '''
                    k6 run --out json=performance-results.json tests/performance/load-test.js
                '''
            }
            post {
                always {
                    archiveArtifacts artifacts: 'performance-results.json'
                }
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
                message: "✅ Build ${env.JOB_NAME} - ${env.BUILD_NUMBER} succeeded"
            )
        }
        failure {
            slackSend(
                channel: '#deployments',
                color: 'danger',
                message: "❌ Build ${env.JOB_NAME} - ${env.BUILD_NUMBER} failed"
            )
        }
    }
}
```

## 配置文件模板

### ESLint 配置

#### .eslintrc.js
```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
    'import',
  ],
  rules: {
    // TypeScript规则
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    
    // React规则
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // 导入规则
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error',
    
    // 通用规则
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
```

### Prettier 配置

#### .prettierrc
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css"
}
```

#### .prettierignore
```
# 构建输出
dist/
build/
coverage/

# 依赖
node_modules/

# 日志
*.log

# 环境变量
.env*

# 自动生成的文件
*.generated.*
```

### Docker 配置

#### 多阶段构建 Dockerfile
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制package文件
COPY package*.json ./
COPY tsconfig*.json ./

# 安装依赖
RUN npm ci --only=production && npm cache clean --force

# 复制源代码
COPY src/ ./src/
COPY public/ ./public/

# 构建应用
RUN npm run build

# 生产阶段
FROM node:18-alpine AS production

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# 安装生产依赖
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 复制构建产物
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# 切换到非root用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "dist/app.js"]
```

#### Docker Compose 开发环境
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/teamvibe_dev
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=teamvibe_dev
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./scripts/init-db.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

## 测试模板

### Jest 配置

#### jest.config.js
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/**/*.stories.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testTimeout: 10000,
};
```

### 测试工具函数

#### tests/utils/testHelpers.ts
```typescript
import { Request, Response } from 'express';
import { jest } from '@jest/globals';

// Mock Express Request
export const mockRequest = (overrides: Partial<Request> = {}): Partial<Request> => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  user: { id: 'test-user-id' },
  ...overrides,
});

// Mock Express Response
export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res;
};

// 数据库测试工具
export class DatabaseTestHelper {
  static async cleanDatabase() {
    // 清理测试数据库
    // 实现具体的清理逻辑
  }
  
  static async seedTestData() {
    // 插入测试数据
    // 实现具体的数据插入逻辑
  }
}

// API测试工具
export class ApiTestHelper {
  static createAuthHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  
  static async createTestUser() {
    // 创建测试用户
    return {
      id: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User',
    };
  }
}

// 时间测试工具
export class TimeTestHelper {
  static mockDate(date: string) {
    const mockDate = new Date(date);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  }
  
  static restoreDate() {
    jest.restoreAllMocks();
  }
}
```

### 单元测试模板

#### tests/services/userService.test.ts
```typescript
import { UserService } from '@/services/UserService';
import { DatabaseTestHelper, TimeTestHelper } from '../utils/testHelpers';

describe('UserService', () => {
  let userService: UserService;
  
  beforeAll(async () => {
    await DatabaseTestHelper.cleanDatabase();
  });
  
  beforeEach(async () => {
    userService = new UserService();
    await DatabaseTestHelper.seedTestData();
  });
  
  afterEach(async () => {
    await DatabaseTestHelper.cleanDatabase();
    TimeTestHelper.restoreDate();
  });
  
  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      // Arrange
      const userData = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'securepassword123',
      };
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result).toMatchObject({
        id: expect.any(String),
        email: userData.email,
        name: userData.name,
      });
      expect(result.password).toBeUndefined(); // 密码不应该返回
    });
    
    it('should throw error when email already exists', async () => {
      // Arrange
      const userData = {
        email: 'existing@example.com',
        name: 'Existing User',
        password: 'password123',
      };
      
      await userService.createUser(userData);
      
      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(
        'Email already exists'
      );
    });
    
    it('should validate email format', async () => {
      // Arrange
      const userData = {
        email: 'invalid-email',
        name: 'Test User',
        password: 'password123',
      };
      
      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(
        'Invalid email format'
      );
    });
  });
  
  describe('getUserById', () => {
    it('should return user when found', async () => {
      // Arrange
      const user = await userService.createUser({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      });
      
      // Act
      const result = await userService.getUserById(user.id);
      
      // Assert
      expect(result).toMatchObject({
        id: user.id,
        email: 'test@example.com',
        name: 'Test User',
      });
    });
    
    it('should return null when user not found', async () => {
      // Act
      const result = await userService.getUserById('non-existent-id');
      
      // Assert
      expect(result).toBeNull();
    });
  });
  
  describe('updateUser', () => {
    it('should update user successfully', async () => {
      // Arrange
      TimeTestHelper.mockDate('2023-12-01T10:00:00Z');
      
      const user = await userService.createUser({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      });
      
      const updateData = {
        name: 'Updated Name',
      };
      
      // Act
      const result = await userService.updateUser(user.id, updateData);
      
      // Assert
      expect(result).toMatchObject({
        id: user.id,
        name: 'Updated Name',
        updatedAt: new Date('2023-12-01T10:00:00Z'),
      });
    });
  });
});
```

### API测试模板

#### tests/api/users.test.ts
```typescript
import request from 'supertest';
import app from '@/app';
import { DatabaseTestHelper, ApiTestHelper } from '../utils/testHelpers';

describe('Users API', () => {
  let authToken: string;
  
  beforeAll(async () => {
    await DatabaseTestHelper.cleanDatabase();
    
    // 创建测试用户并获取认证token
    const testUser = await ApiTestHelper.createTestUser();
    authToken = 'test-jwt-token'; // 在实际测试中应该生成真实的token
  });
  
  afterAll(async () => {
    await DatabaseTestHelper.cleanDatabase();
  });
  
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      // Arrange
      const userData = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'securepassword123',
      };
      
      // Act
      const response = await request(app)
        .post('/api/users')
        .set(ApiTestHelper.createAuthHeaders(authToken))
        .send(userData);
      
      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        success: true,
        data: {
          id: expect.any(String),
          email: userData.email,
          name: userData.name,
        },
      });
      expect(response.body.data.password).toBeUndefined();
    });
    
    it('should return 400 for invalid email', async () => {
      // Arrange
      const userData = {
        email: 'invalid-email',
        name: 'Test User',
        password: 'password123',
      };
      
      // Act
      const response = await request(app)
        .post('/api/users')
        .set(ApiTestHelper.createAuthHeaders(authToken))
        .send(userData);
      
      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: expect.stringContaining('email'),
        },
      });
    });
    
    it('should return 401 without authentication', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };
      
      // Act
      const response = await request(app)
        .post('/api/users')
        .send(userData);
      
      // Assert
      expect(response.status).toBe(401);
    });
  });
  
  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      // Arrange
      const createResponse = await request(app)
        .post('/api/users')
        .set(ApiTestHelper.createAuthHeaders(authToken))
        .send({
          email: 'gettest@example.com',
          name: 'Get Test User',
          password: 'password123',
        });
      
      const userId = createResponse.body.data.id;
      
      // Act
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set(ApiTestHelper.createAuthHeaders(authToken));
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        success: true,
        data: {
          id: userId,
          email: 'gettest@example.com',
          name: 'Get Test User',
        },
      });
    });
    
    it('should return 404 for non-existent user', async () => {
      // Act
      const response = await request(app)
        .get('/api/users/non-existent-id')
        .set(ApiTestHelper.createAuthHeaders(authToken));
      
      // Assert
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
        },
      });
    });
  });
});
```

这个工具模板库为Team Vibe Coding提供了完整的项目基础设施，包括项目初始化、CI/CD流水线、配置文件和测试框架，帮助团队快速启动新项目并建立标准化的开发流程。