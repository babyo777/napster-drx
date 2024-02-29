import { useEffect, useState } from "react";
import App from "@/App";
import InstallNapster from "./InstallNapster";
import { Desktop } from "./Desktop";
import InstallNapsterAndroid from "@/Testing/AndInstaller";

function Check() {
  const [isDesktop, setIsDesktop] = useState<boolean>();
  const [check, setCheck] = useState<boolean>(true);
  const [isStandalone, setIsStandalone] = useState<boolean>();
  const [graphic, setGraphic] = useState<boolean>();
  const [hardwareConcurrency, setHardwareConcurrency] = useState<number | null>(
    null
  );
  const isIPhone = /iPhone/i.test(navigator.userAgent);

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
    const isDesktop = window.innerWidth > 786;
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;
    const hardwareConcurrency = navigator.hardwareConcurrency || null;
    setIsDesktop(isDesktop);
    setHardwareConcurrency(hardwareConcurrency);
    setIsStandalone(isStandalone);
    setGraphic(checkGpuCapabilities());
    setCheck(false);
  }, []);

  const isiPad = navigator.userAgent.match(/iPad/i) !== null;

  if (isDesktop || isiPad) {
    return <Desktop />;
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
        <div className=" w-full   fade-in flex-col h-screen flex justify-center items-center">
          <div className="loader">
            <div className="loader__circle"></div>
            <div className="loader__circle"></div>
            <div className="loader__circle"></div>
            <div className="loader__circle"></div>
            <div className="loader__circle"></div>
          </div>
          <span className="text-xs font-semibold pt-7 text-zinc-400 py-7 ">
            Checking Device Status
          </span>
        </div>
      ) : (
        <>{isIPhone ? <InstallNapster /> : <InstallNapsterAndroid />}</>
      )}
    </>
  );
}

export default Check;
