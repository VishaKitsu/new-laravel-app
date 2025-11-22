import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Link } from "@inertiajs/react"
import CategoryController from "@/actions/App/Http/Controllers/CategoryController"
import toast from "react-hot-toast"

type CategoryType = {
  id: number,
  name: string,
};

type WholePropType = {
  categories: CategoryType[],
  selectedCate: number,
  setCate: React.Dispatch<React.SetStateAction<number>>
};

function CategoryCombo({ categories, selectedCate, setCate } : WholePropType) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {categories.find((c) => c.id === selectedCate)?.name || "Select category"}
          {/* {value != 0
            ? lists.find((list) => list.id === value)?.name
            : "Select category..."} */}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((c) => (
                <CommandItem
                  key={c.id}
                  onSelect={() => {
                    setCate(c.id)
                    setOpen(false)
                  }}
                >
                  {c.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedCate === c.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div onClick={(e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                  }}>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={"outline"} size={"icon-sm"}>
                          <X/>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this category.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Link href={CategoryController.destroy(c.id)} onSuccess={()=>toast.success("Successfully deleted category", {icon: "🗑"})}>Continue</Link>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  {/* <Button variant={"outline"} size={"icon"}>
                    <X />
                    </Button> */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CategoryCombo