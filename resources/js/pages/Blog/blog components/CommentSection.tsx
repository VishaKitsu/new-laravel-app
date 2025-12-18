import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import CommentController, { store, destroy } from "@/actions/App/Http/Controllers/CommentController";
import toast from 'react-hot-toast';

type CommentType = {
  id: number;
  post_id: number;
  comment: string;
  created_at: string;
};

function CommentSection({ post_id }: { post_id: number }) {
  const { comments } = usePage<{ comments: CommentType[]; }>().props;
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log(comment);
    if (comment === ""){
      toast.error("please enter some comments first.");
    }
    else {
      router.post(
        // CommentController.store().url, or like this below
        store(),
        {post_id: post_id, comment: comment}, 
        {
          onSuccess: () => {
            toast.success("Comment successfully submited.");
            setComment('');
          },
          onError: () => {
            toast.error("Failed to submit comment.");
          },
        }
      );
    }
  };

  const handleDeleteC = (id: string) => {
    router.delete(destroy(id),{
      onSuccess: () => toast.success("Comment deleted successfully."),
      onError: () => toast.error("Error"),
      preserveScroll: true,
    });
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex gap-4">
        <img className="h-12 rounded-full" src="https://placehold.co/300x300" alt="" />
        <div className="w-full">
          <div className="mb-1 font-bold">Username</div>
          <Textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Write your comment here." />
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <div>
        {comments.map(c=>(
          <div className="flex gap-4 mb-5" key={c.id}>  
            <img className="h-12 rounded-full" src="https://placehold.co/300x300" alt="" />
            <div className="flex flex-col w-full">
              <div className="mb-1 flex gap-4">
                <span className="font-bold">
                  Username
                </span>
                <span className="text-[0.8rem] pt-[4px] text-gray-500">
                  {new Date(c.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <Button className="ml-auto self-end" size={"sm"} variant={"destructive"} onClick={()=>handleDeleteC(c.id.toLocaleString())}>Delete</Button>
              </div>
              <div>
                {c.comment}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSection