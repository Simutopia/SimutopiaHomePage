import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import { Box, Container, Link, Stack, Typography } from "@mui/material";

const offices = [
  { name: "USA Office", phone: "(+1) 774-207-8005", href: "tel:+17742078005" },
  { name: "India Office", phone: "(+91) 897-764-1377", href: "tel:+918977641377" },
];

const ContactSection = () => (
  <Box
    component="section"
    id="contactTarget"
    sx={{
      position: "relative",
      height: "95vh",
      minHeight: 520,
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
      py: 8,
      textAlign: "center",
    }}
  >
    <Box
      component="img"
      src="/images/simulinkBackgroundBW.png"
      alt=""
      aria-hidden="true"
      sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }}
    />
    <Container maxWidth="md" sx={{ position: "relative" }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ mb: 4, fontWeight: 200, fontSize: { xs: "2rem", md: "4rem" } }}
      >
        Ready to talk more about simulation and analysis?
      </Typography>
      <Stack spacing={3} alignItems="center">
        <Link
          href="mailto:consulting@simutopia.com"
          color="inherit"
          underline="none"
          variant="h5"
          sx={{ display: "inline-flex", alignItems: "center", gap: 1, fontWeight: 200, fontSize: { xs: "1.5rem", md: "3rem" } }}
        >
          <EmailOutlined /> consulting@simutopia.com
        </Link>
        {offices.map((office) => (
          <Link
            key={office.name}
            href={office.href}
            color="inherit"
            underline="none"
            variant="h5"
            sx={{ display: "inline-flex", alignItems: "center", gap: 1, fontWeight: 200, fontSize: { xs: "1.5rem", md: "3rem" } }}
          >
            <PhoneOutlined />
            <Box component="span">
              <Box component="span" sx={{ display: "block", textDecoration: "underline" }}>
                {office.name}
              </Box>
              {office.phone}
            </Box>
          </Link>
        ))}
      </Stack>
    </Container>
  </Box>
);

export default ContactSection;
