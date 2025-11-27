import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const flows = [
  {
    step: '01',
    title: 'Customer Inquiry',
    description: 'AI detects incoming messages and understands intent',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    step: '02',
    title: 'Smart Processing',
    description: 'Context analysis and knowledge base matching',
    color: 'from-purple-500 to-pink-500',
  },
  {
    step: '03',
    title: 'Instant Response',
    description: 'Natural language reply with personalized touch',
    color: 'from-orange-500 to-red-500',
  },
  {
    step: '04',
    title: 'Action & Follow-up',
    description: 'Automated workflows and scheduled reminders',
    color: 'from-green-500 to-emerald-500',
  },
];

export default function AutomationFlow() {
  return (
    <section id="automation" className="py-apple-lg bg-apple-grey-dark apple-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-display font-semibold text-apple-white mb-6">
            Automation that feels natural.
          </h2>
          <p className="text-xl text-apple-white/60 max-w-2xl mx-auto">
            Four simple steps. Infinite possibilities.
          </p>
        </motion.div>

        {/* Flow visualization */}
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-apple-white/20 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {flows.map((flow, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Card */}
                <motion.div
                  className="relative bg-apple-white/5 backdrop-blur p-8 rounded-3xl border border-apple-white/10 hover:bg-apple-white/10 transition-all duration-500 group"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step number with gradient */}
                  <div className="mb-6">
                    <div
                      className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${flow.color} text-apple-white font-bold text-sm`}
                    >
                      {flow.step}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-apple-white mb-4">
                    {flow.title}
                  </h3>

                  {/* Description */}
                  <p className="text-apple-white/60 leading-relaxed">{flow.description}</p>

                  {/* Hover arrow */}
                  <motion.div
                    className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <ArrowRight className="text-apple-white" size={20} />
                  </motion.div>

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${flow.color} opacity-0 group-hover:opacity-10 transition-opacity blur-xl -z-10`}
                  />
                </motion.div>

                {/* Arrow connector (desktop) */}
                {index < flows.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-apple-white/20 flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <ArrowRight className="text-apple-white/60" size={14} />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="px-8 py-4 bg-apple-white text-apple-grey-dark font-medium rounded-full hover:bg-apple-grey transition-all apple-shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Build Your Workflow
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
