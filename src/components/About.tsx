import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ExternalLink } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolio';

const About = () => {
  const { language } = useLanguage();
  const data = portfolioData[language].about;

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {data.bio}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Testimonial */}
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border-l-4 border-blue-600"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-start gap-3">
                  <Quote className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 italic mb-2 text-sm">
                      "{data.testimonial.text}"
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      – {data.testimonial.author}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Fiverr Profile */}
              <motion.div
                className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border-l-4 border-green-600"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {data.fiverr.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                  {data.fiverr.description}
                </p>
                <motion.a
                  href={data.fiverr.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={16} />
                  View Profile
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;