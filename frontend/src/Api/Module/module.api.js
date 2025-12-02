import axios from "axios"

export const createModuleApi = async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/module/createModule/`,
        payload,
        {
            headers: { "Content-Type": "multipart/form-data"  },
            withCredentials:true
        }
    )
    return res.data
}