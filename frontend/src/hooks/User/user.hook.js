import { getUserApi, LoginApi, LogoutApi, RegisterApi, updateProfileApi } from "@/Api/User/user.api"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"



export const useLogin = ()=>{
    const navigate =  useNavigate()
    return useMutation({
    mutationFn:LoginApi,
    onSuccess:(data)=>{
       
        toast.success(data.message)
        navigate("/")
    },
    onError:(err)=>{
        
        toast.error(
        err?.response?.data?.message || 
        err?.message || 
        "Registration failed"
      );
    }
    })
}

export const useRegister = ()=>{
    return useMutation({
    mutationFn:RegisterApi,
    onSuccess:(data)=>{
        console.log(data)
        toast.success(data.message)
    },
    onError:(err)=>{
        console.log(err)
         toast.error(
        err?.response?.data?.message || 
        err?.message || 
        "Registration failed"
      );
    }
    })
}


export const useLogout = ()=>{
    const navigate = useNavigate()
    return useMutation({
    mutationFn:LogoutApi,
    onSuccess:(data)=>{
        // console.log(data)
        toast.success(data.message)
        navigate("/login")
    },
    onError:(err)=>{
        console.log(err)
         toast.error(
        err?.response?.data?.message || 
        err?.message || 
        "Logout failed"
      );
    }
    })
}


export const useGetUser = ()=>{
    return useQuery({
        queryFn:getUserApi,
        queryKey:(['getUser']),
        retry:false
    })
}


export const useUpdateForm =()=>{
    const queryClient  = useQueryClient()
    return useMutation({
        mutationFn:updateProfileApi,
        onSuccess:(data)=>{
            queryClient.invalidateQueries(['getUser'])
            toast.success("profile updated successfully")
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}