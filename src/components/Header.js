import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import NavbarScrollButtons from "./NavbarScrollButtons";
import { Helmet } from "react-helmet"; // Importing react-helmet for head management

const Header = () => {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling to the top
    });
  };

  const logoSFullRes = "/images/logosfullres.png";

  return (
    <>
      {/* Head component from react-helmet to add external resources */}
      <Helmet>
        <title>SIMUTOPIA</title>
        <link rel="icon" href="/images/favicon.png" />
        <meta
          name="description"
          content="Advancing Design and Innovation through Simulation and Analysis"
        />
        {/* Fontawesome Icons */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
        />
        {/* Google Font */}
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:200,300,400,700"
          rel="stylesheet"
        />
      </Helmet>

      <Navbar
        expand="lg"
        sticky="top"
        bg="dark"
        variant="dark"
        py="0"
        id="mainNavbar"
        collapseOnSelect={true}
        onToggle={() => setNavbarCollapsed(!navbarCollapsed)}
      >
        {/* Brand Logo wrapped with Navbar.Brand */}
        <Navbar.Brand
          className="mx-4"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logoSFullRes}
            height={48}
            width={26}
            alt="Simutopia Logo"
            className="d-inline-block"
          />{" "}
          <div
            style={{
              verticalAlign: "middle",
              fontSize: "40px",
              padding: "2px",
              paddingBottom: "0px",
              letterSpacing: "0.65px",
              fontWeight: "200",
            }}
            className="d-inline-block"
          >
            <b>SIM</b>UTOPIA
          </div>
        </Navbar.Brand>

        {/* Navbar Toggle */}
        <Navbar.Toggle />

        {/* Collapsible Menu */}
        <Navbar.Collapse>
          <NavbarScrollButtons navbarCollapsed={navbarCollapsed} />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
