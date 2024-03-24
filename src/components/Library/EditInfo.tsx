import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useCallback, useRef } from "react";

import {
  DATABASE_ID,
  PLAYLIST_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";
import { useQueryClient } from "react-query";
import { savedPlaylist } from "@/Interface";
import { RxCross2 } from "react-icons/rx";

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
      <DialogTrigger className="flex w-full items-center justify-end space-x-2">
        <RxCross2 className="h-6 w-6 text-zinc-500" />
      </DialogTrigger>
      <DialogContent className="items-center rounded-2xl flex flex-col w-[60vw]">
        <DialogHeader>
          <DialogTitle className="text-zinc-400 text-sm font-bold">
            Are you sure?
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-center space-x-2 ">
          <Button
            disabled={f === "default" ? true : false}
            variant={"secondary"}
            onClick={handleDelete}
            className="px-7 rounded-xl bg-red-500 "
          >
            Yes
          </Button>

          <DialogClose>
            <Button
              asChild
              ref={closeRef}
              variant={"secondary"}
              className="px-7 rounded-xl "
            >
              <p>No</p>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditInfo;
