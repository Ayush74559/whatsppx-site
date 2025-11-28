import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import {
  MessageSquare,
  Bot,
  Zap,
  BarChart3,
  Users,
  Clock,
  Shield,
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AppleTextReveal from '@/components/motion/AppleTextReveal';
import ScrollTextReveal from '@/components/motion/ScrollTextReveal';
import { AppleFeatureGrid } from '@/components/motion/AppleFeatureGrid';
import AppleFlowDiagram from '@/components/motion/AppleFlowDiagram';
import AppleStorytelling from '@/components/motion/AppleStorytelling';
import { PremiumWhatsAppMockup } from '@/components/motion/PremiumWhatsAppMockup';
import AppleDashboardReveal from '@/components/motion/AppleDashboardReveal';
import AppleAnalyticsDashboard from '@/components/motion/AppleAnalyticsDashboard';
import CinematicLetterReveal from '@/components/motion/CinematicLetterReveal';

const ShowcaseTitle: React.FC = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={titleRef}
      className="apple-h2 apple-heading-tight white-intense"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isTitleInView ? {
        opacity: 1,
        scale: 1,
        y: 0
      } : {
        opacity: 0,
        scale: 0.8,
        y: 20
      }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      Product UI <span className="gradient-text">Showcase</span>
    </motion.div>
  );
};

const ShowcaseSubtitle: React.FC = () => {
  const subtitleRef = useRef(null);
  const isSubtitleInView = useInView(subtitleRef, { once: false, margin: "-100px" });

  return (
    <motion.p
      ref={subtitleRef}
      className="apple-body white-intense max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={isSubtitleInView ? {
        opacity: 1,
        scale: 1,
        y: 0
      } : {
        opacity: 0,
        scale: 0.8,
        y: 20
      }}
      transition={{
        duration: 1.2,
        delay: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      A glimpse of the dashboard and analytics with Apple-like spacing and clarity.
    </motion.p>
  );
};

const features = [
  {
    icon: Bot,
    title: 'AI-Powered Replies',
    description: 'Intelligent chatbot that understands context and responds naturally in multiple languages',
  },
  {
    icon: Zap,
    title: 'Instant Auto-Replies',
    description: 'Set up keyword-based auto responses, greetings, and away messages in seconds',
  },
  {
    icon: MessageSquare,
    title: 'Smart Message Flows',
    description: 'Build conversation flows with menus, buttons, and conditional logic',
  },
  {
    icon: Users,
    title: 'Built-in CRM',
    description: 'Track customer conversations, add notes, tags, and manage leads effectively',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time insights on messages, response rates, and customer engagement',
  },
  {
    icon: Globe,
    title: 'Broadcast Messages',
    description: 'Send bulk messages to segmented customer lists with delivery tracking',
  },
  {
    icon: Clock,
    title: '24/7 Automation',
    description: 'Never miss a customer message with round-the-clock automated responses',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with 99.9% uptime guarantee',
  },
];

const professionalFeatures = [
  {
    icon: Bot,
    title: 'Advanced AI Conversations',
    description: 'Context-aware AI that learns from interactions and provides increasingly intelligent responses',
  },
  {
    icon: Globe,
    title: 'Multi-Language Intelligence',
    description: 'Automatic language detection and translation for seamless global customer support',
  },
  {
    icon: Users,
    title: 'Enterprise CRM Integration',
    description: 'Seamlessly connect with Salesforce, HubSpot, and other major CRM platforms',
  },
  {
    icon: MessageSquare,
    title: 'Custom Workflow Builder',
    description: 'Drag-and-drop interface to create complex automation flows with conditional logic',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics & Reporting',
    description: 'Deep insights with predictive analytics, customer sentiment analysis, and ROI tracking',
  },
  {
    icon: Shield,
    title: 'Enterprise Security & Compliance',
    description: 'GDPR compliant with end-to-end encryption, audit logs, and role-based access control',
  },
  {
    icon: Zap,
    title: 'API & Webhook Integrations',
    description: 'Connect with your existing tools via REST APIs and real-time webhook notifications',
  },
  {
    icon: Clock,
    title: 'Priority Support & SLA',
    description: 'Dedicated account manager with guaranteed response times and 24/7 technical support',
  },
];

const showcaseFeatures = [
  {
    title: 'Dashboard',
    description: 'Real-time insights and widget panels for your conversations.',
    videoSrc: '/media/vedios/Dashboard.mp4',
  },
  {
    title: 'Analytics',
    description: 'Track response times, engagement, and conversion metrics.',
    videoSrc: '/media/vedios/Analytics.mp4',
  },
  {
    title: 'Automation Flows',
    description: 'Visual flow builder with conditional logic and actions.',
    videoSrc: '/media/vedios/Automation Flows.mp4',
  },
];

const plans = [
  {
    name: 'Starter',
    price: '₹499',
    period: '/month',
    features: [
      '1,000 messages/month',
      'Basic auto-replies',
      'Up to 500 contacts',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    name: 'Business',
    price: '₹999',
    period: '/month',
    popular: true,
    features: [
      '5,000 messages/month',
      'AI-powered replies',
      'Up to 2,500 contacts',
      'Priority support',
      'Advanced analytics',
      'Custom flows',
      'CRM integration',
    ],
  },
  {
    name: 'Pro',
    price: '₹1,999',
    period: '/month',
    features: [
      'Unlimited messages',
      'Advanced AI features',
      'Unlimited contacts',
      '24/7 support',
      'Full analytics suite',
      'Custom integrations',
      'Dedicated account manager',
      'White-label option',
    ],
  },
  {
    name: 'Lifetime',
    price: '₹2,999',
    period: 'one-time',
    features: [
      'Everything in Pro',
      'Lifetime access',
      'No monthly fees',
      'All future updates',
      'Priority support forever',
    ],
  },
];

const FeaturesGrid: React.FC<{ features: typeof features }> = ({ features }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Calculate rows for staggered row-by-row animation
  const itemsPerRow = {
    base: 1, // Mobile: 1 column
    md: 2,   // Tablet: 2 columns
    lg: 4    // Desktop: 4 columns
  };

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;

        // Calculate row and column for staggered animation
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;

        let rowDelay = 0;
        if (isMobile) {
          rowDelay = index * 0.15; // Simple staggered for mobile
        } else if (isTablet) {
          const row = Math.floor(index / 2);
          rowDelay = row * 0.2; // Row by row for tablet
        } else {
          const row = Math.floor(index / 4);
          rowDelay = row * 0.25; // Row by row for desktop
        }

        const itemDelay = isMobile ? 0 : (index % (isTablet ? 2 : 4)) * 0.1;

        return (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.96,
              filter: 'blur(6px)'
            }}
            animate={isInView ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)'
            } : {
              opacity: 0,
              y: 24,
              scale: 0.96,
              filter: 'blur(6px)'
            }}
            transition={{
              duration: 1.2,
              delay: rowDelay + itemDelay,
              ease: [0.25, 0.1, 0.25, 1], // Apple-like smooth easing
            }}
            whileHover={{
              y: -12,
              scale: 1.02,
              transition: {
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }}
            className="relative group"
          >
            {/* Enhanced glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <Card className="white-card p-6 backdrop-blur-xl border border-white/20 shadow-lg relative overflow-hidden transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-2xl">
              <div className="relative z-10">
                {/* Icon with enhanced animations */}
                <div className="mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg relative overflow-hidden"
                    whileHover={{
                      boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Icon glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-30 blur-md"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      animate={isInView ? {
                        scale: [0.8, 1.1, 1],
                        rotate: [0, 5, 0]
                      } : { scale: 0.8 }}
                      transition={{
                        duration: 0.8,
                        delay: rowDelay + itemDelay + 0.3,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                    >
                      <Icon className="w-6 h-6 text-white relative z-10" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content with enhanced hover effects */}
                <motion.h3
                  className="apple-h3 mb-2 transition-all duration-300 group-hover:text-primary"
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.8,
                    delay: rowDelay + itemDelay + 0.4,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p
                  className="apple-body transition-all duration-300 group-hover:text-white/90"
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.8,
                    delay: rowDelay + itemDelay + 0.6,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  {feature.description}
                </motion.p>
              </div>

              {/* Subtle border animation */}
              <motion.div
                className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/30"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export function Landing() {
  return (
    <div className="min-h-screen bg-black safe-area-top safe-area-bottom">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 bg-black pointer-events-none flex items-start justify-start pt-4 overflow-hidden">
          <video
            src="/media/vedios/homex.mp4"
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-w-[99vw] h-auto object-cover opacity-45"
            style={{ maxHeight: '99vh' }}
          />
        </div>
        <div className="section-container relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in relative z-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-border/50 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium white-intense">AI-Powered WhatsApp Automation</span>
            </div>
            <AppleTextReveal className="mb-6">ReinventYourWhatsAppBusiness</AppleTextReveal>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Automate conversations, manage customers, and grow faster — with the simplicity of Apple-level design.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-primary text-lg px-8 hover-glow">
                  Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#about">
                <Button size="lg" variant="outline" className="text-lg px-8 white-intense border-white/30">
                  Learn More
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 14-day free trial
            </p>
          </div>

          {/* Hero Video */}
          <div className="mt-24 md:mt-28">
            <div className="glass-card rounded-2xl p-8 max-w-5xl mx-auto hover-glow mockup-float">
              <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <video
                  src="/media/vedios/WhatsAppBusiness.mp4"
                  aria-hidden="true"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium WhatsApp Mockup Section */}
      <PremiumWhatsAppMockup />

      {/* Product UI Showcase */}
      <section id="showcase" className="py-20 px-4 bg-black">
        <div className="section-container">
          <div className="text-center mb-12">
            <ShowcaseTitle />
            <ShowcaseSubtitle />
          </div>

          <div className="mb-10">
            <AppleAnalyticsDashboard />
          </div>


          <AppleFeatureGrid features={showcaseFeatures} />
        </div>
      </section>

      {/* Automation Flow Section */}
      <section id="flow" className="py-20 px-4 flow-gradient">
        <div className="section-container">
          <div className="text-center mb-12">
            <ScrollTextReveal className="apple-h2 apple-heading-tight white-intense">
              Automation Flow
            </ScrollTextReveal>
            <ScrollTextReveal className="apple-body white-intense max-w-2xl mx-auto" delay={0.1}>
              Create conditional, multi-step flows with buttons, menus and integrations.
            </ScrollTextReveal>
          </div>

          <AppleFlowDiagram />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-muted/30">
        <AppleStorytelling
          title="Revolutionizing Business Communication on WhatsApp"
          subtitle="WhatsAppX is a cutting-edge SaaS platform designed to help businesses automate, manage, and scale their WhatsApp communication effortlessly. We combine the power of AI with intuitive automation tools to transform how you engage with customers."
          features={[
            {
              title: "Save Time with Automation",
              description: "Automate repetitive tasks and let AI handle common queries, freeing up your team for complex customer needs."
            },
            {
              title: "Increase Sales & Engagement",
              description: "Never miss a lead with 24/7 automated responses and intelligent conversation flows that guide customers to purchase."
            },
            {
              title: "Built for Scale",
              description: "From startups to enterprises, WhatsAppX grows with your business, handling thousands of conversations simultaneously."
            }
          ]}
          stats={[
            { number: "10,000+", label: "Active Users" },
            { number: "5M+", label: "Messages Processed" },
            { number: "99.9%", label: "Uptime" }
          ]}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 dark-section">
        <div className="section-container">
          <div className="text-center mb-16">
            <CinematicLetterReveal className="apple-h2 apple-heading-tight white-intense mb-4">
              Business, Made Smarter.
            </CinematicLetterReveal>
            <ScrollTextReveal className="apple-body white-intense max-w-2xl mx-auto" delay={0.1}>
              One platform for automation, engagement, and growth.
            </ScrollTextReveal>
          </div>

          <FeaturesGrid features={features} />
        </div>
      </section>

      {/* Professional Automation Section */}
      <section id="professional" className="py-20 px-4 dark-section">
        <div className="section-container">
          <div className="text-center mb-16">
            <CinematicLetterReveal className="apple-h2 apple-heading-tight white-intense mb-4">
              Professional Automation Suite
            </CinematicLetterReveal>
            <ScrollTextReveal className="apple-body white-intense max-w-2xl mx-auto" delay={0.1}>
              Enterprise-grade features for businesses that demand the highest level of intelligence and reliability
            </ScrollTextReveal>
          </div>

          <FeaturesGrid features={professionalFeatures} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 dark-section">
        <div className="section-container">
          <div className="text-center mb-16">
            <ScrollTextReveal className="apple-h2 apple-heading-tight white-intense mb-4">
              Simple, <span className="apple-h2 white-intense">Transparent Pricing</span>
            </ScrollTextReveal>
            <ScrollTextReveal className="apple-body white-intense max-w-2xl mx-auto" delay={0.1}>
              Choose the perfect plan for your business. No hidden fees.
            </ScrollTextReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`white-card p-6 relative hover-glow ${
                  plan.popular ? 'border-2 border-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-whatsapp flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button
                    className={`w-full ${
                      plan.popular ? 'bg-gradient-primary text-white' : 'bg-secondary text-white'
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="section-container">
          <div className="glass-card rounded-2xl p-12 text-center max-w-4xl mx-auto hover-glow">
            <h2 className="text-4xl font-bold mb-4 white-intense">
              Ready to Transform Your <span className="gradient-text">Customer Experience?</span>
            </h2>
            <p className="text-xl white-intense mb-8">
              Join hundreds of businesses automating their WhatsApp communication
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary text-lg px-8">
                Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold gradient-text">WhatsAppX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 WhatsAppX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
