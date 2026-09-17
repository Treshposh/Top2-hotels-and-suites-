# Top 2 Hotels & Suites Ltd — website

The website for **Top 2 Hotels & Suites Ltd**, 1 Charles Ogun Street, Mgboudohia,
Rumuolumeni, Port Harcourt, Rivers State, Nigeria. RC 1128717.

A single static page — no build step, no dependencies, no server. Open
`index.html` in any browser and it works.

## What's in here

```
index.html      the whole site: markup, styles and script in one file
img/            the photographs (9 files)
```

## Sections

Home (photo carousel) · availability search · Rooms · Events &
meetings · Kitchen & bar · Facilities · Gallery · Contact.

## How booking works

There is no backend. The availability form collects the guest's name, phone,
email, dates, room and requests, formats them as a reservation notification
with a reference number, and opens WhatsApp addressed to the front desk —
**0703 640 4868**. The guest presses send in WhatsApp; the message arrives as a
normal chat, and the hotel replies with the rate.

Fallbacks for guests without WhatsApp: a *Copy details* button, click-to-call,
and the email address.

The same pattern runs the food ordering in the Kitchen & bar section.

> To make notifications fire automatically instead of the guest pressing send,
> the site needs a small backend and a WhatsApp Business sender (Meta's
> WhatsApp Cloud API or a gateway such as Termii).

## Editing

Everything you are likely to change is near the top of `index.html`, under
`EDIT POINTS`:

| What | How to find it |
|---|---|
| Phone numbers | search `07036404868` and `08123391957` |
| WhatsApp destination | search `BOOKINGS_WA` — one string, change it once |
| Email address | search `info@top2hotels.com` |
| Address (also feeds the map links) | search `ADDRESS` |
| Shawarma prices | search `&#8358;3,000` |

Room rates are deliberately not published — every room reads *Rates on request*
and routes to a call.

Photographs live in `img/`. Replace a file with one of the same name and the
page picks it up; keep them under about 200 KB each so pages load quickly on
mobile data.

## Design

Built on the Radisson Hotels layout system — one typeface (Noto Sans), pill
buttons in uppercase, a floating white search card on a dark ribbon, full-bleed
photography, generous white space. The colours are Top 2's own: the red of the
roadside sign, the charcoal of the building, and the brass of the gate. The
faint rosette watermark behind Rooms and Events is the mandala stencil painted
on the restaurant and events-hall walls, redrawn in vector.

Responsive from 375 px up. Dark mode supported.

## Hosting it free with GitHub Pages

1. Push this repository to GitHub (public).
2. On GitHub: **Settings → Pages**.
3. Under *Build and deployment*, set **Source: Deploy from a branch**,
   **Branch: `main`**, folder **`/ (root)`**. Save.
4. Wait a minute or two. The site appears at
   `https://<your-username>.github.io/<repo-name>/`.

To use a real domain later, add it under Settings → Pages → Custom domain and
point the DNS at GitHub.
