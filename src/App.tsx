import React, { useEffect, useState } from "react";
import Tabs from "./components/Footer/Tabs";
import { Outlet } from "react-router-dom";

function AppComp() {
  const [token, setToken] = useState<string>("none");
  const [tester, setTester] = useState<boolean>();
  function ScreenSizeCheck() {
    const isIPhone = /iPhone/i.test(navigator.userAgent);
    return isIPhone;
  }

  useEffect(() => {
    if (token == "babyo7_gtasisgta779") {
      setTester(true);
    }
  }, [token]);

  const handleTester = async () => {
    const token = prompt("Enter your testing Token");
    setToken(token || "none");
  };

  const Compatible = ScreenSizeCheck();

  if (tester) {
    return (
      <>
        <Outlet />
        <Tabs />
      </>
    );
  }

  if (!Compatible) {
    return (
      <div className=" w-full   fade-in flex-col h-screen flex justify-center items-center">
        <span className="text-base font-semibold text-zinc-400 py-3 px-4">
          Not optimized for Android now{" "}
          <span onClick={handleTester} className="text-red-500">
            Are you a tester?
          </span>
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
