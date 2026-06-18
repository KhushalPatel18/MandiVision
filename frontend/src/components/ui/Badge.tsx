import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const styles = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-green-50 text-green-700 border-green-200/50',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/50',
    danger: 'bg-red-50 text-red-700 border-red-200/50',
    info: 'bg-blue-50 text-blue-700 border-blue-200/50',
    neutral: 'bg-gray-50 text-gray-600 border-gray-200/50',
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border
        ${styles[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
