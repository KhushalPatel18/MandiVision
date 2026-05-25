import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string;
  colorClass: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  iconName,
  colorClass,
}) => {
  // Dynamically get Lucide icon
  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-6px_rgba(46,125,50,0.08)] transition-all duration-300 flex flex-col items-start"
    >
      <div className={`p-3 rounded-xl border mb-6 inline-flex ${colorClass}`}>
        <IconComponent className="h-6 w-6 stroke-[2]" />
      </div>
      <h3 className="text-xl font-bold text-text-dark mb-3 group-hover:text-primary-green transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
