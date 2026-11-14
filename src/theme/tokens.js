/** Shared public-site visual tokens — keep Home / About / Contact in sync. */

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

export const sectionTitleSx = {
  fontSize: { xs: "1.75rem", md: "2.5rem" },
  fontWeight: 300,
  color: colors.ink,
  textAlign: "center",
};

export const sectionIntroSx = {
  fontSize: { xs: "1.02rem", md: "1.1rem" },
  lineHeight: 1.6,
  textAlign: "center",
  maxWidth: 620,
  mx: "auto",
  color: colors.muted,
};

export default colors;
