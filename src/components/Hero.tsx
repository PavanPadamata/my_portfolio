import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolio';

const Hero = () => {
  const { language } = useLanguage();
  const data = portfolioData[language].hero;

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        {/* Hero Content */}
        <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {data.name}
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 font-semibold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.title}
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {data.tagline}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {data.cta}
            </motion.button>
            
            <motion.button
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'https://github.com/PavanPadamata/my_portfolio/raw/main/Pavan_Padamata_Resume.pdf';
                link.download = 'Pavan_Padamata_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download size={20} />
              Resume
            </motion.button>
          </motion.div>
        </motion.div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Technologies I Work With
            </h3>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-lg">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {/* DevOps Tools */}
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Docker</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Kubernetes</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" alt="Terraform" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Terraform</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">AWS</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" alt="GCP" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">GCP</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub Actions" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">GitHub</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" alt="GitLab CI" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">GitLab</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Jenkins</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Python</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Bash" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Bash</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="NGINX" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">NGINX</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg" alt="Ubuntu" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Ubuntu</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Linux</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Git</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg" alt="Cloudflare" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">Cloudflare</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:scale-105 transition-transform">
                <img src="https://www.svgrepo.com/show/354202/postman-icon.svg" alt="API Testing" className="w-8 h-8 mb-2" />
                <span className="text-xs text-gray-700 dark:text-gray-200 text-center">APIs</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 dark:text-gray-400"
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
};

export default Hero;