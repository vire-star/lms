import { getUserApi, LoginApi, LogoutApi, RegisterApi } from "@/Api/User/user.api"
import {  useMutation, useQuery } from "@tanstack/react-query"
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