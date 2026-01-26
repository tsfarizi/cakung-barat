import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ChatPostCard from './ChatPostCard';
import type { ChatbotPost } from '../types/chatbot';

interface ChatCarouselProps {
  posts: ChatbotPost[];
  onPostClick: (post: ChatbotPost) => void;
}

const ChatCarousel: React.FC<ChatCarouselProps> = ({ posts, onPostClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (!posts || posts.length === 0) return null;

  const currentPost = posts[currentIndex];

  return (
    <div className="w-full mb-2">
      <div className="relative w-[260px] mx-auto group">
        <div className="overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ChatPostCard
                post={{
                  ...currentPost,
                  img: currentPost.img || currentPost.image_url,
                  isLoadingImage: false
                }}
                onPostClick={() => onPostClick({
                  ...currentPost,
                  img: currentPost.image_url
                })}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons - Visible on hover or always on mobile */}
        {posts.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute top-1/2 -translate-y-1/2 -left-3 p-1.5 bg-white rounded-full shadow-md text-gray-600 hover:text-blue-600 transition-all z-20 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 border border-gray-100"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute top-1/2 -translate-y-1/2 -right-3 p-1.5 bg-white rounded-full shadow-md text-gray-600 hover:text-blue-600 transition-all z-20 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 border border-gray-100"
               aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

       {/* Dots Indicator */}
       {posts.length > 1 && (
         <div className="flex justify-center gap-1 mt-2">
          {posts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-blue-500 w-3' : 'bg-gray-300 w-1 hover:bg-blue-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
       )}
    </div>
  );
};

export default ChatCarousel;