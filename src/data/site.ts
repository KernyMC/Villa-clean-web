export const contact = {
  phone: "+1 (512) 745-7488",
  phoneHref: "tel:+15127457488",
};

export const trustItems = [
  { icon: "/assets/guarantee-icon.webp", label: "Background-checked" },
  { icon: "/assets/same-team-icon.webp", label: "Same team every visit" },
  { icon: "/assets/satisfaction-icon.webp", label: "Satisfaction guaranteed" },
];

export const services = [
  {
    title: "Recurring Care",
    body: "Weekly, bi-weekly, or monthly visits from the same two-person team. We learn your home's rhythms and maintain it quietly in the background of your life.",
    image: "/assets/services/recurring-care.avif",
  },
  {
    title: "Deep Clean",
    body: "A comprehensive reset for every room: baseboards, interior glass, grout, and appliance interiors. The standard every recurring visit is measured against.",
    image: "/assets/services/deep-clean.avif",
  },
  {
    title: "Move-In / Move-Out",
    body: "An empty home, cleaned to a standard fit for the next chapter. Cabinets, closets, and every surface a new owner or tenant notices first.",
    image: "/assets/services/movein-moveout.avif",
  },
  {
    title: "Post-Construction",
    body: "Fine dust removal after a renovation or build. Window tracks, light fixtures, and HVAC vents, addressed before furniture returns.",
    image: "/assets/services/post-construction.avif",
  },
];

export const steps = [
  {
    num: "01",
    title: "Tell us about your home",
    body: "A few details online or by phone: square footage, layout, and priorities.",
  },
  {
    num: "02",
    title: "We schedule a walkthrough",
    body: "A member of your care team visits, assesses the home, and confirms your quote.",
  },
  {
    num: "03",
    title: "Your team takes it from there",
    body: "The same two people, every visit, with a key or entry protocol you control.",
  },
];

export const checklist = [
  {
    title: "Kitchen",
    image: "/assets/checklist/kitchen.avif",
    items: [
      "Countertops and backsplash wiped and disinfected",
      "Sink and fixtures polished",
      "Exterior of appliances cleaned",
      "Interior of microwave cleaned",
      "Cabinet fronts wiped",
      "Floors vacuumed and mopped",
      "Trash emptied, liners replaced",
    ],
  },
  {
    title: "Bathrooms",
    image: "/assets/checklist/bathrooms.avif",
    items: [
      "Tub, shower, and glass cleaned",
      "Toilets cleaned and disinfected",
      "Vanity and mirrors polished",
      "Grout spot-treated",
      "Floors vacuumed and mopped",
      "Fresh towels arranged, on request",
    ],
  },
  {
    title: "Bedrooms",
    image: "/assets/checklist/bedroom.avif",
    items: [
      "Dusting of all surfaces and décor",
      "Beds made, linens straightened",
      "Floors vacuumed",
      "Mirrors and glass polished",
      "Trash emptied",
    ],
  },
  {
    title: "Living Spaces",
    image: "/assets/checklist/living-spaces.avif",
    items: [
      "Furniture dusted, surfaces cleared",
      "Upholstery vacuumed",
      "Baseboards and door frames wiped",
      "Hard floors cleaned",
      "Windows spot-cleaned from inside",
    ],
  },
];

export const beforeAfterLabels = ["Kitchen", "Primary Bathroom", "Sink", "Laundry"];

export const beforeAfterFallbackPairs = [
  {
    label: "Kitchen",
    beforeUrl: "/assets/before-after/kitchen-before.avif",
    afterUrl: "/assets/before-after/kitchen-after.avif",
  },
  {
    label: "Primary Bathroom",
    beforeUrl: "/assets/before-after/bathroom-before.avif",
    afterUrl: "/assets/before-after/bathroom-after.avif",
  },
  {
    label: "Sink",
    beforeUrl: "/assets/before-after/sink-before.avif",
    afterUrl: "/assets/before-after/sink-after.avif",
  },
  {
    label: "Laundry",
    beforeUrl: "/assets/before-after/laundry-before.avif",
    afterUrl: "/assets/before-after/laundry-after.avif",
  },
];

export const testimonials = [
  {
    quote:
      "They've been in our home every other week for two years, and I've never once had to think about it.",
    name: "Sarah M., Tarrytown",
  },
  {
    quote:
      "The first deep clean found things our old service missed for months. I finally trust what is behind the cabinet doors.",
    name: "Elizabeth R., West Lake Hills",
  },
  {
    quote:
      "Same two women every time. They know our house better than the last three cleaners combined.",
    name: "Caroline T., Barton Creek",
  },
];

export const areas = [
  { name: "West Lake Hills (78746)", href: "#" },
  { name: "Tarrytown (78703)", href: "#" },
  { name: "Barton Creek (78735)", href: "#" },
];

export const faqItems = [
  {
    question: "How much does house cleaning cost in West Lake Hills?",
    answer:
      "Most homes in West Lake Hills run 3,500 to 6,000 square feet. At our recurring bi-weekly rate, that typically prices between $360 and $580 per visit, with the first visit, a full deep clean, quoted separately. Send us your home's details below for an estimate specific to your home.",
  },
  {
    question: "Do I need to be home?",
    answer:
      "No. Most clients are away during their visit. We are insured, background-checked, and work from a key or code protocol you set.",
  },
  {
    question: "Is the team background-checked?",
    answer:
      "Every member of your care team passes a background check before entering a client home, and the same two people are assigned to your account.",
  },
  {
    question: "What products do you use?",
    answer:
      "We use professional-grade, low-VOC products suited to natural stone, hardwood, and high-end finishes. Tell us about any allergies or preferences and we will adjust.",
  },
  {
    question: "Can I change my schedule?",
    answer: "Yes. Move, skip, or add a visit with 48 hours' notice through your account.",
  },
  {
    question: "What if something is missed?",
    answer: "We return within 24 hours at no charge. See our guarantee above.",
  },
];

export const frequencyOptions = [
  { value: "weekly", label: "Weekly", multiplier: 0.8 },
  { value: "biweekly", label: "Bi-weekly", multiplier: 0.88 },
  { value: "monthly", label: "Monthly", multiplier: 1.0 },
  { value: "onetime", label: "One-time", multiplier: 1.35 },
];
