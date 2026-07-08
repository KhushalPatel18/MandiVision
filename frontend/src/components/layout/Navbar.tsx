import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import logo from '../../assets/logo.png';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isAuthenticated
    ? [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Predictions', href: '/dashboard' },
      { name: 'About', href: '/#how-it-works' },
    ]
    : [
      { name: 'Home', href: '/' },
      { name: 'Features', href: '/#features' },
      { name: 'How It Works', href: '/#how-it-works' },
    ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (href.startsWith('/#')) {
      const anchor = href.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
      return;
    }

    // Direct SPA client-side route navigation
    navigate(href);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    toast.success('Logged out successfully', { icon: '👋' });
    navigate('/');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[70px] flex items-center ${isScrolled || location.pathname !== '/'
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_20px_-8px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  handleLinkClick('/');
                }
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <img
                src={logo}
                alt="MandiVision Logo"
                className="h-28 w-28 -my-6 -mx-5 object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-text-dark group-hover:text-primary transition-colors duration-200">
                  Mandi<span className="text-primary">Vision</span>
                </span>
                <span className="text-[9px] font-semibold text-accent tracking-widest uppercase -mt-1">
                  AI Agri-Tech
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA — Auth aware */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold text-text-dark leading-tight max-w-[100px] truncate">{user.name}</span>
                  </button>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsProfileMenuOpen(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl py-2 z-20"
                        >
                          <div className="px-4 py-2.5 border-b border-gray-50">
                            <p className="text-xs font-semibold text-gray-400">Signed in as</p>
                            <p className="text-sm font-bold text-text-dark truncate mt-0.5">{user.name}</p>
                            <p className="text-[11px] font-semibold text-gray-400 truncate mt-0.5">{user.email}</p>
                          </div>
                          <div className="p-1.5">
                            <Link
                              to="/dashboard"
                              onClick={() => setIsProfileMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-all"
                            >
                              Dashboard Overview
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setIsProfileMenuOpen(false);
                                handleLogout();
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all border-none bg-transparent cursor-pointer text-left"
                            >
                              <LogOut className="h-4 w-4" />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/authform?mode=login">
                  <Button
                    variant="primary"
                    size="md"
                    icon={<ChevronRight className="h-4 w-4" />}
                  >
                    Get Started
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-text-dark hover:bg-gray-50 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden absolute top-[70px] left-0 right-0 z-50 shadow-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="block px-3 py-2 rounded-xl text-base font-semibold text-gray-600 hover:text-primary hover:bg-green-50/50 transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-2 px-3">
                  {isAuthenticated && user ? (
                    <div className="space-y-3">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 py-2"
                      >
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-sm font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-text-dark">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer border-none"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link to="/authform?mode=login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full"
                        icon={<ChevronRight className="h-4 w-4" />}
                      >
                        Get Started
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
