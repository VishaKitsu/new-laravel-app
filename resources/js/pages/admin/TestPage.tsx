import AppLayout from '@/layouts/app-layout';
import { testpage } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useMemo, useState } from 'react';
import UserList from './UserList';
import { Form } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

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

export default function TestPage({ myImage, myBMW, myVideo}: { myImage: string; myBMW: string; myVideo: string}) {
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

  const [text, setText] = useState<string>("");
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
        <img src={myImage} alt="" className='w-[500px]'/>
        <img src={myBMW} alt="" className='w-[500px]'/>
        <video controls>
          {/* width="854" height="480" */}
            <source src={myVideo} type="video/mp4" />
        </video>
        <div className='max-w-[720px] p-4 border rounded-xl'>
          <Input type='text' placeholder='something' className='mb-1' onChange={handleChange} value={text}/>
          <UserList userData={ text == "" ? users : filteredUsers} />
        </div>
        <button onClick={()=>console.log(myBMW)}>test</button>
        <Form
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
        </Form>

      </div>
    </AppLayout>
  );
}