import { index, show, create, edit, destroy } from '@/actions/App/Http/Controllers/PostController';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import toast, { Toaster } from 'react-hot-toast';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Calendar } from 'lucide-react';
import MyButton from '../my components/my-button';
import { useEffect, useState } from 'react';
import { DeleteAlertDialog } from '../my components/DeleteAlertDialog';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Blog',
    href: index().url,
  },
];

export type PostType = {
  id: number,
  user_id: number,
  category_id: number,
  thumbnail: string,
  thumbnail_url: string, // from accessor
  title: string,
  description: string,
  content: string,
  created_at: string,
  slug: string,
  category: { name: string },
  user: { name: string },
};

export default function Index({ posts }: { posts: PostType[] }) {

  const imageUrl = import.meta.env.VITE_R2_URL + "icon4.png";
  const { flash } = usePage();
  useEffect(()=>{
    if (flash.flashMessage){
      toast.success("Post deleted successfully.");
    }
  },[flash.flashMessage]);

  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <Head title="Blog" />
      <div><Toaster/></div>
      <div className="flex h-full flex-col gap-4 overflow-x-auto p-4">
        <div className='flex justify-between'>
          {/* <TextLink href={PostController.create().url}>Create Post</TextLink> */}
          <MyButton onClick={()=>router.get(create())}>
            Create Post
          </MyButton>
          <MyButton color='green'>
            Manage Post
          </MyButton>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {posts.map(post => (
            <div key={post.id} className='md:h-146 lg:h-146 flex flex-col rounded-md border p-4 group transition shadow-md hover:shadow-blue-100 hover:cursor-default'>
              <img src={post.thumbnail_url} onClick={()=>router.get(show(post.slug))} className='aspect-4/3 object-cover group-hover:opacity-90 transition hover:cursor-pointer' alt="Not available" />
              <div className='flex flex-col flex-1'>
                <h2 onClick={()=>router.get(show(post.slug))} className=' text-2xl mt-4 mb-2 font-semibold tracking-tight text-pretty text-sky-400 hover:cursor-pointer'>{post.title}</h2>
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
                  <p className='line-clamp-3'>{post.description}</p>
                </div>
                <div className='flex justify-end mt-auto gap-2'>
                  <MyButton 
                    className='w-20'
                    color='green' 
                    onClick={()=>router.get(edit(post.id))}
                  >
                    Edit
                  </MyButton>
                  <DeleteAlertDialog id={post.id} className='w-20'/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppHeaderLayout>
  );
}