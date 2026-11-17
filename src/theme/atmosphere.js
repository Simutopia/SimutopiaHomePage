import { Box } from "@mui/material";
import { colors } from "./tokens";

/**
 * Light-section atmosphere variants.
 * Same palette, different balance / corner placement so stacked sections don't feel identical.
 */
const presets = {
  /** Green top-left, blue bottom-right — default engineering calm */
  mist: {
    green: { x: "8%", y: "0%", opacity: 0.07 },
    blue: { x: "96%", y: "100%", opacity: 0.05 },
    gridOpacity: 0.38,
  },
  /** Flipped corners */
  mistFlip: {
    green: { x: "94%", y: "0%", opacity: 0.065 },
    blue: { x: "6%", y: "100%", opacity: 0.055 },
    gridOpacity: 0.34,
  },
  /** Greener / warmer emphasis */
  greenWash: {
    green: { x: "50%", y: "-10%", opacity: 0.09 },
    blue: { x: "100%", y: "80%", opacity: 0.035 },
    gridOpacity: 0.3,
  },
  /** Cooler / blue emphasis */
  blueWash: {
    green: { x: "0%", y: "70%", opacity: 0.04 },
    blue: { x: "70%", y: "0%", opacity: 0.08 },
    gridOpacity: 0.36,
  },
  /** Soft dual side wash — good for denser content */
  dual: {
    green: { x: "0%", y: "40%", opacity: 0.06 },
    blue: { x: "100%", y: "40%", opacity: 0.06 },
    gridOpacity: 0.32,
  },
  /** Very quiet — leadership / long text */
  quiet: {
    green: { x: "20%", y: "100%", opacity: 0.045 },
    blue: { x: "85%", y: "0%", opacity: 0.04 },
    gridOpacity: 0.22,
  },
};

const buildBackground = ({ green, blue }) => `
  radial-gradient(ellipse 75% 55% at ${green.x} ${green.y}, rgba(95, 168, 74, ${green.opacity}), transparent 58%),
  radial-gradient(ellipse 65% 50% at ${blue.x} ${blue.y}, rgba(46, 111, 150, ${blue.opacity}), transparent 55%),
  ${colors.white}
`;

export const getLightAtmosphereSx = (variant = "mist") => {
  const preset = presets[variant] || presets.mist;
  return {
    position: "relative",
    overflow: "hidden",
    color: colors.ink,
    background: buildBackground(preset),
  };
};

/** @deprecated Prefer getLightAtmosphereSx(variant) for variation */
export const lightAtmosphereSx = getLightAtmosphereSx("mist");

export const AtmosphereGrid = ({ variant = "mist" }) => {
  const preset = presets[variant] || presets.mist;
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        opacity: preset.gridOpacity,
        backgroundImage:
          "linear-gradient(rgba(43,46,50,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(43,46,50,0.03) 1px, transparent 1px)",
        backgroundSize: variant === "quiet" ? "56px 56px" : "48px 48px",
        maskImage:
          variant === "dual"
            ? "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)"
            : "radial-gradient(ellipse 70% 60% at 50% 40%, #000 15%, transparent 75%)",
        pointerEvents: "none",
      }}
    />
  );
};
