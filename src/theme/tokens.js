/** Shared public-site visual tokens — keep Home / About / Contact / What We Do in sync. */

export const fonts = {
  sans: '"IBM Plex Sans", "Segoe UI", sans-serif',
  accent: '"Audiowide", "IBM Plex Sans", sans-serif',
};

export const colors = {
  white: "#ffffff",
  ink: "#2b2e32",
  body: "#4a4e53",
  muted: "#6a6e73",
  soft: "#7a7e83",
  border: "#eceeef",
  borderStrong: "#d5d8db",
  borderCard: "#d0d3d6",
  dark: "#212529",
  darkMid: "#2f3338",
  darkSoft: "#3a3e43",
  accent: "#5FA84A",
  accentSoft: "#8fc98c",
  accentMuted: "#c9d6c8",
  accentBlue: "#2E6F96",
  accentBlueSoft: "#6ea8fe",
  logoBlue: "#2E6F96",
  /** Exact SIMUTOPIA wordmark blue from the primary logo */
  logoWordmark: "#1C5E8B",
  logoRed: "#D94B42",
  logoYellow: "#D4A01E",
  logoGreen: "#5FA84A",
};

/** Vertical padding for light content sections */
export const sectionPy = { xs: 4, md: 5 };

/** Space below in-section display titles (Why Simulate, Partners, …) */
export const sectionTitleMb = { xs: 2.5, md: 3 };

/** Space below centered intro lines under a title */
export const sectionIntroMb = { xs: 2.25, md: 2.75 };

/** Page-level uppercase titles (Who We Are, Services, Contact, …) */
export const pageTitleSx = {
  fontFamily: fonts.sans,
  fontSize: { xs: "1.15rem", md: "1.35rem" },
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  textAlign: "center",
  color: colors.ink,
  mb: { xs: 1.25, md: 1.5 },
};

/** In-page section display titles */
export const sectionTitleSx = {
  fontFamily: fonts.sans,
  fontSize: { xs: "1.75rem", md: "2.5rem" },
  fontWeight: 300,
  color: colors.ink,
  textAlign: "center",
};

/** Centered supporting intro under a title */
export const sectionIntroSx = {
  fontFamily: fonts.sans,
  fontSize: { xs: "1.02rem", md: "1.1rem" },
  lineHeight: 1.6,
  textAlign: "center",
  maxWidth: 620,
  mx: "auto",
  color: colors.body,
};

/** Default body / bullet copy */
export const bodyTextSx = {
  fontFamily: fonts.sans,
  fontSize: { xs: "0.95rem", md: "0.98rem" },
  lineHeight: 1.55,
  color: colors.body,
};

/** Subsection headings inside a page (Areas of Expertise, Industries, …) */
export const subsectionHeadingSx = {
  fontFamily: fonts.sans,
  fontSize: { xs: "1.35rem", md: "1.5rem" },
  fontWeight: 700,
  color: colors.ink,
  mb: { xs: 2.25, md: 2.75 },
  pb: 1,
  borderBottom: `1px solid ${colors.borderStrong}`,
};

/** Card / list item titles under a subsection (Services groups, Case Studies, …) */
export const contentItemTitleSx = {
  fontFamily: fonts.sans,
  fontSize: { xs: "1.05rem", md: "1.12rem" },
  fontWeight: 650,
  color: colors.ink,
  lineHeight: 1.4,
  mb: 0.65,
};

/** Secondary / placeholder lines */
export const mutedTextSx = {
  ...bodyTextSx,
  color: colors.muted,
};

/** Gap between stacked content groups */
export const contentStackGap = { xs: 2.5, md: 3 };

/** Anchor offset under sticky header */
export const stickyScrollMargin = { xs: 72, md: 80 };

/** Same cycle as QCOLT / logo mark: blue → red → yellow → green */
export const logoAccentCycle = [
  colors.logoBlue,
  colors.logoRed,
  colors.logoYellow,
  colors.logoGreen,
];

/** Small uppercase labels (Mission, Goal, step numbers, …) */
export const eyebrowSx = {
  fontFamily: fonts.sans,
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: colors.muted,
};

/** Core value / mid-weight card titles */
export const valueTitleSx = {
  fontFamily: fonts.sans,
  fontSize: { xs: "1.25rem", md: "1.4rem" },
  fontWeight: 700,
  lineHeight: 1.25,
  color: colors.ink,
};

/** Leadership / profile names */
export const profileNameSx = {
  fontFamily: fonts.sans,
  fontSize: { xs: "1.45rem", md: "1.7rem" },
  fontWeight: 600,
  color: colors.ink,
};

/** Shared CTA button type */
export const buttonLabelSx = {
  fontFamily: fonts.sans,
  fontSize: "0.9rem",
  textTransform: "none",
};

export default colors;
