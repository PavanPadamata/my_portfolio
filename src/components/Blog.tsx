import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, FileText, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLanguage } from '../hooks/useLanguage';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  featured?: boolean;
}

const Blog = () => {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample blog posts with proper markdown content
  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'Setting up CI/CD Pipeline with GitHub Actions',
      excerpt: 'Learn how to automate your deployment process using GitHub Actions for seamless continuous integration and deployment.',
      date: '2024-01-15',
      readTime: '8 min read',
      slug: 'github-actions-cicd',
      author: 'Pavan Padamata',
      tags: ['CI/CD', 'GitHub Actions', 'DevOps', 'Automation'],
      featured: true,
      content: `# Setting up CI/CD Pipeline with GitHub Actions

GitHub Actions is a powerful automation platform that allows you to build, test, and deploy your code right from GitHub. In this comprehensive guide, we'll walk through setting up a complete CI/CD pipeline.

## Why GitHub Actions?

GitHub Actions provides several advantages:
- **Native Integration**: Built directly into GitHub
- **Free Tier**: Generous free minutes for public repositories
- **Marketplace**: Thousands of pre-built actions
- **Flexibility**: Support for any language and framework

## Getting Started

First, create a \`.github/workflows\` directory in your repository. This is where all your workflow files will live.

### Basic Workflow Structure

\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
\`\`\`

## Advanced Configuration

For production deployments, you'll want to add more sophisticated steps:

### Multi-Environment Deployment

\`\`\`yaml
deploy:
  needs: test
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'
  steps:
  - name: Deploy to staging
    run: |
      echo "Deploying to staging environment"
      # Your deployment commands here
  
  - name: Run integration tests
    run: npm run test:integration
  
  - name: Deploy to production
    if: success()
    run: |
      echo "Deploying to production"
      # Production deployment commands
\`\`\`

## Security Best Practices

1. **Use Secrets**: Never hardcode sensitive information
2. **Limit Permissions**: Use \`permissions\` to restrict what actions can do
3. **Pin Action Versions**: Always use specific versions of actions

### Example with Security

\`\`\`yaml
permissions:
  contents: read
  deployments: write

steps:
- name: Deploy with secrets
  env:
    API_KEY: \${{ secrets.API_KEY }}
    DATABASE_URL: \${{ secrets.DATABASE_URL }}
  run: |
    echo "Deploying with secure credentials"
\`\`\`

## Monitoring and Notifications

Set up notifications for failed builds:

\`\`\`yaml
- name: Notify on failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    webhook_url: \${{ secrets.SLACK_WEBHOOK }}
\`\`\`

## Conclusion

GitHub Actions provides a robust platform for automating your development workflow. Start simple and gradually add more sophisticated features as your needs grow.

**Key Takeaways:**
- Start with basic CI/CD workflows
- Use marketplace actions to save time
- Implement proper security practices
- Monitor and iterate on your pipelines

Happy automating! 🚀`
    },
    {
      id: '2',
      title: 'Docker Best Practices for Production',
      excerpt: 'Essential Docker practices to optimize your containers for production environments, security, and performance.',
      date: '2024-01-10',
      readTime: '12 min read',
      slug: 'docker-production-best-practices',
      author: 'Pavan Padamata',
      tags: ['Docker', 'Containers', 'Production', 'Security'],
      content: `# Docker Best Practices for Production

Running Docker in production requires careful consideration of security, performance, and maintainability. This guide covers essential practices for production-ready containers.

## Image Optimization

### Multi-stage Builds

Use multi-stage builds to reduce image size and improve security:

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
USER node
CMD ["npm", "start"]
\`\`\`

### Base Image Selection

Choose minimal base images:

\`\`\`dockerfile
# ❌ Avoid full OS images
FROM ubuntu:latest

# ✅ Use minimal images
FROM node:18-alpine
FROM python:3.11-slim
FROM scratch  # For static binaries
\`\`\`

## Security Hardening

### Non-Root User

Never run containers as root:

\`\`\`dockerfile
# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Switch to non-root user
USER nextjs
\`\`\`

### Vulnerability Scanning

Regularly scan images for vulnerabilities:

\`\`\`bash
# Using Docker Scout
docker scout cves my-app:latest

# Using Trivy
trivy image my-app:latest
\`\`\`

## Resource Management

### Memory and CPU Limits

Always set resource limits:

\`\`\`yaml
# docker-compose.yml
services:
  app:
    image: my-app:latest
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
\`\`\`

### Health Checks

Implement proper health checks:

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## Logging and Monitoring

### Structured Logging

Use structured logging for better observability:

\`\`\`javascript
// Instead of console.log
console.log('User logged in');

// Use structured logging
console.log(JSON.stringify({
  level: 'info',
  message: 'User logged in',
  userId: user.id,
  timestamp: new Date().toISOString()
}));
\`\`\`

### Log Drivers

Configure appropriate log drivers:

\`\`\`yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
\`\`\`

## Environment Configuration

### Secrets Management

Never bake secrets into images:

\`\`\`dockerfile
# ❌ Don't do this
ENV API_KEY=secret123

# ✅ Use runtime secrets
ENV API_KEY_FILE=/run/secrets/api_key
\`\`\`

### Configuration Files

Use external configuration:

\`\`\`yaml
services:
  app:
    configs:
      - source: app_config
        target: /app/config.yml
    secrets:
      - api_key
      - db_password
\`\`\`

## Performance Optimization

### Layer Caching

Optimize layer caching:

\`\`\`dockerfile
# ✅ Copy package files first
COPY package*.json ./
RUN npm ci

# Then copy source code
COPY . .
\`\`\`

### .dockerignore

Use .dockerignore to reduce build context:

\`\`\`
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
coverage
.nyc_output
\`\`\`

## Deployment Strategies

### Rolling Updates

Implement zero-downtime deployments:

\`\`\`yaml
services:
  app:
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        failure_action: rollback
        order: start-first
\`\`\`

## Monitoring and Observability

### Metrics Collection

Expose application metrics:

\`\`\`javascript
const prometheus = require('prom-client');

// Create metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
});
\`\`\`

## Conclusion

Production Docker deployments require attention to:
- **Security**: Non-root users, vulnerability scanning
- **Performance**: Resource limits, layer optimization
- **Reliability**: Health checks, proper logging
- **Maintainability**: Clean images, external configuration

Following these practices will help you run robust, secure, and scalable containerized applications in production.

Remember: *"Containers are not VMs"* - design your applications with the container paradigm in mind! 🐳`
    },
    {
      id: '3',
      title: 'Kubernetes Deployment Strategies Explained',
      excerpt: 'Explore different deployment strategies in Kubernetes including rolling updates, blue-green, and canary deployments with practical examples.',
      date: '2024-01-05',
      readTime: '15 min read',
      slug: 'kubernetes-deployment-strategies',
      author: 'Pavan Padamata',
      tags: ['Kubernetes', 'Deployment', 'DevOps', 'Orchestration'],
      content: `# Kubernetes Deployment Strategies Explained

Kubernetes offers several deployment strategies to update your applications safely and efficiently. Each strategy has its own use cases, benefits, and trade-offs.

## Overview of Deployment Strategies

1. **Rolling Update** - Default strategy, gradual replacement
2. **Blue-Green** - Two identical environments, instant switch
3. **Canary** - Gradual traffic shifting to new version
4. **A/B Testing** - Feature-based traffic routing
5. **Shadow** - Mirror traffic to new version

## Rolling Updates

The default Kubernetes deployment strategy that gradually replaces old pods with new ones.

### Configuration

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 6
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1      # Max pods that can be unavailable
      maxSurge: 1           # Max pods above desired replica count
  template:
    spec:
      containers:
      - name: app
        image: my-app:v2.0
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
\`\`\`

### Advantages
- ✅ Zero downtime deployment
- ✅ Automatic rollback on failure
- ✅ Resource efficient
- ✅ Built-in Kubernetes feature

### Disadvantages
- ❌ Gradual rollout (not instant)
- ❌ Mixed versions during deployment
- ❌ Potential compatibility issues

## Blue-Green Deployment

Maintain two identical production environments and switch traffic instantly.

### Implementation

\`\`\`yaml
# Blue deployment (current)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-blue
  labels:
    version: blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: blue
  template:
    metadata:
      labels:
        app: my-app
        version: blue
    spec:
      containers:
      - name: app
        image: my-app:v1.0

---
# Green deployment (new)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-green
  labels:
    version: green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: green
  template:
    metadata:
      labels:
        app: my-app
        version: green
    spec:
      containers:
      - name: app
        image: my-app:v2.0

---
# Service switches between blue and green
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
    version: blue  # Switch to 'green' when ready
  ports:
  - port: 80
    targetPort: 8080
\`\`\`

### Switching Traffic

\`\`\`bash
# Test green deployment
kubectl port-forward deployment/my-app-green 8080:8080

# Switch traffic to green
kubectl patch service my-app-service -p '{"spec":{"selector":{"version":"green"}}}'

# Rollback if needed
kubectl patch service my-app-service -p '{"spec":{"selector":{"version":"blue"}}}'
\`\`\`

## Canary Deployment

Gradually shift traffic from old version to new version.

### Using Ingress Controller

\`\`\`yaml
# Stable version (90% traffic)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-stable
  annotations:
    nginx.ingress.kubernetes.io/canary: "false"
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-app-stable
            port:
              number: 80

---
# Canary version (10% traffic)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-canary
  annotations:
    nginx.ingress.kubernetes.io/canary: "true"
    nginx.ingress.kubernetes.io/canary-weight: "10"
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-app-canary
            port:
              number: 80
\`\`\`

### Gradual Traffic Increase

\`\`\`bash
# Increase canary traffic gradually
kubectl patch ingress my-app-canary -p '{"metadata":{"annotations":{"nginx.ingress.kubernetes.io/canary-weight":"25"}}}'

# Monitor metrics and errors
kubectl logs -f deployment/my-app-canary

# Full rollout
kubectl patch ingress my-app-canary -p '{"metadata":{"annotations":{"nginx.ingress.kubernetes.io/canary-weight":"100"}}}'
\`\`\`

## Advanced Deployment with Argo Rollouts

For more sophisticated deployment strategies, use Argo Rollouts:

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: my-app-rollout
spec:
  replicas: 5
  strategy:
    canary:
      steps:
      - setWeight: 20
      - pause: {}
      - setWeight: 40
      - pause: {duration: 10s}
      - setWeight: 60
      - pause: {duration: 10s}
      - setWeight: 80
      - pause: {duration: 10s}
      canaryService: my-app-canary
      stableService: my-app-stable
      trafficRouting:
        nginx:
          stableIngress: my-app-stable
          annotationPrefix: nginx.ingress.kubernetes.io
          additionalIngressAnnotations:
            canary-by-header: X-Canary
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:v2.0
\`\`\`

## Monitoring and Observability

### Key Metrics to Monitor

\`\`\`yaml
# ServiceMonitor for Prometheus
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: my-app-metrics
spec:
  selector:
    matchLabels:
      app: my-app
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics
\`\`\`

### Health Checks

\`\`\`yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  failureThreshold: 3
\`\`\`

## Best Practices

### 1. Always Use Health Checks
Ensure your applications expose proper health endpoints.

### 2. Monitor Key Metrics
- Error rates
- Response times
- Resource utilization
- Business metrics

### 3. Automate Rollbacks
Set up automatic rollback triggers based on metrics.

### 4. Test in Staging
Always test deployment strategies in staging first.

### 5. Gradual Rollouts
Start with small percentages and increase gradually.

## Choosing the Right Strategy

| Strategy | Use Case | Complexity | Risk |
|----------|----------|------------|------|
| Rolling Update | Standard deployments | Low | Low |
| Blue-Green | Critical applications | Medium | Medium |
| Canary | Risk-averse deployments | High | Low |
| A/B Testing | Feature validation | High | Low |

## Conclusion

Kubernetes deployment strategies provide powerful tools for safe, reliable application updates. Choose the strategy that best fits your:

- **Risk tolerance**
- **Resource constraints** 
- **Operational complexity**
- **Business requirements**

Start with rolling updates and evolve to more sophisticated strategies as your needs grow.

Remember: *"The best deployment strategy is the one your team can execute reliably!"* ⚡`
    }
  ];

  useEffect(() => {
    // Simulate loading blog posts
    setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    // Scroll to top when opening a post
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePost = () => {
    setSelectedPost(null);
    // Scroll to blog section when closing
    document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Custom components for ReactMarkdown
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-lg"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-6 text-gray-700 dark:text-gray-300 space-y-2">
        {children}
      </ol>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
        <div className="text-gray-700 dark:text-gray-300 italic">
          {children}
        </div>
      </blockquote>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: any) => (
      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-white">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
        {children}
      </td>
    ),
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Blog Post Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.button
              onClick={closePost}
              className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft size={20} />
              Back to Blog
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {selectedPost.title}
              </h1>
              
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  {selectedPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {formatDate(selectedPost.date)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  {selectedPost.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Blog Post Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.article
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ReactMarkdown components={components}>
              {selectedPost.content}
            </ReactMarkdown>
          </motion.article>

          {/* Author Bio */}
          <motion.div
            className="mt-16 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-4">
              <img
                src="https://github.com/PavanPadamata.png"
                alt="Pavan Padamata"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  About the Author
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Pavan Padamata is a DevOps Engineer passionate about automation, scalable infrastructure, 
                  and open-source tooling. He helps startups and individuals design and deploy CI/CD pipelines, 
                  cloud environments, and self-hosted systems.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Latest Blog Posts' : 'Últimas Publicaciones'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {language === 'en' 
              ? 'Insights, tutorials, and thoughts on DevOps and technology'
              : 'Perspectivas, tutoriales y pensamientos sobre DevOps y tecnología'
            }
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="flex gap-4">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FileText className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'en' ? 'No blog posts yet' : 'Aún no hay publicaciones'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'en' 
                ? 'Blog posts will appear here once they are published.'
                : 'Las publicaciones del blog aparecerán aquí una vez que se publiquen.'
              }
            </p>
          </motion.div>
        ) : (
          <>
            {/* Featured Post */}
            {posts.find(post => post.featured) && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {(() => {
                  const featuredPost = posts.find(post => post.featured)!;
                  return (
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white cursor-pointer hover:shadow-2xl transition-all duration-300"
                      onClick={() => openPost(featuredPost)}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Tag size={16} />
                        <span className="text-sm font-medium">Featured Post</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                      <p className="text-xl text-white/90 mb-6">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-6 text-white/80">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {formatDate(featuredPost.date)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          {featuredPost.readTime}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Regular Posts Grid */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
            >
              {posts.filter(post => !post.featured).map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => openPost(post)}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(post.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;