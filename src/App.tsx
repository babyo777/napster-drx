import { useEffect } from "react";
import { Desktop } from "./components/Desktop";
import Tabs from "./components/Footer/Tabs";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function App() {
  const isDesktop = window.innerWidth > 786;
  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      localStorage.setItem("uid", uuidv4());
    }
  }, []);

  if (isDesktop) {
    return <Desktop />;
  }
  return (
    <>
      <Outlet />
      <Tabs />
    </>
  );
}

export default App;
