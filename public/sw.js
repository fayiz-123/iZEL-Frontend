self.addEventListener('push', event => {
    if (event.data) {
        const payLoad = event.data.json();
        const { title, body, icon, tag, url } = payLoad;

        event.waitUntil(
            self.registration.showNotification(title, {
                body,
                icon,
                data: { url },
                tag: tag || "default-notification",
            })
        )
    }
})

self.addEventListener('notificationclick', function (event) {
    event.notification.close(); // Close the notification immediately

    event.waitUntil(
        (async () => {
            const allClients = await clients.matchAll({
                type: 'window',
                includeUncontrolled: true
            });

            const urlToOpen = new URL(event.notification.data?.url || '/', self.location.origin).href;
            // Check if a tab with the same URL is already open
            for (const client of allClients) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus(); // Focus the existing tab instead of opening a new one
                }
            }

            // If no tab is open, open a new one
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })()
    );
});
