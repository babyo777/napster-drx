import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { RiDownloadLine } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { FaApple } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { MdInstallMobile, MdOutlineAndroid } from "react-icons/md";
import {
  RiSafariFill,
  RiChromeFill,
  RiHomeLine,
  RiHeadphoneLine,
} from "react-icons/ri";
import { FiShare } from "react-icons/fi";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Download() {
  const [ios, SetIos] = useState<boolean>(false);
  const [android, SetAndroid] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger className="p-0 m-0 flex">
        <Button
          asChild
          className=" text-2xl py-6 max-md:text-base   rounded-lg space-x-1"
        >
          <div>
            <RiDownloadLine />
            <p>Download</p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl  justify-center  flex gap-4 py-11 pb-7  w-fit max-md:w-[77dvw] ${
          !ios ? "px-16 " : "px-11"
        }  max-md:flex-wrap `}
      >
        <div className=" text-center space-y-2">
          {!ios ? (
            <>
              <div
                onClick={() => (SetIos((prev) => !prev), SetAndroid(false))}
                title="ios"
                className="flex text-9xl text-zinc-300 hover:text-zinc-100 hover:scale-105 transition-all duration-300 cursor-pointer bg-white/10 shadow-md  p-5 rounded-xl "
              >
                <FaApple />
              </div>
              <p className=" font-semibold">IOS</p>
            </>
          ) : (
            <>
              <div
                title="ios"
                className="flex text-7xl text-zinc-300 hover:text-zinc-100 hover:scale-105 transition-all duration-300 cursor-pointer bg-white/10 shadow-md  p-5 max-md:p-4 rounded-xl "
              >
                <QRCodeSVG value={window.location.origin} />
              </div>
              <p
                className="hover:text-white transition-all duration-300 font-semibold text-zinc-300 text-base cursor-pointer"
                onClick={() => SetIos((prev) => !prev)}
              >
                Go Back
              </p>
            </>
          )}
        </div>

        <div className=" text-center space-y-2">
          {!ios ? (
            <>
              <div
                onClick={() => (SetIos((prev) => !prev), SetAndroid(true))}
                title="android"
                className="flex text-9xl text-zinc-300 hover:text-zinc-100 hover:scale-105 transition-all duration-300 cursor-pointer bg-white/10 shadow-md  p-5 rounded-xl "
              >
                <MdOutlineAndroid />
              </div>
              <p className=" font-semibold">Android</p>{" "}
            </>
          ) : (
            <ul className="text-lg text-start space-y-1 max-md:py-0 whitespace-nowrap py-5">
              <li className="flex items-center space-x-1">
                {!android ? <RiSafariFill /> : <RiChromeFill />}
                <p>{!android ? "Open in Safari" : "Open in Chrome"}</p>
              </li>
              <li className="flex items-center space-x-1">
                {!android ? <FiShare /> : <BsThreeDotsVertical />}
                <p>{!android ? "Tap on Share" : "Click on Three Dots"}</p>
              </li>
              <li className="flex items-center space-x-1">
                {!android ? <RiHomeLine /> : <MdInstallMobile />}
                <p>{!android ? "Add to Home Screen" : "Click on Install"}</p>
              </li>
              <li className="flex items-center space-x-1">
                <RiHeadphoneLine />
                <p>Enjoy Listening!</p>
              </li>
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
