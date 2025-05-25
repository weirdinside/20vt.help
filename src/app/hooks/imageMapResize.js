export default function imageMapResize() {
  if (
    typeof window !== "undefined" &&
    typeof window.imageMapResize !== "function"
  ) {
    const script = document.createElement("script");
    script.src = "/js/ImageMapResizer.min.js";
    script.async = true;
    script.onload = () => {
      window.imageMapResize?.();
    };
    document.body.appendChild(script);
  } else {
    window.imageMapResize?.();
  }
}
