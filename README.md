# UmmahLight Compact — replacement website

A static HTML/CSS/JS website with a Netlify AI function. No npm build step is needed.

## Deploy
1. Back up your existing GitHub repository or create a new repository.
2. Upload the **contents** of this folder (not the outer folder) to the root of the GitHub repository. Remove old root website files that are no longer used, especially old build scripts and old `package.json` if you are replacing the previous project completely.
3. On Netlify connect the repository. Base directory: blank. Build command: blank. Publish directory: `.`. Functions directory: `netlify/functions`.
4. Add environment variable `OPENAI_API_KEY` in Netlify project configuration (never in GitHub). Optionally `OPENAI_MODEL` (default `gpt-4o-mini`). Redeploy after adding environment variables. A funded API account may be required; ChatGPT subscriptions do not include API usage.
5. Test Quran, transliteration, prayer times, and AI on the deployed site. API calls require an internet connection.

## Before making public
- WPF TV currently links to a YouTube search, rather than displaying an unverified embedded video. Replace that link with the verified official channel URL and optionally add a verified video/playlist iframe.
- Verify all religious text and source references with qualified reviewers.
- Verify Hijri dates and prayer times with local mosque standards. Dates may differ by moon sighting.
- Add verified foundation contact details and a genuine founder photograph, if desired.
- Verify Netlify function works after deployment; local file previews cannot execute serverless functions.
