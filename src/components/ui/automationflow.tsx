import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  MessageSquare,
  Zap,
  Database,
  Mail,
  Phone,
  CheckCircle2,
  X,
  Settings,
  Plus,
  GitBranch
} from 'lucide-react';

// Cinematic text reveal component
const CinematicTextReveal: React.FC<{ children: string; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsVisible(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-2xl font-semibold text-apple-white mb-4 relative"
        initial={{ opacity: 0.3, filter: 'blur(1px)' }}
        animate={isVisible ? {
          opacity: 1,
          filter: 'blur(0px)'
        } : {
          opacity: 0.3,
          filter: 'blur(1px)'
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {children}
      </motion.h3>
      {/* Animated line underneath */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-apple-white to-transparent"
        initial={{ width: 0 }}
        animate={isVisible ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

const flowNodes = [
  {
    id: 'trigger',
    type: 'trigger',
    title: 'Message Received',
    description: 'Customer sends WhatsApp message',
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-500',
    position: { x: 0, y: 0 },
  },
  {
    id: 'condition',
    type: 'condition',
    title: 'Check Intent',
    description: 'AI analyzes message content',
    icon: Bot,
    color: 'from-purple-500 to-pink-500',
    position: { x: 300, y: 0 },
    branches: ['product_inquiry', 'support_request', 'general'],
  },
  {
    id: 'product_inquiry',
    type: 'action',
    title: 'Product Menu',
    description: 'Show product catalog with buttons',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    position: { x: 600, y: -100 },
    buttons: ['View Products', 'Get Pricing', 'Schedule Demo'],
  },
  {
    id: 'support_request',
    type: 'action',
    title: 'Support Flow',
    description: 'Route to support team',
    icon: Phone,
    color: 'from-orange-500 to-red-500',
    position: { x: 600, y: 0 },
    integrations: ['CRM', 'Helpdesk'],
  },
  {
    id: 'general',
    type: 'action',
    title: 'General Response',
    description: 'Send automated reply',
    icon: Mail,
    color: 'from-indigo-500 to-purple-500',
    position: { x: 600, y: 100 },
  },
  {
    id: 'follow_up',
    type: 'action',
    title: 'Follow Up',
    description: 'Schedule reminder or survey',
    icon: CheckCircle2,
    color: 'from-teal-500 to-cyan-500',
    position: { x: 900, y: 0 },
  },
];

const connections = [
  { from: 'trigger', to: 'condition' },
  { from: 'condition', to: 'product_inquiry', condition: 'Product Inquiry' },
  { from: 'condition', to: 'support_request', condition: 'Support Request' },
  { from: 'condition', to: 'general', condition: 'General Message' },
  { from: 'product_inquiry', to: 'follow_up' },
  { from: 'support_request', to: 'follow_up' },
  { from: 'general', to: 'follow_up' },
];

export default function AutomationFlow() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);

  return (
    <section id="automation" className="py-apple-lg bg-black apple-section relative overflow-hidden">
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
            Conditional Automation Flows
          </h2>
          <p className="text-xl text-apple-white/60 max-w-2xl mx-auto">
            Create intelligent, branching workflows with buttons, menus, and integrations
          </p>
        </motion.div>

        {/* Interactive Flow Visualization */}
        <div className="relative min-h-[600px] flex items-center justify-center">
          {/* SVG Canvas for Connections */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid meet"
          >
            {connections.map((conn, index) => {
              const fromNode = flowNodes.find(n => n.id === conn.from);
              const toNode = flowNodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const fromX = fromNode.position.x + 150; // Center of node
              const fromY = fromNode.position.y + 200; // Center vertically
              const toX = toNode.position.x + 150;
              const toY = toNode.position.y + 200;

              // Create curved path for branches
              const midX = (fromX + toX) / 2;
              const curveOffset = conn.condition ? 50 : 0;
              const pathData = `M ${fromX} ${fromY} Q ${midX} ${fromY + curveOffset} ${toX} ${toY}`;

              return (
                <g key={index}>
                  {/* Connection line */}
                  <motion.path
                    d={pathData}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className={`${
                      hoveredConnection === `${conn.from}-${conn.to}`
                        ? 'text-apple-white'
                        : 'text-apple-white/30'
                    }`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />

                  {/* Animated flow indicator */}
                  <motion.circle
                    r="4"
                    fill="currentColor"
                    className="text-apple-white"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "linear"
                    }}
                  />

                  {/* Condition label */}
                  {conn.condition && (
                    <motion.text
                      x={midX}
                      y={fromY + curveOffset + 20}
                      textAnchor="middle"
                      className="text-xs fill-apple-white/60 pointer-events-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                      onMouseEnter={() => setHoveredConnection(`${conn.from}-${conn.to}`)}
                      onMouseLeave={() => setHoveredConnection(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {conn.condition}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Flow Nodes */}
          {flowNodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  left: `${node.position.x}px`,
                  top: `${node.position.y + 200}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Node Card */}
                <motion.div
                  className={`relative bg-apple-white/5 backdrop-blur p-6 rounded-2xl border border-apple-white/10 hover:bg-apple-white/10 transition-all duration-500 group cursor-pointer ${
                    activeNode === node.id ? 'ring-2 ring-apple-white/50' : ''
                  }`}
                  whileHover={{ y: -5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Node Type Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`px-3 py-1 rounded-full bg-gradient-to-r ${node.color} text-apple-white font-bold text-xs`}
                    >
                      {node.type.toUpperCase()}
                    </div>
                    {node.branches && (
                      <GitBranch className="w-4 h-4 text-apple-white/60" />
                    )}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${node.color} flex items-center justify-center mx-auto mb-4`}
                    animate={activeNode === node.id ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Title with cinematic reveal */}
                  <CinematicTextReveal delay={index * 0.3}>
                    {node.title}
                  </CinematicTextReveal>

                  {/* Description */}
                  <p className="text-apple-white/60 text-sm leading-relaxed mb-4">
                    {node.description}
                  </p>

                  {/* Interactive Elements */}
                  {node.buttons && (
                    <div className="space-y-2">
                      {node.buttons.slice(0, activeNode === node.id ? 3 : 1).map((button, btnIndex) => (
                        <motion.button
                          key={btnIndex}
                          className="w-full px-3 py-2 bg-apple-white/10 hover:bg-apple-white/20 rounded-lg text-xs text-apple-white transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={activeNode === node.id ? { opacity: 1, x: 0 } : { opacity: 0.5, x: 0 }}
                          transition={{ delay: btnIndex * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {button}
                        </motion.button>
                      ))}
                      {node.buttons.length > 1 && activeNode !== node.id && (
                        <motion.div
                          className="text-xs text-apple-white/40 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          +{node.buttons.length - 1} more options
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Integrations */}
                  {node.integrations && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {node.integrations.map((integration, intIndex) => (
                        <motion.div
                          key={intIndex}
                          className="px-2 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded text-xs text-orange-300 border border-orange-500/30"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={activeNode === node.id ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 1 }}
                          transition={{ delay: intIndex * 0.1 }}
                        >
                          {integration}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${node.color} opacity-0 group-hover:opacity-10 transition-opacity blur-xl -z-10`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Legend */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <span className="text-apple-white/60 text-sm">Trigger</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <span className="text-apple-white/60 text-sm">Condition</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <span className="text-apple-white/60 text-sm">Action</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitBranch className="w-3 h-3 text-apple-white/60" />
              <span className="text-apple-white/60 text-sm">Branching Logic</span>
            </div>
          </div>

          <motion.button
            className="px-8 py-4 bg-apple-white text-apple-grey-dark font-medium rounded-full hover:bg-apple-grey transition-all apple-shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Build Your Conditional Flow
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
