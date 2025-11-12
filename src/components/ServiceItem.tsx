import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ServiceItemProps {
  number: number;
  title: string;
  description?: string;
  index?: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ number, title, description, index = 0 }) => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200 h-full border border-gray-200">
        <CardContent className="p-4 flex">
          <div className="flex-shrink-0 mr-4">
            <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
              {number}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-800">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceItem;