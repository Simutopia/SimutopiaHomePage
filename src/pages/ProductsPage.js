import { Typography } from "@mui/material";
import ContentPageShell from "../components/ContentPageShell";
import { mutedTextSx } from "../theme/tokens";

const ProductsPage = () => (
  <ContentPageShell
    title="Products"
    intro="Simutopia products are available through our secure workspace. Sign in from Login to access the tools assigned to your account."
  >
    <Typography
      sx={{
        ...mutedTextSx,
        textAlign: "center",
        maxWidth: 560,
        mx: "auto",
      }}
    >
      Product details are coming soon.
    </Typography>
  </ContentPageShell>
);

export default ProductsPage;
