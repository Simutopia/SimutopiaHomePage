import { Box } from "@mui/material";

/** Readable H₂ — larger than default Unicode/HTML subscript */
const H2Formula = () => (
  <Box component="span" sx={{ whiteSpace: "nowrap" }}>
    H
    <Box
      component="span"
      sx={{
        fontSize: "0.78em",
        fontWeight: 600,
        verticalAlign: "-0.15em",
        ml: "0.02em",
      }}
    >
      2
    </Box>
  </Box>
);

export default H2Formula;
