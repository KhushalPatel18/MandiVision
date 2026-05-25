import React, { useState } from 'react';
import { Twitter, Linkedin, Github, MessageSquare, Send, Check } from 'lucide-react';
import PrimaryButton from '../ui/PrimaryButton';
import logo from '../../assets/logo.png';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Market Trends', href: '#market-trends' },
    { name: 'How It Works', href: '#how-it-works' },
  ];

  const resourcesLinks = [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Agriculture API', href: '#' },
    { name: 'System Status', href: '#' },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href === '#' ? 'body' : href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer id="about" className="bg-[#122214] text-gray-300 pt-16 pb-8 border-t border-green-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#');
              }}
              className="flex items-center gap-2.5 group cursor-pointer w-fit"
            >
              <img
                src={logo}
                alt="MandiVision Logo"
                className="h-32 w-32 -my-8 -mx-6 object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Mandi<span className="text-primary-green">Vision</span>
                </span>
                <span className="text-[10px] font-semibold text-secondary-yellow tracking-widest uppercase -mt-1">
                  AI Agri-Tech
                </span>
              </div>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mt-2">
              Empowering farmers, traders, and agri-consultants with hyper-local, real-time APMC price predictions powered by advanced machine learning models.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="h-9 w-9 rounded-xl bg-green-950/80 border border-green-900 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-xl bg-green-950/80 border border-green-900 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-xl bg-green-950/80 border border-green-900 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-xl bg-green-950/80 border border-green-900 flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors duration-200"
                aria-label="Forum"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 tracking-wide uppercase text-sm border-b border-green-900/50 pb-2">
              Platform
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-gray-400 hover:text-primary-green transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Resources Column */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 tracking-wide uppercase text-sm border-b border-green-900/50 pb-2">
              Developer
            </h3>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-green transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 tracking-wide uppercase text-sm border-b border-green-900/50 pb-2">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Subscribe to receive weekly crop forecast highlights and agricultural trading insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-green-950/60 border border-green-900 text-white placeholder-gray-500 focus:outline-none focus:border-primary-green text-sm transition-colors"
                />
              </div>
              <PrimaryButton
                type="submit"
                variant="primary"
                size="sm"
                className="w-full"
                icon={subscribed ? <Check className="h-4 w-4 text-white" /> : <Send className="h-4 w-4" />}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </PrimaryButton>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-900/40 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MandiVision AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary-green transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-green transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-green transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
