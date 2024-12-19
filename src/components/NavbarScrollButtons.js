import { Nav } from "react-bootstrap";

const NavbarScrollButtons = ({ navbarCollapsed }) => {
  const handleScrollClick = (destination) => {
    // Get the target element by id
    const targetElement = document.getElementById(destination);

    if (targetElement) {
      const offset = navbarCollapsed ? 50 : 260;
      const targetPosition = targetElement.offsetTop - offset;

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
