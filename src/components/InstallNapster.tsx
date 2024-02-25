import "react-lazy-load-image-component/src/effects/blur.css";
function InstallNapster() {
  return (
    <div className="bg-white fade-in text-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-svh space-y-5 flex flex-col p-11 justify-center items-center">
      <h2 className="text-lg text-center font-semibold ">
        Install Napster-drx on Your Device
      </h2>
      <a
        className="underline underline-offset-4 text-blue-500"
        href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DiOS"
      >
        Google Reference
      </a>
      <ul className="flex flex-col px-1.5 w-full text-start">
        <li className="mb-2">
          <span className="font-bold text-xl ">iOS (iPhone/Safari):</span>
        </li>
        <li className="mb-2">
          <span className="font-bold">1.</span> Tap on the share icon at the
          bottom center or top right of the screen.
        </li>
        <li className="mb-2">
          <span className="font-bold">2.</span> Scroll down and select "Add to
          Home Screen."
        </li>
        <li>
          <span className="font-bold">3.</span> Customize the app's name if
          needed and tap "Add" on the top right.
        </li>

        <li className="mt-4 mb-2">
          <span className="font-bold text-xl">Android (Chrome):</span>
        </li>
        <li className="mb-2">
          <span className="font-bold">1.</span> Tap the three vertical dots in
          the top right corner to open the menu.
        </li>
        <li className="mb-2">
          <span className="font-bold">2.</span> Select "Add to Home screen" or
          "Install."
        </li>
        <li>
          <span className="font-bold">3.</span> Confirm the addition by tapping
          "Add" or "Install."
        </li>
      </ul>
      <span className=" font-semibold underline underline-offset-2 text-zinc-300">
        By babyo7_
      </span>
    </div>
  );
}

export default InstallNapster;
