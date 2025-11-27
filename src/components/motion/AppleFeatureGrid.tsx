import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Bot, Zap, MessageSquare, Users, BarChart3, Globe, Clock, Shield, TrendingUp } from 'lucide-react';

type Feature = {
  title: string;
  description: string;
  videoSrc: string;
};

type Props = {
  features: Feature[];
  className?: string;
};

// Icon mapping for features
const iconMap = {
  'AI-Powered Replies': Bot,
  'Instant Auto-Replies': Zap,
  'Smart Message Flows': MessageSquare,
  'Built-in CRM': Users,
  'Analytics Dashboard': BarChart3,
  'Broadcast Messages': Globe,
  '24/7 Automation': Clock,
  'Secure & Reliable': Shield,
  'Dashboard': BarChart3,
  'Analytics': TrendingUp,
  'Automation Flows': Zap,
};

export const AppleFeatureGrid: React.FC<Props> = ({ features, className = '' }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", amount: 0.1 });
  const [hasBeenVisible, setHasBeenVisible] = React.useState(false);

  // Track if element has ever been visible
  React.useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isInView, hasBeenVisible]);

  // Mouse tracking for advanced interactions
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  return (
    <motion.div
      ref={(node) => {
        ref.current = node;
        containerRef.current = node;
      }}
      className={`grid md:grid-cols-3 gap-6 ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.2 }}
      onMouseMove={handleMouseMove}
    >
      {features.map((feature, index) => {
        const IconComponent = iconMap[feature.title as keyof typeof iconMap] || BarChart3;

        return (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 16,
              filter: 'blur(4px)'
            }}
            animate={hasBeenVisible ? {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)'
            } : {
              opacity: 0,
              y: 16,
              filter: 'blur(4px)'
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: index * 0.2
            }}
            whileHover={{
              y: -12,
              rotateX: -5,
              rotateY: 5,
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.15), 0 0 30px rgba(59, 130, 246, 0.1)",
              transition: {
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
            className="relative group cursor-pointer"
          >
            {/* Light sweep effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg pointer-events-none"
              initial={{ x: '-100%' }}
              animate={hasBeenVisible ? { x: '100%' } : { x: '-100%' }}
              transition={{
                duration: 1.2,
                delay: 0.4 + index * 0.2,
                ease: "easeInOut"
              }}
            />

            <Card className="white-card p-6 backdrop-blur-xl border border-white/20 shadow-lg relative overflow-hidden transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-xl">
              {/* Video/Icon section */}
              <div className="relative mb-4">
                {feature.videoSrc ? (
                  <div className="w-full rounded-md overflow-hidden analytics-video" style={{ height: 180 }}>
                    <video
                      src={feature.videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="analytics-video__media"
                      aria-hidden
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg relative overflow-hidden"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={hasBeenVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + index * 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Animated background glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-2xl"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={hasBeenVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
                      />

                      <motion.div
                        animate={hasBeenVisible ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, 0],
                          filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
                        } : {}}
                        transition={{
                          duration: 0.8,
                          delay: 0.8 + index * 0.2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                        whileHover={{
                          scale: 1.3,
                          rotate: 15,
                          filter: "brightness(1.4)",
                          transition: { duration: 0.2 }
                        }}
                        className="relative z-10"
                      >
                        <IconComponent className="w-8 h-8 text-primary drop-shadow-lg" />
                      </motion.div>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="card-body relative z-10">
                <motion.h3
                  className="apple-h3 mb-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={hasBeenVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.2,
                    ease: "easeOut"
                  }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="apple-body"
                  initial={{ opacity: 0, y: 8 }}
                  animate={hasBeenVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.2,
                    ease: "easeOut"
                  }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default AppleFeatureGrid;