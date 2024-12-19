import { Nav } from "react-bootstrap";

const NavbarScrollButtons = ({ navbarCollapsed }) => {
  const handleScrollClick = (destination) => {
    // Get the target element by id
    const targetElement = document.getElementById(destination);

    if (targetElement) {
      // Get the current screen width
      const isMobile = window.innerWidth <= 768; // Adjust the breakpoint for mobile screens
      // Apply an additional offset if not on mobile
      const additionalOffset = isMobile ? 270 : 85; // 0px on mobile, 10px on desktop

      const targetPosition = targetElement.offsetTop- additionalOffset;

      // Scroll to the target element with the calculated position
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  return (
    <>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link
            eventKey="1"
            className="navbarLink"
            onClick={() => handleScrollClick("industriesTarget")}
          >
            Industries
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="2"
            className="navbarLink"
            onClick={() => handleScrollClick("servicesTarget")}
          >
            Services
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="3"
            className="navbarLink"
            onClick={() => handleScrollClick("aboutUsTarget")}
          >
            About Us
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="4"
            className="navbarLink"
            onClick={() => handleScrollClick("contactTarget")}
          >
            Contact Us
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default NavbarScrollButtons;
