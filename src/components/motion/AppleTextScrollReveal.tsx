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

  // Enhanced cinematic phone animations
  const phoneScale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0.8, 1.1, 1.05, 1.08, 1.03, 0.98]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 0.95, 0.8]);
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, -5, 2, -3]);
  const phoneRotateY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [-8, 3, -2, 5]);
  const phoneRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 1, 2]);
  const phoneY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, -15, -8, 10]);
  const phoneX = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [-20, 8, -5, 15]);

  // Simplified effects
  const phoneBrightness = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1.1, 1.05, 0.95]);
  const phoneContrast = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1.1, 1.05, 1.0]);

  // Text reveal transforms for each line
  const line1Progress = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 1]);
  const line1Opacity = useTransform(line1Progress, [0, 1], [0, 1]);
  const line1Y = useTransform(line1Progress, [0, 1], [10, 0]);
  // Removed blur effects

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

              {/* WhatsApp Inbox iPhone 16 Mockup */}
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
                  className="relative max-w-2xl mx-auto"
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
                  {/* Clean WhatsAppX AI Header */}
                  <div className="bg-[#075E54] rounded-t-lg px-6 py-4 flex items-center justify-between shadow-lg">
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white text-xl">🤖</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-white font-bold text-xl truncate">WhatsAppX AI</div>
                        <div className="text-[#25D366] text-sm font-normal">AI Powered Assistant</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <motion.div
                        className="w-3 h-3 bg-[#25D366] rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span className="text-[#25D366] text-sm font-normal">Online</span>
                    </div>
                  </div>

                  {/* Clean Chat Interface */}
                  <div className="bg-[#E5DDD5] rounded-b-lg shadow-lg overflow-hidden"
                       style={{
                         background: 'linear-gradient(135deg, #111827 0%, #000000 30%, #1f2937 70%, #000000 100%)',
                         boxShadow: '0 32px 64px rgba(0,0,0,0.6), 0 0 150px rgba(59, 130, 246, 0.08), 0 0 300px rgba(59, 130, 246, 0.04), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 100px rgba(59, 130, 246, 0.02)',
                         border: '1px solid rgba(255,255,255,0.05)'
                       }}>
                    {/* Premium Dynamic Island */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-10"
                         style={{
                           background: 'linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0.9) 100%)',
                           boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.3), 0 2px 12px rgba(0,0,0,0.4)',
                           border: '0.5px solid rgba(255,255,255,0.1)'
                         }}>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full"
                           style={{
                             boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.3)'
                           }}></div>
                    </div>

                    {/* Premium Screen with Advanced Glassmorphism */}
                    <div className="w-full h-full bg-gradient-to-br from-white via-gray-50 to-white rounded-[2.5rem] overflow-hidden relative"
                         style={{
                           background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 25%, #ffffff 50%, #f8fafc 75%, #ffffff 100%)',
                           boxShadow: 'inset 0 0 80px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.08)'
                         }}>
                      {/* Premium Status Bar */}
                      <div className="h-8 bg-gradient-to-r from-black via-gray-900 to-black flex items-center justify-between px-5 text-white text-sm font-medium relative"
                           style={{
                             background: 'linear-gradient(90deg, #000000 0%, #111827 30%, #000000 70%, #111827 100%)',
                             boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.3)',
                             borderBottom: '0.5px solid rgba(255,255,255,0.08)'
                           }}>
                        <span className="font-semibold tracking-wider text-slate-100">9:41</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-0.5">
                            <div className="w-4 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                 style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)' }}></div>
                            <div className="w-4 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                 style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)' }}></div>
                            <div className="w-4 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                 style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)' }}></div>
                            <div className="w-4 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                 style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)' }}></div>
                            <div className="w-4 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-sm shadow-sm"
                                 style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)' }}></div>
                          </div>
                          <span className="font-semibold text-white">100%</span>
                          <div className="w-6 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-sm ml-1 shadow-sm relative"
                               style={{
                                 boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)',
                                 background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)'
                               }}>
                            <div className="absolute top-0.5 left-0.5 w-1 h-2 bg-white/30 rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                      {/* WhatsApp-Style Header */}
                      <div className="h-14 bg-[#075E54] flex items-center justify-between px-4 relative">
                        <div className="flex items-center min-w-0 flex-1">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-white text-base">🤖</span>
                          </div>
                         <div className="min-w-0 flex-1">
                           <div className="text-white font-medium text-lg truncate">WhatsAppX AI</div>
                         </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <motion.div
                            className="w-2 h-2 bg-[#25D366] rounded-full"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <span className="text-[#25D366] text-sm font-normal">Online</span>
                        </div>
                      </div>

                      {/* WhatsApp Chat Interface - Full Width */}
                      <div className="flex h-[calc(100%-4.5rem)]">
                        {/* WhatsApp Chat Window - Full Width */}
                        <div className="flex-1 bg-[#E5DDD5] flex flex-col relative"
                             style={{
                               backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                               backgroundSize: '20px 20px'
                             }}>
                          {/* Chat Header */}
                          <div className="h-16 bg-[#075E54] flex items-center px-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center text-white text-lg font-bold mr-4">
                              JD
                            </div>
                            <div>
                              <div className="text-white font-semibold text-xl">John Doe</div>
                            </div>
                          </div>

                          {/* Real Chat Conversation */}
                          <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-gradient-to-b from-transparent to-slate-50/30"
                               style={{
                                 background: 'linear-gradient(180deg, transparent 0%, rgba(248, 250, 252, 0.3) 100%)'
                               }}>
                            {/* Customer Message */}
                            <motion.div
                              className="flex justify-start mb-2"
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 2.0, type: "spring", stiffness: 200 }}
                            >
                              <div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 max-w-xs shadow-sm"
                                   style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                <div className="text-[#333333] text-sm leading-relaxed">Hi! I need help with my order</div>
                                <div className="text-[#999999] text-xs mt-1 text-right">2:28 PM</div>
                              </div>
                            </motion.div>

                            {/* AI Typing Indicator */}
                            <motion.div
                              className="flex justify-start mb-2"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
                            >
                              <div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 shadow-sm"
                                   style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                <div className="flex space-x-1 items-center">
                                  <motion.div
                                    className="w-1 h-1 bg-[#999999] rounded-full"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                  />
                                  <motion.div
                                    className="w-1 h-1 bg-[#999999] rounded-full"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
                                  />
                                  <motion.div
                                    className="w-1 h-1 bg-[#999999] rounded-full"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                                  />
                                </div>
                              </div>
                            </motion.div>

                            {/* AI Smart Reply */}
                            <motion.div
                              className="flex justify-end mb-2"
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 3.0, type: "spring", stiffness: 200 }}
                            >
                              <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm px-3 py-2 max-w-sm relative shadow-sm"
                                   style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                <div className="text-[#333333] text-sm leading-relaxed">Hi John! Your order is in processing and will be delivered tomorrow by 5 PM. Tracking link has been sent to your phone.</div>
                                <div className="text-[#999999] text-xs mt-1 text-right flex items-center justify-end">
                                  <span>2:29 PM</span>
                                  <span className="ml-1 text-[#25D366]">✓✓</span>
                                </div>
                                {/* AI Badge */}
                                <div className="absolute -top-1 -left-6 w-5 h-5 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center border border-white"
                                     style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                                  <span className="text-white text-xs">🤖</span>
                                </div>
                              </div>
                            </motion.div>

                            {/* Typing Animation - User typing new message */}
                            <motion.div
                              className="flex justify-start mb-4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 4.0, type: "spring", stiffness: 200 }}
                            >
                              <div className="bg-white rounded-lg rounded-tl-sm px-4 py-3 shadow-sm max-w-sm"
                                   style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                <motion.div
                                  className="text-[#333333] text-sm"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 4.2 }}
                                >
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 4.4, duration: 0.3 }}
                                  >
                                    W
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 4.6, duration: 0.3 }}
                                  >
                                    h
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 4.8, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 5.0, duration: 0.3 }}
                                  >
                                    n
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 5.2, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 5.4, duration: 0.3 }}
                                  >
                                    w
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 5.6, duration: 0.3 }}
                                  >
                                    i
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 5.8, duration: 0.3 }}
                                  >
                                    l
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 6.0, duration: 0.3 }}
                                  >
                                    l
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 6.2, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 6.4, duration: 0.3 }}
                                  >
                                    i
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 6.6, duration: 0.3 }}
                                  >
                                    t
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 6.8, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 7.0, duration: 0.3 }}
                                  >
                                    b
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 7.2, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 7.4, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 7.6, duration: 0.3 }}
                                  >
                                    d
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 7.8, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 8.0, duration: 0.3 }}
                                  >
                                    l
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 8.2, duration: 0.3 }}
                                  >
                                    i
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 8.4, duration: 0.3 }}
                                  >
                                    v
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 8.6, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 8.8, duration: 0.3 }}
                                  >
                                    r
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 9.0, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 9.2, duration: 0.3 }}
                                  >
                                    d
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 9.4, duration: 0.3 }}
                                  >
                                    ?
                                  </motion.span>
                                </motion.div>
                                <motion.div
                                  className="text-[#999999] text-xs mt-1 text-right"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 9.6 }}
                                >
                                  2:30 PM
                                </motion.div>
                              </div>
                            </motion.div>

                            {/* AI Processing - New Typing Indicator */}
                            <motion.div
                              className="flex justify-start mb-2"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 10.0, type: "spring", stiffness: 200 }}
                            >
                              <div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 shadow-sm"
                                   style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                <div className="flex space-x-1 items-center">
                                  <motion.div
                                    className="w-1 h-1 bg-[#999999] rounded-full"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                  />
                                  <motion.div
                                    className="w-1 h-1 bg-[#999999] rounded-full"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
                                  />
                                  <motion.div
                                    className="w-1 h-1 bg-[#999999] rounded-full"
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
                                  />
                                </div>
                              </div>
                            </motion.div>

                            {/* AI Instant Response */}
                            <motion.div
                              className="flex justify-end mb-4"
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 11.0, type: "spring", stiffness: 200 }}
                            >
                              <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm px-3 py-2 max-w-sm relative shadow-sm"
                                   style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                <motion.div
                                  className="text-[#333333] text-sm leading-relaxed"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 11.2 }}
                                >
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 11.4, duration: 0.3 }}
                                  >
                                    Y
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 11.6, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 11.8, duration: 0.3 }}
                                  >
                                    s
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 12.0, duration: 0.3 }}
                                  >
                                    ,
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 12.2, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 12.4, duration: 0.3 }}
                                  >
                                    y
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 12.6, duration: 0.3 }}
                                  >
                                    o
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 12.8, duration: 0.3 }}
                                  >
                                    u
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 13.0, duration: 0.3 }}
                                  >
                                    r
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 13.2, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 13.4, duration: 0.3 }}
                                  >
                                    o
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 13.6, duration: 0.3 }}
                                  >
                                    r
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 13.8, duration: 0.3 }}
                                  >
                                    d
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 14.0, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 14.2, duration: 0.3 }}
                                  >
                                    r
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 14.4, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 14.6, duration: 0.3 }}
                                  >
                                    w
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 14.8, duration: 0.3 }}
                                  >
                                    a
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 15.0, duration: 0.3 }}
                                  >
                                    s
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 15.2, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 15.4, duration: 0.3 }}
                                  >
                                    d
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 15.6, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 15.8, duration: 0.3 }}
                                  >
                                    l
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 16.0, duration: 0.3 }}
                                  >
                                    i
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 16.2, duration: 0.3 }}
                                  >
                                    v
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 16.4, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 16.6, duration: 0.3 }}
                                  >
                                    r
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 16.8, duration: 0.3 }}
                                  >
                                    e
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 17.0, duration: 0.3 }}
                                  >
                                    d
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 17.2, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 17.4, duration: 0.3 }}
                                  >
                                    a
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 17.6, duration: 0.3 }}
                                  >
                                    t
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 17.8, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 18.0, duration: 0.3 }}
                                  >
                                    3
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 18.2, duration: 0.3 }}
                                  >
                                    :
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 18.4, duration: 0.3 }}
                                  >
                                    4
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 18.6, duration: 0.3 }}
                                  >
                                    5
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 18.8, duration: 0.3 }}
                                  >
                                    {' '}
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 19.0, duration: 0.3 }}
                                  >
                                    P
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 19.2, duration: 0.3 }}
                                  >
                                    M
                                  </motion.span>
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 19.4, duration: 0.3 }}
                                  >
                                    .
                                  </motion.span>
                                </motion.div>
                                <motion.div
                                  className="text-[#999999] text-xs mt-1 text-right flex items-center justify-end"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 19.6 }}
                                >
                                  <span>2:31 PM</span>
                                  <span className="ml-1 text-[#25D366]">✓✓</span>
                                </motion.div>
                                {/* AI Badge */}
                                <div className="absolute -top-1 -left-6 w-5 h-5 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center border border-white"
                                     style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                                  <span className="text-white text-xs">🤖</span>
                                </div>
                              </div>
                            </motion.div>
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

export default AppleTextScrollReveal;