export async function subscribeToPush() {
    if(!('serviceWorker' in navigator)) return;

    const registration = await navigator.serviceWorker.ready; // for checking the service worker is ready,if not wait until.

    const vapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(vapidKey)
    });
    return subscription;
}

// helper function to convert base64 VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}


export async function unsubscribeFromPush() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      const success = await subscription.unsubscribe();
      console.log("Unsubscribed from push:", success);
      return success;
    } else {
      console.log("No active subscription found");
      return false;
    }
  } catch (err) {
    console.error("Failed to unsubscribe:", err);
    return false;
  }
}
