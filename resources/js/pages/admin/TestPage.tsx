import AppLayout from '@/layouts/app-layout';
import { testpage } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import UserList from './UserList';
import toast, { Toaster } from 'react-hot-toast';
// import { Label } from '@/components/ui/label';
// import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { update } from '@/routes/blog';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Test Page',
    href: testpage().url,
  },
];

type UserType = {
  id: number,
  name: string,
  email: string,
};

const users: UserType[] = [
  { id: 1, name: "Alice Nguyen", email: "alice.nguyen@example.com" },
  { id: 2, name: "Brandon Lee", email: "brandon.lee@example.com" },
  { id: 3, name: "Catherine Park", email: "catherine.park@example.com" },
  { id: 4, name: "David Chen", email: "david.chen@example.com" },
  { id: 5, name: "Ella Rodriguez", email: "ella.rodriguez@example.com" },
  { id: 6, name: "Felix Johnson", email: "felix.johnson@example.com" },
  { id: 7, name: "Grace Tan", email: "grace.tan@example.com" },
  { id: 8, name: "Henry Patel", email: "henry.patel@example.com" },
  { id: 9, name: "Isabella Kim", email: "isabella.kim@example.com" },
  { id: 10, name: "Jack Wilson", email: "jack.wilson@example.com" },
];

export default function TestPage({ myImage, myBMW, myVideo}: { myImage: string; myBMW: string; myVideo: string}) {


  const page = usePage();
  const { flash } = usePage();
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (flash.flashMessage) toast.success(flash.flashMessage)
  }, [flash.flashMessage]);
  const filteredUsers = useMemo(()=>{
    return users.filter((user) => 
      user.name.toLowerCase().includes(text.toLowerCase())
    );
  }, [text]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setText(value);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Test Page" />
      <div><Toaster/></div>
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <img src={myImage} alt="" className='w-125'/>
        <img src={import.meta.env.VITE_R2_URL + '2005-BMW-M3-GTR-Need-For-Speed-001-1080.jpg'} alt="" className='w-125'/>
        <video controls>
          {/* width="854" height="480" */}
            <source src={myVideo} type="video/mp4" />
        </video>
        <div className='max-w-180 p-4 border rounded-xl'>
          <Input type='text' placeholder='Filter users' className='mb-1' onChange={handleChange} value={text}/>
          <UserList userData={ text == "" ? users : filteredUsers} />
        </div>
        <Button onClick={()=>console.log(page)}>test usepage</Button>
        <Button asChild>
          <Link href={update(1)}>Flash!</Link>
        </Button>
        {/* <Form
          action="/images/upload"
          method="post"
          onSuccess={()=>toast.success("success!!!!")}
          onError={()=>toast.error("Erorororor!!!")}
        >
          {({errors, processing})=>(
            <>
            <div className='flex flex-col gap-2'>
              <Label htmlFor="file">Thumbnail</Label>
              <Input id="file" type="file" name='file' accept="image/*" />
              <InputError message={errors.thumbnail} />
            </div>
            <Button type='submit' disabled={processing}>
              submit
            </Button>
            </>
          )}
        </Form> */}
      </div>
    </AppLayout>
  );
}