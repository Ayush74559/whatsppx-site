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
import AppleTextReveal from '@/components/motion/AppleTextReveal';

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

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-whatsapp/10 pointer-events-none" />
        <div className="section-container relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in relative z-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-border/50 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium white-intense">AI-Powered WhatsApp Automation</span>
            </div>
            <AppleTextReveal className="mb-6">Reinvent Your WhatsApp Business</AppleTextReveal>
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

          {/* Hero Image/Mockup */}
          <div className="mt-24 md:mt-28">
            <div className="glass-card rounded-2xl p-8 max-w-5xl mx-auto hover-glow mockup-float">
              <div className="rounded-xl h-80 md:h-[560px] lg:h-[700px] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 to-whatsapp/10">
                <div className="w-full h-full relative hero-mockup-viewport">
                  <video
                    src="/media/vedios/WhatsAppBusiness.mp4"
                    aria-hidden="true"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <img
                    src="/media/hero-mockup.svg"
                    alt="WhatsAppX mockup"
                    className="absolute inset-0 w-full h-full object-cover object-[center_70%]"
                  />

                  {/* subtle top overlay to hide green/top area and keep heading readable */}
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background/90 to-transparent pointer-events-none" />

                  {/* subtle bottom overlay so caption separation is readable */}
                  <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                <div className="w-full text-center px-6 mt-4 animate-slide-up">
                  <h3 className="text-lg md:text-xl font-extrabold gradient-text mb-2">
                    Transform customer conversations with AI
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    Smart automation, AI-generated replies, and powerful analytics to boost sales
                    and engagement — all from one unified WhatsApp inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Interaction Section */}
      <section id="demo" className="py-20 px-4">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h2 className="text-4xl font-bold mb-4 apple-h2 white-intense">Type anything. <span className="white-intense">AI does everything.</span></h2>
              <p className="apple-body white-intense mb-6">Instantly generate replies, build flows, and preview automation — all within an iPhone-like mockup. Try typing a customer question and see AI compose a context-aware response.</p>
              <div className="flex items-center space-x-4">
                <Link to="/signup">
                  <Button className="bg-gradient-primary">Try Live Demo</Button>
                </Link>
                <a href="#pricing">
                  <Button variant="outline" className="white-intense border-white/30">See Pricing</Button>
                </a>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="max-w-none mx-auto flex justify-center items-start">
                <div className="w-[360px] h-[720px] overflow-hidden relative bg-transparent">
                  <img src="/media/0a68a4e3-47c3-4684-a0d5-e2855dbc71b0.png" alt="iPhone mockup screenshot" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product UI Showcase */}
      <section id="showcase" className="py-20 px-4 dark-section">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="apple-h2 apple-heading-tight white-intense">Product UI <span className="gradient-text">Showcase</span></h2>
            <p className="apple-body white-intense max-w-2xl mx-auto">A glimpse of the dashboard and analytics with Apple-like spacing and clarity.</p>
          </div>

          <div className="mb-10">
            <div className="showcase-mockup glass-card p-6 hover-glow mockup-float">
              <img src="/media/Screenshot%202025-11-26%20at%202.58.40%E2%80%AFPM.png" alt="dashboard large" className="mockup-viewport rounded-md dashboard-large" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="white-card p-6 hover-glow animate-scale-in showcase-card">
              <div className="w-full rounded-md overflow-hidden mb-4 analytics-video" style={{height: 180}}>
                <video
                  src="/media/vedios/Dashboard.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="analytics-video__media"
                  aria-hidden
                />
              </div>
              <div className="card-body">
                <h3 className="apple-h3 mb-2">Dashboard</h3>
                <p className="apple-body">Real-time insights and widget panels for your conversations.</p>
              </div>
            </Card>
            <Card className="white-card p-6 hover-glow animate-scale-in showcase-card">
              <div className="w-full rounded-md overflow-hidden mb-4 analytics-video" style={{height: 180}}>
                <video
                  src="/media/vedios/Analytics.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="analytics-video__media"
                  aria-hidden
                />
              </div>
              <div className="card-body">
                <h3 className="apple-h3 mb-2">Analytics</h3>
                <p className="apple-body">Track response times, engagement, and conversion metrics.</p>
              </div>
            </Card>
            <Card className="white-card p-6 hover-glow animate-scale-in showcase-card">
              <div className="w-full rounded-md overflow-hidden mb-4 analytics-video" style={{height: 180}}>
                <video
                  src={encodeURI('/media/vedios/Automation Flows.mp4')}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="analytics-video__media"
                  aria-hidden
                />
              </div>
              <div className="card-body">
                <h3 className="apple-h3 mb-2">Automation Flows</h3>
                <p className="apple-body">Visual flow builder with conditional logic and actions.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Automation Flow Section */}
      <section id="flow" className="py-20 px-4 flow-gradient">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="apple-h2 apple-heading-tight white-intense">Automation Flow</h2>
            <p className="apple-body white-intense max-w-2xl mx-auto">Create conditional, multi-step flows with buttons, menus and integrations.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center md:space-x-6 space-y-6 md:space-y-0">
            <Card className="white-card white-card--intense p-6 w-64 md:w-72 text-center hover-glow animate-slide-up">
              <Bot className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="apple-h3 mb-1">Trigger</h4>
              <p className="apple-body">Incoming message, keyword, or webhook</p>
            </Card>
            <div className="hidden md:block h-0.5 w-20 bg-border self-center" />
            <Card className="white-card white-card--intense p-6 w-64 md:w-72 text-center hover-glow animate-slide-up">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="apple-h3 mb-1">Condition</h4>
              <p className="apple-body">Check customer profile or keywords</p>
            </Card>
            <div className="hidden md:block h-0.5 w-20 bg-border self-center" />
            <Card className="white-card white-card--intense p-6 w-64 md:w-72 text-center hover-glow animate-slide-up">
              <Zap className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="apple-h3 mb-1">Action</h4>
              <p className="apple-body">Send message, tag, or create ticket</p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-border/50 mb-6">
                <MessageSquare className="w-4 h-4 text-whatsapp" />
                <span className="text-sm font-medium white-intense">About WhatsAppX</span>
              </div>
              <h2 className="apple-h2 apple-heading-tight white-intense mb-6">
                Revolutionizing Business Communication on{' '}
                <span className="gradient-text">WhatsApp</span>
              </h2>
              <p className="apple-body white-intense mb-6">
                WhatsAppX is a cutting-edge SaaS platform designed to help businesses automate,
                manage, and scale their WhatsApp communication effortlessly. We combine the power of
                AI with intuitive automation tools to transform how you engage with customers.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-whatsapp/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-whatsapp" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Save Time with Automation</h3>
                    <p className="text-sm text-muted-foreground">
                      Automate repetitive tasks and let AI handle common queries, freeing up your team
                      for complex customer needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Increase Sales & Engagement</h3>
                    <p className="text-sm text-muted-foreground">
                      Never miss a lead with 24/7 automated responses and intelligent conversation
                      flows that guide customers to purchase.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Built for Scale</h3>
                    <p className="text-sm text-muted-foreground">
                      From startups to enterprises, WhatsAppX grows with your business, handling
                      thousands of conversations simultaneously.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-3xl font-bold gradient-text">10,000+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text">5M+</p>
                  <p className="text-sm text-muted-foreground">Messages Processed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold gradient-text">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="glass-card rounded-2xl p-8 hover-glow">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-whatsapp/10 rounded-lg border border-whatsapp/20">
                    <div className="w-12 h-12 rounded-full bg-whatsapp flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
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
                      <Zap className="w-6 h-6 text-white" />
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
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Enterprise Security</p>
                      <p className="text-sm text-muted-foreground">
                        End-to-end encryption & GDPR compliant
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Advanced Analytics</p>
                      <p className="text-sm text-muted-foreground">
                        Real-time insights and performance tracking
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 dark-section">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="apple-h2 apple-heading-tight white-intense mb-4">
              Powerful Features for <span className="gradient-text">Growing Businesses</span>
            </h2>
            <p className="apple-body white-intense max-w-2xl mx-auto">
              Everything you need to automate, engage, and convert customers on WhatsApp
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="white-card p-6 hover-glow animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="apple-h3 mb-2">{feature.title}</h3>
                  <p className="apple-body">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="apple-h2 apple-heading-tight white-intense mb-4">
              Simple, <span className="apple-h2 white-intense">Transparent Pricing</span>
            </h2>
            <p className="apple-body white-intense max-w-2xl mx-auto">
              Choose the perfect plan for your business. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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

      {/* CTA Section */}
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
