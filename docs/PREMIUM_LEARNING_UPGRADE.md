# UmmahLight premium learning upgrade — saved development brief

Status: DRAFT ONLY. Branch: development/premium-learning-upgrade. Do not merge or deploy until approved, tested, and Netlify credits are available.

## Repository audit (2026-11-10)
- Main branch includes a large self-contained `index.html` (inline styles and scripts), plus `app.js`, `style.css`, and `build.mjs`.
- `build.mjs` copies all three files into `dist`; changes to external CSS alone might not affect components styled by inline CSS. Identify which application is actually running on the production domain and installed app before changing functionality.
- Existing `app.js` contains a six-item introductory hadith collection; it is not a comprehensive verified hadith corpus. Do not describe it as complete.
- Preserve working production and existing Quran PR #4; review conflicts before integrating.
- Netlify production deployments are the dominant credit expense (195 of 198.9 credits used in user's Nov 10 screenshot). Avoid deploys until release approval. Note previews/builds can also incur usage.

## Unified emerald and gold design
Apply consistent, accessible reading cards to Quran, Hadith, Hadith Qudsi, Q&A, tafsir, du'a, lectures and learning pages. Deep emerald background (#073b32), darker surface (#052b26), warm gold accent (#e6bd65), off-white text (#f5f4e9). Ensure contrast, Arabic RTL, responsive typography, keyboard navigation, reduced motion, mobile legibility, and a light-mode option. Use shared components or design tokens, not duplicated one-off styles.

## Scholarly reliability (mandatory before publishing)
- For each hadith: collection, book/chapter, narration number, Arabic original, verified translation, grade where relevant, source link, provenance, edition/numbering note.
- Commentary must be traceable to a named Sunni scholar and an actual identifiable work/page, with accurate attribution and permission to quote. Never invent a scholar's opinion or attribute AI-generated commentary to a scholar.
- Separate three labeled fields: 'Source text', 'Scholar's explanation' (verified and cited), and 'Plain-language learning notes' (original editorial explanation, marked as such). Scholarly review before publishing legal rulings or sensitive interpretations.
- Hadith Qudsi: explain definition and distinction from Quran and Prophetic hadith; source/grade every narration. Do not treat all Qudsi narrations as automatically authentic.
- Context-sensitive material about war, killing, punishment, interfaith relations: present historical circumstances, jurisprudential context, protections for noncombatants, and distinction between individual wrongdoing and lawful authority. Avoid sensational or decontextualized excerpts.
- Q&A: link every answer to verifiable Quran/hadith evidence, indicate differing reputable interpretations where appropriate, distinguish education from fatwa, and provide escalation to qualified scholars.

## Quran and media
- Reciter list: one canonical ID per reciter, deduplicated names, consistent ordering, independently mapped and verified audio source for each selection. Never silently fall back to Alafasy if another reciter fails. Show unavailable status instead.
- Yoruba reciters and lectures: curated, rights-respecting catalog with accurate speaker names, language tags, topics, duration, captions when available and original source attribution. Test audio/video playback individually.
- YouTube lectures: use official embeddable player and verified video IDs; do not copy or claim ownership of videos or promise permanent hosting. Videos may be blocked from embedding or removed by owners. Keep playback inside site when embedding is permitted.
- Avoid auto-play and intrusive advertising in Quran reading or recitation experiences.

## Visitor engagement
Saved reading position, bookmarks, daily Quran reading goal, searchable Hadith library, topical Q&A, prayer timetable with method/timezone, Hijri calendar, accessible du'a collection, Ramadan tools, educational paths, Yoruba/English language filters, transparent content review dates, privacy and feedback pages.

## Monetization
AdSense requires application and approval, original substantial content, valid privacy/consent disclosures and policy compliance. Traffic does not automatically equal earnings. Reserve quiet ad positions outside sacred text, recitation controls and primary reading surfaces. No ads until approval and policy review.

## Mobile and deployment
Determine whether installed app is PWA, TWA, WebView or native. For PWA audit manifest, service-worker caching and update lifecycle; implement versioned cache invalidation and an update notification. Native APK changes may require app updates. Validate mobile production URL and offline/online behavior. Website changes do not automatically propagate to all installed app types.
Develop on branch, run local/static checks and staging review only when cost acceptable. Batch approved changes into one release; verify domain and rollback path. Do not touch production without explicit approval.

## Acceptance checks
- All main pages visually consistent in desktop/mobile.
- Every Quran reciter selects distinct expected audio, without duplicates or silent fallback.
- Hadith citations and commentary verified by reviewer; Q&A clearly sourced.
- Embedded lectures play within site where allowed, with fallback message if blocked.
- Navigation, search, accessibility, bookmarks, prayer times, responsive layout, performance and mobile update behavior tested.
- No unnecessary production deployment; release only after approval.
