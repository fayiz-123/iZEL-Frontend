import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ToastFixer() {
  useEffect(() => {
    const interval = setInterval(() => {
      toast.dismiss(); // clear any stuck toasts every 15s
    }, 13000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
