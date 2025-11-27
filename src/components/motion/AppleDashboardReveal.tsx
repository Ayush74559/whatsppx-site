import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BarChart3, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { CountUp } from './CountUp';

export const AppleDashboardReveal: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Background light effect - soft ambient glow
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.05, 0.15, 0.25]);

  // Card depth parallax effects
  const card1Y = useTransform(scrollYProgress, [0, 0.5], [60, -15]);
  const card2Y = useTransform(scrollYProgress, [0, 0.5], [40, -8]);
  const card3Y = useTransform(scrollYProgress, [0, 0.5], [80, -25]);

  // Subtle card rotation for depth
  const card1RotateX = useTransform(scrollYProgress, [0, 0.5], [2, -1]);
  const card2RotateX = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const card3RotateX = useTransform(scrollYProgress, [0, 0.5], [3, -2]);

  // Glass surface lighting effect
  const glassGlow = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0.1, 0.2]);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated background gradient - soft ambient lighting */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-whatsapp/3 rounded-2xl"
        style={{ opacity: backgroundOpacity }}
      />

      {/* Glass surface lighting effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(135deg,
            rgba(255,255,255,${glassGlow}) 0%,
            rgba(255,255,255,0) 50%,
            rgba(0,113,227,${glassGlow}) 100%)`,
        }}
      />

      <div className="relative glass-card p-8 rounded-2xl overflow-hidden min-h-[600px] backdrop-blur-xl">
        {/* Dashboard Header - cinematic text reveal */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -20, filter: 'blur(4px)' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h3
            className="text-2xl font-bold mb-2"
            initial={{ opacity: 0, filter: 'blur(2px)' }}
            animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(2px)' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Dashboard Overview
          </motion.h3>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 10, filter: 'blur(1px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 10, filter: 'blur(1px)' }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Real-time insights and analytics
          </motion.p>
        </motion.div>

        {/* Stats Cards - premium reveal with glass effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-card/30 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-2xl relative overflow-hidden group"
            initial={{ opacity: 0, x: -80, y: 40, rotateX: 15 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0, rotateX: 0 } : { opacity: 0, x: -80, y: 40, rotateX: 15 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ rotateX: card1RotateX, y: card1Y }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Light sweep effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: '-100%' }}
              animate={isInView ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
                >
                  <Users className="w-6 h-6 text-primary" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Active Users
                </motion.p>
                <div className="text-3xl font-bold">
                  <CountUp
                    from={0}
                    to={1247}
                    duration={2.5}
                    delay={1}
                    trigger={isInView}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-card/30 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-2xl relative overflow-hidden group"
            initial={{ opacity: 0, y: 60, rotateX: -10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: -10 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ rotateX: card2RotateX, y: card2Y }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Light sweep effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: '-100%' }}
              animate={isInView ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-whatsapp/20 to-whatsapp/10 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                  transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 200 }}
                >
                  <MessageSquare className="w-6 h-6 text-whatsapp" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  Messages Today
                </motion.p>
                <div className="text-3xl font-bold">
                  <CountUp
                    from={0}
                    to={3847}
                    duration={2.5}
                    delay={1.2}
                    trigger={isInView}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-card/30 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-2xl relative overflow-hidden group"
            initial={{ opacity: 0, x: 80, y: 40, rotateX: -15 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0, rotateX: 0 } : { opacity: 0, x: 80, y: 40, rotateX: -15 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ rotateX: card3RotateX, y: card3Y }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            {/* Light sweep effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: '-100%' }}
              animate={isInView ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/20 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: 180 }}
                  transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 200 }}
                >
                  <TrendingUp className="w-6 h-6 text-foreground" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  Response Rate
                </motion.p>
                <div className="text-3xl font-bold">
                  <CountUp
                    from={0}
                    to={98.5}
                    duration={2.5}
                    delay={1.4}
                    decimals={1}
                    trigger={isInView}
                  />
                  <span className="text-lg">%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chart Area */}
        <motion.div
          className="bg-card/30 backdrop-blur-sm rounded-lg p-6 border border-border/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold">Message Activity</h4>
            <motion.div
              className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center"
              animate={isInView ? { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" } : {}}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <BarChart3 className="w-5 h-5 text-primary" />
            </motion.div>
          </div>

          {/* Simple animated chart */}
          <div className="h-32 flex items-end justify-between space-x-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-t from-primary to-primary/60 rounded-sm flex-1"
                initial={{ height: 0 }}
                animate={isInView ? { height: `${height}%` } : { height: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2 + index * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppleDashboardReveal;