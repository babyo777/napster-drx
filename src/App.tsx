import { useEffect } from "react";
import Tabs from "./components/Footer/Tabs";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      localStorage.setItem("uid", uuidv4());
    }
  }, []);

  return (
    <>
      <Outlet />
      <Tabs />
    </>
  );
}

export default App;
