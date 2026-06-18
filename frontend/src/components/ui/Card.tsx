import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  glass = false,
  onClick,
  animate = true,
  delay = 0,
}) => {
  const baseClasses = `
    rounded-3xl border border-gray-100 p-6 sm:p-8 transition-all duration-300
    ${glass ? 'bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.01)]' : 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]'}
    ${hoverable ? 'hover:shadow-[0_20px_50px_rgba(22,163,74,0.06)] hover:border-primary/20 hover:-translate-y-1' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `;

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay }}
        onClick={onClick}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
