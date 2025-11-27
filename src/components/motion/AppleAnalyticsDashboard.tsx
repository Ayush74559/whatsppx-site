import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  BarChart3,
  Users,
  MessageSquare,
  TrendingUp,
  Activity,
  Clock,
  Star,
  Settings,
  Bell,
  Search,
  Home,
  PieChart,
  Target
} from 'lucide-react';
import { CountUp } from './CountUp';

export const AppleAnalyticsDashboard: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Entry animation transforms
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const dashboardY = useTransform(scrollYProgress, [0, 0.2], [30, 0]);
  const dashboardBlur = useTransform(scrollYProgress, [0, 0.2], ['blur(8px)', 'blur(0px)']);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.2], [1.05, 1]);

  // Light sweep effect
  const lightSweep = useTransform(scrollYProgress, [0.1, 0.3], ['-100%', '100%']);

  // Sidebar animation
  const sidebarX = useTransform(scrollYProgress, [0.05, 0.15], [-100, 0]);

  // Card stagger animations
  const cardStagger = 0.15;

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="relative glass-card rounded-2xl overflow-hidden min-h-[800px] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-white/10"
        style={{
          opacity: dashboardOpacity,
          y: dashboardY,
          filter: dashboardBlur,
          scale: dashboardScale,
        }}
      >
        {/* Light sweep effect across entire dashboard */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none z-10"
          style={{ x: lightSweep }}
        />

        {/* Ambient edge glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow: 'inset 0 0 60px rgba(59, 130, 246, 0.1)',
            opacity: useTransform(scrollYProgress, [0.1, 0.4], [0, 0.3])
          }}
        />

        <div className="relative z-20 flex h-full">
          {/* Sidebar */}
          <motion.div
            className="w-64 bg-slate-800/50 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col"
            style={{ x: sidebarX }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Logo/Brand */}
            <motion.div
              className="flex items-center space-x-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {[
                { icon: Home, label: 'Dashboard', active: true },
                { icon: BarChart3, label: 'Analytics' },
                { icon: Users, label: 'Users' },
                { icon: MessageSquare, label: 'Messages' },
                { icon: Settings, label: 'Settings' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      item.active
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    whileHover={{ x: 4, backgroundColor: item.active ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <motion.div
                      animate={item.active && isInView ? { boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" } : {}}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                );
              })}
            </nav>

            {/* User Profile */}
            <motion.div
              className="mt-auto pt-6 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-white font-semibold text-sm">JD</span>
                </motion.div>
                <div>
                  <p className="text-white text-sm font-medium">John Doe</p>
                  <p className="text-slate-400 text-xs">Admin</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-hidden">
            {/* Header */}
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
                <p className="text-slate-400">Real-time insights and performance metrics</p>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-5 h-5 text-slate-400" />
                </motion.button>
                <motion.button
                  className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-5 h-5 text-slate-400" />
                </motion.button>
              </div>
            </motion.div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { icon: Users, label: 'Total Users', value: 12453, change: '+12.5%', color: 'blue' },
                { icon: MessageSquare, label: 'Messages', value: 45678, change: '+8.2%', color: 'green' },
                { icon: Activity, label: 'Engagement', value: 89.4, change: '+5.1%', color: 'purple', isPercentage: true },
                { icon: TrendingUp, label: 'Conversion', value: 23.7, change: '+15.3%', color: 'orange', isPercentage: true }
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-white/10 relative overflow-hidden group"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                    transition={{
                      delay: 0.8 + index * cardStagger,
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Card light sweep */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={isInView ? { x: '100%' } : { x: '-100%' }}
                      transition={{
                        duration: 1.5,
                        delay: 1.2 + index * cardStagger,
                        ease: "easeInOut"
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/10 flex items-center justify-center shadow-lg`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                          transition={{
                            delay: 1 + index * cardStagger,
                            duration: 0.8,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          <Icon className={`w-6 h-6 text-${metric.color}-400`} />
                        </motion.div>
                        <motion.span
                          className={`text-sm font-medium text-${metric.color}-400`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: 1.4 + index * cardStagger, duration: 0.5 }}
                        >
                          {metric.change}
                        </motion.span>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 1.2 + index * cardStagger, duration: 0.6 }}
                      >
                        <p className="text-slate-400 text-sm mb-2">{metric.label}</p>
                        <div className="text-2xl font-bold text-white">
                          <CountUp
                            from={0}
                            to={metric.value}
                            duration={2}
                            delay={1.4 + index * cardStagger}
                            decimals={metric.isPercentage ? 1 : 0}
                            trigger={isInView}
                          />
                          {metric.isPercentage && <span className="text-lg">%</span>}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Activity Chart */}
              <motion.div
                className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-lg font-semibold">Activity Overview</h3>
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"
                    animate={isInView ? { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" } : {}}
                    transition={{ delay: 2.2 }}
                  >
                    <Activity className="w-5 h-5 text-blue-400" />
                  </motion.div>
                </div>

                {/* Animated Chart */}
                <div className="h-48 flex items-end justify-between space-x-2">
                  {[35, 52, 38, 71, 49, 83, 62, 78, 55, 69, 44, 91].map((height, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm flex-1 relative"
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${height}%` } : { height: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 1.8 + index * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-blue-400/30 rounded-sm"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 2 + index * 0.1, duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Performance Metrics */}
              <motion.div
                className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white text-lg font-semibold">Performance</h3>
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center"
                    animate={isInView ? { boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" } : {}}
                    transition={{ delay: 2.4 }}
                  >
                    <Target className="w-5 h-5 text-green-400" />
                  </motion.div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'Response Time', value: 1.2, unit: 's', color: 'green' },
                    { label: 'Uptime', value: 99.9, unit: '%', color: 'blue' },
                    { label: 'Satisfaction', value: 4.8, unit: '/5', color: 'yellow' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                      transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
                    >
                      <span className="text-slate-400 text-sm">{item.label}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">
                          <CountUp
                            from={0}
                            to={item.value}
                            duration={1.5}
                            delay={2.2 + index * 0.2}
                            decimals={1}
                            trigger={isInView}
                          />
                          <span className="text-slate-400 text-sm ml-1">{item.unit}</span>
                        </span>
                        {item.label === 'Satisfaction' && (
                          <motion.div
                            className="flex space-x-1"
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ delay: 2.4 + index * 0.2, duration: 0.5 }}
                          >
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.div
                                key={star}
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : { scale: 0 }}
                                transition={{
                                  delay: 2.5 + index * 0.2 + star * 0.1,
                                  duration: 0.3,
                                  type: "spring"
                                }}
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    star <= Math.floor(item.value)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-slate-600'
                                  }`}
                                />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppleAnalyticsDashboard;