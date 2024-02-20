import { useEffect } from "react";
import Tabs from "./components/Footer/Tabs";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function App() {
  function isiPhone() {
    return (
      window.matchMedia(
        "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
      ).matches || // iPhone 12 Pro
      window.matchMedia(
        "(device-width: 360px) and (device-height: 780px) and (-webkit-device-pixel-ratio: 3)"
      ).matches || // iPhone 12 Mini
      window.matchMedia(
        "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
      ).matches || // iPhone 12
      window.matchMedia("(max-width: 375px)").matches // Other iPhones with a width up to iPhone 12
    );
  }

  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      localStorage.setItem("uid", uuidv4());
    }
  }, []);

  const compatible = isiPhone();

  if (!compatible) {
    return (
      <div className=" w-full  px-5  fade-in flex-col h-screen flex justify-center items-center">
        <span className="text-base font-semibold text-zinc-400 py-3 ">
          Not optimized for you device{" "}
        </span>
      </div>
    );
  }

  return (
    <>
      <Outlet />
      <Tabs />
    </>
  );
}

export default App;
