function InstallNapster() {
  return (
    <div className="bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] min-h-screen flex flex-col p-4">
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
          <li>Open Chrome on your Android phone.</li>
          <li>
            Access the browser menu by tapping three dots in the top-right
            corner.
          </li>
          <li>Find "Add to Home screen" or "Install" in the menu.</li>
          <li>Confirm the installation instructions.</li>
          <li>Look for the app on your home screen and tap to use it.</li>
        </ol>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">For iOS Users (Safari):</h3>
        <ol className="list-decimal pl-4">
          <li>Open Safari on your iPhone.</li>
          <li>Tap the Share icon (square with arrow).</li>
          <li>Find "Add to Home Screen" in the sharing options.</li>
          <li>Name the app and confirm the instructions.</li>
          <li>Use the app from your iPhone's home screen.</li>
        </ol>
      </div>

      <div className="flex justify-center">
        <img
          src="/install.webp"
          alt="Smartphone"
          className="max-w-full rounded-2xl h-auto"
        />
      </div>
    </div>
  );
}

export default InstallNapster;
