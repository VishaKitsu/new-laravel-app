import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { router } from '@inertiajs/react'
import { useState } from "react"
import CategoryController from "@/actions/App/Http/Controllers/CategoryController"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import toast from "react-hot-toast"

function NewCateDialog() {
  const [newCate, setNewCate] = useState<string>("");
  const [open, setOpen] = useState(false);
  const handleNewCate = () => {
    router.post(CategoryController.store().url, {name: newCate},{
      onSuccess: () => {
        setOpen(false);
        setNewCate("");
        toast.success("Category created successfully.");
      },
      onError: () => {
        toast.error("Duplicate category.");
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create new</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>
            Create a new category on your own.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Input 
            type='text' 
            placeholder='Type your category' 
            value={newCate} 
            onChange={(e)=>setNewCate(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={()=>setNewCate("")} variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleNewCate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewCateDialog