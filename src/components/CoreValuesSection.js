import { Box, Container, Typography } from "@mui/material";
import coreValues from "../data/coreValues";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import {
  bodyTextSx,
  colors,
  mutedTextSx,
  sectionIntroMb,
  sectionIntroSx,
  sectionPy,
  sectionTitleSx,
  valueTitleSx,
} from "../theme/tokens";

const atmosphere = "greenWash";

const CoreValuesSection = () => (
  <Box
    component="section"
    aria-label="Core Values"
    sx={{
      ...getLightAtmosphereSx(atmosphere),
      py: sectionPy,
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
          mb: { xs: 1, md: 1.15 },
        }}
      >
        Core Values
      </Typography>
      <Typography
        sx={{
          ...sectionIntroSx,
          maxWidth: 640,
          mb: sectionIntroMb,
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
          columnGap: { md: 4, lg: 5 },
          rowGap: { xs: 2.25, md: 2.75 },
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
                ...valueTitleSx,
                mb: 0.25,
              }}
            >
              <Box component="span" sx={{ color: value.color }}>
                {value.title.slice(0, 1)}
              </Box>
              {value.title.slice(1)}
            </Typography>
            <Typography
              sx={{
                ...mutedTextSx,
                fontStyle: "italic",
                fontWeight: 500,
                color: colors.soft,
                mb: 0.75,
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
                    ...bodyTextSx,
                    mb: 0.45,
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
