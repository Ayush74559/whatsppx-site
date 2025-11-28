import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CountUp } from '@/components/motion/CountUp';

type Feature = {
  title: string;
  description: string;
};

type Stat = {
  number: string;
  label: string;
};

type Props = {
  title: string;
  subtitle: string;
  features: Feature[];
  stats: Stat[];
};

export const AppleStorytelling: React.FC<Props> = ({ title, subtitle, features, stats }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Cinematic scroll-triggered reveals
  const badgeProgress = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const titleProgress = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const subtitleProgress = useTransform(scrollYProgress, [0.2, 0.33], [0, 1]);
  const featuresProgress = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);
  const statsProgress = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  // Cinematic opacity reveals with blur effects
  const badgeOpacity = useTransform(badgeProgress, [0, 0.3, 1], [0, 0.7, 1]);
  const titleOpacity = useTransform(titleProgress, [0, 0.4, 1], [0, 0.8, 1]);
  const subtitleOpacity = useTransform(subtitleProgress, [0, 0.3, 1], [0, 0.7, 1]);
  const featuresOpacity = useTransform(featuresProgress, [0, 0.5, 1], [0, 0.6, 1]);
  const statsOpacity = useTransform(statsProgress, [0, 0.4, 1], [0, 0.8, 1]);

  // Blur to sharp transitions
  const badgeBlur = useTransform(badgeProgress, [0, 0.6, 1], ['blur(8px)', 'blur(2px)', 'blur(0px)']);
  const titleBlur = useTransform(titleProgress, [0, 0.5, 1], ['blur(10px)', 'blur(3px)', 'blur(0px)']);
  const subtitleBlur = useTransform(subtitleProgress, [0, 0.4, 1], ['blur(6px)', 'blur(1px)', 'blur(0px)']);
  const featuresBlur = useTransform(featuresProgress, [0, 0.6, 1], ['blur(4px)', 'blur(1px)', 'blur(0px)']);
  const statsBlur = useTransform(statsProgress, [0, 0.5, 1], ['blur(6px)', 'blur(2px)', 'blur(0px)']);

  // Scale effects for dramatic reveals
  const titleScale = useTransform(titleProgress, [0, 0.7, 1], [0.95, 0.98, 1]);
  const subtitleScale = useTransform(subtitleProgress, [0, 0.6, 1], [0.96, 0.98, 1]);

  // Cinematic slide up animations
  const badgeY = useTransform(badgeProgress, [0, 1], [25, 0]);
  const titleY = useTransform(titleProgress, [0, 1], [40, 0]);
  const subtitleY = useTransform(subtitleProgress, [0, 1], [30, 0]);
  const featuresY = useTransform(featuresProgress, [0, 1], [50, 0]);
  const statsY = useTransform(statsProgress, [0, 1], [35, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-black"
      style={{ position: 'relative' }}
    >
      {/* Pure black background with subtle ambient lighting */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }} />
      </div>

      <div className="section-container max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-12">
          {/* About Badge */}
          <motion.div
            className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-black/20 border border-white/20 mx-auto shadow-2xl backdrop-blur-sm"
            style={{
              opacity: badgeOpacity,
              y: badgeY,
              filter: badgeBlur,
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg" />
            <span className="apple-small font-semibold tracking-wide uppercase white-intense">About WhatsAppX</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            className="space-y-4"
            style={{
              opacity: titleOpacity,
              y: titleY,
              filter: titleBlur,
              scale: titleScale,
            }}
            transition={{
              duration: 1.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <h1 className="apple-h1 apple-heading-tight text-6xl md:text-7xl lg:text-8xl font-bold leading-none white-intense">
              {title}
            </h1>
            {/* Subtle accent line */}
            <motion.div
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className="max-w-4xl mx-auto"
            style={{
              opacity: subtitleOpacity,
              y: subtitleY,
              filter: subtitleBlur,
              scale: subtitleScale,
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <p className="apple-body text-xl md:text-2xl lg:text-3xl leading-relaxed font-light tracking-wide white-intense">
              {subtitle}
            </p>
          </motion.div>

          {/* Feature Blocks */}
          <motion.div
            className="space-y-8 mt-20"
            style={{
              opacity: featuresOpacity,
              y: featuresY,
              filter: featuresBlur,
            }}
            transition={{
              duration: 1.0,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="max-w-2xl mx-auto p-6 rounded-2xl bg-transparent border border-white/20"
                initial={isMobile ? { opacity: 0, scale: 0.96 } : { opacity: 0, y: 24, scale: 0.96, filter: 'blur(6px)' }}
                whileInView={isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                whileHover={!isMobile ? { y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.25)' } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true }}
              >
                <div className="text-left">
                  <h3 className="apple-h3 font-semibold mb-4 text-2xl md:text-3xl lg:text-4xl leading-tight white-intense">
                    {feature.title}
                  </h3>
                  <p className="apple-body text-lg md:text-xl leading-relaxed white-intense font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
            style={{
              opacity: statsOpacity,
              y: statsY,
              filter: statsBlur,
            }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-transparent border border-white/20 text-center"
                initial={isMobile ? { opacity: 0, scale: 0.96 } : { opacity: 0, y: 24, scale: 0.96, filter: 'blur(6px)' }}
                whileInView={isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                whileHover={!isMobile ? { y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.25)' } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true }}
              >
                <div>
                  <p className="apple-h2 font-bold text-4xl md:text-5xl lg:text-6xl mb-3 white-intense">
                    {stat.number}
                  </p>
                  <p className="apple-small white-intense font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppleStorytelling;