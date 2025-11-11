
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
    <Card className="overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <CardHeader className="p-0">
        <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span className="font-semibold text-primary">{post.category}</span>
          <span>{post.date}</span>
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 mb-3">{post.title}</CardTitle>
        <CardDescription className="text-gray-600 mb-4">{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="link" className="p-0 font-semibold text-blue-600 hover:underline">Baca Selengkapnya &rarr;</Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
