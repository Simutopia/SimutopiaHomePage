import { Box, Container, Link, Typography } from "@mui/material";
import partners from "../data/partners";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import { colors, fonts, sectionPy, sectionTitleMb, sectionTitleSx } from "../theme/tokens";

const atmosphere = "mistFlip";
const accentFontFamily = fonts.accent;

const PartnersStrip = () => (
  <Box
    component="section"
    aria-label="Our Partners"
    sx={{
      ...getLightAtmosphereSx(atmosphere),
      py: sectionPy,
      borderTop: `1px solid ${colors.border}`,
      borderBottom: `1px solid ${colors.border}`,
    }}
  >
    <AtmosphereGrid variant={atmosphere} />
    <Container maxWidth="xl" sx={{ position: "relative" }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          ...sectionTitleSx,
          mb: sectionTitleMb,
        }}
      >
        Our Partners
      </Typography>

      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          listStyle: "none",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "repeat(3, minmax(0, 1fr))",
            md: "repeat(5, minmax(0, 1fr))",
          },
          gap: { xs: 3, md: 4 },
          alignItems: "center",
          justifyItems: "center",
          maxWidth: 1120,
          mx: "auto",
        }}
      >
        {partners.map((partner) => (
          <Box
            component="li"
            key={partner.id}
            sx={{ width: "100%", textAlign: "center" }}
          >
            <Link
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.name} website`}
              underline="none"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: partner.wordmark ? 1 : 0,
                minHeight: partner.tallLogo
                  ? { xs: 88, md: 104 }
                  : { xs: 64, md: 72 },
                px: partner.logoOnDark ? 1 : 1.5,
                py: partner.logoOnDark ? 1 : 0,
                borderRadius: partner.logoOnDark ? 1.5 : 0,
                bgcolor: partner.logoOnDark ? "#1a1c1e" : "transparent",
                opacity: 0.92,
                transition: "opacity 160ms ease, transform 160ms ease",
                "&:hover": {
                  opacity: 1,
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Box
                component="img"
                src={partner.logo}
                alt={partner.wordmark ? "" : partner.name}
                sx={{
                  maxWidth: partner.wordmark
                    ? { xs: 36, md: 44 }
                    : partner.wideLogo
                      ? { xs: 148, md: 176 }
                      : partner.tallLogo
                        ? { xs: 92, md: 110 }
                        : "100%",
                  maxHeight: partner.wideLogo
                    ? { xs: 48, md: 56 }
                    : partner.tallLogo
                      ? { xs: 80, md: 96 }
                      : { xs: 44, md: 52 },
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              {partner.wordmark ? (
                <Typography
                  component="span"
                  sx={{
                    fontFamily: accentFontFamily,
                    fontWeight: 400,
                    fontSize: { xs: "0.7rem", sm: "0.78rem", md: "0.85rem" },
                    letterSpacing: "0.04em",
                    color: colors.body,
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {partner.wordmark}
                </Typography>
              ) : null}
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default PartnersStrip;
