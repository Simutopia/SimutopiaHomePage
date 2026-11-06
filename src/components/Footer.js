import { Box, Container, Divider, Typography } from "@mui/material";

const offices = [
  { name: "USA Office", lines: ["17221 Broadoak Dr.", "Tampa, FL 33647"] },
  {
    name: "India Office",
    lines: [
      "Simutopia (India) Private Limited",
      "4-60-5/4/1, Lawsons Bay Colony",
      "Visakhapatnam, Andhra Pradesh 530017",
    ],
  },
];

const Footer = () => (
  <Box component="footer" id="footer" sx={{ bgcolor: "#212529", color: "common.white", py: 3 }}>
    <Container maxWidth="xl">
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 3 }}>
        {offices.map(({ name, lines }) => (
          <Box key={name}>
            <Typography variant="h6" component="h2" sx={{ textDecoration: "underline" }}>
              {name}
            </Typography>
            {lines.map((line) => (
              <Typography key={line} variant="body2">{line}</Typography>
            ))}
          </Box>
        ))}
      </Box>
      <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.25)" }} />
      <Typography variant="body2">
        &copy; 2020-{new Date().getFullYear()} Simutopia, LLC.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
