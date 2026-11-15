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
    poster: "/images/heavyEquipment.png",
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
