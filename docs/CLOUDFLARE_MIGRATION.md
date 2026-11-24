# UmmahLight Cloudflare staging migration

The production domain www.ummahlight.com stays on Netlify until the owner tests and approves cutover. Work in development/cloudflare-modernization; do not deploy main automatically until tested.

## Current code findings

- index.html is a large static single-page application; its Qur'an reader requests verses and selected reciter audio from api.alquran.cloud.
- The former full-surah action hardcoded ar.alafasy, ignoring the selected reciter. The development branch now plays the selected reciter's ayah list instead. This needs real-device testing for continuity and background behavior.
- netlify/functions contains provider-specific endpoints; Cloudflare Pages will not run them unchanged. Inventory and port these to Pages Functions or Workers before promising AI functionality.
- package.json has a build script while README describes no-build deployment. Confirm the actual assets and build behavior before configuring Cloudflare.
- Check the PWA manifest, service worker, caching and installation behavior on Android before declaring app parity.

## Staging checklist

1. Review and test source changes and run node --test tests/*.test.mjs.
2. Configure a Cloudflare Pages project with the development branch as preview, using appropriate build settings only after auditing build.mjs and functions. Avoid linking www.ummahlight.com at this stage.
3. Verify Arabic text and translation, all selected reciters, full Surah Al-Fatihah (7 ayat), 114 surah selection, repeat, locked-screen audio where supported, and Android PWA update propagation.
4. Port Netlify functions securely, with API secrets only in Cloudflare environment variables, and verify API billing limits.
5. Verify Hadith, Q&A, prayer times, mobile navigation, accessibility and all media integrations.
6. Only after owner approval: back up existing DNS, verify MX/TXT/CNAME records and connect domain. Retain rollback plan.

See GitHub issue #5 for the full approved requirements. This document is a plan, not a claim that Cloudflare deployment has occurred.
