import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolio';

const Footer = () => {
  const { language } = useLanguage();
  const data = portfolioData[language].footer;

  const socialLinks = [
    { icon: Github, href: 'https://github.com/pavanpadamata', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/pavanpadamata', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/pavanpadamata', label: 'Twitter' },
    { icon: Mail, href: 'mailto:pavanpadmata2002@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  <IconComponent size={20} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Agency Credit */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-400 mb-2">
              {data.builtWith}{' '}
              <motion.a
                href="https://tryselfhost.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                {data.agency}
                <ExternalLink size={14} />
              </motion.a>
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center border-t border-gray-800 pt-8 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-500 text-sm">
              {data.rights}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;