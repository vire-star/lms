import { createCourseApi, getAllCourseApi, getAllPurchasedCourse, getSingleCourseApi, getSinglePurchasedCourse } from '@/Api/Course/course.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner';

// ✅ Pass search to API
export const useGetAllCourse = (search) => {
    return useQuery({
        queryKey: ['getAllCourse', search],
        queryFn: () => getAllCourseApi(search)  // ✅ Pass search param
       
    });
}


export const useGetSingleCourse = (courseId)=>{
    return useQuery({
        queryKey:['getAllCourse',courseId],
        queryFn:() => getSingleCourseApi(courseId),
         enabled: !!courseId,
    })
}


export const useGetAllPurchasedCourse =()=>{
    return useQuery({
        queryKey:['getAllPurchasedCourse'],
        queryFn:getAllPurchasedCourse,
        
    })
}

export const useGetSinglePurchasedCourse =(id)=>{
    return useQuery({
        queryKey:['getAllPurchasedCourse',id],
        queryFn:()=>getSinglePurchasedCourse(id),
        
    })
}


export const useCreateCourse = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createCourseApi,  // ✅ Function reference, not call
        onSuccess: (data) => {
            console.log("Course created:", data);
            queryClient.invalidateQueries(['getAllCourse'])
            toast.success(data.message|| "Course Created successfully")
        },
        onError: (error) => {
            console.error("Error creating course:", error);
        }
    });
}
