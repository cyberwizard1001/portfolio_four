---
title: Perro Onboarding & Subscription
filename: perro-onboarding.md
mode: NORMAL
type: UX / Flutter
year: "2024"
image: /images/perro/hero.svg
imageAlt: A long cluttered before-path of six onboarding steps, against a short direct after-path of two steps to a lime home icon
oneliner: Users were quitting the app before getting to the home screen. I redesigned the onboarding and built it using Flutter, working from research through to production.
eyebrow: Mobile App · Onboarding · End-to-End
problem: New users were giving up partway through setup. The app asked for a photo, health details and fitness info before it had shown them anything, and a lot of people never reached the home screen.
outcomeValue: Named as a strength at acquisition
outcomeLabel: Fewer people gave up at the photo and health steps, more of them subscribed, and some picked longer plans.
statusline:
  - label: NORMAL
    lime: true
  - label: ux · flutter
  - label: "2024"
  - label: Dart · Figma
  - label: qual research
order: 3
device: flip
# Summary hero at the top of the case study (see CaseStudyHero.astro). Fields marked
# "from Nirmal" are placeholders for new copy.
hero:
  inShort: "[IN SHORT: from Nirmal]"
  changed:
    - "[CHANGED 1: from Nirmal]"
    - "[CHANGED 2: from Nirmal]"
    - "[CHANGED 3: from Nirmal]"
  notWell:
    - "[DIDN'T GO WELL: from Nirmal]"
  # From the ProjectHero scope: "Solo designer + dev · 2 weeks · App onboarding redesign"
  role: Solo designer + dev
  # The existing copy names no collaborators. It mentions working part-time as the sole
  # front-end developer. To confirm.
  workedWith:
    - "[WORKED WITH: from Nirmal]"
  # Existing text (TLDR Constraints): "Two weeks, part-time."
  timeframe: "[TIMEFRAME: from Nirmal]"
  # Existing text (TLDR Outcome): "When the company was acquired, the UX was named as one
  # of the product's strengths."
  status: "[STATUS: from Nirmal]"
  # Moved word for word from the ProjectBeforeAfter section, which has been removed.
  beforeText: >-
    The original flow ran to five screens and sixteen questions, with a mandatory photo
    upload, abrupt system permission prompts, and no explanation anywhere of what Perro
    offered.
  afterText: >-
    The redesigned flow has four screens and eleven questions, with default avatars in place
    of the mandatory photo, a feature carousel that presents the value up front, a
    notifications explainer, and a subscription step that carries the same story through to
    the end.
  # Proposed pairs, to confirm. The first is the onboarding diagram split in two
  # (perro_before_after in tools/graphics.py); its label, alt text and captions are new
  # copy. The rest are after-only, with the existing alt text and captions.
  pairs:
    - label: "[PAIR LABEL: from Nirmal]"
      before:
        src: /images/perro/flow-before.svg
        alt: "[ALT: from Nirmal]"
        caption: "[CAPTION: from Nirmal]"
      after:
        src: /images/perro/flow-after.svg
        alt: "[ALT: from Nirmal]"
        caption: "[CAPTION: from Nirmal]"
    - label: Feature carousel
      after:
        src: /images/perro/solution-feature-carousel.jpg
        alt: >-
          The four feature carousel slides: Perro&You training guides, on-demand vet access,
          Woof Rewards, and smart activity tracking with Apple Health and Google Fit
        caption: >-
          The four feature carousel slides: Perro&You training guides, on-demand vet access,
          Woof Rewards, and smart activity tracking with Apple Health and Google Fit
    - label: Avatar system
      after:
        src: /images/perro/decision-avatars.jpg
        alt: The dog and owner avatar pickers that replaced the mandatory photo upload.
        caption: The dog and owner avatar pickers that replaced the mandatory photo upload.
    - label: Notifications explainer
      after:
        src: /images/perro/decision-permissions.jpg
        alt: The notifications explainer, listing what the user gets before the OS prompt appears.
        caption: The notifications explainer, listing what the user gets before the OS prompt appears.
    - label: "[PAIR LABEL: from Nirmal]"
      after:
        src: /images/perro/decision-paywall.jpg
        alt: The Introducing Perro benefits screen, followed by the plan choice with the three-day trial on the yearly plan.
        caption: The Introducing Perro benefits screen, followed by the plan choice with the three-day trial on the yearly plan.
sections:
  - component: ProjectHero
    props:
      title: Perro onboarding and subscription redesign
      type: UX / Flutter
      year: "2024"
      scope: "Solo designer + dev · 2 weeks · App onboarding redesign"
  - component: ProjectGallery
    props:
      image: /images/perro/hero.svg
      imageAlt: A long cluttered before-path of six onboarding steps, against a short direct after-path of two steps to a lime home icon
  - component: ProjectMeta
    props:
      statusline:
        - label: NORMAL
          lime: true
        - label: ux · flutter
        - label: "2024"
        - label: Dart · Figma
        - label: qual research
  - component: ProjectIntro
    props:
      eyebrow: Perro · Case study 02
      title: Perro onboarding and subscription redesign
      summary:
        - >-
          Perro is a UK pet care and rewards app that helps owners keep track of their dog's
          health, exercise and socialising. A whole household can log in and share the app, and
          members can earn up to £500 in Woof benefits. People who completed onboarding and
          explored the app tended to like the features and use them regularly, but a large share
          of new users never reached the home page at all, dropping off at various points in
          setup and not coming back. Early abandonment is common across mobile apps, many of
          which lose a large proportion of new installs within the first week, and a setup flow
          that asked for a good deal of time without showing what the user would get in return
          made Perro especially vulnerable to it, at a direct cost to subscription income.
        - >-
          I was working part-time as a designer and developer, with a two-week window to
          redesign the onboarding under a tight set of constraints. Changes could only be made
          in the mobile app, not on the server, and the redesign could not put existing users at
          risk. Before designing anything, I worked through the Mixpanel funnels and watched
          usability session recordings to understand the reasons behind each drop-off.
        - >-
          As the sole front-end developer, I then built the new onboarding and subscription
          experience into the app myself. The changes reduced drop-offs, improved completion and
          had a positive effect on subscriptions, and the work was later cited as one of the
          product's strengths when the company was acquired.
  - component: ProjectMetricsBand
    props:
      items:
        - value: ↓ Drop-off
          label: Most clearly at the old photo and health bottlenecks
        - value: ↑ Completion
          label: More people reaching their first real in-app actions
        - value: ↑ Conversion
          label: Higher subscription take-up after launch
        - value: Acquired
          label: UX cited as a product strength during acquisition
  - component: ProjectProblemKeyInfo
    props:
      problemBody: >-
        The app offered real value to users who completed onboarding, but too many people
        dropped off before reaching the home page. Mixpanel funnel data showed a large share of
        new users leaving during setup, which fed directly into lower subscription revenue and
        fewer people choosing the higher-value, longer-term plans.
      briefFindings:
        - label: Excessive form length
          body: >-
            Optional information, such as pet illnesses and detailed health inputs, was treated
            as mandatory and requested before the app had shown what it would do with any of it.
        - label: Photo upload as an exit point
          body: >-
            People left the app to find the right picture and frequently did not return, so a
            step added with good intentions had become the largest single drop-off point in the
            flow.
        - label: Fatigue before the payoff
          body: >-
            Permission and fitness questions reached users who were already worn out, and by the
            time I reached the end of the flow myself, I was questioning whether the app was worth
            the effort.
      infoItems:
        - label: Objective
          value: >-
            Make onboarding shorter, clearer and more trustworthy, in a way that reduces
            drop-off and supports subscription conversion
        - label: Success measure
          value: >-
            Onboarding completion, subscription conversion rate, and the share of
            longer-term plans chosen
        - label: Constraints
          value: >-
            Flutter only, no backend changes, a two-week part-time sprint, and a stable
            experience for existing users
        - label: Scope
          value: Landing, onboarding steps, and the subscription screens
  - component: ProjectTextImage
    props:
      eyebrow: Research
      title: Points of abandonment in the original flow
      body: >-
        The Mixpanel funnels identified three distinct points at which users dropped off. Each
        had its own immediate cause, but all three pointed to the same underlying problem, which
        was that the flow never set out clearly what the app would do for the user.
      image: /images/perro/drop-off-funnel.svg
      imageAlt: The original flow from landing to home, with drop-offs marked at sign-in, dog profile setup and user profile setup
  - component: ProjectFindingsGrid
    props:
      title: Findings from funnel analysis and usability sessions
      items:
        - title: Three distinct drop-off points
          body: >-
            The Mixpanel funnels, fed through Twilio Segment, showed people leaving in three
            places: the landing and sign-in screen, the dog profile setup, and the user profile
            setup with its fitness, activity and location questions.
        - title: Cumulative effort across the journey
          body: >-
            No single screen was responsible. Effort accumulated at each step while motivation
            fell, until users simply gave up, which meant the solution had to address the flow as
            a whole by reordering it, signposting value and removing questions that did not need
            to be there.
        - title: Photo upload as a source of churn
          body: >-
            The usability sessions confirmed what the data suggested, since people left the app to
            find a good photo of their dog and frequently did not return. A step included with the
            user's interests in mind, and not revisited since, had become a significant cause of
            churn.
        - title: Disproportionate health questions
          body: >-
            Pre-existing conditions and detailed health inputs appeared early in the flow, and
            participants described them as "intense" for that point in the journey, because they
            had not yet seen enough value to justify that level of detail.
        - title: Fatigue at the fitness and location questions
          body: >-
            By the time users reached the user profile section, they had already answered a long
            series of questions, and with no explanation of what the fitness levels meant or why
            they were needed, many left the app at this point.
        - title: Agreement between qualitative and quantitative data
          body: >-
            Every pattern observed in the sessions matched a corresponding dip in the Mixpanel
            data, and because the recordings and the numbers told the same story, the diagnosis
            was comparatively straightforward.
  - component: ProjectFindingsGrid
    props:
      title: Heuristic evaluation
      items:
        - title: Premature data collection
          body: >-
            Optional, nice-to-have data was treated as mandatory, so onboarding felt like a
            bureaucratic form rather than an introduction to the product.
        - title: Unclear value exchange
          body: >-
            People were asked for information and permissions with no clear connection to what
            they would receive in return, and at no point did the flow explain what Perro would do
            for them.
        - title: Inconsistency across screens
          body: >-
            Visual inconsistencies, copy issues, weak interaction design and uneven patterns
            across screens made the flow feel unfinished, which undermined the first impression
            the app was trying to make.
  - component: ProjectFindingsGrid
    props:
      title: Competitor analysis
      items:
        - title: Value before data collection
          body: >-
            The strongest onboarding flows I reviewed, Biscuit among them, explained what the
            product would do for the user before asking anything of them.
        - title: Short visual sequences
          body: >-
            Feature carousels and progress indicators were consistently associated with higher
            engagement and lower drop-off than text-heavy, question-first flows such as ours.
        - title: Explicit treatment of optional information
          body: >-
            The best examples made clear what was required, what was optional and, most
            importantly, why each piece of information was being requested, which matters all the
            more when the information concerns a pet's health.
  - component: ProjectQuote
    props:
      quote: >-
        People were not leaving because Perro offered poor value. They were leaving because
        onboarding asked too much, too early, before it had given anything in return.
      attribution: Synthesis across funnel data, heuristic review, and usability sessions
  - component: ProjectPersona
    props:
      eyebrow: User persona
      name: Jess Harrington
      role: New dog owner, recently rehomed a 2-year-old rescue Greyhound
      quote: >-
        "I downloaded it because the rewards looked interesting, but I gave up when it
        started asking about vaccinations. I just wanted to track walks."
      goals:
        - Track her dog's activity and wellbeing without it feeling like a chore
        - Understand what the rewards programme gives her before committing to anything
        - Get through setup quickly
        - Feel that the app is on her side rather than working against her
      frustrations:
        - Being asked for detailed health information before seeing anything in return
        - Having to leave the app to find a usable photo before she can continue
        - Permission prompts that interrupt her instead of feeling like part of the
          experience
      context: >-
        Jess is 31 and already uses several health and fitness apps, so she has little patience
        for an onboarding flow that gets in her way when she could track her dog's activity in
        Fitbit or Apple Health instead. She is comfortable with digital products and quick to
        abandon anything that feels more complicated than it needs to be. She was exactly the
        user Perro wanted, but she dropped off at the dog health screen on her first attempt and
        did not return.
      contextTags:
        - New dog owner
        - App-savvy
        - Low friction tolerance
        - Rewards-motivated
  - component: ProjectPersona
    props:
      eyebrow: User persona
      name: Marcus Webb
      role: Long-term dog owner, two Spaniels, active walker
      quote: >-
        "I don't mind giving information if I understand why you need it. But this kept
        asking things I couldn't see the point of yet."
      goals:
        - Log walks and activity alongside the Apple Health data he already tracks
        - Use the training and enrichment content to try new things with his dogs
        - Share the app with his partner so they can both keep an eye on the dogs
        - See real value from the rewards before choosing a subscription tier
      frustrations:
        - No clear reason given for the location and notification permissions
        - Being asked for fitness information his health app already holds
        - Subscription options that do not map onto what he wants to use
        - A setup flow that seems designed for a single dog rather than his household
      context: >-
        Marcus is 44, runs regularly, and is meticulous about the health data he tracks. He was
        willing to spend time on setup as long as the payoff was clear, but he met friction at
        the permissions screen and again at the subscription step. His instinct is to set
        something aside and come back to it rather than abandon it outright, although his second
        attempt stalled in the same places.
      contextTags:
        - Experienced dog owner
        - Health data user
        - Multi-dog household
        - Return visitor
  - component: ProjectCallout
    props:
      variant: principle
      label: Strategy
      body: >-
        Three principles shaped almost every decision. The first was to refocus onboarding on
        the data the first session strictly needed, rather than information that would merely be
        useful to have on file. The second was to show the value of the app before asking for
        anything. The third was to address the specific friction points the research had
        identified, namely the photo upload, the unexplained permissions and the late-funnel
        fatigue, rather than simply improving how the existing flow looked.
  - component: ProjectProcessSteps
    props:
      title: Method
      steps:
        - title: Data-led scoping
          body: >-
            The Mixpanel funnels defined the scope of the work, so the screens with the steepest
            drop-offs became the core of the sprint and everything else was set aside.
        - title: Field audit
          body: >-
            I reviewed every onboarding field against a single test, which was whether the first
            session needed it. Pet illnesses and detailed health information failed that test and
            were removed entirely, since the app made no meaningful use of them at that stage. The
            fitness question remained, but was reduced to a single choice between three
            illustrated levels, with an info button explaining each one.
        - title: Feature carousel
          body: >-
            A short carousel introduced Perro through four features: Perro&You training guides and
            enrichment exercises, on-demand vet access, Woof Rewards discounts, and activity
            tracking with Apple Health and Google Fit. I tested it against a stripped-back version
            that went straight to the forms, half expecting the shorter route to win, but the
            carousel performed better on both engagement and downstream completion.
        - title: Avatar system
          body: >-
            Default avatars for both dog and owner replaced the mandatory photo upload, with
            camera and gallery options kept alongside them for anyone who wanted to add a photo.
            Anyone could now finish setup without leaving the app and add a real picture of their
            dog from Settings later, which also leaves room to reward that step in future.
        - title: Notifications explainer
          body: >-
            A short screen now appears before the OS notification prompt, explaining in plain
            language what people gain by allowing notifications: smart recommendations, walkies
            and rewards reminders, and new training content. Skip sits beside Allow, and turning
            notifications off brings up a confirmation noting that health tips and reminders will
            be missed, so the request feels like part of the experience rather than a technical
            interruption.
        - title: Subscription step and Flutter build
          body: >-
            Before the plans, an "Introducing Perro" screen repeats what the carousel promised:
            training guides, enrichment exercises, 24/7 vet questions, rewards and discounts, and
            activity tracking with Apple Health and Google Fit. The plans follow as stacked cards,
            with a three-day trial on the yearly plan and a "Save 30%" tag steering gently towards
            it, so the paywall reads as a continuation of the story rather than an abrupt change of
            direction. I built the whole redesign directly in Flutter and refined it through a
            small test build.
  - component: ProjectHowMightWe
    props:
      title: Problem framing
      intro: >-
        The research produced six opportunity questions, most of which come down to whether the
        exchange between Perro and a new user feels fair.
      items:
        - question: >-
            How might we show new users what Perro will do for them before asking them to invest
            time?
          theme: Value first
        - question: >-
            How might we let someone finish setup without leaving the app, even when they
            do not have a suitable photo to hand?
          theme: Friction removal
        - question: >-
            How might we make every question feel necessary and clearly tied to something
            the user cares about?
          theme: Purpose
        - question: >-
            How might we explain permissions so they feel like part of the product rather
            than a legal formality?
          theme: Trust
        - question: >-
            How might we make the subscription step feel like a natural next move rather
            than a jarring upsell?
          theme: Continuity
        - question: >-
            How might we cut the number of questions without losing the ones that matter for
            the first session?
          theme: Progressive disclosure
  - component: ProjectGallery
    props:
      image: /images/perro/before-after-screens.svg
      imageAlt: The original onboarding steps compared with the redesigned flow, marking the new feature carousel, avatar sign-up and permissions explainer
  - component: ProjectDecisionLog
    props:
      title: Design decisions and rationale
      intro: The decisions that shaped the redesign, the reasoning behind each, and what I observed afterwards.
      decisions:
        - decision: >-
            Removed pet illnesses and detailed health information from onboarding
          rationale: >-
            These fields sat early in the flow, added considerable perceived effort, and offered
            nothing in return during the first session, when people were not yet invested enough
            to see it as a fair exchange.
          outcome: >-
            A major point of resistance disappeared. The information moved to a later in-app
            prompt, where people had the context and the motivation to provide it.
          outcomeType: positive
        - decision: Introduced a feature carousel before the first form screen
          rationale: >-
            The competitor analysis and the usability sessions pointed to the same gap, in that
            people had no idea what Perro would do for them before being asked for information.
          outcome: >-
            In testing against a minimal version without the carousel, it performed better on
            engagement and downstream completion, and it became the production baseline.
          outcomeType: positive
        - decision: >-
            Replaced the mandatory photo upload with default avatars and an optional photo
          rationale: >-
            The sessions showed this step was a silent exit point, because people left to find a
            suitable photo and frequently did not return, so making it optional removed a blocker
            that added little value.
          outcome: >-
            Drop-off at the dog profile step fell noticeably after launch, and people could finish
            setup in one sitting without leaving the app.
          outcomeType: positive
          image: /images/perro/decision-avatars.jpg
          imageAlt: The dog and owner avatar pickers that replaced the mandatory photo upload.
        - decision: Added a plain-language notifications explainer before the OS prompt
          rationale: >-
            System dialogs for location and notifications appeared without warning, and most
            people either dismissed them or felt ambushed by them.
          outcome: >-
            Acceptance improved, as people who read the explainer were far more likely to grant
            notification access.
          outcomeType: positive
          image: /images/perro/decision-permissions.jpg
          imageAlt: The notifications explainer, listing what the user gets before the OS prompt appears.
        - decision: Repeated the carousel benefits before the subscription plans
          rationale: >-
            The paywall had felt disconnected from the rest of onboarding, and repeating the
            carousel's benefits on an "Introducing Perro" screen just before the plans tied it back
            into the same story.
          outcome: >-
            Subscription conversion rose and more people chose longer-term plans, with feedback
            describing the step as "fairer" and "more honest".
          outcomeType: positive
          image: /images/perro/decision-paywall.jpg
          imageAlt: The Introducing Perro benefits screen, followed by the plan choice with the three-day trial on the yearly plan.
        - decision: Reduced the fitness question to three illustrated choices with an explainer
          rationale: >-
            The question arrived when people were already fatigued, and nothing explained what the
            fitness levels meant or why Perro wanted to know.
          outcome: >-
            The question remains, but it is now a single tap on the owner screen between "Strictly
            walkies only", "Weekend warrior" and "Fitness fanatic", and the info button opens a
            short dialog describing each level.
          outcomeType: tradeoff
  - component: ProjectTextImage
    props:
      eyebrow: Solution
      title: A shorter, value-first introduction to Perro
      body: >-
        The redesigned onboarding replaces what had felt like a long and somewhat opaque form
        with a short introduction that leads with value. New users see what Perro will do for
        them, answer fewer but more relevant questions, stay inside the app while setting up
        their dog's profile, and understand why they are being asked for notifications and
        payment. The subscription step continues the same story, so starting a plan feels like a
        natural next step rather than a change of direction.
      image: /images/perro/solution-feature-carousel.jpg
      imageAlt: >-
        The four feature carousel slides: Perro&You training guides, on-demand vet access,
        Woof Rewards, and smart activity tracking with Apple Health and Google Fit
  - component: ProjectGallery
    props:
      image: /images/perro/solution-redesigned-flow.jpg
      imageAlt: >-
        The redesigned setup flow: dog profile with avatars, owner profile, location, the
        notifications explainer, and the subscription step
  - component: ProjectAccessibilityAudit
    props:
      title: Accessibility considerations
      intro: >-
        Issues raised during the heuristic evaluation and addressed within the redesign rather
        than deferred to later work.
      issues:
        - issue: No progress indicator in a five-screen flow
          description: >-
            People had no way to gauge how far through onboarding they were or how much remained,
            which reinforced the sense that the effort was open-ended.
          severity: serious
          wcagCriterion: 2.4.8 Location
          fix: >-
            Added a progress bar to every setup screen, with a small owner-and-dog illustration
            walking along it to show how far through the user is.
        - issue: System permission dialogs appeared with no context
          description: >-
            OS-level prompts for location and notifications arrived abruptly with no prior
            explanation, and for anyone using a screen reader, the sudden modal shift was
            particularly disorienting.
          severity: serious
          wcagCriterion: 3.3.2 Labels or Instructions
          fix: >-
            Added a dedicated explainer screen before the notification prompt, listing in plain
            language what the user gets, with Skip given equal weight next to Allow.
        - issue: Avatar selection was not usable with VoiceOver or TalkBack
          description: >-
            The initial avatar grid used tap targets that were too small and had no accessible
            labels, which made selection difficult for anyone navigating by touch or screen
            reader.
          severity: serious
          wcagCriterion: 2.5.5 Target Size / 4.1.2 Name, Role, Value
          fix: >-
            Increased avatar tap targets to a minimum of 48x48dp and gave each one a semantic
            label describing the breed or character.
        - issue: Optional fields were not labelled as optional
          description: >-
            Photo upload and several profile fields were effectively optional but were not marked
            as such, so people assumed they had to complete them to proceed.
          severity: moderate
          wcagCriterion: 3.3.2 Labels or Instructions
          fix: >-
            Made default avatars the main path for both dog and owner, with camera and gallery
            buttons alongside them, so a profile is complete without a photo.
        - issue: The feature carousel had no pause or manual control
          description: >-
            The carousel advanced automatically on a timer with no way to pause or step through
            it, which is a problem for anyone who needs more time to read.
          severity: moderate
          wcagCriterion: 2.2.2 Pause, Stop, Hide
          fix: >-
            Removed the automatic advance, so each slide moves on only when the user taps the
            next button, and "Get started" lets people skip straight to setup.
  - component: ProjectTextBlock
    props:
      heading: Constraints
      body: >-
        The whole project was designed and built within a two-week, part-time Flutter sprint.
        Being both designer and developer meant that every idea had to be something I could
        build myself, which proved a useful discipline early in my career. Backend changes were
        not an option, so every change had to live in client-side logic, and because existing
        users still needed a stable app, the work had to be additive rather than disruptive. The
        short window pushed me towards focused, incremental changes rather than a wholesale
        rewrite. The advantage of building in Flutter myself was a tight feedback loop, since I
        could validate each decision in the real product rather than a prototype, which surfaced
        problems earlier and saved a great deal of time that would otherwise have gone into
        guesswork.
  - component: ProjectLearnings
    props:
      title: Reflection and further work
      points:
        - >-
          Post-launch funnel data showed a noticeable drop in abandonment across onboarding,
          most clearly at the old photo upload and health information steps, which were exactly
          the points the research had flagged.
        - >-
          Completion rose, with more people reaching their first real in-app actions. This is the
          measure I value most, because it shows that the first session was finally delivering
          something to the user.
        - >-
          Subscription conversions rose and more people chose the longer-term plans, which was
          consistent with the aim of making the paywall feel like a continuation of onboarding
          rather than an interruption.
        - >-
          Qualitative feedback from users and stakeholders repeatedly used the same words to
          describe the new flow: clearer, simpler and more trustworthy.
        - >-
          The redesign did not succeed because it looked better. It succeeded because it stopped
          asking people for things before giving them a reason to agree, and had I spent the two
          weeks making the old form more attractive, I doubt the numbers would have moved at all.
  - component: MoreProjects
    props:
      title: More projects
      projects:
        - title: Crafting Counselling Companions
          blurb: >-
            Co-designing a session-planning tool with counsellors, from research through
            prototype, to reduce the admin overhead that gets in the way of client work.
          slug: counselling-companions
          category: UX Research
---
