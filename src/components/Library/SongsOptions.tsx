import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoAddSharp } from "react-icons/io5";
import { RiPlayListAddLine } from "react-icons/ri";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { PiQueue } from "react-icons/pi";
import { useCallback } from "react";
import { playlistSongs } from "@/Interface";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "@/Store/Player";
import { RootState } from "@/Store/Store";
import { SlOptions } from "react-icons/sl";

function SongsOptions({
  library,
  underline,
  music,
}: {
  music: playlistSongs;
  library?: boolean;
  underline?: boolean;
}) {
  const dispatch = useDispatch();
  const playlist = useSelector(
    (state: RootState) => state.musicReducer.playlist
  );
  const currentIndex = useSelector(
    (state: RootState) => state.musicReducer.currentIndex
  );
  const handleQueue = useCallback(() => {
    console.log(playlist.length);
    const newPlaylist = [...playlist];
    newPlaylist.splice(currentIndex + 1, 0, music);
    dispatch(setPlaylist(newPlaylist));
    console.log(playlist.length);
  }, [music, dispatch, playlist, currentIndex]);
  const handleBeat = useCallback(() => {
    alert("soon...");
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-0 p-0">
        <SlOptions className="h-5 w-5 text-zinc-400" />
        {!underline && (
          <div className="h-[.05rem] w-[8vw] bg-zinc-300/10 mt-[1.35rem] -ml-2"></div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-400/10 border-none rounded-lg backdrop-blur-2xl mx-4 -mt-5">
        <DropdownMenuItem
          onClick={handleBeat}
          className="flex items-center justify-between space-x-2"
        >
          <p className="text-base">Add to library</p>
          <IoAddSharp className="h-5 w-5" />
        </DropdownMenuItem>
        <div className="h-[.05rem] w-full bg-zinc-300/10 "></div>
        <DropdownMenuItem
          onClick={handleBeat}
          className="flex items-center justify-between space-x-2"
        >
          <p className="text-base">Add to a Playlist...</p>
          <RiPlayListAddLine className="h-[1.1rem] w-[1.1rem]" />
        </DropdownMenuItem>
        <div className="h-[.05rem] w-full bg-zinc-300/10 "></div>
        <DropdownMenuItem
          onClick={handleQueue}
          className="flex items-center justify-between space-x-2"
        >
          <p className="text-base">Add to queue</p>
          <PiQueue className="h-5 w-5" />
        </DropdownMenuItem>

        {library && (
          <>
            <div className="h-[.05rem] w-full bg-zinc-300/10 mt-1.5"></div>
            <DropdownMenuItem
              onClick={handleBeat}
              className="flex items-center justify-between space-x-2"
            >
              <p className="text-base">Remove</p>
              <IoIosRemoveCircleOutline className="h-5 w-5" />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SongsOptions;
