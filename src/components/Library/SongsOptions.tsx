import { IoIosMore } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoAddSharp } from "react-icons/io5";
import { MdPlaylistAdd } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
function SongsOptions({ library }: { library?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-0 p-0">
        <IoIosMore className="h-5 w-5" />
        <div className="h-[.05rem] w-[8vw] bg-zinc-300/10 mt-[1.35rem] -ml-2"></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-300/10 border-none rounded-lg backdrop-blur-2xl mx-4 -mt-5">
        <DropdownMenuItem className="flex items-center justify-between space-x-2">
          <p className="text-base">Add to library</p>
          <IoAddSharp className="h-5 w-5" />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between space-x-2">
          <p className="text-base">Add to a Playlist...</p>
          <MdPlaylistAdd className="h-5 w-5" />
        </DropdownMenuItem>
        {library && (
          <DropdownMenuItem className="flex items-center justify-between space-x-2">
            <p className="text-base">Remove</p>
            <IoIosRemoveCircleOutline className="h-5 w-5" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SongsOptions;
