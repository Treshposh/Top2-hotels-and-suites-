# Top 2 Hotels & Suites — version 2 (editable)

The same site as the main page, plus an admin panel so the hotel can change
photos and wording without touching code. The original site in the folder above
is left exactly as it was.

- Website: `v2/index.html` → https://treshposh.github.io/Top2-hotels-and-suites-/v2/
- Admin panel: `v2/admin/` → https://treshposh.github.io/Top2-hotels-and-suites-/v2/admin/

## What can be edited

Top of page slideshow (add, remove, reorder slides) · the three welcome cards ·
the three rooms (photo, name, description) · events hall and meeting room photos ·
bar photo · gallery (add, remove, reorder photos) · phone numbers, WhatsApp
number, email and address.

## How it works

Everything editable lives in `v2/content/site.json`. When the page loads,
`v2/cms.js` reads that file and puts the photos and wording in place. Saving in
the admin panel writes to that file (and uploads new photos to `v2/img/`) on
GitHub, and the live site updates a minute or two later.

## Signing in

The admin panel signs in to GitHub with an access token, the same as the JECK
editor. Create a fine-grained token at github.com → Settings → Developer
settings → Personal access tokens, limited to this repository, with
**Contents: Read and write**. Paste it into *Sign In Using Access Token*.
