# OSLA Website — Webmaster Handover Guide

**Organisation:** Oxford Students Liberal Association (OSLA)
**Website:** [oxuniliberals.com](https://oxuniliberals.com)
**Prepared by:** Hayden Williams (outgoing Webmaster)
**Current term:** Hilary Term 2026
**Last updated:** March 2026

---

## Table of Contents

1. [Overview](#1-overview)
2. [Technology Stack](#2-technology-stack)
3. [Repository & Version Control](#3-repository--version-control)
4. [File Structure](#4-file-structure)
5. [All Pages — Purpose & Content](#5-all-pages--purpose--content)
6. [Styling & Theming](#6-styling--theming)
7. [JavaScript & Interactivity](#7-javascript--interactivity)
8. [Hosting & Deployment (Netlify)](#8-hosting--deployment-netlify)
9. [Redirects & URL Shortcuts](#9-redirects--url-shortcuts)
10. [Third-Party Services & Integrations](#10-third-party-services--integrations)
11. [Images & Assets](#11-images--assets)
12. [Term-by-Term Maintenance Checklist](#12-term-by-term-maintenance-checklist)
13. [How To: Common Tasks](#13-how-to-common-tasks)
14. [Email Accounts](#14-email-accounts)
15. [Social Media Accounts](#15-social-media-accounts)
16. [Related Digital Infrastructure](#16-related-digital-infrastructure)
17. [Known Issues & Future Work](#17-known-issues--future-work)
18. [Contacts & Escalation](#18-contacts--escalation)

---

## 1. Overview

The OSLA website is a **fully static HTML/CSS/JavaScript website** — there is no server-side code, no database, no CMS, and no build process. Every page is a plain `.html` file that you edit directly. Changes are committed to Git and pushed to GitHub; Netlify then automatically deploys the updated site.

**Key facts at a glance:**

| Item | Detail |
|------|--------|
| Site URL | https://oxuniliberals.com |
| Hosting | Netlify (free tier) |
| Repository | GitHub — `Oxford-University-Liberal-Association/website` |
| Primary branch (production) | `main` |
| Blog (separate) | https://blog.oxuniliberals.com |
| Documents archive | https://github.com/Oxford-University-Liberal-Association/documents-archive |
| Analytics | Cloudflare Web Analytics |
| Founded | 1913 (re-launched 2024) |

There is **no npm, no build tool, no package manager** — you do not need Node.js installed. Any plain text editor (VS Code, Notepad++, nano, etc.) is sufficient to edit the site.

---

## 2. Technology Stack

### Front-end Framework
- **Bootstrap 5.3.3** — loaded via CDN (`cdn.jsdelivr.net`). This gives the responsive grid, navbar, cards, accordion, and badge components.
- **jQuery 3.2.1** — loaded locally from `js/jquery-3.2.1.min.js`. Used by some plugins.

### CSS Files (all in `/css/`)

| File | Purpose |
|------|---------|
| `base.css` | Normalize/reset, base typography, grid helpers |
| `vendor.css` | Slick Slider carousel styles |
| `main.css` | All custom site styles, brand colours, component styles, animations |
| `fonts.css` | `@font-face` declarations for locally hosted web fonts |
| `font-awesome/` | Font Awesome 6 icon library (local copy + CDN fallback) |

### JavaScript Files (all in `/js/`)

| File | Purpose |
|------|---------|
| `modernizr.js` | Browser feature detection (SVG, CSS transforms, etc.) |
| `pace.min.js` | Slim page-load progress bar shown at top of screen |
| `jquery-3.2.1.min.js` | jQuery library |
| `plugins.js` | Third-party JS plugins bundled together; contains commented-out Mailchimp AJAX code |
| `main.js` | Custom site JS — preloader, info toggle, Slick Slider initialisation, placeholder text |
| `timeline-animations.js` | Intersection Observer scroll-triggered animations for the about page timeline |
| `polygons.js` | Particles.js configuration (animated background canvas used on some pages) |
| `particles.min.js` | Particles.js library |

### Fonts
- **EB Garamond** — primary font throughout the site, loaded from Google Fonts (with local fallback in `fonts.css`)
- Additional fonts are loaded locally in `/fonts/` (Domine, Metropolis, Open Sans, Roboto) but are not actively used in the current design

### Icons
- **Font Awesome 6.5.2** — icons throughout the site (social links, quick nav, timeline icons, etc.). Loaded via CDN with local fallback files in `/css/font-awesome/`

---

## 3. Repository & Version Control

### Repository Location
```
GitHub: Oxford-University-Liberal-Association/website
Local:  /home/user/website  (or wherever you clone it)
```

### Branches
- `main` — **production branch**. Anything pushed here is live on the website within ~1 minute via Netlify auto-deploy.
- `master` — mirrors `main`; legacy branch, can be ignored.
- Feature branches — follow the pattern `<prefix>/<description>` (e.g., `copilot/enhance-about-page-timeline`). Merge into `main` via Pull Request when ready.

### Typical Workflow
```bash
# 1. Clone the repository (first time only)
git clone https://github.com/Oxford-University-Liberal-Association/website.git
cd website

# 2. Make sure you're on main and up to date
git checkout main
git pull origin main

# 3. Make your edits (e.g., update committee.html)

# 4. Stage and commit
git add committee.html images/committee/new-officer.jpeg
git commit -m "Update committee for Trinity Term 2026"

# 5. Push to production
git push origin main
```

Netlify will pick up the push automatically and the site will update within about 60 seconds.

### What NOT to commit
The `.gitignore` file excludes:
- `.DS_Store` (macOS metadata)
- `node_modules/` (not used here, but covered for safety)
- Editor config files

---

## 4. File Structure

```
website/
├── index.html              # Home page
├── about.html              # About OSLA & history timeline
├── committee.html          # Current committee members
├── events.html             # Events and accessibility info
├── documents.html          # Links to GitHub documents archive
├── join.html               # Membership information
├── contact.html            # Contact details
├── donate.html             # Donations page
├── alumni.html             # Alumni section
├── mailing-list.html       # Mailing list signup
├── termcard.html           # Term event schedule
├── 404.html                # Custom 404 error page
├── _redirects              # Netlify URL redirect rules
├── favicon.ico             # Browser tab icon
├── .gitignore              # Git ignore rules
│
├── css/
│   ├── main.css            # Primary custom stylesheet
│   ├── base.css            # Reset/normalize/base styles
│   ├── vendor.css          # Slick slider CSS
│   ├── fonts.css           # @font-face declarations
│   └── font-awesome/       # Font Awesome icon library (local)
│
├── js/
│   ├── main.js             # Main custom JavaScript
│   ├── plugins.js          # Third-party JS plugins
│   ├── timeline-animations.js  # Scroll animations for about.html
│   ├── polygons.js         # Particles.js config
│   ├── particles.min.js    # Particles.js library
│   ├── modernizr.js        # Feature detection
│   └── pace.min.js         # Page loading progress bar
│
├── images/
│   ├── logo.svg            # OSLA logo (square/icon)
│   ├── logo-banner.svg     # OSLA logo (wide, used in navbar)
│   ├── committee/          # Committee member photos (JPEG/PNG)
│   │   ├── president.jpeg
│   │   ├── president-elect.png
│   │   ├── treasurer.png
│   │   ├── secretary.jpeg
│   │   ├── webmaster.png
│   │   ├── social_sec.jpeg
│   │   ├── pub_editor.jpeg
│   │   ├── political_officer.jpg
│   │   ├── doc.jpeg        # Director of Communications
│   │   ├── comms_officer.jpg
│   │   ├── memberships.jpg
│   │   ├── press_officer.jpeg
│   │   ├── ro.jpeg         # Returning Officer
│   │   ├── ro-emeritus.jpg
│   │   ├── senior-member.jpg
│   │   ├── president-senior.jpg
│   │   ├── treasurer-senior.jpg
│   │   └── secretary-senior.jpg
│   └── events/             # Event photos
│       └── lords-trip.jpeg # (and others)
│
└── fonts/                  # Locally hosted web fonts (~9 MB)
    ├── eb-garamond/
    └── (other font families — not actively used)
```

---

## 5. All Pages — Purpose & Content

### `index.html` — Home Page
The landing page. Contains:
- **Navbar** — sticky top bar with logo and navigation links (duplicated in every page's `<head>` — see note below)
- **President's Welcome** — photo, welcome message, president's name, college, and term badge. **Update every term.**
- **Announcement Banner** — currently commented out (`<!-- ... -->`). Uncomment and edit to display a term announcement banner.
- **Membership Promotion** — static text section with a House of Lords trip photo and a link to `join.html`.
- **Quick Navigation Panel** — six cards linking to Join, Events, Committee, Blog, Documents, and About.
- **Footer** — shared across all pages, contains social links and a navigation grid.

> **Important structural note:** The `<nav>` (navbar) is placed inside the `<head>` element in the HTML source. This is non-standard but works because browsers are tolerant. Do not move it without testing across browsers.

---

### `about.html` — About OSLA
Contains:
- A text description of what OSLA is and the kinds of events run.
- An **interactive timeline** (`div.timeline-enhanced`) covering OSLA's history from 1913 to 2024. Each timeline item has a year marker, a card with heading and body text, and a Font Awesome icon.
- Timeline animations are driven by `js/timeline-animations.js` using the Intersection Observer API (elements animate in as you scroll).

**To add a new timeline entry:** Copy an existing `<div class="timeline-item left">` or `<div class="timeline-item right">` block and edit the year, heading, text, and Font Awesome icon class. Alternate between `left` and `right` for the zigzag layout.

---

### `committee.html` — Committee Members
The most frequently updated page. Structured as three sections, each with Bootstrap card grids:

1. **The Executive** — Junior President, President-Elect, Treasurer, Secretary
2. **The General Committee** — Webmaster, Social Secretary, Publications Editor, Political Officer, Director of Communications, Communications Officer, Memberships Officer, Press Officer (and commented-out former roles)
3. **The Electoral Officials** — Returning Officer, Returning Officer Emeritus, Deputy Returning Officers
4. **Accordion sections** (collapsed by default):
   - **The Senior Officers** — Senior Member, Senior President, Senior Treasurer, Senior Secretary
   - **The Honorary Officers** — Honorary Chair (Lord Newby), Honorary President, Honorary Vice President, Patron

Each card follows this structure:
```html
<div class="col-md-4 mb-4">
    <div class="card h-100">
        <img src="images/committee/FILENAME.jpeg" class="card-img-top"
             alt="Role Name" style="object-fit: cover; height: 300px;">
        <div class="card-body">
            <h2 class="card-title">Role Title</h2>
            <h3 class="card-fullname">Full Name</h3>
            <p class="card-college"><i>College Name</i></p>
            <p class="card-text">Description...</p>
            <!-- Optional email button: -->
            <a href="mailto:role@oxuniliberals.com" class="btn-email">Email: Role Title</a>
        </div>
    </div>
</div>
```

The term badge at the top (`<span class="badge badge-ht-term-2026">Hilary Term 2026</span>`) should be updated each term. See [term badge classes](#term-badge-css-classes) below.

---

### `events.html` — Events
Contains:
- An alert banner directing users to the Instagram account for current event details.
- Accessibility information for events.
- Event photo sections with caption overlays.

Events are **not** managed dynamically — to add an event, add a new section or update existing content in the HTML. For Instagram-based promotion, the current approach is to point visitors to `@oxuniliberals`.

---

### `documents.html` — Documents Archive
A simple page with buttons linking to the GitHub documents archive. The archive lives in a separate repository:
```
https://github.com/Oxford-University-Liberal-Association/documents-archive
```

Categories in the archive:
- **Termcards** — term event cards (PDF)
- **Governing Documents** — Constitution and Standing Orders
- **Minutes** — General Meeting minutes
- **Alumni** — alumni records

When new governing documents are ratified, update the `/governing-documents` redirect in `_redirects` to point to the new PDF (see [Section 9](#9-redirects--url-shortcuts)).

---

### `join.html` — Join OSLA
Membership information page. Currently contains membership tier details and how to join.

---

### `contact.html` — Contact
Contact details for the Association. Update the Webmaster's name and email here when handing over.

---

### `donate.html` — Donate
Donation/fundraising page.

---

### `alumni.html` — Alumni
Alumni section. Currently partially developed.

---

### `mailing-list.html` — Mailing List
Email subscription page. The Mailchimp AJAX integration in `js/plugins.js` is **commented out** (`cfg.mailChimpURL` is an empty string). If you want to connect a Mailchimp list, fill in the URL in `js/main.js`:
```js
var cfg = {
    mailChimpURL: "https://your-list.us1.list-manage.com/subscribe/post?u=..."
};
```
And uncomment the `ssAjaxChimp` block in `js/plugins.js` and the `ssAjaxChimp()` call in `js/main.js`.

---

### `termcard.html` — Termcard
The term event schedule. Update at the start of each term with the events for that term.

---

### `404.html` — 404 Error Page
Custom error page shown when a visitor navigates to a page that does not exist. Currently contains an Ed Davey paddleboard joke. Netlify automatically serves this for 404 errors on the domain.

---

## 6. Styling & Theming

### Brand Colours

| Colour | Hex | Usage |
|--------|-----|-------|
| Brand Orange | `#FAA61A` | Links, nav items, highlights, buttons |
| Background Black | `#111111` | Page background |
| White | `#ffffff` | Body text |
| Blue (hover) | `#0087cc` | Link hover states |

### Typography
- **EB Garamond** (Google Fonts — serif) is the primary font for all body text and headings.
- Loaded via Google Fonts CDN in every page `<head>`, and also declared via `@font-face` in `css/fonts.css` using local files in `/fonts/eb-garamond/` as a fallback.

### Term Badge CSS Classes
The term badge on `committee.html` and `index.html` uses a CSS class for styling. The current class is `badge-ht-term-2026`. To add new term classes, add them to `css/main.css`. Existing examples to search for and replicate:
```css
.badge-ht-term-2026 { ... }
```
Common term abbreviations:
- `mt` = Michaelmas Term
- `ht` = Hilary Term
- `tt` = Trinity Term

### Responsive Design
Bootstrap 5's grid is used throughout. Key breakpoints:
- `col-md-4` — 3 columns on medium+ screens, 1 column on mobile (used for committee cards)
- `col-md-8 mx-auto` — centred single column for text pages
- The navbar collapses to a hamburger menu on small screens via `navbar-expand-sm`

---

## 7. JavaScript & Interactivity

### Page Load Bar
`pace.min.js` automatically intercepts page loads and shows a slim progress bar at the top of the viewport. No configuration needed.

### Preloader
`main.js` includes a preloader function that fades out `#preloader` on load. The preloader HTML is **commented out** in all current pages, so this function runs but has no visible effect.

### Slick Slider
`main.js` initialises `.home-slider` elements as an auto-playing carousel. Not currently used on any live page, but the code is ready if a slider is needed.

### Timeline Animations (`about.html` only)
`timeline-animations.js` uses the browser's `IntersectionObserver` API to animate `.timeline-item` elements as they scroll into view. Items fade and slide in from the left or right depending on their class. This script is **only included on `about.html`**.

### Particles Background
`particles.min.js` and `polygons.js` provide a canvas-based animated polygon/particle background. Not currently active on live pages (the canvas element would need to be present in the HTML for it to render).

### Mailchimp (commented out)
`plugins.js` contains an AjaxChimp integration for Mailchimp newsletter signup. Fully commented out — see `mailing-list.html` section above for how to enable it.

---

## 8. Hosting & Deployment (Netlify)

The site is hosted on **Netlify** on its free tier.

### How Deployment Works
1. You push a commit to the `main` branch on GitHub.
2. Netlify detects the push via a webhook.
3. Netlify deploys the updated static files (since there is no build step, this is near-instantaneous).
4. The live site at `oxuniliberals.com` is updated, typically within 60 seconds.

### Netlify Account Access
- The Netlify account should be accessible to the outgoing Webmaster and needs to be transferred to the incoming Webmaster.
- Log in at [app.netlify.com](https://app.netlify.com).
- The site is connected to the `Oxford-University-Liberal-Association/website` GitHub repository.

### Netlify Configuration
There is **no `netlify.toml`** config file — the only Netlify-specific file is `_redirects`. Netlify's default settings handle everything else:
- Publishing directory: root of the repository (all `.html` files served directly)
- Build command: none (static site)
- HTTPS: automatically provisioned by Netlify (Let's Encrypt certificate, auto-renews)

### Custom Domain
The domain `oxuniliberals.com` is pointed at Netlify via DNS. If you ever need to migrate hosting, the key DNS records to update are the `A` and `CNAME` records currently pointing to Netlify's servers.

> **To find current DNS settings:** Log in to Netlify → Site settings → Domain management. The domain registrar (where `oxuniliberals.com` was purchased) will need to be accessed separately.

---

## 9. Redirects & URL Shortcuts

All redirects are defined in the `_redirects` file in the root directory. Netlify processes this file automatically.

### Current Redirects

| Short URL | Destination | Notes |
|-----------|-------------|-------|
| `/blog` | `https://blog.oxuniliberals.com` | 301 permanent redirect |
| `/blogs` | `https://blog.oxuniliberals.com` | 301 permanent redirect |
| `/submit-article` | Google Forms URL | Article submission form |
| `/governing-documents` | GitHub PDF link | **Update each time new governing docs are ratified** |
| `/complaints` | `https://oxuniliberals.com/placeholder` | Not yet implemented |
| `/file-complaint` | `https://oxuniliberals.com/placeholder` | Not yet implemented |

### How to Update a Redirect
Open `_redirects` and edit the relevant line. Format is:
```
/short-url  https://destination-url  301
```
Then commit and push. The change is live within ~60 seconds.

### Most Common Update: Governing Documents
Each time the Constitution or Standing Orders are updated and a new PDF is uploaded to the documents-archive GitHub repository, update the `/governing-documents` redirect to point to the new file's direct URL on GitHub. Example:
```
/governing-documents https://github.com/Oxford-University-Liberal-Association/documents-archive/blob/main/Documents/Constitution%20and%20Standing%20Orders/CURRENT%20OSLA%20Governing%20Documents%2027_02_26.pdf 301
```

---

## 10. Third-Party Services & Integrations

### Cloudflare Web Analytics
All pages include a Cloudflare Web Analytics beacon script:
```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
        data-cf-beacon='{"token": "07ece4e9475a4cbb92f682afe5f07054"}'></script>
```
- **Token:** `07ece4e9475a4cbb92f682afe5f07054`
- View traffic data at [dash.cloudflare.com](https://dash.cloudflare.com) → Web Analytics.
- Access to the Cloudflare account needs to be transferred to the incoming Webmaster.

### Google Fonts
EB Garamond is loaded from Google Fonts CDN. No account or API key required. If Google Fonts is unavailable, the local fallback fonts in `/fonts/` and `css/fonts.css` will be used.

### Bootstrap & Font Awesome CDNs
Both are loaded from public CDNs (jsdelivr.net and cdnjs.cloudflare.com). No accounts or keys required. Versions are pinned (`Bootstrap 5.3.3`, `Font Awesome 6.5.2`) — update these links if you ever need a newer version.

### Google Forms
The article submission form links to a Google Form (`/submit-article` redirect). To update the form, create a new Google Form and update the redirect URL in `_redirects`.

### GitHub (Documents Archive)
The documents archive is a separate public GitHub repository:
```
https://github.com/Oxford-University-Liberal-Association/documents-archive
```
This is managed separately from the website repository. Ensure the incoming Webmaster has access to the `Oxford-University-Liberal-Association` GitHub organisation.

### Blog (`blog.oxuniliberals.com`)
The blog is a completely separate deployment on a separate platform. It is managed by the **Publications Editor**, not the Webmaster. The Webmaster's only responsibility is ensuring the `/blog` redirect and the navbar link continue to point to the correct URL.

---

## 11. Images & Assets

### Committee Photos
All committee member photos are stored in `images/committee/`. They are referenced by **hardcoded filenames** in `committee.html` and `index.html`.

**Current filename conventions:**

| Role | Filename |
|------|---------|
| Junior President | `president.jpeg` |
| Junior President-Elect | `president-elect.png` |
| Junior Treasurer | `treasurer.png` |
| Junior Secretary | `secretary.jpeg` |
| Webmaster | `webmaster.png` |
| Social Secretary | `social_sec.jpeg` |
| Publications Editor | `pub_editor.jpeg` |
| Political Officer | `political_officer.jpg` |
| Director of Communications | `doc.jpeg` |
| Communications Officer | `comms_officer.jpg` |
| Memberships Officer | `memberships.jpg` |
| Press Officer | `press_officer.jpeg` |
| Returning Officer | `ro.jpeg` |
| Returning Officer Emeritus | `ro-emeritus.jpg` |
| Senior Member | `senior-member.jpg` |
| Senior President | `president-senior.jpg` |
| Senior Treasurer | `treasurer-senior.jpg` |
| Senior Secretary | `secretary-senior.jpg` |

> **Tip:** When replacing a photo for the same role, keep the same filename and simply overwrite the file. This avoids having to edit `committee.html`.

### Photo Guidelines
- Images are displayed at `height: 300px` with `object-fit: cover`, so they will be cropped to fill the card. Ideally use portrait photos with the face centred.
- Reasonable file sizes: aim for under 300 KB per photo. Use a tool like [Squoosh](https://squoosh.app) to compress before adding.

### Logos
- `images/logo.svg` — the OSLA logo icon (used in footer and as fallback)
- `images/logo-banner.svg` — the wide banner logo (used in the navbar, displayed at 480×270px)

### Event Photos
Event photos are in `images/events/`. Currently only `lords-trip.jpeg` is used on the home page. Add new photos here and reference them in the relevant HTML.

---

## 12. Term-by-Term Maintenance Checklist

At the start of each new term, work through this checklist:

### Every Term
- [ ] **`committee.html`** — Replace all committee member photos and update names, colleges, and roles. Update the term badge (`badge-ht-term-2026` → new term class).
- [ ] **`index.html`** — Update the President's Welcome section: photo, name, message text, college, and term badge.
- [ ] **`termcard.html`** — Update with the new term's event schedule.
- [ ] **`events.html`** — Update with upcoming events or update the Instagram link.

### When Governing Documents Change
- [ ] **`_redirects`** — Update the `/governing-documents` redirect to the new PDF URL in the documents archive.

### When New Documents Are Uploaded
- [ ] Upload new PDFs to the `documents-archive` GitHub repository.
- [ ] Ensure the `documents.html` page still links to the correct archive folders.

### When Handing Over the Webmaster Role
- [ ] Update the Webmaster card in `committee.html` (photo, name, college, email button).
- [ ] Update the Webmaster name/email in `contact.html`.
- [ ] Update the `<meta name="author">` tag in each page's `<head>` (currently `Hayden Williams`).
- [ ] Transfer Netlify account access.
- [ ] Transfer Cloudflare account access.
- [ ] Transfer GitHub organisation admin access (or at minimum repository write access).
- [ ] Update the "Website by [Name]" link in the footer of all pages (currently `https://www.haydenwilliams.dev/`).

---

## 13. How To: Common Tasks

### Update the President's Welcome (index.html)

1. Add the new president's photo to `images/committee/president.jpeg` (overwrite).
2. Open `index.html`.
3. Edit the welcome text within `<div class="welcome-text">`.
4. Update the name: `<p class="president-name mb-1">New Name</p>`
5. Update the college: `<p class="president-title mb-3">The Junior President - <span class="president-college">College Name</span></p>`
6. Update the term badge: `<span class="badge badge-XX-term-YYYY">Term Name YYYY</span>`
7. Commit and push.

### Update the Committee (committee.html)

1. Place all new officer photos in `images/committee/` using the standard filenames (or new filenames if adding a new role).
2. Open `committee.html`.
3. For each changed officer, update:
   - `src="images/committee/FILENAME.ext"` on the `<img>` tag
   - `alt="Role Name"` on the `<img>` tag
   - `<h3 class="card-fullname">Name</h3>`
   - `<p class="card-college"><i>College</i></p>`
4. Update the term badge at line 90: `<span class="badge badge-XX-term-YYYY">Term YYYY</span>`
5. If a role is vacant, use `images/logo.svg` as the placeholder image.
6. To hide a role temporarily, wrap its `<div class="col-md-4 mb-4">` block in `<!-- ... -->`.
7. Commit and push.

### Add a New Committee Role

1. Copy an existing card block from `committee.html`.
2. Place it in the appropriate section (Executive, General Committee, or Electoral Officials).
3. Update the photo filename, alt text, role title, name, college, and description.
4. Add the photo to `images/committee/`.
5. Commit and push.

### Add/Update a Redirect

1. Open `_redirects`.
2. Add or modify a line in the format: `/path  https://destination  301`
3. Commit and push.

### Update the Announcement Banner (index.html)

The banner is currently commented out in `index.html` (lines 91–103). To activate it:
1. Remove the `<!--` at line 91 and `-->` at line 103.
2. Update the banner title and subtitle text.
3. Ensure the `href` in the CTA button is correct.
4. To hide it again, re-add the comment markers.

### Add a New Page

1. Copy the structure of the most similar existing page (e.g., `documents.html` for a simple page).
2. Update the `<title>` and `<meta name="description">` tags in `<head>`.
3. Replace the page content section.
4. Add a link to the new page in the navbar (inside the `<ul class="navbar-nav">` in `<head>`) **on every page** (since the navbar is duplicated per page).
5. Add the new page to the footer navigation grid on every page.
6. Commit and push.

> **Note:** Because the navbar and footer are hardcoded in each HTML file (not shared includes), any change to the navigation requires editing every page. There are currently 12 pages with a full nav/footer. If this becomes burdensome, consider migrating to a static site generator (e.g., Hugo or Eleventy) that supports shared templates.

### Update the Blog URL

If `blog.oxuniliberals.com` ever changes URL:
1. Update `_redirects` — both the `/blog` and `/blogs` lines.
2. Update the Blog link in the navbar on every page (`href="https://oxuniliberals.com/blog"`).
3. Update the Blog link in the footer on every page.
4. Update the Blog card in the Quick Nav Panel on `index.html`.
5. Update the Blog link on the Publications Editor card in `committee.html`.
6. Commit and push.

---

## 14. Email Accounts

The Association uses `@oxuniliberals.com` email addresses. These are managed separately from the website (likely via Google Workspace or a similar email provider — confirm with the outgoing Webmaster).

**Known addresses referenced on the website:**

| Address | Role |
|---------|------|
| `president@oxuniliberals.com` | Junior President |
| `webmaster@oxuniliberals.com` | Webmaster |
| `returningofficer@oxuniliberals.com` | Returning Officer |
| `accessandwelfare@oxuniliberals.com` | Access and Welfare Officer (role currently unlisted) |

The incoming Webmaster should ensure they gain access to `webmaster@oxuniliberals.com` as part of the handover.

---

## 15. Social Media Accounts

These are linked from the website footer on every page and from the navbar on some pages:

| Platform | Handle/URL |
|----------|-----------|
| Instagram | [@oxuniliberals](https://www.instagram.com/oxuniliberals/) |
| X (Twitter) | [@oxunilibdems](https://x.com/oxunilibdems/) |
| LinkedIn | [Oxford University Liberal Democrats](https://www.linkedin.com/company/oxford-university-liberal-democrats) |

Social media management is the responsibility of the **Director of Communications** and **Communications Officer**, not the Webmaster. However, if any of these handles change, the Webmaster must update the links in the footer of every page.

---

## 16. Related Digital Infrastructure

The Webmaster is responsible for all of OSLA's digital infrastructure, which extends beyond this website:

| Service | URL / Location | Purpose |
|---------|---------------|---------|
| Main website | `oxuniliberals.com` | This repository |
| Blog | `blog.oxuniliberals.com` | Managed by Publications Editor; Webmaster provides technical support |
| Documents archive | GitHub — `Oxford-University-Liberal-Association/documents-archive` | Constitution, Standing Orders, Minutes, Termcards, Alumni records |
| Email | `@oxuniliberals.com` | Association email accounts |
| Analytics | Cloudflare Web Analytics | Traffic data for the website |
| GitHub organisation | `Oxford-University-Liberal-Association` | Hosts website and documents repos |
| Netlify | `app.netlify.com` | Website hosting and deployment |

---

## 17. Known Issues & Future Work

### Known Issues
- **Navbar in `<head>`:** The `<nav>` element is placed inside `<head>` in the HTML source of all pages. This is technically non-standard HTML but browsers handle it gracefully. Future refactoring could move it to the top of `<body>`.
- **Navbar/footer duplication:** The navbar and footer are copy-pasted into every HTML file. Any navigation change requires editing all 12 pages. A templating system would solve this.
- **`/complaints` redirect:** Points to `https://oxuniliberals.com/placeholder` — a complaints page has not yet been built.
- **Mailing list:** The Mailchimp integration is commented out on `mailing-list.html`. If a mailing list is needed, this must be connected to a Mailchimp account.
- **Copyright year:** The footer reads "Copyright MMXXV" (2025). This should be updated each year — or changed to the current year dynamically with JavaScript.
- **Duplicate Google Fonts `<link>` tag:** `index.html` loads the EB Garamond font twice (lines 42 and 44). One is redundant.

### Future Work / Suggestions
- **Static site generator:** Consider migrating to Hugo or Eleventy to use shared templates for the navbar and footer, eliminating the need to edit 12 files for any navigation change.
- **Complaints page:** Build out the `/complaints` page properly; the redirect currently points to a placeholder.
- **Alumni section:** `alumni.html` is partially developed.
- **Particle backgrounds:** The `polygons.js` / `particles.min.js` setup is present but not active on any live page. Could be used for visual interest on the home page or 404 page.
- **CDN version pinning:** Bootstrap and Font Awesome versions are pinned in CDN URLs. Review periodically and test upgrades.

---

## 18. Contacts & Escalation

### Outgoing Webmaster
**Hayden Williams**
Email: webmaster@oxuniliberals.com
Personal: hayden@haydenwilliams.dev
College: Oxford Brookes University

### Current President (Hilary Term 2026)
**Harry Morgan**
Email: president@oxuniliberals.com
College: Pembroke College

### GitHub Organisation
`Oxford-University-Liberal-Association`
Ensure the incoming Webmaster is added as an admin or maintainer of this organisation.

### Netlify
Transfer ownership or add the incoming Webmaster as a team member on the Netlify site.

### Cloudflare
Transfer access to the Cloudflare account that owns the `oxuniliberals.com` zone and the Web Analytics account.

---

*End of Webmaster Handover Guide.*
*For questions about this guide, contact the outgoing Webmaster at hayden@haydenwilliams.dev*
