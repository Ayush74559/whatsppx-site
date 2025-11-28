import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

type Feature = {
  title: string;
  description: string;
};

type Props = {
  title: string;
  subtitle: string;
  features: Feature[];
};

export const AppleScrollGradientReveal: React.FC<Props> = ({ title, subtitle, features }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Pin the section during scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 0]);

  // Text reveal progress - staggered for each line
  const titleProgress = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const subtitleProgress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const feature1Progress = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const feature2Progress = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const feature3Progress = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  // Opacity transforms - start very low (nearly invisible), become solid
  const titleOpacity = useTransform(titleProgress, [0, 1], [0.1, 1]);
  const subtitleOpacity = useTransform(subtitleProgress, [0, 1], [0.1, 1]);
  const feature1Opacity = useTransform(feature1Progress, [0, 1], [0.1, 1]);
  const feature2Opacity = useTransform(feature2Progress, [0, 1], [0.1, 1]);
  const feature3Opacity = useTransform(feature3Progress, [0, 1], [0.1, 1]);

  // Blur transforms - start with blur, become sharp
  const titleBlur = useTransform(titleProgress, [0, 1], ['blur(2px)', 'blur(0px)']);
  const subtitleBlur = useTransform(subtitleProgress, [0, 1], ['blur(2px)', 'blur(0px)']);
  const feature1Blur = useTransform(feature1Progress, [0, 1], ['blur(2px)', 'blur(0px)']);
  const feature2Blur = useTransform(feature2Progress, [0, 1], ['blur(2px)', 'blur(0px)']);
  const feature3Blur = useTransform(feature3Progress, [0, 1], ['blur(2px)', 'blur(0px)']);

  // Color transforms - start dark purple, become gradient
  const titleColor = useTransform(
    titleProgress,
    [0, 0.5, 1],
    ['rgba(147, 51, 234, 0.3)', 'rgba(168, 85, 247, 0.8)', 'rgba(236, 72, 153, 1)']
  );
  const subtitleColor = useTransform(
    subtitleProgress,
    [0, 0.5, 1],
    ['rgba(147, 51, 234, 0.3)', 'rgba(168, 85, 247, 0.8)', 'rgba(236, 72, 153, 1)']
  );

  // Feature colors - active bright gradient, inactive fade to dark
  const feature1Color = useTransform(
    feature1Progress,
    [0, 1],
    ['rgba(147, 51, 234, 0.2)', 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)']
  );
  const feature2Color = useTransform(
    feature2Progress,
    [0, 1],
    ['rgba(147, 51, 234, 0.2)', 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)']
  );
  const feature3Color = useTransform(
    feature3Progress,
    [0, 1],
    ['rgba(147, 51, 234, 0.2)', 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #3B82F6 100%)']
  );

  // Previous lines fade darker as new ones activate
  const titleFade = useTransform(scrollYProgress, [0.3, 0.4], [1, 0.4]);
  const subtitleFade = useTransform(scrollYProgress, [0.4, 0.5], [1, 0.4]);
  const feature1Fade = useTransform(scrollYProgress, [0.5, 0.6], [1, 0.4]);
  const feature2Fade = useTransform(scrollYProgress, [0.6, 0.7], [1, 0.4]);

  // Combined opacity transforms
  const titleCombinedOpacity = useTransform([titleOpacity, titleFade], ([o, f]) => (o as number) * (f as number));
  const subtitleCombinedOpacity = useTransform([subtitleOpacity, subtitleFade], ([o, f]) => (o as number) * (f as number));
  const feature1CombinedOpacity = useTransform([feature1Opacity, feature1Fade], ([o, f]) => (o as number) * (f as number));
  const feature2CombinedOpacity = useTransform([feature2Opacity, feature2Fade], ([o, f]) => (o as number) * (f as number));

  // Feature animation - upward motion on reveal
  const feature1Y = useTransform(feature1Progress, [0, 1], [10, 0]);
  const feature2Y = useTransform(feature2Progress, [0, 1], [10, 0]);
  const feature3Y = useTransform(feature3Progress, [0, 1], [10, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{ y }}
    >
      <div className="section-container max-w-4xl mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <motion.h1
            className="apple-h1 apple-heading-tight text-5xl md:text-6xl lg:text-7xl font-bold"
            style={{
              opacity: titleCombinedOpacity,
              filter: titleBlur,
              background: titleColor,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="apple-body text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{
              opacity: subtitleCombinedOpacity,
              filter: subtitleBlur,
              background: subtitleColor,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {subtitle}
          </motion.p>

          {/* Feature Blocks */}
          <div className="space-y-6 mt-16">
            {/* Feature 1 */}
            <motion.div
              className="text-left max-w-2xl mx-auto"
              style={{
                opacity: feature1CombinedOpacity,
                y: feature1Y,
              }}
            >
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{
                  background: feature1Color,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {features[0]?.title}
              </motion.h3>
              <motion.p
                className="text-lg text-white/90 leading-relaxed"
                style={{
                  opacity: feature1Opacity,
                }}
              >
                {features[0]?.description}
              </motion.p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="text-left max-w-2xl mx-auto"
              style={{
                opacity: feature2CombinedOpacity,
                y: feature2Y,
              }}
            >
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{
                  background: feature2Color,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {features[1]?.title}
              </motion.h3>
              <motion.p
                className="text-lg text-white/90 leading-relaxed"
                style={{
                  opacity: feature2Opacity,
                }}
              >
                {features[1]?.description}
              </motion.p>
            </motion.div>

            {/* Feature 3 - Final line with neon underline */}
            <motion.div
              className="text-left max-w-2xl mx-auto relative"
              style={{
                opacity: feature3Opacity,
                y: feature3Y,
              }}
            >
              <motion.h3
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{
                  background: feature3Color,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {features[2]?.title}
              </motion.h3>
              <motion.p
                className="text-lg text-white/90 leading-relaxed"
                style={{
                  opacity: feature3Opacity,
                }}
              >
                {features[2]?.description}
              </motion.p>
              {/* Soft neon underline */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full"
                style={{
                  opacity: feature3Progress,
                  scaleX: feature3Progress,
                }}
                initial={{ scaleX: 0 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppleScrollGradientReveal;