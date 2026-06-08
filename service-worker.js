/* REPROGEN CENTRAL — Service Worker */
var CACHE = 'reprogen-central-v1'; /* bumpar a cada deploy */
var SHELL = [
  './central.html',
  './manifest.json',
  './icons/favicon.ico',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/icon-maskable-192x192.png',
  './icons/icon-maskable-512x512.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.all(SHELL.map(function(u){
        return c.add(u).catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k.indexOf('reprogen-central-')===0 && k!==CACHE) return caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  if(e.request.method!=='GET') return;
  if(e.request.mode==='navigate'){
    e.respondWith(
      fetch(e.request).then(function(r){
        var c=r.clone();
        caches.open(CACHE).then(function(ch){ch.put('./central.html',c);});
        return r;
      }).catch(function(){
        return caches.match('./central.html');
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(cached){
      var net=fetch(e.request).then(function(r){
        if(r&&r.status===200){var c=r.clone();caches.open(CACHE).then(function(ch){ch.put(e.request,c);});}
        return r;
      }).catch(function(){return cached;});
      return cached||net;
    })
  );
});
