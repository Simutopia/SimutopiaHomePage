import { colors } from "../theme/tokens";

const offices = [
  {
    id: "usa",
    name: "USA Office",
    city: "Tampa",
    lat: 28.148,
    lng: -82.37,
    lines: ["17221 Broadoak Dr.", "Tampa, FL 33647"],
    phone: "+1 (774) 207-8005",
    phoneHref: "tel:+17742078005",
    email: "consulting@simutopia.com",
    color: colors.accentSoft,
    flagCode: "us",
    flagLabel: "United States flag",
  },
  {
    id: "india",
    name: "India Office",
    city: "Visakhapatnam",
    lat: 17.723,
    lng: 83.336,
    lines: [
      "Simutopia (India) Private Limited",
      "4-60-5/4/1, Lawsons Bay Colony",
      "Visakhapatnam, Andhra Pradesh 530017",
    ],
    phone: "+91 89776 41377",
    phoneHref: "tel:+918977641377",
    email: "consulting@simutopia.com",
    color: colors.accentBlueSoft,
    flagCode: "in",
    flagLabel: "India flag",
  },
];

export default offices;
