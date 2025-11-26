import { motion } from 'framer-motion';
import { MessageSquare, Zap, Users, BarChart3, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Smart Conversations',
    description: 'AI understands context and responds naturally to customer queries.',
  },
  {
    icon: Zap,
    title: 'Instant Automation',
    description: 'Set up powerful workflows in minutes, not hours.',
  },
  {
    icon: Users,
    title: 'Customer Insights',
    description: 'Track engagement and understand your customers deeply.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time metrics that matter for your business.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Never miss a customer, even while you sleep.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption keeps your data safe.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Features() {
  return (
    <section id="features" className="py-apple-lg bg-apple-white apple-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-display font-semibold text-apple-grey-dark mb-6">
            Made for business.
            <br />
            Built with intelligence.
          </h2>
          <p className="text-xl text-apple-grey-dark/60 max-w-2xl mx-auto">
            Everything you need to transform your WhatsApp into a powerful business tool.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-apple-white p-8 lg:p-10 rounded-2xl apple-border hover:apple-shadow-lg transition-all duration-500"
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-2xl bg-apple-grey flex items-center justify-center mb-6 group-hover:bg-apple-blue transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon
                  className="text-apple-grey-dark group-hover:text-apple-white transition-colors duration-300"
                  size={28}
                  strokeWidth={1.5}
                />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-semibold text-apple-grey-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-apple-grey-dark/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-apple-blue origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
