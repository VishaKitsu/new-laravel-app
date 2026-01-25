import PostController from '@/actions/App/Http/Controllers/PostController';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Calendar } from 'lucide-react';

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
  thumbnail_url: string,
  title: string,
  description: string,
  created_at: string,
  slug: string,
  category: { name: string, },
  user: { name: string, },
};

export default function Index({ posts }: { posts: PostType[] }) {
  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <Head title="Blog" />
      <div><Toaster/></div>
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
        <div>
          {/* <TextLink href={PostController.create().url}>Create Post</TextLink> */}
          <Button asChild>
            <Link href={PostController.create().url}>Create Post</Link>
          </Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {posts.map(post => (
            <Link key={post.id} href={PostController.show(post.slug)} className='flex flex-col border p-4 group transition shadow-md hover:shadow-blue-100 hover:shadow-lg hover:cursor-default'>
              <img src={post.thumbnail_url} className='aspect-4/3 object-cover group-hover:opacity-90 transition hover:cursor-pointer' alt="Not available" />
              <div className='flex flex-col'>
                <h2 className=' text-2xl mt-4 mb-2 font-semibold tracking-tight text-pretty text-blue-400 hover:cursor-pointer'>{post.title}</h2>
                <hr />
                <div className='text-gray-600 mt-2 flex flex-col gap-1'>
                  <i className='flex '>
                    <Calendar color='gray' strokeWidth={'2px'} className='me-2' />
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </i>
                  <div className='font-bold'>
                    Category : <span className='font-normal'>{post.category?.name}</span>
                  </div>
                  <span className='font-bold'>
                    Posted by : <span className='font-normal'>{post.user?.name}</span> 
                  </span>
                  <p>{post.description}</p>
                </div>
                <div className='mt-3 flex flex-row-reverse'>
                  <Button variant={'destructive'} className='cursor-pointer' asChild>
                    <Link href={PostController.destroy(post.id)} onSuccess={()=>toast.success("Post deleted successfully.")}>Delete</Link>
                  </Button>
                  {/* <Button onClick={()=>console.log(post.thumbnail_url)}>
                    Test
                  </Button> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppHeaderLayout>
  );
}