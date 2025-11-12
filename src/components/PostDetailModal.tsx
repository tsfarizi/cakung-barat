import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';

interface Post {
  id: string;
  img: string;
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
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Menambahkan class untuk mengatur overflow body
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Fungsi untuk menutup modal
  const handleClose = () => {
    onClose();
    // Menghapus hash dari URL saat menutup modal
    window.history.pushState(null, '', window.location.pathname);
  };

  if (!post) return null;

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
            className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden bg-white rounded-xl shadow-2xl"
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
            onClick={(e) => e.stopPropagation()} // Mencegah close saat meng-klik konten modal
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
            <div className="overflow-y-auto max-h-[80vh]">
              <div className="relative">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-64 md:h-80 object-cover"
                />
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
                
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {post.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                  </p>
                </div>
                
                <div className="mt-8">
                  <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700">
                    Tutup
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostDetailModal;