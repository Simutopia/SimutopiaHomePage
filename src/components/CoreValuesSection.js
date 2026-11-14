import { Box, Container, Typography } from "@mui/material";
import coreValues from "../data/coreValues";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import { colors, sectionIntroSx, sectionTitleSx } from "../theme/tokens";

const atmosphere = "greenWash";

const CoreValuesSection = () => (
  <Box
    component="section"
    aria-label="Core Values"
    sx={{
      ...getLightAtmosphereSx(atmosphere),
      py: { xs: 6, md: 8 },
      borderTop: `1px solid ${colors.border}`,
    }}
  >
    <AtmosphereGrid variant={atmosphere} />
    <Container maxWidth="lg" sx={{ position: "relative" }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          ...sectionTitleSx,
          my: 0,
          mb: 1,
        }}
      >
        Core Values
      </Typography>
      <Typography
        sx={{
          ...sectionIntroSx,
          maxWidth: 640,
          mb: { xs: 4, md: 5 },
        }}
      >
        These five values guide how we work, hire, and grow together — our core DNA:{" "}
        {coreValues.map((value, index) => (
          <Box component="span" key={value.letter}>
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: value.color,
              }}
            >
              {value.letter}
            </Box>
            {index < coreValues.length - 1 ? (
              <Box component="span" sx={{ color: colors.borderStrong }}>
                -
              </Box>
            ) : null}
          </Box>
        ))}
        .
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
          columnGap: { md: 5, lg: 6 },
          rowGap: { xs: 3.5, md: 4.5 },
          maxWidth: 960,
          mx: "auto",
        }}
      >
        {coreValues.map((value, index) => (
          <Box
            key={value.letter}
            component="article"
            sx={{
              gridColumn: {
                md: index === coreValues.length - 1 ? "1 / -1" : "auto",
              },
              maxWidth: {
                md: index === coreValues.length - 1 ? 420 : "none",
              },
              justifySelf: {
                md: index === coreValues.length - 1 ? "center" : "stretch",
              },
              width: "100%",
              pl: 2,
              borderLeft: `3px solid ${value.color}`,
            }}
          >
            <Typography
              component="h4"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.4rem" },
                fontWeight: 700,
                lineHeight: 1.25,
                mb: 0.4,
                color: colors.ink,
              }}
            >
              <Box component="span" sx={{ color: value.color }}>
                {value.title.slice(0, 1)}
              </Box>
              {value.title.slice(1)}
            </Typography>
            <Typography
              sx={{
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: { xs: "0.95rem", md: "1rem" },
                color: colors.soft,
                mb: 1.15,
              }}
            >
              {value.mantra}
            </Typography>
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 2.1,
              }}
            >
              {value.points.map((point) => (
                <Typography
                  key={point}
                  component="li"
                  sx={{
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    lineHeight: 1.55,
                    mb: 0.75,
                    color: colors.body,
                  }}
                >
                  {point}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default CoreValuesSection;
