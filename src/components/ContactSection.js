import { useState } from "react";
import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import OfficeGlobe from "./OfficeGlobe";
import FlagIcon from "./FlagIcon";
import offices from "../data/offices";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import {
  bodyTextSx,
  colors,
  fonts,
  mutedTextSx,
  pageTitleSx,
  sectionPy,
  valueTitleSx,
} from "../theme/tokens";

const atmosphere = "blueWash";

const ContactSection = () => {
  const [activeOfficeId, setActiveOfficeId] = useState(offices[0].id);

  return (
    <Box
      component="section"
      id="contactTarget"
      sx={{
        ...getLightAtmosphereSx(atmosphere),
        py: sectionPy,
      }}
    >
      <AtmosphereGrid variant={atmosphere} />
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            ...pageTitleSx,
            mb: { xs: 2.5, md: 3 },
          }}
        >
          How can we help you?
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.1fr) minmax(0, 0.9fr)" },
            gap: { xs: 2.5, md: 3 },
            alignItems: "center",
          }}
        >
          <OfficeGlobe
            activeOfficeId={activeOfficeId}
            onSelectOffice={setActiveOfficeId}
          />

          <Stack spacing={2}>
            <Typography
              variant="body1"
              sx={{
                ...bodyTextSx,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              Reach us
              <EmailOutlined fontSize="small" />
              <Link
                href="mailto:consulting@simutopia.com"
                color="inherit"
                underline="hover"
                sx={{
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: colors.ink,
                }}
              >
                consulting@simutopia.com
              </Link>
            </Typography>

            <Typography
              component="h3"
              sx={{
                ...valueTitleSx,
                fontWeight: 600,
                pt: 0.5,
              }}
            >
              Our Offices
            </Typography>

            {offices.map((office) => {
              const isActive = office.id === activeOfficeId;
              return (
                <Box
                  key={office.id}
                  component="button"
                  type="button"
                  onClick={() => setActiveOfficeId(office.id)}
                  aria-pressed={isActive}
                  sx={{
                    appearance: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: isActive ? office.color : colors.borderCard,
                    bgcolor: "rgba(255,255,255,0.88)",
                    borderRadius: 2,
                    p: { xs: 2, md: 2.5 },
                    boxShadow: isActive ? `0 0 0 1px ${office.color}` : "none",
                    transition: "border-color 160ms ease, box-shadow 160ms ease",
                    fontFamily: fonts.sans,
                    color: colors.ink,
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      ...valueTitleSx,
                      fontWeight: 600,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                    }}
                  >
                    <FlagIcon
                      code={office.flagCode}
                      label={office.flagLabel}
                      size={30}
                    />
                    {office.name}
                  </Typography>

                  <Box sx={{ color: colors.muted, mb: 1.5, pl: 0.25 }}>
                    {office.lines.map((line) => (
                      <Typography
                        key={line}
                        variant="body1"
                        sx={bodyTextSx}
                      >
                        {line}
                      </Typography>
                    ))}
                  </Box>

                  <Link
                    href={office.phoneHref}
                    color="inherit"
                    underline="hover"
                    onClick={(event) => event.stopPropagation()}
                    sx={{
                      ...mutedTextSx,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      textDecoration: "none",
                    }}
                  >
                    <PhoneOutlined fontSize="small" />
                    {office.phone}
                  </Link>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactSection;
