import toast from "react-hot-toast";
import { subscribeToPush } from "../utils/subscribeToPush";
import { addSubscription } from "../services/subscriptionService";

export function showNotificationBanner() {
  // Don’t show if already decided
  if (Notification.permission !== "default") return;

  toast.custom(
    (t) => (
      <div className="bg-white shadow-xl rounded-xl p-4 flex items-center justify-between gap-4 border border-gray-200 w-[360px]">
        <div>
          <p className="font-medium text-gray-900">Stay Updated!</p>
          <p className="text-sm text-gray-600">
            Enable notifications to get the latest updates instantly.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              const permission = await Notification.requestPermission();
              if (permission !== "granted") {
                toast.error("Notifications blocked");
                return;
              }

              try {
                const subscription = await subscribeToPush();
                await addSubscription(subscription);
                toast.success("You are now subscribed 🎉");
              } catch (err) {
                toast.error("Failed to subscribe");
                console.error(err);
              }
            }}
            className="px-3 py-1 bg-black text-white text-sm rounded-lg"
          >
            Allow
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-200 text-sm rounded-lg"
          >
            Later
          </button>
        </div>
      </div>
    ),
    { duration: 8000 }
  );
}
