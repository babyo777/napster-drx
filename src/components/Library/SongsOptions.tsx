import { IoIosMore } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoAddSharp } from "react-icons/io5";

function SongsOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-0 p-0">
        <IoIosMore />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-800 mx-4">
        <DropdownMenuItem className="flex items-center space-x-1">
          <IoAddSharp className="h-5 w-5" />
          <p className="text-xs">Add to library</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SongsOptions;
