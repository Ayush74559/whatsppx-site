import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Line = {
  text: string;
  delay: number;
};

const lines: Line[] = [
  { text: "Type anything.", delay: 0 },
  { text: "AI does everything.", delay: 0.1 },
  { text: "Incredibly smart responses.", delay: 0.2 },
];

export const AppleTextScrollReveal: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Phone zoom effect - smoother transforms
  const phoneScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1.05, 1.08, 1.02]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 0.95, 0.85]);
  const phoneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 0.5, 1], [20, -10, -5]);

  // Text reveal transforms for each line
  const line1Progress = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 1]);
  const line1Opacity = useTransform(line1Progress, [0, 1], [0, 1]);
  const line1Y = useTransform(line1Progress, [0, 1], [10, 0]);
  const line1Blur = useTransform(line1Progress, [0, 1], ['blur(4px)', 'blur(0px)']);

  const line2Progress = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 1, 1]);
  const line2Opacity = useTransform(line2Progress, [0, 1], [0, 1]);
  const line2Y = useTransform(line2Progress, [0, 1], [10, 0]);
  const line2Blur = useTransform(line2Progress, [0, 1], ['blur(4px)', 'blur(0px)']);

  const line3Progress = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0, 1, 1]);
  const line3Opacity = useTransform(line3Progress, [0, 1], [0, 1]);
  const line3Y = useTransform(line3Progress, [0, 1], [10, 0]);
  const line3Blur = useTransform(line3Progress, [0, 1], ['blur(4px)', 'blur(0px)']);


  return (
    <section ref={containerRef} className="relative min-h-screen bg-black py-20 px-4 overflow-hidden">
      <div className="section-container">
        <div className="flex justify-center items-center min-h-screen">
          {/* Text content */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <motion.div
                style={{
                  opacity: line1Opacity,
                  y: line1Y,
                  filter: line1Blur,
                }}
              >
                <h2 className="text-white text-4xl md:text-6xl font-light tracking-wide leading-tight">
                  {lines[0].text}
                </h2>
              </motion.div>

              <motion.div
                style={{
                  opacity: line2Opacity,
                  y: line2Y,
                  filter: line2Blur,
                }}
              >
                <h2 className="text-white text-4xl md:text-6xl font-light tracking-wide leading-tight">
                  {lines[1].text}
                </h2>
              </motion.div>

              <motion.div
                style={{
                  opacity: line3Opacity,
                  y: line3Y,
                  filter: line3Blur,
                }}
              >
                <h2 className="text-white text-4xl md:text-6xl font-light tracking-wide leading-tight">
                  {lines[2].text}
                </h2>
              </motion.div>

              {/* Phone mockup image */}
              <motion.div
                className="mt-12 flex justify-center"
                style={{
                  scale: phoneScale,
                  opacity: phoneOpacity,
                  rotate: phoneRotate,
                  y: phoneY,
                }}
                initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                viewport={{ once: true }}
              >
                <img
                  src="/media/0a68a4e3-47c3-4684-a0d5-e2855dbc71b0.png"
                  alt="Phone mockup"
                  className="w-[300px] md:w-[400px] h-auto object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background depth blur effect */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{
          filter: useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(10px)']),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0.8]),
        }}
      />
    </section>
  );
};

export default AppleTextScrollReveal;