import React from 'react';
import { Link } from 'react-router-dom';
import AppleTextReveal from '@/components/motion/AppleTextReveal';
import { Button } from '@/components/ui/button';

const Meta: React.FC = () => {
  React.useEffect(() => {
    document.title = 'About — Ayush Jaat · WhatsApp X';
    const description = document.querySelector("meta[name='description']");
    if (description) {
      description.setAttribute('content', 'Ayush Jaat — founder of WhatsApp X. Building powerful automation and AI tools to help small businesses grow with smarter communication.');
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = 'Ayush Jaat — founder of WhatsApp X. Building powerful automation and AI tools to help small businesses grow with smarter communication.';
      document.head.appendChild(m);
    }
  }, []);
  return null;
};

export function About() {
  return (
    <div className="min-h-screen bg-background relative">
      <Meta />

      {/* Parallax video bg */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 parallax opacity-90">
          <video
            src="/media/vedios/Untitled%20design.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover brightness-90"
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-black/10" />
      </div>

      <main className="section-container relative py-32">
        {/* Hero */}
        <section className="max-w-4xl mx-auto text-center">
          <AppleTextReveal className="mb-6 apple-h1 apple-heading-tight">
            Built with purpose. Driven by vision.
          </AppleTextReveal>
          <p className="apple-body text-muted-foreground max-w-2xl mx-auto mb-8">
            I’m <strong className="apple-text-primary">Ayush Jaat</strong> — building WhatsApp X to change the way businesses talk, sell, and grow.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a href="mailto:Ayush1628jaat@gmail.com">
              <Button className="soft-glow-btn">Contact Me</Button>
            </a>
            <Link to="/signup">
              <Button variant="outline" className="glass">Get Started</Button>
            </Link>
          </div>
        </section>

        {/* Content columns */}
        <section className="mt-20 grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Story */}
          <div>
            <div className="mb-8">
              <h3 className="apple-h3 apple-heading-tight mb-4">Who I am</h3>
              <p className="apple-body text-muted-foreground">
                I’m Ayush. I build tools that help people do more with less.
                I care about clarity, thoughtful design, and shipping features that truly help.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="apple-h3 apple-heading-tight mb-4">Why I started WhatsApp X</h3>
              <p className="apple-body text-muted-foreground">
                I watched small businesses struggle with messages, missed leads, and repetitive work.
                Automation felt like a privilege of large teams. I wanted to change that.
                So I built WhatsApp X — a simple, reliable way to bring smart systems to every business.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="apple-h3 apple-heading-tight mb-4">My passion</h3>
              <p className="apple-body text-muted-foreground">
                I love building helpful AI and automation that reduce friction. When the tools are kind and fast,
                people can focus on what matters — relationships and growth.
              </p>
            </div>
          </div>

          {/* Right: Mission, Vision, Motive, Founder Note, Contact Card */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <h4 className="apple-h3 mb-3">My Mission</h4>
              <p className="apple-body text-muted-foreground mb-2">
                My mission is to give every business — big or small — powerful automation tools once only available to big companies.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h4 className="apple-h3 mb-3">Vision</h4>
              <p className="apple-body text-muted-foreground mb-2">
                WhatsApp X is not just a tool. It’s a movement toward smarter communication — where technology amplifies human care, not replaces it.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h4 className="apple-h3 mb-3">Why WhatsApp X exists</h4>
              <ul className="list-disc ml-5 apple-body text-muted-foreground space-y-2">
                <li>Reduce human workload so teams can focus on judgement and empathy.</li>
                <li>Increase conversions by delivering the right message at the right time.</li>
                <li>Build better customer experiences with thoughtful automations.</li>
                <li>Save owners hours each week so they can grow their business.</li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h4 className="apple-h3 mb-3">A note from the founder</h4>
              <p className="apple-body text-muted-foreground">
                This isn’t just another product. This is my dream project. Every feature is built with focus,
                testing, and a lot of real-world conversations. I’ve made this for people who value time,
                clarity, and real results.
              </p>
              <p className="mt-4 apple-body font-semibold">— Ayush Jaat</p>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="apple-h3 mb-1">Let’s build something powerful together.</p>
                <a className="apple-body text-muted-foreground" href="mailto:Ayush1628jaat@gmail.com">Ayush1628jaat@gmail.com</a>
              </div>
              <div>
                <a href="mailto:Ayush1628jaat@gmail.com">
                  <Button className="soft-glow-btn">Email Me</Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* small footer CTA */}
        <section className="mt-20 text-center">
          <p className="apple-body text-muted-foreground">Curious about how WhatsApp X can fit your business? Let’s chat.</p>
        </section>
      </main>
    </div>
  );
}

export default About;
