export type Registry = 'nuget' | 'npm' | 'docker' | 'helm' | 'pypi' | 'krew' | 'brew' | 'claude'

export const registries: Record<Registry, string> = {
  nuget: 'NuGet',
  npm: 'npm',
  docker: 'Docker',
  helm: 'Helm',
  pypi: 'PyPI',
  krew: 'Krew',
  brew: 'Homebrew',
  claude: 'Claude Code',
}

export type GroupId = 'flagship' | 'libraries' | 'clients' | 'tooling'

export const GROUPS: { id: GroupId; label: string }[] = [
  { id: 'flagship', label: 'Flagship' },
  { id: 'libraries', label: 'Libraries' },
  { id: 'clients', label: 'API clients' },
  { id: 'tooling', label: 'Tooling' },
]

export interface Install {
  registry: Registry
  command: string
  // The package's page on its registry.
  url: string
}

export interface Project {
  name: string
  repo: string
  githubUrl: string
  docsUrl?: string
  group: GroupId
  language: string
  description: string
  tags: string[]
  installs: Install[]
}

const brewTap = 'https://github.com/jzills/homebrew-tap'

type Entry = Omit<Project, 'githubUrl'>
const entries: Entry[] = [
  {
    name: 'hmac-manager',
    repo: 'hmac-manager',
    docsUrl: 'https://jzills.github.io/hmac-manager/',
    group: 'flagship',
    language: 'C#',
    description: 'HMAC request authentication for ASP.NET Core: middleware, handlers and validation, extended to Kubernetes with an Istio external authorizer.',
    tags: ['.NET', 'Security', 'Istio'],
    installs: [
      { registry: 'nuget', command: 'dotnet add package HmacManager', url: 'https://www.nuget.org/packages/HmacManager/' },
      { registry: 'npm', command: 'npm install hmac-manager', url: 'https://www.npmjs.com/package/hmac-manager' },
      { registry: 'docker', command: 'docker pull zills/hmac-manager', url: 'https://hub.docker.com/r/zills/hmac-manager' },
      {
        registry: 'helm',
        command: 'helm repo add zills https://jzills.github.io/hmac-manager\nhelm install hmac-manager zills/hmac-manager',
        url: 'https://artifacthub.io/packages/helm/zills/hmac-manager',
      },
    ],
  },
  {
    name: 'kx',
    repo: 'kx',
    docsUrl: 'https://jzills.github.io/kx/',
    group: 'flagship',
    language: 'Go',
    description: 'A kubectl companion with index-based resource selection: pick pods and resources by number instead of copying names.',
    tags: ['Kubernetes', 'CLI'],
    installs: [
      { registry: 'brew', command: 'brew install jzills/tap/kx', url: brewTap },
      { registry: 'pypi', command: 'pip install kx-cli', url: 'https://pypi.org/project/kx-cli/' },
      { registry: 'krew', command: 'kubectl krew install idx', url: 'https://krew.sigs.k8s.io/plugins/' },
    ],
  },
  {
    name: 'action-cache',
    repo: 'action-cache',
    docsUrl: 'https://jzills.github.io/action-cache/',
    group: 'flagship',
    language: 'C#',
    description: 'Namespaced response caching for ASP.NET Core, on Memory, Redis, SQL Server or Cosmos DB, with targeted invalidation.',
    tags: ['.NET', 'Caching'],
    installs: [{ registry: 'nuget', command: 'dotnet add package ActionCache', url: 'https://www.nuget.org/packages/ActionCache/' }],
  },
  {
    name: 'snoop',
    repo: 'snoop',
    docsUrl: 'https://jzills.github.io/snoop/',
    group: 'flagship',
    language: 'Go',
    description: 'Watch AI agent sessions live or inspect past ones: costs, file changes and time spent, read locally from existing transcripts.',
    tags: ['AI agents', 'CLI'],
    installs: [{ registry: 'brew', command: 'brew install jzills/tap/snoop', url: brewTap }],
  },
  {
    name: 'serilog-sinks-signalr',
    repo: 'serilog-sinks-aspnetcore-app-signalr',
    group: 'libraries',
    language: 'C#',
    description: 'A Serilog sink that streams structured log events to SignalR hubs in real time.',
    tags: ['.NET', 'Logging'],
    installs: [
      {
        registry: 'nuget',
        command: 'dotnet add package Serilog.Sinks.AspNetCore.App.SignalR',
        url: 'https://www.nuget.org/packages/Serilog.Sinks.AspNetCore.App.SignalR/',
      },
    ],
  },
  {
    name: 'swagger-ui-authorization',
    repo: 'swagger-ui-authorization',
    group: 'libraries',
    language: 'C#',
    description: 'Restricts Swagger UI to authenticated users in ASP.NET Core.',
    tags: ['.NET', 'Auth'],
    installs: [{ registry: 'nuget', command: 'dotnet add package SwaggerUIAuthorization', url: 'https://www.nuget.org/packages/SwaggerUIAuthorization/' }],
  },
  {
    name: 'freesound-api',
    repo: 'freesound-api',
    group: 'clients',
    language: 'TypeScript',
    description: 'A typed client for the Freesound sound library API.',
    tags: ['Audio'],
    installs: [{ registry: 'npm', command: 'npm install freesound-api', url: 'https://www.npmjs.com/package/freesound-api' }],
  },
  {
    name: 'bbc-sound-fx-api',
    repo: 'bbc-sound-fx-api',
    group: 'clients',
    language: 'TypeScript',
    description: 'A typed client for the BBC Sound Effects archive.',
    tags: ['Audio'],
    installs: [{ registry: 'npm', command: 'npm install bbc-sound-fx-api', url: 'https://www.npmjs.com/package/bbc-sound-fx-api' }],
  },
  {
    name: 'xeno-canto-api',
    repo: 'xeno-canto-api',
    group: 'clients',
    language: 'TypeScript',
    description: 'A typed client for the xeno-canto bird sound API (v3).',
    tags: ['Audio'],
    installs: [{ registry: 'npm', command: 'npm install xeno-canto-api', url: 'https://www.npmjs.com/package/xeno-canto-api' }],
  },
  {
    name: 'internet-archive-api',
    repo: 'internet-archive-api',
    group: 'clients',
    language: 'TypeScript',
    description: 'Search and download from the Internet Archive.',
    tags: ['Archives'],
    installs: [{ registry: 'npm', command: 'npm install internet-archive-api', url: 'https://www.npmjs.com/package/internet-archive-api' }],
  },
  {
    name: 'claude-marketplace',
    repo: 'claude-marketplace',
    group: 'tooling',
    language: 'Python',
    description: 'A Claude Code plugin marketplace: skills for git workflows, code quality and DevOps.',
    tags: ['AI agents'],
    installs: [
      { registry: 'claude', command: '/plugin marketplace add jzills/claude-marketplace', url: 'https://github.com/jzills/claude-marketplace' },
    ],
  },
]

export const projects: Project[] = entries.map((e) => ({ ...e, githubUrl: `https://github.com/jzills/${e.repo}` }))

export const projectsIn = (group: GroupId) => projects.filter((p) => p.group === group)
