---
---

**Problem:** People who finished Perro's onboarding usually liked the app. Plenty of new users never finished it. They left during setup, often before seeing what Perro did, and that cost us subscriptions.

**Approach:** I started with the Mixpanel funnels to see where people left, then watched session recordings to see why. Both pointed at the same three spots. Optional health questions were treated as required, the photo upload sent people out of the app to find a picture (many didn't come back), and permission and fitness questions landed on people who were already tired of it. I cut the flow down, opened with a feature carousel, swapped the required photo for avatars, moved health and fitness questions to after signup, and added a short explainer before the OS permission prompts.

**Constraints:** Two weeks, part-time. Flutter only, no backend changes, and nothing that would break the app for existing users. I was designing and building it myself, so I only designed things I knew I could ship in that time.

**Outcome:** Drop-off fell, most clearly at the old photo and health steps. More people finished setup and more subscribed, with more of them picking longer plans. When the company was acquired, the UX was named as one of the product's strengths. The biggest change was asking for less up front, and asking for the rest once people had a reason to answer.
