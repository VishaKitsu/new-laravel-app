import PostController from '@/actions/App/Http/Controllers/PostController';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Form, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import NewCateDialog from '../my components/NewCateDialog';
import CategoryCombo from '../my components/CategoryCombo';
import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Blog',
    href: PostController.index().url,
  },
  {
    title: 'Create Post',
    href: PostController.create().url,
  },
];

type CategoryType = {
  id: number,
  name: string,
};

export default function CreatePost({ categories } : { categories : CategoryType[] }) {

  const editorRef = useRef<any>(null);
  const log = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [selectedCate, setSelectedCate] = useState<number>(0);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Post" />
      <div><Toaster/></div>
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <Form 
          {...PostController.store.form()}
          transform={data => ({
            ...data, 
            category_id: selectedCate, 
            content: editorRef.current?.getContent() ?? '',
          })}
          onSuccess={() => toast.success('Post Created successfully.', { icon: "📰" })}
          onError={() => toast.error('Oh no something is wrong.')}
          resetOnSuccess
        >
          {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  required
                  placeholder="Put your title here"
                />
                <InputError message={errors.title} />
              </div>

              <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col gap-2'>
                  <Label>Category</Label>
                  <div className='flex gap-2'>
                    <CategoryCombo categories={categories} selectedCate={selectedCate} setCate={setSelectedCate} />
                    <NewCateDialog/>
                  </div>
                  <InputError message={errors.category_id} />
                </div>
                <div className='flex flex-col gap-2'>
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <Input id="thumbnail" type="file" name='thumbnail' accept="image/*" />
                  <InputError message={errors.thumbnail} />
                </div>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea id='description' placeholder='Write your description here' name='description' required />
                <InputError message={errors.description} />
              </div>
              <Editor
                apiKey='chk9svw7bt5sttksx1fgd0h0ecx77lcyg8y97siirdprxirp'
                onInit={ (_evt, editor) => editorRef.current = editor }
                initialValue="<p>Write your blog here.</p>"
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'image |' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  images_file_types: 'jpg,svg,webp',
                  images_upload_url: `/api/images/upload`,
              }}
            />
            <Button onClick={log}>Log editor content</Button>


              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={processing}
              >
                {processing && (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                )}
                Post
              </Button>
            </div>
          </>
        )}
        </Form>
      </div>
    </AppLayout>
  );
}