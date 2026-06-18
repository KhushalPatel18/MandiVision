import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
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
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer shadow-sm';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-emerald-700 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-green-600 focus:ring-secondary',
    accent: 'bg-accent text-white hover:bg-lime-600 focus:ring-accent',
    outline: 'border border-primary text-primary hover:bg-green-50/50 focus:ring-primary shadow-none',
    ghost: 'text-muted hover:text-text-dark hover:bg-gray-100/70 focus:ring-gray-300 shadow-none',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.015 }}
      whileTap={disabled ? {} : { scale: 0.985 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && iconPosition === 'left' && <span className="mr-1.5 inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-1.5 inline-flex">{icon}</span>}
    </motion.button>
  );
};

export default Button;
export { Button as PrimaryButton };
