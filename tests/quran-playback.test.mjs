import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const full=html.match(/function playFullSurah\(\)\{[\s\S]*?\};function preloadNext\(i\)/)?.[0];
test('full-surah playback respects selected reciter rather than fixed Alafasy audio',()=>{assert.ok(full,'playFullSurah found');assert.match(full,/reciter/);assert.match(full,/playVerse\(0,true\)/);assert.doesNotMatch(full,/audio-surah\/128\/ar\.alafasy/)});
test('full-surah playback refuses incomplete audio list',()=>{assert.match(full,/ayahAudio\.length!==document\.querySelectorAll/);assert.match(full,/ayahAudio\.some/)});
test('surah uses selected audio edition',()=>{assert.match(html,/getJSON\(\x60\$\{api\}\/surah\/\$\{n\}\/\$\{\$\('reciter'\)\.value\}\x60\)/)});
