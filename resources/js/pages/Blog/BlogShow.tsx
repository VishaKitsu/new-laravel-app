import PostController from '@/actions/App/Http/Controllers/PostController';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import CommentSection from './blog components/CommentSection';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Blog',
    href: PostController.index().url,
  },
  {
    title: 'Show',
    href: '#',
  },
];

type PostType = {
  id: number;
  user_id: number;
  category_id: number;
  thumbnail: string;
  thumbnail_url: string;
  title: string;
  description: string;
  created_at: string;
  category: { name: string };
  user: { name: string };
  url: string;
};

export default function BlogShow({ post, }: { post: PostType; }) {
  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <Head title={post.title} />
      <div>
        <Toaster />
      </div>
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4 bg-muted">
        <div className="w-[815px] mx-auto p-11 border bg-white">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            {post.title}
          </h1>
          <div className="flex justify-between py-4 text-muted-foreground">
            <div>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
            <div>Author: {post.user.name}</div>
          </div>
          <Separator />
          <div className="mx-auto py-4">
            <img src={post.thumbnail_url} className="mx-auto rounded-sm" alt="" />
          </div>
          <p>{post.description}</p>
          <Button onClick={()=>console.log(post.thumbnail_url)}>test</Button>
          <CommentSection />
        </div>
      </div>
    </AppHeaderLayout>
  );
}
