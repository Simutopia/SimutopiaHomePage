import { Box } from "@mui/material";

const flags = {
  us: (
    <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="60" height="30" fill="#B22234" />
      <path
        fill="#fff"
        d="M0 3.5h60v3H0zm0 6h60v3H0zm0 6h60v3H0zm0 6h60v3H0zm0 6h60v3H0z"
      />
      <rect width="24" height="16.5" fill="#3C3B6E" />
      <g fill="#fff">
        <circle cx="3" cy="2.2" r="0.7" />
        <circle cx="7" cy="2.2" r="0.7" />
        <circle cx="11" cy="2.2" r="0.7" />
        <circle cx="15" cy="2.2" r="0.7" />
        <circle cx="19" cy="2.2" r="0.7" />
        <circle cx="5" cy="4.2" r="0.7" />
        <circle cx="9" cy="4.2" r="0.7" />
        <circle cx="13" cy="4.2" r="0.7" />
        <circle cx="17" cy="4.2" r="0.7" />
        <circle cx="21" cy="4.2" r="0.7" />
        <circle cx="3" cy="6.2" r="0.7" />
        <circle cx="7" cy="6.2" r="0.7" />
        <circle cx="11" cy="6.2" r="0.7" />
        <circle cx="15" cy="6.2" r="0.7" />
        <circle cx="19" cy="6.2" r="0.7" />
        <circle cx="5" cy="8.2" r="0.7" />
        <circle cx="9" cy="8.2" r="0.7" />
        <circle cx="13" cy="8.2" r="0.7" />
        <circle cx="17" cy="8.2" r="0.7" />
        <circle cx="21" cy="8.2" r="0.7" />
        <circle cx="3" cy="10.2" r="0.7" />
        <circle cx="7" cy="10.2" r="0.7" />
        <circle cx="11" cy="10.2" r="0.7" />
        <circle cx="15" cy="10.2" r="0.7" />
        <circle cx="19" cy="10.2" r="0.7" />
        <circle cx="5" cy="12.2" r="0.7" />
        <circle cx="9" cy="12.2" r="0.7" />
        <circle cx="13" cy="12.2" r="0.7" />
        <circle cx="17" cy="12.2" r="0.7" />
        <circle cx="21" cy="12.2" r="0.7" />
        <circle cx="3" cy="14.2" r="0.7" />
        <circle cx="7" cy="14.2" r="0.7" />
        <circle cx="11" cy="14.2" r="0.7" />
        <circle cx="15" cy="14.2" r="0.7" />
        <circle cx="19" cy="14.2" r="0.7" />
      </g>
    </svg>
  ),
  in: (
    <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="60" height="10" y="0" fill="#FF9933" />
      <rect width="60" height="10" y="10" fill="#fff" />
      <rect width="60" height="10" y="20" fill="#138808" />
      <circle cx="30" cy="15" r="3.4" fill="none" stroke="#000080" strokeWidth="0.7" />
      <circle cx="30" cy="15" r="0.6" fill="#000080" />
      <g stroke="#000080" strokeWidth="0.35">
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index * Math.PI) / 6;
          const x2 = 30 + Math.cos(angle) * 3.1;
          const y2 = 15 + Math.sin(angle) * 3.1;
          return <line key={index} x1="30" y1="15" x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  ),
};

const FlagIcon = ({ code, label, size = 28 }) => (
  <Box
    component="span"
    role="img"
    aria-label={label}
    sx={{
      width: size,
      height: Math.round(size * 0.55),
      display: "inline-flex",
      flexShrink: 0,
      overflow: "hidden",
      borderRadius: "3px",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.12)",
      "& svg": {
        width: "100%",
        height: "100%",
        display: "block",
      },
    }}
  >
    {flags[code]}
  </Box>
);

export const flagSvgMarkup = {
  us: `<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" width="28" height="15" aria-hidden="true"><rect width="60" height="30" fill="#B22234"/><path fill="#fff" d="M0 3.5h60v3H0zm0 6h60v3H0zm0 6h60v3H0zm0 6h60v3H0zm0 6h60v3H0z"/><rect width="24" height="16.5" fill="#3C3B6E"/><g fill="#fff"><circle cx="3" cy="2.2" r="0.7"/><circle cx="7" cy="2.2" r="0.7"/><circle cx="11" cy="2.2" r="0.7"/><circle cx="15" cy="2.2" r="0.7"/><circle cx="19" cy="2.2" r="0.7"/><circle cx="5" cy="4.2" r="0.7"/><circle cx="9" cy="4.2" r="0.7"/><circle cx="13" cy="4.2" r="0.7"/><circle cx="17" cy="4.2" r="0.7"/><circle cx="21" cy="4.2" r="0.7"/><circle cx="3" cy="6.2" r="0.7"/><circle cx="7" cy="6.2" r="0.7"/><circle cx="11" cy="6.2" r="0.7"/><circle cx="15" cy="6.2" r="0.7"/><circle cx="19" cy="6.2" r="0.7"/><circle cx="5" cy="8.2" r="0.7"/><circle cx="9" cy="8.2" r="0.7"/><circle cx="13" cy="8.2" r="0.7"/><circle cx="17" cy="8.2" r="0.7"/><circle cx="21" cy="8.2" r="0.7"/><circle cx="3" cy="10.2" r="0.7"/><circle cx="7" cy="10.2" r="0.7"/><circle cx="11" cy="10.2" r="0.7"/><circle cx="15" cy="10.2" r="0.7"/><circle cx="19" cy="10.2" r="0.7"/><circle cx="5" cy="12.2" r="0.7"/><circle cx="9" cy="12.2" r="0.7"/><circle cx="13" cy="12.2" r="0.7"/><circle cx="17" cy="12.2" r="0.7"/><circle cx="21" cy="12.2" r="0.7"/><circle cx="3" cy="14.2" r="0.7"/><circle cx="7" cy="14.2" r="0.7"/><circle cx="11" cy="14.2" r="0.7"/><circle cx="15" cy="14.2" r="0.7"/><circle cx="19" cy="14.2" r="0.7"/></g></svg>`,
  in: `<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" width="28" height="15" aria-hidden="true"><rect width="60" height="10" y="0" fill="#FF9933"/><rect width="60" height="10" y="10" fill="#fff"/><rect width="60" height="10" y="20" fill="#138808"/><circle cx="30" cy="15" r="3.4" fill="none" stroke="#000080" stroke-width="0.7"/><circle cx="30" cy="15" r="0.6" fill="#000080"/><g stroke="#000080" stroke-width="0.35"><line x1="30" y1="15" x2="33.1" y2="15"/><line x1="30" y1="15" x2="32.68" y2="16.55"/><line x1="30" y1="15" x2="31.55" y2="17.68"/><line x1="30" y1="15" x2="30" y2="18.1"/><line x1="30" y1="15" x2="28.45" y2="17.68"/><line x1="30" y1="15" x2="27.32" y2="16.55"/><line x1="30" y1="15" x2="26.9" y2="15"/><line x1="30" y1="15" x2="27.32" y2="13.45"/><line x1="30" y1="15" x2="28.45" y2="12.32"/><line x1="30" y1="15" x2="30" y2="11.9"/><line x1="30" y1="15" x2="31.55" y2="12.32"/><line x1="30" y1="15" x2="32.68" y2="13.45"/></g></svg>`,
};

export default FlagIcon;
