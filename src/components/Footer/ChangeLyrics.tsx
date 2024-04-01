import { RootState } from "@/Store/Store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useCallback, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

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
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );
  const [count, setCount] = useState<number>(0);
  const handleSelect = useCallback((index: number) => {
    setCount(index);
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="m-0 p-0">
        <div className="break-words bg-black/25 text-2xl px-4 py-2 min-w-[77vw]  max-w-[77vw] text-left font-bold space-y-[1vh]">
          {lyrics && <p>{lyrics[count]?.lyrics}</p>}
        </div>
        <div className=" flex  space-x-2 items-center bg-black/30 py-3 px-3">
          <div className="overflow-hidden flex h-[3.3rem] w-[3.3rem]">
            <AspectRatio ratio={1 / 1}>
              <LazyLoadImage
                src={
                  playlist[currentIndex].thumbnailUrl.replace(
                    "w120-h120",
                    "w1080-h1080"
                  ) || "/favicon.jpeg"
                }
                width="100%"
                effect="blur"
                height="100%"
                alt="Image"
                visibleByDefault
                loading="lazy"
                className="rounded-lg object-cover h-[100%] w-[100%]"
              />
            </AspectRatio>
          </div>
          <div className=" font-normal text-left  break-words max-w-[55vw]">
            <p className="text-xl font-semibold  break-words truncate  max-w-[55vw]">
              {playlist[currentIndex]?.title}
            </p>
            <p
              className="-mt-0.5 text-sm 
             break-words max-w-[55vw]"
            >
              {playlist[currentIndex]?.artists[0]?.name}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="h-[100vh] bg-zinc-950 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Select Lyrics to Share</DialogTitle>
        </DialogHeader>

        <div className="text-2xl  font-bold overflow-y-scroll space-y-4 max-h-[100vh]">
          {lyrics
            ?.filter((l) => l.lyrics !== "")
            .map((lyrics, index) => (
              <DialogClose key={index}>
                <p
                  onClick={() => handleSelect(index)}
                  className="text-left bg-zinc-900/70 px-4 py-2 rounded-xl"
                  key={index}
                >
                  {lyrics.lyrics}
                </p>
              </DialogClose>
            ))}
        </div>

        <DialogFooter>
          <DialogClose className="w-full">
            <Button asChild variant={"secondary"} className="w-full rounded-xl">
              <p>Done</p>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
