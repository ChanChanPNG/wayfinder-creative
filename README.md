# Wayfinder Creative — Draft 2

Static multipage website for GitHub + Vercel. Nine destination pages: Home, Video Advertising, Website Design, Waypoint Systems, The Proof, About, Contact, Wedding Films, Real Estate Media. The older `/services/` and `/videoportfolio/` paths contain compatibility redirects.

## Deployment
Upload the **contents** of the `wayfinder-site` folder to the root of your GitHub repository. Connect that repository to Vercel using Other/static framework, build command empty, output directory `.`. Configure domain after preview review.

## Media placeholders
`assets/wayfinder-creative-logo.png` and `assets/waypoint-systems-logo.png` are the original supplied logo files. The hero currently shows an abstract SVG fallback. When ready, add your optimized muted MP4/WebM footage to `assets/media/` and add `<source src="/assets/media/hero.webm" type="video/webm">` and/or MP4 to the `<video class="hero-background-video">` in `assets/site.js`. Media on other pages remains labeled as placeholder.

## GHL forms
Set the public HTTPS LeadConnector iframe URLs in `CONFIG.forms` near the top of `assets/site.js` for `general`, `web`, `wedding`, and `realestate`. No live submission occurs until configured. Configure your compliant notice/consent inside GHL and publish relevant legal pages before collecting data or marketing opt-ins.

## Notes
Public pricing and private residential street address have deliberately been excluded. No analytics or performance statistics were fabricated. Footer joke reflects user-provided wording. This version is not connected to live forms, Stripe payments, or media assets yet.


## YouTube playlist galleries (Draft 3)

Five galleries use these playlist IDs exactly as supplied: Business Promos `PLegHoeBAp60c`, Meta Ads `PLGKabkg-byRY`, Real Estate `PLOvb30AaH7vI`, Social Media `PLOFtnDTnCizg`, Weddings `PLfRz-zEbcP40`. **These IDs have not been verified against YouTube** (direct playlist browsing was throttled). They are shorter than commonly seen user-created playlist IDs; if the gallery reports an error, obtain each full playlist URL using YouTube's playlist Share option.

### Required one-time configuration
1. In Google Cloud Console, enable **YouTube Data API v3** and create an API key. Restrict it to YouTube Data API v3.
2. In **Vercel → Project → Settings → Environment Variables**, set `YOUTUBE_API_KEY` to that key; do **not** put it in browser JavaScript or commit it to GitHub.
3. Redeploy once to apply the environment variable. Vercel serves `/api/playlist?category=business` etc.
4. Ensure playlists are **Public** and the individual videos are Public or Unlisted and embeddable. For portfolio reliability prefer Public playlists.
5. Test `/api/playlist?category=business` on the deployed preview; expected response has `items` with video IDs and titles. If you get a 502, check the full playlist ID and public visibility.

After initial setup, change only the YouTube playlist membership when publishing new videos; Vercel caches gallery responses for about 15 minutes. Videos play in YouTube privacy-enhanced embeds when a thumbnail is clicked. If YouTube is unreachable or setup is missing, the site shows a friendly message and a direct playlist link (not fake videos). Local file previews don't execute Vercel functions.
