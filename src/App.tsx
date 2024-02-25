import React, { useEffect } from "react";
import Tabs from "./components/Footer/Tabs";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DATABASE_ID, ID, NEW_USER, db } from "./appwrite/appwriteConfig";

function AppComp() {
  function ScreenSizeCheck() {
    const isIPhone = /iPhone/i.test(navigator.userAgent);
    const isIPhone11OrAbove =
      isIPhone && window.screen.width >= 414 && window.screen.height >= 896; // iPhone 11 or above
    return (
      isIPhone11OrAbove ||
      (window.screen && window.screen.width < 500 && window.screen.height < 500)
    );
  }

  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      localStorage.setItem("uid", uuidv4());
      try {
        db.createDocument(DATABASE_ID, NEW_USER, ID.unique(), {
          user: localStorage.getItem("uid") || "error",
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const notCompatible = ScreenSizeCheck();

  if (notCompatible) {
    return (
      <div className=" w-full   fade-in flex-col h-screen flex justify-center items-center">
        <span className="text-xs font-semibold text-zinc-400 py-3 ">
          Not optimized for your device
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
