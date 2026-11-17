import { useEffect, useState } from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import testimonials from "../data/testimonials";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import {
  bodyTextSx,
  colors,
  fonts,
  mutedTextSx,
  sectionPy,
  sectionTitleMb,
  sectionTitleSx,
} from "../theme/tokens";

const atmosphere = "blueWash";
const accentFontFamily = fonts.accent;

const INTERVAL_MS = 5500;

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (paused || prefersReducedMotion || testimonials.length < 2) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  return (
    <Box
      component="section"
      aria-roledescription="carousel"
      aria-label="What Clients Say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{
        ...getLightAtmosphereSx(atmosphere),
        py: sectionPy,
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <AtmosphereGrid variant={atmosphere} />
      <Container maxWidth="md" sx={{ position: "relative" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            ...sectionTitleSx,
            mb: sectionTitleMb,
          }}
        >
          What Clients Say
        </Typography>

        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 176, md: 156 },
          }}
        >
          {testimonials.map((item, itemIndex) => {
            const isActive = itemIndex === index;
            return (
              <Box
                key={item.id}
                aria-hidden={!isActive}
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  px: { xs: 0.5, md: 2 },
                  opacity: isActive ? 1 : 0,
                  transition: prefersReducedMotion
                    ? "none"
                    : "opacity 500ms ease",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <Typography
                  aria-hidden="true"
                  sx={{
                    fontFamily: accentFontFamily,
                    fontSize: "2.25rem",
                    lineHeight: 0.75,
                    color: colors.accentSoft,
                    userSelect: "none",
                    mb: 1,
                  }}
                >
                  “
                </Typography>
                <Typography
                  component="blockquote"
                  sx={{
                    ...bodyTextSx,
                    m: 0,
                    maxWidth: 640,
                    fontSize: { xs: "1.05rem", md: "1.12rem" },
                    fontWeight: 300,
                    color: colors.ink,
                  }}
                >
                  {item.quote}
                </Typography>
                <Box sx={{ mt: 2.25 }}>
                  <Typography
                    sx={{
                      ...bodyTextSx,
                      fontWeight: 700,
                      color: colors.ink,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      ...mutedTextSx,
                      lineHeight: 1.4,
                      mt: 0.35,
                    }}
                  >
                    {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {testimonials.length > 1 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mt: { xs: 3, md: 3.5 },
            }}
          >
            {testimonials.map((item, itemIndex) => (
              <Box
                key={item.id}
                component="button"
                type="button"
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={itemIndex === index ? "true" : undefined}
                onClick={() => setIndex(itemIndex)}
                sx={{
                  width: itemIndex === index ? 22 : 8,
                  height: 8,
                  border: 0,
                  borderRadius: 999,
                  p: 0,
                  cursor: "pointer",
                  bgcolor: itemIndex === index ? colors.accentSoft : "#c5c9cd",
                  transition: prefersReducedMotion
                    ? "none"
                    : "width 200ms ease, background-color 200ms ease",
                }}
              />
            ))}
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
