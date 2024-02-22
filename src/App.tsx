import React, { useEffect } from "react";
import Tabs from "./components/Footer/Tabs";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function AppComp() {
  function ScreenSizeCheck() {
    return (
      window.screen && window.screen.width < 500 && window.screen.height < 500
    );
  }

  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      localStorage.setItem("uid", uuidv4());
    }
  }, []);

  const notCompatible = ScreenSizeCheck();

  if (notCompatible) {
    return (
      <div className=" w-full   fade-in flex-col h-screen flex justify-center items-center">
        <span className="text-xs font-semibold text-zinc-400 py-3 ">
          Not optimized for this size
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

const App = React.memo(AppComp);

export default App;
