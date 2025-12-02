// payment/checkout

import axios from "axios"

export const paymentApi =async(payload)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/checkout`,
        payload,
         {
             headers:{'Content-Type':'application/json'},
            withCredentials:true
        }
    )
    return res.data
}


export const PaymentCheckoutApi=async(sessionId)=>{
     const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/payment/checkout-success`,
    { sessionId }, // ✅ sessionId backend ko bhej rahe
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return res.data;
}