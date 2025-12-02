import axios from "axios"

export const LoginApi = async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`,
     payload,
     {
        headers:"Application/content",
        withCredentials:true
     }
    )

    return res.data
}
export const RegisterApi = async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`,
     payload,
     {
        headers:"Application/content",
        withCredentials:true
     }
    )

    return res.data
}
export const LogoutApi = async()=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`,
     {},
     {
        headers:"Application/content",
        withCredentials:true
     }
    )

    return res.data
}


export const getUserApi = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/getUser`,
        {
        headers:"Application/content",
        withCredentials:true
     }
    )

    return res.data
}