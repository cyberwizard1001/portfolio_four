export const glossary = {
  excess: 'The fixed amount you pay yourself on a claim before the insurer pays the rest.',
  'co-payment': 'A share of each claim you keep paying, often a % on top of the excess.',
  'pre-existing condition':
    "Any illness or symptom your pet showed before cover started — even if no vet named it yet.",
  'lifetime cover': 'Cover that renews each year for ongoing conditions, as long as you keep the policy.',
  'benefit limit': 'The most the policy pays out — per condition, per year, or in total.',
  fca: 'Financial Conduct Authority — the UK regulator for insurance.',
  'waiting period': 'The first days of a new policy when certain claims are not covered, usually 5 days for accidents and 14 for illness.',
  'demands and needs':
    'Questions an insurer must ask to check the policy it recommends suits what the customer actually needs.',
  'design token': 'A named design decision, such as a colour or spacing value, stored once and shared between design and code.',
} as const;

export type GlossaryTerm = keyof typeof glossary;
