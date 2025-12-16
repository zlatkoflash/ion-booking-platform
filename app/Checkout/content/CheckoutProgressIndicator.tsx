import { CheckCircle, CreditCard, ShoppingCart } from "lucide-react";
import { useBookingCheckout } from "../CheckoutProvider";

export default function CheckoutPrograssIndicator() {


  const {
    step,
  } = useBookingCheckout();

  return <div className="flex items-center justify-center mb-12">
    <div className="flex items-center space-x-4">


      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'contact' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
        }`}>
        {step === 'checkout' ? <ShoppingCart className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
      </div>


      <div className={`h-1 w-16 ${step === 'contact' ? 'bg-gray-300' : 'bg-green-600'}`}></div>


      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${(() => {

        if (step === 'contact') return 'bg-gray-300 text-gray-500';
        // if (step === 'contact') return "bg-blue-600 text-white";
        // else if (step === "checkout") return 'bg-gray-300 text-gray-500';
        // else if (step === "checkout") return 'bg-green-600 text-white';
        else if (step === "checkout") return 'bg-blue-600 text-white';
        else if (step === 'processing') return "bg-blue-600 text-white";
        else if (step === "success") return "bg-green-600 text-white";
        return "bg-red-300 text-red-500";
      })()
        }`}>
        <CreditCard className="w-5 h-5" />
      </div>
      <div className={`h-1 w-16 ${
        // step === 'success' ? 'bg-green-600' : 'bg-gray-300'
        (() => {
          // if (step === 'checkout') return 'bg-gray-300';
          // else if (step === 'processing') return 'bg-gray-300';
          if (step !== "completed") return 'bg-gray-300';
          return 'bg-green-600';
        })()
        }`}></div>
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
        // step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500'
        (() => {
          // if (step === 'checkout') return 'bg-gray-300 text-gray-500';
          // else if (step === "processing") return 'bg-gray-300 text-gray-500';
          if (step !== 'completed') return 'bg-gray-300 text-gray-500';
          return "bg-green-600 text-white";
        })()
        }`}>
        <CheckCircle className="w-5 h-5" />
      </div>
    </div>
  </div>
}