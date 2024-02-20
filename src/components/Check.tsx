import { useEffect, useState } from "react";
import Loader from "./Loaders/Loader";
import App from "@/App";
import InstallNapster from "./InstallNapster";
import { Desktop } from "./Desktop";

function Check() {
  const [isDesktop, setIsDesktop] = useState<boolean>();
  const [check, setCheck] = useState<boolean>(true);
  const [isStandalone, setIsStandalone] = useState<boolean>();
  const [graphic, setGraphic] = useState<boolean>();
  const [hardwareConcurrency, setHardwareConcurrency] = useState<number | null>(
    null
  );

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
    const c = setTimeout(() => {
      const isDesktop = window.innerWidth > 786;
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      const hardwareConcurrency = navigator.hardwareConcurrency || null;
      setHardwareConcurrency(hardwareConcurrency);
      setIsStandalone(isStandalone);
      setIsDesktop(isDesktop);
      setGraphic(checkGpuCapabilities());
      setCheck(false);
    }, 1100);
    return () => clearTimeout(c);
  }, []);

  if (isDesktop) {
    return <Desktop />;
  }
  if (
    !isStandalone ||
    (isStandalone && hardwareConcurrency && hardwareConcurrency >= 4 && graphic)
  ) {
    return <App />;
  }

  return (
    <>
      {check ? (
        <div className=" w-full   fade-in flex-col h-screen flex justify-center items-center">
          <Loader size="37" stroke="2" />
          <span className="text-xs font-semibold text-zinc-400 py-3 ">
            Checking Device Status
          </span>
        </div>
      ) : (
        <InstallNapster />
      )}
    </>
  );
}

export default Check;
