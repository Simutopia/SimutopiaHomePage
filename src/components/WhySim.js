import { useEffect, useRef, useState } from "react";
import {
  Groups,
  Search,
  CompareArrows,
  KeyboardDoubleArrowDown,
  Speed,
} from "@mui/icons-material";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import {
  bodyTextSx,
  colors,
  contentItemTitleSx,
  eyebrowSx,
  sectionIntroMb,
  sectionIntroSx,
  sectionPy,
  sectionTitleSx,
} from "../theme/tokens";

const atmosphere = "greenWash";

const benefits = [
  {
    icon: Search,
    title: "Find risks early",
    text: "Identify system level risks early in design",
  },
  {
    icon: CompareArrows,
    title: "Trace requirements",
    text: "Increase traceability of the design requirements",
  },
  {
    icon: KeyboardDoubleArrowDown,
    title: "Reduce prototypes",
    text: "Minimize physical prototyping and field testing",
  },
  {
    icon: Groups,
    title: "Collaborate better",
    text: "Give teams a shared system view across disciplines",
  },
  {
    icon: Speed,
    title: "Maximize runtime",
    text: "Predict maintenance needs and maximize product runtime",
  },
];

const WhySim = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    if (prefersReducedMotion) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        ...getLightAtmosphereSx(atmosphere),
        py: sectionPy,
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <AtmosphereGrid variant={atmosphere} />
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          sx={{
            maxWidth: 820,
            mx: "auto",
            textAlign: "center",
            mb: sectionIntroMb,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: prefersReducedMotion
              ? "none"
              : "opacity 700ms ease, transform 700ms ease",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              ...sectionTitleSx,
              mb: { xs: 1, md: 1.15 },
            }}
          >
            Why Simulate?
          </Typography>
          <Typography
            sx={{
              ...sectionIntroSx,
              maxWidth: 520,
            }}
          >
            Understand the{" "}
            <Box
              component="span"
              sx={{
                position: "relative",
                fontWeight: 600,
                color: colors.ink,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -2,
                  height: 3,
                  borderRadius: 999,
                  background: colors.accentSoft,
                  transform: visible ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left center",
                  transition: prefersReducedMotion
                    ? "none"
                    : "transform 700ms ease 350ms",
                },
              }}
            >
              dynamic behavior
            </Box>{" "}
            of the system
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(5, minmax(0, 1fr))",
            },
            gap: { xs: 2, md: 0 },
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 28,
              left: "10%",
              right: "10%",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${colors.accentMuted}, transparent)`,
              transform: visible ? "scaleX(1)" : "scaleX(0.2)",
              transformOrigin: "center",
              transition: prefersReducedMotion
                ? "none"
                : "transform 900ms ease 200ms",
              zIndex: 0,
            }}
          />

          {benefits.map(({ icon: Icon, title, text }, index) => (
            <Box
              key={title}
              sx={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                height: "100%",
                px: { md: 1.5 },
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: prefersReducedMotion
                  ? "none"
                  : `opacity 650ms ease ${180 + index * 120}ms, transform 650ms ease ${180 + index * 120}ms`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: { xs: 1.5, md: 1.15 },
                  textAlign: { xs: "left", md: "center" },
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: colors.accentSoft,
                    color: colors.ink,
                    fontSize: 26,
                    boxShadow: "0 0 0 8px rgba(143,201,140,0.16)",
                    animation: prefersReducedMotion
                      ? "none"
                      : visible
                        ? `whySimPulse 2.8s ease ${index * 0.35}s infinite`
                        : "none",
                    "@keyframes whySimPulse": {
                      "0%, 100%": {
                        boxShadow: "0 0 0 8px rgba(143,201,140,0.16)",
                      },
                      "50%": {
                        boxShadow: "0 0 0 14px rgba(143,201,140,0.05)",
                      },
                    },
                  }}
                >
                  <Icon fontSize="inherit" />
                </Box>
                <Box sx={{ flex: 1, width: "100%" }}>
                  <Typography
                    component="p"
                    sx={{
                      ...eyebrowSx,
                      color: colors.soft,
                      mb: 0.3,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Typography
                    component="h3"
                    sx={{
                      ...contentItemTitleSx,
                      fontWeight: 700,
                      mb: 0.35,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography sx={bodyTextSx}>{text}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WhySim;
