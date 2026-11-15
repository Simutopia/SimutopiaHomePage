import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import PublicLayout from "./components/PublicLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import RbacApp from "./rbac/RbacApp";
import { colors, fonts } from "./theme/tokens";
import "./global.css";

const siteTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: colors.accentBlue },
    background: { default: colors.white, paper: colors.white },
    text: { primary: colors.ink, secondary: colors.muted },
  },
  typography: {
    fontFamily: fonts.sans,
    button: { textTransform: "none", fontFamily: fonts.sans },
    h1: { fontFamily: fonts.sans },
    h2: { fontFamily: fonts.sans },
    h3: { fontFamily: fonts.sans },
    h4: { fontFamily: fonts.sans },
    h5: { fontFamily: fonts.sans },
    h6: { fontFamily: fonts.sans },
    body1: { fontFamily: fonts.sans },
    body2: { fontFamily: fonts.sans },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={siteTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="case-studies" element={<CaseStudiesPage />} />
            <Route
              path="case-studies/:slug"
              element={<CaseStudyDetailPage />}
            />
            <Route
              path="industries"
              element={<Navigate to="/services#industries" replace />}
            />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
          <Route path="/workspace/*" element={<RbacApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
