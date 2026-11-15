import { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useMediaQuery } from "@mui/material";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Link as RouterLink } from "react-router-dom";
import { buttonLabelSx, colors, fonts } from "../theme/tokens";

const slides = [
  {
    title: "Heavy Equipment",
    subtitle: "System-level machine models, powertrain, and controls",
    image: "/images/heavyEquipment.png",
  },
  {
    title: "Themed Entertainment",
    subtitle: "Ride systems, animatronics, and guest-flow analysis",
    image: "/images/entertainment.png",
  },
  {
    title: "Industrial Automation",
    subtitle: "Multi-domain machines, optimization, and predictive AI",
    image: "/images/industrialAutomation.png",
  },
  {
    title: "Hydrogen",
    subtitle: "Electrolyzers, fuel cells, and refueling station models",
    image: "/images/simutopia-engineering-background.png",
  },
];

const INTERVAL_MS = 4500;

const UseCaseCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (paused || prefersReducedMotion) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, prefersReducedMotion]);

  const active = slides[index];

  return (
    <Box
      component="section"
      aria-roledescription="carousel"
      aria-label="Use-case highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{
        position: "relative",
        height: { xs: "56vh", md: "72vh" },
        minHeight: 320,
        maxHeight: 720,
        overflow: "hidden",
        bgcolor: colors.dark,
        color: "common.white",
      }}
    >
      {slides.map((slide, slideIndex) => (
        <Box
          key={slide.title}
          aria-hidden={slideIndex !== index}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: slideIndex === index ? 1 : 0,
            transition: prefersReducedMotion ? "none" : "opacity 600ms ease",
            pointerEvents: slideIndex === index ? "auto" : "none",
          }}
        >
          <Box
            component="img"
            src={slide.image}
            alt=""
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(33,37,41,0.82) 0%, rgba(33,37,41,0.45) 48%, rgba(33,37,41,0.2) 100%)",
            }}
          />
        </Box>
      ))}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          px: { xs: 2, md: 6 },
          pb: { xs: 4, md: 5 },
          pt: 6,
          maxWidth: 720,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            fontFamily: fonts.sans,
            letterSpacing: "0.12em",
            opacity: 0.85,
            mb: 1,
          }}
        >
          Use case
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontFamily: fonts.sans,
            fontSize: { xs: "2rem", md: "3.25rem" },
            fontWeight: 300,
            lineHeight: 1.15,
            mb: 1,
          }}
        >
          {active.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: fonts.sans,
            fontSize: { xs: "1.05rem", md: "1.35rem" },
            opacity: 0.92,
            mb: 2.5,
          }}
        >
          {active.subtitle}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: { xs: 1.5, md: 2 },
            mb: 2.5,
          }}
        >
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            disableElevation
            sx={{
              ...buttonLabelSx,
              px: 2.5,
              py: 1,
              fontWeight: 700,
              borderRadius: 1.5,
              bgcolor: colors.accentSoft,
              color: colors.ink,
              "&:hover": {
                bgcolor: colors.accent,
                color: colors.white,
              },
            }}
          >
            Talk to us
          </Button>
          <Box
            component={RouterLink}
            to="/services"
            sx={{
              ...buttonLabelSx,
              color: "common.white",
              textDecoration: "none",
              fontWeight: 600,
              opacity: 0.9,
              borderBottom: "1px solid rgba(255,255,255,0.45)",
              pb: 0.15,
              transition: "opacity 160ms ease, border-color 160ms ease",
              "&:hover": {
                opacity: 1,
                borderColor: "common.white",
              },
            }}
          >
            See what we do
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {slides.map((slide, slideIndex) => (
            <Box
              key={slide.title}
              component="button"
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={slideIndex === index ? "true" : undefined}
              onClick={() => setIndex(slideIndex)}
              sx={{
                width: slideIndex === index ? 28 : 10,
                height: 10,
                border: 0,
                borderRadius: 999,
                p: 0,
                cursor: "pointer",
                bgcolor:
                  slideIndex === index
                    ? "common.white"
                    : "rgba(255,255,255,0.4)",
                transition: prefersReducedMotion ? "none" : "width 200ms ease",
              }}
            />
          ))}
          <IconButton
            aria-label={paused || prefersReducedMotion ? "Play carousel" : "Pause carousel"}
            onClick={() => setPaused((value) => !value)}
            sx={{ color: "common.white", ml: 0.5 }}
          >
            {paused || prefersReducedMotion ? (
              <PlayArrowRoundedIcon />
            ) : (
              <PauseRoundedIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default UseCaseCarousel;
