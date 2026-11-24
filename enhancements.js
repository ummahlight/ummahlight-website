'use strict';
// Progressive enhancement: never block the main Qur'an reader if a device API is unavailable.
(() => {
  const names = [
    ['الرَّحْمَٰنُ','Ar-Rahman','The Entirely Merciful'],
    ['الرَّحِيمُ','Ar-Rahim','The Especially Merciful'],
    ['الْمَلِكُ','Al-Malik','The King'],
    ['الْقُدُّوسُ','Al-Quddus','The Most Holy'],
    ['السَّلَامُ','As-Salam','The Source of Peace'],
    ['الْمُؤْمِنُ','Al-Mu’min','The Giver of Security'],
    ['الْعَزِيزُ','Al-Aziz','The Almighty'],
    ['الْحَكِيمُ','Al-Hakim','The All-Wise']
  ];
  const label = document.getElementById('ummahName');
  let i = 0;
  if (label) {
    const show = () => { const n = names[i++ % names.length]; label.textContent = n.join(' · '); };
    show();
    setInterval(show, 7000);
  }
  const button = document.getElementById('ummahQibla');
  const result = document.getElementById('ummahQiblaResult');
  const verses=[['فَإِنَّ مَعَ الْعُسْرِ يُسْرًا','Indeed, with hardship comes ease.','94:5'],['وَقُل رَّبِّ زِدْنِي عِلْمًا','And say: My Lord, increase me in knowledge.','20:114'],['إِنَّ اللَّهَ مَعَ الصَّابِرِينَ','Indeed, Allah is with the patient.','2:153 (excerpt)'],['فَاذْكُرُونِي أَذْكُرْكُمْ','Remember Me; I will remember you.','2:152 (excerpt)']];
  if(label){const card=document.createElement('div');card.style.cssText='margin:12px auto;max-width:650px;padding:12px;border:1px solid #9ab6a8;border-radius:12px';const ar=document.createElement('div'),en=document.createElement('div');ar.lang='ar';ar.dir='rtl';ar.style.cssText='font-family:Amiri,serif;font-size:clamp(26px,5vw,40px);font-weight:bold;line-height:1.7;color:#fff';card.append(ar,en);label.parentElement.append(card);let j=0;function draw(){const v=verses[j++%verses.length];ar.textContent=v[0];en.textContent=v[1]+' — Qur’an '+v[2]}draw();setInterval(draw,15000)}
  if(button&&result){
    const dialog=document.createElement('dialog');dialog.style.cssText='width:min(94vw,460px);max-height:90vh;overflow:auto;border:1px solid #b8d4c6;border-radius:20px;padding:20px;background:#f8faf5;color:#103e35;text-align:center';
    dialog.innerHTML='<h2>Qibla Compass</h2><p id="qiblaBearing">Requesting location…</p><div style="position:relative;width:min(72vw,300px);aspect-ratio:1;margin:18px auto;border:5px solid #174d42;border-radius:50%;background:#fff"><div style="position:absolute;inset:5%;border:1px dashed #9ab6a8;border-radius:50%"></div><b style="position:absolute;top:5%;left:47%">N</b><b style="position:absolute;right:6%;top:47%">E</b><b style="position:absolute;bottom:5%;left:47%">S</b><b style="position:absolute;left:6%;top:47%">W</b><div id="qiblaArrow" style="position:absolute;inset:12%;display:flex;justify-content:center;align-items:flex-start;transform-origin:center;transition:transform .15s linear;font-size:44px;color:#08754f">▲</div><span style="position:absolute;top:43%;left:43%;font-size:30px">🕋</span></div><p id="qiblaSensor">Enable compass to align with your phone.</p><button type="button" id="qiblaEnable">Enable compass</button> <button type="button" id="qiblaCalibrate">Calibration help</button><p id="qiblaHelp" hidden>Move your phone in a figure-eight pattern several times, away from metal and magnets. Then lay it flat. Compare with a trusted compass if uncertain.</p><button type="button" id="qiblaClose">Close</button>';
    document.body.append(dialog);let bearing=null,heading=null,active=false;
    const el=id=>document.getElementById(id);
    function paint(){if(bearing===null)return;el('qiblaArrow').style.transform='rotate('+((bearing-(heading??0)+360)%360)+'deg)';el('qiblaSensor').textContent=heading===null?'True-north bearing shown; live heading unavailable.':'Live device heading. Magnetic interference and sensor accuracy can affect alignment.'}
    function orient(e){if(!active)return;const h=typeof e.webkitCompassHeading==='number'?e.webkitCompassHeading:(e.absolute&&typeof e.alpha==='number'?(360-e.alpha)%360:null);if(h!==null){heading=h;paint()}}
    window.addEventListener('deviceorientationabsolute',orient);window.addEventListener('deviceorientation',orient);
    el('qiblaEnable').onclick=async()=>{try{if(!window.DeviceOrientationEvent)throw Error();if(typeof DeviceOrientationEvent.requestPermission==='function'&&await DeviceOrientationEvent.requestPermission()!=='granted')throw Error();active=true;el('qiblaSensor').textContent='Waiting for absolute compass heading…';}catch{el('qiblaSensor').textContent='Compass permission or sensor unavailable; use the true-north bearing.'}};
    el('qiblaCalibrate').onclick=()=>{el('qiblaHelp').hidden=!el('qiblaHelp').hidden};el('qiblaClose').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{active=false;heading=null});
    button.onclick=()=>{dialog.showModal();bearing=null;heading=null;el('qiblaBearing').textContent='Requesting location…';if(!navigator.geolocation){el('qiblaBearing').textContent='Location unavailable';return}navigator.geolocation.getCurrentPosition(pos=>{const rad=Math.PI/180,lat=pos.coords.latitude*rad,lon=pos.coords.longitude*rad,k=21.422487*rad,d=39.826206*rad-lon;bearing=(Math.atan2(Math.sin(d)*Math.cos(k),Math.cos(lat)*Math.sin(k)-Math.sin(lat)*Math.cos(k)*Math.cos(d))/rad+360)%360;el('qiblaBearing').textContent=bearing.toFixed(1)+'° clockwise from true north';result.textContent='Qibla: '+bearing.toFixed(1)+'°';paint()},()=>{el('qiblaBearing').textContent='Location denied or unavailable. Allow location and retry.'},{enableHighAccuracy:true,timeout:15000,maximumAge:60000})};
  }
  const reciter = document.getElementById('reciter');
  if (reciter) reciter.addEventListener('change', () => { try { localStorage.setItem('ummah-q-reciter',reciter.value); } catch {} });
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
})();
