self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open('restaurant-V1').then(function(cache){
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                '/data/restaurants.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',  
            ]).then(()=>{
                console.log('Caching all files');
            }).catch((error)=>{
                console.log('Failed '+error);
            }) 
        })
    )
});

self.addEventListener('activate',function(event){
    event.waitUntil(
        caches.keys().then(cacheN =>{
            return Promise.all(
     cacheN.map(cacheN =>{
    if(cacheN != 'restaurant-V1'){
        return caches.delete(cacheN);
    }
})
            )
        })
    )
})
   
self.addEventListener('fetch',function(event){
    event.respondWith(
        caches.match(event.request).then(response =>{
            if (response){
                return response;
            }
            return fetch(event.request)
        })
    )
})
