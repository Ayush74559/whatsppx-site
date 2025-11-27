import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Define reveal points for each element
  const titleProgress = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(titleProgress, [0, 1], [12, 0]);
  const titleBlur = useTransform(titleProgress, [0, 1], ['blur(4px)', 'blur(0px)']);

  const subtitleProgress = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const subtitleY = useTransform(subtitleProgress, [0, 1], [12, 0]);
  const subtitleBlur = useTransform(subtitleProgress, [0, 1], ['blur(4px)', 'blur(0px)']);

  const feature1Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const feature1Y = useTransform(feature1Progress, [0, 1], [12, 0]);
  const feature1Blur = useTransform(feature1Progress, [0, 1], ['blur(4px)', 'blur(0px)']);

  const feature2Progress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const feature2Y = useTransform(feature2Progress, [0, 1], [12, 0]);
  const feature2Blur = useTransform(feature2Progress, [0, 1], ['blur(4px)', 'blur(0px)']);

  const feature3Progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const feature3Y = useTransform(feature3Progress, [0, 1], [12, 0]);
  const feature3Blur = useTransform(feature3Progress, [0, 1], ['blur(4px)', 'blur(0px)']);

  const statsProgress = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const statsY = useTransform(statsProgress, [0, 1], [12, 0]);
  const statsBlur = useTransform(statsProgress, [0, 1], ['blur(4px)', 'blur(0px)']);

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
  };

  return (
    <div ref={containerRef} className="py-20">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-border/50 mb-6"
              style={{
                opacity: titleProgress,
                y: useTransform(titleProgress, [0, 1], [12, 0]),
                filter: useTransform(titleProgress, [0, 1], ['blur(4px)', 'blur(0px)']),
              }}
            >
              <div className="w-4 h-4 rounded-full bg-whatsapp" />
              <span className="text-sm font-medium white-intense">About WhatsAppX</span>
            </motion.div>

            <motion.h2
              className="apple-h2 apple-heading-tight white-intense mb-6"
              style={{
                opacity: titleProgress,
                y: useTransform(titleProgress, [0, 1], [12, 0]),
                filter: useTransform(titleProgress, [0, 1], ['blur(4px)', 'blur(0px)']),
              }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="apple-body white-intense mb-6"
              style={{
                opacity: subtitleProgress,
                y: useTransform(subtitleProgress, [0, 1], [12, 0]),
                filter: useTransform(subtitleProgress, [0, 1], ['blur(4px)', 'blur(0px)']),
              }}
            >
              {subtitle}
            </motion.p>

            <div className="space-y-4 mb-8">
              <motion.div
                className="flex items-start space-x-3"
                style={{
                  opacity: feature1Progress,
                  y: feature1Y,
                  filter: feature1Blur,
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-whatsapp/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-whatsapp" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{features[0]?.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {features[0]?.description}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-3"
                style={{
                  opacity: feature2Progress,
                  y: feature2Y,
                  filter: feature2Blur,
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{features[1]?.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {features[1]?.description}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-3"
                style={{
                  opacity: feature3Progress,
                  y: feature3Y,
                  filter: feature3Blur,
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-gradient-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{features[2]?.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {features[2]?.description}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="flex items-center space-x-8"
              style={{
                opacity: statsProgress,
                y: useTransform(statsProgress, [0, 1], [12, 0]),
                filter: useTransform(statsProgress, [0, 1], ['blur(4px)', 'blur(0px)']),
              }}
            >
              {stats.map((stat, index) => (
                <div key={index}>
                  <p className="text-3xl font-bold gradient-text mb-1">{stat.number}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="animate-slide-up">
            {/* Right side content - you can add mockup or other elements here */}
            <div className="glass-card rounded-2xl p-8 hover-glow">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-whatsapp/10 rounded-lg border border-whatsapp/20">
                  <div className="w-12 h-12 rounded-full bg-whatsapp flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white" />
                  </div>
                  <div>
                    <p className="font-semibold">AI-Powered Intelligence</p>
                    <p className="text-sm text-muted-foreground">
                      Context-aware responses in 100+ languages
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Lightning Fast</p>
                    <p className="text-sm text-muted-foreground">
                      Response times under 100ms
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Enterprise Security</p>
                    <p className="text-sm text-muted-foreground">
                      End-to-end encryption & GDPR compliant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleStorytelling;