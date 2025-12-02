import { createComment, getCommentApi } from '@/Api/Comment/comment.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const usePostComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createComment,  // Receives { moduleId, comment }
        onSuccess: (data) => {
            console.log("Comment posted:", data);
            toast.success("Comment posted successfully")
            queryClient.invalidateQueries(['getComment'])
            
            
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || error.message || "Failed to post comment";
                toast.error(errorMessage);
        }
    });
}


export const useGetComment = (moduleId) => {
    return useQuery({
        queryKey: ['getComment', moduleId],  // ✅ Include moduleId in key
        queryFn: () => getCommentApi(moduleId),  // ✅ Pass moduleId to API
        enabled: !!moduleId  // ✅ Only run when moduleId exists
    });
}