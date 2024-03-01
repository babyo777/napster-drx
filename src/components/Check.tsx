import { useEffect, useState } from "react";
import App from "@/App";
import InstallNapster from "./InstallNapster";
import { Desktop } from "./Desktop";
import InstallNapsterAndroid from "@/Testing/AndInstaller";
import StartLoader from "./Loaders/StartLoader";

function Check() {
  const [check, setCheck] = useState<boolean>(true);
  const [isStandalone, setIsStandalone] = useState<boolean>();
  const [graphic, setGraphic] = useState<boolean>();
  const [hardwareConcurrency, setHardwareConcurrency] = useState<number | null>(
    null
  );

  const isIPhone = /iPhone/i.test(navigator.userAgent);
  const isDesktop = window.innerWidth > 786;
  const checkGpuCapabilities = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");

    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : null;

      return renderer;
    }

    return null;
  };

  useEffect(() => {
    const t = setTimeout(() => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      const hardwareConcurrency = navigator.hardwareConcurrency || null;
      setHardwareConcurrency(hardwareConcurrency);
      setIsStandalone(isStandalone);
      setGraphic(checkGpuCapabilities());
      setCheck(false);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const isiPad = navigator.userAgent.match(/iPad/i) !== null;

  if (isDesktop || isiPad) {
    return <Desktop desktop={isDesktop} iPad={isiPad} />;
  }
  if (
    isStandalone &&
    hardwareConcurrency &&
    hardwareConcurrency >= 4 &&
    graphic
  ) {
    return <App />;
  }

  return (
    <>
      {check && navigator.onLine ? (
        <StartLoader />
      ) : (
        <>{isIPhone ? <InstallNapster /> : <InstallNapsterAndroid />}</>
      )}
    </>
  );
}

export default Check;
