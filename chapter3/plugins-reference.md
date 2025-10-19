# Claude Code 插件开发 API 参考

## 概述

Claude Code 插件 API 为开发者提供了强大的扩展能力，允许创建各种类型的插件来增强 Claude Code 的功能。本文档详细介绍了插件开发所需的 API、接口、事件系统和最佳实践。

## 插件架构

### 插件类型

#### 1. Command Plugin (命令插件)
执行特定操作的命令插件。

#### 2. Agent Plugin (智能代理插件)
提供 AI 辅助功能的智能代理。

#### 3. Hook Plugin (钩子插件)
在特定事件发生时执行的钩子函数。

#### 4. MCP Server Plugin (MCP 服务器插件)
实现 Model Context Protocol 的服务器插件。

#### 5. Provider Plugin (提供者插件)
提供特定服务或数据的插件。

### 插件生命周期

```typescript
interface PluginLifecycle {
  activate(context: ExtensionContext): void | Promise<void>;
  deactivate(): void | Promise<void>;
}
```

## 1. 核心 API

### ExtensionContext

插件上下文对象，提供插件运行时环境。

```typescript
interface ExtensionContext {
  // 订阅管理
  subscriptions: Disposable[];
  
  // 工作空间路径
  extensionPath: string;
  workspaceState: Memento;
  globalState: Memento;
  
  // 存储路径
  storagePath?: string;
  globalStoragePath: string;
  logPath: string;
  
  // 环境信息
  extensionMode: ExtensionMode;
  
  // 秘钥存储
  secrets: SecretStorage;
  
  // 扩展 URI
  extensionUri: Uri;
  
  // 环境变量
  environmentVariableCollection: EnvironmentVariableCollection;
}
```

#### 使用示例
```typescript
export function activate(context: ExtensionContext) {
  // 获取工作空间状态
  const lastUsed = context.workspaceState.get('lastUsed', 0);
  
  // 更新状态
  context.workspaceState.update('lastUsed', Date.now());
  
  // 注册清理函数
  context.subscriptions.push(
    commands.registerCommand('myPlugin.cleanup', () => {
      // 清理逻辑
    })
  );
}
```

### Disposable

资源清理接口。

```typescript
interface Disposable {
  dispose(): void;
}

class DisposableStore implements Disposable {
  private disposables: Disposable[] = [];
  
  add<T extends Disposable>(disposable: T): T {
    this.disposables.push(disposable);
    return disposable;
  }
  
  dispose(): void {
    this.disposables.forEach(d => d.dispose());
    this.disposables = [];
  }
}
```

## 2. 命令系统 API

### 命令注册

```typescript
namespace commands {
  // 注册命令
  export function registerCommand(
    command: string,
    callback: (...args: any[]) => any,
    thisArg?: any
  ): Disposable;
  
  // 注册文本编辑器命令
  export function registerTextEditorCommand(
    command: string,
    callback: (textEditor: TextEditor, edit: TextEditorEdit, ...args: any[]) => void,
    thisArg?: any
  ): Disposable;
  
  // 执行命令
  export function executeCommand<T = unknown>(
    command: string,
    ...rest: any[]
  ): Thenable<T>;
  
  // 获取所有命令
  export function getCommands(filterInternal?: boolean): Thenable<string[]>;
}
```

#### 命令实现示例
```typescript
// 简单命令
const disposable1 = commands.registerCommand('myPlugin.helloWorld', () => {
  window.showInformationMessage('Hello World!');
});

// 带参数的命令
const disposable2 = commands.registerCommand('myPlugin.processFile', (uri: Uri) => {
  if (uri) {
    // 处理特定文件
    processFile(uri.fsPath);
  } else {
    // 处理当前活动文件
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
      processFile(activeEditor.document.uri.fsPath);
    }
  }
});

// 文本编辑器命令
const disposable3 = commands.registerTextEditorCommand(
  'myPlugin.insertText',
  (textEditor: TextEditor, edit: TextEditorEdit, text: string) => {
    edit.insert(textEditor.selection.active, text);
  }
);
```

### 命令贡献点

```json
// package.json
{
  "contributes": {
    "commands": [
      {
        "command": "myPlugin.helloWorld",
        "title": "Hello World",
        "category": "My Plugin",
        "icon": "$(heart)",
        "enablement": "resourceExtname == .js"
      }
    ],
    "menus": {
      "commandPalette": [
        {
          "command": "myPlugin.helloWorld",
          "when": "editorLangId == javascript"
        }
      ],
      "editor/context": [
        {
          "command": "myPlugin.processFile",
          "group": "myPlugin",
          "when": "resourceExtname == .ts"
        }
      ]
    },
    "keybindings": [
      {
        "command": "myPlugin.helloWorld",
        "key": "ctrl+shift+h",
        "mac": "cmd+shift+h",
        "when": "editorTextFocus"
      }
    ]
  }
}
```

## 3. 窗口和编辑器 API

### Window API

```typescript
namespace window {
  // 活动编辑器
  export let activeTextEditor: TextEditor | undefined;
  
  // 可见编辑器
  export let visibleTextEditors: readonly TextEditor[];
  
  // 活动终端
  export let activeTerminal: Terminal | undefined;
  
  // 所有终端
  export let terminals: readonly Terminal[];
  
  // 状态栏
  export function createStatusBarItem(
    alignment?: StatusBarAlignment,
    priority?: number
  ): StatusBarItem;
  
  // 输出通道
  export function createOutputChannel(name: string): OutputChannel;
  
  // 显示消息
  export function showInformationMessage<T extends string>(
    message: string,
    ...items: T[]
  ): Thenable<T | undefined>;
  
  export function showWarningMessage<T extends string>(
    message: string,
    ...items: T[]
  ): Thenable<T | undefined>;
  
  export function showErrorMessage<T extends string>(
    message: string,
    ...items: T[]
  ): Thenable<T | undefined>;
  
  // 输入框
  export function showInputBox(options?: InputBoxOptions): Thenable<string | undefined>;
  
  // 快速选择
  export function showQuickPick<T extends QuickPickItem>(
    items: readonly T[] | Thenable<readonly T[]>,
    options?: QuickPickOptions
  ): Thenable<T | undefined>;
  
  // 文件选择
  export function showOpenDialog(options?: OpenDialogOptions): Thenable<Uri[] | undefined>;
  export function showSaveDialog(options?: SaveDialogOptions): Thenable<Uri | undefined>;
  
  // 进度显示
  export function withProgress<R>(
    options: ProgressOptions,
    task: (progress: Progress<{ message?: string; increment?: number }>) => Thenable<R>
  ): Thenable<R>;
}
```

#### 使用示例
```typescript
// 显示消息并获取用户选择
const choice = await window.showInformationMessage(
  'Do you want to continue?',
  'Yes',
  'No'
);

if (choice === 'Yes') {
  // 用户选择继续
}

// 显示输入框
const userInput = await window.showInputBox({
  prompt: 'Enter your name',
  placeHolder: 'Name',
  validateInput: (value) => {
    if (!value || value.trim().length === 0) {
      return 'Name cannot be empty';
    }
    return null;
  }
});

// 显示进度
await window.withProgress({
  location: ProgressLocation.Notification,
  title: 'Processing files',
  cancellable: true
}, async (progress, token) => {
  for (let i = 0; i < 100; i++) {
    if (token.isCancellationRequested) {
      break;
    }
    
    progress.report({
      message: `Processing file ${i + 1}/100`,
      increment: 1
    });
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
});
```

### TextEditor API

```typescript
interface TextEditor {
  // 文档
  document: TextDocument;
  
  // 选择
  selection: Selection;
  selections: readonly Selection[];
  
  // 可见范围
  visibleRanges: readonly Range[];
  
  // 选项
  options: TextEditorOptions;
  
  // 视图列
  viewColumn?: ViewColumn;
  
  // 编辑操作
  edit(callback: (editBuilder: TextEditorEdit) => void): Thenable<boolean>;
  
  // 插入片段
  insertSnippet(
    snippet: SnippetString,
    location?: Position | Range | readonly Position[] | readonly Range[]
  ): Thenable<boolean>;
  
  // 设置装饰
  setDecorations(
    decorationType: TextEditorDecorationType,
    rangesOrOptions: readonly Range[] | readonly DecorationOptions[]
  ): void;
  
  // 滚动到指定位置
  revealRange(range: Range, revealType?: TextEditorRevealType): void;
  
  // 显示/隐藏
  show(column?: ViewColumn): void;
  hide(): void;
}
```

#### 编辑器操作示例
```typescript
// 获取当前编辑器
const editor = window.activeTextEditor;
if (!editor) {
  return;
}

// 编辑文档
await editor.edit(editBuilder => {
  // 在当前位置插入文本
  editBuilder.insert(editor.selection.active, 'Hello World!');
  
  // 替换选中的文本
  editBuilder.replace(editor.selection, 'New Text');
  
  // 删除指定范围
  const range = new Range(0, 0, 0, 10);
  editBuilder.delete(range);
});

// 插入代码片段
const snippet = new SnippetString('console.log("${1:message}");');
await editor.insertSnippet(snippet);

// 设置文本装饰
const decorationType = window.createTextEditorDecorationType({
  backgroundColor: 'rgba(255, 255, 0, 0.3)',
  border: '1px solid yellow'
});

editor.setDecorations(decorationType, [
  new Range(0, 0, 0, 10)
]);
```

## 4. 工作空间 API

### Workspace API

```typescript
namespace workspace {
  // 工作空间文件夹
  export let workspaceFolders: readonly WorkspaceFolder[] | undefined;
  
  // 工作空间文件
  export let workspaceFile: Uri | undefined;
  
  // 配置
  export function getConfiguration(
    section?: string,
    resource?: Uri
  ): WorkspaceConfiguration;
  
  // 文件系统监视
  export function createFileSystemWatcher(
    globPattern: GlobPattern,
    ignoreCreateEvents?: boolean,
    ignoreChangeEvents?: boolean,
    ignoreDeleteEvents?: boolean
  ): FileSystemWatcher;
  
  // 文档操作
  export function openTextDocument(uri: Uri): Thenable<TextDocument>;
  export function openTextDocument(fileName: string): Thenable<TextDocument>;
  export function openTextDocument(options?: { language?: string; content?: string }): Thenable<TextDocument>;
  
  // 保存所有文档
  export function saveAll(includeUntitled?: boolean): Thenable<boolean>;
  
  // 查找文件
  export function findFiles(
    include: GlobPattern,
    exclude?: GlobPattern,
    maxResults?: number,
    token?: CancellationToken
  ): Thenable<Uri[]>;
  
  // 文本搜索
  export function findTextInFiles(
    query: TextSearchQuery,
    options: FindTextInFilesOptions,
    callback: (result: TextSearchResult) => void,
    token?: CancellationToken
  ): Thenable<TextSearchComplete>;
}
```

#### 工作空间操作示例
```typescript
// 获取配置
const config = workspace.getConfiguration('myPlugin');
const enabled = config.get<boolean>('enabled', true);

// 监视文件变化
const watcher = workspace.createFileSystemWatcher('**/*.ts');

watcher.onDidCreate(uri => {
  console.log(`File created: ${uri.fsPath}`);
});

watcher.onDidChange(uri => {
  console.log(`File changed: ${uri.fsPath}`);
});

watcher.onDidDelete(uri => {
  console.log(`File deleted: ${uri.fsPath}`);
});

// 查找文件
const tsFiles = await workspace.findFiles('**/*.ts', '**/node_modules/**');
console.log(`Found ${tsFiles.length} TypeScript files`);

// 搜索文本
await workspace.findTextInFiles(
  { pattern: 'TODO', isRegExp: false },
  { include: '**/*.ts', exclude: '**/node_modules/**' },
  (result) => {
    console.log(`Found TODO in ${result.uri.fsPath}:${result.range.start.line}`);
  }
);
```

## 5. 语言服务 API

### Language Features

```typescript
namespace languages {
  // 注册语言特性
  export function registerCompletionItemProvider(
    selector: DocumentSelector,
    provider: CompletionItemProvider,
    ...triggerCharacters: string[]
  ): Disposable;
  
  export function registerHoverProvider(
    selector: DocumentSelector,
    provider: HoverProvider
  ): Disposable;
  
  export function registerDefinitionProvider(
    selector: DocumentSelector,
    provider: DefinitionProvider
  ): Disposable;
  
  export function registerReferenceProvider(
    selector: DocumentSelector,
    provider: ReferenceProvider
  ): Disposable;
  
  export function registerDocumentSymbolProvider(
    selector: DocumentSelector,
    provider: DocumentSymbolProvider
  ): Disposable;
  
  export function registerCodeActionsProvider(
    selector: DocumentSelector,
    provider: CodeActionProvider,
    metadata?: CodeActionProviderMetadata
  ): Disposable;
  
  export function registerCodeLensProvider(
    selector: DocumentSelector,
    provider: CodeLensProvider
  ): Disposable;
  
  // 诊断
  export function createDiagnosticCollection(name?: string): DiagnosticCollection;
  
  // 获取诊断
  export function getDiagnostics(resource?: Uri): Diagnostic[];
}
```

#### 语言特性实现示例
```typescript
// 自动补全提供者
class MyCompletionProvider implements CompletionItemProvider {
  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList> {
    const completions: CompletionItem[] = [];
    
    // 添加自定义补全项
    const item = new CompletionItem('myFunction', CompletionItemKind.Function);
    item.detail = 'My custom function';
    item.documentation = new MarkdownString('This is my custom function');
    item.insertText = new SnippetString('myFunction(${1:param})');
    
    completions.push(item);
    
    return completions;
  }
}

// 注册补全提供者
const completionProvider = languages.registerCompletionItemProvider(
  { scheme: 'file', language: 'typescript' },
  new MyCompletionProvider(),
  '.' // 触发字符
);

// 悬停提供者
class MyHoverProvider implements HoverProvider {
  provideHover(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): ProviderResult<Hover> {
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);
    
    if (word === 'myFunction') {
      const markdown = new MarkdownString();
      markdown.appendCodeblock('function myFunction(param: string): void', 'typescript');
      markdown.appendMarkdown('My custom function description');
      
      return new Hover(markdown, range);
    }
    
    return null;
  }
}

// 诊断集合
const diagnosticCollection = languages.createDiagnosticCollection('myPlugin');

function updateDiagnostics(document: TextDocument): void {
  const diagnostics: Diagnostic[] = [];
  
  // 检查文档并添加诊断
  const text = document.getText();
  const todoRegex = /TODO:/g;
  let match;
  
  while ((match = todoRegex.exec(text)) !== null) {
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);
    const range = new Range(startPos, endPos);
    
    const diagnostic = new Diagnostic(
      range,
      'TODO comment found',
      DiagnosticSeverity.Information
    );
    diagnostic.source = 'myPlugin';
    
    diagnostics.push(diagnostic);
  }
  
  diagnosticCollection.set(document.uri, diagnostics);
}
```

## 6. 文件系统 API

### FileSystem API

```typescript
namespace workspace {
  export let fs: FileSystem;
}

interface FileSystem {
  // 读取文件
  readFile(uri: Uri): Thenable<Uint8Array>;
  
  // 写入文件
  writeFile(uri: Uri, content: Uint8Array): Thenable<void>;
  
  // 创建目录
  createDirectory(uri: Uri): Thenable<void>;
  
  // 删除文件/目录
  delete(uri: Uri, options?: { recursive?: boolean; useTrash?: boolean }): Thenable<void>;
  
  // 重命名/移动
  rename(source: Uri, target: Uri, options?: { overwrite?: boolean }): Thenable<void>;
  
  // 复制
  copy(source: Uri, target: Uri, options?: { overwrite?: boolean }): Thenable<void>;
  
  // 获取文件状态
  stat(uri: Uri): Thenable<FileStat>;
  
  // 读取目录
  readDirectory(uri: Uri): Thenable<[string, FileType][]>;
}
```

#### 文件操作示例
```typescript
// 读取文件
const fileUri = Uri.file('/path/to/file.txt');
const content = await workspace.fs.readFile(fileUri);
const text = Buffer.from(content).toString('utf8');

// 写入文件
const newContent = Buffer.from('Hello World!', 'utf8');
await workspace.fs.writeFile(fileUri, newContent);

// 创建目录
const dirUri = Uri.file('/path/to/new/directory');
await workspace.fs.createDirectory(dirUri);

// 读取目录
const entries = await workspace.fs.readDirectory(dirUri);
for (const [name, type] of entries) {
  console.log(`${name}: ${type === FileType.File ? 'File' : 'Directory'}`);
}

// 文件监视器
const watcher = workspace.createFileSystemWatcher('**/*.json');

watcher.onDidCreate(async (uri) => {
  const content = await workspace.fs.readFile(uri);
  const json = JSON.parse(Buffer.from(content).toString('utf8'));
  console.log('New JSON file created:', json);
});
```

## 7. 任务和调试 API

### Tasks API

```typescript
namespace tasks {
  // 执行任务
  export function executeTask(task: Task): Thenable<TaskExecution>;
  
  // 获取任务
  export function fetchTasks(filter?: TaskFilter): Thenable<Task[]>;
  
  // 注册任务提供者
  export function registerTaskProvider(
    type: string,
    provider: TaskProvider
  ): Disposable;
  
  // 任务事件
  export const onDidStartTask: Event<TaskStartEvent>;
  export const onDidEndTask: Event<TaskEndEvent>;
  export const onDidStartTaskProcess: Event<TaskProcessStartEvent>;
  export const onDidEndTaskProcess: Event<TaskProcessEndEvent>;
}
```

#### 任务实现示例
```typescript
// 任务提供者
class MyTaskProvider implements TaskProvider {
  provideTasks(token?: CancellationToken): ProviderResult<Task[]> {
    const tasks: Task[] = [];
    
    // 创建构建任务
    const buildTask = new Task(
      { type: 'myPlugin', task: 'build' },
      TaskScope.Workspace,
      'Build',
      'myPlugin',
      new ShellExecution('npm run build')
    );
    
    buildTask.group = TaskGroup.Build;
    buildTask.presentationOptions = {
      echo: true,
      reveal: TaskRevealKind.Always,
      focus: false,
      panel: TaskPanelKind.Shared
    };
    
    tasks.push(buildTask);
    
    return tasks;
  }
  
  resolveTask(task: Task, token?: CancellationToken): ProviderResult<Task> {
    // 解析任务详情
    return task;
  }
}

// 注册任务提供者
const taskProvider = tasks.registerTaskProvider('myPlugin', new MyTaskProvider());

// 监听任务事件
tasks.onDidStartTask(e => {
  console.log(`Task started: ${e.execution.task.name}`);
});

tasks.onDidEndTask(e => {
  console.log(`Task ended: ${e.execution.task.name}`);
});
```

### Debug API

```typescript
namespace debug {
  // 启动调试会话
  export function startDebugging(
    folder: WorkspaceFolder | undefined,
    nameOrConfiguration: string | DebugConfiguration,
    parentSessionOrOptions?: DebugSession | DebugSessionOptions
  ): Thenable<boolean>;
  
  // 停止调试会话
  export function stopDebugging(session?: DebugSession): Thenable<void>;
  
  // 注册调试配置提供者
  export function registerDebugConfigurationProvider(
    debugType: string,
    provider: DebugConfigurationProvider,
    triggerKind?: DebugConfigurationProviderTriggerKind
  ): Disposable;
  
  // 注册调试适配器描述符工厂
  export function registerDebugAdapterDescriptorFactory(
    debugType: string,
    factory: DebugAdapterDescriptorFactory
  ): Disposable;
  
  // 调试事件
  export const onDidStartDebugSession: Event<DebugSession>;
  export const onDidTerminateDebugSession: Event<DebugSession>;
  export const onDidChangeActiveDebugSession: Event<DebugSession | undefined>;
  export const onDidReceiveDebugSessionCustomEvent: Event<DebugSessionCustomEvent>;
}
```

## 8. 扩展 API

### Claude Code 特定 API

```typescript
namespace claudeCode {
  // AI 服务
  export namespace ai {
    // 代码生成
    export function generateCode(
      prompt: string,
      context: CodeContext,
      options?: GenerationOptions
    ): Promise<GeneratedCode>;
    
    // 代码分析
    export function analyzeCode(
      code: string,
      language: string,
      options?: AnalysisOptions
    ): Promise<CodeAnalysis>;
    
    // 代码重构
    export function refactorCode(
      code: string,
      refactorType: RefactorType,
      options?: RefactorOptions
    ): Promise<RefactoredCode>;
    
    // 智能补全
    export function getCompletions(
      document: TextDocument,
      position: Position,
      context: CompletionContext
    ): Promise<AICompletion[]>;
  }
  
  // 项目分析
  export namespace project {
    // 项目结构分析
    export function analyzeStructure(
      workspaceFolder: WorkspaceFolder
    ): Promise<ProjectStructure>;
    
    // 依赖分析
    export function analyzeDependencies(
      workspaceFolder: WorkspaceFolder
    ): Promise<DependencyAnalysis>;
    
    // 代码质量评估
    export function assessQuality(
      workspaceFolder: WorkspaceFolder
    ): Promise<QualityAssessment>;
  }
  
  // 团队协作
  export namespace collaboration {
    // 代码审查
    export function reviewCode(
      changes: CodeChange[],
      options?: ReviewOptions
    ): Promise<CodeReview>;
    
    // 知识分享
    export function shareKnowledge(
      topic: string,
      content: string,
      audience: TeamMember[]
    ): Promise<void>;
    
    // 工作流程
    export function executeWorkflow(
      workflowId: string,
      parameters: WorkflowParameters
    ): Promise<WorkflowResult>;
  }
}
```

#### Claude Code API 使用示例
```typescript
// AI 代码生成
const generatedCode = await claudeCode.ai.generateCode(
  'Create a React component for user profile',
  {
    language: 'typescript',
    framework: 'react',
    currentFile: document.uri.fsPath,
    selectedText: editor.document.getText(editor.selection)
  },
  {
    style: 'functional',
    includeTests: true,
    includeTypes: true
  }
);

// 插入生成的代码
await editor.edit(editBuilder => {
  editBuilder.insert(editor.selection.active, generatedCode.code);
});

// 项目分析
const projectStructure = await claudeCode.project.analyzeStructure(
  workspace.workspaceFolders![0]
);

console.log('Project type:', projectStructure.type);
console.log('Main technologies:', projectStructure.technologies);

// 代码审查
const review = await claudeCode.collaboration.reviewCode(
  getChangedFiles(),
  {
    focusAreas: ['security', 'performance', 'maintainability'],
    severity: 'medium'
  }
);

// 显示审查结果
window.showInformationMessage(
  `Code review completed: ${review.issues.length} issues found`
);
```

## 9. 事件系统

### 事件监听

```typescript
// 文档事件
workspace.onDidOpenTextDocument(document => {
  console.log(`Document opened: ${document.fileName}`);
});

workspace.onDidCloseTextDocument(document => {
  console.log(`Document closed: ${document.fileName}`);
});

workspace.onDidSaveTextDocument(document => {
  console.log(`Document saved: ${document.fileName}`);
});

workspace.onDidChangeTextDocument(event => {
  console.log(`Document changed: ${event.document.fileName}`);
  console.log(`Changes: ${event.contentChanges.length}`);
});

// 编辑器事件
window.onDidChangeActiveTextEditor(editor => {
  if (editor) {
    console.log(`Active editor changed: ${editor.document.fileName}`);
  }
});

window.onDidChangeTextEditorSelection(event => {
  console.log(`Selection changed in: ${event.textEditor.document.fileName}`);
});

// 工作空间事件
workspace.onDidChangeWorkspaceFolders(event => {
  console.log(`Workspace folders changed:`);
  console.log(`Added: ${event.added.length}`);
  console.log(`Removed: ${event.removed.length}`);
});

// 配置事件
workspace.onDidChangeConfiguration(event => {
  if (event.affectsConfiguration('myPlugin')) {
    console.log('My plugin configuration changed');
    // 重新加载配置
    reloadConfiguration();
  }
});
```

### 自定义事件

```typescript
// 事件发射器
class MyEventEmitter {
  private _onDidChange = new EventEmitter<string>();
  
  get onDidChange(): Event<string> {
    return this._onDidChange.event;
  }
  
  fireChange(message: string): void {
    this._onDidChange.fire(message);
  }
  
  dispose(): void {
    this._onDidChange.dispose();
  }
}

// 使用自定义事件
const emitter = new MyEventEmitter();

const subscription = emitter.onDidChange(message => {
  console.log('Event received:', message);
});

// 触发事件
emitter.fireChange('Hello World!');

// 清理
subscription.dispose();
emitter.dispose();
```

## 10. 配置系统

### 配置定义

```json
// package.json
{
  "contributes": {
    "configuration": {
      "title": "My Plugin",
      "properties": {
        "myPlugin.enabled": {
          "type": "boolean",
          "default": true,
          "description": "Enable My Plugin"
        },
        "myPlugin.apiKey": {
          "type": "string",
          "default": "",
          "description": "API Key for external service"
        },
        "myPlugin.timeout": {
          "type": "number",
          "default": 5000,
          "minimum": 1000,
          "maximum": 30000,
          "description": "Request timeout in milliseconds"
        },
        "myPlugin.logLevel": {
          "type": "string",
          "enum": ["debug", "info", "warn", "error"],
          "default": "info",
          "description": "Log level"
        },
        "myPlugin.features": {
          "type": "object",
          "properties": {
            "autoComplete": {
              "type": "boolean",
              "default": true
            },
            "codeGeneration": {
              "type": "boolean",
              "default": true
            }
          },
          "default": {
            "autoComplete": true,
            "codeGeneration": true
          },
          "description": "Feature toggles"
        }
      }
    }
  }
}
```

### 配置访问

```typescript
// 配置管理类
class ConfigurationManager {
  private config: WorkspaceConfiguration;
  
  constructor() {
    this.config = workspace.getConfiguration('myPlugin');
    
    // 监听配置变化
    workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration('myPlugin')) {
        this.config = workspace.getConfiguration('myPlugin');
        this.onConfigurationChanged();
      }
    });
  }
  
  get enabled(): boolean {
    return this.config.get<boolean>('enabled', true);
  }
  
  get apiKey(): string {
    return this.config.get<string>('apiKey', '');
  }
  
  get timeout(): number {
    return this.config.get<number>('timeout', 5000);
  }
  
  get logLevel(): string {
    return this.config.get<string>('logLevel', 'info');
  }
  
  get features(): { autoComplete: boolean; codeGeneration: boolean } {
    return this.config.get('features', {
      autoComplete: true,
      codeGeneration: true
    });
  }
  
  async updateConfiguration(key: string, value: any, target?: ConfigurationTarget): Promise<void> {
    await this.config.update(key, value, target);
  }
  
  private onConfigurationChanged(): void {
    console.log('Configuration changed');
    // 重新初始化插件功能
  }
}

// 使用配置
const configManager = new ConfigurationManager();

if (configManager.enabled && configManager.features.autoComplete) {
  // 启用自动补全功能
  enableAutoComplete();
}
```

## 11. 测试 API

### 插件测试

```typescript
// 测试套件
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as myExtension from '../extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');
  
  test('Extension should be present', () => {
    assert.ok(vscode.extensions.getExtension('publisher.my-plugin'));
  });
  
  test('Extension should activate', async () => {
    const extension = vscode.extensions.getExtension('publisher.my-plugin');
    await extension?.activate();
    assert.ok(extension?.isActive);
  });
  
  test('Command should be registered', async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes('myPlugin.helloWorld'));
  });
  
  test('Command should execute', async () => {
    const result = await vscode.commands.executeCommand('myPlugin.helloWorld');
    assert.ok(result);
  });
});

// 集成测试
suite('Integration Tests', () => {
  let document: vscode.TextDocument;
  let editor: vscode.TextEditor;
  
  setup(async () => {
    document = await vscode.workspace.openTextDocument({
      content: 'console.log("Hello World");',
      language: 'javascript'
    });
    editor = await vscode.window.showTextDocument(document);
  });
  
  teardown(async () => {
    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  });
  
  test('Should provide completions', async () => {
    const position = new vscode.Position(0, 8);
    const completions = await vscode.commands.executeCommand<vscode.CompletionList>(
      'vscode.executeCompletionItemProvider',
      document.uri,
      position
    );
    
    assert.ok(completions);
    assert.ok(completions.items.length > 0);
  });
});
```

### 测试工具

```typescript
// 测试辅助工具
export class TestHelper {
  static async createTestDocument(content: string, language: string = 'plaintext'): Promise<vscode.TextDocument> {
    return await vscode.workspace.openTextDocument({
      content,
      language
    });
  }
  
  static async openDocument(document: vscode.TextDocument): Promise<vscode.TextEditor> {
    return await vscode.window.showTextDocument(document);
  }
  
  static async closeAllEditors(): Promise<void> {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  }
  
  static async waitForCondition(
    condition: () => boolean,
    timeout: number = 5000
  ): Promise<void> {
    const start = Date.now();
    
    while (!condition() && Date.now() - start < timeout) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (!condition()) {
      throw new Error('Condition not met within timeout');
    }
  }
  
  static mockConfiguration(section: string, values: any): vscode.Disposable {
    const originalGet = vscode.workspace.getConfiguration;
    
    vscode.workspace.getConfiguration = (configSection?: string) => {
      if (configSection === section) {
        return {
          get: (key: string, defaultValue?: any) => {
            return values[key] !== undefined ? values[key] : defaultValue;
          },
          has: (key: string) => values.hasOwnProperty(key),
          inspect: () => undefined,
          update: () => Promise.resolve()
        } as any;
      }
      return originalGet(configSection);
    };
    
    return {
      dispose: () => {
        vscode.workspace.getConfiguration = originalGet;
      }
    };
  }
}
```

## 12. 最佳实践

### 插件架构设计

```typescript
// 插件主类
export class MyPlugin {
  private context: ExtensionContext;
  private disposables: Disposable[] = [];
  private configManager: ConfigurationManager;
  private commandManager: CommandManager;
  private languageService: LanguageService;
  
  constructor(context: ExtensionContext) {
    this.context = context;
    this.configManager = new ConfigurationManager();
    this.commandManager = new CommandManager(context);
    this.languageService = new LanguageService();
  }
  
  async activate(): Promise<void> {
    try {
      // 初始化各个模块
      await this.configManager.initialize();
      await this.commandManager.initialize();
      await this.languageService.initialize();
      
      // 注册事件监听器
      this.registerEventListeners();
      
      // 注册清理函数
      this.context.subscriptions.push(...this.disposables);
      
      console.log('My Plugin activated successfully');
    } catch (error) {
      console.error('Failed to activate My Plugin:', error);
      throw error;
    }
  }
  
  async deactivate(): Promise<void> {
    try {
      // 清理资源
      this.disposables.forEach(d => d.dispose());
      
      await this.languageService.dispose();
      await this.commandManager.dispose();
      await this.configManager.dispose();
      
      console.log('My Plugin deactivated successfully');
    } catch (error) {
      console.error('Error during deactivation:', error);
    }
  }
  
  private registerEventListeners(): void {
    // 文档事件
    this.disposables.push(
      workspace.onDidOpenTextDocument(this.onDocumentOpened.bind(this)),
      workspace.onDidSaveTextDocument(this.onDocumentSaved.bind(this)),
      workspace.onDidChangeConfiguration(this.onConfigurationChanged.bind(this))
    );
  }
  
  private onDocumentOpened(document: TextDocument): void {
    // 处理文档打开事件
  }
  
  private onDocumentSaved(document: TextDocument): void {
    // 处理文档保存事件
  }
  
  private onConfigurationChanged(event: ConfigurationChangeEvent): void {
    if (event.affectsConfiguration('myPlugin')) {
      this.configManager.reload();
    }
  }
}

// 插件入口点
export function activate(context: ExtensionContext): Promise<void> {
  const plugin = new MyPlugin(context);
  return plugin.activate();
}

export function deactivate(): Promise<void> {
  // 清理逻辑在 MyPlugin.deactivate() 中处理
  return Promise.resolve();
}
```

### 错误处理

```typescript
// 错误处理工具
export class ErrorHandler {
  private static outputChannel: OutputChannel;
  
  static initialize(): void {
    this.outputChannel = window.createOutputChannel('My Plugin');
  }
  
  static handleError(error: Error, context?: string): void {
    const message = context ? `${context}: ${error.message}` : error.message;
    
    // 记录到输出通道
    this.outputChannel.appendLine(`[ERROR] ${new Date().toISOString()} - ${message}`);
    this.outputChannel.appendLine(error.stack || '');
    
    // 显示用户友好的错误消息
    window.showErrorMessage(`My Plugin Error: ${message}`);
    
    // 发送遥测数据（如果启用）
    this.sendTelemetry(error, context);
  }
  
  static handleWarning(message: string, context?: string): void {
    const fullMessage = context ? `${context}: ${message}` : message;
    
    this.outputChannel.appendLine(`[WARN] ${new Date().toISOString()} - ${fullMessage}`);
    window.showWarningMessage(`My Plugin Warning: ${message}`);
  }
  
  static logInfo(message: string, context?: string): void {
    const fullMessage = context ? `${context}: ${message}` : message;
    this.outputChannel.appendLine(`[INFO] ${new Date().toISOString()} - ${fullMessage}`);
  }
  
  private static sendTelemetry(error: Error, context?: string): void {
    // 发送匿名错误报告（需要用户同意）
  }
}

// 异步操作包装器
export async function safeExecute<T>(
  operation: () => Promise<T>,
  context: string,
  fallback?: T
): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    ErrorHandler.handleError(error as Error, context);
    return fallback;
  }
}
```

### 性能优化

```typescript
// 性能监控
export class PerformanceMonitor {
  private static timers: Map<string, number> = new Map();
  
  static startTimer(name: string): void {
    this.timers.set(name, Date.now());
  }
  
  static endTimer(name: string): number {
    const startTime = this.timers.get(name);
    if (!startTime) {
      return 0;
    }
    
    const duration = Date.now() - startTime;
    this.timers.delete(name);
    
    console.log(`[PERF] ${name}: ${duration}ms`);
    return duration;
  }
  
  static async measureAsync<T>(
    name: string,
    operation: () => Promise<T>
  ): Promise<T> {
    this.startTimer(name);
    try {
      const result = await operation();
      this.endTimer(name);
      return result;
    } catch (error) {
      this.endTimer(name);
      throw error;
    }
  }
}

// 缓存管理
export class CacheManager<T> {
  private cache: Map<string, { value: T; timestamp: number }> = new Map();
  private ttl: number;
  
  constructor(ttlMs: number = 300000) { // 5分钟默认TTL
    this.ttl = ttlMs;
  }
  
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }
    
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }
    
    return entry.value;
  }
  
  set(key: string, value: T): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}
```

## 总结

Claude Code 插件 API 提供了丰富的扩展能力，通过合理使用这些 API，开发者可以：

1. **扩展功能**: 为 Claude Code 添加自定义功能
2. **集成服务**: 连接外部服务和工具
3. **优化体验**: 提供更好的用户体验
4. **自动化流程**: 自动化重复性任务
5. **团队协作**: 支持团队开发流程

开发插件时的关键要点：
- 遵循插件架构最佳实践
- 实现完善的错误处理
- 注意性能优化和资源管理
- 提供良好的用户体验
- 编写全面的测试用例
- 维护清晰的文档

通过掌握这些 API 和最佳实践，开发者可以创建高质量的 Claude Code 插件，为整个开发社区贡献价值。