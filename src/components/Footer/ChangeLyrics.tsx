import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export function ChangeLyrics({
  lyrics,
}: {
  lyrics?: [
    {
      time: number | string;
      lyrics: string;
    }
  ];
}) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.checked
      ? e.currentTarget.parentElement
          ?.querySelector("p")
          ?.classList.add("bg-zinc-700")
      : e.currentTarget.parentElement
          ?.querySelector("p")
          ?.classList.remove("bg-zinc-700");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute flex space-x-2 items-center z-10 mt-[150%] bg-zinc-800/30 px-4 py-1.5 rounded-lg">
          <p className=" text-sm">Choose Lyrics</p>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[80dvw] bg-zinc-950/85 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Select Lyrics to Share</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="text-2xl font-bold overflow-y-scroll space-y-3 max-h-[35vh]">
          {lyrics
            ?.filter((l) => l.lyrics !== "")
            .map((lyric, index) => (
              <div key={index}>
                <label htmlFor={lyric.lyrics + index}>
                  <input
                    hidden
                    type="checkbox"
                    id={lyric.lyrics + index}
                    value={lyric.time}
                    onChange={handleCheckboxChange}
                    className="bg-zinc-700"
                  />

                  <p className=" bg-zinc-900/30  px-3 py-1.5 rounded-xl ">
                    {lyric.lyrics}
                  </p>
                </label>
              </div>
            ))}
        </div>

        <DialogFooter>
          <Button variant={"secondary"} className=" rounded-xl">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
