import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Post {
  id: string;
  img: string;
  images?: string[]; // Array of all images
  category: string;
  date: string;
  title: string;
  excerpt: string;
}

interface PostDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showLightbox) {
          setShowLightbox(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, showLightbox, onClose]);

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, post?.id]);

  const handleClose = () => {
    onClose();
    window.history.pushState(null, '', window.location.pathname);
  };

  if (!post) return null;

  const images = post.images || [post.img];
  const currentImage = images[currentImageIndex];
  const hasMultipleImages = images.length > 1;
  const isPlaceholder = currentImage.includes('placehold.co');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-xl shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
              y: 20
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol tutup */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Konten modal */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Image Carousel */}
              <div className="relative group">
                <img
                  src={currentImage}
                  alt={post.title}
                  className="w-full h-64 md:h-80 object-cover"
                />

                {/* Zoom button */}
                {!isPlaceholder && (
                  <button
                    onClick={() => setShowLightbox(true)}
                    className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all hover:scale-110"
                    aria-label="Zoom image"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                )}

                {/* Carousel controls */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}

                {/* Category badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>

                {/* Markdown content */}
                <div className="prose prose-gray max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: (props) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                      h1: (props) => <h1 className="font-bold text-2xl mb-3 mt-6" {...props} />,
                      h2: (props) => <h2 className="font-bold text-xl mb-2 mt-5" {...props} />,
                      h3: (props) => <h3 className="font-bold text-lg mb-2 mt-4" {...props} />,
                      ul: (props) => <ul className="list-disc pl-6 mb-4" {...props} />,
                      ol: (props) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                      li: (props) => <li className="mb-1" {...props} />,
                      strong: (props) => <strong className="font-semibold text-gray-900" {...props} />,
                      em: (props) => <em className="italic" {...props} />,
                      code: (props) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
                      pre: (props) => <pre className="bg-gray-100 p-4 rounded-lg mt-2 mb-4 overflow-x-auto" {...props} />,
                      blockquote: (props) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4" {...props} />,
                      a: (props) => <a className="text-blue-600 hover:underline" {...props} />,
                    }}
                  >
                    {post.excerpt}
                  </ReactMarkdown>
                </div>

                <div className="mt-8">
                  <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700">
                    Tutup
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Lightbox */}
          {showLightbox && !isPlaceholder && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-95 z-[60] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLightbox(false)}
            >
              <button
                className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
                onClick={() => setShowLightbox(false)}
              >
                ×
              </button>

              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all z-10"
                  >
                    <ChevronLeft className="w-8 h-8 text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all z-10"
                  >
                    <ChevronRight className="w-8 h-8 text-white" />
                  </button>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}

              <img
                src={currentImage}
                alt={post.title}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostDetailModal;