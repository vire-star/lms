import { paymentApi, PaymentCheckoutApi } from '@/Api/Payment/payment.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const usePaymentHook =()=>{
    return useMutation({
        mutationFn:paymentApi,
        onSuccess:(data)=>{
            // console.log(data)
            toast.success(data?.message)
            if (data.url) {
                window.location.href = data.url;  // ✅ Redirect to Stripe
            }
        }
    })
}


export const usePaymentCheckOutHook = () => {
  return useMutation({
    mutationFn: (sessionId) => PaymentCheckoutApi(sessionId),
    onSuccess: (data) => {
      console.log("Order created:", data);
      toast.success("Order created successfully!");
    },
    onError: (err) => {
      console.error("Payment error:", err);
      
      // ✅ Agar duplicate error ho to success dikhao (kyunki order pehle se hai)
      const errorMsg = err?.response?.data?.error || "";
      
      if (errorMsg.includes("duplicate key") || errorMsg.includes("already")) {
        toast.success("Order already created!");
      } else {
        toast.error(err?.response?.data?.message || "Payment verification failed");
      }
    },
  });
};