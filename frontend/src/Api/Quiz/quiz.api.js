import axios from "axios"

export const createQuizApi  =async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/quiz/generateQuiz`,
        payload,
        {
             headers: { "Content-Type": "application/json" },
            withCredentials:true
        }
    )

    return res.data
}

export const getQuizApi  =async(quizId)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/getMyQuiz/${quizId}`,
        
        {
             headers: { "Content-Type": "application/json" },
            withCredentials:true
        }
    )

    return res.data
}
export const checkUserQuiz  =async(moduleId)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/checkUserQuiz/${moduleId}`,
        
        {
             headers: { "Content-Type": "application/json" },
            withCredentials:true
        }
    )

    return res.data
}

