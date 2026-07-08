import React from 'react';

interface DividerProps {
  children?: React.ReactNode;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative flex py-3.5 items-center w-full select-none ${className}`}>
      <div className="flex-grow border-t border-gray-150/70"></div>
      {children && (
        <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
          {children}
        </span>
      )}
      <div className="flex-grow border-t border-gray-150/70"></div>
    </div>
  );
};

export default Divider;
export { Divider };
