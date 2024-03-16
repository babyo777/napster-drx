import { MdOutlineEdit } from "react-icons/md";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  DATABASE_ID,
  PLAYLIST_COLLECTION_ID,
  db,
} from "@/appwrite/appwriteConfig";
import { useRef, useState } from "react";
import Loader from "../Loaders/Loader";
import { useQueryClient } from "react-query";

const FormSchema = z.object({
  Playlist: z.string().min(2, {
    message: "Playlist name must be at least 3 characters.",
  }),
  creator: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

export function EditCustomPlaylist({ id }: { id: string }) {
  const q = useQueryClient();
  const close = useRef<HTMLButtonElement>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Playlist: "",
      creator: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmit(true);
    db.updateDocument(DATABASE_ID, PLAYLIST_COLLECTION_ID, id, {
      name: data.creator,
      creator: data.Playlist,
      image:
        "https://i.pinimg.com/564x/ba/a8/c8/baa8c8385d0ac653d4d409c8682d8d46.jpg",
    }).then(
      () => (
        form.reset(),
        setIsSubmit(false),
        close.current?.click(),
        q.fetchQuery(["playlistDetails", "custom" + id])
      )
    );
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="">
          <MdOutlineEdit className="h-8 w-8 fade-in mb-2  backdrop-blur-md text-white bg-black/30 rounded-full p-1.5" />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[80vw] rounded-xl flex justify-center flex-col items-center">
        <DialogHeader>
          <DialogTitle>Edit Playlist details</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="Playlist"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Playlist Name" {...field} />
                  </FormControl>

                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creator"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="By" {...field} />
                  </FormControl>

                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <DialogFooter className=" space-y-2 flex flex-col">
              <Button
                type="submit"
                className=" rounded-xl"
                variant={"secondary"}
                disabled={isSubmit}
              >
                {isSubmit ? (
                  <Loader size="20" loading={true} />
                ) : (
                  "Save changes"
                )}
              </Button>
              <DialogClose className="flex w-full">
                <Button
                  ref={close}
                  type="button"
                  variant={"secondary"}
                  className="w-full  rounded-xl"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
