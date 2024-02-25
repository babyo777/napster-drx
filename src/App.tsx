import React, { useEffect } from "react";
import Tabs from "./components/Footer/Tabs";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DATABASE_ID, ID, NEW_USER, db } from "./appwrite/appwriteConfig";

function AppComp() {
  function ScreenSizeCheck() {
    const isIPhone = /iPhone/i.test(navigator.userAgent);
    return isIPhone;
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

  const Compatible = ScreenSizeCheck();

  if (!Compatible) {
    return (
      <div className=" w-full   fade-in flex-col h-screen flex justify-center items-center">
        <span className="text-base font-semibold text-zinc-400 py-3 ">
          Not optimized for Android now
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
