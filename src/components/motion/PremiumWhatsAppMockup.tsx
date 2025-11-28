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

export const PremiumWhatsAppMockup: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Enhanced cinematic phone animations
  const phoneScale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.8, 1.1, 1.05, 1.08, 1.03, 0.98]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 0.95, 0.8]);
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, -5, 2, -3]);
  const phoneRotateY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [-8, 3, -2, 5]);
  const phoneRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 1, 2]);
  const phoneY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, -15, -8, 10]);
  const phoneX = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [-20, 8, -5, 15]);

  // Premium lighting effects
  const phoneBrightness = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1.1, 1.05, 0.95]);
  const phoneContrast = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1.1, 1.05, 1.0]);

  // Text reveal transforms for each line
  const line1Progress = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 1]);
  const line1Opacity = useTransform(line1Progress, [0, 1], [0, 1]);
  const line1Y = useTransform(line1Progress, [0, 1], [10, 0]);

  const line2Progress = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 1, 1]);
  const line2Opacity = useTransform(line2Progress, [0, 1], [0, 1]);
  const line2Y = useTransform(line2Progress, [0, 1], [10, 0]);

  const line3Progress = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0, 1, 1]);
  const line3Opacity = useTransform(line3Progress, [0, 1], [0, 1]);
  const line3Y = useTransform(line3Progress, [0, 1], [10, 0]);

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
                }}
              >
                <h2 className="text-white text-5xl md:text-7xl font-light tracking-wide leading-tight drop-shadow-lg">
                  {lines[0].text}
                </h2>
              </motion.div>

              <motion.div
                style={{
                  opacity: line2Opacity,
                  y: line2Y,
                }}
              >
                <h2 className="text-white text-5xl md:text-7xl font-light tracking-wide leading-tight drop-shadow-lg">
                  {lines[1].text}
                </h2>
              </motion.div>

              <motion.div
                style={{
                  opacity: line3Opacity,
                  y: line3Y,
                }}
              >
                <h2 className="text-white text-5xl md:text-7xl font-light tracking-wide leading-tight drop-shadow-lg">
                  {lines[2].text}
                </h2>
              </motion.div>

              {/* Premium iPhone 16 Pro Mockup */}
              <motion.div
                className="mt-20 flex justify-center"
                style={{
                  scale: phoneScale,
                  opacity: phoneOpacity,
                  rotateX: phoneRotateX,
                  rotateY: phoneRotateY,
                  rotateZ: phoneRotateZ,
                  y: phoneY,
                  x: phoneX,
                }}
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.6,
                  rotateX: 25,
                  rotateY: -15,
                  rotateZ: -10
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0
                }}
                transition={{
                  duration: 2.5,
                  delay: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  type: "spring",
                  stiffness: 80,
                  damping: 25
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative"
                  style={{
                    filter: `brightness(${phoneBrightness}) contrast(${phoneContrast})`,
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  {/* Premium iPhone 16 Pro Mockup */}
                  <div className="relative w-[320px] h-[680px] mx-auto">
                    {/* Premium Glow Effect */}
                    <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl scale-110"></div>

                    {/* iPhone Frame */}
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-[3rem] p-2 shadow-2xl"
                         style={{
                           background: 'linear-gradient(135deg, #111827 0%, #000000 30%, #1f2937 70%, #000000 100%)',
                           boxShadow: '0 32px 64px rgba(0,0,0,0.8), 0 0 150px rgba(59, 130, 246, 0.1), 0 0 300px rgba(59, 130, 246, 0.05), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 0 100px rgba(59, 130, 246, 0.03)',
                           border: '1px solid rgba(255,255,255,0.08)'
                         }}>
                      {/* Dynamic Island */}
                      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-full z-10"
                           style={{
                             background: 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.9) 100%)',
                             boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.4), 0 2px 12px rgba(0,0,0,0.5)',
                             border: '0.5px solid rgba(255,255,255,0.15)'
                           }}>
                        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full"
                             style={{
                               boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.3)'
                             }}></div>
                      </div>

                      {/* Premium OLED Screen */}
                      <div className="w-full h-full bg-gradient-to-br from-white via-gray-50 to-white rounded-[2.8rem] overflow-hidden relative"
                           style={{
                             background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 25%, #ffffff 50%, #f8fafc 75%, #ffffff 100%)',
                             boxShadow: 'inset 0 0 80px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.02), 0 0 0 1px rgba(0,0,0,0.08)',
                           }}>
                        {/* Status Bar */}
                        <div className="h-11 bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-between px-5 text-white text-xs font-medium relative"
                             style={{
                               background: 'linear-gradient(90deg, #000000 0%, #111827 30%, #000000 70%, #111827 100%)',
                               boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.4)',
                               borderBottom: '0.5px solid rgba(255,255,255,0.1)'
                             }}>
                          <span className="font-semibold tracking-wider text-slate-100" style={{ fontSize: '9px' }}>9:41</span>
                          <div className="flex items-center space-x-1.5">
                            <div className="flex space-x-px">
                              <div className="w-3.5 h-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                   style={{ boxShadow: 'inset 0 0.5px 0.5px rgba(255,255,255,0.4), 0 0.5px 1px rgba(0,0,0,0.3)' }}></div>
                              <div className="w-3.5 h-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                   style={{ boxShadow: 'inset 0 0.5px 0.5px rgba(255,255,255,0.4), 0 0.5px 1px rgba(0,0,0,0.3)' }}></div>
                              <div className="w-3.5 h-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                   style={{ boxShadow: 'inset 0 0.5px 0.5px rgba(255,255,255,0.4), 0 0.5px 1px rgba(0,0,0,0.3)' }}></div>
                              <div className="w-3.5 h-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                   style={{ boxShadow: 'inset 0 0.5px 0.5px rgba(255,255,255,0.4), 0 0.5px 1px rgba(0,0,0,0.3)' }}></div>
                              <div className="w-3.5 h-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                   style={{ boxShadow: 'inset 0 0.5px 0.5px rgba(255,255,255,0.4), 0 0.5px 1px rgba(0,0,0,0.3)' }}></div>
                            </div>
                            <span className="font-semibold text-white" style={{ fontSize: '9px' }}>100%</span>
                            <div className="w-5 h-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-sm shadow-sm relative"
                                 style={{
                                   boxShadow: 'inset 0 0.5px 1px rgba(255,255,255,0.4), 0 0.5px 1px rgba(0,0,0,0.3)',
                                   background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)'
                                 }}>
                              <div className="absolute top-0.5 left-0.5 w-0.5 h-1.5 bg-white/40 rounded-sm"></div>
                            </div>
                          </div>
                        </div>

                        {/* WhatsAppX AI Header */}
                        <div className="h-12 bg-[#075E54] flex items-center justify-between px-4 relative">
                          <div className="flex items-center min-w-0 flex-1">
                            <div className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center mr-2.5 flex-shrink-0 shadow-lg">
                              <span className="text-white text-base">🤖</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-white font-bold text-base truncate">WhatsAppX AI</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1.5 flex-shrink-0">
                            <motion.div
                              className="w-2 h-2 bg-[#25D366] rounded-full shadow-lg"
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <span className="text-[#25D366] text-xs font-medium">Online</span>
                          </div>
                        </div>

                        {/* WhatsApp Chat Interface */}
                        <div className="flex h-[calc(100%-8rem)]">
                          <div className="flex-1 bg-[#E5DDD5] flex flex-col relative"
                               style={{
                                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                                 backgroundSize: '20px 20px'
                               }}>
                            {/* Chat Header */}
                            <div className="h-12 bg-[#075E54] flex items-center px-4 shadow-sm">
                              <div className="w-8 h-8 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white text-xs font-bold mr-2.5 shadow-lg">
                                JD
                              </div>
                              <div>
                                <div className="text-white font-semibold text-base">John Doe</div>
                              </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-gradient-to-b from-transparent to-slate-50/20"
                                 style={{
                                   background: 'linear-gradient(180deg, transparent 0%, rgba(248, 250, 252, 0.2) 100%)'
                                 }}>
                              {/* User Message */}
                              <motion.div
                                className="flex justify-start mb-1.5"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 2.0, type: "spring", stiffness: 200 }}
                              >
                                <div className="bg-white rounded-2xl rounded-tl-md px-3 py-2 max-w-xs shadow-lg"
                                     style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                  <div className="text-[#333333] text-sm leading-relaxed">Hi, I need help with my order</div>
                                  <div className="text-[#999999] text-xs mt-1 text-right">2:28 PM</div>
                                </div>
                              </motion.div>

                              {/* AI Typing Indicator */}
                              <motion.div
                                className="flex justify-start mb-1.5"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
                              >
                                <div className="bg-white rounded-2xl rounded-tl-md px-3 py-2 shadow-lg"
                                     style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                  <div className="flex space-x-1 items-center">
                                    <motion.div
                                      className="w-1.5 h-1.5 bg-[#999999] rounded-full"
                                      animate={{ opacity: [0.4, 1, 0.4] }}
                                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <motion.div
                                      className="w-1.5 h-1.5 bg-[#999999] rounded-full"
                                      animate={{ opacity: [0.4, 1, 0.4] }}
                                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
                                    />
                                    <motion.div
                                      className="w-1.5 h-1.5 bg-[#999999] rounded-full"
                                      animate={{ opacity: [0.4, 1, 0.4] }}
                                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                                    />
                                  </div>
                                </div>
                              </motion.div>

                              {/* AI Response */}
                              <motion.div
                                className="flex justify-end mb-1.5"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 3.5, type: "spring", stiffness: 200 }}
                              >
                                <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-md px-3 py-2 max-w-xs relative shadow-lg"
                                     style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                  <div className="text-[#333333] text-sm leading-relaxed">Hello! Your order is confirmed and will be delivered tomorrow. Let me know if you need tracking details.</div>
                                  <div className="text-[#999999] text-xs mt-1 text-right flex items-center justify-end">
                                    <span>2:29 PM</span>
                                    <span className="ml-1 text-[#25D366]">✓✓</span>
                                  </div>
                                  {/* AI Badge */}
                                  <div className="absolute -top-2 -left-5 w-5 h-5 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                                       style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                    <span className="text-white text-xs">🤖</span>
                                  </div>
                                </div>
                              </motion.div>

                              {/* User selects quick reply option */}
                              <motion.div
                                className="flex justify-start mb-1.5"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 4.0, type: "spring", stiffness: 200 }}
                              >
                                <div className="bg-white rounded-2xl rounded-tl-md px-3 py-2 max-w-xs shadow-lg"
                                     style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                  <div className="text-[#333333] text-sm leading-relaxed">📦 Track my order</div>
                                  <div className="text-[#999999] text-xs mt-1 text-right">2:30 PM</div>
                                </div>
                              </motion.div>

                              {/* AI provides tracking details */}
                              <motion.div
                                className="flex justify-end mb-1.5"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 4.5, type: "spring", stiffness: 200 }}
                              >
                                <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-md px-3 py-2 max-w-xs relative shadow-lg"
                                     style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                  <div className="text-[#333333] text-sm leading-relaxed">Your order #12345 is out for delivery! Expected arrival: 3:00 PM today. Driver: John (📞 +1-555-0123)</div>
                                  <div className="text-[#999999] text-xs mt-1 text-right flex items-center justify-end">
                                    <span>2:30 PM</span>
                                    <span className="ml-1 text-[#25D366]">✓✓</span>
                                  </div>
                                  {/* AI Badge */}
                                  <div className="absolute -top-2 -left-5 w-5 h-5 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center border-2 border-white shadow-lg"
                                       style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                    <span className="text-white text-xs">🤖</span>
                                  </div>
                                </div>
                              </motion.div>
                            </div>

                            {/* Message Input Area */}
                            <div className="h-12 bg-[#F0F0F0] flex items-center px-3 border-t border-gray-200">
                              <div className="flex-1 bg-white rounded-full px-4 py-2 mr-2 shadow-sm"
                                   style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <div className="flex items-center">
                                  <div className="w-4 h-4 bg-[#999999] rounded-full flex items-center justify-center mr-2">
                                    <span className="text-white text-xs">😊</span>
                                  </div>
                                  <span className="text-[#999999] text-xs">Type a message...</span>
                                </div>
                              </div>
                              <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-sm">📎</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Removed background blur effect */}
    </section>
  );
};