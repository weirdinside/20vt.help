import { useEffect } from "react";

function imageMapResize() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/ImageMapResizer.min.js";
    script.async = true;

    script.onload = () => {
      if (window.imageMapResize) {
        window.imageMapResize();
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
}

export default imageMapResize;
