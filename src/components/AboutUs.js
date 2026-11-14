import { Box, Container, Typography } from "@mui/material";
import VDiagram from "./VDiagram";
import CoreValuesSection from "./CoreValuesSection";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import { colors, fonts, sectionIntroSx, sectionTitleSx } from "../theme/tokens";

const vAtmosphere = "mist";
const leadershipAtmosphere = "quiet";
const introAtmosphere = "quiet";

const yearsSince = (year) => new Date().getFullYear() - year;

const StriveStatement = ({ emphasizeColor = colors.ink }) => (
  <>
    We strive to achieve this goal by providing tools and services for modeling, simulation and
    analysis, leveraging our core-strength: our passion and experience in{" "}
    <Box
      component="strong"
      sx={{
        fontWeight: 700,
        color: emphasizeColor,
      }}
    >
      model-based design
    </Box>
    .
  </>
);

const vFrameworkPoints = [
  "Find system-level problems early",
  "Keep every design requirement visible through delivery",
  "Predict behavior in models so fewer prototypes are needed",
  "Align disciplines around one shared system view",
];

const profiles = [
  {
    name: "Krishna Tamminana",
    image: "/images/krishnaPicture.png",
    imageAlt: "Krishna Tamminana",
    paragraphs: [
      <>Krishna is the President and Founder of Simutopia<sup>®</sup>. He holds a B.Tech from IIT Madras (2003), an M.S.M.E. from The Ohio State University (2005), and {yearsSince(2005)}+ years in engineering, simulation, and analysis.</>,
      "At MathWorks, he helped clients adopt model-based design for multi-domain physical systems and controls across automotive, aerospace, industrial machinery, and medical devices. At Manitowoc Cranes R&D, he helped build a hardware-in-the-loop platform for automated controls testing.",
      "At Walt Disney Imagineering, he developed animation tools for Animatronic figures, supported system integration on attractions including Frozen Ever After and Star Wars: Galaxy’s Edge, and led dynamic simulation of track-based and trackless ride systems for motion analysis and controls design.",
      "Krishna enjoys badminton, biking with his kids, and watching movies.",
    ],
  },
  {
    name: "Gabriel King",
    image: "/images/gabePicture.png",
    imageAlt: "Gabriel King",
    reversed: true,
    paragraphs: [
      <>Gabriel is the Lead Engineer at Simutopia<sup>®</sup>. He holds a B.S. in Mechanical Engineering from the University of Central Florida (2015) and {yearsSince(2014)}+ years in engineering — after six years as an automotive technician working on everything from drag engines to daily drivers.</>,
      "At Walt Disney Parks & Resorts, he built ride timing and capacity simulations, designed vehicle dynamics models in MATLAB, and helped develop and test trackless ride controls. At Dreamscape Immersive, he designed and manufactured physical systems for location-based VR experiences.",
      "As a Systems Engineer at Walt Disney Imagineering, he led ride vehicle testing for Star Wars: Rise of the Resistance and worked on systems design that brought safety, creative intent, and mechanical, electrical, and controls designs together.",
      "Outside work, Gabriel enjoys mountain biking, philosophy, woodworking, and sports cars.",
    ],
  },
];

const MissionGoal = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
      gap: { xs: 2, md: 3 },
      width: "100%",
      maxWidth: 880,
      mx: "auto",
    }}
  >
    <Box
      sx={{
        pl: { xs: 2.5, md: 3 },
        pr: { xs: 1, md: 2 },
        py: { xs: 1.5, md: 2 },
        borderLeft: `3px solid ${colors.accentSoft}`,
      }}
    >
      <Typography
        component="p"
        sx={{
          m: 0,
          mb: 1,
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: colors.muted,
        }}
      >
        Mission
      </Typography>
      <Typography
        sx={{
          m: 0,
          fontSize: { xs: "1.15rem", md: "1.45rem" },
          fontWeight: 600,
          lineHeight: 1.35,
          color: colors.ink,
        }}
      >
        Advancing design and innovation through simulation and analysis.
      </Typography>
    </Box>

    <Box
      sx={{
        pl: { xs: 2.5, md: 3 },
        pr: { xs: 1, md: 2 },
        py: { xs: 1.5, md: 2 },
        borderLeft: `3px solid ${colors.accentBlueSoft}`,
      }}
    >
      <Typography
        component="p"
        sx={{
          m: 0,
          mb: 1,
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: colors.muted,
        }}
      >
        Goal
      </Typography>
      <Typography
        sx={{
          m: 0,
          fontSize: { xs: "1.15rem", md: "1.45rem" },
          fontWeight: 600,
          lineHeight: 1.35,
          color: colors.ink,
        }}
      >
        Accelerate the pace of our clients’ efforts to successfully create innovative products
        and services.
      </Typography>
    </Box>
  </Box>
);

const vCopyFontSize = { xs: "1rem", md: "1.0625rem" };
const vCopyMaxWidth = 860;

const AboutDetail = () => (
  <Box sx={{ bgcolor: "common.white", color: colors.ink }}>
    <Box
      sx={{
        ...getLightAtmosphereSx(vAtmosphere),
        py: { xs: 6, md: 8 },
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <AtmosphereGrid variant={vAtmosphere} />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          sx={{
            fontFamily: fonts.sans,
            color: colors.ink,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 920, mb: { xs: 3.5, md: 4.5 } }}>
            <VDiagram />
          </Box>

          <Typography
            sx={{
              fontFamily: "inherit",
              fontSize: vCopyFontSize,
              fontWeight: 400,
              lineHeight: 1.65,
              mb: { xs: 3, md: 3.5 },
              textAlign: "left",
              width: "100%",
              maxWidth: vCopyMaxWidth,
              px: { xs: 1, md: 0 },
              color: colors.body,
            }}
          >
            At Simutopia<sup>®</sup>, we believe model-based design with the “V” product development
            framework is how complex systems get designed and delivered on budget and on time.
          </Typography>

          <Box
            sx={{
              width: "100%",
              maxWidth: vCopyMaxWidth,
              mb: { xs: 3, md: 3.5 },
              px: { xs: 1, md: 0 },
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                fontFamily: "inherit",
                fontSize: vCopyFontSize,
                fontWeight: 700,
                lineHeight: 1.6,
                mb: 1.25,
                textAlign: "left",
                color: colors.ink,
              }}
            >
              The V framework enables us to:
            </Typography>
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 2.75,
                textAlign: "left",
              }}
            >
              {vFrameworkPoints.map((point) => (
                <Typography
                  key={point}
                  component="li"
                  sx={{
                    fontFamily: "inherit",
                    fontSize: vCopyFontSize,
                    fontWeight: 400,
                    lineHeight: 1.65,
                    mb: 1,
                    pl: 0.25,
                    color: colors.body,
                  }}
                >
                  {point}
                </Typography>
              ))}
            </Box>
          </Box>

          <Typography
            sx={{
              fontFamily: "inherit",
              fontSize: vCopyFontSize,
              fontWeight: 400,
              lineHeight: 1.65,
              textAlign: "left",
              width: "100%",
              maxWidth: vCopyMaxWidth,
              px: { xs: 1, md: 0 },
              color: colors.body,
            }}
          >
            We architect system models for both legs of the V — and stay with clients through every
            step.
          </Typography>
        </Box>
      </Container>
    </Box>

    <CoreValuesSection />

    <Box
      component="section"
      aria-label="Leadership"
      sx={{
        ...getLightAtmosphereSx(leadershipAtmosphere),
        borderTop: `1px solid ${colors.border}`,
        pt: { xs: 6, md: 8 },
        pb: { xs: 2, md: 3 },
      }}
    >
      <AtmosphereGrid variant={leadershipAtmosphere} />
      <Typography
        variant="h3"
        component="h3"
        sx={{
          ...sectionTitleSx,
          position: "relative",
          my: 0,
          mb: { xs: 4, md: 5 },
        }}
      >
        Leadership
      </Typography>

      {profiles.map(({ name, image, imageAlt, paragraphs, reversed }, profileIndex) => (
        <Box
          key={name}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: reversed ? "1.15fr minmax(280px, 0.85fr)" : "minmax(280px, 0.85fr) 1.15fr",
            },
            gridTemplateAreas: {
              xs: '"image" "bio"',
              lg: reversed ? '"bio image"' : '"image bio"',
            },
            alignItems: "stretch",
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 2, md: 3 },
            mb: { xs: 4, md: 5 },
            pb: { xs: 4, md: 5 },
            borderBottom:
              profileIndex < profiles.length - 1
                ? `1px solid ${colors.border}`
                : "none",
          }}
        >
          <Box
            sx={{
              gridArea: "image",
              overflow: "hidden",
              borderRadius: { xs: 1.5, lg: 2 },
              alignSelf: "stretch",
              minHeight: { xs: 280, lg: 340 },
            }}
          >
            <Box
              component="img"
              src={image}
              alt={imageAlt}
              sx={{
                width: "100%",
                height: "100%",
                minHeight: { xs: 280, lg: 340 },
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
          <Box
            sx={{
              gridArea: "bio",
              px: { xs: 0.5, md: 4 },
              py: { xs: 2.5, md: 1 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: reversed ? { xs: "left", lg: "right" } : "left",
            }}
          >
            <Typography
              component="h3"
              sx={{
                mb: 1.25,
                fontSize: { xs: "1.45rem", md: "1.7rem" },
                fontWeight: 600,
                color: colors.ink,
              }}
            >
              {name}
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 2,
                bgcolor: colors.accentMuted,
                mb: 2,
                ml: reversed ? { xs: 0, lg: "auto" } : 0,
                mr: reversed ? { xs: "auto", lg: 0 } : "auto",
              }}
            />
            {paragraphs.map((paragraph, index) => (
              <Typography
                key={index}
                component="p"
                sx={{
                  mb: 1.35,
                  fontSize: { xs: "0.98rem", md: "1.02rem" },
                  lineHeight: 1.65,
                  color: colors.body,
                }}
              >
                {paragraph}
              </Typography>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

const AboutUs = () => (
  <Box component="section" id="aboutUsTarget">
    <Box
      sx={{
        ...getLightAtmosphereSx(introAtmosphere),
        py: { xs: 6, md: 8 },
      }}
    >
      <AtmosphereGrid variant={introAtmosphere} />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: { xs: 2, md: 2.5 },
            fontSize: { xs: "1.15rem", md: "1.35rem" },
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textAlign: "center",
            color: colors.ink,
          }}
        >
          Who We Are
        </Typography>
        <Typography
          sx={{
            ...sectionIntroSx,
            mb: { xs: 3.5, md: 4.5 },
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            color: colors.body,
          }}
        >
          We are a software and engineering consulting company.
        </Typography>
        <Box sx={{ mb: { xs: 3.5, md: 4.5 } }}>
          <MissionGoal />
        </Box>
        <Typography
          sx={{
            fontFamily: fonts.sans,
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.6,
            textAlign: "center",
            maxWidth: 720,
            mx: "auto",
            color: colors.body,
          }}
        >
          <StriveStatement />
        </Typography>
      </Container>
    </Box>
    <AboutDetail />
  </Box>
);

export default AboutUs;
