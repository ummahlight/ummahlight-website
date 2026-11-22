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
  if (button && result) button.addEventListener('click', () => {
    if (!navigator.geolocation) { result.textContent = 'Location is unavailable in this browser.'; return; }
    result.textContent = 'Requesting location permission…';
    navigator.geolocation.getCurrentPosition(pos => {
      const rad = Math.PI / 180;
      const lat = pos.coords.latitude * rad, lon = pos.coords.longitude * rad;
      const kaabaLat = 21.422487 * rad, kaabaLon = 39.826206 * rad;
      const d = kaabaLon - lon;
      const y = Math.sin(d) * Math.cos(kaabaLat);
      const x = Math.cos(lat) * Math.sin(kaabaLat) - Math.sin(lat) * Math.cos(kaabaLat) * Math.cos(d);
      const bearing = (Math.atan2(y, x) / rad + 360) % 360;
      result.textContent = 'Qibla: ' + bearing.toFixed(1) + '° clockwise from true north. Use a calibrated compass; magnetic north differs.';
    }, () => { result.textContent = 'Location denied or unavailable. Allow location to calculate the Qibla.'; }, {enableHighAccuracy:false,timeout:12000,maximumAge:600000});
  });
  const reciter = document.getElementById('reciter');
  if (reciter) reciter.addEventListener('change', () => { try { localStorage.setItem('ummah-q-reciter',reciter.value); } catch {} });
  if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
})();
