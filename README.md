# UmmahLight Premium Edition

A responsive Islamic community website for Worldwide Islamic Prayer Family Foundation.

## Deployment
1. Back up your existing GitHub repository first. This package is a **replacement website**, not a patch to the old src.jsx React app.
2. Upload the contents of this directory to the root of the GitHub repository (not the ZIP itself). Remove or archive old conflicting files. GitHub should contain `index.html`, `style.css`, `app.js`, `package.json`, `build.mjs`, `netlify.toml` and `netlify/functions/chat.mjs`.
3. On Netlify, configure build command `npm run build`, publish directory `dist`, and functions directory `netlify/functions`. Trigger a new deploy.
4. For Ummah AI, add `OPENAI_API_KEY` as a **Netlify environment variable**, not to GitHub or JavaScript. Set scope to Functions if prompted. An API key requires separate API billing. Optionally set `OPENAI_MODEL` to a model available to your API account. Redeploy.
5. Check Qur'an, prayer times, calendar, TV and chat after deployment.

## Feature status / limitations
- Qur'an: 114-surah list and Arabic + English translations fetched on-page from AlQuran Cloud API. Not bundled for offline use; API uptime and edition licensing should be checked.
- Hadith: six sample narrations with references. This is NOT a complete hadith database. Verify wording/references before public religious use.
- Prayer times: calculated on-page through Aladhan's API based on city, country and chosen method; not mosque-verified. No browser location permission required.
- Calendar: local Gregorian month navigator and current Hijri date from Aladhan; Hijri month grid is not implemented. Moon sightings may differ.
- WPF TV: featured YouTube video embedded on page; channel navigation links are external by design. Latest-upload automation and live detection require a separate YouTube Data API integration. Confirm featured video ID and embedding permission.
- AI: backend OpenAI Responses API proxy in Netlify Function. Needs OPENAI_API_KEY, paid API access and deployment. No AI claims to be a qualified scholar. For production, add abuse protection, rate limiting, logging policy, privacy notice and moderation.
- Charity, counselling, scholarships and founder sections are currently informational placeholders; no forms, payments, applications or founder image are configured.

## Security
Never commit API keys or credentials. Public website content and user questions should not include sensitive personal information. For production consider a privacy policy and consent disclosures for third-party APIs.
