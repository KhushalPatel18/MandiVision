import React from 'react';
import { motion } from 'framer-motion';

interface PrimaryButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer shadow-sm';
  
  const variants = {
    primary: 'bg-primary-green text-background-off-white hover:bg-primary-green-hover focus:ring-primary-green',
    secondary: 'bg-secondary-yellow text-text-dark hover:bg-yellow-500 focus:ring-secondary-yellow',
    outline: 'border border-primary-green text-primary-green hover:bg-green-50 focus:ring-primary-green',
    accent: 'bg-accent-brown text-background-off-white hover:bg-stone-700 focus:ring-accent-brown',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && iconPosition === 'left' && <span className="mr-2 inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2 inline-flex">{icon}</span>}
    </motion.button>
  );
};

export default PrimaryButton;
