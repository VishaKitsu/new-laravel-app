import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

function CommentSection() {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <img className="h-24 rounded-full" src="https://placehold.co/300x300" alt="" />
        <Textarea placeholder="Write your comment here." />
      </div>
      <div>
        <Button>Submit</Button>
      </div>
    </div>
  )
}

export default CommentSection