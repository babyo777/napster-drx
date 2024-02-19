import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../ui/button";
import { FcFullTrash } from "react-icons/fc";

const EditInfo: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <AiOutlineMenu className="h-7 w-7 text-zinc-400" />
      </DialogTrigger>
      <DialogContent className="items-center rounded-2xl flex flex-col w-[80vw]">
        <DialogHeader>
          <DialogTitle className="text-zinc-400 font-bold">
            Are you sure?
          </DialogTitle>
        </DialogHeader>

        <FcFullTrash className="h-24 w-24" />
        <Button
          disabled={true}
          variant={"destructive"}
          className=" py-4 rounded-xl w-48 bg-red-500"
        >
          Delete
        </Button>
        <DialogFooter className="text-center text-xs text-zinc-500">
          {id}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditInfo;
