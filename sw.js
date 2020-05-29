self.addEventListener('install', event => {
    console.log('SW installed');
    event.waitUntil(
        caches.open('cache').then((cache) => {
            return cache.addAll(['index.html',
                                'css/styles.css',
                                'js/index.js',
                                'offline.html'])
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('SW activated');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (!navigator.onLine) {
                if (response) { 
                    return response;
                } else {
                    return caches.match(new Request('offline.html'));
                }
            } else {
                return updateCache(event.request);
            }
        })
    )
});
async function updateCache(request) {
    return fetch(request)
    .then((response) => {
        if(response) {
            return caches.open('cache')
            .then((cache) => {
                return cache.put(request, response.clone())
                .then(() => {
                    return response;
                })
            });
        }
    })
}