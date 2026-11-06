import { Box, Container, Typography } from "@mui/material";

const BrandStatement = () => (
  <Box
    component="section"
    sx={{
      position: "relative",
      height: "80vh",
      minHeight: 420,
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
      px: 2,
      py: 8,
      textAlign: "center",
    }}
  >
    <Box
      component="img"
      src="/images/simulinkBackgroundBW.png"
      alt=""
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: 0.2,
      }}
    />
    <Container
      maxWidth="md"
      sx={{
        position: "relative",
        width: "fit-content",
        maxWidth: "100%",
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 4 },
        bgcolor: "#fff",
      }}
    >
      <Box
        component="img"
        src="/images/simutopiaLogoWithReg.png"
        alt="Simutopia"
        sx={{ width: "100%", maxWidth: 600, height: "auto", mb: 3 }}
      />
      <Typography
        id="missionStatement"
        variant="body1"
        component="p"
        sx={{
          fontWeight: 400,
          fontSize: "1.4rem",
          mx: "auto",
          p: 2,
          border: "2px solid #000",
          borderRadius: "19px",
          width: 350,
          maxWidth: "100%",
          bgcolor: "#fff",
        }}
      >
        ADVANCING
        <br />
        <strong>DESIGN AND INNOVATION</strong>
        <br />
        THROUGH
        <br />
        <strong>SIMULATION AND ANALYSIS</strong>
      </Typography>
    </Container>
  </Box>
);

export default BrandStatement;
