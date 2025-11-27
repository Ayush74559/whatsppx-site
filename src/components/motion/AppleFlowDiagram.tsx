import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Bot, MessageSquare, Zap } from 'lucide-react';

const flowSteps = [
  {
    icon: Bot,
    title: 'Trigger',
    description: 'Incoming message, keyword, or webhook',
  },
  {
    icon: MessageSquare,
    title: 'Condition',
    description: 'Check customer profile or keywords',
  },
  {
    icon: Zap,
    title: 'Action',
    description: 'Send message, tag, or create ticket',
  },
];

export const AppleFlowDiagram: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });
  const isCenterInView = useInView(ref, { once: false, margin: "-50px" });

  const boxInitial = { opacity: 0, x: -50, scale: 0.9 };
  const boxAnimate = isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.9 };
  const boxTransition = (delay: number) => ({
    duration: 0.8,
    delay,
  });

  const iconInitial = { scale: 1 };
  const iconAnimate = isCenterInView ? { scale: [1, 1.1, 1] } : { scale: 1 };
  const iconTransition = {
    duration: 0.6,
    repeat: isCenterInView ? Infinity : 0,
    repeatDelay: 2,
  };

  const lineInitial = { pathLength: 0 };
  const lineAnimate = isInView ? { pathLength: 1 } : { pathLength: 0 };
  const lineTransition = {
    duration: 1.5,
    delay: 0.8, // Lines draw after boxes
  };

  return (
    <div ref={ref} className="relative w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-8 md:space-y-0">
        {/* SVG for lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 200"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Line from Trigger to Condition */}
          <motion.path
            d="M 150 100 L 400 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary/60"
            initial={lineInitial}
            animate={lineAnimate}
            transition={lineTransition}
          />
          {/* Line from Condition to Action */}
          <motion.path
            d="M 450 100 L 700 100"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary/60"
            initial={lineInitial}
            animate={lineAnimate}
            transition={lineTransition}
          />
        </svg>

        {/* Flow Steps */}
        {flowSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              initial={boxInitial}
              animate={boxAnimate}
              transition={boxTransition(index * 0.3)}
              className={`relative z-10 ${isCenterInView ? 'glow-highlight' : ''}`}
            >
              <Card className="white-card white-card--intense p-6 w-64 md:w-72 text-center hover-glow">
                <motion.div
                  initial={iconInitial}
                  animate={iconAnimate}
                  transition={iconTransition}
                  className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-4"
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="apple-h3 mb-1">{step.title}</h4>
                <p className="apple-body">{step.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AppleFlowDiagram;