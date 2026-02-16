import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { create } from '@/actions/App/Http/Controllers/PostController';
import { destroy } from '@/routes/images';
import artisan from '@/routes/artisan';
import token from '@/routes/token';
import user from '@/routes/user';
import MyButton from '@/pages/my components/my-button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from '@/components/ui/input';
import { InfoIcon, AlertCircleIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Dashboard({
  postCount,
  userCount,
  todayCount,
}: {
  postCount: number;
  userCount: number;
  todayCount: number;
}) {

  const tokenKey = import.meta.env.VITE_SANCTUM_TOKEN;
  const [ tokenName, setTokenName ] = useState('');
  const { flash } = usePage();
  const handleClick = () => {
    fetch('/api/blog/index', {
      headers: {
        'Authorization': "Bearer " + tokenKey,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {flash.tokener && (
          <Alert >
            <InfoIcon />
            <AlertTitle>Authorization successful</AlertTitle>
            <AlertDescription>
              Please copy this token: {flash.tokener}
            </AlertDescription>
          </Alert>
        )}
        {flash.toast && (
          <Alert variant={'destructive'}>
            {flash.toast.type == "success" ? <InfoIcon /> : <AlertCircleIcon />}
            <AlertTitle>{flash.toast.type == 'error' ? 'Deletion failed' : 'Deletion successful'}</AlertTitle>
            <AlertDescription>
              {flash.toast.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Artisan commands */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border p-6 shadow">
            <div className="mb-4 text-2xl font-semibold">
              Manual Artisan Commands
            </div>
            <div className="flex flex-col gap-4">
              <MyButton onClick={() => router.get(artisan.optimize())}>
                artisan optimize
              </MyButton>
              <MyButton
                color="white"
                onClick={() => router.get(artisan.viewclear())}
              >
                artisan view:clear
              </MyButton>
            </div>
          </div>

          {/* Number of posts */}
          <div className="flex flex-col rounded-xl border p-6 shadow">
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <div className="mb-4 font-medium text-gray-500">
                  Number of Posts
                </div>
                <div className="text-3xl font-semibold text-shadow-lg">
                  {postCount}
                </div>
              </div>
              <div>
                <div className='mb-4 text-sm text-gray-500 pt-1'>
                  Posts created today
                </div>
                <div className='text-3xl font-semibold text-shadow-lg text-end'>
                  {todayCount}
                </div>
              </div>
            </div>
            <MyButton className="mt-auto" onClick={() => router.visit(create(), { viewTransition: true })}>
              Create post
            </MyButton>
          </div>

          {/* Number of Users */}
          <div className="flex flex-col rounded-xl border p-6 shadow">
            <div className="mb-4 font-medium text-gray-500">
              Number of Users
            </div>
            <div className="text-3xl font-semibold text-shadow-lg">
              {userCount}
            </div>
            <MyButton
              className="mt-auto"
              onClick={() => router.visit(user.index())}
            >
              User lists
            </MyButton>
          </div>
          
          {/* Sanctum token authorizer */}
          {/* <div className="flex flex-col rounded-xl border p-6 shadow gap-4">
            <div className="text-2xl font-semibold">
              Sanctum token authorizer
            </div>
            <Input placeholder='token name' onChange={(e)=>{setTokenName(e.target.value)}}/>
            <MyButton 
              className="mt-auto"
              onClick={() => router.post(token.create(), { token_name: tokenName })}
            >
              Authorize this User
            </MyButton>
            <MyButton color='orange' onClick={handleClick}>
              Test API
            </MyButton>
            <MyButton color='red' onClick={()=>router.post(token.deleteAll())}>
              Delete Token
            </MyButton>
          </div> */}

          {/* Delete Leftover Images */}
          {/* <div className="flex flex-col rounded-xl border p-6 shadow gap-4">
            <div className="text-2xl font-semibold">
              Delete Leftover Images
            </div>
            <MyButton 
              color='red'
              className="mt-auto"
              onClick={() => router.post(destroy())}
            >
              Delete
            </MyButton>
          </div> */}
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
