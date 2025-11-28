import React, { useState, useEffect } from 'react';
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
  Target,
  Zap,
  Brain
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { CountUp } from './CountUp';
import CinematicLetterReveal from './CinematicLetterReveal';

// Section Components
const AnalyticsSection = ({ isInView, isMobile, cardStagger, messageVolumeData, responseTimeData }: any) => (
  <motion.div
    key="analytics"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
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
            className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 relative overflow-hidden group shadow-xl shadow-slate-900/20"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(30, 41, 59, 0.5) 50%, rgba(15, 23, 42, 0.6) 100%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
            transition={{
              delay: 0.8 + index * cardStagger,
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            whileHover={isMobile ? {} : {
              y: -16,
              scale: 1.08,
              boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 40px rgba(59, 130, 246, 0.25), 0 0 80px rgba(147, 51, 234, 0.1)",
              transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 20 }
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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Message Volume Chart */}
      <motion.div
        className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-xl shadow-slate-900/20"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(30, 41, 59, 0.5) 50%, rgba(15, 23, 42, 0.6) 100%)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        whileHover={isMobile ? {} : {
          scale: 1.02,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(59, 130, 246, 0.15)",
          transition: { duration: 0.3 }
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <CinematicLetterReveal
            className="text-white text-lg font-semibold"
            delay={1.8}
            letterDelay={0.03}
          >
            Message Volume
          </CinematicLetterReveal>
          <motion.div
            className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center"
            animate={isInView ? { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" } : {}}
            transition={{ delay: 2.2 }}
          >
            <MessageSquare className="w-5 h-5 text-blue-400" />
          </motion.div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={messageVolumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#1F2937' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Response Time Chart */}
      <motion.div
        className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-xl shadow-slate-900/20"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(30, 41, 59, 0.5) 50%, rgba(15, 23, 42, 0.6) 100%)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        whileHover={isMobile ? {} : {
          scale: 1.02,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(34, 197, 94, 0.15)",
          transition: { duration: 0.3 }
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <CinematicLetterReveal
            className="text-white text-lg font-semibold"
            delay={2.0}
            letterDelay={0.03}
          >
            Response Time
          </CinematicLetterReveal>
          <motion.div
            className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center"
            animate={isInView ? { boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" } : {}}
            transition={{ delay: 2.4 }}
          >
            <Clock className="w-5 h-5 text-green-400" />
          </motion.div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={responseTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Area
              type="monotone"
              dataKey="responseTime"
              stroke="#10B981"
              fill="url(#responseTimeGradient)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="responseTimeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  </motion.div>
);

const UsersSection = ({ isInView }: any) => (
  <motion.div
    key="users"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-6"
  >
    {/* User Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { label: 'Active Users', value: '2,847', change: '+5.2%', color: 'green' },
        { label: 'New Signups', value: '156', change: '+12.8%', color: 'blue' },
        { label: 'User Retention', value: '94.2%', change: '+2.1%', color: 'purple' }
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
        >
          <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
          <div className={`text-sm font-medium text-${stat.color}-400`}>{stat.change}</div>
        </motion.div>
      ))}
    </div>

    {/* User List */}
    <motion.div
      className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <h3 className="text-white text-lg font-semibold mb-6">Recent Users</h3>
      <div className="space-y-4">
        {[
          { name: 'Sarah Chen', email: 'sarah@example.com', status: 'Active', avatar: 'SC' },
          { name: 'Mike Johnson', email: 'mike@example.com', status: 'Active', avatar: 'MJ' },
          { name: 'Emma Davis', email: 'emma@example.com', status: 'Inactive', avatar: 'ED' },
          { name: 'Alex Rodriguez', email: 'alex@example.com', status: 'Active', avatar: 'AR' },
          { name: 'Lisa Wang', email: 'lisa@example.com', status: 'Active', avatar: 'LW' }
        ].map((user, index) => (
          <motion.div
            key={user.email}
            className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                {user.avatar}
              </div>
              <div>
                <div className="text-white font-medium">{user.name}</div>
                <div className="text-slate-400 text-sm">{user.email}</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {user.status}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const MessagesSection = ({ isInView }: any) => (
  <motion.div
    key="messages"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-6"
  >
    {/* Message Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Total Messages', value: '45,678', icon: MessageSquare, color: 'blue' },
        { label: 'Active Chats', value: '127', icon: Activity, color: 'green' },
        { label: 'Avg Response', value: '1.2m', icon: Clock, color: 'purple' },
        { label: 'Satisfaction', value: '4.8/5', icon: Star, color: 'yellow' }
      ].map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
          >
            <Icon className={`w-8 h-8 text-${stat.color}-400 mx-auto mb-3`} />
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-slate-400 text-sm">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>

    {/* Recent Conversations */}
    <motion.div
      className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <h3 className="text-white text-lg font-semibold mb-6">Recent Conversations</h3>
      <div className="space-y-4">
        {[
          { customer: 'John Smith', lastMessage: 'Thank you for the quick response!', time: '2 min ago', unread: 2 },
          { customer: 'Maria Garcia', lastMessage: 'Can I schedule an appointment?', time: '5 min ago', unread: 0 },
          { customer: 'David Wilson', lastMessage: 'The product arrived damaged', time: '12 min ago', unread: 1 },
          { customer: 'Anna Lee', lastMessage: 'Payment confirmation received', time: '18 min ago', unread: 0 },
          { customer: 'Robert Brown', lastMessage: 'When will the order ship?', time: '25 min ago', unread: 3 }
        ].map((conversation, index) => (
          <motion.div
            key={conversation.customer}
            className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="text-white font-medium">{conversation.customer}</div>
                <div className="text-slate-400 text-sm">{conversation.time}</div>
              </div>
              <div className="text-slate-300 text-sm truncate">{conversation.lastMessage}</div>
            </div>
            {conversation.unread > 0 && (
              <div className="ml-4 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {conversation.unread}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const SettingsSection = ({ isInView }: any) => (
  <motion.div
    key="settings"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="space-y-6"
  >
    {/* Settings Categories */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* General Settings */}
      <motion.div
        className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
          <Settings className="w-5 h-5 mr-3 text-blue-400" />
          General Settings
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Business Name', value: 'WhatsAppX', type: 'text' },
            { label: 'Business Email', value: 'support@whatsappx.com', type: 'email' },
            { label: 'Timezone', value: 'UTC+5:30 (IST)', type: 'select' },
            { label: 'Language', value: 'English', type: 'select' }
          ].map((setting, index) => (
            <motion.div
              key={setting.label}
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            >
              <label className="text-slate-300 text-sm font-medium">{setting.label}</label>
              <div className="text-white text-sm bg-slate-700/50 px-3 py-1 rounded-lg">
                {setting.value}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
          <Bell className="w-5 h-5 mr-3 text-green-400" />
          Notifications
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Email Notifications', enabled: true },
            { label: 'Push Notifications', enabled: true },
            { label: 'SMS Alerts', enabled: false },
            { label: 'Weekly Reports', enabled: true }
          ].map((notification, index) => (
            <motion.div
              key={notification.label}
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <label className="text-slate-300 text-sm font-medium">{notification.label}</label>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${
                notification.enabled ? 'bg-blue-500' : 'bg-slate-600'
              }`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  notification.enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* API & Integration Settings */}
    <motion.div
      className="bg-gradient-to-br from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
        <Zap className="w-5 h-5 mr-3 text-purple-400" />
        API & Integrations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'WhatsApp Business API', status: 'Connected', color: 'green' },
          { name: 'Stripe Payments', status: 'Connected', color: 'blue' },
          { name: 'Google Analytics', status: 'Disconnected', color: 'red' },
          { name: 'Slack Integration', status: 'Connected', color: 'purple' }
        ].map((integration, index) => (
          <motion.div
            key={integration.name}
            className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
          >
            <div>
              <div className="text-white font-medium text-sm">{integration.name}</div>
              <div className={`text-xs font-medium text-${integration.color}-400`}>{integration.status}</div>
            </div>
            <div className={`w-3 h-3 rounded-full bg-${integration.color}-500`} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export const AppleAnalyticsDashboard: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('Analytics');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock data for charts
  const messageVolumeData = [
    { time: '00:00', volume: 120 },
    { time: '04:00', volume: 80 },
    { time: '08:00', volume: 250 },
    { time: '12:00', volume: 380 },
    { time: '16:00', volume: 420 },
    { time: '20:00', volume: 290 },
    { time: '23:59', volume: 180 }
  ];

  const responseTimeData = [
    { time: 'Mon', responseTime: 1.2 },
    { time: 'Tue', responseTime: 1.1 },
    { time: 'Wed', responseTime: 1.4 },
    { time: 'Thu', responseTime: 0.9 },
    { time: 'Fri', responseTime: 1.3 },
    { time: 'Sat', responseTime: 1.0 },
    { time: 'Sun', responseTime: 1.5 }
  ];


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Enhanced smooth entry animation transforms
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const dashboardY = useTransform(scrollYProgress, [0, 0.4], isMobile ? [20, 0] : [40, 0]);
  const dashboardBlur = useTransform(scrollYProgress, [0, 0.4], isMobile ? ['blur(2px)', 'blur(0px)'] : ['blur(8px)', 'blur(0px)']);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.4], isMobile ? [1.02, 1] : [1.08, 1]);
  const dashboardRotateX = useTransform(scrollYProgress, [0, 0.4], isMobile ? [2, 0] : [5, 0]);

  // Light sweep effect
  const lightSweep = useTransform(scrollYProgress, [0.15, 0.4], ['-100%', '100%']);

  // Sidebar animation
  const sidebarX = useTransform(scrollYProgress, [0.1, 0.2], [-100, 0]);

  // Card stagger animations
  const cardStagger = 0.2;

  return (
    <div ref={containerRef} className="relative" style={{ position: 'relative' }}>
      <motion.div
        className="relative glass-card rounded-2xl overflow-hidden min-h-[800px] bg-gradient-to-br from-slate-900/98 via-slate-800/96 to-slate-900/98 backdrop-blur-3xl border border-white/20 shadow-2xl shadow-slate-900/50"
        style={{
          opacity: dashboardOpacity,
          y: dashboardY,
          filter: dashboardBlur,
          scale: dashboardScale,
          rotateX: dashboardRotateX,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 50%, rgba(15, 23, 42, 0.98) 100%)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1],
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
      >
        {/* Ultra-smooth light sweep effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10"
          style={{
            x: lightSweep,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)'
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Fluid multi-layered ambient glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 100px rgba(59, 130, 246, 0.2), inset 0 0 200px rgba(147, 51, 234, 0.1), inset 0 0 300px rgba(6, 182, 212, 0.05), 0 0 150px rgba(59, 130, 246, 0.15)',
            opacity: useTransform(scrollYProgress, [0.15, 0.7], [0, 0.5])
          }}
          transition={{
            duration: 2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        />

        {/* Smooth inner highlight with breathing effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(59,130,246,0.03) 70%, rgba(147,51,234,0.02) 100%)',
            opacity: useTransform(scrollYProgress, [0.2, 0.8], [0, 0.7])
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        <div className="relative z-20 flex h-full">
          {/* Premium Sidebar */}
          <motion.div
            className="w-64 bg-gradient-to-b from-slate-800/60 via-slate-800/50 to-slate-900/60 backdrop-blur-2xl border-r border-white/20 p-6 flex flex-col shadow-2xl shadow-slate-900/30"
            style={{
              x: sidebarX,
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(30, 41, 59, 0.5) 50%, rgba(15, 23, 42, 0.6) 100%)',
              boxShadow: '2px 0 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
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
                { icon: Home, label: 'Dashboard', id: 'Dashboard' },
                { icon: BarChart3, label: 'Analytics', id: 'Analytics' },
                { icon: Users, label: 'Users', id: 'Users' },
                { icon: MessageSquare, label: 'Messages', id: 'Messages' },
                { icon: Settings, label: 'Settings', id: 'Settings' }
              ].map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.label}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    whileHover={isMobile ? {} : { x: 4, backgroundColor: isActive ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)' }}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <motion.div
                      animate={isActive && isInView ? { boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" } : {}}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    <CinematicLetterReveal
                      className="text-sm font-medium"
                      delay={0.5 + index * 0.1}
                      letterDelay={0.02}
                    >
                      {item.label}
                    </CinematicLetterReveal>
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
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                >
                  <span className="text-white font-semibold text-sm">JD</span>
                </motion.div>
                <div>
                  <CinematicLetterReveal
                    className="text-white text-sm font-medium"
                    delay={1.4}
                    letterDelay={0.03}
                  >
                    John Doe
                  </CinematicLetterReveal>
                  <CinematicLetterReveal
                    className="text-slate-400 text-xs"
                    delay={1.6}
                    letterDelay={0.04}
                  >
                    Admin
                  </CinematicLetterReveal>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-hidden">
            {/* Header - Dynamic */}
            <motion.div
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div>
                <CinematicLetterReveal
                  className="text-2xl font-thin text-white tracking-tight"
                  delay={0.8}
                  style={{
                    fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {activeSection}
                </CinematicLetterReveal>
                <motion.p
                  className="text-slate-400 text-sm mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  {activeSection === 'Analytics' && 'Real-time insights and performance metrics'}
                  {activeSection === 'Users' && 'User management and analytics'}
                  {activeSection === 'Messages' && 'Message history and conversations'}
                  {activeSection === 'Settings' && 'System configuration and preferences'}
                  {activeSection === 'Dashboard' && 'Overview and key metrics'}
                </motion.p>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={isMobile ? {} : { scale: 0.95 }}
                >
                  <Bell className="w-5 h-5 text-slate-400" />
                </motion.button>
                <motion.button
                  className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={isMobile ? {} : { scale: 0.95 }}
                >
                  <Search className="w-5 h-5 text-slate-400" />
                </motion.button>
              </div>
            </motion.div>

            {/* Dynamic Content Based on Active Section */}
            {activeSection === 'Analytics' && (
              <AnalyticsSection
                isInView={isInView}
                isMobile={isMobile}
                cardStagger={cardStagger}
                messageVolumeData={messageVolumeData}
                responseTimeData={responseTimeData}
              />
            )}

            {activeSection === 'Users' && (
              <UsersSection isInView={isInView} />
            )}

            {activeSection === 'Messages' && (
              <MessagesSection isInView={isInView} />
            )}

            {activeSection === 'Settings' && (
              <SettingsSection isInView={isInView} />
            )}

            {activeSection === 'Dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <BarChart3 className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">Welcome to WhatsAppX</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Select a section from the sidebar to explore analytics, user management, messaging, and settings.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppleAnalyticsDashboard;