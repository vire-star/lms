import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from 'react-router-dom'
import { useLogout } from '@/hooks/User/user.hook'
import { useUserStore } from '@/Store/user.store'
const Navbar = () => {
  const navigate = useNavigate()
const {user} = useUserStore()

// console.log(user)
  const yourCourseHandler=()=>{
    navigate("/yourCourse")
  }

  const { mutate: logout } = useLogout()
  const logoutHandler=()=>{
    logout()
  }
  return (
    <div className='flex items-center justify-between   h-[12vh] px-24  shadow-md'>
        <h1>Logo</h1>

        <div className='flex items-center justify-center gap-4'>
            <Popover>

            <PopoverTrigger  className='flex items-center justify-center gap-4 cursor-pointer'>
                <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<h1>{user?.fullName}</h1>
            </PopoverTrigger>
            <PopoverContent className='w-[20vw] flex flex-col gap-4 h-fit '>
                <h1 onClick={yourCourseHandler} className='cursor-pointer p-2 bg-zinc-200 rounded-md'>Your Courses</h1>
                <h1 className='cursor-pointer p-2 bg-zinc-200 rounded-md'>Profile </h1>
                {
                  user?.email==="v@gmail.com" && <h1 onClick={()=>navigate("/dashboard")} className='cursor-pointer p-2 bg-zinc-200 rounded-md'>Dashboard </h1>
                }
                <h1 onClick={logoutHandler} className='cursor-pointer p-2 bg-zinc-200 rounded-md'>Logout </h1>
            </PopoverContent>

            </Popover>

        </div>
    </div>
  )
}

export default Navbar