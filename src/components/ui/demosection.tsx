import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send } from 'lucide-react';

const demoMessages = [
  { type: 'user', text: 'Hello, I need product info' },
  { type: 'ai', text: 'Hi! I\'d be happy to help. What product are you interested in?' },
  { type: 'user', text: 'Your premium package' },
  { type: 'ai', text: 'Our Premium package includes AI automation, analytics, and 24/7 support. Would you like to schedule a demo?' },
];

export default function DemoSection() {
  const [currentMessage, setCurrentMessage] = useState(0);

  return (
    <section id="demo" className="py-apple-lg bg-apple-grey apple-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-display font-semibold text-apple-grey-dark mb-6">
              Type anything.
              <br />
              AI does everything.
            </h2>
            <p className="text-xl text-apple-grey-dark/60 mb-8 leading-relaxed">
              Watch how our AI handles customer conversations with natural language understanding and instant responses.
            </p>

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
              whileHover={{ scale: 1.05 }}
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
            <div className="relative mx-auto max-w-[380px]">
              <div className="aspect-[9/19.5] bg-apple-grey-dark rounded-[3rem] p-3 apple-shadow-lg">
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
                            <p className="text-sm text-apple-grey-dark">{msg.text}</p>
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
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="flex-1 bg-transparent text-sm outline-none"
                          disabled
                        />
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
