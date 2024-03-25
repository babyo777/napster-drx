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
import Lyric from "./Lyric";

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
                <Lyric lyric={lyric.lyrics} index={index} />
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
