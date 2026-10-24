---
title: Crafting Counselling Companions
filename: counselling-companions.md
mode: NORMAL
type: UX Research
year: "2025"
image: /images/counselling/hero.svg
imageAlt: Two donut charts showing session time shifting from mostly admin to mostly client practice
oneliner: Mental health practitioners in solo and small practices spend 15 to 20 minutes of every 40-minute session on administration. My MSc dissertation explored what a tool built specifically for counselling work, rather than borrowed from elsewhere, could give back.
eyebrow: UX Research · MSc Dissertation · 0→1
problem: Counsellors in solo practice run their work across email, WhatsApp, calendars and spreadsheets that don't talk to each other. One told me 15 to 20 minutes of every 40-minute session goes on admin.
outcomeValue: Tested prototype
outcomeLabel: A practice dashboard and voice assistant, shaped with seven practitioners. The AI can't do anything until the counsellor approves it.
statusline:
  - label: NORMAL
    lime: true
  - label: ux research
  - label: "2025"
  - label: co-design · RRI · trust
order: 4
device: walkie
sections:
  - component: ProjectHero
    props:
      title: Crafting Counselling Companions
      type: UX Research
      year: "2025"
      scope: "Solo researcher · MSc dissertation · 0→1 concept tool"
  - component: ProjectGallery
    props:
      image: /images/counselling/hero.svg
      imageAlt: Two donut charts showing session time shifting from mostly admin to mostly client practice
  - component: ProjectMeta
    props:
      statusline:
        - label: NORMAL
          lime: true
        - label: ux research
        - label: "2025"
        - label: co-design · RRI · trust
  - component: ProjectIntro
    props:
      eyebrow: MSc Dissertation — Case study 03
      title: Crafting Counselling Companions
      summary: >-
        My MSc dissertation in Human–Computer Interaction at Newcastle University was about understanding time spent by mental health practitioners, and whether a purpose-built tool could give some of it back. I conducted semi-structured interviews followed by a week-long
        co-design workshop conducted entirely by post and email so as to respect the limited spare time practitioners have, and a Figma prototype of a practice dashboard and voice assistant. Before I considered the concept fit for purpose, I tested it through heuristic evaluation, think-aloud sessions, and a Responsible Research and Innovation review.
  - component: ProjectMetricsBand
    props:
      items:
        - value: "7"
          label: Practitioners interviewed across India and the UK
        - value: "47"
          label: Codes generated through reflexive thematic analysis
        - value: "7"
          label: Themes that shaped the design direction
        - value: "2"
          label: Prototype iterations, driven by heuristics then usability testing
  - component: ProjectProblemKeyInfo
    props:
      image: /images/counselling/admin-breakdown.svg
      imageAlt: >-
        An hour with a client broken into prep, the 40-minute session, notes, and
        billing/follow-up: ~20 of every 60 minutes go to admin
      problemBody: >-
        Most counsellors and therapists work in solo or small practices, without the IT and
        administrative support larger institutions take for granted. They rely on a mix of
        familiar, general-purpose tools — email, WhatsApp, Zoom or Meet, a calendar, a spreadsheet
        or notebook, Google Drive. Tools which are alright on their own but never designed to work together, scattering
        client information across tools. Resulting in missed follow-ups and considerable time spent on admin.
      contextBody: >-
        I wanted to find out whether a tool built specifically for counselling management could
        return some of that time, while protecting the relationship the profession rests on. I set
        aside the crowded, ethically complex space of patient-facing apps and chatbots, and focused
        on the practitioner's back office instead to see if some of that time could be clawed back.
      infoItems:
        - label: Research question
          value: >-
            How can tailored digital tools reduce the administrative burden on mental health
            practitioners while supporting, rather than replacing, the therapeutic
            relationship?
        - label: My role
          value: Sole researcher and designer — discovery, co-design, prototyping, evaluation, ethics
        - label: Participants
          value: >-
            7 practitioners — counsellors, psychologists, and mental health social workers. Six
            based in India across private, academic, and counselling-institution settings, and
            one social-work MSc student in London.
        - label: Methods
          value: Semi-structured interviews · reflexive thematic analysis · low-contact co-design · Figma · heuristic evaluation · think-aloud · RRI review
  - component: ProjectCallout
    props:
      variant: principle
      label: The aim
      body: >-
        Design a practical, practitioner-centred tool that streamlines administrative work
        before, during, and after counselling sessions, so practitioners can spend more of
        their time on care, without compromising the therapeutic relationship or introducing
        ethical risk through careless use of AI.
  - component: ProjectProcessSteps
    props:
      title: How the research ran
      steps:
        - title: Semi-structured interviews
          body: >-
            Seven practitioners took part, around an hour each, by phone or video according to
            their preference. We discussed the tools they use day to day, how a typical day is
            structured, where the friction sits, and how they feel about AI. The questions on AI
            and ethics were optional, and one participant chose to skip them, feeling they did not
            yet know enough to comment. Everyone was free to retract anything they had said after
            the fact.
        - title: Reflexive thematic analysis
          body: >-
            I analysed the transcripts using Clarke and Braun's reflexive thematic analysis, which
            produced 47 codes that I grouped into seven themes. The reflexive element mattered to
            me, because it meant examining the assumptions I brought to the coding rather than only
            what the practitioners said, and that made the findings more trustworthy.
        - title: Low-contact co-design workshop
          body: >-
            Practitioners have very little spare time, so a conventional workshop was never
            realistic, and I ran it asynchronously over a week instead. I built a working version
            of the proposed tool from Google Workspace, using Gmail, Keep, Sheets, Calendar, and
            Drive wired together with a little AppScript so the parts shared data, and I posted each
            participant a physical toolkit of printed screens, sticky notes, and stationery. They
            worked through seven activities in their own time, annotated the prints with their
            feedback, and we discussed the results afterwards. All the materials also lived on a
            GitHub Pages site I kept up to date.
        - title: Figma prototyping
          body: >-
            Once the co-design feedback was in, I designed the tool properly in Figma at
            medium-to-high fidelity, as a practice dashboard with a companion voice assistant. It
            went through two iteration cycles, the first driven by heuristic evaluation and the
            second by the practitioner usability session.
        - title: Heuristic evaluation
          body: >-
            Before putting anything in front of a practitioner, a classmate and I walked the
            prototype against Nielsen's usability heuristics. That surfaced the less visible
            problems, such as inconsistent spacing and highlighting, weak use of whitespace, and
            confusing copy, and I resolved them first so the usability session could focus on the
            design itself rather than rough edges.
        - title: RRI ethical review
          body: >-
            After ideation I ran the whole concept through a Responsible Research and Innovation
            review, using the RRI prompts and practice cards alongside the Moral IT cards. I mapped
            every stakeholder I could identify, from practitioners and clients to regulators,
            researchers, and support staff, and worked through where sensitive data would flow,
            where consent sat, and what role AI should and should not play. This review went on to significantly influence 
            the design and choice of features.
  - component: ProjectImageGalleryGrid
    props:
      title: The co-design workshop, run by post
      images:
        - src: /images/counselling/codesign_activity_physical.jpg
          alt: >-
            A participant working through the email activity, annotated with sticky notes from the
            posted toolkit
        - src: /images/counselling/workshop_calendar_booking.jpg
          alt: >-
            Google Calendar set up as a bookable appointment schedule, configured by a participant
        - src: /images/counselling/codesign_sheets_physical.jpg
          alt: >-
            The session-tracker activity with handwritten participant feedback on the printed screen
        - src: /images/counselling/workshop_sheets.jpg
          alt: Session-history sheet — client records, payment status, and a session log
        - src: /images/counselling/workshop_drive.jpg
          alt: >-
            Google Drive standing in as the resource library — worksheets, reading, and client folders
        - src: /images/counselling/codesign_calendar_physical.jpg
          alt: A participant's note on one of the printed activity sheets
  - component: ProjectCallout
    props:
      variant: insight
      label: On the co-design format
      body: >-
        Four of the six practitioners invited to the workshop returned photographs of their
        annotated activity sheets, and two preferred to talk it through with me on a call. Running
        it asynchronously by post/email proved effective. Several fitted the activities into breaks in
        their day, and many asked to be kept informed of the project afterwards. The real cost was
        time. Responses came back one to two weeks later than planned, and there was some confusion
        about what each activity was asking for. A short live briefing at the start would have
        resolved most of that.
  - component: ProjectFindingsGrid
    props:
      title: Seven themes from the interviews
      items:
        - title: Poorly integrated tools
          body: >-
            Practitioners move between Zoom, WhatsApp, email, and calendar apps depending on what
            each client prefers. The flexibility protects the relationship, but records end up
            fragmented and practitioners keep switching context.
        - title: Documentation by hand
          body: >-
            Many still take notes on paper, not by preference but because typing in front of a
            client breaks eye contact. The trade-off: those notes are hard to search later.
        - title: Progress and goal tracking
          body: >-
            Therapy is built around goals, but tracking against them stays informal and
            conversational. Practitioners were open to more structure, provided it stayed light.
        - title: Care versus admin
          body: >-
            Admin eats 15 to 20 minutes of a 40-minute session once prep, notes, scheduling,
            billing, and follow-up are counted — time that comes directly out of care.
        - title: Resources everywhere and nowhere
          body: >-
            Everyone curates worksheets and articles for clients, but they live across Drive
            folders, email attachments, and bookmarks — duplicated, and rarely findable when needed.
        - title: Every setting is different
          body: >-
            School, private practice, and institutional work involve genuinely different workflows.
            One-size-fits-all software keeps failing because it can't bend to that variation.
        - title: Ethics and the human connection
          body: >-
            Real concern here — from AI replacing human therapists, to sensitive data being misused
            commercially, to over-automation stripping the humanity out of care.
  - component: ProjectQuote
    props:
      quote: >-
        "I mean, I feel like if it was digital, it would be a lot easier to find things.
        Sometimes I look at my notes, I know it is organised, but still a keyword search… you've
        become so used to finding things very fast — that would help."
      attribution: Interview participant, on searching handwritten notes
  - component: ProjectPersona
    props:
      eyebrow: Composite persona, synthesised from the interviews rather than a single participant
      avatarImage: /images/counselling/persona-solo.svg
      avatarImageAlt: Solo-practice icon — a single desk and chair
      name: The solo private-practice counsellor
      role: Independent counsellor running their own small practice, comfortable with everyday tech, sceptical of anything that depersonalises the work
      quote: >-
        "For every 40-minute session, 15 minutes to 20 minutes would be admin work."
      goals:
        - Get ready for the next client at a glance, without opening five different apps
        - Send a worksheet to a client without digging through email and Drive
        - Keep notes that are searchable later, without typing during the session
        - Spend less of the day on scheduling, billing, and chasing follow-ups
      frustrations:
        - No single place that holds notes, calendar, and client records together
        - Handwritten notes that cannot be searched after the fact
        - Resources scattered across Drive, email attachments, and bookmarks
        - Scheduling and payments handled in separate, disconnected tools
      context: >-
        This persona stands in for the independent practitioners I interviewed, most of them
        India-based. They are willing to invest in something that genuinely removes friction, but
        they will abandon anything that adds steps to a day that is already full, and they remain
        quietly protective of the relationship at the centre of their work.
      contextTags:
        - Solo practitioner
        - High trust stakes
        - Resource curator
        - Privacy-conscious
  - component: ProjectPersona
    props:
      eyebrow: Composite persona, synthesised from the interviews rather than a single participant
      avatarImage: /images/counselling/persona-institution.svg
      avatarImageAlt: Institutional-practice icon — three linked desks
      name: The institution-based practitioner
      role: Works inside a school, academic, or counselling-institution setting, often alongside others, follows the AI debate closely
      quote: >-
        "AI was introduced… ChatGPT came out last year officially, it's been a very short time.
        I feel like they're just doing things too fast before we have enough time to understand
        them."
      goals:
        - Adapt the same toolkit to a setting with its own rules and rhythms
        - Hand a client off or refer them on without losing the context
        - Understand exactly what any AI feature is doing before trusting it
        - Track progress in a shared, structured way rather than in personal notes
      frustrations:
        - Generic software that cannot bend to a school or institutional workflow
        - Re-explaining sensitive client context every time a referral happens
        - No transparency about how AI features are trained or what they do with data
        - The pace of AI moving faster than anyone's ability to make sense of it
      context: >-
        This persona reflects the practitioners working in schools and institutions, and the UK
        social-work perspective in the sample. They are not anti-technology, but they set a high
        bar for explainability and control, and they need tools that flex across very different
        contexts.
      contextTags:
        - Institutional context
        - AI-cautious but curious
        - Referral-heavy
        - Transparency-first
  - component: ProjectHowMightWe
    props:
      title: How might we…
      intro: >-
        The opportunity questions I drew out of the synthesis, which set the direction for the
        design.
      items:
        - question: >-
            How might we bring scheduling, notes, and client records into one coherent place
            without forcing practitioners to abandon the tools they already trust?
          theme: Integration
        - question: >-
            How might we let practitioners capture notes in a way that keeps them present in the
            room rather than hunched over a keyboard?
          theme: Presence
        - question: >-
            How might we make AI feel like a controlled, transparent tool the practitioner directs,
            rather than something acting on its own?
          theme: Trust & control
        - question: >-
            How might we surface the right client context at the start of a session without
            anyone having to prepare it by hand?
          theme: Preparation
        - question: >-
            How might we support the full range of practice settings without building something so
            complex nobody wants to use it?
          theme: Configurability
        - question: >-
            How might we make sharing a resource or a referral feel as easy as sending a message?
          theme: Sharing
  - component: ProjectTextImage
    props:
      eyebrow: Design solution
      title: A practice dashboard built around the back office
      body: >-
        The synthesis kept returning to the same five jobs that consumed practitioners' time:
        communication, scheduling, documentation, finances, and the keeping and sharing of
        resources. The design brings all five into a single interface that sits on top of an office
        suite the practitioner already uses, whether Google Workspace or Microsoft 365, so nothing
        has to be torn out. Alongside it is a voice assistant for the kind of multi-step
        administration that would otherwise take a string of separate actions. A practitioner can
        ask it to book a follow-up, send a worksheet, and set a reminder in one instruction, and
        rather than acting straight away it presents the breakdown as an editable checklist and
        waits for approval before anything runs.
      image: /images/counselling/workshop_gmail.jpg
      imageAlt: Co-design workshop — email drafts a participant configured during one of the seven activities
  - component: ProjectFindingsGrid
    props:
      title: The core of the dashboard
      items:
        - title: Home
          body: >-
            The day's sessions, the details of whoever is next, a live task list, and an email
            panel sit together on one screen, so the full picture is ready before a client arrives
            rather than spread across several tabs.
        - title: Schedule
          body: >-
            A calendar that switches between week and month views. Every session and event appears
            here, and selecting one opens its details and the actions that go with it, whether that
            is rescheduling, contacting the client, or reviewing the previous session's notes.
        - title: People
          body: >-
            A searchable, alphabetised client list. Each profile holds the session history with
            payment records, shared resources, communication, and a secure store for consent forms,
            along with an optional AI summary controlled by a per-client toggle.
        - title: Library
          body: >-
            A single repository for documents, worksheets, articles, and media, filterable by type
            and readable inside the tool. I also sketched a browser extension for clipping resources
            from the web, much as Zotero does, though that remained a concept.
        - title: Notes
          body: >-
            Hybrid note-taking. A practitioner can type into a template or scan in a sheet written
            by hand, then tag it, search across everything, and revisit earlier versions. Images
            and videos can be attached, since some therapeutic exercises are visual.
        - title: Voice assistant
          body: >-
            A cross-screen overlay for multi-step spoken instructions. It interprets what was said
            as discrete, editable checklist items and runs only those the practitioner explicitly
            approves.
  - component: ProjectTextImage
    props:
      eyebrow: The final prototype
      title: From a feel for it to the finished thing
      body: >-
        The co-design workshop was about developing a feel for what the tool needed to do. I gave
        participants a version stitched together from Google Workspace so they could live with it
        for a week and tell me where it fell short, and once those findings were in I designed the
        tool properly in Figma. The home screen mattered most to me, because it is the first thing
        a practitioner sees before a session and the place where the fragmentation problem shows up
        most sharply. So I brought the day's sessions, the details of whoever is next, the running
        task list, and the inbox onto a single screen. The intention was that a ten-second glance
        before a client arrives would be enough to feel prepared, rather than opening several tabs
        to reassemble the same picture by hand.
      image: /images/counselling/home.jpg
      imageAlt: >-
        Home dashboard — the day's sessions, the next client's details, the task list, and the
        inbox on a single screen
  - component: ProjectImageGalleryGrid
    props:
      title: The schedule, two ways to look at it
      images:
        - src: /images/counselling/schedule-week.jpg
          alt: >-
            Week view — every session laid out against the working day, with cards that open into
            reschedule, contact the client, or notes from last time
        - src: /images/counselling/schedule.jpg
          alt: Month view — the same schedule zoomed out, so the weeks ahead can be read at a glance
  - component: ProjectTextImage
    props:
      eyebrow: People
      title: The client record, and where the AI lives
      body: >-
        Every client has a profile, and this is where most of the AI questions from the interviews
        ended up being answered. It holds the session history with payments, the resources shared
        with that client, a secure place for consent forms, and an AI-written summary of where
        things stand, which is genuinely useful when someone returns for a one-off session after a
        long gap. The detail I kept returning to is the toggle at the top. AI stays off until the
        practitioner turns it on, and they turn it on for one client at a time rather than once
        across the whole practice. Some of the people I spoke to were wary of AI in a room this
        sensitive and others were keen, and a single switch buried in settings would have respected
        neither view. Letting practitioners decide client by client sits much closer to how they
        already think about consent and trust. That toggle exists because of the ethics review.
      image: /images/counselling/people.jpg
      imageAlt: >-
        Client profile — session history, shared resources, consent storage, and a per-client toggle
        that keeps AI off until the practitioner turns it on
      reverse: true
  - component: ProjectTextImage
    props:
      eyebrow: Notes
      title: Notes that keep you present in the room
      body: >-
        Many practitioners told me they still write their notes by hand, not because they prefer
        paper but because typing in front of a client breaks the eye contact a session depends on.
        The notes screen therefore had to support both. A practitioner can type into a template or
        scan in the sheet written during the session, then tag it, search across all of it, and look
        back through earlier versions. After the usability session I added support for images and
        videos as well, since some therapeutic exercises involve sketching and other visual work.
        The AI summary sits to one side as something a practitioner asks for, never something that
        happens to their notes unprompted. That distinction mattered more than I had expected.
      image: /images/counselling/session-notes.jpg
      imageAlt: >-
        Session notes — typed templates or scanned handwriting, tagged and searchable, with an AI
        summary you ask for rather than one that happens to you
  - component: ProjectTextImage
    props:
      eyebrow: Library
      title: One place for everything you share
      body: >-
        Almost everyone I interviewed was keeping a personal library of worksheets, articles, and
        videos, spread across Drive folders, email attachments, and browser bookmarks, with little
        hope of finding the right thing at the right moment. One participant described repeatedly
        re-downloading the same files from Drive to send to clients, exactly the kind of small,
        repeated waste that adds up over a week. The library gathers all of this into one place that
        can be filtered by type and read inside the tool, and it keeps track of what has been shared
        with whom. I also sketched a browser extension for clipping resources from the web as they
        are found, much as Zotero does for academic papers, though this remained a concept rather
        than something I built.
      image: /images/counselling/resources.jpg
      imageAlt: >-
        Library — worksheets, articles, and media in one place, filterable by type and readable inside
        the tool
      reverse: true
  - component: ProjectTextImage
    props:
      eyebrow: Artificial intelligence
      title: Where the AI explains itself
      body: >-
        This screen would probably not exist had I not carried out the ethical review first. Once you
        have mapped where sensitive data could travel, it becomes clear that AI cannot simply operate
        in the background unannounced. So there is a settings area whose whole purpose is transparency.
        It records when AI has been used, it lets the practitioner review and approve any summary
        before it reaches a client record, and it explains why a particular suggestion was made. The
        review also drew firm lines around what AI may touch at all: non-clinical work only,
        summarising and scheduling prompts, and nothing resembling diagnosis. None of this makes the
        tool cleverer, but it does make it legible, and for the people I spoke to that legibility was
        what separated curiosity from genuine trust.
      image: /images/counselling/artificial-intelligence.jpg
      imageAlt: >-
        AI transparency settings — usage notifications, review-and-approve before anything reaches a
        client record, and visibility into why a suggestion was made
  - component: ProjectDecisionLog
    props:
      title: The decisions I had to defend
      intro: >-
        The choices that came out of the tension between what the tool could do and what it should do
        in a setting this sensitive.
      decisions:
        - decision: AI made opt-in per client, not once for the whole practice
          rationale: >-
            Practitioners held strong and often opposing views on AI in a therapy room, and a single
            global on-off was too blunt to respect that range. Per-client control lets each practitioner
            make the decision relationship by relationship, which mirrors how they already think about
            consent.
          outcome: >-
            This came directly out of the RRI review, and it became the clearest signal of practitioner
            agency in the interface rather than a compliance checkbox buried in settings.
          outcomeType: positive
        - decision: The voice assistant shows an editable checklist before it does anything
          rationale: >-
            My initial assumption was that direct execution would feel faster. The research made clear
            that practitioners need to see and approve what the system intends to do before it acts,
            particularly for anything that reaches a client.
          outcome: >-
            In the think-aloud session the voice assistant was among the most warmly received parts of
            the design, and the approval step was a large part of why. It made the feature feel like a
            tool rather than a risk.
          outcomeType: positive
        - decision: Run the co-design workshop asynchronously, by post
          rationale: >-
            Practitioners have very little time for research. A one-week asynchronous format, built on
            Google Workspace tools they already knew and supported by a physical toolkit in the post,
            lowered the barrier enough for people to take part.
          outcome: >-
            Engagement was stronger than I had expected and participants felt real ownership of the
            result. Responses did arrive one to two weeks late, however, and some activities caused
            confusion. A short synchronous briefing at the start would address that next time.
          outcomeType: neutral
        - decision: Design for the practitioner's back office, not for patients
          rationale: >-
            Patient-facing mental health apps are a crowded and ethically loaded space, and the
            BetterHelp data-sharing case is a clear warning. Practitioner tooling is underrepresented in
            both the market and in HCI research, so the gap was real and worth addressing.
          outcome: >-
            The decision kept the research focused and gave the design a sharper value proposition than a
            broader scope would have allowed. Treating the practitioner as the primary user also produced
            more actionable findings.
          outcomeType: positive
  - component: ProjectCallout
    props:
      variant: warning
      label: The RRI review, and what it changed
      body: >-
        Using the RRI prompts and practice cards alongside the Moral IT cards, I mapped every
        stakeholder and worked through the data flows, consent boundaries, and AI risks. Several
        concrete decisions came out of it. AI was confined to non-clinical roles and never diagnosis,
        a per-client AI toggle was introduced, informed consent from both client and practitioner became
        a requirement before AI could touch session notes, open-source and on-device or
        privacy-preserving components were favoured given the sensitivity of the data, and explicit
        practitioner approval was required before any client-facing action could run.
  - component: ProjectAccessibilityAudit
    props:
      title: What the heuristic evaluation caught
      intro: >-
        A classmate and I walked the prototype against Nielsen's heuristics before the usability session.
        These are the issues we found and fixed in the second iteration.
      issues:
        - issue: Inconsistent spacing and visual hierarchy across screens
          description: >-
            Card padding, heading sizes, and label styles drifted from screen to screen, which makes a
            tool harder to scan quickly, and that matters for someone reading it in the moments before a
            client arrives.
          severity: serious
          wcagCriterion: 'Nielsen H4 — Consistency and standards'
          fix: >-
            Standardised the spacing and type scale across every screen in the second iteration.
        - issue: Inconsistent highlighting and weak use of whitespace
          description: >-
            Emphasis and selected states were applied unevenly, and cramped layouts made it harder to
            tell what was grouped with what.
          severity: moderate
          wcagCriterion: 'Nielsen H8 — Aesthetic and minimalist design'
          fix: >-
            Reworked the layouts to give content room to breathe and applied highlighting consistently.
        - issue: Confusing copy, especially around AI actions
          description: >-
            Some labels did not make clear what an action would do, and AI-generated content was not
            obviously marked as something to review before sending.
          severity: serious
          wcagCriterion: 'Nielsen H1 — Visibility of system status'
          fix: >-
            Rewrote the unclear labels and gave AI-generated output a distinct treatment that flags it for review.
        - issue: Missing AI scheduling prompts surfaced in the usability session
          description: >-
            The practitioner pointed out that the easiest admin to forget is booking the next session, and
            that the tool could prompt for it instead of leaving it to memory.
          severity: moderate
          wcagCriterion: 'Nielsen H6 — Recognition rather than recall'
          fix: >-
            Added AI scheduling prompts and a basic resource-sharing mechanism in the final iteration.
  - component: ProjectCallout
    props:
      variant: insight
      label: The usability session
      body: >-
        A private-practice practitioner worked through the prototype using the think-aloud protocol. Their
        overall view was that it improved clearly on the collection of tools they currently use, largely
        because of how the parts connect, and the voice assistant was well received. The feedback that
        shaped the final iteration was practical. They wanted prompts to schedule follow-ups so none were
        forgotten, the ability to add images and videos to session notes for visual exercises, an easy way
        to share resources and notes with another practitioner when referring a client, and continued work
        on goal-setting and progress tracking, which still needs development.
  - component: ProjectLearnings
    props:
      title: What I took away
      points:
        - >-
          Low-contact co-design works well for time-poor professionals, but it needs more scaffolding than
          an in-person session, not less. Almost all the friction my participants met would have been
          avoided by a short live briefing at the start, and that is the first thing I would change.
        - >-
          The administrative layer of professional practice is badly underserved by design. It is
          unglamorous, it is where a good deal of burnout begins, and there is real room to help, which
          makes it a more interesting space to work in than the crowded patient-facing one most products
          gravitate toward.
        - >-
          AI in a sensitive context has to feel like a tool the practitioner is holding rather than an
          agent acting on its own. The per-client toggle and the approve-before-execution pattern were both
          responses to that, and both were the parts people responded to most strongly.
        - >-
          Reflexive thematic analysis required me to account for what I brought to the data, not only what
          was in it. That discomfort is the point of the method, and it made the design rationale more
          defensible.
        - >-
          The RRI review surfaced risks I would never have found through usability testing alone,
          particularly around data flows and the proper scope of AI. I now consider it a standard part of
          any health-adjacent design process.
  - component: ProjectCallout
    props:
      variant: insight
      label: Limits, and what comes next
      body: >-
        Seven practitioners gave me rich and detailed insight, but it is a small qualitative sample and I
        would not claim it generalises. The asynchronous workshop introduced delays and some ambiguity. The
        output is a validated concept and prototype rather than a shipping product. The natural next steps
        are to build an MVP against the real Google Workspace and Microsoft Graph APIs, trial it with a
        small cohort in practice, and measure the effect on practitioner time and wellbeing quantitatively
        alongside the qualitative work.
  - component: MoreProjects
    props:
      title: More projects
      projects:
        - title: Perro Onboarding & Subscription
          blurb: >-
            A shorter, value-first onboarding and subscription redesign that reduced drop-offs and lifted
            conversion, implemented directly in Flutter.
          slug: perro-onboarding
          category: UX / Flutter
---