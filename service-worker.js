var CACHE='reprogen-central-v1-2';
var ASSETS=['./','./index.html','./manifest.json','./icons/icon-192x192.png','./icons/icon-512x512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(CACHE).then(function(c){return c.put(e.request,cp);}).catch(function(){});return r;}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('./index.html');});}));});
