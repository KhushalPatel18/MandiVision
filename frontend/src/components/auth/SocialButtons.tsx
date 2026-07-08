import React from 'react';
import { motion } from 'framer-motion';

interface SocialButtonsProps {
  onGoogleClick?: () => void;
  onGithubClick?: () => void;
  isLoading?: boolean;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ onGoogleClick, onGithubClick, isLoading }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {/* Google Button */}
      <motion.button
        type="button"
        disabled={isLoading}
        whileHover={{ scale: 1.01, border: '1px solid #D1D5DB' }}
        whileTap={{ scale: 0.99 }}
        onClick={onGoogleClick}
        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl border border-gray-200/90 bg-white hover:bg-gray-50/50 text-sm font-semibold text-text-dark transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)]"
      >
        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.095 14.977 0 12 0 7.354 0 3.307 2.67 1.242 6.577l4.024 3.188z"
          />
          <path
            fill="#4285F4"
            d="M23.636 12.273c0-.818-.073-1.609-.205-2.373H12v4.582h6.54c-.282 1.49-.1.973-1.272 2.764l3.927 3.045c2.296-2.118 3.636-5.236 3.636-8.918z"
          />
          <path
            fill="#FBBC05"
            d="M1.242 6.577A11.968 11.968 0 0 0 0 12c0 1.954.468 3.8 1.286 5.45l4.028-3.127A7.086 7.086 0 0 1 4.909 12c0-1.023.218-1.995.61-2.882L1.242 6.577z"
          />
          <path
            fill="#34A853"
            d="M1.286 17.45A11.96 11.96 0 0 0 12 24c3.273 0 6.018-1.082 8.027-2.936l-3.927-3.045c-1.109.745-2.527 1.19-4.1 1.19-3.327 0-6.145-2.245-7.15-5.282L1.286 17.45z"
          />
        </svg>
        <span className="text-xs sm:text-sm font-bold text-gray-700">Google</span>
      </motion.button>

      {/* GitHub Button */}
      <motion.button
        type="button"
        disabled={isLoading}
        whileHover={{ scale: 1.01, border: '1px solid #D1D5DB' }}
        whileTap={{ scale: 0.99 }}
        onClick={onGithubClick}
        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl border border-gray-200/90 bg-white hover:bg-gray-50/50 text-sm font-semibold text-text-dark transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)]"
      >
        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span className="text-xs sm:text-sm font-bold text-gray-700">GitHub</span>
      </motion.button>
    </div>
  );
};

export default SocialButtons;
export { SocialButtons };
