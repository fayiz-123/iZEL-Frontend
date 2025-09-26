self.addEventListener('push', event => {
    if (event.data) {
        const payLoad = event.data.json();
        const { title, body, icon, url } = payLoad;

        event.waitUntil(
            self.registration.showNotification(title, {
                body,
                icon,
                data: { url }
            })
        )
    }
})

self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        client.openWindow(event.notification.data.url || '/')
    )
})

