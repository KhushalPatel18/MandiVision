import React from 'react';
import { motion } from 'framer-motion';
import AuthBanner from './AuthBanner';

interface AuthLayoutProps {
  children: React.ReactNode;
  mode: 'login' | 'signup';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, mode }) => {
  return (
    <div className="min-h-screen w-full flex bg-background select-none">
      
      {/* Left panel: 60% width on Desktop, hidden on mobile */}
      <div className="hidden md:block md:w-1/2 lg:w-[60%] shrink-0">
        <AuthBanner mode={mode} />
      </div>

      {/* Right panel: 40% on Desktop, 100% on mobile */}
      <div className="w-full md:w-1/2 lg:w-[40%] bg-stone-50/20 flex flex-col justify-center items-center py-10 px-4 sm:px-8 lg:px-12 relative overflow-y-auto">
        {/* Glow effect at top left on mobile */}
        <div className="md:hidden absolute top-0 left-0 w-48 h-48 bg-primary-green/5 rounded-full blur-2xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px] flex flex-col items-stretch"
        >
          {children}
        </motion.div>
      </div>

    </div>
  );
};

export default AuthLayout;
export { AuthLayout };
