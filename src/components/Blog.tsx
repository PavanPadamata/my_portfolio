import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, FileText } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  content?: string;
}

const Blog = () => {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample blog posts - you can replace this with actual markdown file loading
  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'Setting up CI/CD Pipeline with GitHub Actions',
      excerpt: 'Learn how to automate your deployment process using GitHub Actions for seamless continuous integration and deployment.',
      date: '2024-01-15',
      readTime: '5 min read',
      slug: 'github-actions-cicd',
      content: `# Setting up CI/CD Pipeline with GitHub Actions

GitHub Actions is a powerful automation platform that allows you to build, test, and deploy your code right from GitHub.

## Getting Started

First, create a \`.github/workflows\` directory in your repository...

## Basic Workflow

\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
\`\`\`

This is just the beginning of your automation journey!`
    },
    {
      id: '2',
      title: 'Docker Best Practices for Production',
      excerpt: 'Essential Docker practices to optimize your containers for production environments, security, and performance.',
      date: '2024-01-10',
      readTime: '8 min read',
      slug: 'docker-production-best-practices',
      content: `# Docker Best Practices for Production

Running Docker in production requires careful consideration of security, performance, and maintainability.

## Multi-stage Builds

Use multi-stage builds to reduce image size:

\`\`\`dockerfile
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## Security Considerations

- Never run containers as root
- Use specific image tags, not \`latest\`
- Scan images for vulnerabilities
- Limit container resources`
    },
    {
      id: '3',
      title: 'Kubernetes Deployment Strategies',
      excerpt: 'Explore different deployment strategies in Kubernetes including rolling updates, blue-green, and canary deployments.',
      date: '2024-01-05',
      readTime: '10 min read',
      slug: 'kubernetes-deployment-strategies',
      content: `# Kubernetes Deployment Strategies

Kubernetes offers several deployment strategies to update your applications safely and efficiently.

## Rolling Updates

The default strategy that gradually replaces old pods with new ones:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
\`\`\`

## Blue-Green Deployment

Maintain two identical production environments...`
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
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <section id="blog" className="py-20 bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            onClick={closePost}
            className="mb-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
          >
            <ArrowRight className="rotate-180" size={20} />
            Back to Blog
          </motion.button>

          <motion.article
            className="prose prose-lg dark:prose-invert max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {formatDate(selectedPost.date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {selectedPost.readTime}
                </div>
              </div>
            </header>
            
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: selectedPost.content?.replace(/\n/g, '<br>') || '' 
              }}
            />
          </motion.article>
        </div>
      </section>
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
            {language === 'en' ? 'Blog' : 'Blog'}
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
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => openPost(post)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
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
                    <ArrowRight size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;