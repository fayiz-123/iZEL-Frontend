import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ToastFixer() {
  useEffect(() => {
    const interval = setInterval(() => {
      toast.dismiss(); // clear any stuck toasts every 10s
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
