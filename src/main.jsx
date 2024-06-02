import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import { createRoot } from "react-dom/client";
import Earth3D from "./Earth3D";



createRoot(document.getElementById("root")).render(
  <ARCanvas
    onCameraStreamReady={() => console.log("Camera stream ready")}
    onCameraStreamError={() => console.error("Camera stream error")}
    sourceType={"webcam"}
  >
    <ambientLight />
    <directionalLight position={[5, 3, 5]} intensity={1.5} />
    <ARMarker
      debug={true}
      params={{ smooth: true }}
      type={"pattern"}
      patternUrl={"data/patt.hiro"}
      onMarkerFound={() => {
        console.log("Marker Found");
      }}
    >
      <Earth3D />
    </ARMarker>
  </ARCanvas>
);
