import axios from "axios"

export const DashboardApi = async()=>{
    const res =await axios.get(`${import.meta.env.VITE_BASE_URL}/analytic/overview`,

        {
             headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    )

    return res.data

}



export const dailySalesApi = async (startDate, endDate) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/analytic/daily-enrollments`, {
    params: { startDate, endDate },
    withCredentials: true,
  });
  return res.data; // [{ date, sales, revenue }]
};