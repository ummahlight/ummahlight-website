/* Network-first PWA shell: prefer current deployed site, retain last good copy offline. */
const CACHE='ummahlight-shell-v2';
const SHELL=['./','./index.html','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{
 event.waitUntil(
  caches.open(CACHE).then(async cache=>{
   await Promise.allSettled(SHELL.map(url=>cache.add(new Request(url,{cache:'reload'}))));
  }).then(()=>self.skipWaiting())
 );
});
self.addEventListener('activate',event=>{
 event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('ummahlight-shell-')&&key!==CACHE).map(key=>caches.delete(key))))
   .then(()=>self.clients.claim())
 );
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 const url=new URL(request.url);
 const isShell=request.mode==='navigate'||/\.(?:html|css|js|svg|webmanifest)$/.test(url.pathname);
 if(!isShell)return;
 event.respondWith(
  fetch(new Request(request,{cache:'no-store'})).then(response=>{
   if(response.ok){
    const copy=response.clone();
    event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{}));
   }
   return response;
  }).catch(async()=>{
   const cache=await caches.open(CACHE);
   return (await cache.match(request))||(request.mode==='navigate'?await cache.match('./index.html'):undefined)||Response.error();
  })
 );
});
