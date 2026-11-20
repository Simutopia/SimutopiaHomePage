/**
 * Case study registry. Keywords must match Services section titles
 * (Areas of Expertise / Industries) for cross-links on /services.
 *
 * Description.docx template (keep consistent):
 * - Intro (one line)
 * - Goals / Approach / Outcomes
 * - Related Services (industry + areas of expertise; must match Services section titles)
 * - Closing statement (cta) — per case study; copy from the description’s last line.
 *   Site always renders a "Talk to us" button immediately before this text.
 *
 * Note: "App Development" in docs maps to Services section "Apps Development".
 */
const SERVICE_KEYWORD_ALIASES = {
  "app development": "Apps Development",
};

const normalizeServiceKeyword = (keyword) => {
  const trimmed = String(keyword).trim();
  const alias = SERVICE_KEYWORD_ALIASES[trimmed.toLowerCase()];
  return alias || trimmed;
};

/** Stable URL hash id for a Services section title (expertise or industry). */
export const toServiceSectionId = (keyword) =>
  normalizeServiceKeyword(keyword)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getServicePath = (keyword) =>
  `/services#${toServiceSectionId(keyword)}`;

const caseStudies = [
  {
    slug: "excavator-system-design",
    title: "Excavator System Design",
    shortTitle: "Excavator",
    summary:
      "A system-level digital twin of an excavator used to size hydraulics and linkages, capture realistic soil loads, and develop control software before the first prototype.",
    keywords: [
      "Heavy Equipment",
      "Digital Twin Modeling",
      "Control Systems Modeling",
      "Apps Development",
    ],
    video: "/casestudies/excavator-system-design/excavator-system-design.mp4",
    poster: "/images/excavator-poster.jpg",
    goals: [
      "Develop an excavator system model that can be used to perform design studies.",
      "Determine pin locations for the kinematic linkages to achieve the desired working envelope.",
      "Select hydraulic actuators, pumps, valve manifolds and other components to achieve the desired machine performance requirements.",
      "Use dynamic loads to perform structural integrity analysis for load bearing structural elements.",
      "Design and deploy advanced control algorithms for pump and valve control to achieve the desired machine performance.",
      "Optimize energy consumption.",
    ],
    approach: [
      "Developed excavator system dynamics model comprising of the mechanical and hydraulic subsystems in Simscape™.",
      "Developed a cosimulation framework between Simulink® and ThreeParticle/CAE™ (DEM software) to calculate realistic dynamic soil loads experienced by the machine.",
      "Developed advanced control algorithms to control the pumps and hydraulic valves to optimize energy consumption while simultaneously achieving the desired machine performance.",
      "Deployed the control algorithms on the PLC hardware using automatic code generation tools.",
      "Performed several automated tests to validate that the controller model and deployed code behave in the same manner.",
      "Developed user-friendly apps to perform individual design studies that leverage the powerful Simulink® models in the backend.",
    ],
    outcomes: [
      "Demonstrated that the selected components including hydraulic actuators and pumps are able to achieve the desired performance directly on the first physical prototype machine.",
      "Rapidly deployed the controller software and tested it on the prototype machine.",
      "The project provided an excellent simulation framework for future product development using model-based design.",
    ],
    cta: "Learn how we can help you reduce time to market using digital twins of your machines to perform design analysis and control software development.",
  },
  {
    slug: "human-flow-simulations",
    title: "Human Flow Simulations",
    shortTitle: "Human Flow",
    summary:
      "Human flow simulation for a large entertainment center to inform 3D spatial design before construction.",
    keywords: [
      "Urban Mobility Simulations",
      "Themed Entertainment",
      "Control Systems Modeling",
    ],
    video: "/casestudies/human-flow-simulations/human-flow-simulations.mp4",
    poster: "/images/human-flow-poster.jpg",
    goals: [
      "Simulate guest movement through the venue under normal and peak conditions.",
      "Compare layout options for guest experience, operational efficiency, and safety.",
      "Identify where guest-management strategies and sensing tools should be built in before construction.",
    ],
    approach: [
      "Developed a detailed 3D spatial model of the entertainment center in Oasys MassMotion.",
      "Leveraged the “BIM Import” functionality to import a model of the system true to scale.",
      {
        text: "Developed advanced control algorithms for smart guest flow management including:",
        children: [
          "Dynamic dispatching",
          "Flow diversion",
          "Unidirectional routing",
          "Metering & holding",
        ],
      },
      "Performed “what if” studies using Monte Carlo simulation approach with a vast range of operating conditions and guest behavioral metrics.",
      "Created scripts in MATLAB® to import the results easily from large numbers of simulations and create plots that help with analyzing the results.",
    ],
    outcomes: [
      "Tested several potential layouts within the simulation environment without having to build physical mockups of all these configurations in a large test facility.",
      "Enabled the Client to determine the layout that provides the best guest experience while ensuring all requirements are met towards operational safety.",
      "Determined comfortable guest capacity for this layout.",
      "Simulated safety scenarios including fire egress and emergency evacuation.",
      "Identified critical areas to implement guest management strategies and build in the necessary tools (cameras, people counters, etc.) ahead of time before commencement of the physical construction.",
    ],
    cta: "Learn how we can help you design safer, smarter, and more efficient spaces through human flow simulation studies.",
  },
];

export const getCaseStudyBySlug = (slug) =>
  caseStudies.find((study) => study.slug === slug);

/** Case studies tagged with a Services section title (industry or expertise). */
export const getCaseStudiesForKeyword = (keyword) => {
  const target = normalizeServiceKeyword(keyword).toLowerCase();
  return caseStudies.filter((study) =>
    study.keywords.some(
      (entry) => normalizeServiceKeyword(entry).toLowerCase() === target
    )
  );
};

export default caseStudies;
