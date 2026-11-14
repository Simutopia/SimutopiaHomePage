import { colors } from "../theme/tokens";

/** Softened logo S colors for on-white text. Q and T share blue. */
const coreValues = [
  {
    letter: "Q",
    color: colors.logoBlue,
    title: "Quality",
    mantra: "Quality is Non-Negotiable",
    points: [
      'Excellence is our baseline — we reject "good enough."',
      "We build with precision, polish, and pride.",
    ],
  },
  {
    letter: "C",
    color: colors.logoRed,
    title: "Customer",
    mantra: "Customers are our Compass",
    points: [
      "Customer success drives every decision we make.",
      "We listen closely, partner honestly, and solve problems with speed and focus.",
    ],
  },
  {
    letter: "O",
    color: colors.logoYellow,
    title: "Ownership",
    mantra: "Success is Everyone's Business",
    points: [
      "We think and act like leaders, regardless of title.",
      "We follow through on commitments and own the impact of our work.",
    ],
  },
  {
    letter: "L",
    color: colors.logoGreen,
    title: "Learn",
    mantra: "Continuous Learning",
    points: [
      "We treat every challenge as a chance to grow.",
      "We own mistakes, seek honest feedback, and share what we learn.",
    ],
  },
  {
    letter: "T",
    color: colors.logoBlue,
    title: "Team",
    mantra: "One Team, One Culture",
    points: [
      "Shared success comes before individual credit.",
      "We build a safe, inclusive space where everyone can speak up, lead, and grow.",
    ],
  },
];

export default coreValues;
