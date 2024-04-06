import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { Button } from "./ui/button";
import { SiDocsdotrs, SiGithubsponsors } from "react-icons/si";
import Download from "@/Landing Page/Download";
import { useNavigate } from "react-router-dom";
function Desktop() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/docs/");
  };
  return (
    <>
      <div className="animate-fade-up">
        <header className=" px-11 max-md:px-5 py-4 bg-transparent fixed w-full backdrop-blur-xl justify-between flex">
          <h1 className=" font-semibold text-2xl max-md:text-xl">Napster</h1>
          <ul className=" flex text-lg text-zinc-200  items-center space-x-3">
            <a
              href="https://github.com/babyo77/napsterDrx-Public"
              target="_blank"
            >
              <FiGithub className=" hover:text-white duration-300 transition-all cursor-pointer" />
            </a>
            <a href="https://twitter.com/tanmay11117" target="_blank">
              <FaXTwitter className="hover:text-white duration-300 transition-all cursor-pointer" />
            </a>
          </ul>
        </header>

        <div className="bg-[#09090B] font-semibold w-full min-h-screen flex justify-center items-center px-9 max-lg:text-4xl max-md:text-4xl text-7xl flex-col space-y-7 text-center max-md:px-4 overflow-hidden fixed -z-10">
          <div>
            <p className="">Enjoy Music Without Interruptions</p>
          </div>
          <div className="flex space-x-2">
            <Download />

            <Button
              onClick={handleNavigate}
              className=" text-2xl py-6  max-md:text-base rounded-lg space-x-1"
            >
              <SiDocsdotrs />
              <p>Docs</p>
            </Button>
          </div>
        </div>
        <footer className=" fixed text-zinc-400 hover:text-white transition-all duration-300  bottom-0 flex justify-center items-center w-full py-2.5 text-xs space-x-1">
          <SiGithubsponsors />
          <a
            className=" font-semibold"
            href="https://www.instagram.com/babyo7_/"
            target="_blank"
          >
            From Babyo7_
          </a>
        </footer>
      </div>
    </>
  );
}

export { Desktop };
