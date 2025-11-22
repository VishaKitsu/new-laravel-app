import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';

function Homer() {
  return (
    <AppHeaderLayout>
      <Head title='Home Page' /> 
      <div>Homer</div>
    </AppHeaderLayout>
  )
}

export default Homer