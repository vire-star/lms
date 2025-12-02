import axios from "axios"


export const getAllCourseApi = async (search) => {
    const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/course/getAllCourse`,  // ✅ Or '/course/search'
        {
            params: search ? { search } : {},
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        }
    );
    return res.data;
}


export const createCourseApi = async (payload) => {
    // payload should be FormData with: title, description, thumbnail (file)
    const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/course/createCourse`,
        payload,  // FormData object
        {
            headers: { 
                "Content-Type": "multipart/form-data"  // ✅ For file upload
            },
            withCredentials: true
        }
    );
    return res.data;
}




export const getSingleCourseApi = async(courseId)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/getSingleCourse/${courseId}`,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials:true
        }

    )
    return res.data
}


export const getAllPurchasedCourse = async()=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/getAllCoursePurchased`,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials:true
        }

    )
    return res.data
}
export const getSinglePurchasedCourse = async(id)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/course/purchasedCourse/${id}`,
        {
            headers: { "Content-Type": "application/json" },
            withCredentials:true
        }

    )
    return res.data
}

// course/purchasedCourse/6924242cdf1217b60205ae73