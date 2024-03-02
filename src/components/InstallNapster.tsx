import "react-lazy-load-image-component/src/effects/blur.css";
import { AppScreenshots } from "./AppScreenshots";
function InstallNapster() {
  return (
    <div className="bg-white fade-in text-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-svh space-y-3 flex flex-col px-11 justify-center items-center py-7">
      <h2 className="text-xs text-center -mb-3 font-semibold ">
        add napster-drx (a PWA app) to home screen
      </h2>
      <a
        className="underline underline-offset-4 text-[.7rem] text-zinc-400 font-semibold"
        href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DiOS"
      >
        learn more?
      </a>
      <AppScreenshots />
      <p className="text-xs text-center">
        made for ios users specially as they can't install any mod like android
        users can{" "}
      </p>
      <a
        href="https://instagram.com/babyo7_"
        className=" font-semibold underline text-xs underline-offset-2 text-zinc-300"
      >
        By babyo7_
      </a>
    </div>
  );
}

export default InstallNapster;
