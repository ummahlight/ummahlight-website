const CACHE='ummahlight-shell-v4';
const SHELL=['./','./index.html','./enhancements.js','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ummahlight-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{if(res.ok){const copy=res.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(r,copy)))}return res}).catch(async()=>await caches.match(r)||await caches.match('./index.html')));
    return;
  }
  if(/\.(?:css|js|svg|png|webmanifest)$/.test(new URL(r.url).pathname)){
    e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok){const copy=res.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(r,copy)))}return res}).catch(()=>caches.match(r)));
  }
});
