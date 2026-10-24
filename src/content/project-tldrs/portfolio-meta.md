---
---

**Problem:** The rest of this site is about other people's problems. This one is mine. I've redesigned this portfolio six times and rebuilt it three, and each time I get most of the way there before I start arguing with myself about whether any of it is right.

**Approach:** I wrote down the pattern so I'd notice it happening. For a couple of weeks I design for myself and enjoy it. Then I start asking what other people will think, and I end up designing for an imaginary crowd of critics. Some weeks that means stripping everything back, other weeks it means piling more on. Both are fear wearing different outfits.

**Constraints:** Mostly my own doubt, and also the tools. V5 and V6 were built in Flutter, which draws the page on a canvas, so things like selecting text and the back button needed workarounds. The site grew to around 10,000 lines and I spent evenings maintaining it instead of designing.

**Outcome:** V7, the site you're on, is V6 rebuilt from scratch in Astro with plain HTML and CSS, themed like a Linux desktop because that's where my interest in UX started. Things like the back button just work again. If I'd do one thing differently, it's publishing earlier and doing it badly in public. I've never felt sure about any version, and waiting to feel sure would have meant never shipping one. Since then I've audited V7 against WCAG 2.2 AA and fixed what I found, from keyboard focus that disappeared inside scrolling windows to colours that failed contrast in six of the ten themes.
