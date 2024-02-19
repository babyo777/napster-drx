function InstallNapster() {
  return (
    <div
      className="bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
    min-h-screen text-black flex flex-col p-4"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Install Napster on Your Device
        </h2>
        <p className="text-gray-600">
          Follow these simple steps to install Napster on your Android or iOS
          device.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">For Android Users:</h3>
        <ol className="list-decimal pl-4">
          <li>
            Open Chrome or another browser on your Android phone, like Chrome.
          </li>
          <li>
            Access the browser menu: Look for three dots in the top-right corner
            of the screen and tap on them.
          </li>
          <li>
            Find "Add to Home screen" or "Install": Look for an option like "Add
            to Home screen" or "Install" in the menu.
          </li>
          <li>
            Confirm the installation: Follow the instructions to finish
            installing. You might need to name the app or pick an icon.
          </li>
          <li>
            Look for the app on your home screen: After installing, you'll see
            the PWA icon on your phone's home screen. Tap it to use the app.
          </li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">For iOS Users (Safari):</h3>
        <ol className="list-decimal pl-4">
          <li>Open Safari, the internet browser on your iPhone.</li>
          <li>
            Tap the Share icon: Look for a square with an arrow pointing up at
            the bottom of your screen and tap on it.
          </li>
          <li>
            Find "Add to Home Screen": In the sharing options, look for "Add to
            Home Screen."
          </li>
          <li>
            Name the app and confirm: Follow the instructions to finish. You
            might need to give the app a name or choose an icon.
          </li>
          <li>
            Use the app from your home screen: Once installed, you'll see the
            PWA icon on your iPhone's home screen. Tap it to open and use the
            app.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default InstallNapster;
