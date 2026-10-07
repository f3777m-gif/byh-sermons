const V="sy-v1";const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","index.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
 if(u.pathname.indexOf("/t/")>=0){e.respondWith(caches.open(V).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.ok)c.put(e.request,n.clone());return n}))));return}
 e.respondWith(fetch(e.request).then(n=>{if(n.ok){const cp=n.clone();caches.open(V).then(c=>c.put(e.request,cp))}return n}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});
