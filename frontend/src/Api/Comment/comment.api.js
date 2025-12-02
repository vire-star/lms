import axios from "axios";

export const createComment = async ({ moduleId, comment }) => {  // ✅ Destructure params
    const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/comment/postComment/${moduleId}`,  // ✅ Now moduleId is defined
        { comment },  // ✅ Send only comment in body
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    );

    return res.data;
}



export const getCommentApi = async(moduleId)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/module/getComments/${moduleId}`,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    )

    return res.data
}