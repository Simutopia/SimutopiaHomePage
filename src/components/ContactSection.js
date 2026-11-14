import { useState } from "react";
import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import OfficeGlobe from "./OfficeGlobe";
import FlagIcon from "./FlagIcon";
import offices from "../data/offices";
import { AtmosphereGrid, getLightAtmosphereSx } from "../theme/atmosphere";
import { colors, fonts } from "../theme/tokens";

const atmosphere = "blueWash";

const ContactSection = () => {
  const [activeOfficeId, setActiveOfficeId] = useState(offices[0].id);

  return (
    <Box
      component="section"
      id="contactTarget"
      sx={{
        ...getLightAtmosphereSx(atmosphere),
        py: { xs: 6, md: 8 },
      }}
    >
      <AtmosphereGrid variant={atmosphere} />
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: { xs: 4, md: 5 },
            fontSize: { xs: "1.15rem", md: "1.35rem" },
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textAlign: "center",
            color: colors.ink,
          }}
        >
          How can we help you?
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.1fr) minmax(0, 0.9fr)" },
            gap: { xs: 3, md: 4 },
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
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
                fontFamily: fonts.sans,
                fontSize: "1rem",
                fontWeight: 400,
                color: colors.body,
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
                fontFamily: fonts.sans,
                fontSize: "1.25rem",
                fontWeight: 600,
                pt: 0.5,
                color: colors.ink,
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
                      fontFamily: "inherit",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                      color: colors.ink,
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
                        sx={{
                          fontFamily: "inherit",
                          fontSize: "1rem",
                          fontWeight: 400,
                          color: colors.body,
                        }}
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
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      fontFamily: "inherit",
                      fontSize: "1rem",
                      fontWeight: 400,
                      color: colors.muted,
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
