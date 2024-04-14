import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export function Token() {
  const token = localStorage.getItem("uid") || "";
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(token);
      alert("Token Copied to Clipboard");
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <p className=" animate-fade-up font-semibold  rounded-xl py-2.5 mt-3 bg-neutral-900  w-full text-base">
          Token
        </p>
      </DrawerTrigger>
      <DrawerContent className="w-full h-dvh rounded-2xl px-5 rounded-none">
        <DrawerHeader>
          <DrawerTitle className="animate-fade-down">
            Your access token
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col items-center space-y-2 h-full justify-center">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            className="animate-fade-up"
            id="link"
            disabled
            defaultValue={localStorage.getItem("uid") || ""}
            readOnly
          />

          <Button
            type="submit"
            size="sm"
            variant={"secondary"}
            className="px-3 w-full bg-zinc-800 animate-fade-up hover:bg-zinc-100/20 text-white"
          >
            <span className="sr-only" onClick={handleCopy}>
              Copy
            </span>
            <CopyIcon className="h-4 w-4 " onClick={handleCopy} />
          </Button>
        </div>
        <DrawerFooter className="sm:justify-start px-0">
          <DrawerClose asChild>
            <Button
              asChild
              variant={"secondary"}
              className=" py-5 w-full animate-fade-up rounded-xl"
            >
              <p>Close</p>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
