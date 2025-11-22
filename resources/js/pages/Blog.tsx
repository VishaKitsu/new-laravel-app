import PostController from '@/actions/App/Http/Controllers/PostController';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import { Badge } from '@/components/ui/badge';
import { BadgeCheckIcon } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Blog',
    href: PostController.index().url,
  },
];

type PostType = {
  id: number,
  user_id: number,
  category_id: number,
  thumbnail: string,
  title: string,
  description: string,
  created_at: string,
  slug: string,
  category: { name: string, },
  user: { name: string, },
};

export default function Blog({ posts, r2url }: { posts: PostType[]; r2url: string }) {
  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <Head title="Blog" />
      <div><Toaster/></div>
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div>
          {/* <TextLink href={PostController.create().url}>Create Post</TextLink> */}
          <Button asChild>
            <Link href={PostController.create().url}>Create Post</Link>
          </Button>
        </div>
        {posts.map(post => (
          <Link key={post.id} href={PostController.show(post.slug)} className='flex border p-4 group transition shadow-md hover:shadow-blue-100 hover:shadow-lg hover:cursor-default'>
            <img src={r2url + '/' + post.thumbnail} className='aspect-video object-cover w-[200px] group-hover:scale-110 transition hover:cursor-pointer' alt="" />
            <div className='flex flex-col mx-8'>
              <h2 className=' text-2xl font-extrabold tracking-tight text-pretty text-gray-900 hover:cursor-pointer'>{post.title}</h2>
              <div className='text-gray-600 mt-2 flex'>
                <div>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className='ms-4'>
                  Category: {post.category?.name}
                </div>
                <div className='ms-4'>
                  Author: {post.user?.name} 
                </div>
                <div className='ms-1'>
                  {post.user.name === "AdminGuy" && 
                  <Badge variant={"secondary"} className="bg-blue-500 text-white dark:bg-blue-600 rounded-full">
                    <BadgeCheckIcon/>Verified
                  </Badge>}
                </div>
              </div>
              <div className='mt-2'>
                <Button variant={'destructive'} className='cursor-pointer' asChild>
                  <Link href={PostController.destroy(post.id)} onSuccess={()=>toast.success("Post deleted successfully.")}>Delete</Link>
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppHeaderLayout>
  );
}