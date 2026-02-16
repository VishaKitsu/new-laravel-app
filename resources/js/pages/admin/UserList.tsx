import AppLayout from '@/layouts/app-layout';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { index } from '@/routes/user';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Form } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { EllipsisIcon, Trash2Icon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'UserList',
    href: index.url()
  },
];

type UserType = {
  id: number;
  name: string;
  email: string;
  created_at?: string;
};

const UserList = ({ userData }: { userData: UserType[] }) => {
  const currentUser = usePage().props.auth;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User List" />
      {/* <Button onClick={()=>console.log(currentUser)}>Props</Button> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>
            Are you sure you want to delete your account?
          </DialogTitle>
          <DialogDescription>
            Once your account is deleted, all of its resources
            and data will also be permanently deleted. Please
            enter your password to confirm you would like to
            permanently delete your account.
          </DialogDescription>

          <Form
            {...ProfileController.destroy.form()}
            options={{
              preserveScroll: true,
            }}
            onError={() => passwordInput.current?.focus()}
            resetOnSuccess
            className="space-y-6"
          >
            {({ resetAndClearErrors, processing, errors }) => (
              <>
                <div className="grid gap-2">
                  <Label
                    htmlFor="password"
                    className="sr-only"
                  >
                    Password
                  </Label>

                  <Input
                    id="password"
                    type="password"
                    name="password"
                    ref={passwordInput}
                    placeholder="Password"
                    autoComplete="current-password"
                  />

                  <InputError message={errors.password} />
                </div>

                <DialogFooter className="gap-2">
                  <DialogClose asChild>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        resetAndClearErrors()
                      }
                    >
                      Cancel
                    </Button>
                  </DialogClose>

                    <Button
                      variant="destructive"
                      disabled={processing}
                      asChild
                    >
                      <button
                        type="submit"
                        data-test="confirm-delete-user-button"
                      >
                        Delete account
                      </button>
                    </Button>
                </DialogFooter>
              </>
            )}
          </Form>
        </DialogContent>
      </Dialog>
      <div className='p-4 border rounded-xl shadow m-4'>
        <Table>
          <TableCaption>A list of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.created_at && new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  }
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size={'icon-sm'}>
                        <EllipsisIcon/>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem disabled={user.id !== currentUser.user?.id} variant='destructive' onSelect={()=>setIsDialogOpen(true)}>
                        <Trash2Icon/>
                        Delete
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>
                        <UserIcon />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCardIcon />
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SettingsIcon />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <LogOutIcon />
                        Log out
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>            
            ))}
            {/* <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
        {/* <DeleteUser/> */}
      </div>
    </AppLayout>
  );
};

export default UserList;
