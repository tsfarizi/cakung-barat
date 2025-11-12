
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Post {
  img: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-gray-200 rounded-xl h-full flex flex-col">
      <div className="relative">
        <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {post.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{post.date}</span>
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="text-gray-600 mb-4 flex-grow">{post.excerpt}</CardDescription>
        <CardFooter className="p-0 pt-4 mt-auto">
          <Button variant="link" className="p-0 font-semibold text-blue-600 hover:underline hover:text-blue-800 transition-colors">
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
  );
};

export default PostCard;
