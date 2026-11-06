import {
  ArrowDownward,
  Groups,
  Search,
  CompareArrows,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const benefits = [
  { icon: <Search fontSize="inherit" />, text: "Identify system level risks early in design" },
  { icon: <CompareArrows fontSize="inherit" />, text: "Increase traceability of the design requirements" },
  { icon: <KeyboardDoubleArrowDown fontSize="inherit" />, text: "Minimize physical prototyping and field testing" },
  { icon: <Groups fontSize="inherit" />, text: "Improve collaboration across disciplines and perform system integration" },
];

const WhySim = () => (
  <Box component="section" sx={{ bgcolor: "#5e6063", color: "common.white", py: 10 }}>
    <Container maxWidth="xl">
      <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 5 }}>
        <Typography variant="h2" component="h2" sx={{ fontSize: { xs: "2rem", md: "4rem" } }}>
          Why use <strong>SIMULATION</strong> and <strong>ANALYSIS</strong>?
        </Typography>
        <ArrowDownward aria-hidden="true" />
        <Typography variant="h4" component="p" sx={{ fontSize: { xs: "1.5rem", md: "3rem" } }}>
          Understand the <strong>DYNAMIC BEHAVIOR</strong> of the <strong>SYSTEM</strong>
        </Typography>
        <Typography variant="h2" aria-hidden="true">+</Typography>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
          gap: 3,
        }}
      >
        {benefits.map(({ icon, text }) => (
          <Card key={text} sx={{ height: "100%", minHeight: 240, bgcolor: "#89d386", color: "common.black" }}>
            <CardContent sx={{ p: 4, textAlign: "center" }}>
              <Box sx={{ fontSize: 64 }}>{icon}</Box>
              <Divider sx={{ my: 2, borderColor: "rgba(0,0,0,0.3)" }} />
              <Typography variant="h6" component="p">{text}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  </Box>
);

export default WhySim;
