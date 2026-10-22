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
