# Wayfinder Creative — Website v1

A responsive static site for GitHub + Vercel, with ten pages. No build process needed.

## Deploy
1. Extract this ZIP.
2. Upload the contents of the `wayfinder-site` folder to the root of your GitHub repository.
3. Import the repository in Vercel as an **Other** framework, with no build command and the repository root as output.
4. Point `wayfindercreative.net` at the Vercel project in its domain settings.

## Pages
- `/` — Home
- `/services/` — Services overview
- `/services/web-design/` — Website design
- `/waypoint-systems/` — Waypoint Systems CRM
- `/videoportfolio/` — Video portfolio
- `/about/` — About
- `/theproof/` — The Proof
- `/contact/` — General contact
- `/films/weddings/` — Wedding films
- `/media/real-estate/` — Real estate media

## Editing
- `assets/styles.css` — colors, fonts, typography, layout, animations
- `assets/site.js` — navigation/footer, all page content, GHL form configuration, social links
- `assets/media/` — add your future assets here and replace placeholder blocks in the templates

## Important before launch
- GHL forms are **not connected**; each contact section shows a working email/phone fallback and a labelled form placeholder. Set the form URLs in `CONFIG.forms` in `assets/site.js` to the published GHL iframe URLs. Distinct forms are configured for `general`, `web`, `wedding`, and `realestate`. The CRM page uses `general` until you choose otherwise.
- Consent / privacy-policy text is not invented or asserted as compliant. Publish a real privacy policy and configure each GHL form's appropriate consent fields before collecting leads or sending SMS.
- Portfolio examples are project references only; media, exact metrics, testimonials and client logos need verified assets and permission before publishing.
- `assets/media/` is intentionally empty. The hero video/media placeholders are **not** live videos.
- No public pricing. No residential street address.
- Stripe is not connected yet. This site intentionally collects inquiries rather than taking payments.

## Brand
Pine #172C26, Forest #314B40, Sage #8A9D89, Stone #DCD9CE, Ivory #F6F4ED. Typeface loading uses Google Fonts (Space Grotesk + Inter) with system fallbacks.
