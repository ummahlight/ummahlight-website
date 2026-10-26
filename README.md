# UmmahLight — Complete Redesign

This is the **full replacement website project**, not a partial patch. It retains the original Vite/React + Netlify Functions architecture.

## What changed
- A shorter homepage with 7 clickable directory cards.
- Dedicated in-site pages: About, Islamic Library, Guidance & Counselling, Charity & Scholarships, Videos & Live, Founder, Contact.
- Official Worldwide Prayer Family Foundation YouTube channel link.
- Responsive navigation, accessibility improvements, readable typography and mobile layout.
- Chat with Islam preserved through `netlify/functions/chat.mjs`.

## Publish with GitHub and Netlify
1. Back up your existing repository or download it first.
2. Open your `ummahlight-website` GitHub repository and replace the old project files with **all files and folders from this package** (keep the directory structure).
3. Commit changes to `main`. If Netlify is linked to this repository, it should rebuild automatically.
4. Build command: `npm run build`; publish directory: `dist` (also configured in `netlify.toml`).
5. In Netlify, set `OPENAI_API_KEY` as a **secret environment variable** if you want AI chat to work. Never put API keys in GitHub or `src.jsx`. Chat may incur API usage costs.

## Details to finish before launch
- Replace `public/ADD_FOUNDER_PHOTO_HERE.txt` with a real photo saved exactly as `public/founder.jpg`.
- In `src.jsx`, edit the `CONFIG` object at the top to add a verified foundation email and social links. The contact form does not send until a verified email is added.
- The supplied YouTube handle is `@worldwideprayerfamilyfoundatio` from the user's channel screenshot; confirm it opens the correct channel.
- Quran, Hadith, prayer times and calendars link to external sources. The site does not itself host the complete Qur’an or compute prayer times.
- Confirm that your Netlify deployment has no errors and test every page and mobile view before public promotion.

## Local development
```
npm install
npm run dev
npm run build
```

This is a full website source ZIP. Uploading only the ZIP to an existing static Netlify site is not sufficient; it must be built from the GitHub source using Netlify's Vite build process.
