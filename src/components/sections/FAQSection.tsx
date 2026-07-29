import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQSchema } from '../common/SchemaMarkup';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  darkMode?: boolean;
  showSchema?: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know',
  darkMode = false,
  showSchema = true,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const bgClass = darkMode ? 'bg-navy' : 'bg-pearl';
  const textClass = darkMode ? 'text-pearl' : 'text-navy';
  const subTextClass = darkMode ? 'text-pearl/60' : 'text-navy-500/60';
  const borderClass = darkMode ? 'border-white/10' : 'border-navy/10';
  const hoverBgClass = darkMode ? 'hover:bg-white/5' : 'hover:bg-navy/[0.02]';

  return (
    <section className={`py-24 ${bgClass}`} aria-label="Frequently Asked Questions">
      {showSchema && <FAQSchema faqs={faqs} />}

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">{subtitle}</span>
            <div className="w-8 h-[1px] bg-gold" />
          </div>
          <h2 className={`font-display text-heading-xl ${textClass}`}>{title}</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className={`border ${borderClass} rounded-sm overflow-hidden`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-6 flex items-center justify-between gap-4 ${hoverBgClass} transition-colors duration-300`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className={`font-display text-body-md ${textClass} pr-4`}>
                  {faq.question}
                </h3>
                <span className={`text-gold text-xl flex-shrink-0 transform transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <p className={`px-6 pb-6 font-body text-body-sm ${subTextClass} leading-relaxed`}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
