import { Button } from "@/components/ui/button"
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

export default function PreviewImageDialog({ preview }: { preview: string | null }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-auto" disabled={preview == null ? true : false}>Preview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Preview Image</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {preview == null ? "No image chosen" : "This is your image"}
        </DialogDescription>
        {preview && 
        (<div className="mx-auto">
          <img src={preview} alt="" />
        </div>)
        }
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
