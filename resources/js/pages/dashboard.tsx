import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import artisan from '@/routes/artisan';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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
              <Button
                asChild
                className="bg-linear-to-b from-sky-300 to-sky-400 to-70% px-4 py-2 text-sm font-semibold text-sky-950 shadow-md ring inset-shadow-2xs ring-sky-500 inset-shadow-white/20 transition text-shadow-2xs text-shadow-sky-300 hover:to-100% dark:ring-sky-500/50"
              >
                <Link href={artisan.optimize()}>artisan optimize</Link>
              </Button>
              <Button
                asChild
                variant={'secondary'}
                className="bg-linear-to-b from-white/10 to-white/20 to-70% px-4 py-2 text-sm font-semibold text-gray-950 shadow-md ring inset-shadow-2xs ring-black/20 inset-shadow-white/10 transition hover:from-white hover:to-white/10 dark:text-white dark:text-shadow-2xs"
              >
                <Link href={artisan.viewclear()}>artisan view:clear</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border p-6 shadow">
            <div className="mb-4 font-medium text-gray-500">
              Number of Posts
            </div>
            <div className="text-3xl font-semibold text-shadow-lg">
              {postCount}
            </div>
          </div>
          <div className="rounded-xl border p-6 shadow">
            <div className="mb-4 font-medium text-gray-500">
              Number of Users
            </div>
            <div className="text-3xl font-semibold text-shadow-lg">
              {userCount}
            </div>
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
