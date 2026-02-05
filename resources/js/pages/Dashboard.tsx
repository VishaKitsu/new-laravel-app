import { Button } from '@/components/ui/button';
import MyButton from '@/pages/my components/my-button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import artisan from '@/routes/artisan';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { create } from '@/actions/App/Http/Controllers/PostController';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Dashboard({
  postCount,
  userCount,
}: {
  postCount: number;
  userCount: number;
}) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-6 shadow">
            <div className="mb-4 text-2xl font-semibold">
              Manual Artisan Commands
            </div>
            <div className="flex flex-col gap-4">
              <MyButton onClick={()=>router.get(artisan.optimize())}>
                artisan optimize
              </MyButton>
              <MyButton color='white' onClick={()=>router.get(artisan.viewclear())}>
                artisan view:clear
              </MyButton>
            </div>
          </div>
          <div className="flex flex-col rounded-xl border p-6 shadow">
            <div className="mb-4 font-medium text-gray-500">
              Number of Posts
            </div>
            <div className="text-3xl font-semibold text-shadow-lg">
              {postCount}
            </div>
            <MyButton className='mt-auto' onClick={()=>create()}>
              Create post
            </MyButton>
          </div>
          <div className="flex flex-col rounded-xl border p-6 shadow">
            <div className="mb-4 font-medium text-gray-500">
              Number of Users
            </div>
            <div className="text-3xl font-semibold text-shadow-lg">
              {userCount}
            </div>
            <MyButton className='mt-auto' onClick={()=>console.log('usererer')}>
              User lists
            </MyButton>
          </div>
          {/* <div className="rounded-xl bg-blue-500 p-4 flex items-center justify-center text-white font-semibold shadow-xl/20 border-3 border-zinc-500 col-start-1 col-end-3">
            Hello
          </div>
          <div className="rounded-xl bg-blue-500 p-4 flex items-center justify-center text-white font-semibold shadow-xl/20 border-3 border-zinc-500 col-[3/4] row-span-3">
            Vert
          </div>
          <div className="rounded-xl bg-blue-500 p-4 flex items-center justify-center text-white font-semibold shadow-xl/20 border-3 border-zinc-500 col-span-1 row-[2/4]">
            Side
          </div> */}
        </div>
      </div>
    </AppLayout>
  );
}
