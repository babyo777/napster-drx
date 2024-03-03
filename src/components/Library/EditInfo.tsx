import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "../ui/button";
import { FcFullTrash } from "react-icons/fc";
import { useCallback, useRef } from "react";
import {
  DATABASE_ID,
  PLAYLIST_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";

import { useQueryClient } from "react-query";
import { savedPlaylist } from "@/Interface";

const EditInfo: React.FC<{ id: string; f: string; collection?: string }> = ({
  id,
  f,
  collection,
}) => {
  const q = useQueryClient();
  const closeRef = useRef<HTMLButtonElement>(null);
  const handleDelete = useCallback(() => {
    db.deleteDocument(
      DATABASE_ID,
      collection || PLAYLIST_COLLECTION_ID,
      id
    ).then(async () => {
      if (!collection) {
        await q.refetchQueries<savedPlaylist[]>("savedPlaylist");
      }
      closeRef.current?.click();
      await q.refetchQueries<savedPlaylist[]>("savedAlbums");
    });
  }, [id, collection, q]);

  return (
    <Dialog>
      <DialogTrigger>
        <AiOutlineMenu className="h-7 w-7 text-zinc-400" />
      </DialogTrigger>
      <DialogContent className="items-center rounded-2xl flex flex-col w-[77vw]">
        <DialogHeader>
          <DialogTitle className="text-zinc-400 font-bold">
            Are you sure?
          </DialogTitle>
        </DialogHeader>

        <FcFullTrash className="h-20 w-20 -mb-1.5" />
        <Button
          disabled={f === "default" ? true : false}
          variant={"destructive"}
          onClick={handleDelete}
          className=" py-4 rounded-xl w-52 bg-red-500"
        >
          Remove
        </Button>

        <DialogClose className="-mt-2">
          <Button
            asChild
            ref={closeRef}
            variant={"secondary"}
            className=" py-4 rounded-xl w-52"
          >
            <p>Close</p>
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EditInfo;
