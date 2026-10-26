# Worldwide Islamic Prayer Family Foundation

Premium responsive React website with Islamic learning assistant, counseling services, outreach, and contact form.

## Deploy on Netlify

1. Unzip the project.
2. In Netlify choose **Add new project → Deploy manually** only if uploading a built `dist` folder. For the included source project, use **Import an existing project** from a GitHub repository.
3. Upload this source folder to a GitHub repository and connect the repository to Netlify. Netlify reads `netlify.toml` and runs `npm run build` with publish directory `dist`.
4. In **Project configuration → Environment variables**, set `OPENAI_API_KEY` to your own OpenAI API key. The key is stored on Netlify's server, not in the browser. Optionally set `OPENAI_MODEL` to a supported chat-completions model.
5. Trigger a new deploy after saving environment variables.
6. Test **Chat with Islam**. OpenAI API use incurs separate usage charges.

## If you need drag-and-drop deployment

On a computer with Node.js, run `npm install && npm run build`. Upload the resulting `dist` folder to Netlify Drop. Note: manual static deploys do not automatically include the `netlify/functions/chat.mjs` function, so **AI chat will not work** with a simple dist drag-and-drop. Use the Git-connected deployment method above for the complete site.

## Personalize before public launch

In `src.jsx`, update the `CONFIG` object at the top with verified phone, WhatsApp, email, and social links. Contact details were intentionally left blank rather than guessed. The contact form currently prepares an email only after an email address is set. For a full counseling booking system, integrate a booking service and secure form handling. Founder quotation is labeled as editorial copy rather than falsely attributed speech. Replace illustrative visual motifs with permission-cleared photographs if desired.

## Safety and production

The AI is educational and may make mistakes; it should not be treated as a qualified scholar, therapist, or emergency service. Review privacy, consent, abuse prevention, API cost limits and rate limiting before a public campaign. The starter serverless endpoint has input validation but no per-IP rate limit; add Netlify edge protections or equivalent before major traffic. Do not collect confidential counseling records through this demo. Add your privacy policy, terms, and verified contact channels before launch.


## UmmahLight upgrades
- Add your own founder photo at `public/founder.jpg` (replaceable at any time). No invented portrait is included.
- Qur’an, prayer times, Hijri calendar, Hadith and du’a cards link to external services. These are not yet embedded offline libraries or an in-site Quran reader.
- Scholarship and charitable support section is informational. No donations are accepted until verified payment details and safeguards are configured.
- For Netlify, import this project from Git and build with `npm run build`, publish `dist`. Configure OPENAI_API_KEY to enable Chat with Islam.
- Verify external links and translation licensing before promoting them as official scholarly endorsements.
