import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolio';

const Contact = () => {
  const { language } = useLanguage();
  const data = portfolioData[language].contact;

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: data.email,
      href: `mailto:${data.email}`,
      color: 'text-red-600'
    },
    {
      icon: Send,
      label: 'Telegram',
      value: data.telegram,
      href: `https://t.me/pavanpadamata`,
      color: 'text-blue-500'
    },
    {
      icon: FaXTwitter,
      label: 'Twitter',
      value: data.twitter,
      href: `https://x.com/pavanpadamata1`,
      color: 'text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`inline-flex p-3 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 ${method.color}`}>
                  <IconComponent size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {method.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {method.value}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href={`mailto:${data.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
            Send Email
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;