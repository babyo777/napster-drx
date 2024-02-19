function InstallNapster() {
  return (
    <div className=" bg-white fade-in text-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] h-svh space-y-5 flex flex-col p-4 justify-center  items-center">
      <h2 className="text-2xl text-center  mb-2">
        Install Napster on Your Device
      </h2>
      <img
        src="/install.webp"
        alt="Smartphone"
        className="max-w-full rounded-2xl h-auto"
      />
    </div>
  );
}

export default InstallNapster;
