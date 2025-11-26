import { Link } from 'react-router-dom';
import { MessageSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover-glow">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">WhatsAppX</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="white-intense">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                Start Free Trial
              </Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-down">
            <a href="#features" className="block py-2 text-sm font-medium text-muted-foreground">
              Features
            </a>
            <a href="#pricing" className="block py-2 text-sm font-medium text-muted-foreground">
              Pricing
            </a>
            <a href="#about" className="block py-2 text-sm font-medium text-muted-foreground">
              About
            </a>
            <Link to="/login" className="block py-2">
              <Button variant="ghost" size="sm" className="w-full white-intense">
                Login
              </Button>
            </Link>
            <Link to="/signup" className="block">
              <Button size="sm" className="w-full bg-gradient-primary">
                Start Free Trial
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
