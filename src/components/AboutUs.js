import { Box, Divider, Typography } from "@mui/material";

const yearsSince = (year) => new Date().getFullYear() - year;

const profiles = [
  {
    name: "Krishna Tamminana",
    image: "/images/krishnaPicture.png",
    imageAlt: "Krishna Tamminana",
    paragraphs: [
      <>Krishna is the President and Founder of Simutopia<sup>®</sup>. He holds a B.Tech degree in Mechanical Engineering from IIT Madras (2003), an M.S.M.E degree from The Ohio State University (2005) and has {yearsSince(2005)}+ years of experience in engineering, simulation, and analysis.</>,
      "At MathWorks, Krishna worked with clients in their adoption of a model-based design approach, primarily, in modeling multi-domain physical systems for controls design. Industries served include Automotive, Aerospace, Industrial Machinery, and Medical Devices.",
      "At Manitowoc Cranes R&D, Krishna played a key role in the development of a hardware-in-the-loop simulation platform for automated testing of controls software.",
      "At Walt Disney Imagineering, Krishna was responsible for developing a digital animation tools pipeline for the creation of Animatronic figures. He worked on system integration of several figures in attractions including Frozen Ever After and Star Wars: Galaxy's Edge. He also led the development of dynamic simulation models of track-based and trackless ride systems, including automated guided vehicles, for motion analysis and control systems design.",
      "Krishna enjoys playing badminton, biking with his kids, and watching movies.",
    ],
  },
  {
    name: "Gabriel King",
    image: "/images/gabePicture.png",
    imageAlt: "Gabriel King",
    reversed: true,
    paragraphs: [
      <>Gabriel is the Lead Engineer for Simutopia<sup>®</sup>. He holds a B.S. in Mechanical Engineering from the University of Central Florida (2015) and has {yearsSince(2014)}+ years of experience in engineering.</>,
      "Prior to his engineering career, Gabriel spent 6 years working as a technician at an automotive shop, working on everything from custom-built high horsepower drag race engines to replacing brake pads on a 15-year-old commuter car.",
      "At Walt Disney Parks & Resorts, Gabriel created systems-level ride timing and capacity simulations for early concept and in-production theme park attractions. He used MATLAB to design dynamic simulations of ride vehicles to support ride design. He was also part of the ride controls development and testing of a trackless ride system, including instrumented testing to characterize vehicle performance, failure responses, and navigation algorithms.",
      "Gabriel worked as a Project Engineer for Dreamscape Immersive on location-based Virtual Reality experiences. He was responsible for designing and manufacturing the physical elements to make a virtual world come to life.",
      "As a Systems Engineer for Walt Disney Imagineering, Gabriel designed and executed extensive ride vehicle tests to support the turnover and opening of Star Wars: Rise of the Resistance. He also worked on the Systems design of a new attraction to ensure guest safety was achieved, the Creative intent was met, and that the Mechanical, Electrical, and Controls designs would integrate into a functional attraction.",
      "When he's not working on building a new dynamic simulation, Gabriel enjoys Mountain Biking, Philosophy, woodworking, and sports cars.",
    ],
  },
  {
    name: "Pavan Venkat Pabbineedi",
    image: "/images/PavanPicture.png",
    imageAlt: "Pavan Venkat Pabbineedi",
    reversed: true,
    paragraphs: [
      <>Pavan is a Systems Engineer at Simutopia<sup>®</sup>. He holds a B.Tech degree in Mechanical Engineering from the Indian Institute of Information Technology, Design and Manufacturing (IIITD&M), Kancheepuram (2025).</>,
      "During his time at IIITD&M, Pavan led a team in the design and fabrication of a remote-control aircraft. This project provided direct, practical experience in airframe development, team leadership, and applying computational analysis to solve complex engineering challenges, providing him with a strong foundation in technical problem-solving.",
      "Outside of work, Pavan enjoys playing basketball, cricket and watching movies.",
    ],
  },
  {
    name: "Veera Venkata Ramana Senapathi",
    image: "/images/RamanaPicture.jpeg",
    imageAlt: "Veera Venkata Ramana Senapathi",
    paragraphs: [
      <>Ramana is a Systems Engineer at Simutopia<sup>®</sup>. He holds a B.Tech degree in Mechanical Engineering from the Indian Institute of Information Technology, Design and Manufacturing (IIITD&M), Kancheepuram (2025).</>,
      "He previously contributed to the R&D team at Tharam-Thiran Green Energy Flow Private Limited, where he developed multi-physics based simulation models to optimize electrolyte flow in batteries. This experience established his core proficiency in Computational Fluid Dynamics (CFD) and dynamic systems modeling, skills he now leverages to solve real-world engineering challenges at Simutopia.",
      "Outside of work, Ramana enjoys playing cricket, watching movies, and managing his farm.",
    ],
  },
  {
    name: "Durga Prasad Matta",
    image: "/images/DurgaPicture.jpeg",
    imageAlt: "Prasad",
    reversed: true,
    paragraphs: [
      <>Prasad is a Systems Engineer at Simutopia<sup>®</sup>. He holds a B.Tech degree in Mechanical Engineering from GIET College of Engineering (2022) and an M.Tech degree in Machine Design from Andhra University (2026).</>,
      'For his M.Tech dissertation, Prasad completed a project titled "Model-Based Design of a Fuzzy Logic Series Regenerative Braking Strategy for Electric Vehicles Considering 7DOF Dynamic Load Transfer"',
      "Prior to joining Simutopia, Prasad gained industry training as an Automotive Automation and Robotics Engineer at the AU APSSDC Siemens Centre of Excellence, where he developed skills in CAD design and robot operations.",
      "Outside of work, Prasad enjoys reading novels, cooking and watching anime.",
    ],
  },
];

const AboutUs = () => (
  <Box component="section" id="aboutUsTarget">
    <Box sx={{ bgcolor: "#212529", color: "common.white", textAlign: "center", py: 1 }}>
      <Typography variant="h2" component="h2" sx={{ fontSize: { xs: "3rem", md: "5rem" }, my: 0 }}>
        ABOUT US
      </Typography>
    </Box>
    {profiles.map(({ name, image, imageAlt, paragraphs, reversed }) => (
      <Box
        key={name}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: reversed ? "2fr minmax(300px, 1fr)" : "minmax(300px, 1fr) 2fr",
          },
          gridTemplateAreas: {
            xs: '"image" "bio"',
            lg: reversed ? '"bio image"' : '"image bio"',
          },
          alignItems: "stretch",
        }}
      >
        <Box
          component="img"
          src={image}
          alt={imageAlt}
          sx={{
            gridArea: "image",
            width: "100%",
            height: "100%",
            minHeight: { lg: 360 },
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            gridArea: "bio",
            p: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: reversed ? { xs: "left", lg: "right" } : "left",
          }}
        >
          <Typography variant="h4" component="h3" sx={{ mb: 1 }}>
            {name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {paragraphs.map((paragraph, index) => (
            <Typography key={index} variant="body1" component="p" sx={{ mb: 1.5 }}>
              {paragraph}
            </Typography>
          ))}
        </Box>
        <Divider sx={{ gridColumn: "1 / -1", borderBottomWidth: 3 }} />
      </Box>
    ))}
  </Box>
);

export default AboutUs;
