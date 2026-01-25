import React from 'react';
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

const ChatPostCard: React.FC<PostCardProps> = ({ post, onPostClick }) => {
  const handleClick = () => {
    if (onPostClick) {
      onPostClick(post.id);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPostClick) {
      onPostClick(post.id);
    }
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-200 rounded-lg h-full flex flex-col bg-white">
        <div className="relative">
          {post.isLoadingImage ? (
            <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-xs text-gray-500">Loading...</span>
              </div>
            </div>
          ) : (
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-32 object-cover cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleImageClick}
            />
          )}
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
            {post.category}
          </div>
        </div>
        <div className="p-3 flex flex-col grow">
          <div className="flex items-center text-[10px] text-gray-500 mb-1.5">
            <span>{post.date}</span>
          </div>
          <CardTitle className="text-sm font-bold text-gray-800 mb-1.5 line-clamp-2 leading-tight">{post.title}</CardTitle>
          <div className="text-gray-600 mb-2 grow line-clamp-2 text-xs leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: (props) => <p className="mb-0" {...props} />,
                h1: (props) => <strong className="block mb-1" {...props} />,
                h2: (props) => <strong className="block mb-1" {...props} />,
                h3: (props) => <strong className="block mb-1" {...props} />,
                ul: (props) => <ul className="list-disc pl-3 mb-1" {...props} />,
                ol: (props) => <ol className="list-decimal pl-3 mb-1" {...props} />,
                li: (props) => <li className="mb-0.5" {...props} />,
                code: (props) => <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px]" {...props} />,
              }}
            >
              {post.excerpt}
            </ReactMarkdown>
          </div>
          <CardFooter className="p-0 pt-1 mt-auto">
            <Button
              variant="link"
              className="p-0 font-semibold text-blue-600 hover:underline hover:text-blue-800 transition-colors h-auto text-xs"
              onClick={handleClick}
            >
              Baca Selengkapnya
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default ChatPostCard;
