import { useEffect, useRef, useState } from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { keyframes } from "@mui/system";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import { colors, fonts, sectionPy } from "../theme/tokens";

const atmosphere = "quiet";

const missionLines = [
  { text: "ADVANCING", strong: false },
  { text: "DESIGN AND INNOVATION", strong: true },
  { text: "THROUGH", strong: false },
  { text: "SIMULATION AND ANALYSIS", strong: true },
];

const slideFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(48px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-48px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const BrandStatement = () => {
  const sectionRef = useRef(null);
  const enterTimerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    if (prefersReducedMotion) {
      setVisible(true);
      return undefined;
    }

    const clearEnterTimer = () => {
      if (enterTimerRef.current != null) {
        window.clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset first so a refresh / re-entry can restart CSS animations.
          clearEnterTimer();
          setVisible(false);
          setPlayKey((key) => key + 1);
          // Short delay lets the browser paint the hidden "from" state,
          // including after scroll restoration on refresh.
          enterTimerRef.current = window.setTimeout(() => {
            setVisible(true);
            enterTimerRef.current = null;
          }, 120);
        } else {
          clearEnterTimer();
          setVisible(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => {
      clearEnterTimer();
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        ...getLightAtmosphereSx(atmosphere),
        minHeight: { xs: "auto", md: "42vh" },
        display: "flex",
        alignItems: "center",
        px: { xs: 2, md: 3 },
        py: sectionPy,
      }}
    >
      <AtmosphereGrid variant={atmosphere} />
      <Container key={`brand-content-${playKey}`} maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
            },
            alignItems: "center",
            columnGap: { md: 5, lg: 7 },
            rowGap: { xs: 3, md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              pr: { md: 1 },
            }}
          >
            <Box
              component="img"
              src="/images/simutopiaLogoWithReg.png"
              alt="Simutopia"
              sx={{
                display: "block",
                width: "100%",
                maxWidth: { xs: 360, sm: 400, md: 460 },
                height: "auto",
                ...(prefersReducedMotion
                  ? { opacity: 1 }
                  : visible
                    ? {
                        animation: `${slideFromRight} 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                      }
                    : { opacity: 0, transform: "translateX(48px)" }),
              }}
            />
          </Box>

          <Typography
            id="missionStatement"
            component="p"
            sx={{
              m: 0,
              mx: { xs: "auto", md: 0 },
              width: "100%",
              maxWidth: { xs: 420, md: 440 },
              fontFamily: fonts.sans,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: { xs: "1.15rem", sm: "1.25rem", md: "1.45rem" },
              lineHeight: 1.55,
              letterSpacing: "0.02em",
              color: colors.ink,
              textAlign: "left",
              borderLeft: `3px solid ${colors.accentSoft}`,
              pl: { xs: 2, md: 2.5 },
              py: 0.5,
              justifySelf: { xs: "center", md: "start" },
            }}
          >
            {missionLines.map((line, index) => (
              <Box
                component="span"
                key={line.text}
                sx={{
                  display: "block",
                  fontWeight: line.strong ? 600 : 300,
                  color: line.strong ? colors.ink : colors.body,
                  ...(prefersReducedMotion
                    ? { opacity: 1 }
                    : visible
                      ? {
                          animation: `${slideFromLeft} 1.35s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                          animationDelay: `${700 + index * 220}ms`,
                          opacity: 0,
                        }
                      : { opacity: 0, transform: "translateX(-48px)" }),
                }}
              >
                {line.text}
              </Box>
            ))}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BrandStatement;
