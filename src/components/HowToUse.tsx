import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function HowToUse() {
  return (
    <Dialog>
      <DialogTrigger>
        <p className=" rounded-xl py-2.5 mt-3 bg-secondary w-full text-base">
          How to use?
        </p>
      </DialogTrigger>
      <DialogContent className="w-[87vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-extrabold  text-lg">Pro Tip</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="m">
          <ul className="flex flex-col gap-2 pb-4 text-sm -mt-4 ml-2">
            <li>Step 1. Copy your Playlist URL.</li>
            <li>Step 2. Search Spotify to Youtube.</li>
            <li>Step 3. Convert to Youtube Playlist.</li>
          </ul>
          <AspectRatio ratio={3 / 3}>
            <LazyLoadImage
              width="100%"
              height="100%"
              effect="blur"
              src="/demo3.jpeg"
              alt="install-NGLdrx"
              className=" border rounded-xl object-cover h-[100%] w-[100%]"
            />
          </AspectRatio>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              asChild
              variant={"secondary"}
              className="font-bold py-5 w-full rounded-xl"
            >
              <p>Start listening</p>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { HowToUse };
