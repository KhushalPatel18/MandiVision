import React from 'react';

const AuthFooter: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[11px] font-semibold text-gray-400">
      <a href="#" className="hover:text-primary transition-colors duration-150">
        Terms of Service
      </a>
      <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
      <a href="#" className="hover:text-primary transition-colors duration-150">
        Privacy Policy
      </a>
      <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
      <a href="#" className="hover:text-primary transition-colors duration-150">
        Contact Support
      </a>
    </div>
  );
};

export default AuthFooter;
export { AuthFooter };
