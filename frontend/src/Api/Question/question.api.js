import axios from "axios"

export const getQuizQuestionApi = async(quizId)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/question/getQuestion/${quizId}`,
         {
            headers: { "Content-Type": "application/json" },
            withCredentials:true
        }
    )

    return res.data
}

export const createQuestionApi = async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/question/createQuestion`,
        payload,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials:true
        }
    )

    return res.data
}