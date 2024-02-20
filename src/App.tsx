import { useEffect } from "react";
import Tabs from "./components/Footer/Tabs";
import { Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function App() {
  function isiPhone() {
    return (
      window.matchMedia("(max-width: 360px)").matches ||
      window.matchMedia("(min-width: 361px) and (max-width: 375px)").matches ||
      window.matchMedia("(min-width: 376px) and (max-width: 428px)").matches
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
          <a
            href="https://your-napster.vercel.app"
            className="text-red-500 font-normal underline-offset-4 underline"
          >
            use old napster
          </a>
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
