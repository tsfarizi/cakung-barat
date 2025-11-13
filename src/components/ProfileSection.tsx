import React from 'react';
import { motion } from 'framer-motion';

interface ProfileSectionProps {
  title: string;
  description: string;
  color: 'accent' | 'primary';
  isVisible: boolean;
  index: number;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  description,
  color,
  isVisible,
  index
}) => {
  const colorClasses = {
    accent: {
      bg: 'bg-accent',
      border: 'border-accent',
      text: 'text-accent'
    },
    primary: {
      bg: 'bg-primary',
      border: 'border-primary',
      text: 'text-primary'
    }
  };

  const currentColors = colorClasses[color];

  return (
    <section className="profile-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className={`bg-white rounded-2xl shadow-xl p-8 border-l-4 ${currentColors.border} hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden`}
      >
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
            <h2 className="text-2xl md:text-3xl font-bold text-dark">
              {title}
            </h2>
          </div>
          <div className="md:w-2/3">
            <p className="text-gray-700 leading-relaxed text-lg">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProfileSection;