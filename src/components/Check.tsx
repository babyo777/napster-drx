import { useEffect, useState } from "react";
import Loader from "./Loaders/Loader";
import App from "@/App";
import InstallNapster from "./InstallNapster";
import { Desktop } from "./Desktop";

function Check() {
  const [isDesktop, setIsDesktop] = useState<boolean>();
  const [check, setCheck] = useState<boolean>(true);
  const [isStandalone, setIsStandalone] = useState<boolean>();

  useEffect(() => {
    const c = setTimeout(() => {
      const isDesktop = window.innerWidth > 786;
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      setIsStandalone(isStandalone);
      setIsDesktop(isDesktop);
      setCheck(false);
    }, 1100);
    return () => clearTimeout(c);
  }, []);

  if (isDesktop) {
    return <Desktop />;
  }
  if (isStandalone) {
    return <App />;
  }

  return (
    <>
      {check ? (
        <div className=" w-full fade-in flex-col h-screen flex justify-center items-center">
          <Loader />
          <span className="text-xs text-zinc-300 py-3 ">
            Checking device compatibility
          </span>
        </div>
      ) : (
        <InstallNapster />
      )}
    </>
  );
}

export default Check;
