import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./components/Header";
import BrandStatement from "./components/BrandStatement";
import WhySim from "./components/WhySim";
import Industries from "./components/Industries";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import RbacApp from "./rbac/RbacApp";
import "./global.css";

const siteTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0d6efd" },
    background: { default: "#ffffff", paper: "#ffffff" },
    text: { primary: "#212529", secondary: "#5e6063" },
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
    button: { textTransform: "none" },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={siteTheme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={
              <Box className="simutopia-site">
                <Header />
                <BrandStatement />
                <WhySim />
                <Industries />
                <Services />
                <AboutUs />
                <ContactSection />
                <Footer />
              </Box>
            }
          />
          <Route path="/workspace/*" element={<RbacApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
