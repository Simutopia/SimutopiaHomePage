import { Typography } from "@mui/material";
import ContentPageShell from "../components/ContentPageShell";
import { colors, fonts } from "../theme/tokens";

const ProductsPage = () => (
  <ContentPageShell
    title="Products"
    intro="Simutopia products are available through our secure workspace. Sign in from Login to access the tools assigned to your account."
  >
    <Typography
      sx={{
        fontFamily: fonts.sans,
        textAlign: "center",
        color: colors.muted,
        fontSize: { xs: "0.98rem", md: "1.05rem" },
        lineHeight: 1.6,
        maxWidth: 560,
        mx: "auto",
      }}
    >
      Product details are coming soon.
    </Typography>
  </ContentPageShell>
);

export default ProductsPage;
