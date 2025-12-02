import { createQuestionApi, getQuizQuestionApi } from "@/Api/Question/question.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetQuestion =(quizId)=>{
    return useQuery({
            queryKey:['getQuestion',quizId],
            queryFn:()=>getQuizQuestionApi(quizId),
            
        })
}


export const useCreateQuestion =()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:createQuestionApi,
        onSuccess:(data)=>{
            queryClient.invalidateQueries(['getQuestion'])
            console.log(data)
        }
    })

}