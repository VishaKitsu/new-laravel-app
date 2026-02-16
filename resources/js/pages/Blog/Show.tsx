import PostController from '@/actions/App/Http/Controllers/PostController';
import { Separator } from '@/components/ui/separator';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';
import { AppHeader } from '@/components/app-header';
import CommentSection from './blog components/CommentSection';
import { PostType } from './Index';

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

export default function Show({ post, }: { post: PostType; }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <AppHeader breadcrumbs={breadcrumbs} />
      <Head title={post.title} />
      <div>
        <Toaster />
      </div>
      <div className="flex-1 gap-4 overflow-x-clip p-4 bg-muted">
        <div className="lg:max-w-4xl w-full mx-auto px-6 pt-12 pb-6 ring-1 ring-gray-900/5 bg-white shadow-xl shadow-slate-700/10">
          <div className='max-w-prose mx-auto'>
            <h1 className="text-4xl font-extrabold tracking-tight">
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
          </div>
          {/* <div className="mx-auto py-4">
            <img src={post.thumbnail_url} className="mx-auto rounded-sm" alt="" />
          </div> */}
          {/* <p className='mb-4 text-gray-400'>{post.description}</p> */}
          <div className='py-4 mx-auto prose dark:prose-invert' dangerouslySetInnerHTML={{ __html: post.content }}>

          </div>
          <Separator />
          <CommentSection post_id={post.id} />
        </div>
      </div>
    </div>
  );
}
