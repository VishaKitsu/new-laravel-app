import { index, show, create, edit, destroy } from '@/actions/App/Http/Controllers/PostController';
import { Head, Link, router, usePage } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { Calendar } from 'lucide-react';
import MyButton from '../../my components/my-button'
import { useEffect } from 'react';
import { login } from '@/routes';

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

  const imageUrl = import.meta.env.VITE_R2_URL + "icon4.png";

  return(
    <div 
      className=""
      style={{
        backgroundImage: `url(${imageUrl})`, // Use backticks or single quotes
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Ensure the div has height and width
      }}
    >
      <div className='max-w-7xl min-h-screen mx-auto bg-muted'>
        <Head title="Blog" />
        <div><Toaster/></div>
        <div className="flex min-h-screen flex-col gap-4 overflow-x-auto p-4">
          <div className='flex justify-between'>
            {/* <TextLink href={PostController.create().url}>Create Post</TextLink> */}
            <MyButton color='green' onClick={()=>router.visit(login(), {viewTransition: true})}>
              Login
            </MyButton>
            <MyButton onClick={()=>console.log(imageUrl)}>test</MyButton>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {posts.map(post => (
              <Link key={post.id} href={show(post.slug)} className='md:h-146 lg:h-136 flex flex-col rounded-md border p-4 group transition shadow-md bg-white hover:shadow-blue-100 hover:cursor-default'>
                <img src={post.thumbnail_url} className='aspect-4/3 object-cover group-hover:opacity-90 transition hover:cursor-pointer' alt="Not available" />
                <div className='flex flex-col flex-1'>
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
                    <p className='line-clamp-3'>{post.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    // <div className='bg-sky-500 w-full min-h-screen'
    //   style={{
    //     backgroundImage: `url(${imageUrl})`, // Use backticks or single quotes
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     height: '100vh', // Ensure the div has height and width
    //   }}
    // >hellos</div>
  );
}