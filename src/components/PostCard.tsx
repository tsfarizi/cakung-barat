import React, { useState } from 'react';
import {
  Card,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Post {
  id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  isLoadingImage?: boolean;
  hasNoFolder?: boolean;
}

interface PostCardProps {
  post: Post;
  onPostClick?: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPostClick }) => {
  const [showLightbox, setShowLightbox] = useState(false);

  const handleClick = () => {
    if (onPostClick) {
      onPostClick(post.id);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!post.isLoadingImage && !post.hasNoFolder) {
      setShowLightbox(true);
    }
  };

  const isPlaceholder = post.img.includes('placehold.co');

  return (
    <>
      <Card className="overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-200 rounded-xl h-full flex flex-col">
        <div className="relative">
          {post.isLoadingImage ? (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-500">Loading image...</span>
              </div>
            </div>
          ) : (
            <img
              src={post.img}
              alt={post.title}
              className={`w-full h-48 object-cover ${!isPlaceholder ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
              onClick={handleImageClick}
            />
          )}
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </div>
        </div>
        <div className="p-6 flex flex-col grow">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span>{post.date}</span>
          </div>
          <CardTitle className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</CardTitle>
          <div className="text-gray-600 mb-4 grow line-clamp-3">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: (props) => <p className="mb-0" {...props} />,
                h1: (props) => <h1 className="font-bold text-lg mb-1" {...props} />,
                h2: (props) => <h2 className="font-bold text-md mb-1" {...props} />,
                h3: (props) => <h3 className="font-bold text-sm mb-1" {...props} />,
                ul: (props) => <ul className="list-disc pl-5 mb-1" {...props} />,
                ol: (props) => <ol className="list-decimal pl-5 mb-1" {...props} />,
                li: (props) => <li className="mb-0.5" {...props} />,
                strong: (props) => <strong className="font-semibold" {...props} />,
                em: (props) => <em className="italic" {...props} />,
                code: (props) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props} />,
                pre: (props) => <pre className="bg-gray-100 p-2 rounded mt-1 mb-1 overflow-x-auto" {...props} />,
              }}
            >
              {post.excerpt}
            </ReactMarkdown>
          </div>
          <CardFooter className="p-0 pt-4 mt-auto">
            <Button
              variant="link"
              className="p-0 font-semibold text-blue-600 hover:underline hover:text-blue-800 transition-colors"
              onClick={handleClick}
            >
              Baca Selengkapnya
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </CardFooter>
        </div>
      </Card>

      {/* Image Lightbox */}
      {showLightbox && !isPlaceholder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => setShowLightbox(false)}
          >
            ×
          </button>
          <img
            src={post.img}
            alt={post.title}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default PostCard;