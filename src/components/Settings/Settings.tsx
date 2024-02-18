import { IoSettingsOutline } from "react-icons/io5";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HowToUse } from "../HowToUse";
import { useCallback } from "react";
import { Token } from "../Toke";

function Settings() {
  const handleReset = useCallback(() => {
    const reset = confirm("Are you sure you want to reset");
    if (reset) localStorage.clear(), alert("successfully reset");
    location.reload();
  }, []);

  const handleLoad = useCallback(() => {
    const l = prompt("Enter shared link");
    if (l && l?.trim() != "") {
      window.location.href = l;
    }
  }, []);

  return (
    <Drawer>
      <DrawerTrigger>
        <IoSettingsOutline className="h-7 w-7 text-red-500" />
      </DrawerTrigger>
      <DrawerContent className="px-5">
        <DrawerHeader>
          <DrawerTitle className="text-zinc-400 font-bold">
            Napster Settings
          </DrawerTitle>
        </DrawerHeader>
        <p
          onClick={handleLoad}
          className=" rounded-xl py-2.5 mb-3 bg-secondary flex justify-center  text-base"
        >
          Load Shared Playlist
        </p>
        <Token />
        <HowToUse />
        <p
          onClick={handleReset}
          className=" rounded-xl py-2.5 mt-3 bg-secondary flex justify-center  text-base text-red-400"
        >
          Reset
        </p>

        <DrawerFooter className=" items-center">
          <span className="text-xs text-zinc-300">Version - 1.1.0 beta</span>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Settings;
