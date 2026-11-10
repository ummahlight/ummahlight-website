# Ruqyah and reciter expansion — implementation requirements

Saved: 2026-11-10. Development-only. No production deployment authorized.

## Verified existing implementation
- `index.html` already has a Quran reciter selector with three fallback entries (Alafasy, As-Sudais, Maher Al-Muaiqly).
- `loadReciters()` fetches `https://api.alquran.cloud/v1/edition?format=audio`, filters Arabic verse-by-verse editions and deduplicates by identifier. Audit display-name duplication (one person can have multiple identifiers), stable IDs, selection handling and whether every chosen reciter actually supplies audio.
- Quran selections include individual ruqyah passages, a short continuous listening sequence and an extended selection labelled 69 verses. Audit actual counts, sequence and audio before representing as verified.
- Existing lecture copy says users must open original publisher platform. The requested change is in-page embedded playback where permitted.

## Reciter expansion
1. Maintain canonical reciter metadata: unique human-readable name, source edition identifier, pronunciation/language, license/attribution, availability status.
2. Deduplicate by canonical reciter identity, not only edition identifier; permit distinct recordings/riwayat as separately labelled editions under one reciter when relevant.
3. Add more well-known reciters only if real playable audio editions are available. Potential candidates for source verification: Abdul Basit Abdus Samad, Muhammad Siddiq Al-Minshawi, Mahmoud Khalil Al-Husary, Saad Al-Ghamdi, Abu Bakr Ash-Shatri, Yasser Ad-Dossary, Nasser Al-Qatami, Abdullah Basfar, Ali Al-Hudhaify, Ahmed Al-Ajmi. Do not invent edition IDs or assert availability.
4. On selection, load that reciter's actual audio; never silently fall back to Alafasy. Report missing or failed tracks, offer explicit alternative only on user action.
5. Mobile-friendly reciter search and list, accessible labels, unique entries and playback tests for each.

## Ruqyah library and playback
1. Add a dedicated emerald-and-gold Ruqyah reader with Arabic text, source references, translation, selected reciter, and audio controls.
2. Provide selectable curated programmes: short, medium (50+ verses) and extended (200+ verses if source mapping is verified). Include chapter/verse references and accurate counts; don't assert that any specific count is a fixed Sunnah formula.
3. At minimum include al-Fatihah 1:1-7; Ayat al-Kursi 2:255; last two of al-Baqarah 2:285-286; al-Ikhlas 112; al-Falaq 113; an-Nas 114. Further selections require individually verified references and transparent editorial rationale.
4. One Play button starts a continuous queue; prefetch next verse, support pause/resume, next/previous, repeat, speed where supported, seek to selected passage, and highlight current verse. Handle network interruption without replaying a different reciter. Track progress locally with privacy-conscious storage.
5. Do not join arbitrary verse MP3s into one file without verifying licenses and audio continuity. Continuous playback of an ordered queue can meet the user experience without owning/distributing a new derivative recording.
6. Curate complete Ruqyah recordings from official reciter/publisher channels; store verified YouTube video IDs and embed with official iframe player if embedding is allowed. Never fabricate video IDs, download/rehost copyrighted media, extract YouTube audio without permission, or promise permanence when publisher controls availability.
7. Audio-only Ruqyah player: use independently licensed direct audio files or an official embeddable player. A YouTube video cannot be silently repackaged as an audio-only MP3.
8. Add a note that ruqyah is a religious practice and not a substitute for medical care. Distinguish Quran verses from authenticated Prophetic supplications and editor-curated sequences.

## Test before release
- Reciter list contains no duplicate displayed names; at least three verified alternatives beyond existing fallbacks if available.
- Every chosen reciter plays their own audio for several different surahs and Ruqyah selections; no Alafasy fallback.
- 50+ and 200+ verse queues have counted, unique ordered verse references, correctly rendered text and uninterrupted progression.
- Mobile background audio behavior, play/pause/resume, network recovery, accessibility and browser compatibility.
- Every embedded video opens and plays inside the page if publisher allows; unavailable embeds show a clear message.
- No Netlify production deployment or PR merge until approval and credit budget review.
