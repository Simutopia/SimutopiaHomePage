import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Globe from "react-globe.gl";
import { flagSvgMarkup } from "./FlagIcon";
import offices from "../data/offices";
import { colors } from "../theme/tokens";

const EARTH_TEXTURE =
  `${process.env.PUBLIC_URL || ""}/images/globe/earth-blue-marble.jpg`;
const BUMP_TEXTURE =
  `${process.env.PUBLIC_URL || ""}/images/globe/earth-topology.png`;
const BACKGROUND_TEXTURE =
  `${process.env.PUBLIC_URL || ""}/images/globe/night-sky.png`;

const createPinElement = (office, isActive, onSelect) => {
  const root = document.createElement("button");
  root.type = "button";
  root.setAttribute("aria-label", `${office.name} location`);
  root.style.cssText = [
    "appearance:none",
    "border:0",
    "background:transparent",
    "padding:0",
    "cursor:pointer",
    "display:flex",
    "flex-direction:column",
    "align-items:center",
    "gap:4px",
    "transform:translateY(-8px)",
    "pointer-events:auto",
  ].join(";");

  const flagWrap = document.createElement("span");
  flagWrap.style.cssText = [
    "display:inline-flex",
    "align-items:center",
    "justify-content:center",
    `width:${isActive ? 34 : 28}px`,
    `height:${isActive ? 20 : 16}px`,
    "border-radius:3px",
    "overflow:hidden",
    "box-shadow:0 0 0 2px rgba(255,255,255,0.55), 0 0 14px rgba(0,0,0,0.45)",
    "background:#fff",
  ].join(";");
  flagWrap.innerHTML = flagSvgMarkup[office.flagCode] || "";

  const label = document.createElement("span");
  label.textContent = office.city;
  label.style.cssText = [
    "color:#fff",
    'font:600 12px/1.2 "IBM Plex Sans",Segoe UI,sans-serif',
    "text-shadow:0 1px 4px rgba(0,0,0,0.75)",
    "white-space:nowrap",
    `opacity:${isActive ? 1 : 0.85}`,
  ].join(";");

  root.appendChild(flagWrap);
  root.appendChild(label);
  root.addEventListener("click", (event) => {
    event.stopPropagation();
    onSelect(office.id);
  });

  return root;
};

const OfficeGlobe = ({ activeOfficeId, onSelectOffice }) => {
  const containerRef = useRef(null);
  const globeRef = useRef(null);
  const [size, setSize] = useState({ width: 480, height: 480 });
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const updateSize = () => {
      const width = node.clientWidth || 480;
      const height = Math.min(Math.max(width, 320), 560);
      setSize({ width, height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return undefined;

    const active =
      offices.find((office) => office.id === activeOfficeId) || offices[0];

    globe.pointOfView(
      { lat: active.lat - 8, lng: active.lng, altitude: 1.85 },
      prefersReducedMotion ? 0 : 1000
    );

    if (typeof globe.controls === "function") {
      const controls = globe.controls();
      controls.autoRotate = !prefersReducedMotion;
      controls.autoRotateSpeed = 0.45;
      controls.enableZoom = false;
    }

    return undefined;
  }, [activeOfficeId, prefersReducedMotion, size.width]);

  const arcsData = useMemo(
    () => [
      {
        startLat: offices[0].lat,
        startLng: offices[0].lng,
        endLat: offices[1].lat,
        endLng: offices[1].lng,
        color: [colors.accentSoft, colors.accentBlueSoft],
      },
    ],
    []
  );

  const markerData = useMemo(
    () =>
      offices.map((office) => ({
        ...office,
        isActive: office.id === activeOfficeId,
      })),
    [activeOfficeId]
  );

  const handlePinSelect = useCallback(
    (officeId) => {
      onSelectOffice?.(officeId);
    },
    [onSelectOffice]
  );

  const htmlElement = useCallback(
    (office) => createPinElement(office, office.isActive, handlePinSelect),
    [handlePinSelect]
  );

  return (
    <Box
      ref={containerRef}
      aria-label="Globe showing Simutopia office locations in the United States and India"
      sx={{
        width: "100%",
        maxWidth: 560,
        mx: "auto",
        height: size.height,
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#0b1220",
      }}
    >
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        backgroundImageUrl={BACKGROUND_TEXTURE}
        globeImageUrl={EARTH_TEXTURE}
        bumpImageUrl={BUMP_TEXTURE}
        atmosphereColor={colors.accentSoft}
        atmosphereAltitude={0.12}
        pointsData={markerData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.08}
        pointRadius={0.45}
        pointLabel="name"
        htmlElementsData={markerData}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.02}
        htmlElement={htmlElement}
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={prefersReducedMotion ? 0 : 2500}
        arcStroke={0.6}
        animateIn={!prefersReducedMotion}
        onGlobeReady={() => {
          const globe = globeRef.current;
          if (!globe || typeof globe.controls !== "function") return;
          const controls = globe.controls();
          controls.autoRotate = !prefersReducedMotion;
          controls.autoRotateSpeed = 0.45;
          controls.enableZoom = false;
        }}
      />
    </Box>
  );
};

export default OfficeGlobe;
