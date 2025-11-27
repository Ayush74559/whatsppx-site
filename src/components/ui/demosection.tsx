import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { AppleTextReveal } from '../motion/AppleTextReveal';

const demoMessages = [
  { type: 'user', text: 'Hello, I need product info' },
  { type: 'ai', text: 'Hi! I\'d be happy to help. What product are you interested in?' },
  { type: 'user', text: 'Your premium package' },
  { type: 'ai', text: 'Our Premium package includes AI automation, analytics, and 24/7 support. Would you like to schedule a demo?' },
];

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => setIsTyping(false), 500); // Keep cursor for a bit after typing
        }
      }, 30); // faster typing speed

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-0.5 h-4 bg-current ml-0.5"
        />
      )}
    </span>
  );
};

export default function DemoSection() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.7, 1], [1, 0.5, 0]);
  const textBlur = useTransform(scrollYProgress, [0.3, 0.7, 1], [0, 2, 5]);

  return (
    <section ref={sectionRef} id="demo" className="py-apple-lg bg-apple-grey apple-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              opacity: textOpacity,
              filter: `blur(${textBlur}px)`
            }}
          >
            <div className="mb-6">
              <AppleTextReveal className="text-display font-semibold text-apple-grey-dark">
                Type anything. AI does everything.
              </AppleTextReveal>
            </div>
            <motion.p
              className="text-xl text-apple-grey-dark/60 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Watch how our AI handles customer conversations with natural language understanding and instant responses.
            </motion.p>

            <div className="space-y-4">
              {['Natural language processing', 'Context-aware responses', 'Multi-language support', 'Instant learning'].map(
                (feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-apple-blue" />
                    <span className="text-apple-grey-dark/80">{feature}</span>
                  </motion.div>
                )
              )}
            </div>

            <motion.button
              className="mt-10 px-8 py-4 bg-apple-grey-dark text-apple-white font-medium rounded-full hover:bg-apple-grey-dark/90 transition-all apple-shadow"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentMessage((prev) => (prev + 1) % demoMessages.length)}
            >
              See It In Action
            </motion.button>
          </motion.div>

          {/* Right: Interactive demo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* iPhone mockup */}
            <motion.div
              className="relative mx-auto max-w-[380px]"
              animate={{
                y: [0, -10, 0],
                rotateX: [0, 2, 0],
                rotateY: [0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                scale: phoneScale
              }}
            >
              <div className="aspect-[9/19.5] bg-apple-grey-dark rounded-[3rem] p-3 apple-shadow-lg relative overflow-hidden">
                {/* Glass reflection sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-[3rem]"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2
                  }}
                />
                <div className="w-full h-full bg-gradient-to-b from-[#ECE5DD] to-[#D9D3CC] rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-apple-grey-dark rounded-b-3xl z-10" />

                  {/* WhatsApp interface */}
                  <div className="pt-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="bg-[#075E54] text-apple-white px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 bg-apple-white/20 rounded-full flex items-center justify-center text-xs font-semibold">
                        AI
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Business AI</div>
                        <div className="text-xs opacity-80">Online</div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {demoMessages.slice(0, currentMessage + 1).map((msg, index) => (
                        <motion.div
                          key={index}
                          className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.3 }}
                        >
                          <div
                            className={`max-w-[75%] px-4 py-2 rounded-2xl apple-shadow ${
                              msg.type === 'user'
                                ? 'bg-[#DCF8C6] rounded-tr-sm'
                                : 'bg-apple-white rounded-tl-sm'
                            }`}
                          >
                            <p className="text-sm text-apple-grey-dark">
                              <TypingText text={msg.text} delay={index * 800 + 500} />
                            </p>
                            <span className="text-xs text-apple-grey-dark/50 mt-1 block">
                              {new Date().toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-apple-white/50 backdrop-blur">
                      <div className="flex items-center gap-2 bg-apple-white rounded-full px-4 py-2 apple-shadow">
                        <div className="flex-1 flex items-center">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            className="bg-transparent text-sm outline-none flex-1"
                            disabled
                          />
                          <motion.div
                            className="w-0.5 h-4 bg-apple-grey-dark"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </div>
                        <Send size={18} className="text-apple-blue" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating animation effect */}
              <motion.div
                className="absolute -right-4 -top-4 w-24 h-24 bg-apple-blue/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
