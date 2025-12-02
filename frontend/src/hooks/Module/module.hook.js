import { createModuleApi } from '@/Api/Module/module.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateModule =()=>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:createModuleApi,
        onSuccess:(data)=>{
            console.log(data)
            queryClient.invalidateQueries(['getAllCourse'])
            toast.success("Module Added successfully")
        }
    })

}