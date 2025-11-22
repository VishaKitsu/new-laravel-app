import { Dot } from "lucide-react";

type UserType = {
  id: number,
  name: string,
  email: string,
};

const UserList = ({ userData } :{ userData: UserType[] }) => {
  return (
    <>
      {userData.map(user => (
        <div key={user.id} className="group transition border rounded-md text-sm py-1 px-2 grid grid-cols-4 hover:translate-x-2 hover:border-blue-600 hover:border-s-8">
          <div className="flex"><Dot strokeWidth={3} color="#ff0a0a" className="transition group-hover:scale-200"/>{user.id}</div>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      ))}
    </>
  )
}

export default UserList