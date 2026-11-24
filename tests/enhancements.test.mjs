import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const html=fs.readFileSync('index.html','utf8');
const script=fs.readFileSync('enhancements.js','utf8');
const sw=fs.readFileSync('sw.js','utf8');
test('Quran has visible resume control and saved position',()=>{
  assert.match(html,/id="resumeQuran"/);
  assert.match(html,/ummah-q-resume/);
  assert.match(html,/addEventListener\('timeupdate',saveListening\)/);
});
test('Reciter labels are deduplicated by normalised name',()=>assert.match(html,/normalize\('NFKD'\)/));
test('Accessible Arabic reader is included',()=>{
  assert.match(html,/font-size:clamp\(36px,4vw,52px\)/);
  assert.match(html,/quran-reader/);
});
test('Qibla requires permission and uses Kaaba coordinates',()=>{
  assert.match(script,/getCurrentPosition/);
  assert.match(script,/21\.422487/);
  assert.match(script,/39\.826206/);
});
test('Offline shell includes enhancement script and avoids caching third-party audio',()=>{
  assert.match(sw,/enhancements\.js/);
  assert.match(sw,/origin!==self\.location\.origin/);
  assert.doesNotMatch(sw,/\.mp3/);
});
test('Build includes enhancement script',()=>assert.match(fs.readFileSync('build.mjs','utf8'),/'enhancements\.js'/));
