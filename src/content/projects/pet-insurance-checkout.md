---
title: Pet Insurance Checkout Redesign
filename: checkout-redesign.md
mode: NORMAL
type: UI / UX
year: "2026"
image: /images/pet-insurance/hero.svg
imageAlt: A confidence gauge moving from anxious to confident, beside a terminal checklist of what the redesigned review page made clear
oneliner: Insuring a pet means paying every month for something you hope you never need, often to a brand you've never heard of. I redesigned the review page so people could actually tell what they were buying before they paid for it.
eyebrow: Web · Checkout · Conversion
problem: The review page is where people decide whether to pay, and it hid the numbers they needed. Some people hesitated and left, and some bought and later complained about cover they thought they had.
outcomeValue: Policy details understandable at a glance
outcomeLabel: Thousands of people go through it every week, and they can now better understand the policy before they pay. Delivers better customer outcomes
statusline:
  - label: NORMAL
    lime: true
  - label: ui/ux
  - label: "2026"
  - label: MudBlazor · FCA
  - label: Hotjar · heuristics
order: 1
device: calc
sections:
  - component: ProjectHero
    props:
      title: Pet Insurance Review/Checkout Page Redesign
      type: UI / UX
      year: "2026"
      scope: "Solo designer · Internal stakeholders · Checkout redesign"
  - component: ProjectGallery
    props:
      image: /images/pet-insurance/hero.svg
      imageAlt: A confidence gauge moving from anxious to confident, beside a terminal checklist of what the redesigned review page made clear
  - component: ProjectMeta
    props:
      statusline:
        - label: NORMAL
          lime: true
        - label: ui/ux
        - label: "2026"
        - label: MudBlazor · FCA
        - label: Hotjar · heuristics
  - component: ProjectBeforeAfter
    props:
      beforeTitle: Before
      beforeBody: >-
        Everything sat on one long scrolling page: marketing preferences, assumptions and declarations,
        cover details and the payment step, all stacked as paragraphs of text. The information
        was there, but you had to read every word of it, and nothing on the page gave you much
        reason to trust the brand before it asked for your card details.
      afterTitle: After
      afterBody: >-
        I split the review page into a two-page flow. The first page leads with price and trust
        signals, then moves through cover details, warranty questions, and personal information.
        The second page handles the assumptions and declarations, including an explicit call-out
        of the pre-existing conditions rules, before reaching payment. All of the FCA-mandated
        language stays exactly where compliance needs it. It's just no longer crowding the page.
  - component: ProjectIntro
    props:
      eyebrow: Perfect Pet Insurance — Case study 01
      title: Pet Insurance Review/Checkout Page Redesign
      summary: >-
        Insuring a pet is an emotional decision as much as a financial one. You commit real money
        every month hoping the insurer takes the stress off your hands the day your pet gets
        sick, so when the brand is one you've never heard of and the first thing it shows you is
        a wall of policy text, would you go ahead and buy? I'm not sure I would. That was roughly
        the experience waiting for customers on Perfect Pet's Review Quote page, most of whom
        arrive through aggregators like Compare the Market and Money Super Market, which is where
        the bulk of the business's sales come from.

        I had a single two-week sprint and went in expecting a mostly cosmetic job: make a dated
        page feel modern without touching its layout or copy. I started with a competitor review
        and Hotjar recordings of people using the live page, then built a prototype and tested it
        in eleven sessions with colleagues from across the business. Recruiting internally was
        something the timeline forced on me, and the usual wisdom is that people who work in pet
        insurance make poor stand-in users. By the middle of the first interview I had that
        backwards: these were the people who handle the complaints and the declined claims, so
        they knew exactly what happens when the page fails to do its job.
  - component: ProjectMetricsBand
    props:
      items:
        - value: Conversion
          label: Quote completion rate, the main measure of success
        - value: Dwell time
          label: Time-to-decision on the review page
        - value: Post-sale complaints
          label: Claim-decline disputes and cancellations over time
        - value: Live
          label: Served to thousands of pet insurance customers every week
  - component: ProjectProblemKeyInfo
    props:
      problemBody: >-
        The review page is the last thing someone sees before they hand over payment details, and since
        most of Perfect Pet's sales come through aggregators, it's usually the first time that
        person has come across the brand at all. So the page has to explain the product and
        convince a complete stranger to trust us, both at once. The Hotjar recordings showed how
        that was going. People regularly spent five minutes or more on the page, opening policy
        PDFs halfway down to make sense of what they were reading, and a fair few went off to
        the main site to check something and never came back.
      contextBody: >-
        I worked on this with technical BAs, the Head of Product, someone from Compliance and a
        developer. Two rules applied to everything I did: it had to be buildable in the
        MudBlazor component framework, and every line of the existing policy copy had to stay
        exactly where it was for compliance reasons.
      infoItems:
        - label: Objective
          value: >-
            Make the review step easier to understand and more trustworthy, especially for
            users meeting the brand for the first time mid-funnel
        - label: Success measures
          value: >-
            Quote completion rate, dwell time on the review page, and longer-term
            cancellation and complaint volume
        - label: Constraints
          value: >-
            [[fca|FCA]] compliance, MudBlazor component framework, legacy platform, 2-week sprint
  - component: ProjectImageCarousel
    props:
      eyebrow: Context — routes to the review stage
      title: Customer journeys prior to the review page
      body: >-
        Customers reach the review page by one of two routes. Around 60% arrive through price
        comparison websites (PCWs), such as Compare the Market and MoneySuperMarket. They answer
        the pet and owner questions on the aggregator's own forms, and those answers are passed to
        Perfect Pet, so the review page is often their first contact with the brand. The remaining
        customers use Perfect Pet's direct quote flow, shown here, which collects the same
        information across three steps: pet details, owner details and policy selection. Either
        way, the customer reaches the review page having already answered the underwriting
        questions. In the direct flow, the full definition of a pre-existing condition sits behind
        a Help link, so the question can easily be answered without it being read.
      images:
        - src: /images/pet-insurance/flow/01-pet-details.jpg
          alt: Pet details step of the Perfect Pet quote flow, with a progress bar and questions for pet name, species and breed type
        - src: /images/pet-insurance/flow/02-pet-health-questions.jpg
          alt: Pet health questions, including whether the pet needs cover for any condition, symptom or injury already noticed
        - src: /images/pet-insurance/flow/03-your-details.jpg
          alt: Your details step asking for title, name and date of birth
        - src: /images/pet-insurance/flow/04-your-details-address.jpg
          alt: Email, phone number and a confirmed address card on the your details step
        - src: /images/pet-insurance/flow/05-quotes.jpg
          alt: Quotes step listing policy cards with monthly price, vet fee limit, excess and benefits, above a sticky bar with the chosen total
  - component: ProjectImageCarousel
    props:
      eyebrow: Context — the original review page
      title: Where the review page started
      reverse: true
      body: >-
        This is what customers saw before the redesign. The price sits in a single line at the
        top, and everything after it is paragraphs. The cover type, vet fee limit, waiting periods
        and co-payment are all in running text, and the benefits and excess are behind "click
        here" links. There's nothing on the page to tell a first-time visitor who Perfect Pet
        are. Opening "click here" for the policy explanation brings up a dense block of legal
        copy that assumes you already know what a reinstatement policy is.
      images:
        - src: /images/pet-insurance/original/01-original-cover.jpg
          alt: The original review page, with a one-line quote price above a cover section written as paragraphs, with the benefits and excess behind click here links
        - src: /images/pet-insurance/original/02-original-policy-modal.jpg
          alt: The original Elite Extra Plus details pop-up, a single dense paragraph of policy wording describing reinstatement cover
  - component: ProjectProcessSteps
    props:
      title: Research methodology
      steps:
        - title: Competitor UX audit
          body: >-
            I started by looking at how other pet insurers handle the review step for people coming in from
            aggregators. The better ones end up with fairly similar patterns, and with so little
            time, working out why they'd made those choices was the quickest way to get my
            bearings.
        - title: Heuristic evaluation
          body: >-
            I went through the existing page against Nielsen's ten heuristics. I already had a feeling
            something was off, and this gave me an actual list of what. At the same time I sat
            down with the BA and the developer to work out what MudBlazor would realistically
            let us do, so most of the layout was agreed before I opened Figma.
        - title: Hotjar session analysis
          body: >-
            I watched recordings of people who'd come in from aggregators, looking for where they paused and
            where they gave up. One person spent nearly nine minutes on the page before clicking
            anything, and they weren't idle either. They were highlighting passages of text one
            after another, trying to work out what they were buying.
        - title: Internal usability sessions
          body: >-
            I ran eleven moderated walkthroughs of the prototype, each followed by a semi-structured
            interview that I recorded and coded into themes. People came from claims,
            complaints, finance and renewals, the teams who pick up the pieces when a customer
            has misunderstood what they bought. I'd expected them to be poor stand-ins for real
            customers. I was wrong about that.
  - component: ProjectFindingsGrid
    props:
      title: Findings from the competitor analysis and heuristic evaluation
      items:
        - title: Establishing trust prior to commitment
          body: >-
            On our competitors' sites, Trustpilot ratings, customer numbers and claim stats all sat near the
            top of the page. They spend the first part of the page getting you to trust them,
            and only then ask you to commit to anything.
        - title: Scannable presentation of policy information
          body: >-
            They use tables instead of dense paragraphs, put the detail in the flow instead of a linked PDF,
            and keep the price and the main button on screen the whole way down. You never have
            to leave the page to work out what you're paying for.
        - title: Weak visual hierarchy on the existing page
          body: >-
            The heuristic audit gave me a list to work from. There were four different button styles,
            benefit details hidden behind low-contrast links, mandatory fields that weren't
            marked as mandatory, and a payment step that didn't show it was doing anything after
            you pressed submit. Each one is small. Put together, they all land right when
            someone is deciding whether to carry on.
  - component: ProjectTextImage
    props:
      eyebrow: Primary research — finding 1
      title: Misunderstanding of pre-existing conditions
      body: >-
        All eleven brought up [[pre-existing condition|pre-existing conditions]] without me asking, and
        all of them said it was the main cause of complaints and declined claims. The
        misunderstanding is always the same one. Customers think a pre-existing condition
        means something a vet has formally diagnosed, when it also covers symptoms already
        noted in the pet's history. A lot of disputes start right there, and after hearing
        it eleven times, the project stopped being a visual refresh.
      image: /images/pet-insurance/flow/09-pet-preexisting-help.jpg
      imageAlt: >-
        The question as customers first meet it, on the pet details step. The full definition,
        including undiagnosed symptoms, only appears after opening Help.
  - component: ProjectTextImage
    props:
      eyebrow: Primary research — finding 2
      title: Absence of key decision-making information
      reverse: true
      body: >-
        Nine of the eleven pointed out that the numbers people actually decide on weren't on the page at
        all. The [[excess]] didn't show up until later in the flow, even though ours is one
        of the lowest on the market, and one of the claims handlers called it a selling
        point we were hiding. The age limits, how the [[co-payment]] works in practice, and
        the per-condition vet-fee limit were either missing or explained so vaguely they
        didn't help.
      image: /images/pet-insurance/flow/10-quote-card-selected.jpg
      imageAlt: >-
        A policy card on the live quotes step. The vet fee limit and £90 excess now sit
        together directly under the price.
  - component: ProjectFindingsGrid
    props:
      title: Further findings from the stakeholder sessions
      items:
        - title: Overstated claims in the lifetime cover headline
          body: >-
            One of the claims handlers, a practising vet himself, picked up on the line saying any
            veterinary treatment for illnesses and injuries is covered for the pet's whole life.
            Read at face value, that sounds unconditional. And since pre-existing conditions are
            the most common reason a claim is declined, that one sentence sets up exactly the
            expectation the policy can't always meet.
        - title: The role of trust signals for an unfamiliar brand
          body: >-
            People liked the Trustpilot integration in the sessions, and someone from finance mentioned she
            hadn't heard of Perfect Pet until she started working here, which is probably how
            most first-time aggregator visitors feel too. The people who left for the main site
            to find missing information mostly didn't come back, so the page has to get both the
            trust and the detail right on its own.
  - component: ProjectQuote
    props:
      quote: >-
        A lot of the problems that show up at the claim stage start at the quote stage. The people who
        handle complaints and declined claims kept asking for the same thing: be a bit more
        honest up front about the things they see go wrong most often.
      attribution: Synthesis from eleven internal stakeholder sessions across claims, complaints, finance and renewals
  - component: ProjectPersona
    props:
      eyebrow: Composite persona, based on 11 SME interview sessions
      name: Mia Chen
      role: First-time pet owner, recently adopted a Labrador, arrived from a comparison aggregator
      quote: >-
        "I just want to know if he's covered if something goes wrong. I don't know what half
        of these words mean, and I'm not sure I trust a brand I've never heard of."
      goals:
        - Understand what the policy actually covers without reading a 40-page document
        - Feel confident the brand is legitimate before entering card details, since she's never heard of Perfect Pet
        - Know exactly what she'll be charged each month, with no surprises on the first direct debit
        - Complete the purchase without needing to call anyone or navigate away from the page
      frustrations:
        - Terms like co-payment, excess and pre-existing condition with no plain-English explanation alongside them
        - Arriving on a page that looks visually disconnected from the comparison site she just came from
        - No clear signal that signs and symptoms in her dog's vet history might count as a pre-existing condition, even without a diagnosis
        - Uncertainty about whether the monthly price shown is exactly what will leave her account, or whether it 'may differ slightly'
      context: >-
        Mia is built from what the claims and complaints handlers see every day. As one of them put it,
        people just don't understand it. They assume pre-existing has to be a named condition,
        when a pet can show symptoms for months before anyone knows what's actually wrong.
        Another said cases like this make up a big chunk of the complaints she handles. Careful
        readers get caught out too, because linked and bilateral conditions (ACL surgery on one
        leg, then the other) surprise people who've read the wording closely. Mia finishes the
        flow sure she's covered, and only finds out otherwise when she makes her first claim.
      contextTags:
        - First-time buyer
        - Aggregator entry
        - Brand unfamiliar
        - Pre-existing risk
        - Jargon-averse
  - component: ProjectHowMightWe
    props:
      title: Problem framing through “How might we” statements
      intro: >-
        Three questions came out of the research. All of them are about the gap between what people
        think they've bought and what the policy actually covers.
      items:
        - question: >-
            How might we make the pre-existing exclusion specific enough that customers
            understand it covers symptoms in the vet's history, not only diagnosed
            conditions?
          theme: Transparency
        - question: >-
            How might we put excess, co-payment, and [[benefit limit|benefit limits]] in front of users while
            they are still deciding, rather than after they have filed a claim?
          theme: Clarity
        - question: >-
            How might we build enough trust with someone who has never heard of Perfect Pet
            that they are willing to commit by the end of the page?
          theme: Trust
  - component: ProjectCallout
    props:
      variant: principle
      label: Guiding design principle
      body: >-
        I kept asking myself one question with every layout decision: does this make it easier for
        someone to understand what they're looking at? Visual consistency and matching the brand
        mattered too, but getting the right information in front of people at the right time
        came first.
  - component: ProjectDecisionLog
    props:
      title: Design decisions and rationale
      intro: The decisions that shaped the redesign, what drove them, and what we observed.
      decisions:
        - decision: Pre-existing conditions were given their own page with an explicit tick-box
          rationale: >-
            All eleven brought it up without me asking. A checkbox buried in an assumptions section was
            never going to fix a misunderstanding this big.
          outcome: >-
            Someone from finance put it well: giving it its own page signals that we are not hiding
            it, which he found reassuring. One of the claims handlers noted that it also changes the
            claims conversation, because the customer has declared it from the outset.
          outcomeType: positive
          image: /images/pet-insurance/flow/16-declarations-confirm.jpg
          imageAlt: The confirmation list on the second page. The customer ticks I confirm after reading that pre-existing conditions aren't covered.
        - decision: The excess was moved to the first page
          rationale: >-
            It wasn't on the page at all, which made things less clear and also wasted a selling point,
            since ours is one of the lowest excesses on the market.
          outcome: >-
            It now sits beside the cover details, where customers can read it as one of the policy's
            features.
          outcomeType: positive
          image: /images/pet-insurance/flow/19-decision-excess.jpg
          imageAlt: The £90 excess shown directly under the £4,000 vet fee limit.
        - decision: A qualifier was added to the [[lifetime cover]] headline
          rationale: >-
            As written, the line promises more than the policy can always deliver, and pre-existing
            exclusions are the most common reason a claim gets declined.
          outcome: >-
            Adding a short qualifier such as "subject to your pet's health history" keeps the line
            accurate without changing what it means for most customers. I have raised the wording with
            the copy and compliance teams.
          outcomeType: tradeoff
          image: /images/pet-insurance/flow/20-decision-lifetime.jpg
          imageAlt: How lifetime cover is introduced on the live site today.
        - decision: Interactive components were standardised
          rationale: >-
            The audit found four button styles and three different expansion panels across the flow. That
            much inconsistency makes a page feel thrown together, which is the last thing you
            want on a page that's meant to earn someone's trust.
          outcome: >-
            One token set now covers the buttons, tooltips, modals and toggles. Engineering were happy about
            it too, since it means less to maintain and they were tidying up the components
            anyway.
          outcomeType: positive
          image: /images/pet-insurance/flow/21-decision-components.jpg
          imageAlt: The payment choice uses the same selectable card style as the rest of the flow.
  - component: ProjectImageCarousel
    props:
      eyebrow: Implementation — review page
      title: Prioritising price and trust signals
      reverse: true
      body: >-
        The live page opens with the monthly and annual price, including IPT, directly above
        the Trustpilot rating. As you scroll, both shrink into a sticky bar so the price stays
        on screen. The vet fee limit and the excess sit together at the top of the cover card,
        the co-payment rule is written out in full under the benefits, and the page ends with a
        clear choice between paying monthly or annually.
      images:
        - src: /images/pet-insurance/flow/06-review-price-trust.jpg
          alt: Top of the review page with the monthly price, annual price and IPT note in a dark panel above a Trustpilot rating, followed by the pet's cover card
        - src: /images/pet-insurance/flow/07-review-benefits.jpg
          alt: Policy benefits list with limits, links to the policy wording and IPID, and the co-payment explanation, under a sticky price and Trustpilot bar
        - src: /images/pet-insurance/flow/08-review-payment.jpg
          alt: Review your details summary and a payment choice between monthly direct debit and annual card payment, with Back and Continue to payment buttons
  - component: ProjectImageCarousel
    props:
      eyebrow: Implementation — declarations page
      title: Separating declarations from the review stage
      body: >-
        The assumptions and declarations that used to sit in one long block now open the
        second page. Pre-existing conditions get their own heading, with "signs" defined in
        plain words, and the customer has to tick "I confirm" before paying. The payment
        schedule then shows exactly what leaves their account, and when.
      images:
        - src: /images/pet-insurance/flow/14-declarations-important-info.jpg
          alt: Important information card listing what the customer confirms about their pet before buying
        - src: /images/pet-insurance/flow/15-declarations-preexisting.jpg
          alt: A dedicated pre-existing conditions section defining signs as any change from the pet's normal healthy state, followed by excess and waiting period notes
        - src: /images/pet-insurance/flow/17-payment-schedule.jpg
          alt: Payment schedule showing the first direct debit amount and date, the monthly amount after that, and the total cost
  - component: ProjectTextImage
    props:
      eyebrow: Implementation — lifetime cover
      title: Explaining lifetime cover in context
      body: >-
        "About this policy" now opens a plain-English explanation of lifetime cover: what the
        limit covers, that it refreshes each year, and a worked example using the customer's
        own pet, excess and limit.
      image: /images/pet-insurance/flow/12-lifetime-cover-modal.jpg
      imageAlt: >-
        From the About this policy dialog: what lifetime cover includes, and a claim worked
        through using the chosen £4,000 limit and £90 excess.
  - component: ProjectTextImage
    props:
      eyebrow: Implementation — co-payment
      title: Illustrating the co-payment through a worked example
      reverse: true
      body: >-
        The [[co-payment]] line on the cover card links to a breakdown for the customer's pet:
        the age it starts at, the percentage, and a sample claim taken from claim value to
        what actually gets paid out.
      image: /images/pet-insurance/flow/13-copayment-modal.jpg
      imageAlt: >-
        From the co-payment dialog: a £3,000 example claim with the excess and the 15%
        co-payment taken off, down to what gets paid out.
  - component: ProjectGallery
    props:
      image: /images/pet-insurance/flow/18-review-mobile.jpg
      imageAlt: >-
        The review page on a phone. The price and Trustpilot rating collapse into a sticky
        header, so they stay visible all the way down to the payment choice.
      contain: true
  - component: ProjectLearnings
    props:
      title: Reflection and further work
      points:
        - >-
          The biggest thing I took away is that this was about more than conversion. The review page sets
          up the complaints and declined claims that turn up six months later. Getting it right
          won't show up in a completion rate. It shows up much later, in call volumes and
          cancellations, when nobody's looking at the page any more.
        - >-
          The sessions also left me with a backlog. The pre-existing wording needs to say it covers
          symptoms in the vet's history as well as bilateral conditions, the co-payment needs a
          worked example so people can see how it plays out, and the difference between the
          monthly and annual price needs explaining somewhere people will actually see it.
        - >-
          The redesign is live now, and thousands of pet insurance customers go through it every week
          before they buy.
  - component: MoreProjects
    props:
      title: More projects
      projects:
        - title: Perro Onboarding & Subscription
          blurb: >-
            A shorter, value-first onboarding and subscription redesign that reduced
            drop-offs and lifted conversion, implemented directly in Flutter.
          slug: perro-onboarding
          category: UX / Flutter
        - title: Crafting Counselling Companions
          blurb: >-
            Co-designing a session-planning tool with counsellors, from research through
            prototype, to reduce the admin overhead that gets in the way of client work.
          slug: counselling-companions
          category: UX Research
---