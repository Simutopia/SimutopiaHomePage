import { useEffect, useRef, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { fonts } from "../theme/tokens";

const IMG_W = 1561;
const IMG_H = 711;

const pct = (xPct, yPct) => ({
  x: (xPct / 100) * IMG_W,
  y: (yPct / 100) * IMG_H,
});

/**
 * Motion paths traced from the colored verification arches on the source diagram.
 */
const iterationLinks = [
  {
    id: "functional-system",
    color: "#70AD47",
    d: "M 460 128 C 556 93, 652 72, 748 72 S 940 93, 1044 134",
  },
  {
    id: "highlevel-integration",
    color: "#E6A800",
    d: "M 590 263 C 646 239, 702 228, 758 225 S 870 241, 926 262",
  },
  {
    id: "detailed-unit",
    color: "#C00000",
    d: "M 700 392 C 724 387, 740 383, 756 381 S 788 387, 804 394",
  },
];

/**
 * Points along the thick blue V: enter from top-left, through each step,
 * then exit past Acceptance at the right arrow tip.
 */
const vLinePoints = [
  pct(5.5, 6.5), // enter V from the left
  pct(13.85, 8.35), // Requirements Analysis
  pct(22.35, 27.55), // Functional Specification
  pct(31.05, 45.3), // High Level Design
  pct(39.35, 63.95), // Detailed Design
  pct(47.75, 87.25), // Build Prototype & Deploy Software
  pct(58.85, 63.95), // Unit Testing
  pct(66.75, 45.3), // Integration Testing
  pct(76.05, 27.55), // System Testing
  pct(83.35, 8.2), // Acceptance Testing
  pct(95.5, 7.5), // exit V to the right arrow tip
];

const vLinePathD = vLinePoints
  .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
  .join(" ");

const TRAVEL_MS = 7800;
const GAP_MS = 500;
const BLUE = "#2E75B6";

const MovingDot = ({ pathId, color, reduceMotion }) => {
  if (reduceMotion) {
    return (
      <circle r={12} fill={color} opacity="0.95">
        <animateMotion dur="0.01s" fill="freeze" keyPoints="0.5" keyTimes="0" calcMode="linear">
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    );
  }

  return (
    <circle r={12} fill={color} stroke="#ffffff" strokeWidth="2.5" opacity="0.98">
      <animateMotion
        dur="2.8s"
        repeatCount="indefinite"
        keyPoints="0;1;0"
        keyTimes="0;0.5;1"
        calcMode="linear"
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
};

const VDiagram = () => {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pathRef = useRef(null);
  const [bluePos, setBluePos] = useState(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setBluePos(vLinePoints[0]);
      return undefined;
    }

    const path = pathRef.current;
    if (!path) return undefined;

    const length = path.getTotalLength();
    let start = performance.now();
    let frameId = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const cycle = TRAVEL_MS + GAP_MS;
      const t = elapsed % cycle;

      if (t <= TRAVEL_MS) {
        const distance = (t / TRAVEL_MS) * length;
        const point = path.getPointAtLength(distance);
        setBluePos({ x: point.x, y: point.y });
      } else {
        // Finished the path: hide, then the next cycle reappears at the start.
        setBluePos(null);
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [prefersReducedMotion]);

  return (
    <Box
      component="figure"
      aria-label="V product development framework diagram with iterative verification links"
      sx={{
        m: 0,
        width: "100%",
        maxWidth: 980,
        mx: "auto",
        p: { xs: 1, md: 1.5 },
        bgcolor: "common.white",
        border: "1px solid #d0d3d6",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          lineHeight: 0,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="/images/v-framework-diagram.png"
          alt="V product development framework: requirements analysis through detailed design on the left, build and deploy at the base, and unit through acceptance testing on the right"
          sx={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />

        <Box
          component="svg"
          viewBox={`0 0 ${IMG_W} ${IMG_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            {iterationLinks.map((link) => (
              <path key={link.id} id={link.id} d={link.d} fill="none" />
            ))}
          </defs>

          {/* Hidden path used for blue-dot distance sampling */}
          <path
            ref={pathRef}
            d={vLinePathD}
            fill="none"
            stroke="transparent"
            strokeWidth="1"
          />

          {iterationLinks.map((link) => (
            <MovingDot
              key={link.id}
              pathId={link.id}
              color={link.color}
              reduceMotion={prefersReducedMotion}
            />
          ))}

          {bluePos ? (
            <circle
              cx={bluePos.x}
              cy={bluePos.y}
              r={13}
              fill={BLUE}
              stroke="#ffffff"
              strokeWidth="2.5"
              opacity="0.98"
            />
          ) : null}
        </Box>
      </Box>

      <Box
        component="ul"
        sx={{
          mt: 1.5,
          mb: 0,
          px: 0.5,
          pl: 0,
          maxWidth: 640,
          mx: "auto",
          listStyle: "none",
        }}
      >
        <Box
          component="li"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.25,
            mb: 1,
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              width: 10,
              height: 10,
              mt: "0.35rem",
              flexShrink: 0,
              borderRadius: "50%",
              bgcolor: BLUE,
            }}
          />
          <Typography
            sx={{
              fontFamily: fonts.sans,
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "#5e6063",
              lineHeight: 1.45,
            }}
          >
            Go down the steps on left and come back up on the right
          </Typography>
        </Box>
        <Box
          component="li"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.25,
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              position: "relative",
              width: 14,
              height: 14,
              mt: "0.2rem",
              flexShrink: 0,
              borderRadius: "50%",
              bgcolor: "#70AD47",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box
              sx={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                bgcolor: "#E6A800",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 4.5,
                  height: 4.5,
                  borderRadius: "50%",
                  bgcolor: "#C00000",
                }}
              />
            </Box>
          </Box>
          <Typography
            sx={{
              fontFamily: fonts.sans,
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "#5e6063",
              lineHeight: 1.45,
            }}
          >
            Iterate: Leverage models to design on the left and verify on the right at every stage
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VDiagram;
