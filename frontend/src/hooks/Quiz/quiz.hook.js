import { checkUserQuiz, createQuizApi, getQuizApi } from '@/Api/Quiz/quiz.api'
import { useMutation, useQuery, useQueryClient }from '@tanstack/react-query'
import { toast } from 'sonner';
export const useCreateQuizHook=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:createQuizApi,
        onSuccess:(data)=>{
            queryClient.invalidateQueries(["getAllPurchasedCourse"]);
            // getAllPurchasedCourse
            toast.success(data.message)
            console.log(data)
        }
    })
}



export const useCheckUserQuiz =(moduleId)=>{
    return useQuery({
        queryFn:()=>checkUserQuiz(moduleId),
        queryKey:(['userQuiz', moduleId]),
        enabled: !!moduleId 
    })
}


export const useGetQuiz=(quizId)=>{
    return useQuery({
        queryFn:()=>getQuizApi(quizId),
         queryKey:(['getQuestionQuiz', quizId])
    })
}