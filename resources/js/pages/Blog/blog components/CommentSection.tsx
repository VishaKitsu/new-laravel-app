import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { router } from "@inertiajs/react";
import CommentController from "@/actions/App/Http/Controllers/CommentController";
import toast from 'react-hot-toast';

function CommentSection({ post_id }: { post_id: number }) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    console.log(comment);
    if (comment === ""){
      toast.error("please enter some comments first.");
    }
    else {
      router.post(CommentController.store().url, {post_id: post_id, comment: comment});
      toast.success("Comment successfully submited.");
      setComment('');
    }
  };

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
    </div>
  )
}

export default CommentSection